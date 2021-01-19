
/**
* @category Text
* @return a string of joined elements. [1,2,3] --> '1, 2 and 3'
* ```typescript
* GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
* GrammarJoin('a','b','c') // 'a, b and c'
* ```
*/
function GrammarJoin(...items: any[]): string {
    let L = items.length
    if (L === 0) return ''
    if (L === 1) return items[0]
    let arr = [];
    for (let i = 0; i < L - 1; i++) {
        arr.push(items[i]);
    }
    return arr.join(', ') + ' and ' + items[items.length - 1]
}
globalThis.GrammarJoin = GrammarJoin



/**
* @category Text
* @return '✔' or '✘'.
* ```typescript
* Tick(true) // '✔'
* Tick(false) // '✘'
* ```
*/
function Tick(bool: boolean): string {
    Should(IsBoolean(bool), 'bool must be boolean')
    return bool ? '✔' : '✘'
}
globalThis.Tick = Tick


/**
* @category Text
* @return Array of '✔' or '✘'.
* ```typescript
* Ticks(true,false) // ['✔','✘']
* ```
*/
function Ticks(...bools: boolean[]): string[] {
    Should(IsBoolean(...bools), 'bools must be boolean')
    return bools.map(x => Tick(x))
}
globalThis.Ticks = Ticks



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
    Should(IsBoolean(greater, equal), 'input must be boolean')
    if (greater && equal) { return ['\\ge', '\\le'] }
    if (greater && !equal) { return ['\\gt', '\\lt'] }
    if (!greater && equal) { return ['\\le', '\\ge'] }
    if (!greater && !equal) { return ['\\lt', '\\gt'] }
    throw 'never'
}
globalThis.IneqSign = IneqSign




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
function ParseIneqSign(text: string): IneqSign {
    Should(IsIneqSign(text), 'input is not IneqSign')
    let greater = text.includes('g') || text.includes('>')
    let equal = text.includes('e') || text.includes('=')
    return [greater, equal]
}
globalThis.ParseIneqSign = ParseIneqSign


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
function Dfrac(numerator: number, denominator: number, upSign = false): string {
    Should(IsNum(numerator, denominator), 'input must be num')
    Should(IsBoolean(upSign), 'upSign must be boolean')
    let p = numerator
    let q = denominator
    Should(q !== 0, 'denominator should not be zero')
    if (p === 0) return '0';
    [p, q] = Frac(p, q)
    if (q === 1) return p.toString()
    if (upSign) {
        return '\\dfrac{' + p + '}{' + q + '}'
    } else {
        if (p > 0) {
            return '\\dfrac{' + p + '}{' + q + '}'
        } else {
            return '-\\dfrac{' + Math.abs(p) + '}{' + q + '}'
        }
    }
}
globalThis.Dfrac = Dfrac




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
function ParseDfrac(dfrac: string): Fraction {
    const d = String.raw`-?\d+\.?\d*`
    const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
    Should(IsDfrac(dfrac), 'input is not dfrac')
    dfrac = dfrac.match(new RegExp(f, 'g'))![0]
    const matches = dfrac.match(new RegExp(d, 'g'))!
    const u = dfrac.charAt(0) === '-' ? -1 : 1
    const p = Number(matches[0]) * u
    const q = Number(matches[1])
    Should(IsNum(p, q), 'fail to parse dfrac')
    return [p, q]
}
globalThis.ParseDfrac = ParseDfrac


/**
 * @category Text
 * @return convert index katex to surd
 * ```typescript
 * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
 * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
 * ```
 */
function IndexToSurd(text: string) {
    Should(IsString(text), 'input must be string')
    return text.replace(/\{\(*([^\{\(\}\)]*)\)*\}\^\{0\.5\}/g, "\\sqrt{$1}")
}
globalThis.IndexToSurd = IndexToSurd




/**
 * @category Text
 * @return the coordinates '(a, b)' of point [a,b]
 * ```typescript
 * Coord([1,2]) // '(1, 2)'
 * ```
 */
function Coord(point: Point): string {
    Should(IsPoint(point), 'input must be point')
    return '(' + Blur(point[0]) + ', ' + Blur(point[1]) + ')'
}
globalThis.Coord = Coord


/**
 * @category Text
 * @return the scientific notation of number
 * ```typescript
 * Sci(123.45) // '1.2345 x 10^{ 2}'
 * Sci(1.2345) // '1.2345'
 * ```
 */
function Sci(num: number): string {
    Should(IsNum(num), 'input must be num')
    if (num === 0) return '0'
    let m = Magnitude(num)
    if (m === 0) return num.toString()
    num = num / (10 ** m)
    num = Blur(num)
    return num.toString() + ' \\times ' + '10^{ ' + m + '}'
}
globalThis.Sci = Sci




/**
 * @category Text
 * @return the katex of long division
 * ```typescript
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
        if (T.length > 0) T = "+" + T
        return "\\phantom{" + T + "}"
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
        let shadow = Array(dividend.length - quotient.length).fill(null)
        T = T.replace('QUOTIENT', writeSolid(quotient) + printPhantom(shadow))
        return T
    }
    return compose(dividend, divisor)
}
globalThis.LongDivision = LongDivision


