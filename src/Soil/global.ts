import { ExecSection } from './tool/section'
import { dress } from './tool/dress'




export function clone<T>(obj: T): T {
    // clone object
    return JSON.parse(JSON.stringify(obj));
}


class Seed {
    constructor(
        // get from SeedBank API
        public qn: string = "",
        public sol: string = "",
        public populate: string = "",
        public validate: string = "",
        public preprocess: string = "",
        public postprocess: string = "",
        // working variables during growth
        public dict: Dict = new Dict(),
        public config: Config = new Config(),
        // state
        public ans: string | undefined = undefined,
        public counter: number = 0,
        // copy of core
        public core: SeedCore = new SeedCore()
    ) { }

    init(core: SeedCore) {
        this.core = core
        this.reset()
    }

    reset() {
        this.qn = this.core.qn
        this.sol = this.core.sol
        this.populate = this.core.populate
        let v = this.core.validate
        if (v === "") v = 'true'
        v = v.replace('\n', ' ')
        this.validate = v
        this.preprocess = this.core.preprocess
        this.postprocess = this.core.postprocess
        this.dict = new Dict()
        this.config = new Config()
        this.ans = undefined
    }

    evalCode(code: string): any {
        // injectables
        let {
            a, b, c, d, e, f, g, h, i, j, k, l, m, n,
            o, p, q, r, s, t, u, v, w, x, y, z,
            A, B, C, D, E, F, G, H, I, J, K, L, M, N,
            O, P, Q, R, S, T, U, V, W, X, Y, Z
        } = this.dict;
        let sections: section[] = this.config.sections
        let answer: string = this.config.answer
        let options: Partial<Dict> = this.config.options
        let question: string = this.qn
        let solution: string = this.sol

        // execute
        const result: any = eval(code)

        //retrieve
        this.dict.update({
            a, b, c, d, e, f, g, h, i, j, k, l, m, n,
            o, p, q, r, s, t, u, v, w, x, y, z,
            A, B, C, D, E, F, G, H, I, J, K, L, M, N,
            O, P, Q, R, S, T, U, V, W, X, Y, Z
        })
        this.config = {
            sections: sections,
            answer: answer,
            options: options
        }
        this.qn = question
        this.sol = solution

        return result
    }

    pushDict(): void {
        this.evalCode(this.populate)
        this.counter++
    }

    validateDict() {
        return this.evalCode(this.validate) === true
    }

    cropSection() {
        this.qn = ExecSection(this.qn, this.config.sections);
        this.sol = ExecSection(this.sol, this.config.sections);
    }

    doPreprocess() {
        this.evalCode(this.preprocess)
    }

    doPostprocess() {
        this.evalCode(this.postprocess)
    }

    fillOptions() {
        this.qn = AutoOptions(this.config.options, this.qn, this.dict, this.validate)
    }

    pour() {
        this.qn = this.dict.substitute(this.qn)
        this.sol = this.dict.substitute(this.sol)
    }

    dress() {
        this.qn = dress(this.qn);
        this.sol = dress(this.sol);
    }




}