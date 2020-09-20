

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
 * @param {boolean} [fix=true] - Round all return values to integer.
 * @return {object} return { sideC, angleB, sideA, angleC, sideB, angleA }
 * @example
 * TriangleFromVertex([0,0],[4,0],[0,3],false) 
 * // return {sideC:4, angleB:36.86989765, sideA:5, angleC:53.13013235, sideB:3, angleA:90}
 */
function TriangleFromVertex(A: number[], B: number[], C: number[], fix = true)
    : { sideA: number, sideB: number, sideC: number, angleA: number, angleB: number, angleC: number } {
    let sideC = Distance(A, B)
    let sideA = Distance(B, C)
    let sideB = Distance(C, A)
    let angleC = CosineLawAngle(sideA, sideB, sideC)
    let angleA = CosineLawAngle(sideB, sideC, sideA)
    let angleB = CosineLawAngle(sideA, sideC, sideB)
    if (fix) {
        sideC = Fix(sideC)
        sideA = Fix(sideA)
        sideB = Fix(sideB)
        angleC = Fix(angleC)
        angleA = Fix(angleA)
        angleB = Fix(angleB)
    }
    return { sideC, angleB, sideA, angleC, sideB, angleA }
}
globalThis.TriangleFromVertex = TriangleFromVertex


/**
 * Solve a triangle.
 * @category Triangle
 * @param {object} triangle - { sideC, angleB, sideA, angleC, sideB, angleA } where unknown elements are null.
 * @return {object} return the triangle object solved.
 * @example
 * SolveTriangle({sideC:2, sideA:2, sideB:2}) 
 * // {sideC:2, angleB:60, sideA:2, angleC:60, sideB:2, angleA:60}
 * SolveTriangle({sideC:3, angleB:90, sideA:4})
 * // {sideC:3, angleB:90, sideA:4, angleC:36.86989765, sideB:5, angleA:53.13010235}
 * SolveTriangle({sideC:5, angleB:30, angleC:80})
 * // {sideC:5, angleB:30, sideA:4.770944471, angleC:80, sideB:2.53856653, angleA:70}
 * SolveTriangle({sideC:6, angleB:30, angleA:40})
 * // {sideC:6, angleB:30, sideA:4.10424172, angleC:110, sideB:3.192533317, angleA:40}
 */
function SolveTriangle(
    { sideA = null, sideB = null, sideC = null, angleA = null, angleB = null, angleC = null }: { sideA: number | null, sideB: number | null, sideC: number | null, angleA: number | null, angleB: number | null, angleC: number | null }
) {

    let a = sideA
    let b = sideB
    let c = sideC
    let A = angleA
    let B = angleB
    let C = angleC

    function angleSum() {
        if (A === null && B !== null && C !== null) A = 180 - B - C
        if (B === null && A !== null && C !== null) B = 180 - A - C
        if (C === null && B !== null && A !== null) C = 180 - A - B
    }

    function SSS() {
        if (a !== null && b !== null && c !== null) {
            A = CosineLawAngle(b, c, a)
            B = CosineLawAngle(c, a, b)
            C = CosineLawAngle(a, b, c)
        }
    }

    function SAS() {
        if (a !== null && b !== null && C !== null && c === null) c = CosineLawLength(a, b, C)
        if (b !== null && c !== null && A !== null && a === null) a = CosineLawLength(b, c, A)
        if (c !== null && a !== null && B !== null && b === null) b = CosineLawLength(c, a, B)
    }

    function AAS() {
        let r: number | null = null
        if (A !== null && a !== null && r === null) r = sin(A) / a
        if (B !== null && b !== null && r === null) r = sin(B) / b
        if (C !== null && c !== null && r === null) r = sin(C) / c
        if (r !== null && A !== null && a === null) a = sin(A) / r
        if (r !== null && B !== null && b === null) b = sin(B) / r
        if (r !== null && C !== null && c === null) c = sin(C) / r
    }

    for (let i = 0; i < 10; i++) {
        if (a !== null && b !== null && c !== null && A !== null && B !== null && C !== null) {
            return { sideA: a, sideB: b, sideC: c, angleA: A, angleB: B, angleC: C }
        }
        angleSum()
        SSS()
        SAS()
        AAS()
    }
    throw 'Solve Triangle Fail!'

}
globalThis.SolveTriangle = SolveTriangle