/**
 * Return the vector from A to B.
 * ```
 * fromTo([3,4],[1,0]) // [2,4]
 * ```
 */
export declare function fromTo<T extends number[]>(A: [...T], B: T): T;
/**
 * Return the mean of the points.
 * ```
 * let A = [0,0]
 * let B = [3,0]
 * let C = [0,6]
 * [A,B,C].mean() // [1,2]
 * ```
 */
export declare function mean<T extends number[]>(vecs: [...T][]): T;
/**
 * Return this vector scaled to the given magnitude.
 * ```
 * [6,8].scaledTo(20) // [12,16]
 * ```
 */
export declare function scaledTo<T extends number[]>(vec: [...T], magnitude?: number): T;
/**
 * Return the angle between this vector and `vec`.
 * ```
 * [1,0].angleWith([0,1]) // 90
 * ```
 */
export declare function angleBetween(vec1: number[], vec2: number[]): number;
/**
 * Return the vector projection of this vector onto `vec`.
 * ```
 * [3,4].projectOn([1,0]) // [3,0]
 * ```
 */
export declare function projection<T extends number[]>(ofVec: [...T], onVec: T): T;
/**
 * Return the component of this vector normal to `vec`.
 * ```
 * [3,4].normalTo([1,0]) // [0,4]
 * ```
 */
export declare function normal<T extends number[]>(ofVec: [...T], onVec: T): T;
/**
 * Return the vector extruded towards `vertex` by `scale`.
 * @param scale - 1 = do nothing, 0 = go to `vertex`
 * ```
 * [4,1].extrudeTo([0,1], 0.75) // [3,1]
 * ```
 */
export declare function extrude<T extends number[]>(vec: [...T], vertex: T, scale: number): T;
/**
 * 2D
 */
/**
 * Return the argument of this vector.
 * i.e. the polar angle in [0,360).
 * ```
 * [1,1].argument() // 45
 * ```
 */
export declare function argument(vec2D: [number, number]): number;
/**
 * 3D
 */
/**
 * Return the vector projection of this vector onto the plane formed by `vec1` and `vec2`.
 * ```
 * [3,4,5].projectOnPlane([1,0,0],[0,1,0]) // [3,4,0]
 * ```
 */
export declare function projectOnPlane(vec: [number, number, number], planeVec1: [number, number, number], planeVec2: [number, number, number]): [number, number, number];
/**
 * Return the normal component of this vector to the plane formed by `vec1` and `vec2`.
 * ```
 * [3,4,5].normalToPlane([1,0,0],[0,1,0]) // [0,0,5]
 * ```
 */
export declare function normalToPlane(vec: [number, number, number], planeVec1: [number, number, number], planeVec2: [number, number, number]): [number, number, number];
/**
 * Return the projection of this 3D vector on the 2D plane, by cabinet projection.
 * @param angle - the viewing angle
 * @param depth - the y-direction depth
 * ```
 * [3, 4, 5].projectTo2D(60, 0.5) // [4, 6.732050807568877]
 * ```
 */
export declare function projectTo2D(vec: [number, number, number], angle?: number, depth?: number): [number, number];
/**
 * Sort the points by measuring their polar angle from the mean.
 * @example
 * ```
 * let A = [0,0]
 * let B = [2,0]
 * let C = [1,1]
 * [A,B,C].sortAroundMean() //-> [C,A,B]
 * ```
 */
export declare function sortAroundMean(vecs: [number, number][]): [number, number][];
/**
 * Return whether this shape is a convex polygon, but not neccessarily ordered.
 * ```
 * [[0,0],[1,0],[0,1]].isConvex() // true
 * [[0,0],[3,0],[1,1],[0,3]].isConvex() // false
 * [[0,0],[1,0]].isConvex() // true if length <= 3
 * ```
 */
export declare function isConvex(vecs: [number, number][]): boolean;
/**
 * Return a Shape3D by erecting this shape into 3D.
 * @param vecX - the new unit vector in x-direction
 * @param vecY - the new unit vector in y-direction
 * ```
 * let [A,B,C] = [[0,0],[1,0],[0,1]]
 * [A,B,C].erect([1,0,0],[0,1,0]) // [[0,0,0],[1,0,0],[0,1,0]]
 * ```
 */
export declare function erect(vec: [number, number], vecX: [number, number, number], vecY: [number, number, number]): [number, number, number];
//# sourceMappingURL=vec.d.ts.map