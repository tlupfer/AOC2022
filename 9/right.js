const fs = require('fs');
const input = fs.readFileSync("input.txt").toString();

const TAIL_CNT = 9;

let moves = [];

for (const line of input.split("\n")) {
  const tmp = line.split(" ");
  moves.push([tmp[0], parseInt(tmp[1])]);
}

let hX = 0;
let hY = 0;

let visited = new Set(["0/0"]);
let tails = [];

for (let i = 0; i < TAIL_CNT; i++) {
  tails.push([0, 0]);
}

const moveHeadTo = (direction) => {
  switch (direction) {
    case "U":
      hY = hY + 1;
      break;
    case "D":
      hY = hY - 1;
      break;
    case "L":
      hX = hX - 1;
      break;
    case "R":
      hX = hX + 1;
      break;
  }

  for (let i = 0; i < TAIL_CNT; i++) {
    moveTail(i);

    if (i === TAIL_CNT - 1) {
      let [lasttX, lasttY] = tails[TAIL_CNT - 1];
      visited.add(`${lasttX}/${lasttY}`);
    }
  }
};

const moveTail = (i) => {
  let [tX, tY] = tails[i];

  let refX = 0;
  let refY = 0;

  if (i > 0) {
    let [prevtX, prevtY] = tails[i - 1];
    refX = prevtX;
    refY = prevtY;
  } else {
    refX = hX;
    refY = hY;
  }

  let diffX = Math.abs(refX - tX);
  let diffY = Math.abs(refY - tY);

  if (diffX < 2 && diffY < 2) {
    return;
  }

  if (diffX > 1 && !diffY) {
    tX += refX - tX > 0 ? 1 : -1;
  } else if (diffY > 1 && !diffX) {
    tY += refY - tY > 0 ? 1 : -1;
  } else {
    tX += refX - tX > 0 ? 1 : -1;
    tY += refY - tY > 0 ? 1 : -1;
  }

  tails[i] = [tX, tY];
};

let i = 0;

for (const [direction, steps] of moves) {
  for (let n = 0; n < steps; n++) {
    moveHeadTo(direction);
  }

  i++;
}

console.log(visited.size);
