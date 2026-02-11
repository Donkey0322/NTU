import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./styles.css";

const App = () => {
  let [todo, setTodo] = useState([]);
  let [counter, setCounter] = useState(0);
  let [status, setStatus] = useState("All");
  // let [complete, setStatus]
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header />
      <Main
        todo={todo}
        setTodo={setTodo}
        counter={counter}
        setCounter={setCounter}
        status={status}
      />
      <Footer
        todo={todo}
        setTodo={setTodo}
        counter={counter}
        setStatus={setStatus}
      />
    </div>
  );
};

export default App;
