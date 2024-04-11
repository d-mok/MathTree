"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seed = exports.SeedRow = void 0;
const MathSoil_1 = require("./MathSoil");
class SeedRow {
    constructor() {
        this.id = '';
        this.qn = '';
        this.sol = '';
        this.populate = '';
        this.validate = '';
        this.preprocess = '';
        this.postprocess = '';
    }
}
exports.SeedRow = SeedRow;
class Seed extends SeedRow {
    constructor(row) {
        super();
        this.fruit = new MathSoil_1.Fruit();
        Object.assign(this, row);
    }
    getGene() {
        return {
            qn: this.qn,
            sol: this.sol,
            populate: this.populate,
            validate: this.validate,
            preprocess: this.preprocess,
            postprocess: this.postprocess,
        };
    }
    grow() {
        this.fruit = (0, MathSoil_1.reap)(this.id, this.getGene());
    }
}
exports.Seed = Seed;
//# sourceMappingURL=seed.js.map