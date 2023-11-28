/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.dropTable('user_data');
  return knex.schema.createTable('user_data', function (table) {
    table.integer('parent_id');
    table.increments('user_id').primary();
    table.string('password');
    table.string('solt');
    table.boolean('roll');
    table.string('image', 512);
    table.string('user_firstName');
    table.string('user_lastName');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('user_data');
};
