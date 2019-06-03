const express = require("express");
const commentsRouter = express.Router();
const { patchCommentById } = require("../controllers/comments_controllers");
const { sendComments } = require("../controllers/comments_controllers");
const { deleteCommentById } = require("../controllers/comments_controllers");

const { methodNotAllowed } = require("../errors/index");

commentsRouter.route("/").get(sendComments);

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(methodNotAllowed);
module.exports = commentsRouter;
