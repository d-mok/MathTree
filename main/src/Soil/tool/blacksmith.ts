import { Blacksmith } from 'bot'
import _ from 'lodash'
import { BaseSchema } from 'valibot'

function numberDefault(num: number): number {
    if (Math.abs(num) < 1e-14) return 0
    if (IsInteger(num)) {
        num = Fix(num, 0)
    } else {
        num = Math.abs(num) > 100 ? Fix(num, 2) : Round(num, 5)
    }
    return num
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
    sch: BaseSchema<T, T, any>,
    fn: (_: T) => string
) {
    blacksmith.add(pattern, schema.be(sch), fn)
}

// print **x as sci notation
addRule('**@', schema.num, $ => {
    let v = Round($, 3).blur()
    let abs = Math.abs(v)
    return String(abs >= 10000 || abs <= 0.01 ? Sci(v) : v)
})

addRule('**@', schema.quantity, ({ val, unit }) => {
    let v = Round(val, 3).blur()
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
addRule('*^\\gt_@', schema.boolean(), $ => ($ ? '\\gt' : '\\lt'))
addRule('*^\\gt_@', schema.num, $ => ($ > 0 ? '\\gt' : $ < 0 ? '\\lt' : '='))

// print *^\lt_x as '<' or '>'
addRule('*^\\lt_@', schema.boolean(), $ => ($ ? '\\lt' : '\\gt'))
addRule('*^\\lt_@', schema.num, $ => ($ > 0 ? '\\lt' : $ < 0 ? '\\gt' : '='))

// print *^\ge_x as '>=' or '<='
addRule('*^\\ge_@', schema.boolean(), $ => ($ ? '\\ge' : '\\le'))
addRule('*^\\ge_@', schema.num, $ => ($ > 0 ? '\\ge' : $ < 0 ? '\\le' : '='))

// print *^\le_x as '<=' or '>='
addRule('*^\\le_@', schema.boolean(), $ => ($ ? '\\le' : '\\ge'))
addRule('*^\\le_@', schema.num, $ => ($ > 0 ? '\\le' : $ < 0 ? '\\ge' : '='))

// print *^=_x as '=' or '<>'
addRule('*^=_@', schema.boolean(), $ => ($ ? '=' : '\\neq'))

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
    let [p, q] = Math.fraction($)
    return p + ':' + q
})

// print *|.x as OR trig roots
addRule('*|.@', schema.ntuple, $ => ink.printOrTrigRoots($))
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
addRule('*@', schema.boolean(), $ => ($ ? '✔' : '✘'))
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
