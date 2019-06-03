const express = require("express");
const usersRouter = express.Router();

const { sendUser, getAllUsers } = require("../controllers/users-controllers");

const { methodNotAllowed } = require("../errors/index");

usersRouter
  .route("/")
  .get(getAllUsers)
  .all(methodNotAllowed);

usersRouter
  .route("/:username")
  .get(sendUser)
  .all(methodNotAllowed);
module.exports = usersRouter;
