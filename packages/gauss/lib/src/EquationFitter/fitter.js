import { bisect } from '../Bisection';
import { getAllVars } from '../utils';
import { getFittableOrder } from './searcher';
export class Fitter {
    constructor(fs, ranges, preset) {
        this.fs = fs;
        this.ranges = ranges;
        this.preset = preset;
        this.vals = {};
        this.allVariables = getAllVars(fs);
        this.reset();
    }
    reset() {
        this.vals = {};
        this.allVariables.forEach($ => (this.vals[$] = NaN));
        this.setVals(this.preset);
    }
    setVals(vals) {
        this.vals = { ...this.vals, ...vals };
    }
    fitOne(f) {
        const sol = bisect(f, this.ranges, this.vals);
        this.setVals(sol);
    }
    /**
     * Try to fit the system by fitting the equations one by one in a fittable order.
     * To avoid accidental range conflict, 10 retries are allowed.
     */
    fit() {
        const orderedFS = getFittableOrder(this.fs, this.preset);
        if (orderedFS === undefined)
            throw 'There is no fittable order for this system.';
        for (let i = 0; i < 10; i++) {
            try {
                this.reset();
                orderedFS.forEach($ => this.fitOne($));
                return this.vals;
            }
            catch { }
        }
        throw 'The system is not fittable in given range.';
    }
}
//# sourceMappingURL=fitter.js.map