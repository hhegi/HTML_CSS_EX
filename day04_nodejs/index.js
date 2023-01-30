const express = require('express');
const app = express();


app.get('/', function (req, res) {
    //function() 대신 ()=> 사용 가능 
    res.end("Home page");
});

app.get('/profile',(req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"})
    res.end("<h1>프로필 페이지</h1>");
});

app.get("/car",(req,res)=>{
    //쿼리스트링으로 전달된 파라미터마다 받아오기
    let name = req.params.name;
    let year = req.params.year;
    console.log(name,year);
    
    res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"})
    res.end("<h1>자동차 목록 페이지</h1>");

})


app.listen(3000,()=>{
    console.log("서버 실행 중...");
});