

/**
 * Check if the numbers are all distinct.
 * @category Relation
 * @param {...number} nums - The numbers to check.
 * @return {boolean} True or false.
 * @example
 * AreDistinct(1,2,3) // return true
 * AreDistinct(1,2,2) // return false
 */
function AreDistinct(...nums: number[]): boolean {
    return (new Set(nums)).size === nums.length;
}
globalThis.AreDistinct = AreDistinct




/**
 * Check if the absolute values of the numbers are all distinct.
 * @category Relation
 * @param {...number} nums - The numbers to check.
 * @return {boolean} True or false.
 * @example
 * AreAbsDistinct(1,2,3) // return true
 * AreAbsDistinct(1,2,2) // return false
 * AreAbsDistinct(1,2,-2) // return false
 */
function AreAbsDistinct(...nums: number[]): boolean {
    return AreDistinct(...nums.map(x => Math.abs(x)));
}
globalThis.AreAbsDistinct = AreAbsDistinct




/**
 * Check if the numbers all have the same sign.
 * @category Relation
 * @param {...number} arr - The numbers to check.
 * @return {boolean} True or false.
 * @example
 * AreSameSign(1,2,3) // return true
 * AreSameSign(1,2,-3) // return false
 * AreSameSign(1,2,0) // return false
 */
function AreSameSign(...nums: number[]): boolean {
    nums = nums.map(x => Math.sign(x));
    nums = [...new Set(nums)];
    return nums.length === 1;
}
globalThis.AreSameSign = AreSameSign


/**
 * Check if the numbers all pairwise coprime.
 * @category Relation
 * @param {...number} nums - The numbers to check.
 * @return {boolean} True or false.
 * @example
 * AreCoprime(2,3) // return true
 * AreCoprime(2,6) // return false
 * AreCoprime(1,2) // return true
 */
function AreCoprime(...nums: number[]): boolean {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (HCF(nums[i], nums[j]) !== 1) return false;
        }
    }
    return true;
}
globalThis.AreCoprime = AreCoprime

/**
 * Check if the points are pairwise distant.
 * @category Relation
 * @param {number[][]} points - The points [x,y] to check.
 * @param {number} distance - The min distance acceptable.
 * @return {boolean} True or false.
 * @example
 * AreDistantPoint([[0,0],[3,0]],2) // return true
 * AreDistantPoint([[0,0],[1,0]],2) // return false
 */
function AreDistantPoint(points: number[][], distance: number): boolean {
    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            if (Distance(points[i], points[j]) < distance) return false;
        }
    }
    return true;
}
globalThis.AreDistantPoint = AreDistantPoint
