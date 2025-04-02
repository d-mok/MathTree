import _ from 'lodash'
import * as math from 'mathjs'

/**
 * Find c from a and b of a right triangle.
 * ```
 * Pyth(3,4) // 5
 * ```
 */
export function Pyth(a: number, b: number): number {
    return (a ** 2 + b ** 2) ** 0.5
}

/**
 * Find b from c and a of a right triangle.
 * ```
 * PythLeg(5,4) // 3
 * ```
 */
export function PythLeg(c: number, a: number): number {
    return (c ** 2 - a ** 2) ** 0.5
}

/**
 * Find side length c by cosine law. Input sides a,b and angle C.
 * ```
 * CosineLawLength(3, 4, 90) // 5
 * ```
 */
export function CosineLawLength(a: number, b: number, C: number): number {
    return (a ** 2 + b ** 2 - 2 * a * b * cos(C)) ** 0.5
}

/**
 * Find angle C by cosine law. Input sides a,b,c.
 * ```
 * CosineLawAngle(5,5,5) // 60
 * CosineLawAngle(3,4,5) // 90
 * CosineLawAngle(7,8,9) // 73.3984504
 * ```
 */
export function CosineLawAngle(a: number, b: number, c: number): number {
    return arccos((c ** 2 - a ** 2 - b ** 2) / (-2 * a * b))
}

/**
 * Find side b by sine law.
 * ```
 * SineLawLength(60,1,60) // 1
 * ```
 */
export function SineLawLength(A: number, a: number, B: number): number {
    return (a / sin(A)) * sin(B)
}

/**
 * Find angle B by sine law. Assume acute.
 * ```
 * SineLawAngle(1,60,1) // 60
 * ```
 */
export function SineLawAngle(a: number, A: number, b: number): number {
    return arcsin((sin(A) / a) * b)
}

/**
 * Find area by Heron's formula.
 * ```
 * Heron(3,4,5) // 6
 * Heron(1,1,1) // 0.433012701
 * Heron(7,8,9) // 26.83281573
 * ```
 */
export function Heron(a: number, b: number, c: number): number {
    let s = (a + b + c) / 2
    return (s * (s - a) * (s - b) * (s - c)) ** 0.5
}

/**
 * Solve SSS triangle.
 * ```
 * SolveSSS(1,sqrt(3),2) // [90,30,60]
 * ```
 */
export function SolveSSS(
    a: number,
    b: number,
    c: number
): [C: number, A: number, B: number] {
    let A = CosineLawAngle(b, c, a)
    let B = CosineLawAngle(c, a, b)
    let C = CosineLawAngle(a, b, c)
    return [C, A, B]
}

/**
 * Solve SAS triangle.
 * ```
 * SolveSAS(1,90,sqrt(3)) // [30,2,60]
 * ```
 */
export function SolveSAS(
    a: number,
    C: number,
    b: number
): [A: number, c: number, B: number] {
    let c = CosineLawLength(a, b, C)
    let [_, A, B] = SolveSSS(a, b, c)
    return [A, c, B]
}

/**
 * Solve AAS triangle.
 * ```
 * SolveAAS(60,90,sqrt(3)) // [1,30,2]
 * ```
 */
export function SolveAAS(
    A: number,
    B: number,
    a: number
): [c: number, C: number, b: number] {
    let C = 180 - A - B
    let b = SineLawLength(A, a, B)
    let c = CosineLawLength(a, b, C)
    return [c, C, b]
}

/**
 * Solve ASA triangle.
 * ```
 * SolveASA(90,sqrt(3),30) // [2,60,1]
 * ```
 */
export function SolveASA(
    A: number,
    c: number,
    B: number
): [a: number, C: number, b: number] {
    let C = 180 - A - B
    let a = SineLawLength(C, c, A)
    let b = SineLawLength(C, c, B)
    return [a, C, b]
}

/**
 * Solve SSA triangle.
 * ```
 * SolveSSA(1,sqrt(3),30) // [90,2,60]
 * ```
 */
