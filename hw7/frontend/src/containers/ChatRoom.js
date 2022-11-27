import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";
import { useChat } from "./hook/useChat";
import { Input, Tabs } from "antd";

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const ChatBoxWrapper = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const FootRef = styled.div`
  height: 20px;
`;

const ChatRoom = () => {
  const { me, messages, sendMessage, clearMessages, displayStatus, startChat } =
    useChat();
  const [modalOpen, setModalOpen] = useState(false);
  const [body, setBody] = useState("");
  const [chatBoxes, setChatBoxes] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const bodyRef = useRef(null);
  const msgFooter = useRef(null);

  const renderChat = () =>
    messages.length === 0 ? (
      <p style={{ color: "#ccc" }}> No messages... </p>
    ) : (
      <ChatBoxWrapper>
        {messages.map(({ name, body }, i) => (
          <Message isMe={name === me} message={body} key={i}></Message>
        ))}
        <FootRef ref={msgFooter} />
      </ChatBoxWrapper>
    ); // 產⽣ messages 的 DOM nodes

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
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
    if (chatBoxes.length !== 0) {
      let ID = chatBoxes.findIndex(({ key }) => key === activeKey);
      let newChatBox = chatBoxes[ID];
      newChatBox.children = renderChat();
      setMsgSent(true);
    }
  }, [messages]);

  const removeChatBox = (targetKey, activeKey) => {
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
  return (
    <>
      <Title name={me}></Title>
      <>
        <ChatBoxesWrapper
          tabBarStyle={{ height: "36px" }}
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
            startChat(me, key);
            renderChat();
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") setModalOpen(true);
            else if (action === "remove") {
              setActiveKey(removeChatBox(targetKey, activeKey));
            }
          }}
          items={chatBoxes}
        ></ChatBoxesWrapper>
        <ChatModal
          open={modalOpen}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name));
            renderChat();
            setModalOpen(false);
          }}
          onCancel={() => {
            setModalOpen(false);
          }}
        />
      </>
      <Input.Search
        ref={bodyRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter a username and a message body.",
            });
            return;
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.",
            });
            setBody("");
            return;
          }
          sendMessage(me, activeKey, msg);
          setBody("");
          setMsgSent(true);
        }}
      ></Input.Search>
    </>
  );
};

export default ChatRoom;
