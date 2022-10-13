/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Board.css";
import Cell from "./Cell";
import Modal from "./Modal";
import Dashboard from "./Dashboard";
import { revealed } from "../util/reveal";
import createBoard from "../util/createBoard";
import React, { useEffect, useState } from "react";

const Board = ({ boardSize, mineNum, backToHome }) => {
  const [board, setBoard] = useState([]); // An 2-dimentional array. It is used to store the board.
  const [nonMineCount, setNonMineCount] = useState(0); // An integer variable to store the number of cells whose value are not '💣'.
  const [mineLocations, setMineLocations] = useState([]); // An array to store all the coordinate of '💣'.
  const [gameOver, setGameOver] = useState(false); // A boolean variable. If true, means you lose the game (Game over).
  const [remainFlagNum, setRemainFlagNum] = useState(0); // An integer variable to store the number of remain flags.
  const [win, setWin] = useState(false); // A boolean variable. If true, means that you win the game.

  useEffect(() => {
    freshBoard();
  }, []);

  // Creating a board
  const freshBoard = () => {
    const newBoard = createBoard(boardSize, mineNum);
    setBoard(newBoard.board);
    setNonMineCount(boardSize * boardSize - mineNum);
    setMineLocations(newBoard.mineLocations);
    setRemainFlagNum(mineNum);
  };

  const restartGame = () => {
    freshBoard();
    setGameOver(false);
    setWin(false);
  };

  // On Right Click / Flag Cell
  const updateFlag = (e, x, y) => {
    if (gameOver || win) return;
    // To not have a dropdown on right click
    e.preventDefault();
    // Deep copy of a state
    let newBoard = JSON.parse(JSON.stringify(board));
    let newFlagNum = remainFlagNum;

    if (newBoard[x][y].revealed === false) {
      if (newBoard[x][y].flagged) {
        newBoard[x][y].flagged = false;
        newFlagNum += 1;
      } else if (newFlagNum > 0) {
        newBoard[x][y].flagged = true;
        newFlagNum -= 1;
      }
    } else return;
    setRemainFlagNum(newFlagNum);
    setBoard(newBoard);
  };

  const revealCell = (x, y) => {
    if (board[x][y].revealed || gameOver || board[x][y].flagged || win) return;
    let newBoard = JSON.parse(JSON.stringify(board));
    if (newBoard[x][y].value !== "💣") {
      newBoard = revealed(newBoard, x, y, nonMineCount);
      setBoard(newBoard.board);
      setNonMineCount(newBoard.newNonMinesCount);
      if (newBoard.newNonMinesCount === 0) {
        setWin(true);
      }
    } else {
      newBoard.map((x) =>
        x.map((e) => {
          if (e.flagged === false && e.value === "💣") e.revealed = true;
        })
      );
      setBoard(newBoard);
      setGameOver(true);
    }
  };

  return (
    <div className="boardPage">
      <div className="boardWrapper">
        {win || gameOver ? (
          <Modal restartGame={restartGame} backToHome={backToHome} win={win} />
        ) : null}
        <div className="boardContainer">
          <Dashboard
            remainFlagNum={remainFlagNum}
            gameOver={gameOver}
            win={win}
          />
          {board.map((x) => (
            <div
              id={"row" + board.indexOf(x)}
              style={{ display: "flex" }}
              key={"row" + board.indexOf(x)}
            >
              {x.map((i) => (
                <Cell
                  rowIdx={i.x}
                  colIdx={i.y}
                  detail={i}
                  updateFlag={updateFlag}
                  revealCell={revealCell}
                  key={i.x.toString() + "-" + i.y.toString()}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
