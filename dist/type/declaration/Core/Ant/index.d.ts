/**
 * use for blurring value in-place to avoid things like 0.300000000004
 */
export declare function blur(num: number): number;
/**
 * use for bluring value for checking things like integer and equality
 * 2-digit less accurate that blur
 */
export declare function correct(num: number): number;
export declare function round(num: number, sigfig?: number): {
    off: () => number;
    up: () => number;
    down: () => number;
};
export declare function fix(num: number, dp?: number): {
    off: () => number;
    up: () => number;
    down: () => number;
};
export declare function sigfig(num: number): number;
export declare function dp(num: number): number;
export declare function hcf(...integers: number[]): number;
export declare function lcm(...integers: number[]): number;
export declare function nCr(n: number, r: number): number;
export declare function fac(n: number): number;
export declare function nPr(n: number, r: number): number;
export declare function sum(...nums: number[]): number;
export declare function mean(...nums: number[]): number;
export declare function mode(...nums: number[]): number[];
export declare function median(...nums: number[]): number;
export declare function sd(...nums: number[]): number;
/**
 * find the approximate fraction under maxDenominator
 */
export declare function nearFrac(num: number, maxDenominator?: number): Fraction;
export declare function fracable(num: number, maxDenominator?: number): boolean;
export declare function ratio<T extends number[]>(...rationals: T): T;
export declare function e(num: number): number;
export declare function mantissa(num: number): number;
export declare function logCeil(num: number): number;
export declare function logFloor(num: number): number;
