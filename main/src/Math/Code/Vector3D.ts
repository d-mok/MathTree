import { checkIt, inspectIt, captureAll, exposeAll, check } from 'contract'
import _ from 'lodash'
import * as math from 'mathjs'

@exposeAll()
@captureAll()
export class Host {
    /**
     * mean of all vectors
     * ```
     * Mid3D([1,2,3],[3,4,5],[5,6,7]) // [3,4,5]
     * ```
     */
    @checkIt(owl.vector3D)
    static Mid3D(...vectors: Point3D[]): Point3D {
        const x = Sum(...vectors.map(p => p[0])) / vectors.length
        const y = Sum(...vectors.map(p => p[1])) / vectors.length
        const z = Sum(...vectors.map(p => p[2])) / vectors.length
        return [x, y, z]
    }

    /**
     * the point P on AB such that AP : PB = ratio : 1-ratio
     * ```
     * Slide3D([1,0,0],[5,0,0],0.75) // [4,0,0]
     * ```
     */
    @checkIt(owl.point3D, owl.point3D, owl.num)
    static Slide3D(A: Point3D, B: Point3D, ratio: number): Point3D {
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
    @checkIt(owl.point3D, owl.point3Ds)
    static PdFoot3D(
        point: Point3D,
        base: [Point3D, Point3D, Point3D] | [Point3D, Point3D]
    ): Point3D {
        if (base.length === 3) {
            let [A, B, C] = base
            return math.add(
                vec.projectOnPlane(
                    vec.fromTo(A, point),
                    vec.fromTo(A, B),
                    vec.fromTo(B, C)
                ),
                A
            )
        } else if (base.length === 2) {
            let [A, B] = base
            return math.add(
                vec.projection(vec.fromTo(A, point), vec.fromTo(A, B)),
                A
            )
        }
        Should(false, 'base must have 2 or 3 points')
        throw 'never'
    }

    /**
     * embed points on xy-plane onto a plane in 3D
     * ```
     * let [A,B,C] = [[0,0],[1,0],[0,1]]
     * Embed([A,B,C],[0,0,2],[1,0,0],[0,1,0]) // [[0,0,2],[1,0,2],[0,1,2]]
     * ```
     */
    @checkIt(owl.point2Ds, owl.point3D, owl.vector3D, owl.vector3D)
    static Embed(
        plane2D: Point2D[],
        origin: Point3D,
        xVec: Point3D,
        yVec: Point3D
    ): Point3D[] {
        return plane2D
            .map($ => vec.erect($, xVec, yVec))
            .map($ => math.add($, origin))
    }

    /**
     * embed 2D points onto a plane in 3D with constant x. The x-axis becomes the 3D y-axis. The y-axis becomes the 3D z-axis.
     * ```
     * let [A,B,C] = [[0,0],[3,0],[0,1]]
     * EmbedX([A,B,C],2) // [[2,0,0],[2,3,0],[2,0,1]]
     * ```
     */
    @checkIt(owl.point2Ds, owl.num)
    static EmbedX(plane2D: Point2D[], x: number = 0): Point3D[] {
        return Embed(plane2D, [x, 0, 0], [0, 1, 0], [0, 0, 1])
    }

    /**
     * embed 2D points onto a plane in 3D with constant y. The x-axis becomes the 3D x-axis. The y-axis becomes the 3D z-axis.
     * ```
     * let [A,B,C] = [[0,0],[3,0],[0,1]]
     * EmbedY([A,B,C],2) // [[0,2,0],[3,2,0],[0,2,1]]
     * ```
     */
    @checkIt(owl.point2Ds, owl.num)
    static EmbedY(plane2D: Point2D[], y: number = 0): Point3D[] {
        return Embed(plane2D, [0, y, 0], [1, 0, 0], [0, 0, 1])
    }

    /**
     * embed points on xy-plane onto a plane in 3D with constant z
     * ```
     * let [A,B,C] = [[0,0],[3,0],[0,1]]
     * EmbedZ([A,B,C],2) // [[0,0,2],[3,0,2],[0,1,2]]
     * ```
     */
    @checkIt(owl.point2Ds, owl.num)
    static EmbedZ(plane2D: Point2D[], z: number = 0): Point3D[] {
        return Embed(plane2D, [0, 0, z], [1, 0, 0], [0, 1, 0])
    }

    /**
     * flatten points to the same z-plane
     * ```
     * let [A,B,C] = [[0,0,0],[3,0,1],[0,1,2]]
     * FlatZ([A,B,C],2) // [[0,0,2],[3,0,2],[0,1,2]]
     * ```
     */
    @checkIt(owl.point3Ds, owl.num)
    static FlatZ(points: Point3D[], z: number = 0): Point3D[] {
        return points.map(([x, y, _]) => [x, y, z])
    }

    /**
     * extrude the lower base of a frustum towards the upper base by a ratio
     * ```
     * let [A,B,C] = [[0,0,0],[4,0,0],[0,4,0]]
     * Extrude([A,B,C],[[0,0,4]],0.75) // [[0,0,0],[3,0,0],[0,3,0]]
     * ```
     */
    @checkIt(owl.point3Ds, owl.point3Ds, owl.num)
    static Extrude(
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

    // /**
    //  * @category 3DPen
    //  * @deprecated use built-in projector in Pen instead
    //  * projector function from 3D point to 2D plane
    //  * ```
    //  * const pj = Projector(60,0.5) // create a 3D projector function
    //  * pj(1,1,0) // [1.25, 0.433012701892]
    //  * ```
    //  */
    // static Projector(angle: number = 60, depth: number = 0.5) {
    //     return function (x: number, y: number, z: number): Point {
    //         let x_new = x + depth * y * cos(angle)
    //         let y_new = z + depth * y * sin(angle)
    //         return [x_new, y_new]
    //     }
    // }

    // /**
    //  * @category 3DPen
    //  * @deprecated use built-in projector in Pen instead
    //  * projector function from 3D point to 2D plane
    //  * ```
    //  * const pj = Projector3D(60,0.5) // create a 3D projector function
    //  * pj([1,1,0]) // [1.25, 0.433012701892]
    //  * ```
    //  */
    // @checkIt(owl.num, owl.num)
    // static Projector3D(
    //     angle: number = 60,
    //     depth: number = 0.5
    // ): (_: Point3D) => Point {
    //     let projector = function (point3D: Point3D): Point {
    //         let [x, y, z] = point3D
    //         let x_new = x + depth * y * cos(angle)
    //         let y_new = z + depth * y * sin(angle)
    //         return [x_new, y_new]
    //     }
    //     return check(projector, [owl.point3D])
    // }
}

declare global {
    var Mid3D: typeof Host.Mid3D
    var Slide3D: typeof Host.Slide3D
    var PdFoot3D: typeof Host.PdFoot3D
    var Embed: typeof Host.Embed
    var EmbedX: typeof Host.EmbedX
    var EmbedY: typeof Host.EmbedY
    var EmbedZ: typeof Host.EmbedZ
    var FlatZ: typeof Host.FlatZ
    var Extrude: typeof Host.Extrude
    // var Projector: typeof Host.Projector
    // var Projector3D: typeof Host.Projector3D
}
