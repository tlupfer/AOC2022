const fs = require('fs');
const operations = fs.readFileSync("input.txt").toString().trim().split('\n')

let currentCycle = 0;
let currentX = 1;
let sum = 0;

const addSum = () => {
  switch (currentCycle) {
    case 20:
    case 60:
    case 100:
    case 140:
    case 180:
    case 220:
      sum += (currentX * currentCycle);
      break;
    default:
      break;
  }
};

operations.forEach((line) => {
  if (line.match(/noop/)) {
    currentCycle++;
    addSum();
  } else {
    const [value] = line.match(/[^ ]+$/).map(Number);
    currentCycle++;
    addSum();
    currentCycle++; 
    addSum();
    currentX += value;
  }
});

console.log({ sum });

let cycle = 0;
let x = 1;

const drawPixel = () => {
  const position = (cycle - 1) % 40;
  if (position === 0) process.stdout.write("\n");
  if (Math.abs(position - x) <= 1) {
    process.stdout.write("#");
  } else {
    process.stdout.write(" ");
  }
};

operations.forEach((line) => {
  if (line.match(/noop/)) {
    cycle++;
    drawPixel();
  } else {
    const [value] = line.match(/[^ ]+$/).map(Number);
    cycle++;
    drawPixel();
    cycle++;
    drawPixel();
    x += value;
  }
});

process.stdout.write("\n");