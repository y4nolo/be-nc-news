exports.up = function(knex, Promise) {
  console.log("creating users table");
  return knex.schema.createTable("users", users => {
    users.string("username").primary().unique;
    users.string("avatar_url");
    users.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing users table");
  return schema.dropTable("users");
};
