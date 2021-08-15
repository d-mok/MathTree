

/**
 * @category Geometry
 * @return the slope of AB
 * ```
 * Slope([0,0],[1,2]) // 2
 * Slope([1,2],[1,2]) // NaN
 * ```
 */
function Slope(A: Point2D, B: Point2D): number {
    return (A[1] - B[1]) / (A[0] - B[0]);
}
globalThis.Slope = contract(Slope).seal({
    arg: [owl.point],
    args: function not_vertical(A, B) { return !cal.eq(A[0], B[0]) }
})


/**
 * @category Geometry
 * @return the distance AB
 * ```
 * Distance([0,0],[1,2]) // 2.23606797749979
 * ```
 */
function Distance(A: Point2D, B: Point2D): number {
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
function ChessboardDistance(A: Point2D, B: Point2D): number {
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
function MidPoint(A: Point2D, B: Point2D): Point2D {
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
function DivisionPoint(A: Point2D, B: Point2D, ratio = 0.5): Point2D {
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
function RotatePoint(P: Point2D, O: Point2D, q: number): Point2D {
    return vec2D(O, P).rotate(q).add(O).blur().toArray()
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
function Direction(A: Point2D, B: Point2D): number {
    return vec2D(A, B).argument()
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
function Normal(A: Point2D, B: Point2D): number {
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
function PerpendicularFoot(A: Point2D, B: Point2D, P: Point2D): Point2D {
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
function Intersection(A: Point2D, B: Point2D, C: Point2D, D: Point2D): Point2D {
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
function TranslatePoint(P: Point2D, q: number | Point2D, distance: number): Point2D {
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
 * @return Translate point P to the right by a distance.
 * ```
 * TranslateX([1,2],3) // [4,2]
 * TranslateX([1,2],-3) // [-2,2]
 * ```
 */
function TranslateX(P: Point2D, distance: number): Point2D {
    return TranslatePoint(P, 0, distance)
}
globalThis.TranslateX = contract(TranslateX).sign([owl.point, owl.num])





/**
 * @category Geometry
 * @return Translate point P upward by a distance.
 * ```
 * TranslateY([1,2],3) // [4,2]
 * TranslateY([1,2],-3) // [-2,2]
 * ```
 */
function TranslateY(P: Point2D, distance: number): Point2D {
    return TranslatePoint(P, 90, distance)
}
globalThis.TranslateY = contract(TranslateY).sign([owl.point, owl.num])






/**
 * @category Geometry
 * @return Reflect point P about x-axis
 * ```
 * ReflectX([1,2]) // [1,-2]
 * ReflectX([1,-2]) // [1,2]
 * ```
 */
function ReflectX(P: Point2D): Point2D {
    return [P[0], -P[1]]
}
globalThis.ReflectX = contract(ReflectX).sign([owl.point])




/**
 * @category Geometry
 * @return Reflect point P about y-axis
 * ```
 * ReflectY([1,2]) // [-1,2]
 * ReflectY([-1,2]) // [1,2]
 * ```
 */
function ReflectY(P: Point2D): Point2D {
    return [-P[0], P[1]]
}
globalThis.ReflectY = contract(ReflectY).sign([owl.point])






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
function Angle(A: Point2D, O: Point2D, B: Point2D): number {
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
 * ```
 * AnglePolar([1,0],[0,0],[0,2]) // 90
 * AnglePolar([2,2],[1,1],[1,3]) // 45
 * AnglePolar([1,3],[1,1],[2,2]) // 315
 * ```
 */
function AnglePolar(A: Point2D, O: Point2D, B: Point2D): number {
    let a = vec2D(O, A).argument()
    let b = vec2D(O, B).argument()
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
 * ```
 * IsReflex([1,0],[0,0],[0,2]) // false
 * IsReflex([2,2],[1,1],[1,3]) // false
 * IsReflex([1,3],[1,1],[2,2]) // true
 * ```
 */
function IsReflex(A: Point2D, O: Point2D, B: Point2D): boolean {
    let angle = AnglePolar(A, O, B)
    return angle > 180
}
globalThis.IsReflex = contract(IsReflex).seal({
    arg: [owl.point],
    args: function distinct_points(A, O, B) {
        return owl.distinct([A, O]) && owl.distinct([B, O])
    }
})



/**
 * @category Geometry
 * @return points from turtle walk
 * ```
 * Turtle([0,0],[90,1],[90,1],[90,1]) // [[0,0],[1,0],[1,1],[0,1]]
 * ```
 */
function Turtle(start: Point2D, ...walk: [rotate: number, distance: number][]): Point2D[] {
    let arr: Point2D[] = [start]
    let lastPoint = start
    let facing = 0
    for (let w of walk) {
        let [rot, dist] = w
        facing += rot
        let P = TranslatePoint(lastPoint, facing, dist)
        arr.push(P)
        lastPoint = P
    }
    return arr
}
globalThis.Turtle = contract(Turtle).sign([owl.point, owl.couple])



/**
 * @category Geometry
 * @return points on a regular polygon
 * ```
 * RegularPolygon(4,[0,0],1,0) // [[1,0],[0,1],[-1,0],[0,-1]]
 * ```
 */
function RegularPolygon(n: number, center: Point2D, radius: number, startAngle: number) {
    let a = 360 / n
    let arr: Point2D[] = []
    for (let i = 0; i < n; i++) {
        let p = PolToRect([radius, startAngle + i * a])
        p[0] += center[0]
        p[1] += center[1]
        p[0] = cal.blur(p[0])
        p[1] = cal.blur(p[1])
        arr.push(p)
    }
    return arr
}
globalThis.RegularPolygon = contract(RegularPolygon).sign([owl.num, owl.point, owl.num, owl.num])








/**
 * @category Geometry
 * @return arc length with given radius and angle
 * ```
 * ArcLength(2,90) // pi
 * ArcLength(2,180) // 2*pi
 * ```
 */
function ArcLength(radius: number, theta: number): number {
    return 2 * Math.PI * radius * theta / 360
}
globalThis.ArcLength = contract(ArcLength).sign([owl.nonNegative, owl.nonNegative])




/**
 * @category Geometry
 * @return check is convex polygon
 * ```
 * IsConvexPolygon([0,0],[1,0],[0,1]) // true
 * IsConvexPolygon([0,0],[3,0],[1,1],[0,3]) // false
 * ```
 */
function IsConvexPolygon(...points: Point2D[]): boolean {
    Should(points.length >= 3, "must have at least 3 points to be a polygon");
    return toShape2D(points).isConvex()
}
globalThis.IsConvexPolygon = contract(IsConvexPolygon).sign([owl.point])