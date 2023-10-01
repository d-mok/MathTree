import _ from 'lodash'
import * as WRITE from './support/write'
import { PenCls } from '../../Pen/Pen'
import { BuildSolve } from './build_solve'

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
        all: (_: PenCls) => void
        ask: (_: PenCls) => void
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

    function draw(pen: PenCls, vars: string[]) {
        let drawVars = variables.filter($ => vars.includes($[0]))
        for (let [sym, angle, mode] of drawVars) {
            let isGiven = givens.includes(sym)
            let varObj = vGrp[sym]
            let label = isGiven ? WRITE.long(varObj) : WRITE.symbol(varObj)
            pen.set.angle(mode ?? 'normal')
            pen.angle(...angle, label)
            pen.set.angle()
        }
    }

    return {
        sol,
        vars,
        vals,
        aim,
        ans,
        labeler: {
            all: (pen: PenCls) => draw(pen, allVars),
            ask: (pen: PenCls) => draw(pen, [aim, ...givens]),
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
