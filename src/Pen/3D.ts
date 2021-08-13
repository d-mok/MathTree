/**
* @category 3DPen
* @deprecated use Projector3D() instead
* @return projector function from 3D point to 2D plane
* ```
* const pj = Projector(60,0.5) // create a 3D projector function
* pj(1,1,0) // [1.25, 0.433012701892]
* ```
*/
function Projector(angle: number = 60, depth: number = 0.5) {
    return function (x: number, y: number, z: number): Point2D {
        let x_new = x + depth * y * cos(angle)
        let y_new = z + depth * y * sin(angle)
        return [x_new, y_new]
    }
}
globalThis.Projector = Projector


/**
* @category 3DPen
* @deprecated
* @return projector function from 3D point to 2D plane
* ```
* const pj = Projector3D(60,0.5) // create a 3D projector function
* pj([1,1,0]) // [1.25, 0.433012701892]
* ```
*/
function Projector3D(angle: number = 60, depth: number = 0.5): (_: Point3D) => Point2D {
    let projector = function (point3D: Point3D): Point2D {
        let [x, y, z] = point3D
        let x_new = x + depth * y * cos(angle)
        let y_new = z + depth * y * sin(angle)
        return [x_new, y_new]
    }
    return contract(projector).sign([owl.point3D])
}
globalThis.Projector3D = contract(Projector3D).sign([owl.num, owl.num])

