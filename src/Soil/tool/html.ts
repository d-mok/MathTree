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
        let htmls: string[] = this.li.map(x => x.innerHTML)
        return (new Set(htmls)).size !== htmls.length
    }

    shuffleLi(): number[] {
        let oldHTMLs: string[] = this.li.map(x => x.innerHTML)
        let newHTMLs: string[] = RndShuffle(...oldHTMLs)
        for (let i = 0; i < newHTMLs.length; i++) {
            this.li[i].innerHTML = newHTMLs[i]
        }
        return oldHTMLs.map(x => newHTMLs.indexOf(x))
    }
}




/**
* print a variable (e.g. *x) into the html
* ```typescript
* let html = '1 + *x = *y'
* PrintVariable(html,'x',2) // '1 + 2 = *y'
* ```
*/
export function PrintVariable(html: string, symbol: string, value: any): string {

    let print = (prefix: string, value: any, suffix: string = "") => {
        html = html.replace(new RegExp(prefix + symbol + suffix, 'g'), value);
    }

    let T = typeof value

    // print **x as sci notation
    if (T === 'number') {
        let v = ant.blur(Round(value, 3))
        if (v >= 10000 || v <= 0.01) {
            print("\\*\\*", Sci(v))
        } else {
            print("\\*\\*", v)
        }
    }

    // print */x as fraction
    if (T === 'number') {
        if (html.search("\\*\\/" + symbol) > -1) {
            let [p, q] = ToFrac(value)
            print("\\*\\/", Dfrac(p, q))
        }
    }

    // print *(x) as bracket if negative
    if (T === 'number') {
        let v = ant.blur(value)
        if (IsDecimal(v)) v = Round(v, 5)
        print("\\*\\(", v >= 0 ? v : '(' + v + ')', "\\)")
    }

    // print *+x as sign of x
    if (T === 'number') {
        print("\\*\\+", value >= 0 ? '+' : '-')
    }

    // print *x as normal
    print("\\*", ParseForPrint(value))
    return html
}


export function ParseForPrint(value: any): any {
    let T = typeof value
    if (T === 'number') {
        value = ant.blur(value)
        if (IsDecimal(value)) value = Round(value, 5)
    }
    if (T === 'boolean') {
        value = Tick(value)
    }
    if (owl.point(value)) {
        value = Coord(value)
    }
    if (owl.combo(value)) {
        value = ink.printCombo(value)
    }
    return value
}

