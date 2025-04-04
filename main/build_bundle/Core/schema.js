import * as v from 'valibot';
export { string, boolean, array, tuple, object, is } from 'valibot';
export function be(schema) {
    return (_) => v.is(schema, _);
}
export const num = v.pipe(v.number(), v.custom(Number.isFinite));
// special text
export const ineq = v.union([
    v.literal('>'),
    v.literal('<'),
    v.literal('>='),
    v.literal('<='),
    v.literal('\\gt'),
    v.literal('\\lt'),
    v.literal('\\ge'),
    v.literal('\\le'),
    v.strictTuple([v.boolean(), v.boolean()]),
]);
export const constraint = v.strictTuple([num, num, ineq, num]);
export const constraints = v.array(constraint);
export const trig = v.union([
    v.literal('sin'),
    v.literal('cos'),
    v.literal('tan'),
]);
export const base = v.pipe(v.string(), v.check($ => $.match(/[\{\}0-9A-Z]+\_\{[0-9]+\}/g) !== null));
// Math Types
export const combo = v.strictTuple([v.boolean(), v.boolean(), v.boolean()]);
export const ntuple = v.array(num);
export const point2D = v.strictTuple([num, num]);
export const point3D = v.strictTuple([num, num, num]);
export const monomial = v.object({ coeff: num });
export const polynomial = v.array(monomial);
export const compoundInequality = v.strictTuple([
    v.union([v.literal('AND'), v.literal('OR')]),
    ineq,
    num,
    ineq,
    num,
    v.string(),
]);
export const trigValue = v.strictTuple([trig, v.union([num, v.string()])]);
export const trigExp = v.strictTuple([
    trig,
    num,
    v.union([v.literal(1), v.literal(-1)]),
    v.string(),
]);
export const quantity = v.object({ val: num, unit: v.string() });
// testing
function xxx(_) {
    return v.is(quantity, _);
}
