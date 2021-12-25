import { Numbers } from './numbers';
/**
 * A subclass of array. Designed for number data for stat use.
 */
export class Data extends Numbers {
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
    median() {
        if (this.length === 0)
            return NaN;
        const sorted = this.ascending();
        if (sorted.length % 2 === 0) {
            let i = sorted.length / 2;
            let j = i + 1;
            return (sorted[i - 1] + sorted[j - 1]) / 2;
        }
        else {
            let i = sorted.length / 2;
            i = Math.ceil(i);
            return sorted[i - 1];
        }
    }
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
    modes(Nth = 1) {
        if (this.length === 0)
            return this.create([]);
        return this.maxsBy($ => this.freq($), Nth).unique();
    }
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
    mode(Nth = 1) {
        if (this.length === 0)
            return NaN;
        const modes = this.modes(Nth);
        if (modes.length > 1)
            return NaN;
        return modes.first();
    }
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
    isSingleMode(Nth = 1) {
        const modes = this.modes(Nth);
        return modes.length === 1;
    }
    /**
     * Return the lower quartile.
     * @returns the lower quartile
     * @example
     * ```
     * [1,2,3,4].lowerQuartile() // 1.5
     * ```
     */
    lowerQuartile() {
        if (this.length === 0)
            return NaN;
        const sorted = this.ascending();
        let n = sorted.length;
        let m = n / 2;
        if (n % 2 !== 0)
            m = Math.floor(m);
        return sorted.head(m).median();
    }
    /**
     * Return the upper quartile.
     * @returns the upper quartile
     * @example
     * ```
     * [1,2,3,4].upperQuartile() // 3.5
     * ```
     */
    upperQuartile() {
        if (this.length === 0)
            return NaN;
        const sorted = this.ascending();
        let n = sorted.length;
        let m = n / 2;
        if (n % 2 !== 0)
            m = Math.floor(m);
        return sorted.tail(m).median();
    }
    /**
     * Return the standard deviation of the numbers.
     * @returns the standard deviation
     * @example
     * ```
     * [1,2,3,4].stdDev() // 1.1180339887499
     * ```
     */
    stdDev() {
        if (this.length === 0)
            return NaN;
        let mean = this.mean();
        let deviations = this.minus(mean);
        let squaredDev = deviations.square();
        let meanSq = squaredDev.mean();
        return Math.sqrt(meanSq);
    }
    /**
     * Return the range of the numbers.
     * @returns the range
     * @example
     * ```
     * [4,5,6].range // 2
     * ```
     */
    range() {
        if (this.length === 0)
            return NaN;
        return this.max() - this.min();
    }
    /**
     * Return the inter-quartile range of the numbers.
     * @returns the inter-quartile range
     * @example
     * ```
     * [4,5,6,7,8].IQR() // 2
     * ```
     */
    IQR() {
        if (this.length === 0)
            return NaN;
        return this.upperQuartile() - this.lowerQuartile();
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
export function data(...elements) {
    let dt = new Data();
    dt.push(...elements);
    return dt;
}
/**
 * Return a `Data` prefilled with `elements`.
 * @param elements - the elements to put in the `Data`
 * @returns a `Data` array
 * @example
 * ```
 * toData([1,2,3]) // Data of [1,2,3]
 * ```
 */
export function toData(elements) {
    return data(...elements);
}
//# sourceMappingURL=data.js.map