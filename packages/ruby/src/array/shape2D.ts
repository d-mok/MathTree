import { Shape } from './shape'
import { shape3D, Shape3D } from './shape3D'
import {  vec3D, vector3D, Vector3D } from './vector3D'
import {  vec2D, vector2D, Vector2D } from './vector2D'

/**
 * An subclass of array, representing an ordered list of points in 2D.
 */
export class Shape2D extends Shape<Vector2D>{


    /**
     * Return an array [number,number][] of this shape.
     * @returns an array [x,y][]
     * @example
     * ```
     * [[1,2],[3,4]].toArray() // [[1,2],[3,4]]
     * ```
     */
    public toArray(): [number, number][] {
        return [...this.map($ => $.toArray())]
    }




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
    public sortAroundMean(): void {
        let mean = this.mean();
        this.sortBy($ => $.minus(mean).argument())
    }

    /**
     * Return whether this shape is a convex polygon, but not neccessarily ordered.
     * @returns a boolean
     * @example
     * ```
     * [[0,0],[1,0],[0,1]].isConvex() // true
     * [[0,0],[3,0],[1,1],[0,3]].isConvex() // false
     * [[0,0],[1,0]].isConvex() // true if length <= 3
     * ```
     */
    public isConvex() {
        if (this.length <= 3) return true
        let clone = this.clone();
        clone.sortAroundMean()
        let cross = [];
        for (let i = 0; i < clone.length; i++) {
            let p1 = clone.cyclicAt(i - 1)!
            let p2 = clone.cyclicAt(i)!
            let p3 = clone.cyclicAt(i + 1)!
            let u = vec2D(p1, p2)
            let v = vec2D(p2, p3)
            cross.push(u.cross2D(v))
        }
        cross.filter($ => $ !== 0)
        return cross.every($ => $ > 0) || cross.every($ => $ < 0)
    }


    /**
     * Return a Shape3D by erecting this shape into 3D.
     * @param vecX - the new unit vector in x-direction
     * @param vecY - the new unit vector in y-direction
     * @returns erected Shape3D
     * @example
     * ```
     * let [A,B,C] = [[0,0],[1,0],[0,1]]
     * [A,B,C].erect([1,0,0],[0,1,0]) // [[0,0,0],[1,0,0],[0,1,0]]
     * ```
     */
    public erect(vecX: Vector3D | [number, number, number], vecY: Vector3D | [number, number, number]): Shape3D {
        let vx = vec3D(vecX)
        let vy = vec3D(vecY)
        let erected = this.map($ => {
            let [x, y] = $
            let vx3D = vx.times(x)
            let vy3D = vy.times(y)
            return vx3D.add(vy3D)
        })
        return shape3D(...erected)
    }



}








/**
 * Return a `Shape2D` prefilled with `elements`.
 * @param elements - the elements to put in the `Shape2D`
 * @returns a `Shape2D` array
 * @example
 * ```
 * shape2D([1,2],[3,4],[5,6]) // Shape2D of [[1,2],[3,4],[5,6]]
 * ```
 */
export function shape2D(...elements: ([number, number] | Vector2D)[]): Shape2D {
    let shp = new Shape2D()
    shp.push(...elements.map($ => vec2D($)))
    return shp
}






/**
 * Return a `Shape2D` prefilled with `elements`.
 * @param elements - the elements to put in the `Shape2D`
 * @returns a `Shape2D` array
 * @example
 * ```
 * toShape2D([[1,2],[3,4],[5,6]]) // Shape2D of [[1,2],[3,4],[5,6]]
 * ```
 */
export function toShape2D(elements: ([number, number] | Vector2D)[]): Shape2D {
    return shape2D(...elements)
}



