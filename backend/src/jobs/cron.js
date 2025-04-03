const cron = require("node-cron");
const { checkForErrors } = require("../services/errorCheckService.js");

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

cron.schedule("*/1 * * * *", async () => {
  // checkForErrors(validItemIds);
});
