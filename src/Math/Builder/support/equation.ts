// import { analyze } from './analyzer'
import { bisection } from './bisect'
import { Variable, Variables } from './variable'


export class Equation {

    constructor(
        public zeroFunc: zeroFunction,
        public latex: string,
        public dep: Variables
    ) { }


    solve() {
        if (this.dep.solvable())
            this.fit()
    }

    fit() {
        let roots = bisection(this.zeroFunc, this.dep.bounds())
        this.dep.setVals(roots)
    }

    fitAgain(vars: Variable[]) {
        vars.forEach($ => $.clear())
        vars.forEach($ => $.widen())
        this.fit()
    }

    print(showVars: Variable[] = []): string {
        return this.dep.write(this.latex, showVars)
    }

}