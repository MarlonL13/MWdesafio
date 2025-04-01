require("dotenv").config();
const logger = require("../../custom/logger.js");
const ZabbixAPI = require("../../api/zabbix.js/index.js");
const { PrismaClient } = require("@prisma/client");
const { log } = require("winston");

const zabbix = new ZabbixAPI(
  process.env.ZABBIX_LINK, // Zabbix URL
  process.env.ZABBIX_LOGIN, // Login do Zabbix
  process.env.ZABBIX_PASSWORD // Senha do Zabbix
);

const prisma = new PrismaClient();

const validItemIds = [
  "49806",
  "49809",
  "49807",
  "49808", // Ping
  "49814",
  "49817",
  "49815",
  "49816", // Tráfego Entrada
  "49818",
  "49821",
  "49819",
  "49820", // Tráfego Saída
  "49810",
  "49813",
  "49811",
  "49812", // Potência RX
  "49822",
  "49825",
  "49823",
  "49824", // Potência TX
];

module.exports = {
  async errorCheckController(itemIds) {
    try {
      await zabbix.login();
      // Faz uso de um map + Promise.all para fazer as requisições em paralelo
      const promises = itemIds.map((itemId) => zabbix.getHistory(itemId));
      const items = await Promise.all(promises);
      const errorItems = items
        .flat()
        .filter((item) => item.value === 0 || item.value === null)
        .map((item) => item.itemid);
      if (errorItems.length === 0) {
        logger.info("Nenhum erro encontrado nos itens.");
      } else {
        logger.error("Erros encontrados nos itens:", errorItems);
      }
      await zabbix.logout();
    } catch (error) {
      throw error;
    }
  },
};
