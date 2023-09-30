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
    equations: [func: zeroFunction, latex: string][]
): {
    sol: string
    vars: string[]
    vals: number[]
    target: string
    ans: quantity
    labelAngle: (_: PenCls) => {
        all: () => void
        plain: () => void
    }
} {
    let { _INTERNAL, sol, vars, vals, ans } = BuildSolve(
        variables.map(([sym, angle, mode]) => [
            sym,
            'angle',
            parseRange(angle, mode),
        ]),
        equations,
        { solPlain: true, integer: true, sigfig: 3 }
    )

    function labelAngle(pen: PenCls) {
        function draw(vars: string[]) {
            let drawVars = variables.filter($ => vars.includes($[0]))
            for (let [sym, angle, mode] of drawVars) {
                let isGiven = _INTERNAL.givens.includes(sym)
                let varObj = _INTERNAL.vGrp[sym]
                let label = isGiven ? WRITE.long(varObj) : WRITE.symbol(varObj)
                pen.set.angle(mode ?? 'normal')
                pen.angle(...angle, label)
                pen.set.angle()
            }
        }
        return {
            all: () => draw(_INTERNAL.vars),
            plain: () => draw([_INTERNAL.unknown, ..._INTERNAL.givens]),
        }
    }

    return {
        sol,
        vars,
        vals,
        target: _INTERNAL.unknown,
        ans,
        labelAngle,
    }
}

function parseRange(
    angle: [Point2D, Point2D, Point2D],
    mode: 'normal' | 'polar' | 'reflex' = 'normal'
): [number, number] {
    let a = 0
    if (mode === 'polar') {
        a = AnglePolar(...angle)
    } else if (mode === 'reflex') {
        a = 360 - Angle(...angle)
    } else {
        a = Angle(...angle)
    }

    return [Math.max(0, a - 2), Math.min(a + 2, 360)]
}
