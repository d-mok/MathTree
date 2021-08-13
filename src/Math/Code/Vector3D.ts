



/**
 * @category Vector3D
 * @return the vector OP
 * ```
 * Vec3D([1,2,3],[10,5,2]) // [9,3,-1]
 * ```
 */
function Vec3D(O: Point3D, P: Point3D): Vector3D {
    return [P[0] - O[0], P[1] - O[1], P[2] - O[2]];
}
globalThis.Vec3D = contract(Vec3D).sign([owl.point3D])



/**
 * @category Vector3D
 * @deprecated useless
 * @return sum of all vectors
 * ```
 * Vec3DAdd([1,2,3],[3,4,5],[5,6,7]) // [9,12,15]
 * ```
 */
function Vec3DAdd(...vectors: Vector3D[]): Vector3D {
    const x = Sum(...vectors.map(p => p[0]))
    const y = Sum(...vectors.map(p => p[1]))
    const z = Sum(...vectors.map(p => p[2]))
    return [x, y, z];
}
globalThis.Vec3DAdd = contract(Vec3DAdd).sign([owl.vector3D])




/**
 * @category Vector3D
 * @deprecated useless
 * @return mean of all vectors
 * ```
 * Vec3DMean([1,2,3],[3,4,5],[5,6,7]) // [3,4,5]
 * ```
 */
function Vec3DMean(...vectors: Vector3D[]): Vector3D {
    const x = Sum(...vectors.map(p => p[0])) / vectors.length
    const y = Sum(...vectors.map(p => p[1])) / vectors.length
    const z = Sum(...vectors.map(p => p[2])) / vectors.length
    return [x, y, z];
}
globalThis.Vec3DMean = contract(Vec3DMean).sign([owl.vector3D])



/**
 * @category Vector3D
 * @deprecated useless
 * @return length of vector
 * ```
 * Vec3DLength([-3,4,0]) // 5
 * Vec3DLength([0,0,4]) // 4
 * Vec3DLength([1,2,3]) // sqrt(14)
 * ```
 */
function Vec3DLength(v: Vector3D): number {
    const [x, y, z] = v
    return (x * x + y * y + z * z) ** 0.5
}
globalThis.Vec3DLength = contract(Vec3DLength).sign([owl.vector3D])







/**
 * @category Vector3D
 * @deprecated useless
 * @return find [kx,ky,kz] from [x,y,z]
 * ```
 * Vec3DScale([1,2,3],2) // [2,4,6]
 * Vec3DScale([1,2,3],-2) // [-2,-4,-6]
 * ```
 */
function Vec3DScale(v: Vector3D, k: number): Vector3D {
    return [k * v[0], k * v[1], k * v[2]];
}
globalThis.Vec3DScale = contract(Vec3DScale).sign([owl.vector3D, owl.num])





/**
 * @category Vector3D
 * @deprecated useless
 * @return the unit vector of v
 * ```
 * Vec3DUnit([2,0,0]) // [1,0,0]
 * Vec3DUnit([0,-2,0]) // [0,-1,0]
 * Vec3DUnit([1,2,3]) // [1/sqrt(14),2/sqrt(14),3/sqrt(14)]
 * ```
 */
function Vec3DUnit(v: Vector3D): Vector3D {
    return Vec3DScale(v, 1 / Vec3DLength(v))
}
globalThis.Vec3DUnit = contract(Vec3DUnit).sign([owl.vector3D])



/**
 * @category Vector3D
 * @deprecated useless
 * @return scale the vector to the given length
 * ```
 * Vec3DScaleTo([2,0,0],10) // [10,0,0]
 * Vec3DScaleTo([0,-2,0],100) // [0,-100,0]
 * Vec3DScaleTo([1,2,2],6) // [2,4,4]
 * ```
 */
function Vec3DScaleTo(v: Vector3D, length: number): Vector3D {
    return Vec3DScale(Vec3DUnit(v), length)
}
globalThis.Vec3DScaleTo = contract(Vec3DScaleTo).sign([owl.vector3D, owl.num])



/**
 * @category Vector3D
 * @deprecated useless
 * @return the projection vector of v
 * ```
 * Vec3DProj([2,1,3],[1,0,0]) // [2,0,0]
 * ```
 */
function Vec3DProj(v: Vector3D, onto: Vector3D): Vector3D {
    let scale = DotProduct(v, onto) / DotProduct(onto, onto)
    return Vec3DScale(onto, scale)
}
globalThis.Vec3DProj = contract(Vec3DProj).sign([owl.vector3D, owl.vector3D])





/**
 * @category Vector3D
 * @deprecated useless
 * @return dot product of v1 and v2
 * ```
 * DotProduct([1, 1, 0], [0, 1, 1]) // 1
 * DotProduct([1, 2, 3], [4, 5, -6]) // -4
 * ```
 */
function DotProduct(v1: Vector3D, v2: Vector3D): number {
    return vec3D(v1).dot(v2)
}
globalThis.DotProduct = contract(DotProduct).sign([owl.vector3D])



/**
 * @category Vector3D
 * @deprecated useless
 * @return cross product of v1 and v2
 * ```
 * CrossProduct([1, 1, 0], [0, 1, 1]) // [1, -1, 1]
 * ```
 */
