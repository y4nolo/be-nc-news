const connection = require("../db/connection");

exports.getTopics = () => {
  return connection.select("*").from("topics");
};
