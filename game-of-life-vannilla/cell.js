function Cell(positionX, positionY, isAlive = false) {
  this.positionX = positionX;
  this.positionY = positionY;
  this.isAlive = isAlive;
}

Cell.prototype.getPosition = function () {
  return [this.positionX, this.positionY];
};

Cell.prototype.updateState = function (aliveNeighboursCount) {
  console.log("Updating state...");
  if (!this.isAlive && aliveNeighboursCount === 3) {
    this.isAlive = true;
    return;
  }
  if (this.isAlive &&(aliveNeighboursCount === 3 || aliveNeighboursCount === 2)) {
    return;
  }

  this.isAlive = false;
};

export { Cell };
