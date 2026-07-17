import { combinations, getAllVars, getVars } from '../utils';
import _ from 'lodash';
function analyzeOnce(fs, givens) {
    const vars = getAllVars(fs);
    // to store the order of each var
    // initialized with given vars = order 0
    let TREE = Object.fromEntries(givens.map(v => [
        v,
        {
            variable: v,
            order: 0,
            isGiven: true,
            solvedBy: null,
            deps: [],
            isTop: false,
        },
    ]));
    function getDeps(f, solvedVar) {
        let otherVars = _.without(getVars(f), solvedVar);
        return _.uniq([
            ...otherVars,
            ..._(TREE).pick(otherVars).map('deps').value().flat(),
        ]);
    }
    function getNextOrder(f) {
        let realOrders = _(TREE).pick(getVars(f)).map('order').value();
        return Math.max(-1, ...realOrders) + 1;
    }
    function trySolve(f) {
        let unsolved = getVars(f).filter(v => !(v in TREE));
        // eq is solvable only if exactly 1 var is unsolved
        if (unsolved.length !== 1)
            return false;
        // solve eq (mocking)
        let v = unsolved[0];
        TREE[v] = {
            variable: v,
            order: getNextOrder(f),
            isGiven: false,
            solvedBy: f,
            deps: getDeps(f, v),
            isTop: getDeps(f, v).length === vars.length - 1,
        };
        return true;
    }
    function trySolveNext() {
        let nextF = fs.find(f => trySolve(f));
        return nextF !== undefined;
    }
    //try until no eq can be solved
    while (trySolveNext()) { }
    // healthy if all vars are solved and at least 1 top var
    let isHealthy = _.size(TREE) === vars.length && _(TREE).map('isTop').some();
    return isHealthy ? TREE : undefined;
}
/**
 * Get all the healthy trees of this system generated from all possible 'given variables' combinations.
 */
export function analyze2(fs) {
    const vars = getAllVars(fs);
    const nGivens = vars.length - fs.length;
    const arrGivens = combinations(vars, nGivens);
    const trees = arrGivens.map(c => analyzeOnce(fs, c));
    return _.compact(trees);
}
/**
 * Get all the healthy trees of this system generated from all possible 'given variables' combinations.
 */
export function analyze(fs) {
    return analyze2(fs).map(t => _.mapValues(t, 'order'));
}
//# sourceMappingURL=analyze.js.map