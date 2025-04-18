import _ from 'lodash'
import { PenCls } from '../../Pen/Pen.js'

// types

type morph = [action: 'HT' | 'VT' | 'HR' | 'VR' | 'HS' | 'VS', val: number]

type state = { a: number; b: number; m: number; n: number } // nf(mx+a)+b

function left(v: number) {
    return v > 0 ? 'leftwards' : 'rightwards'
}

function up(v: number) {
    return v > 0 ? 'upwards' : 'downwards'
}

function large(v: number) {
    return v >= 1 ? 'enlarge' : 'reduce'
}

function times(v: number): string {
    return v >= 1 ? String(v) : '1/' + String(1 / v)
}

function asFrac(v: number) {
    return Dfrac(...ToFrac(v))
}

function brac(s: string) {
    return s
        .replaceAll('(', '\\left(')
        .replaceAll(')', '\\right)')
        .replaceAll('[', '\\left[')
        .replaceAll(']', '\\right]')
}

function transform(state: state, [t, v]: morph): state {
    let { a, b, m, n } = state
    switch (t) {
        case 'HT':
            a += m * v
            break
        case 'VT':
            b += v
            break
        case 'HR':
            m = -m
            break
        case 'VR':
            n = -n
            b = -b
            break
        case 'HS':
            m = m * v
            break
        case 'VS':
            n = n * v
            b = b * v
            break
    }
    return { a, b, m, n }
}

/**
 * Get the description of a transform.
 */
function action([t, v]: morph): string {
    switch (t) {
        case 'HT':
            return 'translate ' + Abs(v) + ' units ' + left(v)
        case 'VT':
            return 'translate ' + Abs(v) + ' units ' + up(v)
        case 'HR':
            return 'reflect about the $y$-axis'
        case 'VR':
            return 'reflect about the $x$-axis'
        case 'HS':
            v = 1 / v
            return large(v) + ' to ' + times(v) + ' times along the $x$-axis'
        case 'VS':
            return large(v) + ' to ' + times(v) + ' times along the $y$-axis'
    }
}

function printState(state: state): string {
    let { a, b, m, n } = state
    let A = a === 0 ? '' : '+' + asFrac(a)
    let B = b === 0 ? '' : '+' + asFrac(b)
    let M = m === 1 ? '' : m === -1 ? '-' : asFrac(m)
    let N = n === 1 ? '' : n === -1 ? '-' : asFrac(n)
    return `${N}\\operatorname f(${M}x${A})${B}`
}

function printIntermediate(state: state, [t, v]: morph): string | null {
    let { a, b, m, n } = state
    let pr = printState(state)
    let val = asFrac(v)
    switch (t) {
        case 'HT':
            if (a === 0 && m === 1) return null
            return pr.replace('x', `(x+${val})`)
        case 'VT':
            if (b === 0) return null
            return pr + '+' + val
        case 'HR':
            return null
        case 'VR':
            if (b === 0) return null
            return `-[${pr}]`
        case 'HS':
            if (m === 1) return null
            if (m === -1) return null
            return pr.replace('x', `(${val}x)`)
        case 'VS':
            if (b === 0 && n === 1) return null
            if (b === 0 && n === -1) return null
            return `${val}[${pr}]`
    }
}

function printStep(state: state, morph: morph): string {
    let step = printIntermediate(state, morph)
    let newState = transform(state, morph)
    let final = printState(newState)
    return step === null
        ? `y=${final}`
        : `\\begin{aligned}y&=${step}\\\\&=${final}\\end{aligned}`
}

/**
 * Transform a function.
 * ```
 * let f = x => x**2
 * TransformFunc(f,'HT',4) // x => (x+4)**2
 * ```
 */
export function TransformFunc(
    f: (x: number) => number,
    ...morphs: morph[]
): (x: number) => number {
    let state = { a: 0, b: 0, m: 1, n: 1 }
    for (let m of morphs) state = transform(state, m)
    let { a, b, m, n } = state
    return (x: number) => n * f(m * x + a) + b
}

/**
 * Explain a series of function transforms.
 * ```
 * let state = {a:0,b:0,m:1,n:1}
 * let func = (x:number)=>x**2
 * let transforms = [['HT',4],['VT',3]]
 * ExplainTransforms({state,func,transforms})
 * ```
 */
export function ExplainTransforms({
    state = { a: 0, b: 0, m: 1, n: 1 },
    func,
    transforms,
}: {
    state?: state
    func: (x: number) => number
    transforms: morph[]
}): {
    actions: string[]
    steps: string[]
    funcs: ((x: number) => number)[]
    latexs: string[]
    explain: string
    draw: { Q: (pen: PenCls) => void; S: (pen: PenCls) => void }
} {
    let s = { ...state }
    let f = (x: number) => func(x)
    let actions: string[] = ['']
    let steps: string[] = [`y=${brac(printState(state))}`]
    let funcs: ((x: number) => number)[] = [func]
    let latexs: string[] = [`y=${brac(printState(state))}`]

    for (let m of transforms) {
        actions.push(action(m))
        steps.push(brac(printStep(s, m)))
        s = transform(s, m)
        f = TransformFunc(f, m)
        latexs.push(`y=${brac(printState(s))}`)
        funcs.push(f)
    }

    let explain = ''
    for (let i = 0; i < actions.length; i++) {
        if (actions[i] !== '')
            explain += `\\textcolor{blue}{↓  \\text{${actions[i]}}} \\\\`
        explain += steps[i] + '\\\\'
    }

    function drawQ(pen: PenCls) {
        pen.set.weight(2)
        pen.plotDash(func)
        pen.plot(funcs.at(-1)!)
        pen.set.weight()
    }

    function drawS(pen: PenCls) {
        let intervals =
            [[1], [1, 0.3], [1, 0.5, 0.2], [1, 0.7, 0.4, 0.1]][
                actions.length - 1
            ] ?? []
        intervals.reverse()
        pen.set.weight(3)
        for (let i = 0; i < actions.length; i++) {
            pen.set.alpha(intervals[i] ?? 1)
            i === 0 ? pen.plotDash(funcs[i]) : pen.plot(funcs[i])
        }
        pen.set.alpha()
        pen.set.weight()
    }

    return {
        actions,
        steps,
        funcs,
        latexs,
        explain,
        draw: { Q: drawQ, S: drawS },
    }
}
