import React, { useState } from "react";

function App(props) {
  const [fruitArr, setFruitArr] = useState(["grape", "banana", "melon"]);
  const [newFruit, setNewFruit] = useState("apple");

  return (
    <>
      <ul>
        <h1>App_02</h1>
        <p>
          <input
            type="text"
            value={newFruit}
            onChange={(e) => {
              setNewFruit(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              setFruitArr([...fruitArr, newFruit]);
              setNewFruit("");
            }}
          >
            ADD
          </button>
        </p>
        {fruitArr.map((fruit, index) => {
          return <li key={index}>{fruit}</li>;
        })}
      </ul>
    </>
  );
}

export default App_02;
