

/**
 * @category Relation
 * @return Check if the numbers are all distinct.
 * ```typescript
 * AreDistinct(1,2,3) // true
 * AreDistinct(1,2,2) // false
 * ```
 */
function AreDistinct(...nums: number[]): boolean {
    return (new Set(nums)).size === nums.length;
}
globalThis.AreDistinct = AreDistinct




/**
 * @category Relation
 * @return Check if the absolute values of the numbers are all distinct.
 * ```typescript
 * AreAbsDistinct(1,2,3) // true
 * AreAbsDistinct(1,2,2) // false
 * AreAbsDistinct(1,2,-2) // false
 * ```
 */
function AreAbsDistinct(...nums: number[]): boolean {
    return AreDistinct(...nums.map(x => Math.abs(x)));
}
globalThis.AreAbsDistinct = AreAbsDistinct




/**
 * @category Relation
 * @return Check if the numbers all have the same sign.
 * ```typescript
 * AreSameSign(1,2,3) // true
 * AreSameSign(1,2,-3) // false
 * AreSameSign(1,2,0) // false
 * ```
 */
function AreSameSign(...nums: number[]): boolean {
    nums = nums.map(x => Math.sign(x));
    nums = [...new Set(nums)];
    return nums.length === 1;
}
globalThis.AreSameSign = AreSameSign


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
function AreCoprime(...nums: number[]): boolean {
    nums = Blurs(nums)
    if (!IsInteger(...nums)) return true
    if (!IsNonZero(...nums)) return true
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (HCF(nums[i], nums[j]) !== 1) return false;
        }
    }
    return true;
}
globalThis.AreCoprime = AreCoprime


/**
 * @category Relation
 * @return Check if the points are pairwise distant apart.
 * ```typescript
 * AreDistantPoint(2)([0,0],[3,0]) // true
 * AreDistantPoint(2)([0,0],[1,0]) // false
 * ```
 */
function AreDistantPoint(distance: number) {
    const f = function (...points: Point[]): boolean {
        let pairs = Pairs(...points)
        let distances = pairs.map(ps => Distance(ps[0], ps[1]))
        return distances.every(
            x => x > distance
        );
    }
    return f
}
globalThis.AreDistantPoint = AreDistantPoint


