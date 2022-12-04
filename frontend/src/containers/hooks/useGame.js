import { useState, useContext, createContext } from "react";

const client = new WebSocket ('ws://localhost:4000');
const sendData = async (data) => {
    await client.send(JSON.stringify(data));
};


// const LOCALSTORAGE_KEY = "save-me";
// const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const GameContext = createContext({
    status: false, //判斷玩家是否猜對
    me: "", //紀錄本機玩家
    signedIn: false, //從登錄頁面切換到waiting page或game page
    participant: false, //broadcast 判斷是否從waiting page切到game page
    Img: "", //存這輪猜的照片
    winner: "",
    over: false,
    myPoint: 0,
    yourPoint: 0,
    sendGuess: () => {}, //把玩家猜的送至後端
    startGame: () => {} //sign in的按鈕
});

const GameProvider = (props) => {
    const [status, setStatus] = useState(false);
    const [me, setMe] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const [participant, setParticipant] = useState(false);
    const [Img, setImg] = useState("");
    const [winner, setWinner] = useState("");
    const [over, setOver] = useState(false);
    const [myPoint, setMyPoint] = useState(0);
    const [yourPoint, setYourPoint] = useState(0);

    // const displayStatus = (s) => {
    //     if (s.msg) {
    //         const { type, msg } = s;
    //         const content = {
    //             content: msg, duration: 0.5 }
    //         switch (type) {
    //             case 'success':
    //                 message.success(content);
    //                 break;
    //             case 'error':
    //                 message.error(content);
    //             default:
    //                 break;
    //         }
    //     }
    // }

    // useEffect(() => {
    //     if (signedIn) {
    //       localStorage.setItem(LOCALSTORAGE_KEY, me);
    //     }
    // }, [me, signedIn]);

    client.onmessage = (byteString) => {
        const {data} = byteString;
        const {task, payload} = JSON.parse(data);
        // console.log('task: ', task, 'payload: ', payload);
        switch (task) {
            case "start": {
                console.log('Two participants found:', payload.participant);
                if(payload.Img){
                    setImg(payload.Img)
                    console.log(Img)
                }
                setParticipant(payload.participant); 
                break; 
            }
            case "guess": {
                console.log('Guess output:', payload);
                if(payload){
                    setWinner(payload.winner)
                    setImg(payload.Img)
                    if(payload.winner === me){
                        setMyPoint(myPoint+1)
                        console.log(myPoint)
                    }else{
                        setYourPoint(yourPoint+1)
                    }
                    if(payload.over)
                        setOver(payload.over)
                } break; }
            case "status": {
                setStatus(payload.type); break; }
            default: break;
        }
    }

    const sendGuess = (name, body) => {
        if(!name || !body){
            throw new Error('User or Guess required!')
        }
        sendData({
            type: "guess", 
            payload: {name, body}
        });
    }

    const startGame = (name) => {
        if(!name){
            throw new Error('Name required!')
        }
        sendData({
            type: "start",
            payload: {name}
        });

    }

    return (
      <GameContext.Provider
        value={{
          status, me, signedIn, participant, Img, winner, over, myPoint, yourPoint, setMyPoint, setYourPoint, setStatus, setMe, setSignedIn, setParticipant,
          setImg, setOver, setWinner, sendGuess, startGame }}
        {...props}
      />
); };

const useGame = () => useContext(GameContext);

export {GameProvider, useGame};