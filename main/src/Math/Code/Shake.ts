import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'
import { poker, dice } from 'fate'
import _ from 'lodash'
import * as math from 'mathjs'

@exposeAll()
@captureAll()
export class Host {
    /**
     * Same-signed integer
     * ```
     * shakeN(5) // integers from 2-8
     * ```
     */
    @checkIt(owl.int)
    static shakeN(anchor: number): number {
        anchor = _.blur(anchor)
        if (anchor === 0) return RndN(1, 3)

        let a = Abs(anchor)
        let s = Sign(anchor)

        let range = Max(3, a * 0.1)
        let max = Min(Floor(a + range), cal.logCeil(a) - 1)
        let min = Max(Ceil(a - range), 1, cal.logFloor(a))
        let f = () => RndN(min, max) * s

        return dice(f).forbid(anchor).roll()
    }

    /**
     * Same-signed real number with same precision
     * ```
     * shakeR(3.5) // from [1.8,5.2]
     * ```
     */
    @checkIt(owl.num)
    static shakeR(anchor: number): number {
        let exp = cal.e(anchor)
        let m = _.blur(cal.mantissa(anchor))
        if (IsInteger(m)) return Number(shakeN(m) + 'e' + exp)
        let dp = cal.dp(m)
        let newM = dice(() => Fix(m * RndR(0.5, 1.5), dp))
            .preserve(Sign, m)
            .preserve(cal.e, m)
            .forbid(m)
            .roll()
        return Number(newM + 'e' + exp)
    }

    /**
     * Same-sign rational by shaking the numerator and denominator (simplest), preserve IsProbability.
     * ```
     * shakeQ(5/6)  // return fraction around [5,6]
     * shakeQ(6/-5) // return fraction around [6,-5]
     * ```
     */
    @checkIt(owl.rational)
    static shakeQ(anchor: number): number {
        if (owl.int(anchor)) return shakeN(anchor)
        let [p, q] = ToFrac(anchor).map(_.blur)
        Should(IsInteger(p, q), 'input should be integral fraction')

        let f = () => {
            const h = shakeN(p)
            const k = shakeN(q)
            let a = RndR(0, 1) < 1 / Math.abs(p) ? p : h
            let b = RndR(0, 1) < 1 / Math.abs(q) ? q : k
            if (a === p && b === q) return [h, k]
            return Ratio(a, b)
        }
        let [a, b] = dice(f)
            .shield(([a, b]) => AreCoprime(a, b))
            .shield(([a, b]) => a !== 0)
            .shield(([a, b]) => b !== 0)
            .shield(([a, b]) => b !== 1)
            .shield(([a, b]) =>
                IsProbability(p / q) ? IsProbability(a / b) : true
            )
            .shield(([a, b]) => a / b !== anchor)
            .roll()
        return a / b
    }

    /**
     * Number by multiplying / dividing `anchor` by the `base` a few times.
     * ```
     * shakeG(24,2) // any of [6,12,48,96]
     * ```
     */
    @checkIt(owl.num)
    static shakeG(anchor: number, base: number): number {
        let i = RndPick(-2, -1, 1, 2)
        return anchor * base ** i
    }

    /**
     * Ineq signs
     * ```
     * shakeIneq('\\ge')  // may return '\\ge' or '\\le'
     * ```
     */
    @checkIt(owl.ineq)
    static shakeIneq(anchor: Ineq): Ineq {
        let me = INEQUAL.print(anchor)
        let flip = INEQUAL.print(INEQUAL.flip(anchor))
        return RndPick(me, flip)
    }

    /**
     * Point
     * ```
     * shakePoint([3,4])   // may return [[2,5],[1,6],[4,2]]
     * ```
     */
    @checkIt(owl.point2D)
    static shakePoint(anchor: Point2D): Point2D {
        let [x, y] = anchor
        let f = (): Point2D => {
            const h = IsInteger(x) ? shakeN(x) : shakeR(x)
            const k = IsInteger(y) ? shakeN(y) : shakeR(y)
            return [h, k]
        }
        return dice(f).forbid(anchor).roll()
    }

    /**
     * TrigValue
     * ```
     * shakeTrigValue(['sin','x'])
     * // may return [['cos','x'],['sin','x'],['cos','x']]
     * ```
     */
    @checkIt(owl.trigValue)
    static shakeTrigValue(anchor: TrigValue): TrigValue {
        let [func, val] = anchor
        return [RndPick<TrigFunc>('sin', 'cos', 'tan'), val]
    }

    /**
     * Ratios
     * ```
     * shakeRatio([4,5,6])
     * // may return [[3,6,5],[7,5,3],[8,4,5]]
     * ```
     */
    @checkIt(owl.ntuple)
    static shakeRatio(anchor: number[]): number[] {
        let a = Ratio(...anchor)
        let func = (): number[] => {
            return a.map(x =>
                RndR(0, 1) < 1 / (Math.abs(x) + 1) ? x : shakeN(x)
            )
        }
        return dice(func)
            .shield(r => HCF(...r) === 1)
            .forbid(a)
            .roll()
    }

