
/**
 * @category Geometry
 * @return the slope of AB
 * ```
 * Slope([0,0],[1,2]) // 2
 * Slope([1,2],[1,2]) // NaN
 * ```
 */
function Slope(A: Point, B: Point): number {
    return (A[1] - B[1]) / (A[0] - B[0]);
}
globalThis.Slope = contract(Slope).seal({
    arg: [owl.point],
    args: function not_vertical(A, B) { return ant.blur(A[0] - B[0]) !== 0 }
})


/**
 * @category Geometry
 * @return the distance AB
 * ```
 * Distance([0,0],[1,2]) // 2.23606797749979
 * ```
 */
function Distance(A: Point, B: Point): number {
    return ((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2) ** 0.5;
}
globalThis.Distance = contract(Distance).sign([owl.point])


/**
 * @category Geometry
 * @return the chessboard distance AB, max(horizontal,vertical)
 * ```
 * ChessboardDistance([0,0],[1,2]) // 2
 * ChessboardDistance([0,0],[3,2]) // 3
 * ```
 */
function ChessboardDistance(A: Point, B: Point): number {
    let x = Abs(A[0] - B[0])
    let y = Abs(A[1] - B[1])
    return Max(x, y)
}
globalThis.ChessboardDistance = contract(ChessboardDistance).sign([owl.point])

/**
 * @category Geometry
 * @return the mid-pt of AB
 * ```
 * MidPoint([1,2],[3,4]) // [2,3]
 * ```
 */
function MidPoint(A: Point, B: Point): Point {
    return [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
}
globalThis.MidPoint = contract(MidPoint).sign([owl.point])

/**
 * @category Geometry
 * @return the point P on AB such that AP : PB = ratio : 1-ratio
 * ```
 * DivisionPoint([1,0],[5,0],0.75) // [4,0]
 * ```
 */
function DivisionPoint(A: Point, B: Point, ratio = 0.5): Point {
    let r = ratio;
    let s = 1 - r;
    return [A[0] * s + B[0] * r, A[1] * s + B[1] * r];
}
globalThis.DivisionPoint = contract(DivisionPoint).sign([owl.point, owl.point, owl.num])


/**
 * @category Geometry
 * @return point P rotated anticlockwise by angle q about point O.
 * ```
 * RotatePoint([1,2],[0,0],90) // [-2,1]
 * ```
 */
function RotatePoint(P: Point, O: Point, q: number): Point {
    let v = Vector(O, P);
    v = VectorRotate(v, q)
    return VectorAdd(O, v);
}
globalThis.RotatePoint = contract(RotatePoint).sign([owl.point, owl.point, owl.num])


/**
 * @category Geometry
 * @return the polar angle of B if A is the origin within [0,360].
 * ```
 * Direction([1,0],[3,2]) // 45
 * Direction([3,2],[1,0]) // 225
 * ```
 */
function Direction(A: Point, B: Point): number {
    return VectorArg(Vector(A, B))
}
globalThis.Direction = contract(Direction).seal({
    arg: [owl.point],
    args: function distinct_points(A, B) { return owl.distinct([A, B]) }
})





/**
 * @category Geometry
 * @return the polar angle of a normal direction to AB, on the right of AB.
 * ```
 * Normal([1,0],[3,2]) // 315
 * Normal([3,2],[1,0]) // 135
 * ```
 */
function Normal(A: Point, B: Point): number {
    let R = RotatePoint(B, A, -90);
    return Direction(A, R);
}
globalThis.Normal = contract(Normal).seal({
    arg: [owl.point],
    args: function distinct_points(A, B) { return owl.distinct([A, B]) }
})

/**
 * @category Geometry
 * @return the foot of perpendicular from P to AB.
 * ```
 * PerpendicularFoot([-1,-1],[1,1],[-2,2]) // [0,0]
 * ```
 */
function PerpendicularFoot(A: Point, B: Point, P: Point): Point {
    let q = Normal(A, B);
    let V = PolToRect([1, q]);
    let Q = VectorAdd(P, V);
    return Intersection(A, B, P, Q);
}
globalThis.PerpendicularFoot = contract(PerpendicularFoot).seal({
    arg: [owl.point],
    args: function distinct_points(A, B, P) { return owl.distinct([A, B]) }
})


/**
 * @category Geometry
 * @return the intersection point of AB and CD.
 * ```
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
globalThis.Intersection = contract(Intersection).seal({
    arg: [owl.point],
    args: function distinct_points(A, B, C, D) {
        return owl.distinct([A, B]) && owl.distinct([C, D])
    }
})



/**
 * @category Geometry
 * @return Translate point P in the polar angle q (or the direction of point q) by a distance.
 * ```
 * TranslatePoint([1,2],90,3) // [1,5]
 * TranslatePoint([1,2],[10, 12],3) // [3.006894195, 4.229882439]
 * ```
 */
function TranslatePoint(P: Point, q: number | Point, distance: number): Point {
    if (Array.isArray(q)) q = Direction(P, q)
    let x = P[0] + distance * cos(q)
    let y = P[1] + distance * sin(q)
    return [x, y]
}
globalThis.TranslatePoint = contract(TranslatePoint).sign([
    owl.point,
    owl.or([owl.num, owl.point]),
    owl.num
])


/**
 * @category Geometry
 * @return angle of intersection between two slopes
 * ```
 * IntersectAngle(0,1) // 45
 * IntersectAngle(1,-1) // 90
 * ```
 */
function IntersectAngle(slope1: number, slope2: number): number {
    let A1 = arctan(slope1)
    let A2 = arctan(slope2)
    let d = Abs(A1 - A2)
    if (d > 90) d = 180 - d
    return d
}
globalThis.IntersectAngle = contract(IntersectAngle).sign([owl.num])



/**
 * @category Geometry
 * @return angle AOB, non-reflex
 * ```
 * Angle([1,0],[0,0],[0,2]) // 90
 * Angle([2,2],[1,1],[1,3]) // 45
 * Angle([1,3],[1,1],[2,2]) // 45
 * ```
 */
function Angle(A: Point, O: Point, B: Point): number {
    let anglePolar = AnglePolar(A, O, B)
    return IsReflex(A, O, B) ? 360 - anglePolar : anglePolar
}
globalThis.Angle = contract(Angle).seal({
    arg: [owl.point],
    args: function distinct_points(A, O, B) {
        return owl.distinct([A, O]) && owl.distinct([B, O])
    }
})




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
    let a = VectorArg(Vector(O, A))
    let b = VectorArg(Vector(O, B))
    return a <= b ? b - a : 360 + b - a
}
globalThis.AnglePolar = contract(AnglePolar).seal({
    arg: [owl.point],
    args: function distinct_points(A, O, B) {
        return owl.distinct([A, O]) && owl.distinct([B, O])
    }
})



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
    let angle = AnglePolar(A, O, B)
    return angle > 180
}
globalThis.IsReflex = contract(IsReflex).seal({
    arg: [owl.point],
    args: function distinct_points(A, O, B) {
        return owl.distinct([A, O]) && owl.distinct([B, O])
    }
})
