const fs = require('fs');
const grid = fs.readFileSync("input.txt").toString().trim().split('\n').map(r => [...r]);

const routes = new Set();

const isValid = (current, to) => {
  if (current.charCodeAt(0) - to.charCodeAt(0) >= -1 || current === 'S') {
    return true;
  }
  return false;
};

const getShortestRoute = () => {
  const sorted = Array.from(routes).sort((a, b) => a.length - b.length);
  if (!sorted.length) return Infinity;
  return sorted[0].split(' ').length;
};

const move = (grid, x, y, path) => {
  const current = grid[y][x];
  if (path.length < getShortestRoute()) {
    // Check up
    if (grid[y - 1] && grid[y - 1][x] && !path.includes(`${x},${y - 1}`)) {
      const to = grid[y - 1][x];
      if (to === 'E' && current === 'z') {
        routes.add([ ...path, `${x},${y - 1}` ].join(' '));
      } else if (isValid(current, to)) {
        const newPath = [ ...path, `${x},${y - 1}` ];
        move(grid, x, y - 1, newPath);
      }
    }
    // Check down
    if (grid[y + 1] && grid[y + 1][x] && !path.includes(`${x},${y + 1}`)) {
      const to = grid[y + 1][x];
      if (to === 'E' && current === 'z') {
        routes.add([ ...path, `${x},${y + 1}` ].join(' '));
      } else if (isValid(current, to)) {
        const newPath = [ ...path, `${x},${y + 1}` ];
        move(grid, x, y + 1, newPath);
      }
    }
    // Check left
    if (grid[y][x - 1] && !path.includes(`${x - 1},${y}`)) {
      const to = grid[y][x - 1];
      if (to === 'E' && current === 'z') {
        routes.add([ ...path, `${x - 1},${y}` ].join(' '));
      } else if (isValid(current, to)) {
        const newPath = [ ...path, `${x - 1},${y}` ];
        move(grid, x - 1, y, newPath);
      }
    }
    // Check right
    if (grid[y][x + 1] && !path.includes(`${x + 1},${y}`)) {
      const to = grid[y][x + 1];
      if (to === 'E' && current === 'z') {
        routes.add([ ...path, `${x + 1},${y}` ].join(' '));
      } else if (isValid(current, to)) {
        const newPath = [ ...path, `${x + 1},${y}` ];
        move(grid, x + 1, y, newPath);
      }
    }
  }
};

move(grid, 0, 0, []);
console.log(getShortestRoute());