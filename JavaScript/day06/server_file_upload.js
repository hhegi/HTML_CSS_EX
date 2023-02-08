const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
//패키지 설치하기
const formidable = require('formidable');
const fs = require("fs");

//app.set("",value) -- setAttribute
//app.get(KeyValue) -- getAttribute
//app.get(path, callback()) -- 서버의 doGet
//app.post(path,callback()) -- 서버의 doPost
app.set("port", 3000);

// console.log(__dirname);

app.set("view engine", "ejs");
app.set("views", __dirname + "/template");

app.use(cors());
app.use(express.static(__dirname+"/public"));

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.write("<h1>Hello World!</h1>");
    res.end();
})

app.post("/people/input",(req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.dir(fields);
      var oldpath = files.photo.filepath;
      var newpath = 'C:/Jiho/VSCode/HTML_CSS_EX/JavaScript/day06/public/upload' + files.photo.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
});

// http와 express의 결합 -- 같은 포트를 공유함
const server = http.createServer(app);
server.listen(app.get("port"), () => {
    console.log("서버 실행 중 - http://localhost:" + app.get("port"));
});