import { Dict, Config } from '../cls'

type Context = {
    dict: Dict
    sections: section[]
    answer: string
    options: Partial<Dict>
    qn: string
    sol: string
}




export function evaluate(code: string, context: Context) {
    // injectables
    let {
        a, b, c, d, e, f, g, h, i, j, k, l, m, n,
        o, p, q, r, s, t, u, v, w, x, y, z,
        A, B, C, D, E, F, G, H, I, J, K, L, M, N,
        O, P, Q, R, S, T, U, V, W, X, Y, Z
    } = context.dict;
    let sections: section[] = context.sections
    let answer: string = context.answer
    let options: Partial<Dict> = context.options
    let question: string = context.qn
    let solution: string = context.sol

    // execute
    let result: any
    try {
        result = eval(code)
    } catch (e) {
        if (e.message === 'Cannot convert a Symbol value to a number') {
            throw CustomError(
                'VariableError',
                "A variable is used before a value is defined."
            )
        } else {
            throw e
        }
    }

    //retrieve

    context.dict.update({
        a, b, c, d, e, f, g, h, i, j, k, l, m, n,
        o, p, q, r, s, t, u, v, w, x, y, z,
        A, B, C, D, E, F, G, H, I, J, K, L, M, N,
        O, P, Q, R, S, T, U, V, W, X, Y, Z
    })
    let newContext: Context = {
        dict: context.dict,
        sections,
        answer,
        options,
        qn: question,
        sol: solution
    }
    return { result, context: newContext }
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
    );
}



export function evalInline(code: string, dict: Dict) {
    
    code = htmlDecode(code)

    // injectables
    let {
        a, b, c, d, e, f, g, h, i, j, k, l, m, n,
        o, p, q, r, s, t, u, v, w, x, y, z,
        A, B, C, D, E, F, G, H, I, J, K, L, M, N,
        O, P, Q, R, S, T, U, V, W, X, Y, Z
    } = dict;

    // execute
    let result: any
    try {
        result = eval(code)
    } catch (e) {
        if (e.message === 'Cannot convert a Symbol value to a number') {
            throw CustomError(
                'VariableError',
                "A variable is used before a value is defined."
            )
        } else {
            throw e
        }
    }

    return result
}