import { Vector } from './vector';
import { vector2D } from './vector2D';
/**
 * A class of 3D vector, implemented as a subclass of array.
 */
export class Vector3D extends Vector {
    /**
     * Return an array [number,number,number] of this vector.
     * @returns an array [x,y,z]
     * @example
     * ```
     * [1,2,3].toArray() // [1,2,3]
     * ```
     */
    toArray() {
        let [x, y, z] = this;
        return [x, y, z];
    }
    /**
     * Return the cross product of this vector and `vec`.
     * @param vec - the other vector
     * @returns the cross product
     * @example
     * ```
     * [1,0,0].cross([0,1,0]) // [0,0,1]
     * ```
     */
    cross(vec) {
        let [x1, y1, z1] = this;
        let [x2, y2, z2] = vec;
        let x = y1 * z2 - z1 * y2;
        let y = z1 * x2 - x1 * z2;
        let z = x1 * y2 - y1 * x2;
        return this.create([x, y, z]);
    }
    /**
     * Return the rotated version of this vector, about the `axis` vector, by `angle` according to the right-hand grip rule.
     * @param axis - the vector specifying the axis direction
     * @param angle - the angle to rotate
     * @returns the rotated vector
     * @example
     * ```
     * [1,2,3].rotate([0,0,1],90) // [-2,1,3]
     * ```
     */
    rotate(axis, angle) {
        let a = angle * Math.PI / 180;
        let s = Math.sin(a);
        let c = Math.cos(a);
        let k = this.create(axis).unit();
        let term1 = this.times(c);
        let term2 = k.cross(this).times(s);
        let term3 = k.times(k.dot(this)).times(1 - c);
        return term1.add(term2).add(term3);
    }
    /**
     * Return the vector projection of this vector onto the plane formed by `vec1` and `vec2`.
     * @param vec1 - the 1st vector on the plane
     * @param vec2 - the 2nd vector on the plane
     * @returns the vector projection
     * @example
     * ```
     * [3,4,5].projectOnPlane([1,0,0],[0,1,0]) // [3,4,0]
     * ```
     */
    projectOnPlane(vec1, vec2) {
        let normal = this.normalToPlane(vec1, vec2);
        return this.minus(normal);
    }
    /**
     * Return the normal component of this vector to the plane formed by `vec1` and `vec2`.
     * @param vec1 - the 1st vector on the plane
     * @param vec2 - the 2nd vector on the plane
     * @returns the normal vector
     * @example
     * ```
     * [3,4,5].normalToPlane([1,0,0],[0,1,0]) // [0,0,5]
     * ```
     */
    normalToPlane(vec1, vec2) {
        let v1 = this.create(vec1);
        let v2 = this.create(vec2);
        let normal = v1.cross(v2);
        return this.projectOn(normal);
    }
    /**
     * Return the projection of this 3D vector on the 2D plane, by cabinet projection.
     * @param angle - the viewing angle
     * @param depth - the y-direction depth
     * @returns the projected 2D vector
     * @example
     * ```
     * [3, 4, 5].projectTo2D(60, 0.5) // [4, 6.732050807568877]
     * ```
     */
    projectTo2D(angle = 60, depth = 0.5) {
        let a = angle * Math.PI / 180;
        let s = Math.sin(a);
        let c = Math.cos(a);
        let [x, y, z] = this;
        let x_new = x + depth * y * c;
        let y_new = z + depth * y * s;
        return vector2D(x_new, y_new);
    }
}
/**
 * Return a `Vector3D` prefilled with `elements`.
 * @param x - x-component
 * @param y - y-component
 * @param z - z-component
 * @returns a `Vector3D` array
 * @example
 * ```
 * vector3D(1,2,3) // Vector3D of [1,2,3]
 * ```
 */
export function vector3D(x, y, z) {
    let vec = new Vector3D();
    vec.push(x, y, z);
    return vec;
}
export function vec3D(p1, p2) {
    if (p2 === undefined) {
        let [x, y, z] = p1;
        return vector3D(x, y, z);
    }
    else {
        let [x1, y1, z1] = p1;
        let [x2, y2, z2] = p2;
        return vector3D(x2 - x1, y2 - y1, z2 - z1);
    }
}
//# sourceMappingURL=vector3D.js.map