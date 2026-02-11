import { message } from "antd";
import { useState, useEffect, useContext, createContext } from "react";

const client = new WebSocket("ws://localhost:4000");
client.onopen = () => console.log("Backend socket server connected!");
const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
const sendData = async (data) => {
  try {
    client.send(JSON.stringify(data));
    // console.log(JSON.stringify(data));
  } catch {
    console.log("fail");
  }
};

const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  messages: [],
  resetDB: false,
  startChat: () => {},
  sendMessage: () => {},
  clearDB: () => {},
  displayStatus: () => {},
});

const ChatProvider = (props) => {
  const [status, setStatus] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [me, setMe] = useState(savedMe || "");
  const [resetDB, setResetDB] = useState(false);

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);

  useEffect(() => {
    // setStatus({});
    setMessages([]);
    setResetDB(false);
  }, [resetDB]);

  //接收後端
  client.onmessage = async (byteString) => {
    const { data } = byteString;
    let [task, payload] = JSON.parse(data);
    switch (task) {
      case "output": {
        setMessages(() => [...messages, payload]);
        break;
      }
      case "init": {
        setMessages(payload);
        break;
      }
      case "status": {
        console.log(payload);
        setStatus(payload);
        break;
      }
      case "cleared": {
        setResetDB(true);
        break;
      }
      default:
        break;
    }
  };

  const clearDB = () => {
    sendData({
      type: "CLEARDB",
      payload: {},
    });
  };

  const sendMessage = (name, to, body) => {
    if (!name || !to || !body) throw new Error("Name or to required!");
    sendData({
      type: "MESSAGE",
      payload: { name, to, body },
    });
  };

  const startChat = (name, to) => {
    if (!name || !to) throw new Error("Name or to required!");
    sendData({
      type: "CHAT",
      payload: { name, to },
    });
  };

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg,
        duration: 0.5,
      };
      switch (type) {
        case "success":
          message.success(content);
          break;
        case "info":
          message.info(content);
          break;
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };

  return (
    <ChatContext.Provider
      value={{
        status,
        me,
        signedIn,
        messages,
        resetDB,
        setMe,
        startChat,
        setSignedIn,
        setResetDB,
        sendMessage,
        clearDB,
        displayStatus,
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
