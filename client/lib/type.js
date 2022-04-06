"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seed = exports.Fruit = void 0;
class Fruit {
    constructor(id = '', rawFruit) {
        this.qn = 'Loading...';
        this.sol = 'Loading...';
        this.ans = 'X';
        this.counter = 0;
        this.success = false;
        this.logs = [];
        this.time = 0;
        this.key = Math.random();
        this.id = '';
        this.id = id;
        if (rawFruit !== undefined)
            Object.assign(this, rawFruit);
    }
}
exports.Fruit = Fruit;
class Seed {
    constructor(seedFetch) {
        this.fruit = new Fruit();
        this.id = seedFetch.id;
        this.bank = seedFetch.bank;
        this.folder = seedFetch.folder;
        this.gene = seedFetch.gene;
    }
    grow() {
        const MSFruit = MathSoil2.reap(this.gene);
        this.fruit = new Fruit(this.id, MSFruit);
    }
}
exports.Seed = Seed;
//# sourceMappingURL=type.js.map