const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().trim().split('\n');
const coordinates = lines.map(line => line.match(/\d+,\d+/g)).flat()
  .map(pair => pair.split(',').map(Number));
const xMax = Math.max(...coordinates.map(pair => pair[0]));
const xMin = Math.min(...coordinates.map(pair => pair[0]));
const yMax = Math.max(...coordinates.map(pair => pair[1]));
const yMin = 0;
const xAxis = xMax - xMin + 1;
const yAxis = yMax - yMin + 1;
const grid = [...Array(yAxis).keys()].map(() => [...Array(xAxis).keys()].map(() => '.'));

lines.forEach((line) => {
  const points = line.match(/\d+,\d+/g).map(p => p.split(',').map(Number));
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    const xIndex = x - xMin;
    grid[y][xIndex] = '#';
    if (points[i - 1]) {
      const [lastX, lastY] = points[i - 1];
      const lastXindex = lastX - xMin;
      if (lastXindex !== xIndex) {
        const start = lastXindex < xIndex ? lastXindex : xIndex;
        const finish = lastXindex < xIndex ? xIndex : lastXindex;
        for (let j = start; j <= finish; j++) grid[y][j] = '#';
      } else if (lastY !== y) {
        const start = lastY < y ? lastY : y;
        const finish = lastY < y ? y : lastY;
        for (let j = start; j <= finish; j++) {
          grid[j][xIndex] = '#';
        }
      }
    }
  }
});

const isAir = (x, y) => grid[y] && grid[y][x] === '.';

const dropSand = () => {
  let x = 500 - xMin;
  let y = grid.findIndex(row => !isAir(x, row)) - 1;
  while (true) {
    if (!x || y === grid.length - 1) break;
    if (isAir(x, y + 1)) {
      y++;
    } else if (isAir(x - 1, y + 1)) {
      x--;
      y++;
    } else if (isAir(x + 1, y + 1)) {
      x++;
      y++;
    } else {
      grid[y][x] = 'O';
      break;
    }
  }
};

const getTotal = () => grid.reduce((count, row) => count + row.filter(c => c === 'O').length, 0);

let lastTotal = 0;
while (true) {
  dropSand();
  const newTotal = getTotal();
  if (newTotal === lastTotal) break;
  lastTotal = newTotal;
}

grid.forEach((l) => {
  l.forEach(c => process.stdout.write(c));
  process.stdout.write("\n");
});

console.log(getTotal());
