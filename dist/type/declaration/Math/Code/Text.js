"use strict";
/**
* @category Text
* @return a string of joined elements. [1,2,3] --> '1, 2 and 3'
* ```
* GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
* GrammarJoin('a','b','c') // 'a, b and c'
* ```
*/
function GrammarJoin(...items) {
    let L = items.length;
    if (L === 0)
        return '';
    if (L === 1)
        return String(items[0]);
    let arr = [];
    for (let i = 0; i < L - 1; i++) {
        arr.push(items[i]);
    }
    return arr.join(', ') + ' and ' + items[items.length - 1];
}
globalThis.GrammarJoin = GrammarJoin;
/**
* @category Text
* @return '✔' or '✘'.
* ```
* Tick(true) // '✔'
* Tick(false) // '✘'
* ```
*/
function Tick(bool) {
    return bool ? '✔' : '✘';
}
globalThis.Tick = contract(Tick).sign([owl.bool]);
/**
* @category Text
* @return Array of '✔' or '✘'.
* ```
* Ticks(true,false) // ['✔','✘']
* ```
*/
function Ticks(...bools) {
    return bools.map(x => Tick(x));
}
globalThis.Ticks = contract(Ticks).sign([owl.bool]);
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
function IneqSign(greater, equal = false) {
    if (greater && equal) {
        return ['\\ge', '\\le'];
    }
    if (greater && !equal) {
        return ['\\gt', '\\lt'];
    }
    if (!greater && equal) {
        return ['\\le', '\\ge'];
    }
    if (!greater && !equal) {
        return ['\\lt', '\\gt'];
    }
    throw 'never';
}
globalThis.IneqSign = contract(IneqSign).sign([owl.bool, owl.bool]);
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
function Dfrac(numerator, denominator, upSign = false) {
    return ink.printDfrac(numerator, denominator, upSign);
}
globalThis.Dfrac = contract(Dfrac).sign([owl.num, owl.nonZero, owl.bool]);
/**
 * @category Text
 * @return convert index katex to surd
 * ```
 * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
 * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
 * ```
 */
function IndexToSurd(text) {
    return text.replace(/\{\(*([^\{\(\}\)]*)\)*\}\^\{0\.5\}/g, "\\sqrt{$1}");
}
globalThis.IndexToSurd = contract(IndexToSurd).sign([owl.str]);
/**
 * @category Text
 * @return the coordinates '(a, b)' of point [a,b]
 * ```
 * Coord([1,2]) // '(1, 2)'
 * ```
 */
function Coord(point) {
    return '(' + ant.blur(point[0]) + ', ' + ant.blur(point[1]) + ')';
}
globalThis.Coord = contract(Coord).sign([owl.point]);
/**
 * @category Text
 * @return the scientific notation of number
 * ```
 * Sci(123.45) // '1.2345 x 10^{ 2}'
 * Sci(1.2345) // '1.2345'
 * ```
 */
function Sci(num) {
    if (num === 0)
        return '0';
    let m = ant.e(ant.blur(num));
    if (m === 0)
        return num.toString();
    num = num / (Math.pow(10, m));
    num = ant.blur(num);
    return num.toString() + ' \\times ' + '10^{ ' + m + '}';
}
globalThis.Sci = contract(Sci).sign([owl.num]);
/**
 * @category Text
 * @return the katex of long division
 * ```
 * LongDivision([1,2,3,4],[1,2]) //
 * LongDivision([1,2,3,4],[1,2]) //
 * ```
 */
function LongDivision(dividend, divisor) {
    dividend = dividend.reverse();
    divisor = divisor.reverse();
    function xTerm(power) {
        if (power === 0)
            return "";
        if (power === 1)
            return "x";
        return "x^" + power;
    }
    function printSolid(poly) {
        let arr = [];
        poly.forEach((v, i) => {
            if (v !== null)
                arr.push(v + xTerm(i));
        });
        return arr.reverse().join("+");
    }
    function printUnderline(poly) {
        return "\\underline{" + printSolid(poly) + "}";
    }
    function printPhantom(poly) {
        let arr = [];
        poly.forEach((v, i) => {
            if (v === null)
                arr.push(dividend[i] + xTerm(i));
        });
        let T = arr.reverse().join("+");
        if (T.length === 0)
            return "";
        return "\\phantom{" + "+" + T + "}";
    }
    function writeSolid(poly) {
        return printSolid(poly) + printPhantom(poly);
    }
    function writeUnderline(poly) {
        return printUnderline(poly) + printPhantom(poly);
    }
    function pushDivide(dividend, divisor) {
        let t1 = dividend[dividend.length - 1];
        let t2 = divisor[divisor.length - 1];
        return t1 / t2;
    }
    function step(current, divisor) {
        let q = pushDivide(current, divisor);
        let under = divisor.map(x => x * q);
        for (let i = 1; i <= current.length - divisor.length; i++)
            under.unshift(null);
        let next = [];
        for (let i = 0; i < current.length - 1; i++)
            next.push(current[i] - Number(under[i]));
        let nextPrint = [...next].reverse();
        for (let i = 0; i < nextPrint.length; i++)
            if (i > divisor.length - 1)
                nextPrint[i] = null;
        nextPrint.reverse();
        return { next, nextPrint, under, q };
    }
    function compose(dividend, divisor) {
        let T = "\\begin{array}{r}";
        T += "QUOTIENT \\\\";
        T += writeSolid(divisor);
        T += "{\\overline{\\smash{\\big)}";
        T += writeSolid(dividend);
        T += "}}\\\\";
        let current = dividend;
        let quotient = [];
        while (true) {
            let { next, nextPrint, under, q } = step(current, divisor);
            T += writeUnderline(under) + "\\\\";
            T += writeSolid(nextPrint) + "\\\\";
            current = next;
            quotient.push(q);
            if (current.length < divisor.length)
                break;
        }
        T += "\\end{array}";
        quotient.reverse();
        T = T.replace('QUOTIENT', writeSolid(quotient));
        return T;
    }
    return compose(dividend, divisor);
}
globalThis.LongDivision = contract(LongDivision).sign([owl.ntuple, owl.ntuple]);