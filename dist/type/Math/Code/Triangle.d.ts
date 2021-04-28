/**
 * @category Triangle
 * @return Find side length c by cosine law. Input sides a,b and angle C.
 * ```typescript
 * CosineLawLength(5,5,60) // 5
 * CosineLawLength(2,4,30) // 2.47862735
 * CosineLawLength(1,2,180) // 3
 * CosineLawLength(4,6,0) // 2
 * ```
 */
declare function CosineLawLength(a: number, b: number, C: number): number;
/**
 * @category Triangle
 * @return Find angle C by cosine law. Input sides a,b,c.
 * ```typescript
 * CosineLawAngle(5,5,5) // 60
 * CosineLawAngle(3,4,5) // 90
 * CosineLawAngle(7,8,9) // 73.3984504
 * ```
 */
declare function CosineLawAngle(a: number, b: number, c: number): number;
/**
 * @category Triangle
 * @return Find area by Heron's formula.
 * ```typescript
 * Heron(3,4,5) // 6
 * Heron(1,1,1) // 0.433012701
 * Heron(7,8,9) // 26.83281573
 * ```
 */
declare function Heron(a: number, b: number, c: number): number;
/**
 * @category Triangle
 * @param fix - Round all return values to integer.
 * @return Return the 6 elements of a triangle given vertice. { sideC, angleB, sideA, angleC, sideB, angleA }
 * ```typescript
 * TriangleFromVertex([0,0],[4,0],[0,3],false)
 * // {sideC:4, angleB:36.86989765, sideA:5, angleC:53.13013235, sideB:3, angleA:90}
 * ```
 */
declare function TriangleFromVertex(A: Point, B: Point, C: Point, fix?: boolean): Triangle;
/**
 * @category Triangle
 * @param triangle - unknown elements are null.
 * @return Solve a triangle. return the triangle object solved.
 * ```typescript
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
declare function SolveTriangle({ sideA, sideB, sideC, angleA, angleB, angleC }: PartialTriangle): Triangle;
