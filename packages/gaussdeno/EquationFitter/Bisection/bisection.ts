import { tree, zeroFunction, rangeObj, valObj } from "../../types.ts"


function randomUniform(range: [number, number]): number {
    const [min, max] = range
    return Math.random() * (max - min) + min
}

function randomLog(range: [number, number]): number {
    const [min, max] = range
    const logmin = Math.log10(min)
    const logmax = Math.log10(max)
    const e = randomUniform([logmin, logmax])
    return 10 ** e
}

function randomLogNeg(range: [number, number]): number {
    const [minNeg, maxNeg] = range
    const min = -maxNeg
    const max = -minNeg
    return -randomLog([min, max])
}

function randomValue(range: [number, number]): number {
    let [min, max] = range
    if (min > 0 && max > 0) return randomLog(range)
    if (min < 0 && max < 0) return randomLogNeg(range)
    return randomUniform(range)
}

function mid(a: number[], b: number[]) {
    return a.map(($, i) => ($ + b[i]) / 2)
}

function equal(a: any[], b: any[]) {
    return a.every(($, i) => $ === b[i])
        && a.length === b.length
}


export class Bisection {

    private a: number[] = [] // positive point
    private b: number[] = [] // negative point
    private readonly precision: number = 10

    constructor(
        private readonly equation: zeroFunction,
        private readonly ranges: [number, number][]
    ) { }

    private randomPoint(): number[] {
        return this.ranges.map(randomValue)
    }

    private randomSignedPoint(sign: 1 | -1): number[] {
        for (let i = 0; i < 100; i++) {
            const point = this.randomPoint()
            const value = this.equation(...point)
            const sameSign = value * sign > 0
            if (sameSign) return point
        }
        console.error("[bisection] No signed point in ranges: " + JSON.stringify(this.ranges))
        throw ''
    }

    private intialize() {
        this.a = this.randomSignedPoint(1)
        this.b = this.randomSignedPoint(-1)
    }



    private iterate() {
        const m = mid(this.a, this.b)
        const M = this.equation(...m)
        if (!Number.isFinite(M)) {
            console.error('[bisection] The function value is not a finite number!')
            throw ''
        }
        if (M >= 0) this.a = m
        if (M <= 0) this.b = m
    }

    private done(): boolean {
        const precision_a = this.a.map($ => $.toPrecision(this.precision))
        const precision_b = this.b.map($ => $.toPrecision(this.precision))
        return equal(precision_a, precision_b)
    }

    private assertRange(): void {
        const pass = this.ranges.some(([min, max]) => max > min)
        if (!pass) {
            console.error('[bisection] all variables are locked already')
            throw ''
        }
    }

    private run(): number[] {
        this.assertRange()
        this.intialize()
        for (let i = 0; i < 100; i++) {
            this.iterate()
            if (this.done()) return [...this.a]
        }
        console.error('[bisection] fail to find tolarable solution after 100 iteration')
        throw ''
    }

    exec(): number[] {
        try {
            return this.run()
        } catch {
            throw '[bisection] An error occur during bisection.'
        }
    }
}

