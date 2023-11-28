/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.dropTable('children_data');
  return knex.schema.createTable('children_data', function (table) {
    table.increments('data_id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('user_data.user_id');
    table.integer('time');
    table.float('temp');
    table.string('defecation');
    table.string('eat');
    table.date('date');
    table.boolean('medicine_morning');
    table.boolean('medicine_afternoon');
    table.boolean('medicine_night');
    table.text('condition');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('children_data');
};
