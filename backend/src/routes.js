const { Router } = require("express");

const testController = require("./controllers/testController");
const historyController = require("./controllers/historyController/");
const routes = Router();

routes.get("/test", testController.handle);
routes.get("/history", historyController.getHistory);
module.exports = routes;
