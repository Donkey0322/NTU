import React from "react";

const Footer = ({ todo, setTodo, counter, setStatus }) => {
  let complete = false;
  for (let i of todo) {
    if (i.status == "completed") {
      complete = true;
      break;
    }
  }
  const display = () => {
    if (complete) {
      return;
    } else {
      return { visibility: "hidden" };
    }
  };
  const Clean = () => {
    setTodo(todo.filter((m) => m.status === "active"));
  };

  if (todo.length) {
    return (
      <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">{counter} left</div>
        <ul className="todo-app__view-buttons">
          <button onClick={() => setStatus("All")}>All</button>
          <button onClick={() => setStatus("active")}>Active</button>
          <button onClick={() => setStatus("completed")}>Completed</button>
        </ul>
        <div className="todo-app__clean" style={display()}>
          <button onClick={Clean}>Clear Completed</button>
        </div>
      </footer>
    );
  }
};

export default Footer;
