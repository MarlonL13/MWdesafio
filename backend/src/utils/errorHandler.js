const logger = require("../custom/logger.js");

function handleZabbixError(error) {
  if (error.message.includes("Incorrect user name or password")) {
    logger.error("Erro de autenticação no Zabbix:", error.message);
    throw error;
  }
  // Erro do API Zabbix
  if (error.response) {
    logger.error("Erro na resposta da API Zabbix:", error.response.data);
    throw new Error(`Erro do Zabbix: ${JSON.stringify(error.response.data)}`);
  }
  // Error de resposta do servidor Zabbix
  if (error.request) {
    logger.error("Erro na resposta do servidor Zabbix:", error.request);
    throw new Error("Não foi possível conectar ao servidor Zabbix.");
  }
  // Erro desconhecido
  logger.error("Erro desconhecido no Zabbix:", error.message);
  throw new Error(
    `Erro inesperado no Zabbix: ${JSON.stringify(error.message)}`
  );
}

module.exports = { handleZabbixError };
