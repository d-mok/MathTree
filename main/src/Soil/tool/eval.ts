import { Dict, Config } from '../cls'
import { Stringifiers, pattern } from './stringify'
import { evalCtx } from 'bot'

// type Context = {
//     dict: Dict
//     sections: section[]
//     answer: string
//     options: Partial<Dict>
//     shuffle: boolean
//     qn: string
//     sol: string
// }



function detectVarErr(e: unknown) :any{
    if (e instanceof Error) {
        let isVarErr = e.message === 'Cannot convert a Symbol value to a number'
        if (isVarErr) {
            return CustomError('VariableError', "A variable is used before a value is defined.")
        }
    }

    return e


}



export function evaluate(code: string, ...contexts: object[]): void {
    // injectables
    // let {
    //     a, b, c, d, e, f, g, h, i, j, k, l, m, n,
    //     o, p, q, r, s, t, u, v, w, x, y, z,
    //     A, B, C, D, E, F, G, H, I, J, K, L, M, N,
    //     O, P, Q, R, S, T, U, V, W, X, Y, Z
    // } = context.dict
    // let sections: section[] = context.sections
    // let answer: string = context.answer
    // let options: Partial<Dict> = context.options
    // let shuffle: boolean = context.shuffle
    // let question: string = context.qn
    // let solution: string = context.sol

    // // execute
    // let result: any
    // try {
    //     result =
    // } catch (e) {
    //     throw detectVarErr(e)
    // }

    evalCtx(code, detectVarErr,...contexts)

    // allow answer to be number
    // if (typeof answer === 'number') answer = ['A', 'B', 'C', 'D'][answer]


    //retrieve

    // context.dict.update({
    //     a, b, c, d, e, f, g, h, i, j, k, l, m, n,
    //     o, p, q, r, s, t, u, v, w, x, y, z,
    //     A, B, C, D, E, F, G, H, I, J, K, L, M, N,
    //     O, P, Q, R, S, T, U, V, W, X, Y, Z
    // })
    // let newContext: Context = {
    //     dict: context.dict,
    //     sections,
    //     answer,
    //     options,
    //     shuffle,
    //     qn: question,
    //     sol: solution
    // }
    // return { result, context: newContext }
}


function htmlDecode(str: string) {
    return str.replace(
        /&amp;|&lt;|&gt;|&#39;|&quot;/g,
        (tag: string) => ({
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&#39;': "'",
            '&quot;': '"'
        }[tag] || tag)
    )
}



export function evalInline(code: string, dict: Dict) {

    code = htmlDecode(code)

    // injectables
    let {
        a, b, c, d, e, f, g, h, i, j, k, l, m, n,
        o, p, q, r, s, t, u, v, w, x, y, z,
        A, B, C, D, E, F, G, H, I, J, K, L, M, N,
        O, P, Q, R, S, T, U, V, W, X, Y, Z
    } = dict

    // execute
    try {
        return eval(code)
    } catch (e) {
        throw detectVarErr(e)
    }
}



export function intrapolate(html: string, dict: Dict) {

    function intra(pattern: pattern, prefix: string) {
        html = html.replace(new RegExp(String.raw`\*${prefix}\\\{([^\{\}]*)\\\}`, 'g'),
            (match, code) => {
                let result = evalInline(code, dict)
                return Stringifiers.transform(pattern, result)
            })
        html = html.replace(new RegExp(String.raw`\*${prefix}\{([^\{\}]*)\}`, 'g'),
            (match, code) => {
                let result = evalInline(code, dict)
                return Stringifiers.transform(pattern, result)
            })
    }
    intra('*@', '')
    intra('*/@', '\\/')
    intra('**@', '\\*')
    return html
}


