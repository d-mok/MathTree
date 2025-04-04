import { fit } from 'gauss';
import _ from 'lodash';
export function fitFree(fs, varGrp) {
    let rangeObj = _.mapValues(varGrp, 'range');
    let valObj = _.mapValues(varGrp, 'val');
    let vals = fit(fs, rangeObj, valObj);
    for (let v in varGrp)
        varGrp[v].val = vals[v];
}
export function fitAgain(fs, varGrp, reFitVars) {
    const fraction = 0.05;
    reFitVars.forEach($ => {
        // clear val
        varGrp[$].val = NaN;
        // widen range
        let [min, max] = varGrp[$].range;
        varGrp[$].range = [
            min - Math.abs(min * fraction),
            max + Math.abs(max * fraction),
        ];
    });
    fitFree(fs, varGrp);
}
export function readTree(tree) {
    let vars = _.keys(tree);
    let givens = _(tree).pickBy('isGiven').keys().value();
    let top = _.findKey(tree, 'isTop');
    let hiddens = _.difference(vars, givens);
    return {
        vars,
        givens,
        top,
        hiddens,
    };
}
