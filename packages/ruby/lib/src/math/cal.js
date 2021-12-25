// import Decimal from './dec'
import { convergent } from './frac';
import { adjustToDP, adjustToSF } from './round';
/**
 * The number of significant digits used in {@link blur}.
 */
const STANDARD_SIGFIG = 14;
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
export function blur(num) {
    let n = parseFloat(num.toPrecision(STANDARD_SIGFIG));
    return sigfig(n) <= STANDARD_SIGFIG - 5 ? n : num;
}
/**
 * Return the deep-blurred value for checking things like integer and equality. This is necessary for comparing numbers that are blurred before.  Use 2-digit less accurate that {@link blur}. Unlike {@link blur}, this blurs `num` regardless of the reduction in number of sigfig.
 * @param num - the number to blur
 * @return the blurred number
 * @example
 * ```
 * correct(0.1+0.2) // 0.3
 * ```
 */
export function correct(num) {
    return parseFloat(num.toPrecision(STANDARD_SIGFIG - 2));
}
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
export function eq(a, b) {
    return correct(a) === correct(b);
}
/**
 * Return the number of significant figures of `num`.
 * @param num - the number
 * @returns the number of sigfig
 * @example
 * ```
 * sigfig(1.234) // 4
 * ```
 */
export function sigfig(num) {
    let mant = Math.abs(num).toExponential().split('e')[0];
    return mant.replace('.', '').length;
    // return (new Decimal(num)).precision(false)
}
;
/**
 * Return the number of decimal places of `num`.
 * @param num - the number
 * @returns the number of decimal places
 * @example
 * ```
 * dp(1.234) // 3
 * ```
 */
export function dp(num) {
    if (Number.isInteger(num))
        return 0;
    let sf = sigfig(num);
    let exp = e(num);
    return sf - 1 - exp;
    // return (new Decimal(num)).decimalPlaces()
}
;
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
export function round(num, sigfig = 3) {
    return {
        off: () => adjustToSF(num, sigfig, 'off'),
        up: () => adjustToSF(num, sigfig, 'up'),
        down: () => adjustToSF(num, sigfig, 'down')
    };
    // function exec(mode: number) {
    //     return (new Decimal(num))
    //         .toSignificantDigits(sigfig, mode)
    //         .toNumber()
    // }
    // return {
    //     off: () => exec(Decimal.ROUND_HALF_UP),
    //     up: () => exec(Decimal.ROUND_UP),
    //     down: () => exec(Decimal.ROUND_DOWN),
    // }
}
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
export function fix(num, dp = 0) {
    return {
        off: () => adjustToDP(num, dp, 'off'),
        up: () => adjustToDP(num, dp, 'up'),
        down: () => adjustToDP(num, dp, 'down')
    };
    // function exec(mode: number) {
    //     if (mode === Decimal.ROUND_HALF_UP) {
    //         return Number(Math.round(Number(num + 'e' + dp)) + 'e' + (-dp))
    //     }
    //     return (new Decimal(num))
    //         .toNearest(Number('1e' + String(-dp)), mode)
    //         .toNumber()
    // }
    // return {
    //     off: () => exec(Decimal.ROUND_HALF_UP),
    //     up: () => exec(Decimal.ROUND_UP),
    //     down: () => exec(Decimal.ROUND_DOWN),
    // }
}
/**
 * Return the exponent part of `num`.
 * @param num - the number
 * @returns the exponent part
 * @example
 * ```
 * e(1234) // 3
 * ```
 */
export function e(num) {
    return Number(num.toExponential().split('e')[1]);
}
/**
 * Return the mantissa part of `num`.
 * @param num - the number
 * @returns the mantissa part
 * @example
 * ```
 * mantissa(1234) // 1.234
 * ```
 */
export function mantissa(num) {
    return Number(num.toExponential().split('e')[0]);
}
/**
 * Return the ceil value of `num` in its order of magnitude.
 * @param num - the number
 * @returns the ceil within order of magnitude
 * @example
 * ```
 * logCeil(1234) // 10000
 * ```
 */
export function logCeil(num) {
    let exp = e(num) + 1;
    return Number('1e' + exp);
}
/**
 * Return the floor value of `num` in its order of magnitude.
 * @param num - the number
 * @returns the floor within order of magnitude
 * @example
 * ```
 * logCeil(1234) // 1000
 * ```
 */
