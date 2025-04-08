const { PrismaClient } = require("@prisma/client");
const { handleControllerError } = require("../../utils/errorHandler");
const logger = require("../../custom/logger");

const prisma = new PrismaClient();

module.exports = {
  // Método para receber os ultimos alertas registrados no banco de dados
  async getAlert(req, res) {
    try {
      const response = await prisma.immediatefailureNotification.findMany({
        take: 20, // Limite de quantos alertas retornar
        include: {
          downHistory: {
        select: {
          date: true,
          nome: true,
        },
          },
        },
        orderBy: {
          downHistory: {
        date: "desc",
          },
        },
      });

      logger.info(`Recuperados alertas recentes com sucesso`);
      return res.status(200).json(response);
    } catch (error) {
      handleControllerError(error, res);
    }
  },

  // Método para marcar o alerta como lido
  async markAlertAsRead(req, res) {
    const { id } = req.params;

    // Verifica se o ID está no formato esperado (UUID)
    if (!/^[0-9a-fA-F-]{36}$/.test(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    try {
      const existingAlert =
        await prisma.immediatefailureNotification.findUnique({
          where: { id },
        });

      if (!existingAlert) {
        return res.status(404).json({ error: "Alerta não encontrado" });
      }

      const response = await prisma.immediatefailureNotification.update({
        where: { id },
        data: { read: true },
      });

      logger.info(`Alerta ${id} marcado como lido.`);
      return res.status(200).json(response);
    } catch (error) {
      handleControllerError(error, res);
    }
  },
};
