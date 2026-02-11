import React from "react";
import styled from "styled-components";
import { useNavigate, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { useWeb } from "./hooks/useWeb";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

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
  min-height: 80px;
  /* margin-bottom: 5%; */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  font-weight: 900;
  ul.big {
    width: 100%;
    height: 50%;
    align-items: center;
    justify-content: center;
    background-color: RosyBrown;
    display: flex;
    li {
      list-style: none;
      display: table;
      margin: 0 auto;
      cursor: pointer;
      transition: all 200ms;
      &:hover {
        /* text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
          0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000; */
        color: black;
      }
    }
  }
  .hide {
    display: none;
    &:hover {
      display: block;
    }
  }
  .member:hover ~ .member {
    display: block;
  }
`;

const Header = styled.div`
  background-color: OldLace;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: visible;
  position: sticky;
  top: -10px;
  z-index: 100;
  height: 20vmin;
`;

const Num = styled.div`
  width: 2vmin;
  height: 2vmin;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -0;
  left: -1vmin;
  background-color: gray;
  border-radius: 50%;
  font-size: calc(1vmin / 2);
  p {
    color: white;
  }
`;

const AppFrame = () => {
  const navigate = useNavigate();
  const { CRUD, login, cookies, cartNumber } = useWeb();
  const checkLogin1 = async () => {
    try {
      if (login) {
        const result = await CRUD(
          "R",
          "/customers"
        )({ customer_id: cookies.customer_id });
        navigate("/vipinfo", { state: { result } });
      } else {
        navigate("/signin");
      }
    } catch (err) {
      console.log("有問題");
    }
  };
  const checkLogin2 = () => {
    if (login) {
      navigate("/shoppingcart");
    } else {
      navigate("/signin");
    }
  };

  return (
    <AppContainer>
      <Header>
        <div className="logo" onClick={() => navigate("/")}>
          <Logo img={require("../images/logo.jpg")} />
        </div>

        <BarContainer>
          <ul className="big">
            <li onClick={() => navigate("/products")}>
              <p>產品總覽</p>
            </li>
            <li onClick={() => checkLogin1()}>
              <p>會員專區</p>
            </li>
            <li onClick={() => navigate("/contactUs")}>
              <p>聯絡我們</p>
            </li>
            <li onClick={() => checkLogin2()} style={{ position: "relative" }}>
              {cartNumber > 0 && (
                <Num>
                  <p>{cartNumber}</p>
                </Num>
              )}
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "1vmin",
                }}
              >
                <ShoppingCartOutlinedIcon />
                購物車
              </p>
            </li>
          </ul>
        </BarContainer>
      </Header>
      <Outlet />
    </AppContainer>
  );
};
export default AppFrame;
