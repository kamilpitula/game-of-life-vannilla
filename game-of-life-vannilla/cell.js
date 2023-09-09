function Cell(positionX, positionY, isAlive = false) {
  this.positionX = positionX;
  this.positionY = positionY;
  this.isAlive = isAlive;
}

Cell.prototype.makeAlive = function () {
  this.isAlive = true;
};

Cell.prototype.makeDead = function () {
  this.isAlive = false;
};

export { Cell };
