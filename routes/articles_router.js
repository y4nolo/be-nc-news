const express = require("express");
const articlesRouter = express.Router();

const { sendArticles } = require("../controllers/articles_controllers");
const { sendArticlebyId } = require("../controllers/articles_controllers");
const { patchArticleById } = require("../controllers/articles_controllers");
const {
  sendCommentsByArticleId
} = require("../controllers/articles_controllers");
const {
  postCommentByArticleId
} = require("../controllers/articles_controllers");

const { methodNotAllowed } = require("../errors/index");
articlesRouter
  .route("/")
  .get(sendArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticlebyId)
  .patch(patchArticleById)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(methodNotAllowed);

module.exports = articlesRouter;
