

/**
* @category Html
* @return print a variable (e.g. *x) into the html
* ```typescript
* let html = '1 + *x = *y'
* PrintVariable(html,'x',2) // '1 + 2 = *y'
* ```
*/
export function PrintVariable(html: string, symbol: string, value: any): string {
    let T = typeof value

    // print **x as sci notation
    if (T === 'number') {
        let v = Blur(Round(value, 3))
        if (v >= 10000 || v <= 0.01) {
            let sci = Sci(v)
            html = html.replace(new RegExp("\\*\\*" + symbol, 'g'), sci);
        } else {
            html = html.replace(new RegExp("\\*\\*" + symbol, 'g'), v);
        }
    }

    // print */x as fraction
    if (T === 'number') {
        if (html.search("\\*\\/" + symbol) > -1) {
            let [p, q] = ToFrac(value)
            html = html.replace(new RegExp("\\*\\/" + symbol, 'g'), Dfrac(p, q));
        }
    }

    // print *x as normal
    if (T === 'number') {
        value = Blur(value)
        if (IsDecimal(value)) value = Round(value, 5)
    }
    if (T === 'boolean') {
        value = Tick(value)
    }
    html = html.replace(new RegExp("\\*" + symbol, 'g'), value);
    return html
}
