import { getVars, permute } from '../utils.ts'
import { tree, zeroFunction, rangeObj, valObj } from "../types.ts"

class Searcher {

    private founds: Set<string> = new Set<string>()

    constructor(
        private readonly fs: zeroFunction[],
        private readonly givens: string[] = []
    ) { }

    private reset() {
        this.founds = new Set(this.givens)
    }

    /**
     * A function is full if all variables in it are found.
     */
    private isFull(f: zeroFunction): boolean {
        return getVars(f).every($ => this.founds.has($))
    }

    private fit(f: zeroFunction): void {
        getVars(f).forEach($ => this.founds.add($))
    }

    /**
     * Check if the functions can be fitted one by one without being full.
     */
    private isFittableOrder(fs: zeroFunction[]): boolean {
        this.reset()
        for (let f of fs) {
            if (this.isFull(f)) return false
            this.fit(f)
        }
        return true
    }

    /**
     * Randomly get a fittable order under current presets.
     */
    getFittableOrder(): zeroFunction[] | undefined {
        for (let fs of permute(this.fs)) {
            if (this.isFittableOrder(fs)) return fs
        }
        return undefined
    }

}

/**
 * Randomly get a fittable order for this set of functions under these presets.
 * If no fittable order exists, return undefined.
 */
export function getFittableOrder(fs: zeroFunction[], preset: valObj): zeroFunction[] | undefined {
    const givens = []
    for (let k in preset) {
        let v = preset[k]
        if (Number.isFinite(v)) givens.push(k)
    }
    const sr = new Searcher(fs, givens)
    return sr.getFittableOrder()
}

