const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().trim().split("\n\n");
const totals = input.map(group => group.split("\n").reduce((a, b) => a + parseInt(b, 10), 0));
// Part one
const max = Math.max(...totals);
console.log({ max });
// Part two
const topThree = totals.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0);
console.log({ topThree });