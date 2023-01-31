const express = require('express');
const app = express();

app.use(express.static('public'));

const carList= [];
let cnt = 1;

app.get('/car/input', function(req,res){
    // var name = req.query.name;
    // var price = req.query.price;
    // var company = req.query.company;
    // var year = req.query.year;

    // console.log(name,price,company,year);
    // console.log(req.query);
    // res.send(req.query);
    // end 문자열만 반환, send 객체를 반환

    req.query.no = cnt++;
    carList.push(req.query);

    res.send(carList);
});

app.listen(3000,function(){
    console.log("노드js 서버 실행 중 : 3000");
});