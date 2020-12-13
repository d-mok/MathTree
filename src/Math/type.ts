
type Point = [x: number, y: number]
type Vector = [x: number, y: number]


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

