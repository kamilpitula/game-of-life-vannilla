import { Game } from "./game";

const game = new Game(10, 10);
let interval = null;

function startGameHandler() {
  interval = setInterval(game.tick.bind(game), 2000);
}

function stopGameHandler() {
  if (interval) clearInterval(interval);
}

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

startBtn.addEventListener("click", startGameHandler);
stopBtn.addEventListener("click", stopGameHandler);
