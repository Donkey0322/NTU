/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from "react";

const CurRow = ({ curGuess, rowIdx }) => {
  let letters = curGuess.split("");
  return (
    <div className="Row-container">
      {/* TODO 3: Row Implementation -- CurRow */}

      {/* ↓ Default row, you should modify it. ↓ */}
      <div className="Row-wrapper current">
        <div
          className={"Row-wordbox" + (0 < letters.length ? " filled" : "")}
          id={rowIdx[rowIdx.length - 1] + "-0"}
          key={rowIdx[rowIdx.length - 1] + "-0"}
        >
          {letters[0]}
        </div>
        <div
          className={"Row-wordbox" + (1 < letters.length ? " filled" : "")}
          id={rowIdx[rowIdx.length - 1] + "-1"}
          key={rowIdx[rowIdx.length - 1] + "-1"}
        >
          {letters[1]}
        </div>
        <div
          className={"Row-wordbox" + (2 < letters.length ? " filled" : "")}
          id={rowIdx[rowIdx.length - 1] + "-2"}
          key={rowIdx[rowIdx.length - 1] + "-2"}
        >
          {letters[2]}
        </div>
        <div
          className={"Row-wordbox" + (3 < letters.length ? " filled" : "")}
          id={rowIdx[rowIdx.length - 1] + "-3"}
          key={rowIdx[rowIdx.length - 1] + "-3"}
        >
          {letters[3]}
        </div>
        <div
          className={"Row-wordbox" + (4 < letters.length ? " filled" : "")}
          id={rowIdx[rowIdx.length - 1] + "-4"}
          key={rowIdx[rowIdx.length - 1] + "-4"}
        >
          {letters[4]}
        </div>
      </div>
      {/* ↑ Default row, you should modify it. ↑ */}
    </div>
  );
};

export default CurRow;
