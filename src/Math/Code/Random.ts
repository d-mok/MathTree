/**
 * @category Random
 * @return a random integer in [min, max] inclusive.
 * ```
 * RndN(2,5) // may return 2, 3, 4 or 5
 * ```
 */
function RndN(min: number, max: number): number {
    return poker.integer(min, max);
}
globalThis.RndN = contract(RndN).sign([owl.num])

/**
 * @category Random
 * @return an array of n unique random integer in [min, max] inclusive.
 * ```
 * RndNs(2,8,3) // may return [5,3,7]
 * ```
 */
function RndNs(min: number, max: number, n: number = 10): number[] {
    n = Math.min(Math.floor(max - min + 1), n)
    return dice(() => RndN(min, max)).unique().rolls(n);
}
globalThis.RndNs = contract(RndNs).sign([owl.num, owl.num, owl.positiveInt])


/**
 * @category Random
 * @return a random real number in [min, max] inclusive
 * ```
 * RndR(1,2) // may return 1.242574363
 * ```
 */
function RndR(min: number, max: number): number {
    return poker.real(min, max);
}
globalThis.RndR = contract(RndR).sign([owl.num])


/**
 * @category Random
 * @return an array of n unique random real number in [min, max] inclusive.
 * ```
 * RndRs(2,8,3) // may return [5.5315,3.653456,7.542345]
 * ```
 */
function RndRs(min: number, max: number, n: number = 10): number[] {
    return dice(() => RndR(min, max)).unique().rolls(n);
}
globalThis.RndRs = contract(RndRs).sign([owl.num, owl.num, owl.positiveInt])



/**
 * @category Random
 * @return a random fraction (non-integer) with largest numerator / denominator, within range inclusive.
 * ```
 * RndQ(9,[2,9]) // may return 7/2
 * RndQ(-9,[-9,9]) // may return 7/2 or -7/2, i.e. can be +ve or -ve
 * ```
 */
function RndQ(largest: number = 9, range?: interval): number {
    let L = Math.abs(largest)
    let sign = largest > 0 ? 1 : RndU()
    let f = () => RndN(1, L) / RndN(2, L) * sign

    let d = dice(f).shield(_ => owl.dec(_))
    if (range) {
        d.shield(_ => _ >= range[0])
            .shield(_ => _ <= range[1])
    }
    return d.roll()

}
globalThis.RndQ = contract(RndQ).sign([owl.nonZeroInt, owl.interval])



/**
 * @category Random
 * @return an array of n unique random fractions (non-integer) .
 * ```
 * RndQs(9,[2,9],3) // may return [5/2,7/3,9/2]
 * ```
 */
function RndQs(largest: number = 9, range?: interval, n: number = 10): number[] {
    n = Math.min(Math.abs(largest) + 1, n)
    return dice(() => RndQ(largest, range)).unique().rolls(n);
}
globalThis.RndQs = contract(RndQs).sign([owl.nonZeroInt, owl.interval, owl.positiveInt])




/**
 * @category Random
 * @return 1 or -1
 * ```
 * RndU() // may return 1 or -1
 * ```
 */
function RndU(): 1 | -1 {
    return list<1 | -1>(1, -1).draw()!
}
globalThis.RndU = RndU


/**
 * @category Random
 * @return true or false.
 * ```
 * RndT() // may return true or false
 * ```
 */
function RndT(): boolean {
    return poker.bool()
}
globalThis.RndT = RndT




/**
 * @category Random
 * @return a random integer in [min, max] or [-max, -min] inclusive.
 * ```
 * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
 * ```
 */
function RndZ(min: number, max: number): number {
    return RndN(min, max) * RndU();
}
globalThis.RndZ = contract(RndZ).sign([owl.num])




/**
 * @category Random
 * @param n - default to 10
 * @return an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive.
 * ```
 * RndZs(2,8,3) // may return [5,-3,7]
 * ```
 */
function RndZs(min: number, max: number, n: number = 10): number[] {
    n = Math.min(Math.floor(max - min + 1), n)
    return dice(() => RndN(min, max)).unique().rolls(n).map(x => x * RndU());
}
globalThis.RndZs = contract(RndZs).sign([owl.nonNegative, owl.nonNegative, owl.positiveInt])





