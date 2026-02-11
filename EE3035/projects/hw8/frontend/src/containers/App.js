// import "./App.css";
import { useEffect } from "react";
import { useChat } from "./hook/useChat";
import ChatRoom from "./ChatRoom";
import SignIn from "./SignIn";
import styled from "styled-components";
import { Button } from "antd";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const ButtonWrapper = styled.div`
  width: 80%;
  overflow: auto;
  /* margin: 20px; */
  padding: 20px;
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  justify-content: space-around;
  align-items: center;
`;

const App = () => {
  const { status, signedIn, displayStatus, clearDB } = useChat();
  useEffect(() => {
    displayStatus(status);
  }, [status]);
  return (
    <Wrapper>
      {/* <ButtonWrapper>
        <Button
          type="primary"
          size="large"
          danger
          disabled={false}
          onClick={() => {
            clearDB();
          }}
        >
          Clear Database
        </Button>
      </ButtonWrapper> */}
      {signedIn ? <ChatRoom /> : <SignIn />}{" "}
    </Wrapper>
  );
};

export default App;
