import { HTMLWorker } from "./worker";
export class QuestionHTML extends HTMLWorker {
    // assume a structure '...<ul><li>...</li><li>...</li><li>...</li></ul>'
    // there must be no ul or li tags except the answer options
    get li() {
        return this.all('li');
    }
    get ul() {
        return this.one('ul');
    }
    cloneLi(sourceIndex, repeat = 1) {
        for (let i = 1; i <= repeat; i++) {
            let clone = this.clone('li', sourceIndex);
            this.ul.appendChild(clone);
        }
    }
    // printInWhole(symbol: string, value: any) {
    //     this.body.innerHTML = PrintVariable(this.body.innerHTML, symbol, value)
    // }
    // printInLi(index: number, symbol: string, value: any) {
    //     let li = this.li[index]
    //     li.innerHTML = PrintVariable(li.innerHTML, symbol, value)
    // }
    isLiDuplicated() {
        return this.hasDuplicate('li');
    }
    // shuffleLi1(shuffle: boolean = true): number[] {
    //     let oldHTMLs: string[] = this.li.map(x => x.innerHTML)
    //     let newHTMLs: string[]
    //     if (shuffle) {
    //         newHTMLs = RndShuffle(...oldHTMLs)
    //     } else {
    //         newHTMLs = [...oldHTMLs]
    //     }
    //     for (let i = 0; i < newHTMLs.length; i++) {
    //         this.li[i].innerHTML = newHTMLs[i]
    //     }
    //     return oldHTMLs.map(x => newHTMLs.indexOf(x))
    // }
    shuffleLi2() {
        return this.shuffleChildren('ul');
    }
}
//# sourceMappingURL=index.js.map