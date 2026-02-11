import React, { useState } from "react";
import Checkout_Board from "../components/Checkout";
import { useWeb } from "./hooks/useWeb";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Checkout = () => {
  const navigate = useNavigate();
  const toMain = () => {
    setSend(false);
    navigate("/");
  };
  const toVip = () => {
    setSend(false);
    navigate("/vipinfo");
  };
  const {
    state: { basket_id, sum },
  } = useLocation();
  const { cookies, CRUD, setCartNumber } = useWeb();
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
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "deliver_date") setTime(value);
    if (name === "deliver_method") {
      setData((prev) => ({
        ...prev,
        deliver_date: null,
        deliver_location: null,
      }));
    }
  };

  const handleCheckoutSubmit = async () => {
    try {
      setSend(true);
      setCartNumber((prev) => prev - basket_id.length);
      await CRUD("C", "/orders_create")({ ...data, order_date: new Date() });
    } catch (err) {
      console.log("有問題");
    }
  };
  return (
    <Checkout_Board
      toMain={toMain}
      toVip={toVip}
      checked={checked}
      handleChange={handleChange}
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
