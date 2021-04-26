import { ExtractHTMLTag, JoinToHTMLTag } from "./html";
import { QuestionHTML } from './html/index'

function RndPermutation(n = 4) {
    return RndShuffle(...ListIntegers(0, n - 1))
}

function Permute<T>(permutation: number[], items: T[]): T[] {
    let newItems = []
    for (let i = 0; i < permutation.length; i++) {
        newItems.push(items[permutation[i]])
    }
    return newItems
}

function AnsToIndex(ans: string) {
    return ['A', 'B', 'C', 'D'].indexOf(ans);
}

function IndexToAns(index: number) {
    return ['A', 'B', 'C', 'D'][index]
}

function NewAns(oldAns: string, permutation: number[]) {
    let oldIndex = AnsToIndex(oldAns)
    let newIndex = permutation.indexOf(oldIndex)
    return IndexToAns(newIndex)
}


export class OptionShuffler2 {
    public ul: string = ""
    public options: string[] = []
    public perm: number[] = []
    public valid: boolean = false

    constructor(
        public qn: string,
        public sol: string,
        public ans: string
    ) {
        let uls = ExtractHTMLTag(qn, 'ul')
        if (uls.length === 0) return // no <ul></ul>
        this.ul = uls[uls.length - 1]
        if (this.ul === "") return // blank <ul></ul>
        this.options = ExtractHTMLTag(this.ul, 'li')
        if (this.options.length <= 1) return // only 1 or 0 <li></li>
        this.perm = RndPermutation(this.options.length)
        this.valid = true
    }

    AreOptionsDuplicated() {
        return (new Set(this.options)).size !== this.options.length
    }

    genQn(): string {
        if (!this.valid) return this.qn
        let shuffledOptions = Permute(this.perm, this.options)
        let joined = JoinToHTMLTag(shuffledOptions, 'li')
        return this.qn.replace(this.ul, joined)
    }

    genAns(): string {
        if (!this.valid) return "X"
        return NewAns(this.ans, this.perm)
    }

    genSol(): string {
        if (!this.valid) return this.sol
        let newSol = "<p>Answer: " + this.genAns() + "</p><p><b>Solution:</b></p>" + this.sol
        let ansList = ['A', 'B', 'C', 'D'];
        ansList.length = this.perm.length
        for (let x of ansList) {
            newSol = newSol.replace(new RegExp('\{\#' + x + '\}', 'g'), NewAns(x, this.perm));
        }
        return newSol
    }
}



export class OptionShuffler {
    // public ul: string = ""
    // public options: string[] = []
    private perm: number[] = []
    private valid: boolean = false
    private Qn: QuestionHTML

    constructor(
        private qn: string,
        private sol: string,
        private ans: string
    ) {
        this.Qn = new QuestionHTML(qn)
        // let uls = ExtractHTMLTag(qn, 'ul')
        if (!this.Qn.ul) return // no <ul></ul>
        if (this.Qn.li.length === 0) return // blank <ul></ul>
        // if (this.options.length <= 1) return // only 1 or 0 <li></li>
        // this.perm = RndPermutation(this.options.length)
        this.valid = true
    }

    AreOptionsDuplicated() {
        return this.Qn.isLiDuplicated()
    }

    genQn(): string {
        if (!this.valid) return this.qn
        this.perm = this.Qn.shuffleLi()

        // let shuffledOptions = Permute(this.perm, this.options)
        // let joined = JoinToHTMLTag(shuffledOptions, 'li')
        // return this.qn.replace(this.ul, joined)
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
        let newSol = "<p>Answer: " + this.genAns() + "</p><p><b>Solution:</b></p>" + this.sol
        let ansList = ['A', 'B', 'C', 'D', 'E', 'F'];
        ansList.length = this.perm.length
        for (let x of ansList) {
            newSol = newSol.replace(new RegExp('\{\#' + x + '\}', 'g'), this.mapLetter(x));
        }
        return newSol
    }
}


