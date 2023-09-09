import { Game } from "./game";
import { Board } from "./board";
import "./style.css";

let game = null;
let board = null;

let interval = null;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
stopBtn.disabled = true;

function tickHandler() {
  game.tick();
}

function startGameHandler() {
  interval = setInterval(tickHandler, 50);
  stopBtn.disabled = false;
  startBtn.disabled = true;
  resetBtn.disabled = true;
}

function stopGameHandler() {
  if (interval) clearInterval(interval);
  stopBtn.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = false;
}

function initGame() {
  stopGameHandler();
  game = new Game(60, 60);
  board = new Board("board", game);
  board.initBoard();
  game.setUpdateViewHandler(board.handleCellStateChange.bind(board));
}

initGame();

startBtn.addEventListener("click", startGameHandler);
stopBtn.addEventListener("click", stopGameHandler);
resetBtn.addEventListener("click", initGame);
