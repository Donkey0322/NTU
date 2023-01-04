import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppFrame from "./container/AppFrame";
import SignIn from "./container/SignIn";
import Products from "./container/Products";
import { ProductWithoutSortBar } from "./components/Products";
import styled from "styled-components";
import MainPage from "./container/MainPage";
import ProductDetail from "./container/ProductDetail";
import ShoppingCart from "./container/ShoppingCart";
import Checkout from "./container/Checkout";
import ContactUs from "./container/ContactUs";
import VipInfo from "./container/Vip";
import Order from "./container/Order";
import { useEffect, useState } from "react";
import Reset from "./container/Reset";
import Forget from "./container/Forget";
import { useWeb } from "./container/hooks/useWeb";

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgb(242, 233, 223);
  background-color: white;
`;

function App() {
  const { setLogin, setCookie } = useWeb();
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
          setLogin(true);
          setCookie("customer_id", resObject.result[0].customer_id, {
            path: "/",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppContainer>
              <AppFrame />
            </AppContainer>
          }
        >
          <Route
            path="/"
            element={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <MainPage />
                <ProductWithoutSortBar
                  style={{ justifyContent: "center", marginTop: "1vmin" }}
                />
              </div>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/products" element={<Products />}>
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/vipinfo" element={<VipInfo />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/forget" element={<Forget />} />

          {/* <Route path="/vip" element={<Vip />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
