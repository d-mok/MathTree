import { Variable, Variables } from './variable'


export class Equation {

    constructor(
        public zeroFunc: zeroFunction,
        public latex: string,
        public dep: Variables
    ) { }




    print(showVars: Variable[] = []): string {
        return this.dep.write(this.latex, showVars)
    }

}