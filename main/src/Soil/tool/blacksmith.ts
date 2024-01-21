import { Blacksmith } from 'bot'
import _ from 'lodash'
import * as math from 'mathjs'

function numberDefault(num: number): number {
    let v = num
    if (owl.zero(v)) return 0
    if (IsInteger(v)) {
        v = Fix(v, 0)
    } else {
        v = Math.abs(v) > 100 ? Fix(v, 2) : Round(v, 5)
    }
    return v
}

type GuardType<T> = T extends (_: any) => _ is infer R ? R : unknown
type transformer<T> = ($: GuardType<T>) => string

type pattern =
    | '*@'
    | '**@'
    | '*/@'
    | '*/(@)'
    | '*//@'
    | '*(@)'
    | '*!@'
    | '*^+_@'
    | '*^-_@'
    | '*|@|'
    | '*^\\gt_@'
    | '*^\\lt_@'
    | '*^\\ge_@'
    | '*^\\le_@'
    | '*^=_@'
    | '*%@'
    | '*\\%@'
    | '*%|@|'
    | '*\\%|@|'
    | '*:@'
    | '*|.@'
    | '*.@'
    | '*^×@'
    | '*@th'

export let blacksmith = new Blacksmith()

function addRule<T extends predicate>(
    pattern: pattern,
    condition: T,
    fn: transformer<T>
) {
    let checker = ($: any): $ is GuardType<T> => condition($)
    blacksmith.add(pattern, checker, fn)
}

// print **x as sci notation
addRule('**@', owl.num, $ => {
    let v = cal.blur(Round($, 3))
    let abs = Math.abs(v)
    return String(abs >= 10000 || abs <= 0.01 ? Sci(v) : v)
})

addRule('**@', owl.quantity, ({ val, unit }) => {
    let v = cal.blur(Round(val, 3))
    let abs = Math.abs(v)
    return String(abs >= 10000 || abs <= 0.01 ? Sci(v) : v) + unit
})

// print */x as fraction
addRule('*/@', owl.num, $ => {
    let [p, q] = ToFrac($)
    return Dfrac(p, q)
})

addRule('*/@', owl.monomial, $ => {
    return ink.printMonomial($, true)
})

addRule('*/@', owl.polynomial, $ => {
    return ink.printPolynomial($, true)
})

// print */(x) as fraction with bracket if necessary
addRule('*/(@)', owl.num, $ => {
    let [p, q] = ToFrac($)
    if (q === 1 && p >= 0) return Dfrac(p, q)
    if (q === 1 && p < 0) return '(' + Dfrac(p, q) + ')'
    return '\\left ( ' + Dfrac(p, q) + ' \\right )'
})

// print *//x as fraction
addRule('*//@', owl.num, $ => {
    let [p, q] = ToFrac($)
    return Dfrac(p, q).replace(/dfrac/g, 'frac')
})

// print *(x) as bracket if negative
addRule('*(@)', owl.num, $ => {
    let v = numberDefault($)
    return String(v >= 0 ? v : '(' + v + ')')
})

// print *!x as surd
addRule('*!@', owl.num, $ => ink.printSurd($))
addRule(
    '*!@',
    owl.point2D,
    ([a, b]) => '(' + ink.printSurd(a) + ',' + ink.printSurd(b) + ')'
)

// print *^+_x as sign of x
addRule('*^+_@', owl.num, $ => ($ >= 0 ? '+' : '-'))
// print *^-_x as opposite sign of x
addRule('*^-_@', owl.num, $ => ($ >= 0 ? '-' : '+'))

// print *|x| as abs(x)
addRule('*|@|', owl.num, $ => String(numberDefault(Math.abs($))))

// print *^\gt_x as '>' or '<'
addRule('*^\\gt_@', owl.bool, $ => ($ ? '\\gt' : '\\lt'))
addRule('*^\\gt_@', owl.num, $ => ($ > 0 ? '\\gt' : $ < 0 ? '\\lt' : '='))

// print *^\lt_x as '<' or '>'
addRule('*^\\lt_@', owl.bool, $ => ($ ? '\\lt' : '\\gt'))
addRule('*^\\lt_@', owl.num, $ => ($ > 0 ? '\\lt' : $ < 0 ? '\\gt' : '='))

// print *^\ge_x as '>=' or '<='
addRule('*^\\ge_@', owl.bool, $ => ($ ? '\\ge' : '\\le'))
addRule('*^\\ge_@', owl.num, $ => ($ > 0 ? '\\ge' : $ < 0 ? '\\le' : '='))

// print *^\le_x as '<=' or '>='
addRule('*^\\le_@', owl.bool, $ => ($ ? '\\le' : '\\ge'))
addRule('*^\\le_@', owl.num, $ => ($ > 0 ? '\\le' : $ < 0 ? '\\ge' : '='))

// print *^=_x as '=' or '<>'
addRule('*^=_@', owl.bool, $ => ($ ? '=' : '\\neq'))

// print *\%x as percent
addRule('*%@', owl.num, $ => numberDefault($ * 100) + '%')
// print *\%x as percent
addRule('*\\%@', owl.num, $ => numberDefault($ * 100) + '\\%')

// print *\%|x| as percent abs
addRule('*%|@|', owl.num, $ => numberDefault(Abs($ * 100)) + '%')
// print *\%|x| as percent abs
addRule('*\\%|@|', owl.num, $ => numberDefault(Abs($ * 100)) + '\\%')

// print *:x as ratio
addRule('*:@', owl.ntuple, $ => Ratio(...$).join(':'))
addRule('*:@', owl.num, $ => {
    let [p, q] = cal.toFraction($)
    return p + ':' + q
})

// print *|.x as OR trig roots
addRule('*|.@', owl.array(), $ => ink.printOrTrigRoots($))
// print *.x as polar coordinates, with r being a surd
addRule('*.@', owl.point2D, $ => ink.printPointPolar($))

// print *^× as prime factors
addRule('*^×@', owl.num, $ => {
    return ink.printPrimeFactors($)
})

// print *×th as proper ordinal, e.g. 1st
addRule('*@th', owl.num, $ => {
    return ink.printOrdinal($)
})

// print *x as normal
addRule('*@', owl.num, $ => String(numberDefault($)))
addRule('*@', owl.bool, $ => ($ ? '✔' : '✘'))
addRule(
    '*@',
    owl.quantity,
    ({ val, unit }) => String(numberDefault(val)) + unit
)
addRule('*@', owl.point2D, $ => Coord($))
addRule('*@', owl.combo, $ => ink.printCombo($))
addRule('*@', owl.monomial, $ => ink.printMonomial($, false))
addRule('*@', owl.polynomial, $ => ink.printPolynomial($, false))
addRule('*@', owl.compoundInequality, $ => ink.printCompoundInequality($))
addRule('*@', owl.trigValue, $ => ink.printTrigValue($))
addRule('*@', owl.trigExp, $ => ink.printTrigExp($))
addRule('*@', owl.constraint, $ => ink.printConstraint($))
addRule('*@', owl.constraints, $ => ink.printConstraints($))

blacksmith.setForgePatterns()
blacksmith.setIntraPatterns(['**@', '*@', '*/@'])
