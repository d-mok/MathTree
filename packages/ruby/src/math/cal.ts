import { Decimal } from 'decimal.js'
import _ from 'lodash'
import * as math from 'mathjs'
/**
 * The number of significant digits used in {@link blur}.
 */
const STANDARD_SIGFIG = 14

/**
 * Return the blurred value to avoid things like 0.300000000004.
 * If blurring can reduce the number of sigfig by 5 or more, return the blurred value; else, return the original value.
 * ```
 * blur(0.1+0.2) // 0.3
 * ```
 */
export function blur(num: number): number {
    let n = parseFloat(num.toPrecision(STANDARD_SIGFIG))
    return sigfig(n) <= STANDARD_SIGFIG - 5 ? n : num
}

/**
 * Return the deep-blurred value for checking things like integer and equality.
 * This is necessary for comparing numbers that are blurred before.
 * Use 2-digit less accurate that {@link blur}. Unlike {@link blur}, this blurs `num` regardless of the reduction in number of sigfig.
 * ```
 * correct(0.1+0.2) // 0.3
 * ```
 */
export function correct(num: number): number {
    return parseFloat(num.toPrecision(STANDARD_SIGFIG - 2))
}

/**
 * Check if the two numbers are equal if deep-blurred by {@link correct}.
 * ```
 * eq(0.1+0.2, 0.3) // true
 * ```
 */
export function eq(a: number, b: number): boolean {
    return correct(a) === correct(b)
}

/**
 * Return the number of significant figures of `num`.
 * ```
 * sigfig(1.234) // 4
 * ```
 */
export function sigfig(num: number): number {
    return new Decimal(num).precision(false)
}

/**
 * Return the number of decimal places of `num`.
 * ```
 * dp(1.234) // 3
 * ```
 */
export function dp(num: number): number {
    return new Decimal(num).decimalPlaces()
}

/**
 * Return `num` rounded to `sigfig`.
 * ```
 * round(1.2345,4).off() // 1.235
 * round(1.2344,4).up() // 1.235
 * round(1.2345,4).down() // 1.234
 * ```
 */
export function round(num: number, sigfig = 3) {
    function exec(mode: Decimal.Rounding) {
        return new Decimal(num).toSignificantDigits(sigfig, mode).toNumber()
    }
    return {
        off: () => exec(Decimal.ROUND_HALF_UP),
        up: () => exec(Decimal.ROUND_UP),
        down: () => exec(Decimal.ROUND_DOWN),
    }
}

/**
 * Return `num` rounded to `dp`.
 * ```
 * fix(1.2345,3).off() // 1.235
 * fix(1.2344,3).up() // 1.235
 * fix(1.2345,3).down() // 1.234
 * ```
 */
export function fix(num: number, dp = 0) {
    function exec(mode: Decimal.Rounding) {
        return new Decimal(num)
            .toNearest(Number('1e' + String(-dp)), mode)
            .toNumber()
    }
    return {
        off: () => exec(Decimal.ROUND_HALF_UP),
        up: () => exec(Decimal.ROUND_UP),
        down: () => exec(Decimal.ROUND_DOWN),
    }
}

/**
 * Return the exponent part of `num`.
 * ```
 * e(1234) // 3
 * ```
 */
export function e(num: number): number {
    return Number(num.toExponential().split('e')[1])
}

/**
 * Return the mantissa part of `num`.
 * ```
 * mantissa(1234) // 1.234
 * ```
 */
export function mantissa(num: number): number {
    return Number(num.toExponential().split('e')[0])
}

/**
 * Return the ceil value of `num` in its order of magnitude.
 * ```
 * logCeil(1234) // 10000
 * ```
 */
export function logCeil(num: number): number {
    let exp = e(num) + 1
    return Number('1e' + exp)
}

/**
 * Return the floor value of `num` in its order of magnitude.
 * ```
 * logCeil(1234) // 1000
 * ```
 */
export function logFloor(num: number): number {
    let exp = e(num)
    return Number('1e' + exp)
}

/**
 * Return the fraction form of `num`, with max denominator 100000.
 * ```
 * toFraction(0.75) // [3,4]
 * ```
 */
export function toFraction(num: number): [numerator: number, deno: number] {
    if (num === Infinity) return [1, 0]
    if (num === -Infinity) return [-1, 0]
    let [P, Q] = new Decimal(num).toFraction(100000)
    return [P.toNumber(), Q.toNumber()]
}

/**
 * Check if `num` is rational, approximately.
 * ```
 * isRational(0.3) // true
 * isRational(Math.sqrt(2)) // false
 * ```
 */
