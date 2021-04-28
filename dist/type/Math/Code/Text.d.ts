/**
* @category Text
* @return a string of joined elements. [1,2,3] --> '1, 2 and 3'
* ```typescript
* GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
* GrammarJoin('a','b','c') // 'a, b and c'
* ```
*/
declare function GrammarJoin(...items: any[]): string;
/**
* @category Text
* @return '✔' or '✘'.
* ```typescript
* Tick(true) // '✔'
* Tick(false) // '✘'
* ```
*/
declare function Tick(bool: boolean): string;
/**
* @category Text
* @return Array of '✔' or '✘'.
* ```typescript
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
* @return parse an inequality sign to booleans [greater,equal]
* ```typescript
* ParseIneqSign('\\ge') // [true,true]
* ParseIneqSign('\\le') // [false,true]
* ParseIneqSign('\\gt') // [true,false]
* ParseIneqSign('\\lt') // [false,false]
* ParseIneqSign('>=') // [true,true]
* ParseIneqSign('<=') // [false,true]
* ParseIneqSign('>') // [true,false]
* ParseIneqSign('<') // [false,false]
* ParseIneqSign('abc') // throw
* ```
*/
declare function ParseIneqSign(text: string): IneqSign;
/**
* @category Text
* @param upSign - put -ve sign on numerator instead of the front.
* @return latex of dfrac p/q like \dfrac{1}{2}.
* ```typescript
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
 * @return parse a dfrac string into [p,q]
 * ```typescript
 * ParseDfrac('\\dfrac{1}{2}') // [1,2]
 * ParseDfrac('\\dfrac{1.2}{-2}') // [1.2,-2]
 * ParseDfrac('-\\dfrac{1.2}{-2}') // [-1.2,-2]
 * ParseDfrac('-\\dfrac{-1.2}{-2}') // [1.2,-2]
 * ParseDfrac('\\dfrac{x}{2}') // throw
 * ```
 */
declare function ParseDfrac(dfrac: string): Fraction;
/**
 * @category Text
 * @return convert index katex to surd
 * ```typescript
 * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
 * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
 * ```
 */
declare function IndexToSurd(text: string): string;
/**
 * @category Text
 * @return the coordinates '(a, b)' of point [a,b]
 * ```typescript
 * Coord([1,2]) // '(1, 2)'
 * ```
 */
declare function Coord(point: Point): string;
/**
 * @category Text
 * @return the scientific notation of number
 * ```typescript
 * Sci(123.45) // '1.2345 x 10^{ 2}'
 * Sci(1.2345) // '1.2345'
 * ```
 */
declare function Sci(num: number): string;
/**
 * @category Text
 * @return the katex of long division
 * ```typescript
 * LongDivision([1,2,3,4],[1,2]) //
 * LongDivision([1,2,3,4],[1,2]) //
 * ```
 */
declare function LongDivision(dividend: number[], divisor: number[]): string;
