const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");

//view engine - Template engine
app.set("views", __dirname + "/views"); //prefix
app.set("view engine", "ejs"); // suffix

process.env.PORT = 3000;
app.set("port", process.env.PORT);
console.log(process.env.PORT || 3000); //3항연산자 줄임표현
app.get("/home", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<h1>지호짱</h1>");
  res.end(); //무한루프 방지
});

//bodyParser 미들웨어 설정 - express의 설정으로 변경
//POST 요청 방식에서 body의 파라미터 사용 가능
app.use(express.json()); //application/json
app.use(express.urlencoded({ extended: true })); //application/x-www-form-urlencoded

const carList = [
  { no: 1, title: "sonata", price: 2000, company: "hyundai", year: "2022" },
  { no: 2, title: "test", price: 2, company: "test", year: "2023" },
  { no: 3, title: "test2", price: 3, company: "test2", year: "2024" },
];

//ejs 템플릿 뷰 엔진 사용
app.get("/car", (req, res) => {
  let userName = "양지호";
  req.app.render("car", { userName, carList }, (err, data) => {
    if (err) {
      return;
    }
    res.end(data);
  });
});

const todoList = [
  { idx: 1, title: "hello", done: false },
  { idx: 2, title: "world", done: false },
  { idx: 3, title: "node공부", done: false },
];

app.get("/todoList", (req, res) => {
  console.log("GET - /todoList");
  req.app.render("todoList", { todoList: todoList }, (err, data) => {
    // console.log("data", data);
    res.end(data);
  });
});

app.post("/todoList", (req, res) => {
  var newItem = req.body.newItem;
  res.redirect("/todoList");
});

//http와 express를 합쳐준다 (같은 포트를 사용함)
const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중");
});
