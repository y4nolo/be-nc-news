exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", users => {
    users
      .string("username")
      .primary()
      .unique();
    users.string("avatar_url");
    users.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
