/**
 * @category Numeracy
 * @return division with x/0 handling
 * ```typescript
 * Divide(6,2) // 3
 * Divide(6,0) // throw
 * ```
 */
declare function Divide(dividend: number, divisor: number): number;
/**
 * @category Numeracy
 * @return the absolute value. Equivalent to Math.abs(x).
 * ```typescript
 * Abs(-2) // 2
 * ```
 */
declare function Abs(num: number): number;
/**
 * @category Numeracy
 * @return the sign of the number as 1,0 or -1.
 * ```typescript
 * Sign(3) // 1
 * Sign(-4.5) // -1
 * Sign(0) // 0
 * ```
 */
declare function Sign(num: number): -1 | 0 | 1;
/**
 * @category Numeracy
 * @return the number rounded off to given sigfig.
 * ```typescript
 * Round(1.23456,3) // 1.23
 * Round(1.23567,3) // 1.24
 * ```
 */
declare function Round(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded up to given sigfig.
 * ```typescript
 * RoundUp(1.23456,3) // 1.23
 * RoundUp(1.23567,1) // 2
 * ```
 */
declare function RoundUp(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded down to given sigfig.
 * ```typescript
 * RoundDown(1.23456,5) // 1.2345
 * RoundDown(1.6789,1) // 1
 * ```
 */
declare function RoundDown(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded off to given decimal place.
 * ```typescript
 * Fix(12345.678,0) // round to integer, return 12346
 * Fix(12345.678,2) // round to 2 dp, return 12345.68
 * Fix(12345.678,-2) // round to hundred, return 12300
 * ```
 */
declare function Fix(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the number rounded up to given decimal place.
 * ```typescript
 * FixUp(12.34,0) // round to integer, return 13
 * FixUp(12.34,1) // round to 1 dp, return 12.4
 * FixUp(12.34,-1) // round to ten, return 20
 * ```
 */
declare function FixUp(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the number rounded down to given decimal place.
 * ```typescript
 * FixDown(17.89,0) // round to integer, return 17
 * FixDown(17.89,1) // round to 1 dp, return 17.8
 * FixDown(17.89,-1) // round to ten, return 10
 * ```
 */
declare function FixDown(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the ceiling integer of the number.
 * ```typescript
 * Ceil(1.1) // 2
 * Ceil(-1.1) // -1
 * Ceil(2)) // 2
 * ```
 */
declare function Ceil(num: number): number;
/**
 * @category Numeracy
 * @return the floor integer of the number.
 * ```typescript
 * Floor(1.9) // 1
 * Floor(-1.9) // -2
 * Floor(2)) // 2
 * ```
 */
declare function Floor(num: number): number;
/**
 * @category Numeracy
 * @return reduce input array to simplest ratio.
 * ```typescript
 * SimpRatio(2,4,6) // [1,2,3]
 * SimpRatio(0,4,6) // [0,2,3]
 * SimpRatio(0,4) // [0,1]
 * ```
 */
declare function SimpRatio(...nums: number[]): number[];
/**
 * @category Numeracy
 * @return reduce input array to integral ratio.
 * ```typescript
 * IntegerRatio(2,4,6) // [1,2,3]
 * IntegerRatio(0,4,6) // [0,2,3]
 * IntegerRatio(0,4) // [0,1]
 * IntegerRatio(1/3,1/2,1/4) // [4,6,3]
 * IntegerRatio(Math.sqrt(2),1/2,1/4) // throw
 * ```
 */
declare function IntegerRatio(...nums: number[]): number[];
/**
 * @category Numeracy
 * @return the number of sigfig.
 * ```typescript
 * SigFig(1.234) // 4
 * SigFig(1200) // 2
 * SigFig(0.00123) // 3
 * ```
 */
declare function SigFig(value: number): number;
/**
 * @category Numeracy
 * @return count the decimal places
 * ```typescript
 * DecimalPlace(1.234) // 3
 * DecimalPlace(1200) // 0
 * DecimalPlace(0.00123) // 5
 * DecimalPlace(123.456789) // 6
 * ```
 */
declare function DecimalPlace(value: number): number;
/**
 * @category Numeracy
 * @return the order of magnitude
 * ```typescript
 * Magnitude(1) // 0
 * Magnitude(2) // 0
 * Magnitude(0.9) // -1
 * Magnitude(10) // 1
 * Magnitude(10.1) // 1
 * Magnitude(0.1) // -1
 * Magnitude(0.02) // -2
 * ```
 */
declare function Magnitude(num: number): number;
/**
 * @category Numeracy
 * @return the mantissa
 * ```typescript
 * Mantissa(1.23) // 1.23
 * Mantissa(123) // 1.23
 * Mantissa(0.123) // 1.23
 * ```
 */
declare function Mantissa(num: number): number;
/**
 * @category Numeracy
 * @return the lowest number with the next order of magnitude
 * ```typescript
 * LogCeil(5) // 10
 * LogCeil(23) // 100
 * LogCeil(0.456) // 1
 * LogCeil(0.00235) // 0.01
 * ```
 */
declare function LogCeil(num: number): number;
/**
 * @category Numeracy
 * @return the lowest number with the same order of magnitude
 * ```typescript
 * LogFloor(5) // 1
 * LogFloor(23) // 10
 * LogFloor(0.456) // 0.1
 * LogFloor(0.00235) // 0.001
 * ```
 */
declare function LogFloor(num: number): number;
/**
 * @category Numeracy
 * @return add a constant to the magnitude
 * ```typescript
 * Raise(12.34,1) // 123.4
 * Raise(12.34,-1) // 1.234
 * ```
 */
declare function Raise(num: number, add: number): number;
/**
 * @category Numeracy
 * @return correct for floating point error
 * ```typescript
 * Blur(0.1+0.2) // 0.3
 * Blur(0.81-1) // -0.19
 * Blur(1.1**2) // 1.21
 * ```
 */
declare function Blur(value: any, accuracy?: number): (typeof value);
/**
 * @category Numeracy
 * @return correct for floating point error
 * ```typescript
 * Blurs([0.1+0.2,0.81-1]) // [0.3,-0.19]
 * ```
 */
declare function Blurs(values: any[], accuracy?: number): (typeof values);
