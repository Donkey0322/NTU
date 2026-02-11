import React, { useState } from "react";
import Item from "./Item";

const Main = ({ todo, setTodo, counter, setCounter, status }) => {
  let [input, setInput] = useState("");
  let [id, setId] = useState(1);
  const Submit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input) {
        setTodo([...todo, { detail: input, id: id, status: "active" }]);
        setId(id + 1);
        setCounter(counter + 1);
      }
      setInput("");
    }
  };

  const Input = (e) => {
    setInput(e.target.value);
  };

  const Status = (m) => {
    if (status !== "All") {
      return m.status === status;
    } else return true;
  };

  const display = () => {
    if (counter) {
      return;
    } else {
      return { display: "none" };
    }
  };

  return (
    <section className="todo-app__main">
      <input
        type="text"
        id="todo-input"
        className="todo-app__input"
        placeholder="What needs to be done?"
        onKeyPress={Submit}
        onChange={Input}
        value={input}
      />
      <ul id="todo-list" className="todo-app__list" style={display()}>
        {todo.filter(Status).map((item) => (
          <Item
            item={item}
            todo={todo}
            setTodo={setTodo}
            key={item.id}
            counter={counter}
            setCounter={setCounter}
          />
        ))}
      </ul>
    </section>
  );
};

export default Main;
