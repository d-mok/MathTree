
/**
 * @category Utility
 * @param nums - Find HCF of these numbers. Negative integers will be treated as positive.
 * @return The HCF. If any input is non-integer, return 1.
 * ```typescript
 * HCF(6,8) // return 2
 * HCF(6,8,9) // return 1
 * ```
 */
function HCF(...nums: number[]): number {
    function _HCF(n1: number, n2: number): number {
        if (!IsInteger(n1, n2)) { return 1; }
        n1 = Math.abs(n1);
        n2 = Math.abs(n2);
        if (n1 == 0 || n2 == 0) return 0;
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
 * @param nums - Find LCM of these numbers. Negative integers will be treated as positive.
 * @return The LCM. If any input is non-integer, return the product of the inputs.
 * ```typescript
 * LCM(2,3) // return 6
 * LCM(2,3,5) // return 30
 * ```
 */
function LCM(...nums: number[]): number {
    if (!IsInteger(...nums))
        return nums.reduce((a, b) => a * b)
    function _LCM(n1: number, n2: number) {
        n1 = Math.abs(n1);
        n2 = Math.abs(n2);
        return Math.abs(n1 * n2 / HCF(n1, n2));
    }
    return nums.reduce((a, v) => _LCM(a, v));
}
globalThis.LCM = LCM
