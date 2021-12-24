import { bisect } from './Bisection/index.ts'
import { getAllVars } from '../utils.ts'
import { getFittableOrder } from './searcher.ts'
import { tree, zeroFunction, rangeObj, valObj } from "../types.ts"


export class Fitter {

    private readonly allVariables: string[]

    private vals: valObj = {}

    constructor(
        private readonly fs: zeroFunction[],
        private readonly ranges: rangeObj,
        private readonly preset: valObj
    ) {
        this.allVariables = getAllVars(fs)
        this.reset()
    }

    private reset() {
        this.vals = {}
        this.allVariables.forEach($ => this.vals[$] = NaN)
        this.setVals(this.preset)
    }

    private setVals(vals: valObj) {
        this.vals = { ...this.vals, ...vals }
    }

    private fitOne(f: zeroFunction) {
        const sol = bisect(f, this.ranges, this.vals)
        this.setVals(sol)
    }

    /**
     * Try to fit the system by fitting the equations one by one in a fittable order.
     * To avoid accidental range conflict, 10 retries are allowed.
     */
    fit(): valObj {
        const orderedFS = getFittableOrder(this.fs, this.preset)
        if (orderedFS === undefined)
            throw 'There is no fittable order for this system.'
        for (let i = 0; i < 10; i++) {
            try {
                this.reset()
                orderedFS.forEach($ => this.fitOne($))
                return this.vals
            } catch {

            }
        }
        throw 'The system is not fittable in given range.'
    }

}

