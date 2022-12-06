const fs = require('fs');
const transmission = fs.readFileSync("input.txt").toString().trim();

for (let i = 0; i < transmission.length; i++) {
  const packet = transmission.slice(i, i + 4);
  const set = new Set([...packet]);
  if (set.size === 4) {
    console.log(`Packet found at position ${i + 4}`);
    break;
  }
}

for (let i = 0; i < transmission.length; i++) {
  const packet = transmission.slice(i, i + 14);
  const set = new Set([...packet]);
  if (set.size === 14) {
    console.log(`Message found at position ${i + 14}`);
    break;
  }
}
