const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");

app.set("views", __dirname + "/views"); // prefix
app.set("view engine", "ejs"); // suffix

process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);

app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded

app.use(express.static(__dirname + "/public"));

// 사용자 정의 미들웨어 - filter 역할
// 모든 요청에 적용되는 공통 처리
app.use((req, res, next) => {
  // 미들웨어 실행 후 다음 기능 호출
  next();
});

const todoList = [
  { idx: 1, title: "hello", done: false },
  { idx: 2, title: "world", done: false },
  { idx: 3, title: "node공부", done: false },
];
let seqTodolist = 4;

app.get("/home", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
  res.write("<h1>길동이의 홈페이지</h1>");
  res.end(); // end() 안하면 무한루프 발생.
});

app.get("/todoList", (req, res) => {
  console.log("GET - /todoList");
  req.app.render("todoList", { todoList: todoList }, (err, data) => {
    // console.log("data", data);
    res.end(data);
  });
});

app.post("/todoList", (req, res) => {
  console.log("POST - /todoList");
  var newItem = req.body.newItem;
  todoList.push({ idx: seqTodolist++, title: newItem, done: false });
  res.redirect("/todoList");
});

app.get("/todoList/update", (req, res) => {
  console.log("GET - /todoList/update");
  let idx = req.query.idx;
  let title = req.query.title;

  console.log("idx:" + idx, "title:" + title);
  const targetIdx = todoList.findIndex((item, index) => {
    return idx == item.idx;
  });
  todoList[targetIdx].title = title;

  res.redirect("/todoList");
});

app.get("/json/todoList", (req, res) => {
  // res.end() 문자열만 처리
  // res.send()  수식or 객체 처리 >>결과는 JSON  문자열
  res.send({ todoList });
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});
