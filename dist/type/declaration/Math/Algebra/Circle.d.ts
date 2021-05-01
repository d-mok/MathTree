/**
 * @category Circle
 * @return D,E,F of circle general form
 * ```
 * CircleGeneral([2,3],5) // [-4,-6,-12]
 * ```
 */
declare function CircleGeneral(centre: Point, radius: number): [D: number, E: number, F: number];
/**
 * @category Circle
 * @return centre and radius from general form
 * ```
 * CircleFromGeneral(-4,-6,-12) // [[2,3],5]
 * ```
 */
declare function CircleFromGeneral(D: number, E: number, F: number): [Point, number];
/**
 * @category Circle
 * @return all integral points on the circle
 * ```
 * IntegralOnCircle([0,0],5) // [[[5,0],[0,5],[-5,0],[0,-5]],[[4,3],[-3,4],[-4,-3],[3,-4]],[[3,4],[-4,3],[-3,-4],[4,-3]]]
 * ```
 */
declare function IntegralOnCircle(centre: Point, radius: number): Point[][];
