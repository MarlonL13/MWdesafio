// Latência do Usuário POP Ponta Negra 49798
// Latência do Usuário POP Praia do Meio 49801
// Latência do Usuário POP Tirol 49799
// Latência do Usuário POP Zona Norte 49800
// PacketLoss do Usuário POP Ponta Negra 49802
// PacketLoss do Usuário POP Praia do Meio 49805
// PacketLoss do Usuário POP Tirol 49803
// PacketLoss do Usuário POP Zona Norte 49804
// Ping do Usuário POP Ponta Negra 49806
// Ping do Usuário POP Praia do Meio 49809
// Ping do Usuário POP Tirol 49807
// Ping do Usuário POP Zona Norte 49808
// Potência RX do Usuário POP Ponta Negra 49810
// Potência RX do Usuário POP Praia do Meio 49813
// Potência RX do Usuário POP Tirol 49811
// Potência RX do Usuário POP Zona Norte 49812
// Tráfego de Entrada do Usuário POP Ponta Negra 49814
// Tráfego de Entrada do Usuário POP Praia do Meio 49817
// Tráfego de Entrada do Usuário POP Tirol 49815
// Tráfego de Entrada do Usuário POP Zona Norte 49816
// Tráfego de Saida do Usuário POP Ponta Negra 49818
// Tráfego de Saida do Usuário POP Praia do Meio 49821
// Tráfego de Saida do Usuário POP Tirol 49819
// Tráfego de Saida do Usuário POP Zona Norte 49820
// Potência TX do Usuário POP Ponta Negra 49822
// Potência TX do Usuário POP Praia do Meio 49825
// Potência TX do Usuário POP Tirol 49823
// Potência TX do Usuário POP Zona Norte 49824

const { checkForErrors } = require("./errorCheckService.js");
const webSocketManager = require("../websocket/webSocket.js");
const http = require("http");
const express = require("express");
const logger = require("../custom/logger.js");
const WebSocket = require("ws");

// Create a simple server for testing
const app = express();
const server = http.createServer(app);

// Initialize WebSocket server
webSocketManager.setupWebSocket(server);

console.log("Starting test server...");

// Start the server on a different port for testing
server.listen(3336, () => {
  console.log("Test server running on port 3336");
  
  // Create a test client to connect to our WebSocket server
  const client = new WebSocket('ws://localhost:3336');
  
  client.on('open', () => {
    console.log("Test client connected to WebSocket server");
    
    client.on('message', (data) => {
      const message = JSON.parse(data.toString());
      console.log("Received message:", message);
    });
    
    // Wait a moment for everything to initialize
    setTimeout(() => {
      console.log("Running error check test...");
      
      // Now run the test
      checkForErrors(["49806", "49809", "49807", "49808"])
        .then(() => {
          console.log("Teste concluído.");
          // Wait to see if we get any WebSocket messages
          setTimeout(() => {
            client.close();
            process.exit(0);
          }, 2000);
        })
        .catch((error) => {
          console.error("Erro no teste:", error.message);
          client.close();
          process.exit(1);
        });
    }, 1000);
  });
  
  client.on('error', (error) => {
    console.error("Test client connection error:", error.message);
  });
});
