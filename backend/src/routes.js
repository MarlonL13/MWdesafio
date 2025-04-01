const { Router } = require("express");

const testController = require("./controllers/testController");
const routes = Router();

routes.get("/test", testController.handle);
module.exports = routes;
