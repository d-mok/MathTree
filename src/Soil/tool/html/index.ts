
import { PrintVariable } from './print'


// class HTMLWizard {
//     public body: HTMLBodyElement

//     constructor(html: string = '') {
//         this.body = (new DOMParser()).parseFromString(html, 'text/html').getElementsByTagName('body')[0]
//     }

//     get(tag: string): Element[] {
//         return [...this.body.getElementsByTagName(tag)]
//     }

//     remove(tag: string) {
//         this.get(tag).forEach(x => x.remove())
//     }





// }

export class QuestionHTML {
    public body: HTMLBodyElement
    // assume a structure '...<ul><li>...</li><li>...</li><li>...</li></ul>'
    // there must be no ul or li tags except the answer options

    constructor(html: string = '') {
        this.body = (new DOMParser())
            .parseFromString(html, 'text/html')
            .getElementsByTagName('body')[0]
    }

    export() {
        return this.body.innerHTML
    }

    get li(): HTMLLIElement[] {
        return [...this.body.getElementsByTagName('li')]
    }

    get ul(): HTMLUListElement {
        return this.body.getElementsByTagName('ul')[0]
    }

    cloneLi(sourceIndex: number, repeat = 1) {
        for (let i = 1; i <= repeat; i++) {
            this.ul.appendChild(this.li[sourceIndex].cloneNode(true))
        }
    }

    printInWhole(symbol: string, value: any) {
        this.body.innerHTML = PrintVariable(this.body.innerHTML, symbol, value)
    }

    printInLi(index: number, symbol: string, value: any) {
        let li = this.li[index]
        li.innerHTML = PrintVariable(li.innerHTML, symbol, value)
    }

    isLiDuplicated(): boolean {
        let htmls: string[] = this.li.map(x => x.innerHTML)
        return (new Set(htmls)).size !== htmls.length
    }

    shuffleLi() {
        let htmls: string[] = this.li.map(x => x.innerHTML)
        htmls = RndShuffle(...htmls)
        for (let i = 0; i < htmls.length; i++) {
            this.li[i].innerHTML = htmls[i]
        }
    }



}




