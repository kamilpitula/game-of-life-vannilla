import { Game } from "./Model/game.js";
import { Board } from "./UI/board.js";
import { Modal } from "./UI/modal.js";
import "./style.css";
import { downloadFile } from "./Utils/downloadFile.js";
import { exportToLife106 } from "./Utils/life_106_exporter.js";
import { Stats } from "./UI/stats.js";

let game = null;
let board = null;
let stats = null;

let interval = null;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");
const settingsButton = document.getElementById("settingsBtn");

stopBtn.disabled = true;
const settingModal = new Modal("modal");

function tickHandler() {
  game.tick();
}

function startGameHandler() {
  interval = setInterval(tickHandler, 50);
  stopBtn.disabled = false;
  startBtn.disabled = true;
  resetBtn.disabled = true;
  exportBtn.disabled = true;
}

function stopGameHandler() {
  if (interval) clearInterval(interval);
  stopBtn.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = false;
  exportBtn.disabled = false;
}

function exportBoardHandler() {
  const exportedBoard = exportToLife106(game.board);
  downloadFile(exportedBoard, "pattern.life");
}

function initGame() {
  stopGameHandler();
  game = new Game(60, 60);
  board = new Board("board", game);
  stats = new Stats();
  board.initBoard();
  game.setUpdateViewHandler(board.handleCellStateChange.bind(board));
  game.setOnGameStateChangeHandler(stats.handleStatsUpdate.bind(stats));
}

initGame();

startBtn.addEventListener("click", startGameHandler);
stopBtn.addEventListener("click", stopGameHandler);
resetBtn.addEventListener("click", initGame);
exportBtn.addEventListener("click", exportBoardHandler);
settingsButton.addEventListener('click', settingModal.openModal.bind(settingModal));
