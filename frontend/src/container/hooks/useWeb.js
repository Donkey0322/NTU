import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback
} from "react";
import axios from "axios";
import {useCookies} from 'react-cookie'
const instance = axios.create({ baseURL: "http://localhost:4000/" });
const WebContext = createContext({
  page: 0, //顯示是在第幾頁 table
  rowsPerPage: 10, //一頁包含幾個 tuple
  path: "",
  category: {},
  // customer_id: "",
  login: false,
  cartNumber: 0,
  CRUD: () => {}, //axios api
});


const WebProvider = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [path, setPath] = useState("");
  // const [customer_id, setCustomerID] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(['customer_id']);
  const [login, setLogin] = useState(cookies.customer_id ? true : false);
  const [cartNumber, setCartNumber] = useState();


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
            const {
              data: { result },
            } = await instance.get(`${path}`, {params: value});

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
        // customer_id,
        login,
        cartNumber,
        cookies,
        setCartNumber,
        setPage,
        setRowsPerPage,
        setPath,
        CRUD,
        // setCustomerID,
        setLogin,
        setCookie,
        removeCookie
      }}
      {...props}
    />
  );
};

const useWeb = () => useContext(WebContext);

export { WebProvider, useWeb };