function CrossProduct(v1: Vector3D, v2: Vector3D): Vector3D {
    return vec3D(v1).cross(v2).toArray()
}
globalThis.CrossProduct = contract(CrossProduct).sign([owl.vector3D])



/**
 * @category Vector3D
 * @deprecated useless
 * @return unit normal vector to the plane OAB
 * ```
 * NormalVector([0,0,0], [1,1,0], [0,1,1]) // [1/sqrt(3), -1/sqrt(3), 1/sqrt(3)]
 * ```
 */
function NormalVector(O: Point3D, A: Point3D, B: Point3D): Vector3D {
    return vec3D(O, A).cross(vec3D(O, B)).unit().toArray()
}
globalThis.NormalVector = contract(NormalVector).sign([owl.point3D])



/**
 * @category Vector3D
 * @return projection of a point on a plane
 * ```
 * let P = [2,3,4]
 * let [A,B,C] = [[0,0,0],[1,0,0],[0,1,0]]
 * ProjectionOnPlane(P,[A,B,C]) // [2,3,0]
 * ```
 */
function ProjectionOnPlane(point: Point3D, plane: [Point3D, Point3D, Point3D]): Point3D {
    let n = NormalVector(...plane)
    let O = plane[0]
    let v = Vec3D(O, point)
    let v_perp = Vec3DProj(v, n)
    let v_para = Vec3DAdd(v, Vec3DScale(v_perp, -1))
    return Vec3DAdd(O, v_para)
}
globalThis.ProjectionOnPlane = contract(ProjectionOnPlane)
    .sign([owl.vector3D, owl.arrayWith(owl.vector3D)])



/**
 * @category Vector3D
 * @return embed points on xy-plane onto a plane in 3D
 * ```
 * let [A,B,C] = [[0,0],[1,0],[0,1]]
 * EmbedPlane([A,B,C],[0,0,2],[1,0,0],[0,1,0]) // [[0,0,2],[1,0,2],[0,1,2]]
 * ```
 */
function EmbedPlane(plane2D: Point2D[], origin: Point3D = [0, 0, 0], xVec: Vector3D = [1, 0, 0], yVec: Vector3D = [0, 1, 0]): Point3D[] {
    return toShape2D(plane2D)
        .erect(xVec, yVec)
        .translate(origin)
        .toArray()
}
globalThis.EmbedPlane = contract(EmbedPlane)
    .sign([owl.arrayWith(owl.point), owl.point3D, owl.vector3D, owl.vector3D])



/**
 * @category Vector3D
 * @return embed points on xy-plane onto a plane in 3D with constant z
 * ```
 * let [A,B,C] = [[0,0],[1,0],[0,1]]
 * EmbedPlaneZ([A,B,C],2) // [[0,0,2],[1,0,2],[0,1,2]]
 * ```
 */
function EmbedPlaneZ(plane2D: Point2D[], z: number = 0): Point3D[] {
    return EmbedPlane(plane2D, [0, 0, z], [1, 0, 0], [0, 1, 0])
}
globalThis.EmbedPlaneZ = contract(EmbedPlaneZ).sign([owl.arrayWith(owl.point), owl.num])


/**
 * @category Vector3D
 * @deprecated use Extrude
 * @return extrude the lower base of a frustum towards the upper base by a ratio
 * ```
 * let [A,B,C] = [[0,0,0],[4,0,0],[0,4,0]]
 * ExtrudeBase([A,B,C],[[0,0,4]],0.25) // [[0,0,0],[3,0,0],[0,3,0]]
 * ```
 */
function ExtrudeBase(lowerBase: Point3D[], upperBase: Point3D[], ratio: number) {
    let arr: Point3D[] = []
    for (let i = 0; i < Math.max(lowerBase.length, upperBase.length); i++) {
        let L = i < lowerBase.length ? lowerBase[i] : lowerBase[lowerBase.length - 1]
        let U = i < upperBase.length ? upperBase[i] : upperBase[upperBase.length - 1]
        let r = ratio
        let s = 1 - r
        arr.push(Vec3DAdd(Vec3DScale(U, r), Vec3DScale(L, s)))
    }
    return arr
}
globalThis.ExtrudeBase = contract(ExtrudeBase).sign([owl.arrayWith(owl.point3D), owl.arrayWith(owl.point3D), owl.num])




/**
 * @category Vector3D
 * @return extrude the lower base of a frustum towards the upper base by a ratio
 * ```
 * let [A,B,C] = [[0,0,0],[4,0,0],[0,4,0]]
 * Extrude([A,B,C],[[0,0,4]],0.75) // [[0,0,0],[3,0,0],[0,3,0]]
 * ```
 */
function Extrude(lowerBase: Point3D[], upperBase: Point3D[], scale: number): Point3D[] {
    let max = Math.max(lowerBase.length, upperBase.length)
    let LB = toShape3D(lowerBase).padTail(max)
    let UB = toShape3D(upperBase).padTail(max)
    return LB.extrudeToShape(UB, scale).toArray()
}
globalThis.Extrude = contract(Extrude).sign([owl.arrayWith(owl.point3D), owl.arrayWith(owl.point3D), owl.num])

