import React from "react";
import { useState, useEffect } from "react";
import { useWeb } from "./hooks/useWeb";
import Cart from "../components/Cart";

const item = [
  {
    basket_id: 1,
    product_name: "抹茶可麗露",
    src: require("../images/canele-2-1.png"),
    price: 80,
    quantity: 5,
    number: 0,
    chosen: false,
  },
  {
    basket_id: 2,
    product_name: "抹茶可麗露",
    src: require("../images/canele-2-1.png"),
    price: 80,
    quantity: 8,
    number: 0,
    chosen: false,
  },
  {
    basket_id: 3,
    product_name: "抹茶可麗露",
    src: require("../images/canele-2-1.png"),
    price: 80,
    quantity: 15,
    number: 0,
    chosen: false,
  },
  {
    basket_id: 4,
    product_name: "抹茶可麗露",
    src: require("../images/canele-2-1.png"),
    price: 80,
    quantity: 1,
    number: 0,
    chosen: false,
  },
  {
    basket_id: 5,
    product_name: "抹茶可麗露",
    src: require("../images/canele-2-1.png"),
    price: 80,
    quantity: 4,
    number: 0,
    chosen: false,
  },
];

const ShoppingCart = () => {
  const [items, setItems] = useState(item);
  const [sum, setSum] = useState(0);
  const { CRUD, customer_id, login } = useWeb();

  useEffect(() => {
    const Render = async () => {
      try {
        const newItem = await CRUD("R", "/basket")({ customer_id });
        setItems(newItem);
      } catch (err) {
        console.log("有問題");
      }
    };
    console.log(customer_id);
    if (customer_id) {
      console.log(customer_id);
      Render();
    }
  }, [customer_id]);

  const handleDeleteCart = async (basket_id) => {
    try {
      const newItem = await CRUD("D", "/basket")(basket_id);
      setItems(newItem);
    } catch (err) {
      alert("有問題");
    }
  };

  const handleCartDetailCheck = (basket_id) => (event) => {
    let newitems = items.map((m) => {
      if (m.basket_id === basket_id) {
        return { ...m, chosen: event.target.checked };
      }
      return m;
    });
    setItems(newitems);
  };

  const handleCartDetailNum = (basket_id) => (event) => {
    let newitems = items.map((m) => {
      if (m.basket_id === basket_id) {
        return { ...m, number: event.target.value };
      }
      return m;
    });
    setItems(newitems);
  };

  useEffect(() => {
    let temp = 0;
    for (const i of items) {
      if (i.chosen) temp += i.price * i.number;
    }
    setSum(temp);
  }, [items]);

  return (
    <Cart
      items={items}
      sum={sum}
      handleCartDetailCheck={handleCartDetailCheck}
      handleCartDetailNum={handleCartDetailNum}
      handleDeleteCart={handleDeleteCart}
    />
  );
};
export default ShoppingCart;
