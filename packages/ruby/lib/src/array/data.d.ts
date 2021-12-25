import { List } from './list';
import { Numbers } from './numbers';
/**
 * A subclass of array. Designed for number data for stat use.
 */
export declare class Data extends Numbers {
    /**
     * Return the median.
     * @returns the median
     * @example
     * ```
     * [1,2,4].median() // 2
     * [1,2,4,10].median() // 3
     * [].median() // NaN
     * ```
     */
    median(): number;
    /**
     * Return an array of `Nth` modes.
     * @param Nth - the rank of modes requested
     * @returns array of modes
     * @example
     * ```
     * [1,1,2,3,3].modes() // [1,3]
     * [3,3,2,1,1].modes() // [3,1]
     * [1,1,2,3].modes() // [1]
     * [1,2,3].modes() // [1,2,3]
     * [].modes() // []
     *
     * [1,1,1,2,2,2,3,3,4,4,5].modes(1) // [1,2]
     * [1,1,1,2,2,2,3,3,4,4,5].modes(2) // [3,4]
     * ```
     */
    modes(Nth?: number): this;
    /**
     * Return the only `Nth` mode.
     * If there is more than one modes, return `NaN`.
     * @param Nth - the rank of mode requested
     * @returns the only mode
     * @example
     * ```
     * [1,1,2,3].mode() // 1
     * [1,1,2,3,3].mode() // NaN
     * [].mode() // NaN
     *
     * [1,1,1,2,2,2,3,3,4,4,5].mode(2) // NaN
     * [1,1,1,2,2,2,2,3,3,4,4,5].mode(2) // 1
     * ```
     */
    mode(Nth?: number): number;
    /**
     * Check if the numbers has a single `Nth` mode.
     * @param Nth - the rank of mode requested
     * @returns a boolean
     * @example
     * ```
     * [1,1,2,3,3].isSingleMode() // false
     * [1,1,2,3].isSingleMode() // true
     * ```
     */
    isSingleMode(Nth?: number): boolean;
    /**
     * Return the lower quartile.
     * @returns the lower quartile
     * @example
     * ```
     * [1,2,3,4].lowerQuartile() // 1.5
     * ```
     */
    lowerQuartile(): number;
    /**
     * Return the upper quartile.
     * @returns the upper quartile
     * @example
     * ```
     * [1,2,3,4].upperQuartile() // 3.5
     * ```
     */
    upperQuartile(): number;
    /**
     * Return the standard deviation of the numbers.
     * @returns the standard deviation
     * @example
     * ```
     * [1,2,3,4].stdDev() // 1.1180339887499
     * ```
     */
    stdDev(): number;
    /**
     * Return the range of the numbers.
     * @returns the range
     * @example
     * ```
     * [4,5,6].range // 2
     * ```
     */
    range(): number;
    /**
     * Return the inter-quartile range of the numbers.
     * @returns the inter-quartile range
     * @example
     * ```
     * [4,5,6,7,8].IQR() // 2
     * ```
     */
    IQR(): number;
}
declare module "./data" {
    interface Data {
    }
    namespace Data {
        function of<T>(...items: T[]): Data & List<T>;
    }
}
/**
 * Return a `Data` prefilled with `elements`.
 * @param elements - the elements to put in the `Data`
 * @returns a `Data` array
 * @example
 * ```
 * data(1,2,3) // Data of [1,2,3]
 * ```
 */
export declare function data(...elements: number[]): Data;
/**
 * Return a `Data` prefilled with `elements`.
 * @param elements - the elements to put in the `Data`
 * @returns a `Data` array
 * @example
 * ```
 * toData([1,2,3]) // Data of [1,2,3]
 * ```
 */
export declare function toData(elements: number[]): Data;
//# sourceMappingURL=data.d.ts.map