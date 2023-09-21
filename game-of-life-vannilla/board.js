function Board(hookEl, game) {
  this.hookEl = hookEl;
  const el = document.getElementById(hookEl);
  if (!el)
    throw new Error(`Couldn't attach board to element with id ${hookEl}`);
  this.rootEl = el;
  this.game = game;
  this.cellElements = [];
}

function changeCellStateHandler(game, cell) {
  game.changeCellState(cell);
}

Board.prototype.handleCellStateChange = function (cell) {
  const btn = this.cellElements[cell.positionY][cell.positionX];
  if (cell.isAlive) {
    btn.classList.add("cell__button--alive");
  } else {
    btn.classList.remove("cell__button--alive");
  }
};

Board.prototype.initBoard = function () {
  this.rootEl.innerHTML = "";
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
        changeCellStateHandler.bind(cellButtonEl, this.game, cell)
      );
      cellButtonEl.classList.add("cell__button");
      cellButtonEl.textContent = `${cell.positionX}-${cell.positionY}`;
      if (cell.isAlive) cellButtonEl.classList.add("cell__button--alive");
      rowEl.appendChild(cellButtonEl);
      rowElements.push(cellButtonEl);
    }
    this.rootEl.appendChild(rowEl);
    this.cellElements.push(rowElements);
  }
};

export { Board };
