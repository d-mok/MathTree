
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


function PrintVariable(template: string, symbol: string, value: any) {
    let T = typeof value
    if (!['number', 'string', 'boolean'].includes(T)) return template
    if (T === 'number') {
        value = parseFloat(value.toFixed(10));
        if (!Number.isInteger(value)) value = parseFloat(value.toPrecision(5));
    }
    if (T === 'boolean') {
        value = Tick(value)
    }
    return template.replace(new RegExp("\\*" + symbol, 'g'), value);
}


function NegateVariable(item: number | string): number | string {
    if (typeof item === 'number') return -item
    if (typeof item === 'string') {
        if (item.charAt(0) === '-') {
            return item.substring(1)
        } else {
            return '-' + item
        }
    }
    throw 'Fail to negate input in AutoOptions!'
}


type Instruction = {
    negate: boolean
    shake: boolean
    range: number | undefined // used in shake
    assign: any[]
    ordered: boolean // used in manual
}

function defaultInstruction({
    negate = false,
    shake = true,
    range = undefined,
    assign = [],
    ordered = false
}: Partial<Instruction>): Instruction {
    return {
        negate,
        shake,
        range,
        assign,
        ordered
    }
}

function ParseInstruction(input: any): Instruction {
    if (typeof input === 'object' && input !== null) {
        return defaultInstruction(input)
    }
    if (Array.isArray(input)) {
        return defaultInstruction({
            assign: input
        })
    }
    return defaultInstruction({})
}


function DoInstruction(instruction: Instruction, source: any): (typeof source)[] {
    let product = instruction.assign
    if (!instruction.ordered) product = RndShuffle(...product)
    if (instruction.negate) {
        let neg = NegateVariable(source)
        product.push(...RndShuffle(source, neg, neg))
    } else if (instruction.shake) {
        product.push(...ShakeVariable(source, instruction.range))
    }
    product.length = 3
    return product
}



function ShakeVariable(source: number | string, range?: number): (typeof source)[] {
    if (typeof source === 'string') {
        // Fraction
        if (ParseDfrac(source)) {
            let f = ParseDfrac(source)!
            range ??= 5
            return RndShakeFrac(f, range, 3).map(x => Dfrac(...x))
        }
        // Inequal Sign
        if (ParseIneqSign(source)) {
            let [g, e] = ParseIneqSign(source)!
            let others = [
                IneqSign(g, e)[0],
                IneqSign(!g, e)[0],
                IneqSign(!g, e)[0],
            ]
            return RndShuffle(...others)
        }
        if (Number(source)) {
            source = Number(source)
        }
    }
    if (typeof source === 'number') {
        // Integer
        if (IsInteger(source)) {
            range ??= Max(5, Abs(source * 0.1))
            return RndShakeN(source, range, 3)
        }
        // Probability
        if (IsProbability(source)) {
            range ??= 0.3
            return RndShakeProb(source, range, 3)
        }
        // Decimal
        if (IsNum(source)) {
            range ??= Max(5, Abs(source * 0.1))
            return RndShakeR(source, range, 3)
        }
    }
    console.error('Fail to shake input in AutoOptions! Returning original value: ' + source)
    return [source, source, source]
}






/**
* @category AutoOptions
* @return append the array of options to question
* ```typescript
* let question = 'abc<ul><li>*x</li></ul>'
* AutoOptions(question,{x:3}) 
* // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
* ```
*/
function AutoOptions(instructions: Partial<Dict>, question: string, source: Dict): string {

    let options = ExtractOptions(question)
    if (options.length !== 1) return question
    let mould = options[0]
    let others = [mould, mould, mould]

    let products: Partial<Dict> = {}
    for (let k in instructions) {
        instructions[k] = ParseInstruction(instructions[k])
        products[k] = DoInstruction(instructions[k], source[k])
    }

    for (let k in instructions) {
        for (let i = 0; i < 3; i++) {
            others[i] = PrintVariable(others[i], k, products[k][i])
        }
    }

    return AppendOptions(question, others)
}
globalThis.AutoOptions = AutoOptions
