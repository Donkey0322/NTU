import "./App.css";
import { useGame } from "./hooks/useGame";
import styled from "styled-components";
import GameRoom from "./GameRoom";
import SignIn from "./SignIn";

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: auto;
`;

const App = () => {
  const { participant } = useGame();
  return <Wrapper>{participant ? <GameRoom /> : <SignIn />}</Wrapper>;
};
export default App;
