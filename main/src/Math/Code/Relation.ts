import _ from 'lodash'

/**
 * Check if the numbers are all distinct.
 * ```
 * AreDistinct(1,2,3) // true
 * AreDistinct(1,2,2) // false
 * ```
 */
export function AreDistinct(...nums: number[]): boolean {
    nums = nums.map($ => $.blur())
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
export function AreAbsDistinct(...nums: number[]): boolean {
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
export function AreSameSign(...nums: number[]): boolean {
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
export function AreCoprime(...nums: number[]): boolean {
    nums = nums.map($ => $.blur())
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
export function AreDistantPoint(distance: number) {
    return function (...points: Point2D[]): boolean {
        return points
            .combinations(2)
            .every(([A, B]) => Distance(A, B) >= distance)
    }
}

/**
 * Check if slopes are at least oblique at minAngle
 * ```
 * AreOblique(40)(0,1) // true
 * AreOblique(40)(0,0.5) // false
 * ```
 */
export function AreOblique(minAngle: number) {
    return function (...slopes: number[]): boolean {
        return slopes
            .combinations(2)
            .every(([a, b]) => IntersectAngle(a, b) >= minAngle)
    }
}

/**
 * Check if the items are all distinct, deep compare.
 * ```
 * AreDifferent([1,2],[3,4]) // true
 * AreDifferent([1,2],[1,2]) // false
 * ```
 */
export function AreDifferent(...items: any[]) {
    return items.isUniqEqual()
}
