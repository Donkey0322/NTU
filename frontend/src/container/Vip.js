import React, { useState, useEffect } from "react";
import Vip from "../components/Vip";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useWeb } from "./hooks/useWeb";
import dayjs from "dayjs";

const VipInfo = () => {
  //sideBar
  const location = useLocation();
  const currentPath = location.pathname;
  const { cookies, removeCookie, setLogin, CRUD, setCartNumber } = useWeb();
  // console.log(Link);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const toMain = () => {
    removeCookie("customer_id", { path: "/" });
    removeCookie("session.sig", { path: "/" });
    removeCookie("session", { path: "/" });
    removeCookie("jwt", { path: "/" });
    setLogin(false);
    setCartNumber(0);
    navigate("/");
  };
  const handleGetInfo = async () => {
    try {
      const result = await CRUD(
        "R",
        "/customers"
      )({ customer_id: cookies.customer_id });
      setValue(result[0]);
    } catch (err) {
      alert("有問題");
    }
  };
  const SIDEBAR = {
    currentPath,
    open,
    handleClickOpen,
    handleClose,
    toMain,
    handleGetInfo,
  };
  //end sideBar
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(
    location.state && location.state.result[0] ? location.state.result[0] : null
  );
  const [time, setTime] = useState(dayjs());
  const [data, setData] = useState({
    customer_id: cookies.customer_id,
    customer_name: value.customer_name,
    mail: value.mail,
    phone_number: value.phone_number,
    birthday: value.birthday,
  });
  const [init, setInit] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "birthday") console.log(event.target.value.$d);
    setData((prev) => ({
      ...prev,
      [name]: name === "birthday" ? value.$d : value,
    }));
    if (name === "birthday") setTime(value);
    setEdit(true);
  };
  const handleUpdateInfo = async () => {
    try {
      const result = await CRUD("U", "/customers")(data);
      setValue(result[0]);
      setEdit(false);
    } catch (err) {
      alert("有問題");
    }
  };

  useEffect(() => {
    const handleInFo = async () => {
      try {
        const result = await CRUD(
          "R",
          "/customers"
        )({ customer_id: cookies.customer_id });
        console.log("GET INFO", result[0]);
        setValue(result[0]);
        setData(result[0]);
        setEdit(false);
        setTime(new Date(result[0].birthday));
      } catch (err) {
        alert("有問題");
      }
    };
    if (init) handleInFo();
    setInit(true);
  }, [init]);

  const INFO = {
    edit,
    data,
    time,
    handleInputChange,
    handleUpdateInfo,
  };

  return <Vip SIDEBAR={SIDEBAR} INFO={INFO} />;
};

export default VipInfo;
