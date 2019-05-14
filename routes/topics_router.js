const express = require("express");
const topicsRouter = express.Router();

const { sendTopics } = require("../controllers/topics_controller");

const { methodNotAllowed } = require("../errors/index");

topicsRouter
  .route("/")
  .get(sendTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
