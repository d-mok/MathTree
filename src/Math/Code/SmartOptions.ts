
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

    function shake(num: number | string, range?: number): (number | string)[] {
        if (typeof num === 'string') {
            // Fraction
            if (ParseDfrac(num).every(x => !isNaN(x))) {
                let f = ParseDfrac(num)
                range ??= 5
                return RndShakeFrac(f, range, 3).map(x => Dfrac(...x))
            }
        }
        if (typeof num === 'number') {
            // Integer
            if (IsInteger(num)) {
                range ??= Max(5, num * 0.1)
                return RndShakeN(num, range, 3)
            }
            // Probability
            if (IsProbability(num)) {
                range ??= 0.3
                return RndShakeProb(num, range, 3)
            }
            // Decimal
            if (IsNum(num)) {
                range ??= Max(5, num * 0.1)
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

    let shaked: { [v: string]: (number | string)[] } = {}
    for (let v in dict) {
        shaked[v] = shake(dict[v])
    }
    let others = []
    for (let i = 0; i < 3; i++) {
        let newOpt: string = mould
        for (let v in dict) {
            newOpt = substitute(newOpt, v, shaked[v][i])
        }
        others.push(newOpt)
    }
    return AppendOptions(question, others)
}
globalThis.SmartOptions = SmartOptions




