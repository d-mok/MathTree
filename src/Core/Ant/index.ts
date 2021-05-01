import { Decimal } from 'decimal.js';

import { gcd, lcm as math_lcm, combinations, factorial, permutations, sum as math_sum, mean as math_mean, mode as math_mode, median as math_median, std } from 'mathjs'


const STANDARD_SIGFIG = 12

/**
 * use for blurring value in-place to avoid things like 0.300000000004
 */
export function blur(num: number): number {
    return parseFloat(num.toPrecision(STANDARD_SIGFIG));
}

/**
 * use for bluring value for checking things like integer and equality
 * 2-digit less accurate that blur
 */
export function correct(num: number): number {
    return parseFloat(num.toPrecision(STANDARD_SIGFIG - 2));
}

export function round(num: number, sigfig = 3) {
    const exec = (mode: Decimal.Rounding) =>
        (new Decimal(num))
            .toSignificantDigits(sigfig, mode)
            .toNumber()
    return {
        off: () => exec(Decimal.ROUND_HALF_UP),
        up: () => exec(Decimal.ROUND_UP),
        down: () => exec(Decimal.ROUND_DOWN),
    }
}


export function fix(num: number, dp = 0) {
    const exec = (mode: Decimal.Rounding) =>
        (new Decimal(num))
            .toNearest(Number('1e' + String(-dp)), mode)
            .toNumber()
    return {
        off: () => exec(Decimal.ROUND_HALF_UP),
        up: () => exec(Decimal.ROUND_UP),
        down: () => exec(Decimal.ROUND_DOWN),
    }
}



export function sigfig(num: number): number {
    return (new Decimal(num)).precision(false)
};


export function dp(num: number): number {
    return (new Decimal(num)).decimalPlaces()
};


export function hcf(...integers: number[]): number {
    return gcd(...integers)
}


export function lcm(...integers: number[]): number {
    // wrong @type file
    // @ts-ignore
    return math_lcm(...integers)
}



export function nCr(n: number, r: number): number {
    return combinations(n, r)
}

export function fac(n: number): number {
    return factorial(n)
}

export function nPr(n: number, r: number): number {
    return permutations(n, r)
}

export function sum(...nums: number[]): number {
    if (nums.length === 0) return 0
    return math_sum(...nums)
}


export function mean(...nums: number[]): number {
    return math_mean(...nums)
}

export function mode(...nums: number[]): number[] {
    return math_mode(...nums)
}


export function median(...nums: number[]): number {
    return math_median(...nums)
}

export function sd(...nums: number[]): number {
    return std(nums, 'uncorrected')
}

/**
 * find the approximate fraction under maxDenominator
 */
export function nearFrac(num: number, maxDenominator = 1000): Fraction {
    let f = (new Decimal(num)).toFraction(maxDenominator)
    return [f[0].toNumber(), f[1].toNumber()]
}

export function fracable(num: number, maxDenominator = 1000): boolean {
    let [p, q] = nearFrac(num, maxDenominator)
    return correct(num * q) === p
}


export function ratio<T extends number[]>(...rationals: T): T {
    if (rationals.some(owl.irrational))
        throw new Blood('Ant', 'ratio only accept rationals')
    let fs = rationals.map(_ => nearFrac(_))
    let qs = fs.map(_ => _[1])
    let l = lcm(...qs)
    let ns = rationals.map(_ => _ * l).map(blur)
    let h = hcf(...ns)
    ns = ns.map(_ => _ / h)
    return ns.map(blur) as T
}


export function e(num: number): number {
    return Number(num.toExponential().split('e')[1])
}

export function mantissa(num: number): number {
    return Number(num.toExponential().split('e')[0])
}

export function logCeil(num: number): number {
    let exp = e(num) + 1
    return Number('1e' + exp)
}

export function logFloor(num: number): number {
    let exp = e(num)
    return Number('1e' + exp)
}