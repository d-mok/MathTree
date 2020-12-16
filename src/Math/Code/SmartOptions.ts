
/**
* @category SmartOptions
* @return get an array of all options in the question
* ```typescript
* let question = 'abc<ul><li>1</li><li>2</li><li>3</li></ul>'
* ExtractOptions(question) // ['1','2','3']
* ```
*/
function ExtractOptions(question: string): string[] {
    let options = question.match(/<li>[\s\S]*?<\/li>/g)
    if (options === null) return []
    return options.map(x => x.replace('<li>', '').replace('</li>', ''))
}
globalThis.ExtractOptions = ExtractOptions



/**
* @category SmartOptions
* @return append the array of options to question
* ```typescript
* let question = 'abc<ul><li>1</li><li>2</li></ul>'
* AppendOptions(question,['3','4']) // 'abc<ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>'
* ```
*/
function AppendOptions(question: string, options: string[]) {
    return question.replace('</ul>', options.map(n => '<li>' + n + '</li>').join('') + '</ul>')
}
globalThis.AppendOptions = AppendOptions



/**
* @category SmartOptions
* @return append the array of options to question
* ```typescript
* let question = 'abc<ul><li>1</li><li>2</li></ul>'
* AppendOptions(question,['3','4']) // 'abc<ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>'
* ```
*/
function SmartOptions(question: string, dict: Dict): string {
    const d = String.raw`-?\d+\.?\d*`
    const f = String.raw`\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`

    function shake(num: any): any {
        // is fraction
        if (typeof num === 'string' && num.match(new RegExp(f, 'g'))) {
            let [p, q] = num.match(new RegExp(d, 'g'))!.map(x => x)
            return Dfrac(...RndShakeFrac([Number(p), Number(q)], 10, 0)[0])
        }
        let n = Number(num)
        // is not a number, return self
        if (!IsNum(n)) return num
        if (!IsInteger(n)) {
            // is real
            if (IsProbability(n)) {
                return RndShakeProb(n, 10, 1)[0]
            } else {
                return RndShakeR(n, 10, 1)[0]
            }
        } else {
            // is integer
            return RndShakeN(n, 10, 1)[0]
        }
    }

    function substitute(html: string, symbol: string, num: any) {
        if (typeof num === 'undefined') return html;
        // round num to 5 sig. fig.
        if (typeof num === 'number') num = parseFloat(num.toFixed(10));
        if (typeof num === 'number' && !Number.isInteger(num)) num = parseFloat(num.toPrecision(5));
        return html.replace(new RegExp("\\*" + symbol, 'g'), num);
    }


    function mock(mould: string): string {
        for (let v in dict) {
            mould = substitute(mould, v, shake(dict[v]))
        }
        return mould
    }
    let options = ExtractOptions(question)
    if (options.length !== 1) return question
    let mould = options[0]
    let others = [mock(mould), mock(mould), mock(mould)]
    return AppendOptions(question, others)
}
globalThis.SmartOptions = SmartOptions




