/**
 * @category Random
 * @return a random integer in [min, max] inclusive.
 * ```
 * RndN(2,5) // may return 2, 3, 4 or 5
 * ```
 */
declare function RndN(min: number, max: number): number;
/**
 * @category Random
 * @return an array of n unique random integer in [min, max] inclusive.
 * ```
 * RndNs(2,8,3) // may return [5,3,7]
 * ```
 */
declare function RndNs(min: number, max: number, n?: number): number[];
/**
 * @category Random
 * @return a random real number in [min, max] inclusive
 * ```
 * RndR(1,2) // may return 1.242574363
 * ```
 */
declare function RndR(min: number, max: number): number;
/**
 * @category Random
 * @return 1 or -1
 * ```
 * RndU() // may return 1 or -1
 * ```
 */
declare function RndU(): 1 | -1;
/**
 * @category Random
 * @return true or false.
 * ```
 * RndT() // may return true or false
 * ```
 */
declare function RndT(): boolean;
/**
 * @category Random
 * @return a random integer in [min, max] or [-max, -min] inclusive.
 * ```
 * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
 * ```
 */
declare function RndZ(min: number, max: number): number;
/**
 * @category Random
 * @param n - default to 10
 * @return an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive.
 * ```
 * RndZs(2,8,3) // may return [5,-3,7]
 * ```
 */
declare function RndZs(min: number, max: number, n?: number): number[];
/**
 * @category Random
 * @return a random prime number less than or equal to max.
 * ```
 * RndP(10) // may return 2, 3, 5 or 7
 * ```
 */
declare function RndP(max: number): number;
/**
 * @category Random
 * @return a random odd integer in [min, max] inclusive
 * ```
 * RndOdd(3,8) // return 3, 5 or 7
 * ```
 */
declare function RndOdd(min: number, max: number): number;
/**
 * @category Random
 * @return a random even integer in [min, max] inclusive
 * ```
 * RndEven(3,8) // return 4, 6 or 8
 * ```
 */
declare function RndEven(min: number, max: number): number;
/**
 * @category Random
 * @return an array of random polynomial coefficients
 * ```
 * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)]
 * ```
 */
declare function RndPoly(...coeff: number[]): number[];
/**
 * @category Random
 * @return an array of a Pyth Triple
 * ```
 * RndPyth(10) // may return [3,4,5]
 * ```
 */
declare function RndPyth(max?: number): [number, number, number];
/**
 * @category Random
 * @return a linear [a,b,c] in ax+by+c=0
 * ```
 * RndLinearFromIntercept(1,5) // may return [2,-3,6]
 * ```
 */
declare function RndLinearFromInt(minAbsIntercept: number, maxAbsIntercept: number): Linear;
/**
 * @category Random
 * @return a point within given range
 * ```
 * RndPoint([1,4],[10,14]) // may return [2,12]
 * // equivalent to [RndN(...xRange),Range(...yRange)]
 * RndPoint(2,4) // equivalent to RndPoint([-2,2],[-4,4])
 * ```
 */
declare function RndPoint(xRange: number | interval, yRange?: number | interval): Point;
/**
 * @category Random
 * @return n angles in [0,360] at least cyclic separated by separation
 * ```
 * RndAngles(3,50) // may return [30,90,200]
 * ```
 */
declare function RndAngles(n: number, separation: number): number[];
/**
 * @category Random
 * @return n vertices of a convex polygon generated by rounding a cyclic polygon
 * ```
 * RndConvexPolygon(3,[0,0],10,50) // may return [[10,0],[-6,8],[0,-10]]
 * ```
 */
declare function RndConvexPolygon(n: number, center: Point, radius: number, separation: number): Point[];
/**
 * @category Random
 * @return n integers from [min, max]
 * ```
 * RndData(10,15,5) // may return [11,11,12,13,15]
 * ```
 */
declare function RndData(min: number, max: number, n: number): number[];