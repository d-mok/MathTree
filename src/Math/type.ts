
/**
 * ```
 * // linear equation of straigth line
 * [1,2,3] // x+2y+3=0
 * ```
 */
type Linear = [a: number, b: number, c: number]

/**
 * ```
 * // quadratic form
 * [1,2,3] // x^2+2x+3
 * ```
 */
type Quadratic = [a: number, b: number, c: number]

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

type IneqSign = [greater: boolean, equal: boolean] 