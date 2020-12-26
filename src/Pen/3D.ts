/**
 * @ignore
 */
var PROJ_ANGLE = 60

/**
 * @ignore
 */
var PROJ_DEPTH = 0.5


/**
* @category 3DPen
* @return projection of 3D point to 2D plane
* ```typescript
* proj(1,1,0) // [1.25, 0.433012701892]
* ```
*/
function proj(x: number, y: number, z: number): Point {
    let x_new = x + PROJ_DEPTH * y * cos(PROJ_ANGLE)
    let y_new = z + PROJ_DEPTH * y * sin(PROJ_ANGLE)
    return [x_new, y_new]
}
globalThis.proj = proj



/**
* @category 3DPen
* @return set the angle and depth of projection
* ```typescript
* projSetting(45,0.6) // set the angle to 45 and depth to 0.5
* ```
*/
function projSetting(angle: number = 60, depth: number = 0.5) {
    PROJ_ANGLE = angle
    PROJ_DEPTH = depth
}
globalThis.projSetting = projSetting