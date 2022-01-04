
import { checkIt, inspectIt, captureAll, exposeAll, check } from 'contract'




@exposeAll()
@captureAll()
export class Host {




    /**
     * the slope of AB
     * ```
     * Slope([0,0],[1,2]) // 2
     * Slope([1,2],[1,2]) // NaN
     * ```
     */
    @checkIt(owl.point2D)
    @inspectIt(function not_vertical(A, B) { return !cal.eq(A[0], B[0]) })
    static Slope(A: Point2D, B: Point2D): number {
        return (A[1] - B[1]) / (A[0] - B[0])
    }

    /**
     * the slope perpendicular to AB
     * ```
     * SlopePd([0,0],[1,2]) // -0.5
     * SlopePd([1,2],[1,2]) // NaN
     * ```
     */
    @checkIt(owl.point2D)
    @inspectIt(function not_horizontal(A, B) { return !cal.eq(A[1], B[1]) })
    static SlopePd(A: Point2D, B: Point2D): number {
        return -1 / Slope(A, B)
    }




    /**
     * the distance AB
     * ```
     * Distance([0,0],[1,2]) // 2.23606797749979
     * ```
     */
    @checkIt(owl.point2D)
    static Distance(A: Point2D, B: Point2D): number {
        return ((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2) ** 0.5
    }


    /**
     * the chessboard distance AB, max(horizontal,vertical)
     * ```
     * ChessboardDistance([0,0],[1,2]) // 2
     * ChessboardDistance([0,0],[3,2]) // 3
     * ```
     */
    @checkIt(owl.point2D)
    static ChessboardDistance(A: Point2D, B: Point2D): number {
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
    @checkIt(owl.point2D)
    static Mid(...points: Point2D[]): Point2D {
        return toShape2D(points).mean().toArray()
    }


    /**
     * the point P on AB such that AP : PB = ratio : 1-ratio
     * ```
     * Slide([1,0],[5,0],0.75) // [4,0]
     * ```
     */
    @checkIt(owl.point2D, owl.point2D, owl.num)
    static Slide(A: Point2D, B: Point2D, ratio: number): Point2D {
        let r = ratio
        let s = 1 - r
        return [A[0] * s + B[0] * r, A[1] * s + B[1] * r]
    }



    /**
     * point P rotated anticlockwise by angle q about point O.
     * ```
     * Rotate([1,2],90,[0,0]) // [-2,1]
     * ```
     */
    @checkIt(owl.point2D, owl.num, owl.point2D)
    static Rotate(P: Point2D, q: number, O: Point2D = [0, 0]): Point2D {
        return vec2D(O, P).rotate(q).add(O).blur().toArray()
    }


    /**
     * the polar angle of B if A is the origin within [0,360].
     * ```
     * Dir([1,0],[3,2]) // 45
     * Dir([3,2],[1,0]) // 225
     * ```
     */
    @checkIt(owl.point2D)
    @inspectIt(function distinct_points(A, B) { return owl.distinct([A, B]) })
    static Dir(A: Point2D, B: Point2D): number {
        return vec2D(A, B).argument()
    }






    /**
     * the foot of perpendicular from P to AB.
     * ```
     * PdFoot([-1,-1],[1,1],[-2,2]) // [0,0]
     * ```
     */
    @checkIt(owl.point2D, owl.arrayWith(owl.or([owl.point2D, owl.num])))
    @inspectIt(function distinct_points(P, [A, B]) { return owl.distinct([A, B]) })
    static PdFoot(P: Point2D, [A, B]: [Point2D, Point2D | number]): Point2D {
        if (typeof B === 'number') B = Move(A, B, 1)
        return vec2D(A, P).projectOn(vec2D(A, B)).add(A).toArray()
    }



    /**
     * the intersection point of AB and CD.
     * ```
     * Intersection([0,0],[2,2],[2,0],[0,2]) // [1,1]
     * ```
     */
    @checkIt(owl.point2D)
    @inspectIt(function distinct_points(A, B, C, D) {
        return owl.distinct([A, B]) && owl.distinct([C, D])
    })
    static Intersection(A: Point2D, B: Point2D, C: Point2D, D: Point2D): Point2D {
        return Crammer(
            B[1] - A[1],
            A[0] - B[0],
            A[0] * B[1] - B[0] * A[1],
            D[1] - C[1],
            C[0] - D[0],
            C[0] * D[1] - D[0] * C[1],
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
    @checkIt(
        owl.point2D,
        owl.or([owl.num, owl.point2D, owl.arrayWith(owl.point2D)]),
        owl.num
    )
    static Move(P: Point2D, dir: number | Point2D | [Point2D, Point2D], distance: number): Point2D {
        let q = 0
        if (typeof dir === 'number') {
            q = dir
        } else if (owl.point2D(dir)) {
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
    @checkIt(owl.point2D, owl.num)
    static MoveX(P: Point2D, distance: number): Point2D {
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
    @checkIt(owl.point2D, owl.num)
    static MoveY(P: Point2D, distance: number): Point2D {
        let [x, y] = P
        return [x, y + distance]
    }



    /**
     * @returns Move point `P` by vector `AB`, by a distance of `AB` times `scaled`.
     * ```
     * Shift([0,1],[[0,0],[1,0]],1) // [1,1]
     * Shift([0,1],[[0,0],[1,0]],2) // [2,1]
     * ```
     */
    @checkIt(owl.point2D, owl.point2Ds, owl.num)
    static Shift(P: Point2D, [A, B]: [Point2D, Point2D], scale: number = 1): Point2D {
        let [x, y] = P
        let [xA, yA] = A
        let [xB, yB] = B
        return [x + (xB - xA) * scale, y + (yB - yA) * scale]
    }

    /**
     * Reflect point P about x-axis
     * ```
     * ReflectX([1,2]) // [1,-2]
     * ReflectX([1,-2]) // [1,2]
     * ```
     */
    @checkIt(owl.point2D)
    static ReflectX(P: Point2D): Point2D {
        return [P[0], -P[1]]
    }




    /**
     * Reflect point P about y-axis
     * ```
     * ReflectY([1,2]) // [-1,2]
     * ReflectY([-1,2]) // [1,2]
     * ```
     */
    @checkIt(owl.point2D)
    static ReflectY(P: Point2D): Point2D {
        return [-P[0], P[1]]
    }






    /**
     * angle of intersection between two slopes
     * ```
     * IntersectAngle(0,1) // 45
     * IntersectAngle(1,-1) // 90
     * ```
     */
    @checkIt(owl.num)
    static IntersectAngle(slope1: number, slope2: number): number {
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
    @checkIt(owl.point2D)
    @inspectIt(function distinct_points(A, O, B) {
        return owl.distinct([A, O]) && owl.distinct([B, O])
    })
    static Angle(A: Point2D, O: Point2D, B: Point2D): number {
        let anglePolar = AnglePolar(A, O, B)
        let a = IsReflex(A, O, B) ? 360 - anglePolar : anglePolar
        return cal.blur(a)
    }



    /**
     * angle AOB, measured anticlockwise
     * ```
     * AnglePolar([1,0],[0,0],[0,2]) // 90
     * AnglePolar([2,2],[1,1],[1,3]) // 45
     * AnglePolar([1,3],[1,1],[2,2]) // 315
     * ```
     */
    @checkIt(owl.point2D)
    @inspectIt(function distinct_points(A, O, B) {
        return owl.distinct([A, O]) && owl.distinct([B, O])
    })
    static AnglePolar(A: Point2D, O: Point2D, B: Point2D): number {
        let a = vec2D(O, A).argument()
        let b = vec2D(O, B).argument()
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
    @checkIt(owl.point2D)
    @inspectIt(function distinct_points(A, O, B) {
        return owl.distinct([A, O]) && owl.distinct([B, O])
    })
    static IsReflex(A: Point2D, O: Point2D, B: Point2D): boolean {
        let angle = AnglePolar(A, O, B)
        return angle > 180
    }






    /**
     * points on a regular polygon
     * ```
     * RegularPolygon(4,[0,0],1,0) // [[1,0],[0,1],[-1,0],[0,-1]]
     * ```
     */
    @checkIt(owl.num, owl.point2D, owl.num, owl.num)
    static RegularPolygon(n: number, center: Point2D, radius: number, startAngle: number) {
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






    /**
     * arc length with given radius and angle
     * ```
     * ArcLength(2,90) // pi
     * ArcLength(2,180) // 2*pi
     * ```
     */
    @checkIt(owl.nonNegative, owl.nonNegative)
    static ArcLength(radius: number, theta: number): number {
        return 2 * Math.PI * radius * theta / 360
    }





    /**
     * sector area with given radius and angle
     * ```
     * SectorArea(2,90) // pi
     * SectorArea(2,180) // 2*pi
     * ```
     */
    @checkIt(owl.nonNegative, owl.nonNegative)
    static SectorArea(radius: number, theta: number): number {
        return Math.PI * radius * radius * theta / 360
    }






    /**
     * check is convex polygon
     * ```
     * IsConvexPolygon([0,0],[1,0],[0,1]) // true
     * IsConvexPolygon([0,0],[3,0],[1,1],[0,3]) // false
     * ```
     */
    @checkIt(owl.point2D)
    static IsConvexPolygon(...points: Point2D[]): boolean {
        Should(points.length >= 3, "must have at least 3 points to be a polygon")
        return toShape2D(points).isConvex()
    }



    /**
     * Arrange Points in anti-clockwise direction around their mean
     * ```
     * ArrangePoints([0,0],[1,1],[0,1],[1,0]) // [[1, 0],[0, 0],[0, 1],[1, 1]]
     * ArrangePoints([0,0],[1,2],[2,1],[0,1],[1,0])// [[1, 0],[0, 0],[0, 1],[1, 2],[2, 1]]
     * ```
     */
    @checkIt(owl.point2D)
    static ArrangePoints(...points: Point2D[]): Point2D[] {
        let ss = toShape2D(points)
        ss.sortAroundMean()
        return ss.toArray()
    }




    /**
     * a point with polar coordinates (1, `angle`).
     * ```
     * OnCircle(0) // [1,0]
     * OnCircle(90) // [0,1]
     * ```
     */
    @checkIt(owl.num)
    static OnCircle(angle: number): Point2D {
        return PolToRect([1, angle])
    }


}




declare global {
    var Slope: typeof Host.Slope
    var SlopePd: typeof Host.SlopePd
    var Distance: typeof Host.Distance
    var ChessboardDistance: typeof Host.ChessboardDistance
    var Mid: typeof Host.Mid
    var Slide: typeof Host.Slide
    var Rotate: typeof Host.Rotate
    var Dir: typeof Host.Dir
    var PdFoot: typeof Host.PdFoot
    var Intersection: typeof Host.Intersection
    var Move: typeof Host.Move
    var MoveX: typeof Host.MoveX
    var MoveY: typeof Host.MoveY
    var Shift: typeof Host.Shift
    var ReflectX: typeof Host.ReflectX
    var ReflectY: typeof Host.ReflectY
    var IntersectAngle: typeof Host.IntersectAngle
    var Angle: typeof Host.Angle
    var AnglePolar: typeof Host.AnglePolar
    var IsReflex: typeof Host.IsReflex
    var RegularPolygon: typeof Host.RegularPolygon
    var ArcLength: typeof Host.ArcLength
    var SectorArea: typeof Host.SectorArea
    var IsConvexPolygon: typeof Host.IsConvexPolygon
    var ArrangePoints: typeof Host.ArrangePoints
    var OnCircle: typeof Host.OnCircle

}


