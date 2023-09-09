function Board(hookEl, game) {
  this.hookEl = hookEl;
  const el = document.getElementById(hookEl);
  if (!el)
    throw new Error(`Couldn't attach board to element with id ${hookEl}`);
  this.rootEl = el;
  this.game = game;
  this.cellElements = [];
}

function changeCellStateHandler(cell) {
  console.log(cell.positionX, cell.positionY);
  const currentState = cell.changeState();
  switchCellAppearance(this, currentState);
}

function switchCellAppearance(btn, currentState) {
  if (currentState) {
    btn.classList.add("cell__button--alive");
  } else {
    btn.classList.remove("cell__button--alive");
  }
}

Board.prototype.updateCellView = function (cell) {
  console.log(cell);
  const btn = this.cellElements[cell.positionX][cell.positionY];
  switchCellAppearance(btn, cell.isAlive);
};

Board.prototype.initBoard = function () {
  const board = this.game.board;
  for (let row = 0; row < board.length; row++) {
    const rowEl = document.createElement("div");
    const rowElements = [];
    rowEl.classList.add("board__row");
    for (let column = 0; column < board[row].length; column++) {
      const cell = board[row][column];
      const cellButtonEl = document.createElement("button");
      cellButtonEl.addEventListener(
        "click",
        changeCellStateHandler.bind(cellButtonEl, cell)
      );
      cellButtonEl.classList.add("cell__button");
      if (cell.isAlive) cellButtonEl.classList.add("cell__button--alive");
      rowEl.appendChild(cellButtonEl);
      rowElements.push(cellButtonEl);
    }
    this.rootEl.appendChild(rowEl);
    this.cellElements.push(rowElements);
  }
};

export { Board };
