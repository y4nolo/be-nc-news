const connection = require("../db/connection");

exports.getUsers = username => {
  return connection
    .select("*")
    .from("users")
    .where(username, "=", "username");
};
