const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer();
server.listen(3000, () => {
  console.log("Node.js 서버 실행 중...");
});

server.on("request", (req, res) => {
  if (read.url === "/") {
    res.write("<h1>지호짱</h1>");
  }
  if (read.url === "/house") {
    let filename = "./public/house.jpg";
    fs.readFile(filename, function (err, data) {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": image / jpg });
      res.write(data);
      res.end();
    });
  }
});
