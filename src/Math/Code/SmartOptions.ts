
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
function SmartOptions(question: string): string {
    const d = String.raw`-?\d+\.?\d*`
    const f = String.raw`\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`

    function shake(num: string): string {
        // is fraction
        if (num.match(new RegExp(f, 'g'))) {
            let [p, q] = num.match(new RegExp(d, 'g'))!.map(x => x)
            return Dfrac(...RndShakeFrac([Number(p), Number(q)], 10, 0)[0])
        }
        let n = Number(num)
        // is not a number, return self
        if (!IsNum(n)) return num
        if (!IsInteger(n)) {
            // is real
            if (IsProbability(n)) {
                return RndShakeProb(n, 10, 1)[0].toString()
            } else {
                return RndShakeR(n, 10, 1)[0].toString()
            }
        } else {
            // is integer
            return RndShakeN(n, 10, 1)[0].toString()
        }
    }

    function produce(mould: string): string {
        let nums = mould.match(/(\\dfrac{-?\d+\.?\d*}{-?\d+\.?\d*}|-?\d+\.?\d*)/g)?.map(x => x) ?? []
        for (let i = 0; i < nums.length; i++) {
            mould = mould.replace(nums[i], '!!!' + i + '!!!')
        }
        let shaked = nums.map(x => shake(x))
        for (let i = 0; i < nums.length; i++) {
            mould = mould.replace('!!!' + i + '!!!', shaked[i])
        }
        return mould
    }

    let options = ExtractOptions(question)
    if (options.length !== 1) return question
    let mould = options[0]
    let others = [produce(mould), produce(mould), produce(mould)]
    return AppendOptions(question, others)
}
globalThis.SmartOptions = SmartOptions



