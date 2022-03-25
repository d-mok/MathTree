import { QuestionHTML } from './html'
import { shuffleIndex, shuffleAs } from 'bot'


export class OptionShuffler {

    public hasDuplicatedOptions = false

    constructor(
        public qn: string,
        public sol: string,
        public ans: string,
        private shuffle: boolean
    ) {
        this.exec()
    }

    private exec() {
        let Qn = new QuestionHTML(this.qn)
        let liCount = Qn.liCount()
        this.hasDuplicatedOptions = Qn.isLiDuplicated()

        if (liCount === 0 || !Qn.hasOneUl()) {// blank <ul></ul> || no <ul></ul>
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
    }

    private letterMap(perm: number[]): { [old: string]: string } {
        let ansList = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, perm.length)
        let shuffled = shuffleAs(ansList, perm)
        let map: { [old: string]: string } = {}
        for (let i = 0; i < perm.length; i++)
            map[shuffled[i]] = ansList[i]
        return map
    }

}


