const fs = require('fs');
const util = require('util');

const pairs = fs.readFileSync("input.txt").toString().trim().split('\n\n')
  .map((pair, index) => ({
    raw: pair,
    index,
    // steps: [],
  }));

const setOrder = (index, value) => {
  if (typeof pairs[index].correctOrder === 'undefined') {
    pairs[index].correctOrder = value;
  }
};

const checkOrder = (left, right, index) => {
  if (typeof pairs[index].correctOrder === 'boolean') return;
  // pairs[index].steps.push({ left, right });
  const leftIsArray = left.constructor === Array;
  const rightIsArray = right.constructor === Array;
  if (!leftIsArray && !rightIsArray) {
    if (left < right) setOrder(index, true);
    if (left > right) setOrder(index, false);
  } else if (leftIsArray && rightIsArray) {
    const maxLength = Math.max(right.length, left.length);
    for (let i = 0; i < maxLength; i++) {
      if (typeof left[i] === 'undefined') {
        setOrder(index, true);
      } else if (typeof right[i] === 'undefined') {
        setOrder(index, false);
      }
      checkOrder(left[i], right[i], index);
    }
  } else {
    if (rightIsArray) {
      checkOrder([left], right, index);
    } else {
      checkOrder(left, [right], index);
    }
  }
};

const correct = pairs.filter((pair) => {
  const [left, right] = pair.raw.split("\n").map(JSON.parse);
  checkOrder(left, right, pair.index);
  return pair.correctOrder;
});

// console.log(util.inspect(correct, { colors: true, depth: null }));
console.log(correct.reduce((a, b) => a + (b.index + 1), 0))
