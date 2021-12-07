



// /**
//  * @category Vector3D
//  * @return the vector OP
//  * ```
//  * Vec3D([1,2,3],[10,5,2]) // [9,3,-1]
//  * ```
//  */
// function Vec3D(O: Point3D, P: Point3D): Point3D {
//     return [P[0] - O[0], P[1] - O[1], P[2] - O[2]];
// }
// globalThis.Vec3D = contract(Vec3D).sign([owl.point3D])



// /**
//  * @category Vector3D
//  * @deprecated useless
//  * @return sum of all vectors
//  * ```
//  * Vec3DAdd([1,2,3],[3,4,5],[5,6,7]) // [9,12,15]
//  * ```
//  */
// function Vec3DAdd(...vectors: Point3D[]): Point3D {
//     const x = Sum(...vectors.map(p => p[0]))
//     const y = Sum(...vectors.map(p => p[1]))
//     const z = Sum(...vectors.map(p => p[2]))
//     return [x, y, z];
// }
// globalThis.Vec3DAdd = contract(Vec3DAdd).sign([owl.vector3D])




/**
 * @category Vector3D
 * @return mean of all vectors
 * ```
 * Mid3D([1,2,3],[3,4,5],[5,6,7]) // [3,4,5]
 * ```
 */
function Mid3D(...vectors: Point3D[]): Point3D {
    const x = Sum(...vectors.map(p => p[0])) / vectors.length
    const y = Sum(...vectors.map(p => p[1])) / vectors.length
    const z = Sum(...vectors.map(p => p[2])) / vectors.length
    return [x, y, z]
}
globalThis.Mid3D = contract(Mid3D).sign([owl.vector3D])



/**
 * @category Geometry
 * @return the point P on AB such that AP : PB = ratio : 1-ratio
 * ```
 * Slide3D([1,0,0],[5,0,0],0.75) // [4,0,0]
 * ```
 */
function Slide3D(A: Point3D, B: Point3D, ratio: number): Point3D {
    let r = ratio
    let s = 1 - r
    return [
        A[0] * s + B[0] * r,
        A[1] * s + B[1] * r,
        A[2] * s + B[2] * r
    ]
}
globalThis.Slide3D = contract(Slide3D).sign([owl.point3D, owl.point3D, owl.num])




// /**
//  * @category Vector3D
//  * @deprecated useless
//  * @return length of vector
//  * ```
//  * Vec3DLength([-3,4,0]) // 5
//  * Vec3DLength([0,0,4]) // 4
//  * Vec3DLength([1,2,3]) // sqrt(14)
//  * ```
//  */
// function Vec3DLength(v: Vector3D): number {
//     const [x, y, z] = v
//     return (x * x + y * y + z * z) ** 0.5
// }
// globalThis.Vec3DLength = contract(Vec3DLength).sign([owl.vector3D])







// /**
//  * @category Vector3D
//  * @deprecated useless
//  * @return find [kx,ky,kz] from [x,y,z]
//  * ```
//  * Vec3DScale([1,2,3],2) // [2,4,6]
//  * Vec3DScale([1,2,3],-2) // [-2,-4,-6]
//  * ```
//  */
// function Vec3DScale(v: Point3D, k: number): Point3D {
//     return [k * v[0], k * v[1], k * v[2]];
// }
// globalThis.Vec3DScale = contract(Vec3DScale).sign([owl.vector3D, owl.num])





// /**
//  * @category Vector3D
//  * @deprecated useless
//  * @return the unit vector of v
//  * ```
//  * Vec3DUnit([2,0,0]) // [1,0,0]
//  * Vec3DUnit([0,-2,0]) // [0,-1,0]
//  * Vec3DUnit([1,2,3]) // [1/sqrt(14),2/sqrt(14),3/sqrt(14)]
//  * ```
//  */
// function Vec3DUnit(v: Vector3D): Vector3D {
//     return Vec3DScale(v, 1 / Vec3DLength(v))
// }
// globalThis.Vec3DUnit = contract(Vec3DUnit).sign([owl.vector3D])



// /**
//  * @category Vector3D
//  * @deprecated useless
//  * @return scale the vector to the given length
//  * ```
//  * Vec3DScaleTo([2,0,0],10) // [10,0,0]
//  * Vec3DScaleTo([0,-2,0],100) // [0,-100,0]
//  * Vec3DScaleTo([1,2,2],6) // [2,4,4]
//  * ```
//  */
// function Vec3DScaleTo(v: Vector3D, length: number): Vector3D {
//     return Vec3DScale(Vec3DUnit(v), length)
// }
// globalThis.Vec3DScaleTo = contract(Vec3DScaleTo).sign([owl.vector3D, owl.num])



