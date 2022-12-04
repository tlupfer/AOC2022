const fs = require('fs');
const pairs = fs.readFileSync("input.txt").toString().trim().split("\n");

const contained = pairs.filter((pair) => {
  const [first, second] = pair.split(',');
  const [fstart, fend] = first.split('-').map(Number);
  const [sstart, send] = second.split('-').map(Number);
  return (fstart >= sstart && fend <= send) || (sstart >= fstart && send <= fend);
});

console.log(`Contained pairs: ${contained.length}`);

const overlap = pairs.filter((pair) => {
  const [first, second] = pair.split(',');
  const [fstart, fend] = first.split('-').map(Number);
  const [sstart, send] = second.split('-').map(Number);
  const fnums = new Set([...Array(fend - fstart + 1).keys()].map(i => i + fstart));
  const snums = [...Array(send - sstart + 1).keys()].map(i => i + sstart);
  return !!snums.filter(num => fnums.has(num)).length;
});

console.log(`Overlapped pairs: ${overlap.length}`);

