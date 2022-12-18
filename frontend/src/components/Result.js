import styled, { keyframes } from "styled-components";
import { useState } from "react";
import "./css/Modal.css";
import { fadesIn } from "../containers/hooks/useUX";

const spread = keyframes`
  from {
    width:0;
    opacity:0;
  }
  to{
    width:50%;
    opacity: 1;
  }
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  height: 50%;
  width: 50%;
  min-height: 50vmin;
  min-width: 50vmin;
  border-radius: 10vmin;
  background-color: ${({ win }) => (win ? "orange" : "gray")};
  border: 1rem solid ${({ win }) => (win ? "red" : "#454040")};
  animation: ${spread} 0.8s ease;
`;

const Inner = styled.div`
  display: grid;
  place-content: center;
  font-family: "Oswald", sans-serif;
  font-size: min(7vw, 10vmin);
  /* font-size: 8vw; */
  font-weight: 900;
  text-transform: uppercase;
  color: ${({ win }) => (win ? "yellow" : "red")};
  animation: ${fadesIn} 0.5s ease;
  & > div {
    grid-area: 1/1/-1/-1;
  }
`;

const Top = styled.div`
  clip-path: polygon(0% 0%, 100% 0%, 100% 48%, 0% 58%);
`;

const Bottom = styled.div`
  clip-path: polygon(0% 60%, 100% 50%, 100% 100%, 0% 100%);
  color: transparent;
  background: -webkit-linear-gradient(177deg, black 53%, var(--text-color) 65%);
  background: linear-gradient(177deg, #454040 53%, var(--text-color) 65%);
  background-clip: text;
  -webkit-background-clip: text;
  transform: translateX(-0.02em);
`;

const Button = styled.button`
  background-color: #0f0f4b;
  color: lightblue;
  border: 3px solid transparent;
  font-size: min(3vw, 4vmin);
  font-weight: 300;
  border-radius: 50vmin;
  height: 30%;
  width: 40%;
  margin-top: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    color: #0f0f4b;
    background-color: lightblue;
    border: 3px solid #0f0f4b;
  }
`;

const Result = ({ restartGame, win }) => {
  const [wait, setWait] = useState(true);
  return (
    <Outer
      win={win}
      onAnimationEnd={() => {
        setWait(false);
      }}
    >
      {!wait && (
        <>
          <Inner win={win}>
            <Top>{win ? "You WIN" : "YOU LOSE"}</Top>
            <Bottom aria-hidden="true">{win ? "YOU WIN" : "YOU LOSE"}</Bottom>
          </Inner>
          <Button
            onClick={() => {
              restartGame();
              setWait(true);
            }}
          >
            Play Again
          </Button>
        </>
      )}
    </Outer>
  );
};

export default Result;
