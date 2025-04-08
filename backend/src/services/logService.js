const logger = require("../custom/logger.js");
const ZabbixAPI = require("../api/zabbix.js/index.js");
const { PrismaClient } = require("@prisma/client");
const webSocketManager = require("../websocket/webSocket.js");

const prisma = new PrismaClient();

const zabbix = new ZabbixAPI(
  process.env.ZABBIX_LINK, // Zabbix URL
  process.env.ZABBIX_LOGIN, // Login do Zabbix
  process.env.ZABBIX_PASSWORD // Senha do Zabbix
);

const hostId = process.env.ZABBIX_ID_HOST;

// Função para loggar alertas no banco de dados e notificar via WebSocket
async function logImmediateFailure(downHistoryId) {
  try {
    await prisma.immediatefailureNotification.create({
      data: {
        id: crypto.randomUUID(),
        downHistoryId: downHistoryId,
        read: false,
      },
    });
    logger.info("Sucesso ao registrar um novo alerta");
    webSocketManager.notifyNewAlert(); // Notifica todos os clientes conectados via WebSocket
  } catch (error) {
    logger.error(`Falha ao criar um novo alerta: ${error}`);
    throw error;
  }
}

module.exports = {
  // Funçao para salvar os erros no banco de dados e chamar a função de logImmediateFailure
  async logErrorToDatabase(itemIds) {
    try {
      await zabbix.login();
      const promises = itemIds.map((itemId) => zabbix.getItems(itemId));
      const items = await Promise.all(promises);
      for (const itemArray of items) {
        const item = itemArray[0];

        if (!item) {
          logger.warn("Item não encontrado");
          continue;
        }

        const errorLog = await prisma.downHistory.create({
          data: {
            id: crypto.randomUUID(), // Gera um UUID para a tabela
            nome: item.nome,
            key: item.key,
            hostId: item.hostId,
            hostName: item.hostName || "Desconhecido", // Se não tiver, coloca padrão
            date: item.date,
          },
        });
        logger.info(`Registro salvo com sucesso para item: ${item.nome}`);
        // Cria o resgitro no banco de dados immediatefailureNotification
        await logImmediateFailure(errorLog.id);
      }
    } catch (error) {
      logger.error("Erro ao salvar alertas no banco:", error);
      throw error;
    }
  },
};
