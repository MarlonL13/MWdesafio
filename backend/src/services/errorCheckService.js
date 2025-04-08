const logger = require("../custom/logger.js");
const ZabbixAPI = require("../api/zabbix.js/index.js");
const { logErrorToDatabase } = require("./logService.js");
const { log } = require("winston");

const zabbix = new ZabbixAPI(
  process.env.ZABBIX_LINK, // Zabbix URL
  process.env.ZABBIX_LOGIN, // Login do Zabbix
  process.env.ZABBIX_PASSWORD // Senha do Zabbix
);

module.exports = {
  // Método para verificar se há erros no historico de itens
  async checkForErrors(itemIds) {
    logger.info("Verificando se existe erros nos itens");
    try {
      // Realiza login
      await zabbix.login();
      // Faz uso de um map + Promise.all para fazer as requisições em paralelo
        const promises = itemIds.map((itemId) => zabbix.getHistory(itemId));
        const items = await Promise.all(promises);
      const errorItems = items
        .flat()
        .filter((item) => item.value === 0 || item.value === null)
        .map((item) => item.itemid);
      if (errorItems.length > 0) {
        // Salva os erros no banco de dados
        logger.warn(`Erros encontrados nos itens: ${errorItems.join(", ")}`);
        await logErrorToDatabase(errorItems);
      }

      // Realiza Logout
      await zabbix.logout();
    } catch (error) {
      logger.error("Erro ao verificar itens:", error);
      throw error;
    }
  },
};
