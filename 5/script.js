const fs = require('fs');
const [stackSection, stepSection] = fs.readFileSync("input.txt").toString().split("\n\n");
const stackRows = stackSection.split('\n');
const stepRows = stepSection.split('\n');
const stacks = stackRows.pop().match(/\d/g).map(() => new Array);
const longestLine = stackRows.reduce((a, b) => b.length > a ? b.length : a, 0);
stackRows.reverse();
// Generate stacks of crates at arary index
stackRows.forEach((row) => {
  let stackPosition = 0;
  for (let i = 1; i < longestLine; i += 4) {
    const crate = [...row][i].trim();
    if (crate) stacks[stackPosition].push(crate);
    stackPosition++;
  }
});
// Should really mutate stacks, but here we are
const stack9001 = JSON.parse(JSON.stringify(stacks));

// Process instructions part one
stepRows.forEach((row) => {
  const [move, from, to] = row.match(/\d+/g).map(Number);
  for (let i = 0; i < move; i++) {
    stacks[to - 1].push(stacks[from - 1].pop());
  }
});

console.log(stacks.map(stack => stack[stack.length - 1]).join(''));

// Process instructions part two
stepRows.forEach((row) => {
  const [move, from, to] = row.match(/\d+/g).map(Number);
  const moveCrates = stack9001[from - 1].splice(-1 * move);
  stack9001[to - 1] = stack9001[to - 1].concat(moveCrates);
});

console.log(stack9001.map(stack => stack[stack.length - 1]).join(''));