export function isRational(num: number): boolean {
    if (num === Infinity) return false
    if (num === -Infinity) return false
    let rough = new Decimal(num).toFraction(100000).map($ => $.toNumber())
    let accurate = new Decimal(num).toFraction(10000000).map($ => $.toNumber())
    return rough[0] === accurate[0] && rough[1] === accurate[1]
}

/**
 * Return the surd in the form of [a,b] meaning a*sqrt(b).
 * ```
 * toSurd(sqrt(12)) // [2,3]
 * toSurd(-sqrt(12)) // [-2,3]
 * ```
 */
export function toSurd(num: number): [a: number, b: number] {
    num = blur(num)
    let s = Math.sign(num)
    let a = Math.abs(num)
    let square = blur(a ** 2)
    if (square === 0) return [0, 1]
    let factors: number[] = [1]

    let i = 2
    while (i <= a) {
        let s = i ** 2
        if (square % s === 0) {
            square = square / s
            factors.push(i)
        } else {
            i++
        }
    }

    let product = factors.reduce((a, b) => a * b, 1)
    return [s * product, square]
}

/**
 * Return all the primes under `max`.
 * ```
 * primes(12) // [2,3,5,7,11]
 * primes(13) // [2,3,5,7,11,13]
 * ```
 */
export function primes(max: number): number[] {
    let arr: number[] = []
    for (let i = 2; i <= max; i++) {
        if (math.isPrime(i)) arr.push(i)
    }
    return arr
}

/**
 * Return an array of ordered prime factors.
 * ```
 * primeFactors(12) // [2,2,3]
 * ```
 */
export function primeFactors(num: number): number[] {
    let arr: number[] = []
    let i = 2
    while (num > 1) {
        if (!math.isPrime(i)) {
            i++
            continue
        }
        if (num % i === 0) {
            arr.push(i)
            num = num / i
        } else {
            i++
        }
    }
    return arr
}

type Point2D = [number, number]

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
export function trace(
    func: ((t: number) => number) | ((t: number) => Point2D),
    range: [number, number],
    dots = 1000
): Point2D[] {
    function tracer(t: number): Point2D {
        let result: number | Point2D
        try {
            result = func(t)
        } catch {
            return [NaN, NaN]
        }
        if (!Array.isArray(result)) result = [t, result]
        return result
    }

    let [t1, t2] = range

    const step = (t2 - t1) / (dots - 1)
    let points: Point2D[] = []
    for (let t = t1; t <= t2; t += step) {
        points.push(tracer(t))
    }
    return points
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
export function traceCircle(
    center: Point2D,
    radius: number,
    angleRange: [number, number],
    dots = 100
): Point2D[] {
    const [h, k] = center

    function sin(degree: number): number {
        return Math.sin((degree / 180) * Math.PI)
    }

    function cos(degree: number): number {
        return Math.cos((degree / 180) * Math.PI)
    }

    return trace(
        t => [h + radius * cos(t), k + radius * sin(t)],
        angleRange,
        dots
    )
}

/**
 * Solve `[x,y]` from ax+by=c and px+qy=r.
 * ```
 * crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * crammer(1,1,3,2,2,6) // [NaN, NaN]
 * ```
 */
export function crammer(
    a: number,
    b: number,
    c: number,
    p: number,
    q: number,
    r: number
): [number, number] {
    const A = [
        [a, b],
        [p, q],
    ]
    const B = [c, r]
    if (math.det(A) === 0) return [NaN, NaN]
    return math.lusolve(A, B).flat() as [number, number]
}

export function hcf(nums: number[]): number {
    if (nums.length === 0) return NaN
    if (nums.length === 1) return nums[0]
    //@ts-ignore
    return math.gcd(...nums)
}

export function lcm(nums: number[]): number {
    if (nums.length === 0) return NaN
    if (nums.length === 1) return nums[0]
    //@ts-ignore
    return math.lcm(...nums)
}

/**
 * Return an array of integral ratio. All inputs will be forced into fraction first.
 * ```
 * [2,4,6].ratio() // [1,2,3]
 * [0,4,6].ratio() // [0,2,3]
 * [1.5,2.5,3.5].ratio() // [3,5,7]
 * ```
 */
export function toRatio(nums: number[]): number[] {
    if (_.without(nums, 0).length === 0) return [...nums]
    let fracs = nums.map(toFraction)
    let denos = fracs.map($ => $[1])
    let multiple = lcm(denos)
    let ints = nums.map($ => $ * multiple).map(blur)
    let HCF = hcf(ints)
    return ints.map($ => $ / HCF).map(blur)
}

export function median(nums: number[]): number {
    return math.median(...nums)
}

export function mode(nums: number[]): number[] {
    return math.mode(...nums)
}

export function std(nums: number[]): number {
    return math.std(nums, 'uncorrected')
}
