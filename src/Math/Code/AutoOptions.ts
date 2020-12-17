

class Instruction {
    range?: number = undefined
    assign: any[] = []
    constructor(input: any) {
        if (IsArray(input)) {
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




// function ValidateProducts(products: Partial<Dict>, source: Dict, validate: string) {
//     if (validate === "") return;
//     validate = validate.replace('\n', ' ');
//     for (let index = 0; index < 3; index++) {
//         let clone = Clone(source)
//         for (let key in products) {
//             clone[key] = products[key][index]
//         }
//         let {
//             a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,
//             A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
//         } = clone;
//         if (eval(validate) === false)
//             throw "validate fail"
//     }
// }



type Product = {
    [_: string]: any[]
}



function ExecInstructions(instructions: Partial<Dict>, source: Dict, validate: string): Product {
    let products: Product = {}
    for (let k in instructions) {
        let instr = new Instruction(instructions[k])
        products[k] = instr.do(source[k])
    }
    // ValidateProducts(products, source, validate)
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
function AutoOptions(instructions: Partial<Dict>, question: string, source: Dict, validate: string): string {
    if (IsEmptyObject(instructions)) return question
    let options = ExtractHTMLTag(question, 'li')
    let products = ExecInstructions(instructions, source, validate)

    if (options.length === 1) {
        let others = Array(3).fill(options[0])
        for (let k in products) {
            for (let i = 0; i < 3; i++) {
                others[i] = PrintVariable(others[i], k, products[k][i])
            }
        }
        return AppendInHTMLTag(question, 'ul', JoinToHTMLTag(others, 'li'))
    }

    if (options.length === 2) {
        let others = [options[0], options[1]]
        for (let k in products) {
            others[0] = PrintVariable(others[0], k, products[k][0])
            others[1] = PrintVariable(others[1], k, products[k][0])
        }
        return AppendInHTMLTag(question, 'ul', JoinToHTMLTag(others, 'li'))
    }

    return question
}
globalThis.AutoOptions = AutoOptions
