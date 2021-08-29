

/**
 * @category RandomShake
 * @deprecated
 * @return an array of n nearby values around anchor, within range inclusive, auto detecting the input type.
 * ```
 * RndShake(10) 
 * // equivalent to RndShakeN(10) 
 * RndShake(10.5) 
 * // equivalent to RndShakeR(10.5) 
 * ```
 */
function RndShake(anchor: any): (typeof anchor)[] {
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
globalThis.RndShake = RndShake






/**
 * @category RandomShake
 * @return 3 nearby same-signed integers, range = Max(5, anchor * 10%)
 * ```
 * RndShakeN(5) // return 3 unique integers from 1-10
 * ```
 */
function RndShakeN(anchor: number): [number, number, number] {
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

    return poker.dice(f)
        .shield(x => x !== anchor)
        .unique()
        .rolls(3) as [number, number, number]
}
globalThis.RndShakeN = contract(RndShakeN).sign([owl.int])





/**
 * @category RandomShake
 * @return 3 nearby same-signed real number with same precision, range = anchor * 50%
 * ```
 * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
 * ```
 */
function RndShakeR(anchor: number): number[] {
    let exp = cal.e(anchor)
    let m = cal.blur(cal.mantissa(anchor))
    if (IsInteger(m))
        return RndShakeN(m).map(x => Number(x + "e" + exp))
    let dp = cal.dp(m)
    return poker
        .dice(() => Fix(m * (1 + RndR(0, 0.5) * RndU()), dp))
        .shield(x => x * m > 0)
        .shield(x => cal.e(x) === cal.e(m))
        .shield(x => x !== m)
        .unique()
        .rolls(3)
        .map(x => Number(x + "e" + exp))
}
globalThis.RndShakeR = contract(RndShakeR).sign([owl.num])


/**
 * @category RandomShake
 * @return 3 nearby same-sign rational by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeQ(5/6) 
 * // return 3 unique fractions around [5,6]
 * RndShakeQ(6/-5)
 * // return 3 unique fractions around [6,-5]
 * ```
 */
function RndShakeQ(anchor: number): number[] {
    if (owl.int(anchor)) return RndShakeN(anchor)
    let [p, q]: Fraction = ToFrac(anchor);
    [p, q] = [p, q].map(cal.blur)
    Should(IsInteger(p, q), 'input should be integral fraction')
    return poker
        .dice(
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
globalThis.RndShakeQ = contract(RndShakeQ).sign([owl.rational])



// /**
//  * @category RandomShake
//  * @deprecated
//  * @return 3 nearby same-sign fraction by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
//  * ```
//  * RndShakeFrac([5,6]) 
//  * // return 3 unique fractions around [5,6]
//  * RndShakeFrac([6,-5])
//  * // return 3 unique fractions around [6,-5]
//  * ```
//  */
// function RndShakeFrac(anchor: Fraction): Fraction[] {
//     let [p, q] = cal.toFraction(anchor[0] / anchor[1]);
//     [p, q] = [p, q].map(cal.blur)
//     Should(IsInteger(p, q), 'input should be integral fraction')
//     return poker
//         .dice(
//             (): Fraction => {
//                 const h = RndShakeN(p)[0]
//                 const k = RndShakeN(q)[0]
//                 let a = RndR(0, 1) < 1 / Math.abs(p) ? p : h
//                 let b = RndR(0, 1) < 1 / Math.abs(q) ? q : k
//                 if (a === p && b === q) return [h, k]
//                 return [a, b]
//             })
//         .shield(([a, b]) => AreCoprime(a, b))
//         .shield(([a, b]) => a !== 0)
//         .shield(([a, b]) => b !== 0)
//         .shield(([a, b]) => b !== 1)
//         .shield(([a, b]) => b !== 1)
//         .shield(([a, b]) => IsProbability(p / q) ? IsProbability(a / b) : true)
//         .unique(_ => _[0] / _[1])
//         .rolls(3)
// }
// globalThis.RndShakeFrac = contract(RndShakeFrac).sign([owl.fraction])


// /**
//  * @category RandomShake
//  * @deprecated
//  * @return 3 nearby same-signed Dfrac by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
//  * ```
//  * RndShakeDfrac('\\dfrac{5}{6}') 
//  * // return 3 unique Dfrac around [5,6]
//  * RndShakeDfrac('-\\dfrac{6}{5}')
//  * // return 3 unique Dfrac around [6,-5]
//  * ```
//  */
// function RndShakeDfrac(anchor: string): string[] {
//     Should(false, 'RndShakeDfrac is deprecated')
//     let f = ink.parseDfrac(anchor)
//     return RndShakeFrac(f).map(x => Dfrac(...x))
// }
// globalThis.RndShakeDfrac = contract(RndShakeDfrac).sign([owl.dfrac])




/**
 * @category RandomShake
 * @return an array of 3 ineq signs, balanced in number.
 * ```
 * RndShakeIneq('\\ge') 
 * // may return ['\\ge','\\le','\\le']
 * ```
 */
function RndShakeIneq(anchor: Ineq): string[] {
    let f = ink.parseIneq(anchor)
    let [me, oppo] = IneqSign(...f)
    return list(me, oppo, oppo).shuffled()
}
globalThis.RndShakeIneq = contract(RndShakeIneq).sign([owl.ineq])



/**
 * @category RandomShake
 * @return an array of 3 point, both x and y are unique
 * ```
 * RndShakePoint([3,4]) 
 * // may return [[2,5],[1,6],[4,2]]
 * ```
 */
function RndShakePoint(anchor: Point2D): Point2D[] {
    let [x, y] = anchor
    let func = (): Point2D => {
        const h = IsInteger(x) ? RndShakeN(x)[0] : RndShakeR(x)[0]
        const k = IsInteger(y) ? RndShakeN(y)[0] : RndShakeR(y)[0]
        return [h, k]
    }
    return poker.dice(func)
        .unique(([x, y]) => x)
        .unique(([x, y]) => y)
        .rolls(3)
}
globalThis.RndShakePoint = contract(RndShakePoint).sign([owl.point2D])




/**
 * @category RandomShake
 * @return an array of 3 combo
 * ```
 * RndShakeCombo([true,true,true]) 
 * // may return [[true,false,true],[false,true,false],[false,true,true]]
 * ```
 */
function RndShakeCombo(anchor: [boolean, boolean, boolean]): [boolean, boolean, boolean][] {
    let [a, b, c] = anchor
    let func = (): [boolean, boolean, boolean] => {
        return [
            RndT() ? a : !a,
            RndT() ? b : !b,
            RndT() ? c : !c
        ]
    }
    return poker.dice(func).unique(_ => JSON.stringify(_)).rolls(3)
}
globalThis.RndShakeCombo = contract(RndShakeCombo).sign([owl.combo])



/**
 * @category RandomShake
 * @return an array of 3 trig
 * ```
 * RndShakeTrig('sin') 
 * // may return ['cos','sin','cos']
 * ```
 */
function RndShakeTrig(anchor: TrigFunc): TrigFunc[] {
    return [...list<TrigFunc>('sin', 'cos', 'tan').draws(3)!]
}
globalThis.RndShakeTrig = contract(RndShakeTrig).sign([owl.trig])




/**
 * @category RandomShake
 * @return an array of 3 TrigValue
 * ```
 * RndShakeTrigValue(['sin','x']) 
 * // may return [['cos','x'],['sin','x'],['cos','x']]
 * ```
 */
function RndShakeTrigValue(anchor: TrigValue): TrigValue[] {
    return RndShakeTrig(anchor[0]).map(x => [x as TrigFunc, anchor[1]])
}
globalThis.RndShakeTrigValue = contract(RndShakeTrigValue).sign([owl.trigValue])








/**
 * @category RandomShake
 * @return an array of 3 ratios
 * ```
 * RndShakeRatio([4,5,6]) 
 * // may return [[3,6,5],[7,5,3],[8,4,5]]
 * ```
 */
function RndShakeRatio(anchor: number[]): number[][] {
    anchor = [...toNumbers(anchor).ratio()]
    let func = (): number[] => {
        return anchor.map(x => RndR(0, 1) < 1 / (Math.abs(x) + 1) ? x : RndShakeN(x)[0])
    }
    return poker.dice(func)
        .shield(r => toNumbers(r).hcf() === 1)
        .shield(r => AreDifferent(anchor, r))
        .unique(_ => JSON.stringify(_))
        .rolls(3)
}
globalThis.RndShakeRatio = contract(RndShakeRatio).sign([owl.ntuple])




/**
 * @category RandomShake
 * @return an array of 3 ratios
 * ```
 * RndShakeBase('AB0CD_{16}') 
 * // may return ['BB0CE_{16}','AB0DD_{16}','BA0BE_{16}']
 * ```
 */
function RndShakeBase(anchor: string): string[] {
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
        str = str.replace(/^0+/, '');
        return str + '_{' + base + '}'
    }

    let f = (): string[] => {
        let middle = Math.ceil(num.length / 2);
        let s1 = num.slice(0, middle);
        let s2 = num.slice(middle);

        let t1 = mutate(s1)
        let t2 = mutate(s2)

        let B1 = dress(s1 + t2)
        let B2 = dress(t1 + s2)
        let B3 = dress(t1 + t2)

        return [B1, B2, B3]
    }
    return poker.dice(f).shield(_ => toList<string>([num, ..._]).dupless()).roll()
}
globalThis.RndShakeBase = contract(RndShakeBase).sign([owl.base])





/**
 * @category RandomShake
 * @return an array of 3 points, all are special in polar coordinates
 * ```
 * RndShakePointPolar([3,60])
 * // may return [[3, 120], [3*sqrt(2), 120], [3*sqrt(2), 60]]
 * ```
 */
function RndShakePointPolar(anchor: Point2D): Point2D[] {
    let [r1, q1] = RectToPol(anchor)
    let [a, b] = cal.simplifySurd(r1 ** 2)
    let r2 = b === 1 ? a * Math.sqrt(RndPick(2, 3)) : a
    let angles = list(30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330)
    let q2 = angles.except([q1]).draw()!
    return RndShuffle<PolarPoint>([r1, q2], [r2, q1], [r2, q2]).map($ => PolToRect($))
}
globalThis.RndShakePointPolar = contract(RndShakePointPolar).sign([owl.point2D])
