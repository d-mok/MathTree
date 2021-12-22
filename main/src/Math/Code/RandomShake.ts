import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'


@exposeAll()
@captureAll()
class Host {




    /**
     * @deprecated
     * an array of n nearby values around anchor, within range inclusive, auto detecting the input type.
     * ```
     * RndShake(10)
     * // equivalent to RndShakeN(10)
     * RndShake(10.5)
     * // equivalent to RndShakeR(10.5)
     * ```
     */
    static RndShake(anchor: any): (typeof anchor)[] {
        if (typeof anchor === 'string') {
            // Fraction, to be deleted
            if (owl.dfrac(anchor)) {
                Should(false, 'RndShakeDfrac is not supported anymore')
                // return RndShakeDfrac(anchor)
            }
            // Inequal Sign
            if (owl.ineq(anchor)) {
                return RndShakeIneq(anchor)
            }
            // trig
            if (owl.trig(anchor)) {
                return RndShakeTrig(anchor as TrigFunc)
            }
            // else convert to number
            if (Number(anchor)) {
                anchor = Number(anchor)
            }
        }
        if (owl.quantity(anchor)) {
            // quantity
            return RndShakeQuantity(anchor)
        }
        if (owl.point2D(anchor)) {
            // Point
            return RndShakePoint(anchor)
        }
        if (owl.combo(anchor)) {
            // Combo
            return RndShakeCombo(anchor)
        }
        if (owl.trigValue(anchor)) {
            // TrigValue
            return RndShakeTrigValue(anchor)
        }
        if (owl.constraint(anchor)) {
            // Constraint
            return RndShakeConstraint(anchor)
        }
        if (owl.constraints(anchor)) {
            // Constraints
            return RndShakeConstraints(anchor)
        }
        if (typeof anchor === 'number' && owl.num(anchor)) {
            anchor = cal.blur(anchor)
            // Integer
            if (owl.int(anchor)) {
                return RndShakeN(anchor)
            }
            // Decimal
            if (owl.num(anchor)) {
                return RndShakeR(anchor)
            }
            if (isNaN(anchor)) {
                return []
            }
        }
        if (anchor === undefined) return []
        throw MathError('Fail to RndShake: ' + anchor)
    }






    /**
     * 3 nearby same-signed integers, range = Max(5, anchor * 10%)
     * ```
     * RndShakeN(5) // return 3 unique integers from 1-10
     * ```
     */
    @checkIt(owl.int)
    static RndShakeN(anchor: number): [number, number, number] {
        anchor = cal.blur(anchor)
        let a = Abs(anchor)
        let s = Sign(anchor)
        let f: () => number

        if (anchor === 0) {
            f = () => RndN(1, 3)
        } else {
            let range = Max(3, a * 0.1)
            let max = Min(Floor(a + range), cal.logCeil(a) - 1)
            let min = Max(Ceil(a - range), 1, cal.logFloor(a))
            f = () => RndN(min, max) * s
        }

        return dice(f)
            .shield(x => x !== anchor)
            .unique()
            .rolls(3) as [number, number, number]
    }





    /**
     * 3 nearby same-signed real number with same precision, range = anchor * 50%
     * ```
     * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
     * ```
     */
    @checkIt(owl.num)
    static RndShakeR(anchor: number): number[] {
        let exp = cal.e(anchor)
        let m = cal.blur(cal.mantissa(anchor))
        if (IsInteger(m))
            return RndShakeN(m).map(x => Number(x + "e" + exp))
        let dp = cal.dp(m)
        return dice(() => Fix(m * (1 + RndR(0, 0.5) * RndU()), dp))
            .shield(x => x * m > 0)
            .shield(x => cal.e(x) === cal.e(m))
            .shield(x => x !== m)
            .unique()
            .rolls(3)
            .map(x => Number(x + "e" + exp))
    }


    /**
     * 3 nearby same-sign rational by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
     * ```
     * RndShakeQ(5/6)
     * // return 3 unique fractions around [5,6]
     * RndShakeQ(6/-5)
     * // return 3 unique fractions around [6,-5]
     * ```
     */
    @checkIt(owl.rational)
    static RndShakeQ(anchor: number): number[] {
        if (owl.int(anchor)) return RndShakeN(anchor)
        let [p, q]: Fraction = ToFrac(anchor);
        [p, q] = [p, q].map(cal.blur)
        Should(IsInteger(p, q), 'input should be integral fraction')
        return dice(
            (): Fraction => {
                const h = RndShakeN(p)[0]
                const k = RndShakeN(q)[0]
                let a = RndR(0, 1) < 1 / Math.abs(p) ? p : h
                let b = RndR(0, 1) < 1 / Math.abs(q) ? q : k
                if (a === p && b === q) return [h, k]
                return [a, b]
            })
            .shield(([a, b]) => AreCoprime(a, b))
            .shield(([a, b]) => a !== 0)
            .shield(([a, b]) => b !== 0)
            .shield(([a, b]) => b !== 1)
            .shield(([a, b]) => b !== 1)
            .shield(([a, b]) => IsProbability(p / q) ? IsProbability(a / b) : true)
            .unique(([p, q]) => p / q)
            .rolls(3)
            .map(([p, q]) => p / q)
    }




