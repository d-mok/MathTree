import { List } from './list';
/**
 * A subclass of array. Designed for number array.
 */
export declare class Numbers extends List<number> {
    /**
     * Return the sum of all numbers.
     * @returns the sum of all numbers
     * @example
     * ```
     * [1,2,3].sum() // 6
     * [].sum() // 0
     * ```
     */
    sum(): number;
    /**
     * Return the product of all numbers.
     * @returns the product of all numbers
     * @example
     * ```
     * [1,2,3,4].product() // 24
     * [].product() // NaN
     * ```
     */
    product(): number;
    /**
     * Return the mean of all numbers.
     * @returns the mean of all numbers.
     * @example
     * ```
     * [1,2,3,4].mean() // 2.5
     * [].mean() // NaN
     * ```
     */
    mean(): number;
    /**
     * Return the max number.
     * If `rank` is specified, return the Nth unique max number.
     * @param rank - the rank requested
     * @returns the max number
     * @example
     * ```
     * [4,6,5].max() // 6
     * [4,6,5].max(2) // 5
     * ```
     */
    max(rank?: number): number;
    /**
     * Return the min number.
     * If `rank` is specified, return the Nth unique min number.
     * @param rank - the rank requested
     * @returns the min number
     * @example
     * ```
     * [4,6,5].min() // 4
     * [4,6,5].min(2) // 5
     * ```
     */
    min(rank?: number): number;
    /**
     * Return an array of the sum of this array and `nums` element-wise.
     * @param nums - the array or a number to add
     * @returns array of the sums
     * @example
     * ```
     * [1,2,3].add([4,5,6]) // [5,7,9]
     * [1,2,3].add(1) // [2,3,4]
     * ```
     */
    add(nums: number | number[]): this;
    /**
     * Return an array of the difference of this array and `nums` element-wise.
     * @param nums - the array or a number to subtract
     * @returns array of the differences
     * @example
     * ```
     * [4,5,6].minus([1,2,3]) // [3,3,3]
     * [4,5,6].minus(1) // [3,4,5]
     * ```
     */
    minus(nums: number | number[]): this;
    /**
     * Return an array of the product of this array and `nums` element-wise.
     * @param nums - the array or a number to multiply
     * @returns array of the products
     * @example
     * ```
     * [1,2,3].times([4,5,6]) // [4,10,18]
     * [1,2,3].times(2) // [2,4,6]
     * ```
     */
    times(nums: number | number[]): this;
    /**
     * Return an array of the quotient of this array and `nums` element-wise.
     * @param nums - the array or a number to divide
     * @returns array of the quotients
     * @example
     * ```
     * [1,2,3].divide([4,5,6]) // [0.25,0.4,0.5]
     * [1,2,3].divide(2) // [0.5,1,1.5]
     * ```
     */
    divide(nums: number | number[]): this;
    /**
     * Return an array of the power of this array raised to `nums` element-wise.
     * @param indices - the array or a number as index
     * @returns array of the powers
     * @example
     * ```
     * [1,2,3].toPower([4,3,2]) // [1,8,9]
     * [1,2,3].toPower(2) // [1,4,9]
     * ```
     */
    toPower(indices: number | number[]): this;
    /**
     * Return an array of the Nth root of this array, with `nths` element-wise.
     * @param nths - the array or a number
     * @returns array of the nth roots
     * @example
     * ```
     * [1,8,9].rootNth([4,3,2]) // [1,2,3]
     * [1,4,9].rootNth(2) // [1,2,3]
     * ```
     */
    rootNth(nths: number | number[]): this;
    /**
     * Return an array of the squares of this array.
     * @returns array of the squares
     * @example
     * ```
     * [1,2,3].square(2) // [1,4,9]
     * ```
     */
    square(): this;
    /**
     * Return an array of the square roots of this array.
     * @returns array of the square roots
     * @example
     * ```
     * [1,4,9].squareRoot() // [1,2,3]
     * ```
     */
    squareRoot(): this;
    /**
     * Return an array of the negatives of this array.
     * @returns array of negatives
     * @example
     * ```
     * [1,2,3].negate() // [-1,-2,-3]
     * ```
     */
    negate(): this;
    /**
     * Return an array of the absolute values of this array.
     * @returns array of absolute values
     * @example
     * ```
     * [1,-2,-3].abs() // [1,2,3]
     * ```
     */
    abs(): this;
    /**
     * Return an array of blurred values.
     * @returns array of blurred values.
     * @example
     * ```
     * [1.99999999999,3.00000000004].blur() // [2,3]
     * ```
     */
    blur(): this;
    /**
     * Return an array of fractional form.
     * @returns array of fraction
     * @example
     * ```
     * [0.5,0.75].toFraction() // [[1,2],[3,4]]
     * ```
     */
    toFraction(): List<[number, number]>;
    /**
     * Return an array of the gaps between every two consecutive numbers in the sorted version of this array.
     * @returns array of gaps
     * @example
     * ```
     * [1,7,3,20].gaps()
     * // sorted as [1,3,7,20] first
     * // so returns [2,4,13]
     * ```
     */
    gaps(): this;
    /**
     * Return an array of the gaps between every two consecutive numbers in the sorted version of this array, in a cyclic sense with `mod`.
     * @param mod - find gap in cyclic sense, joining 0 and `mod`.
     * @returns array of gaps
     * @example
     * ```
     * [1,7,3,20].gapsMod(9)
     * // reduced to [1,7,3,2] first, mod 9
     * // then sorted to [1,2,3,7]
     * // so returns [1,1,4,3]
     * // the last gap 3 is wrapped around
     * ```
     */
    gapsMod(mod: number): this;
    /**
     * Return the HCF of the numbers. Negatives are treated as positives. All zeros are ignored.
     * If contains non-integer, return `NaN`.
     * @returns the HCF
     * @example
     * ```
     * [9,12].hcf() // 3
     * [12,18,24].hcf() // 6
     * [1,5].hcf() // 1
     * [3].hcf() // 3
     * [0,3].hcf() // 3
     * [].hcf() // NaN
     * [4,1.5].hcf() // NaN
     * [0].hcf() // NaN
     * ```
     */
    hcf(): number;
    /**
     * Return the LCM of the numbers. Negatives are treated as positives. All zeros are ignored.
     * If contains non-integer, return `NaN`.
     * @returns the LCM
     * @example
     * ```
     * [4,6].lcm() // 12
     * [12,18,24].lcm() // 72
     * [1,5].lcm() // 5
     * [3].lcm() // 3
     * [0,3].lcm() // 3
     * [].lcm() // NaN
     * [4,1.5].lcm() // NaN
     * [0].lcm() // NaN
     * ```
     */
    lcm(): number;
    /**
     * Return an array of reduced integral ratio.
     * If some numbers are non-integers, return a clone of this array.
     * @returns array of integral ratio
     * @example
     * ```
     * [2,4,6].reduceRatio() // [1,2,3]
     * [0,4,6].reduceRatio() // [0,2,3]
     * [1.5,2.5,3.5].reduceRatio() // [1.5,2.5,3.5]
     * [sqrt(2),3].reduceRatio()  // [sqrt(2),3]
     * ```
     */
    reduceRatio(): this;
    /**
     * Return an array of integral ratio.
     * If some numbers can't be converted to fraction, return a clone of this array.
     * @returns array of integral ratio
     * @example
     * ```
     * [2,4,6].ratio() // [1,2,3]
     * [0,4,6].ratio() // [0,2,3]
     * [1.5,2.5,3.5].ratio() // [3,5,7]
     * [sqrt(2),3].ratio()  // [sqrt(2),3]
     * ```
     */
    ratio(): this;
    /**
     * Return the multiplied factor when applying {@link this.ratio()} on this array.
     * @returns the factor
     * @example
     * ```
     * [2,4,6].ratio() // 0.5
     * [0,4,6].ratio() // 0.5
     * [1.5,2.5,3.5].ratio() // 2
     * [sqrt(2),3].ratio()  // NaN
     * ```
     */
    ratioFactor(): number;
}
declare module "./numbers" {
    interface Numbers {
    }
    namespace Numbers {
        function of<T>(...items: T[]): Numbers & List<T>;
    }
}
/**
 * Return a `Numbers` prefilled with `elements`.
 * @param elements - the elements to put in the `Numbers`
 * @returns a `Numbers` array
 * @example
 * ```
 * numbers(1,2,3) // Numbers of [1,2,3]
 * ```
 */
export declare function numbers(...elements: number[]): Numbers;
/**
 * Return a `Numbers` prefilled with `elements`.
 * @param elements - the elements to put in the `Numbers`
 * @returns a `Numbers` array
 * @example
 * ```
 * toNumbers([1,2,3]) // Numbers of [1,2,3]
 * ```
 */
export declare function toNumbers(elements: number[]): Numbers;
//# sourceMappingURL=numbers.d.ts.map