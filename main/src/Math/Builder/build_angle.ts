import _ from 'lodash'
import * as WRITE from './support/write.js'
import { PenCls } from '../../Pen/Pen.js'
import { BuildSolve } from './build_solve.js'

export function BuildAngle(
    variables: [
        sym: string,
        angle: [Point2D, Point2D, Point2D],
        mode?: 'normal' | 'polar' | 'reflex'
    ][],
    equations: [func: zeroFunction, latex: string, explain?: string][]
): {
    sol: string
    vars: string[]
    vals: number[]
    aim: string
    ans: quantity
    labeler: {
        ask: (_: PenCls) => void
        all: (_: PenCls) => void
        _SYMBOL: (_: PenCls) => void
    }
} {
    let {
        _INTERNAL: { allVars, givens, hiddens, aim, vGrp },
        sol,
        vars,
        vals,
        ans,
    } = BuildSolve(
        variables.map(([sym, angle, mode]) => [
            sym,
            'angle',
            parseRange(angle, mode),
        ]),
        equations,
        { solPlain: true, integer: true, sigfig: 3 }
    )

    function drawOne(pen: PenCls, v: string, type: 'symbol' | 'value') {
        let [sym, angle, mode] = variables.find($ => $[0] === v)!
        pen.set.angle(mode ?? 'normal')
        pen.angle(
            ...angle,
            type === 'symbol' ? WRITE.symbol(vGrp[v]) : WRITE.long(vGrp[v])
        )
        pen.set.angle()
    }

    function draw(pen: PenCls, symbolVars: string[], valueVars: string[]) {
        symbolVars.forEach(v => drawOne(pen, v, 'symbol'))
        valueVars.forEach(v => drawOne(pen, v, 'value'))

        // let drawVars = variables.filter($ => vars.includes($[0]))
        // for (let [sym, angle, mode] of drawVars) {
        //     let isGiven = givens.includes(sym)
        //     let varObj = vGrp[sym]
        //     let label = isGiven ? WRITE.long(varObj) : WRITE.symbol(varObj)
        //     pen.set.angle(mode ?? 'normal')
        //     pen.angle(...angle, label)
        //     pen.set.angle()
        // }
    }

    return {
        sol,
        vars,
        vals,
        aim,
        ans,
        labeler: {
            ask: (pen: PenCls) => draw(pen, [aim], givens),
            all: (pen: PenCls) => draw(pen, [aim, ...hiddens], givens),
            _SYMBOL: (pen: PenCls) => draw(pen, allVars, []),
        },
    }
}


function parseRange(
    angle: [Point2D, Point2D, Point2D],
    mode: 'normal' | 'polar' | 'reflex' = 'normal'
): [number, number] {
    let a = Angle(...angle)
    if (mode === 'polar') a = AnglePolar(...angle)
    if (mode === 'reflex') a = 360 - Angle(...angle)
    return [Math.max(0, a - 2), Math.min(a + 2, 360)]
}
