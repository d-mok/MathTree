import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'

// types

type morph = [action: 'HT' | 'VT' | 'HR' | 'VR' | 'HS' | 'VS', val: number]

type state = { a: number; b: number; m: number; n: number }
// nf(mx+a)+b

function left(v: number) {
    return v > 0 ? 'leftwards' : 'rightwards'
}

function up(v: number) {
    return v > 0 ? 'upwards' : 'downwards'
}

function large(v: number) {
    return v >= 1 ? 'enlarged' : 'reduced'
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
function description([t, v]: morph): string {
    switch (t) {
        case 'HT':
            return 'translated ' + Abs(v) + ' units ' + left(v)
        case 'VT':
            return 'translated ' + Abs(v) + ' units ' + up(v)
        case 'HR':
            return 'reflected about the y-axis'
        case 'VR':
            return 'reflected about the x-axis'
        case 'HS':
            v = 1 / v
            return large(v) + ' to ' + times(v) + ' times along the x-axis'
        case 'VS':
            return large(v) + ' to ' + times(v) + ' times along the y-axis'
    }
}

function printState(state: state): string {
    let { a, b, m, n } = state
    let A = a === 0 ? '' : '+' + asFrac(a)
    let B = b === 0 ? '' : '+' + asFrac(b)
    let M = m === 1 ? '' : asFrac(m)
    let N = n === 1 ? '' : asFrac(n)
    return `${N}f(${M}x${A})${B}`
}

/**
 * Print the intermediate step.
 */
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

@exposeAll()
@captureAll()
export class Host {
    /**
     * Explain a series of function transforms.
     * ```
     * let initialState = {a:0,b:0,m:1,n:1}
     * let transforms = [['HT',4],['VT',3]]
     * explainTransforms(initialState,...transforms)
     * ```
     */
    static explainTransforms(
        initialState: state,
        ...morphs: morph[]
    ): {
        descriptions: string[]
        steps: string[]
        finalState: state
    } {
        let state = initialState
        let descriptions: string[] = []
        let steps: string[] = []

        for (let m of morphs) {
            descriptions.push(description(m))
            steps.push(brac(printStep(state, m)))
            state = transform(state, m)
        }
        return { descriptions, steps, finalState: state }
    }
}

declare global {
    var explainTransforms: typeof Host.explainTransforms
}
