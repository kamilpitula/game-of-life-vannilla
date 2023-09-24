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
  const boardElement = document.createElement("div");
  boardElement.id = "board";

  const documentFragment = document.createDocumentFragment();

  const buttonProto = document.createElement("button");
  buttonProto.classList.add("cell__button");

  const board = this.game.board;
  for (let row = 0; row < board.length; row++) {
    const rowEl = document.createElement("div");
    const rowElements = [];
    rowEl.classList.add("board__row");
    for (let column = 0; column < board[row].length; column++) {
      const cell = board[row][column];
      const cellButtonEl = buttonProto.cloneNode(true);
      cellButtonEl.dataset.row = row;
      cellButtonEl.dataset.column = column;
      if (cell.isAlive) cellButtonEl.classList.add("cell__button--alive");
      rowEl.appendChild(cellButtonEl);
      rowElements.push(cellButtonEl);
    }
    documentFragment.appendChild(rowEl);
    this.cellElements.push(rowElements);
  }

  boardElement.appendChild(documentFragment);
  boardElement.addEventListener("click", (e) => {
    if (e.target.matches("button.cell__button")) {
      const cellButtonEl = e.target;
      const row = cellButtonEl.dataset.row;
      const column = cellButtonEl.dataset.column;
      const cell = this.game.board[row][column];
      changeCellStateHandler(this.game, cell);
    }
  });

  this.rootEl.replaceWith(boardElement);
  this.rootEl = boardElement;
};

export { Board };
