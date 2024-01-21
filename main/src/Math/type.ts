declare global {
    /**
     * ```
     * // quadratic form
     * [1,2,3] // x^2+2x+3
     * ```
     */
    type Quadratic = [a: number, b: number, c: number]

    type Point2D = [x: number, y: number]
    type Point3D = [x: number, y: number, z: number]
    type Point = Point2D | Point3D

    type interval = [min: number, max: number]

    type Fraction = [numerator: number, denominator: number]

    /**
     * ```
     * // used in linear programming
     * [1,2,"<=",3] // x+2y <= 3
     * ```
     */
    type Constraint = [
        xCoeff: number,
        yCoeff: number,
        ineq: Ineq,
        constant: number
    ]

    /**
     * ```
     * // used in linear programming
     * [1,2,3] // x+2y+3
     * ```
     */
    type Field = [xCoeff: number, yCoeff: number, constant: number]

    type Highlight = {
        point: Point2D
        color?: string
        circle?: boolean
        contour?: boolean
        coordinates?: boolean
        label?: boolean
    }

    type Triangle = {
        sideA: number
        sideB: number
        sideC: number
        angleA: number
        angleB: number
        angleC: number
    }

    type QuadrantName = 'I' | 'II' | 'III' | 'IV'
    type QuadrantCode = 1 | 2 | 3 | 4

    type PolarPoint = [r: number, q: number]

    type TrigFunc = 'sin' | 'cos' | 'tan'

    type Ineq =
        | '\\ge'
        | '\\gt'
        | '\\le'
        | '\\lt'
        | '>='
        | '<='
        | '>'
        | '<'
        | [greater: boolean, equal: boolean]

    type monomial = { coeff: number; [_: string]: number }
    type polynomial = monomial[]

    type CompoundInequality = [
        connective: 'AND' | 'OR',
        sign1: Ineq,
        num1: number,
        sign2: Ineq,
        num2: number,
        variable: string
    ]

    type TrigValue = [TrigFunc, number | string]

    type TrigExp = [TrigFunc, number, 1 | -1, string]

    type quantity = { val: number; unit: string }

    type Line =
        | [Point2D, Point2D]
        | [A: number, B: number, C: number]
        | [A: number, B: number, '=', C: number]
        | [m: number, c: number]
        | [Point2D, m: number]
        | [polarAngle: number, Point2D]

    type Circle =
        | [Point2D, radius: number]
        | [D: number, E: number, F: number]
        | [Point2D, Point2D, Point2D]

    type Direction = number | [Point2D, Point2D]
}

export {}
