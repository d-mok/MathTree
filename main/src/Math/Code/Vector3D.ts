/**
 * sum of all vectors
 * ```
 * VecAdd3D([1, 2, 3], [3, 4, 5], [5, 6, 7]) // [9, 12, 15]
 * ```
 */
export function VecAdd3D(...vectors: Point3D[]): Point3D {
    const x = vectors.sum(p => p[0])
    const y = vectors.sum(p => p[1])
    const z = vectors.sum(p => p[2])
    return [x, y, z]
}

/**
 * mean of all vectors
 * ```
 * Mid3D([1,2,3],[3,4,5],[5,6,7]) // [3,4,5]
 * ```
 */
export function Mid3D(...vectors: Point3D[]): Point3D {
    const [x, y, z] = VecAdd3D(...vectors)
    const n = vectors.length
    return [x / n, y / n, z / n]
}

/**
 * the point P on AB such that AP : PB = ratio : 1-ratio
 * ```
 * Slide3D([1,0,0],[5,0,0],0.75) // [4,0,0]
 * ```
 */
export function Slide3D(A: Point3D, B: Point3D, ratio: number): Point3D {
    let r = ratio
    let s = 1 - r
    return [A[0] * s + B[0] * r, A[1] * s + B[1] * r, A[2] * s + B[2] * r]
}

/**
 * projection of a point on a plane
 * ```
 * let P = [2,3,4]
 * let [A,B,C] = [[0,0,0],[1,0,0],[0,1,0]]
 * PdFoot3D(P,[A,B,C]) // [2,3,0]
 * PdFoot3D(P,[A,B]) // [2,0,0]
 * ```
 */
export function PdFoot3D(
    point: Point3D,
    base: [Point3D, Point3D, Point3D] | [Point3D, Point3D]
): Point3D {
    if (base.length === 3) {
        let [A, B, C] = base
        return VecAdd3D(
            vec.projectOnPlane(
                vec.fromTo(A, point),
                vec.fromTo(A, B),
                vec.fromTo(B, C)
            ),
            A
        )
    } else if (base.length === 2) {
        let [A, B] = base
        return VecAdd3D(
            vec.projection(vec.fromTo(A, point), vec.fromTo(A, B)),
            A
        )
    }
    throw new Error('PdFoot3D: base must have 2 or 3 points')
}

/**
 * embed points on xy-plane onto a plane in 3D
 * ```
 * let [A,B,C] = [[0,0],[1,0],[0,1]]
 * Embed([A,B,C],[0,0,2],[1,0,0],[0,1,0]) // [[0,0,2],[1,0,2],[0,1,2]]
 * ```
 */
export function Embed(
    plane2D: Point2D[],
    origin: Point3D,
    xVec: Point3D,
    yVec: Point3D
): Point3D[] {
    return plane2D
        .map($ => vec.erect($, xVec, yVec))
        .map($ => VecAdd3D($, origin))
}

/**
 * embed 2D points onto a plane in 3D with constant x. The x-axis becomes the 3D y-axis. The y-axis becomes the 3D z-axis.
 * ```
 * let [A,B,C] = [[0,0],[3,0],[0,1]]
 * EmbedX([A,B,C],2) // [[2,0,0],[2,3,0],[2,0,1]]
 * ```
 */
export function EmbedX(plane2D: Point2D[], x: number = 0): Point3D[] {
    return Embed(plane2D, [x, 0, 0], [0, 1, 0], [0, 0, 1])
}

/**
 * embed 2D points onto a plane in 3D with constant y. The x-axis becomes the 3D x-axis. The y-axis becomes the 3D z-axis.
 * ```
 * let [A,B,C] = [[0,0],[3,0],[0,1]]
 * EmbedY([A,B,C],2) // [[0,2,0],[3,2,0],[0,2,1]]
 * ```
 */
export function EmbedY(plane2D: Point2D[], y: number = 0): Point3D[] {
    return Embed(plane2D, [0, y, 0], [1, 0, 0], [0, 0, 1])
}

/**
 * embed points on xy-plane onto a plane in 3D with constant z
 * ```
 * let [A,B,C] = [[0,0],[3,0],[0,1]]
 * EmbedZ([A,B,C],2) // [[0,0,2],[3,0,2],[0,1,2]]
 * ```
 */
export function EmbedZ(plane2D: Point2D[], z: number = 0): Point3D[] {
    return Embed(plane2D, [0, 0, z], [1, 0, 0], [0, 1, 0])
}

/**
 * flatten points to the same z-plane
 * ```
 * let [A,B,C] = [[0,0,0],[3,0,1],[0,1,2]]
 * FlatZ([A,B,C],2) // [[0,0,2],[3,0,2],[0,1,2]]
 * ```
 */
export function FlatZ(points: Point3D[], z: number = 0): Point3D[] {
    return points.map(([x, y, _]) => [x, y, z])
}

/**
 * extrude the lower base of a frustum towards the upper base by a ratio
 * ```
 * let [A,B,C] = [[0,0,0],[4,0,0],[0,4,0]]
 * Extrude([A,B,C],[[0,0,4]],0.75) // [[0,0,0],[3,0,0],[0,3,0]]
 * ```
 */
export function Extrude(
    lowerBase: Point3D[],
    upperBase: Point3D[],
    scale: number
): Point3D[] {
    function padTail(arr: any[], len: number): void {
        while (arr.length < len) arr.push(arr.at(-1))
    }
    let max = Math.max(lowerBase.length, upperBase.length)
    padTail(lowerBase, max)
    padTail(upperBase, max)
    return lowerBase.map((v, i) => vec.extrude(v, upperBase[i], scale))
}
