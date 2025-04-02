import { Blacksmith } from 'bot'
import _ from 'lodash'
import * as math from 'mathjs'
import * as schema from '../../Core/schema.js'
import * as v from 'valibot'

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

function addRule<T>(
    pattern: pattern,
    schema: v.BaseSchema<T, T, any>,
    fn: (_: T) => string
) {
    blacksmith.add(pattern, ($: unknown) => v.is(schema, $), fn)
}

// print **x as sci notation
addRule('**@', schema.num, $ => {
    let v = cal.blur(Round($, 3))
    let abs = Math.abs(v)
    return String(abs >= 10000 || abs <= 0.01 ? Sci(v) : v)
})

addRule('**@', schema.quantity, ({ val, unit }) => {
    let v = cal.blur(Round(val, 3))
    let abs = Math.abs(v)
    return String(abs >= 10000 || abs <= 0.01 ? Sci(v) : v) + unit
})

// print */x as fraction
addRule('*/@', schema.num, $ => {
    let [p, q] = ToFrac($)
    return Dfrac(p, q)
})

addRule('*/@', schema.monomial, $ => {
    return ink.printMonomial($, true)
})

addRule('*/@', schema.polynomial, $ => {
    return ink.printPolynomial($, true)
})

// print */(x) as fraction with bracket if necessary
addRule('*/(@)', schema.num, $ => {
    let [p, q] = ToFrac($)
    if (q === 1 && p >= 0) return Dfrac(p, q)
    if (q === 1 && p < 0) return '(' + Dfrac(p, q) + ')'
    return '\\left ( ' + Dfrac(p, q) + ' \\right )'
})

// print *//x as fraction
addRule('*//@', schema.num, $ => {
    let [p, q] = ToFrac($)
    return Dfrac(p, q).replace(/dfrac/g, 'frac')
})

// print *(x) as bracket if negative
addRule('*(@)', schema.num, $ => {
    let v = numberDefault($)
    return String(v >= 0 ? v : '(' + v + ')')
})

// print *!x as surd
addRule('*!@', schema.num, $ => ink.printSurd($))
addRule(
    '*!@',
    schema.point2D,
    ([a, b]) => '(' + ink.printSurd(a) + ',' + ink.printSurd(b) + ')'
)

// print *^+_x as sign of x
addRule('*^+_@', schema.num, $ => ($ >= 0 ? '+' : '-'))
// print *^-_x as opposite sign of x
addRule('*^-_@', schema.num, $ => ($ >= 0 ? '-' : '+'))

// print *|x| as abs(x)
addRule('*|@|', schema.num, $ => String(numberDefault(Math.abs($))))

// print *^\gt_x as '>' or '<'
addRule('*^\\gt_@', schema.bool, $ => ($ ? '\\gt' : '\\lt'))
addRule('*^\\gt_@', schema.num, $ => ($ > 0 ? '\\gt' : $ < 0 ? '\\lt' : '='))

// print *^\lt_x as '<' or '>'
addRule('*^\\lt_@', schema.bool, $ => ($ ? '\\lt' : '\\gt'))
addRule('*^\\lt_@', schema.num, $ => ($ > 0 ? '\\lt' : $ < 0 ? '\\gt' : '='))

// print *^\ge_x as '>=' or '<='
addRule('*^\\ge_@', schema.bool, $ => ($ ? '\\ge' : '\\le'))
addRule('*^\\ge_@', schema.num, $ => ($ > 0 ? '\\ge' : $ < 0 ? '\\le' : '='))

// print *^\le_x as '<=' or '>='
addRule('*^\\le_@', schema.bool, $ => ($ ? '\\le' : '\\ge'))
addRule('*^\\le_@', schema.num, $ => ($ > 0 ? '\\le' : $ < 0 ? '\\ge' : '='))

// print *^=_x as '=' or '<>'
addRule('*^=_@', schema.bool, $ => ($ ? '=' : '\\neq'))

// print *\%x as percent
addRule('*%@', schema.num, $ => numberDefault($ * 100) + '%')
// print *\%x as percent
addRule('*\\%@', schema.num, $ => numberDefault($ * 100) + '\\%')

// print *\%|x| as percent abs
addRule('*%|@|', schema.num, $ => numberDefault(Abs($ * 100)) + '%')
// print *\%|x| as percent abs
addRule('*\\%|@|', schema.num, $ => numberDefault(Abs($ * 100)) + '\\%')

// print *:x as ratio
addRule('*:@', schema.ntuple, $ => Ratio(...$).join(':'))
addRule('*:@', schema.num, $ => {
    let [p, q] = cal.toFraction($)
    return p + ':' + q
})

// print *|.x as OR trig roots
addRule('*|.@', v.array(v.union([v.number(), v.undefined()])), $ =>
    ink.printOrTrigRoots($)
)
// print *.x as polar coordinates, with r being a surd
addRule('*.@', schema.point2D, $ => ink.printPointPolar($))

// print *^× as prime factors
addRule('*^×@', schema.num, $ => {
    return ink.printPrimeFactors($)
})

// print *×th as proper ordinal, e.g. 1st
addRule('*@th', schema.num, $ => {
    return ink.printOrdinal($)
})

// print *x as normal
addRule('*@', schema.num, $ => String(numberDefault($)))
addRule('*@', schema.bool, $ => ($ ? '✔' : '✘'))
addRule(
    '*@',
    schema.quantity,
    ({ val, unit }) => String(numberDefault(val)) + unit
)
addRule('*@', schema.point2D, $ => Coord($))
addRule('*@', schema.combo, $ => ink.printCombo($))
addRule('*@', schema.monomial, $ => ink.printMonomial($, false))
addRule('*@', schema.polynomial, $ => ink.printPolynomial($, false))
addRule('*@', schema.compoundInequality, $ => ink.printCompoundInequality($))
addRule('*@', schema.trigValue, $ => ink.printTrigValue($))
addRule('*@', schema.trigExp, $ => ink.printTrigExp($))
addRule('*@', schema.constraint, $ => ink.printConstraint($))
addRule('*@', schema.constraints, $ => ink.printConstraints($))

blacksmith.setForgePatterns()
blacksmith.setIntraPatterns(['**@', '*@', '*/@'])
