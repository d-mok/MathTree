/**
 * Return a random integer from `min` to `max` inclusive.
 * @param min - the min value allowed
 * @param max - the max value allowed
 * @returns a random integer
 * @example
 * ```
 * integer(3,7) // maybe 3,4,5,6 or 7
 * ```
 */
export declare function integer(min: number, max: number): number;
/**
 * Return a random real number from `min` to `max` inclusive.
 * @param min - the min value allowed
 * @param max - the max value allowed
 * @returns a random real number
 * @example
 * ```
 * real(3,7) // anything between 3 and 7
 * ```
 */
export declare function real(min: number, max: number): number;
/**
 * Return a random prime number from `min` to `max` inclusive.
 * If there is no prime in the range, return `undefined`.
 * @param min - the min value allowed
 * @param max - the max value allowed
 * @returns a random prime number
 * @example
 * ```
 * prime(3,7) // 3 or 5 or 7
 * ```
 */
export declare function prime(min: number, max: number): number | undefined;
/**
 * Return a random male name.
 * @returns a random male name
 * @example
 * ```
 * he() // e.g. 'Peter'
 * ```
 */
export declare function he(): string;
/**
 * Return a random female name.
 * @returns a random female name
 * @example
 * ```
 * she() // e.g. 'Mary'
 * ```
 */
export declare function she(): string;
/**
 * Return a random boolean.
 * @param trueChance - the probability of true, from 0 to 1
 * @return a random Boolean
 * @example
 * ```
 * bool(0.6) // 60% chance true, 40% false
 * ```
 */
export declare function bool(trueChance?: number): boolean;
//# sourceMappingURL=poker.d.ts.map