const connection = require("../db/connection");

exports.getAllArticles = () => {
  return connection.select("*").from("articles");
};
