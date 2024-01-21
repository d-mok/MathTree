import { Point2D } from '../global.js';
/**
 * Return an array of 2D points as [number,number] by tracing `func` within `range`.
 * ```
 * trace(x=>x**2, [0,3], 4)
 * // [[0,0], [1,1], [2,4], [3,9]]
 * ```
 */
export declare function trace(func: ((t: number) => number) | ((t: number) => Point2D), range: [number, number], dots?: number): Point2D[];
/**
 * Return an array of 2D points as [number,number] by tracing a circle.
 * @param angleRange - the polar angle range
 * ```
 * traceCircle([0,0], 1, [0,360], 4)
 * // [[1,0], [0,1], [-1,0], [0,-1]]
 * ```
 */
export declare function traceCircle(center: Point2D, radius: number, angleRange: [number, number], dots?: number): Point2D[];
export declare function splitNull(arr: (Point2D | null)[]): Point2D[][];
//# sourceMappingURL=trace.d.ts.map