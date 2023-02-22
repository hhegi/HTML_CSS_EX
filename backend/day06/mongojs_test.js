// mongojs 모듈을 이용한 monogdb 연동
const mongojs = require("mongojs");
const db = mongojs("vehicle", ["car"]);

console.log("car list");
db.car.find((err, data) => {
  console.log(data);
});
