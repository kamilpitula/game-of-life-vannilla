function Cell(positionX, positionY, isAlive = false) {
  this.positionX = positionX;
  this.positionY = positionY;
  this.isAlive = isAlive;
}

Cell.prototype.getPosition = function () {
  return [this.positionX, this.positionY];
};

Cell.prototype.changeState = function () {
  this.isAlive = !this.isAlive;
  return this.isAlive;
};

Cell.prototype.getNewState = function (aliveNeighboursCount) {
  console.log(
    `Updating state of cells ${this.positionX}, ${this.positionY}, n: ${aliveNeighboursCount}`
  );
  let newState = false;
  if (!this.isAlive && aliveNeighboursCount === 3) {
    newState = true;
  }
  if (
    this.isAlive &&
    (aliveNeighboursCount === 3 || aliveNeighboursCount === 2)
  ) {
    newState = true;
  }
  const stateChanged = this.isAlive !== newState;
  return [stateChanged, newState];
};

export { Cell };
