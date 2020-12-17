
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



class Instruction {
    range?: number = undefined
    assign: any[] = []
    constructor(input: any) {
        if (Array.isArray(input)) {
            this.assign = input
        } else if (typeof input === 'object' && input !== null) {
            Object.assign(this, input)
        }
    }
    do(source: any): (typeof source)[] {
        let product = Clone(this.assign)
        product.push(...RndShake(source, this.range, 3))
        product.length = 3
        product = RndShuffle(...product)
        return product
    }
}




function ValidateProducts(products: Partial<Dict>, source: Dict, validate: string) {
    if (validate === "") return true;
    validate = validate.replace('\n', ' ');
    let OK = []
    for (let index = 0; index < 3; index++) {
        let clone = Clone(source)
        for (let key in products) {
            clone[key] = products[key][index]
        }
        let {
            a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,
            A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
        } = clone;

        OK.push(eval(validate))
    }
    return OK.every(x => x)
}



type Product = {
    [_: string]: any[]
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
function ExecInstructions(instructions: Partial<Dict>, source: Dict, validate: string): Product {
    let products: Product = {}
    for (let k in instructions) {
        let instr = new Instruction(instructions[k])
        products[k] = instr.do(source[k])
    }
    let valid = ValidateProducts(products, source, validate)
    if (!valid) {
        throw 'validation fail'
    }
    return products
}
globalThis.ExecInstructions = ExecInstructions






/**
* @category AutoOptions
* @return append the array of options to question
* ```typescript
* let question = 'abc<ul><li>*x</li></ul>'
* AutoOptions(question,{x:3}) 
* // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
* ```
*/
function AutoOptions(instructions: Partial<Dict>, question: string, source: Dict, validate: string): { ok: boolean, question: string } {
    if (Object.keys(instructions).length === 0 && instructions.constructor === Object) return { ok: true, question: question }
    let options = ExtractOptions(question)
    if (options.length !== 1) return { ok: true, question: question }
    let others = Array(3).fill(options[0])

    let products: Product
    try {
        products = ExecInstructions(instructions, source, validate)
    } catch {
        return { ok: false, question: '' }
    }

    for (let k in products) {
        for (let i = 0; i < 3; i++) {
            others[i] = PrintVariable(others[i], k, products[k][i])
        }
    }

    return  { ok: true, question: AppendOptions(question, others) }
}
globalThis.AutoOptions = AutoOptions