export function SolveSSA(
    a: number,
    b: number,
    A: number
): [C: number, c: number, B: number] {
    let B = SineLawAngle(a, A, b)
    let C = 180 - A - B
    let c = SineLawLength(A, a, C)
    return [C, c, B]
}

/**
 * Find heights of SSS triangle.
 * ```
 * HeightsBySSS(1,sqrt(3),2) // [sqrt(3),1,sqrt(3)/2]
 * ```
 */
export function HeightsBySSS(
    a: number,
    b: number,
    c: number
): [Ha: number, Hb: number, Hc: number] {
    let area = Heron(a, b, c)
    let Ha = (2 * area) / a
    let Hb = (2 * area) / b
    let Hc = (2 * area) / c
    return [Ha, Hb, Hc]
}

/**
 * Find height of SSS triangle, against the first base.
 * ```
 * HeightBySSS(1,sqrt(3),2) // sqrt(3)
 * ```
 */
export function HeightBySSS(a: number, b: number, c: number): number {
    let area = Heron(a, b, c)
    return (2 * area) / a
}

/**
 * Find heights of SAS triangle.
 * ```
 * HeightsBySAS(1,90,sqrt(3)) // [sqrt(3),1,sqrt(3)/2]
 * ```
 */
export function HeightsBySAS(
    a: number,
    C: number,
    b: number
): [Ha: number, Hb: number, Hc: number] {
    let [A, c, B] = SolveSAS(a, C, b)
    return HeightsBySSS(a, b, c)
}

/**
 * Find height of SAS triangle, opposite to the given angle.
 * ```
 * HeightBySAS(1,90,sqrt(3)) // sqrt(3)/2
 * ```
 */
export function HeightBySAS(a: number, C: number, b: number): number {
    let [ha, hb, hc] = HeightsBySAS(a, C, b)
    return hc
}

/**
 * @deprecated - use TriangleFromPoint
 * @param fix - Round all return values to integer.
 * Return the 6 elements of a triangle given vertice. { sideC, angleB, sideA, angleC, sideB, angleA }
 * ```
 * TriangleFromVertex([0,0],[4,0],[0,3],false)
 * // {sideC:4, angleB:36.86989765, sideA:5, angleC:53.13013235, sideB:3, angleA:90}
 * ```
 */
export function TriangleFromVertex(
    A: Point2D,
    B: Point2D,
    C: Point2D,
    fix = true
): Triangle {
    let sideC = Distance(A, B)
    let sideA = Distance(B, C)
    let sideB = Distance(C, A)
    let angleC = CosineLawAngle(sideA, sideB, sideC)
    let angleA = CosineLawAngle(sideB, sideC, sideA)
    let angleB = CosineLawAngle(sideA, sideC, sideB)
    if (fix) {
        sideC = Fix(sideC)
        sideA = Fix(sideA)
        sideB = Fix(sideB)
        angleC = Fix(angleC)
        angleA = Fix(angleA)
        angleB = Fix(angleB)
    }
    return { sideC, angleB, sideA, angleC, sideB, angleA }
}

/**
 * @param fix - Round all return values to integer.
 * Return the 6 elements of a triangle given vertice. [sideA, sideB, sideC, angleA, angleB, angleC]
 * ```
 * TriangleFromPoint([0,0],[4,0],[0,3],false)
 * // [5, 3, 4, 90, 36.86989765, 53.13013235]
 * ```
 */
export function TriangleFromPoint(
    A: Point2D,
    B: Point2D,
    C: Point2D,
    fix = true
): [
    sideA: number,
    sideB: number,
    sideC: number,
    angleA: number,
    angleB: number,
    angleC: number
] {
    let sideA = Distance(B, C)
    let sideB = Distance(C, A)
    let sideC = Distance(A, B)
    let angleA = CosineLawAngle(sideB, sideC, sideA)
    let angleB = CosineLawAngle(sideA, sideC, sideB)
    let angleC = 180 - angleA - angleB // keep angle sum 180
    if (fix) {
        sideA = Fix(sideA)
        sideB = Fix(sideB)
        sideC = Fix(sideC)
        angleA = Fix(angleA)
        angleB = Fix(angleB)
        angleC = Fix(angleC)
    }
    return [sideA, sideB, sideC, angleA, angleB, angleC]
}

