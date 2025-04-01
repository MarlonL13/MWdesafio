const ZabbixAPI = require("../src/api/zabbix.js/index");
require("dotenv").config();

const zabbix = new ZabbixAPI(
  process.env.ZABBIX_LINK, // Zabbix URL
  process.env.ZABBIX_LOGIN, // Login do Zabbix
  process.env.ZABBIX_PASSWORD // Senha do Zabbix
);

async function testGetHistory() {
  // Faz login no Zabbix
  await zabbix.login();
  console.log("Login bem-sucedido!");

  // Após o login, chama o método getHistory com o itemId fornecido
  const itemId = "49798"; // ID do item que você deseja consultar
  const items = await zabbix.getHistory(itemId);
  console.log("Itens recuperados:", items);

  // Logout após o teste
  await zabbix.logout();
  console.log("Logout bem-sucedido!");
}

// Chama a função de teste
testGetHistory();
