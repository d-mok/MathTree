/**
 * ```
 * // linear equation of straight line
 * [1,2,3] // x+2y+3=0
 * ```
 */
declare type Linear = [a: number, b: number, c: number];
/**
 * ```
 * // slope-intercept form of straight line
 * [2,3] // y=2x+3
 * ```
 */
declare type Line = [slope: number, yInt: number];
/**
 * ```
 * // quadratic form
 * [1,2,3] // x^2+2x+3
 * ```
 */
declare type Quadratic = [a: number, b: number, c: number];
declare type Point = [x: number, y: number];
declare type Vector = [x: number, y: number];
declare type interval = [min: number, max: number];
declare type Fraction = [numerator: number, denominator: number];
/**
 * ```
 * // used in linear programming
 * [1,2,"<=",3] // x+2y <= 3
 * ```
 */
declare type Constraint = [xCoeff: number, yCoeff: number, ineq: Ineq, constant: number];
/**
 * ```
 * // used in linear programming
 * [1,2,3] // x+2y+3
 * ```
 */
declare type Field = [xCoeff: number, yCoeff: number, constant: number];
declare type Highlight = {
    point: Point;
    color?: string;
    circle?: boolean;
    contour?: boolean;
    coordinates?: boolean;
    label?: boolean;
};
declare type Triangle = {
    sideA: number;
    sideB: number;
    sideC: number;
    angleA: number;
    angleB: number;
    angleC: number;
};
declare type PartialTriangle = {
    sideA: number | null;
    sideB: number | null;
    sideC: number | null;
    angleA: number | null;
    angleB: number | null;
    angleC: number | null;
};
declare type QuadrantName = "I" | "II" | "III" | "IV";
declare type QuadrantCode = 1 | 2 | 3 | 4;
declare type PolarPoint = [r: number, q: number];
declare type TrigFunc = 'sin' | 'cos' | 'tan';
declare type Ineq = '\\ge' | '\\gt' | '\\le' | '\\lt' | '>=' | '<=' | '>' | '<';
