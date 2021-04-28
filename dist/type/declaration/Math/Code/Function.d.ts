/**
 * @category Function
 * @return log(b,N)
 * ```typescript
 * log(2,8) // 3
 * ```
 */
declare function log(b: number, N: number): number;
/**
 * @category Function
 * @return a**b, a to the power of b.
 * ```typescript
 * Power(2,3) // 8
 * ```
 */
declare function Power(a: number, b: number): number;
/**
 * @category Function
 * @return square root of x
 * ```typescript
 * Sqrt(4) // 2
 * ```
 */
declare function Sqrt(x: number): number;
/**
 * @category Function
 * @return the radian of the degree
 * ```typescript
 * Radian(180) // pi
 * Radian(90) // pi/2
 * Radian(30) // PI/6
 * ```
 */
declare function Radian(degree: number): number;
/**
 * @category Function
 * @return the degree of the radian
 * ```typescript
 * Degree(Math.PI) // 180
 * Degree(Math.PI/2) // 90
 * Degree(Math.PI/6) // 30
 * ```
 */
declare function Degree(radian: number): number;
/**
 * @category Function
 * @return sin(x).
 * ```typescript
 * sin(30) // 0.5
 * ```
 */
declare function sin(x: number): number;
/**
 * @category Function
 * @return cos(x).
 * ```typescript
 * cos(60) // 0.5
 * ```
 */
declare function cos(x: number): number;
/**
 * @category Function
 * @return tan(x).
 * ```typescript
 * tan(45) // 1
 * ```
 */
declare function tan(x: number): number;
/**
 * @category Function
 * @return arcsin(x) between -90 and 90.
 * ```typescript
 * arcsin(0.5) // 30
 * ```
 */
declare function arcsin(x: number): number;
/**
 * @category Function
 * @return arccos(x) between 0 and 180.
 * ```typescript
 * arccos(0.5) // 60
 * ```
 */
declare function arccos(x: number): number;
/**
 * @category Function
 * @return arctan(x) between -90 and 90.
 * ```typescript
 * arctan(1) // 45
 * ```
 */
declare function arctan(x: number): number;