// /**
//  * @category Vector3D
//  * @deprecated useless
//  * @return the projection vector of v
//  * ```
//  * Vec3DProj([2,1,3],[1,0,0]) // [2,0,0]
//  * ```
//  */
// function Vec3DProj(v: Vector3D, onto: Vector3D): Vector3D {
//     let scale = DotProduct(v, onto) / DotProduct(onto, onto)
//     return Vec3DScale(onto, scale)
// }
// globalThis.Vec3DProj = contract(Vec3DProj).sign([owl.vector3D, owl.vector3D])





// /**
//  * @category Vector3D
//  * @deprecated useless
//  * @return dot product of v1 and v2
//  * ```
//  * DotProduct([1, 1, 0], [0, 1, 1]) // 1
//  * DotProduct([1, 2, 3], [4, 5, -6]) // -4
//  * ```
//  */
// function DotProduct(v1: Vector3D, v2: Vector3D): number {
//     return vec3D(v1).dot(v2)
// }
// globalThis.DotProduct = contract(DotProduct).sign([owl.vector3D])



// /**
//  * @category Vector3D
//  * @deprecated useless
//  * @return cross product of v1 and v2
//  * ```
//  * CrossProduct([1, 1, 0], [0, 1, 1]) // [1, -1, 1]
//  * ```
//  */
// function CrossProduct(v1: Vector3D, v2: Vector3D): Vector3D {
//     return vec3D(v1).cross(v2).toArray()
// }
// globalThis.CrossProduct = contract(CrossProduct).sign([owl.vector3D])



// /**
//  * @category Vector3D
//  * @deprecated useless
//  * @return unit normal vector to the plane OAB
//  * ```
//  * NormalVector([0,0,0], [1,1,0], [0,1,1]) // [1/sqrt(3), -1/sqrt(3), 1/sqrt(3)]
//  * ```
//  */
// function NormalVector(O: Point3D, A: Point3D, B: Point3D): Vector3D {
//     return vec3D(O, A).cross(vec3D(O, B)).unit().toArray()
// }
// globalThis.NormalVector = contract(NormalVector).sign([owl.point3D])



/**
 * @category Vector3D
 * @return projection of a point on a plane
 * ```
 * let P = [2,3,4]
 * let [A,B,C] = [[0,0,0],[1,0,0],[0,1,0]]
 * PdFoot3D(P,[A,B,C]) // [2,3,0]
 * PdFoot3D(P,[A,B]) // [2,0,0]
 * ```
 */
function PdFoot3D(point: Point3D, base: [Point3D, Point3D, Point3D] | [Point3D, Point3D]): Point3D {
    if (base.length === 3) {
        let [A, B, C] = base
        return vec3D(A, point).projectOnPlane(vec3D(A, B), vec3D(B, C)).add(A).toArray()
    } else if (base.length === 2) {
        let [A, B] = base
        return vec3D(A, point).projectOn(vec3D(A, B)).add(A).toArray()
    }
    Should(false, 'base must have 2 or 3 points')
    throw 'never'
}
globalThis.PdFoot3D = contract(PdFoot3D)
    .sign([owl.vector3D, owl.arrayWith(owl.vector3D)])



/**
 * @category Vector3D
 * @return embed points on xy-plane onto a plane in 3D
 * ```
 * let [A,B,C] = [[0,0],[1,0],[0,1]]
 * Embed([A,B,C],[0,0,2],[1,0,0],[0,1,0]) // [[0,0,2],[1,0,2],[0,1,2]]
 * ```
 */
function Embed(plane2D: Point2D[], origin: Point3D, xVec: Point3D, yVec: Point3D): Point3D[] {
    return toShape2D(plane2D)
        .erect(xVec, yVec)
        .translate(origin)
        .toArray()
}
globalThis.Embed = contract(Embed)
    .sign([owl.arrayWith(owl.point2D), owl.point3D, owl.vector3D, owl.vector3D])


/**
 * @category Vector3D
 * @return embed 2D points onto a plane in 3D with constant x. The x-axis becomes the 3D y-axis. The y-axis becomes the 3D z-axis.
 * ```
 * let [A,B,C] = [[0,0],[3,0],[0,1]]
 * EmbedX([A,B,C],2) // [[2,0,0],[2,3,0],[2,0,1]]
 * ```
 */
function EmbedX(plane2D: Point2D[], x: number = 0): Point3D[] {
    return Embed(plane2D, [x, 0, 0], [0, 1, 0], [0, 0, 1])
}
globalThis.EmbedX = contract(EmbedX).sign([owl.arrayWith(owl.point2D), owl.num])


