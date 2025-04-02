const ZabbixAPI = require("../src/api/zabbix.js/index");
require("dotenv").config();

const zabbix = new ZabbixAPI(
  process.env.ZABBIX_LINK, // Zabbix URL
  process.env.ZABBIX_LOGIN, // Login do Zabbix
  process.env.ZABBIX_PASSWORD // Senha do Zabbix
);

async function testGetItems() {
  // Faz login no Zabbix
  const loginResponse = await zabbix.login();
  console.log("Login bem-sucedido!");

  // Após o login, chama o método getItems com o hostId fornecido
  const hostId = process.env.ZABBIX_ID_HOST; // O ID do host

  const items = await zabbix.getItems(hostId, 49807);
  console.log(items);

  // Logout após o teste
  await zabbix.logout();
  console.log("Logout bem-sucedido!");
}

// Chama a função de teste
testGetItems();


