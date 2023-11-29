//module化にしておくことで、chaihttpでテストが簡易に実施可能
const setupServer = () => {
  const express = require('express');
  const app = express();
  const PORT = 3000;
  app.use('/', express.static('../client/dist'));
  app.use(express.json());
  require('dotenv').config();

  const config = require('./knexfile');
  const knex = require('knex')(config[process.env.NODE_ENV]);

  //   CORSエラーの解消;
  const cors = require('cors');
  app.use(
    cors({
      origin: 'http://localhost:5173', //アクセス許可するオリジン
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200, //レスポンスstatusを200に設定
    })
  );

  const USER_DATA_TABLE = 'user_data';
  const CHILDREN_DATA_TABLE = 'children_data';

  const columnsArray = [
    'user_firstName',
    'user_lastName',
    'data_id',
    'children_data.user_id',
    'temp',
    'time',
    'defecation',
    'eat',
    'date',
    'medicine_morning',
    'medicine_afternoon',
    'medicine_night',
    'condition',
  ];

  //GET--------------------------------------------------
  app.get('/api/v1/histories/:username', async (req, res) => {
    //usernameはfirstName+ 半角スペース+ lastNameを想定
    const userNamearray = req.params.username.split(' ');
    try {
      const getUsers = await knex
        .where({
          user_firstName: userNamearray[1],
          user_lastName: userNamearray[0],
        })
        .select(columnsArray)
        .from(USER_DATA_TABLE)
        .innerJoin(
          CHILDREN_DATA_TABLE,
          'user_data.user_id',
          'children_data.user_id'
        )
        .orderBy([
          { column: 'date', order: 'desc' },
          { column: 'time', order: 'desc' },
        ])
        .limit(20);
      await res.status(200).send(getUsers);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  app.get('/api/v1/histories', async (req, res) => {
    try {
      const getAll = await knex
        .select(columnsArray)
        .from(USER_DATA_TABLE)
        .innerJoin(
          CHILDREN_DATA_TABLE,
          'user_data.user_id',
          'children_data.user_id'
        )
        .orderBy([
          { column: 'date', order: 'desc' },
          { column: 'time', order: 'desc' },
        ])
        .limit(20);

      await res.status(200).send(getAll);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  //POST-------------------------------
  app.post('/api/v1/histories/:username', async (req, res) => {
    try {
      const userNamearray = req.params.username.split(' ');
      const userId = await knex
        .where({
          user_firstName: userNamearray[1],
          user_lastName: userNamearray[0],
        })
        .select('user_id')
        .from(USER_DATA_TABLE);

      let dataId = await knex(CHILDREN_DATA_TABLE)
        .select('data_id')
        .orderBy('data_id', 'desc')
        .first();
      req.body.user_id = userId[0].user_id;
      req.body.data_id = dataId.data_id + 1;

      await knex(CHILDREN_DATA_TABLE).insert(req.body);
      dataId = await knex(CHILDREN_DATA_TABLE)
        .select('data_id')
        .orderBy('data_id', 'desc')
        .first();
      await res.status(200).send(dataId);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  //PUT-------------------------------
  app.put('/api/v1/histories/:id', async (req, res) => {
    try {
      await knex(CHILDREN_DATA_TABLE)
        .where({ data_id: req.params.id })
        .update(req.body);

      await res.status(200).send(`{ message: '修正完了しました' }`);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  //DELETE-------------------------------
  app.delete('/api/v1/histories/:id', async (req, res) => {
    try {
      await knex(CHILDREN_DATA_TABLE)
        .where({ data_id: req.params.id })
        .delete();

      await res.status(200).send('{message: "削除完了しました"}');
    } catch (err) {
      res.status(404).send(err);
    }
  });

  return app;
};

module.exports = { setupServer };