/**
 * @category Random
 * @return a random prime number less than or equal to max.
 * ```
 * RndP(10) // may return 2, 3, 5 or 7
 * ```
 */
function RndP(max: number): number {
    return poker.prime(2, max)!
}
globalThis.RndP = contract(RndP).sign([owl.positive])





/**
 * @category Random
 * @return a random odd integer in [min, max] inclusive
 * ```
 * RndOdd(3,8) // return 3, 5 or 7
 * ```
 */
function RndOdd(min: number, max: number): number {
    min = Math.ceil((min + 1) / 2);
    max = Math.floor((max + 1) / 2);
    return 2 * RndN(min, max) - 1;
}
globalThis.RndOdd = contract(RndOdd).sign([owl.num])



/**
 * @category Random
 * @return a random even integer in [min, max] inclusive
 * ``` 
 * RndEven(3,8) // return 4, 6 or 8
 * ```
 */
function RndEven(min: number, max: number): number {
    min = Math.ceil(min / 2);
    max = Math.floor(max / 2);
    return 2 * RndN(min, max);
}
globalThis.RndEven = contract(RndEven).sign([owl.num])



/**
 * @category Random
 * @return an array of random polynomial coefficients
 * ```
 * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)] 
 * ```
 */
function RndPoly(...coeff: number[]): number[] {
    let arr = coeff.map(x => RndZ(1, x))
    arr[0] = Math.abs(arr[0])
    return arr
}
globalThis.RndPoly = contract(RndPoly).sign([owl.positive])




/**
 * @category Random
 * @return an array of a Pyth Triple
 * ```
 * RndPyth(10) // may return [3,4,5]
 * ```
 */
function RndPyth(max = 100): [number, number, number] {
    let arr: [number, number, number][] = [];
    for (let m = 1; m < 10; m++) {
        for (let n = 1; n < m; n++) {
            for (let k = 1; k < 10; k++) {
                let a = m * m - n * n;
                let b = 2 * m * n;
                let c = m * m + n * n;
                if (c <= max) arr.push([a, b, c]);
            }
        }
    }
    return toList(arr).draw()!
}
globalThis.RndPyth = contract(RndPyth).sign([owl.positive])


/**
 * @category Random
 * @return a point within given range, x and y are distinct and non-zero
 * ```
 * RndPoint([1,4],[10,14]) // may return [2,12]
 * RndPoint(2,4) // equivalent to RndPoint([-2,2],[-4,4])
 * RndPoint(2) // equivalent to RndPoint([-2,2],[-2,2])
 * ```
 */
function RndPoint(xRange: number | interval, yRange: number | interval = xRange): Point2D {
    if (typeof xRange === 'number') xRange = [-xRange, xRange]
    if (typeof yRange === 'number') yRange = [-yRange, yRange]
    let [x1, x2] = xRange
    let [y1, y2] = yRange
    let f = (): Point2D => [RndN(x1, x2), RndN(y1, y2)]
    return dice(f)
        .shield(([x, y]) => x !== 0)
        .shield(([x, y]) => y !== 0)
        .shield(([x, y]) => x !== y)
        .roll()
}
globalThis.RndPoint = contract(RndPoint).sign([owl.or([owl.num, owl.interval])])



/**
 * @category Random
 * @return n points within given range, no horizontal / vertical / collinear
 * ```
 * RndPoints([1,4],[10,14],3) // may return [[2,12],[3,11],[1,13]]
 * ```
 */
function RndPoints(xRange: number | interval, yRange: number | interval = xRange, n = 10): Point2D[] {
    return dice(() => RndPoint(xRange, yRange))
        .unique(([x, y]) => x)
        .unique(([x, y]) => y)
        .coherent($ => toList($).combinations(3).every(([A, B, C]) => Slope(A, B) !== Slope(B, C)))
        .rolls(n)
}
globalThis.RndPoints = contract(RndPoints)
    .sign([owl.or([owl.num, owl.interval]), owl.or([owl.num, owl.interval]), owl.num])


