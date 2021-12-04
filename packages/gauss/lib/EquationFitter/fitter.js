"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fitter = void 0;
const Bisection_1 = require("./Bisection");
const utils_1 = require("../utils");
const searcher_1 = require("./searcher");
class Fitter {
    constructor(fs, ranges, preset) {
        this.fs = fs;
        this.ranges = ranges;
        this.preset = preset;
        this.vals = {};
        this.allVariables = (0, utils_1.getAllVars)(fs);
        this.reset();
    }
    reset() {
        this.vals = {};
        this.allVariables.forEach($ => this.vals[$] = NaN);
        this.setVals(this.preset);
    }
    setVals(vals) {
        this.vals = { ...this.vals, ...vals };
    }
    fitOne(f) {
        const sol = (0, Bisection_1.bisect)(f, this.ranges, this.vals);
        this.setVals(sol);
    }
    /**
     * Try to fit the system by fitting the equations one by one in a fittable order.
     * To avoid accidental range conflict, 10 retries are allowed.
     */
    fit() {
        const orderedFS = (0, searcher_1.getFittableOrder)(this.fs, this.preset);
        if (orderedFS === undefined)
            throw 'There is no fittable order for this system.';
        for (let i = 0; i < 10; i++) {
            try {
                this.reset();
                orderedFS.forEach($ => this.fitOne($));
                return this.vals;
            }
            catch {
            }
        }
        throw 'The system is not fittable in given range.';
    }
}
exports.Fitter = Fitter;
//# sourceMappingURL=fitter.js.map