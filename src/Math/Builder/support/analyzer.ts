import { EquSystem } from "./support"

function trim(arr: number[]): number[] {
    return arr.filter($ => Number.isFinite($))
}

function max(arr: number[]): number {
    return Math.max(...trim(arr))
}

/**
 * The system of equations is represented by a matrix.
 * Each row is a variable.
 * Each col is an equation.
 * Initially, all element is set to -1 if the equation contains the variable.
 * Else, it's set to NaN.
 * Whenever a variable is solved, that row is set to the corresponding order.
 */

class Analyzer {


    private matrix: number[][] = []
    public requireRich: boolean = false

    constructor(
        private nRow: number,
        private nCol: number
    ) {
        for (let i = 0; i < nRow; i++) {
            let row = Array(nCol).fill(NaN)
            this.matrix.push(row)
        }
    }

    initialize(pairs: [number, number][]) {
        for (let [i, j] of pairs)
            this.matrix[i][j] = -1
    }


    private col(j: number): number[] {
        return this.matrix.map(r => r[j])
    }

    private set(i: number, j: number, order: number) {
        let v = this.matrix[i][j]
        if (Number.isFinite(v))
            this.matrix[i][j] = order
    }

    private reset() {
        for (let i = 0; i < this.nRow; i++) {
            for (let j = 0; j < this.nCol; j++) {
                this.set(i, j, -1)
            }
        }
    }

    private reveal(i: number, order: number) {
        for (let j = 0; j < this.nCol; j++)
            this.set(i, j, order)
    }

    private nextOrder(j: number): number {
        return max(this.col(j)) + 1
    }

    private nUnsolved(j: number): number {
        return this.col(j).filter($ => $ === -1).length
    }

    private iUnsolved(j: number): number {
        return this.col(j).findIndex($ => $ === -1)
    }

    private isSolvable(j: number): boolean {
        return this.nUnsolved(j) === 1
    }

    private solve(j: number) {
        if (!this.isSolvable(j)) return
        let nextOrder = this.nextOrder(j)
        let i = this.iUnsolved(j)
        this.reveal(i, nextOrder)
    }


    private solveAll() {
        for (let j = 0; j < this.nCol; j++)
            this.solve(j)
    }


    private solveLoop() {
        for (let n = 0; n < this.nCol + 2; n++)
            this.solveAll()
    }

    private done(): boolean {
        return this.matrix.flat().filter($ => $ === -1).length === 0
    }

    private rich(): boolean {
        let maxOrder = max(this.matrix.flat())
        return maxOrder === this.nCol
    }

    private finished(): boolean {
        let rich = this.requireRich ? this.rich() : true
        return this.done() && rich
    }


    private pickZeroth() {
        let n = this.nRow - this.nCol
        let indices = [...Array(this.nRow).keys()]
        let zeroIndices = [...toList(indices).sample(n)!]
        for (let i of zeroIndices)
            this.reveal(i, 0)
    }

    private searchOnce() {
        this.reset()
        this.pickZeroth()
        this.solveLoop()
    }

    search() {
        for (let i = 0; i < 100; i++) {
            this.searchOnce()
            if (this.finished()) return
        }
        throw '[Analyzer] Fail to search a solving path.'
    }

    orders(): number[] {
        return this.matrix.map(r => max(r))
    }

}


function createAnalyzer(sys: EquSystem): Analyzer {
    let nVars = sys.variables.length
    let nEqs = sys.equations.length
    let analyzer = new Analyzer(nVars, nEqs)

    let pairs: [number, number][] = []
    for (let i = 0; i < nVars; i++) {
        for (let j = 0; j < nEqs; j++) {
            let va = sys.variables[i]
            let eq = sys.equations[j]
            if (eq.dep.includes(va)) pairs.push([i, j])
        }
    }

    analyzer.initialize(pairs)
    return analyzer
}

function writeOrder(sys: EquSystem, analyzer: Analyzer) {
    let orders = analyzer.orders()
    for (let i = 0; i < orders.length; i++) {
        sys.variables[i].order = orders[i]
    }
}

export function createOrderTree(sys: EquSystem, rich: boolean) {
    let analyzer = createAnalyzer(sys)
    analyzer.requireRich = rich
    analyzer.search()
    writeOrder(sys, analyzer)
}


