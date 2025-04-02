const { WebSocketServer } = require("ws");
const logger = require("../custom/logger.js");

let wss;
// Função para configurar o WebSocket
function setupWebSocket(server) {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    logger.info("Novo cliente conectado ao WebSocket.");

    ws.on("close", () => {
      logger.info("Cliente desconectado.");
    });
  });
}
// Função para enviar alertas para todos os clientes conectados
function notifyNewAlert() {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      // 1 = OPEN
      client.send(JSON.stringify({ message: "new_alert" }));
    }
  });
}

module.exports = { setupWebSocket, notifyNewAlert };
