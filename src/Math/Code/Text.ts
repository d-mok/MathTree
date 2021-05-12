
/**
* @category Text
* @return a string of joined elements. [1,2,3] --> '1, 2 and 3'
* ```
* GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
* GrammarJoin('a','b','c') // 'a, b and c'
* ```
*/
function GrammarJoin(...items: unknown[]): string {
    let L = items.length
    if (L === 0) return ''
    if (L === 1) return String(items[0])
    let arr = [];
    for (let i = 0; i < L - 1; i++) {
        arr.push(items[i]);
    }
    return arr.join(', ') + ' and ' + items[items.length - 1]
}
globalThis.GrammarJoin = GrammarJoin



/**
* @category Text
* @deprecated
* @return '✔' or '✘'.
* ```
* Tick(true) // '✔'
* Tick(false) // '✘'
* ```
*/
function Tick(bool: boolean): string {
    return bool ? '✔' : '✘'
}
globalThis.Tick = contract(Tick).sign([owl.bool])


/**
* @category Text
* @deprecated
* @return Array of '✔' or '✘'.
* ```
* Ticks(true,false) // ['✔','✘']
* ```
*/
function Ticks(...bools: boolean[]): string[] {
    return bools.map(x => Tick(x))
}
globalThis.Ticks = contract(Ticks).sign([owl.bool])



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
function IneqSign(greater: boolean, equal: boolean = false): [string, string] {
    if (greater && equal) { return ['\\ge', '\\le'] }
    if (greater && !equal) { return ['\\gt', '\\lt'] }
    if (!greater && equal) { return ['\\le', '\\ge'] }
    if (!greater && !equal) { return ['\\lt', '\\gt'] }
    throw 'never'
}
globalThis.IneqSign = contract(IneqSign).sign([owl.bool, owl.bool])




/**
* @category Text
* @deprecated
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
function Dfrac(numerator: number, denominator: number, upSign = false): string {
    return ink.printDfrac(numerator, denominator, upSign)
}
globalThis.Dfrac = contract(Dfrac).sign([owl.num, owl.nonZero, owl.bool])




/**
 * @category Text
 * @return convert index katex to surd
 * ```
 * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
 * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
 * ```
 */
function IndexToSurd(text: string) {
    return text.replace(/\{\(*([^\{\(\}\)]*)\)*\}\^\{0\.5\}/g, "\\sqrt{$1}")
}
globalThis.IndexToSurd = contract(IndexToSurd).sign([owl.str])






/**
 * @category Text
 * @deprecated
 * @return the coordinates '(a, b)' of point [a,b]
 * ```
 * Coord([1,2]) // '(1, 2)'
 * ```
 */
function Coord(point: Point): string {
    return '(' + ant.blur(point[0]) + ', ' + ant.blur(point[1]) + ')'
}
globalThis.Coord = contract(Coord).sign([owl.point])



/**
 * @category Text
 * @return the scientific notation of number
 * ```
 * Sci(123.45) // '1.2345 x 10^{ 2}'
 * Sci(1.2345) // '1.2345'
 * ```
 */
function Sci(num: number): string {
    if (num === 0) return '0'
    let m = ant.e(ant.blur(num))
    if (m === 0) return num.toString()
    num = num / (10 ** m)
    num = ant.blur(num)
    return num.toString() + ' \\times ' + '10^{ ' + m + '}'
}
globalThis.Sci = contract(Sci).sign([owl.num])





/**
 * @category Text
 * @return the katex of long division
 * ```
 * LongDivision([1,2,3,4],[1,2]) //
 * LongDivision([1,2,3,4],[1,2]) //
 * ```
 */
function LongDivision(dividend: number[], divisor: number[]): string {

    dividend = dividend.reverse()
    divisor = divisor.reverse()

    function xTerm(power: number): string {
        if (power === 0) return ""
        if (power === 1) return "x"
        return "x^" + power
    }

    function printSolid(poly: (number | null)[]) {
        let arr: string[] = []
        poly.forEach((v, i) => {
            if (v !== null) arr.push(v + xTerm(i))
        })
        return arr.reverse().join("+")
    }

    function printUnderline(poly: (number | null)[]) {
        return "\\underline{" + printSolid(poly) + "}"
    }

    function printPhantom(poly: (number | null)[]) {
        let arr: string[] = []
        poly.forEach((v, i) => {
            if (v === null) arr.push(dividend[i] + xTerm(i))
        })
        let T = arr.reverse().join("+")
        if (T.length === 0) return ""
        return "\\phantom{" + "+" + T + "}"
    }

    function writeSolid(poly: (number | null)[]) {
        return printSolid(poly) + printPhantom(poly)
    }

    function writeUnderline(poly: (number | null)[]) {
        return printUnderline(poly) + printPhantom(poly)
    }

    function pushDivide(dividend: number[], divisor: number[]) {
        let t1 = dividend[dividend.length - 1]
        let t2 = divisor[divisor.length - 1]
        return t1 / t2
    }

    function step(current: number[], divisor: number[]) {
        let q = pushDivide(current, divisor)
        let under: (number | null)[] = divisor.map(x => x * q)
        for (let i = 1; i <= current.length - divisor.length; i++)
            under.unshift(null)
        let next: number[] = []
        for (let i = 0; i < current.length - 1; i++)
            next.push(current[i] - Number(under[i]))
        let nextPrint: (number | null)[] = [...next].reverse()
        for (let i = 0; i < nextPrint.length; i++)
            if (i > divisor.length - 1) nextPrint[i] = null
        nextPrint.reverse()
        return { next, nextPrint, under, q }
    }

    function compose(dividend: number[], divisor: number[]) {
        let T = "\\begin{array}{r}"
        T += "QUOTIENT \\\\"
        T += writeSolid(divisor)
        T += "{\\overline{\\smash{\\big)}"
        T += writeSolid(dividend)
        T += "}}\\\\"
        let current: number[] = dividend
        let quotient = []

        while (true) {
            let { next, nextPrint, under, q } = step(current, divisor)
            T += writeUnderline(under) + "\\\\"
            T += writeSolid(nextPrint) + "\\\\"
            current = next
            quotient.push(q)
            if (current.length < divisor.length) break
        }
        T += "\\end{array}"
        quotient.reverse()
        T = T.replace('QUOTIENT', writeSolid(quotient))
        return T
    }
    return compose(dividend, divisor)
}
globalThis.LongDivision = contract(LongDivision).sign([owl.ntuple, owl.ntuple])




/**
 * @category Text
 * @param num - from 1 to 10
 * @return roman number
 * ```
 * Roman(1) // "I"
 * Roman(2) // "II"
 * ```
 */
 function Roman(num: number): string {
    return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][num - 1]
}
globalThis.Roman = contract(Roman).sign([[owl.positiveInt, owl.between(1, 10)]])




/**
 * @category Text
 * @param roman - from I to X
 * @return arabic number
 * ```
 * DeRoman("I") // 1
 * DeRoman("II") // 2
 * ```
 */
function DeRoman(roman: string): number {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
    return romans.indexOf(roman) + 1
}
globalThis.DeRoman = contract(DeRoman).sign([owl.roman])