/**
 * @category Random
 * @return n angles in [0,360] at least cyclic separated by separation
 * ```
 * RndAngles(3,50) // may return [30,90,200]
 * ```
 */
function RndAngles(n: number, separation: number): number[] {
    let angles = dice(() => RndN(0, 360))
        .coherent(angles => toNumbers(angles).gapsMod(360).min() > separation)
        .unique()
        .rolls(n)
    return [...toList(angles).ascending()]
}
globalThis.RndAngles = contract(RndAngles).sign([owl.positiveInt, owl.positive])



/**
 * @category Random
 * @return `n` points on a unit circle at least cyclic separated by separation
 * ```
 * RndOnCircle(3,50) // may return [[1,0],[0,1],[-1,0]]]
 * ```
 */
function RndOnCircle(n: number, separation: number): Point2D[] {
    let t = RndN(0, 360)
    return RndAngles(n, separation).map($ => OnCircle($ + t))
}
globalThis.RndOnCircle = contract(RndOnCircle).sign([owl.positiveInt, owl.positive])


/**
 * @category Random
 * @return n vertices of a convex polygon generated by rounding a cyclic polygon
 * ```
 * RndConvexPolygon(3,[0,0],10,50) // may return [[10,0],[-6,8],[0,-10]]
 * ```
 */
function RndConvexPolygon(n: number, center: Point2D, radius: number, separation: number): Point2D[] {
    let [h, k] = center
    let r = radius
    let angles = RndAngles(n, separation)
    let vertices: Point2D[] = angles.map(a => [h + r * cos(a), k + r * sin(a)])
    vertices = vertices.map(([x, y]) => [Fix(x), Fix(y)])
    return vertices
}
globalThis.RndConvexPolygon = contract(RndConvexPolygon)
    .sign([owl.positiveInt, owl.point2D, owl.positive, owl.positive])




/**
 * @category Random
 * @return n integers from [min, max], must be uni-moded
 * ```
 * RndData(10,15,5) // may return [11,11,12,13,15]
 * ```
 */
function RndData(min: number, max: number, n: number): number[] {
    let data = dice(() => RndN(min, max))
        .coherent(d => toData(d).isSingleMode())
        .rolls(n)
    return toList(data).ascending()
}
globalThis.RndData = contract(RndData).sign([owl.num, owl.num, owl.positiveInt])


/**
 * @category Random
 * @return 3 points forming a triangle, with min angle and length
 * ```
 * RndTriangle([0,5],[0,5],{minAngle:30,minLength:2}) 
 * ```
 */
function RndTriangle(xRange: interval, yRange: interval, {
    minAngle = 0,
    maxAngle = 180,
    minLength = 0,
    obtuse = false
} = {}): [Point2D, Point2D, Point2D] {
    let [x1, x2] = xRange
    let [y1, y2] = yRange
    let arr: Point2D[] = []
    for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
            arr.push([i, j])
        }
    }
    arr = RndShuffle(...arr)



    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                let A = arr[i]
                let B = arr[j]
                let C = arr[k]
                if (A[0] === B[0]) continue
                if (B[0] === C[0]) continue
                if (C[0] === A[0]) continue
                if (A[1] === B[1]) continue
                if (B[1] === C[1]) continue
                if (C[1] === A[1]) continue
                if (Slope(A, B) === Slope(B, C)) continue
                let A_ = Angle(C, A, B)
                let B_ = Angle(A, B, C)
                let C_ = Angle(B, C, A)
                let smallestAngle = Min(A_, B_, C_)
                let largestAngle = Max(A_, B_, C_)
                if (smallestAngle < minAngle) continue
                if (largestAngle > maxAngle) continue
                if (Distance(A, B) < minLength) continue
                if (Distance(B, C) < minLength) continue
                if (Distance(C, A) < minLength) continue
                if (obtuse && largestAngle <= 90) continue
                return [A, B, C]
            }
        }
    }
    throw 'RndTriangle fail to find a suitable triangle.'

}
globalThis.RndTriangle = contract(RndTriangle).sign([owl.interval, owl.interval, owl.object])







