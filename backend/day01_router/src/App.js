import logo from "./logo.svg";
import "./App.css";
import Header from "./inc/Head";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./inc/Profile";
import Gallery from "./inc/Gallery";
import Lecture from "./inc/Lecture";
import Contact from "./inc/Contact";
import Main from "./inc/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>Hello world</h1>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/lecture" element={<Lecture />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
