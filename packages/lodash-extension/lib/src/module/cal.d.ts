declare function blur(num: number): number;
declare function hcf(nums: number[]): number;
declare function lcm(nums: number[]): number;
declare function toFraction(num: number): [numerator: number, deno: number];
/**
 * Return an array of integral ratio. All inputs will be forced into fraction first.
 * ```
 * [2,4,6].ratio() // [1,2,3]
 * [0,4,6].ratio() // [0,2,3]
 * [1.5,2.5,3.5].ratio() // [3,5,7]
 * ```
 */
declare function toIntRatio(nums: number[]): number[];
declare module 'lodash' {
    interface LoDashStatic {
        blur: typeof blur;
        hcf: typeof hcf;
        lcm: typeof lcm;
        toFraction: typeof toFraction;
        toIntRatio: typeof toIntRatio;
    }
}
export {};
//# sourceMappingURL=cal.d.ts.map