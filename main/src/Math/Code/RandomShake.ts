import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'
import { dice } from 'fate'
import _ from 'lodash'
import * as math from 'mathjs'
import * as schema from '../../Core/schema.js'
import { is } from 'valibot'

function shake<T>(
    anchor: T,
    shaker: (_: T) => T,
    ...coherentPred: ((_: T[]) => boolean)[]
) {
    let d = dice(() => shaker(anchor))
        .unique()
        .forbid(anchor)
    for (let co of coherentPred) {
        d = d.coherent(co)
    }
    return d.rolls(3)
}

@exposeAll()
@captureAll()
export class Host {
    /**
     * @deprecated
     * an array of n nearby values around anchor, within range inclusive, auto detecting the input type.
     * ```
     * RndShake(10)
     * // equivalent to RndShakeN(10)
     * RndShake(10.5)
     * // equivalent to RndShakeR(10.5)
     * ```
     */
    static RndShake(anchor: any): (typeof anchor)[] {
        if (typeof anchor === 'string') {
            // Inequal Sign
            if (is(schema.ineq, anchor)) {
                return RndShakeIneq(anchor)
            }
            // trig
            if (is(schema.trig, anchor)) {
                return RndShakeTrig(anchor)
            }
            // else convert to number
            if (Number(anchor)) {
                anchor = Number(anchor)
            }
        }
        if (is(schema.quantity, anchor)) {
            // quantity
            return RndShakeQuantity(anchor)
        }
        if (is(schema.point2D, anchor)) {
            // Point
            return RndShakePoint(anchor)
        }
        if (is(schema.combo, anchor)) {
            // Combo
            return RndShakeCombo(anchor)
        }
        if (is(schema.trigValue, anchor)) {
            // TrigValue
            return RndShakeTrigValue(anchor)
        }
        if (is(schema.constraint, anchor)) {
            // Constraint
            return RndShakeConstraint(anchor)
        }
        if (is(schema.constraints, anchor)) {
            // Constraints
            return RndShakeConstraints(anchor)
        }
        if (is(schema.compoundInequality, anchor)) {
            return RndShakeCompoundInequality(anchor)
        }
        if (typeof anchor === 'number' && Number.isFinite(anchor)) {
            anchor = cal.blur(anchor)
            if (Number.isInteger(anchor)) {
                return RndShakeN(anchor)
            }
            if (Number.isDecimal(anchor)) {
                return RndShakeR(anchor)
            }
            if (Number.isNaN(anchor)) {
                return []
            }
        }
        if (anchor === undefined) return []
        throw MathError('Fail to RndShake: ' + anchor)
    }

    /**
     * 3 nearby same-signed integers, range = Max(5, anchor * 10%)
     * ```
     * RndShakeN(5) // return 3 unique integers from 1-10
     * ```
     */
    static RndShakeN(anchor: number): number[] {
        return shake(anchor, ShakeN)
    }

    /**
     * 3 nearby same-signed real number with same precision, range = anchor * 50%
     * ```
     * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
     * ```
     */
    static RndShakeR(anchor: number): number[] {
        return shake(anchor, ShakeR)
    }

    /**
     * 3 nearby same-sign rational by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
     * ```
     * RndShakeQ(5/6)
     * // return 3 unique fractions around [5,6]
     * RndShakeQ(6/-5)
     * // return 3 unique fractions around [6,-5]
     * ```
     */
    static RndShakeQ(anchor: number): number[] {
        return shake(anchor, ShakeQ)
    }

    /**
     * 3 numbers by multiplying / dividing the `anchor` by the `base` a few times.
     * ```
     * RndShakeG(24,2) // any 3 of [6,12,48,96]
     * ```
     */
    static RndShakeG(anchor: number, base: number): number[] {
        return shake(anchor, a => ShakeG(a, base))
    }

    /**
     * an array of 3 ineq signs, balanced in number.
     * ```
     * RndShakeIneq('\\ge')
     * // may return ['\\ge','\\le','\\le']
     * ```
     */
    static RndShakeIneq(anchor: Ineq): Ineq[] {
        let me = INEQUAL.print(anchor)
        let flip = INEQUAL.print(INEQUAL.flip(anchor))
        return RndShuffle(me, flip, flip)
    }

    /**
     * an array of 3 point, both x and y are unique
     * ```
     * RndShakePoint([3,4])
     * // may return [[2,5],[1,6],[4,2]]
     * ```
     */
    static RndShakePoint(anchor: Point2D): Point2D[] {
        return dice(() => ShakePoint(anchor))
            .unique(([x, y]) => x)
            .unique(([x, y]) => y)
            .rolls(3)
    }

