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
/**
 * Return the deep-blurred value for checking things like integer and equality. This is necessary for comparing numbers that are blurred before.  Use 2-digit less accurate that {@link blur}. Unlike {@link blur}, this blurs `num` regardless of the reduction in number of sigfig.
 * @param num - the number to blur
 * @return the blurred number
 * @example
 * ```
 * correct(0.1+0.2) // 0.3
 * ```
 */
export declare function correct(num: number): number;
/**
 * Check if the two numbers are equal if deep-blurred by {@link correct}.
 * @param a - the 1st number
 * @param b - the 2nd number
 * @returns - a boolean
 * @example
 * ```
 * eq(0.1+0.2, 0.3) // true
 * ```
 */
export declare function eq(a: number, b: number): boolean;
/**
 * Return the number of significant figures of `num`.
 * @param num - the number
 * @returns the number of sigfig
 * @example
 * ```
 * sigfig(1.234) // 4
 * ```
 */
export declare function sigfig(num: number): number;
/**
 * Return the number of decimal places of `num`.
 * @param num - the number
 * @returns the number of decimal places
 * @example
 * ```
 * dp(1.234) // 3
 * ```
 */
export declare function dp(num: number): number;
/**
 * Return `num` rounded to `sigfig`.
 * @param num - the number to round
 * @param sigfig - the sigfig requested
 * @returns the rounded number
 * @example
 * ```
 * round(1.2345,4).off() // 1.235
 * round(1.2344,4).up() // 1.235
 * round(1.2345,4).down() // 1.234
 * ```
 */
export declare function round(num: number, sigfig?: number): {
    off: () => any;
    up: () => any;
    down: () => any;
};
/**
 * Return `num` rounded to `dp`.
 * @param num - the number to round
 * @param dp - the decimal place requested
 * @returns the rounded number
 * @example
 * ```
 * fix(1.2345,3).off() // 1.235
 * fix(1.2344,3).up() // 1.235
 * fix(1.2345,3).down() // 1.234
 * ```
 */
export declare function fix(num: number, dp?: number): {
    off: () => any;
    up: () => any;
    down: () => any;
};
/**
 * Return the exponent part of `num`.
 * @param num - the number
 * @returns the exponent part
 * @example
 * ```
 * e(1234) // 3
 * ```
 */
export declare function e(num: number): number;
/**
 * Return the mantissa part of `num`.
 * @param num - the number
 * @returns the mantissa part
 * @example
 * ```
 * mantissa(1234) // 1.234
 * ```
 */
export declare function mantissa(num: number): number;
/**
 * Return the ceil value of `num` in its order of magnitude.
 * @param num - the number
 * @returns the ceil within order of magnitude
 * @example
 * ```
 * logCeil(1234) // 10000
 * ```
 */
export declare function logCeil(num: number): number;
/**
 * Return the floor value of `num` in its order of magnitude.
 * @param num - the number
 * @returns the floor within order of magnitude
 * @example
 * ```
 * logCeil(1234) // 1000
 * ```
 */
export declare function logFloor(num: number): number;
/**
 * Return the fraction form of `num`, with max denominator 100000.
 * @param num - the value to convert
 * @returns the fraction form a/b as [a,b]
 * @example
 * ```
 * toFraction(0.75) // [3,4]
 * ```
 */
export declare function toFraction(num: number): [number, number];
/**
 * Check if `num` is rational, approximately.
 * @param num - the number to check
 * @returns a Boolean
 * @example
 * ```
 * isRational(0.3) // true
 * isRational(Math.sqrt(2)) // false
 * ```
 */
export declare function isRational(num: number): boolean;
/**
 * Return the surd in the form of [a,b] meaning a*sqrt(b).
 * @param num - the number to convert, must be a surd
 * @returns an array representing the exact surd form
 * @example
 * ```
 * toSurd(sqrt(12)) // [2,3]
 * toSurd(-sqrt(12)) // [-2,3]
 * ```
 */
export declare function toSurd(num: number): [number, number];
/**
 * Return whether `num` is prime.
 * @param num - the integer to check
 * @returns - a boolean
 * @example
 * ```
 * isPrime(5) // true
 * isPrime(6) // false
 * ```
 */
export declare function isPrime(num: number): boolean;
/**
 * Return all the primes under `max`.
 * @param max - upper bound of primes requested
 * @returns array of primes
 * @example
 * ```
 * primes(12) // [2,3,5,7,11]
 * primes(13) // [2,3,5,7,11,13]
 * ```
 */
export declare function primes(max: number): number[];
/**
 * Return an array of ordered prime factors.
 * @param num - the number to factorize
 * @returns array of prime factors.
 * @example
 * ```
 * primeFactors(12) // [2,2,3]
 * ```
 */
export declare function primeFactors(num: number): number[];
/**
 * Return the factorial of `n`.
 * @param n - the number
 * @returns the factorial
 * @example
 * ```
 * factorial(5) // 120
 * ```
 */
export declare function factorial(n: number): number;
/**
 * Return the value of nCr.
 * @param n - total number
 * @param r - selected number
 * @returns nCr
 * @example
 * ```
 * nCr(5,2) // 10
 * ```
 */
export declare function nCr(n: number, r: number): number;
/**
 * Return the value of nPr.
 * @param n - total number
 * @param r - selected number
 * @returns nPr
 * @example
 * ```
 * nPr(5,2) // 20
 * ```
 */
export declare function nPr(n: number, r: number): number;
/**
 * Return an array of integers from `min` to `max`
 * @param min - the min value to start
 * @param max - the max value to end
 * @returns an array of integers
 * @example
 * ```
 * range(2,5) // [2,3,4,5]
 * ```
 */
export declare function range(min: number, max: number): number[];
declare type Point2D = [number, number];
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
 * @returns array `[x,y]`
 * @example
 * ```
 * crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * crammer(1,1,3,2,2,6) // [NaN, NaN]
 * ```
 */
export declare function crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number];
export {};
//# sourceMappingURL=cal.d.ts.map