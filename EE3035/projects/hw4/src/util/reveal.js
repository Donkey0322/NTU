/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
  if (board[x][y].revealed === false && board[x][y].flagged === false) {
    if (board[x][y].value === 0) {
      board[x][y].revealed = true;
      newNonMinesCount--;
      for (let index = x - 1; index < x + 2; index++) {
        if (index >= 0 && index < board.length) {
          for (let indey = y - 1; indey < y + 2; indey++) {
            if (indey >= 0 && indey < board.length) {
              if (index !== x || indey !== y) {
                let tmp = revealed(board, index, indey, newNonMinesCount);
                board = tmp.board;
                newNonMinesCount = tmp.newNonMinesCount;
              }
            }
          }
        }
      }
    } else {
      board[x][y].revealed = true;
      newNonMinesCount--;
    }
  }
  return { board, newNonMinesCount };
};