/**
 * @deprecated
 * Solve a triangle. return the triangle object solved.
 * ```
 * SolveTriangle({sideC:2, sideA:2, sideB:2})
 * // {sideC:2, angleB:60, sideA:2, angleC:60, sideB:2, angleA:60}
 * SolveTriangle({sideC:3, angleB:90, sideA:4})
 * // {sideC:3, angleB:90, sideA:4, angleC:36.86989765, sideB:5, angleA:53.13010235}
 * SolveTriangle({sideC:5, angleB:30, angleC:80})
 * // {sideC:5, angleB:30, sideA:4.770944471, angleC:80, sideB:2.53856653, angleA:70}
 * SolveTriangle({sideC:6, angleB:30, angleA:40})
 * // {sideC:6, angleB:30, sideA:4.10424172, angleC:110, sideB:3.192533317, angleA:40}
 * ```
 */
export function SolveTriangle({
    sideA,
    sideB,
    sideC,
    angleA,
    angleB,
    angleC,
}: Partial<Triangle>): Triangle {
    let a = sideA
    let b = sideB
    let c = sideC
    let A = angleA
    let B = angleB
    let C = angleC

    // temp
    if (a === null) throw 'SolveTriangle not accept null now'
    if (b === null) throw 'SolveTriangle not accept null now'
    if (c === null) throw 'SolveTriangle not accept null now'
    if (A === null) throw 'SolveTriangle not accept null now'
    if (B === null) throw 'SolveTriangle not accept null now'
    if (C === null) throw 'SolveTriangle not accept null now'

    function angleSum() {
        if (A === undefined && B !== undefined && C !== undefined)
            A = 180 - B - C
        if (B === undefined && A !== undefined && C !== undefined)
            B = 180 - A - C
        if (C === undefined && B !== undefined && A !== undefined)
            C = 180 - A - B
    }

    function SSS() {
        if (a !== undefined && b !== undefined && c !== undefined) {
            A = CosineLawAngle(b, c, a)
            B = CosineLawAngle(c, a, b)
            C = CosineLawAngle(a, b, c)
        }
    }

    function SAS() {
        if (
            a !== undefined &&
            b !== undefined &&
            C !== undefined &&
            c === undefined
        )
            c = CosineLawLength(a, b, C)
        if (
            b !== undefined &&
            c !== undefined &&
            A !== undefined &&
            a === undefined
        )
            a = CosineLawLength(b, c, A)
        if (
            c !== undefined &&
            a !== undefined &&
            B !== undefined &&
            b === undefined
        )
            b = CosineLawLength(c, a, B)
    }

    function AAS() {
        let r: number | undefined = undefined
        if (A !== undefined && a !== undefined && r === undefined)
            r = sin(A) / a
        if (B !== undefined && b !== undefined && r === undefined)
            r = sin(B) / b
        if (C !== undefined && c !== undefined && r === undefined)
            r = sin(C) / c
        if (r !== undefined && A !== undefined && a === undefined)
            a = sin(A) / r
        if (r !== undefined && B !== undefined && b === undefined)
            b = sin(B) / r
        if (r !== undefined && C !== undefined && c === undefined)
            c = sin(C) / r
    }

    for (let i = 0; i < 10; i++) {
        if (
            a !== undefined &&
            b !== undefined &&
            c !== undefined &&
            A !== undefined &&
            B !== undefined &&
            C !== undefined
        ) {
            return {
                sideA: a,
                sideB: b,
                sideC: c,
                angleA: A,
                angleB: B,
                angleC: C,
            }
        }
        angleSum()
        SSS()
        SAS()
        AAS()
    }
    Should(false, 'Solve Triangle Fail!')
    throw 'never'
}

/**
 * the orthocentre of a triangle
 * ```
 * Orthocentre([9,-6],[6,10],[-7,10])  // [9,13]
 * ```
 */
export function Orthocentre(A: Point2D, B: Point2D, C: Point2D): Point2D {
    let H = PdFoot(C, [A, B])
    let G = PdFoot(A, [B, C])
    let [x, y] = Intersection(C, H, A, G)
    return [cal.blur(x), cal.blur(y)]
}

