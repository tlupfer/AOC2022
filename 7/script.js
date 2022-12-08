const fs = require('fs');
const terminal = fs.readFileSync("input.txt").toString().trim().split('\n');

let cwd = [];
const directories = {};
let usedSpace = 0;

terminal.forEach((line) => {
  if (line.match(/^\$ cd (.+)/)) {
    const [dir] = line.match(/[^ ]+$/);
    switch (dir) {
      case '/':
        break;
      case '..':
        cwd.pop();
        break;
      default:
        cwd.push(dir);
        break;
    }
  }
  if (line.match(/^\d+/)) {
    const [size] = line.split(' ').map(Number);
    usedSpace += size;
    if (cwd.length) {
      for (let i = 1; i <= cwd.length; i++) {
        const path = cwd.slice(0, i).join('-');
        directories[path] ? directories[path] += size : directories[path] = size;
      }
    }
  }
});

const dirSizes = Object.values(directories).filter(v => v <= 100000);
console.log(dirSizes.reduce((a, b) => a + b, 0));

const availableSpace = 70000000 - usedSpace;
const neededSpace = 30000000 - availableSpace;
const sortedSizes = Object.values(directories).sort((a, b) => a - b);

for (let i = 0; i < sortedSizes.length; i++) {
  if (sortedSizes[i] > neededSpace) {
    console.log(sortedSizes[i]);
    break;
  }
}