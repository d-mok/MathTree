import { createOrderTree } from './analyzer'
import { Variable, Variables } from './variable'
import { Equation } from './equation'
import { latexBraced } from './latex'



export class EquSystem {
    constructor(
        public variables: Variables,
        public equations: Equation[]
    ) { }

    fit() {
        this.variables.timeLoop(
            () => {
                this.equations.forEach($ => $.fit())
            },
            'The system is not solvable is given range.'
        )
    }

    solve(): void {
        this.variables.timeLoop(
            () => {
                for (let i = 0; i < 10; i++) {
                    for (let eq of this.equations) eq.solve()
                    if (this.variables.solved()) return
                }
                throw 'The system is not solvable yet.'
            },
            'The system is not solvable is given range.'
        )
    }

    solveAgain(vars: Variable[]): void {
        vars.forEach($ => $.clear())
        vars.forEach($ => $.widen())
        this.solve()
    }


    generateSolvables(): [givens: Variable[], hiddens: Variable[], unknown: Variable] {
        createOrderTree(this, true)
        return [
            this.variables.zeros(),
            this.variables.positives(),
            this.variables.pickTop()
        ]
    }


    generateTrend(): [constants: Variable[], control: Variable, responses: Variable[]] {
        createOrderTree(this, false)
        let [control, ...constants] = this.variables.shuffledZeros()
        let responses = this.variables.positives()
        this.variables.clear()
        this.fit()
        let oldVal = this.variables.getVals()
        control.shake()
        this.solveAgain(responses)
        this.variables.compareWith(oldVal)
        return [constants, control, responses]
    }


    print(givens: Variable[] = []): string {
        let eqs = this.equations.map($ => $.print(givens))
        return latexBraced(eqs)
    }

}