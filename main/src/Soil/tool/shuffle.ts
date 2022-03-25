import { QuestionHTML } from './html'
import { shuffleIndex, shuffleAs } from 'bot'


export class OptionShuffler {
    // private perm: number[]
    // private valid: boolean = true
    public hasDuplicatedOptions = false

    constructor(
        public qn: string,
        public sol: string,
        public ans: string,
        private shuffle: boolean
    ) {
        // this.Qn = new QuestionHTML(qn)
        // if (this.Qn.li.length === 0 || !this.Qn.ul) // blank <ul></ul> || no <ul></ul>
        // this.valid = false
        // this.perm = shuffleIndex(this.Qn.li.length)
        this.exec()
    }

    private exec() {

        let Qn = new QuestionHTML(this.qn)
        let liCount = Qn.li.length
        this.hasDuplicatedOptions = Qn.isLiDuplicated()

        if (liCount === 0 || !Qn.ul) {// blank <ul></ul> || no <ul></ul>
            this.ans = 'X'
            return
        }

        let perm = shuffleIndex(liCount, this.shuffle)
        let map = this.letterMap(perm)

        // qn
        Qn.shuffleLi(perm)
        this.qn = Qn.export()

        // ans
        this.ans = map[this.ans]

        // sol
        this.sol = `<p>Answer: ${this.ans}</p><p><b>Solution:</b></p>${this.sol}`
        this.sol = this.sol.replaceAll(/{#([A-Z])}/g, (match, p1) => map[p1])
        // let ansList = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, perm.length)
        // for (let x of ansList) {
        //     newSol = newSol.replaceAll(
        //         new RegExp('{#' + x + '}', 'g'),
        //         map[x]
        //     )
        // }
        // this.sol = newSol
    }

    // genQn(): string {
    //     if (!this.valid) return this.qn
    //     this.Qn.shuffleLi(this.perm)
    //     return this.Qn.export()
    // }

    private letterMap(perm: number[]): { [old: string]: string } {
        let ansList = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, perm.length)
        let shuffled = shuffleAs(ansList, perm)
        let map: { [old: string]: string } = {}
        for (let i = 0; i < perm.length; i++)
            map[shuffled[i]] = ansList[i]
        return map
    }

    // private getNewLetter(oldLetter: string): string {
    //     let alphabets = ['A', 'B', 'C', 'D', 'E', 'F']
    //     alphabets.length = this.Qn.li.length
    //     let shuffledAlpha = shuffleAs(alphabets, this.perm)
    //     let newIndex = shuffledAlpha.indexOf(oldLetter)
    //     return alphabets[newIndex]
    // }

    // genAns(): string {
    //     if (!this.valid) return "X"
    //     return this.getNewLetter(this.ans)
    // }

    // genSol(): string {
    //     if (!this.valid) return this.sol
    //     let newSol = "<p>Answer: "
    //         + this.genAns()
    //         + "</p><p><b>Solution:</b></p>"
    //         + this.sol
    //     let ansList = ['A', 'B', 'C', 'D', 'E', 'F']
    //     ansList.length = this.perm.length
    //     for (let x of ansList) {
    //         newSol = newSol.replaceAll(new RegExp('\{\#' + x + '\}', 'g'), this.getNewLetter(x))
    //     }
    //     return newSol
    // }
}


