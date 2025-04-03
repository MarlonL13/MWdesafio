const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
require("dotenv").config();
require("./jobs/cron.js");
const { setupWebSocket } = require("./websocket/webSocket.js");

const routes = require("./routes");
const app = express();
const server = http.createServer(app);

setupWebSocket(server);

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(routes);

server.listen(3335, () => {
  console.log("http on *:3335");
});
