import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import { Outlet } from "react-router-dom";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 10%;
  position: sticky;
  background-color: #faebd7;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ul li {
    list-style: none;
    display: table;
    margin: 0 auto;
  }
  ul {
    display: flex;
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
      <BarContainer className="123">
        <ul>
          <li onClick={() => navigate("/products")}>產品總覽</li>
          <li onClick={() => navigate("/vip")}>會員專區</li>
          <li onClick={() => navigate("/contactUs")}>聯絡我們</li>
          <li onClick={() => navigate("/signUp")}>註冊</li>
        </ul>
      </BarContainer>
      <Outlet />
    </AppContainer>
  );
};
export default AppFrame;
