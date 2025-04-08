const ZabbixAPI = require("./index.js");

const zabbix = new ZabbixAPI(
    process.env.ZABBIX_LINK, // Zabbix URL
    process.env.ZABBIX_LOGIN, // Login do Zabbix
    process.env.ZABBIX_PASSWORD // Senha do Zabbix
  );

// Top-level await must be used inside an async function
const main = async () => {
    await zabbix.login();
  const test = await zabbix.getItems(49818);
  await zabbix.logout();
  console.log(test);
};

main().catch(console.error);

  
