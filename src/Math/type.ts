
type Point = [x: number, y: number]
type Vector = [x: number, y: number]

type Fraction = [numerator: number, denominator: number]

/**
 * ```
 * // used in linear programming
 * [1,2,"<=",3] // x+2y <= 3
 * ```
 */
type Constraint = [xCoeff: number, yCoeff: number, ineq: string, constant: number]

/**
 * ```
 * // used in linear programming
 * [1,2,3] // x+2y+3
 * ```
 */
type Field = [xCoeff: number, yCoeff: number, constant: number]

type Optimum = {
    point: Point,
    value: number
}

type LinearProgram = {
    vertex: Point[],
    integral: Point[],
    vertexMin: Optimum | undefined,
    vertexMax: Optimum | undefined,
    integralMin: Optimum | undefined,
    integralMax: Optimum | undefined
}

type Highlight = {
    point: Point,
    color?: string,
    circle?: boolean,
    contour?: boolean,
    coordinates?: boolean,
    label?: boolean
}


type Triangle = {
    sideA: number,
    sideB: number,
    sideC: number,
    angleA: number,
    angleB: number,
    angleC: number
}

type PartialTriangle = {
    sideA: number | null,
    sideB: number | null,
    sideC: number | null,
    angleA: number | null,
    angleB: number | null,
    angleC: number | null,
}




type QuadrantName = "I" | "II" | "III" | "IV"
type QuadrantCode = 1 | 2 | 3 | 4

type PolarPoint = [r: number, q: number]

type TrigFunc = 'sin' | 'cos' | 'tan'


// type Dict = {
//     [_: string]: any
//     a: any
//     b: any
//     c: any
//     d: any
//     e: any
//     f: any
//     g: any
//     h: any
//     i: any
//     j: any
//     k: any
//     l: any
//     m: any
//     n: any
//     o: any
//     p: any
//     q: any
//     r: any
//     s: any
//     t: any
//     u: any
//     v: any
//     w: any
//     x: any
//     y: any
//     z: any
//     A: any
//     B: any
//     C: any
//     D: any
//     E: any
//     F: any
//     G: any
//     H: any
//     I: any
//     J: any
//     K: any
//     L: any
//     M: any
//     N: any
//     O: any
//     P: any
//     Q: any
//     R: any
//     S: any
//     T: any
//     U: any
//     V: any
//     W: any
//     X: any
//     Y: any
//     Z: any
// }