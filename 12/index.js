const fs = require('fs');
const Graph = require('node-dijkstra');
const grid = fs.readFileSync("input.txt").toString().trim().split('\n').map((r) => {
  return [...r].map((chr) => {
    if (chr === 'S') return 'a'.charCodeAt(0) - 1;
    if (chr === 'E') return 'z'.charCodeAt(0) + 1;
    return chr.charCodeAt(0);
  });
});

const findStartCoordinates = (grid) => {
  for (let i =0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (grid[i][j] === 'a'.charCodeAt(0) - 1) return `${j},${i}`;
    }
  }
};

const findHighCoordinates = (grid) => {
  for (let i =0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (grid[i][j] === 'z'.charCodeAt(0) + 1) return `${j},${i}`;
    }
  }
};

const getRoute = (grid) => {
  const route = new Graph();
  const isPositionValid = (x, y) => !!(grid[y] && grid[y][x]);
  grid.forEach((line, y) => {
    line.forEach((node, x) => {
      const neighbors = {};
      if (isPositionValid(x - 1, y)) neighbors[`${x - 1},${y}`] = grid[y][x - 1];
      if (isPositionValid(x + 1, y)) neighbors[`${x + 1},${y}`] = grid[y][x + 1];
      if (isPositionValid(x, y - 1)) neighbors[`${x},${y - 1}`] = grid[y - 1][x];
      if (isPositionValid(x, y + 1)) neighbors[`${x},${y + 1}`] = grid[y + 1][x];
      Object.keys(neighbors).forEach((key) => {
        if (neighbors[key] > (grid[y][x] + 1)) delete neighbors[key];
      });
      route.addNode(`${x},${y}`, neighbors);
    });
  });
  return route;
};

const route = getRoute(grid);
const highPoint = findHighCoordinates(grid);
console.log(route.path(findStartCoordinates(grid), highPoint).length - 1);

const findAllStartCoordinates = (grid) => {
  const starts = [];
  for (let i =0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (grid[i][j] === 'a'.charCodeAt(0)) starts.push(`${j},${i}`);
    }
  }
  return starts;
};

console.log(findAllStartCoordinates(grid).reduce((low, start) => {
  const path = route.path(start, highPoint);
  if (!path) return low;
  const steps = path.length - 1;
  return steps < low ? steps : low;
}, Infinity));
