/**
 * @category Vector
 * @return the vector OP
 * ```
 * Vector([1,2],[10,5]) // [9,3]
 * ```
 */
declare function Vector(O: Point, P: Point): Vector;
/**
 * @category Vector
 * @return sum of all vectors
 * ```
 * VectorAdd([1,2],[3,4],[5,6]) // [9,12]
 * ```
 */
declare function VectorAdd(...vectors: Vector[]): Vector;
/**
 * @category Vector
 * @return mean of all vectors
 * ```
 * VectorMean([1,2],[3,4],[5,6]) // [3,4]
 * VectorMean([0,0],[2,0],[2,2],[0,2]) // [1,1]
 * ```
 */
declare function VectorMean(...vectors: Vector[]): Vector;
/**
 * @category Vector
 * @return length of vector
 * ```
 * VectorLength([-3,4]) // 5
 * VectorLength([0,0]) // 0
 * VectorLength([1,2]) // sqrt(5)
 * ```
 */
declare function VectorLength(v: Vector): number;
/**
 * @category Vector
 * @return length of vector
 * ```
 * VectorArg([2,0]) // 0
 * VectorArg([0,2]) // 90
 * VectorArg([-2,0]) // 180
 * VectorArg([0,-2]) // 270
 * VectorArg([0,0]) // 0
 * VectorArg([1,1]) // 45
 * ```
 */
declare function VectorArg(v: Vector): number;
/**
 * @category Vector
 * @return find [kx,ky] from [x,y]
 * ```
 * VectorScale([1,2],2) // [2,4]
 * VectorScale([1,2],-2) // [-2,-4]
 * ```
 */
declare function VectorScale(v: Vector, k: number): Vector;
/**
 * @category Vector
 * @return the negative of the vector
 * ```
 * VectorRev([-3,4]) // [3,-4]
 * VectorRev([0,0]) // [0,0]
 * VectorRev([1,2]) // [-1,-2]
 * ```
 */
declare function VectorRev(v: Vector): Vector;
/**
 * @category Vector
 * @return the unit vector of v
 * ```
 * VectorUnit([2,0]) // [1,0]
 * VectorUnit([0,-2]) // [0,-1]
 * VectorUnit([1,2]) // [1/sqrt(5),2/sqrt(5)]
 * ```
 */
declare function VectorUnit(v: Vector): Vector;
/**
 * @category Vector
 * @return scale the vector to the given length
 * ```
 * VectorScaleTo([2,0],10) // [10,0]
 * VectorScaleTo([0,-2],100) // [0,-100]
 * VectorScaleTo([-3,4],15) // [-9,12]
 * ```
 */
declare function VectorScaleTo(v: Vector, length: number): Vector;
/**
 * @category Vector
 * @return rotate a vector anticlockwise by angle.
 * ```
 * VectorRotate([1,2],90) // [-2,1]
 * ```
 */
declare function VectorRotate(v: Vector, angle: number): Vector;
