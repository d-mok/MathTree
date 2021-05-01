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
declare function HCF(...nums: number[]): number;
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
declare function LCM(...nums: number[]): number;
/**
 * @category Utility
 * @param num - from 1 to 10
 * @return roman number
 * ```typescript
 * Romanize(1) // "I"
 * Romanize(2) // "II"
 * ```
 */
declare function Romanize(num: number): string;
/**
 * @category Utility
 * @param roman - from I to X
 * @return arabic number
 * ```typescript
 * DeRomanize("I") // 1
 * DeRomanize("II") // 2
 * ```
 */
declare function DeRomanize(roman: string): number;
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
declare function Dedupe<T>(arr: T[]): T[];
