/**
 * @category Trigonometry
 * @param rect - The rectangular coordinates [x,y] of a point, or a polar angle theta.
 * @return  the quadrant of a point or angle: 'I','II','III' or 'IV'.
 * ```
 * Quadrant([1,1]) \\ 'I'
 * Quadrant([-1,1]) \\ 'II'
 * Quadrant(200) \\ 'III'
 * Quadrant(350) \\ 'IV'
 * ```
 */
declare function Quadrant(rect: Point | number): QuadrantName;
/**
 * @category Trigonometry
 * @return the rectangular coordinates [x,y] from a polar coordinates [r,theta].
 * ```
 * PolToRect([1,45]) // [0.707,0.707]
 * ```
 */
declare function PolToRect([r, q]: PolarPoint): Point;
/**
 * @category Trigonometry
 * @return the polar coordinates [r,theta] of a rectangular coordinates [x,y].
 * ```
 * RectToPol([1,1]) // [1.414,45]
 * ```
 */
declare function RectToPol([x, y]: Point): PolarPoint;
/**
 * @category Trigonometry
 * @return the sign from ASTC diagram, 1 or -1, representing positive or negative.
 * ```
 * ASTC(2,'cos') // -1
 * ASTC('III','tan') // 1
 * ```
 */
declare function ASTC(quadrant: QuadrantCode | QuadrantName, func: TrigFunc): -1 | 0 | 1;
/**
 * @category Trigonometry
 * @return the roots of trig equations sin(x)=k , cos(x)=k or tan(x)=k. The angles [r1,r2,r3].
 * ```
 * TrigRoot('sin',0) // [0, 180, 360]
 * TrigRoot('sin',0.5) // [30, 150, undefined]
 * TrigRoot('sin',1) // [90, undefined, undefined]
 * ```
 */
declare function TrigRoot(func: TrigFunc, k: number): [number | undefined, number | undefined, number | undefined];
