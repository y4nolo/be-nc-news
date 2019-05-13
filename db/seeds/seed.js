const { articleData, commentData, topicData, userData } = require("../data");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex
        .insert(topicData)
        .into("topics")
        .returning("*");
    })
    .then(topics => {
      return knex
        .insert(userData)
        .into("users")
        .returning("*");
    });
};
