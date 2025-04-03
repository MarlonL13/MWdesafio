const { Router } = require("express");
const testController = require("./controllers/testController");
const historyController = require("./controllers/historyController/");
const alertController = require("./controllers/alertController");
const routes = Router();

routes.get("/test", testController.handle);
routes.get("/history", historyController.getHistory);
routes.get("/alert", alertController.getAlert);
routes.patch("/alert/:id", alertController.markAlertAsRead);
module.exports = routes;
