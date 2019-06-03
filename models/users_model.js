const connection = require("../db/connection");

exports.fetchAllUsers = () => {
  return connection.select("*").from("users");
};

exports.getUser = username => {
  return connection
    .select("*")
    .from("users")
    .where("users.username", "=", username)
    .then(([user]) => {
      return user;
    });
};
