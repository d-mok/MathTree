"use strict";
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
function HCF(...nums) {
    nums = nums.map(ant.blur);
    return ant.hcf(...nums);
}
globalThis.HCF = contract(HCF).sign([owl.nonZeroInt]);
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
function LCM(...nums) {
    nums = nums.map(ant.blur);
    return ant.lcm(...nums);
}
globalThis.LCM = contract(LCM).sign([owl.nonZeroInt]);
/**
 * @category Utility
 * @param num - from 1 to 10
 * @return roman number
 * ```
 * Romanize(1) // "I"
 * Romanize(2) // "II"
 * ```
 */
function Romanize(num) {
    return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][num - 1];
}
globalThis.Romanize = contract(Romanize).sign([[owl.positiveInt, owl.between(1, 10)]]);
/**
 * @category Utility
 * @param roman - from I to X
 * @return arabic number
 * ```
 * DeRomanize("I") // 1
 * DeRomanize("II") // 2
 * ```
 */
function DeRomanize(roman) {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return romans.indexOf(roman) + 1;
}
globalThis.DeRomanize = contract(DeRomanize).sign([owl.roman]);
