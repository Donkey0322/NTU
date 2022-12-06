import "./App.css";
import "./GameRoom.css";
import { useState, useEffect, useRef } from "react";
// import { Input, Tabs} from 'antd';
import { useGame } from "./hooks/useGame";
// import styled from "styled-components";
import computer_pic from "../img/computer.jpg";
import user_pic from "../img/user.png";
// import win from "./img/win.jpg";

const GameRoom = () => {
  const { status, me, Img, myPoint, yourPoint, sendGuess } = useGame();
  const [guess, setGuess] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [pictureAbove, setPictureAbove] = useState("");

  const handleChange = (e) => {
    setInputVal(e.target.value);
    setGuess(e.target.value);
  };

  const handleGuess = async () => {
    sendGuess(me, guess);
    setInputVal("");
  };

  useEffect(() => {
    if (status) {
      setPictureAbove("正確照片的img");
    } else {
      setPictureAbove("錯誤照片的img");
    }
  }, [status]);

  return (
    <>
      <div className="game">
        <img className="Img" src={Img} />
        <div className="gameBoard">
          <p className="hint">Guess the name</p>
          <input onChange={handleChange} value={inputVal} />
          <div>
            <button onClick={handleGuess} disabled={!guess}>
              guess!
            </button>
          </div>
        </div>
        <div
          className="user"
          style={{ backgroundImage: `url(${user_pic})` }}
        ></div>
        <div
          className="computer"
          style={{ backgroundImage: `url(${computer_pic})` }}
        >
          {/* <span className ='tag' style={{visibility: isVisible ? 'visible' : 'hidden'}}></span> */}
          {/* <p>{computer}</p> */}
        </div>
      </div>
    </>
  );
};
export default GameRoom;
