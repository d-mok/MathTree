import { blacksmith } from './blacksmith'
import { HTMLWorker } from 'bot'



export class QuestionHTML extends HTMLWorker {
    // assume a structure '...<ul><li>...</li><li>...</li><li>...</li></ul>'
    // there must be no ul or li tags except the answer options

    get li(): HTMLLIElement[] {
        return this.all('li')
    }

    get ul(): HTMLUListElement {
        return this.one('ul')
    }

    cloneLi(sourceIndex: number, repeat = 1) {
        for (let i = 1; i <= repeat; i++) {
            let clone = this.clone('li', sourceIndex)
            this.ul.appendChild(clone)
        }
    }

    // printInWhole(symbol: string, value: any) {
    //     this.body.innerHTML = blacksmith.forge(this.body.innerHTML, symbol, value)
    // }

    printInLi(index: number, symbol: string, value: any) {
        let li = this.li[index]
        li.innerHTML = blacksmith.forge(li.innerHTML, symbol, value)
    }

    isLiDuplicated(): boolean {
        return this.hasDuplicate('li')
    }

    shuffleLi(indexArr: number[]) {
        this.shuffleChildren(indexArr, 'ul')
    }



}



