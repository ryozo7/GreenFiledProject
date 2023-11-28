/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('children_data').del();
  await knex('children_data').insert([
    {
      data_id: 1,
      user_id: 1,
      time: 0,
      temp: 38.2,
      defecation: '便あり',
      eat: '食欲あり',
      date: '2023-11-28',
      medicine_morning: true,
      medicine_afternoon: false,
      medicine_night: false,
      condition: '元気で食欲あるが高熱あり',
    },
    {
      data_id: 2,
      user_id: 2,
      time: 1,
      temp: 37.2,
      defecation: '便なし',
      eat: '食欲あり',
      date: '2023-11-28',
      medicine_morning: true,
      medicine_afternoon: false,
      medicine_night: false,
      condition: '元気で食欲あるが高熱あり',
    },
    {
      data_id: 3,
      user_id: 3,
      time: 2,
      temp: 40.2,
      defecation: '便あり',
      eat: '食欲あり',
      date: '2023-11-28',
      medicine_morning: true,
      medicine_afternoon: false,
      medicine_night: false,
      condition: '元気で食欲あるが高熱あり',
    },
    {
      data_id: 4,
      user_id: 4,

      time: 0,
      temp: 36.2,
      defecation: '便なし',
      eat: '食欲あり',
      date: '2023-11-28',
      medicine_morning: true,
      medicine_afternoon: false,
      medicine_night: false,
      condition: '元気で食欲あるが高熱あり',
    },
  ]);
};

// table.increments('data_id').primary();
// table.integer('user_id');
// table.foreign('user_id').references('user_data.user_id');
// table.string('user_firstName');
// table.string('user_lastName');
// table.integer('time');
// table.float('temp');
// table.string('defecation');
// table.string('eat');
// table.date('date');
// table.boolean('medicine_morning');
// table.boolean('medicine_afternoon');
// table.boolean('medicine_night');
// table.text('condition');
