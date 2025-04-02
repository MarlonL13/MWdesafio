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

module.exports = {
  async logErrorToDatabase(itemIds) {
    try {
      await zabbix.login();
      const promises = itemIds.map((itemId) => zabbix.getItems(hostId, itemId));

      const items = await Promise.all(promises);
      for (const itemArray of items) {
        // Extract the first object from the array
        const item = itemArray[0];
        
        if (!item) {
          logger.warn("Item não encontrado");
          continue;
        }
    
        await prisma.downHistory.create({
          data: {
        id: crypto.randomUUID(), // Gera um UUID para a tabela
        nome: item.nome,
        key: item.key,
        hostId: item.hostId,
        hostName: item.hostName || "Desconhecido", // Se não tiver, coloca padrão
        date: new Date(),
          },
        });
        logger.info(`Registro salvo com sucesso para item: ${item.nome}`);
      }
    } catch (error) {
      logger.error("Erro ao salvar alertas no banco:", error);
      throw error;
    }
  },
};
