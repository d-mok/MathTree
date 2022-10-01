import { combinations, getAllVars, getVars } from '../utils'
import _ from 'lodash'

function analyzeOnce(fs: zeroFunction[], givens: string[]): tree | undefined {
    const equs = fs.map(getVars)
    const vars = getAllVars(fs)

    // to store the order of each var
    // initialized with given vars = order 0
    let orderMap = Object.fromEntries(givens.map(v => [v, 0]))

    function trySolve(eq: string[]): boolean {
        let unsolved = eq.filter(v => !(v in orderMap))
        // eq is solvable only if exactly 1 var is unsolved
        if (unsolved.length !== 1) return false
        // solve eq (mocking)
        let v = unsolved[0]
        let maxOrder = Math.max(-1, ...Object.values(_.pick(orderMap, eq)))
        orderMap[v] = maxOrder + 1
        return true
    }

    function trySolveNext(): boolean {
        let nextEq = equs.find(eq => trySolve(eq))
        return nextEq !== undefined
    }

    //try until no eq can be solved
    while (trySolveNext()) {}

    // healthy if all vars are solved
    let isHealthy = _.size(orderMap) === vars.length

    return isHealthy ? orderMap : undefined
}

/**
 * Get all the healthy trees of this system generated from all possible 'given variables' combinations.
 */
export function analyze(fs: zeroFunction[]): tree[] {
    const vars = getAllVars(fs)
    const nGivens = vars.length - fs.length
    const arrGivens = combinations(vars, nGivens)
    const trees = arrGivens.map(c => analyzeOnce(fs, c))
    return _.compact(trees)
}
