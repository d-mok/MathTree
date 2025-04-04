import { dice } from 'fate';
import _ from 'lodash';
/**
 * Same-signed integer
 * ```
 * ShakeN(5) // integers from 2-8
 * ```
 */
export function ShakeN(anchor) {
    anchor = anchor.blur();
    if (anchor === 0)
        return RndN(1, 3);
    let a = Abs(anchor);
    let s = Sign(anchor);
    let range = Max(3, a * 0.1);
    let max = Min(Floor(a + range), Math.logCeil(a) - 1);
    let min = Max(Ceil(a - range), 1, Math.logFloor(a));
    let f = () => RndN(min, max) * s;
    return dice(f).forbid(anchor).roll();
}
/**
 * Same-signed real number with same precision
 * ```
 * ShakeR(3.5) // from [1.8,5.2]
 * ```
 */
export function ShakeR(anchor) {
    let exp = anchor.exponent();
    let m = anchor.mantissa().blur();
    if (IsInteger(m))
        return Number(ShakeN(m) + 'e' + exp);
    let dp = m.dp();
    let newM = dice(() => Fix(m * RndR(0.5, 1.5), dp))
        .preserve(Sign, m)
        .preserve($ => $.exponent(), m)
        .forbid(m)
        .roll();
    return Number(newM + 'e' + exp);
}
/**
 * Same-sign rational by shaking the numerator and denominator (simplest), preserve IsProbability.
 * ```
 * ShakeQ(5/6)  // return fraction around [5,6]
 * ShakeQ(6/-5) // return fraction around [6,-5]
 * ```
 */
export function ShakeQ(anchor) {
    if (Number.isInteger(anchor.blur()))
        return ShakeN(anchor);
    let [p, q] = ToFrac(anchor).map($ => $.blur());
    if (!IsInteger(p, q)) {
        throw new Error('ShakeQ: input should be integral fraction');
    }
    let f = () => {
        const h = ShakeN(p);
        const k = ShakeN(q);
        let a = RndR(0, 1) < 1 / Math.abs(p) ? p : h;
        let b = RndR(0, 1) < 1 / Math.abs(q) ? q : k;
        if (a === p && b === q)
            return [h, k];
        return Ratio(a, b);
    };
    let [a, b] = dice(f)
        .shield(([a, b]) => AreCoprime(a, b))
        .shield(([a, b]) => a !== 0)
        .shield(([a, b]) => b !== 0)
        .shield(([a, b]) => b !== 1)
        .shield(([a, b]) => IsProbability(p / q) ? IsProbability(a / b) : true)
        .shield(([a, b]) => a / b !== anchor)
        .roll();
    return a / b;
}
/**
 * Number by multiplying / dividing `anchor` by the `base` a few times.
 * ```
 * ShakeG(24,2) // any of [6,12,48,96]
 * ```
 */
export function ShakeG(anchor, base) {
    let i = RndPick(-2, -1, 1, 2);
    return anchor * base ** i;
}
/**
 * Ineq signs
 * ```
 * ShakeIneq('\\ge')  // may return '\\ge' or '\\le'
 * ```
 */
export function ShakeIneq(anchor) {
    let me = INEQUAL.print(anchor);
    let flip = INEQUAL.print(INEQUAL.flip(anchor));
    return RndPick(me, flip);
}
/**
 * Point
 * ```
 * ShakePoint([3,4])   // may return [[2,5],[1,6],[4,2]]
 * ```
 */
export function ShakePoint(anchor) {
    let [x, y] = anchor;
    let f = () => {
        const h = IsInteger(x) ? ShakeN(x) : ShakeR(x);
        const k = IsInteger(y) ? ShakeN(y) : ShakeR(y);
        return [h, k];
    };
    return dice(f).forbid(anchor).roll();
}
/**
 * TrigValue
 * ```
 * ShakeTrigValue(['sin','x'])
 * // may return [['cos','x'],['sin','x'],['cos','x']]
 * ```
 */
export function ShakeTrigValue(anchor) {
    let [func, val] = anchor;
    return [RndPick('sin', 'cos', 'tan'), val];
}
/**
 * Ratios
 * ```
 * ShakeRatio([4,5,6])
 * // may return [[3,6,5],[7,5,3],[8,4,5]]
 * ```
 */
