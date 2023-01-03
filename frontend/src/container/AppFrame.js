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
  .logo {
    cursor: pointer;
}
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
  ul.big{
    display: flex;
    li {
      list-style: none;
      display: table;
      margin: 0 auto;
      cursor: pointer;
    }
  }
  .hide {
    display: none;
    &:hover {
      display:block;
    }
  }
  .member:hover ~ .member{
    display:block;
  }
  
`;

const AppFrame = () => {
  const navigate = useNavigate();
  return (
    <AppContainer>
      <div className="logo" onClick={() => navigate("/")}>
        <Logo img={require("../images/logo.jpg")}/>
      </div>
      
      <BarContainer>
        <ul className="big">
          <li onClick={() => navigate("/products")}><p>產品總覽</p></li>
          <li onClick={() => navigate("/vipinfo")}><p>會員專區</p></li>
          <li onClick={() => navigate("/contactUs")}><p>聯絡我們</p></li>
          <li onClick={() => navigate("/shoppingcart")}><p>購物車</p></li>
          
        </ul>
      </BarContainer>
      <Outlet />
    </AppContainer>
  );
};
export default AppFrame;
