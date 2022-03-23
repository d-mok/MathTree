

function numberDefault(num: number): number {
    let v = num
    if (owl.zero(v))
        return 0
    if (IsInteger(v)) {
        v = Fix(v, 0)
    } else {
        v = Math.abs(v) > 100 ? Fix(v, 2) : Round(v, 5)
    }
    return v
}



type ConditionKeys<T> = { [k in keyof T]: T[k] extends (...args: any[]) => boolean ? k : never }[keyof T]
type condition = ConditionKeys<typeof owl>
type GuardType<T extends condition> = (typeof owl)[T] extends (_: any) => _ is infer R ? R : unknown
type transformer<T extends condition> = ($: GuardType<T>) => string

export type pattern =
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


/** Responsible for transforming a certain type of value into a certain string. */
class Stringifier<T extends condition> {

    constructor(
        public pattern: pattern,
        private condition: T,
        private transformer: transformer<T>
    ) { }

    check(val: any): val is GuardType<T> {
        return owl[this.condition](val)
    }

    exec(val: GuardType<T>): string {
        return this.transformer(val)
    }

}



export class Stringifiers {

    private static store: Stringifier<condition>[] = []

    private static add<T extends condition>(pattern: pattern, condition: T, fn: transformer<T>) {
        this.store.push(new Stringifier(pattern, condition, fn))
    }

    static transform(pattern: pattern, val: unknown): string {
        let ss = this.store.filter(s => s.pattern === pattern)
        for (let s of ss) {
            if (s.check(val)) return s.exec(val)
        }
        return String(val)
    }

    static allPatterns(): pattern[] {
        let ps = this.store.map(s => s.pattern)
        return [...new Set(ps)]
    }

    static {
        // print *x as normal
        this.add('*@', 'num', $ => String(numberDefault($)))
        this.add('*@', 'bool', $ => $ ? '✔' : '✘')
        this.add('*@', 'quantity', ({ val, unit }) => String(numberDefault(val)) + unit)
        this.add('*@', 'point2D', $ => Coord($))
        this.add('*@', 'combo', $ => ink.printCombo($))
        this.add('*@', 'polynomial', $ => PolyPrint($))
        this.add('*@', 'trigValue', $ => ink.printTrigValue($))
        this.add('*@', 'trigExp', $ => ink.printTrigExp($))
        this.add('*@', 'constraint', $ => ink.printConstraint($))
        this.add('*@', 'constraints', $ => ink.printConstraints($))

        // print **x as sci notation
        this.add('**@', 'num', $ => {
            let v = cal.blur(Round($, 3))
            let abs = Math.abs(v)
            return String((abs >= 10000 || abs <= 0.01) ? Sci(v) : v)
        })


        this.add('**@', 'quantity', ({ val, unit }) => {
            let v = cal.blur(Round(val, 3))
            let abs = Math.abs(v)
            return String((abs >= 10000 || abs <= 0.01) ? Sci(v) : v) + unit
        })


        // print */x as fraction
        this.add('*/@', 'num', $ => {
            let [p, q] = ToFrac($)
            return Dfrac(p, q)
        })


        // print */(x) as fraction with bracket if necessary
        this.add('*/(@)', 'num', $ => {
            let [p, q] = ToFrac($)
            if (q === 1 && p >= 0) return Dfrac(p, q)
            if (q === 1 && p < 0) return '(' + Dfrac(p, q) + ')'
            return '\\left ( ' + Dfrac(p, q) + ' \\right )'
        })




        // print *//x as fraction
        this.add('*//@', 'num', $ => {
            let [p, q] = ToFrac($)
            return Dfrac(p, q).replace(/dfrac/g, 'frac')
        })


        // print *(x) as bracket if negative
        this.add('*(@)', 'num', $ => {
            let v = numberDefault($)
            return String(v >= 0 ? v : '(' + v + ')')
        })

        // print *!x as surd
        this.add('*!@', 'num', $ => ink.printSurd($))
        this.add('*!@', 'point2D', ([a, b]) => '(' + ink.printSurd(a) + ',' + ink.printSurd(b) + ')')

        // print *^+_x as sign of x
        this.add('*^+_@', 'num', $ => $ >= 0 ? '+' : '-')
        // print *^-_x as opposite sign of x
        this.add('*^-_@', 'num', $ => $ >= 0 ? '-' : '+')

        // print *|x| as abs(x)
        this.add('*|@|', 'num', $ => String(numberDefault(Math.abs($))))

        // print *^\gt_x as '>' or '<'
        this.add('*^\\gt_@', 'bool', $ => $ ? '\\gt' : '\\lt')
        this.add('*^\\gt_@', 'num', $ => $ > 0 ? '\\gt' : $ < 0 ? '\\lt' : '=')


        // print *^\lt_x as '<' or '>'
        this.add('*^\\lt_@', 'bool', $ => $ ? '\\lt' : '\\gt')
        this.add('*^\\lt_@', 'num', $ => $ > 0 ? '\\lt' : $ < 0 ? '\\gt' : '=')


        // print *^\ge_x as '>=' or '<='
        this.add('*^\\ge_@', 'bool', $ => $ ? '\\ge' : '\\le')
        this.add('*^\\ge_@', 'num', $ => $ > 0 ? '\\ge' : $ < 0 ? '\\le' : '=')

        // print *^\le_x as '<=' or '>='
        this.add('*^\\le_@', 'bool', $ => $ ? '\\le' : '\\ge')
        this.add('*^\\le_@', 'num', $ => $ > 0 ? '\\le' : $ < 0 ? '\\ge' : '=')

        // print *\%x as percent
        this.add('*%@', 'num', $ => numberDefault($ * 100) + '%')
        // print *\%x as percent
        this.add('*\\%@', 'num', $ => numberDefault($ * 100) + '\\%')

        // print *:x as ratio
        this.add('*:@', 'ntuple', $ => toNumbers($).ratio().join(":"))
        this.add('*:@', 'num', $ => {
            let [p, q] = cal.toFraction($)
            return p + ":" + q
        })

        // print *|.x as OR trig roots
        this.add('*|.@', 'array', $ => ink.printOrTrigRoots($))
        // print *.x as polar coordinates, with r being a surd
        this.add('*.@', 'point2D', $ => ink.printPointPolar($))

        // print *= as equation for labeled value
        this.add('*=@', 'labeledValue', $ => {
            let v: LabeledValue = [...$]
            v[0] = numberDefault(v[0])
            return ink.printLabeledValue(v, 1, false)
        })

        // print *== as equation for labeled value
        this.add('*==@', 'labeledValue2', $ => {
            let v: LabeledValue2 = [...$]
            v[0] = numberDefault(v[0])
            return ink.printLabeledValue(v, 2, false)
        })


        // print *=. as equation for labeled value
        this.add('*=.@', 'labeledValue', $ => {
            let v: LabeledValue = [...$]
            v[0] = numberDefault(v[0])
            return ink.printLabeledValue(v, 1, true)
        })


        // print *==. as equation for labeled value
        this.add('*==.@', 'labeledValue2', $ => {
            let v: LabeledValue2 = [...$]
            v[0] = numberDefault(v[0])
            return ink.printLabeledValue(v, 2, true)
        })





    }

}
