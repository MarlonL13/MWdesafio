const ZabbixAPI = require('./index'); // Ajuste o caminho conforme necessário

const zabbix = new ZabbixAPI(
  'http://103.199.187.146:8080', // Zabbix URL
  'userSeletiva',               // Login do Zabbix
  'mw@seletiva'                 // Senha do Zabbix
);

async function testGetItems() {
  try {
    // Faz login no Zabbix
    const loginResponse = await zabbix.login();
    console.log('Login bem-sucedido!');

    // Após o login, chama o método getItems com o hostId fornecido
    const hostId = '11077';  // O ID do host que você deseja consultar
    const items = await zabbix.getItems(hostId);
    items.forEach(element => {
        console.log(element.name);
        
    });
    console.log('Itens recuperados:', items.length);

    // Logout após o teste
    await zabbix.logout();
    console.log('Logout bem-sucedido!');
  } catch (error) {
    console.error('Erro durante o teste:', error.message);
  }
}

// Chama a função de teste
testGetItems();