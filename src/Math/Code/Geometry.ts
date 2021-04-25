
/**
 * @category Geometry
 * @return the slope of AB
 * ```typescript
 * Slope([0,0],[1,2]) // 2
 * Slope([1,2],[1,2]) // NaN
 * ```
 */
function Slope(A: Point, B: Point): number {
    Should(IsPoint(A, B), 'input must be point')
    Should(Blur(A[0] - B[0]) !== 0, 'slope is infinite')
    return (A[1] - B[1]) / (A[0] - B[0]);
}
globalThis.Slope = Slope


/**
 * @category Geometry
 * @return the distance AB
 * ```typescript
 * Distance([0,0],[1,2]) // 2.23606797749979
 * ```
 */
function Distance(A: Point, B: Point): number {
    Should(IsPoint(A, B), 'input must be point')
    return ((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2) ** 0.5;
}
globalThis.Distance = Distance


/**
 * @category Geometry
 * @return the chessboard distance AB, max(horizontal,vertical)
 * ```typescript
 * ChessboardDistance([0,0],[1,2]) // 2
 * ChessboardDistance([0,0],[3,2]) // 3
 * ```
 */
function ChessboardDistance(A: Point, B: Point): number {
    Should(IsPoint(A, B), 'input must be point')
    let x = Abs(A[0] - B[0])
    let y = Abs(A[1] - B[1])
    return Max(x, y)
}
globalThis.ChessboardDistance = ChessboardDistance

/**
 * @category Geometry
 * @return the mid-pt of AB
 * ```typescript
 * MidPoint([1,2],[3,4]) // [2,3]
 * ```
 */
function MidPoint(A: Point, B: Point): Point {
    Should(IsPoint(A, B), 'input must be point')
    return [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
}
globalThis.MidPoint = MidPoint

/**
 * @category Geometry
 * @return the point P on AB such that AP : PB = ratio : 1-ratio
 * ```typescript
 * DivisionPoint([1,0],[5,0],0.75) // [4,0]
 * ```
 */
function DivisionPoint(A: Point, B: Point, ratio = 0.5): Point {
    Should(IsPoint(A, B), 'input must be point')
    Should(IsNum(ratio), 'ratio must be num')
    let r = ratio;
    let s = 1 - r;
    return [A[0] * s + B[0] * r, A[1] * s + B[1] * r];
}
globalThis.DivisionPoint = DivisionPoint


/**
 * @category Geometry
 * @return point P rotated anticlockwise by angle q about point O.
 * ```typescript
 * RotatePoint([1,2],[0,0],90) // [-2,1]
 * ```
 */
function RotatePoint(P: Point, O: Point, q: number): Point {
    Should(IsPoint(P, O), 'input must be point')
    Should(IsNum(q), 'q must be num')
    let v = Vector(O, P);
    v = VectorRotate(v, q)
    return VectorAdd(O, v);
}
globalThis.RotatePoint = RotatePoint


/**
 * @category Geometry
 * @return the polar angle of B if A is the origin within [0,360].
 * ```typescript
 * Inclination([1,0],[3,2]) // 45
 * Inclination([3,2],[1,0]) // 225
 * ```
 */
function Inclination(A: Point, B: Point): number {
    Should(IsPoint(A, B), 'input must be point')
    Should(AreDistinctPoint(A, B), 'A, B should be distinct')
    return VectorArg(Vector(A, B))
}
globalThis.Inclination = Inclination





/**
 * @category Geometry
 * @return the polar angle of a normal direction to AB, on the right of AB.
 * ```typescript
 * Normal([1,0],[3,2]) // 315
 * Normal([3,2],[1,0]) // 135
 * ```
 */
function Normal(A: Point, B: Point): number {
    Should(IsPoint(A, B), 'input must be point')
    Should(AreDistinctPoint(A, B), 'A, B should be distinct')
    let R = RotatePoint(B, A, -90);
    return Inclination(A, R);
}
globalThis.Normal = Normal

/**
 * @category Geometry
 * @return the foot of perpendicular from P to AB.
 * ```typescript
 * PerpendicularFoot([-1,-1],[1,1],[-2,2]) // [0,0]
 * ```
 */
function PerpendicularFoot(A: Point, B: Point, P: Point): Point {
    Should(IsPoint(A, B, P), 'input must be point')
    Should(AreDistinctPoint(A, B), 'A,B should be distinct')
    let q = Normal(A, B);
    let V = PolToRect([1, q]);
    let Q = VectorAdd(P, V);
    return Intersection(A, B, P, Q);
}
globalThis.PerpendicularFoot = PerpendicularFoot


/**
 * @category Geometry
 * @return the intersection point of AB and CD.
 * ```typescript
 * Intersection([0,0],[2,2],[2,0],[0,2]) // [1,1]
 * ```
 */
function Intersection(A: Point, B: Point, C: Point, D: Point): Point {
    Should(IsPoint(A, B, C, D), 'input must be point')
    Should(AreDistinctPoint(A, B), 'A,B should be distinct')
    Should(AreDistinctPoint(C, D), 'C,D should be distinct')
    return Crammer(
        B[1] - A[1],
        A[0] - B[0],
        A[0] * B[1] - B[0] * A[1],
        D[1] - C[1],
        C[0] - D[0],
        C[0] * D[1] - D[0] * C[1],
    )
}
globalThis.Intersection = Intersection


/**
 * @category Geometry
 * @return Translate point P in the polar angle q (or the direction of point q) by a distance.
 * ```typescript
 * TranslatePoint([1,2],90,3) // [1,5]
 * TranslatePoint([1,2],[10, 12],3) // [3.006894195, 4.229882439]
 * ```
 */
function TranslatePoint(P: Point, q: number | Point, distance: number): Point {
    Should(IsPoint(P), "P must be point")
    Should(IsPoint(q) || IsNum(q), "q must be point or num")
    Should(IsNum(distance), "distance must be num")
    if (Array.isArray(q)) q = Inclination(P, q)
    let x = P[0] + distance * cos(q)
    let y = P[1] + distance * sin(q)
    return [x, y]
}
globalThis.TranslatePoint = TranslatePoint


/**
 * @category Geometry
 * @return angle of intersection between two slopes
 * ```typescript
 * IntersectAngle(0,1) // 45
 * IntersectAngle(1,-1) // 90
 * ```
 */
function IntersectAngle(slope1: number, slope2: number): number {
    Should(IsNum(slope1, slope2), 'slopes must be num')
    let A1 = arctan(slope1)
    let A2 = arctan(slope2)
    let d = Abs(A1 - A2)
    if (d > 90) d = 180 - d
    return d
}
globalThis.IntersectAngle = IntersectAngle



/**
 * @category Geometry
 * @return angle AOB, non-reflex
 * ```typescript
 * Angle([1,0],[0,0],[0,2]) // 90
 * Angle([2,2],[1,1],[1,3]) // 45
 * Angle([1,3],[1,1],[2,2]) // 45
 * ```
 */
function Angle(A: Point, O: Point, B: Point): number {
    Should(IsPoint(A, O, B), 'input must be point')
    Should(AreDistinctPoint(A, O), 'A, O should be distinct')
    Should(AreDistinctPoint(B, O), 'B, O should be distinct')
    let anglePolar = AnglePolar(A, O, B)
    return IsReflex(A, O, B) ? 360 - anglePolar : anglePolar
}
globalThis.Angle = Angle




/**
 * @category Geometry
 * @return angle AOB, measured anticlockwise
 * ```typescript
 * AnglePolar([1,0],[0,0],[0,2]) // 90
 * AnglePolar([2,2],[1,1],[1,3]) // 45
 * AnglePolar([1,3],[1,1],[2,2]) // 315
 * ```
 */
function AnglePolar(A: Point, O: Point, B: Point): number {
    Should(IsPoint(A, O, B), 'input must be point')
    Should(AreDistinctPoint(A, O), 'A, O should be distinct')
    Should(AreDistinctPoint(B, O), 'B, O should be distinct')
    let a = VectorArg(Vector(O, A))
    let b = VectorArg(Vector(O, B))
    return a <= b ? b - a : 360 + b - a
}
globalThis.AnglePolar = AnglePolar



/**
 * @category Geometry
 * @return check if the polar angle AOB is reflex
 * ```typescript
 * IsReflex([1,0],[0,0],[0,2]) // false
 * IsReflex([2,2],[1,1],[1,3]) // false
 * IsReflex([1,3],[1,1],[2,2]) // true
 * ```
 */
function IsReflex(A: Point, O: Point, B: Point): boolean {
    Should(IsPoint(A, O, B), 'input must be point')
    let angle = AnglePolar(A, O, B)
    return angle > 180
}
globalThis.IsReflex = IsReflex
