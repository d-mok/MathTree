import { Shape } from './shape'
import { Shape2D, shape2D } from './shape2D'
import {  vec3D, vector3D, Vector3D } from './vector3D'

/**
 * An subclass of array, representing an ordered list of points in 3D.
 */
export class Shape3D extends Shape<Vector3D>{




    /**
     * Return an array [number,number,number][] of this shape.
     * @returns an array [x,y,z][]
     * @example
     * ```
     * [[1,2,3],[3,4,5]].toArray() // [[1,2,3],[3,4,5]]
     * ```
     */
    public toArray(): [number, number, number][] {
        return [...this.map($ => $.toArray())]
    }




    /**
     * Return the projection of this 3D shape on the 2D plane, by cabinet projection.
     * @param angle - the viewing angle
     * @param depth - the y-direction depth
     * @returns the projected 2D shape
     * @example
     * ```
     * let A = [0,0,0]
     * let B = [3,4,5]
     * [A,B].projectTo2D(60, 0.5) 
     * // [0,0]
     * // [4, 6.732050807568877]
     * ```
     */
    public projectTo2D(angle: number = 60, depth: number = 0.5): Shape2D {
        let projected = this.map($ => $.projectTo2D(angle, depth))
        return shape2D(...projected)
    }


}







/**
 * Return a `Shape3D` prefilled with `elements`.
 * @param elements - the elements to put in the `Shape3D`
 * @returns a `Shape3D` array
 * @example
 * ```
 * shape3D([1,2,3],[3,4,5],[5,6,7]) // Shape3D of [[1,2,3],[3,4,5],[5,6,7]]
 * ```
 */
export function shape3D(...elements: ([number, number, number] | Vector3D)[]): Shape3D {
    let shp = new Shape3D()
    shp.push(...elements.map($ => vec3D($)))
    return shp
}





/**
 * Return a `Shape3D` prefilled with `elements`.
 * @param elements - the elements to put in the `Shape3D`
 * @returns a `Shape3D` array
 * @example
 * ```
 * toShape3D([[1,2,3],[3,4,5],[5,6,7]]) // Shape3D of [[1,2,3],[3,4,5],[5,6,7]]
 * ```
 */
export function toShape3D(elements: ([number, number, number] | Vector3D)[]): Shape3D {
    return shape3D(...elements)
}

