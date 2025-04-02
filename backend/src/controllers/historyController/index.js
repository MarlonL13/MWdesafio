const { PrismaClient } = require("@prisma/client");
const logger = require("../../custom/logger");

const prisma = new PrismaClient();

module.exports = {
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

      if (!response.length) {
        logger.warn("Nenhum registro encontrado para os últimos 30 dias.");
        return res.status(404).json({ message: "Nenhum registro encontrado." });
      }

      logger.info("request test successfully");
      return res.status(200).json(response);
    } catch (error) {
      logger.error("Erro ao buscar registros de downHistory:", error);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  },
};
