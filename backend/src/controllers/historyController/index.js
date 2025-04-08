const { PrismaClient } = require("@prisma/client");
const { handleControllerError } = require("../../utils/errorHandler");
const logger = require("../../custom/logger");

const prisma = new PrismaClient();

module.exports = {
  // Método para receber o historico de erros registrados no banco de dados nos ultimos 30 dias
  async getHistory(req, res) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    try {
      const response = await prisma.downHistory.findMany({
        where: {
          date: {
            gte: thirtyDaysAgo, // Pega items do último mês
          },
        },
      });

      logger.info(
        response.length
          ? `Foram encontrados ${response.length} erros no histórico.`
          : "Nenhum erro encontrado."
      );
      return res.status(200).json(response);
    } catch (error) {
      handleControllerError(error, res);
    }
  },
};
