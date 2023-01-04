import LogIn from "../components/LogIn";
import React, { useEffect, useState } from "react";
import { useWeb } from "./hooks/useWeb";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { setLogin, login, setCookie} = useWeb();
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [mode, setMode] = useState("1");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleInputChange1 = (event) => {
    setPass1(event.target.value);
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleInputChange2 = (event) => {
    setPass2(event.target.value);
  };
  const handleChange = () => {
    setChecked(!checked);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleModeChange = (_, newValue) => {
    setMode(newValue);
    setError(false)
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
    if(pass1 !== pass2) return
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
    )
    const { result } = await res.json();
    console.log('login~~', result);

    if (result.errors) {
      setError(result.errors);
    } else {
      setLogin(true);
      console.log(result[0]);
      // setCustomerID(result[0].customer_id);
      setCookie('customer_id', result[0].customer_id, { path: '/' })
      navigate("/");
    }
  };
  const handleGoogleClick = async() => {
    window.open("http://localhost:4000/auth/google", "_self");
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
      handleChange={handleChange}
      checked={checked}
      handleInputChange1={handleInputChange1}
      handleInputChange2={handleInputChange2}
      pass1={pass1}
      pass2={pass2}
    />
  );
};

export default SignIn;