    /**
     * an array of 3 ineq signs, balanced in number.
     * ```
     * RndShakeIneq('\\ge')
     * // may return ['\\ge','\\le','\\le']
     * ```
     */
    @checkIt(owl.ineq)
    static RndShakeIneq(anchor: Ineq): Ineq[] {
        let i = ineq(anchor)
        let me = i.print()
        let flip = i.flip()
        return list(me, flip, flip).shuffled()
    }



    /**
     * an array of 3 point, both x and y are unique
     * ```
     * RndShakePoint([3,4])
     * // may return [[2,5],[1,6],[4,2]]
     * ```
     */
    @checkIt(owl.point2D)
    static RndShakePoint(anchor: Point2D): Point2D[] {
        let [x, y] = anchor
        let func = (): Point2D => {
            const h = IsInteger(x) ? RndShakeN(x)[0] : RndShakeR(x)[0]
            const k = IsInteger(y) ? RndShakeN(y)[0] : RndShakeR(y)[0]
            return [h, k]
        }
        return dice(func)
            .unique(([x, y]) => x)
            .unique(([x, y]) => y)
            .rolls(3)
    }




    /**
     * an array of 3 combo
     * ```
     * RndShakeCombo([true,true,true])
     * // may return [[true,false,true],[false,true,false],[false,true,true]]
     * ```
     */
    @checkIt(owl.combo)
    static RndShakeCombo(anchor: [boolean, boolean, boolean]): [boolean, boolean, boolean][] {
        let [a, b, c] = anchor
        let func = (): [boolean, boolean, boolean] => {
            return [
                RndT() ? a : !a,
                RndT() ? b : !b,
                RndT() ? c : !c
            ]
        }

        let diff = (bools: boolean[]) => { return bools.some($ => $) && bools.some($ => !$) }
        return dice(func).unique()
            .coherent(all => diff([a, ...all.map($ => $[0])]))
            .coherent(all => diff([b, ...all.map($ => $[1])]))
            .coherent(all => diff([c, ...all.map($ => $[2])]))
            .rolls(3)
    }



    /**
     * an array of 3 trig
     * ```
     * RndShakeTrig('sin')
     * // may return ['cos','sin','cos']
     * ```
     */
    @checkIt(owl.trig)
    static RndShakeTrig(anchor: TrigFunc): TrigFunc[] {
        return [...list<TrigFunc>('sin', 'cos', 'tan').draws(3)!]
    }




    /**
     * an array of 3 TrigValue
     * ```
     * RndShakeTrigValue(['sin','x'])
     * // may return [['cos','x'],['sin','x'],['cos','x']]
     * ```
     */
    @checkIt(owl.trigValue)
    static RndShakeTrigValue(anchor: TrigValue): TrigValue[] {
        return RndShakeTrig(anchor[0]).map(x => [x as TrigFunc, anchor[1]])
    }








    /**
     * an array of 3 ratios
     * ```
     * RndShakeRatio([4,5,6])
     * // may return [[3,6,5],[7,5,3],[8,4,5]]
     * ```
     */
    @checkIt(owl.ntuple)
    static RndShakeRatio(anchor: number[]): number[][] {
        anchor = [...toNumbers(anchor).ratio()]
        let func = (): number[] => {
            return anchor.map(x => RndR(0, 1) < 1 / (Math.abs(x) + 1) ? x : RndShakeN(x)[0])
        }
        return dice(func)
            .shield(r => toNumbers(r).hcf() === 1)
            .shield(r => AreDifferent(anchor, r))
            .unique()
            .rolls(3)
    }




