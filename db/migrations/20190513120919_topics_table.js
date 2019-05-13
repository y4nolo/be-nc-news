exports.up = function(knex, Promise) {
  console.log("creating topics table");
  return knex.schema.createTable("topics", topics => {
    topics.string("slug").primary();
    topics.string("description");
  });
};

exports.down = function(knex, Promise) {
  console.log("removing topics table");
  return schema.dropTable("topics");
};
