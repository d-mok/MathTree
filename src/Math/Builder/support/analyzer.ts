import { EquSystem } from "./support";

class varlet {
    public solved: boolean = false
    public order: number = -1

    constructor(public sym: string) { }

    solve(order: number): void {
        this.solved = true;
        this.order = order
    }

    reset(): void {
        this.solved = false
        this.order = -1
    }
}

class equlet {

    constructor(
        public dep: varlet[]
    ) {
    }

    private solved(): varlet[] {
        return this.dep.filter($ => $.solved)
    }

    private unsolved(): varlet[] {
        return this.dep.filter($ => !$.solved)
    }

    private nextOrder(): number {
        let orders = this.solved().map($ => $.order)
        if (orders.length === 0) return 0
        return Math.max(...orders) + 1
    }

    doable(): boolean {
        return this.unsolved().length === 1
    }

    done(): boolean {
        return this.unsolved().length === 0
    }

    do(): void {
        let order = this.nextOrder()
        this.unsolved().forEach($ => $.solve(order))
    }

    tryDo() {
        if (this.doable()) this.do()
    }

}

class EquSystemAnalyzer {


    constructor(
        public vars: varlet[],
        public equations: equlet[],
        private requiredRich:boolean
    ) { }

    reset(): void {
        this.vars.forEach($ => $.reset())
    }

    setZeroth(vars: varlet[]): void {
        this.reset()
        vars.forEach($ => $.solve(0))
    }

    pickZeroth(): void {
        let nGivens = this.vars.length - this.equations.length
        let zeroths = RndPickN(this.vars, nGivens)
        this.setZeroth(zeroths)
    }

    orders(): number[] {
        return this.vars.map($ => $.order)
    }

    maxOrder(): number {
        return Math.max(...this.orders())
    }

    rich(): boolean {
        return this.maxOrder() === this.equations.length
    }

    done(): boolean {
        return this.equations.every($ => $.done()) && this.rich()
    }

    do(): void {
        for (let i = 0; i < 10; i++) {
            for (let eq of this.equations) eq.tryDo()
        }
    }

    searchOnce(): void {
        this.pickZeroth()
        this.do()
    }

    search() {
        for (let i = 0; i < 100; i++) {
            this.searchOnce()
            if (this.done()) return 
        }
        throw '[Analyzer] Fail to search a solving path.'
    }

}

export function analyze(sys: EquSystem, rich:boolean): void{
    let varlets = sys.variables.map($ => new varlet($.sym))
    function findVarlet(sym: string): varlet {
        return varlets.find($ => $.sym === sym)!
    }
    let equlets = sys.equations.map($ => new equlet($.dep.map(v => findVarlet(v.sym))))
    let analyzer = new EquSystemAnalyzer(varlets, equlets, rich)
    analyzer.search()
    let orders = analyzer.orders()
    for (let i = 0; i < orders.length; i++){
        sys.variables[i].order = orders[i]
    }
}

