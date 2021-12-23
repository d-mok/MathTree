import { Vector } from './vector'



/**
 * A class of 2D vector, implemented as a subclass of array.
 */
export class Vector2D extends Vector {

    /**
     * Return an array [number,number] of this vector.
     * @returns an array [x,y]
     * @example
     * ```
     * [1,2].toArray() // [1,2]
     * ```
     */
    public toArray(): [number, number] {
        let [x, y] = this
        return [x, y]
    }


    /**
     * Return the argument of this vector.
     * i.e. the polar angle in [0,360).
     * @returns the argument
     * @example
     * ```
     * [1,1].argument() // 45
     * ```
     */
    public argument(): number {
        let [x, y] = this
        if (x === 0 && y === 0) return 0
        let angle = Math.atan2(y, x) * 180 / Math.PI;
        if (angle < 0) angle += 360
        return angle
    }

    /**
     * Return the rotated version of this vector about the origin anti-clockwise by `angle`.
     * @param angle - the anti-clockwise angle to rotate
     * @returns the rotated vector
     * @example
     * ```
     * [1,2].rotate(90) // [-2,1]
     * ```
     */
    public rotate(angle: number): this {
        let a = angle * Math.PI / 180
        let s = Math.sin(a)
        let c = Math.cos(a)
        let [x, y] = this
        let x1 = x * c - y * s
        let y1 = x * s + y * c
        return this.create([x1, y1])
    }


    /**
     * Return the z-component of the cross product between this vector and `vec`.
     * @param vec - the other vector
     * @returns the z-component of the cross product
     * @example
     * ```
     * [1,2].cross2D([3,4]) // 1*4-2*3 = -2
     * ```
     */
    public cross2D(vec: Vector2D | [number, number]): number {
        let [x1, y1] = this
        let [x2, y2] = vec
        return x1 * y2 - y1 * x2
    }

}



/**
 * Return a `Vector2D` prefilled with `elements`.
 * @param x - x-component
 * @param y - y-component
 * @returns a `Vector2D` array
 * @example
 * ```
 * vector2D(1,2) // Vector2D of [1,2]
 * ```
 */
export function vector2D(x: number, y: number): Vector2D {
    let vec = new Vector2D()
    vec.push(x, y)
    return vec
}




/**
 * Return a `Vector2D` prefilled with `elements`.
 * @param point - the point to form the vector
 * @returns a `Vector2D` array
 * @example
 * ```
 * vec2D([1,2]) // Vector2D of [1,2]
 * ```
 */
export function vec2D(point: [number, number] | Vector2D): Vector2D
/**
 * Return a `Vector2D` given two points.
 * @param pointStart - start point
 * @param pointEnd - end point
 * @returns a `Vector2D` array
 * @example
 * ```
 * vec2D([1,1],[3,4]) // Vector2D of [2,3]
 * ```
 */
export function vec2D(pointStart: [number, number] | Vector2D, pointEnd: [number, number] | Vector2D): Vector2D
export function vec2D(p1: [number, number] | Vector2D, p2?: [number, number] | Vector2D): Vector2D {
    if (p2 === undefined) {
        let [x, y] = p1
        return vector2D(x, y)
    } else {
        let [x1, y1] = p1
        let [x2, y2] = p2
        return vector2D(x2 - x1, y2 - y1)
    }
}


