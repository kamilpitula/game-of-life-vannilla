import { Game } from "./game";
import { Board } from "./board";
import './style.css';

const game = new Game(10, 10);
const board = new Board("board", game);
board.initBoard();
game.setUpdateViewHandler(board.updateCellView.bind(board));


let interval = null;

function tickHandler() {
  game.tick();
}

function startGameHandler() {
  interval = setInterval(tickHandler, 2000);
}

function stopGameHandler() {
  if (interval) clearInterval(interval);
}

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

startBtn.addEventListener("click", startGameHandler);
stopBtn.addEventListener("click", stopGameHandler);