    /**
     * an array of 3 ratios
     * ```
     * RndShakeBase('AB0CD_{16}')
     * // may return ['BB0CE_{16}','AB0DD_{16}','BA0BE_{16}']
     * ```
     */
    @checkIt(owl.base)
    static RndShakeBase(anchor: string): string[] {
        let [num, base] = anchor.split('_')
        base = base.replace('{', '').replace('}', '')
        let digits = '0123456789ABCDEF'.substring(0, Number(base)).split('')

        function shake(d: string): string {
            let x = digits.indexOf(d) + RndU()
            if (x < 0) x = 0
            if (x > digits.length - 1) x = digits.length - 1
            return digits[x]
        }

        function mutate(str: string): string {
            let s = []
            let nonzero = str.split('').filter(_ => _ !== '0').length
            for (let d of str.split('')) {
                if (d === '0') {
                    let go = poker.bool(0.1)
                    s.push(go ? toList(digits).draw()! : '0')
                } else {
                    let go = poker.bool(1 / (nonzero + 2))
                    s.push(go ? shake(d) : d)
                }
            }
            let T = s.join('')
            if (poker.bool(0.2)) T += '0'
            return T
        }

        function dress(str: string): string {
            str = str.replace(/^0+/, '')
            return str + '_{' + base + '}'
        }

        let f = (): string[] => {
            let middle = Math.ceil(num.length / 2)
            let s1 = num.slice(0, middle)
            let s2 = num.slice(middle)

            let t1 = mutate(s1)
            let t2 = mutate(s2)

            let B1 = dress(s1 + t2)
            let B2 = dress(t1 + s2)
            let B3 = dress(t1 + t2)

            return [B1, B2, B3]
        }
        return dice(f).shield(_ => toList<string>([num, ..._]).dupless()).roll()
    }





    /**
     * an array of 3 points, all are special in polar coordinates
     * ```
     * RndShakePointPolar([3,60])
     * // may return [[3, 120], [3*sqrt(2), 120], [3*sqrt(2), 60]]
     * ```
     */
    @checkIt(owl.point2D)
    static RndShakePointPolar(anchor: Point2D): Point2D[] {
        let [r1, q1] = RectToPol(anchor)
        let [a, b] = cal.toSurd(r1)
        let r2 = b === 1 ? a * Math.sqrt(RndPick(2, 3)) : a
        let angles = list(30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330)
        let q2 = angles.except([q1]).draw()!
        return RndShuffle<PolarPoint>([r1, q2], [r2, q1], [r2, q2]).map($ => PolToRect($))
    }





    /**
     * an array of 3 constraint, with only the sign shaken
     * ```
     * RndShakeConstraint([1,2,'>',3])
     * // may return [[1,2,'>',3], [1,2,'<',3], [1,2,'<',3]]
     * ```
     */
    @checkIt(owl.constraint)
    static RndShakeConstraint(anchor: Constraint): Constraint[] {
        let flip = rein(anchor).flip().constraint
        return list(anchor, flip, flip).shuffled()
    }



    /**
     * an array of 3 sets of constraints, with only the sign shaken
     * ```
     * RndShakeConstraints([
     *   [1,2,'>',3], [4,5,'>',6]
     * ])
     * // may return [
     * // [[1,2,'>',3],[4,5,'>',6]],
     * // [[1,2,'<',3],[4,5,'<',6]],
     * // [[1,2,'<',3],[4,5,'>',6]]
     * // ]
     * ```
     */
    @checkIt(owl.constraints)
    static RndShakeConstraints(anchor: Constraint[]): Constraint[][] {
        let func = () => [...toReins(anchor).shake().map($ => $.constraint)]
        return dice(func)
            .forbid(anchor)
            .shield($ => toReins($).isConsistent())
            .unique()
            .rolls(3)
    }


    @checkIt(owl.quantity)
    static RndShakeQuantity(anchor: quantity): quantity[] {
        let { val, unit } = anchor
        let vals = RndShake(val)
        return vals.map($ => ({ val: $, unit }))
    }

}




declare global {
    var RndShake: typeof Host.RndShake
    var RndShakeN: typeof Host.RndShakeN
    var RndShakeR: typeof Host.RndShakeR
    var RndShakeQ: typeof Host.RndShakeQ
    var RndShakeIneq: typeof Host.RndShakeIneq
    var RndShakePoint: typeof Host.RndShakePoint
    var RndShakeCombo: typeof Host.RndShakeCombo
    var RndShakeTrig: typeof Host.RndShakeTrig
    var RndShakeTrigValue: typeof Host.RndShakeTrigValue
    var RndShakeRatio: typeof Host.RndShakeRatio
    var RndShakeBase: typeof Host.RndShakeBase
    var RndShakePointPolar: typeof Host.RndShakePointPolar
    var RndShakeConstraint: typeof Host.RndShakeConstraint
    var RndShakeConstraints: typeof Host.RndShakeConstraints
    var RndShakeQuantity: typeof Host.RndShakeQuantity

}


