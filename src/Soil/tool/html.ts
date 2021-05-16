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




export function PrintVariable(html: string, symbol: string, value: any): string {

    let print = (signal: string, prefix: string, suffix: string = "") => {
        html = html.replace(
            new RegExp(prefix + symbol + suffix, 'g'),
            () => ParseForPrint(value, signal)
        );
    }

    // print **x as sci notation
    print("*", "\\*\\*")

    // print */x as fraction
    print("/", "\\*\\/")

    // print *//x as fraction
    print("//", "\\*\\/\\/")


    // print *(x) as bracket if negative
    print("()", "\\*\\(", "\\)")

    // print *^+_x as sign of x
    print("+", "\\*\\^\\+\\_")


    // print *^-_x as sign of x
    print("-", "\\*\\^\\-\\_")



    // print *^\gt_x as '>' or '<'
    print(">", "\\*\\^\\\\\\g\\t\\_")


    // print *^\lt_x as '<' or '>'
    print("<", "\\*\\^\\\\\\l\\t\\_")


    // print *^\ge_x as '>=' or '<='
    print(">=", "\\*\\^\\\\\\g\\e\\_")


    // print *^\le_x as '<=' or '>='
    print("<=", "\\*\\^\\\\\\l\\e\\_")
    
    // print *\%x as percent
    print("%", "\\*\\%")
    print("\\%", "\\*\\\\\\%")

    // print *:x as ratio
    print(":", "\\*\\:")

    // print *x as normal
    print("", "\\*")
    return html
}


export function ParseForPrint(value: any, signal: string = ""): string {

    let T = typeof value

    if (signal === '') {
        if (T === 'number') {
            // let v = ant.blur(value)
            let v = value
            if (IsInteger(v)) {
                v = Fix(v, 0)
            } else {
                v = Math.abs(v) > 100 ? Fix(v, 2) : Round(v, 5)
            }
            return String(v)
        }
        if (T === 'boolean') {
            return Tick(value)
        }
        if (owl.point(value)) {
            return Coord(value)
        }
        if (owl.combo(value)) {
            return ink.printCombo(value)
        }
        if (owl.polynomial(value))
            return PolyPrint(value)
    }

    if (signal === '*') {
        if (T === 'number') {
            let v = ant.blur(Round(value, 3))
            return String((v >= 10000 || v <= 0.01) ? Sci(v) : v)
        }
    }


    if (signal === '/') {
        if (T === 'number') {
            let [p, q] = ToFrac(value)
            return Dfrac(p, q)
        }
    }


    if (signal === '//') {
        if (T === 'number') {
            let [p, q] = ToFrac(value)
            if (q === 1) return String(p)
            if (p === 0) return '0'
            return p + "/" + q
        }
    }


    if (signal === '()') {
        if (T === 'number') {
            let v = ant.blur(value)
            if (IsDecimal(v)) v = Round(v, 5)
            return String(v >= 0 ? v : '(' + v + ')')
        }
    }



    if (signal === '+') {
        if (T === 'number') return value >= 0 ? '+' : '-'
    }


    if (signal === '-') {
        if (T === 'number') return value <= 0 ? '-' : '+'
    }



    if (signal === '||') {
        if (T === 'number') {
            return ParseForPrint(Math.abs(value), '')
        }
    }


    if (signal === '>') {
        if (T === 'boolean') return value ? '\\gt' : '\\lt'
    }


    if (signal === '<') {
        if (T === 'boolean') return value ? '\\lt' : '\\gt'
    }


    if (signal === '>=') {
        if (T === 'boolean') return value ? '\\ge' : '\\le'
    }


    if (signal === '<=') {
        if (T === 'boolean') return value ? '\\le' : '\\ge'
    }

    if (signal === '%') {
        if (T === 'number') {
            let v = ant.blur(value)
            if (IsDecimal(v)) v = Round(v, 5)
            v = v * 100
            return v + '%'
        }
    }

    if (signal === '\\%') {
        if (T === 'number') {
            let v = ant.blur(value)
            if (IsDecimal(v)) v = Round(v, 5)
            v = v * 100
            return v + '\\%'
        }
    }


    if (signal === ':') {
        if (owl.ntuple(value)) {
            let v = ant.ratio(...value)
            return v.join(":")
        }
        if (T === 'number') {
            let [p, q] = ToFrac(value)
            return p + ":" + q
        }
    }

    return String(value)

}

