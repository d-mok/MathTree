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





type transform = (val: any, type: string) => any
type rule = [pattern: string, fn: transform]



class Blacksmith {

    private text: string = ''
    private symbol: string = ''
    private val: any = undefined

    private rules: rule[] = []

    setText(text: string) {
        this.text = text
    }

    private smash([pattern, fn]: rule) {
        let searchStr = pattern.replaceAll('@', this.symbol)
        let content = String(fn(this.val, typeof this.val) ?? this.val)
        this.text = this.text.replaceAll(searchStr, content)
    }

    addRule(pattern: string, fn: transform) {
        this.rules.push([pattern, fn])
    }

    forge(symbol: string, val: any): string {
        this.symbol = symbol
        this.val = val
        for (let rule of this.rules)
            this.smash(rule)
        return this.text
    }

}

const Smith = new Blacksmith()

// print **x as sci notation
Smith.addRule('**@', (value: any) => {

    if (owl.num(value)) {
        let v = cal.blur(Round(value, 3))
        let abs = Math.abs(v)
        return (abs >= 10000 || abs <= 0.01) ? Sci(v) : v
    }

    if (owl.quantity(value)) {
        let { val, unit } = value
        let v = cal.blur(Round(val, 3))
        let abs = Math.abs(v)
        return ((abs >= 10000 || abs <= 0.01) ? Sci(v) : v) + unit
    }

})

// print */x as fraction
Smith.addRule('*/@', (value) => {
    if (owl.num(value)) {
        let [p, q] = ToFrac(value)
        return Dfrac(p, q)
    }
})


// print *//x as fraction
Smith.addRule('*//@', (value) => {
    if (owl.num(value)) {
        let [p, q] = ToFrac(value)
        return Dfrac(p, q).replaceAll('dfrac', 'frac')
    }
})


// print */(x) as fraction with bracket if necessary
Smith.addRule('*/(@)', (value) => {
    if (owl.num(value)) {
        let [p, q] = ToFrac(value)
        if (q === 1 && p >= 0) return Dfrac(p, q)
        if (q === 1 && p < 0) return '(' + Dfrac(p, q) + ')'
        return '\\left ( ' + Dfrac(p, q) + ' \\right )'
    }
})

// print *(x) as bracket if negative
Smith.addRule('*(@)', (value) => {
    if (owl.num(value)) {
        let v = numberDefault(value)
        return v >= 0 ? v : '(' + v + ')'
    }
})

// print *!x as surd
Smith.addRule('*!@', (value) => {
    if (owl.num(value)) {
        return ink.printSurd(value)
    }
    if (owl.point2D(value)) {
        let [a, b] = value
        return '(' + ink.printSurd(a) + ',' + ink.printSurd(b) + ')'
    }

})


// print *|x| as abs(x)
Smith.addRule('*|@|', (value) => {
    if (owl.num(value)) {
        return numberDefault(Math.abs(value))
    }
})


// print *^+_x as sign of x
Smith.addRule('*^+_@', (value) => {
    if (owl.num(value)) {
        return value >= 0 ? '+' : '-'
    }
})

// print *^-_x as opposite sign of x
Smith.addRule('*^-_@', (value) => {
    if (owl.num(value)) {
        return value >= 0 ? '-' : '+'
    }
})


// print *^\gt_x as '>' or '<'
Smith.addRule('*^\\gt_@', (value, T) => {
    if (T === 'boolean') return value ? '\\gt' : '\\lt'
    if (T === 'number') return value > 0 ? '\\gt' : value < 0 ? '\\lt' : '='
})

// print *^\lt_x as '<' or '>'
Smith.addRule('*^\\lt_@', (value, T) => {
    if (T === 'boolean') return value ? '\\lt' : '\\gt'
    if (T === 'number') return value > 0 ? '\\lt' : value < 0 ? '\\gt' : '='
})

// print *^\ge_x as '>=' or '<='
Smith.addRule('*^\\ge_@', (value, T) => {
    if (T === 'boolean') return value ? '\\ge' : '\\le'
    if (T === 'number') return value > 0 ? '\\ge' : value < 0 ? '\\le' : '='
})

// print *^\le_x as '<=' or '>='
Smith.addRule('*^\\le_@', (value, T) => {
    if (T === 'boolean') return value ? '\\le' : '\\ge'
    if (T === 'number') return value > 0 ? '\\le' : value < 0 ? '\\ge' : '='
})

// print *\%x as percent
Smith.addRule('*%@', (value, T) => {
    if (T === 'number') {
        return numberDefault(value * 100) + '%'
    }
})

// print *\%x as percent
Smith.addRule('*\\%@', (value, T) => {
    if (T === 'number') {
        return numberDefault(value * 100) + '\\%'
    }
})

// print *:x as ratio
Smith.addRule('*:@', (value, T) => {
    if (owl.ntuple(value)) {
        return toNumbers(value).ratio().join(":")
    }
    if (T === 'number') {
        let [p, q] = cal.toFraction(value)
        return p + ":" + q
    }
})


