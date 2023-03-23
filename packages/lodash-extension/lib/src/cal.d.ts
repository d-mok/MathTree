/**
 * Return the blurred value to avoid things like 0.300000000004.
 * If blurring can reduce the number of sigfig by 5 or more, return the blurred value; else, return the original value.
 * ```
 * blur(0.1+0.2) // 0.3
 * ```
 */
export declare function blur(num: number): number;
/**
 * Return the deep-blurred value for checking things like integer and equality.
 * This is necessary for comparing numbers that are blurred before.
 * Use 2-digit less accurate that {@link blur}. Unlike {@link blur}, this blurs `num` regardless of the reduction in number of sigfig.
 * ```
 * correct(0.1+0.2) // 0.3
 * ```
 */
export declare function correct(num: number): number;
/**
 * Check if the two numbers are equal if deep-blurred by {@link correct}.
 * ```
 * eq(0.1+0.2, 0.3) // true
 * ```
 */
export declare function eq(a: number, b: number): boolean;
/**
 * Return the number of significant figures of `num`.
 * ```
 * sigfig(1.234) // 4
 * ```
 */
export declare function sigfig(num: number): number;
/**
 * Return the number of decimal places of `num`.
 * ```
 * dp(1.234) // 3
 * ```
 */
export declare function dp(num: number): number;
/**
 * Return `num` rounded to `sigfig`.
 * ```
 * round(1.2345,4).off() // 1.235
 * round(1.2344,4).up() // 1.235
 * round(1.2345,4).down() // 1.234
 * ```
 */
export declare function round(num: number, sigfig?: number): {
    off: () => number;
    up: () => number;
    down: () => number;
};
/**
 * Return `num` rounded to `dp`.
 * ```
 * fix(1.2345,3).off() // 1.235
 * fix(1.2344,3).up() // 1.235
 * fix(1.2345,3).down() // 1.234
 * ```
 */
export declare function fix(num: number, dp?: number): {
    off: () => number;
    up: () => number;
    down: () => number;
};
/**
 * Return the exponent part of `num`.
 * ```
 * e(1234) // 3
 * ```
 */
export declare function e(num: number): number;
/**
 * Return the mantissa part of `num`.
 * ```
 * mantissa(1234) // 1.234
 * ```
 */
export declare function mantissa(num: number): number;
/**
 * Return the ceil value of `num` in its order of magnitude.
 * ```
 * logCeil(1234) // 10000
 * ```
 */
export declare function logCeil(num: number): number;
/**
 * Return the floor value of `num` in its order of magnitude.
 * ```
 * logCeil(1234) // 1000
 * ```
 */
export declare function logFloor(num: number): number;
/**
 * Return the fraction form of `num`, with max denominator 100000.
 * ```
 * toFraction(0.75) // [3,4]
 * ```
 */
export declare function toFraction(num: number): [numerator: number, deno: number];
/**
 * Check if `num` is rational, approximately.
 * ```
 * isRational(0.3) // true
 * isRational(Math.sqrt(2)) // false
 * ```
 */
export declare function isRational(num: number): boolean;
/**
 * Return the surd in the form of [a,b] meaning a*sqrt(b).
 * ```
 * toSurd(sqrt(12)) // [2,3]
 * toSurd(-sqrt(12)) // [-2,3]
 * ```
 */
export declare function toSurd(num: number): [a: number, b: number];
/**
 * Return all the primes under `max`.
 * ```
 * primes(12) // [2,3,5,7,11]
 * primes(13) // [2,3,5,7,11,13]
 * ```
 */
export declare function primes(max: number): number[];
/**
 * Return an array of ordered prime factors.
 * ```
 * primeFactors(12) // [2,2,3]
 * ```
 */
export declare function primeFactors(num: number): number[];
type Point2D = [number, number];
/**
 * Return an array of 2D points as [number,number] by tracing `func` within `range`.
 * @param func - the func to trace, can be normal or parametric.
 * @param range - the range of `func` input to trace
 * @param dots - number of points requested, more dots more detailed
 * @returns an array of 2D points
 * @example
 * ```
 * trace(x=>x**2, [0,3], 4)
 * // [[0,0], [1,1], [2,4], [3,9]]
 * ```
 */
export declare function trace(func: ((t: number) => number) | ((t: number) => Point2D), range: [number, number], dots?: number): Point2D[];
/**
 * Return an array of 2D points as [number,number] by tracing a circle.
 * @param center - the center of the circle
 * @param radius - the radius of the circle
 * @param angleRange - the polar angle range
 * @param dots - number of points requested, more dots more detailed
 * @returns an array of 2D points
 * @example
 * ```
 * traceCircle([0,0], 1, [0,360], 4)
 * // [[1,0], [0,1], [-1,0], [0,-1]]
 * ```
 */
export declare function traceCircle(center: Point2D, radius: number, angleRange: [number, number], dots?: number): Point2D[];
/**
 * Solve `[x,y]` from ax+by=c and px+qy=r.
 * ```
 * crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * crammer(1,1,3,2,2,6) // [NaN, NaN]
 * ```
 */
export declare function crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number];
export {};
//# sourceMappingURL=cal.d.ts.map