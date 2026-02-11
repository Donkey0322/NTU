import { useState, useContext, createContext } from "react";

// const client = new WebSocket(
//   "wss://d9bf-2001-b400-e4c2-9699-709c-85d5-c497-9af5.jp.ngrok.io"
// );

const client = new WebSocket("ws://localhost:4000");

client.onopen = function () {
  console.log("WebSocket is open now.");
};

const sendData = async (data) => {
  client.send(JSON.stringify(data));
};

const GameContext = createContext({
  status: {}, //判斷玩家是否猜對
  me: "", //紀錄本機玩家
  signedIn: false, //從登錄頁面切換到waiting page或game page
  participant: false, //broadcast 判斷是否從waiting page切到game page
  Img: "", //存這輪猜的照片
  winner: "",
  over: false,
  myPoint: 0,
  yourPoint: 0,
  option: [],
  theme: "",
  point: 1,
  sendGuess: () => {}, //把玩家猜的送至後端
  startGame: () => {}, //sign in的按鈕
  stopWait: () => {}, //等到不想等了
  restart: () => {},
});

const GameProvider = (props) => {
  const [status, setStatus] = useState({ answer: null, status: null });
  const [me, setMe] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [participant, setParticipant] = useState(false);
  const [Img, setImg] = useState("");
  const [winner, setWinner] = useState("");
  const [over, setOver] = useState(false);
  const [myPoint, setMyPoint] = useState(0);
  const [yourPoint, setYourPoint] = useState(0);
  const [option, setOption] = useState([]);
  const [theme, setTheme] = useState("");
  const [point, setPoint] = useState(1);

  client.onmessage = (byteString) => {
    const { data } = byteString;
    const { task, payload } = JSON.parse(data);
    switch (task) {
      case "start": {
        const { theme } = payload;
        console.log("Two participants found:", payload.participant);
        setParticipant(payload.participant);
        setTheme(theme);
        break;
      }
      case "guess": {
        setPoint(0);
        if (payload.over) {
          setOver(payload.over);
        }
        console.log("Guess output:", payload);
        setWinner(payload.winner);
        if (payload.winner === me) {
          setMyPoint(myPoint + 1);
        } else {
          setYourPoint(yourPoint + 1);
        }
        if (!payload.over) {
          setTimeout(() => {
            setImg(payload.Img);
            setOption(payload.choices);
            setPoint(1);
          }, 2000);
        }
        break;
      }
      case "status": {
        const { answer, status } = payload;
        setStatus({ answer, status });
        console.log(answer, status);
        break;
      }
      case "theme": {
        const { Img, choices } = payload;
        setImg(Img);
        setOption(choices);
      }
      default:
        break;
    }
  };

  const startGame = (name) => {
    if (!name) {
      throw new Error("Name required!");
    }
    sendData({
      type: "start",
      payload: { name },
    });
  };

  const restart = () => {
    setOption([]);
    setPoint(1);
    setMyPoint(0);
    setYourPoint(0);
    setStatus({ answer: null, status: null });
    setParticipant(false);
    setImg("");
    setOver(false);
    setWinner("");
    setTheme("");
    startGame(me);
  };

  const sendTheme = (name) => {
    if (!name) {
      throw Error("option required!");
    }
    sendData({
      type: "theme",
      payload: { name },
    });
  };

  const stopWait = (name) => {
    if (!name) {
      throw new Error("Name required!");
    }
    sendData({
      type: "stopWait",
      payload: { name },
    });
  };

  const sendGuess = (name, body) => {
    if (!name || !body) {
      throw new Error("User or Guess required!");
    }
    sendData({
      type: "guess",
      payload: { name, body },
    });
  };

  return (
    <GameContext.Provider
      value={{
        status,
        me,
        signedIn,
        participant,
        Img,
        winner,
        over,
        myPoint,
        yourPoint,
        option,
        theme,
        point,
        setPoint,
        setOption,
        setMyPoint,
        setYourPoint,
        setStatus,
        setMe,
        setSignedIn,
        setParticipant,
        setImg,
        setOver,
        setWinner,
        setTheme,
        sendGuess,
        startGame,
        sendTheme,
        restart,
      }}
      {...props}
    />
  );
};

const useGame = () => useContext(GameContext);

export { GameProvider, useGame };
