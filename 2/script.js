const fs = require('fs');
const matches = fs.readFileSync("input.txt").toString().trim().split("\n");
// Part one
const shapePoints = (shape) => shape === 'X' ? 1 : (shape === 'Y' ? 2 : 3);
const outcomePoints = (them, us) => {
  switch (us) {
    case 'X':
      return them === 'A' ? 3 : (them === 'B' ? 0 : 6);
    case 'Y':
      return them === 'A' ? 6 : (them === 'B' ? 3 : 0);
    case 'Z':
      return them === 'A' ? 0 : (them === 'B' ? 6 : 3);
  }
};
console.log(
  matches.map((match) => {
    const [them, us] = match.split(' ');
    return shapePoints(us) + outcomePoints(them, us);
  }).reduce((a, b) => a + b, 0)
);

// Part two
const resultsPoints = res => res === 'X' ? 0 : (res === 'Y' ? 3 : 6);
const neededShapePoints = (them, result) => {
  switch (result) {
    case 'X':
      return them === 'A' ? 3 : (them === 'B' ? 1 : 2);
    case 'Y':
      return them === 'A' ? 1 : (them === 'B' ? 2 : 3);
    case 'Z':
      return them === 'A' ? 2 : (them === 'B' ? 3 : 1);
  }
};
console.log(
  matches.map((match) => {
    const [them, result] = match.split(' ');
    return resultsPoints(result) + neededShapePoints(them, result);
  }).reduce((a, b) => a + b, 0)
);