import { Variable, Variables } from './variable'
import { Equation } from './equation'
import { latexBraced } from './latex'

import { fit,analyze } from 'taylor-js'

export class EquSystem {

    private fs: zeroFunction[]

    constructor(
        public variables: Variables,
        public equations: Equation[]
    ) {
        this.fs = equations.map($ => $.zeroFunc)
    }


    fit() {
        let vals = fit(this.fs, this.variables.rangeObj(), this.variables.valObj())
        this.variables.setVal(vals)
    }


    fitAgain(vars: Variable[]): void {
        vars.forEach($ => $.clear())
        vars.forEach($ => $.widen())
        this.fit()
    }


    generateSolvables(): [givens: Variable[], hiddens: Variable[], unknown: Variable] {
        let trees = analyze(this.fs)
        // testing
        this.variables.setOrder(trees[0])
        return [
            this.variables.zeros(),
            this.variables.positives(),
            this.variables.pickTop()
        ]
    }


    generateTrend(): [constants: Variable[], agent: Variable, responses: Variable[], target: Variable] {
        let trees = analyze(this.fs)
        // testing
        this.variables.setOrder(trees[0])
        let [agent, ...constants] = this.variables.shuffledZeros()
        let responses = this.variables.positives()
        let target = this.variables.pickTop()
        this.variables.clear()
        this.fit()
        let oldVal = this.variables.getVals()
        agent.shake()
        this.fitAgain(responses)
        this.variables.compareWith(oldVal)
        return [constants, agent, responses, target]
    }


    print(givens: Variable[] = []): string {
        let eqs = this.equations.map($ =>$.print(givens))
        return latexBraced(eqs)
    }

}