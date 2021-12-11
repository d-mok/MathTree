import { Variable, Variables } from './variable'
import { Equation } from './equation'
import { latexAligned, latexBraced } from './latex'

import { fit, analyze, readTree, solutionFlow, solvingSymbol } from 'gauss'





export class EquSystem {

    private fs: zeroFunction[]
    private tree: valObj = {}

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
        const vars = symbols.map($ => this.variables.find(_ => _.sym === $)!)
        return new Variables(...vars)
    }


    private getFullTree(avoids: string[][] = []) {
        let trees = RndShuffle(...analyze(this.fs))
        for (let tree of trees) {
            let info = readTree(tree)
            for (let top of RndShuffle(...info.tops)) {
                let flow = solutionFlow(this.fs, tree, [top])
                if (flow.length === this.fs.length && this.checkAvoids(info.givens, top, avoids))
                    this.tree = tree // save the tree!
                return {
                    tree,
                    top: this.getVariables([top])[0],
                    info
                }
            }
        }
        throw 'no sensible set of solvables found!'
    }


    private checkAvoid(givens: string[], unknown: string, avoid: string[]): boolean {
        let allAreGivensOrUnknown = avoid.every($ => givens.includes($) || unknown === $)
        let containUnknown = avoid.includes(unknown)
        let immediatelySolved = allAreGivensOrUnknown && containUnknown
        return !immediatelySolved
    }

    private checkAvoids(givens: string[], unknown: string, avoids: string[][]): boolean {
        return avoids.every($ => this.checkAvoid(givens, unknown, $))
    }


    generateSolvables(avoids: string[][] = []): [givens: Variables, hiddens: Variables, unknown: Variable] {
        let { tree, top, info } = this.getFullTree(avoids)
        return [
            this.getVariables(info.givens),
            this.getVariables(info.solved),
            top,
        ]
    }

    solInSteps(unknown: Variable): string {
        // use the tree stored in this
        let fs = solutionFlow(this.fs, this.tree, [unknown.sym])
        let eqs = fs.map($ => this.equations.find(_ => _.zeroFunc === $)!)
        let info = readTree(this.tree)
        let givens = info.givens.map($ => this.variables.find(_ => _.sym === $)!)
        let T = ''
        for (let eq of eqs) {
            let solved = solvingSymbol(eq.zeroFunc, this.tree)!
            let solvedVar = this.variables.find($ => $.sym === solved)!
            T += latexAligned([eq.print(), eq.print(givens), solvedVar.full()])
            T += " \\\\~\\\\ "
            givens.push(solvedVar)
        }
        return T
    }


    generateTrend(): [constants: Variable[], agent: Variable, responses: Variable[], target: Variable] {
        let { tree, top, info } = this.getFullTree()
        let [agent, ...constants] = RndShuffle(...this.getVariables(info.givens))
        let responses = [...this.getVariables(info.solved)]
        responses = RndShuffle(...responses)
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
        return eqs.length === 1 ? eqs[0] : latexBraced(eqs)
    }

}