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
  const {
    me,
    messages,
    activeKey,
    setActiveKey,
    sendMessage,
    displayStatus,
    startChat,
    setMessages,
  } = useChat();
  const { chatBoxes, createChatBox, removeChatBox } = useRoom();
  const [modalOpen, setModalOpen] = useState(false);
  const [body, setBody] = useState("");

  function wait(func, value, method) {
    switch (method) {
      case "start":
        return new Promise((resolve, reject) => {
          console.log(value.me, value.key);
          resolve(
            func({
              variables: {
                name1: value.me,
                name2: value.key,
              },
            })
          );
        });
      case "send":
        return new Promise((resolve, reject) => {
          resolve(
            func({
              variables: {
                name: value.me,
                to: value.to,
                body: value.body,
              },
            })
          );
        });
      default:
        console.log(1);
        break;
    }
  }

  return (
    <>
      <Title name={me}></Title>
      <>
        <ChatBoxesWrapper
          tabBarStyle={{ height: "36px" }}
          type="editable-card"
          activeKey={activeKey}
          onChange={async (key) => {
            setActiveKey(String(key));
            wait(startChat, { me, key }, "start").then((value) => {
              setMessages(value.data.createChatBox.messages);
            });
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") setModalOpen(true);
            else if (action === "remove") {
              setActiveKey(String(removeChatBox(targetKey, activeKey)));
            }
          }}
          items={chatBoxes}
        ></ChatBoxesWrapper>
        <ChatModal
          open={modalOpen}
          onCreate={({ name }) => {
            setActiveKey(String(createChatBox(name)));
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
          wait(
            sendMessage,
            { me, to: activeKey, body: String(msg) },
            "send"
          ).then((value) => {
            setMessages([...messages, value.data.createMessage]);
            setBody("");
          });
        }}
      ></Input.Search>
    </>
  );
};

export default ChatRoom;
