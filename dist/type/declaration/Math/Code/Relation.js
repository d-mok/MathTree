"use strict";
/**
 * @category Relation
 * @return Check if the numbers are all distinct.
 * ```
 * AreDistinct(1,2,3) // true
 * AreDistinct(1,2,2) // false
 * ```
 */
function AreDistinct(...nums) {
    return (new Set(nums)).size === nums.length;
}
globalThis.AreDistinct = contract(AreDistinct).sign([owl.num]);
/**
 * @category Relation
 * @return Check if the absolute values of the numbers are all distinct.
 * ```
 * AreAbsDistinct(1,2,3) // true
 * AreAbsDistinct(1,2,2) // false
 * AreAbsDistinct(1,2,-2) // false
 * ```
 */
function AreAbsDistinct(...nums) {
    return AreDistinct(...nums.map(Math.abs));
}
globalThis.AreAbsDistinct = contract(AreAbsDistinct).sign([owl.num]);
/**
 * @category Relation
 * @return Check if the numbers all have the same sign.
 * ```
 * AreSameSign(1,2,3) // true
 * AreSameSign(1,2,-3) // false
 * AreSameSign(1,2,0) // false
 * ```
 */
function AreSameSign(...nums) {
    return [...new Set(nums.map(Math.sign))].length === 1;
}
globalThis.AreSameSign = contract(AreSameSign).sign([owl.num]);
/**
 * @category Relation
 * @return Check if the numbers all pairwise coprime.
 * ```
 * AreCoprime(2,3) // true
 * AreCoprime(2,6) // false
 * AreCoprime(1,2) // true
 * AreCoprime(2,3,6) // true
 * AreCoprime(1.5,3) // true
 * AreCoprime(0,3) // true
 * ```
 */
function AreCoprime(...nums) {
    nums = nums.map(ant.blur);
    if (!IsInteger(...nums))
        return true;
    if (!IsNonZero(...nums))
        return true;
    return List(nums).pairsEvery((a, b) => HCF(a, b) === 1);
}
globalThis.AreCoprime = contract(AreCoprime).sign([owl.num]);
/**
 * @category Relation
 * @return Check if the points are all distinct.
 * ```
 * AreDistinctPoint([1,2],[3,4]) // true
 * AreDistinctPoint([1,2],[1,2]) // false
 * ```
 */
function AreDistinctPoint(...points) {
    return List(points).isDistinct();
}
globalThis.AreDistinctPoint = contract(AreDistinctPoint).sign([owl.point]);
/**
 * @category Relation
 * @return Check if the points are pairwise distant apart.
 * ```
 * AreDistantPoint(2)([0,0],[3,0]) // true
 * AreDistantPoint(2)([0,0],[1,0]) // false
 * ```
 */
function AreDistantPoint(distance) {
    let AreDistant = function (...points) {
        return List(points).pairsEvery((a, b) => Distance(a, b) >= distance);
    };
    return contract(AreDistant).sign([owl.point]);
}
globalThis.AreDistantPoint = contract(AreDistantPoint).sign([owl.positive]);
/**
 * @category Relation
 * @return Check if slopes are at least oblique at minAngle
 * ```
 * AreOblique(40)(0,1) // true
 * AreOblique(40)(0,0.5) // false
 * ```
 */
function AreOblique(minAngle) {
    let areOblique = function (...slopes) {
        return List(slopes).pairsEvery((a, b) => IntersectAngle(a, b) >= minAngle);
    };
    return contract(areOblique).sign([owl.num]);
}
globalThis.AreOblique = contract(AreOblique).sign([owl.positive]);