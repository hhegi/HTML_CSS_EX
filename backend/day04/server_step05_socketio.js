const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const multer = require("multer");
const fs = require("fs");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);

app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));

//post 전송 방식으로 사용하기 때문에 bodyParser가 먼저 선언되어야 한다.
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

// 파일 제한 : 10개, 1GB이하로 제한
let upload = multer({
  storage: storage,
  limit: {
    files: 10,
    fileSize: 1024 * 1024 * 1024,
  },
});

//클라이언트가 socket으로 접속하면 실행
io.sockets.on("connection", (socket) => {
  // socket.remoteAddress = socket.request.connection._peername.address;
  // socket.remotePort = socket.request.connection._peername.port;

  socket.on("hi", (data) => {
    console.log("client : ", data);
  });

  //모든 소켓에 이벤트 전송
  io.sockets.emit("this", { will: "be received by everyone" });

  //private message - socket 매개 변수
  socket.on("private message", (from, msg) => {
    console.log("from: " + from, "msg: " + msg);
  });
});

/////// router -------
// Ajax를 이용한 채팅 기능
var messages = [];
app.get("/recieve", function (req, resp) {
  if (req.query.size >= messages.length) {
    resp.end();
  } else {
    var res = {
      total: messages.length,
      messages: messages.slice(req.query.size),
    };
    resp.end(JSON.stringify(res));
  }
});
app.get("/send", function (req, resp) {
  messages.push({
    sender: req.query.sender,
    message: req.query.message,
  });
  resp.end();
});

app.use("/", router);

/////// error handler -----
var expressErrorHandler = require("express-error-handler");
const { response } = require("express");
var errorHandler = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});
