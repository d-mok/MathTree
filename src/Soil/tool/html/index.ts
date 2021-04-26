
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

    cloneLi(sourceIndex: number) {
        this.ul.appendChild(this.li[sourceIndex])
    }



    printInWhole(symbol: string, value: any) {
        this.body.innerHTML = PrintVariable(this.body.innerHTML, symbol, value)
    }

    printInLi(index: number, symbol: string, value: any) {
        let li = this.li[index]
        li.innerHTML = PrintVariable(li.innerHTML, symbol, value)
    }



}




