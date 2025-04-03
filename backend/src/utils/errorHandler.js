const logger = require("../custom/logger.js");
const { Prisma } = require("@prisma/client");

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

function handleControllerError(error, res) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Erros específicos do Prisma (ex: violação de unicidade, chave estrangeira inválida)
    logger.error("Erro de requisição ao banco de dados:", error);
    return res
      .status(400)
      .json({ error: "Erro de requisição ao banco de dados." });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    // Erro ao conectar ao banco de dados
    logger.error("Erro ao conectar ao banco de dados:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao conectar ao banco de dados." });
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    // Validação falhou (ex: passando um tipo errado de dado)
    logger.error("Erro de validação no Prisma:", error);
    return res
      .status(400)
      .json({ error: "Erro de validação nos dados enviados." });
  }

  // Caso o erro não seja do Prisma, retorna erro genérico
  logger.error("Erro desconhecido:", error);
  return res.status(500).json({ error: "Erro Interno do Servidor." });
}

module.exports = { handleZabbixError, handleControllerError };
