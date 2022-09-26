import * as INEQUAL from './inequal'

type Ineq = INEQUAL.Ineq

export function solveCompoundInequality(
    sign1: Ineq,
    num1: number,
    sign2: Ineq,
    num2: number,
    connective: 'AND' | 'OR'
): [left: boolean, mid: boolean, right: boolean] {
    function buildInequality(sign: Ineq, num: number): (x: number) => boolean {
        return (x: number) => INEQUAL.compare(x, sign, num)
    }

    let ineq1 = buildInequality(sign1, num1)
    let ineq2 = buildInequality(sign2, num2)
    let ineq =
        connective === 'AND'
            ? (x: number) => ineq1(x) && ineq2(x)
            : (x: number) => ineq1(x) || ineq2(x)

    let small = Math.min(num1, num2)
    let large = Math.max(num1, num2)
    return [ineq(small - 1), ineq((small + large) / 2), ineq(large + 1)]
}
