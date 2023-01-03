import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:4000/" });

const WebContext = createContext({
  page: 0, //顯示是在第幾頁 table
  rowsPerPage: 10, //一頁包含幾個 tuple
  path: "",
  category: {},
  customerID: "",
  login: false,
  CRUD: () => {}, //axios api
});

const WebProvider = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [path, setPath] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [login, setLogin] = useState(false);

  const CRUD =
    (type, path) =>
    async (value = null) => {
      console.log(type, path);
      switch (type) {
        case "C":
          try {
            const {
              data: { result },
            } = await instance.post(`${path}`, value);
            if (typeof result !== "undefined") {
              return result;
            } else {
              alert("NO Result");
            }
          } catch (error) {
            alert("Axios失敗");
            throw error;
          }
        case "R":
          try {
            console.log(value);
            const {
              data: { result },
            } = await instance.get(`${path}`, value);
            if (typeof result !== "undefined") {
              return result;
            } else {
              alert("NO Result");
            }
          } catch (error) {
            alert("Axios失敗");
            throw error;
          }
        case "U":
          try {
            const {
              data: { result },
            } = await instance.put(`${path}`, { value });
            const newResult = [];
            if (typeof result !== "undefined") {
              return result;
            } else {
              alert("NO Result");
            }
          } catch (error) {
            alert("Axios失敗");
            throw error;
          }
        case "D":
          try {
            const {
              data: { result },
            } = await instance.delete(`${path}`, { params: { id: value } });
            if (typeof result !== "undefined") {
              return result;
            } else {
              alert("NO Result");
            }
          } catch (error) {
            alert("Axios失敗");
            throw error;
          }
        default:
          break;
      }
    };

  return (
    <WebContext.Provider
      value={{
        page,
        rowsPerPage,
        path,
        customerID,
        login,
        setPage,
        setRowsPerPage,
        setPath,
        CRUD,
      }}
      {...props}
    />
  );
};

const useWeb = () => useContext(WebContext);

export { WebProvider, useWeb };
