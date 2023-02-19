import React, { useState } from "react";
import "./App.css";

// 과제 1: 최소선 기능 추가
// 과제 2: todoList 데이터를 LocalStorage에 저장

function ItemRow({ item, removeItem }) {
  return (
    <li>
      <p>
        <input type="checkbox" />
        <input type="text" value={item.title} disabled />
        <button
          onClick={(e) => {
            removeItem(item.no);
          }}
        >
          DEL
        </button>
      </p>
    </li>
  );
}

function InputItem({ appendItem }) {
  // input의 value로 사용 할 경우 useState 초기값이 선언되어야한다
  const [itemContents, setNewWork] = useState("");
  return (
    <div>
      LIST :
      <input
        type="text"
        value={itemContents}
        onChange={(e) => {
          setNewWork(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          appendItem(itemContents);
        }}
      >
        Add
      </button>
    </div>
  );
}

// 반복 호출 redux로 해결
function TodoList({ todoList, removeItem }) {
  return (
    <div>
      <ul>
        {todoList.map((item, idx) => {
          return <ItemRow key={item.no} item={item} removeItem={removeItem} />;
        })}
      </ul>
    </div>
  );
}

function App(props) {
  const [todoList, setTodoList] = useState([
    { no: 1, title: "아침 먹기", done: false },
    { no: 2, title: "점심 먹기", done: false },
    { no: 3, title: "저녁 먹기", done: false },
    { no: 4, title: "복습하기", done: false },
  ]);
  const [noCount, setNoCount] = useState(5);

  function appendItem(newItem) {
    setTodoList([
      ...todoList,
      {
        no: noCount,
        title: newItem,
        done: false,
      },
    ]);
    setNoCount(noCount + 1);
  }
  function removeItem(no) {
    var newList = todoList.filter((item, idx) => {
      return item.no != no;
    });
    setTodoList(newList);
  }
  return (
    <>
      <h1>Todo List</h1>
      <InputItem appendItem={appendItem} />
      <hr />
      <TodoList todoList={todoList} removeItem={removeItem} />
    </>
  );
}

export default App;
