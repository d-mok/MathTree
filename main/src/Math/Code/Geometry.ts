import _ from 'lodash'

/**
 * the slope of AB
 * ```
 * Slope([0,0],[1,2]) // 2
 * Slope([1,2],[1,2]) // NaN
 * ```
 */
export function Slope(A: Point2D, B: Point2D): number {
    return (A[1] - B[1]) / (A[0] - B[0])
}

/**
 * the slope perpendicular to AB
 * ```
 * SlopePd([0,0],[1,2]) // -0.5
 * SlopePd([1,2],[1,2]) // NaN
 * ```
 */
export function SlopePd(A: Point2D, B: Point2D): number {
    return -1 / Slope(A, B)
}

/**
 * the distance AB
 * ```
 * Distance([0,0],[1,2]) // 2.23606797749979
 * ```
 */
export function Distance(A: Point2D, B: Point2D): number {
    return ((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2) ** 0.5
}

/**
 * the chessboard distance AB, max(horizontal,vertical)
 * ```
 * ChessboardDistance([0,0],[1,2]) // 2
 * ChessboardDistance([0,0],[3,2]) // 3
 * ```
 */
export function ChessboardDistance(A: Point2D, B: Point2D): number {
    let x = Abs(A[0] - B[0])
    let y = Abs(A[1] - B[1])
    return Max(x, y)
}

/**
 * the mid-pt / centroid of `points`
 * ```
 * Mid([1,2],[3,4]) // [2,3]
 * Mid([1,2],[3,4],[5,6]) // [3,4]
 * ```
 */
export function Mid(...points: Point2D[]): Point2D {
    return vec.mean(points)
}

/**
 * the point X on dir or segment PQ such that PX : QX = ratioA : ratioB
 * ```
 * Slide([1,0],[5,0],0.75) // [4,0]
 * Slide([1,0],[5,0],3,1) // [4,0]
 * Slide([0,1],[[0,0],[1,0]],1) // [1,1]
 * Slide([0,1],[[0,0],[1,0]],2) // [2,1]
 * ```
 */
export function Slide(
    P: Point2D,
    vec: Point2D | [Point2D, Point2D],
    ratioA: number = 1,
    ratioB: number = 1 - ratioA
): Point2D {
    let r = ratioA / (ratioA + ratioB)
    let s = ratioB / (ratioA + ratioB)
    if (schema.is(schema.point2D, vec)) {
        let Q = vec
        return [P[0] * s + Q[0] * r, P[1] * s + Q[1] * r]
    } else {
        let [A, B] = vec
        let [x, y] = P
        let [xA, yA] = A
        let [xB, yB] = B
        return [x + (xB - xA) * r, y + (yB - yA) * r]
    }
}

/**
 * point P rotated anticlockwise by angle q about point O.
 * ```
 * Rotate([1,2],90,[0,0]) // [-2,1]
 * ```
 */
export function Rotate(P: Point2D, q: number, O: Point2D = [0, 0]): Point2D {
    let v = vec.fromTo(O, P)
    v = Math.rotate(v, q)
    return VecAdd(v, O)
}

/**
 * the polar angle of B if A is the origin within [0,360].
 * ```
 * Dir([1,0],[3,2]) // 45
 * Dir([3,2],[1,0]) // 225
 * ```
 */
export function Dir(A: Point2D, B: Point2D): number {
    if (A[0] === B[0] && A[1] === B[1]) return NaN
    return vec.argument(vec.fromTo(A, B))
}

/**
 * the foot of perpendicular from P to AB.
 * ```
 * PdFoot([-2,2],[[-1,-1],[1,1]]) // [0,0]
 * ```
 */
export function PdFoot(
    P: Point2D,
    [A, B]: [Point2D, Point2D | number]
): Point2D {
    if (typeof B === 'number') B = Move(A, B, 1)
    let AP = vec.fromTo(A, P)
    let AB = vec.fromTo(A, B)
    let p = vec.projection(AP, AB)
    return VecAdd(A, p)
}

/**
 * the intersection point of AB and CD.
 * ```
 * Intersection([0,0],[2,2],[2,0],[0,2]) // [1,1]
 * Intersection([0,0],45,[2,0],135) // [1,1]
 * ```
 */
export function Intersection(
    A: Point2D,
    B: Point2D | number,
    C: Point2D,
    D: Point2D | number
): Point2D {
    if (typeof B === 'number') B = Move(A, B, 1)
    if (typeof D === 'number') D = Move(C, D, 1)
    return Crammer(
        B[1] - A[1],
        A[0] - B[0],
        A[0] * B[1] - B[0] * A[1],
        D[1] - C[1],
        C[0] - D[0],
        C[0] * D[1] - D[0] * C[1]
    )
}

/**
 * Translate point P in the direction `dir` by a `distance`.
 * @param dir - a polar angle, or two points [A,B] representing Dir(A,B), or one point A representing Dir(P,A)
 * ```
 * Move([1,2],90,3) // [1,5]
 * Move([1,2],[2, 2],3) // [4,2]
 * Move([1,2],[[0,0],[1,0]],3) // [4,2]
 * ```
 */
export function Move(
    P: Point2D,
    dir: number | Point2D | [Point2D, Point2D],
    distance: number
): Point2D {
    let q = 0
    if (typeof dir === 'number') {
        q = dir
    } else if (schema.is(schema.point2D, dir)) {
        q = Dir(P, dir)
    } else {
        q = Dir(dir[0], dir[1])
    }
    let x = P[0] + distance * cos(q)
    let y = P[1] + distance * sin(q)
    return [x, y]
}

/**
 * Translate point P to the right by a distance.
 * ```
 * MoveX([1,2],3) // [4,2]
 * MoveX([1,2],-3) // [-2,2]
 * ```
 */
export function MoveX(P: Point2D, distance: number): Point2D {
    let [x, y] = P
    return [x + distance, y]
}

/**
 * Translate point P upward by a distance.
 * ```
 * MoveY([1,2],3) // [4,2]
 * MoveY([1,2],-3) // [-2,2]
 * ```
 */
export function MoveY(P: Point2D, distance: number): Point2D {
    let [x, y] = P
    return [x, y + distance]
}

/**
 * Reflect point P about x-axis
 * ```
 * ReflectX([1,2]) // [1,-2]
 * ReflectX([1,-2]) // [1,2]
 * ```
 */
export function ReflectX(P: Point2D): Point2D {
    return [P[0], -P[1]]
}

/**
 * Reflect point P about y-axis
 * ```
 * ReflectY([1,2]) // [-1,2]
 * ReflectY([-1,2]) // [1,2]
 * ```
 */
export function ReflectY(P: Point2D): Point2D {
    return [-P[0], P[1]]
}

/**
 * angle of intersection between two slopes
 * ```
 * IntersectAngle(0,1) // 45
 * IntersectAngle(1,-1) // 90
 * ```
 */
export function IntersectAngle(slope1: number, slope2: number): number {
    let A1 = arctan(slope1)
    let A2 = arctan(slope2)
    let d = Abs(A1 - A2)
    if (d > 90) d = 180 - d
    return d
}

/**
 * angle AOB, non-reflex
 * ```
 * Angle([1,0],[0,0],[0,2]) // 90
 * Angle([2,2],[1,1],[1,3]) // 45
 * Angle([1,3],[1,1],[2,2]) // 45
 * ```
 */
export function Angle(A: Point2D, O: Point2D, B: Point2D): number {
    if (Object.isEqual(A, O)) return NaN
    if (Object.isEqual(B, O)) return NaN
    let anglePolar = AnglePolar(A, O, B)
    let a = IsReflex(A, O, B) ? 360 - anglePolar : anglePolar
    return a
}

/**
 * angle AOB, measured anticlockwise
 * ```
 * AnglePolar([1,0],[0,0],[0,2]) // 90
 * AnglePolar([2,2],[1,1],[1,3]) // 45
 * AnglePolar([1,3],[1,1],[2,2]) // 315
 * ```
 */
export function AnglePolar(A: Point2D, O: Point2D, B: Point2D): number {
    if (Object.isEqual(A, O)) return NaN
    if (Object.isEqual(B, O)) return NaN
    let a = Dir(O, A)
    let b = Dir(O, B)
    return a <= b ? b - a : 360 + b - a
}

/**
 * check if the polar angle AOB is reflex
 * ```
 * IsReflex([1,0],[0,0],[0,2]) // false
 * IsReflex([2,2],[1,1],[1,3]) // false
 * IsReflex([1,3],[1,1],[2,2]) // true
 * ```
 */
export function IsReflex(A: Point2D, O: Point2D, B: Point2D): boolean {
    if (Object.isEqual(A, O)) return false
    if (Object.isEqual(B, O)) return false
    let angle = AnglePolar(A, O, B)
    return angle > 180
}

/**
 * points on a regular polygon
 * ```
 * RegularPolygon(4,[0,0],1,0) // [[1,0],[0,1],[-1,0],[0,-1]]
 * ```
 */
export function RegularPolygon(
    n: number,
    center: Point2D,
    radius: number,
    startAngle: number
) {
    let a = 360 / n
    let arr: Point2D[] = []
    for (let i = 0; i < n; i++) {
        let p = PolToRect([radius, startAngle + i * a])
        p[0] += center[0]
        p[1] += center[1]
        arr.push(p)
    }
    return arr
}

/**
 * arc length with given radius and angle
 * ```
 * ArcLength(2,90) // pi
 * ArcLength(2,180) // 2*pi
 * ```
 */
export function ArcLength(radius: number, theta: number): number {
    return (2 * Math.PI * radius * theta) / 360
}

/**
 * sector area with given radius and angle
 * ```
 * SectorArea(2,90) // pi
 * SectorArea(2,180) // 2*pi
 * ```
 */
export function SectorArea(radius: number, theta: number): number {
    return (Math.PI * radius * radius * theta) / 360
}

/**
 * check is convex polygon
 * ```
 * IsConvexPolygon([0,0],[1,0],[0,1]) // true
 * IsConvexPolygon([0,0],[3,0],[1,1],[0,3]) // false
 * ```
 */
export function IsConvexPolygon(...points: Point2D[]): boolean {
    if (points.length < 3) {
        throw new Error('must have at least 3 points to be a polygon')
    }
    return vec.isConvex(points)
}

/**
 * Arrange Points in anti-clockwise direction around their mean
 * ```
 * ArrangePoints([0,0],[1,1],[0,1],[1,0]) // [[1, 0],[0, 0],[0, 1],[1, 1]]
 * ArrangePoints([0,0],[1,2],[2,1],[0,1],[1,0])// [[1, 0],[0, 0],[0, 1],[1, 2],[2, 1]]
 * ```
 */
export function ArrangePoints(...points: Point2D[]): Point2D[] {
    return vec.sortAroundMean(points)
}

/**
 * a point with polar coordinates (1, `angle`).
 * ```
 * OnCircle(0) // [1,0]
 * OnCircle(90) // [0,1]
 * ```
 */
export function OnCircle(angle: number): Point2D {
    return PolToRect([1, angle])
}
