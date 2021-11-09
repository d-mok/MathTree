import { Variable, Variables } from './variable'
import { Equation } from './equation'
import { latexBraced } from './latex'

import { fit, analyze, readTree, solutionFlow } from 'taylor-js'





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

    getVariables(symbols: string[]): Variables {
        return new Variables(...this.variables.filter($ => symbols.includes($.sym)))
    }


    private getFullTree() {
        let trees = RndShuffle(...analyze(this.fs))
        for (let tree of trees) {
            let info = readTree(tree)
            for (let top of RndShuffle(...info.tops)) {
                let flow = solutionFlow(this.fs, tree, [top])
                if (flow.length === this.fs.length)
                    return {
                        tree,
                        top: this.getVariables([top])[0],
                        info
                    }
            }
        }
        throw 'no sensible set of solvables found!'
    }


    generateSolvables(): [givens: Variables, hiddens: Variables, unknown: Variable] {
        let { tree, top, info } = this.getFullTree()
        return [
            this.getVariables(info.givens),
            this.getVariables(info.solved),
            top
        ]
    }


    generateTrend(): [constants: Variable[], agent: Variable, responses: Variable[], target: Variable] {
        let { tree, top, info } = this.getFullTree()
        let [agent, ...constants] = RndShuffle(...this.getVariables(info.givens))
        let responses = this.getVariables(info.solved)
        let target = top
        this.variables.clear()
        this.fit()
        let oldVal = this.variables.getVals()
        agent.shake()
        this.fitAgain(responses)
        this.variables.compareWith(oldVal)
        return [constants, agent, responses, target]
    }


    print(givens: Variable[] = []): string {
        let eqs = this.equations.map($ =>
            $.dep.write($.latex, givens)
        )
        return latexBraced(eqs)
    }

}