const fs = require('fs');
const grid = fs.readFileSync("input.txt")
  .toString().trim().split('\n').map(r => [...r].map(Number));

const visibleTrees = new Set();
for (let row = 0; row < grid.length; row++) {
  for (let column = 0; column < grid[row].length; column++) {
    const height = grid[row][column];
    const left = grid[row].slice(0, column);
    if (!left.filter(h => h >= height).length) visibleTrees.add(`${row}-${column}`);
    const right = grid[row].slice(column + 1);
    if (!right.filter(h => h >= height).length) visibleTrees.add(`${row}-${column}`);
    const above = grid.slice(0, row).map(r => r[column]);
    if (!above.filter(h => h >= height).length) visibleTrees.add(`${row}-${column}`);
    const below = grid.slice(row + 1).map(r => r[column]);
    if (!below.filter(h => h >= height).length) visibleTrees.add(`${row}-${column}`);
  }
}

console.log(visibleTrees.size);

const scenicScores = [];
for (let row = 0; row < grid.length; row++) {
  for (let column = 0; column < grid[row].length; column++) {
    const height = grid[row][column];
    const left = grid[row].slice(0, column);
    left.reverse();
    let ld = 0;
    left.every((h) => {
      ld++;
      return h < height;
    });
    const right = grid[row].slice(column + 1);
    let rd = 0;
    right.every((h) => {
      rd++;
      return h < height;
    });
    const above = grid.slice(0, row).map(r => r[column]);
    above.reverse();
    let ad = 0;
    above.every((h) => {
      ad++;
      return h < height;
    });
    const below = grid.slice(row + 1).map(r => r[column]);
    let bd = 0;
    below.every((h) => {
      bd++;
      return h < height;
    });
    scenicScores.push(ld * rd * ad * bd);
  }
}

console.log(scenicScores.sort((a, b) => b - a)[0]);
