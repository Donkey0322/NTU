import { message } from "antd";
import { useState, useEffect, useContext, createContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  CHATBOX_QUERY,
  CREATE_CHATBOX_MUTATION,
  CREATE_MESSAGE_MUTATION,
  MESSAGE_SUBSCRIPTION,
} from "../../graphql";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  messages: [],
  resetDB: false,
  activeKey: "",
  startChat: () => {},
  sendMessage: () => {},
  displayStatus: () => {},
});

const ChatProvider = (props) => {
  const [status, setStatus] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [me, setMe] = useState(savedMe || "");
  const [resetDB, setResetDB] = useState(false);
  const [activeKey, setActiveKey] = useState("");

  const { data, error, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
    variables: {
      name1: String(me),
      name2: String(activeKey),
    },
  });
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  useEffect(() => {
    // console.log(subscribeToMore);
    subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: { from: String(me), to: String(activeKey) },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData.data);
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.message;
        return {
          chatbox: {
            messages: [...prev.chatbox.messages, newMessage],
          },
        };
      },
    });
  }, [subscribeToMore, activeKey, me]);

  useEffect(() => {
    if (data) {
      if (data.chatbox.messages) {
        console.log(data.chatbox.messages);
        setMessages(data.chatbox.messages);
      }
    }
  }, [data]);

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);

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
        activeKey,
        setMe,
        setMessages,
        startChat,
        setSignedIn,
        setResetDB,
        setActiveKey,
        sendMessage,
        displayStatus,
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
