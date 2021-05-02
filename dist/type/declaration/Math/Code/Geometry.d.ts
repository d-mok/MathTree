/**
 * @category Geometry
 * @return the slope of AB
 * ```
 * Slope([0,0],[1,2]) // 2
 * Slope([1,2],[1,2]) // NaN
 * ```
 */
declare function Slope(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the distance AB
 * ```
 * Distance([0,0],[1,2]) // 2.23606797749979
 * ```
 */
declare function Distance(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the chessboard distance AB, max(horizontal,vertical)
 * ```
 * ChessboardDistance([0,0],[1,2]) // 2
 * ChessboardDistance([0,0],[3,2]) // 3
 * ```
 */
declare function ChessboardDistance(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the mid-pt of AB
 * ```
 * MidPoint([1,2],[3,4]) // [2,3]
 * ```
 */
declare function MidPoint(A: Point, B: Point): Point;
/**
 * @category Geometry
 * @return the point P on AB such that AP : PB = ratio : 1-ratio
 * ```
 * DivisionPoint([1,0],[5,0],0.75) // [4,0]
 * ```
 */
declare function DivisionPoint(A: Point, B: Point, ratio?: number): Point;
/**
 * @category Geometry
 * @return point P rotated anticlockwise by angle q about point O.
 * ```
 * RotatePoint([1,2],[0,0],90) // [-2,1]
 * ```
 */
declare function RotatePoint(P: Point, O: Point, q: number): Point;
/**
 * @category Geometry
 * @return the polar angle of B if A is the origin within [0,360].
 * ```
 * Inclination([1,0],[3,2]) // 45
 * Inclination([3,2],[1,0]) // 225
 * ```
 */
declare function Inclination(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the polar angle of a normal direction to AB, on the right of AB.
 * ```
 * Normal([1,0],[3,2]) // 315
 * Normal([3,2],[1,0]) // 135
 * ```
 */
declare function Normal(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the foot of perpendicular from P to AB.
 * ```
 * PerpendicularFoot([-1,-1],[1,1],[-2,2]) // [0,0]
 * ```
 */
declare function PerpendicularFoot(A: Point, B: Point, P: Point): Point;
/**
 * @category Geometry
 * @return the intersection point of AB and CD.
 * ```
 * Intersection([0,0],[2,2],[2,0],[0,2]) // [1,1]
 * ```
 */
declare function Intersection(A: Point, B: Point, C: Point, D: Point): Point;
/**
 * @category Geometry
 * @return Translate point P in the polar angle q (or the direction of point q) by a distance.
 * ```
 * TranslatePoint([1,2],90,3) // [1,5]
 * TranslatePoint([1,2],[10, 12],3) // [3.006894195, 4.229882439]
 * ```
 */
declare function TranslatePoint(P: Point, q: number | Point, distance: number): Point;
/**
 * @category Geometry
 * @return angle of intersection between two slopes
 * ```
 * IntersectAngle(0,1) // 45
 * IntersectAngle(1,-1) // 90
 * ```
 */
declare function IntersectAngle(slope1: number, slope2: number): number;
/**
 * @category Geometry
 * @return angle AOB, non-reflex
 * ```
 * Angle([1,0],[0,0],[0,2]) // 90
 * Angle([2,2],[1,1],[1,3]) // 45
 * Angle([1,3],[1,1],[2,2]) // 45
 * ```
 */
declare function Angle(A: Point, O: Point, B: Point): number;
/**
 * @category Geometry
 * @return angle AOB, measured anticlockwise
 * ```typescript
 * AnglePolar([1,0],[0,0],[0,2]) // 90
 * AnglePolar([2,2],[1,1],[1,3]) // 45
 * AnglePolar([1,3],[1,1],[2,2]) // 315
 * ```
 */
declare function AnglePolar(A: Point, O: Point, B: Point): number;
/**
 * @category Geometry
 * @return check if the polar angle AOB is reflex
 * ```typescript
 * IsReflex([1,0],[0,0],[0,2]) // false
 * IsReflex([2,2],[1,1],[1,3]) // false
 * IsReflex([1,3],[1,1],[2,2]) // true
 * ```
 */
declare function IsReflex(A: Point, O: Point, B: Point): boolean;
