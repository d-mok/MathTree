import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'
import { dice } from 'fate'
import _ from 'lodash'
import * as math from 'mathjs'
import Chance from 'chance'

@exposeAll()
@captureAll()
export class Host {
    /**
     * a random integer in [min, max] inclusive.
     * ```
     * RndN(2,5) // may return 2, 3, 4 or 5
     * ```
     */
    @checkIt(owl.num)
    static RndN(min: number, max: number): number {
        return new Chance().integer({ min, max })
    }

    /**
     * an array of n unique random integer in [min, max] inclusive.
     * ```
     * RndNs(2,8,3) // may return [5,3,7]
     * RndNs(2,8,3,'asc') // ascending
     * RndNs(2,8,3,'desc') // descending
     * ```
     */
    @checkIt(owl.num, owl.num, owl.positiveInt, owl.str)
    static RndNs(
        min: number,
        max: number,
        n: number = 10,
        sort: 'asc' | 'desc' | 'none' = 'none'
    ): number[] {
        n = Math.min(Math.floor(max - min + 1), n)
        let nums = dice(() => RndN(min, max))
            .unique()
            .rolls(n)
        if (sort === 'asc') return Sort(...nums)
        if (sort === 'desc') return Sort(...nums).reverse()
        return nums
    }

    /**
     * a random real number in [min, max] inclusive
     * ```
     * RndR(1,2) // may return 1.242574363
     * ```
     */
    @checkIt(owl.num)
    static RndR(min: number, max: number): number {
        return _.random(min, max, true)
    }

    /**
     * an array of n unique random real number in [min, max] inclusive.
     * ```
     * RndRs(2,8,3) // may return [5.5315,3.653456,7.542345]
     * ```
     */
    @checkIt(owl.num, owl.num, owl.positiveInt, owl.str)
    static RndRs(min: number, max: number, n: number = 10): number[] {
        return dice(() => RndR(min, max))
            .unique()
            .rolls(n)
    }

    /**
     * a random fraction (non-integer) with largest numerator / denominator, within range inclusive.
     * ```
     * RndQ(9,[2,9]) // may return 7/2
     * RndQ(-9,[-9,9]) // may return 7/2 or -7/2, i.e. can be +ve or -ve
     * ```
     */
    @checkIt(owl.nonZeroInt, owl.interval)
    static RndQ(largest: number = 9, range?: interval): number {
        let L = Math.abs(largest)
        let sign = largest > 0 ? 1 : RndU()
        let f = () => (RndN(1, L) / RndN(2, L)) * sign

        return dice(f)
            .shield($ => owl.dec($))
            .shield($ => {
                if (range === undefined) return true
                let [a, b] = range
                return $ >= a && $ <= b
            })
            .roll()
    }

    /**
     * an array of n unique random fractions (non-integer) .
     * ```
     * RndQs(9,[2,9],3) // may return [5/2,7/3,9/2]
     * ```
     */
    @checkIt(owl.nonZeroInt, owl.interval, owl.positiveInt)
    static RndQs(
        largest: number = 9,
        range?: interval,
        n: number = 10
    ): number[] {
        n = Math.min(Math.abs(largest) + 1, n)
        return dice(() => RndQ(largest, range))
            .unique()
            .rolls(n)
    }

    /**
     * 1 or -1
     * ```
     * RndU() // may return 1 or -1
     * ```
     */
    static RndU(): 1 | -1 {
        return _.sample([1, -1])!
    }

    /**
     * true or false.
     * ```
     * RndT() // may return true or false
     * RndT(0.6) // 60% true
     * ```
     */
    static RndT(trueChance: number = 0.5): boolean {
        return new Chance().bool({ likelihood: trueChance * 100 })
    }

    /**
     * a random integer in [min, max] or [-max, -min] inclusive.
     * ```
     * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
     * ```
     */
    @checkIt(owl.num)
    static RndZ(min: number, max: number): number {
        return RndN(min, max) * RndU()
    }

    /**
     * @param n - default to 10
     * an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive.
     * ```
     * RndZs(2,8,3) // may return [5,-3,7]
     * RndZs(2,8,3,'asc') // ascending
     * RndZs(2,8,3,'desc') // descending
     * ```
     */
    @checkIt(owl.nonNegative, owl.nonNegative, owl.positiveInt, owl.str)
    static RndZs(
        min: number,
        max: number,
        n: number = 10,
        sort: 'asc' | 'desc' | 'none' = 'none'
    ): number[] {
        n = Math.min(Math.floor(max - min + 1), n)
        let nums = dice(() => RndN(min, max))
            .unique()
            .rolls(n)
            .map(x => x * RndU())
        if (sort === 'asc') return Sort(...nums)
        if (sort === 'desc') return Sort(...nums).reverse()
        return nums
    }

    /**
     * a random prime number less than or equal to max.
     * ```
     * RndP(10) // may return 2, 3, 5 or 7
     * ```
     */
    @checkIt(owl.positive)
    static RndP(max: number): number {
        // @ts-ignore
        return new Chance().prime({ min: 1, max })
    }

