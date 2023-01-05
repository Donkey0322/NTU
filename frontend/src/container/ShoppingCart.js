import React from "react";
import { useState, useEffect } from "react";
import { useWeb } from "./hooks/useWeb";
import Cart from "../components/Cart";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [items, setItems] = useState(null);
  const [sum, setSum] = useState(0);
  const [basket_id, setBasketID] = useState([]);
  const { CRUD, cookies, setCartNumber } = useWeb();
  const navigate = useNavigate();
  useEffect(() => {
    const Render = async () => {
      try {
        const newItem = await CRUD(
          "R",
          "/basket"
        )({ customer_id: cookies.customer_id });
        console.log(newItem);
        setItems(newItem);
      } catch (err) {
        console.log("有問題");
      }
    };
    if (cookies.customer_id) {
      Render();
    }
  }, [cookies.customer_id]);

  const handleDeleteCart = async (basket_id) => {
    try {
      const newItem = await CRUD("D", "/basket")({ basket_id });
      setItems(newItem);
      setCartNumber((prev) => prev - 1);
    } catch (err) {
      alert("有問題");
    }
  };

  const handleCartSubmit = () => {
    if (basket_id.length > 0) {
      console.log(basket_id);
      navigate("/checkout", {
        state: { basket_id, sum },
      });
    }
  };

  const handleCartDetailCheck = (basket_id) => (event) => {
    let newitems = items.map((m) => {
      if (m.basket_id === basket_id) {
        if (event.target.checked) {
          setBasketID((prev) => [...prev, basket_id]);
        } else {
          setBasketID((prev) =>
            prev.filter((value) => {
              return value !== basket_id;
            })
          );
        }
        return { ...m, chosen: event.target.checked };
      }
      return m;
    });
    setItems(newitems);
  };

  const handleCartDetailNum = (basket_id) => async (event) => {
    try {
      if (event.target.value < 1) return;
      let newitems = items.map((m) => {
        if (m.basket_id === basket_id) {
          return { ...m, quantity: Number(event.target.value) };
        }
        return m;
      });
      console.log(newitems);
      setItems(newitems);
      await CRUD("U", "/basket")({ basket_id, quantity: event.target.value });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let temp = 0;
    if (items) {
      for (const i of items) {
        if (i.chosen) temp += i.price * i.quantity;
      }
      setSum(temp);
    }
  }, [items]);

  return (
    <Cart
      items={items}
      sum={sum}
      handleCartDetailCheck={handleCartDetailCheck}
      handleCartDetailNum={handleCartDetailNum}
      handleDeleteCart={handleDeleteCart}
      handleCartSubmit={handleCartSubmit}
    />
  );
};
export default ShoppingCart;
