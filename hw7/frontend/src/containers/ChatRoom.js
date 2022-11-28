import React, { useState } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import ChatModal from "../components/ChatModal";
import { useChat } from "./hook/useChat";
import { Input, Tabs } from "antd";
import useRoom from "./hook/useRoom";

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const ChatRoom = () => {
  const { me, sendMessage, displayStatus, startChat } = useChat();
  const { chatBoxes, activeKey, setActiveKey, createChatBox, removeChatBox } =
    useRoom();
  const [modalOpen, setModalOpen] = useState(false);
  const [body, setBody] = useState("");

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
            setModalOpen(false);
          }}
          onCancel={() => {
            setModalOpen(false);
          }}
        />
      </>
      <Input.Search
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
        }}
      ></Input.Search>
    </>
  );
};

export default ChatRoom;
