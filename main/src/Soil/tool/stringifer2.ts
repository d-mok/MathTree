

// function numberDefault(num: number): number {
//     let v = num
//     if (owl.zero(v))
//         return 0
//     if (IsInteger(v)) {
//         v = Fix(v, 0)
//     } else {
//         v = Math.abs(v) > 100 ? Fix(v, 2) : Round(v, 5)
//     }
//     return v
// }



// type ConditionKeys<T> = { [k in keyof T]: T[k] extends (...args: any[]) => boolean ? k : never }[keyof T]
// type condition = ConditionKeys<typeof owl>
// type GuardType<T extends condition> = (typeof owl)[T] extends (_: any) => _ is infer R ? R : unknown
// type transformer<T extends condition> = ($: GuardType<T>) => string



// /** Responsible for transforming a certain type of value into a certain string. */
// class Stringifier<T extends condition> {

//     constructor(
//         public signal: string,
//         private condition: T,
//         private transformer: transformer<T>
//     ) { }

//     check(val: any): val is GuardType<T> {
//         return owl[this.condition](val)
//     }

//     exec(val: GuardType<T>): string {
//         return this.transformer(val)
//     }

// }



// class Stringifiers {

//     private static store: Stringifier<condition>[] = []

//     private static add<T extends condition>(signal: string, condition: T, fn: transformer<T>) {
//         this.store.push(new Stringifier(signal, condition, fn))
//     }

//     static transform(signal: string, val: unknown): string {
//         let ss = this.store.filter(s => s.signal === signal)
//         for (let s of ss) {
//             if (s.check(val)) return s.exec(val)
//         }
//         return String(val)
//     }

//     static {

//         this.add('', 'num', $ => String(numberDefault($)))
//         this.add('', 'bool', $ => $ ? '✔' : '✘')
//         this.add('', 'quantity', ({ val, unit }) => String(numberDefault(val)) + unit)
//         this.add('', 'point2D', $ => Coord($))
//         this.add('', 'combo', $ => ink.printCombo($))
//         this.add('', 'polynomial', $ => PolyPrint($))
//         this.add('', 'trigValue', $ => ink.printTrigValue($))
//         this.add('', 'trigExp', $ => ink.printTrigExp($))
//         this.add('', 'constraint', $ => ink.printConstraint($))
//         this.add('', 'constraints', $ => ink.printConstraints($))





//         this.add('*', 'num', $ => {
//             let v = cal.blur(Round($, 3))
//             let abs = Math.abs(v)
//             return String((abs >= 10000 || abs <= 0.01) ? Sci(v) : v)
//         })



//         this.add('*', 'quantity', ({ val, unit }) => {
//             let v = cal.blur(Round(val, 3))
//             let abs = Math.abs(v)
//             return String((abs >= 10000 || abs <= 0.01) ? Sci(v) : v) + unit
//         })



//         this.add('/', 'num', $ => {
//             let [p, q] = ToFrac($)
//             return Dfrac(p, q)
//         })



//         this.add('/()', 'num', $ => {
//             let [p, q] = ToFrac($)
//             if (q === 1 && p >= 0) return Dfrac(p, q)
//             if (q === 1 && p < 0) return '(' + Dfrac(p, q) + ')'
//             return '\\left ( ' + Dfrac(p, q) + ' \\right )'
//         })





//         this.add('//', 'num', $ => {
//             let [p, q] = ToFrac($)
//             return Dfrac(p, q).replace(/dfrac/g, 'frac')
//         })



//         this.add('()', 'num', $ => {
//             let v = numberDefault($)
//             return String(v >= 0 ? v : '(' + v + ')')
//         })


//         this.add('!', 'num', $ => ink.printSurd($))

//         this.add('!', 'point2D', ([a, b]) => '(' + ink.printSurd(a) + ',' + ink.printSurd(b) + ')')

//         this.add('+', 'num', $ => $ >= 0 ? '+' : '-')

//         this.add('-', 'num', $ => $ >= 0 ? '-' : '+')


//         this.add('||', 'num', $ => String(numberDefault(Math.abs($))))

//         this.add('>', 'bool', $ => $ ? '\\gt' : '\\lt')
//         this.add('>', 'num', $ => $ > 0 ? '\\gt' : $ < 0 ? '\\lt' : '=')



//         this.add('<', 'bool', $ => $ ? '\\lt' : '\\gt')
//         this.add('<', 'num', $ => $ > 0 ? '\\lt' : $ < 0 ? '\\gt' : '=')



//         this.add('>=', 'bool', $ => $ ? '\\ge' : '\\le')
//         this.add('>=', 'num', $ => $ > 0 ? '\\ge' : $ < 0 ? '\\le' : '=')


//         this.add('<=', 'bool', $ => $ ? '\\le' : '\\ge')
//         this.add('<=', 'num', $ => $ > 0 ? '\\le' : $ < 0 ? '\\ge' : '=')


//         this.add('%', 'num', $ => numberDefault($ * 100) + '%')

//         this.add('\\%', 'num', $ => numberDefault($ * 100) + '\\%')

//         this.add(':', 'ntuple', $ => toNumbers($).ratio().join(":"))
//         this.add(':', 'num', $ => {
//             let [p, q] = cal.toFraction($)
//             return p + ":" + q
//         })


//         this.add('|.', 'array', $ => ink.printOrTrigRoots($))

//         this.add('.', 'point2D', $ => ink.printPointPolar($))


//         this.add('=', 'labeledValue', $ => {
//             let v: LabeledValue = [...$]
//             v[0] = numberDefault(v[0])
//             return ink.printLabeledValue(v, 1, false)
//         })


//         this.add('==', 'labeledValue2', $ => {
//             let v: LabeledValue2 = [...$]
//             v[0] = numberDefault(v[0])
//             return ink.printLabeledValue(v, 2, false)
//         })



//         this.add('=.', 'labeledValue', $ => {
//             let v: LabeledValue = [...$]
//             v[0] = numberDefault(v[0])
//             return ink.printLabeledValue(v, 1, true)
//         })



//         this.add('==.', 'labeledValue2', $ => {
//             let v: LabeledValue2 = [...$]
//             v[0] = numberDefault(v[0])
//             return ink.printLabeledValue(v, 2, true)
//         })





//     }

// }
