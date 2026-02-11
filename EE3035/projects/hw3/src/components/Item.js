import React from "react";

const Item = ({ item, todo, setTodo, counter, setCounter }) => {
  const Status_switch = (e) => {
    let style = e.target.parentElement.nextElementSibling.style;
    let newStatus = todo.slice();
    console.log(newStatus);
    for (let n of newStatus) {
      if (n.id == item.id) {
        if (n.status == "active") {
          n.status = "completed";
          setCounter(counter - 1);
          style.textDecoration = "line-through";
          style.opacity = "0.5";
        } else {
          n.status = "active";
          setCounter(counter + 1);
          style.textDecoration = null;
          style.opacity = null;
        }
      }
    }
    setTodo(newStatus);
  };

  const Close = () => {
    setTodo(todo.filter((m) => m.id !== item.id));
    if (item.status !== "completed") {
      setCounter(counter - 1);
    }
  };

  const Style = () => {
    if (item.status == "completed") {
      return { textDecoration: "line-through", opacity: "0.5" };
    } else {
      return;
    }
  };

  return (
    <li className="todo-app__item">
      <div className="todo-app__checkbox">
        <input
          id={item.id}
          type="checkbox"
          onClick={Status_switch}
          defaultChecked={item.status == "completed"}
        />
        <label htmlFor={item.id}></label>
      </div>
      <h1 className="todo-app__item-detail" style={Style()}>
        {item.detail}
      </h1>
      <img src="x.png" alt="x" className="todo-app__item-x" onClick={Close} />
    </li>
  );
};

export default Item;
