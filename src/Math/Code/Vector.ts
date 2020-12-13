
/**
 * @category Vector
 * @return the vector OP
 * ```typescript
 * Vector([1,2],[10,5]) // [9,3]
 * ```
 */
function Vector(O: Point, P: Point): Vector {
    return [P[0] - O[0], P[1] - O[1]];
}
globalThis.Vector = Vector



/**
 * @category Vector
 * @return sum of all vectors
 * ```typescript
 * VectorAdd([1,2],[3,4],[5,6]) // [9,12]
 * ```
 */
function VectorAdd(...vectors: Vector[]): Vector {
    const x = Sum(...vectors.map(p => p[0]))
    const y = Sum(...vectors.map(p => p[1]))
    return [x, y];
}
globalThis.VectorAdd = VectorAdd



/**
 * @category Vector
 * @return mean of all vectors
 * ```typescript
 * VectorMean([1,2],[3,4],[5,6]) // [3,4]
 * VectorMean([0,0],[2,0],[2,2],[0,2]) // [1,1]
 * ```
 */
function VectorMean(...vectors: Vector[]): Vector {
    const x = Sum(...vectors.map(p => p[0])) / vectors.length
    const y = Sum(...vectors.map(p => p[1])) / vectors.length
    return [x, y];
}
globalThis.VectorMean = VectorMean







/**
 * @category Vector
 * @return find [kx,ky] from [x,y]
 * ```typescript
 * VectorScale([1,2],2) // [2,4]
 * VectorScale([1,2],-2) // [-2,-4]
 * ```
 */
function VectorScale(v: Vector, k: number): Vector {
    return [k * v[0], k * v[1]];
}
globalThis.VectorScale = VectorScale





/**
 * @category Vector
 * @return rotate a vector anticlockwise by angle.
 * ```typescript
 * VectorRotate([1,2],90) // [-2,1]
 * ```
 */
function VectorRotate(v: Vector, angle: number): Vector {
    const [x, y] = v
    const S = sin(angle)
    const C = cos(angle)
    const x1 = x * C - y * S
    const y1 = x * S + y * C
    return [x1, y1]
}
globalThis.VectorRotate = VectorRotate

