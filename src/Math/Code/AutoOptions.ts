
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
* @category AutoOptions
* @return append the array of options to question
* ```typescript
* let question = 'abc<ul><li>*x</li></ul>'
* AutoOptions(question,{x:3}) 
* // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
* ```
*/
function AutoOptions(dict: Partial<Dict>, question: string, source: Dict): string {

    function shake(num: number | string, range?: number): (number | string)[] {
        if (typeof num === 'string') {
            // Fraction
            if (ParseDfrac(num)) {
                let f = ParseDfrac(num)!
                range ??= 5
                return RndShakeFrac(f, range, 3).map(x => Dfrac(...x))
            }
            // Inequal Sign
            if (ParseIneqSign(num)) {
                let [g, e] = ParseIneqSign(num)!
                let others = [
                    IneqSign(g, e)[0],
                    IneqSign(!g, e)[0],
                    IneqSign(!g, e)[0],
                ]
                return RndShuffle(...others)
            }
        }
        if (typeof num === 'number') {
            // Integer
            if (IsInteger(num)) {
                range ??= Max(5, Abs(num * 0.1))
                return RndShakeN(num, range, 3)
            }
            // Probability
            if (IsProbability(num)) {
                range ??= 0.3
                return RndShakeProb(num, range, 3)
            }
            // Decimal
            if (IsNum(num)) {
                range ??= Max(5, Abs(num * 0.1))
                return RndShakeR(num, range, 3)
            }
        }
        throw ''
    }

    function substitute(html: string, symbol: string, num: any) {
        if (typeof num === 'undefined') return html;
        // round num to 5 sig. fig.
        if (typeof num === 'number') num = parseFloat(num.toFixed(10));
        if (typeof num === 'number' && !Number.isInteger(num)) num = parseFloat(num.toPrecision(5));
        return html.replace(new RegExp("\\*" + symbol, 'g'), num);
    }

    let options = ExtractOptions(question)
    if (options.length !== 1) return question
    let mould = options[0]

    let others = [mould, mould, mould]
    for (let k in dict) {
        let v: any = dict[k]
        let shaked: any[]
        if (Array.isArray(v)) {
            if (v.length === 3) { // contain array
                shaked = v
            }
            else if (v.length === 1 && typeof v[0] === 'number') {
                if (v[0] > 0) { // contain range
                    shaked = shake(source[k], v[0])
                } else { // indicate sign mode
                    shaked = [source[k], -source[k], -source[k]]
                }
            }
            else {
                console.error('Incorrect Format of Opt Dict in AutoOptions!')
                return question
            }
        } else {
            // no array value provided
            shaked = shake(v)
        }
        for (let i = 0; i < 3; i++) {
            others[i] = substitute(others[i], k, shaked[i])
        }
    }
    return AppendOptions(question, others)
}
globalThis.AutoOptions = AutoOptions