/**
 * the circumcentre of a triangle
 * ```
 * Circumcentre([1,7],[8,-4],[-10,0])  // [-1,-2]
 * ```
 */
export function Circumcentre(A: Point2D, B: Point2D, C: Point2D): Point2D {
    let [a1, b1, c1] = LinearFromBisector(A, B)
    let [a2, b2, c2] = LinearFromBisector(B, C)
    let [x, y] = Crammer(a1, b1, -c1, a2, b2, -c2)
    return [cal.blur(x), cal.blur(y)]
}

/**
 * the centroid of a triangle
 * ```
 * Centroid([3,6],[9,12],[15,21])  // [9,13]
 * ```
 */
export function Centroid(A: Point2D, B: Point2D, C: Point2D): Point2D {
    let [x, y] = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3]
    return [cal.blur(x), cal.blur(y)]
}

/**
 * the incentre of a triangle
 * ```
 * Incentre([3,0],[-3,0],[0,4])  // [0,1.5]
 * ```
 */
export function Incentre(A: Point2D, B: Point2D, C: Point2D): Point2D {
    let a = Distance(B, C)
    let b = Distance(A, C)
    let c = Distance(A, B)
    let p = a + b + c
    let x = (a * A[0] + b * B[0] + c * C[0]) / p
    let y = (a * A[1] + b * B[1] + c * C[1]) / p
    return [cal.blur(x), cal.blur(y)]
}

/**
 * the scaled points [A,B,C] so that their orthecentre and themselves becomes integral
 */
export function ScaleOrthocentreToInt(
    A: Point2D,
    B: Point2D,
    C: Point2D
): [Point2D, Point2D, Point2D] {
    let [x, y] = Orthocentre(A, B, C)
    let q = ratioFactor(x, y, ...A, ...B, ...C)
    Should(IsNum(q), 'original orthocentre must be rational')
    return scale([A, B, C], q)
}

/**
 * the scaled points [A,B,C] so that their circumcentre and themselves becomes integral
 */
export function ScaleCircumcentreToInt(
    A: Point2D,
    B: Point2D,
    C: Point2D
): [Point2D, Point2D, Point2D] {
    let [x, y] = Circumcentre(A, B, C)
    let q = ratioFactor(x, y, ...A, ...B, ...C)
    Should(IsNum(q), 'original circumcentre must be rational')
    return scale([A, B, C], q)
}

/**
 * the scaled points [A,B,C] so that their centroid and themselves becomes integral
 */
export function ScaleCentroidToInt(
    A: Point2D,
    B: Point2D,
    C: Point2D
): [Point2D, Point2D, Point2D] {
    let [x, y] = Centroid(A, B, C)
    let q = ratioFactor(x, y, ...A, ...B, ...C)
    Should(IsNum(q), 'original centroid must be rational')
    return scale([A, B, C], q)
}

/**
 * the scaled points [A,B,C] so that their incentre and themselves becomes integral
 */
export function ScaleIncentreToInt(
    A: Point2D,
    B: Point2D,
    C: Point2D
): [Point2D, Point2D, Point2D] {
    let [x, y] = Incentre(A, B, C)
    let q = ratioFactor(x, y, ...A, ...B, ...C)
    Should(IsNum(q), 'original incentre must be rational')
    return scale([A, B, C], q)
}

/**
 * Return the multiplied factor when applying {@link this.ratio()} on this array.
 * ```
 * [2,4,6].ratio() // 0.5
 * [0,4,6].ratio() // 0.5
 * [1.5,2.5,3.5].ratio() // 2
 * [sqrt(2),3].ratio()  // NaN
 * ```
 */
function ratioFactor(...nums: number[]): number {
    let clone = _.without(nums, 0)
    if (clone.length === 0) return NaN
    if (nums.some($ => !IsRational($))) return NaN
    let ratioed = Ratio(...clone)
    return cal.blur(ratioed[0] / clone[0])
}

function scale<T extends [number, number][]>(
    points: [...T],
    factor: number
): T {
    return points.map(([x, y]) => [x * factor, y * factor]) as T
}
