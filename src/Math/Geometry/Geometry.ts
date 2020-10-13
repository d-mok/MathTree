


/**
 * Return the slope between A and B.
 * @category Geometry
 * @param {number[]} A - Coordinates [x,y] of point A.
 * @param {number[]} B - Coordinates [x,y] of point B.
 * @return {number} The slope.
 * @example
 * Slope([0,0],[1,2]) // return 2
 */
function Slope(A: number[], B: number[]): number {
    return (A[1] - B[1]) / (A[0] - B[0]);
}
globalThis.Slope = Slope

/**
 * Return the distance between A and B.
 * @category Geometry
 * @param {number[]} A - Coordinates [x,y] of point A.
 * @param {number[]} B - Coordinates [x,y] of point B.
 * @return {number} The distance.
 * @example
 * Distance([0,0],[1,2]) // return 2.23606797749979
 */
function Distance(A: number[], B: number[]): number {
    return ((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2) ** 0.5;
}
globalThis.Distance = Distance

/**
 * Return the mid-pt of AB.
 * @category Geometry
 * @param {number[]} A - Coordinates [x,y] of point A.
 * @param {number[]} B - Coordinates [x,y] of point B.
 * @return {number[]} Coordinates [x,y] of mid-pt.
 * @example
 * MidPoint([1,2],[3,4]) // return [2,3]
 */
function MidPoint(A: number[], B: number[]): number[] {
    return [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
}
globalThis.MidPoint = MidPoint

/**
 * Return the point P on AB such that AP : PB = ratio : 1-ratio.
 * @category Geometry
 * @param {number[]} A - Coordinates [x,y] of point A.
 * @param {number[]} B - Coordinates [x,y] of point B.
 * @param {number} [ratio=0.5] The ratio of AP. Can be any real value.
 * @return {number[]} Coordinates [x,y] of P.
 * @example
 * DivisionPoint([1,0],[5,0],0.75) // return [4,0]
 */
function DivisionPoint(A: number[], B: number[], ratio = 0.5): number[] {
    let r = ratio;
    let s = 1 - r;
    return [A[0] * s + B[0] * r, A[1] * s + B[1] * r];
}
globalThis.DivisionPoint = DivisionPoint


/**
 * Return vector sum of all points.
 * @category Geometry
 * @param {...number[]} arr - points [x,y] to sum.
 * @return {number[]} Coordinates [x,y] of the sum.
 * @example
 * SumPoint([1,2],[3,4],[5,6]) // return [9,12]
 */
function SumPoint(...arr: number[][]): number[] {
    return [arr.map(x => x[0]).reduce((a, b) => a + b), arr.map(x => x[1]).reduce((a, b) => a + b)];
}
globalThis.SumPoint = SumPoint

/**
 * Return [kx,ky] from [x,y].
 * @category Geometry
 * @param {number[]} P - Coordinates [x,y] to scale.
 * @param {number} [k=1] - Constant to scale.
 * @return {number[]} Coordinates [kx,ky].
 * @example
 * ScalePoint([1,2],2) // return [2,4]
 * ScalePoint([1,2],-2) // return [-2,-4]
 */
function ScalePoint(P: number[], k = 1): number[] {
    return [k * P[0], k * P[1]];
}
globalThis.ScalePoint = ScalePoint

/**
 * Return the vector OP.
 * @category Geometry
 * @param {number[]} O - Coordinates [x,y] of O.
 * @param {number[]} P - Coordinates [x,y] of P.
 * @return {number[]} Coordinates [xP-xO, yP-yO].
 * @example
 * DiffPoint([1,2],[10,5]) // return [9,3]
 */
function DiffPoint(O: number[], P: number[]): number[] {
    return [P[0] - O[0], P[1] - O[1]];
}
globalThis.DiffPoint = DiffPoint

/**
 * Return point P rotated anticlockwise by angle q about point O.
 * @category Geometry
 * @param {number[]} P - Coordinates [x,y] of P.
 * @param {number[]} O - Coordinates [x,y] of O.
 * @param {number} q - polar angle to rotate.
 * @return {number[]} Coordinates [x,y] of rotated point.
 * @example
 * RotatePoint([1,2],[0,0],90) // return [-2,1]
 */
function RotatePoint(P: number[], O: number[], q: number): number[] {
    let D = DiffPoint(O, P);
    D = [D[0] * cos(q) - D[1] * sin(q), D[0] * sin(q) + D[1] * cos(q)];
    return SumPoint(O, D);
}
globalThis.RotatePoint = RotatePoint


/**
 * Return the polar angle of B if A is the origin within [-180,180].
 * @category Geometry
 * @param {number[]} A - Coordinates [x,y] of point A.
 * @param {number[]} B - Coordinates [x,y] of point B.
 * @return {number} The angle.
 * @example
 * Inclination([1,0],[3,2]) // return 45
 * Inclination([3,2],[1,0]) // return -135
 */
function Inclination(A: number[], B: number[]): number {
    return Math.atan2(B[1] - A[1], B[0] - A[0]) / Math.PI * 180;
}
globalThis.Inclination = Inclination





/**
 * Return the polar angle of a normal direction to AB, on the right of AB.
 * @category Geometry
 * @param {number[]} A - Coordinates [x,y] of point A.
 * @param {number[]} B - Coordinates [x,y] of point B.
 * @return {number} The angle.
 * @example
 * Normal([1,0],[3,2]) // return -45
 * Normal([3,2],[1,0]) // return 135
 */
function Normal(A: number[], B: number[]): number {
    let R = RotatePoint(B, A, -90);
    return Inclination(A, R);
}
globalThis.Normal = Normal

/**
 * Return the coordinates [x,y] of the foot of perpendicular from P to AB.
 * @category Geometry
 * @param {number[]} A - Coordinates [x,y] of point A.
 * @param {number[]} B - Coordinates [x,y] of point B.
 * @param {number[]} P - Coordinates [x,y] of point P.
 * @return {number[]} Coordinates [x,y] of the foot of perpendicular.
 * @example
 * PerpendicularFoot([-1,-1],[1,1],[-2,2]) // return [0,0]
 */
function PerpendicularFoot(A: number[], B: number[], P: number[]): number[] {
    let q = Normal(A, B);
    let V = PolToRect([1, q]);
    let Q = SumPoint(P, V);
    return Intersection(A, B, P, Q);
}
globalThis.PerpendicularFoot = PerpendicularFoot


/**
 * Return the intersection point of AB and CD. If AB // CD, return undefined.
 * @category Geometry
 * @param {number[]} A - Coordinates [x,y] of point A.
 * @param {number[]} B - Coordinates [x,y] of point B.
 * @param {number[]} C - Coordinates [x,y] of point C.
 * @param {number[]} D - Coordinates [x,y] of point D.
 * @return {any[]} Coordinates [x,y] of the intersection. If parallel, return [undefined,undefined].
 * @example
 * Intersection([0,0],[2,2],[2,0],[0,2]) // return [1,1]
 */
function Intersection(A: number[], B: number[], C: number[], D: number[]): any[] {
    // let m1 = Slope(A, B);
    // let c1 = A[1] - A[0] * m1;
    // let m2 = Slope(C, D);
    // let c2 = C[1] - C[0] * m2;
    // if (m1 === m2) return [undefined, undefined];
    // return Crammer(-m1, 1, c1, -m2, 1, c2);
    return Crammer(
        B[1]-A[1],
        A[0]-B[0],
        A[0]*B[1]-B[0]*A[1],
        D[1]-C[1],
        C[0]-D[0],
        C[0]*D[1]-D[0]*C[1],
    )
}
globalThis.Intersection = Intersection