export function ShakeRatio(anchor) {
    let a = Ratio(...anchor);
    let func = () => {
        return a.map(x => (RndR(0, 1) < 1 / (Math.abs(x) + 1) ? x : ShakeN(x)));
    };
    return dice(func)
        .shield(r => HCF(...r) === 1)
        .forbid(a)
        .roll();
}
/**
 * Number in given number system
 * ```
 * ShakeBase('AB0CD_{16}')
 * // may return ['BB0CE_{16}','AB0DD_{16}','BA0BE_{16}']
 * ```
 */
export function ShakeBase(anchor) {
    let [numStr, baseStr] = anchor
        .replaceAll('{', '')
        .replaceAll('}', '')
        .split('_');
    let base = Number(baseStr);
    let nums = numStr.split('').map($ => Number('0x' + $));
    function removeZero(ns) {
        let indices = _.range(0, ns.length).filter($ => ns[$] === 0);
        if (indices.length === 0)
            return;
        let i = indices.sample();
        _.pullAt(ns, [i]);
    }
    function insertZero(ns) {
        let indices = _.range(0, ns.length);
        let i = indices.sample();
        ns.splice(i, 0, 0);
    }
    function countNonZero(ns) {
        return ns.filter($ => $ !== 0).length;
    }
    function mutate(ns) {
        let arr = [];
        for (let d of ns) {
            if (d === 0) {
                arr.push(RndT(0.1) ? RndN(0, base - 1) : 0);
            }
            else {
                arr.push(RndT(0.5) ? d + RndU() : d);
            }
        }
        if (RndT(0.3))
            removeZero(arr);
        if (RndT(0.3))
            removeZero(arr);
        if (RndT(0.3))
            insertZero(arr);
        if (RndT(0.3))
            insertZero(arr);
        return arr.map($ => _.clamp($, 0, base - 1));
    }
    let newNums = dice(() => mutate(nums))
        .forbid(nums)
        .preserve(countNonZero, nums)
        .shield($ => $.some(_ => _ > 0)) // not empty
        .shield($ => $[0] !== 0) // not start with 0
        .roll();
    let newNumStr = newNums
        .map($ => $.toString(16).toUpperCase())
        .map($ => '{' + $ + '}')
        .join('');
    return newNumStr + '_{' + base + '}';
}
/**
 * Points, all are special in polar coordinates
 * ```
 * ShakePointPolar([3,60])
 * // may return [[3, 120], [3*sqrt(2), 120], [3*sqrt(2), 60]]
 * ```
 */
export function ShakePointPolar(anchor) {
    let [r1, q1] = RectToPol(anchor);
    let [a, b] = cal.toSurd(r1);
    let r2 = b === 1 ? a * Math.sqrt(RndPick(2, 3)) : a;
    let angles = [
        30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330,
    ].filter($ => $ !== q1);
    let q2 = RndPick(...angles);
    return PolToRect([r2, q2]);
}
/**
 * Constraint, with only the sign shaken.
 * ```
 * ShakeConstraint([1,2,'>',3])
 * // may return [1,2,'>',3] or [1,2,'<',3]
 * ```
 */
export function ShakeConstraint(anchor) {
    let flip = rein.flip(anchor);
    return RndPick(anchor, flip);
}
/**
 * Sets of constraints, with only the sign shaken.
 * ```
 * ShakeConstraints([
 *   [1,2,'>',3], [4,5,'>',6]
 * ])
 * // may return
 * // [[1,2,'>',3],[4,5,'>',6]] or
 * // [[1,2,'<',3],[4,5,'<',6]] or
 * // [[1,2,'<',3],[4,5,'>',6]]
 * ```
 */
export function ShakeConstraints(anchor) {
    let func = () => anchor.map($ => ShakeConstraint($));
    return dice(func)
        .forbid(anchor)
        .shield($ => reins.isConsistent($))
        .roll();
}
export function ShakeQuantity(anchor) {
    let { val, unit } = anchor;
    return { val: ShakeR(val), unit };
}
export function ShakeCompoundInequality(anchor) {
    let [connective, s1, n1, s2, n2, x] = anchor;
    let r1 = INEQUAL.flip(s1);
    let r2 = INEQUAL.flip(s2);
    let f = () => RndPick(['AND', s1, n1, s2, n2, x], ['AND', r1, n1, s2, n2, x], ['AND', s1, n1, r2, n2, x], ['AND', r1, n1, r2, n2, x], ['OR', s1, n1, s2, n2, x], ['OR', r1, n1, s2, n2, x], ['OR', s1, n1, r2, n2, x], ['OR', r1, n1, r2, n2, x]);
    return dice(f).forbid(anchor).roll();
}
