const header = "#Life 1.06";

function exportToLife106(board) {
  let result = "";
  result = header + "\n";
  const aliveCells = board.flat().filter((c) => c.isAlive);

  for (const cell of aliveCells) {
    const positionX = cell.positionX;
    const positionY = cell.positionY;
    const line = `${positionX} ${positionY}\n`;
    result += line;
  }
  return result;
}

export { exportToLife106 };
