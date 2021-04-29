"use strict";
/**
 * @category Relation
 * @return Check if the numbers are all distinct.
 * ```typescript
 * AreDistinct(1,2,3) // true
 * AreDistinct(1,2,2) // false
 * ```
 */
function AreDistinct(...nums) {
    Should(IsNum(...nums), 'input must be num');
    return (new Set(nums)).size === nums.length;
}
globalThis.AreDistinct = AreDistinct;
/**
 * @category Relation
 * @return Check if the absolute values of the numbers are all distinct.
 * ```typescript
 * AreAbsDistinct(1,2,3) // true
 * AreAbsDistinct(1,2,2) // false
 * AreAbsDistinct(1,2,-2) // false
 * ```
 */
function AreAbsDistinct(...nums) {
    Should(IsNum(...nums), 'input must be num');
    return AreDistinct(...nums.map(x => Math.abs(x)));
}
globalThis.AreAbsDistinct = AreAbsDistinct;
/**
 * @category Relation
 * @return Check if the numbers all have the same sign.
 * ```typescript
 * AreSameSign(1,2,3) // true
 * AreSameSign(1,2,-3) // false
 * AreSameSign(1,2,0) // false
 * ```
 */
function AreSameSign(...nums) {
    Should(IsNum(...nums), 'input must be num');
    nums = nums.map(x => Math.sign(x));
    nums = [...new Set(nums)];
    return nums.length === 1;
}
globalThis.AreSameSign = AreSameSign;
/**
 * @category Relation
 * @return Check if the numbers all pairwise coprime.
 * ```typescript
 * AreCoprime(2,3) // true
 * AreCoprime(2,6) // false
 * AreCoprime(1,2) // true
 * AreCoprime(2,3,6) // true
 * AreCoprime(1.5,3) // true
 * AreCoprime(0,3) // true
 * ```
 */
function AreCoprime(...nums) {
    Should(IsNum(...nums), 'input must be num');
    nums = Blurs(nums);
    if (!IsInteger(...nums))
        return true;
    if (!IsNonZero(...nums))
        return true;
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (HCF(nums[i], nums[j]) !== 1)
                return false;
        }
    }
    return true;
}
globalThis.AreCoprime = AreCoprime;
/**
 * @category Relation
 * @return Check if the points are all distinct.
 * ```typescript
 * AreDistinctPoint([1,2],[3,4]) // true
 * AreDistinctPoint([1,2],[1,2]) // false
 * ```
 */
function AreDistinctPoint(...points) {
    Should(IsPoint(...points), 'input must be point');
    let predicate = (p1, p2) => {
        return p1[0] !== p2[0] || p1[1] !== p2[1];
    };
    return PairsEvery(predicate)(...points);
}
globalThis.AreDistinctPoint = AreDistinctPoint;
/**
 * @category Relation
 * @return Check if the points are pairwise distant apart.
 * ```typescript
 * AreDistantPoint(2)([0,0],[3,0]) // true
 * AreDistantPoint(2)([0,0],[1,0]) // false
 * ```
 */
function AreDistantPoint(distance) {
    Should(IsPositive(distance), 'distance must be positive');
    return function (...points) {
        Should(IsPoint(...points), 'input must be point');
        let predicate = (p1, p2) => Distance(p1, p2) >= distance;
        return PairsEvery(predicate)(...points);
    };
}
globalThis.AreDistantPoint = AreDistantPoint;
/**
 * @category Relation
 * @return Check if slopes are at least oblique at minAngle
 * ```typescript
 * AreOblique(40)(0,1) // true
 * AreOblique(40)(0,0.5) // false
 * ```
 */
function AreOblique(minAngle) {
    Should(IsPositive(minAngle), 'minAngle must be positive');
    return function (...slopes) {
        Should(IsNum(...slopes), 'slopes must be nums');
        let predicate = (m1, m2) => IntersectAngle(m1, m2) >= minAngle;
        return PairsEvery(predicate)(...slopes);
    };
}
globalThis.AreOblique = AreOblique;
