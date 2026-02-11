/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/HomePage.css";
import React, { useEffect, useState } from "react";

const HomePage = ({
  startGameOnClick,
  mineNumOnChange,
  boardSizeOnChange,
  mineNum,
  boardSize /* -- something more... -- */,
}) => {
  const [showPanel, setShowPanel] = useState(false); // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false); // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  const ShowPanel = () => {
    setShowPanel(!showPanel);
  };

  useEffect(() => {
    const Error = () => {
      if (mineNum > boardSize * boardSize) {
        setError(true);
      } else {
        setError(false);
      }
    };
    Error();
  }, [mineNum, boardSize]);

  return (
    <div className="HomeWrapper">
      <p className="title">MineSweeper</p>
      <button className="btn" onClick={error ? null : startGameOnClick}>
        Start Game
      </button>
      <div className="controlContainer">
        <button className="btn" onClick={ShowPanel}>
          Difficulty Adjustment
        </button>
        {showPanel ? (
          <div className="controlWrapper">
            {error ? (
              <div className="error" style={{ color: "#880000" }}>
                ERROR: Mines number and board size are invalid!
              </div>
            ) : null}
            <div className="controlPane">
              <div className="controlCol">
                <p className="controlTitle">Mines Number</p>
                <input
                  type="range"
                  step="1"
                  min="0"
                  max="20"
                  defaultValue={mineNum}
                  onChange={mineNumOnChange}
                />
                <p
                  className="controlNum"
                  style={error ? { color: "#880000" } : null}
                >
                  {mineNum}
                </p>
              </div>
              <div className="controlCol">
                <p className="controlTitle">Board Size (n &#10761; n)</p>
                <input
                  type="range"
                  step="1"
                  min="0"
                  max="20"
                  defaultValue={boardSize}
                  onChange={boardSizeOnChange}
                />
                <p
                  className="controlNum"
                  style={error ? { color: "#880000" } : null}
                >
                  {boardSize}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
    </div>
  );
};
export default HomePage;
