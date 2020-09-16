

/**
 * Find side length by cosine law.
 * @category Triangle
 * @param {number} a - Side length a
 * @param {number} b - Side length b
 * @param {number} C - Angle C
 * @return {number} Side length c, opposite to angle C.
 * @example
 * CosineLawLength(5,5,60) // return 5
 * CosineLawLength(2,4,30) // return 2.47862735
 * CosineLawLength(1,2,180) // return 3
 * CosineLawLength(4,6,0) // return 2
 */
function CosineLawLength(a: number, b: number, C: number): number {
    return (a ** 2 + b ** 2 - 2 * a * b * cos(C)) ** 0.5
}
globalThis.CosineLawLength = CosineLawLength



/**
 * Find angle by cosine law.
 * @category Triangle
 * @param {number} a - Side length a
 * @param {number} b - Side length b
 * @param {number} c - Side length c
 * @return {number} Angle C, opposite to side c.
 * @example
 * CosineLawAngle(5,5,5) // return 60
 * CosineLawAngle(3,4,5) // return 90
 * CosineLawAngle(7,8,9) // return 73.3984504
 */
function CosineLawAngle(a: number, b: number, c: number): number {
    return arccos((c ** 2 - a ** 2 - b ** 2) / (-2 * a * b))
}
globalThis.CosineLawAngle = CosineLawAngle



/**
 * Return the 6 elements of a triangle given vertice.
 * @category Triangle
 * @param {number[]} A - Coordinates [x,y] of vertice A.
 * @param {number[]} B - Coordinates [x,y] of vertice B.
 * @param {number[]} C - Coordinates [x,y] of vertice C.
 * @return {number[]} return [c, angleB, a, angleC, b, angleA], in direction A --> B --> C.
 * @example
 * TriangleFromVertex([0,0],[4,0],[0,3]) // return [4,36.86989765,5,53.13013235,3,90]
 * TriangleFromVertex([-3,-2],[5,1],[-2,5]) // return [8.5440037453,50.3009265165,8.0622577483,68.3852210572,7.0710678119,61.3138524263]
  */
function TriangleFromVertex(A: number[], B: number[], C: number[]): number[] {
    let c = Distance(A, B)
    let a = Distance(B, C)
    let b = Distance(C, A)
    let angleC = CosineLawAngle(a, b, c)
    let angleA = CosineLawAngle(b, c, a)
    let angleB = CosineLawAngle(a, c, b)
    return [c, angleB, a, angleC, b, angleA]
}
globalThis.TriangleFromVertex = TriangleFromVertex