/**
 * @category Vector3D
 * @return embed 2D points onto a plane in 3D with constant y. The x-axis becomes the 3D x-axis. The y-axis becomes the 3D z-axis.
 * ```
 * let [A,B,C] = [[0,0],[3,0],[0,1]]
 * EmbedY([A,B,C],2) // [[0,2,0],[3,2,0],[0,2,1]]
 * ```
 */
function EmbedY(plane2D: Point2D[], y: number = 0): Point3D[] {
    return Embed(plane2D, [0, y, 0], [1, 0, 0], [0, 0, 1])
}
globalThis.EmbedY = contract(EmbedY).sign([owl.arrayWith(owl.point2D), owl.num])



/**
 * @category Vector3D
 * @return embed points on xy-plane onto a plane in 3D with constant z
 * ```
 * let [A,B,C] = [[0,0],[3,0],[0,1]]
 * EmbedZ([A,B,C],2) // [[0,0,2],[3,0,2],[0,1,2]]
 * ```
 */
function EmbedZ(plane2D: Point2D[], z: number = 0): Point3D[] {
    return Embed(plane2D, [0, 0, z], [1, 0, 0], [0, 1, 0])
}
globalThis.EmbedZ = contract(EmbedZ).sign([owl.arrayWith(owl.point2D), owl.num])



/**
 * @category Vector3D
 * @return flatten points to the same z-plane
 * ```
 * let [A,B,C] = [[0,0,0],[3,0,1],[0,1,2]]
 * FlatZ([A,B,C],2) // [[0,0,2],[3,0,2],[0,1,2]]
 * ```
 */
function FlatZ(points: Point3D[], z: number = 0): Point3D[] {
    let arr: Point3D[] = []
    for (let [x, y, _] of points) {
        arr.push([x, y, z])
    }
    return arr
}
globalThis.FlatZ = contract(FlatZ).sign([owl.arrayWith(owl.point3D), owl.num])


// /**
//  * @category Vector3D
//  * @deprecated use Extrude
//  * @return extrude the lower base of a frustum towards the upper base by a ratio
//  * ```
//  * let [A,B,C] = [[0,0,0],[4,0,0],[0,4,0]]
//  * ExtrudeBase([A,B,C],[[0,0,4]],0.25) // [[0,0,0],[3,0,0],[0,3,0]]
//  * ```
//  */
// function ExtrudeBase(lowerBase: Point3D[], upperBase: Point3D[], ratio: number) {
//     let arr: Point3D[] = []
//     for (let i = 0; i < Math.max(lowerBase.length, upperBase.length); i++) {
//         let L = i < lowerBase.length ? lowerBase[i] : lowerBase[lowerBase.length - 1]
//         let U = i < upperBase.length ? upperBase[i] : upperBase[upperBase.length - 1]
//         let r = ratio
//         let s = 1 - r
//         arr.push(Vec3DAdd(Vec3DScale(U, r), Vec3DScale(L, s)))
//     }
//     return arr
// }
// globalThis.ExtrudeBase = contract(ExtrudeBase).sign([owl.arrayWith(owl.point3D), owl.arrayWith(owl.point3D), owl.num])




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















/**
* @category 3DPen
* @deprecated use built-in projector in Pen instead
* @return projector function from 3D point to 2D plane
* ```
* const pj = Projector(60,0.5) // create a 3D projector function
* pj(1,1,0) // [1.25, 0.433012701892]
* ```
*/
function Projector(angle: number = 60, depth: number = 0.5) {
    return function (x: number, y: number, z: number): Point {
        let x_new = x + depth * y * cos(angle)
        let y_new = z + depth * y * sin(angle)
        return [x_new, y_new]
    }
}
globalThis.Projector = Projector


/**
* @category 3DPen
* @deprecated use built-in projector in Pen instead
* @return projector function from 3D point to 2D plane
* ```
* const pj = Projector3D(60,0.5) // create a 3D projector function
* pj([1,1,0]) // [1.25, 0.433012701892]
* ```
*/
function Projector3D(angle: number = 60, depth: number = 0.5): (_: Point3D) => Point {
    let projector = function (point3D: Point3D): Point {
        let [x, y, z] = point3D
        let x_new = x + depth * y * cos(angle)
        let y_new = z + depth * y * sin(angle)
        return [x_new, y_new]
    }
    return contract(projector).sign([owl.point3D])
}
globalThis.Projector3D = contract(Projector3D).sign([owl.num, owl.num])