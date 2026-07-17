import { combinations, getAllVars, getVars } from '../utils.js'
import _ from 'lodash'

type TREE = Record<
    string,
    {
        variable: string
        order: number
        isGiven: boolean
        solvedBy: zeroFunction | null
        deps: string[]
        isTop: boolean
    }
>

function analyzeOnce(fs: zeroFunction[], givens: string[]): TREE | undefined {
    const vars = getAllVars(fs)

    // to store the order of each var
    // initialized with given vars = order 0
    let TREE: TREE = Object.fromEntries(
        givens.map(v => [
            v,
            {
                variable: v,
                order: 0,
                isGiven: true,
                solvedBy: null,
                deps: [],
                isTop: false,
            },
        ])
    )

    function getDeps(f: zeroFunction, solvedVar: string): string[] {
        let otherVars = _.without(getVars(f), solvedVar)
        return _.uniq([
            ...otherVars,
            ..._(TREE).pick(otherVars).map('deps').value().flat(),
        ])
    }

    function getNextOrder(f: zeroFunction): number {
        let realOrders = _(TREE).pick(getVars(f)).map('order').value()
        return Math.max(-1, ...realOrders) + 1
    }

    function trySolve(f: zeroFunction): boolean {
        let unsolved = getVars(f).filter(v => !(v in TREE))
        // eq is solvable only if exactly 1 var is unsolved
        if (unsolved.length !== 1) return false
        // solve eq (mocking)
        let v = unsolved[0]
        TREE[v] = {
            variable: v,
            order: getNextOrder(f),
            isGiven: false,
            solvedBy: f,
            deps: getDeps(f, v),
            isTop: getDeps(f, v).length === vars.length - 1,
        }
        return true
    }

    function trySolveNext(): boolean {
        let nextF = fs.find(f => trySolve(f))
        return nextF !== undefined
    }

    //try until no eq can be solved
    while (trySolveNext()) {}

    // healthy if all vars are solved and at least 1 top var
    let isHealthy = _.size(TREE) === vars.length && _(TREE).map('isTop').some()

    return isHealthy ? TREE : undefined
}

/**
 * Get all the healthy trees of this system generated from all possible 'given variables' combinations.
 */
export function analyze(fs: zeroFunction[]): TREE[] {
    const vars = getAllVars(fs)
    const nGivens = vars.length - fs.length
    const arrGivens = combinations(vars, nGivens)
    const trees = arrGivens.map(c => analyzeOnce(fs, c))
    return _.compact(trees)
}
