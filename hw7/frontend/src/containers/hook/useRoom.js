import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Message from "../../components/Message";
import { useChat } from "./useChat";

const ChatBoxWrapper = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const FootRef = styled.div`
  height: 20px;
`;

const useRoom = () => {
  const { me, messages, resetDB, setResetDB, startChat } = useChat();
  const [chatBoxes, setChatBoxes] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const [msgSent, setMsgSent] = useState(false);

  useEffect(() => {
    setChatBoxes([]);
    setActiveKey("");
    setMsgSent(false);
    setResetDB(false);
  }, [resetDB]);

  const scrollToBottom = () => {
    const tag = document.getElementById(activeKey);
    console.log(`${me} : ${tag}`);
    tag?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useEffect(() => {
    if (msgSent) {
      scrollToBottom();
      setMsgSent(false);
    }
  }, [msgSent]);

  const createChatBox = (friend) => {
    if (chatBoxes.some(({ key }) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    startChat(me, friend);
    setChatBoxes([...chatBoxes, { label: friend, children: [], key: friend }]);
    setMsgSent(true);
    return friend;
  };

  useEffect(() => {
    console.log("Hi");
  }, [activeKey]);

  const removeChatBox = (targetKey) => {
    const index = chatBoxes.findIndex(({ key }) => key === activeKey);
    const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
    setChatBoxes(newChatBoxes);
    let newKey = activeKey
      ? activeKey === targetKey
        ? index === 0
          ? chatBoxes.length > 1
            ? chatBoxes[1].key
            : ""
          : chatBoxes[index - 1].key
        : activeKey
      : "";
    if (activeKey !== newKey) {
      startChat(me, newKey);
    }
    return newKey;
  };

  const renderChat = () => {
    return messages.length === 0 ? (
      <p style={{ color: "#ccc" }}> No messages... </p>
    ) : (
      <ChatBoxWrapper>
        {messages.map(({ name, body }, i) => (
          <Message isMe={name === me} message={body} key={i}></Message>
        ))}
        <FootRef id={activeKey} />
      </ChatBoxWrapper>
    ); // 產⽣ messages 的 DOM nodes}
  };

  useEffect(() => {
    if (chatBoxes.length !== 0) {
      let ID = chatBoxes.findIndex(({ key }) => key === activeKey);
      let newChatBox = chatBoxes[ID];
      newChatBox.children = renderChat();
      setMsgSent(true);
    }
  }, [messages]);

  return {
    chatBoxes,
    activeKey,
    setActiveKey,
    createChatBox,
    removeChatBox,
    renderChat,
  };
};

export default useRoom;
