export function printDfrac(numerator, denominator, upSign = false) {
    let p = numerator;
    let q = denominator;
    if (p === 0)
        return '0';
    [p, q] = Math.fraction(p / q);
    if (q === 1)
        return p.toString();
    if (upSign) {
        return '\\dfrac{' + p + '}{' + q + '}';
    }
    else {
        return p > 0
            ? '\\dfrac{' + p + '}{' + q + '}'
            : '-\\dfrac{' + Math.abs(p) + '}{' + q + '}';
    }
}
export function printCombo(combo) {
    let [a, b, c] = combo;
    if (a && b && c)
        return 'I, II and III';
    if (a && b && !c)
        return 'I and II only';
    if (a && !b && c)
        return 'I and III only';
    if (a && !b && !c)
        return 'I only';
    if (!a && b && c)
        return 'II and III only';
    if (!a && b && !c)
        return 'II only';
    if (!a && !b && c)
        return 'III only';
    if (!a && !b && !c)
        return 'None of the above';
    throw 'never';
}
export function printTrigValue(T) {
    if (typeof T[1] === 'number') {
        return '\\' + T[0] + ' ' + T[1] + '°';
    }
    else {
        return '\\' + T[0] + ' ' + T[1];
    }
}
export function printTrigExp(T) {
    return '\\' + T[0] + '(' + T[1] + '°' + (T[2] > 0 ? '+' : '-') + T[3] + ')';
}
export function printOrTrigRoots(roots) {
    let ss = roots.map(x => Round(x, 5)).map(x => x + '°');
    if (ss.length === 0)
        return 'no solution';
    if (ss.length === 1)
        return ss[0];
    let last = ss.pop();
    return ss.join(',') + '~\\text{or}~' + last;
}
export function printSurd(num) {
    let [p, q] = cal.toSurd(num);
    let T;
    if (p === 1) {
        T = q === 1 ? '1' : '\\sqrt{' + q + '}';
    }
    else if (p === -1) {
        T = q === 1 ? '-1' : '-\\sqrt{' + q + '}';
    }
    else {
        T = q === 1 ? p.toString() : p + '\\sqrt{' + q + '}';
    }
    return T;
}
export function printPointPolar(point) {
    let [r, q] = RectToPol(point);
    return `(${printSurd(r)},${q.blur()}°)`;
}
export function printConstraint(con, align = false, replaceEqual = false) {
    let [a, b, i, c] = con;
    let j = INEQUAL.print(i);
    if (replaceEqual)
        j = '=';
    if (align)
        j = ' & ' + j;
    if (a === 0 && b === 0)
        return ` 0 ${j} ${c} `;
    if (a !== 0 && b === 0)
        return ` ${a}x ${j} ${c} `;
    if (a === 0 && b !== 0)
        return ` ${b}y ${j} ${c} `;
    return ` ${a}x + ${b}y ${j} ${c} `;
}
export function printConstraints(cons) {
    let T = '';
    T += ' \\left\\{ \\begin{aligned} ';
    for (let c of cons) {
        T += printConstraint(c, true) + ' \\\\ ';
    }
    T += ' \\end{aligned} \\right. ';
    return T;
}
export function printPrimeFactors(num) {
    if (num === 1)
        return String(1);
    let factors = PrimeFactors(num);
    const primes = [...new Set(factors)];
    return primes
        .map(p => [p, Freq(factors, p)])
        .map(([p, n]) => p + '^{' + n + '}')
        .join(' \\times ');
}
export function printMonomial(mono, fraction) {
    let keys = Object.keys(mono).filter($ => $ !== 'coeff');
    keys.sort();
    let vars = keys.map($ => ({ name: $, power: mono[$] }));
    let coeff = mono.coeff;
    if (!fraction) {
        let T = String(mono.coeff);
        for (let { name, power } of vars) {
            if (power === 0) {
                continue;
            }
            else if (power === 1) {
                T += name;
            }
            else {
                T += name + '^{' + power + '}';
            }
        }
        return T;
    }
    else {
        let [p, q] = Math.fraction(coeff);
        let needFrac = q !== 1 || vars.some($ => $.power < 0);
        if (!needFrac) {
            return printMonomial(mono, false);
        }
        let a = ''; // numerator
        let b = ''; // denominator
        a = String(Math.abs(p));
        b = String(q);
        for (let { name, power } of vars) {
            if (power === 0) {
                continue;
            }
            else if (power === 1) {
                a += name;
            }
            else if (power > 0) {
                a += name + '^{' + power + '}';
            }
            else {
                b += name + '^{' + -power + '}';
            }
        }
        return (p < 0 ? '-' : '') + `\\dfrac{${a}}{${b}}`;
    }
}
export function printPolynomial(poly, fraction) {
    return poly
        .filter(M => M.coeff !== 0)
        .map(M => printMonomial(M, fraction))
        .join('+');
}
export function printCompoundInequality(compoundInequality) {
    let [connective, sign1, num1, sign2, num2, x] = compoundInequality;
    if (num1 > num2) {
        ;
        [sign1, sign2] = [sign2, sign1];
        [num1, num2] = [num2, num1];
    }
    let g1 = INEQUAL.greaterThan(sign1);
    let g2 = INEQUAL.greaterThan(sign2);
    let e1 = INEQUAL.canEqual(sign1);
    let e2 = INEQUAL.canEqual(sign2);
    let p1 = INEQUAL.print(sign1);
    let p2 = INEQUAL.print(sign2);
    let r1 = INEQUAL.print(INEQUAL.flip(sign1));
    let r2 = INEQUAL.print(INEQUAL.flip(sign2));
    function t(str) {
        return '\\text{' + str + '}';
    }
    if (connective === 'AND') {
        if (num1 !== num2) {
            if (g1 && g2)
                return x + p2 + num2;
            if (!g1 && !g2)
                return x + p1 + num1;
            if (g1 && !g2)
                return num1 + r1 + ' ' + x + p2 + num2;
            if (!g1 && g2)
                return t('no solution');
        }
        else {
            let e = e1 && e2;
            if (g1 === g2)
                return x + INEQUAL.print([g1, e]) + num1;
            if (g1 !== g2)
                return e ? x + '=' + num1 : t('no solution');
        }
    }
    if (connective === 'OR') {
        if (num1 !== num2) {
            if (g1 && g2)
                return x + p1 + num1;
            if (!g1 && !g2)
                return x + p2 + num2;
            if (g1 && !g2)
                return t('all real values');
            if (!g1 && g2)
                return x + p1 + num1 + t(' or ') + x + p2 + num2;
        }
        else {
            let e = e1 || e2;
            if (g1 === g2)
                return x + INEQUAL.print([g1, e]) + num1;
            if (g1 !== g2)
                return e
                    ? t('all real values')
                    : t('all real values except ') + x + '=' + num1;
        }
    }
    throw 'cannot recognize inequalitiy!';
}
export function printOrdinal(n) {
    let j = n % 10;
    let k = n % 100;
    if (j === 1 && k !== 11)
        return n + 'st';
    if (j === 2 && k !== 12)
        return n + 'nd';
    if (j === 3 && k !== 13)
        return n + 'rd';
    return n.blur() + 'th';
}
