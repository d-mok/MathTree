/**
* @category Text
* @return a string of joined elements. [1,2,3] --> '1, 2 and 3'
* ```
* GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
* GrammarJoin('a','b','c') // 'a, b and c'
* ```
*/
declare function GrammarJoin(...items: unknown[]): string;
/**
* @category Text
* @return '✔' or '✘'.
* ```
* Tick(true) // '✔'
* Tick(false) // '✘'
* ```
*/
declare function Tick(bool: boolean): string;
/**
* @category Text
* @return Array of '✔' or '✘'.
* ```
* Ticks(true,false) // ['✔','✘']
* ```
*/
declare function Ticks(...bools: boolean[]): string[];
/**
* @category Text
* @return a pair of latex inequalities sign array like ['\\ge', '\\le'].
* ```typescript
* IneqSign(true,true) // ['\\ge', '\\le']
* IneqSign(true,false) // ['\\gt', '\\lt']
* IneqSign(false,true) // ['\\le', '\\ge']
* IneqSign(false,false) // ['\\lt', '\\gt']
* ```
*/
declare function IneqSign(greater: boolean, equal?: boolean): [string, string];
/**
* @category Text
* @param upSign - put -ve sign on numerator instead of the front.
* @return latex of dfrac p/q like \dfrac{1}{2}.
* ```
* Dfrac(1,2) // '\\dfrac{1}{2}'
* Dfrac(1,-2) // '\\dfrac{-1}{2}'
* Dfrac(6,4) // '\\dfrac{3}{2}'
* Dfrac(6,-2) // '-3'
* Dfrac(0,2) // '0'
* Dfrac(5,0) // undefined
* ```
*/
declare function Dfrac(numerator: number, denominator: number, upSign?: boolean): string;
/**
 * @category Text
 * @return convert index katex to surd
 * ```
 * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
 * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
 * ```
 */
declare function IndexToSurd(text: string): string;
/**
 * @category Text
 * @return the coordinates '(a, b)' of point [a,b]
 * ```
 * Coord([1,2]) // '(1, 2)'
 * ```
 */
declare function Coord(point: Point): string;
/**
 * @category Text
 * @return the scientific notation of number
 * ```
 * Sci(123.45) // '1.2345 x 10^{ 2}'
 * Sci(1.2345) // '1.2345'
 * ```
 */
declare function Sci(num: number): string;
/**
 * @category Text
 * @return the katex of long division
 * ```
 * LongDivision([1,2,3,4],[1,2]) //
 * LongDivision([1,2,3,4],[1,2]) //
 * ```
 */
declare function LongDivision(dividend: number[], divisor: number[]): string;
