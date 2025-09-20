declare module "Core/ink" {
    export function printDfrac(numerator: number, denominator: number, upSign?: boolean): string;
    export function printCombo(combo: [boolean, boolean, boolean]): string;
    export function printTrigValue(T: TrigValue): string;
    export function printTrigExp(T: TrigExp): string;
    export function printOrTrigRoots(roots: number[]): string;
    export function printSurd(num: number): string;
    export function printPointPolar(point: Point2D): string;
    export function printConstraint(con: Constraint, align?: boolean, replaceEqual?: boolean): string;
    export function printConstraints(cons: Constraint[]): string;
    export function printPrimeFactors(num: number): string;
    export function printMonomial(mono: monomial, fraction: boolean): string;
    export function printPolynomial(poly: polynomial, fraction: boolean): string;
    export function printCompoundInequality(compoundInequality: CompoundInequality): string;
    export function printOrdinal(n: number): string;
}
declare module "Core/schema" {
    import * as v from 'valibot';
    export { string, boolean, array, tuple, object, is } from 'valibot';
    export type { BaseSchema } from 'valibot';
    export function be<T>(schema: v.BaseSchema<T, T, any>): (_: unknown) => _ is T;
    export const num: v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>;
    export const ineq: v.UnionSchema<[v.LiteralSchema<">", undefined>, v.LiteralSchema<"<", undefined>, v.LiteralSchema<">=", undefined>, v.LiteralSchema<"<=", undefined>, v.LiteralSchema<"\\gt", undefined>, v.LiteralSchema<"\\lt", undefined>, v.LiteralSchema<"\\ge", undefined>, v.LiteralSchema<"\\le", undefined>, v.StrictTupleSchema<[v.BooleanSchema<undefined>, v.BooleanSchema<undefined>], undefined>], undefined>;
    export const constraint: v.StrictTupleSchema<[v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, v.UnionSchema<[v.LiteralSchema<">", undefined>, v.LiteralSchema<"<", undefined>, v.LiteralSchema<">=", undefined>, v.LiteralSchema<"<=", undefined>, v.LiteralSchema<"\\gt", undefined>, v.LiteralSchema<"\\lt", undefined>, v.LiteralSchema<"\\ge", undefined>, v.LiteralSchema<"\\le", undefined>, v.StrictTupleSchema<[v.BooleanSchema<undefined>, v.BooleanSchema<undefined>], undefined>], undefined>, v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>], undefined>;
    export const constraints: v.ArraySchema<v.StrictTupleSchema<[v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, v.UnionSchema<[v.LiteralSchema<">", undefined>, v.LiteralSchema<"<", undefined>, v.LiteralSchema<">=", undefined>, v.LiteralSchema<"<=", undefined>, v.LiteralSchema<"\\gt", undefined>, v.LiteralSchema<"\\lt", undefined>, v.LiteralSchema<"\\ge", undefined>, v.LiteralSchema<"\\le", undefined>, v.StrictTupleSchema<[v.BooleanSchema<undefined>, v.BooleanSchema<undefined>], undefined>], undefined>, v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>], undefined>, undefined>;
    export const trig: v.UnionSchema<[v.LiteralSchema<"sin", undefined>, v.LiteralSchema<"cos", undefined>, v.LiteralSchema<"tan", undefined>], undefined>;
    export const base: v.SchemaWithPipe<readonly [v.StringSchema<undefined>, v.CheckAction<string, undefined>]>;
    export const combo: v.StrictTupleSchema<[v.BooleanSchema<undefined>, v.BooleanSchema<undefined>, v.BooleanSchema<undefined>], undefined>;
    export const ntuple: v.ArraySchema<v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, undefined>;
    export const point2D: v.StrictTupleSchema<[v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>], undefined>;
    export const point3D: v.StrictTupleSchema<[v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>], undefined>;
    export const monomial: v.ObjectSchema<{
        readonly coeff: v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>;
    }, undefined>;
    export const polynomial: v.ArraySchema<v.ObjectSchema<{
        readonly coeff: v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>;
    }, undefined>, undefined>;
    export const compoundInequality: v.StrictTupleSchema<[v.UnionSchema<[v.LiteralSchema<"AND", undefined>, v.LiteralSchema<"OR", undefined>], undefined>, v.UnionSchema<[v.LiteralSchema<">", undefined>, v.LiteralSchema<"<", undefined>, v.LiteralSchema<">=", undefined>, v.LiteralSchema<"<=", undefined>, v.LiteralSchema<"\\gt", undefined>, v.LiteralSchema<"\\lt", undefined>, v.LiteralSchema<"\\ge", undefined>, v.LiteralSchema<"\\le", undefined>, v.StrictTupleSchema<[v.BooleanSchema<undefined>, v.BooleanSchema<undefined>], undefined>], undefined>, v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, v.UnionSchema<[v.LiteralSchema<">", undefined>, v.LiteralSchema<"<", undefined>, v.LiteralSchema<">=", undefined>, v.LiteralSchema<"<=", undefined>, v.LiteralSchema<"\\gt", undefined>, v.LiteralSchema<"\\lt", undefined>, v.LiteralSchema<"\\ge", undefined>, v.LiteralSchema<"\\le", undefined>, v.StrictTupleSchema<[v.BooleanSchema<undefined>, v.BooleanSchema<undefined>], undefined>], undefined>, v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, v.StringSchema<undefined>], undefined>;
    export const trigValue: v.StrictTupleSchema<[v.UnionSchema<[v.LiteralSchema<"sin", undefined>, v.LiteralSchema<"cos", undefined>, v.LiteralSchema<"tan", undefined>], undefined>, v.UnionSchema<[v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, v.StringSchema<undefined>], undefined>], undefined>;
    export const trigExp: v.StrictTupleSchema<[v.UnionSchema<[v.LiteralSchema<"sin", undefined>, v.LiteralSchema<"cos", undefined>, v.LiteralSchema<"tan", undefined>], undefined>, v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>, v.UnionSchema<[v.LiteralSchema<1, undefined>, v.LiteralSchema<-1, undefined>], undefined>, v.StringSchema<undefined>], undefined>;
    export const quantity: v.ObjectSchema<{
        readonly val: v.SchemaWithPipe<readonly [v.NumberSchema<undefined>, v.CustomSchema<number, undefined>]>;
        readonly unit: v.StringSchema<undefined>;
    }, undefined>;
}
declare module "Core/index" {
    import { cal as $cal, vec as $vec, INEQUAL as $INEQUAL, optimizer as $optimizer, rein as $rein, reins as $reins, lin as $lin } from 'ruby';
    import * as $Ink from "Core/ink";
    import * as $schema from "Core/schema";
    global {
        var cal: typeof $cal;
        var vec: typeof $vec;
        var INEQUAL: typeof $INEQUAL;
        var optimizer: typeof $optimizer;
        var rein: typeof $rein;
        var reins: typeof $reins;
        var lin: typeof $lin;
        var ink: typeof $Ink;
        var schema: typeof $schema;
    }
}
declare module "Math/Algebra/Algebra" {
    /**
     * Solve [x,y] from ax + by = c and px + qy = r.
     * ```
     * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
     * Crammer(1,1,3,2,2,6) // throw, parallel
     * ```
     */
    export function Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number];
    /**
     * The product of two polynomials.
     * ```
     * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
     * // (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
     * ```
     */
    export function xPolynomial(poly1: number[], poly2: number[]): number[];
    /**
     * Expansion coeff of (Ax+B)^n in descending power of x.
     * ```
     * Binomial(2,3,2) // (2x+3)^2 = [4,12,9]
     * Binomial(2,3) // power default to n = 2
     * ```
     */
    export function Binomial(A: number, B: number, n?: number): number[];
}
declare module "Math/Algebra/Calculus" {
    /**
     * Derivative of the function.
     * ```
     * differentiate(x=>x**2) // x=>2*x
     * ```
     */
    export function differentiate(fn: (x: number) => number): (x: number) => number;
    /**
     * Integral of the function, passing through the fix point.
     * ```
     * integrate(x=>2*x, [0,3]) // x=>x**2+3
     * ```
     */
    export function integrate(fn: (x: number) => number, fixPoint?: Point2D): (x: number) => number;
    /**
     * Make a function passing through the points.
     * The points must be sorted in increasing x.
     * ```
     * functionize([[0,0],[1,2]]) // like x=>2*x within 0<x<1
     * ```
     */
    export function functionize(points: Point2D[]): (x: number) => number;
}
declare module "Math/Algebra/Circle" {
    /**
     * D,E,F of circle general form
     * ```
     * CircleGeneral([2,3],5) // [-4,-6,-12]
     * ```
     */
    export function CircleGeneral(centre: Point2D, radius: number): [D: number, E: number, F: number];
    /**
     * Centre and radius from general form.
     * ```
     * CircleFromGeneral(-4,-6,-12) // [[2,3],5]
     * ```
     */
    export function CircleFromGeneral(D: number, E: number, F: number): [Point2D, number];
    /**
     * Intersections between a circle and a straight line.
     * ```
     * CircleLinearIntersect([0,0],2**0.5,[1,-1,0]) // [[-1,-1],[1,1]]
     * ```
     */
    export function CircleLinearIntersect(center: Point2D, radius: number, linear: [number, number, number]): [Point2D, Point2D];
    /**
     * Intersections between a circle and a straight line through `A` and `B`.
     * ```
     * CircleLineIntersect([0,0],2**0.5,[[0,0],[1,1]]) // [[-1,-1],[1,1]]
     * ```
     */
    export function CircleLineIntersect(center: Point2D, radius: number, [A, B]: [Point2D, Point2D]): [Point2D, Point2D];
}
declare module "Math/Algebra/Quadratic" {
    /**
     * the discriminant b^2-4ac.
     * ```
     * Discriminant(2,3,4) // -23
     * ```
     */
    export function Discriminant(a: number, b: number, c: number): number;
    /**
     * the roots [p,q] of ax^2+bx+c=0 where p<=q
     * ```
     * QuadraticRoot(1,2,-3) // [-3,1]
     * QuadraticRoot(1,2,3) // throw when no real root
     * ```
     */
    export function QuadraticRoot(a: number, b: number, c: number): [number, number];
    /**
     * the vertex [h,k] of y=ax^2+bx+c.
     * ```
     * QuadraticVertex(1,2,3) // [-1,2]
     * ```
     */
    export function QuadraticVertex(a: number, b: number, c: number): Point2D;
    /**
     * the quadratic coeff [a,b,c] from given a and roots p and q.
     * ```
     * QuadraticFromRoot(1,2,3) // [1,-5,6]
     * ```
     */
    export function QuadraticFromRoot(a: number, p: number, q: number): Quadratic;
    /**
     * the quadratic coeff [a,b,c] from given a and vertex (h,k).
     * ```
     * QuadraticFromVertex(1,2,3) // [1,-4,7]
     * ```
     */
    export function QuadraticFromVertex(a: number, h: number, k: number): Quadratic;
}
declare module "Math/Algebra/Linear" {
    /**
     * [slope,y-int,x-int] of ax+by+c=0
     * ```
     * LineFeat(2,4,6) // [-0.5,-1.5,-3]
     * LineFeat(0,4,6) // throw
     * ```
     */
    export function LineFeat(a: number, b: number, c: number): [slope: number, yInt: number, xInt: number];
    /**
     * the coeff [a,b,c] in ax+by+c=0 from given intercepts
     * ```
     * LinearFromIntercepts(1,2) // [2,1,-2]
     * LinearFromIntercepts(0,2) // throw
     * ```
     */
    export function LinearFromIntercepts(xInt: number, yInt: number): [a: number, b: number, c: number];
    /**
     * the coeff [a,b,c] in ax+by+c=0 from two given points
     * ```
     * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
     * LinearFromTwoPoints([1,2],[1,2]) // throw
     * ```
     */
    export function LinearFromTwoPoints(point1: Point2D, point2: Point2D): [a: number, b: number, c: number];
    /**
     * the coeff [a,b,c] in ax+by+c=0 from point and slope
     * ```
     * LinearFromPointSlope([1,2],3) // [3,-1,-1]
     * LinearFromPointSlope([1,2],0) // [0,1,-2]
     * ```
     */
    export function LinearFromPointSlope(point: Point2D, slope: number): [a: number, b: number, c: number];
    /**
     * the coeff [a,b,c] in ax+by+c=0 from perpendicular bisector of AB
     * ```
     * LinearFromBisector([1,2],[3,4]) // [1,1,-5]
     * LinearFromBisector([1,2],[1,4]) // [0,1,-3]
     * ```
     */
    export function LinearFromBisector(A: Point2D, B: Point2D): [a: number, b: number, c: number];
    /**
     * [slope,yInt] from given intercepts
     * ```
     * LineFromIntercepts(1,2) // [-2,2]
     * LineFromIntercepts(0,2) // throw
     * ```
     */
    export function LineFromIntercepts(xInt: number, yInt: number): [slope: number, yInt: number];
    /**
     * [slope,yInt] from two given points
     * ```
     * LineFromTwoPoints([1,2],[3,4]) // [1,1]
     * LineFromTwoPoints([1,2],[1,2]) // throw
     * ```
     */
    export function LineFromTwoPoints(point1: Point2D, point2: Point2D): [slope: number, yInt: number];
    /**
     * [slope,yInt] from point and slope
     * ```
     * LineFromPointSlope([1,2],3) // [3,-1]
     * LineFromPointSlope([1,2],0) // [0,2]
     * ```
     */
    export function LineFromPointSlope(point: Point2D, slope: number): [slope: number, yInt: number];
    /**
     * [slope,yInt] from perpendicular bisector of AB
     * ```
     * LineFromBisector([1,2],[3,4]) // [-1,5]
     * LineFromBisector([1,2],[1,4]) // [0,3]
     * ```
     */
    export function LineFromBisector(A: Point2D, B: Point2D): [slope: number, yInt: number];
}
declare module "Math/Algebra/Polynomial" {
    export function getMaxDeg(poly: polynomial): number;
    /**
     * a random polynomial object
     * ```
     * RndPolynomial(5, ['x', 'y'], 3, 9))
     * // may return 7xy+3x^2y^3-2xy^3
     * ```
     */
    export function RndPolynomial(degree: number, vars?: string[], terms?: number, maxCoeff?: number): polynomial;
    /**
     * a string of the polynomial object
     * ```
     * PolyPrint([x^5, 2x^6, 3x^7])
     * // x^{5}+2x^{6}+3x^{7}
     * ```
     */
    export function PolyPrint(poly: polynomial): string;
    /**
     * a polynomial object sorted by power
     * ```
     * PolySort([2x^6, x^5, 3x^7])
     * //  [x^5, 2x^6, 3x^7]
     * ```
     */
    export function PolySort(poly: polynomial, desc?: boolean): polynomial;
    /**
     * a function of the polynomial, for substitution
     * ```
     * func = PolyFunction([2x^6, x^5, 3x^7])
     * func({x:2}) // 272
     * ```
     */
    export function PolyFunction(poly: polynomial): (values: {
        [_: string]: number;
    }) => number;
    /**
     * combine like terms in polynomial
     * ```
     * PolySimplify([x^5, 2x^6, 3x^5])
     * // [4x^5, 2x^6]
     * ```
     */
    export function PolySimplify(poly: polynomial): polynomial;
}
declare module "Pen/modules/range" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenRange {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Set the coordinate range.
         * ```
         * pen.range.set([-5,5],[-2,4]) // -5<x<5 and -2<y<4
         * ```
         */
        set([xmin, xmax]: [number, number], [ymin, ymax]?: [number, number]): void;
        /**
         * Set the coordinate range as a square.
         * ```
         * pen.range.square(5) // -5<x<5 and -5<y<5
         * pen.range.square(5,[1,2]) // -4<x<6 and -3<y<7
         * ```
         */
        square(size: number, [x, y]?: Point2D): void;
        /**
         * Set the coordinate range by capture points.
         * ```
         * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
         * ```
         */
        capture(...points: Point[]): void;
        /**
         * Set the coordinate range by capture points EmbedZ.
         * ```
         * pen.range.captureZ([[1,2],[3,4]], 5) //  [1,2,5], [3,4,5] must be in-view
         * ```
         */
        captureZ(points: Point2D[], z?: number): void;
        /**
         * Set the coordinate range by capturing a circle.
         * ```
         * pen.range.captureCircle([1,2], 3)
         * ```
         */
        captureCircle(center: Point2D, radius: number): void;
        /**
         * Set the coordinate range by capturing a sphere.
         * ```
         * pen.range.captureSphere([0,0,0], 3)
         * ```
         */
        captureSphere(center: Point3D, radius: number): void;
        private capQuadX;
        private capQuadY;
        private capQuadV;
        /**
         * Set the coordinate range by capturing a quadratic graph (with vertex and x-int if any).
         * ```
         * pen.range.captureQuadX(1,2,3) // y=x^2+2x+3
         * ```
         */
        captureQuadX(a: number, b: number, c: number): void;
        /**
         * Set the coordinate range by capturing a quadratic graph (with vertex and y-int).
         * ```
         * pen.range.captureQuadY(1,2,3) // y=x^2+2x+3
         * ```
         */
        captureQuadY(a: number, b: number, c: number): void;
        /**
         * Set the coordinate range by capturing a quadratic graph (with vertex).
         * ```
         * pen.range.captureQuadV(1,2,3) // y=x^2+2x+3
         * ```
         */
        captureQuadV(a: number, b: number, c: number): void;
        /**
         * Set the coordinate range by capturing a quadratic graph (with vertex, y-int and x-int if any).
         * ```
         * pen.range.captureQuad(1,2,3) // y=x^2+2x+3
         * ```
         */
        captureQuad(a: number, b: number, c: number): void;
        /**
         * Set the coordinate range by capturing a line (with both int).
         * ```
         * pen.range.captureLinear(2,3,4) // 2x+3y+4=0
         * ```
         */
        captureLinear(a: number, b: number, c: number): void;
        /**
         * Set the coordinate range by capturing a line (with both int).
         * ```
         * pen.range.captureLine(2,3) // y=2x+3
         * ```
         */
        captureLine(m: number, c: number): void;
        /**
         * Set the coordinate range by capture points or objects, include O(0,0).
         * ```
         * pen.range.extend([1,2],[3,4]) // [0,0], [1,2], [3,4] must be in-view
         * // point | circle [[h,k],r] | sphere [[a,b,c],r]
         * ```
         */
        extend(...points: Point[]): void;
        /**
         * Set the coordinate range by capturing a circle, include O(0,0).
         * ```
         * pen.range.extendCircle([1,2], 3)
         * ```
         */
        extendCircle(center: Point2D, radius: number): void;
    }
}
declare module "Pen/modules/size" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenSize {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        private initSize;
        private initOuterBorder;
        /**
         * Set the canvas size.
         * ```
         * pen.size.set(0.5,2) // width = 0.5 inch, height = 2 inch
         * ```
         */
        set(widthInch?: number, heightInch?: number): void;
        /**
         * Set the canvas size by resolution.
         * ```
         * pen.size.resolution(0.1,0.2)
         * // 0.1 inch for each x-unit, and 0.2 inch for each y-unit
         * ```
         */
        resolution(xIPU?: number, yIPU?: number): void;
        /**
         * Set the canvas size, locking x-y ratio.
         * ```
         * pen.size.lock(1, 2) // max at width = 1 inch and height = 2 inch
         * pen.size.lock(0.5) // max at both = 0.5 inch
         * ```
         */
        lock(maxWidthInch?: number, maxHeightInch?: number): void;
    }
}
declare module "Pen/modules/settings" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenSettings {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Set the weight of the pen (line width).
         * ```
         * pen.set.weight(2) // set a bold line
         * ```
         */
        weight(weight?: number): void;
        /**
         * Set the color of both filling and stroke.
         * ```
         * pen.set.color('grey')
         * ```
         */
        color(color?: string): void;
        /**
         * Set the transparency. From 0 to 1.
         * ```
         * pen.set.alpha(0.9) // slightly transparent
         * ```
         */
        alpha(value?: number): void;
        /**
         * Set the dash pattern of line.
         * ```
         * pen.set.dash([5,5]) // set dash line
         * pen.set.dash(5) // same
         * pen.set.dash(true) // same
         * pen.set.dash(false) // set solid line
         * ```
         */
        dash(segments?: number[] | number | boolean): void;
        /**
         * Set the horizontal alignment of text.
         * ```
         * pen.set.textAlign('left') // {'left','right','center'}
         * ```
         */
        textAlign(align?: CanvasTextAlign): void;
        /**
         * Set the vertical alignment of text.
         * ```
         * pen.set.textBaseline('bottom') // {'top','bottom','middle'}
         * ```
         */
        textBaseline(baseline?: CanvasTextBaseline): void;
        /**
         * Set the size of text.
         * ```
         * pen.set.textSize(2) // double-sized text
         * ```
         */
        textSize(size?: number): void;
        /**
         * Set italic style of text.
         * ```
         * pen.set.textItalic(true)
         * ```
         */
        textItalic(italic?: boolean): void;
        /**
         * Set text direction.
         * ```
         * pen.set.textDir(90) // vertical text
         * ```
         */
        textDir(angle?: number): void;
        /**
         * Set text latex mode.
         * ```
         * pen.set.textLatex(true)
         * ```
         */
        textLatex(on?: boolean): void;
        /**
         * Set the center for label dodge.
         * ```
         * pen.set.labelCenter(A,B,C,D) // centroid of A,B,C,D
         * pen.set.labelCenter() // center of canvas
         * ```
         */
        labelCenter(...centers: Point[]): void;
        /**
         * Set length unit for line label.
         * ```
         * pen.set.lengthUnit('cm')
         * ```
         */
        lengthUnit(text?: string): void;
        /**
         * Set the mode for angle.
         * All angles (e.g. AOB) will be understood as this mode.
         * ```
         * pen.set.angle('polar') // {normal' | 'polar' | 'reflex'}
         * ```
         */
        angle(mode?: 'normal' | 'polar' | 'reflex'): void;
        /**
         * Set 3D projector function.
         * ```
         * pen.set.Projector3D(60, 0.5)
         * // tilted 60 degree, 0.5 depth for y-axis
         * ```
         */
        projector3D(angle?: number, depth?: number): void;
        /**
         * Set the border inch when auto creating outer border.
         * ```
         * pen.set.border(0.2) // 0.2 inch
         * ```
         */
        border(border?: number): void;
        /**
         * Set the mode for direction of line label.
         * ```
         * pen.set.lineLabel('auto') // {'auto', 'left', 'right'}
         * ```
         */
        lineLabel(setting?: 'auto' | 'left' | 'right'): void;
        /**
         * Set the mode for arrow label.
         * ```
         * pen.set.arrowLabel('line') // {'line', 'head', 'front'}
         * ```
         */
        arrowLabel(setting?: 'line' | 'head' | 'front'): void;
        /**
         * Use positive x-axis only.
         * ```
         * pen.set.halfAxisX(true) // use half
         * ```
         */
        halfAxisX(half?: boolean): void;
        /**
         * Use positive y-axis only.
         * ```
         * pen.set.halfAxisY(true) // use half
         * ```
         */
        halfAxisY(half?: boolean): void;
        /**
         * Use positive axis only.
         * ```
         * pen.set.halfAxis(true) // use half
         * ```
         */
        halfAxis(half?: boolean): void;
        /**
         * Reset all pen settings.
         */
        reset(): void;
        /**
         * Reset all pen settings, including border and 3D.
         */
        resetAll(): void;
    }
}
declare module "Pen/modules/d3" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenD3 {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Draw the 3D axis, for development only.
         * @deprecated
         * ```
         * pen.d3.axis3D(100) // draw 3D axis with length 100
         * ```
         */
        axis3D(length?: number): void;
        /**
         * Draw a circle in 3D
         * ```
         * pen.d3.circle([0,0,1],2,[1,0,0],[0,1,0]) // draw a xy circle with radius 2
         * ```
         */
        circle(center: Point3D, radius: number, xVec: Point3D, yVec: Point3D, { line, dash, shade, fill, arc, }?: {
            line?: boolean;
            dash?: boolean;
            shade?: boolean;
            fill?: boolean;
            arc?: [number, number];
        }): void;
        /**
         * Draw a circle on XZ plane in 3D
         * ```
         * pen.d3.circleXZ([0,3,0],2) // draw a xz circle with radius 2
         * ```
         */
        circleXZ(center: Point3D, radius: number, { line, dash, shade, fill, arc, }?: {
            line?: boolean;
            dash?: boolean;
            shade?: boolean;
            fill?: boolean;
            arc?: [number, number];
        }): void;
        /**
         * Draw a circle on YZ plane in 3D
         * ```
         * pen.d3.circleYZ([3,0,0],2) // draw a yz circle with radius 2
         * ```
         */
        circleYZ(center: Point3D, radius: number, { line, dash, shade, fill, arc, }?: {
            line?: boolean;
            dash?: boolean;
            shade?: boolean;
            fill?: boolean;
            arc?: [number, number];
        }): void;
        /**
         * Draw a circle on XY plane in 3D
         * ```
         * pen.d3.circleXY([0,0,3],2) // draw a xy circle with radius 2
         * ```
         */
        circleXY(center: Point3D, radius: number, { line, dash, shade, fill, arc, }?: {
            line?: boolean;
            dash?: boolean;
            shade?: boolean;
            fill?: boolean;
            arc?: [number, number];
        }): void;
        /**
         * Draw a sphere in 3D
         * ```
         * pen.d3.sphere([1,0,0],3) // draw a sphere with radius 3
         * ```
         */
        sphere(center: Point3D, radius: number, { baseDash, baseShade, radiusLine, radiusDash, radiusLabel, lowerOnly, upperOnly, }?: {
            baseDash?: boolean | undefined;
            baseShade?: boolean | undefined;
            radiusLine?: boolean | undefined;
            radiusDash?: boolean | undefined;
            radiusLabel?: string | undefined;
            lowerOnly?: boolean | undefined;
            upperOnly?: boolean | undefined;
        }): void;
        /**
         * @deprecated - for dev only
         * Return the envelop of a frustum
         * @param lowerBase - the points in the lower base
         * @param upperBase - the point in the upper base, must have the same length as lowerBase
         * ```
         * let [A,B,C] = [[0,0,0],[1,0,0],[0,1,0]]
         * let [D,E,F] = [[0,0,3],[1,0,3],[0,1,3]]
         * pen.d3.envelope([A,B,C],[D,E,F])
         * ```
         */
        envelope(lowerBase: Point3D[], upperBase: Point3D[]): [Point3D, Point3D][];
        /**
         * Draw a solid
         * ```
         * let [A,B,C] = [[0,0,0],[2,0,0],[0,2,0]]
         * let V = [0,0,5]
         * pen.d3.solid([A,B,C],V) // draw a cone
         * ```
         */
        solid(lowerBase: Point3D[] | Point2D[] | [center: Point3D, radius: number] | [center: Point2D, radius: number], upperBase: Point3D[] | Point3D | [center: Point3D, radius: number] | [scale: number, vertex: Point3D] | number, { showUpper, showLower, shadeLower, shadeUpper, lowerZ, height, envelopeOnly, }?: {
            showUpper?: boolean;
            showLower?: boolean;
            shadeLower?: boolean;
            shadeUpper?: boolean;
            lowerZ?: number;
            height?: boolean;
            envelopeOnly?: boolean;
        }): void;
        /**
         * Draw the angle between two plane.
         * ```
         * let P = [0,0,1]
         * let O = [0,0,0]
         * let Q = [1,0,0]
         * let A = [0,1,0]
         * let B = [0,-1,0]
         * pen.d3.angleBet([P,O,Q], [A,B], 'x')
         * ```
         */
        angleBet(angle: [Point3D, Point3D, Point3D], line: [Point3D | undefined, Point3D | undefined], label?: string): void;
        /**
         * Draw the dash height and right-angle.
         * ```
         * pen.d3.drop([0,0,1],[0,0,0],[0,1,0])
         * ```
         */
        drop(vertex: Point3D, foot: Point3D, leg: Point3D, label?: string): void;
        /**
         * Draw the dash height, right-angle and the leg.
         * ```
         * pen.d3.height([0,0,1],[0,0,0],[0,1,0])
         * ```
         */
        height(vertex: Point3D, foot: Point3D, leg: Point3D, label?: string): void;
        /**
         * Draw the solid height, right-angle and the leg.
         * ```
         * pen.d3.altitude([0,0,1],[0,0,0],[0,1,0])
         * ```
         */
        altitude(vertex: Point3D, foot: Point3D, leg: Point3D, label?: string): void;
    }
}
declare module "Pen/modules/graph" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenGraph {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Draw a circle (x-h)^2+(y-k)^2 = r^2.
         * ```
         * pen.graph.circle([1,2],3) // (x-1)^2+(y-2)^2 = 9
         * ```
         */
        circle(center: Point2D, radius: number): void;
        /**
         * Draw an arc. AOB must be in polar direction.
         * ```
         * pen.graph.arc([0,0],[1,0],[-1,0]) // upper semi-unit circle
         *
         * ```
         */
        arc(O: Point2D, A: Point2D, B: Point2D): void;
        /**
         * Draw a sector. AOB must be in polar direction.
         * ```
         * pen.graph.sector([0,0],[1,0],[0,1]) // quarter circle sector
         * ```
         */
        sector(O: Point2D, A: Point2D, B: Point2D): void;
        /**
         * Draw a circle segment. AOB must be in polar direction.
         * ```
         * pen.graph.segment([0,0],[1,0],[0,1]) // quarter circle segment
         * ```
         */
        segment(O: Point2D, A: Point2D, B: Point2D): void;
        /**
         * Draw a quadratic graph.
         * ```
         * pen.graph.quadratic(1,2,3) // y=x^2+2x+3.
         * ```
         */
        quadratic(a: number, b: number, c: number): void;
        /**
         * Draw a line y=mx+c.
         * ```
         * pen.graph.line(2,1) // y=2x+1
         * ```
         */
        line(m: number, c: number): void;
        /**
         * Draw a horizontal line.
         * ```
         * pen.graph.horizontal(2) // y=2
         * ```
         */
        horizontal(y: number): void;
        /**
         * Draw a vertical line.
         * ```
         * pen.graph.vertical(2) // x=2
         * ```
         */
        vertical(x: number): void;
        /**
         * Draw a line ax+by+c=0.
         * ```
         * pen.graph.linear(1,2,3) // x+2y+3=0
         * ```
         */
        linear(a: number, b: number, c: number): void;
        /**
         * Draw a line through two points.
         * ```
         * pen.graph.through([0,0],[1,1]) // y = x
         * ```
         */
        through(A: Point, B: Point): void;
        /**
         * Draw the perpendicular bisector of two points.
         * ```
         * pen.graph.perpBisector([0,0],[2,2]) // y = -x+2
         * ```
         */
        perpBisector(A: Point2D, B: Point2D): void;
        /**
         * Draw a rectangle.
         * ```
         * pen.graph.rect([0,0],[2,3]) // draw a rectangle [[0,0],[2,0],[2,3],[0,3]]
         * ```
         */
        rect(A: Point2D, C: Point2D): void;
    }
}
declare module "Pen/modules/fill" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenFill {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Fill a circle.
         * ```
         * pen.fill.circle([1,2],3) // fill (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        circle(center: Point2D, radius: number): void;
        /**
         * Fill a sector. AOB must be in polar direction.
         * ```
         * pen.fill.sector([0,0],[1,0],[0,1]) // fill a quarter circle sector
         * ```
         */
        sector(O: Point2D, A: Point2D, B: Point2D): void;
        /**
         * Fill a circle segment. AOB must be in polar direction.
         * ```
         * pen.fill.segment([0,0],[1,0],[0,1]) // fill a quarter circle segment
         * ```
         */
        segment(O: Point2D, A: Point2D, B: Point2D): void;
        /**
         * Fill a sector-like area. AOB must be in polar direction.
         * ```
         * pen.fill.sectoroid([0,0],[1,0],[0,1],[[-1,0]]) // fill a long sector-like region
         * ```
         */
        sectoroid(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]): void;
        /**
         * Fill a rectangle.
         * ```
         * pen.fill.rect([0,0],[2,3]) // fill a rectangle [[0,0],[2,0],[2,3],[0,3]]
         * ```
         */
        rect(A: Point2D, C: Point2D): void;
    }
}
declare module "Pen/modules/shade" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenShade {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Shade a circle (x-h)^2+(y-k)^2 = r^2.
         * ```
         * pen.shade.circle([1,2],3) // shade (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        circle(center: Point2D, radius: number): void;
        /**
         * Shade a sector. AOB must be in polar direction.
         * ```
         * pen.shade.sector([0,0],[1,0],[0,1]) // shade a quarter circle sector
         * ```
         */
        sector(O: Point2D, A: Point2D, B: Point2D): void;
        /**
         * Shade a circle segment. AOB must be in polar direction.
         * ```
         * pen.shade.segment([0,0],[1,0],[0,1]) // shade a quarter circle segment
         * ```
         */
        segment(O: Point2D, A: Point2D, B: Point2D): void;
        /**
         * Shade a sector-like area. AOB must be in polar direction.
         * ```
         * pen.shade.sectoroid([0,0],[1,0],[0,1],[[-1,0]]) // shade a long sector-like region
         * ```
         */
        sectoroid(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]): void;
        /**
         * Shade a rectangle.
         * ```
         * pen.shade.rect([0,0],[2,3]) // shade a rectangle [[0,0],[2,0],[2,3],[0,3]]
         * ```
         */
        rect(A: Point2D, C: Point2D): void;
    }
}
declare module "Pen/modules/label" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenLabel {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Add a label to a point.
         * ```
         * pen.label.point([1,2],'A',180)
         * // label the point [1,2] as 'A', place the label on the left (180 degree)
         * ```
         */
        point(point: Point, text: string | number, dir?: number, radius?: number): void;
        /**
         * Add a label to points, using index as text.
         * ```
         * pen.label.points({A,B}) // label point A as 'A', point B as 'B'
         * ```
         */
        points(points: {
            [k: string]: Point;
        }): void;
        /**
         * Add a label to points, using index as text, with label center set as center of points.
         * ```
         * pen.label.vertices({A,B}) // label point A as 'A', point B as 'B'
         * ```
         */
        vertices(points: {
            [k: string]: Point;
        }): void;
        /**
         * Add a label to an angle AOB.
         * ```
         * pen.label.angle([[1,2],[0,0],[-2,1]],'x')
         * // label the angle as 'x'
         * ```
         */
        angle([A, O, B]: [Point, Point, Point], text: string | number, dir?: number, radius?: number): void;
        /**
         * Add a label to a line AB.
         * ```
         * pen.label.line([[0,0],[2,4]],'L') // label the line as 'L'
         * ```
         */
        line([A, B]: [Point, Point], text: string | number, dir?: number, radius?: number): void;
        /**
         * Add a label at the front of arrow AB.
         * ```
         * pen.label.line([[0,0],[2,4]],'L') // label the line as 'L'
         * ```
         */
        front([A, B]: [Point, Point], text: string | number, dir?: number, radius?: number): void;
        /**
         * Add a label to a polygon.
         * ```
         * pen.label.polygon([[0,0],[1,0],[0,1]],'L') // label the polygon as 'L'
         * ```
         */
        polygon(points: Point[], text: string | number): void;
        /**
         * Add a coordinates label to a point.
         * ```
         * pen.label.coordinates([1,2],180)
         * // label the point [1,2] as '(1, 2)', place the label on the left (180 degree)
         * ```
         */
        coordinates(point: Point2D, dir?: number, radius?: number): void;
        /**
         * Add a label to the origin.
         * ```
         * pen.label.origin('O') // label the origin as 'O'
         * ```
         */
        origin(text: string | number, dir?: number): void;
    }
}
declare module "Pen/modules/axis" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenAxis {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Draw x-axis.
         * ```
         * pen.axis.x('time') // draw the x-axis, label as 'time'
         * ```
         */
        x(label?: string): void;
        /**
         * Draw y-axis.
         * ```
         * pen.axis.y('height') // draw the y-axis, label as 'height'
         * ```
         */
        y(label?: string): void;
        /**
         * Draw both axis.
         * ```
         * pen.axis.xy('x','y') // draw both axis, label as 'x' and 'y'
         * ```
         */
        xy(xlabel?: string, ylabel?: string): void;
    }
}
declare module "Pen/modules/tick" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenTick {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Draw ticks on the x-axis.
         * ```
         * pen.tick.x(2) // draw ticks on the x-axis, at interval 2 units
         * ```
         */
        x(interval?: number, mark?: boolean): void;
        /**
         * Draw ticks on the y-axis.
         * ```
         * pen.tick.y(2) // draw ticks on the y-axis, at interval 2 units
         * ```
         */
        y(interval?: number, mark?: boolean): void;
        /**
         * Draw ticks on both axis.
         * ```
         * pen.tick.xy(2) // draw ticks on both axis, at interval 2 units
         * ```
         */
        xy(interval?: number, mark?: boolean): void;
    }
}
declare module "Pen/modules/grid" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenGrid {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Draw gridlines on the x-axis.
         * ```
         * pen.grid.x(2) // draw gridlines on the x-axis, at interval 2 units
         * ```
         */
        x(interval?: number): void;
        /**
         * Draw gridlines on the y-axis.
         * ```
         * pen.grid.y(2) // draw gridlines on the y-axis, at interval 2 units
         * ```
         */
        y(interval?: number): void;
        /**
         * Draw gridlines on both axis.
         * ```
         * pen.grid.xy(2) // draw gridlines on both axis, at interval 2 units
         * ```
         */
        xy(interval?: number): void;
    }
}
declare module "Pen/modules/gridTick" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenGridTick {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Draw gridlines and ticks on the x-axis.
         * ```
         * pen.gridTick.x(2) // at interval 2 units
         * ```
         */
        x(interval?: number, mark?: boolean): void;
        /**
         * Draw gridlines and ticks on the y-axis.
         * ```
         * pen.gridTick.y(2) // at interval 2 units
         * ```
         */
        y(interval?: number, mark?: boolean): void;
        /**
         * Draw gridlines and ticks on both axis.
         * ```
         * pen.gridTick.xy(2) // at interval 2 units
         * ```
         */
        xy(interval?: number, mark?: boolean): void;
    }
}
declare module "Pen/modules/linProg" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenLinProg {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        /**
         * Draw a constraint line.
         * ```
         * pen.linProg.constraint([1,2,'>',3])
         * ```
         */
        drawConstraints(...constraints: Constraint[]): void;
        /**
         * Shade the region of the constraint set.
         * ```
         * pen.linProg.shadeConstraints([[1,2,'>',3]])
         * ```
         */
        shadeConstraints(constraints: Constraint[]): void;
        /**
         * Label coordinates of the vertices of the feasible region.
         * ```
         * pen.linProg.verticesCoord([
         *    [1,0,'>',0],
         *    [0,1,'>',0],
         *    [1,1,'<',2]
         * ])
         * ```
         */
        verticesCoord(constraints: Constraint[]): void;
    }
}
declare module "Pen/modules/rod" {
    import { PenCls } from "Pen/Pen";
    import { Convas } from 'paint';
    export class PenRod {
        private pen;
        private cv;
        constructor(pen: PenCls, cv: Convas);
        private end;
        /**
         * Draw a line from `A` in `dir` with `length`.
         * ```
         * pen.rod.line([0,0],2,90) // from [0,0] to [0,2]
         * ```
         */
        line(A: Point2D, dir: number, length?: number, label?: string | number): void;
        /**
         * Draw a dash line from `A` in `dir` with `length`.
         * ```
         * pen.rod.dash([0,0],2,90) // from [0,0] to [0,2]
         * ```
         */
        dash(A: Point2D, dir: number, length?: number, label?: string | number): void;
        /**
         * Draw an arrow from `A` in `dir` with `length`.
         * ```
         * pen.rod.arrow([0,0],2,90) // from [0,0] to [0,2]
         * ```
         */
        arrow(A: Point2D, dir: number, length?: number, label?: string | number): void;
        /**
         * Draw a ray from `A` in `dir` with `length`.
         * ```
         * pen.rod.rayFrom([0,0],2,90) // from [0,0] to [0,2]
         * ```
         */
        rayFrom(A: Point2D, dir: number, length?: number, label?: string | number): void;
        /**
         * Draw a ray to `A` in `dir` with `length`.
         * ```
         * pen.rod.rayTo([0,0],2,90) // from [0,2] to [0,0]
         * ```
         */
        rayTo(A: Point2D, dir: number, length?: number, label?: string | number): void;
    }
}
declare module "Pen/Pen" {
    import { Convas } from 'paint';
    import { PenRange } from "Pen/modules/range";
    import { PenSize } from "Pen/modules/size";
    import { PenSettings } from "Pen/modules/settings";
    import { PenD3 } from "Pen/modules/d3";
    import { PenGraph } from "Pen/modules/graph";
    import { PenFill } from "Pen/modules/fill";
    import { PenShade } from "Pen/modules/shade";
    import { PenLabel } from "Pen/modules/label";
    import { PenAxis } from "Pen/modules/axis";
    import { PenTick } from "Pen/modules/tick";
    import { PenGrid } from "Pen/modules/grid";
    import { PenGridTick } from "Pen/modules/gridTick";
    import { PenLinProg } from "Pen/modules/linProg";
    import { PenRod } from "Pen/modules/rod";
    export class PenCls {
        protected cv: Convas;
        constructor();
        /**
         * Setup of canvas coordinate range.
         */
        range: PenRange;
        /**
         * Setup of canvas size.
         */
        size: PenSize;
        /**
         * Settings.
         */
        set: PenSettings;
        /**
         * Plot an explicit or parametric function.
         * ```
         * pen.plot(x=>x**2,1,2) // y=x^2 from x = 1 to 2
         * pen.plot(x=>x**2) // y=x^2 in from x = xmin to xmax
         * pen.plot(t=>[cos(t),sin(t)],0,360) // a unit circle
         * ```
         */
        plot(func: ((t: number) => number) | ((t: number) => Point2D), tStart?: number, tEnd?: number): void;
        /**
         * Same as .plot but dashed.
         */
        plotDash(func: ((t: number) => number) | ((t: number) => Point2D), tStart?: number, tEnd?: number): void;
        /**
         * Drawing graph of functions.
         */
        graph: PenGraph;
        /**
         * Draw a point.
         * ```
         * pen.point([1,2]) // draw a point at [1,2]
         * pen.point([1,2],"A") // draw a point at [1,2] and label as "A"
         * ```
         */
        point(position: Point, label?: string): void;
        /**
         * Draw a point.
         * ```
         * pen.points({A,B}) // mark and label point A as 'A', point B as 'B'
         * pen.points({A,B},false) // mark point A and B, without label
         * ```
         */
        points(positions: {
            [k: string]: Point;
        }): void;
        /**
         * Draw a cutter to a horizontal line.
         * ```
         * pen.cutX([1,2]) // draw a vertical cutter at [1,2]
         * pen.cutX(1) // same as cutX([1,0])
         * pen.cutX(1,'x') // label 'x'
         * ```
         */
        cutX(position: Point2D | number, label?: string | number): void;
        /**
         * Draw a cutter to a vertical line.
         * ```
         * pen.cutY([1,2]) // draw a horizontal cutter at [1,2]
         * pen.cutY(1) // same as cutY([0,1])
         * pen.cutY(1,'y') // label 'y'
         * ```
         */
        cutY(position: Point2D | number, label?: string | number): void;
        /**
         * Draw a tick on the x-axis.
         * ```
         * pen.tickX(1) // draw a tick at x=1
         * ```
         */
        tickX(x: number): void;
        /**
         * Draw a tick on the y-axis.
         * ```
         * pen.tickY(1) // draw a tick at y=1
         * ```
         */
        tickY(y: number): void;
        /**
         * Draw a guide line from `point` to the x-axis.
         * ```
         * pen.guideX([1,2],'1') // draw guide from [1,2] and label '1' on x-axis
         * ```
         */
        guideX(point: Point2D, label?: string | number): void;
        /**
         * Draw a guide line from `point` to the y-axis.
         * ```
         * pen.guideY([1,2],'2') // draw guide from [1,2] and label '2' on y-axis
         * ```
         */
        guideY(point: Point2D, label?: string | number): void;
        /**
         * Draw two guide lines from `point` to the x-axis and y-axis.
         * ```
         * pen.guide([1,2],['a','b']) // draw guide from [1,2] and label 'a' on x-axis and 'b' on y-axis
         * ```
         */
        guide(point: Point2D, labels?: [string | number | undefined, string | number | undefined]): void;
        /**
         * Draw a guide line from `point` to the x-axis, and mark the x-coord.
         * ```
         * pen.leadX([1,2]) // draw guide from [1,2] and label 1 on x-axis
         * ```
         */
        leadX(point: Point2D): void;
        /**
         * Draw a guide line from `point` to the y-axis, and mark the y-coord.
         * ```
         * pen.leadY([1,2]) // draw guide from [1,2] and label 2 on y-axis
         * ```
         */
        leadY(point: Point2D): void;
        /**
         * Draw two guide lines from `point` to the x-axis and y-axis, and mark the x-coord and y-coord.
         * ```
         * pen.lead([1,2]) // draw guide from [1,2] and label 1 on x-axis and 2 on y-axis
         * ```
         */
        lead(point: Point2D): void;
        /**
         * Draw a circle.
         * ```
         * pen.circle([1,2], 10) // draw a circle centered at [1,2] with r=10px
         * ```
         */
        circle(center: Point2D, radius: number): void;
        /**
         * Fill a disc.
         * ```
         * pen.disc([1,2], 10) // draw a disc centered at [1,2] with 10 px radius
         * ```
         */
        disc(center: Point2D, radius: number): void;
        /**
         * Shade a disc.
         * ```
         * pen.halo([1,2], 10) // shade a disc centered at [1,2] with 10 px radius
         * ```
         */
        halo(center: Point2D, radius: number): void;
        /**
         * Draw a dot.
         * ```
         * pen.dot([1,2]) // draw a dot at [1,2]
         * ```
         */
        dot(point: Point2D): void;
        /**
         * Draw a hole.
         * ```
         * pen.hole([1,2]) // draw a hole at [1,2]
         * ```
         */
        hole(point: Point2D): void;
        /**
         * Draw a line between two points.
         * ```
         * pen.line([1,2],[3,4]) // draw a line from [1,2] to [3,4]
         * pen.line([1,2],[3,4],'10') //  also label '10'
         * ```
         */
        line(A: Point, B: Point, label?: string | number): void;
        /**
         * Draw a dash line between two points.
         * ```
         * pen.dash([1,2],[3,4]) // draw a dash line from [1,2] to [3,4]
         * pen.dash([1,2],[3,4],'10') //  also label '10'
         * ```
         */
        dash(A: Point, B: Point, label?: string | number): void;
        /**
         * Draw an arrow between two points.
         * ```
         * pen.arrow([1,2],[3,4]) // draw an arrow from [1,2] to [3,4]
         * ```
         */
        arrow(A: Point, B: Point, label?: string | number): void;
        /**
         * Draw the component of the arrow.
         * ```
         * pen.arrowCompo([1,2],[3,4],0,'F','θ')
         * // draw the horizontal component of arrow from [1,2] to [3,4]
         * // label the arrow as 'F'
         * // label the angle as 'θ'
         * ```
         */
        arrowCompo(O: Point2D, P: Point2D, alongDir: number, arrowLabel?: string | number, angleLabel?: string | number): void;
        /**
         * Draw both components of the arrow.
         * ```
         * pen.arrowResolve([1,2],[3,4],0,['Fx','Fy'],'θ')
         * // draw the horizontal and vertical components of arrow from [1,2] to [3,4]
         * // label the arrows as 'Fx' and 'Fy'
         * // label the angle with the horizontal as 'θ'
         * ```
         */
        arrowResolve(O: Point2D, P: Point2D, alongDir: number, arrowLabels?: (string | number | undefined)[], angleLabel?: string | number): void;
        /**
         * Draw a length between two points.
         * ```
         * pen.length([1,2],[3,4],'d')
         * // draw an length 'd' from [1,2] to [3,4]
         * ```
         */
        length(A: Point, B: Point, label?: string | number): void;
        /**
         * Draw a dashed height with right angle, from V to AB.
         * ```
         * pen.height([0,4],[[-1,0],[1,0]],'h')
         * // draw the height 'h' from [0,4] to x-axis
         * ```
         */
        height(V: Point2D, [A, B]: [Point2D, Point2D], label?: string | number): void;
        /**
         * Draw a ray from A to B.
         * ```
         * pen.ray([0,0],[1,1])
         * ```
         */
        ray(A: Point2D, B: Point2D, label?: string | number): void;
        /**
         * Draw a polyline given points.
         * ```
         * pen.polyline([0,0],[5,2],[3,4]) // draw a polyline through 3 points
         * ```
         */
        polyline(...points: Point[]): void;
        /**
         * Draw a polygon given points.
         * ```
         * pen.polygon([0,0],[5,2],[3,4]) // draw a triangle
         * ```
         */
        polygon(...points: Point[]): void;
        /**
         * Fill a polygon given points.
         * ```
         * pen.polyfill([0,0],[5,2],[3,4]) // fill a triangle
         * ```
         */
        polyfill(...points: Point[]): void;
        /**
         * Shade a polygon given points.
         * ```
         * pen.polyshade([0,0],[5,2],[3,4]) // shade a triangle
         * ```
         */
        polyshade(...points: Point[]): void;
        /**
         * Draw and shade a polygon given points.
         * ```
         * pen.polyshape([0,0],[5,2],[3,4]) // draw and shade a triangle
         * ```
         */
        polyshape(...points: Point[]): void;
        /**
         * Draw a rod.
         */
        rod: PenRod;
        /**
         * Fill a shape.
         */
        fill: PenFill;
        /**
         * Shade a shape.
         */
        shade: PenShade;
        /**
         * Linear Programming tools.
         */
        linProg: PenLinProg;
        /**
         * Draw an angle with label.
         * ```
         * pen.angle([0,0],[5,2],[3,4],'x')
         * ```
         */
        angle(A: Point, O: Point, B: Point, label?: string | number, arc?: number, radius?: number): void;
        /**
         * Draw an angle by direction.
         * ```
         * pen.angleDir(0,[0,0],60,'x')
         * ```
         */
        angleDir(A: Point2D | number, O: Point2D, B: Point2D | number, label?: string | number, arc?: number, radius?: number): void;
        /**
         * Decorate equal side lengths.
         * ```
         * pen.decorate.equalSide([1,0],[3,2],2)
         * // a double-tick at the mid-pt of [1,0] and [3,2]
         * ```
         */
        equalSide(A: Point, B: Point, tick?: number): void;
        /**
         * Decorate bisecting equal lengths of a side.
         * ```
         * pen.decorate.bisectSide([0,0], [2,2], 2)
         * // two double-ticks bisecting [0,0] and [2,2] at their mid-pt
         * ```
         */
        bisectSide(A: Point, B: Point, tick?: number): void;
        /**
         * Decorate parallel side.
         * ```
         * pen.decorate.parallel([1,0],[3,2],2)
         * // a double-tick parallel mark at the mid-pt of [1,0] and [3,2]
         * ```
         */
        parallel(A: Point, B: Point, tick?: number): void;
        /**
         * Decorate a right-angle AOB.
         * ```
         * pen.decorate.rightAngle([1,0],[0,0],[3,2])
         * // an right-angle AOB
         * ```
         */
        rightAngle(A: Point, O: Point, B?: Point, size?: number): void;
        /**
         * Decorate a compass.
         * ```
         * pen.decorate.compass([1,2])
         * // a compass at [1,2]
         * ```
         */
        compass(point: Point2D): void;
        /**
         * Write text.
         * ```
         * pen.write([1,2],'abc') // 'abc' at [1,2]
         * ```
         */
        write(point: Point, text: string): void;
        /**
         */
        label: PenLabel;
        /**
         * The axis.
         */
        axis: PenAxis;
        /**
         * Draw both axis. Default no label.
         * ```
         * pen.axes() // draw both axis
         * pen.axes('x','y') // label as 'x' and 'y'
         * ```
         */
        axes(xlabel?: string, ylabel?: string): void;
        /**
         * The axis ticks.
         */
        tick: PenTick;
        /**
         * The axis gridlines.
         */
        grid: PenGrid;
        /**
         * The axis gridlines and ticks.
         */
        gridTick: PenGridTick;
        /**
         * The 3D pen
         */
        d3: PenD3;
        /**
         * Set the background image url.
         * ```
         * pen.background('https://www2.pyc.edu.hk/img/pycnet_logo.png')
         * ```
         */
        background(url: string): void;
        /**
         * @deprecated dev only
         * Export the canvas to image tag. For development only.
         * ```
         * question = pen.printFull(question,'imgQ')
         * // paste the canvas to the image tag with src field 'imgQ'
         * ```
         */
        printFull(html: string, placeholder: string): string;
        /**
         * Export the canvas to image tag, with white space trimmed.
         * ```
         * question = pen.print(question,'imgQ')
         * // paste the canvas to the image tag with src field 'imgQ'
         * ```
         */
        print(html: string, placeholder: string): string;
        /**
         * Clear the canvas.
         */
        clear(): void;
        /**
         * Temporarily save the img internally. Can be later restored by restoreImg.
         */
        saveImg(): void;
        /**
         * Restored the previously saved img by saveImg.
         */
        restoreImg(): void;
    }
}
declare module "Math/Algebra/Transform" {
    import { PenCls } from "Pen/Pen";
    type morph = [action: 'HT' | 'VT' | 'HR' | 'VR' | 'HS' | 'VS', val: number];
    type state = {
        a: number;
        b: number;
        m: number;
        n: number;
    };
    /**
     * Transform a function.
     * ```
     * let f = x => x**2
     * TransformFunc(f,'HT',4) // x => (x+4)**2
     * ```
     */
    export function TransformFunc(f: (x: number) => number, ...morphs: morph[]): (x: number) => number;
    /**
     * Explain a series of function transforms.
     * ```
     * let state = {a:0,b:0,m:1,n:1}
     * let func = (x:number)=>x**2
     * let transforms = [['HT',4],['VT',3]]
     * ExplainTransforms({state,func,transforms})
     * ```
     */
    export function ExplainTransforms({ state, func, transforms, }: {
        state?: state;
        func: (x: number) => number;
        transforms: morph[];
    }): {
        actions: string[];
        steps: string[];
        funcs: ((x: number) => number)[];
        latexs: string[];
        explain: string;
        draw: {
            Q: (pen: PenCls) => void;
            S: (pen: PenCls) => void;
        };
    };
}
declare module "Math/Code/Assertion" {
    /**
     * check is a finite number.
     * ```
     * IsNum(1.23) // true
     * IsNum(NaN) // false
     * IsNum(Infinity) // false
     * IsNum('2') // false
     * ```
     */
    export function IsNum(...items: unknown[]): boolean;
    /**
     * check is an integer.
     * ```
     * IsInteger(5) // true
     * IsInteger(0.5) // false
     * ```
     */
    export function IsInteger(...items: unknown[]): boolean;
    /**
     * check is a decimal (non-integer).
     * ```
     * IsDecimal(0.5) // true
     * IsDecimal(5) // false
     * ```
     */
    export function IsDecimal(...items: unknown[]): boolean;
    /**
     * check is a terminating decimal (or integer)
     * ```
     * IsTerminating(1/4) // true
     * IsTerminating(5) // false
     * ```
     */
    export function IsTerminating(...items: unknown[]): boolean;
    /**
     * check is a rational number with denominator <= 1000.
     * ```
     * IsRational(0.5) // true
     * IsRational(-5) // true
     * IsRational(Math.sqrt(2)) // false
     * ```
     */
    export function IsRational(...items: unknown[]): boolean;
    /**
     * check is an odd integer.
     * ```
     * IsOdd(5) // true
     * IsOdd(-5) // true
     * IsOdd(4) // false
     * ```
     */
    export function IsOdd(...items: unknown[]): boolean;
    /**
     * check is an even integer.
     * ```
     * IsEven(4) // true
     * IsEven(-4) // true
     * IsEven(0) // true
     * IsEven(5) // false
     * ```
     */
    export function IsEven(...items: unknown[]): boolean;
    /**
     * check is in range [0,1].
     * ```
     * IsProbability(0) // true
     * IsProbability(0.5467) // true
     * IsProbability(1.1) // false
     * IsProbability(-0.1) // false
     * ```
     */
    export function IsProbability(...items: unknown[]): boolean;
    /**
     * check is a square number.
     * ```
     * IsSquareNum(9) // true
     * IsSquareNum(10) // false
     * IsSquareNum(-9) // false
     * ```
     */
    export function IsSquareNum(...items: unknown[]): boolean;
    /**
     * check is positive.
     * ```
     * IsPositive(2) // true
     * IsPositive(0) // false
     * IsPositive(-2) // false
     * ```
     */
    export function IsPositive(...items: unknown[]): boolean;
    /**
     * check is non-negative.
     * ```
     * IsNonNegative(2) // true
     * IsNonNegative(0) // true
     * IsNonNegative(-2) // false
     * IsNonNegative(1.5) // true
     * ```
     */
    export function IsNonNegative(...items: unknown[]): boolean;
    /**
     * check is a positive integer.
     * ```
     * IsPositiveInteger(2) // true
     * IsPositiveInteger(0) // false
     * IsPositiveInteger(-2) // false
     * IsPositiveInteger(1.5) // false
     * ```
     */
    export function IsPositiveInteger(...items: unknown[]): boolean;
    /**
     * check is a non-negative integer.
     * ```
     * IsNonNegativeInteger(2) // true
     * IsNonNegativeInteger(0) // true
     * IsNonNegativeInteger(-2) // false
     * IsNonNegativeInteger(1.5) // false
     * ```
     */
    export function IsNonNegativeInteger(...items: unknown[]): boolean;
    /**
     * check is negative.
     * ```
     * IsNegative(-2) // true
     * IsNegative(0) // false
     * IsNegative(2) // false
     * ```
     */
    export function IsNegative(...items: unknown[]): boolean;
    /**
     * check is non-zero finite number.
     * ```
     * IsNonZero(2) // true
     * IsNonZero(0) // false
     * IsNonZero(-2) // true
     * ```
     */
    export function IsNonZero(...items: unknown[]): boolean;
    /**
     * check is between min and max inclusive.
     * ```
     * IsBetween(2,5)(3) // true
     * IsBetween(2,5)(2) // true
     * IsBetween(2,5)(1) // false
     * ```
     */
    export function IsBetween(min: number, max: number): (...items: unknown[]) => boolean;
    /**
     * check if its abs is between min and max inclusive.
     * ```
     * IsAbsBetween(2,5)(-3) // true
     * IsAbsBetween(2,5)(-2) // true
     * IsAbsBetween(2,5)(1) // false
     * ```
     */
    export function IsAbsBetween(min: number, max: number): (...items: unknown[]) => boolean;
    /**
     * Check if the points are chessboard around anchor.
     * ```
     * IsAroundPoint([0,0],2)([2,2]) // true
     * IsAroundPoint([0,0],2)([3,0]) // false
     * ```
     */
    export function IsAroundPoint(anchor: Point2D, range: number): (...points: Point2D[]) => boolean;
    /**
     * Check if the array of legnths can form a triangle
     * ```
     * IsTriangle([1,1,1]) // true
     * IsTriangle([6,7,8]) // true
     * IsTriangle([1,2,3]) // false
     * IsTriangle([6,14,8]) // false
     * ```
     */
    export function IsTriangle(...triangles: [number, number, number][]): boolean;
}
declare module "Math/Code/Combinatorics" {
    /**
     * the factorial n!
     * ```
     * Factorial(5) // 120
     * Factorial(1.5) // throw
     * ```
     */
    export function Factorial(n: number): number;
    /**
     * nCr
     * ```
     * nCr(5,3) // 10
     * ```
     */
    export function nCr(n: number, r: number): number;
    /**
     * nPr
     * ```
     * nPr(5,3) // 60
     * ```
     */
    export function nPr(n: number, r: number): number;
}
declare module "Math/Code/Function" {
    /**
     * log(b,N)
     * ```
     * log(2,8) // 3
     * ```
     */
    export function log(b: number, N: number): number;
    /**
     * square root of x
     * ```
     * Sqrt(4) // 2
     * ```
     */
    export function Sqrt(x: number): number;
    /**
     * the radian of the degree
     * ```
     * Radian(180) // pi
     * Radian(90) // pi/2
     * Radian(30) // PI/6
     * ```
     */
    export function Radian(degree: number): number;
    /**
     * the degree of the radian
     * ```
     * Degree(Math.PI) // 180
     * Degree(Math.PI/2) // 90
     * Degree(Math.PI/6) // 30
     * ```
     */
    export function Degree(radian: number): number;
    /**
     * sin(x).
     * ```
     * sin(30) // 0.5
     * ```
     */
    export function sin(x: number): number;
    /**
     * cos(x).
     * ```
     * cos(60) // 0.5
     * ```
     */
    export function cos(x: number): number;
    /**
     * tan(x).
     * ```
     * tan(45) // 1
     * ```
     */
    export function tan(x: number): number;
    /**
     * arcsin(x) between -90 and 90.
     * ```
     * arcsin(0.5) // 30
     * ```
     */
    export function arcsin(x: number): number;
    /**
     * arccos(x) between 0 and 180.
     * ```
     * arccos(0.5) // 60
     * ```
     */
    export function arccos(x: number): number;
    /**
     * arctan(x) between -90 and 90.
     * ```
     * arctan(1) // 45
     * ```
     */
    export function arctan(x: number): number;
}
declare module "Math/Code/Geometry" {
    /**
     * the slope of AB
     * ```
     * Slope([0,0],[1,2]) // 2
     * Slope([1,2],[1,2]) // NaN
     * ```
     */
    export function Slope(A: Point2D, B: Point2D): number;
    /**
     * the slope perpendicular to AB
     * ```
     * SlopePd([0,0],[1,2]) // -0.5
     * SlopePd([1,2],[1,2]) // NaN
     * ```
     */
    export function SlopePd(A: Point2D, B: Point2D): number;
    /**
     * the distance AB
     * ```
     * Distance([0,0],[1,2]) // 2.23606797749979
     * ```
     */
    export function Distance(A: Point2D, B: Point2D): number;
    /**
     * the chessboard distance AB, max(horizontal,vertical)
     * ```
     * ChessboardDistance([0,0],[1,2]) // 2
     * ChessboardDistance([0,0],[3,2]) // 3
     * ```
     */
    export function ChessboardDistance(A: Point2D, B: Point2D): number;
    /**
     * the mid-pt / centroid of `points`
     * ```
     * Mid([1,2],[3,4]) // [2,3]
     * Mid([1,2],[3,4],[5,6]) // [3,4]
     * ```
     */
    export function Mid(...points: Point2D[]): Point2D;
    /**
     * the point X on dir or segment PQ such that PX : QX = ratioA : ratioB
     * ```
     * Slide([1,0],[5,0],0.75) // [4,0]
     * Slide([1,0],[5,0],3,1) // [4,0]
     * Slide([0,1],[[0,0],[1,0]],1) // [1,1]
     * Slide([0,1],[[0,0],[1,0]],2) // [2,1]
     * ```
     */
    export function Slide(P: Point2D, vec: Point2D | [Point2D, Point2D], ratioA?: number, ratioB?: number): Point2D;
    /**
     * point P rotated anticlockwise by angle q about point O.
     * ```
     * Rotate([1,2],90,[0,0]) // [-2,1]
     * ```
     */
    export function Rotate(P: Point2D, q: number, O?: Point2D): Point2D;
    /**
     * the polar angle of B if A is the origin within [0,360].
     * ```
     * Dir([1,0],[3,2]) // 45
     * Dir([3,2],[1,0]) // 225
     * ```
     */
    export function Dir(A: Point2D, B: Point2D): number;
    /**
     * the foot of perpendicular from P to AB.
     * ```
     * PdFoot([-2,2],[[-1,-1],[1,1]]) // [0,0]
     * ```
     */
    export function PdFoot(P: Point2D, [A, B]: [Point2D, Point2D | number]): Point2D;
    /**
     * the intersection point of AB and CD.
     * ```
     * Intersection([0,0],[2,2],[2,0],[0,2]) // [1,1]
     * Intersection([0,0],45,[2,0],135) // [1,1]
     * ```
     */
    export function Intersection(A: Point2D, B: Point2D | number, C: Point2D, D: Point2D | number): Point2D;
    /**
     * Translate point P in the direction `dir` by a `distance`.
     * @param dir - a polar angle, or two points [A,B] representing Dir(A,B), or one point A representing Dir(P,A)
     * ```
     * Move([1,2],90,3) // [1,5]
     * Move([1,2],[2, 2],3) // [4,2]
     * Move([1,2],[[0,0],[1,0]],3) // [4,2]
     * ```
     */
    export function Move(P: Point2D, dir: number | Point2D | [Point2D, Point2D], distance: number): Point2D;
    /**
     * Translate point P to the right by a distance.
     * ```
     * MoveX([1,2],3) // [4,2]
     * MoveX([1,2],-3) // [-2,2]
     * ```
     */
    export function MoveX(P: Point2D, distance: number): Point2D;
    /**
     * Translate point P upward by a distance.
     * ```
     * MoveY([1,2],3) // [4,2]
     * MoveY([1,2],-3) // [-2,2]
     * ```
     */
    export function MoveY(P: Point2D, distance: number): Point2D;
    /**
     * Reflect point P about x-axis
     * ```
     * ReflectX([1,2]) // [1,-2]
     * ReflectX([1,-2]) // [1,2]
     * ```
     */
    export function ReflectX(P: Point2D): Point2D;
    /**
     * Reflect point P about y-axis
     * ```
     * ReflectY([1,2]) // [-1,2]
     * ReflectY([-1,2]) // [1,2]
     * ```
     */
    export function ReflectY(P: Point2D): Point2D;
    /**
     * angle of intersection between two slopes
     * ```
     * IntersectAngle(0,1) // 45
     * IntersectAngle(1,-1) // 90
     * ```
     */
    export function IntersectAngle(slope1: number, slope2: number): number;
    /**
     * angle AOB, non-reflex
     * ```
     * Angle([1,0],[0,0],[0,2]) // 90
     * Angle([2,2],[1,1],[1,3]) // 45
     * Angle([1,3],[1,1],[2,2]) // 45
     * ```
     */
    export function Angle(A: Point2D, O: Point2D, B: Point2D): number;
    /**
     * angle AOB, measured anticlockwise
     * ```
     * AnglePolar([1,0],[0,0],[0,2]) // 90
     * AnglePolar([2,2],[1,1],[1,3]) // 45
     * AnglePolar([1,3],[1,1],[2,2]) // 315
     * ```
     */
    export function AnglePolar(A: Point2D, O: Point2D, B: Point2D): number;
    /**
     * check if the polar angle AOB is reflex
     * ```
     * IsReflex([1,0],[0,0],[0,2]) // false
     * IsReflex([2,2],[1,1],[1,3]) // false
     * IsReflex([1,3],[1,1],[2,2]) // true
     * ```
     */
    export function IsReflex(A: Point2D, O: Point2D, B: Point2D): boolean;
    /**
     * points on a regular polygon
     * ```
     * RegularPolygon(4,[0,0],1,0) // [[1,0],[0,1],[-1,0],[0,-1]]
     * ```
     */
    export function RegularPolygon(n: number, center: Point2D, radius: number, startAngle: number): Point2D[];
    /**
     * arc length with given radius and angle
     * ```
     * ArcLength(2,90) // pi
     * ArcLength(2,180) // 2*pi
     * ```
     */
    export function ArcLength(radius: number, theta: number): number;
    /**
     * sector area with given radius and angle
     * ```
     * SectorArea(2,90) // pi
     * SectorArea(2,180) // 2*pi
     * ```
     */
    export function SectorArea(radius: number, theta: number): number;
    /**
     * check is convex polygon
     * ```
     * IsConvexPolygon([0,0],[1,0],[0,1]) // true
     * IsConvexPolygon([0,0],[3,0],[1,1],[0,3]) // false
     * ```
     */
    export function IsConvexPolygon(...points: Point2D[]): boolean;
    /**
     * Arrange Points in anti-clockwise direction around their mean
     * ```
     * ArrangePoints([0,0],[1,1],[0,1],[1,0]) // [[1, 0],[0, 0],[0, 1],[1, 1]]
     * ArrangePoints([0,0],[1,2],[2,1],[0,1],[1,0])// [[1, 0],[0, 0],[0, 1],[1, 2],[2, 1]]
     * ```
     */
    export function ArrangePoints(...points: Point2D[]): Point2D[];
    /**
     * a point with polar coordinates (1, `angle`).
     * ```
     * OnCircle(0) // [1,0]
     * OnCircle(90) // [0,1]
     * ```
     */
    export function OnCircle(angle: number): Point2D;
}
declare module "Math/Code/Latex" {
    /**
     * Print a stem-and-leaf diagram in latex.
     * @param data - sorted data
     * @param labels - a copy of data, but you can replace some number with string label.
     * ```
     * StemAndLeaf({
     *   data: [2,5,6,12,14,16,23,23,24,25,26,26,26,26,27,31],
     *   labels: [2,'x',6,12,14,16,23,23,24,25,26,'y',26,26,27,31],
     *   stem: "10 units",
     *   leaf: "{1} unit"
     * })
     * // a diagram with two numbers replaced by 'x' and 'y'
     * ```
     */
    export function StemAndLeaf({ data, labels, stem, leaf, }: {
        data: number[];
        labels?: (number | string)[];
        stem?: string;
        leaf?: string;
    }): string;
    /**
     * Print a table in latex.
     * @param content - the cell content
     * @param columns - a latex syntax for column border
     * @param rows - similar to `columns`
     * @param stretch - scale the height of the cells
     * ```
     * Table({
     *     content: [
     *         ['a', 2, 3],   // 'a' will be printed as '\text{a}'
     *         ['b', 5, 6],
     *         ['$c', 7, 8],  // 'c' will be printed as is
     *         ['$d', 12, 13]
     *     ],
     *     columns: '|c::c:c|',
     *     rows: '|r||r|rr|',
     * })
     * ```
     */
    export function Table({ content, columns, rows, stretch, }: {
        content: (string | number)[][];
        columns?: string;
        rows?: string;
        stretch?: number;
    }): string;
    /**
     * Print a frequency table in latex.
     * @param dataLabel - the label for the 1st row
     * @param freqLabel - the label for the 2nd row
     * ```
     * FreqTable({
     *   data: [1, 1, 4, 4, 3, 3, 3],
     *   dataLabel: '$x',
     *   freqLabel: 'count'
     * })
     * ```
     */
    export function FreqTable({ data, dataLabel, freqLabel, min, max, }: {
        data: number[];
        dataLabel: string;
        freqLabel: string;
        min?: number;
        max?: number;
    }): string;
    /**
     * Print a grouped frequency table in latex.
     * ```
     * GroupFreqTable({
     *   data: [1, 1, 4, 4, 3, 3, 3, 7, 8, 9],
     *   dataLabel: '$x',
     *   freqLabel: 'count'
     *   cls: [1, 5]
     * })
     * ```
     */
    export function GroupFreqTable({ data, dataLabel, freqLabel, cls, }: {
        data: number[];
        dataLabel: string;
        freqLabel: string;
        cls: [number, number];
    }): string;
    /**
     * Print a grouped frequency table in latex.
     * ```
     * GroupCumFreqTable({
     *   data: [1, 1, 4, 4, 3, 3, 3, 7, 8, 9],
     *   dataLabel: '$x',
     *   freqLabel: 'count'
     *   cls: [1, 5]
     * })
     * ```
     */
    export function GroupCumFreqTable({ data, dataLabel, freqLabel, cls, }: {
        data: number[];
        dataLabel: string;
        freqLabel: string;
        cls: [number, number];
    }): string;
    /**
     * Print a table in latex showing cartisian product of two items.
     * @param rows - array of row values
     * @param cols - array of column values
     * @param cell - a function mapping row and column values to cell content
     * ```
     * PairTable({
     *    rowTitle:'first',
     *    colTitle:'second',
     *    rows: [1,2,3,4,5,6],
     *    cols: [1,2,3,4,5,6],
     *    cell: (r,c) => r+c
     * })
     * // a table showing the sum of two dices
     * ```
     */
    export function PairTable<R, C>({ rowTitle, colTitle, rows, cols, cell, }: {
        rowTitle: string;
        colTitle: string;
        rows: R[];
        cols: C[];
        cell: (rowValue: R, colValue: C) => string | number | boolean;
    }): string;
    /**
     * Print the check vertice steps.
     * @param label - the field label
     * ```
     * CheckVertices({
     *    constraints: [
     *      [1,0,'>',0],
     *      [0,1,'>',0],
     *      [1,1,'<',2],
     * ],
     *    field: [1,2,3],
     *    label: "P"
     * })
     * ```
     */
    export function CheckVertices({ constraints, field, label, }: {
        constraints: Constraint[];
        field: Field;
        label: string;
    }): string;
    /**
     * A short division for prime factorization of numbers.
     * ```
     * ShortDivision({
     *    numbers: [12,16,18],
     *    mode: 'HCF',
     * })
     * ```
     */
    export function ShortDivision({ numbers, mode, }: {
        numbers: number[];
        mode?: 'HCF' | 'LCM';
    }): string;
    /**
     * A short division to find the binary of `n`.
     * ```
     * ShortDivisionBy2(9)
     * ```
     */
    export function ShortDivisionBy2(n: number): string;
}
declare module "Math/Code/LinearProgram" {
    /**
     * the value of field at given point
     * ```
     * FieldAt([0,0],[1,2,3]) // 3
     * FieldAt([1,2],[3,-4,5]) // 0
     * ```
     */
    export function FieldAt(point: Point2D, field: Field): number;
    /**
     * check if point is constrained by cons
     * ```
     * isConstrained([
     *    [1, 1, "<=", 5],
     *    [1, -1, "<", 4],
     *    [2, 1, ">=", -5]
     * ], [0, 0])
     * // check whether [0,0] satisfies all the constraints
     * ```
     */
    export function isConstrained(cons: Constraint[], point: Point2D): boolean;
    /**
     * check if point is constrained by cons, treating all cons as 'or equal to'
     * ```
     * isLooseConstrained([
     *    [1, 1, "<=", 5],
     *    [1, -1, "<", 4],
     *    [2, 1, ">=", -5]
     * ], [0, 0])
     * // check whether [0,0] loosely satisfies all the constraints
     * ```
     */
    export function isLooseConstrained(cons: Constraint[], point: Point2D): boolean;
    /**
     * the vertices of the feasible polygon
     * ```
     * FeasiblePolygon([
     *    [1, 0, '<', 10],
     *    [1, 0, '>', -5],
     *    [0, 1, '<', 10],
     *    [0, 1, '>', -5]
     * ])
     * // [[-5,-5],[10,-5],[10,10],[-5,10]]
     * ```
     */
    export function FeasiblePolygon(...cons: Constraint[]): Point2D[];
    /**
     * the vertices of the feasible polygon
     * ```
     * FeasiblePolygon([
     *    [1, 0, '<', 10],
     *    [1, 0, '>', -5],
     *    [0, 1, '<', 10],
     *    [0, 1, '>', -5]
     * ])
     * // [[-5,-5],[10,-5],[10,10],[-5,10]]
     * ```
     */
    export function FeasibleVertices(...cons: Constraint[]): Point2D[];
    /**
     * check if the feasible region is bounded
     * ```
     * FeasibleIsBounded([
     *    [1, 0, '<', 10],
     *    [1, 0, '>', -5],
     *    [0, 1, '<', 10],
     *    [0, 1, '>', -5]
     * ])
     * // true
     * FeasibleIsBounded([
     *    [1, 0, '<', 10],
     * ])
     * // false
     * ```
     */
    export function FeasibleIsBounded(...cons: Constraint[]): boolean;
    /**
     * the integral points inside the feasible polygon
     * ```
     * FeasibleIntegral([
     *    [1, 0, '<', 3],
     *    [1, 0, '>', 0],
     *    [0, 1, '<', 2],
     *    [0, 1, '>', 0]
     * ])
     * // [[1,1],[2,1]]
     * ```
     */
    export function FeasibleIntegral(...cons: Constraint[]): Point2D[];
    /**
     * the point with the max value of field
     * ```
     * MaximizePoint([[0,0],[10,10]],[1,2,3]) // [10,10]
     * ```
     */
    export function MaximizePoint(points: Point2D[], field: Field): Point2D;
    /**
     * the point with the min value of field
     * ```
     * MinimizePoint([[0,0],[10,10]],[1,2,3]) // [0,0]
     * ```
     */
    export function MinimizePoint(points: Point2D[], field: Field): Point2D;
    /**
     * the point with the min/max value of field
     * ```
     * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [10,10]
     * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [0,0]
     * ```
     */
    export function OptimizePoint(points: Point2D[], field: Field, max: boolean): Point2D;
    /**
     * the max value of field
     * ```
     * MaximizeField([[0,0],[10,10]],[1,2,3]) // 33
     * ```
     */
    export function MaximizeField(points: Point2D[], field: Field): number;
    /**
     * the min value of field
     * ```
     * MinimizeField([[0,0],[10,10]],[1,2,3]) // 3
     * ```
     */
    export function MinimizeField(points: Point2D[], field: Field): number;
    /**
     * the min/max value of field
     * ```
     * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 33
     * OptimizeField([[0,0],[10,10]],[1,2,3],false) // 3
     * ```
     */
    export function OptimizeField(points: Point2D[], field: Field, max: boolean): number;
    /**
     * the constraints from the given points
     * ```
     * ConstraintsFromPoints([0,0],[0,1],[1,0]) // [[0,1,'\\ge',-0],[1,0,'\\ge',-0],[1,1,'\\le',1]]
     * ConstraintsFromPoints([0,0],[3,-1],[2,2],[1,3],[-2,2])
     * // [[[1, 3, "\\ge", -0],[1, 1, "\\ge", -0],[1, -3, "\\ge", -8],[1, 1, "\\le", 4],[3, 1, "\\le", 8]]]
     * ConstraintsFromPoints([0,0],[1,2],[2,1],[0,1],[1,0]) // [[0, 1, "\\ge", -0],[1, 0, "\\ge", -0],[1, -1, "\\ge", -1],[1, 1, "\\le", 3],[1, -1, "\\le", 1]]
     * ```
     */
    export function ConstraintsFromPoints(...points: Point2D[]): Constraint[];
}
declare module "Math/Code/Numeracy" {
    /**
     * @deprecated
     * division with x/0 handling
     * ```
     * Divide(6,2) // 3
     * Divide(6,0) // throw
     * ```
     */
    export function Divide(dividend: number, divisor: number): number;
    /**
     * the absolute value. Equivalent to Math.abs(x).
     * ```
     * Abs(-2) // 2
     * ```
     */
    export function Abs(num: number): number;
    /**
     * the sign of the number as 1,0 or -1.
     * ```
     * Sign(3) // 1
     * Sign(-4.5) // -1
     * Sign(0) // 0
     * ```
     */
    export function Sign(num: number): -1 | 0 | 1;
    /**
     * @deprecated
     * the sign of the number as 1,0 or -1.
     * ```
     * SigFig(123.45) // 5
     * ```
     */
    export function SigFig(num: number): number;
    /**
     * the number rounded off to given sigfig.
     * ```
     * Round(1.23456,3) // 1.23
     * Round(1.23567,3) // 1.24
     * ```
     */
    export function Round(num: number, sigfig?: number): number;
    /**
     * the number rounded up to given sigfig.
     * ```
     * RoundUp(1.23456,3) // 1.23
     * RoundUp(1.23567,1) // 2
     * ```
     */
    export function RoundUp(num: number, sigfig?: number): number;
    /**
     * the number rounded down to given sigfig.
     * ```
     * RoundDown(1.23456,5) // 1.2345
     * RoundDown(1.6789,1) // 1
     * ```
     */
    export function RoundDown(num: number, sigfig?: number): number;
    /**
     * the number rounded off to given decimal place.
     * ```
     * Fix(12345.678) // round to integer by default, return 12346
     * Fix(12345.678,0) // round to integer, return 12346
     * Fix(12345.678,2) // round to 2 dp, return 12345.68
     * Fix(12345.678,-2) // round to hundred, return 12300
     * ```
     */
    export function Fix(num: number, dp?: number): number;
    /**
     * the number rounded up to given decimal place.
     * ```
     * FixUp(12.34) // round to integer by default, return 13
     * FixUp(12.34,0) // round to integer, return 13
     * FixUp(12.34,1) // round to 1 dp, return 12.4
     * FixUp(12.34,-1) // round to ten, return 20
     * ```
     */
    export function FixUp(num: number, dp?: number): number;
    /**
     * the number rounded down to given decimal place.
     * ```
     * FixDown(17.89) // round to integer by default, return 17
     * FixDown(17.89,0) // round to integer, return 17
     * FixDown(17.89,1) // round to 1 dp, return 17.8
     * FixDown(17.89,-1) // round to ten, return 10
     * ```
     */
    export function FixDown(num: number, dp?: number): number;
    /**
     * the ceiling integer of the number.
     * ```
     * Ceil(1.1) // 2
     * Ceil(-1.1) // -1
     * Ceil(2) // 2
     * Ceil(3,5,1) // Ceil 3 to [1,6,11,...], return 6
     * ```
     */
    export function Ceil(num: number, interval?: number, offset?: number): number;
    /**
     * the floor integer of the number.
     * ```
     * Floor(1.9) // 1
     * Floor(-1.9) // -2
     * Floor(2)) // 2
     * Floor(3,5,1) // Floor 3 to [1,6,11,...], return 1
     * ```
     */
    export function Floor(num: number, interval?: number, offset?: number): number;
    /**
     * reduce input array to integral ratio.
     * ```
     * Ratio(2,4,6) // [1,2,3]
     * Ratio(0,4,6) // [0,2,3]
     * Ratio(0,4) // [0,1]
     * Ratio(1/3,1/2,1/4) // [4,6,3]
     * Ratio(Math.sqrt(2),1/2,1/4) // throw
     * ```
     */
    export function Ratio(...nums: number[]): number[];
    /**
     * scale `nums` so that their sum becomes `total`.
     * ```
     * ScaleTo([1,2,3], 60) // [10,20,30]
     * ```
     */
    export function ScaleTo(nums: number[], total: number): number[];
    /**
     * The HCF of nums.
     * ```
     * HCF(6,8) // 2
     * HCF(6,8,9) // 1
     * HCF(1,3) // 1
     * HCF(0.5,3) // throw
     * HCF(0,3) // throw
     * ```
     */
    export function HCF(...nums: number[]): number;
    /**
     * The LCM of nums.
     * ```
     * LCM(2,3) // 6
     * LCM(2,3,5) // 30
     * LCM(0.5,3) // throw
     * LCM(0,3) // throw
     * ```
     */
    export function LCM(...nums: number[]): number;
    /**
     * The prime factors of `num`.
     * ```
     * PrimeFactors(12) // [2,2,3]
     * ```
     */
    export function PrimeFactors(num: number): number[];
    /**
     * convert num to fraction
     * ```
     * ToFrac(0.5) // [1,2]
     * ToFrac(-456/123) // [-152,41]
     * ```
     */
    export function ToFrac(num: number): Fraction;
    /**
     * all integer partition of `n`.
     * ```
     * Partition(4)
     * // [ [4], [3,1], [2,2], [2,1,1], [1,1,1,1] ]
     * Partition(4, 2, false)
     * // [ [3,1], [2,2] ]
     * Partition(4, 2, true)
     * // [ [4,0], [3,1], [2,2] ]
     * ```
     */
    export function Partition(n: number, length?: number, allowZero?: boolean): number[][];
}
declare module "Math/Code/PhyConst" {
    export const PhyConst: {
        R: number;
        N_A: number;
        g: number;
        G: number;
        c: number;
        e: number;
        m_e: number;
        epsilon_0: number;
        mu_0: number;
        m_u: number;
        au: number;
        light_year: number;
        parsec: number;
        sigma: number;
        h: number;
    };
}
declare module "Math/Code/PhyEq" {
    type eq = [func: zeroFunction, latex: string];
    class PhyEqCls {
        Heat: {
            /**
             * E = Pt
             */
            EPt(E?: string, P?: string, t?: string, $?: string): eq;
        };
        Motion: {
            /**
             * v = u + at
             */
            vuat(v?: string, u?: string, a?: string, t?: string, $?: string): eq;
            /**
             * v^2 = u^2 + 2as
             */
            vu2as(v?: string, u?: string, a?: string, s?: string, $?: string): eq;
            /**
             * s = ut + 0.5at^2
             */
            sutat2(s?: string, u?: string, t?: string, a?: string, $?: string): eq;
            /**
             * s = 0.5(u+v)t
             */
            suvt(s?: string, u?: string, v?: string, t?: string, $?: string): eq;
            /**
             * s  = 0.5at^2
             */
            sat2(s?: string, a?: string, t?: string, $?: string): eq;
            /**
             * v = at
             */
            vat(v?: string, a?: string, t?: string, $?: string): eq;
            /**
             * v^2 = 2as
             */
            v2as(v?: string, a?: string, s?: string, $?: string): eq;
        };
        Force: {
            /**
             * F = ma
             */
            Fma(F?: string, m?: string, a?: string, $?: string): eq;
        };
        CircularMotion: {
            /**
             * s = vt
             */
            svt(s?: string, v?: string, t?: string, $?: string): eq;
            /**
             * θ = ωt
             */
            θωt(θ?: string, ω?: string, t?: string, $?: string): eq;
            /**
             * ω = 2π/T
             */
            ωT(ω?: string, T?: string, $?: string): eq;
            /**
             * s = rθ
             */
            srθ(s?: string, r?: string, θ?: string, $?: string): eq;
            /**
             * v = rω
             */
            vrω(v?: string, r?: string, ω?: string, $?: string): eq;
            /**
             * a = vω
             */
            avω(a?: string, v?: string, ω?: string, $?: string): eq;
            /**
             * a = v^2/r
             */
            avr(a?: string, v?: string, r?: string, $?: string): eq;
            /**
             * a = rω^2
             */
            arω(a?: string, r?: string, ω?: string, $?: string): eq;
            /**
             * F = mvω
             */
            Fmvω(F?: string, m?: string, v?: string, ω?: string, $?: string): eq;
            /**
             * F = mv^2/r
             */
            Fmvr(F?: string, m?: string, v?: string, r?: string, $?: string): eq;
            /**
             * F = mrω^2
             */
            Fmrω(F?: string, m?: string, r?: string, ω?: string, $?: string): eq;
        };
        Gravitation: {
            /**
             * F = GMm/r^2
             */
            FGMmr2(F?: string, M?: string, m?: string, r?: string, $?: string): eq;
            /**
             * F = GMm/(R+h)^2
             */
            FGMmRh2(F?: string, M?: string, m?: string, R?: string, h?: string, $?: string): eq;
            /**
             * g = GM/r^2
             */
            gGMr2(g?: string, M?: string, r?: string, $?: string): eq;
            /**
             * g = GM/(R+h)^2
             */
            gGMRh2(g?: string, M?: string, R?: string, h?: string, $?: string): eq;
            /**
             * F = mg
             */
            Fmg(F?: string, m?: string, g?: string, $?: string): eq;
            /**
             * GMm/r2 = mv2/r
             */
            GMmr2v2r(M?: string, r?: string, v?: string, $?: string): eq;
            /**
             * GMm/r2 = mrω2
             */
            GMmr2rω2(M?: string, r?: string, ω?: string, $?: string): eq;
        };
        Radioactive: {
            /**
             * N = n(1/2)^(t/T)
             */
            NntT(N?: string, n?: string, t?: string, T?: string, $?: string): eq;
            /**
             * A = a(1/2)^(t/T)
             */
            AatT(A?: string, a?: string, t?: string, T?: string, $?: string): eq;
            /**
             * A = kN
             */
            AkN(A?: string, k?: string, N?: string, $?: string): eq;
            /**
             * kT = ln2
             */
            kTln2(k?: string, T?: string, $?: string): eq;
            /**
             * E = mc2
             */
            Emc2(E?: string, m?: string, $?: string): eq;
        };
    }
    export const PhyEq: PhyEqCls;
}
declare module "Math/Code/Random" {
    /**
     * a random integer in [min, max] inclusive.
     * ```
     * RndN(2,5) // may return 2, 3, 4 or 5
     * ```
     */
    export function RndN(min: number, max: number): number;
    /**
     * an array of n unique random integer in [min, max] inclusive.
     * ```
     * RndNs(2,8,3) // may return [5,3,7]
     * RndNs(2,8,3,'asc') // ascending
     * RndNs(2,8,3,'desc') // descending
     * ```
     */
    export function RndNs(min: number, max: number, n?: number, sort?: 'asc' | 'desc' | 'none'): number[];
    /**
     * a random real number in [min, max] inclusive
     * ```
     * RndR(1,2) // may return 1.242574363
     * ```
     */
    export function RndR(min: number, max: number): number;
    /**
     * an array of n unique random real number in [min, max] inclusive.
     * ```
     * RndRs(2,8,3) // may return [5.5315,3.653456,7.542345]
     * ```
     */
    export function RndRs(min: number, max: number, n?: number): number[];
    /**
     * a random fraction (non-integer) with largest numerator / denominator, within range inclusive.
     * ```
     * RndQ(9,[2,9]) // may return 7/2
     * RndQ(-9,[-9,9]) // may return 7/2 or -7/2, i.e. can be +ve or -ve
     * ```
     */
    export function RndQ(largest?: number, range?: interval): number;
    /**
     * an array of n unique random fractions (non-integer) .
     * ```
     * RndQs(9,[2,9],3) // may return [5/2,7/3,9/2]
     * ```
     */
    export function RndQs(largest?: number, range?: interval, n?: number): number[];
    /**
     * 1 or -1
     * ```
     * RndU() // may return 1 or -1
     * ```
     */
    export function RndU(): 1 | -1;
    /**
     * true or false.
     * ```
     * RndT() // may return true or false
     * RndT(0.6) // 60% true
     * ```
     */
    export function RndT(trueProb?: number): boolean;
    /**
     * a random integer in [min, max] or [-max, -min] inclusive.
     * ```
     * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
     * ```
     */
    export function RndZ(min: number, max: number): number;
    /**
     * @param n - default to 10
     * an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive.
     * ```
     * RndZs(2,8,3) // may return [5,-3,7]
     * RndZs(2,8,3,'asc') // ascending
     * RndZs(2,8,3,'desc') // descending
     * ```
     */
    export function RndZs(min: number, max: number, n?: number, sort?: 'asc' | 'desc' | 'none'): number[];
    /**
     * a random prime number less than or equal to max.
     * ```
     * RndP(10) // may return 2, 3, 5 or 7
     * ```
     */
    export function RndP(max: number): number;
    /**
     * a random odd integer in [min, max] inclusive
     * ```
     * RndOdd(3,8) // return 3, 5 or 7
     * ```
     */
    export function RndOdd(min: number, max: number): number;
    /**
     * a random even integer in [min, max] inclusive
     * ```
     * RndEven(3,8) // return 4, 6 or 8
     * ```
     */
    export function RndEven(min: number, max: number): number;
    /**
     * a random composite number built from `n` factors in `factors`.
     * ```
     * RndComposite([2,3,5],3) // return 2*2*2, 2*3*5, 2*3*3, ...
     * ```
     */
    export function RndComposite(factors: number[], n: number): number;
    /**
     * an array of random polynomial coefficients
     * ```
     * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)]
     * ```
     */
    export function RndPoly(...coeff: number[]): number[];
    /**
     * an array of a Pyth Triple
     * ```
     * RndPyth(10) // may return [3,4,5]
     * ```
     */
    export function RndPyth(max?: number): [number, number, number];
    /**
     * a point within given range, x and y are distinct and non-zero
     * ```
     * RndPoint([1,4],[10,14]) // may return [2,12]
     * RndPoint(2,4) // equivalent to RndPoint([-2,2],[-4,4])
     * RndPoint(2) // equivalent to RndPoint([-2,2],[-2,2])
     * ```
     */
    export function RndPoint(xRange: number | interval, yRange?: number | interval): Point2D;
    /**
     * n points within given range, no horizontal / vertical / collinear
     * ```
     * RndPoints([1,4],[10,14],3) // may return [[2,12],[3,11],[1,13]]
     * ```
     */
    export function RndPoints(xRange: number | interval, yRange?: number | interval, n?: number): Point2D[];
    /**
     * n angles in [0,360] at least cyclic separated by `separation`
     * ```
     * RndAngles(3,50) // may return [30,90,200]
     * ```
     */
    export function RndAngles(n: number, separation: number): number[];
    /**
     * `n` points on a unit circle at least cyclic separated by separation
     * ```
     * RndOnCircle(3,50) // may return [[1,0],[0,1],[-1,0]]]
     * ```
     */
    export function RndOnCircle(n: number, separation: number): Point2D[];
    /**
     * n vertices of a convex polygon generated by rounding a cyclic polygon
     * ```
     * RndConvexPolygon(3,[0,0],10,50) // may return [[10,0],[-6,8],[0,-10]]
     * ```
     */
    export function RndConvexPolygon(n: number, center: Point2D, radius: number, separation: number): Point2D[];
    /**
     * n integers from [min, max], must be uni-moded
     * ```
     * RndData(10,15,5) // may return [11,11,12,13,15]
     * ```
     */
    export function RndData(min: number, max: number, n: number): number[];
    /**
     * 3 points forming a triangle, with min angle and length
     * ```
     * RndTriangle([0,5],[0,5],{minAngle:30,minLength:2})
     * ```
     */
    export function RndTriangle(xRange: interval, yRange: interval, { minAngle, maxAngle, minLength, obtuse }?: {
        minAngle?: number | undefined;
        maxAngle?: number | undefined;
        minLength?: number | undefined;
        obtuse?: boolean | undefined;
    }): [Point2D, Point2D, Point2D];
    /**
     * an array like ['sin',60] representing sin 60, which is numerically equivalent to the input
     * ```
     * RndTrigValue('sin',60) // RndPick(['sin',60],['sin',120],['cos',30],['cos',330])
     * ```
     */
    export function RndTrigValue(func: TrigFunc, angle: number): TrigValue;
    /**
     * an array like ['sin',180,-1,'x'] representing sin(180-x), which is numerically equivalent to the input
     * ```
     * RndTrigEqv('sin','x') // RndPick(['sin',180,-1,'x'],['cos',90,-1,'x'],['cos',270,1,'x'])
     * ```
     */
    export function RndTrigEqv(result: 'sin' | '-sin' | 'cos' | '-cos' | 'tan' | '-tan' | '1/tan' | '-1/tan', label: string): TrigExp;
    /**
     * a random point (in rect coord) at special polar angle and radius, whose rect coords must be in the form of a*sqrt(b).
     * ```
     * RndPointPolar()
     * // maybe [sqrt(3),3] representing polar [2*sqrt(3),60]
     * ```
     */
    export function RndPointPolar(): Point2D;
    /**
     * a random ratio group in [min, max] inclusive.
     * ```
     * RndRatio(2,9,3) // may return [3,7,5]
     * ```
     */
    export function RndRatio(min: number, max: number, n?: number): number[];
    /**
     * a random partition of integer `n`.
     * ```
     * RndPartition(4) // may return [1,2,1]
     * RndPartition(4, 2, false) // may return [3,1] or [2,2]
     * RndPartition(4, 2, true) // may return [4,0] or [3,1] or [2,2]
     * ```
     */
    export function RndPartition(n: number, length?: number, allowZero?: boolean): number[];
}
declare module "Math/Code/RandomShake" {
    /**
     * @deprecated
     * an array of n nearby values around anchor, within range inclusive, auto detecting the input type.
     * ```
     * RndShake(10)
     * // equivalent to RndShakeN(10)
     * RndShake(10.5)
     * // equivalent to RndShakeR(10.5)
     * ```
     */
    export function RndShake(anchor: any): (typeof anchor)[];
    /**
     * 3 nearby same-signed integers, range = Max(5, anchor * 10%)
     * ```
     * RndShakeN(5) // return 3 unique integers from 1-10
     * ```
     */
    export function RndShakeN(anchor: number): number[];
    /**
     * 3 nearby same-signed real number with same precision, range = anchor * 50%
     * ```
     * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
     * ```
     */
    export function RndShakeR(anchor: number): number[];
    /**
     * 3 nearby same-sign rational by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
     * ```
     * RndShakeQ(5/6)
     * // return 3 unique fractions around [5,6]
     * RndShakeQ(6/-5)
     * // return 3 unique fractions around [6,-5]
     * ```
     */
    export function RndShakeQ(anchor: number): number[];
    /**
     * 3 numbers by multiplying / dividing the `anchor` by the `base` a few times.
     * ```
     * RndShakeG(24,2) // any 3 of [6,12,48,96]
     * ```
     */
    export function RndShakeG(anchor: number, base: number): number[];
    /**
     * an array of 3 ineq signs, balanced in number.
     * ```
     * RndShakeIneq('\\ge')
     * // may return ['\\ge','\\le','\\le']
     * ```
     */
    export function RndShakeIneq(anchor: Ineq): Ineq[];
    /**
     * an array of 3 point, both x and y are unique
     * ```
     * RndShakePoint([3,4])
     * // may return [[2,5],[1,6],[4,2]]
     * ```
     */
    export function RndShakePoint(anchor: Point2D): Point2D[];
    /**
     * an array of 3 combo
     * ```
     * RndShakeCombo([true,true,true])
     * // may return [[true,false,true],[false,true,false],[false,true,true]]
     * ```
     */
    export function RndShakeCombo(anchor: [boolean, boolean, boolean]): [boolean, boolean, boolean][];
    /**
     * an array of 3 trig
     * ```
     * RndShakeTrig('sin')
     * // may return ['cos','sin','cos']
     * ```
     */
    export function RndShakeTrig(anchor: TrigFunc): TrigFunc[];
    /**
     * an array of 3 TrigValue
     * ```
     * RndShakeTrigValue(['sin','x'])
     * // may return [['cos','x'],['sin','x'],['cos','x']]
     * ```
     */
    export function RndShakeTrigValue(anchor: TrigValue): TrigValue[];
    /**
     * an array of 3 ratios
     * ```
     * RndShakeRatio([4,5,6])
     * // may return [[3,6,5],[7,5,3],[8,4,5]]
     * ```
     */
    export function RndShakeRatio(anchor: number[]): number[][];
    /**
     * an array of 3 number in given number system
     * ```
     * RndShakeBase('AB0CD_{16}')
     * // may return ['BB0CE_{16}','AB0DD_{16}','BA0BE_{16}']
     * ```
     */
    export function RndShakeBase(anchor: string): string[];
    /**
     * an array of 3 points, all are special in polar coordinates
     * ```
     * RndShakePointPolar([3,60])
     * // may return [[3, 120], [3*sqrt(2), 120], [3*sqrt(2), 60]]
     * ```
     */
    export function RndShakePointPolar(anchor: Point2D): Point2D[];
    /**
     * an array of 3 constraint, with only the sign shaken
     * ```
     * RndShakeConstraint([1,2,'>',3])
     * // may return [[1,2,'>',3], [1,2,'<',3], [1,2,'<',3]]
     * ```
     */
    export function RndShakeConstraint(anchor: Constraint): Constraint[];
    /**
     * an array of 3 sets of constraints, with only the sign shaken
     * ```
     * RndShakeConstraints([
     *   [1,2,'>',3], [4,5,'>',6]
     * ])
     * // may return [
     * // [[1,2,'>',3],[4,5,'>',6]],
     * // [[1,2,'<',3],[4,5,'<',6]],
     * // [[1,2,'<',3],[4,5,'>',6]]
     * // ]
     * ```
     */
    export function RndShakeConstraints(anchor: Constraint[]): Constraint[][];
    export function RndShakeQuantity(anchor: quantity): quantity[];
    export function RndShakeCompoundInequality(anchor: CompoundInequality): CompoundInequality[];
}
declare module "Math/Code/RandomUtil" {
    /**
     * a random item from the given items
     * ```
     * RndPick(2,4,6) // may return 2, 4 or 6
     * ```
     */
    export function RndPick<T>(...items: T[]): T;
    /**
     * a shuffled array of the given items
     * ```
     * RndShuffle(2,4,6) // may return [4,2,6]
     * ```
     */
    export function RndShuffle<T>(...items: T[]): T[];
    /**
     * n random items from given items without replacement, but NOT necessarily unique if there are duplicated object in items.
     * ```
     * RndPickN([1,2,3,4,5],3) // may return [2,5,3]
     * ```
     */
    export function RndPickN<T>(items: T[], n: number): T[];
    /**
     * n random unique items from given items, deep compare.
     * ```
     * RndPickUnique([2,4,6],2) // may return [4,2]
     * RndPickUnique([1,2,2,2,2,2,2,2],2) // must return [1,2] or [2,1]
     * ```
     */
    export function RndPickUnique<T>(items: T[], n: number): T[];
    /**
     * a random male name
     * ```
     * RndHe() // may return 'Peter', 'David', etc
     * ```
     */
    export function RndHe(): string;
    /**
     * a random female name
     * ```
     * RndShe() // may return 'Mary', 'Alice', etc
     * ```
     */
    export function RndShe(): string;
    /**
     * a random 3-letters array
     * ```
     * RndLetters() // may return ['a','b','c'] or ['x','y','z'] or etc
     * ```
     */
    export function RndLetters(): string[];
    /**
     * a random 3-letters array
     * ```
     * RndCapitals() // may return ['A','A','A'] or ['X','Y','Z'] or etc
     * ```
     */
    export function RndCapitals(): string[];
}
declare module "Math/Code/Relation" {
    /**
     * Check if the numbers are all distinct.
     * ```
     * AreDistinct(1,2,3) // true
     * AreDistinct(1,2,2) // false
     * ```
     */
    export function AreDistinct(...nums: number[]): boolean;
    /**
     * Check if the absolute values of the numbers are all distinct.
     * ```
     * AreAbsDistinct(1,2,3) // true
     * AreAbsDistinct(1,2,2) // false
     * AreAbsDistinct(1,2,-2) // false
     * ```
     */
    export function AreAbsDistinct(...nums: number[]): boolean;
    /**
     * Check if the numbers all have the same sign.
     * ```
     * AreSameSign(1,2,3) // true
     * AreSameSign(1,2,-3) // false
     * AreSameSign(1,2,0) // false
     * ```
     */
    export function AreSameSign(...nums: number[]): boolean;
    /**
     * Check if the numbers all pairwise coprime.
     * ```
     * AreCoprime(2,3) // true
     * AreCoprime(2,6) // false
     * AreCoprime(1,2) // true
     * AreCoprime(2,3,6) // true
     * AreCoprime(1.5,3) // true
     * AreCoprime(0,3) // true
     * ```
     */
    export function AreCoprime(...nums: number[]): boolean;
    /**
     * Check if the points are pairwise distant apart.
     * ```
     * AreDistantPoint(2)([0,0],[3,0]) // true
     * AreDistantPoint(2)([0,0],[1,0]) // false
     * ```
     */
    export function AreDistantPoint(distance: number): (...points: Point2D[]) => boolean;
    /**
     * Check if slopes are at least oblique at minAngle
     * ```
     * AreOblique(40)(0,1) // true
     * AreOblique(40)(0,0.5) // false
     * ```
     */
    export function AreOblique(minAngle: number): (...slopes: number[]) => boolean;
    /**
     * Check if the items are all distinct, deep compare.
     * ```
     * AreDifferent([1,2],[3,4]) // true
     * AreDifferent([1,2],[1,2]) // false
     * ```
     */
    export function AreDifferent(...items: any[]): boolean;
}
declare module "Math/Code/Sequence" {
    /**
     * array of all integers between (inclusive) the min and max of `nums`.
     * ```
     * Rng(2,6) // [2,3,4,5,6]
     * Rng(6,2) // [2,3,4,5,6]
     * Rng(-2,1) // [-2,-1,0,1]
     * Rng(1,1,4,4,3,3,3) \\ [1,2,3,4]
     * ```
     */
    export function Rng(...nums: number[]): number[];
    /**
     * Tn in an arithmetic sequence: a+(n-1)d
     * ```
     * ASterm(2,3,10) // 29
     * ASterm(5,-2,6) // -5
     * ```
     */
    export function ASterm(a: number, d: number, n: number): number;
    /**
     * Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
     * ```
     * ASsum(2,3,10) // 155
     * ASsum(5,-2,6) // 0
     * ```
     */
    export function ASsum(a: number, d: number, n: number): number;
    /**
     * an array of the first n terms in an arithmetic sequence.
     * ```
     * ASequence(2,3,5) // [2,5,8,11,14]
     * ASequence(5,-2,3) // [5,3,1]
     * ```
     */
    export function ASequence(a: number, d: number, n?: number): number[];
    /**
     * Tn in a geometric sequence: ar**(n-1)
     * ```
     * GSterm(2,3,4) // 54
     * GSterm(5,-2,6) // -160
     * ```
     */
    export function GSterm(a: number, r: number, n: number): number;
    /**
     * Sn in a geometric sequence: a*(r*n-1)/(r-1)
     * ```
     * GSsum(2,3,4) // 80
     * GSsum(5,-2,3) // 15
     * GSsum(3,0.5) // 6 , sum to inf if omit n
     * ```
     */
    export function GSsum(a: number, r: number, n?: number): number;
    /**
     * an array of the first n terms in a geometric sequence.
     * ```
     * GSequence(2,3,5) // return [2,6,18,54,162]
     * GSequence(5,-2,3) // return [5,-10,20]
     * ```
     */
    export function GSequence(a: number, r: number, n?: number): number[];
    /**
     * the nth term in a quadratic sequence, 1st term = a, P_i+1=P_i + pi+q
     * ```
     * QuadraticSequence(1,2,3,4) //
     * ```
     */
    export function QuadraticSequence(a: number, p: number, q: number, n: number): number;
    /**
     * the nth term in a lucas sequence, a_i = p*a_{i-1} + q*a_{i-2}
     * ```
     * LucasSequence(1,2,3,4,5) //
     * ```
     */
    export function LucasSequence(first: number, second: number, p: number, q: number, n: number): number;
}
declare module "Math/Code/Shake" {
    /**
     * Same-signed integer
     * ```
     * ShakeN(5) // integers from 2-8
     * ```
     */
    export function ShakeN(anchor: number): number;
    /**
     * Same-signed real number with same precision
     * ```
     * ShakeR(3.5) // from [1.8,5.2]
     * ```
     */
    export function ShakeR(anchor: number): number;
    /**
     * Same-sign rational by shaking the numerator and denominator (simplest), preserve IsProbability.
     * ```
     * ShakeQ(5/6)  // return fraction around [5,6]
     * ShakeQ(6/-5) // return fraction around [6,-5]
     * ```
     */
    export function ShakeQ(anchor: number): number;
    /**
     * Number by multiplying / dividing `anchor` by the `base` a few times.
     * ```
     * ShakeG(24,2) // any of [6,12,48,96]
     * ```
     */
    export function ShakeG(anchor: number, base: number): number;
    /**
     * Ineq signs
     * ```
     * ShakeIneq('\\ge')  // may return '\\ge' or '\\le'
     * ```
     */
    export function ShakeIneq(anchor: Ineq): Ineq;
    /**
     * Point
     * ```
     * ShakePoint([3,4])   // may return [[2,5],[1,6],[4,2]]
     * ```
     */
    export function ShakePoint(anchor: Point2D): Point2D;
    /**
     * TrigValue
     * ```
     * ShakeTrigValue(['sin','x'])
     * // may return [['cos','x'],['sin','x'],['cos','x']]
     * ```
     */
    export function ShakeTrigValue(anchor: TrigValue): TrigValue;
    /**
     * Ratios
     * ```
     * ShakeRatio([4,5,6])
     * // may return [[3,6,5],[7,5,3],[8,4,5]]
     * ```
     */
    export function ShakeRatio(anchor: number[]): number[];
    /**
     * Number in given number system
     * ```
     * ShakeBase('AB0CD_{16}')
     * // may return ['BB0CE_{16}','AB0DD_{16}','BA0BE_{16}']
     * ```
     */
    export function ShakeBase(anchor: string): string;
    /**
     * Points, all are special in polar coordinates
     * ```
     * ShakePointPolar([3,60])
     * // may return [[3, 120], [3*sqrt(2), 120], [3*sqrt(2), 60]]
     * ```
     */
    export function ShakePointPolar(anchor: Point2D): Point2D;
    /**
     * Constraint, with only the sign shaken.
     * ```
     * ShakeConstraint([1,2,'>',3])
     * // may return [1,2,'>',3] or [1,2,'<',3]
     * ```
     */
    export function ShakeConstraint(anchor: Constraint): Constraint;
    /**
     * Sets of constraints, with only the sign shaken.
     * ```
     * ShakeConstraints([
     *   [1,2,'>',3], [4,5,'>',6]
     * ])
     * // may return
     * // [[1,2,'>',3],[4,5,'>',6]] or
     * // [[1,2,'<',3],[4,5,'<',6]] or
     * // [[1,2,'<',3],[4,5,'>',6]]
     * ```
     */
    export function ShakeConstraints(anchor: Constraint[]): Constraint[];
    export function ShakeQuantity(anchor: quantity): quantity;
    export function ShakeCompoundInequality(anchor: CompoundInequality): CompoundInequality;
}
declare module "Math/Code/Stat" {
    /**
     * the minimum value. Equivalent to Math.min().
     * ```
     * Min(2,3,4) // 2
     * ```
     */
    export function Min(...nums: number[]): number;
    /**
     * the maximum value. Equivalent to Math.max().
     * ```
     * Max(2,3,4) // 4
     * ```
     */
    export function Max(...nums: number[]): number;
    /**
     * the sorted array of numbers.
     * ```
     * Sort(2,3,1) // [1,2,3]
     * ```
     */
    export function Sort(...nums: number[]): number[];
    /**
     * the sorted array of items by giving each item a value.
     * ```
     * SortBy([2,3,1],x=>x) // [1,2,3]
     * SortBy(["aa", "aaa", "a"], x => x.length) // ["a", "aa", "aaa"]
     * ```
     */
    export function SortBy<T>(items: T[], valueFunc: (_: T) => number): T[];
    /**
     * sum of nums
     * ```
     * Sum(1,2,3) // 6
     * Sum(-1,2,3,4,5) // 13
     * Sum() // 0
     * ```
     */
    export function Sum(...nums: number[]): number;
    /**
     * product of nums
     * ```
     * Product(2,3) // 6
     * Product(-1,2,3,4,5) // -120
     * Product() // 1
     * ```
     */
    export function Product(...nums: number[]): number;
    /**
     * mean of nums
     * ```
     * Mean(1,2,3) // 2
     * Mean(-1,2,3,4,5) // 2.6
     * ```
     */
    export function Mean(...nums: number[]): number;
    /**
     * median of nums
     * ```
     * Median(1,2,3,4,50) // 3
     * Median(1,2,3,4,5,7) // 3.5
     * ```
     */
    export function Median(...nums: number[]): number;
    /**
     * lower quartile of nums
     * ```
     * LowerQ(1,2,3,4,5) // 1.5
     * LowerQ(1,2,3,4,5,7) // 2
     * ```
     */
    export function LowerQ(...nums: number[]): number;
    /**
     * lower quartile of nums
     * ```
     * UpperQ(1,2,3,4,5) // 4.5
     * UpperQ(1,2,3,4,5,7) // 5
     * ```
     */
    export function UpperQ(...nums: number[]): number;
    /**
     * range of `nums`
     * ```
     * StatRange(1,2,3,4,5) // 4
     * StatRange(1,2,3,4,5,7) // 6
     * ```
     */
    export function StatRange(...nums: number[]): number;
    /**
     * inter-quartile range of nums
     * ```
     * IQR(1,2,3,4,5,6) // 3
     * ```
     */
    export function IQR(...nums: number[]): number;
    /**
     * count frequency of item in array
     * ```
     * Freq([2,3,4,1,5,1,1,4,5],1) // 3
     * ```
     */
    export function Freq<T>(array: T[], item: T): number;
    /**
     * mode of nums
     * ```
     * Mode(1,2,3,2,2,3,4) \\ [2]
     * Mode(1,1,2,2,3) \\ [1,2]
     * ```
     */
    export function Mode(...nums: number[]): number[];
    /**
     * the only mode of nums, if there are multiple modes, then throw error
     * ```
     * UniMode(1,2,3,2,2,3,4) \\ 2
     * UniMode(1,1,2,2,3) \\ throw error
     * ```
     */
    export function UniMode(...nums: number[]): number;
    /**
     * SD of nums
     * ```
     * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
     * StdDev(1,1,2,2,3) \\ 0.748331477
     * ```
     */
    export function StdDev(...nums: number[]): number;
    /**
     * z-score of `num` in a data set with `mean` and `SD`
     * ```
     * ZScore(80,60,10) \\ 2
     * ```
     */
    export function ZScore(num: number, mean: number, SD: number): number;
    /**
     * the location of median
     * ```
     * MedianAt(12) \\ 6.5
     * MedianAt(13) \\ 7
     * ```
     */
    export function MedianAt(total: number): number;
    /**
     * the location of LQ
     * ```
     * LowerQAt(12) \\ 3.5
     * LowerQAt(13) \\ 3.5
     * ```
     */
    export function LowerQAt(total: number): number;
    /**
     * the location of UQ
     * ```
     * UpperQAt(12) \\ 9.5
     * UpperQAt(13) \\ 10.5
     * ```
     */
    export function UpperQAt(total: number): number;
    /**
     * array of the corresponding frequency of `nums` in a data set. If `nums` is omitted, default to the whole range of `data`.
     * ```
     * Freqs([1,1,4,4,3,3,3],[1,2,3,4]) \\ [2,0,3,2]
     * ```
     */
    export function Freqs(data: number[], nums?: number[]): number[];
    /**
     * array of summary of the data [Minimum,LowerQ,Median,UpperQ,Maximum]
     * ```
     * Summary(1,1,2,3,3,3,3,4,5,5) \\ [1,2,3,4,5]
     * Summary(1,2,3,4,5,6,7,8,9,10) \\ [1,3,5.5,8,10]
     * ```
     */
    export function Summary(...data: number[]): number[];
    /**
     * group `data` into intervals
     * ```
     * Bin([2,2,2,7,7,7,7],[1,5]) \\ group into class intervals [1,5] and [6,10]
     * ```
     */
    export function Bin(data: number[], cls: [number, number]): {
        limit: [number, number];
        bound: [number, number];
        mark: number;
        width: number;
        freq: number;
        cumFreq: number;
    }[];
}
declare module "Math/Code/Text" {
    /**
     * a string of joined elements. [1,2,3] --> '1, 2 and 3'
     * ```
     * GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
     * GrammarJoin('a','b','c') // 'a, b and c'
     * ```
     */
    export function GrammarJoin(...items: unknown[]): string;
    /**
     * @deprecated use symbol printing instead!!!
     * a pair of latex inequalities sign array like ['\\ge', '\\le'].
     * ```typescript
     * IneqSign(true,true) // ['\\ge', '\\le']
     * IneqSign(true,false) // ['\\gt', '\\lt']
     * IneqSign(false,true) // ['\\le', '\\ge']
     * IneqSign(false,false) // ['\\lt', '\\gt']
     * ```
     */
    export function IneqSign(greater: boolean, equal?: boolean): [Ineq, Ineq];
    /**
     * @deprecated
     * @param upSign - put -ve sign on numerator instead of the front.
     * latex of dfrac p/q like \dfrac{1}{2}.
     * ```
     * Dfrac(1,2) // '\\dfrac{1}{2}'
     * Dfrac(1,-2) // '\\dfrac{-1}{2}'
     * Dfrac(6,4) // '\\dfrac{3}{2}'
     * Dfrac(6,-2) // '-3'
     * Dfrac(0,2) // '0'
     * Dfrac(5,0) // undefined
     * ```
     */
    export function Dfrac(numerator: number, denominator: number, upSign?: boolean): string;
    /**
     * convert index katex to surd
     * ```
     * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
     * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
     * ```
     */
    export function IndexToSurd(text: string): string;
    /**
     * @deprecated
     * the coordinates '(a, b)' of point [a,b]
     * ```
     * Coord([1,2]) // '(1, 2)'
     * ```
     */
    export function Coord(point: Point2D, dp?: number): string;
    /**
     * @deprecated
     * the scientific notation of number
     * ```
     * Sci(123.45) // '1.2345 x 10^{ 2}'
     * Sci(1.2345) // '1.2345'
     * ```
     */
    export function Sci(num: number): string;
    /**
     * the katex of long division
     * ```
     * LongDivision([1,2,3,4],[1,2]) //
     * LongDivision([1,2,3,4],[1,2]) //
     * ```
     */
    export function LongDivision(dividend: number[], divisor: number[]): string;
    /**
     * the representation of num in base b
     * ```
     * ToBase(1000,16) // '3E8_{16}'
     * ToBase(13,2) // '1101_{2}'
     * ```
     */
    export function ToBase(num: number, base: number): string;
    /**
     * a prime factorization layout for HCF or LCM
     * ```
     * PrimeFactorize({
     *  'number': [30, 15, 12],
     *   a: [3, 0, 5],
     *   b: [5, 6, 1],
     *   '(x+1)': [8, 7, 5]
     * },
     * {hcf:true,lcm:true,multiply:!true}
     * )
     * ```
     */
    export function PrimeFactorize(val: {
        [_: string]: number[];
    }, { hcf, lcm, multiply }: {
        hcf?: boolean | undefined;
        lcm?: boolean | undefined;
        multiply?: boolean | undefined;
    }): string;
    /**
     * the latex representing the `constraint`
     * ```
     * ConstraintText([1,2,'<',3],true,'h','k') // 'h+2k<3'
     * ConstraintText([1,2,'<',3],false) // 'x+2y>3'
     * ConstraintText([1,2,'<',3],null) // 'x+2y=3'
     * ```
     */
    export function ConstraintText(constraint: Constraint, sign?: boolean | null, xReplace?: string, yReplace?: string): string;
}
declare module "Math/Code/Triangle" {
    /**
     * Find c from a and b of a right triangle.
     * ```
     * Pyth(3,4) // 5
     * ```
     */
    export function Pyth(a: number, b: number): number;
    /**
     * Find b from c and a of a right triangle.
     * ```
     * PythLeg(5,4) // 3
     * ```
     */
    export function PythLeg(c: number, a: number): number;
    /**
     * Find side length c by cosine law. Input sides a,b and angle C.
     * ```
     * CosineLawLength(3, 4, 90) // 5
     * ```
     */
    export function CosineLawLength(a: number, b: number, C: number): number;
    /**
     * Find angle C by cosine law. Input sides a,b,c.
     * ```
     * CosineLawAngle(5,5,5) // 60
     * CosineLawAngle(3,4,5) // 90
     * CosineLawAngle(7,8,9) // 73.3984504
     * ```
     */
    export function CosineLawAngle(a: number, b: number, c: number): number;
    /**
     * Find side b by sine law.
     * ```
     * SineLawLength(60,1,60) // 1
     * ```
     */
    export function SineLawLength(A: number, a: number, B: number): number;
    /**
     * Find angle B by sine law. Assume acute.
     * ```
     * SineLawAngle(1,60,1) // 60
     * ```
     */
    export function SineLawAngle(a: number, A: number, b: number): number;
    /**
     * Find area by Heron's formula.
     * ```
     * Heron(3,4,5) // 6
     * Heron(1,1,1) // 0.433012701
     * Heron(7,8,9) // 26.83281573
     * ```
     */
    export function Heron(a: number, b: number, c: number): number;
    /**
     * Solve SSS triangle.
     * ```
     * SolveSSS(1,sqrt(3),2) // [90,30,60]
     * ```
     */
    export function SolveSSS(a: number, b: number, c: number): [C: number, A: number, B: number];
    /**
     * Solve SAS triangle.
     * ```
     * SolveSAS(1,90,sqrt(3)) // [30,2,60]
     * ```
     */
    export function SolveSAS(a: number, C: number, b: number): [A: number, c: number, B: number];
    /**
     * Solve AAS triangle.
     * ```
     * SolveAAS(60,90,sqrt(3)) // [1,30,2]
     * ```
     */
    export function SolveAAS(A: number, B: number, a: number): [c: number, C: number, b: number];
    /**
     * Solve ASA triangle.
     * ```
     * SolveASA(90,sqrt(3),30) // [2,60,1]
     * ```
     */
    export function SolveASA(A: number, c: number, B: number): [a: number, C: number, b: number];
    /**
     * Solve SSA triangle.
     * ```
     * SolveSSA(1,sqrt(3),30) // [90,2,60]
     * ```
     */
    export function SolveSSA(a: number, b: number, A: number): [C: number, c: number, B: number];
    /**
     * Find heights of SSS triangle.
     * ```
     * HeightsBySSS(1,sqrt(3),2) // [sqrt(3),1,sqrt(3)/2]
     * ```
     */
    export function HeightsBySSS(a: number, b: number, c: number): [Ha: number, Hb: number, Hc: number];
    /**
     * Find height of SSS triangle, against the first base.
     * ```
     * HeightBySSS(1,sqrt(3),2) // sqrt(3)
     * ```
     */
    export function HeightBySSS(a: number, b: number, c: number): number;
    /**
     * Find heights of SAS triangle.
     * ```
     * HeightsBySAS(1,90,sqrt(3)) // [sqrt(3),1,sqrt(3)/2]
     * ```
     */
    export function HeightsBySAS(a: number, C: number, b: number): [Ha: number, Hb: number, Hc: number];
    /**
     * Find height of SAS triangle, opposite to the given angle.
     * ```
     * HeightBySAS(1,90,sqrt(3)) // sqrt(3)/2
     * ```
     */
    export function HeightBySAS(a: number, C: number, b: number): number;
    /**
     * @deprecated - use TriangleFromPoint
     * @param fix - Round all return values to integer.
     * Return the 6 elements of a triangle given vertice. { sideC, angleB, sideA, angleC, sideB, angleA }
     * ```
     * TriangleFromVertex([0,0],[4,0],[0,3],false)
     * // {sideC:4, angleB:36.86989765, sideA:5, angleC:53.13013235, sideB:3, angleA:90}
     * ```
     */
    export function TriangleFromVertex(A: Point2D, B: Point2D, C: Point2D, fix?: boolean): Triangle;
    /**
     * @param fix - Round all return values to integer.
     * Return the 6 elements of a triangle given vertice. [sideA, sideB, sideC, angleA, angleB, angleC]
     * ```
     * TriangleFromPoint([0,0],[4,0],[0,3],false)
     * // [5, 3, 4, 90, 36.86989765, 53.13013235]
     * ```
     */
    export function TriangleFromPoint(A: Point2D, B: Point2D, C: Point2D, fix?: boolean): [
        sideA: number,
        sideB: number,
        sideC: number,
        angleA: number,
        angleB: number,
        angleC: number
    ];
    /**
     * @deprecated
     * Solve a triangle. return the triangle object solved.
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
    export function SolveTriangle({ sideA, sideB, sideC, angleA, angleB, angleC, }: Partial<Triangle>): Triangle;
    /**
     * the orthocentre of a triangle
     * ```
     * Orthocentre([9,-6],[6,10],[-7,10])  // [9,13]
     * ```
     */
    export function Orthocentre(A: Point2D, B: Point2D, C: Point2D): Point2D;
    /**
     * the circumcentre of a triangle
     * ```
     * Circumcentre([1,7],[8,-4],[-10,0])  // [-1,-2]
     * ```
     */
    export function Circumcentre(A: Point2D, B: Point2D, C: Point2D): Point2D;
    /**
     * the centroid of a triangle
     * ```
     * Centroid([3,6],[9,12],[15,21])  // [9,13]
     * ```
     */
    export function Centroid(A: Point2D, B: Point2D, C: Point2D): Point2D;
    /**
     * the incentre of a triangle
     * ```
     * Incentre([3,0],[-3,0],[0,4])  // [0,1.5]
     * ```
     */
    export function Incentre(A: Point2D, B: Point2D, C: Point2D): Point2D;
    /**
     * the scaled points [A,B,C] so that their orthecentre and themselves becomes integral
     */
    export function ScaleOrthocentreToInt(A: Point2D, B: Point2D, C: Point2D): [Point2D, Point2D, Point2D];
    /**
     * the scaled points [A,B,C] so that their circumcentre and themselves becomes integral
     */
    export function ScaleCircumcentreToInt(A: Point2D, B: Point2D, C: Point2D): [Point2D, Point2D, Point2D];
    /**
     * the scaled points [A,B,C] so that their centroid and themselves becomes integral
     */
    export function ScaleCentroidToInt(A: Point2D, B: Point2D, C: Point2D): [Point2D, Point2D, Point2D];
    /**
     * the scaled points [A,B,C] so that their incentre and themselves becomes integral
     */
    export function ScaleIncentreToInt(A: Point2D, B: Point2D, C: Point2D): [Point2D, Point2D, Point2D];
}
declare module "Math/Code/Trigonometry" {
    /**
     * @param rect - The rectangular coordinates [x,y] of a point, or a polar angle theta.
     * the quadrant of a point or angle: 'I','II','III' or 'IV'.
     * ```
     * Quadrant([1,1]) \\ 'I'
     * Quadrant([-1,1]) \\ 'II'
     * Quadrant(200) \\ 'III'
     * Quadrant(350) \\ 'IV'
     * ```
     */
    export function Quadrant(rect: Point2D | number): QuadrantName;
    /**
     * the rectangular coordinates [x,y] from a polar coordinates [r,theta].
     * ```
     * PolToRect([1,45]) // [0.707,0.707]
     * ```
     */
    export function PolToRect([r, q]: PolarPoint): Point2D;
    /**
     * the polar coordinates [r,theta] of a rectangular coordinates [x,y].
     * ```
     * RectToPol([1,1]) // [1.414,45]
     * ```
     */
    export function RectToPol([x, y]: Point2D): PolarPoint;
    /**
     * the sign from ASTC diagram, 1 or -1, representing positive or negative.
     * ```
     * ASTC(2,'cos') // -1
     * ASTC('III','tan') // 1
     * ```
     */
    export function ASTC(quadrant: QuadrantCode | QuadrantName, func: TrigFunc): -1 | 0 | 1;
    /**
     * the roots of trig equations sin(x)=k , cos(x)=k or tan(x)=k.
     * ```
     * TrigSolve('sin',0) // [0, 180, 360]
     * TrigSolve('sin',0.5) // [30, 150]
     * TrigSolve('sin',1) // [90]
     * ```
     */
    export function TrigSolve(func: TrigFunc, k: number): number[];
    /**
     * @deprecated
     * reduce the polar angle into the range [0,360)
     * ```
     * PolarReduce(370) // 10
     * PolarReduce(-10) // 350
     * ```
     */
    export function PolarReduce(q: number): number;
    /**
     * @deprecated
     * the angle (within [0,180]) between two polar angles
     * ```
     * PolarDiff(80,70) // 10
     * PolarDiff(350,10) // 20
     * ```
     */
    export function PolarDiff(angle1: number, angle2: number): number;
    /**
     * the whole bearing in the polar angle direction
     * ```
     * WholeBearing(0) // '090°'
     * WholeBearing(180) // '270°'
     * ```
     */
    export function WholeBearing(polarAngle: number): string;
    /**
     * the compass bearing in the polar angle direction
     * ```
     * CompassBearing(30) // 'N60°E'
     * ```
     */
    export function CompassBearing(polarAngle: number): string;
}
declare module "Math/Code/Utility" {
    /**
     * get the element at cyclic index
     * ```
     * At([1,2,3],-1) // 3
     * At([1,2,3],3) // 1
     * ```
     */
    export function At<T>(arr: T[], index: number): T;
    /**
     * get the chain of elements around `centreIndex` in cyclic fashion
     * ```
     * Lace([1,2,3,4,5,6],0,[-1,0,1]) // [6,1,2]
     * ```
     */
    export function Lace<T>(arr: T[], centreIndex: number, relativeIndices: number[]): T[];
    /**
     * If `bool`, return `[first, second]`, else return `[second, first]`
     * ```
     * Flop(true,1,2) // [1,2]
     * Flop(false,1,2) // [2,1]
     * ```
     */
    export function Flop<T>(bool: boolean, first: T, second: T): [T, T];
    /**
     * Select the displayed value in each pair in `trueFalsePairs` according to `truth`.
     * ```
     * ComboDisplay([true,false],[[1,2],[3,4]]) // [1,4]
     * ComboDisplay(0,[1,2],[3,4]) // [1,4]
     * ComboDisplay(1,[1,2],[3,4]) // [2,3]
     * ```
     */
    export function ComboDisplay<T>(truth: boolean[] | number, ...trueFalsePairs: [trueValue: T, falseValue: T][]): T[];
}
declare module "Math/Code/Vector" {
    /**
     * sum of all vectors
     * ```
     * VecAdd([1,2],[3,4],[5,6]) // [9,12]
     * ```
     */
    export function VecAdd(...vectors: Point2D[]): Point2D;
}
declare module "Math/Code/Vector3D" {
    /**
     * sum of all vectors
     * ```
     * VecAdd3D([1, 2, 3], [3, 4, 5], [5, 6, 7]) // [9, 12, 15]
     * ```
     */
    export function VecAdd3D(...vectors: Point3D[]): Point3D;
    /**
     * mean of all vectors
     * ```
     * Mid3D([1,2,3],[3,4,5],[5,6,7]) // [3,4,5]
     * ```
     */
    export function Mid3D(...vectors: Point3D[]): Point3D;
    /**
     * the point P on AB such that AP : PB = ratio : 1-ratio
     * ```
     * Slide3D([1,0,0],[5,0,0],0.75) // [4,0,0]
     * ```
     */
    export function Slide3D(A: Point3D, B: Point3D, ratio: number): Point3D;
    /**
     * projection of a point on a plane
     * ```
     * let P = [2,3,4]
     * let [A,B,C] = [[0,0,0],[1,0,0],[0,1,0]]
     * PdFoot3D(P,[A,B,C]) // [2,3,0]
     * PdFoot3D(P,[A,B]) // [2,0,0]
     * ```
     */
    export function PdFoot3D(point: Point3D, base: [Point3D, Point3D, Point3D] | [Point3D, Point3D]): Point3D;
    /**
     * embed points on xy-plane onto a plane in 3D
     * ```
     * let [A,B,C] = [[0,0],[1,0],[0,1]]
     * Embed([A,B,C],[0,0,2],[1,0,0],[0,1,0]) // [[0,0,2],[1,0,2],[0,1,2]]
     * ```
     */
    export function Embed(plane2D: Point2D[], origin: Point3D, xVec: Point3D, yVec: Point3D): Point3D[];
    /**
     * embed 2D points onto a plane in 3D with constant x. The x-axis becomes the 3D y-axis. The y-axis becomes the 3D z-axis.
     * ```
     * let [A,B,C] = [[0,0],[3,0],[0,1]]
     * EmbedX([A,B,C],2) // [[2,0,0],[2,3,0],[2,0,1]]
     * ```
     */
    export function EmbedX(plane2D: Point2D[], x?: number): Point3D[];
    /**
     * embed 2D points onto a plane in 3D with constant y. The x-axis becomes the 3D x-axis. The y-axis becomes the 3D z-axis.
     * ```
     * let [A,B,C] = [[0,0],[3,0],[0,1]]
     * EmbedY([A,B,C],2) // [[0,2,0],[3,2,0],[0,2,1]]
     * ```
     */
    export function EmbedY(plane2D: Point2D[], y?: number): Point3D[];
    /**
     * embed points on xy-plane onto a plane in 3D with constant z
     * ```
     * let [A,B,C] = [[0,0],[3,0],[0,1]]
     * EmbedZ([A,B,C],2) // [[0,0,2],[3,0,2],[0,1,2]]
     * ```
     */
    export function EmbedZ(plane2D: Point2D[], z?: number): Point3D[];
    /**
     * flatten points to the same z-plane
     * ```
     * let [A,B,C] = [[0,0,0],[3,0,1],[0,1,2]]
     * FlatZ([A,B,C],2) // [[0,0,2],[3,0,2],[0,1,2]]
     * ```
     */
    export function FlatZ(points: Point3D[], z?: number): Point3D[];
    /**
     * extrude the lower base of a frustum towards the upper base by a ratio
     * ```
     * let [A,B,C] = [[0,0,0],[4,0,0],[0,4,0]]
     * Extrude([A,B,C],[[0,0,4]],0.75) // [[0,0,0],[3,0,0],[0,3,0]]
     * ```
     */
    export function Extrude(lowerBase: Point3D[], upperBase: Point3D[], scale: number): Point3D[];
}
declare module "Math/Builder/support/write" {
    export function symbol(v: varObj): string;
    export function short(v: varObj): string;
    export function long(v: varObj): string;
    export function full(v: varObj): string;
    export function whole(v: varObj): string;
    export function rich(v: varObj): string;
    export function write(vGrp: varGrp, latex: string, showVars?: string[]): string;
    export function printSystem(vGrp: varGrp, latexs: string[], givens?: string[]): string;
    export function printSystemSol(vGrp: varGrp, vars: string[]): string;
    export function latexAligned(texts: string[]): string;
    export function latexBraced(texts: string[]): string;
}
declare module "Math/Builder/support/units" {
    export function findUnit(name: string): string | undefined;
    export function parseUnit(raw: string): string;
}
declare module "Math/Builder/support/variable" {
    export function toVarGrp(varInputs: varInput[]): varGrp;
    export function RoundVars(vGrp: varGrp, vars: string[], sigfig: Record<string, number> | number, integer: boolean): void;
}
declare module "Math/Builder/support/system" {
    export function fitFree(fs: zeroFunction[], varGrp: varGrp): void;
    export function fitAgain(fs: zeroFunction[], varGrp: varGrp, reFitVars: string[]): void;
    export function readTree(tree: TREE): {
        vars: string[];
        givens: string[];
        top: string;
        hiddens: string[];
    };
}
declare module "Math/Builder/build_solve" {
    export function BuildSolve(variables: [
        sym: string,
        name: string,
        range: rangeInput,
        unit?: string,
        display?: string
    ][], equations: [func: zeroFunction, latex: string, explain?: string][], { avoids, sigfig, solPlain, integer, }?: {
        avoids?: string[][];
        sigfig?: {
            [_: string]: number;
        } | number;
        solPlain?: boolean;
        integer?: boolean;
    }): {
        list: string;
        sol: string;
        vars: string[];
        vals: number[];
        unknown: [symbol: string, name: string, val: number, unit: string];
        ans: quantity;
        _INTERNAL: {
            allVars: string[];
            givens: string[];
            hiddens: string[];
            aim: string;
            vGrp: varGrp;
        };
    };
}
declare module "Math/Builder/build_angle" {
    import { PenCls } from "Pen/Pen";
    export function BuildAngle(variables: [
        sym: string,
        angle: [Point2D, Point2D, Point2D],
        mode?: 'normal' | 'polar' | 'reflex'
    ][], equations: [func: zeroFunction, latex: string, explain?: string][]): {
        sol: string;
        vars: string[];
        vals: number[];
        aim: string;
        ans: quantity;
        labeler: {
            ask: (_: PenCls) => void;
            all: (_: PenCls) => void;
            _SYMBOL: (_: PenCls) => void;
        };
    };
}
declare module "Math/Builder/build_trend" {
    export function BuildTrend(variables: [
        sym: string,
        name: string,
        range: rangeInput,
        unit?: string,
        display?: string
    ][], equations: [func: zeroFunction, latex: string][], settings?: {
        trends?: [inc: string, dec: string, unchange: string];
    }): {
        sol: string;
        consts: [symbol: string[], name: string[]];
        agent: [symbol: string, name: string, trend: string, code: number];
        responses: [symbol: string, name: string, trend: string, code: number][];
        target: [symbol: string, name: string, trend: string, code: number];
    };
}
declare module "Math/Builder/build_ratio" {
    export function BuildRatio(variables: [
        sym: string,
        name: string,
        range: rangeInput,
        unit?: string,
        display?: string
    ][], func: zeroFunction, latex: string, { cases, subscript, sigfig, }?: {
        cases?: [string, string];
        subscript?: [string | number, string | number];
        sigfig?: {
            [_: string]: number;
        };
    }): {
        table: string;
        sol: string;
        consts: [symbol: string[], name: string[]];
        given: [symbol: string, name: string];
        unknown: [symbol: string, name: string, val: number, unit: string];
        ans: quantity;
    };
}
declare module "Math/Builder/index" {
    export { BuildAngle } from "Math/Builder/build_angle";
    export { BuildSolve } from "Math/Builder/build_solve";
    export { BuildTrend } from "Math/Builder/build_trend";
    export { BuildRatio } from "Math/Builder/build_ratio";
}
declare module "Math/bundle" {
    export * from "Math/Algebra/Algebra";
    export * from "Math/Algebra/Calculus";
    export * from "Math/Algebra/Circle";
    export * from "Math/Algebra/Quadratic";
    export * from "Math/Algebra/Linear";
    export * from "Math/Algebra/Polynomial";
    export * from "Math/Algebra/Transform";
    export * from "Math/Code/Assertion";
    export * from "Math/Code/Combinatorics";
    export * from "Math/Code/Function";
    export * from "Math/Code/Geometry";
    export * from "Math/Code/Latex";
    export * from "Math/Code/LinearProgram";
    export * from "Math/Code/Numeracy";
    export * from "Math/Code/PhyConst";
    export * from "Math/Code/PhyEq";
    export * from "Math/Code/Random";
    export * from "Math/Code/RandomShake";
    export * from "Math/Code/RandomUtil";
    export * from "Math/Code/Relation";
    export * from "Math/Code/Sequence";
    export * from "Math/Code/Shake";
    export * from "Math/Code/Stat";
    export * from "Math/Code/Text";
    export * from "Math/Code/Triangle";
    export * from "Math/Code/Trigonometry";
    export * from "Math/Code/Utility";
    export * from "Math/Code/Vector";
    export * from "Math/Code/Vector3D";
    export * from "Math/Builder/index";
    export function deepBlurize<F extends (...args: any[]) => any>(f: F): F;
}
declare module "Math/index" {
    import * as bundle from "Math/bundle";
    global {
        var ASTC: typeof bundle.ASTC;
        var ASequence: typeof bundle.ASequence;
        var ASsum: typeof bundle.ASsum;
        var ASterm: typeof bundle.ASterm;
        var Abs: typeof bundle.Abs;
        var Angle: typeof bundle.Angle;
        var AnglePolar: typeof bundle.AnglePolar;
        var ArcLength: typeof bundle.ArcLength;
        var AreAbsDistinct: typeof bundle.AreAbsDistinct;
        var AreCoprime: typeof bundle.AreCoprime;
        var AreDifferent: typeof bundle.AreDifferent;
        var AreDistantPoint: typeof bundle.AreDistantPoint;
        var AreDistinct: typeof bundle.AreDistinct;
        var AreOblique: typeof bundle.AreOblique;
        var AreSameSign: typeof bundle.AreSameSign;
        var ArrangePoints: typeof bundle.ArrangePoints;
        var At: typeof bundle.At;
        var Bin: typeof bundle.Bin;
        var Binomial: typeof bundle.Binomial;
        var BuildAngle: typeof bundle.BuildAngle;
        var BuildRatio: typeof bundle.BuildRatio;
        var BuildSolve: typeof bundle.BuildSolve;
        var BuildTrend: typeof bundle.BuildTrend;
        var Ceil: typeof bundle.Ceil;
        var Centroid: typeof bundle.Centroid;
        var CheckVertices: typeof bundle.CheckVertices;
        var ChessboardDistance: typeof bundle.ChessboardDistance;
        var CircleFromGeneral: typeof bundle.CircleFromGeneral;
        var CircleGeneral: typeof bundle.CircleGeneral;
        var CircleLineIntersect: typeof bundle.CircleLineIntersect;
        var CircleLinearIntersect: typeof bundle.CircleLinearIntersect;
        var Circumcentre: typeof bundle.Circumcentre;
        var ComboDisplay: typeof bundle.ComboDisplay;
        var CompassBearing: typeof bundle.CompassBearing;
        var ConstraintText: typeof bundle.ConstraintText;
        var ConstraintsFromPoints: typeof bundle.ConstraintsFromPoints;
        var Coord: typeof bundle.Coord;
        var CosineLawAngle: typeof bundle.CosineLawAngle;
        var CosineLawLength: typeof bundle.CosineLawLength;
        var Crammer: typeof bundle.Crammer;
        var Degree: typeof bundle.Degree;
        var Dfrac: typeof bundle.Dfrac;
        var Dir: typeof bundle.Dir;
        var Discriminant: typeof bundle.Discriminant;
        var Distance: typeof bundle.Distance;
        var Divide: typeof bundle.Divide;
        var Embed: typeof bundle.Embed;
        var EmbedX: typeof bundle.EmbedX;
        var EmbedY: typeof bundle.EmbedY;
        var EmbedZ: typeof bundle.EmbedZ;
        var ExplainTransforms: typeof bundle.ExplainTransforms;
        var Extrude: typeof bundle.Extrude;
        var Factorial: typeof bundle.Factorial;
        var FeasibleIntegral: typeof bundle.FeasibleIntegral;
        var FeasibleIsBounded: typeof bundle.FeasibleIsBounded;
        var FeasiblePolygon: typeof bundle.FeasiblePolygon;
        var FeasibleVertices: typeof bundle.FeasibleVertices;
        var FieldAt: typeof bundle.FieldAt;
        var Fix: typeof bundle.Fix;
        var FixDown: typeof bundle.FixDown;
        var FixUp: typeof bundle.FixUp;
        var FlatZ: typeof bundle.FlatZ;
        var Floor: typeof bundle.Floor;
        var Flop: typeof bundle.Flop;
        var Freq: typeof bundle.Freq;
        var FreqTable: typeof bundle.FreqTable;
        var Freqs: typeof bundle.Freqs;
        var GSequence: typeof bundle.GSequence;
        var GSsum: typeof bundle.GSsum;
        var GSterm: typeof bundle.GSterm;
        var GrammarJoin: typeof bundle.GrammarJoin;
        var GroupCumFreqTable: typeof bundle.GroupCumFreqTable;
        var GroupFreqTable: typeof bundle.GroupFreqTable;
        var HCF: typeof bundle.HCF;
        var HeightBySAS: typeof bundle.HeightBySAS;
        var HeightBySSS: typeof bundle.HeightBySSS;
        var HeightsBySAS: typeof bundle.HeightsBySAS;
        var HeightsBySSS: typeof bundle.HeightsBySSS;
        var Heron: typeof bundle.Heron;
        var IQR: typeof bundle.IQR;
        var Incentre: typeof bundle.Incentre;
        var IndexToSurd: typeof bundle.IndexToSurd;
        var IneqSign: typeof bundle.IneqSign;
        var IntersectAngle: typeof bundle.IntersectAngle;
        var Intersection: typeof bundle.Intersection;
        var IsAbsBetween: typeof bundle.IsAbsBetween;
        var IsAroundPoint: typeof bundle.IsAroundPoint;
        var IsBetween: typeof bundle.IsBetween;
        var IsConvexPolygon: typeof bundle.IsConvexPolygon;
        var IsDecimal: typeof bundle.IsDecimal;
        var IsEven: typeof bundle.IsEven;
        var IsInteger: typeof bundle.IsInteger;
        var IsNegative: typeof bundle.IsNegative;
        var IsNonNegative: typeof bundle.IsNonNegative;
        var IsNonNegativeInteger: typeof bundle.IsNonNegativeInteger;
        var IsNonZero: typeof bundle.IsNonZero;
        var IsNum: typeof bundle.IsNum;
        var IsOdd: typeof bundle.IsOdd;
        var IsPositive: typeof bundle.IsPositive;
        var IsPositiveInteger: typeof bundle.IsPositiveInteger;
        var IsProbability: typeof bundle.IsProbability;
        var IsRational: typeof bundle.IsRational;
        var IsReflex: typeof bundle.IsReflex;
        var IsSquareNum: typeof bundle.IsSquareNum;
        var IsTerminating: typeof bundle.IsTerminating;
        var IsTriangle: typeof bundle.IsTriangle;
        var LCM: typeof bundle.LCM;
        var Lace: typeof bundle.Lace;
        var LineFeat: typeof bundle.LineFeat;
        var LineFromBisector: typeof bundle.LineFromBisector;
        var LineFromIntercepts: typeof bundle.LineFromIntercepts;
        var LineFromPointSlope: typeof bundle.LineFromPointSlope;
        var LineFromTwoPoints: typeof bundle.LineFromTwoPoints;
        var LinearFromBisector: typeof bundle.LinearFromBisector;
        var LinearFromIntercepts: typeof bundle.LinearFromIntercepts;
        var LinearFromPointSlope: typeof bundle.LinearFromPointSlope;
        var LinearFromTwoPoints: typeof bundle.LinearFromTwoPoints;
        var LongDivision: typeof bundle.LongDivision;
        var LowerQ: typeof bundle.LowerQ;
        var LowerQAt: typeof bundle.LowerQAt;
        var LucasSequence: typeof bundle.LucasSequence;
        var Max: typeof bundle.Max;
        var MaximizeField: typeof bundle.MaximizeField;
        var MaximizePoint: typeof bundle.MaximizePoint;
        var Mean: typeof bundle.Mean;
        var Median: typeof bundle.Median;
        var MedianAt: typeof bundle.MedianAt;
        var Mid: typeof bundle.Mid;
        var Mid3D: typeof bundle.Mid3D;
        var Min: typeof bundle.Min;
        var MinimizeField: typeof bundle.MinimizeField;
        var MinimizePoint: typeof bundle.MinimizePoint;
        var Mode: typeof bundle.Mode;
        var Move: typeof bundle.Move;
        var MoveX: typeof bundle.MoveX;
        var MoveY: typeof bundle.MoveY;
        var OnCircle: typeof bundle.OnCircle;
        var OptimizeField: typeof bundle.OptimizeField;
        var OptimizePoint: typeof bundle.OptimizePoint;
        var Orthocentre: typeof bundle.Orthocentre;
        var PairTable: typeof bundle.PairTable;
        var Partition: typeof bundle.Partition;
        var PdFoot: typeof bundle.PdFoot;
        var PdFoot3D: typeof bundle.PdFoot3D;
        var PhyConst: typeof bundle.PhyConst;
        var PhyEq: typeof bundle.PhyEq;
        var PolToRect: typeof bundle.PolToRect;
        var PolarDiff: typeof bundle.PolarDiff;
        var PolarReduce: typeof bundle.PolarReduce;
        var PolyFunction: typeof bundle.PolyFunction;
        var PolyPrint: typeof bundle.PolyPrint;
        var PolySimplify: typeof bundle.PolySimplify;
        var PolySort: typeof bundle.PolySort;
        var PrimeFactorize: typeof bundle.PrimeFactorize;
        var PrimeFactors: typeof bundle.PrimeFactors;
        var Product: typeof bundle.Product;
        var Pyth: typeof bundle.Pyth;
        var PythLeg: typeof bundle.PythLeg;
        var Quadrant: typeof bundle.Quadrant;
        var QuadraticFromRoot: typeof bundle.QuadraticFromRoot;
        var QuadraticFromVertex: typeof bundle.QuadraticFromVertex;
        var QuadraticRoot: typeof bundle.QuadraticRoot;
        var QuadraticSequence: typeof bundle.QuadraticSequence;
        var QuadraticVertex: typeof bundle.QuadraticVertex;
        var Radian: typeof bundle.Radian;
        var Ratio: typeof bundle.Ratio;
        var RectToPol: typeof bundle.RectToPol;
        var ReflectX: typeof bundle.ReflectX;
        var ReflectY: typeof bundle.ReflectY;
        var RegularPolygon: typeof bundle.RegularPolygon;
        var RndAngles: typeof bundle.RndAngles;
        var RndCapitals: typeof bundle.RndCapitals;
        var RndComposite: typeof bundle.RndComposite;
        var RndConvexPolygon: typeof bundle.RndConvexPolygon;
        var RndData: typeof bundle.RndData;
        var RndEven: typeof bundle.RndEven;
        var RndHe: typeof bundle.RndHe;
        var RndLetters: typeof bundle.RndLetters;
        var RndN: typeof bundle.RndN;
        var RndNs: typeof bundle.RndNs;
        var RndOdd: typeof bundle.RndOdd;
        var RndOnCircle: typeof bundle.RndOnCircle;
        var RndP: typeof bundle.RndP;
        var RndPartition: typeof bundle.RndPartition;
        var RndPick: typeof bundle.RndPick;
        var RndPickN: typeof bundle.RndPickN;
        var RndPickUnique: typeof bundle.RndPickUnique;
        var RndPoint: typeof bundle.RndPoint;
        var RndPointPolar: typeof bundle.RndPointPolar;
        var RndPoints: typeof bundle.RndPoints;
        var RndPoly: typeof bundle.RndPoly;
        var RndPolynomial: typeof bundle.RndPolynomial;
        var RndPyth: typeof bundle.RndPyth;
        var RndQ: typeof bundle.RndQ;
        var RndQs: typeof bundle.RndQs;
        var RndR: typeof bundle.RndR;
        var RndRatio: typeof bundle.RndRatio;
        var RndRs: typeof bundle.RndRs;
        var RndShake: typeof bundle.RndShake;
        var RndShakeBase: typeof bundle.RndShakeBase;
        var RndShakeCombo: typeof bundle.RndShakeCombo;
        var RndShakeCompoundInequality: typeof bundle.RndShakeCompoundInequality;
        var RndShakeConstraint: typeof bundle.RndShakeConstraint;
        var RndShakeConstraints: typeof bundle.RndShakeConstraints;
        var RndShakeG: typeof bundle.RndShakeG;
        var RndShakeIneq: typeof bundle.RndShakeIneq;
        var RndShakeN: typeof bundle.RndShakeN;
        var RndShakePoint: typeof bundle.RndShakePoint;
        var RndShakePointPolar: typeof bundle.RndShakePointPolar;
        var RndShakeQ: typeof bundle.RndShakeQ;
        var RndShakeQuantity: typeof bundle.RndShakeQuantity;
        var RndShakeR: typeof bundle.RndShakeR;
        var RndShakeRatio: typeof bundle.RndShakeRatio;
        var RndShakeTrig: typeof bundle.RndShakeTrig;
        var RndShakeTrigValue: typeof bundle.RndShakeTrigValue;
        var RndShe: typeof bundle.RndShe;
        var RndShuffle: typeof bundle.RndShuffle;
        var RndT: typeof bundle.RndT;
        var RndTriangle: typeof bundle.RndTriangle;
        var RndTrigEqv: typeof bundle.RndTrigEqv;
        var RndTrigValue: typeof bundle.RndTrigValue;
        var RndU: typeof bundle.RndU;
        var RndZ: typeof bundle.RndZ;
        var RndZs: typeof bundle.RndZs;
        var Rng: typeof bundle.Rng;
        var Rotate: typeof bundle.Rotate;
        var Round: typeof bundle.Round;
        var RoundDown: typeof bundle.RoundDown;
        var RoundUp: typeof bundle.RoundUp;
        var ScaleCentroidToInt: typeof bundle.ScaleCentroidToInt;
        var ScaleCircumcentreToInt: typeof bundle.ScaleCircumcentreToInt;
        var ScaleIncentreToInt: typeof bundle.ScaleIncentreToInt;
        var ScaleOrthocentreToInt: typeof bundle.ScaleOrthocentreToInt;
        var ScaleTo: typeof bundle.ScaleTo;
        var Sci: typeof bundle.Sci;
        var SectorArea: typeof bundle.SectorArea;
        var ShakeBase: typeof bundle.ShakeBase;
        var ShakeCompoundInequality: typeof bundle.ShakeCompoundInequality;
        var ShakeConstraint: typeof bundle.ShakeConstraint;
        var ShakeConstraints: typeof bundle.ShakeConstraints;
        var ShakeG: typeof bundle.ShakeG;
        var ShakeIneq: typeof bundle.ShakeIneq;
        var ShakeN: typeof bundle.ShakeN;
        var ShakePoint: typeof bundle.ShakePoint;
        var ShakePointPolar: typeof bundle.ShakePointPolar;
        var ShakeQ: typeof bundle.ShakeQ;
        var ShakeQuantity: typeof bundle.ShakeQuantity;
        var ShakeR: typeof bundle.ShakeR;
        var ShakeRatio: typeof bundle.ShakeRatio;
        var ShakeTrigValue: typeof bundle.ShakeTrigValue;
        var ShortDivision: typeof bundle.ShortDivision;
        var ShortDivisionBy2: typeof bundle.ShortDivisionBy2;
        var SigFig: typeof bundle.SigFig;
        var Sign: typeof bundle.Sign;
        var SineLawAngle: typeof bundle.SineLawAngle;
        var SineLawLength: typeof bundle.SineLawLength;
        var Slide: typeof bundle.Slide;
        var Slide3D: typeof bundle.Slide3D;
        var Slope: typeof bundle.Slope;
        var SlopePd: typeof bundle.SlopePd;
        var SolveAAS: typeof bundle.SolveAAS;
        var SolveASA: typeof bundle.SolveASA;
        var SolveSAS: typeof bundle.SolveSAS;
        var SolveSSA: typeof bundle.SolveSSA;
        var SolveSSS: typeof bundle.SolveSSS;
        var SolveTriangle: typeof bundle.SolveTriangle;
        var Sort: typeof bundle.Sort;
        var SortBy: typeof bundle.SortBy;
        var Sqrt: typeof bundle.Sqrt;
        var StatRange: typeof bundle.StatRange;
        var StdDev: typeof bundle.StdDev;
        var StemAndLeaf: typeof bundle.StemAndLeaf;
        var Sum: typeof bundle.Sum;
        var Summary: typeof bundle.Summary;
        var Table: typeof bundle.Table;
        var ToBase: typeof bundle.ToBase;
        var ToFrac: typeof bundle.ToFrac;
        var TransformFunc: typeof bundle.TransformFunc;
        var TriangleFromPoint: typeof bundle.TriangleFromPoint;
        var TriangleFromVertex: typeof bundle.TriangleFromVertex;
        var TrigSolve: typeof bundle.TrigSolve;
        var UniMode: typeof bundle.UniMode;
        var UpperQ: typeof bundle.UpperQ;
        var UpperQAt: typeof bundle.UpperQAt;
        var VecAdd: typeof bundle.VecAdd;
        var VecAdd3D: typeof bundle.VecAdd3D;
        var WholeBearing: typeof bundle.WholeBearing;
        var ZScore: typeof bundle.ZScore;
        var arccos: typeof bundle.arccos;
        var arcsin: typeof bundle.arcsin;
        var arctan: typeof bundle.arctan;
        var cos: typeof bundle.cos;
        var deepBlurize: typeof bundle.deepBlurize;
        var differentiate: typeof bundle.differentiate;
        var functionize: typeof bundle.functionize;
        var getMaxDeg: typeof bundle.getMaxDeg;
        var integrate: typeof bundle.integrate;
        var isConstrained: typeof bundle.isConstrained;
        var isLooseConstrained: typeof bundle.isLooseConstrained;
        var log: typeof bundle.log;
        var nCr: typeof bundle.nCr;
        var nPr: typeof bundle.nPr;
        var sin: typeof bundle.sin;
        var tan: typeof bundle.tan;
        var xPolynomial: typeof bundle.xPolynomial;
    }
}
declare module "Pen/AutoPen" {
    export class AutoPenCls {
        private pen;
        constructor();
        /**
         * Export the canvas to image tag.
         * ```
         * question = autoPen.export(question,'imgQ')
         * // paste the canvas to the image tag with src field 'imgQ'
         * ```
         */
        print(html: string, placeholder: string): string;
        /**
         * Arrow diagram for inequalities.
         * @param items - Represent the inequalities.
         * @param ticks - Represent the tick or cross for each region.
         * ```
         * pen.Inequalities({
         *    items:[
         *       { position: 0.3, sign: "\\ge", num: 5,vertical:true },
         *       { position: 0.7, sign: "<", num: "k" }
         *    ],
         *    ticks:[true,true,false]
         * })
         * ```
         */
        Inequalities({ items, ticks, }: {
            items: {
                sign: Ineq;
                num: number | string;
                position?: number;
                vertical?: boolean;
            }[];
            ticks?: boolean[] | 'AND' | 'OR';
        }): void;
        /**
         * Trig Graph for solving basic trig equation.
         * @param trig - 'sin' | 'cos' | 'tan'
         * @param k - value of trig, like sin = k.
         * @param scale - scale for pen.setup.size()
         * @param ratio - ratio for pen.setup.size()
         * ```
         * pen.TrigSolution({trig:'sin', k:0.5})
         * ```
         */
        TrigSolution({ trig, k, scale, ratio, }: {
            trig: TrigFunc;
            k: number;
            scale?: number;
            ratio?: number;
        }): void;
        /**
         * Sketch for solving quadratic inequality.
         * @param quadratic - [a,b,c] representing coeff of quadratic inequality.
         * @param sign - The sign of the inequality. Can be like '>=' , '<' or '\\ge' , '\\lt'.
         * @param scale - scale for pen.setup.size()
         * @param ratio - ratio for pen.setup.size()
         * ```
         * pen.QuadraticInequality({quadratic:[1,2,-3],sign:'\\ge'})
         * ```
         */
        QuadraticInequality({ quadratic, sign, scale, ratio, }: {
            quadratic: [number, number, number];
            sign: string;
            scale?: number;
            ratio?: number;
        }): void;
        /**
         * Draw a triangle.
         * @param vertices - [A,B,C] an array of coordinates [x,y] of 3 vertices, must be anticlockwise.
         * @param triangle - The elements of triangle to print, {sideC,angleB,sideA,angleC,sideB,angleA}. If falsy, show no label.
         * @param labels - The labels of the vertices. If falsy, show no label.
         * @param heights - Whether to draw the height.
         * @param scale - scale for pen.setup.size()
         * ```
         * pen.Triangle({
         *   vertices:[[0,0],[4,0],[0,3]],
         *   triangle:{sideC:4,angleB:37,sideA:5,angleC:53,sideB:3,angleA:90},
         *   labels:['A','B','C'],
         *   heights :[false, false, false]
         * })
         * ```
         */
        Triangle({ vertices, triangle, labels, heights, scale, }: {
            vertices: Point2D[];
            triangle?: {
                sideA?: number;
                sideB?: number;
                sideC?: number;
                angleA?: number;
                angleB?: number;
                angleC?: number;
            };
            labels?: string[];
            heights?: [boolean, boolean, boolean];
            scale?: number;
        }): void;
        /**
         * Draw a graph for linear programming.
         * @deprecated
         * @param constraints - Constraint as system of inequalities, like [[1,1,'<',2]] represent x+y<2.
         * @param field - The target linear function to optimize, [a,b,c] represent ax+by+c.
         * @param contours - The contours to draw, [4,5] represent P=4 and P=5.
         * @param labelConstraints - Constraint to label integral points.
         * @param highlights - Points to highlight, [{point,color,circle,contour,coordinates,label}].
         * @param ranges - Range of Canvas.
         * @param resolution - Resolution of Canvas
         * ```
         * let constraints = [[1, 1, "<=", 5], [1, -1, "<", 4], [2, 1, ">=", -5], [3, 1, ">", -10]]
         * pen.LinearProgram({
         *     constraints,
         *     field: [1, -3, 3],
         *     contours: [4,5],
         *     labelConstraints: [(x,y)=>y>0],
         *     highlights: [{point:[0,0]}],
         *     ranges: [[-10,10],[-10,10]],
         *     resolution: 0.2,
         *     grid: 0,
         *     subGrid: 0,
         *     tick: 0,
         *     showLine: true,
         *     showShade: true,
         *     showVertex: false,
         *     showVertexCoordinates: false,
         *     showVertexLabel: false,
         *     showVertexMax: false,
         *     showVertexMin: false,
         *     showIntegral: false,
         *     showIntegralLabel: false,
         *     showIntegralMax: false,
         *     showIntegralMin: false,
         *     contourColor : "grey",
         *     constraintColors : ['black','black']
         * })
         * ```
         */
        LinearProgram({ constraints, field, contours, labelConstraints, highlights, ranges, resolution, grid, subGrid, tick, showLine, showShade, showVertex, showVertexCoordinates, showVertexLabel, showVertexMax, showVertexMin, showIntegral, showIntegralLabel, showIntegralMax, showIntegralMin, contourColor, constraintColors, }: {
            constraints: Constraint[];
            field: Field;
            contours: number[];
            labelConstraints: ((x: number, y: number) => boolean)[];
            highlights: HighLight[];
            ranges: [[number, number], [number, number]];
            resolution: number;
            grid: number;
            subGrid: number;
            tick: number;
            showLine: boolean;
            showShade: boolean;
            showVertex: boolean;
            showVertexCoordinates: boolean;
            showVertexLabel: boolean;
            showVertexMax: boolean;
            showVertexMin: boolean;
            showIntegral: boolean;
            showIntegralLabel: boolean;
            showIntegralMax: boolean;
            showIntegralMin: boolean;
            contourColor: string;
            constraintColors: string[];
        }): void;
        /**
         * A dot pattern
         * @param a - no. of dot of 1st pattern
         * @param p - P_n+1 = P_n + (pn+q)
         * @param q - P_n+1 = P_n + (pn+q)
         * @param n - the pattern required
         * @param offset - offset of initial position
         * ```
         * pen.DotPattern({a:3, p:3, q:2, n:4, offset:1})
         * ```
         */
        DotPattern({ a, p, q, n, offset, }: {
            a: number;
            p: number;
            q: number;
            n: number;
            offset: number;
        }): void;
        /**
         * ```
         * pen.PieChart({
         *   items: ['a','b','c','d','e'],
         *   labels: ['10%','20%','y%',null,''],
         *   angles: [45,135,60,50,70],
         *   angleLabels: [null,'x',null,undefined,''],
         *   size:1.5
         * })
         * ```
         */
        PieChart({ items, labels, angles, angleLabels, size, }: {
            items: string[];
            labels: (string | null)[];
            angles: number[];
            angleLabels: (string | null | undefined)[];
            size?: number;
        }): void;
        /**
         * ```
         * pen.BarChart({
         *   items: ['a','b','c','d','e'],
         *   freqs: [7, 47, 15, 3, 7],
         *   xLabel: 'x-axis',
         *   yLabel: 'y-axis',
         *   // grid: [5, 1], // can be 5
         *   // colWidth: 1.2,
         * })
         * ```
         */
        BarChart(config: {
            items: (string | number)[];
            freqs: number[];
            xLabel?: string;
            yLabel?: string;
            grid?: [main: number, sub: number] | number;
            colWidth?: number;
        }): void;
        /**
         * ```
         * pen.LineChart({
         *   items: ['a','b','c','d','e'],
         *   freqs: [7, 47, 15, 3, 7],
         *   xLabel: 'x-axis',
         *   yLabel: 'y-axis',
         *   // grid: [5, 1], // can be 5
         *   // colWidth: 1.2,
         * })
         * ```
         */
        LineChart(config: {
            items: (string | number)[];
            freqs: number[];
            xLabel?: string;
            yLabel?: string;
            grid?: [main: number, sub: number] | number;
            colWidth?: number;
        }): void;
        /**
         * ```
         * pen.Histogram({
         *   data: [2, 2, 2, 7, 7, 7, 8, 8, 13, 13],
         *   cls: [1, 5],
         *   xLabel: 'x-axis',
         *   yLabel: 'y-axis',
         *   // grid: [5, 1], // can be 5
         *   // colWidth: 1.2,
         *   mode: 'mid',
         * })
         * ```
         */
        Histogram(config: {
            data: number[];
            cls: [number, number];
            xLabel?: string;
            yLabel?: string;
            grid?: [main: number, sub: number] | number;
            colWidth?: number;
            mode: 'mid' | 'end';
        }): void;
        /**
         * ```
         * pen.FreqPolygon({
         *   data: [2, 2, 2, 7, 7, 7, 8, 8, 13, 13],
         *   cls: [1, 5],
         *   xLabel: 'x-axis',
         *   yLabel: 'y-axis',
         *   // grid: [5, 1], // can be 5
         *   // colWidth: 1.2,
         *   // bar: false,
         *   // mode: 'mid',
         * })
         * ```
         */
        FreqPolygon(config: {
            data: number[];
            cls: [number, number];
            xLabel?: string;
            yLabel?: string;
            grid?: [main: number, sub: number] | number;
            colWidth?: number;
            bar?: boolean;
            mode?: 'mid' | 'end';
        }): void;
        /**
         * ```
         * pen.CumFreqPolygon({
         *   data: [2, 2, 2, 7, 7, 7, 8, 8, 13, 13],
         *   cls: [1, 5],
         *   xLabel: 'x-axis',
         *   yLabel: 'y-axis',
         *   // grid: [5, 1], // can be 5
         *   // colWidth: 1.2,
         *   // guides: [2, 3]
         * })
         * ```
         */
        CumFreqPolygon(config: {
            data: number[];
            cls: [number, number];
            xLabel?: string;
            yLabel?: string;
            grid?: [main: number, sub: number] | number;
            colWidth?: number;
            guides?: number[];
        }): void;
        /**
         * ```
         * pen.Boxplot({
         *   summary: [41,45,48,52,55],
         *   labels: [null,null,'x',null,'y'],
         *   size: 2,
         *   tick: 1,
         *   start: 38,
         *   end: 60,
         *   showDash: false,
         *   showValue: false,
         *   showTick: false
         * })
         * ```
         */
        Boxplot({ summary, labels, size, tick, start, end, showDash, showValue, showTick, }: {
            summary: number[];
            labels?: (string | null)[];
            size?: number;
            tick?: number;
            start?: number;
            end?: number;
            showDash?: boolean;
            showValue?: boolean;
            showTick?: boolean;
        }): void;
        /**
         * ```
         * pen.RegularPolygon({
         *   side: 8,
         *   diagonal: true,
         *   reflectional: false,
         *   rotational: false,
         * })
         * ```
         */
        RegularPolygon({ side, diagonal, reflectional, rotational, }: {
            side: number;
            diagonal?: boolean;
            reflectional?: boolean;
            rotational?: boolean;
        }): void;
        /**
         * A 2x2 binary tree diagram for probability.
         * ```
         * pen.TreeDiagram({
         *    titles: ['step 1', 'step 2'],
         *    probabilities: [[0.1], [0.2, 0.3]],
         *    events: [[['✔', '✘']], [['✔✔', '✔✘'], ['✘✔', '✘✘']]],
         *    select: [1]
         * })
         * ```
         */
        TreeDiagram({ titles, probabilities, events, select, circleSize, }: {
            titles: [string, string];
            probabilities: (number | [string, string])[][];
            events: [string, string][][];
            select: (1 | 2 | 3 | 4)[];
            circleSize?: number;
        }): void;
    }
}
declare module "Pen/PhyPen" {
    import { PenCls } from "Pen/Pen";
    export class PhyPenCls {
        private pen;
        constructor();
        /**
         * Export the canvas to image tag.
         * ```
         * question = autoPen.export(question,'imgQ')
         * // paste the canvas to the image tag with src field 'imgQ'
         * ```
         */
        print(html: string, placeholder: string): string;
        /**
         * Return the originally pen object.
         * ```
         * let pen2 = pen.exposePen()
         * ```
         */
        exposePen(): PenCls;
        /**
         * Box on incline plane.
         * Force.
         * ```
         * let pen = new PhyPen()
         * pen.InclinedPlane({
         *  boxMid: 10,
         *  boxWidth: 6,
         *  boxHeight: 3,
         *  angle: 30,
         *  angleLabel: 'θ',
         *  weight: 5,
         *  weightLabel: 'mg',
         *  weightXLabel: 'mg\\sinθ',
         *  weightYLabel: 'mg\\cosθ',
         *  weightAngleLabel: true,
         *  normal: 4,
         *  normalLabel: 'R',
         *  friction: 0,
         *  frictionLabel: 'f',
         *  applied: 0,
         *  appliedLabel: 'F',
         *  appliedXLabel: 'F\\cosφ',
         *  appliedYLabel: 'F\\sinφ',
         *  appliedAngle: 0,
         *  appliedAngleLabel: 'φ',
         *  showForces: false,
         *  showWeightCompo: false,
         *  showAppliedCompo: false
         * })
         * ```
         */
        InclinedPlane({ boxMid, boxWidth, boxHeight, length, angle, angleLabel, weight, weightLabel, weightXLabel, weightYLabel, weightAngleLabel, normal, normalLabel, friction, frictionLabel, applied, appliedLabel, appliedXLabel, appliedYLabel, appliedAngle, appliedAngleLabel, showForces, showWeightCompo, showAppliedCompo, }: {
            boxMid?: number;
            boxWidth?: number;
            boxHeight?: number;
            length?: number;
            angle?: number;
            angleLabel?: string;
            weight?: number;
            weightLabel?: string;
            weightXLabel?: string;
            weightYLabel?: string;
            weightAngleLabel?: string | boolean;
            normal?: number;
            normalLabel?: string;
            friction?: number;
            frictionLabel?: string;
            applied?: number;
            appliedLabel?: string;
            appliedXLabel?: string;
            appliedYLabel?: string;
            appliedAngle?: number;
            appliedAngleLabel?: string | boolean;
            showForces?: boolean;
            showWeightCompo?: boolean;
            showAppliedCompo?: boolean;
        }): void;
        /**
         * A projectile trajectory.
         * ```
         * let pen = new PhyPen()
         * pen.Projectile({
         *    speed: 20,
         *    angle: 50,
         *    time: 4,
         *    arrowScale: 0.5,
         *    ground: false
         * })
         * ```
         */
        Projectile({ speed, angle, time, arrowScale, ground, }: {
            speed: number;
            angle?: number;
            time?: number;
            arrowScale?: number;
            ground?: boolean;
        }): void;
        /**
         * A car on a banked road.
         * Circular Motion.
         * ```
         * let pen = new PhyPen()
         * pen.CarOnBankedRoad({
         *  carMid : 10,
         *  carWidth : 3,
         *  wheelHeight : 1,
         *  carHeight : 2,
         *  angle : 25,
         *  angleLabel : 'θ',
         *  weight : 4,
         *  weightLabel : 'mg',
         *  normal : 5,
         *  normalLabel : 'R',
         *  friction : 0,
         *  frictionLabel : 'f',
         *  showAllForces : false
         * })
         * ```
         */
        CarOnBankedRoad({ carMid, carWidth, wheelHeight, carHeight, angle, angleLabel, weight, weightLabel, normal, normalLabel, friction, frictionLabel, showAllForces, }: {
            carMid?: number;
            carWidth?: number;
            wheelHeight?: number;
            carHeight?: number;
            angle?: number;
            angleLabel?: string;
            weight?: number;
            weightLabel?: string;
            normal?: number;
            normalLabel?: string;
            friction?: number;
            frictionLabel?: string;
            showAllForces?: boolean;
        }): void;
        /**
         * A plane making a turn.
         * Circular Motion.
         * ```
         * let pen = new PhyPen()
         * pen.AirplaneTurning({
         *   wingWidth = 7,
         *   planeRadius = 1,
         *   angle = 35,
         *   angleLabel = 'θ',
         *   weight = 4,
         *   weightLabel = 'mg',
         *   lift = 5,
         *   liftLabel = 'L',
         *   showAllForces = false
         * })
         * ```
         */
        AirplaneTurning({ wingWidth, planeRadius, angle, angleLabel, weight, weightLabel, lift, liftLabel, showAllForces, }: {
            planeMid?: number;
            wingWidth?: number;
            planeRadius?: number;
            angle?: number;
            angleLabel?: string;
            weight?: number;
            weightLabel?: string;
            lift?: number;
            liftLabel?: string;
            showAllForces?: boolean;
        }): void;
        /**
         * A conical pendulum.
         * Circular Motion.
         * ```
         * let pen = new PhyPen()
         * pen.ConicalPendulum({
         *    bobRadius = 1,
         *    length = 15,
         *    angle = 50,
         *    angleLabel = 'θ',
         *    weight = 7,
         *    weightLabel = 'mg',
         *    tension = 10,
         *    tensionLabel = 'T',
         *    showAllForces = false
         * })
         * ```
         */
        ConicalPendulum({ bobRadius, length, angle, angleLabel, weight, weightLabel, tension, tensionLabel, showAllForces, }: {
            bobRadius?: number;
            length?: number;
            angle?: number;
            angleLabel?: string;
            weight?: number;
            weightLabel?: string;
            tension?: number;
            tensionLabel?: string;
            showAllForces?: boolean;
        }): void;
        /**
         * A satellite orbits around a planet.
         * Gravitation.
         * ```
         * let pen = new PhyPen()
         * pen.SatelliteOrbit({
         *    planetRadius = 1.3,
         *    orbitRadius = 2,
         *    angle = 30,
         * })
         * ```
         */
        SatelliteOrbit({ planetRadius, orbitRadius, angle, showHeight, }: {
            planetRadius?: number;
            orbitRadius?: number;
            angle?: number;
            showHeight?: boolean;
        }): void;
        /**
         * Refraction between two media.
         * ```
         * let pen = new PhyPen()
         * pen.RefractionMedia({
         *  rays: [
         *     [60,true,'a','b'],
         *     [250, false, false, true],
         *  ],
         *  upMedLabel: 'A',
         *  lowMedLabel: 'B',
         *  upMedColor: 'white',
         *  lowMedColor: 'black',
         *  roundTo: 5
         * })
         * ```
         */
        RefractionMedia({ rays, upMedLabel, lowMedLabel, upMedColor, lowMedColor, roundTo, }: {
            rays: [
                dir: number,
                to: boolean,
                angleV: boolean | string,
                angleH: boolean | string
            ][];
            upMedLabel: string;
            lowMedLabel: string;
            upMedColor: string;
            lowMedColor: string;
            roundTo: number;
        }): void;
    }
}
declare module "Pen/index" {
    import { PenCls } from "Pen/Pen";
    import { AutoPenCls } from "Pen/AutoPen";
    import { PhyPenCls } from "Pen/PhyPen";
    global {
        var Pen: typeof PenCls;
        var AutoPen: typeof AutoPenCls;
        var PhyPen: typeof PhyPenCls;
    }
}
declare module "Soil/tool/shuffle" {
    export function shuffleOptions(qn: string, sol: string, ans: string, shuffle: boolean): {
        qn: string;
        sol: string;
        ans: string;
        hasDuplicatedOptions: boolean;
    };
}
declare module "Soil/tool/blacksmith" {
    import { Blacksmith } from 'bot';
    export let blacksmith: Blacksmith;
}
declare module "Soil/tool/option" {
    type dict = Record<string, any>;
    export function AutoOptions(instructions: dict, qn: string, source: dict): string;
}
declare module "Soil/cls" {
    export class Config {
        answer: string;
        options: {};
        shuffle: boolean;
        constructor(answer?: string, options?: {}, shuffle?: boolean);
    }
}
declare module "Soil/soil" {
    export class Soil {
        private readonly gene;
        private qn;
        private sol;
        private dict;
        private config;
        private counter;
        private timer;
        private logger;
        constructor(gene: Gene);
        private reset;
        private evalCode;
        private checkDict;
        private isValidated;
        private runPopulate;
        private runLoop;
        private runSection;
        private runPreprocess;
        private runOption;
        private runIntrapolate;
        private runSubstitute;
        private runPostprocess;
        private runShuffle;
        private runKatex;
        private successFruit;
        private errorFruit;
        nurture(): Fruit;
    }
}
declare module "Soil/index" {
    global {
        var MathSoil2: MathSoil2Cls;
    }
    class MathSoil2Cls {
        private nurture;
        reap(gene: Gene): Fruit;
        inspect(gene: Gene, repeat: number): Inspection;
        fingerPrint(fruit: Fruit): string;
    }
}
declare module "index" {
    import "Core/index";
    import "Math/index";
    import "Pen/index";
    import "Soil/index";
    import 'sapphire-js';
}
declare module "Math/type" {
    global {
        /**
         * ```
         * // quadratic form
         * [1,2,3] // x^2+2x+3
         * ```
         */
        type Quadratic = [a: number, b: number, c: number];
        type Point2D = [x: number, y: number] | number[];
        type Point3D = [x: number, y: number, z: number] | number[];
        type Point = Point2D | Point3D;
        type interval = [min: number, max: number];
        type Fraction = [numerator: number, denominator: number];
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
        ];
        /**
         * ```
         * // used in linear programming
         * [1,2,3] // x+2y+3
         * ```
         */
        type Field = [xCoeff: number, yCoeff: number, constant: number];
        type HighLight = {
            point: Point2D;
            color?: string;
            circle?: boolean;
            contour?: boolean;
            coordinates?: boolean;
            label?: boolean;
        };
        type Triangle = {
            sideA: number;
            sideB: number;
            sideC: number;
            angleA: number;
            angleB: number;
            angleC: number;
        };
        type QuadrantName = 'I' | 'II' | 'III' | 'IV';
        type QuadrantCode = 1 | 2 | 3 | 4;
        type PolarPoint = [r: number, q: number];
        type TrigFunc = 'sin' | 'cos' | 'tan';
        type Ineq = '\\ge' | '\\gt' | '\\le' | '\\lt' | '>=' | '<=' | '>' | '<' | [greater: boolean, equal: boolean];
        type monomial = {
            coeff: number;
            [_: string]: number;
        };
        type polynomial = monomial[];
        type CompoundInequality = [
            connective: 'AND' | 'OR',
            sign1: Ineq,
            num1: number,
            sign2: Ineq,
            num2: number,
            variable: string
        ];
        type TrigValue = [TrigFunc, number | string];
        type TrigExp = [TrigFunc, number, 1 | -1, string];
        type quantity = {
            val: number;
            unit: string;
        };
    }
    export {};
}
declare module "Math/Algebra/Algebra.test" { }
declare module "Math/Algebra/Calculus.test" { }
declare module "Math/Algebra/Circle.test" { }
declare module "Math/Algebra/Linear.test" { }
declare module "Math/Jest/JestExtend" {
    export function repeat(times: number, func: Function): void;
    global {
        namespace jest {
            interface Matchers<R> {
                toBeBetween(min: number, max: number): R;
                toAllBeBetween(min: number, max: number): R;
                toSpanSame(members: any[], flatDepth?: number): R;
                toSpanRange(min: number, max: number, flatDepth?: number): R;
                toSpanLength(length: number, flatDepth?: number): R;
                toAllBeOneOf(members: any[]): R;
                toBeInteger(): R;
                toAllBeInteger(): R;
                toBeDupless(): R;
            }
        }
    }
}
declare module "Math/Algebra/Polynomial.test" { }
declare module "Math/Algebra/Quadratic.test" { }
declare module "Math/Code/Assertion.test" { }
declare module "Math/Code/Combinatorics.test" { }
declare module "Math/Code/Function.test" { }
declare module "Math/Code/Geometry.test" { }
declare module "Math/Code/Latex.test" { }
declare module "Math/Code/LinearProgram.test" { }
declare module "Math/Code/Numeracy.test" { }
declare module "Math/Code/Random.test" { }
declare module "Math/Code/RandomShake.test" { }
declare module "Math/Code/RandomUtil.test" { }
declare module "Math/Code/Relation.test" { }
declare module "Math/Code/Sequence.test" { }
declare module "Math/Code/Shake.test" { }
declare module "Math/Code/Stat.test" { }
declare module "Math/Code/Text.test" { }
declare module "Math/Code/Triangle.test" { }
declare module "Math/Code/Trigonometry.test" { }
declare module "Math/Code/Utility.test" { }
declare module "Math/Code/Vector.test" { }
declare module "Math/Code/Vector3D.test" { }
declare var answer: string | number;
declare var options: object;
declare var shuffle: boolean;
declare var question: string;
declare var solution: string;
