import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import StateController from "./StateController";
import StateView from "./StateView";

function App() {
  //useSelector 값 참조
  //dispatch 값 변경
  return (
    <div className="App">
      <h1>Hello world !!</h1>
      <StateView />
      <StateController />
    </div>
  );
}

export default App;
