const express = require("express");
const apiRouter = express.Router();
const topicsRouter = require("./topics_router");
const articlesRouter = require("./articles_router");

const { methodNotAllowed } = require("../errors");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);

apiRouter
  .route("/")
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

module.exports = apiRouter;
