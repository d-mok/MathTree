export class QuestionHTML {
    // assume a structure '...<ul><li>...</li><li>...</li><li>...</li></ul>'
    // there must be no ul or li tags except the answer options
    constructor(html = '') {
        this.body = (new DOMParser())
            .parseFromString(html, 'text/html')
            .getElementsByTagName('body')[0];
    }
    export() {
        return this.body.innerHTML;
    }
    get li() {
        return [...this.body.getElementsByTagName('li')];
    }
    get ul() {
        return this.body.getElementsByTagName('ul')[0];
    }
    cloneLi(sourceIndex, repeat = 1) {
        for (let i = 1; i <= repeat; i++) {
            this.ul.appendChild(this.li[sourceIndex].cloneNode(true));
        }
    }
    printInWhole(symbol, value) {
        this.body.innerHTML = PrintVariable(this.body.innerHTML, symbol, value);
    }
    printInLi(index, symbol, value) {
        let li = this.li[index];
        li.innerHTML = PrintVariable(li.innerHTML, symbol, value);
    }
    isLiDuplicated() {
        let htmls = this.li.map(x => x.innerHTML);
        return (new Set(htmls)).size !== htmls.length;
    }
    shuffleLi() {
        let oldHTMLs = this.li.map(x => x.innerHTML);
        let newHTMLs = RndShuffle(...oldHTMLs);
        for (let i = 0; i < newHTMLs.length; i++) {
            this.li[i].innerHTML = newHTMLs[i];
        }
        return oldHTMLs.map(x => newHTMLs.indexOf(x));
    }
}
/**
* print a variable (e.g. *x) into the html
* ```typescript
* let html = '1 + *x = *y'
* PrintVariable(html,'x',2) // '1 + 2 = *y'
* ```
*/
export function PrintVariable(html, symbol, value) {
    let print = (prefix, value) => {
        html = html.replace(new RegExp(prefix + symbol, 'g'), value);
    };
    let T = typeof value;
    // print **x as sci notation
    if (T === 'number') {
        let v = Blur(Round(value, 3));
        if (v >= 10000 || v <= 0.01) {
            print("\\*\\*", Sci(v));
        }
        else {
            print("\\*\\*", v);
        }
    }
    // print */x as fraction
    if (T === 'number') {
        if (html.search("\\*\\/" + symbol) > -1) {
            let [p, q] = ToFrac(value);
            print("\\*\\/", Dfrac(p, q));
        }
    }
    // print *x as normal
    if (T === 'number') {
        value = Blur(value);
        if (IsDecimal(value))
            value = Round(value, 5);
    }
    if (T === 'boolean') {
        value = Tick(value);
    }
    if (IsPoint(value)) {
        value = Coord(value);
    }
    print("\\*", value);
    return html;
}
