import React from "react";
import { useState, useEffect } from "react";
import Cart from "../components/Cart";

const item = [
  {
    cart_id: 1,
    name: "抹茶可麗露",
    src: require("../images/canele-2-1.png"),
    price: 80,
    summary: 5,
    quantity: 0,
    chosen: false,
  },
  {
    cart_id: 2,
    name: "抹茶可麗露",
    src: require("../images/canele-2-1.png"),
    price: 80,
    summary: 8,
    quantity: 0,
    chosen: false,
  },
  {
    cart_id: 3,
    name: "抹茶可麗露",
    src: require("../images/canele-2-1.png"),
    price: 80,
    summary: 15,
    quantity: 0,
    chosen: false,
  },
  {
    cart_id: 4,
    name: "抹茶可麗露",
    src: require("../images/canele-2-1.png"),
    price: 80,
    summary: 1,
    quantity: 0,
    chosen: false,
  },
  {
    cart_id: 5,
    name: "抹茶可麗露",
    src: require("../images/canele-2-1.png"),
    price: 80,
    summary: 4,
    quantity: 0,
    chosen: false,
  },
];

const ShoppingCart = () => {
  const [items, setItems] = useState(item);
  const [sum, setSum] = useState(0);
  const handleCartDetailCheck = (cart_id) => (event) => {
    let newitems = items.map((m) => {
      if (m.cart_id === cart_id) {
        return { ...m, chosen: event.target.checked };
      }
      return m;
    });
    setItems(newitems);
  };

  const handleCartDetailNum = (cart_id) => (event) => {
    let newitems = items.map((m) => {
      if (m.cart_id === cart_id) {
        return { ...m, quantity: event.target.value };
      }
      return m;
    });
    setItems(newitems);
  };

  useEffect(() => {
    let temp = 0;
    for (const i of items) {
      if (i.chosen) temp += i.price * i.quantity;
    }
    setSum(temp);
  }, [items]);

  return (
    <Cart
      items={items}
      sum={sum}
      handleCartDetailCheck={handleCartDetailCheck}
      handleCartDetailNum={handleCartDetailNum}
    />
  );
};
export default ShoppingCart;
