import * as INEQUAL from './inequal';
export function solveCompoundInequality(sign1, num1, sign2, num2, connective) {
    function buildInequality(sign, num) {
        return (x) => INEQUAL.compare(x, sign, num);
    }
    let ineq1 = buildInequality(sign1, num1);
    let ineq2 = buildInequality(sign2, num2);
    let ineq = connective === 'AND'
        ? (x) => ineq1(x) && ineq2(x)
        : (x) => ineq1(x) || ineq2(x);
    let small = Math.min(num1, num2);
    let large = Math.max(num1, num2);
    return [ineq(small - 1), ineq((small + large) / 2), ineq(large + 1)];
}
//# sourceMappingURL=inequality.js.map