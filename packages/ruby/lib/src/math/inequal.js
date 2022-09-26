/**
 * Check if me is > or >=.
 */
export function greaterThan(ineq) {
    if (typeof ineq === 'string') {
        return ineq.includes('>') || ineq.includes('g');
    }
    else {
        return ineq[0];
    }
}
/**
 * Check if me allow equal.
 */
export function canEqual(ineq) {
    if (typeof ineq === 'string') {
        return ineq.includes('=') || ineq.includes('e');
    }
    else {
        return ineq[1];
    }
}
/**
 * Return me, as string.
 */
export function print(ineq) {
    let g = greaterThan(ineq);
    let e = canEqual(ineq);
    return `\\${g ? 'g' : 'l'}${e ? 'e' : 't'}`;
}
/**
 * Return the strict version of me, as `Ineq`.
 */
export function strict(ineq) {
    return [greaterThan(ineq), false];
}
/**
 * Return the loose version of me, as `Ineq`.
 */
export function loose(ineq) {
    return [greaterThan(ineq), true];
}
/**
 * Return the flip version of me, as `Ineq`.
 */
export function flip(ineq) {
    return [!greaterThan(ineq), canEqual(ineq)];
}
/**
 * Check if `a` and `b` satisfy my comparison.
 */
export function compare(a, ineq, b) {
    let g = greaterThan(ineq);
    let e = canEqual(ineq);
    if (g && e)
        return a >= b;
    if (g && !e)
        return a > b;
    if (!g && e)
        return a <= b;
    if (!g && !e)
        return a < b;
    throw 'never, cannot recognise code!';
}
//# sourceMappingURL=inequal.js.map