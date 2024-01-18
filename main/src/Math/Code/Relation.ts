import { checkIt, inspectIt, captureAll, exposeAll, check } from 'contract'
import _ from 'lodash'
import * as math from 'mathjs'

@exposeAll()
@captureAll()
export class Host {
    /**
     * Check if the numbers are all distinct.
     * ```
     * AreDistinct(1,2,3) // true
     * AreDistinct(1,2,2) // false
     * ```
     */
    @checkIt(owl.num)
    static AreDistinct(...nums: number[]): boolean {
        nums = nums.map(cal.blur)
        return new Set(nums).size === nums.length
    }

    /**
     * Check if the absolute values of the numbers are all distinct.
     * ```
     * AreAbsDistinct(1,2,3) // true
     * AreAbsDistinct(1,2,2) // false
     * AreAbsDistinct(1,2,-2) // false
     * ```
     */
    @checkIt(owl.num)
    static AreAbsDistinct(...nums: number[]): boolean {
        return AreDistinct(...nums.map(Math.abs))
    }

    /**
     * Check if the numbers all have the same sign.
     * ```
     * AreSameSign(1,2,3) // true
     * AreSameSign(1,2,-3) // false
     * AreSameSign(1,2,0) // false
     * ```
     */
    @checkIt(owl.num)
    static AreSameSign(...nums: number[]): boolean {
        return [...new Set(nums.map(Math.sign))].length === 1
    }

    /**
     * Check if the numbers all pairwise coprime.
     * ```
     * AreCoprime(2,3) // true
     * AreCoprime(2,6) // false
     * AreCoprime(1,2) // true
     * AreCoprime(2,3,6) // true
     * AreCoprime(1.5,3) // true
     * AreCoprime(0,3) // true
     * ```
     */
    @checkIt(owl.num)
    static AreCoprime(...nums: number[]): boolean {
        if (nums[0] === 9999) throw 'this is error 9999!'
        if (nums[0] === 9998)
            throw Error('this is error 9998!', { cause: 'the cause!' })
        nums = nums.map(cal.blur)
        if (!IsInteger(...nums)) return true
        if (!IsNonZero(...nums)) return true
        return nums.combinations(2).every(([a, b]) => HCF(a, b) === 1)
    }

    /**
     * Check if the points are pairwise distant apart.
     * ```
     * AreDistantPoint(2)([0,0],[3,0]) // true
     * AreDistantPoint(2)([0,0],[1,0]) // false
     * ```
     */
    @checkIt(owl.positive)
    static AreDistantPoint(distance: number) {
        let AreDistant = function (...points: Point2D[]): boolean {
            return _.combinations(points, 2).every(
                ([A, B]) => Distance(A, B) >= distance
            )
        }
        return check(AreDistant, [owl.point2D])
    }

    /**
     * Check if slopes are at least oblique at minAngle
     * ```
     * AreOblique(40)(0,1) // true
     * AreOblique(40)(0,0.5) // false
     * ```
     */
    @checkIt(owl.positive)
    static AreOblique(minAngle: number) {
        let areOblique = function (...slopes: number[]): boolean {
            return _.combinations(slopes, 2).every(
                ([a, b]) => IntersectAngle(a, b) >= minAngle
            )
        }
        return check(areOblique, [owl.num])
    }

    /**
     * Check if the items are all distinct, deep compare.
     * ```
     * AreDifferent([1,2],[3,4]) // true
     * AreDifferent([1,2],[1,2]) // false
     * ```
     */
    static AreDifferent(...items: any[]) {
        return _.isUniqDeep(items)
    }
}

declare global {
    var AreDistinct: typeof Host.AreDistinct
    var AreAbsDistinct: typeof Host.AreAbsDistinct
    var AreSameSign: typeof Host.AreSameSign
    var AreCoprime: typeof Host.AreCoprime
    var AreDistantPoint: typeof Host.AreDistantPoint
    var AreOblique: typeof Host.AreOblique
    var AreDifferent: typeof Host.AreDifferent
}
