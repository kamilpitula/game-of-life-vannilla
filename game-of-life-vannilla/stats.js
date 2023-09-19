function Stats() {
  this.genCounter = document.getElementById("genCounter");
  this.cellsCounter = document.getElementById("cellsCounter");

  this.genCounter.textContent = 0;
  this.cellsCounter.textContent = 0;
}

Stats.prototype.resetStats = function () {
  this.genCounter.textContent = 0;
  this.cellsCounter.textContent = 0;
};

Stats.prototype.handleStatsUpdate = function (tickData) {
  this.genCounter.textContent = tickData.generationCount;
  this.cellsCounter.textContent = tickData.aliveCells;
};

export { Stats };
