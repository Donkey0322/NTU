/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from "react";

const Row = ({ guess, rowIdx }) => {
  return (
    <div className="Row-container">
      {/* TODO 3: Row Implementation -- Row */}
      {/* ↓ Default row, you should modify it. ↓ */}
      <div className="Row-wrapper">
        <div
          className={
            "Row-wordbox" + (guess == undefined ? "" : ` ${guess[0].color}`)
          }
          id={rowIdx[rowIdx.length - 1] + "-0"}
          key={rowIdx[rowIdx.length - 1] + "-0"}
        >
          {guess == undefined ? null : `${guess[0].char}`}
        </div>
        <div
          className={
            "Row-wordbox" + (guess == undefined ? "" : ` ${guess[1].color}`)
          }
          id={rowIdx[rowIdx.length - 1] + "-1"}
          key={rowIdx[rowIdx.length - 1] + "-1"}
        >
          {guess == undefined ? null : `${guess[1].char}`}
        </div>
        <div
          className={
            "Row-wordbox" + (guess == undefined ? "" : ` ${guess[2].color}`)
          }
          id={rowIdx[rowIdx.length - 1] + "-2"}
          key={rowIdx[rowIdx.length - 1] + "-2"}
        >
          {guess == undefined ? null : `${guess[2].char}`}
        </div>
        <div
          className={
            "Row-wordbox" + (guess == undefined ? "" : ` ${guess[3].color}`)
          }
          id={rowIdx[rowIdx.length - 1] + "-3"}
          key={rowIdx[rowIdx.length - 1] + "-3"}
        >
          {guess == undefined ? null : `${guess[3].char}`}
        </div>
        <div
          className={
            "Row-wordbox" + (guess == undefined ? "" : ` ${guess[4].color}`)
          }
          id={rowIdx[rowIdx.length - 1] + "-4"}
          key={rowIdx[rowIdx.length - 1] + "-4"}
        >
          {guess == undefined ? null : `${guess[4].char}`}
        </div>
      </div>
      {/* ↑ Default row, you should modify it. ↑ */}
    </div>
  );
};

export default Row;
