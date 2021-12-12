declare type Point2D = [number, number];
export declare function vec(p1: Point2D, p2: Point2D): Point2D;
export declare function magnitude([x, y]: Point2D): number;
export declare function argument([x, y]: Point2D): number;
/**
 * Return an array of 2D points as [number,number] by tracing `func` within `range`.
 * @param func - the func to trace, can be normal or parametric.
 * @param range - the range of `func` input to trace
 * @param dots - number of points requested, more dots more detailed
 * @returns an array of 2D points
 * @example
 * ```
 * trace(x=>x**2, [0,3], 4)
 * // [[0,0], [1,1], [2,4], [3,9]]
 * ```
 */
export declare function trace(func: ((t: number) => number) | ((t: number) => Point2D), range: [number, number], dots?: number): Point2D[];
/**
 * Return an array of 2D points as [number,number] by tracing a circle.
 * @param center - the center of the circle
 * @param radius - the radius of the circle
 * @param angleRange - the polar angle range
 * @param dots - number of points requested, more dots more detailed
 * @returns an array of 2D points
 * @example
 * ```
 * traceCircle([0,0], 1, [0,360], 4)
 * // [[1,0], [0,1], [-1,0], [0,-1]]
 * ```
 */
export declare function traceCircle(center: Point2D, radius: number, angleRange: [number, number], dots?: number): Point2D[];
export declare function split<T>(arr: T[], delimitElement: T): T[][];
export {};
//# sourceMappingURL=support.d.ts.map