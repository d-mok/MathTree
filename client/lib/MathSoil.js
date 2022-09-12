"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reap = exports.Fruit = void 0;
class RawFruit {
    constructor() {
        this.qn = 'Loading...';
        this.sol = 'Loading...';
        this.ans = 'X';
        this.counter = 0;
        this.success = false;
        this.logs = [];
        this.time = 0;
    }
}
class Fruit extends RawFruit {
    constructor(id = '', rawFruit) {
        super();
        this.key = Math.random();
        this.id = '';
        this.id = id;
        if (rawFruit !== undefined)
            Object.assign(this, rawFruit);
    }
}
exports.Fruit = Fruit;
function reap(id, gene) {
    const RawFruit = MathSoil2.reap(gene);
    return new Fruit(id, RawFruit);
}
exports.reap = reap;
//# sourceMappingURL=MathSoil.js.map