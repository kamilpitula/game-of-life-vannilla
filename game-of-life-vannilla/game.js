import { Cell } from "./cell.js";

function Game(rows, columns) {
  const board = [];

  for (let row = 0; row < rows; row++) {
    const row = [];
    for (let column = 0; column < columns; column++) {
      row.push(new Cell(row, column, false));
    }
    board.push(row);
  }
  this.board = board;
}

Game.prototype.tick = function () {
  console.log("Tick");
  console.log(this.board);
};

export { Game };
