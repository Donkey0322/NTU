import LogIn from "../components/LogIn";
import React, { useState } from "react";
import { useWeb } from "./hooks/useWeb";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { CRUD, setLogin, setCustomerID } = useWeb();
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [mode, setMode] = useState("1");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleModeChange = (_, newValue) => {
    setMode(newValue);
  };
  const handleInputChange = (event) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClickSubmit = async () => {
    if (!data.mail || !data.password) {
      setError(false);
      if (!data.mail)
        setError((prev) => ({ ...prev, mail: "Please input a mail." }));
      if (!data.password)
        setError((prev) => ({ ...prev, password: "Please input a password." }));
      return;
    }
    setError(false);
    const result = await CRUD("C", mode === "1" ? "/logIn" : "/signUp")(data);
    console.log(result);
    if (result.errors) {
      setError(result.errors);
    } else {
      setLogin(true);
      setCustomerID(result.customer_id);
      navigate("/");
    }
  };
  const navigateToForgetPassword = () => navigate("/forget");
  return (
    <LogIn
      data={data}
      mode={mode}
      error={error}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      handleModeChange={handleModeChange}
      handleInputChange={handleInputChange}
      navigateToForgetPassword={navigateToForgetPassword}
      submit={handleClickSubmit}
    />
  );
};

export default SignIn;
