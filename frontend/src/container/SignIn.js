import LogIn from "../components/LogIn";
import React, { useEffect, useState } from "react";
import { useWeb } from "./hooks/useWeb";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { CRUD, setLogin, setCustomerID, login } = useWeb();
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
    // const result = await CRUD("C", mode === "1" ? "/logIn" : "/signUp")(data);
    const res = await fetch(
      `http://localhost:4000${mode === "1" ? "/logIn" : "/signUp"}`,
      {
        method: "POST",
        body: JSON.stringify({ data }),
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },

      }
    );
    const result = await res.json();
    console.log(result);

    if (result.errors) {
      setError(result.errors);
    } else {
      setLogin(true);
      setCustomerID(result.customer_id);
      navigate("/");
    }
  };
  const handleGoogleClick = async() => {
    window.open("http://localhost:4000/auth/google", "_self");
    const res = await  fetch("http://localhost:4000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
    console.log(res);
  };

  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [login]);

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
      handleGoogleClick={handleGoogleClick}
      navigateToForgetPassword={navigateToForgetPassword}
      submit={handleClickSubmit}
    />
  );
};

export default SignIn;
