import { ExecSection } from './tool/section'
import { dress } from './tool/dress'
import { OptionShuffler } from './tool/shuffle'
import { AutoOptions } from './tool/option'
import { Dict, Config } from './cls'
import renderMathInElement from 'katex/dist/contrib/auto-render'

export class Soil {
    // get from SeedBank API
    private qn: string = ""
    private sol: string = ""
    // working variables during growth
    private dict: Dict = new Dict()
    private config: Config = new Config()
    // state
    private counter: number = 0
    private errorPile: Error[] = []

    constructor(
        private readonly gene: Gene
    ) {
        this.reset()
    }

    private reset() {
        this.qn = this.gene.qn
        this.sol = this.gene.sol
        this.dict = new Dict()
        this.config = new Config()
    }

    private recordError(e: Error) {
        if (!this.errorPile.map(x => x.message).includes(e.message))
            this.errorPile.push(e)
    }

    private evalCode(code: string): any {
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
        let result: any
        try {
            result = eval(code)
        } catch (e) {
            if (e.message === 'Cannot convert a Symbol value to a number') {
                throw CustomError(
                    'VariableError',
                    "A variable is used before a value is given."
                )
            } else {
                throw e
            }
        }

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

    private pushDict() {
        this.counter++
        this.evalCode(this.gene.populate)
    }

    private isValidated() {
        let v = this.gene.validate
        if (v === "") return true
        v = v.replace('\n', ' ') //is it a bug? only once?
        return this.evalCode(v) === true
    }


    private katex(html: string): string {
        let ele = document.createElement('div')
        ele.innerHTML = html
        renderMathInElement(ele)
        let T = ele.innerHTML
        ele.remove()
        return T
    }


    private runPopulate(): boolean {
        while (this.counter <= 1000) {
            try {
                this.pushDict()
                if (!this.dict.checked())
                    throw CustomError('PopulationError', 'Dict Check Failed.')
                if (!this.isValidated())
                    throw CustomError('PopulationError', 'Cannot pass validate.')
                return true;
            } catch (e) {
                switch (e.name) {
                    case 'ContractError':
                        this.recordError(e)
                        if (SHOULD_LOG) console.log(e.message)
                    case 'MathError':
                        this.recordError(e)
                        if (SHOULD_LOG) console.log(e.stack)
                        break;
                    case 'PopulationError':
                        this.recordError(e)
                        break;
                    default:
                        throw e
                }
            }
        };
        throw CustomError('PopulationError', "No population found after 1000 trials!")
    }

    private runSection(): boolean {
        // crop section
        this.qn = ExecSection(this.qn, this.config.sections);
        this.sol = ExecSection(this.sol, this.config.sections);
        return true
    }

    private runPreprocess(): boolean {
        this.evalCode(this.gene.preprocess)
        return true
    }

    private runOption(): boolean {
        let nTrial = 0
        while (nTrial <= 100) {
            nTrial++
            try {
                this.qn = AutoOptions(this.config.options, this.qn, this.dict)
                return true
            } catch (e) {
                this.recordError(e)
                console.log(e.stack)
                continue
            }
        };
        throw CustomError('OptionError', "No valid option generated after 100 trials")
    }


    private runSubstitute(): boolean {
        // pour
        this.qn = this.dict.substitute(this.qn)
        this.sol = this.dict.substitute(this.sol)
        // dress
        this.qn = dress(this.qn);
        this.sol = dress(this.sol);
        return true
    }

    private runPostprocess(): boolean {
        this.evalCode(this.gene.postprocess)
        return true
    }

    private runShuffle(): boolean {
        let shuffler = new OptionShuffler(
            this.qn,
            this.sol,
            this.config.answer
        )
        if (shuffler.AreOptionsDuplicated()) {
            this.recordError(CustomError(
                'ShuffleError',
                'Duplicated options found!'
            ))
            return false
        }
        this.qn = shuffler.genQn()
        this.sol = shuffler.genSol()
        this.config.answer = shuffler.genAns()
        return true
    }

    private runKatex(): boolean {
        this.qn = this.katex(this.qn)
        this.sol = this.katex(this.sol)
        return true
    }

    private successFruit(): Fruit {
        return {
            qn: this.qn,
            sol: this.sol,
            ans: this.config.answer,
            counter: this.counter,
            success: true
        }
    }

    private errorFruit(e: Error): Fruit {
        let printError = (x: Error) => '[' + x.name + '] ' + x.message
        let stack = this.errorPile.map(printError).join('<br/>')
        if (stack.length > 500) stack = stack.substring(0, 500) + ` ... (${stack.length} chars)`;
        return {
            qn: "An Error Occurred!<br/>" + e.name,
            sol: printError(e) + '<br/>' + stack,
            ans: "X",
            counter: this.counter,
            success: false
        }
    }

    nurture(): Fruit {
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
                this.runKatex()
                break
            } while (true);
            return this.successFruit()
        }
        catch (e) {
            console.error("[MathSoil Error]\n" + e.stack);
            return this.errorFruit(e)
        }
    }
}