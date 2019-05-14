const express = require("express");
const articlesRouter = express.Router();

const { sendArticles } = require("../controllers/articles_controllers");

const { methodNotAllowed } = require("../errors/index");
articlesRouter
  .route("/")
  .get(sendArticles)
  .all(methodNotAllowed);

module.exports = articlesRouter;
