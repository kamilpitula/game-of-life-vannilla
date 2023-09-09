import { Cell } from "./cell.js";

function Game(rows, columns) {
  const board = [];

  for (let row = 0; row < rows; row++) {
    const rows = [];
    for (let column = 0; column < columns; column++) {
      rows.push(new Cell(row, column, false));
    }
    board.push(rows);
  }
  this.board = board;
  this.rows = rows;
  this.columns = columns;
}

function checkAdjacentCells(board, cell) {
  const [x, y] = cell.getPosition();
  const rowCount = board.length;
  const columnCount = board[0].length;

  let aliveNeighboursCount = 0;
  for (let row = x - 1; row <= x + 1 && row < rowCount; row++) {
    for (
      let column = y - 1;
      column <= y + 1 && column < columnCount;
      column++
    ) {
      if (row === x && column === y) continue;
      if (row < 0 || column < 0) continue;

      const currentNeighbour = board[row][column];
      if (currentNeighbour.isAlive) {
        aliveNeighboursCount++;
      }
    }
  }

  return aliveNeighboursCount;
}

Game.prototype.setUpdateViewHandler = function (onStateChanged) {
  this.onCellStateChanged = onStateChanged;
};

function updateCellState(newState, cell) {
  cell.isAlive = newState;
  this.onCellStateChanged(cell);
}

Game.prototype.tick = function () {
  console.log("Tick");

  const updates = [];

  for (let row = 0; row < this.rows; row++) {
    for (let column = 0; column < this.columns; column++) {
      const cell = this.board[row][column];
      const aliveCells = checkAdjacentCells(this.board, cell);
      const [stateChanged, newState] = cell.getNewState(aliveCells);
      if (stateChanged) {
        updates.push(updateCellState.bind(this, newState, cell));
      }
    }
  }

  for (let update = 0; update < updates.length; update++) updates[update]();
};

export { Game };
