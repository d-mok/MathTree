import { ExecSection } from './tool/section'
import { dress } from './tool/dress'
import { OptionShuffler } from './tool/shuffle'
import { AutoOptions } from './tool/option'
import { Dict, Config } from './cls'
import { evaluate, intrapolate } from './tool/eval'
import renderMathInElement from 'katex/dist/contrib/auto-render'

// util functions


function katex(html: string): string {
    let ele = document.createElement('div')
    ele.innerHTML = html
    renderMathInElement(ele)
    let T = ele.innerHTML
    ele.remove()
    return T
}



export class Soil {
    // get from SeedBank API
    private qn: string = ""
    private sol: string = ""
    // working variables during growth
    private dict: Dict = new Dict()
    private config: Config = new Config()
    // state
    private counter: number = 0
    private time: number = Date.now()
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

    private checkTime() {
        let allow = 10
        if (Date.now() - this.time > allow * 1000)
            throw CustomError('TimeoutError', 'taking too long to run: >' + allow + 's')
    }

    private recordError(e: unknown) {
        let err = toError(e)
        this.errorPile.push(err)
    }

    private printError(delimiter: string, cut = true): string {
        let print = (x: Error) => '[' + x.name + '] ' + x.message
        let stack = this.errorPile.map(print).join(delimiter)
        if (cut) {
            if (stack.length > 1000) stack = stack.substring(0, 1000) + ` ... (${stack.length} chars)`;
        }
        return stack
    }

    private evalCode(code: string): any {

        let { result, context } = evaluate(code, {
            dict: this.dict,
            sections: this.config.sections,
            answer: this.config.answer,
            options: this.config.options,
            shuffle: this.config.shuffle,
            qn: this.qn,
            sol: this.sol
        })

        this.dict = context.dict
        this.config = {
            sections: context.sections,
            answer: context.answer,
            options: context.options,
            shuffle: context.shuffle
        }
        this.qn = context.qn
        this.sol = context.sol

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


    private runPopulate(): boolean {
        while (this.counter <= 1000) {
            this.checkTime()
            try {
                this.pushDict()
                if (!this.dict.checked())
                    throw CustomError('PopulationError', 'Dict Check Failed.')
                if (!this.isValidated())
                    throw CustomError('PopulationError', 'Cannot pass validate.')
                return true;
            } catch (e) {
                if (e instanceof Error) {
                    switch (e.name) {
                        case 'ContractError':
                            this.recordError(e)
                            break;
                        case 'MathError':
                            this.recordError(e)
                            break;
                        case 'PopulationError':
                            this.recordError(e)
                            break;
                        default:
                            throw e
                    }
                } else {
                    throw e
                }
            }
        };
        throw CustomError('PopulationError', "No population found after 1000 trials!")
    }

    private runSection(): boolean {
        // crop section
        this.qn = ExecSection(this.qn, this.config.sections, this.dict);
        this.sol = ExecSection(this.sol, this.config.sections, this.dict);
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
                continue
            }
        };
        throw CustomError('OptionError', "No valid option generated after 100 trials")
    }

    private runIntrapolate(): boolean {
        this.qn = intrapolate(this.qn, this.dict)
        this.sol = intrapolate(this.sol, this.dict)
        return true
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
            this.config.answer,
            this.config.shuffle
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
        this.qn = katex(this.qn)
        this.sol = katex(this.sol)
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

    private errorFruit(e: unknown): Fruit {
        let err = toError(e)
        return {
            qn: "An Error Occurred!<br/>" + '[' + err.name + '] ' + err.message,
            sol: this.printError("<br/><br/>", true),
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
                this.runIntrapolate()
                this.runSubstitute();
                this.runPostprocess();
                if (!this.runShuffle()) continue
                this.runKatex()
                break
            } while (true);
            if (SHOULD_LOG) console.log(this.printError('\n', false))
            return this.successFruit()
        }
        catch (e) {
            if (SHOULD_LOG) console.log(this.printError('\n', false))
            return this.errorFruit(e)
        }
    }
}