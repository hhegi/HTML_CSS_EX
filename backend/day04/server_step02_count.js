const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const multer = require("multer");
const fs = require("fs");

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

/////// router -------
//웹 counter 예제
let cnt = 0;
router.route("/count").get((req, res) => {
  console.log("Get - /count");
  cnt++;
  let date = new Date();
  let responseData = {
    cnt: cnt,
    dateStr:
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds(),
    date: date,
  };

  //   res.end(JSON.stringify({ cnt }));
  //res.end(); 매개변수로 문자열만 사용 가능!! JSON.stringify() JSON문자열로 변환해줌
  res.send({ responseData });
});

//웹 upload 예제
router.route("/process/photo").post(upload.array("photo", 1), (req, res) => {
  console.log("POST - /process/photo 호출 ...");
  console.log(req.files);

  res.end("file uploaded!");
});

app.use("/", router);

/////// error handler -----
var expressErrorHandler = require("express-error-handler");
var errorHandler = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});
