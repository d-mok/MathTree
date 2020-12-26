
/**
 * @category Utility
 * @param nums - Negative integers will be treated as positive.
 * @return The HCF of nums.
 * ```typescript
 * HCF(6,8) // 2
 * HCF(6,8,9) // 1
 * HCF(1,3) // 1
 * HCF(0.5,3) // throw
 * HCF(0,3) // throw
 * ```
 */
function HCF(...nums: number[]): number {
    Should(IsInteger(...nums) && IsNonZero(...nums), 'input must be non-zero integer')
    nums = Blurs(nums)
    nums = nums.map(x => Abs(x))
    function _HCF(n1: number, n2: number): number {
        n1 = Abs(n1);
        n2 = Abs(n2);
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
 * LCM(0.5,3) // throw
 * LCM(0,3) // throw
 * ```
 */
function LCM(...nums: number[]): number {
    Should(IsInteger(...nums) && IsNonZero(...nums), 'input must be non-zero integer')
    nums = Blurs(nums)
    function _LCM(n1: number, n2: number) {
        n1 = Abs(n1);
        n2 = Abs(n2);
        return Abs(n1 * n2 / HCF(n1, n2));
    }
    return nums.reduce((a, v) => _LCM(a, v));
}
globalThis.LCM = LCM





/**
 * @category Utility
 * @param num - from 1 to 10
 * @return roman number
 * ```typescript
 * Romanize(1) // "I"
 * Romanize(2) // "II"
 * ```
 */
function Romanize(num: number): string {
    Should(IsNum(num), 'input must be number')
    Should(num > 0 && num <= 10, 'input must be 1-10')
    return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][num - 1]
}
globalThis.Romanize = Romanize




/**
 * @category Utility
 * @param roman - from I to X
 * @return arabic number
 * ```typescript
 * DeRomanize("I") // 1
 * DeRomanize("II") // 2
 * ```
 */
function DeRomanize(roman: string): number {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
    Should(IsString(roman), 'input must be string')
    Should(romans.includes(roman), 'roman out of range')
    return romans.indexOf(roman) + 1
}
globalThis.DeRomanize = DeRomanize



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
globalThis.Pairs = Pairs


/**
 * @category Utility
 * @return check if every pairs satisfy the predicate
 * ```typescript
 * PairsEvery(AreDistinct)(1,2,3) // true
 * ```
 */
function PairsEvery<T>(predicate: (x: T, y: T) => boolean) {
    return function (...items: T[]): boolean {
        return Pairs(...items).every(p => predicate(p[0], p[1]))
    }
}
globalThis.PairsEvery = PairsEvery




/**
 * @category Utility
 * @param arr - array to dedupe
 * @param keyFunc - map item to this value to compare equality
 * @return Deduped array
 * ```typescript
 * Dedupe([1, 2, 3, 3, 4, 5, 5, 5, 6] // [1, 2, 3, 4, 5, 6]
 * Dedupe([[1, 2], [1, 2], [1, 3]]) // [[1, 2], [1, 3]]
 * ```
 */
function Dedupe<T>(arr: T[]): T[] {
    let newArr: T[] = []
    function exist(item: T): boolean {
        let k = JSON.stringify(item)
        for (let t of newArr) {
            if (k === JSON.stringify(t)) return true
        }
        return false
    }
    for (let item of arr) {
        if (!exist(item)) newArr.push(item)
    }
    return newArr
}
globalThis.Dedupe = Dedupe
