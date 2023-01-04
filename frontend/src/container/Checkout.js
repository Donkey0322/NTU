import React, { useState } from "react";
import Checkout_Board from "../components/Checkout";
import { useWeb } from "./hooks/useWeb";

const Checkout = () => {
  const { customer_id } = useWeb();
  const [data, setData] = useState({
    order_date: new Date(),
    deliver_date: null,
    customer: customer_id,
    order_status: "備貨中",
    notes: null,
    basket_id: [],
  });
  const [send, setSend] = useState(false);

  const handleInputChange = (event) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckoutSubmit = async () => {
    try {
      const result = await CRUD(
        "C",
        "/orders_create"
      )({ ...data, order_date: new Date() });
      setSend(true);
    } catch (err) {
      alert("有問題");
    }
  };
  return (
    <Checkout_Board
      send={send}
      data={data}
      handleInputChange={handleInputChange}
      handleCheckoutSubmit={handleCheckoutSubmit}
    />
  );
};
export default Checkout;
