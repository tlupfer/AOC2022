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
    this.blackout = this.getBeaconBlackout();
  }

  getBeaconDistance () {
    const [bx, by] = this.closestBeacon.getCoordinates();
    return Math.abs(bx - this.x) + Math.abs(by - this.y) + 1;
  }

  getBeaconBlackout () {
    const noBeacons = new Set([`${this.x},${this.y}`]);
    const distanceToBeacon = this.getBeaconDistance();
    for (let row = 0; row <= distanceToBeacon; row++) {
      const col = distanceToBeacon - row;
      // Vertical
      for (let j = 0; j < row; j++) {
        noBeacons.add(`${this.x},${this.y - j}`);
        noBeacons.add(`${this.x},${this.y + j}`);
      }
      // Horizontal
      for (let k = 0; k < col; k++) {
        noBeacons.add(`${this.x - k},${this.y - row}`);
        noBeacons.add(`${this.x - k},${this.y + row}`);
        noBeacons.add(`${this.x + k},${this.y - row}`);
        noBeacons.add(`${this.x + k},${this.y + row}`);
      }
    }
    return noBeacons;
  }

  isBeaconImpossible (x, y) {
    return this.blackout.has(`${x},${y}`);
  }

  getBlackoutBoundaries () {
    const arr = Array.from(this.blackout);
    const minX = arr.reduce((val, coordinates) => {
      const [x, y] = coordinates.split(',').map(Number);
      return x < val ? x : val;
    }, this.x);
    const maxX = arr.reduce((val, coordinates) => {
      const [x, y] = coordinates.split(',').map(Number);
      return x > val ? x : val;
    }, this.x);
    const minY = arr.reduce((val, coordinates) => {
      const [x, y] = coordinates.split(',').map(Number);
      return y < val ? y : val;
    }, this.y);
    const maxY = arr.reduce((val, coordinates) => {
      const [x, y] = coordinates.split(',').map(Number);
      return y > val ? y : val;
    }, this.y);
    return [minX, maxX, minY, maxY];
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

const impossible = new Set();
for (let x = colStart; x <= colFinish; x++) {
  if (sensors.some(sensor => sensor.isBeaconImpossible(x, 2000000))
      && beacons.every(beacon => !beacon.isBeaconAt(x, 2000000))) {
    impossible.add(`${x},2000000`).size;
  }
}

console.log(impossible);