
/**
 * @category Utility
 * @return The HCF of nums.
 * ```
 * HCF(6,8) // 2
 * HCF(6,8,9) // 1
 * HCF(1,3) // 1
 * HCF(0.5,3) // throw
 * HCF(0,3) // throw
 * ```
 */
function HCF(...nums: number[]): number {
    nums = nums.map(ant.blur)
    return ant.hcf(...nums)
}
globalThis.HCF = contract(HCF).sign([owl.nonZeroInt])


/**
 * @category Utility
 * @return The LCM of nums.
 * ```
 * LCM(2,3) // 6
 * LCM(2,3,5) // 30
 * LCM(0.5,3) // throw
 * LCM(0,3) // throw
 * ```
 */
function LCM(...nums: number[]): number {
    nums = nums.map(ant.blur)
    return ant.lcm(...nums)
}
globalThis.LCM = contract(LCM).sign([owl.nonZeroInt])





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

