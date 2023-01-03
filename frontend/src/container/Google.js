import React from "react";
import { useWeb } from "./hooks/useWeb";
import { useEffect, useState } from "react";
const google = async() => {
  window.open("http://localhost:4000/auth/google", "_self");
};



const Google = () => {
  const { CRUD } = useWeb();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:4000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          console.log(response)
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log(resObject)
          setUser(resObject.result[0].customer_name);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);



  return (
    <button
      onClick={google}
    >
      Google
    </button>
  );
};

export default Google;
