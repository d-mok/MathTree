import { combinations, getAllVars, getVars } from "../utils"


class Vabe {

    public order: number = NaN

    constructor(
        public symbol: string,
    ) { }

    reset() {
        this.order = NaN
    }

    setZero() {
        this.order = 0
    }

    solve(order: number) {
        this.order = order
    }

    solved(): boolean {
        return Number.isFinite(this.order)
    }
}

class Eqube {

    constructor(
        private vabes: Vabe[]
    ) { }

    private unsolvedVabes(): Vabe[] {
        return this.vabes.filter($ => !$.solved())
    }

    private solved(): boolean {
        return this.unsolvedVabes().length === 0
    }

    private solvable(): boolean {
        return this.unsolvedVabes().length === 1
    }

    private orders(): number[] {
        return this.vabes.map($ => $.order)
    }

    private realOrders(): number[] {
        return this.orders().filter($ => Number.isFinite($))
    }

    private maxOrder(): number {
        const orders = this.realOrders()
        if (orders.length === 0) return -1
        return Math.max(...orders)
    }

    private nextOrder(): number {
        return this.maxOrder() + 1
    }

    private forceSolve(): void {
        let nextOrder = this.nextOrder()
        for (let v of this.unsolvedVabes()) {
            v.solve(nextOrder)
        }
    }

    trySolve(): boolean {
        if (this.solvable()) {
            this.forceSolve()
            return true
        } else {
            return false
        }
    }



}



class PresetAnalyzer {

    constructor(
        private vabes: Vabe[],
        private equbes: Eqube[],
        private preset: Vabe[]
    ) { }

    private reset(): void {
        for (let v of this.vabes) {
            const isPreset = this.preset.includes(v)
            isPreset ? v.setZero() : v.reset()
        }
    }

    private trySolveNext(): boolean {
        for (let eq of this.equbes) {
            const t = eq.trySolve()
            if (t === true) return true
        }
        return false
    }

    private exportOrder(): tree {
        const orders: tree = {}
        for (let v of this.vabes) {
            orders[v.symbol] = v.order
        }
        return orders
    }

    /**
     * Get the tree of the system under current preset.
     * The process is deterministic, so a unique tree should be obtained.
     * The tree may or may not be healthy, i.e. fully solved.
     */
    getTree(): tree {
        this.reset()
        for (let i = 0; i <= this.equbes.length; i++) {
            const t = this.trySolveNext()
            if (!t) break
        }
        return this.exportOrder()
    }

}



class Analyzer {

    constructor(
        private vabes: Vabe[],
        private equbes: Eqube[]
    ) { }

    private allVabeCombinations(): Vabe[][] {
        const n = this.vabes.length - this.equbes.length;
        return combinations(this.vabes, n)
    }

    private getTrees(): tree[] {
        const combs = this.allVabeCombinations()
        const ts: tree[] = [];
        for (let c of combs) {
            const ana = new PresetAnalyzer(this.vabes, this.equbes, c)
            ts.push(ana.getTree())
        }
        return ts
    }

    private isHealthy(tree: tree): boolean {
        // return true
        const orders = Object.values(tree)
        return orders.every($ => Number.isFinite($))
    }


    /**
     * Get all the healthy trees generated from all possible 'given variables' combinations.
     */
    getHealthyTrees(): tree[] {
        return this.getTrees().filter($ => this.isHealthy($))
    }

}


/**
 * Get all the healthy trees of this system generated from all possible 'given variables' combinations.
 */
export function analyze(fs: zeroFunction[]): tree[] {
    const symbols = getAllVars(fs)
    const vabes = symbols.map($ => new Vabe($))
    const equbes: Eqube[] = []
    for (let f of fs) {
        let syms = getVars(f)
        const vs = syms.map($ => vabes.find(_ => _.symbol === $)!)
        let eq = new Eqube(vs)
        equbes.push(eq)
    }
    let analyzer = new Analyzer(vabes, equbes)
    return analyzer.getHealthyTrees()
}
