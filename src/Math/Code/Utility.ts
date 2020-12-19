
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
    nums = Blurs(nums)
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
 * LCM(2,3) // 6
 * LCM(2,3,5) // 30
 * LCM(0.5,3) // NaN
 * LCM(0,3) // NaN
 * ```
 */
function LCM(...nums: number[]): number {
    nums = Blurs(nums)
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




/**
 * @category Utility
 * @return a clone of the object
 * ```typescript
 * Clone([1,2,3]) // [1,2,3]
 * Clone({x:1}) // {x:1}
 * ```
 */
function Clone<T>(object: T): T {
    return JSON.parse(JSON.stringify(object))
}
globalThis.Clone = Clone






/**
 * @category Utility
 * @return array of combination pairs
 * ```typescript
 * Pairs(1,2,3) // [[1,2],[1,3],[2,3]]
 * Pairs(1) // []
 * ```
 */
function Pairs<T>(...items: T[]): [T, T][] {
    if (items.length <= 1) return []
    let arr: [T, T][] = []
    for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
            arr.push([items[i], items[j]])
        }
    }
    return arr
}

