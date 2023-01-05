import React, { useState } from "react";
import Checkout_Board from "../components/Checkout";
import { useWeb } from "./hooks/useWeb";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

const Checkout = () => {
  const {
    state: { basket_id, sum },
  } = useLocation();
  const { cookies, CRUD } = useWeb();
  const [data, setData] = useState({
    order_date: new Date(),
    deliver_date: null,
    customer: cookies.customer_id,
    order_status: "備貨中",
    notes: null,
    basket_id,
  });
  const [send, setSend] = useState(false);
  const [time, setTime] = useState(dayjs());

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "deliver_date") setTime(value);
  };

  const handleCheckoutSubmit = async () => {
    try {
      setSend(true);
      await CRUD("C", "/orders_create")({ ...data, order_date: new Date() });
    } catch (err) {
      alert("有問題");
    }
  };
  return (
    <Checkout_Board
      send={send}
      data={data}
      sum={sum}
      handleInputChange={handleInputChange}
      handleCheckoutSubmit={handleCheckoutSubmit}
      time={time}
    />
  );
};
export default Checkout;
