const fs = require('fs');
const monkeysRaw = fs.readFileSync("input.txt").toString().trim().split('\n\n');

class Monkey {
  constructor(text) {
    const [id, items, ops, test, isTrue, isFalse] = text.split('\n');
    [this.divisibleBy] = test.match(/\d+/).map(Number);
    [this.id] = id.match(/\d+/).map(Number);
    [this.isFalse] = isFalse.match(/\d+/).map(Number);
    [this.isTrue] = isTrue.match(/\d+/).map(Number);
    this.inspectCount = 0;
    this.items = items.match(/\d+/g).map(Number);
    this.operation = ops.split(' = ')[1];
    this.otherMonkeys = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  calculateWorry(old) {
    return eval(this.operation);
  }

  getId() {
    return this.id;
  }

  getInspectedItems() {
    return this.inspectCount;
  }

  inspectAllItems(divideByThree = true) {
    while (this.items.length > 0) {
      const item = this.items.shift();
      this.inspectItem(item, divideByThree);
    }
  }

  inspectItem(item, divideByThree) {
    this.inspectCount++;
    let newItem = this.calculateWorry(item);
    if (divideByThree) newItem = Math.floor(newItem / 3);
    if (this.testItem(newItem)) {
      this.passToMonkey(this.isTrue, newItem);
    } else {
      this.passToMonkey(this.isFalse, newItem);
    }
  }

  passToMonkey(id, value) {
    const recipient = this.otherMonkeys.find(monkey => monkey.getId() === id);
    recipient.addItem(value);
  }

  setOtherMonkeys(monkeys) {
    this.otherMonkeys = monkeys.filter(monkey => monkey.getId() !== this.id);
  }

  testItem(item) {
    return item % this.divisibleBy === 0;
  }
}

const monkeys = monkeysRaw.map(data => new Monkey(data));
monkeys.forEach(monkey => monkey.setOtherMonkeys(monkeys));

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => {
    monkey.inspectAllItems();
  });
}

const sortedMonkeys = monkeys.sort((a, b) => b.getInspectedItems() - a.getInspectedItems());
console.log(sortedMonkeys[0].getInspectedItems() * sortedMonkeys[1].getInspectedItems());
