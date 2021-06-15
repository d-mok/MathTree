
/**
 * @category Triangle
 * @return Find side length c by cosine law. Input sides a,b and angle C.
 * ```
 * CosineLawLength(5,5,60) // 5
 * CosineLawLength(2,4,30) // 2.47862735
 * CosineLawLength(1,2,180) // 3
 * CosineLawLength(4,6,0) // 2
 * ```
 */
function CosineLawLength(a: number, b: number, C: number): number {
    return (a ** 2 + b ** 2 - 2 * a * b * cos(C)) ** 0.5
}
globalThis.CosineLawLength = contract(CosineLawLength).sign(
    [owl.positive, owl.positive, [owl.positive, owl.between(0, 180)]]
)



/**
 * @category Triangle
 * @return Find angle C by cosine law. Input sides a,b,c.
 * ```
 * CosineLawAngle(5,5,5) // 60
 * CosineLawAngle(3,4,5) // 90
 * CosineLawAngle(7,8,9) // 73.3984504
 * ```
 */
function CosineLawAngle(a: number, b: number, c: number): number {
    return arccos((c ** 2 - a ** 2 - b ** 2) / (-2 * a * b))
}
globalThis.CosineLawAngle = contract(CosineLawAngle).seal({
    arg: [owl.positive],
    args: function triangle_ineq(a, b, c) { return owl.triangleSides([a, b, c]) }
})


/**
 * @category Triangle
 * @return Find area by Heron's formula.
 * ```
 * Heron(3,4,5) // 6
 * Heron(1,1,1) // 0.433012701
 * Heron(7,8,9) // 26.83281573
 * ```
 */
function Heron(a: number, b: number, c: number): number {
    let s = (a + b + c) / 2
    return (s * (s - a) * (s - b) * (s - c)) ** 0.5
}
globalThis.Heron = contract(Heron).seal({
    arg: [owl.positive],
    args: function triangle_ineq(a, b, c) { return owl.triangleSides([a, b, c]) }
})

/**
 * @category Triangle
 * @param fix - Round all return values to integer.
 * @return Return the 6 elements of a triangle given vertice. { sideC, angleB, sideA, angleC, sideB, angleA }
 * ```
 * TriangleFromVertex([0,0],[4,0],[0,3],false) 
 * // {sideC:4, angleB:36.86989765, sideA:5, angleC:53.13013235, sideB:3, angleA:90}
 * ```
 */
