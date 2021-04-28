/**
 * @category Relation
 * @return Check if the numbers are all distinct.
 * ```typescript
 * AreDistinct(1,2,3) // true
 * AreDistinct(1,2,2) // false
 * ```
 */
declare function AreDistinct(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the absolute values of the numbers are all distinct.
 * ```typescript
 * AreAbsDistinct(1,2,3) // true
 * AreAbsDistinct(1,2,2) // false
 * AreAbsDistinct(1,2,-2) // false
 * ```
 */
declare function AreAbsDistinct(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the numbers all have the same sign.
 * ```typescript
 * AreSameSign(1,2,3) // true
 * AreSameSign(1,2,-3) // false
 * AreSameSign(1,2,0) // false
 * ```
 */
declare function AreSameSign(...nums: number[]): boolean;
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
declare function AreCoprime(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the points are all distinct.
 * ```typescript
 * AreDistinctPoint([1,2],[3,4]) // true
 * AreDistinctPoint([1,2],[1,2]) // false
 * ```
 */
declare function AreDistinctPoint(...points: Point[]): boolean;
/**
 * @category Relation
 * @return Check if the points are pairwise distant apart.
 * ```typescript
 * AreDistantPoint(2)([0,0],[3,0]) // true
 * AreDistantPoint(2)([0,0],[1,0]) // false
 * ```
 */
declare function AreDistantPoint(distance: number): (...points: Point[]) => boolean;
/**
 * @category Relation
 * @return Check if slopes are at least oblique at minAngle
 * ```typescript
 * AreOblique(40)(0,1) // true
 * AreOblique(40)(0,0.5) // false
 * ```
 */
declare function AreOblique(minAngle: number): (...slopes: number[]) => boolean;
