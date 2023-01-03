import LogIn from "../components/LogIn";
import React, { useState } from "react";
import { useWeb } from "./hooks/useWeb";

const SignIn = () => {
  const { CRUD } = useWeb();
  const [data, setData] = useState({});
  const [login, setLogin] = useState();
  const [mode, setMode] = useState("1");
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <LogIn
      data={data}
      mode={mode}
      // result={result}
      // setResult={setResult}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      handleModeChange={handleModeChange}
      handleInputChange={handleInputChange}
      submit={CRUD("C", mode === "1" ? "/logIn" : "/signUp")}
    />
  );
};

export default SignIn;
