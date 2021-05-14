

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
        // Fraction
        if (owl.dfrac(anchor)) {
            return RndShakeDfrac(anchor)
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
    if (owl.point(anchor)) {
        // Point
        return RndShakePoint(anchor)
    }
    if (owl.combo(anchor)) {
        // Combo
        return RndShakeCombo(anchor)
    }
    if (typeof anchor === 'number' && owl.num(anchor)) {
        anchor = ant.blur(anchor)
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
    function N(): number {
        anchor = ant.blur(anchor)
        if (anchor === 0) return RndN(1, 3)
        let a = Abs(anchor)
        let range = Max(3, a * 0.1)
        let max = Min(Floor(a + range), ant.logCeil(a) - 1)
        let min = Max(Ceil(a - range), 1, ant.logFloor(a))
        return dice.roll(() => RndN(min, max)).brute(x => x !== a) * Sign(anchor)
    }
    return dice.roll(N).unique(3) as [number, number, number]
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
    let exp = ant.e(anchor)
    let m = ant.blur(ant.mantissa(anchor))
    if (IsInteger(m)) return RndShakeN(m).map(x => Number(x + "e" + exp))
    let dp = ant.dp(m)
    let func = dice
        .roll(() => Fix(m * (1 + RndR(0, 0.5) * RndU()), dp))
        .shield(
            x => (x * m > 0) &&
                (ant.e(x) === ant.e(m)) &&
                (x !== m)
        )
    return dice.roll(func).unique(3).map(x => Number(x + "e" + exp))
}
globalThis.RndShakeR = contract(RndShakeR).sign([owl.nonZero])


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
    let f: Fraction = ToFrac(anchor)
    return RndShakeFrac(f).map((x: Fraction): number => x[0] / x[1])
}
globalThis.RndShakeQ = contract(RndShakeQ).sign([owl.rational])



/**
 * @category RandomShake
 * @deprecated
 * @return 3 nearby same-sign fraction by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeFrac([5,6]) 
 * // return 3 unique fractions around [5,6]
 * RndShakeFrac([6,-5])
 * // return 3 unique fractions around [6,-5]
 * ```
 */
function RndShakeFrac(anchor: Fraction): Fraction[] {
    let [p, q] = ant.simpFrac(...anchor);
    [p, q] = [p, q].map(ant.blur)
    Should(IsInteger(p, q), 'input should be integral fraction')
    let func = dice
        .roll(
            (): Fraction => {
                const h = RndShakeN(p)[0]
                const k = RndShakeN(q)[0]
                let a = RndR(0, 1) < 1 / Math.abs(p) ? p : h
                let b = RndR(0, 1) < 1 / Math.abs(q) ? q : k
                if (a === p && b === q) return [h, k]
                return [a, b]
            })
        .shield(
            f => {
                let [a, b] = f
                if (!AreCoprime(a, b)) return false
                if (a === 0 || b === 0) return false
                if (b === 1) return false
                if (IsProbability(p / q) && !IsProbability(a / b)) return false
                return true
            }
        )
    return dice.roll(func).unique(3, _ => _[0] / _[1])
}
globalThis.RndShakeFrac = contract(RndShakeFrac).sign([owl.fraction])


/**
 * @category RandomShake
 * @deprecated
 * @return 3 nearby same-signed Dfrac by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeDfrac('\\dfrac{5}{6}') 
 * // return 3 unique Dfrac around [5,6]
 * RndShakeDfrac('-\\dfrac{6}{5}')
 * // return 3 unique Dfrac around [6,-5]
 * ```
 */
function RndShakeDfrac(anchor: string): string[] {
    let f = ink.parseDfrac(anchor)
    return RndShakeFrac(f).map(x => Dfrac(...x))
}
globalThis.RndShakeDfrac = contract(RndShakeDfrac).sign([owl.dfrac])




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
    return dice.array(IneqSign(...f).reverse()).balanced(3)
}
globalThis.RndShakeIneq = contract(RndShakeIneq).sign([owl.ineq])



/**
 * @category RandomShake
 * @return an array of 3 point
 * ```
 * RndShakePoint([3,4]) 
 * // may return [[2,5],[1,6],[4,2]]
 * ```
 */
function RndShakePoint(anchor: Point): Point[] {
    let [x, y] = anchor
    let func = (): Point => {
        const h = IsInteger(x) ? RndShakeN(x)[0] : RndShakeR(x)[0]
        const k = IsInteger(y) ? RndShakeN(y)[0] : RndShakeR(y)[0]
        return [h, k]
    }
    return dice.roll(func).distinct(3, (a, b) => a[0] === b[0] || a[1] === b[1])
}
globalThis.RndShakePoint = contract(RndShakePoint).sign([owl.point])




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
    return dice.roll(func).unique(3, _ => JSON.stringify(_))
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
    return RndPickN(['sin', 'cos', 'tan'], 3)
}
globalThis.RndShakeTrig = contract(RndShakeTrig).sign([owl.trig])




/**
 * @category RandomShake
 * @return an array of 3 ratios
 * ```
 * RndShakeRatio([4,5,6]) 
 * // may return [[3,6,5],[7,5,3],[8,4,5]]
 * ```
 */
function RndShakeRatio(anchor: number[]): number[][] {
    anchor = ant.ratio(...anchor)
    let func = (): number[] => {
        return anchor.map(x => RndR(0, 1) < 1 / (Math.abs(x) + 1) ? x : RndShakeN(x)[0])
    }
    func = dice.roll(func).shield(r => ant.hcf(...r) === 1)
    return dice.roll(func).unique(3, _ => JSON.stringify(_))
}
globalThis.RndShakeRatio = contract(RndShakeRatio).sign([owl.ntuple])








// /**
//  * @category RandomShake
//  * @return an array of 3 trig
//  * ```
//  * RndShakeTrig('sin') 
//  * // may return ['cos','sin','cos']
//  * ```
//  */
// function RndShakeBase(anchor: string): string[] {
//     let [num, base] = anchor.split('_')
//     base = base.replace('{', '').replace('}', '')
//     let b = Number(base)


// }
// globalThis.RndShakeTrig = contract(RndShakeTrig).sign([owl.trig])





