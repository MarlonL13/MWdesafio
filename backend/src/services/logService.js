const logger = require("../custom/logger.js");
const ZabbixAPI = require("../api/zabbix.js/index.js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const zabbix = new ZabbixAPI(
  process.env.ZABBIX_LINK, // Zabbix URL
  process.env.ZABBIX_LOGIN, // Login do Zabbix
  process.env.ZABBIX_PASSWORD // Senha do Zabbix
);

const hostId = process.env.ZABBIX_ID_HOST;

// Função para loggar alertas no banco de dados
async function logImmediateFailure(itemId, downHistoryId) {
  try {
    await prisma.immediatefailureNotification.upsert({
      where: { itemId },
      update: { read: false },
      create: {
        id: crypto.randomUUID(),
        itemId: itemId,
        downHistoryId: downHistoryId,
        read: false,
      },
    });
    logger.info(`Sucesso ao registrar alerta: ${itemId}`);
  } catch (error) {
    logger.error(`Falha ao criar resgistro de alerta: ${itemId}`, error);
    throw new Error(`Falha ao criar resgistro de alerta: ${error.message}`);
  }
}


module.exports = {
  async logErrorToDatabase(itemIds) {
    try {
      await zabbix.login();
      const promises = itemIds.map((itemId) => zabbix.getItems(hostId, itemId));
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
        await logImmediateFailure(item.itemId, errorLog.id);
      }
    } catch (error) {
      logger.error("Erro ao salvar alertas no banco:", error);
      throw new Error(`Falha ao salvar na database: ${error.message}`);
    }
  },
};
