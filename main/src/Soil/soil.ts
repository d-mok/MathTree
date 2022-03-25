import { OptionShuffler } from './tool/shuffle'
import { AutoOptions } from './tool/option'
import { Dict, Config } from './cls'
import renderMathInElement from 'katex/dist/contrib/auto-render'
import { dress, evalCtx, exprCtx, cropSection, Timer } from 'bot'
import { blacksmith } from './tool/blacksmith'

// util functions


function katex(html: string): string {
    let ele = document.createElement('div')
    ele.innerHTML = html
    renderMathInElement(ele)
    let T = ele.innerHTML
    ele.remove()
    return T
}



class ErrorLogger {
    private pile: string[] = []

    add(e: unknown) {
        let err = toError(e)
        this.pile.push('[' + err.name + '] ' + err.message)
    }

    private readHtml(delimiter: string): string {
        return this.pile.map($ => $.replaceAll('\n', '<br/>')).join(delimiter)
    }

    logs(): string[] {
        return [...this.pile]
    }

    html(): string {
        let text = this.readHtml("<br/><br/>")
        let len = text.length
        if (len > 1000)
            text = text.substring(0, 1000) + ` ... (${len} chars)`
        return text
    }

    lastLogHtml(): string {
        return this.pile[this.pile.length - 1].replaceAll('\n', '<br/>')
    }

}


export class Soil {
    private qn: string = ""
    private sol: string = ""
    // working variables during growth
    private dict: Dict = new Dict()
    private config: Config = new Config()
    // state
    private counter: number = 0
    private timer: Timer = new Timer(10)
    private logger: ErrorLogger = new ErrorLogger()

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

    private evalCode(code: string): void {

        let content = { question: this.qn, solution: this.sol }
        evalCtx(code, this.dict, this.config, content)

        if (typeof this.config.answer === 'number')
            this.config.answer = ['A', 'B', 'C', 'D'][this.config.answer]

        this.qn = content.question
        this.sol = content.solution

    }

    private pushDict() {
        this.counter++
        this.evalCode(this.gene.populate)
    }

    private isValidated() {
        let v = this.gene.validate
        if (v === '') return true
        return exprCtx(v, { ...this.dict }) === true
    }


    private runPopulate(): boolean {
        while (this.counter <= 1000) {
            this.timer.check()
            try {
                this.pushDict()
                if (!this.dict.checked())
                    throw CustomError('PopulationError', 'Dict Check Failed: ' + this.dict.undefsJSON())
                if (!this.isValidated())
                    throw CustomError('PopulationError', 'Cannot pass validate.')
                return true
            } catch (e) {
                if (e instanceof Error) {
                    switch (e.name) {
                        case 'ContractError':
                            this.logger.add(e)
                            break
                        case 'MathError':
                            this.logger.add(e)
                            break
                        case 'PopulationError':
                            this.logger.add(e)
                            break
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
        this.qn = cropSection(this.qn, this.dict)
        this.sol = cropSection(this.sol, this.dict)
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
                this.logger.add(e)
                continue
            }
        };
        throw CustomError('OptionError', "No valid option generated after 100 trials")
    }

    private runIntrapolate(): boolean {
        this.qn = blacksmith.intra(this.qn, this.dict)
        this.sol = blacksmith.intra(this.sol, this.dict)
        return true
    }

    private runSubstitute(): boolean {
        // pour
        this.qn = this.dict.substitute(this.qn)
        this.sol = this.dict.substitute(this.sol)
        // dress
        this.qn = dress(this.qn)
        this.sol = dress(this.sol)
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

        if (shuffler.hasDuplicatedOptions) {
            this.logger.add(CustomError(
                'ShuffleError',
                'Duplicated options found!'
            ))
            return false
        }
        this.qn = shuffler.qn
        this.sol = shuffler.sol
        this.config.answer = shuffler.ans
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
            success: true,
            logs: this.logger.logs(),
            time: this.timer.elapsed()
        }
    }

    private errorFruit(): Fruit {
        return {
            qn: "Error!<br/>" + this.logger.lastLogHtml(),
            sol: this.logger.html(),
            ans: "X",
            counter: this.counter,
            success: false,
            logs: this.logger.logs(),
            time: this.timer.elapsed()
        }
    }

    nurture(): Fruit {
        try {
            do {
                this.reset()
                this.runPopulate()
                this.runSection()
                this.runPreprocess()
                this.runOption()
                this.runIntrapolate()
                this.runSubstitute()
                this.runPostprocess()
                if (!this.runShuffle()) continue
                this.runKatex()
                break
            } while (true)
            return this.successFruit()
        }
        catch (e) {
            this.logger.add(e)
            return this.errorFruit()
        }
    }
}