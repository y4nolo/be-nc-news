const { articlesData } = require("../data");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      // insert data
      return knex("articles")
        .insert(articlesData)
        .returning("*");
    });
  // .then(articlesRows)=> {
  //   const articlesRef = createRef(articlesRows, )
  //}
};
