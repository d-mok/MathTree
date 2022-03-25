import { blacksmith } from './blacksmith'

import { HTMLWorker } from 'bot'

// export class QuestionHTML {
//     private body: HTMLBodyElement
//     // assume a structure '...<ul><li>...</li><li>...</li><li>...</li></ul>'
//     // there must be no ul or li tags except the answer options

//     constructor(html: string = '') {
//         this.body = (new DOMParser())
//             .parseFromString(html, 'text/html')
//             .getElementsByTagName('body')[0]
//     }

//     export() {
//         return this.body.innerHTML
//     }

//     get li(): HTMLLIElement[] {
//         return [...this.body.getElementsByTagName('li')]
//     }

//     get ul(): HTMLUListElement {
//         return this.body.getElementsByTagName('ul')[0]
//     }

//     cloneLi(sourceIndex: number, repeat = 1) {
//         for (let i = 1; i <= repeat; i++) {
//             this.ul.appendChild(this.li[sourceIndex].cloneNode(true))
//         }
//     }

//     printInWhole(symbol: string, value: any) {
//         this.body.innerHTML = blacksmith.forge(this.body.innerHTML, symbol, value)
//     }

//     printInLi(index: number, symbol: string, value: any) {
//         let li = this.li[index]
//         li.innerHTML = blacksmith.forge(li.innerHTML, symbol, value)
//     }

//     isLiDuplicated(): boolean {
//         let htmls: string[] = this.li.map(x => x.innerHTML.replace(/\s+/g, ''))
//         return (new Set(htmls)).size !== htmls.length
//     }

//     shuffleLi(shuffle: boolean = true): number[] {
//         let oldHTMLs: string[] = this.li.map(x => x.innerHTML)
//         let newHTMLs: string[]
//         if (shuffle) {
//             newHTMLs = RndShuffle(...oldHTMLs)
//         } else {
//             newHTMLs = [...oldHTMLs]
//         }
//         for (let i = 0; i < newHTMLs.length; i++) {
//             this.li[i].innerHTML = newHTMLs[i]
//         }
//         return oldHTMLs.map(x => newHTMLs.indexOf(x))
//     }
// }







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

    printInWhole(symbol: string, value: any) {
        this.body.innerHTML = blacksmith.forge(this.body.innerHTML, symbol, value)
    }

    printInLi(index: number, symbol: string, value: any) {
        let li = this.li[index]
        li.innerHTML = blacksmith.forge(li.innerHTML, symbol, value)
    }

    isLiDuplicated(): boolean {
        return this.hasDuplicate('li')
    }

    shuffleLi(indexArr: number[]) {
        this.shuffleChildren(indexArr, 'ul')
        // let oldHTMLs: string[] = this.li.map(x => x.innerHTML)
        // let newHTMLs: string[]
        // if (shuffle) {
        //     newHTMLs = RndShuffle(...oldHTMLs)
        // } else {
        //     newHTMLs = [...oldHTMLs]
        // }
        // for (let i = 0; i < newHTMLs.length; i++) {
        //     this.li[i].innerHTML = newHTMLs[i]
        // }
        // return oldHTMLs.map(x => newHTMLs.indexOf(x))
    }



}



