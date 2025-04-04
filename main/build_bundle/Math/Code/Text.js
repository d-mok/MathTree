/**
 * a string of joined elements. [1,2,3] --> '1, 2 and 3'
 * ```
 * GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
 * GrammarJoin('a','b','c') // 'a, b and c'
 * ```
 */
export function GrammarJoin(...items) {
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
/**
 * @deprecated use symbol printing instead!!!
 * a pair of latex inequalities sign array like ['\\ge', '\\le'].
 * ```typescript
 * IneqSign(true,true) // ['\\ge', '\\le']
 * IneqSign(true,false) // ['\\gt', '\\lt']
 * IneqSign(false,true) // ['\\le', '\\ge']
 * IneqSign(false,false) // ['\\lt', '\\gt']
 * ```
 */
export function IneqSign(greater, equal = false) {
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
/**
 * @deprecated
 * @param upSign - put -ve sign on numerator instead of the front.
 * latex of dfrac p/q like \dfrac{1}{2}.
 * ```
 * Dfrac(1,2) // '\\dfrac{1}{2}'
 * Dfrac(1,-2) // '\\dfrac{-1}{2}'
 * Dfrac(6,4) // '\\dfrac{3}{2}'
 * Dfrac(6,-2) // '-3'
 * Dfrac(0,2) // '0'
 * Dfrac(5,0) // undefined
 * ```
 */
export function Dfrac(numerator, denominator, upSign = false) {
    return ink.printDfrac(numerator, denominator, upSign);
}
/**
 * convert index katex to surd
 * ```
 * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
 * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
 * ```
 */
export function IndexToSurd(text) {
    return text.replace(/\{\(*([^\{\(\}\)]*)\)*\}\^\{0\.5\}/g, '\\sqrt{$1}');
}
/**
 * @deprecated
 * the coordinates '(a, b)' of point [a,b]
 * ```
 * Coord([1,2]) // '(1, 2)'
 * ```
 */
export function Coord(point, dp = 1) {
    let [a, b] = point.map($ => $.blur());
    a = Fix(a, dp);
    b = Fix(b, dp);
    return '(' + a + ', ' + b + ')';
}
/**
 * @deprecated
 * the scientific notation of number
 * ```
 * Sci(123.45) // '1.2345 x 10^{ 2}'
 * Sci(1.2345) // '1.2345'
 * ```
 */
export function Sci(num) {
    if (num === 0)
        return '0';
    let m = num.blur().exponent();
    if (m === 0)
        return num.toString();
    num = num / 10 ** m;
    num = num.blur();
    return num.toString() + ' \\times ' + '10^{ ' + m + '}';
}
/**
 * the katex of long division
 * ```
 * LongDivision([1,2,3,4],[1,2]) //
 * LongDivision([1,2,3,4],[1,2]) //
 * ```
 */
export function LongDivision(dividend, divisor) {
    dividend = dividend.reverse();
    divisor = divisor.reverse();
    function xTerm(power) {
        if (power === 0)
            return '';
        if (power === 1)
            return 'x';
        return 'x^' + power;
    }
    function printSolid(poly) {
        let arr = [];
        poly.forEach((v, i) => {
            if (v !== null)
                arr.push(v + xTerm(i));
        });
        return arr.reverse().join('+');
    }
    function printUnderline(poly) {
        return '\\underline{' + printSolid(poly) + '}';
    }
    function printPhantom(poly) {
        let arr = [];
        poly.forEach((v, i) => {
            if (v === null)
                arr.push(dividend[i] + xTerm(i));
        });
        let T = arr.reverse().join('+');
        if (T.length === 0)
            return '';
        return '\\phantom{' + '+' + T + '}';
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
        let T = '\\begin{array}{r}';
        T += 'QUOTIENT \\\\';
        T += writeSolid(divisor);
        T += '{\\overline{\\smash{\\big)}';
        T += writeSolid(dividend);
        T += '}}\\\\';
        let current = dividend;
        let quotient = [];
        while (true) {
            let { next, nextPrint, under, q } = step(current, divisor);
            T += writeUnderline(under) + '\\\\';
            T += writeSolid(nextPrint) + '\\\\';
            current = next;
            quotient.push(q);
            if (current.length < divisor.length)
                break;
        }
        T += '\\end{array}';
        quotient.reverse();
        T = T.replace('QUOTIENT', writeSolid(quotient));
        return T;
    }
    return compose(dividend, divisor);
}
/**
 * the representation of num in base b
 * ```
 * ToBase(1000,16) // '3E8_{16}'
 * ToBase(13,2) // '1101_{2}'
 * ```
 */
export function ToBase(num, base) {
    return (num
        .toString(base)
        .toUpperCase()
        .split('')
        .map($ => '{' + $ + '}')
        .join('') +
        '_{' +
        base +
        '}');
}
/**
 * a prime factorization layout for HCF or LCM
 * ```
 * PrimeFactorize({
 *  'number': [30, 15, 12],
 *   a: [3, 0, 5],
 *   b: [5, 6, 1],
 *   '(x+1)': [8, 7, 5]
 * },
 * {hcf:true,lcm:true,multiply:!true}
 * )
 * ```
 */
export function PrimeFactorize(val, { hcf = false, lcm = false, multiply = false }) {
    let T = '\\begin{matrix} ';
    let keys = Object.keys(val);
    let n = val[keys[0]].length;
    let flagFirst = true;
    function add(variable, power) {
        let blank = multiply && variable !== keys[0];
        let s = !blank ? '&' : flagFirst ? '& &' : '& \\times &';
        if (power > 1) {
            T += s + variable + '^{' + power + '}';
        }
        else if (power === 1) {
            T += s + variable;
        }
        else {
            T += blank ? '& &' : ' & ';
        }
        if (power > 0)
            flagFirst = false;
    }
    for (let i = 0; i < n; i++) {
        flagFirst = true;
        T += ' & ';
        if (keys.includes('number'))
            T += ' & ' + val.number[i];
        for (let k of keys) {
            if (k === 'number')
                continue;
            add(k, val[k][i]);
        }
        T += ' \\\\ ';
    }
    T += '\\hline';
    if (hcf) {
        flagFirst = true;
        T += ' \\text{HCF} & = ';
        if (keys.includes('number'))
            T += ' & ' + HCF(...val.number);
        for (let k of keys) {
            if (k === 'number')
                continue;
            add(k, Min(...val[k]));
        }
        T += ' \\\\ ';
    }
    if (lcm) {
        flagFirst = true;
        T += ' \\text{LCM} & = ';
        if (keys.includes('number'))
            T += ' & ' + LCM(...val.number);
        for (let k of keys) {
            if (k === 'number')
                continue;
            add(k, Max(...val[k]));
        }
        T += ' \\\\ ';
    }
    T += '\\end{matrix}';
    return T;
}
/**
 * the latex representing the `constraint`
 * ```
 * ConstraintText([1,2,'<',3],true,'h','k') // 'h+2k<3'
 * ConstraintText([1,2,'<',3],false) // 'x+2y>3'
 * ConstraintText([1,2,'<',3],null) // 'x+2y=3'
 * ```
 */
export function ConstraintText(constraint, sign = true, xReplace = 'x', yReplace = 'y') {
    if (sign === false)
        constraint = rein.flip(constraint);
    let T = ink.printConstraint(constraint, false, sign === null);
    T = T.replace(/x/g, xReplace);
    T = T.replace(/y/g, yReplace);
    return T;
}
