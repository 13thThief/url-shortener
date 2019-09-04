
exports.up = function(knex) {
  return knex.schema
    .createTable('urls', table => {

      table.increments();

      table
        .string('url')
        .unique();

      table
        .string('short_url')
        .unique()
        .index();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('urls');
};
