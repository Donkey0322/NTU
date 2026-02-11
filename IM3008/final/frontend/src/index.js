import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import "antd/dist/antd.css";
import { DBProvider } from "./hooks/useDB";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DBProvider>
      <App />
    </DBProvider>
  </React.StrictMode>
);
