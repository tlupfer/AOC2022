const fs = require('fs');
const util = require('util');

const allPackets = [
  ...fs.readFileSync("input.txt").toString().split('\n').filter(l => !!l).map(JSON.parse),
  [[2]],
  [[6]],
];

const setOrder = (x, value) => {
  if (typeof x.sorted === 'undefined') x.sorted = value;
};

const checkOrder = (left, right, x) => {
  if (typeof x.sorted === 'boolean') return;
  const leftIsArray = left.constructor === Array;
  const rightIsArray = right.constructor === Array;
  if (!leftIsArray && !rightIsArray) {
    if (left < right) setOrder(x, true);
    if (left > right) setOrder(x, false);
  } else if (leftIsArray && rightIsArray) {
    const maxLength = Math.max(right.length, left.length);
    for (let i = 0; i < maxLength; i++) {
      if (typeof left[i] === 'undefined') {
        setOrder(x, true);
      } else if (typeof right[i] === 'undefined') {
        setOrder(x, false);
      }
      checkOrder(left[i], right[i], x);
    }
  } else {
    if (rightIsArray) {
      checkOrder([left], right, x);
    } else {
      checkOrder(left, [right], x);
    }
  }
};

const sortedJson = allPackets.sort((a, b) => {
  let x = {};
  checkOrder(a, b, x);
  return x.sorted ? -1 : 1;
}).map(JSON.stringify);

console.log((sortedJson.indexOf('[[2]]') + 1) * (sortedJson.indexOf('[[6]]') + 1));