    /**
     * a random odd integer in [min, max] inclusive
     * ```
     * RndOdd(3,8) // return 3, 5 or 7
     * ```
     */
    @checkIt(owl.num)
    static RndOdd(min: number, max: number): number {
        min = Math.ceil((min + 1) / 2)
        max = Math.floor((max + 1) / 2)
        return 2 * RndN(min, max) - 1
    }

    /**
     * a random even integer in [min, max] inclusive
     * ```
     * RndEven(3,8) // return 4, 6 or 8
     * ```
     */
    @checkIt(owl.num)
    static RndEven(min: number, max: number): number {
        min = Math.ceil(min / 2)
        max = Math.floor(max / 2)
        return 2 * RndN(min, max)
    }

    /**
     * a random composite number built from `n` factors in `factors`.
     * ```
     * RndComposite([2,3,5],3) // return 2*2*2, 2*3*5, 2*3*3, ...
     * ```
     */
    @checkIt(owl.array(owl.positiveInt), owl.positiveInt)
    static RndComposite(factors: number[], n: number): number {
        let num = 1
        for (let i = 1; i <= n; i++) {
            num *= RndPick(...factors)
        }
        return num
    }

    /**
     * an array of random polynomial coefficients
     * ```
     * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)]
     * ```
     */
    @checkIt(owl.positive)
    static RndPoly(...coeff: number[]): number[] {
        let arr = coeff.map(x => RndZ(1, x))
        arr[0] = Math.abs(arr[0])
        return arr
    }

    /**
     * an array of a Pyth Triple
     * ```
     * RndPyth(10) // may return [3,4,5]
     * ```
     */
    @checkIt(owl.positive)
    static RndPyth(max = 100): [number, number, number] {
        let arr: [number, number, number][] = []
        for (let m = 1; m < 10; m++) {
            for (let n = 1; n < m; n++) {
                for (let k = 1; k < 10; k++) {
                    let a = m * m - n * n
                    let b = 2 * m * n
                    let c = m * m + n * n
                    if (c <= max) arr.push([a, b, c])
                }
            }
        }
        return _.sample(arr)!
    }

