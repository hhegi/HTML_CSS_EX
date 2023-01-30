/*var http = require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(3000);*/



const http = require('http');

const server = http.createServer(function(req,res){
    res.end("<h1>Hello Nodejs world</h2>");
});

server.listen(3000,function(){
    console.log("nodejs 서버 실행 중...")
});