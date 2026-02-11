import { useEffect, useState } from "react";
import "./App.css";
import { guess, startGame, restart } from "./axios";

function App() {
  // Define states
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
  const [smaller, setSmaller] = useState(1);
  const [larger, setLarger] = useState(100);
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(0);
  const [robotMode, setRobotMode] = useState("");
  const [robotNumber, setRobotNumber] = useState(0);

  useEffect(() => {
    const handleError = async (func, counter) => {
      if (error || counter) {
        try {
          number ? await func(number) : await func();
          setError("");
          setCounter(0);
        } catch (e) {
          setError(e.name + e.message);
          setCounter(counter + 1);
        }
      }
    };
    if (!hasStarted) {
      handleError(startGame, counter);
      // console.log(counter, "startGame");
    } else if (!hasWon) {
      handleError(guess, counter);
      // console.log(counter, "guess");
    } else {
      handleError(restart, counter);
      // console.log(counter, "restart");
    }
  }, [counter, error]);

  const handleGuess = async () => {
    try {
      const response = await guess(number ? number : robotNumber);
      if (response === "Equal") setHasWon(true);
      else {
        setRobotMode(!robotMode);
        setStatus(response);
        response === "Bigger"
          ? setSmaller(Number(number ? number : robotNumber))
          : setLarger(Number(number ? number : robotNumber));
        setNumber("");
        let a = document.querySelector(".gameMode .status");
        a.style.animation = "scaleUp 0.3s forwards";
        a.addEventListener("animationend", () => (a.style.animation = null));
      }
    } catch (e) {
      e.message.includes("500") ? setError(e.name + e.message) : setNumber("");
      return;
    }
  };

  useEffect(() => {
    const robotGuess = async () => {
      let robotNum = Math.floor(Math.random() * (larger - smaller)) + smaller;
      if (robotNum == smaller) robotNum += 1;
      setRobotNumber(robotNum);
      let a = document.querySelector(".robotAppear p");
      a.style.animation = "scaleUp 0.3s forwards";
      a.addEventListener("animationend", () => (a.style.animation = null));
    };
    if (robotMode) {
      setTimeout(robotGuess, 1000);
    }
  }, [number]);

  useEffect(() => {
    if (robotNumber) handleGuess();
  }, [robotNumber]);

  // Define three different views
  const errorAppear = (
    <div className="winningMode">
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );

  const startMenu = (
    <div className="startMenu">
      <button
        onClick={async () => {
          try {
            await startGame();
            setHasStarted(true);
          } catch (e) {
            setError(e.name + e.message);
          }
        }}
      >
        start game
      </button>
    </div>
  );

  const robotAppear = (
    <div className="robotAppear">
      <p>{robotNumber && !hasWon ? robotNumber : null}</p>
      <img
        src={
          robotMode && hasWon
            ? "robot_win.jpg"
            : !robotMode && hasWon
            ? "robot_wrong.png"
            : "robot.jpg"
        }
        style={{ position: hasWon ? "relative" : "absolute" }}
      />
    </div>
  );

  const gameMode = (
    <div className="gameMode">
      <div className="playAppear">
        <p className="status">{status}</p>
        <input
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && number) {
              handleGuess();
            }
          }}
          disabled={robotMode}
          value={number}
          placeholder={`Guess a number between ${smaller} to ${larger}`}
        ></input>
        <button // Send number to backend
          onClick={handleGuess}
          disabled={!number}
        >
          guess!
        </button>
      </div>
      {robotAppear}
    </div>
  );

  const winningMode = (
    <div className="gameMode">
      <div className="winningMode">
        <p>
          {robotMode ? "The robot" : "You"} won! The number was{" "}
          {number ? Number(number) : robotNumber}.
        </p>
        <button
          onClick={async () => {
            try {
              await restart();
              setHasWon(false);
              setNumber("");
              setStatus("");
              setSmaller(1);
              setLarger(100);
              setRobotMode(false);
              setRobotNumber(0);
            } catch (e) {
              setError(e.name + e.message);
            }
          }}
        >
          restart
        </button>
      </div>
      {robotAppear}
    </div>
  );
  const game = <div>{hasWon ? winningMode : gameMode}</div>;
  return (
    <div className="App">
      {error ? errorAppear : hasStarted ? game : startMenu}
    </div>
  );
}
export default App;
