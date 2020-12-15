
/**
 * @category Geometry
 * @return the slope of AB
 * ```typescript
 * Slope([0,0],[1,2]) // 2
 * Slope([1,2],[1,2]) // NaN
 * ```
 */
function Slope(A: Point, B: Point): number {
    if ((A[0] - B[0]) === 0) return NaN
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
    return ((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2) ** 0.5;
}
globalThis.Distance = Distance

/**
 * @category Geometry
 * @return the mid-pt of AB
 * ```typescript
 * MidPoint([1,2],[3,4]) // [2,3]
 * ```
 */
function MidPoint(A: Point, B: Point): Point {
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
    let v = Vector(O, P);
    v = VectorRotate(v, q)
    return VectorAdd(O, v);
}
globalThis.RotatePoint = RotatePoint


/**
 * @category Geometry
 * @return the polar angle of B if A is the origin within [-180,180].
 * ```typescript
 * Inclination([1,0],[3,2]) // 45
 * Inclination([3,2],[1,0]) // -135
 * ```
 */
function Inclination(A: Point, B: Point): number {
    return Math.atan2(B[1] - A[1], B[0] - A[0]) / Math.PI * 180;
}
globalThis.Inclination = Inclination





/**
 * @category Geometry
 * @return the polar angle of a normal direction to AB, on the right of AB.
 * ```typescript
 * Normal([1,0],[3,2]) // -45
 * Normal([3,2],[1,0]) // 135
 * ```
 */
function Normal(A: Point, B: Point): number {
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
 * @return Translate point P in the polar angle q by a distance.
 * ```typescript
 * TranslatePoint([1,2],90,3) // [1,5]
 * ```
 */
function TranslatePoint(P: Point, q: number | Point, distance: number): Point {
    if (Array.isArray(q)) q = Inclination(P, q)
    let x = P[0] + distance * cos(q)
    let y = P[1] + distance * sin(q)
    return [x, y]
}
globalThis.TranslatePoint = TranslatePoint
