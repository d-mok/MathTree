import * as WRITE from './support/write.js';
import { BuildSolve } from './build_solve.js';
export function BuildAngle(variables, equations) {
    let { _INTERNAL: { allVars, givens, hiddens, aim, vGrp }, sol, vars, vals, ans, } = BuildSolve(variables.map(([sym, angle, mode]) => [
        sym,
        'angle',
        parseRange(angle, mode),
    ]), equations, { solPlain: true, integer: true, sigfig: 3 });
    function drawOne(pen, v, type) {
        let [sym, angle, mode] = variables.find($ => $[0] === v);
        pen.set.angle(mode ?? 'normal');
        pen.angle(...angle, type === 'symbol' ? WRITE.symbol(vGrp[v]) : WRITE.long(vGrp[v]));
        pen.set.angle();
    }
    function draw(pen, symbolVars, valueVars) {
        symbolVars.forEach(v => drawOne(pen, v, 'symbol'));
        valueVars.forEach(v => drawOne(pen, v, 'value'));
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
            ask: (pen) => draw(pen, [aim], givens),
            all: (pen) => draw(pen, [aim, ...hiddens], givens),
            _SYMBOL: (pen) => draw(pen, allVars, []),
        },
    };
}
function parseRange(angle, mode = 'normal') {
    let a = Angle(...angle);
    if (mode === 'polar')
        a = AnglePolar(...angle);
    if (mode === 'reflex')
        a = 360 - Angle(...angle);
    return [Math.max(0, a - 2), Math.min(a + 2, 360)];
}
