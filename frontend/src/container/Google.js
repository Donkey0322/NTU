import React from "react";
import { useWeb } from "./hooks/useWeb";
const google = () => {
  window.open("http://localhost:4000/auth/google", "_self");
};
const Google = () => {
  const { CRUD } = useWeb();
  return (
    <button
      onClick={google}
    >
      Google
    </button>
  );
};

export default Google;
