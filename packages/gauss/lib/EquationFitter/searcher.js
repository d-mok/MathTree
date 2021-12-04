"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFittableOrder = void 0;
const utils_1 = require("../utils");
class Searcher {
    constructor(fs, givens = []) {
        this.fs = fs;
        this.givens = givens;
        this.founds = new Set();
    }
    reset() {
        this.founds = new Set(this.givens);
    }
    /**
     * A function is full if all variables in it are found.
     */
    isFull(f) {
        return (0, utils_1.getVars)(f).every($ => this.founds.has($));
    }
    fit(f) {
        (0, utils_1.getVars)(f).forEach($ => this.founds.add($));
    }
    /**
     * Check if the functions can be fitted one by one without being full.
     */
    isFittableOrder(fs) {
        this.reset();
        for (let f of fs) {
            if (this.isFull(f))
                return false;
            this.fit(f);
        }
        return true;
    }
    /**
     * Randomly get a fittable order under current presets.
     */
    getFittableOrder() {
        for (let fs of (0, utils_1.permute)(this.fs)) {
            if (this.isFittableOrder(fs))
                return fs;
        }
        return undefined;
    }
}
/**
 * Randomly get a fittable order for this set of functions under these presets.
 * If no fittable order exists, return undefined.
 */
function getFittableOrder(fs, preset) {
    const givens = [];
    for (let k in preset) {
        let v = preset[k];
        if (Number.isFinite(v))
            givens.push(k);
    }
    const sr = new Searcher(fs, givens);
    return sr.getFittableOrder();
}
exports.getFittableOrder = getFittableOrder;
//# sourceMappingURL=searcher.js.map