const express = require("express");
const usersRouter = express.Router();

const { sendUsers } = require("../controllers/users-controllers");

const { methodNotAllowed } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(sendUsers)
  .all(methodNotAllowed);

module.exports = usersRouter;