function TriangleFromVertex(A: Point, B: Point, C: Point, fix = true): Triangle {
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
globalThis.TriangleFromVertex = contract(TriangleFromVertex).sign([owl.point, owl.point, owl.point, owl.bool])


/**
 * @category Triangle
 * @param triangle - unknown elements are null.
 * @return Solve a triangle. return the triangle object solved.
 * ```
 * SolveTriangle({sideC:2, sideA:2, sideB:2}) 
 * // {sideC:2, angleB:60, sideA:2, angleC:60, sideB:2, angleA:60}
 * SolveTriangle({sideC:3, angleB:90, sideA:4})
 * // {sideC:3, angleB:90, sideA:4, angleC:36.86989765, sideB:5, angleA:53.13010235}
 * SolveTriangle({sideC:5, angleB:30, angleC:80})
 * // {sideC:5, angleB:30, sideA:4.770944471, angleC:80, sideB:2.53856653, angleA:70}
 * SolveTriangle({sideC:6, angleB:30, angleA:40})
 * // {sideC:6, angleB:30, sideA:4.10424172, angleC:110, sideB:3.192533317, angleA:40}
 * ```
 */
function SolveTriangle({ sideA, sideB, sideC, angleA, angleB, angleC }: Partial<Triangle>): Triangle {


    let a = sideA
    let b = sideB
    let c = sideC
    let A = angleA
    let B = angleB
    let C = angleC

    // temp
    if (a === null) throw 'SolveTriangle not accept null now'
    if (b === null) throw 'SolveTriangle not accept null now'
    if (c === null) throw 'SolveTriangle not accept null now'
    if (A === null) throw 'SolveTriangle not accept null now'
    if (B === null) throw 'SolveTriangle not accept null now'
    if (C === null) throw 'SolveTriangle not accept null now'


    function angleSum() {
        if (A === undefined && B !== undefined && C !== undefined) A = 180 - B - C
        if (B === undefined && A !== undefined && C !== undefined) B = 180 - A - C
        if (C === undefined && B !== undefined && A !== undefined) C = 180 - A - B
    }

    function SSS() {
        if (a !== undefined && b !== undefined && c !== undefined) {
            A = CosineLawAngle(b, c, a)
            B = CosineLawAngle(c, a, b)
            C = CosineLawAngle(a, b, c)
        }
    }

    function SAS() {
        if (a !== undefined && b !== undefined && C !== undefined && c === undefined) c = CosineLawLength(a, b, C)
        if (b !== undefined && c !== undefined && A !== undefined && a === undefined) a = CosineLawLength(b, c, A)
        if (c !== undefined && a !== undefined && B !== undefined && b === undefined) b = CosineLawLength(c, a, B)
    }

    function AAS() {
        let r: number | undefined = undefined
        if (A !== undefined && a !== undefined && r === undefined) r = sin(A) / a
        if (B !== undefined && b !== undefined && r === undefined) r = sin(B) / b
        if (C !== undefined && c !== undefined && r === undefined) r = sin(C) / c
        if (r !== undefined && A !== undefined && a === undefined) a = sin(A) / r
        if (r !== undefined && B !== undefined && b === undefined) b = sin(B) / r
        if (r !== undefined && C !== undefined && c === undefined) c = sin(C) / r
    }

    for (let i = 0; i < 10; i++) {
        if (a !== undefined && b !== undefined && c !== undefined
            && A !== undefined && B !== undefined && C !== undefined) {
            return { sideA: a, sideB: b, sideC: c, angleA: A, angleB: B, angleC: C }
        }
        angleSum()
        SSS()
        SAS()
        AAS()
    }
    Should(false, 'Solve Triangle Fail!')
    throw 'never'
}
globalThis.SolveTriangle = contract(SolveTriangle).sign()


/**
 * @category Triangle
 * @return the orthocentre of a triangle
 * ```
 * Orthocentre([9,-6],[6,10],[-7,10])  // [9,13]
 * ```
 */
function Orthocentre(A: Point, B: Point, C: Point): Point {
    let H = PerpendicularFoot(A, B, C)
    let G = PerpendicularFoot(B, C, A)
    let [x, y] = Intersection(C, H, A, G)
    return [ant.blur(x), ant.blur(y)]
}
globalThis.Orthocentre = contract(Orthocentre).sign([owl.point])



/**
 * @category Triangle
 * @return the circumcentre of a triangle
 * ```
 * Circumcentre([1,7],[8,-4],[-10,0])  // [-1,-2]
 * ```
 */
function Circumcentre(A: Point, B: Point, C: Point): Point {
    let [a1, b1, c1] = LinearFromBisector(A, B)
    let [a2, b2, c2] = LinearFromBisector(B, C)
    let [x, y] = Crammer(a1, b1, -c1, a2, b2, -c2)
    return [ant.blur(x), ant.blur(y)]
}
globalThis.Circumcentre = contract(Circumcentre).sign([owl.point])




/**
 * @category Triangle
 * @return the centroid of a triangle
 * ```
 * Centroid([3,6],[9,12],[15,21])  // [9,13]
 * ```
 */
function Centroid(A: Point, B: Point, C: Point): Point {
    let [x, y] = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3]
    return [ant.blur(x), ant.blur(y)]
}
globalThis.Centroid = contract(Centroid).sign([owl.point])




/**
 * @category Triangle
 * @return the incentre of a triangle
 * ```
 * Incentre([3,0],[-3,0],[0,4])  // [0,1.5]
 * ```
 */
function Incentre(A: Point, B: Point, C: Point): Point {
    let a = Distance(B, C)
    let b = Distance(A, C)
    let c = Distance(A, B)
    let p = a + b + c
    let x = (a * A[0] + b * B[0] + c * C[0]) / p
    let y = (a * A[1] + b * B[1] + c * C[1]) / p
    return [ant.blur(x), ant.blur(y)]
}
globalThis.Incentre = contract(Incentre).sign([owl.point])

