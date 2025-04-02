require("dotenv").config();
const logger = require("../../custom/logger.js");
const ZabbixAPI = require("../../api/zabbix.js/index.js");
const { PrismaClient } = require("@prisma/client");

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


