import { Game } from "./Model/game.js";
import { Board } from "./UI/board.js";
import { Modal } from "./UI/modal.js";
import "./style.css";
import { downloadFile } from "./Utils/downloadFile.js";
import { exportToLife106 } from "./Utils/life_106_exporter.js";
import { Stats } from "./UI/stats.js";
import { SettingsView } from "./UI/settingsView.js";

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

function initGame(settings) {
  if (!settings)
    settings = {
      width: 60,
      height: 60,
    };
  stopGameHandler();
  game = new Game(settings);
  board = new Board("board", game);
  stats = new Stats();
  board.initBoard();
  game.setUpdateViewHandler(board.handleCellStateChange.bind(board));
  game.setOnGameStateChangeHandler(stats.handleStatsUpdate.bind(stats));
}

initGame();

startBtn.addEventListener("click", startGameHandler);
stopBtn.addEventListener("click", stopGameHandler);
resetBtn.addEventListener(
  "click",
  initGame.bind(null, { width: 60, height: 60 })
);
exportBtn.addEventListener("click", exportBoardHandler);
settingsButton.addEventListener("click", () => {
  settingModal.openModal();
  const settings = new SettingsView("settings_template", "modal_content");
  settings.setOnAcceptHandler((s) => {
    initGame(s);
    settingModal.closeModal();
  });
  settings.setOnCancelHandler(() => settingModal.closeModal());
});
