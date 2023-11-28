/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_data').del();
  await knex('user_data').insert([
    { parent_id: 1, user_id: 1, password: 'abcdef', user_firstName: 'baba', user_lastName: 'taro', solt: 'aaa12', roll: false, image: 'rowValue1fafasgfdhsdfhsh' },
    { parent_id: 1, user_id: 2, password: 'abcdef', user_firstName: 'baba', user_lastName: 'hanako', solt: 'bbb12', roll: false, image: 'rowValue1fafasgfdhsdfhsh' },
    { parent_id: 2, user_id: 3, password: 'abcdef', user_firstName: 'matui', user_lastName: 'taro', solt: 'ccc12', roll: false, image: 'rowValue1fafasgfdhsdfhsh' },
    { parent_id: 3, user_id: 4, password: 'abcdef', user_firstName: 'oga', user_lastName: 'taro', solt: 'ccc12', roll: true, image: 'rowValue1fafasgfdhsdfhsh' },
  ]);
};

// table.increments('parent_id');
// table.increments('children_id').primary();
// table.string('password');
// table.string('solt');
// table.boolean('roll');
// table.string('image', 512);