export function logFloor(num) {
    let exp = e(num);
    return Number('1e' + exp);
}
/**
 * Return the fraction form of `num`, with max denominator 100000.
 * @param num - the value to convert
 * @returns the fraction form a/b as [a,b]
 * @example
 * ```
 * toFraction(0.75) // [3,4]
 * ```
 */
export function toFraction(num) {
    if (num === Infinity)
        return [1, 0];
    if (num === -Infinity)
        return [-1, 0];
    return convergent(num, 100000);
}
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
export function isRational(num) {
    if (num === Infinity)
        return false;
    if (num === -Infinity)
        return false;
    let rough = convergent(num, 100000);
    let accurate = convergent(num, 10000000);
    return rough[0] === accurate[0] && rough[1] === accurate[1];
}
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
export function toSurd(num) {
    num = blur(num);
    let s = Math.sign(num);
    let a = Math.abs(num);
    let square = blur(a ** 2);
    if (square === 0)
        return [0, 1];
    let factors = [1];
    let i = 2;
    while (i <= a) {
        let s = i ** 2;
        if (square % s === 0) {
            square = square / s;
            factors.push(i);
        }
        else {
            i++;
        }
    }
    let product = factors.reduce((a, b) => a * b, 1);
    return [s * product, square];
}
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
export function isPrime(num) {
    if (!Number.isInteger(num))
        return false;
    if (num <= 1)
        return false;
    if (num === 2)
        return true;
    if (num % 2 === 0)
        return false;
    for (let i = 3; i <= Math.sqrt(num) + 1; i = i + 2) {
        if (num % i === 0)
            return false;
    }
    return true;
}
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
export function primes(max) {
    let arr = [];
    for (let i = 2; i <= max; i++) {
        if (isPrime(i))
            arr.push(i);
    }
    return arr;
}
/**
 * Return an array of ordered prime factors.
 * @param num - the number to factorize
 * @returns array of prime factors.
 * @example
 * ```
 * primeFactors(12) // [2,2,3]
 * ```
 */
export function primeFactors(num) {
    let arr = [];
    let i = 2;
    while (num > 1) {
        if (!isPrime(i)) {
            i++;
            continue;
        }
        if (num % i === 0) {
            arr.push(i);
            num = num / i;
        }
        else {
            i++;
        }
    }
    return arr;
}
/**
 * Return the factorial of `n`.
 * @param n - the number
 * @returns the factorial
 * @example
 * ```
 * factorial(5) // 120
 * ```
 */
export function factorial(n) {
    if (n <= 1)
        return 1;
    return factorial(n - 1) * n;
}
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
export function nCr(n, r) {
    return factorial(n) / factorial(r) / factorial(n - r);
}
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
export function nPr(n, r) {
    return factorial(n) / factorial(n - r);
}
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
export function range(min, max) {
    let arr = [];
    min = Math.ceil(min - Number.EPSILON);
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }
    return arr;
}
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
export function trace(func, range, dots = 1000) {
    function tracer(t) {
        let result;
        try {
            result = func(t);
        }
        catch {
            return [NaN, NaN];
        }
        if (!Array.isArray(result))
            result = [t, result];
        return result;
    }
    ;
    let [t1, t2] = range;
    const step = (t2 - t1) / (dots - 1);
    let points = [];
    for (let t = t1; t <= t2; t += step) {
        points.push(tracer(t));
    }
    return points;
}
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
export function traceCircle(center, radius, angleRange, dots = 100) {
    const [h, k] = center;
    function sin(degree) {
        return Math.sin(degree / 180 * Math.PI);
    }
    function cos(degree) {
        return Math.cos(degree / 180 * Math.PI);
    }
    return trace(t => [h + radius * cos(t), k + radius * sin(t)], angleRange, dots);
}
/**
 * Solve `[x,y]` from ax+by=c and px+qy=r.
 * @returns array `[x,y]`
 * @example
 * ```
 * crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * crammer(1,1,3,2,2,6) // [NaN, NaN]
 * ```
 */
export function crammer(a, b, c, p, q, r) {
    if (a / b === p / q)
        return [NaN, NaN];
    const D = a * q - b * p;
    const x = (c * q - b * r) / D;
    const y = (a * r - c * p) / D;
    return [blur(x), blur(y)];
}
//# sourceMappingURL=cal.js.map