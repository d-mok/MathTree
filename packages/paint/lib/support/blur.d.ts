/**
 * Return the blurred value to avoid things like 0.300000000004.
 * If blurring can reduce the number of sigfig by 5 or more, return the blurred value; else, return the original value.
 * @param num - the number to blur
 * @returns the blurred number
 * @example
 * ```
 * blur(0.1+0.2) // 0.3
 * ```
 */
export declare function blur(num: number): number;
//# sourceMappingURL=blur.d.ts.map