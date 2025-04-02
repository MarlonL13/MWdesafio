const logger = require("../custom/logger.js");
const ZabbixAPI = require("../api/zabbix.js/index.js");
const { logErrorToDatabase } = require("./logService.js");

const zabbix = new ZabbixAPI(
  process.env.ZABBIX_LINK, // Zabbix URL
  process.env.ZABBIX_LOGIN, // Login do Zabbix
  process.env.ZABBIX_PASSWORD // Senha do Zabbix
);

module.exports = {
  async checkForErrors(itemIds) {
    try {
      // Realiza login
      await zabbix.login();
      // Faz uso de um map + Promise.all para fazer as requisições em paralelo
      //   const promises = itemIds.map((itemId) => zabbix.getHistory(itemId));
      //   const items = await Promise.all(promises);
      const mockHistory = itemIds.map((itemId) => [
        { itemid: itemId, value: 0, clock: "1743530536", ns: "644865341" }, // Erro
        { itemid: itemId, value: null, clock: "1743530536", ns: "644865341" }, // Erro
      ]);
      const items = await Promise.all(mockHistory);
      const errorItems = items
        .flat()
        .filter((item) => item.value === 0 || item.value === null)
        .map((item) => item.itemid);
      if (errorItems.length === 0) {
        logger.info("Nenhum erro encontrado nos itens.");
      } else {
        logger.warn(`Erros encontrados nos itens: ${errorItems.join(", ")}`);
      }
      // Salva os erros no banco de dados
      await logErrorToDatabase(errorItems);
      
      // Realiza Logout
      await zabbix.logout();
    } catch (error) {
      logger.error("Erro ao verificar itens:", error);
      throw error;
    }
  },
};
