import { ExecSection } from './tool/section'
import { dress } from './tool/dress'
import { OptionShuffler } from './tool/shuffle'
import { AutoOptions } from './tool/option'
import './type'
import { Dict, Config, SeedCore } from './cls'



export class Seed {
    // get from SeedBank API
    public qn: string = ""
    public sol: string = ""
    public populate: string = ""
    public validate: string = ""
    public preprocess: string = ""
    public postprocess: string = ""
    // working variables during growth
    public dict: Dict = new Dict()
    public config: Config = new Config()
    // state
    public counter: number = 0
    // copy of core
    public core: SeedCore = new SeedCore()

    constructor(core: Partial<SeedCore> = {}) {
        this.core = new SeedCore(core)
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

    pushDict() {
        this.evalCode(this.populate)
        this.counter++
    }

    isValidated() {
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


    runPopulate(): boolean {
        while (this.counter <= 1000) {
            try {
                this.pushDict()
            } catch (e) {
                if (e.name === 'MathError') {
                    continue
                } else {
                    throw e
                }
            }
            if (this.isValidated()) return true; // done if validated
        };
        // throw error after 1000 failed trials
        throw Error("No population found after 1000 trials!")
    }

    runSection(): boolean {
        this.cropSection()
        return true
    }

    runPreprocess() {
        this.doPreprocess()
        return true
    }

    runOption(): boolean {
        let nTrial = 0
        while (nTrial <= 10) {
            try {
                this.qn = AutoOptions(this.config.options, this.qn, this.dict, this.validate)
                return true
            } catch (e) {
                continue
            }
        };
        // throw error after 10 failed trials
        throw Error("No valid option generated after 10 trials!")
    }


    runSubstitute(): boolean {
        this.pour()
        this.dress()
        return true
    }

    runPostprocess(): boolean {
        this.doPostprocess()
        return true
    }

    runShuffle(): boolean {
        let shuffler = new OptionShuffler(
            this.qn,
            this.sol,
            this.config.answer
        )
        if (shuffler.AreOptionsDuplicated()) return false
        this.qn = shuffler.genQn()
        this.sol = shuffler.genSol()
        this.config.answer = shuffler.genAns()
        return true
    }

    successFruit(): Question {
        return {
            qn: this.qn,
            sol: this.sol,
            ans: this.config.answer,
            counter: this.counter,
            success: true
        }
    }

    errorFruit(e: Error): Question {
        return {
            qn: "Error! " + e.name,
            sol: e.message,
            ans: "X",
            counter: this.counter,
            success: false
        }
    }

    grow(): Question {
        try {
            do {
                this.reset()
                this.runPopulate()
                this.runSection();
                this.runPreprocess();
                this.runOption()
                this.runSubstitute();
                this.runPostprocess();
                if (!this.runShuffle()) continue
                break
            } while (true);
            return this.successFruit()
        }
        catch (e) {
            console.error("[MathSoil] Error!\n" + e.name);
            console.error(e.message);
            console.error(e.stack);
            return this.errorFruit(e)
        }
    }
}