// print *x as normal
Smith.addRule('*@', (value, T) => {
    if (T === 'number') {
        return String(numberDefault(value))
    }
    if (T === 'boolean') {
        return value ? '✔' : '✘'
    }
    if (owl.quantity(value)) {
        let { val, unit } = value
        return String(numberDefault(val)) + unit
    }
    if (owl.point2D(value)) {
        return Coord(value)
    }
    if (owl.combo(value)) {
        return ink.printCombo(value)
    }
    if (owl.polynomial(value)) {
        return PolyPrint(value)
    }
    if (owl.trigValue(value)) {
        return ink.printTrigValue(value)
    }
    if (owl.trigExp(value)) {
        return ink.printTrigExp(value)
    }
    if (owl.constraint(value)) {
        return ink.printConstraint(value)
    }
    if (owl.constraints(value)) {
        return ink.printConstraints(value)
    }
})


// print *|.x as OR trig roots
Smith.addRule('*|.@', (value, T) => {
    if (owl.array(value)) {
        return ink.printOrTrigRoots(value)
    }
})

// print *.x as polar coordinates, with r being a surd
Smith.addRule('*.@', (value, T) => {
    if (owl.point2D(value)) {
        return ink.printPointPolar(value)
    }
})

// print *= as equation for labeled value
Smith.addRule('*=@', (value, T) => {
    if (owl.labeledValue(value)) {
        let v: LabeledValue = [...value]
        v[0] = numberDefault(v[0])
        return ink.printLabeledValue(v, 1, false)
    }
})

// print *= as equation for labeled value
Smith.addRule('*==@', (value, T) => {
    if (owl.labeledValue2(value)) {
        let v: LabeledValue2 = [...value]
        v[0] = numberDefault(v[0])
        return ink.printLabeledValue(v, 2, false)
    }
})

// print *= as equation for labeled value
Smith.addRule('*=.@', (value, T) => {
    if (owl.labeledValue(value)) {
        let v: LabeledValue = [...value]
        v[0] = numberDefault(v[0])
        return ink.printLabeledValue(v, 1, true)
    }
})

// print *= as equation for labeled value
Smith.addRule('*==.@', (value, T) => {
    if (owl.labeledValue2(value)) {
        let v: LabeledValue2 = [...value]
        v[0] = numberDefault(v[0])
        return ink.printLabeledValue(v, 2, true)
    }
})







export function PrintVariable(html: string, symbol: string, value: any): string {
    console.log('blacksmith')
    Smith.setText(html)
    return Smith.forge(symbol, value)

    // let print = (signal: string, prefix: string, suffix: string = "") => {
    //     html = html.replace(
    //         new RegExp(prefix + symbol + suffix, 'g'),
    //         () => ParseForPrint(value, signal)
    //     )
    // }

    // // print **x as sci notation
    // print("*", "\\*\\*")

    // // print */x as fraction
    // print("/", "\\*\\/")

    // // print *//x as fraction
    // print("//", "\\*\\/\\/")


    // // print */x as fraction
    // print("/()", "\\*\\/\\(", "\\)")


    // // print *(x) as bracket if negative
    // print("()", "\\*\\(", "\\)")


    // // print *!x as surd
    // print("!", "\\*\\!")


    // // print *|x| as abs(x)
    // print("||", "\\*\\|", "\\|")


    // // print *^+_x as sign of x
    // print("+", "\\*\\^\\+\\_")


    // // print *^-_x as opposite sign of x
    // print("-", "\\*\\^\\-\\_")



    // // print *^\gt_x as '>' or '<'
    // print(">", "\\*\\^\\\\gt\\_")


    // // print *^\lt_x as '<' or '>'
    // print("<", "\\*\\^\\\\lt\\_")


    // // print *^\ge_x as '>=' or '<='
    // print(">=", "\\*\\^\\\\ge\\_")


    // // print *^\le_x as '<=' or '>='
    // print("<=", "\\*\\^\\\\le\\_")

    // // print *\%x as percent
    // print("%", "\\*\\%")
    // print("\\%", "\\*\\\\\\%")

    // // print *:x as ratio
    // print(":", "\\*\\:")

    // // print *x as normal
    // print("", "\\*")


    // // print *|.x as OR trig roots
    // print("|.", "\\*\\|\\.")


    // // print *.x as polar coordinates, with r being a surd
    // print(".", "\\*\\.")

    // // print *= as equation for labeled value
    // print("=", "\\*\\=")
    // print("==", "\\*\\=\\=")
    // print("=.", "\\*\\=\\.")
    // print("==.", "\\*\\=\\=\\.")

    // return html
}


function numberDefault(num: number): number {
    let v = num
    if (owl.zero(v))
        return 0
    if (IsInteger(v)) {
        v = Fix(v, 0)
    } else {
        v = Math.abs(v) > 100 ? Fix(v, 2) : Round(v, 5)
    }
    return v
}