/**
 * @category Random
 * @return an array like ['sin',60] representing sin 60, which is numerically equivalent to the input
 * ```
 * RndTrigValue('sin',60) // RndPick(['sin',60],['sin',120],['cos',30],['cos',330])
 * ```
 */
function RndTrigValue(func: TrigFunc, angle: number): TrigValue {
    let trig = (funcName: TrigFunc, q: number): number => {
        if (funcName === 'sin') return sin(q)
        if (funcName === 'cos') return cos(q)
        if (funcName === 'tan') return tan(q)
        throw 'never'
    }
    let atrig = (funcName: TrigFunc, val: number): number => {
        if (funcName === 'sin') return arcsin(val)
        if (funcName === 'cos') return arccos(val)
        if (funcName === 'tan') return arctan(val)
        throw 'never'
    }
    let v = trig(func, angle)
    angle = atrig(func, Abs(trig(func, angle)))
    angle = cal.blur(angle)
    let arr: TrigValue[] = []
    for (let f of ['sin', 'cos', 'tan']) {
        for (let a of [0, 90, 180, 270, 360]) {
            for (let s of [angle, -angle]) {
                if (a === 360 && s > 0) continue
                if (a === 0 && s < 0) continue
                if (cal.eq(trig(f as TrigFunc, a + s), v)) arr.push([f as TrigFunc, a + s])
            }
        }
    }
    return RndPick(...arr)
}
globalThis.RndTrigValue = contract(RndTrigValue).sign([owl.trig, owl.num])





/**
 * @category Random
 * @return an array like ['sin',180,-1,'x'] representing sin(180-x), which is numerically equivalent to the input
 * ```
 * RndTrigEqv('sin','x') // RndPick(['sin',180,-1,'x'],['cos',90,-1,'x'],['cos',270,1,'x'])
 * ```
 */
function RndTrigEqv(result: 'sin' | '-sin' | 'cos' | '-cos' | 'tan' | '-tan' | '1/tan' | '-1/tan', label: string): TrigExp {
    let trig = (funcName: TrigFunc, angle: number): number => {
        if (funcName === 'sin') return sin(angle)
        if (funcName === 'cos') return cos(angle)
        if (funcName === 'tan') return tan(angle)
        throw 'never'
    }
    let v: number = 0
    if (result === 'sin') v = sin(1)
    if (result === '-sin') v = -sin(1)
    if (result === 'cos') v = cos(1)
    if (result === '-cos') v = -cos(1)
    if (result === 'tan') v = tan(1)
    if (result === '-tan') v = -tan(1)
    if (result === '1/tan') v = 1 / tan(1)
    if (result === '-1/tan') v = -1 / tan(1)
    let arr: TrigExp[] = []
    for (let f of ['sin', 'cos', 'tan']) {
        for (let a of [90, 180, 270, 360]) {
            for (let s of [1, -1]) {
                if (a === 360 && s > 0) continue
                if (cal.eq(trig(f as TrigFunc, a + s), v))
                    arr.push([f as TrigFunc, a, s as 1 | -1, label])
            }
        }
    }
    return RndPick(...arr)
}
globalThis.RndTrigEqv = contract(RndTrigEqv).sign([owl.str, owl.str])




/**
 * @category Random
 * @return a random point (in rect coord) at special polar angle and radius, whose rect coords must be in the form of a*sqrt(b).
 * ```
 * RndPointPolar()
 * // maybe [sqrt(3),3] representing polar [2*sqrt(3),60]
 * ```
 */
function RndPointPolar(): Point2D {
    let angle = RndPick(30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330)
    let a = RndEven(2, 6)
    let b = RndPick(1, 2, 3)
    let r = a * Math.sqrt(b)
    return PolToRect([r, angle])
}
globalThis.RndPointPolar = contract(RndPointPolar).sign([])


/**
 * @category Random
 * @return a random ratio group in [min, max] inclusive.
 * ```
 * RndRatio(2,9,3) // may return [3,7,5]
 * ```
 */
function RndRatio(min: number, max: number, n: number = 10): number[] {
    let nums = RndNs(min, max, n)
    return toNumbers(nums).ratio()
}
globalThis.RndRatio = contract(RndRatio).sign([owl.positive, owl.positive, owl.positiveInt])
