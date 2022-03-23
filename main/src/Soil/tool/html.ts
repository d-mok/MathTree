export class QuestionHTML {
    private body: HTMLBodyElement
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
        let htmls: string[] = this.li.map(x => x.innerHTML.replace(/\s+/g, ''))
        return (new Set(htmls)).size !== htmls.length
    }

    shuffleLi(shuffle: boolean = true): number[] {
        let oldHTMLs: string[] = this.li.map(x => x.innerHTML)
        let newHTMLs: string[]
        if (shuffle) {
            newHTMLs = RndShuffle(...oldHTMLs)
        } else {
            newHTMLs = [...oldHTMLs]
        }
        for (let i = 0; i < newHTMLs.length; i++) {
            this.li[i].innerHTML = newHTMLs[i]
        }
        return oldHTMLs.map(x => newHTMLs.indexOf(x))
    }
}



import { Stringifiers, pattern } from './stringify'


class Blacksmith {

    private text: string = ''
    private symbol: string = ''
    private val: unknown = undefined


    setText(text: string) {
        this.text = text
    }

    private smash(pattern: pattern) {
        let searchStr = pattern.replaceAll('@', this.symbol)
        if (!this.text.includes(searchStr)) return
        let content = Stringifiers.transform(pattern, this.val)
        this.text = this.text.replaceAll(searchStr, content)
    }


    forge(symbol: string, val: unknown): string {
        this.symbol = symbol
        this.val = val
        for (let p of Stringifiers.allPatterns())
            this.smash(p)
        return this.text
    }




}

let Smith = new Blacksmith()

export function PrintVariable(html: string, symbol: string, value: any): string {
    console.log('d')
    Smith.setText(html)
    return Smith.forge(symbol, value)
}



