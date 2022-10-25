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
      const response = await guess(number);
      if (response === "Equal") setHasWon(true);
      else {
        setStatus(response);
        response === "Bigger"
          ? setSmaller(Number(number))
          : setLarger(Number(number));
        setNumber("");
      }
    } catch (e) {
      e.message.includes("500") ? setError(e.name + e.message) : setNumber("");
      return;
    }
  };
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
            // setHasStarted(true);
          }
        }}
      >
        start game
      </button>
    </div>
  );

  const gameMode = (
    <div className="gameMode">
      <p className="status">{status}</p>
      <input
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleGuess();
          }
        }}
        value={number}
        placeholder={`Guess a number between ${smaller} to ${larger}`}
      ></input>
      <br />
      <button // Send number to backend
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
    </div>
  );

  const winningMode = (
    <div className="winningMode">
      <p>You won! The number was {Number(number)}.</p>
      <button
        onClick={async () => {
          try {
            await restart();
            setHasWon(false);
            setNumber("");
            setStatus("");
            setSmaller(1);
            setLarger(100);
          } catch (e) {
            setError(e.name + e.message);
          }
        }}
      >
        restart
      </button>
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
