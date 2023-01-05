import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const instance = axios.create({ baseURL: "http://localhost:4000/" });
const WebContext = createContext({
  login: false,
  cartNumber: 0,
  CRUD: () => {}, //axios api
});

const WebProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["customer_id"]);
  const [login, setLogin] = useState(cookies.customer_id ? true : false);
  const [cartNumber, setCartNumber] = useState(0);

  const CRUD =
    (type, path) =>
    async (value = null) => {
      console.log(type, path);
      switch (type) {
        case "C":
          try {
            console.log(value);
            const {
              data: { result },
            } = await instance.post(`${path}`, value);
            if (typeof result !== "undefined") {
              return result;
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
            } = await instance.get(`${path}`, { params: value });

            if (typeof result !== "undefined") {
              console.log(result);
              return result;
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
            console.log(value);
            const {
              data: { result },
            } = await instance.put(`${path}`, value);
            if (typeof result !== "undefined") {
              return result;
            }
          } catch (error) {
            alert("Axios失敗");
            throw error;
          }
          break;
        case "D":
          console.log(value);
          try {
            const {
              data: { result },
            } = await instance.delete(`${path}`, { params: value });
            if (typeof result !== "undefined") {
              return result;
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

  useEffect(() => {
    const Render = async () => {
      try {
        const newItem = await CRUD(
          "R",
          "/basket"
        )({ customer_id: cookies.customer_id });
        setCartNumber(newItem && newItem.length);
      } catch (err) {
        console.log("有問題");
      }
    };
    if (cookies.customer_id) {
      Render();
    }
  }, [cookies.customer_id]);

  return (
    <WebContext.Provider
      value={{
        login,
        cartNumber,
        cookies,
        setCartNumber,
        CRUD,
        // setCustomerID,
        setLogin,
        setCookie,
        removeCookie,
      }}
      {...props}
    />
  );
};

const useWeb = () => useContext(WebContext);

export { WebProvider, useWeb };
