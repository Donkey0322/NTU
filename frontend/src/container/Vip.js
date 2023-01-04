import React, { useState } from "react";
import Vip from "../components/Vip";
import { useLocation, useNavigate } from "react-router-dom";
import { useWeb } from "./hooks/useWeb";

const VipInfo = () => {
  //sideBar
  const location = useLocation();
  const currentPath = location.pathname;
  const { cookies, removeCookie, setLogin } = useWeb();
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
    setLogin(false);
    navigate("/");
  };
  const SIDEBAR = {
    currentPath,
    open,
    handleClickOpen,
    handleClose,
    toMain,
  };
  //end sideBar
  console.log(location.state);

  const [edit, setEdit] = useState(true);
  const [data, setData] = useState({
    // customer_id: cookies.customer_id,
    // customer_name: result.customer_name,
    // mail: result.mail,
    // phone_number: result.phone_number,
    // birthday: result.birthday,
  });
  const handleInputChange = (event) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setEdit(true);
  };

  const INFO = {
    edit,
    data,
    handleInputChange,
  };

  return <Vip SIDEBAR={SIDEBAR} INFO={INFO} />;
};

export default VipInfo;
