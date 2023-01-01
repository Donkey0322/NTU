import React from "react";
import styled from "styled-components";
import { useNavigate, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
// import { Outlet } from "react-router-dom";

const AppContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 10vmin;
  min-height: 50px;
  position: sticky;
  background-color: #06065e;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ul {
    display: flex;
    li {
      list-style: none;
      display: table;
      margin: 0 auto;
      cursor: pointer;
    }
  }
  // ul {
  //     margin: 3% 30%;
  //     justify-content: space-between;
  // }
  // li {
  //     list-style: none;
  //     display: inline-block;
  //     color: #ccc;
  // }
`;

const AppFrame = () => {
  const navigate = useNavigate();
  return (
    <AppContainer>
      <Logo img={require("../images/logo.jpg")} />
      <BarContainer>
        <ul>
          <li onClick={() => navigate("/products")}>產品總覽</li>
          <li onClick={() => navigate("/vip")}>會員專區</li>
          <li onClick={() => navigate("/contactUs")}>聯絡我們</li>
        </ul>
      </BarContainer>
      <Outlet />
    </AppContainer>
  );
};
export default AppFrame;
