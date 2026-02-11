/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useEffect, useState } from "react";
import "./css/Dashboard.css";

export default function Dashboard({ remainFlagNum, gameOver, win }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (!gameOver) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    } else if (gameOver && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameOver, time]);

  useEffect(() => {
    let endTime = time;
    setSTime(endTime);
    setTime(0);
  }, [gameOver, win]);

  return (
    <div className="dashBoard">
      <div id="dashBoard_col1">
        <div className="dashBoard_col">
          <p className="icon">🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id="dashBoard_col2">
        <div className="dashBoard_col">
          <p className="icon">⏰</p>
          {gameOver || win ? sTime : time}
        </div>
      </div>
    </div>
  );
}
