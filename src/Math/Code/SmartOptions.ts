
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
    function shake(num: any, range: number = 10): any {
        // Fraction
        if (ParseDfrac(num).every(x => !isNaN(x))) {
            let f = ParseDfrac(num)
            return Dfrac(...RndShakeFrac(f, range, 1)[0])
        }
        // Integer
        if (IsInteger(num)) {
            return RndShakeN(num, range, 1)[0]
        }
        // Probability
        if (IsProbability(num)) {
            return RndShakeProb(num, range, 1)[0]
        }
        // Decimal
        if (IsNum(num)) {
            return RndShakeR(num, range, 1)[0]
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




