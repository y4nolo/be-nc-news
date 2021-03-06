const express = require("express");
const apiRouter = express.Router();
const topicsRouter = require("./topics_router");
const articlesRouter = require("./articles_router");
const commentsRouter = require("./comments_router");
const usersRouter = require("./users_router");

const endpoints = require("../endpoints.json");

const { methodNotAllowed } = require("../errors");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

apiRouter
  .route("/")
  .get((req, res) => res.send(endpoints))
  .all(methodNotAllowed);

module.exports = apiRouter;