    /**
     * Number in given number system
     * ```
     * shakeBase('AB0CD_{16}')
     * // may return ['BB0CE_{16}','AB0DD_{16}','BA0BE_{16}']
     * ```
     */
    @checkIt(owl.base)
    static shakeBase(anchor: string): string {
        let [numStr, baseStr] = anchor
            .replaceAll('{', '')
            .replaceAll('}', '')
            .split('_')
        let base = Number(baseStr)
        let nums = numStr.split('').map($ => Number('0x' + $))

        function removeZero(ns: number[]): void {
            let indices = _.range(0, ns.length).filter($ => ns[$] === 0)
            if (indices.length === 0) return
            let i = _.sample(indices)!
            _.pullAt(ns, [i])
        }

        function insertZero(ns: number[]): void {
            let indices = _.range(0, ns.length)
            let i = _.sample(indices)!
            ns.splice(i, 0, 0)
        }

        function countNonZero(ns: number[]): number {
            return ns.filter($ => $ !== 0).length
        }

        function mutate(ns: number[]): number[] {
            let arr: number[] = []
            for (let d of ns) {
                if (d === 0) {
                    arr.push(RndT(0.1) ? RndN(0, base - 1) : 0)
                } else {
                    arr.push(RndT(0.5) ? d + RndU() : d)
                }
            }
            if (RndT(0.3)) removeZero(arr)
            if (RndT(0.3)) removeZero(arr)
            if (RndT(0.3)) insertZero(arr)
            if (RndT(0.3)) insertZero(arr)
            return arr.map($ => _.clamp($, 0, base - 1))
        }

        let newNums = dice(() => mutate(nums))
            .forbid(nums)
            .preserve(countNonZero, nums)
            .shield($ => $.some(_ => _ > 0)) // not empty
            .shield($ => $[0] !== 0) // not start with 0
            .roll()

        let newNumStr = newNums
            .map($ => $.toString(16).toUpperCase())
            .map($ => '{' + $ + '}')
            .join('')
        return newNumStr + '_{' + base + '}'
    }

    /**
     * Points, all are special in polar coordinates
     * ```
     * shakePointPolar([3,60])
     * // may return [[3, 120], [3*sqrt(2), 120], [3*sqrt(2), 60]]
     * ```
     */
    @checkIt(owl.point2D)
    static shakePointPolar(anchor: Point2D): Point2D {
        let [r1, q1] = RectToPol(anchor)
        let [a, b] = cal.toSurd(r1)
        let r2 = b === 1 ? a * Math.sqrt(RndPick(2, 3)) : a
        let angles = [
            30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330,
        ].filter($ => $ !== q1)
        let q2 = RndPick(...angles)
        return PolToRect([r2, q2])
    }

    /**
     * Constraint, with only the sign shaken.
     * ```
     * shakeConstraint([1,2,'>',3])
     * // may return [1,2,'>',3] or [1,2,'<',3]
     * ```
     */
    @checkIt(owl.constraint)
    static shakeConstraint(anchor: Constraint): Constraint {
        let flip = rein(anchor).flip().constraint
        return RndPick(anchor, flip)
    }

    /**
     * Sets of constraints, with only the sign shaken.
     * ```
     * shakeConstraints([
     *   [1,2,'>',3], [4,5,'>',6]
     * ])
     * // may return
     * // [[1,2,'>',3],[4,5,'>',6]] or
     * // [[1,2,'<',3],[4,5,'<',6]] or
     * // [[1,2,'<',3],[4,5,'>',6]]
     * ```
     */
    @checkIt(owl.constraints)
    static shakeConstraints(anchor: Constraint[]): Constraint[] {
        let func = () => [
            ...toReins(anchor)
                .shake()
                .map($ => $.constraint),
        ]
        return dice(func)
            .forbid(anchor)
            .shield($ => toReins($).isConsistent())
            .roll()
    }

    @checkIt(owl.quantity)
    static shakeQuantity(anchor: quantity): quantity {
        let { val, unit } = anchor
        return { val: shakeR(val), unit }
    }

    @checkIt(owl.compoundInequality)
    static shakeCompoundInequality(
        anchor: CompoundInequality
    ): CompoundInequality {
        let [connective, s1, n1, s2, n2, x] = anchor
        let r1 = INEQUAL.flip(s1)
        let r2 = INEQUAL.flip(s2)
        let f = (): CompoundInequality =>
            RndPick(
                ['AND', s1, n1, s2, n2, x],
                ['AND', r1, n1, s2, n2, x],
                ['AND', s1, n1, r2, n2, x],
                ['AND', r1, n1, r2, n2, x],
                ['OR', s1, n1, s2, n2, x],
                ['OR', r1, n1, s2, n2, x],
                ['OR', s1, n1, r2, n2, x],
                ['OR', r1, n1, r2, n2, x]
            )
        return dice(f).forbid(anchor).roll()
    }
}

declare global {
    // var shake: typeof Host.shake
    var shakeN: typeof Host.shakeN
    var shakeR: typeof Host.shakeR
    var shakeQ: typeof Host.shakeQ
    var shakeG: typeof Host.shakeG
    var shakeIneq: typeof Host.shakeIneq
    var shakePoint: typeof Host.shakePoint
    // var shakeCombo: typeof Host.shakeCombo
    // var shakeTrig: typeof Host.shakeTrig
    var shakeTrigValue: typeof Host.shakeTrigValue
    var shakeRatio: typeof Host.shakeRatio
    var shakeBase: typeof Host.shakeBase
    var shakePointPolar: typeof Host.shakePointPolar
    var shakeConstraint: typeof Host.shakeConstraint
    var shakeConstraints: typeof Host.shakeConstraints
    var shakeQuantity: typeof Host.shakeQuantity
    var shakeCompoundInequality: typeof Host.shakeCompoundInequality
}