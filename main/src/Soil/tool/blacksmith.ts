import { Blacksmith } from 'bot'

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

type ConditionKeys<T> = {
    [k in keyof T]: T[k] extends (...args: any[]) => boolean ? k : never
}[keyof T]
type condition = ConditionKeys<typeof owl>
type GuardType<T extends condition> = typeof owl[T] extends (
    _: any
) => _ is infer R
    ? R
    : unknown
type transformer<T extends condition> = ($: GuardType<T>) => string

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
    | '*%@'
    | '*\\%@'
    | '*:@'
    | '*|.@'
    | '*.@'
    | '*=@'
    | '*==@'
    | '*=.@'
    | '*==.@'
    | '*^×@'

export let blacksmith = new Blacksmith()

function addRule<T extends condition>(
    pattern: pattern,
    condition: T,
    fn: transformer<T>
) {
    let checker = ($: any): $ is GuardType<T> => owl[condition]($)
    blacksmith.add(pattern, checker, fn)
}

// print **x as sci notation
addRule('**@', 'num', $ => {
    let v = cal.blur(Round($, 3))
    let abs = Math.abs(v)
    return String(abs >= 10000 || abs <= 0.01 ? Sci(v) : v)
})

addRule('**@', 'quantity', ({ val, unit }) => {
    let v = cal.blur(Round(val, 3))
    let abs = Math.abs(v)
    return String(abs >= 10000 || abs <= 0.01 ? Sci(v) : v) + unit
})

// print */x as fraction
addRule('*/@', 'num', $ => {
    let [p, q] = ToFrac($)
    return Dfrac(p, q)
})

addRule('*/@', 'monomial', $ => {
    return ink.printMonomial($, true)
})

addRule('*/@', 'polynomial', $ => {
    return ink.printPolynomial($, true)
})

// print */(x) as fraction with bracket if necessary
addRule('*/(@)', 'num', $ => {
    let [p, q] = ToFrac($)
    if (q === 1 && p >= 0) return Dfrac(p, q)
    if (q === 1 && p < 0) return '(' + Dfrac(p, q) + ')'
    return '\\left ( ' + Dfrac(p, q) + ' \\right )'
})

// print *//x as fraction
addRule('*//@', 'num', $ => {
    let [p, q] = ToFrac($)
    return Dfrac(p, q).replace(/dfrac/g, 'frac')
})

// print *(x) as bracket if negative
addRule('*(@)', 'num', $ => {
    let v = numberDefault($)
    return String(v >= 0 ? v : '(' + v + ')')
})

// print *!x as surd
addRule('*!@', 'num', $ => ink.printSurd($))
addRule(
    '*!@',
    'point2D',
    ([a, b]) => '(' + ink.printSurd(a) + ',' + ink.printSurd(b) + ')'
)

// print *^+_x as sign of x
addRule('*^+_@', 'num', $ => ($ >= 0 ? '+' : '-'))
// print *^-_x as opposite sign of x
addRule('*^-_@', 'num', $ => ($ >= 0 ? '-' : '+'))

// print *|x| as abs(x)
addRule('*|@|', 'num', $ => String(numberDefault(Math.abs($))))

// print *^\gt_x as '>' or '<'
addRule('*^\\gt_@', 'bool', $ => ($ ? '\\gt' : '\\lt'))
addRule('*^\\gt_@', 'num', $ => ($ > 0 ? '\\gt' : $ < 0 ? '\\lt' : '='))

// print *^\lt_x as '<' or '>'
addRule('*^\\lt_@', 'bool', $ => ($ ? '\\lt' : '\\gt'))
addRule('*^\\lt_@', 'num', $ => ($ > 0 ? '\\lt' : $ < 0 ? '\\gt' : '='))

// print *^\ge_x as '>=' or '<='
addRule('*^\\ge_@', 'bool', $ => ($ ? '\\ge' : '\\le'))
addRule('*^\\ge_@', 'num', $ => ($ > 0 ? '\\ge' : $ < 0 ? '\\le' : '='))

// print *^\le_x as '<=' or '>='
addRule('*^\\le_@', 'bool', $ => ($ ? '\\le' : '\\ge'))
addRule('*^\\le_@', 'num', $ => ($ > 0 ? '\\le' : $ < 0 ? '\\ge' : '='))

// print *\%x as percent
addRule('*%@', 'num', $ => numberDefault($ * 100) + '%')
// print *\%x as percent
addRule('*\\%@', 'num', $ => numberDefault($ * 100) + '\\%')

// print *:x as ratio
addRule('*:@', 'ntuple', $ => toNumbers($).ratio().join(':'))
addRule('*:@', 'num', $ => {
    let [p, q] = cal.toFraction($)
    return p + ':' + q
})

// print *|.x as OR trig roots
addRule('*|.@', 'array', $ => ink.printOrTrigRoots($))
// print *.x as polar coordinates, with r being a surd
addRule('*.@', 'point2D', $ => ink.printPointPolar($))

// print *= as equation for labeled value
addRule('*=@', 'labeledValue', $ => {
    let v: LabeledValue = [...$]
    v[0] = numberDefault(v[0])
    return ink.printLabeledValue(v, 1, false)
})

// print *== as equation for labeled value
addRule('*==@', 'labeledValue2', $ => {
    let v: LabeledValue2 = [...$]
    v[0] = numberDefault(v[0])
    return ink.printLabeledValue(v, 2, false)
})

// print *=. as equation for labeled value
addRule('*=.@', 'labeledValue', $ => {
    let v: LabeledValue = [...$]
    v[0] = numberDefault(v[0])
    return ink.printLabeledValue(v, 1, true)
})

// print *==. as equation for labeled value
addRule('*==.@', 'labeledValue2', $ => {
    let v: LabeledValue2 = [...$]
    v[0] = numberDefault(v[0])
    return ink.printLabeledValue(v, 2, true)
})

// print *^× as prime factors
addRule('*^×@', 'num', $ => {
    return ink.printPrimeFactors($)
})

// print *x as normal
addRule('*@', 'num', $ => String(numberDefault($)))
addRule('*@', 'bool', $ => ($ ? '✔' : '✘'))
addRule('*@', 'quantity', ({ val, unit }) => String(numberDefault(val)) + unit)
addRule('*@', 'point2D', $ => Coord($))
addRule('*@', 'combo', $ => ink.printCombo($))
addRule('*@', 'monomial', $ => ink.printMonomial($, false))
addRule('*@', 'polynomial', $ => ink.printPolynomial($, false))
addRule('*@', 'trigValue', $ => ink.printTrigValue($))
addRule('*@', 'trigExp', $ => ink.printTrigExp($))
addRule('*@', 'constraint', $ => ink.printConstraint($))
addRule('*@', 'constraints', $ => ink.printConstraints($))

blacksmith.setForgePatterns()
blacksmith.setIntraPatterns(['**@', '*@', '*/@'])
