import { Cell } from "./cell.js";

function Game(rows, columns) {
  const board = [];

  for (let row = 0; row < rows; row++) {
    const rows = [];
    for (let column = 0; column < columns; column++) {
      rows.push(new Cell(column, row, false));
    }
    board.push(rows);
  }
  this.board = board;
  this.rows = rows;
  this.columns = columns;
  this.generation = 0;
}

function checkAdjacentCells(board, cell) {
  const [x, y] = cell.getPosition();
  const rowCount = board.length;
  const columnCount = board[0].length;

  let aliveNeighboursCount = 0;
  for (let row = y - 1; row <= y + 1 && row < rowCount; row++) {
    for (
      let column = x - 1;
      column <= x + 1 && column < columnCount;
      column++
    ) {
      if (row === y && column === x) continue;
      if (row < 0 || column < 0) continue;

      const currentNeighbour = board[row][column];
      if (currentNeighbour.isAlive) {
        aliveNeighboursCount++;
      }
    }
  }

  return aliveNeighboursCount;
}

Game.prototype.setUpdateViewHandler = function (onCellStateChanged) {
  this.onCellStateChanged = onCellStateChanged;
};

Game.prototype.setOnGameStateChangeHandler = function (onTickHandler) {
  this.onGameStateChanged = onTickHandler;
};

Game.prototype.changeCellState = function (cell) {
  const newState = cell.changeState();
  this.onCellStateChanged(cell);
  this.onGameStateChanged({
    generationCount: this.generation,
    aliveCells: this.board.flat().filter((c) => c.isAlive).length,
  });
  return newState;
};

function updateCellState(newState, cell) {
  cell.isAlive = newState;
  this.onCellStateChanged(cell);
}

Game.prototype.tick = function () {
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

  this.generation++;
  this.onGameStateChanged({
    generationCount: this.generation,
    aliveCells: this.board.flat().filter((c) => c.isAlive).length,
  });
};

export { Game };
