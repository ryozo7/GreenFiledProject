const express = require("express");
const app = express();

const cors = require("cors");

const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const testHistories = [
  {
    data_id: 1,
    user_id: 1,
    time: 0,
    temp: 38.2,
    defecation: "便あり",
    eat: "食欲あり",
    date: "2023-11-28",
    medicine_morning: true,
    medicine_afternoon: false,
    medicine_night: false,
    condition: "元気で食欲あるが高熱あり",
    username: "tanaka taro",
    user_firstName: "taro",
    user_lastName: "tanaka",
  },
  {
    data_id: 2,
    user_id: 1,
    time: 1,
    temp: 37.2,
    defecation: "便なし",
    eat: "食欲あり",
    date: "2023-11-28",
    medicine_morning: false,
    medicine_afternoon: false,
    medicine_night: false,
    condition: "元気で食欲あるが高熱あり",
    username: "tanaka taro",
    user_firstName: "taro",
    user_lastName: "tanaka",
  },
  {
    data_id: 3,
    user_id: 1,
    time: 2,
    temp: 40.2,
    defecation: "便あり",
    eat: "食欲あり",
    date: "2023-11-28",
    medicine_morning: false,
    medicine_afternoon: false,
    medicine_night: true,
    condition: "元気で食欲あるが高熱あり",
    username: "tanaka taro",
    user_firstName: "taro",
    user_lastName: "tanaka",
  },
  {
    data_id: 4,
    user_id: 2,
    time: 0,
    temp: 36.2,
    defecation: "便なし",
    eat: "食欲あり",
    date: "2023-11-28",
    medicine_morning: true,
    medicine_afternoon: false,
    medicine_night: false,
    condition: "元気で食欲あるが高熱あり",
    username: "tanaka jiro",
    user_firstName: "jiro",
    user_lastName: "tanaka",
  },
  {
    data_id: 5,
    user_id: 2,
    time: 0,
    temp: 38.2,
    defecation: "便あり",
    eat: "食欲あり",
    date: "2023-01-28",
    medicine_morning: true,
    medicine_afternoon: false,
    medicine_night: false,
    condition: "元気で食欲あるが高熱あり",
    username: "tanaka jiro",
    user_firstName: "jiro",
    user_lastName: "tanaka",
  },
  {
    data_id: 6,
    user_id: 2,
    time: 1,
    temp: 37.2,
    defecation: "便なし",
    eat: "食欲あり",
    date: "2023-04-28",
    medicine_morning: true,
    medicine_afternoon: false,
    medicine_night: false,
    condition: "元気で食欲あるが高熱あり",
    username: "tanaka jiro",
    user_firstName: "jiro",
    user_lastName: "tanaka",
  },
  {
    data_id: 7,
    user_id: 3,
    time: 2,
    temp: 40.2,
    defecation: "便あり",
    eat: "食欲あり",
    date: "2023-11-28",
    medicine_morning: true,
    medicine_afternoon: false,
    medicine_night: false,
    condition: "元気で食欲あるが高熱あり",
    username: "tanaka yositaka",
    user_firstName: "yositaka",
    user_lastName: "tanaka",
  },
  {
    data_id: 8,
    user_id: 3,
    time: 0,
    temp: 36.2,
    defecation: "便なし",
    eat: "食欲あり",
    date: "2023-08-28",
    medicine_morning: true,
    medicine_afternoon: false,
    medicine_night: false,
    condition: "元気で食欲あるが高熱あり",
    username: "tanaka yositaka",
    user_firstName: "yositaka",
    user_lastName: "tanaka",
  },
  {
    data_id: 9,
    user_id: 3,
    time: 1,
    temp: 38.2,
    defecation: "便あり",
    eat: "食欲あり",
    date: "2023-01-28",
    medicine_morning: true,
    medicine_afternoon: false,
    medicine_night: false,
    condition: "元気で食欲あるが高熱あり",
    username: "tanaka yositaka",
    user_firstName: "yositaka",
    user_lastName: "tanaka",
  },
  {
    data_id: 10,
    user_id: 4,
    time: 2,
    temp: 38.2,
    defecation: "便あり",
    eat: "食欲あり",
    date: "2023-01-28",
    medicine_morning: true,
    medicine_afternoon: false,
    medicine_night: false,
    condition: "元気で食欲あるが高熱あり",
    username: "tanaka hanako",
    user_firstName: "hanako",
    user_lastName: "tanaka",
  },
];
app.get("/api/v1/histories", (req, res) => {
  res.send(testHistories);
});

app.get("/api/v1/histories/:username", (req, res) => {
  const filteredData = testHistories.filter(
    (elem) => elem.username === req.params.username
  );
  res.send(filteredData);
});

app.post("/api/v1/histories/:username", (req, res) => {
  console.log("req.body : ", req.body);
  console.log("username : ", req.params.username);

  res.send("新規投稿です。");
});

app.delete("/api/v1/histories/:id", (req, res) => {
  console.log("data_id : ", req.params.id);

  res.send("削除できました。");
});
app.put("/api/v1/histories/:id", (req, res) => {
  console.log("req.body : ", req.body);
  console.log("data_id : ", req.params.id);

  res.send("UPDATEできました。");
});

app.listen(PORT, () => {
  console.log("server is runnig");
});
