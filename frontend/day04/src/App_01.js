import { useState } from "react";
import Car from "./App_01/Car";
import Hello from "./App_01/Hello";

//컴퍼넌트 선언
// function Car(props) {
//   return (
//     <h2>
//       I am {props.brand} {props.name}
//     </h2>
//   );
// }

//구조분해 할당 - 객체나 리스트이 요소를 바로 끄집어 내서 사용
// function Hello({ name, address, changeName }) {
//   return (
//     <h1>
//       Hello {name} in {address} !!
//       <br />
//       <button
//         onClick={function () {
//           changeName("Jiho");
//         }}
//       >
//         이름 바꾸기
//       </button>
//     </h1>
//   );
// }

function App_01() {
  // state 선언
  const [brand, setBrand] = useState("KIA");
  const [carName, setCarName] = useState("K7");
  const [user, setUser] = useState("지호");
  const [region, setRegion] = useState("DAEGU");

  function _changeName(newName) {
    setUser(newName);
  }

  function assignTest() {
    const target = { a: 1, b: 2 };
    const source = { b: 4, c: 5 };

    const returnedTarget = Object.assign(target, source);
  }
  function assignTest2() {
    const target = { a: 1, b: 2 };
    const source = [
      { b: 4, c: 5 },
      { b: 6, c: 7, d: 8 },
      { b: 9, c: 10, d: 11 },
      { b: 12, c: 13, d: 14, e: 15 },
    ];

    Object.assign(target, ...source);
    console.log(target);
  }

  function testSpread() {
    const arr = [1, 2, 3, 4];
    const newArr = [...arr, 5];
  }

  return (
    <div>
      {/* 컴퍼넌트 생성 */}
      <Car brand={brand} name={carName}></Car>
      <hr />
      <Hello name={user} address={region} changeName={_changeName}></Hello>
      <hr />
      <button
        onCanPlay={(event) => {
          assignTest();
        }}
      >
        assign test
      </button>
      <hr />
      <button onClick={assignTest2}>assign Test2</button>
      <hr />
      <button onClick={testSpread}>test spread</button>
    </div>
  );
}

export default App_01;
