const fs = require('fs');
const rucksacks = fs.readFileSync("input.txt").toString().trim().split("\n");

const getPriority = chr => chr.match(/[A-Z]/) ? chr.charCodeAt(0) - 64 + 26 : chr.charCodeAt(0) - 96;

const total = rucksacks.map((sack) => {
  const first = [...sack.slice(0, sack.length / 2)];
  const second = [...sack.slice(sack.length / 2)];
  const intersection = new Set(first.filter(chr => second.includes(chr)));
  const { value } = intersection.values().next();
  return getPriority(value);
}).reduce((a, b) => a + b, 0);

console.log({ total });

let secondTotal = 0;
for (let i = 0; i < rucksacks.length; i += 3) {
  const group = rucksacks.slice(i, i + 3);
  const first = [...group[0]];
  const second = [...group[1]];
  const third = [...group[2]];
  const intersection = new Set(first.filter(a => second.includes(a) && third.includes(a)));
  const { value } = intersection.values().next();
  secondTotal += getPriority(value);
}

console.log({ secondTotal });