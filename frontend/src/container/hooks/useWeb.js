import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:4000/" });

const WebContext = createContext({
  page: 0, //顯示是在第幾頁 table
  rowsPerPage: 10, //一頁包含幾個 tuple
  path: "",
  category: {},
  customer_id: "",
  login: false,
  CRUD: () => {}, //axios api
});

const WebProvider = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [path, setPath] = useState("");
  const [customer_id, setCustomerID] = useState("");
  const [login, setLogin] = useState(false);

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
          console.log(response);
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log(resObject);
          setCustomerID(resObject.result[0].customer_id);
          setLogin(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (!customer_id) {
      getUser();
    }
  }, []);

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
              console.log(result);
              alert("NO Result");
            }
          } catch (err) {
            const {
              data: { errors },
            } = err.response;
            if (errors) {
              console.log(errors);
              return { errors };
            } else throw err;
          }
          break;
        case "R":
          try {
            console.log(value);
            const {
              data: { result },
            } = await instance.get(`${path}`, value);
            if (typeof result !== "undefined") {
              console.log(result);
              return result;
            } else {
              alert("NO Result");
            }
          } catch (err) {
            const {
              data: { errors },
            } = err;
            if (errors) {
              console.log(errors);
              return { errors };
            } else throw err;
          }
          break;
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
          break;
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
          break;
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
        customer_id,
        login,
        setPage,
        setRowsPerPage,
        setPath,
        CRUD,
        setCustomerID,
        setLogin,
      }}
      {...props}
    />
  );
};

const useWeb = () => useContext(WebContext);

export { WebProvider, useWeb };
