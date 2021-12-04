import { getVars } from "../utils"


class TreeReader {

    private readonly symbols: string[]
    private readonly orders: number[]
    private readonly realOrders: number[]
    public readonly maxOrder: number

    constructor(
        private readonly tree: tree
    ) {
        this.symbols = Object.keys(tree)
        this.orders = Object.values(this.tree)
        this.realOrders = this.orders.filter($ => Number.isFinite($))
        this.maxOrder = Math.max(...this.realOrders)
    }

    private symbolsWithOrder(order: number): string[] {
        return this.symbols.filter($ => this.tree[$] === order)
    }

    givenSymbols(): string[] {
        return this.symbolsWithOrder(0)
    }

    topSymbols(): string[] {
        return this.symbolsWithOrder(this.maxOrder)
    }


    stepSymbols(): string[] {
        const arr: string[] = []
        for (let i = 1; i < this.maxOrder; i++) {
            arr.push(...this.symbolsWithOrder(i))
        }
        return arr
    }

    solvedSymbols(): string[] {
        return [...this.stepSymbols(), ...this.topSymbols()]
    }


}


class EquationReader {

    private readonly symbols: string[]
    private readonly myTree: tree = {}
    private readonly reader: TreeReader

    constructor(
        public readonly f: zeroFunction,
        private readonly tree: tree
    ) {
        this.symbols = getVars(f)
        for (let k in tree) {
            if (this.symbols.includes(k))
                this.myTree[k] = tree[k]
        }
        this.reader = new TreeReader(this.myTree)
    }


    /**
     * Is this equation actively solved, or passively satisfied?
     */
    isActiveSolve(): boolean {
        const m = this.maxOrder()
        return m !== 0 && this.symbolsWithOrder(m).length === 1
    }

    maxOrder(): number {
        return this.reader.maxOrder
    }

    private symbolsWithOrder(order: number): string[] {
        return this.symbols.filter($ => this.tree[$] === order)
    }

    /**
     * Which symbol is solved using this equation?
     */
    solvingSymbol(): string | undefined {
        if (!this.isActiveSolve()) return undefined
        return this.reader.topSymbols()[0]
    }

    /**
     * Which symbols are given in this equation?
     */
    givenSymbols(): string[] {
        return this.reader.givenSymbols()
    }

    /**
     * Which symbols are the steps when solving this equation?
     */
    stepSymbols(): string[] {
        return this.reader.stepSymbols()
    }



}



class Tracer {

    private symbols: string[]

    constructor(
        private tree: tree,
        private eqReaders: EquationReader[]
    ) {
        this.symbols = Object.keys(this.tree)
    }

    /**
     * Which equation is used solve this symbol in the final step?
     */
    private revealer(symbol: string): EquationReader | undefined {
        for (let eq of this.eqReaders) {
            if (eq.solvingSymbol() === symbol)
                return eq
        }
        return undefined
    }


    /**
     * In the revealer of this symbol, what symbols are the step symbols?
     */
    private prerequisites(symbol: string): string[] {
        return this.revealer(symbol)?.stepSymbols() ?? []
    }

    /**
     * Get the ordered list of equation in the sequential step when solving for this symbol.
     */
    private flowForOne(symbol: string): EquationReader[] {
        const order = this.tree[symbol]
        if (order === 0) return []
        if (order === 1) return [this.revealer(symbol)!]
        let eqs: EquationReader[] = []
        for (let s of this.prerequisites(symbol)) {
            eqs.push(...this.flowForOne(s))
        }
        eqs.push(this.revealer(symbol)!)
        return [...new Set(eqs)]
    }

    /**
     * Get the ordered list of equation in the sequential step when solving for these symbols.
     */
    flow(unknowns: string[]): EquationReader[] {
        let eqs: EquationReader[] = []
        for (let u of unknowns) {
            eqs.push(...this.flowForOne(u))
        }
        return [...new Set(eqs)]
    }
}

/**
 * Get the ordered list of function in the sequential step when solving for these symbols under the given tree.
 */
export function solutionFlow(
    fs: zeroFunction[],
    tree: tree,
    unknownSymbols: string[]
): zeroFunction[] {
    const eqReaders = fs.map($ => new EquationReader($, tree))
    const tracer = new Tracer(tree, eqReaders)
    let flow = tracer.flow(unknownSymbols)
    return flow.map($ => $.f)
}

/**
 * Which symbol is solved using this function under the given tree?
 */
export function solvingSymbol(f: zeroFunction, tree: tree): string | undefined {
    const eqReader = new EquationReader(f, tree)
    return eqReader.solvingSymbol()
}


/**
 * Read basic info of a tree.
 */
export function readTree(tree: tree) {
    const reader = new TreeReader(tree)
    return {
        maxOrder: reader.maxOrder,
        givens: reader.givenSymbols(),
        tops: reader.topSymbols(),
        steps: reader.stepSymbols(),
        solved: reader.solvedSymbols()
    }
}