export function ParseForPrint(value: any, signal: string = ""): string {

    let T = typeof value

    if (signal === '') {
        if (T === 'number') {
            return String(numberDefault(value))
        }
        if (T === 'boolean') {
            return value ? '✔' : '✘'
        }
        if (owl.quantity(value)) {
            let { val, unit } = value
            return String(numberDefault(val)) + unit
        }
        if (owl.point2D(value)) {
            return Coord(value)
        }
        if (owl.combo(value)) {
            return ink.printCombo(value)
        }
        if (owl.polynomial(value)) {
            return PolyPrint(value)
        }
        if (owl.trigValue(value)) {
            return ink.printTrigValue(value)
        }
        if (owl.trigExp(value)) {
            return ink.printTrigExp(value)
        }
        if (owl.constraint(value)) {
            return ink.printConstraint(value)
        }
        if (owl.constraints(value)) {
            return ink.printConstraints(value)
        }
    }

    if (signal === '*') {
        if (T === 'number') {
            let v = cal.blur(Round(value, 3))
            let abs = Math.abs(v)
            return String((abs >= 10000 || abs <= 0.01) ? Sci(v) : v)
        }
        if (owl.quantity(value)) {
            let { val, unit } = value
            let v = cal.blur(Round(val, 3))
            let abs = Math.abs(v)
            return String((abs >= 10000 || abs <= 0.01) ? Sci(v) : v) + unit
        }
    }


    if (signal === '/') {
        if (T === 'number') {
            let [p, q] = ToFrac(value)
            return Dfrac(p, q)
        }
    }


    if (signal === '/()') {
        if (T === 'number') {
            let [p, q] = ToFrac(value)
            if (q === 1 && p >= 0) return Dfrac(p, q)
            if (q === 1 && p < 0) return '(' + Dfrac(p, q) + ')'
            return '\\left ( ' + Dfrac(p, q) + ' \\right )'
        }
    }



    if (signal === '//') {
        if (T === 'number') {
            let [p, q] = ToFrac(value)
            return Dfrac(p, q).replace(/dfrac/g, 'frac')
        }
    }


    if (signal === '()') {
        if (T === 'number') {
            let v = numberDefault(value)
            return String(v >= 0 ? v : '(' + v + ')')
        }
    }


    if (signal === '!') {
        if (T === 'number') {
            return ink.printSurd(value)
        }
        if (owl.point2D(value)) {
            let [a, b] = value
            return '(' + ink.printSurd(a) + ',' + ink.printSurd(b) + ')'
        }
    }



    if (signal === '+') {
        if (T === 'number') return value >= 0 ? '+' : '-'
    }


    if (signal === '-') {
        if (T === 'number') return value >= 0 ? '-' : '+'
    }



    if (signal === '||') {
        if (T === 'number') {
            return String(numberDefault(Math.abs(value)))
        }
    }



    if (signal === '>') {
        if (T === 'boolean') return value ? '\\gt' : '\\lt'
        if (T === 'number') return value > 0 ? '\\gt' : value < 0 ? '\\lt' : '='
    }


    if (signal === '<') {
        if (T === 'boolean') return value ? '\\lt' : '\\gt'
        if (T === 'number') return value > 0 ? '\\lt' : value < 0 ? '\\gt' : '='
    }


    if (signal === '>=') {
        if (T === 'boolean') return value ? '\\ge' : '\\le'
        if (T === 'number') return value > 0 ? '\\ge' : value < 0 ? '\\le' : '='
    }


    if (signal === '<=') {
        if (T === 'boolean') return value ? '\\le' : '\\ge'
        if (T === 'number') return value > 0 ? '\\le' : value < 0 ? '\\ge' : '='
    }

    if (signal === '%') {
        if (T === 'number') {
            return numberDefault(value * 100) + '%'
        }
    }

    if (signal === '\\%') {
        if (T === 'number') {
            return numberDefault(value * 100) + '\\%'
        }
    }


    if (signal === ':') {
        if (owl.ntuple(value)) {
            return toNumbers(value).ratio().join(":")
        }
        if (T === 'number') {
            let [p, q] = cal.toFraction(value)
            return p + ":" + q
        }
    }


    if (signal === '|.') {
        if (owl.array(value)) {
            return ink.printOrTrigRoots(value)
        }
    }



    if (signal === '.') {
        if (owl.point2D(value)) {
            return ink.printPointPolar(value)
        }
    }



    if (signal === '=') {
        if (owl.labeledValue(value)) {
            let v: LabeledValue = [...value]
            v[0] = numberDefault(v[0])
            return ink.printLabeledValue(v, 1, false)
        }
    }


    if (signal === '==') {
        if (owl.labeledValue2(value)) {
            let v: LabeledValue2 = [...value]
            v[0] = numberDefault(v[0])
            return ink.printLabeledValue(v, 2, false)
        }
    }




    if (signal === '=.') {
        if (owl.labeledValue(value)) {
            let v: LabeledValue = [...value]
            v[0] = numberDefault(v[0])
            return ink.printLabeledValue(v, 1, true)
        }
    }


    if (signal === '==.') {
        if (owl.labeledValue2(value)) {
            let v: LabeledValue2 = [...value]
            v[0] = numberDefault(v[0])
            return ink.printLabeledValue(v, 2, true)
        }
    }


    return String(value)

}

