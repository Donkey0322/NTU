import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Button, Input, message, Tag } from "antd";
import { useGame } from "./hooks/useGame";
import styled from "styled-components";
import Title from "../components/Title";
import GameRoom from "./GameRoom";
import SignIn from "./SignIn";
import EndPage from "./EndPage";
import Wait from "./Wait";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const App = () => {
  const { signedIn, over, participant } = useGame();

  return (
    <Wrapper>
      {signedIn ? (
        over ? (
          <EndPage />
        ) : participant ? (
          <GameRoom />
        ) : (
          <Wait />
        )
      ) : (
        <SignIn />
      )}
    </Wrapper>
  );
};
export default App;
