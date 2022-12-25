const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().trim().split('\n');

class Beacon {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  getCoordinates () {
    return [this.x, this.y];
  }

  isBeaconAt (x, y) {
    return x === this.x && y === this.y;
  }
};

class Sensor {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  setClosestBeacon (beacon) {
    this.closestBeacon = beacon;
  }

  getBeaconDistance () {
    const [bx, by] = this.closestBeacon.getCoordinates();
    return Math.abs(bx - this.x) + Math.abs(by - this.y);
  }

  isBeaconImpossible (x, y) {
    const distance = this.getBeaconDistance();
    const yTravel = Math.abs(y - this.y)
    const xTravel = Math.abs(x - this.x);
    return (yTravel + xTravel) <= distance;
  }

  getBlackoutBoundaries () {
    const distance = this.getBeaconDistance();
    const minX = this.x - distance;
    const maxX = this.x + distance;
    const minY = this.y - distance;
    const maxY = this.y + distance;
    return [minX, maxX, minY, maxY];
  }

  getBlackoutRangeAtRow (row) {
    const distance = this.getBeaconDistance();
    const yDist = Math.abs(this.y - row);
    if (yDist > distance) return false;
    const xDist = distance - yDist;
    const xStart = this.x - xDist > 0 ? this.x - xDist : 0;
    const xEnd = this.x + xDist < 4000000 ? this.x + xDist : 4000000;
    return [xStart, xEnd];
  }
}

const sensors = [];
const beacons = [];

lines.forEach((line) => {
  const [sx, sy, bx, by] = line.match(/[-]?\d+/g).map(Number);
  const sensor = new Sensor(sx, sy);
  const beacon = new Beacon(bx, by);
  sensor.setClosestBeacon(beacon);
  sensors.push(sensor);
  beacons.push(beacon);
});

const colStart = sensors.reduce((a, b) => {
  const min = b.getBlackoutBoundaries()[0];
  return min < a ? min : a;
}, Infinity);
const colFinish = sensors.reduce((a, b) => {
  const max = b.getBlackoutBoundaries()[1];
  return max > a ? max : a;
}, colStart);

let impossible = 0;;
for (let x = colStart; x <= colFinish; x++) {
  if (sensors.some(sensor => sensor.isBeaconImpossible(x, 2000000))
      && beacons.every(beacon => !beacon.isBeaconAt(x, 2000000))) {
    impossible++;
  }
}

console.log(impossible);

let distressedRow;
for (let i = 0; i <= 4000000; i++) {
  const ranges = sensors.map(sensor => sensor.getBlackoutRangeAtRow(i))
    .filter(Boolean).sort((a, b) => a[0] - b[0]);
  let lowWaterMark = Infinity;
  let highWaterMark = 0;
  ranges.forEach((range) => {
    if (range[0] < lowWaterMark) lowWaterMark = range[0];
    if (range[0] > (highWaterMark + 1)) distressedRow = i;
    if (range[1] > highWaterMark) highWaterMark = range[1];
  });
  if (lowWaterMark !== 0) distressedRow = i;
  if (highWaterMark !== 4000000) distressedRow = i;
}

console.log({ distressedRow });

for (let x = 0; x <= 4000000; x++) {
  if (sensors.every(sensor => !sensor.isBeaconImpossible(x, distressedRow))
      && beacons.every(beacon => !beacon.isBeaconAt(x, distressedRow))) {
    console.log(x * 4000000 + distressedRow);
    break;
  }
}