    /**
     * an array of 3 combo
     * ```
     * RndShakeCombo([true,true,true])
     * // may return [[true,false,true],[false,true,false],[false,true,true]]
     * ```
     */
    static RndShakeCombo(
        anchor: [boolean, boolean, boolean]
    ): [boolean, boolean, boolean][] {
        let [a, b, c] = anchor
        return RndShuffle([a, !b, !c], [!a, b, !c], [!a, !b, c])
    }

    /**
     * an array of 3 trig
     * ```
     * RndShakeTrig('sin')
     * // may return ['cos','sin','cos']
     * ```
     */
    static RndShakeTrig(anchor: TrigFunc): TrigFunc[] {
        return _.sampleSize<TrigFunc>(['sin', 'cos', 'tan'], 3)
    }

    /**
     * an array of 3 TrigValue
     * ```
     * RndShakeTrigValue(['sin','x'])
     * // may return [['cos','x'],['sin','x'],['cos','x']]
     * ```
     */
    static RndShakeTrigValue(anchor: TrigValue): TrigValue[] {
        return RndShakeTrig(anchor[0]).map(x => [x as TrigFunc, anchor[1]])
    }

    /**
     * an array of 3 ratios
     * ```
     * RndShakeRatio([4,5,6])
     * // may return [[3,6,5],[7,5,3],[8,4,5]]
     * ```
     */
    static RndShakeRatio(anchor: number[]): number[][] {
        return shake(anchor, ShakeRatio)
    }

    /**
     * an array of 3 number in given number system
     * ```
     * RndShakeBase('AB0CD_{16}')
     * // may return ['BB0CE_{16}','AB0DD_{16}','BA0BE_{16}']
     * ```
     */
    static RndShakeBase(anchor: string): string[] {
        return shake(anchor, ShakeBase)
    }

    /**
     * an array of 3 points, all are special in polar coordinates
     * ```
     * RndShakePointPolar([3,60])
     * // may return [[3, 120], [3*sqrt(2), 120], [3*sqrt(2), 60]]
     * ```
     */
    static RndShakePointPolar(anchor: Point2D): Point2D[] {
        let [r1, q1] = RectToPol(anchor)
        let [r2, q2] = RectToPol(ShakePointPolar(anchor))
        return RndShuffle<PolarPoint>([r1, q2], [r2, q1], [r2, q2]).map($ =>
            PolToRect($)
        )
    }

    /**
     * an array of 3 constraint, with only the sign shaken
     * ```
     * RndShakeConstraint([1,2,'>',3])
     * // may return [[1,2,'>',3], [1,2,'<',3], [1,2,'<',3]]
     * ```
     */
    static RndShakeConstraint(anchor: Constraint): Constraint[] {
        let flip = rein.flip(anchor)
        return RndShuffle(anchor, flip, flip)
    }

    /**
     * an array of 3 sets of constraints, with only the sign shaken
     * ```
     * RndShakeConstraints([
     *   [1,2,'>',3], [4,5,'>',6]
     * ])
     * // may return [
     * // [[1,2,'>',3],[4,5,'>',6]],
     * // [[1,2,'<',3],[4,5,'<',6]],
     * // [[1,2,'<',3],[4,5,'>',6]]
     * // ]
     * ```
     */
    static RndShakeConstraints(anchor: Constraint[]): Constraint[][] {
        return shake(anchor, ShakeConstraints)
    }

    static RndShakeQuantity(anchor: quantity): quantity[] {
        return shake(anchor, ShakeQuantity)
    }

    static RndShakeCompoundInequality(
        anchor: CompoundInequality
    ): CompoundInequality[] {
        return shake(anchor, ShakeCompoundInequality)
    }
}

declare global {
    var RndShake: typeof Host.RndShake
    var RndShakeN: typeof Host.RndShakeN
    var RndShakeR: typeof Host.RndShakeR
    var RndShakeQ: typeof Host.RndShakeQ
    var RndShakeG: typeof Host.RndShakeG
    var RndShakeIneq: typeof Host.RndShakeIneq
    var RndShakePoint: typeof Host.RndShakePoint
    var RndShakeCombo: typeof Host.RndShakeCombo
    var RndShakeTrig: typeof Host.RndShakeTrig
    var RndShakeTrigValue: typeof Host.RndShakeTrigValue
    var RndShakeRatio: typeof Host.RndShakeRatio
    var RndShakeBase: typeof Host.RndShakeBase
    var RndShakePointPolar: typeof Host.RndShakePointPolar
    var RndShakeConstraint: typeof Host.RndShakeConstraint
    var RndShakeConstraints: typeof Host.RndShakeConstraints
    var RndShakeQuantity: typeof Host.RndShakeQuantity
    var RndShakeCompoundInequality: typeof Host.RndShakeCompoundInequality
}
