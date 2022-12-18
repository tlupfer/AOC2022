const fs = require('fs');
const instructions = fs.readFileSync("input.txt").toString().trim()
  .split('\n').map(l => l.split(' '));

let head = [0, 0];
let tail = [0, 0];

const tailVisited = new Set(['0,0']);

const areTouching = (h, t) => {
  let touching = false;
  // Same column
  if (h[0] === t[0] && Math.abs(h[1] - t[1]) === 1) touching = true;
  // Same row
  if (h[1] === t[1] && Math.abs(h[0] - t[0]) === 1) touching = true;
  // Diagonal
  if (Math.abs(h[0] - t[0]) === 1 && Math.abs(h[1] - t[1]) === 1) touching = true;
  // Covering
  if (h[0] == t[0] && h[1] === t[1]) touching = true;
  return touching;
};

const moveDiagonal = (h, t) => {
  // If h is above and left
  if (h[1] < t[1] && h[0] < t[0]) {
    t[0]--;
    t[1]--;
  }
  // If h is above and right
  if (h[1] < t[1] && h[0] > t[0]) {
    t[0]++;
    t[1]--;
  }
  // If h is below and left
  if (h[1] > t[1] && h[0] < t[0]) {
    t[0]--;
    t[1]++;
  }
  // If h is below and right
  if (h[1] > t[1] && h[0] > t[0]) {
    t[0]++;
    t[1]++;
  }
  return [h, t];
};

instructions.forEach((move) => {
  const positions = parseInt(move[1], 10);
  // Move head
  switch (move[0]) {
    case 'U':
      head[1] -= positions;
      break;
    case 'D':
      head[1] += positions;
      break;
    case 'R':
      head[0] += positions;
      break;
    case 'L':
      head[0] -= positions;
      break;
    default:
      break;
  }
  while (!areTouching(head, tail)) {
    switch (move[0]) {
      case 'U':
      case 'D':
        // Need a diagonal move
        if (head[0] !== tail[0]) {
          [head, tail] = moveDiagonal(head, tail);
        // Need a vertical move
        } else {
          if (head[1] < tail[1]) tail[1]--;
          if (head[1] > tail[1]) tail[1]++;
        }
        break;
      case 'R':
      case 'L':
        // Need a diagonal move
        if (head[1] !== tail[1]) {
          [head, tail] = moveDiagonal(head, tail);
        // Need a horizontal move
        } else {
          if (head[0] < tail[0]) tail[0]--;
          if (head[0] > tail[0]) tail[0]++;
        }
        break;
      default:
        break;
    }
    tailVisited.add(tail.join(','));
  }
});

console.log(`Tail visited ${tailVisited.size} locations`);

const longTailVisited = new Set(['0,0']);
// Part two
let knots = [...Array(10)].map(() => [0,0]);
instructions.forEach((move) => {
  let positions = parseInt(move[1], 10);
  while (positions > 0) {
    // Move head
    switch (move[0]) {
      case 'U':
        knots[0][1]--;
        break;
      case 'D':
        knots[0][1]++;
        break;
      case 'R':
        knots[0][0]++;
        break;
      case 'L':
        knots[0][0]--;
        break;
      default:
        break;
    }
    positions--;
    for (let currentKnot = 1; currentKnot < knots.length; currentKnot++) {
      let current = knots[currentKnot];
      let previous = knots[currentKnot - 1];
      while (!areTouching(previous, current)) {
        longTailVisited.add(knots[9].join(','));
        // Need diagonal 
        if (previous[0] !== current[0] && previous[1] !== current[1]) {
          [previous, current] = moveDiagonal(previous, current);
          knots[currentKnot] = current;
          knots[currentKnot - 1] = previous;
        } else {
          if (previous[0] !== current[0]) {
            if (previous[0] > current[0]) {
              knots[currentKnot][0]++;
            }
            if (previous[0] < current[0]) {
              knots[currentKnot][0]--;
            }
          } else if (previous[1] !== current[1]) {
            if (previous[1] > current[1]) {
              knots[currentKnot][1]++;
            }
            if (previous[1] < current[1]) {
              knots[currentKnot][1]--;
            }
          } 
        }
      }
    }
  }
});

console.log(`Long visited ${longTailVisited.size} locations`);
