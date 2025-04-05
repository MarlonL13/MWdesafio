const { PrismaClient } = require("@prisma/client");
const { handleControllerError } = require("../../utils/errorHandler");
const logger = require("../../custom/logger");

const prisma = new PrismaClient();

module.exports = {
  async getAlert(req, res) {
    try {
      const response = await prisma.immediatefailureNotification.findMany({
        where: {
          read: false,
        },
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

      logger.info(
        response.length
          ? `Foram encontrados ${response.length} alertas não lidos.`
          : "Nenhum alerta encontrado."
      );
      return res.status(200).json(response);
    } catch (error) {
      handleControllerError(error, res);
    }
  },

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
