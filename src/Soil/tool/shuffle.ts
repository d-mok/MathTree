import { QuestionHTML } from './html'


export class OptionShuffler {
    private perm: number[] = []
    private valid: boolean = false
    private Qn: QuestionHTML

    constructor(
        private qn: string,
        private sol: string,
        private ans: string,
        private shuffle: boolean
    ) {
        this.Qn = new QuestionHTML(qn)
        if (!this.Qn.ul) return // no <ul></ul>
        if (this.Qn.li.length === 0) return // blank <ul></ul>
        this.valid = true
    }

    AreOptionsDuplicated() {
        return this.Qn.isLiDuplicated()
    }

    genQn(): string {
        if (!this.valid) return this.qn
        this.perm = this.Qn.shuffleLi(this.shuffle)
        return this.Qn.export()
    }

    private mapLetter(oldLetter: string): string {
        let oldIndex = ['A', 'B', 'C', 'D', 'E', 'F'].indexOf(oldLetter);
        let newIndex = this.perm[oldIndex]
        return ['A', 'B', 'C', 'D', 'E', 'F'][newIndex]
    }

    genAns(): string {
        if (!this.valid) return "X"
        return this.mapLetter(this.ans)
    }

    genSol(): string {
        if (!this.valid) return this.sol
        let newSol = "<p>Answer: "
            + this.genAns()
            + "</p><p><b>Solution:</b></p>"
            + this.sol
        let ansList = ['A', 'B', 'C', 'D', 'E', 'F'];
        ansList.length = this.perm.length
        for (let x of ansList) {
            newSol = newSol.replace(new RegExp('\{\#' + x + '\}', 'g'), this.mapLetter(x));
        }
        return newSol
    }
}


