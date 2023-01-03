import React from "react";
import { useWeb } from "./hooks/useWeb";
const Google = () => {
  const { CRUD } = useWeb();
  return (
    <button
      onClick={() => {
        CRUD("R", "/auth/google")();
      }}
    >
      Google
    </button>
  );
};

export default Google;
