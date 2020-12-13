
/**
 * @category Utility
 * @param nums - Negative integers will be treated as positive.
 * @return The HCF of nums.
 * ```typescript
 * HCF(6,8) // 2
 * HCF(6,8,9) // 1
 * HCF(1,3) // 1
 * HCF(0.5,3) // NaN
 * HCF(0,3) // NaN
 * ```
 */
function HCF(...nums: number[]): number {
    if (!IsInteger(...nums)) return NaN
    if (!IsNonZero(...nums)) return NaN
    function _HCF(n1: number, n2: number): number {
        n1 = Math.abs(n1);
        n2 = Math.abs(n2);
        while (n1 !== n2) {
            if (n1 > n2) n1 = n1 - n2;
            if (n2 > n1) n2 = n2 - n1;
        }
        return n2;
    }
    return nums.reduce((a, v) => _HCF(a, v));
}
globalThis.HCF = HCF


/**
 * @category Utility
 * @param nums - Negative integers will be treated as positive.
 * @return The LCM of nums.
 * ```typescript
 * LCM(2,3) // return 6
 * LCM(2,3,5) // return 30
 * LCM(0.5,3) // NaN
 * LCM(0,3) // NaN
 * ```
 */
function LCM(...nums: number[]): number {
    if (!IsInteger(...nums)) return NaN
    if (!IsNonZero(...nums)) return NaN
    function _LCM(n1: number, n2: number) {
        n1 = Math.abs(n1);
        n2 = Math.abs(n2);
        return Math.abs(n1 * n2 / HCF(n1, n2));
    }
    return nums.reduce((a, v) => _LCM(a, v));
}
globalThis.LCM = LCM