    /**
     * a point within given range, x and y are distinct and non-zero
     * ```
     * RndPoint([1,4],[10,14]) // may return [2,12]
     * RndPoint(2,4) // equivalent to RndPoint([-2,2],[-4,4])
     * RndPoint(2) // equivalent to RndPoint([-2,2],[-2,2])
     * ```
     */
    @checkIt(owl.or(owl.num, owl.interval))
    static RndPoint(
        xRange: number | interval,
        yRange: number | interval = xRange
    ): Point2D {
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

    /**
     * n points within given range, no horizontal / vertical / collinear
     * ```
     * RndPoints([1,4],[10,14],3) // may return [[2,12],[3,11],[1,13]]
     * ```
     */
    @checkIt(
        owl.or(owl.num, owl.interval),
        owl.or(owl.num, owl.interval),
        owl.num
    )
    static RndPoints(
        xRange: number | interval,
        yRange: number | interval = xRange,
        n = 10
    ): Point2D[] {
        return dice(() => RndPoint(xRange, yRange))
            .unique(([x, y]) => x)
            .unique(([x, y]) => y)
            .coherent($ =>
                $.combinations(3).every(
                    ([A, B, C]) => Slope(A, B) !== Slope(B, C)
                )
            )
            .rolls(n)
    }

    /**
     * n angles in [0,360] at least cyclic separated by `separation`
     * ```
     * RndAngles(3,50) // may return [30,90,200]
     * ```
     */
    @checkIt(owl.positiveInt, owl.positive)
    static RndAngles(n: number, separation: number): number[] {
        function farEnough([a, b]: [number, number]): boolean {
            let d1 = Abs(a - b)
            let d2 = 360 - d1
            return d1 > separation && d2 > separation
        }

        let angles = dice(() => RndN(0, 360))
            .coherent(angles => angles.combinations(2).every(farEnough))
            .unique()
            .rolls(n)
        return _.sortBy(angles)
    }

    /**
     * `n` points on a unit circle at least cyclic separated by separation
     * ```
     * RndOnCircle(3,50) // may return [[1,0],[0,1],[-1,0]]]
     * ```
     */
    @checkIt(owl.positiveInt, owl.positive)
    static RndOnCircle(n: number, separation: number): Point2D[] {
        let t = RndN(0, 360)
        return RndAngles(n, separation).map($ => OnCircle($ + t))
    }

    /**
     * n vertices of a convex polygon generated by rounding a cyclic polygon
     * ```
     * RndConvexPolygon(3,[0,0],10,50) // may return [[10,0],[-6,8],[0,-10]]
     * ```
     */
    @checkIt(owl.positiveInt, owl.point2D, owl.positive, owl.positive)
    static RndConvexPolygon(
        n: number,
        center: Point2D,
        radius: number,
        separation: number
    ): Point2D[] {
        let [h, k] = center
        let r = radius
        let angles = RndAngles(n, separation)
        let vertices: Point2D[] = angles.map(a => [
            h + r * cos(a),
            k + r * sin(a),
        ])
        vertices = vertices.map(([x, y]) => [Fix(x), Fix(y)])
        return vertices
    }

    /**
     * n integers from [min, max], must be uni-moded
     * ```
     * RndData(10,15,5) // may return [11,11,12,13,15]
     * ```
     */
    @checkIt(owl.num, owl.num, owl.positiveInt)
    static RndData(min: number, max: number, n: number): number[] {
        let data = dice(() => RndN(min, max))
            .coherent(d => cal.mode(d).length === 1)
            .rolls(n)
        return _.sortBy(data)
    }

    /**
     * 3 points forming a triangle, with min angle and length
     * ```
     * RndTriangle([0,5],[0,5],{minAngle:30,minLength:2})
     * ```
     */
    @checkIt(owl.interval, owl.interval, owl.object())
    static RndTriangle(
        xRange: interval,
        yRange: interval,
        { minAngle = 0, maxAngle = 180, minLength = 0, obtuse = false } = {}
    ): [Point2D, Point2D, Point2D] {
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

    /**
     * an array like ['sin',60] representing sin 60, which is numerically equivalent to the input
     * ```
     * RndTrigValue('sin',60) // RndPick(['sin',60],['sin',120],['cos',30],['cos',330])
     * ```
     */
    @checkIt(owl.trig, owl.num)
    static RndTrigValue(func: TrigFunc, angle: number): TrigValue {
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
                    if (cal.eq(trig(f as TrigFunc, a + s), v))
                        arr.push([f as TrigFunc, a + s])
                }
            }
        }
        return RndPick(...arr)
    }

    /**
     * an array like ['sin',180,-1,'x'] representing sin(180-x), which is numerically equivalent to the input
     * ```
     * RndTrigEqv('sin','x') // RndPick(['sin',180,-1,'x'],['cos',90,-1,'x'],['cos',270,1,'x'])
     * ```
     */
    @checkIt(owl.str, owl.str)
    static RndTrigEqv(
        result:
            | 'sin'
            | '-sin'
            | 'cos'
            | '-cos'
            | 'tan'
            | '-tan'
            | '1/tan'
            | '-1/tan',
        label: string
    ): TrigExp {
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

    /**
     * a random point (in rect coord) at special polar angle and radius, whose rect coords must be in the form of a*sqrt(b).
     * ```
     * RndPointPolar()
     * // maybe [sqrt(3),3] representing polar [2*sqrt(3),60]
     * ```
     */
    static RndPointPolar(): Point2D {
        let angle = RndPick(
            30,
            45,
            60,
            120,
            135,
            150,
            210,
            225,
            240,
            300,
            315,
            330
        )
        let a = RndEven(2, 6)
        let b = RndPick(1, 2, 3)
        let r = a * Math.sqrt(b)
        return PolToRect([r, angle])
    }

    /**
     * a random ratio group in [min, max] inclusive.
     * ```
     * RndRatio(2,9,3) // may return [3,7,5]
     * ```
     */
    @checkIt(owl.positive, owl.positive, owl.positiveInt)
    static RndRatio(min: number, max: number, n: number = 10): number[] {
        let nums = RndNs(min, max, n)
        return Ratio(...nums)
    }

    /**
     * a random partition of integer `n`.
     * ```
     * RndPartition(4) // may return [1,2,1]
     * RndPartition(4, 2, false) // may return [3,1] or [2,2]
     * RndPartition(4, 2, true) // may return [4,0] or [3,1] or [2,2]
     * ```
     */
    @checkIt(owl.positiveInt, owl.positiveInt, owl.bool)
    static RndPartition(
        n: number,
        length?: number,
        allowZero = false
    ): number[] {
        let arr = Partition(n, length, allowZero)
        return RndShuffle(...RndPick(...arr))
    }
}

declare global {
    var RndN: typeof Host.RndN
    var RndNs: typeof Host.RndNs
    var RndR: typeof Host.RndR
    var RndRs: typeof Host.RndRs
    var RndQ: typeof Host.RndQ
    var RndQs: typeof Host.RndQs
    var RndU: typeof Host.RndU
    var RndT: typeof Host.RndT
    var RndZ: typeof Host.RndZ
    var RndZs: typeof Host.RndZs
    var RndP: typeof Host.RndP
    var RndOdd: typeof Host.RndOdd
    var RndEven: typeof Host.RndEven
    var RndComposite: typeof Host.RndComposite
    var RndPoly: typeof Host.RndPoly
    var RndPyth: typeof Host.RndPyth
    var RndPoint: typeof Host.RndPoint
    var RndPoints: typeof Host.RndPoints
    var RndAngles: typeof Host.RndAngles
    var RndOnCircle: typeof Host.RndOnCircle
    var RndConvexPolygon: typeof Host.RndConvexPolygon
    var RndData: typeof Host.RndData
    var RndTriangle: typeof Host.RndTriangle
    var RndTrigValue: typeof Host.RndTrigValue
    var RndTrigEqv: typeof Host.RndTrigEqv
    var RndPointPolar: typeof Host.RndPointPolar
    var RndRatio: typeof Host.RndRatio
    var RndPartition: typeof Host.RndPartition
}
