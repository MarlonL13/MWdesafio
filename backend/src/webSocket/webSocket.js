const logger = require("../custom/logger.js");
const { WebSocketServer } = require("ws");

class WebSocketManager {
  constructor() {
    this.wss = null;
    logger.info("WebSocketManager initialized");
  }

  setupWebSocket(server) {

    this.wss = new WebSocketServer({ server });

    this.wss.on("connection", (ws) => {
      logger.info("Client connected to WebSocket");

      ws.on("close", () => {
        logger.info("Client disconnected from WebSocket");
      });

      ws.on("error", (error) => {
        logger.error("WebSocket connection error", error);
      });
    });
  }

  // Apenas notifica o frontend que há novos alertas
  notifyNewAlert() {
    if (!this.wss) {
      logger.warn("Attempted to notify clients but WebSocket server is not initialized");
      return;
    }

    const clientCount = [...this.wss.clients].filter(client => client.readyState === 1).length;
    logger.info(`Notifying ${clientCount} connected client(s) about new alert`);

    this.wss.clients.forEach((client) => {
      if (client.readyState === 1) { // 1 = OPEN
        client.send(JSON.stringify({ message: "new_alert" }));
      }
    });
  }
}

// Cria um singleton do WebSocketManager
const webSocketManager = new WebSocketManager();
module.exports = webSocketManager;