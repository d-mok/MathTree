declare module "index" {
    import './Core/index.ts';
    import './Math/index.ts';
    import './Pen/index.ts';
    import './Soil/index.ts';
}
declare module "Core/Owl/index" {
    export const num: (_: unknown) => _ is number;
    export const whole: (_: unknown) => _ is number;
    export const int: (_: unknown) => _ is number;
    export const dec: (_: unknown) => _ is number;
    export const terminating: (_: unknown) => _ is number;
    export const rational: (_: unknown) => _ is number;
    export const irrational: (_: unknown) => _ is number;
    export const odd: (_: unknown) => _ is number;
    export const even: (_: unknown) => _ is number;
    export const prob: (_: unknown) => _ is number;
    export const sq: (_: unknown) => _ is number;
    export const positive: (_: unknown) => _ is number;
    export const positiveInt: (_: unknown) => _ is number;
    export const nonNegative: (_: unknown) => _ is number;
    export const nonNegativeInt: (_: unknown) => _ is number;
    export const negative: (_: unknown) => _ is number;
    export const negativeInt: (_: unknown) => _ is number;
    export const nonPositive: (_: unknown) => _ is number;
    export const nonPositiveInt: (_: unknown) => _ is number;
    export const zero: (_: unknown) => _ is number;
    export const nonZero: (_: unknown) => _ is number;
    export const nonZeroInt: (_: unknown) => _ is number;
    export const between: (min: number, max: number) => (_: unknown) => _ is number;
    export const absBetween: (min: number, max: number) => (_: unknown) => _ is number;
    export const str: (_: unknown) => _ is string;
    export const bool: (_: unknown) => _ is boolean;
    export const object: (_: unknown) => _ is Object;
    export const emptyObject: (_: unknown) => _ is Object;
    export const array: (_: unknown) => _ is any[];
    export const arrayOfLength: (length: number) => (_: unknown) => _ is any[];
    export const arrayWith: (predicate: (_: unknown) => boolean) => (_: unknown) => _ is any[];
    export const couple: (_: unknown) => _ is [number, number];
    export const triple: (_: unknown) => _ is [number, number, number];
    export const combo: (_: unknown) => _ is [boolean, boolean, boolean];
    export const ntuple: (_: unknown) => _ is number[];
    export const interval: (_: unknown) => _ is interval;
    export const point2D: (_: unknown) => _ is Point2D;
    export const point2Ds: (_: unknown) => _ is Point2D[];
    export const point3D: (_: unknown) => _ is Point3D;
    export const point3Ds: (_: unknown) => _ is Point3D[];
    export const polar: (_: unknown) => _ is PolarPoint;
    export const fraction: (_: unknown) => _ is Fraction;
    export const properFraction: (_: unknown) => _ is Fraction;
    export const vector: (_: unknown) => _ is Point2D;
    export const vector3D: (_: unknown) => _ is Point3D;
    export const triangleSides: (_: unknown) => boolean;
    export const monomial: (_: unknown) => _ is monomial;
    export const polynomial: (_: unknown) => _ is polynomial;
    export const compoundInequality: (_: unknown) => _ is CompoundInequality;
    export const trigValue: (_: unknown) => _ is TrigValue;
    export const trigExp: (_: unknown) => _ is TrigExp;
    export const labeledValue1: (_: unknown) => _ is LabeledValue1;
    export const labeledValue2: (_: unknown) => _ is LabeledValue2;
    export const labeledValue: (_: unknown) => _ is LabeledValue;
    export const quantity: (_: unknown) => _ is quantity;
    export const pass: (_: unknown) => boolean;
    export const fail: (_: unknown) => boolean;
    export const distinct: (_: unknown[]) => boolean;
    export const alphabet: (_: unknown) => _ is string;
    export const ineq: (_: unknown) => _ is Ineq;
    export const dfrac: (_: unknown) => _ is string;
    export const constraint: (_: unknown) => _ is Constraint;
    export const constraints: (_: unknown) => _ is Constraint[];
    export const field: (_: unknown) => _ is Field;
    export const quadrantCode: (_: unknown) => _ is QuadrantCode;
    export const quadrantName: (_: unknown) => _ is QuadrantName;
    export const quadrant: (_: unknown) => _ is QuadrantCode | QuadrantName;
    export const trig: (_: unknown) => _ is TrigFunc;
    export const roman: (_: unknown) => _ is string;
    export const base: (_: unknown) => _ is string;
    export function and(pds: predicate[], name?: string): predicate;
    export function or(pds: predicate[], name?: string): predicate;
    export function every(pd: predicate, name?: string): predicate;
}
declare module "Core/Ink/index" {
    export function printDfrac(numerator: number, denominator: number, upSign?: boolean): string;
    export function printCombo(combo: [boolean, boolean, boolean]): string;
    export function printTrigValue(T: TrigValue): string;
    export function printTrigExp(T: TrigExp): string;
    export function printOrTrigRoots(roots: (number | undefined)[]): string;
    export function printSurd(num: number): string;
    export function printPointPolar(point: Point2D): string;
    export function printConstraint(con: Constraint, align?: boolean, replaceEqual?: boolean): string;
    export function printConstraints(cons: Constraint[]): string;
    export function printLabeledValue(obj: LabeledValue, order?: number, isAngle?: boolean): string;
    export function printPrimeFactors(num: number): string;
    export function printMonomial(mono: monomial, fraction: boolean): string;
    export function printPolynomial(poly: polynomial, fraction: boolean): string;
    export function printCompoundInequality(compoundInequality: CompoundInequality): string;
}
declare module "Core/index" {
    import { cal as $cal, data as $data, list as $list, numbers as $numbers, shape as $shape, shape2D as $shape2D, shape3D as $shape3D, vector as $vector, vector2D as $vector2D, vector3D as $vector3D, toData as $toData, toList as $toList, toNumbers as $toNumbers, toShape as $toShape, toShape2D as $toShape2D, toShape3D as $toShape3D, toVector as $toVector, vec2D as $vec2D, vec3D as $vec3D, INEQUAL as $INEQUAL, optimizer as $optimizer, rein as $rein, toReins as $toReins, lin as $lin } from 'ruby';
    import * as $Owl from "Core/Owl/index";
    import * as $Ink from "Core/Ink/index";
    global {
        var cal: typeof $cal;
        var data: typeof $data;
        var list: typeof $list;
        var numbers: typeof $numbers;
        var shape: typeof $shape;
        var shape2D: typeof $shape2D;
        var shape3D: typeof $shape3D;
        var vector: typeof $vector;
        var vector2D: typeof $vector2D;
        var vector3D: typeof $vector3D;
        var toData: typeof $toData;
        var toList: typeof $toList;
        var toNumbers: typeof $toNumbers;
        var toShape: typeof $toShape;
        var toShape2D: typeof $toShape2D;
        var toShape3D: typeof $toShape3D;
        var toVector: typeof $toVector;
        var vec2D: typeof $vec2D;
        var vec3D: typeof $vec3D;
        var INEQUAL: typeof $INEQUAL;
        var optimizer: typeof $optimizer;
        var rein: typeof $rein;
        var toReins: typeof $toReins;
        var lin: typeof $lin;
        var owl: typeof $Owl;
        var ink: typeof $Ink;
    }
}
declare module "Math/Algebra/Polynomial" {
    export function getMaxDeg(poly: polynomial): number;
    export class Host {
        /**
         * a random polynomial object
         * ```
         * RndPolynomial(5, ['x', 'y'], 3, 9))
         * // may return 7xy+3x^2y^3-2xy^3
         * ```
         */
        static RndPolynomial(degree: number, vars?: string[], terms?: number, maxCoeff?: number): polynomial;
        /**
         * a string of the polynomial object
         * ```
         * PolyPrint([x^5, 2x^6, 3x^7])
         * // x^{5}+2x^{6}+3x^{7}
         * ```
         */
        static PolyPrint(poly: polynomial): string;
        /**
         * a polynomial object sorted by power
         * ```
         * PolySort([2x^6, x^5, 3x^7])
         * //  [x^5, 2x^6, 3x^7]
         * ```
         */
        static PolySort(poly: polynomial, desc?: boolean): polynomial;
        /**
         * a function of the polynomial, for substitution
         * ```
         * func = PolyFunction([2x^6, x^5, 3x^7])
         * func({x:2}) // 272
         * ```
         */
        static PolyFunction(poly: polynomial): (values: {
            [_: string]: number;
        }) => number;
        /**
         * @deprecated
         * join arrays of monomials
         * ```
         * PolyJoin([x^5, 2x^6], [3x^7])
         * // [x^5, 2x^6, 3x^7]
         * ```
         */
        static PolyJoin(...polys: polynomial[]): polynomial;
        /**
         * combine like terms in polynomial
         * ```
         * PolySimplify([x^5, 2x^6, 3x^5])
         * // [4x^5, 2x^6]
         * ```
         */
        static PolySimplify(poly: polynomial): polynomial;
    }
    global {
        var RndPolynomial: typeof Host.RndPolynomial;
        var PolyPrint: typeof Host.PolyPrint;
        var PolySort: typeof Host.PolySort;
        var PolyFunction: typeof Host.PolyFunction;
        var PolyJoin: typeof Host.PolyJoin;
        var PolySimplify: typeof Host.PolySimplify;
    }
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
         * Set the coordinate range by capture points or objects.
         * ```
         * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
         * pen.range.capture([[1,2],3]) //  [1-3,2-3], [1+3,2+3] must be in-view
         * // point | circle [[h,k],r] | sphere [[a,b,c],r]
         * ```
         */
        capture(...points: Point[]): void;
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
        dash(segments?: (number[] | number | boolean)): void;
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
        circle(center: Point3D, radius: number, xVec: Point3D, yVec: Point3D, { line, dash, shade, fill, arc }?: {
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
        circleXZ(center: Point3D, radius: number, { line, dash, shade, fill, arc }?: {
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
        circleYZ(center: Point3D, radius: number, { line, dash, shade, fill, arc }?: {
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
        circleXY(center: Point3D, radius: number, { line, dash, shade, fill, arc }?: {
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
        sphere(center: Point3D, radius: number, { baseDash, baseShade, radiusLine, radiusDash, radiusLabel, lowerOnly, upperOnly }?: {
            baseDash?: boolean | undefined;
            baseShade?: boolean | undefined;
            radiusLine?: boolean | undefined;
            radiusDash?: boolean | undefined;
            radiusLabel?: string | undefined;
            lowerOnly?: boolean | undefined;
            upperOnly?: boolean | undefined;
        }): void;
        /**
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
         * Draw a frustum
         * ```
         * let [A,B,C] = [[0,0,0],[2,0,0],[0,2,0]]
         * let V = [0,0,5]
         * pen.d3.frustum([A,B,C],[V]) // draw a cone
         * ```
         */
        frustum(lowerBase: Point3D[], upperBase: Point3D[] | Point3D, { base, height, shadeLower, shadeUpper, envelope, }?: {
            base?: boolean | undefined;
            height?: boolean | undefined;
            shadeLower?: boolean | undefined;
            shadeUpper?: boolean | undefined;
            envelope?: boolean | undefined;
        }): void;
        /**
         * Draw a prism along the z-direction
         * ```
         * let [A,B,C] = [[0,0],[2,0],[0,2]]
         * pen.d3.prismZ([A,B,C],0,4) // draw a triangular prism
         * ```
         */
        prismZ(lowerBase: Point2D[], lowerZ: number, upperZ: number, { base, height, shadeLower, shadeUpper, envelope, }?: {
            base?: boolean | undefined;
            height?: boolean | undefined;
            shadeLower?: boolean | undefined;
            shadeUpper?: boolean | undefined;
            envelope?: boolean | undefined;
        }): void;
        /**
         * Draw a cylinder along the z-direction
         * ```
         * pen.d3.cylinderZ([0,0],2,0,4) // draw a cylinder
         * ```
         */
        cylinderZ(center: Point2D, radius: number, lowerZ: number, upperZ: number, { base, height, shadeLower, shadeUpper, envelope, }?: {
            base?: boolean | undefined;
            height?: boolean | undefined;
            shadeLower?: boolean | undefined;
            shadeUpper?: boolean | undefined;
            envelope?: boolean | undefined;
        }): void;
        /**
         * Draw a pyramid along the z-direction
         * ```
         * let [A,B,C] = [[0,0],[2,0],[0,2]]
         * pen.d3.pyramidZ([A,B,C],0,[0,0,4]) // draw a triangular prism
         * ```
         */
        pyramidZ(lowerBase: Point2D[], lowerZ: number, vertex: Point3D, { base, height, shadeLower, envelope, }?: {
            base?: boolean | undefined;
            height?: boolean | undefined;
            shadeLower?: boolean | undefined;
            envelope?: boolean | undefined;
        }): void;
        /**
         * Draw a cone along the z-direction
         * ```
         * pen.d3.coneZ([0,0],2,[0,0,4]) // draw a cone
         * ```
         */
        coneZ(center: Point2D, radius: number, lowerZ: number, vertex: Point3D, { base, height, shadeLower, envelope, }?: {
            base?: boolean | undefined;
            height?: boolean | undefined;
            shadeLower?: boolean | undefined;
            envelope?: boolean | undefined;
        }): void;
        /**
         * Draw a frustum along the z-direction
         * ```
         * let [A,B,C] = [[0,0],[2,0],[0,2]]
         * pen.d3.frustumZ([A,B,C],0,[0,0,4],0.25) // draw a triangular frustum
         * ```
         */
        frustumZ(lowerBase: Point2D[], lowerZ: number, vertex: Point3D, scale: number, { base, height, shadeLower, shadeUpper, envelope, }?: {
            base?: boolean | undefined;
            height?: boolean | undefined;
            shadeLower?: boolean | undefined;
            shadeUpper?: boolean | undefined;
            envelope?: boolean | undefined;
        }): void;
        /**
         * Draw a conical frustum along the z-direction
         * ```
         * pen.d3.conicalFrustumZ([0,0],2,[0,0,4],0.25) // draw a conical frustum
         * ```
         */
        conicalFrustumZ(center: Point2D, radius: number, lowerZ: number, vertex: Point3D, scale: number, { base, height, shadeLower, shadeUpper, envelope, }?: {
            base?: boolean | undefined;
            height?: boolean | undefined;
            shadeLower?: boolean | undefined;
            shadeUpper?: boolean | undefined;
            envelope?: boolean | undefined;
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
         * pen.d3.height([0,0,1],[0,0,0],[0,1,0])
         * ```
         */
        height(vertex: Point3D, foot: Point3D, leg: Point3D, label?: string): void;
        /**
         * Draw the solid height and right-angle.
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
         * @category setting
         */
        range: PenRange;
        /**
         * Setup of canvas size.
         * @category setting
         */
        size: PenSize;
        /**
         * Settings.
         * @category setting
         */
        set: PenSettings;
        /**
         * Plot an explicit or parametric function.
         * ```
         * pen.plot(x=>x**2,1,2) // y=x^2 from x = 1 to 2
         * pen.plot(x=>x**2) // y=x^2 in from x = xmin to xmax
         * pen.plot(t=>[cos(t),sin(t)],0,360) // a unit circle
         * ```
         * @category graph
         */
        plot(func: ((t: number) => number) | ((t: number) => Point2D), tStart?: number, tEnd?: number): void;
        /**
         * Same as .plot but dashed.
         * @category graph
         */
        plotDash(func: ((t: number) => number) | ((t: number) => Point2D), tStart?: number, tEnd?: number): void;
        /**
         * Drawing graph of functions.
         * @category graph
         */
        graph: PenGraph;
        /**
         * Draw a point.
         * ```
         * pen.point([1,2]) // draw a point at [1,2]
         * pen.point([1,2],"A") // draw a point at [1,2] and label as "A"
         * ```
         * @category draw
         */
        point(position: Point, label?: string): void;
        /**
         * Draw a point.
         * ```
         * pen.points({A,B}) // mark and label point A as 'A', point B as 'B'
         * pen.points({A,B},false) // mark point A and B, without label
         * ```
         * @category draw
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
         * @category draw
         */
        cutX(position: Point2D | number, label?: string | number): void;
        /**
         * Draw a cutter to a vertical line.
         * ```
         * pen.cutY([1,2]) // draw a horizontal cutter at [1,2]
         * pen.cutY(1) // same as cutY([0,1])
         * pen.cutY(1,'y') // label 'y'
         * ```
         * @category draw
         */
        cutY(position: Point2D | number, label?: string | number): void;
        /**
         * Draw a tick on the x-axis.
         * ```
         * pen.tickX(1) // draw a tick at x=1
         * ```
         * @category draw
         */
        tickX(x: number): void;
        /**
         * Draw a tick on the y-axis.
         * ```
         * pen.tickY(1) // draw a tick at y=1
         * ```
         * @category draw
         */
        tickY(y: number): void;
        /**
         * Draw a guide line from `point` to the x-axis.
         * ```
         * pen.guideX([1,2],'1') // draw guide from [1,2] and label '1' on x-axis
         * ```
         * @category draw
         */
        guideX(point: Point2D, label?: string | number): void;
        /**
         * Draw a guide line from `point` to the y-axis.
         * ```
         * pen.guideY([1,2],'2') // draw guide from [1,2] and label '2' on y-axis
         * ```
         * @category draw
         */
        guideY(point: Point2D, label?: string | number): void;
        /**
         * Draw two guide lines from `point` to the x-axis and y-axis.
         * ```
         * pen.guide([1,2],['a','b']) // draw guide from [1,2] and label 'a' on x-axis and 'b' on y-axis
         * ```
         * @category draw
         */
        guide(point: Point2D, labels?: [string | number | undefined, string | number | undefined]): void;
        /**
         * Draw a guide line from `point` to the x-axis, and mark the x-coord.
         * ```
         * pen.leadX([1,2]) // draw guide from [1,2] and label 1 on x-axis
         * ```
         * @category draw
         */
        leadX(point: Point2D): void;
        /**
         * Draw a guide line from `point` to the y-axis, and mark the y-coord.
         * ```
         * pen.leadY([1,2]) // draw guide from [1,2] and label 2 on y-axis
         * ```
         * @category draw
         */
        leadY(point: Point2D): void;
        /**
         * Draw two guide lines from `point` to the x-axis and y-axis, and mark the x-coord and y-coord.
         * ```
         * pen.lead([1,2]) // draw guide from [1,2] and label 1 on x-axis and 2 on y-axis
         * ```
         * @category draw
         */
        lead(point: Point2D): void;
        /**
         * Draw a circle.
         * ```
         * pen.circle([1,2], 10) // draw a circle centered at [1,2] with r=10px
         * ```
         * @category draw
         */
        circle(center: Point2D, radius: number): void;
        /**
         * Fill a disc.
         * ```
         * pen.disc([1,2], 10) // draw a disc centered at [1,2] with 10 px radius
         * ```
         * @category draw
         */
        disc(center: Point2D, radius: number): void;
        /**
         * Shade a disc.
         * ```
         * pen.halo([1,2], 10) // shade a disc centered at [1,2] with 10 px radius
         * ```
         * @category draw
         */
        halo(center: Point2D, radius: number): void;
        /**
         * Draw a dot.
         * ```
         * pen.dot([1,2]) // draw a dot at [1,2]
         * ```
         * @category draw
         */
        dot(point: Point2D): void;
        /**
         * Draw a hole.
         * ```
         * pen.hole([1,2]) // draw a hole at [1,2]
         * ```
         * @category draw
         */
        hole(point: Point2D): void;
        /**
         * Draw a line between two points.
         * ```
         * pen.line([1,2],[3,4]) // draw a line from [1,2] to [3,4]
         * pen.line([1,2],[3,4],'10') //  also label '10'
         * ```
         * @category draw
         */
        line(A: Point, B: Point, label?: string | number): void;
        /**
         * Draw a dash line between two points.
         * ```
         * pen.dash([1,2],[3,4]) // draw a dash line from [1,2] to [3,4]
         * pen.dash([1,2],[3,4],'10') //  also label '10'
         * ```
         * @category draw
         */
        dash(A: Point, B: Point, label?: string | number): void;
        /**
         * Draw an arrow between two points.
         * ```
         * pen.arrow([1,2],[3,4]) // draw an arrow from [1,2] to [3,4]
         * ```
         * @category draw
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
         * @category draw
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
         * @category draw
         */
        arrowResolve(O: Point2D, P: Point2D, alongDir: number, arrowLabels?: (string | number | undefined)[], angleLabel?: string | number): void;
        /**
         * Draw a length between two points.
         * ```
         * pen.length([1,2],[3,4],'d')
         * // draw an length 'd' from [1,2] to [3,4]
         * ```
         * @category draw
         */
        length(A: Point, B: Point, label?: string | number): void;
        /**
         * Draw a dashed height with right angle, from V to AB.
         * ```
         * pen.height([0,4],[[-1,0],[1,0]],'h')
         * // draw the height 'h' from [0,4] to x-axis
         * ```
         * @category draw
         */
        height(V: Point2D, [A, B]: [Point2D, Point2D], label?: string | number): void;
        /**
         * Draw a ray from A to B.
         * ```
         * pen.ray([0,0],[1,1])
         * ```
         * @category draw
         */
        ray(A: Point2D, B: Point2D, label?: string | number): void;
        /**
         * Draw a polyline given points.
         * ```
         * pen.polyline([0,0],[5,2],[3,4]) // draw a polyline through 3 points
         * ```
         * @category draw
         */
        polyline(...points: Point[]): void;
        /**
         * Draw a polygon given points.
         * ```
         * pen.polygon([0,0],[5,2],[3,4]) // draw a triangle
         * ```
         * @category draw
         */
        polygon(...points: Point[]): void;
        /**
         * Fill a polygon given points.
         * ```
         * pen.polyfill([0,0],[5,2],[3,4]) // fill a triangle
         * ```
         * @category draw
         */
        polyfill(...points: Point[]): void;
        /**
         * Shade a polygon given points.
         * ```
         * pen.polyshade([0,0],[5,2],[3,4]) // shade a triangle
         * ```
         * @category draw
         */
        polyshade(...points: Point[]): void;
        /**
         * Draw and shade a polygon given points.
         * ```
         * pen.polyshape([0,0],[5,2],[3,4]) // draw and shade a triangle
         * ```
         * @category draw
         */
        polyshape(...points: Point[]): void;
        /**
         * Draw a rod.
         * @category rod
         */
        rod: PenRod;
        /**
         * Fill a shape.
         * @category fill
         */
        fill: PenFill;
        /**
         * Shade a shape.
         * @category shade
         */
        shade: PenShade;
        /**
         * Linear Programming tools.
         * @category linProg
         */
        linProg: PenLinProg;
        /**
         * Draw an angle with label.
         * ```
         * pen.angle([0,0],[5,2],[3,4],'x')
         * ```
         * @category draw
         */
        angle(A: Point, O: Point, B: Point, label?: string | number, arc?: number, radius?: number): void;
        /**
         * Draw an angle by direction.
         * ```
         * pen.angleDir(0,[0,0],60,'x')
         * ```
         * @category draw
         */
        angleDir(A: Point2D | number, O: Point2D, B: Point2D | number, label?: string | number, arc?: number, radius?: number): void;
        /**
         * Decorate equal side lengths.
         * ```
         * pen.decorate.equalSide([1,0],[3,2],2)
         * // a double-tick at the mid-pt of [1,0] and [3,2]
         * ```
         * @category decorator
         */
        equalSide(A: Point, B: Point, tick?: number): void;
        /**
         * Decorate bisecting equal lengths of a side.
         * ```
         * pen.decorate.bisectSide([0,0], [2,2], 2)
         * // two double-ticks bisecting [0,0] and [2,2] at their mid-pt
         * ```
         * @category decorator
         */
        bisectSide(A: Point, B: Point, tick?: number): void;
        /**
         * Decorate parallel side.
         * ```
         * pen.decorate.parallel([1,0],[3,2],2)
         * // a double-tick parallel mark at the mid-pt of [1,0] and [3,2]
         * ```
         * @category decorator
         */
        parallel(A: Point, B: Point, tick?: number): void;
        /**
         * Decorate a right-angle AOB.
         * ```
         * pen.decorate.rightAngle([1,0],[0,0],[3,2])
         * // an right-angle AOB
         * ```
         * @category decorator
         */
        rightAngle(A: Point, O: Point, B?: Point, size?: number): void;
        /**
         * Decorate a compass.
         * ```
         * pen.decorate.compass([1,2])
         * // a compass at [1,2]
         * ```
         * @category decorator
         */
        compass(point: Point2D): void;
        /**
         * Write text.
         * ```
         * pen.write([1,2],'abc') // 'abc' at [1,2]
         * ```
         * @category text
         */
        write(point: Point, text: string): void;
        /**
         * @category text
         */
        label: PenLabel;
        /**
         * The axis.
         * @category axis
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
         * @category axis
         */
        tick: PenTick;
        /**
         * The axis gridlines.
         * @category axis
         */
        grid: PenGrid;
        /**
         * The axis gridlines and ticks.
         * @category axis
         */
        gridTick: PenGridTick;
        /**
         * The 3D pen
         * @category 3D
         */
        d3: PenD3;
        /**
         * Set the background image url.
         * ```
         * pen.background('https://www2.pyc.edu.hk/img/pycnet_logo.png')
         * ```
         * @category export
         */
        background(url: string): void;
        /**
         * Export the canvas to image tag.
         * ```
         * question = pen.export(question,'imgQ')
         * // paste the canvas to the image tag with src field 'imgQ'
         * ```
         * @category export
         */
        export(html: string, placeholder: string): string;
        /**
         * Export the canvas to image tag, with white space trimmed.
         * ```
         * question = pen.exportTrim(question,'imgQ')
         * // paste the canvas to the image tag with src field 'imgQ'
         * ```
         * @category export
         */
        exportTrim(html: string, placeholder: string): string;
        /**
         * Clear the canvas.
         * @category export
         */
        clear(): void;
        /**
         * Temporarily save the img internally. Can be later restored by restoreImg.
         * @category export
         */
        saveImg(): void;
        /**
         * Restored the previously saved img by saveImg.
         * @category export
         */
        restoreImg(): void;
    }
}
declare module "Math/Builder/build_solve" {
    import { PenCls } from "Pen/Pen";
    export function BuildSolve(variables: [
        sym: string,
        name: string,
        range: rangeInput,
        unit?: string,
        display?: string
    ][], equations: [func: zeroFunction, latex: string][], { listSym, avoids, sigfig, solFormat, solPlain, integer, }?: {
        listSym?: boolean;
        avoids?: string[][];
        sigfig?: {
            [_: string]: number;
        } | number;
        solFormat?: 'series' | 'parallel';
        solPlain?: boolean;
        integer?: boolean;
    }): {
        list: string;
        sol: string;
        vars: string[];
        vals: number[];
        unknown: [symbol: string, name: string, val: number, unit: string];
        ans: quantity;
        labelAngle: (_: PenCls) => {
            all: () => void;
            plain: () => void;
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
    import { BuildSolve as $BuildSolve } from "Math/Builder/build_solve";
    import { BuildTrend as $BuildTrend } from "Math/Builder/build_trend";
    import { BuildRatio as $BuildRatio } from "Math/Builder/build_ratio";
    global {
        var BuildSolve: typeof $BuildSolve;
        var BuildTrend: typeof $BuildTrend;
        var BuildRatio: typeof $BuildRatio;
    }
}
declare module "Math/index" {
    import './Code/Assertion.ts';
    import './Code/Combinatorics.ts';
    import './Code/Function.ts';
    import './Code/Geometry.ts';
    import './Code/Latex.ts';
    import './Code/LinearProgram.ts';
    import './Code/Numeracy.ts';
    import './Code/PhyConst.ts';
    import './Code/PhyEq.ts';
    import './Code/Random.ts';
    import './Code/RandomShake.ts';
    import './Code/RandomUtil.ts';
    import './Code/Relation.ts';
    import './Code/Sequence.ts';
    import './Code/Stat.ts';
    import './Code/Text.ts';
    import './Code/Triangle.ts';
    import './Code/Trigonometry.ts';
    import './Code/Utility.ts';
    import './Code/Vector.ts';
    import './Code/Vector3D.ts';
    import './Algebra/Algebra.ts';
    import './Algebra/Calculus.ts';
    import './Algebra/Circle.ts';
    import './Algebra/Quadratic.ts';
    import './Algebra/Linear.ts';
    import "Math/Algebra/Polynomial";
    import './should.ts';
    import "Math/Builder/index";
}
declare module "Math/should" {
    global {
        var CustomError: any;
        var toError: any;
        var MathError: any;
        var Should: (condition: boolean, msg: string) => asserts condition;
    }
    export {};
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
        type Point2D = [x: number, y: number];
        type Point3D = [x: number, y: number, z: number];
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
        type Highlight = {
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
        type LabeledValue1 = [value: number, label: string];
        type LabeledValue2 = [value: number, label1: string, label2: string];
        type LabeledValue = LabeledValue1 | LabeledValue2;
        type quantity = {
            val: number;
            unit: string;
        };
    }
    export {};
}
declare module "Math/Algebra/Algebra" {
    export class Host {
        /**
         * Solve [x,y] from ax+by=c and px+qy=r.
         * ```
         * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
         * Crammer(1,1,3,2,2,6) // throw, parallel
         * ```
         */
        static Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number];
        /**
         * The product of two polynomials.
         * ```
         * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
         * // (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
         * ```
         */
        static xPolynomial(poly1: number[], poly2: number[]): number[];
        /**
         * Expansion coeff of (Ax+B)^n in descending power of x.
         * ```
         * Binomial(2,3,2) // (2x+3)^2 = [4,12,9]
         * Binomial(2,3) // power default to n = 2
         * ```
         */
        static Binomial(A: number, B: number, n?: number): number[];
    }
    global {
        var Crammer: typeof Host.Crammer;
        var xPolynomial: typeof Host.xPolynomial;
        var Binomial: typeof Host.Binomial;
    }
}
declare module "Math/Algebra/Calculus" {
    export class Host {
        /**
         * Derivative of the function.
         * ```
         * differentiate(x=>x**2) // x=>2*x
         * ```
         */
        static differentiate(fn: (x: number) => number): (x: number) => number;
        /**
         * Integral of the function, passing through the fix point.
         * ```
         * integrate(x=>2*x, [0,3]) // x=>x**2+3
         * ```
         */
        static integrate(fn: (x: number) => number, fixPoint?: Point2D): (x: number) => number;
        /**
         * Make a function passing through the points.
         * The points must be sorted in increasing x.
         * ```
         * functionize([[0,0],[1,2]]) // like x=>2*x within 0<x<1
         * ```
         */
        static functionize(points: Point2D[]): (x: number) => number;
    }
    global {
        var differentiate: typeof Host.differentiate;
        var integrate: typeof Host.integrate;
        var functionize: typeof Host.functionize;
    }
}
declare module "Math/Algebra/Circle" {
    export class Host {
        /**
         * D,E,F of circle general form
         * ```
         * CircleGeneral([2,3],5) // [-4,-6,-12]
         * ```
         */
        static CircleGeneral(centre: Point2D, radius: number): [D: number, E: number, F: number];
        /**
         * Centre and radius from general form.
         * ```
         * CircleFromGeneral(-4,-6,-12) // [[2,3],5]
         * ```
         */
        static CircleFromGeneral(D: number, E: number, F: number): [Point2D, number];
        /**
         * Intersections between a circle and a straight line.
         * ```
         * CircleLinearIntersect([0,0],2**0.5,[1,-1,0]) // [[-1,-1],[1,1]]
         * ```
         */
        static CircleLinearIntersect(center: Point2D, radius: number, linear: [number, number, number]): [Point2D, Point2D];
        /**
         * Intersections between a circle and a straight line through `A` and `B`.
         * ```
         * CircleLineIntersect([0,0],2**0.5,[[0,0],[1,1]]) // [[-1,-1],[1,1]]
         * ```
         */
        static CircleLineIntersect(center: Point2D, radius: number, [A, B]: [Point2D, Point2D]): [Point2D, Point2D];
    }
    global {
        var CircleGeneral: typeof Host.CircleGeneral;
        var CircleFromGeneral: typeof Host.CircleFromGeneral;
        var CircleLinearIntersect: typeof Host.CircleLinearIntersect;
        var CircleLineIntersect: typeof Host.CircleLineIntersect;
    }
}
declare module "Math/Algebra/Linear" {
    export class Host {
        /**
         * [x-int,y-int,slope] of ax+by+c=0
         * ```
         * LineFeat(2,4,6) // [-0.5,-1.5,-3]
         * LineFeat(0,4,6) // throw
         * ```
         */
        static LineFeat(a: number, b: number, c: number): [slope: number, yInt: number, xInt: number];
        /**
         * the coeff [a,b,c] in ax+by+c=0 from given intercepts
         * ```
         * LinearFromIntercepts(1,2) // [2,1,-2]
         * LinearFromIntercepts(0,2) // throw
         * ```
         */
        static LinearFromIntercepts(xInt: number, yInt: number): [a: number, b: number, c: number];
        /**
         * the coeff [a,b,c] in ax+by+c=0 from two given points
         * ```
         * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
         * LinearFromTwoPoints([1,2],[1,2]) // throw
         * ```
         */
        static LinearFromTwoPoints(point1: Point2D, point2: Point2D): [a: number, b: number, c: number];
        /**
         * the coeff [a,b,c] in ax+by+c=0 from point and slope
         * ```
         * LinearFromPointSlope([1,2],3) // [3,-1,-1]
         * LinearFromPointSlope([1,2],0) // [0,1,-2]
         * ```
         */
        static LinearFromPointSlope(point: Point2D, slope: number): [a: number, b: number, c: number];
        /**
         * the coeff [a,b,c] in ax+by+c=0 from perpendicular bisector of AB
         * ```
         * LinearFromBisector([1,2],[3,4]) // [1,1,-5]
         * LinearFromBisector([1,2],[1,4]) // [0,1,-3]
         * ```
         */
        static LinearFromBisector(A: Point2D, B: Point2D): [a: number, b: number, c: number];
        /**
         * [slope,yInt] from given intercepts
         * ```
         * LineFromIntercepts(1,2) // [-2,2]
         * LineFromIntercepts(0,2) // throw
         * ```
         */
        static LineFromIntercepts(xInt: number, yInt: number): [slope: number, yInt: number];
        /**
         * [slope,yInt] from two given points
         * ```
         * LineFromTwoPoints([1,2],[3,4]) // [1,1]
         * LineFromTwoPoints([1,2],[1,2]) // throw
         * ```
         */
        static LineFromTwoPoints(point1: Point2D, point2: Point2D): [slope: number, yInt: number];
        /**
         * [slope,yInt] from point and slope
         * ```
         * LineFromPointSlope([1,2],3) // [3,-1]
         * LineFromPointSlope([1,2],0) // [0,2]
         * ```
         */
        static LineFromPointSlope(point: Point2D, slope: number): [slope: number, yInt: number];
        /**
         * [slope,yInt] from perpendicular bisector of AB
         * ```
         * LineFromBisector([1,2],[3,4]) // [-1,5]
         * LineFromBisector([1,2],[1,4]) // [0,3]
         * ```
         */
        static LineFromBisector(A: Point2D, B: Point2D): [slope: number, yInt: number];
    }
    global {
        var LineFeat: typeof Host.LineFeat;
        var LinearFromIntercepts: typeof Host.LinearFromIntercepts;
        var LinearFromTwoPoints: typeof Host.LinearFromTwoPoints;
        var LinearFromPointSlope: typeof Host.LinearFromPointSlope;
        var LinearFromBisector: typeof Host.LinearFromBisector;
        var LineFromIntercepts: typeof Host.LineFromIntercepts;
        var LineFromTwoPoints: typeof Host.LineFromTwoPoints;
        var LineFromPointSlope: typeof Host.LineFromPointSlope;
        var LineFromBisector: typeof Host.LineFromBisector;
    }
}
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
declare module "Math/Algebra/Quadratic" {
    export class Host {
        /**
         * the discriminant b^2-4ac.
         * ```
         * Discriminant(2,3,4) // -23
         * ```
         */
        static Discriminant(a: number, b: number, c: number): number;
        /**
         * the roots [p,q] of ax^2+bx+c=0 where p<=q
         * ```
         * QuadraticRoot(1,2,-3) // [-3,1]
         * QuadraticRoot(1,2,3) // throw when no real root
         * ```
         */
        static QuadraticRoot(a: number, b: number, c: number): [number, number];
        /**
         * the vertex [h,k] of y=ax^2+bx+c.
         * ```
         * QuadraticVertex(1,2,3) // [-1,2]
         * ```
         */
        static QuadraticVertex(a: number, b: number, c: number): Point2D;
        /**
         * the quadratic coeff [a,b,c] from given a and roots p and q.
         * ```
         * QuadraticFromRoot(1,2,3) // [1,-5,6]
         * ```
         */
        static QuadraticFromRoot(a: number, p: number, q: number): Quadratic;
        /**
         * the quadratic coeff [a,b,c] from given a and vertex (h,k).
         * ```
         * QuadraticFromVertex(1,2,3) // [1,-4,7]
         * ```
         */
        static QuadraticFromVertex(a: number, h: number, k: number): Quadratic;
    }
    global {
        var Discriminant: typeof Host.Discriminant;
        var QuadraticRoot: typeof Host.QuadraticRoot;
        var QuadraticVertex: typeof Host.QuadraticVertex;
        var QuadraticFromRoot: typeof Host.QuadraticFromRoot;
        var QuadraticFromVertex: typeof Host.QuadraticFromVertex;
    }
}
declare function testAssertion(func: (..._: any[]) => boolean, truthy: any[], falsy: any[], withTrash?: boolean): void;
declare module "Math/Code/Assertion" {
    export class Host {
        /**
         * check is a finite number.
         * ```
         * IsNum(1.23) // true
         * IsNum(NaN) // false
         * IsNum(Infinity) // false
         * IsNum('2') // false
         * ```
         */
        static IsNum(...items: any[]): boolean;
        /**
         * check is an integer.
         * ```
         * IsInteger(5) // true
         * IsInteger(0.5) // false
         * ```
         */
        static IsInteger(...items: any[]): boolean;
        /**
         * check is a decimal (non-integer).
         * ```
         * IsDecimal(0.5) // true
         * IsDecimal(5) // false
         * ```
         */
        static IsDecimal(...items: any[]): boolean;
        /**
         * check is a terminating decimal (or integer)
         * ```
         * IsTerminating(1/4) // true
         * IsTerminating(5) // false
         * ```
         */
        static IsTerminating(...items: any[]): boolean;
        /**
         * check is a rational number with denominator <= 1000.
         * ```
         * IsRational(0.5) // true
         * IsRational(-5) // true
         * IsRational(Math.sqrt(2)) // false
         * ```
         */
        static IsRational(...items: any[]): boolean;
        /**
         * check is an odd integer.
         * ```
         * IsOdd(5) // true
         * IsOdd(-5) // true
         * IsOdd(4) // false
         * ```
         */
        static IsOdd(...items: any[]): boolean;
        /**
         * check is an even integer.
         * ```
         * IsEven(4) // true
         * IsEven(-4) // true
         * IsEven(0) // true
         * IsEven(5) // false
         * ```
         */
        static IsEven(...items: any[]): boolean;
        /**
         * check is in range [0,1].
         * ```
         * IsProbability(0) // true
         * IsProbability(0.5467) // true
         * IsProbability(1.1) // false
         * IsProbability(-0.1) // false
         * ```
         */
        static IsProbability(...items: any[]): boolean;
        /**
         * check is a square number.
         * ```
         * IsSquareNum(9) // true
         * IsSquareNum(10) // false
         * IsSquareNum(-9) // false
         * ```
         */
        static IsSquareNum(...items: any[]): boolean;
        /**
         * check is positive.
         * ```
         * IsPositive(2) // true
         * IsPositive(0) // false
         * IsPositive(-2) // false
         * ```
         */
        static IsPositive(...items: any[]): boolean;
        /**
         * check is non-negative.
         * ```
         * IsNonNegative(2) // true
         * IsNonNegative(0) // true
         * IsNonNegative(-2) // false
         * IsNonNegative(1.5) // true
         * ```
         */
        static IsNonNegative(...items: any[]): boolean;
        /**
         * check is a positive integer.
         * ```
         * IsPositiveInteger(2) // true
         * IsPositiveInteger(0) // false
         * IsPositiveInteger(-2) // false
         * IsPositiveInteger(1.5) // false
         * ```
         */
        static IsPositiveInteger(...items: any[]): boolean;
        /**
         * check is a non-negative integer.
         * ```
         * IsNonNegativeInteger(2) // true
         * IsNonNegativeInteger(0) // true
         * IsNonNegativeInteger(-2) // false
         * IsNonNegativeInteger(1.5) // false
         * ```
         */
        static IsNonNegativeInteger(...items: any[]): boolean;
        /**
         * check is negative.
         * ```
         * IsNegative(-2) // true
         * IsNegative(0) // false
         * IsNegative(2) // false
         * ```
         */
        static IsNegative(...items: any[]): boolean;
        /**
         * check is non-zero finite number.
         * ```
         * IsNonZero(2) // true
         * IsNonZero(0) // false
         * IsNonZero(-2) // true
         * ```
         */
        static IsNonZero(...items: any[]): boolean;
        /**
         * check is between min and max inclusive.
         * ```
         * IsBetween(2,5)(3) // true
         * IsBetween(2,5)(2) // true
         * IsBetween(2,5)(1) // false
         * ```
         */
        static IsBetween(min: number, max: number): (...items: any[]) => boolean;
        /**
         * check if its abs is between min and max inclusive.
         * ```
         * IsAbsBetween(2,5)(-3) // true
         * IsAbsBetween(2,5)(-2) // true
         * IsAbsBetween(2,5)(1) // false
         * ```
         */
        static IsAbsBetween(min: number, max: number): (...items: any[]) => boolean;
        /**
         * Check if the points are chessboard around anchor.
         * ```
         * IsAroundPoint([0,0],2)([2,2]) // true
         * IsAroundPoint([0,0],2)([3,0]) // false
         * ```
         */
        static IsAroundPoint(anchor: Point2D, range: number): (...points: Point2D[]) => boolean;
        /**
         * Check if the array of legnths can form a triangle
         * ```
         * IsTriangle([1,1,1]) // true
         * IsTriangle([6,7,8]) // true
         * IsTriangle([1,2,3]) // false
         * IsTriangle([6,14,8]) // false
         * ```
         */
        static IsTriangle(...triangles: [number, number, number][]): boolean;
    }
    global {
        var IsNum: typeof Host.IsNum;
        var IsInteger: typeof Host.IsInteger;
        var IsDecimal: typeof Host.IsDecimal;
        var IsTerminating: typeof Host.IsTerminating;
        var IsRational: typeof Host.IsRational;
        var IsOdd: typeof Host.IsOdd;
        var IsEven: typeof Host.IsEven;
        var IsProbability: typeof Host.IsProbability;
        var IsSquareNum: typeof Host.IsSquareNum;
        var IsPositive: typeof Host.IsPositive;
        var IsNonNegative: typeof Host.IsNonNegative;
        var IsPositiveInteger: typeof Host.IsPositiveInteger;
        var IsNonNegativeInteger: typeof Host.IsNonNegativeInteger;
        var IsNegative: typeof Host.IsNegative;
        var IsNonZero: typeof Host.IsNonZero;
        var IsBetween: typeof Host.IsBetween;
        var IsAbsBetween: typeof Host.IsAbsBetween;
        var IsAroundPoint: typeof Host.IsAroundPoint;
        var IsTriangle: typeof Host.IsTriangle;
    }
}
declare module "Math/Code/Combinatorics" {
    export class Host {
        /**
         * the factorial n!
         * ```
         * Factorial(5) // 120
         * Factorial(1.5) // throw
         * ```
         */
        static Factorial(n: number): number;
        /**
         * nCr
         * ```
         * nCr(5,3) // 10
         * ```
         */
        static nCr(n: number, r: number): number;
        /**
         * nPr
         * ```
         * nPr(5,3) // 60
         * ```
         */
        static nPr(n: number, r: number): number;
    }
    global {
        var Factorial: typeof Host.Factorial;
        var nCr: typeof Host.nCr;
        var nPr: typeof Host.nPr;
    }
}
declare module "Math/Code/Function" {
    export class Host {
        /**
         * log(b,N)
         * ```
         * log(2,8) // 3
         * ```
         */
        static log(b: number, N: number): number;
        /**
         * @deprecated
         * @ignore
         * a**b, a to the power of b.
         * ```
         * Power(2,3) // 8
         * ```
         */
        static Power(a: number, b: number): number;
        /**
         * square root of x
         * ```
         * Sqrt(4) // 2
         * ```
         */
        static Sqrt(x: number): number;
        /**
         * the radian of the degree
         * ```
         * Radian(180) // pi
         * Radian(90) // pi/2
         * Radian(30) // PI/6
         * ```
         */
        static Radian(degree: number): number;
        /**
         * the degree of the radian
         * ```
         * Degree(Math.PI) // 180
         * Degree(Math.PI/2) // 90
         * Degree(Math.PI/6) // 30
         * ```
         */
        static Degree(radian: number): number;
        /**
         * sin(x).
         * ```
         * sin(30) // 0.5
         * ```
         */
        static sin(x: number): number;
        /**
         * cos(x).
         * ```
         * cos(60) // 0.5
         * ```
         */
        static cos(x: number): number;
        /**
         * tan(x).
         * ```
         * tan(45) // 1
         * ```
         */
        static tan(x: number): number;
        /**
         * arcsin(x) between -90 and 90.
         * ```
         * arcsin(0.5) // 30
         * ```
         */
        static arcsin(x: number): number;
        /**
         * arccos(x) between 0 and 180.
         * ```
         * arccos(0.5) // 60
         * ```
         */
        static arccos(x: number): number;
        /**
         * arctan(x) between -90 and 90.
         * ```
         * arctan(1) // 45
         * ```
         */
        static arctan(x: number): number;
    }
    global {
        var log: typeof Host.log;
        var Power: typeof Host.Power;
        var Sqrt: typeof Host.Sqrt;
        var Radian: typeof Host.Radian;
        var Degree: typeof Host.Degree;
        var sin: typeof Host.sin;
        var cos: typeof Host.cos;
        var tan: typeof Host.tan;
        var arcsin: typeof Host.arcsin;
        var arccos: typeof Host.arccos;
        var arctan: typeof Host.arctan;
    }
}
declare module "Math/Code/Geometry.test" { }
declare module "Math/Code/Geometry" {
    export class Host {
        /**
         * the slope of AB
         * ```
         * Slope([0,0],[1,2]) // 2
         * Slope([1,2],[1,2]) // NaN
         * ```
         */
        static Slope(A: Point2D, B: Point2D): number;
        /**
         * the slope perpendicular to AB
         * ```
         * SlopePd([0,0],[1,2]) // -0.5
         * SlopePd([1,2],[1,2]) // NaN
         * ```
         */
        static SlopePd(A: Point2D, B: Point2D): number;
        /**
         * the distance AB
         * ```
         * Distance([0,0],[1,2]) // 2.23606797749979
         * ```
         */
        static Distance(A: Point2D, B: Point2D): number;
        /**
         * the chessboard distance AB, max(horizontal,vertical)
         * ```
         * ChessboardDistance([0,0],[1,2]) // 2
         * ChessboardDistance([0,0],[3,2]) // 3
         * ```
         */
        static ChessboardDistance(A: Point2D, B: Point2D): number;
        /**
         * the mid-pt / centroid of `points`
         * ```
         * Mid([1,2],[3,4]) // [2,3]
         * Mid([1,2],[3,4],[5,6]) // [3,4]
         * ```
         */
        static Mid(...points: Point2D[]): Point2D;
        /**
         * the point X on dir or segment PQ such that PX : QX = ratioA : ratioB
         * ```
         * Slide([1,0],[5,0],0.75) // [4,0]
         * Slide([1,0],[5,0],3,1) // [4,0]
         * Slide([0,1],[[0,0],[1,0]],1) // [1,1]
         * Slide([0,1],[[0,0],[1,0]],2) // [2,1]
         * ```
         */
        static Slide(P: Point2D, dir: Point2D | [Point2D, Point2D], ratioA?: number, ratioB?: number): Point2D;
        /**
         * point P rotated anticlockwise by angle q about point O.
         * ```
         * Rotate([1,2],90,[0,0]) // [-2,1]
         * ```
         */
        static Rotate(P: Point2D, q: number, O?: Point2D): Point2D;
        /**
         * the polar angle of B if A is the origin within [0,360].
         * ```
         * Dir([1,0],[3,2]) // 45
         * Dir([3,2],[1,0]) // 225
         * ```
         */
        static Dir(A: Point2D, B: Point2D): number;
        /**
         * the foot of perpendicular from P to AB.
         * ```
         * PdFoot([-2,2],[[-1,-1],[1,1]]) // [0,0]
         * ```
         */
        static PdFoot(P: Point2D, [A, B]: [Point2D, Point2D | number]): Point2D;
        /**
         * the intersection point of AB and CD.
         * ```
         * Intersection([0,0],[2,2],[2,0],[0,2]) // [1,1]
         * ```
         */
        static Intersection(A: Point2D, B: Point2D, C: Point2D, D: Point2D): Point2D;
        /**
         * Translate point P in the direction `dir` by a `distance`.
         * @param dir - a polar angle, or two points [A,B] representing Dir(A,B), or one point A representing Dir(P,A)
         * ```
         * Move([1,2],90,3) // [1,5]
         * Move([1,2],[2, 2],3) // [4,2]
         * Move([1,2],[[0,0],[1,0]],3) // [4,2]
         * ```
         */
        static Move(P: Point2D, dir: number | Point2D | [Point2D, Point2D], distance: number): Point2D;
        /**
         * Translate point P to the right by a distance.
         * ```
         * MoveX([1,2],3) // [4,2]
         * MoveX([1,2],-3) // [-2,2]
         * ```
         */
        static MoveX(P: Point2D, distance: number): Point2D;
        /**
         * Translate point P upward by a distance.
         * ```
         * MoveY([1,2],3) // [4,2]
         * MoveY([1,2],-3) // [-2,2]
         * ```
         */
        static MoveY(P: Point2D, distance: number): Point2D;
        /**
         * Reflect point P about x-axis
         * ```
         * ReflectX([1,2]) // [1,-2]
         * ReflectX([1,-2]) // [1,2]
         * ```
         */
        static ReflectX(P: Point2D): Point2D;
        /**
         * Reflect point P about y-axis
         * ```
         * ReflectY([1,2]) // [-1,2]
         * ReflectY([-1,2]) // [1,2]
         * ```
         */
        static ReflectY(P: Point2D): Point2D;
        /**
         * angle of intersection between two slopes
         * ```
         * IntersectAngle(0,1) // 45
         * IntersectAngle(1,-1) // 90
         * ```
         */
        static IntersectAngle(slope1: number, slope2: number): number;
        /**
         * angle AOB, non-reflex
         * ```
         * Angle([1,0],[0,0],[0,2]) // 90
         * Angle([2,2],[1,1],[1,3]) // 45
         * Angle([1,3],[1,1],[2,2]) // 45
         * ```
         */
        static Angle(A: Point2D, O: Point2D, B: Point2D): number;
        /**
         * angle AOB, measured anticlockwise
         * ```
         * AnglePolar([1,0],[0,0],[0,2]) // 90
         * AnglePolar([2,2],[1,1],[1,3]) // 45
         * AnglePolar([1,3],[1,1],[2,2]) // 315
         * ```
         */
        static AnglePolar(A: Point2D, O: Point2D, B: Point2D): number;
        /**
         * check if the polar angle AOB is reflex
         * ```
         * IsReflex([1,0],[0,0],[0,2]) // false
         * IsReflex([2,2],[1,1],[1,3]) // false
         * IsReflex([1,3],[1,1],[2,2]) // true
         * ```
         */
        static IsReflex(A: Point2D, O: Point2D, B: Point2D): boolean;
        /**
         * points on a regular polygon
         * ```
         * RegularPolygon(4,[0,0],1,0) // [[1,0],[0,1],[-1,0],[0,-1]]
         * ```
         */
        static RegularPolygon(n: number, center: Point2D, radius: number, startAngle: number): Point2D[];
        /**
         * arc length with given radius and angle
         * ```
         * ArcLength(2,90) // pi
         * ArcLength(2,180) // 2*pi
         * ```
         */
        static ArcLength(radius: number, theta: number): number;
        /**
         * sector area with given radius and angle
         * ```
         * SectorArea(2,90) // pi
         * SectorArea(2,180) // 2*pi
         * ```
         */
        static SectorArea(radius: number, theta: number): number;
        /**
         * check is convex polygon
         * ```
         * IsConvexPolygon([0,0],[1,0],[0,1]) // true
         * IsConvexPolygon([0,0],[3,0],[1,1],[0,3]) // false
         * ```
         */
        static IsConvexPolygon(...points: Point2D[]): boolean;
        /**
         * Arrange Points in anti-clockwise direction around their mean
         * ```
         * ArrangePoints([0,0],[1,1],[0,1],[1,0]) // [[1, 0],[0, 0],[0, 1],[1, 1]]
         * ArrangePoints([0,0],[1,2],[2,1],[0,1],[1,0])// [[1, 0],[0, 0],[0, 1],[1, 2],[2, 1]]
         * ```
         */
        static ArrangePoints(...points: Point2D[]): Point2D[];
        /**
         * a point with polar coordinates (1, `angle`).
         * ```
         * OnCircle(0) // [1,0]
         * OnCircle(90) // [0,1]
         * ```
         */
        static OnCircle(angle: number): Point2D;
    }
    global {
        var Slope: typeof Host.Slope;
        var SlopePd: typeof Host.SlopePd;
        var Distance: typeof Host.Distance;
        var ChessboardDistance: typeof Host.ChessboardDistance;
        var Mid: typeof Host.Mid;
        var Slide: typeof Host.Slide;
        var Rotate: typeof Host.Rotate;
        var Dir: typeof Host.Dir;
        var PdFoot: typeof Host.PdFoot;
        var Intersection: typeof Host.Intersection;
        var Move: typeof Host.Move;
        var MoveX: typeof Host.MoveX;
        var MoveY: typeof Host.MoveY;
        var ReflectX: typeof Host.ReflectX;
        var ReflectY: typeof Host.ReflectY;
        var IntersectAngle: typeof Host.IntersectAngle;
        var Angle: typeof Host.Angle;
        var AnglePolar: typeof Host.AnglePolar;
        var IsReflex: typeof Host.IsReflex;
        var RegularPolygon: typeof Host.RegularPolygon;
        var ArcLength: typeof Host.ArcLength;
        var SectorArea: typeof Host.SectorArea;
        var IsConvexPolygon: typeof Host.IsConvexPolygon;
        var ArrangePoints: typeof Host.ArrangePoints;
        var OnCircle: typeof Host.OnCircle;
    }
}
declare module "Math/Code/Latex" {
    export class Host {
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
        static StemAndLeaf({ data, labels, stem, leaf, }: {
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
        static Table({ content, columns, rows, stretch, }: {
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
        static FreqTable({ data, dataLabel, freqLabel, min, max, }: {
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
         *   intervalSample: [1, 5]
         * })
         * ```
         */
        static GroupFreqTable({ data, dataLabel, freqLabel, intervalSample, }: {
            data: number[];
            dataLabel: string;
            freqLabel: string;
            intervalSample: [number, number];
        }): string;
        /**
         * Print a grouped frequency table in latex.
         * ```
         * GroupCumFreqTable({
         *   data: [1, 1, 4, 4, 3, 3, 3, 7, 8, 9],
         *   dataLabel: '$x',
         *   freqLabel: 'count'
         *   intervalSample: [1, 5]
         * })
         * ```
         */
        static GroupCumFreqTable({ data, dataLabel, freqLabel, intervalSample, }: {
            data: number[];
            dataLabel: string;
            freqLabel: string;
            intervalSample: [number, number];
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
        static PairTable<R, C>({ rowTitle, colTitle, rows, cols, cell, }: {
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
        static CheckVertices({ constraints, field, label, }: {
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
        static ShortDivision({ numbers, mode, }: {
            numbers: number[];
            mode?: 'HCF' | 'LCM';
        }): string;
    }
    global {
        var StemAndLeaf: typeof Host.StemAndLeaf;
        var Table: typeof Host.Table;
        var FreqTable: typeof Host.FreqTable;
        var GroupFreqTable: typeof Host.GroupFreqTable;
        var GroupCumFreqTable: typeof Host.GroupCumFreqTable;
        var PairTable: typeof Host.PairTable;
        var CheckVertices: typeof Host.CheckVertices;
        var ShortDivision: typeof Host.ShortDivision;
    }
}
declare module "Math/Code/LinearProgram" {
    export class Host {
        /**
         * the value of field at given point
         * ```
         * FieldAt([0,0],[1,2,3]) // 3
         * FieldAt([1,2],[3,-4,5]) // 0
         * ```
         */
        static FieldAt(point: Point2D, field: Field): number;
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
        static isConstrained(cons: Constraint[], point: Point2D): boolean;
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
        static isLooseConstrained(cons: Constraint[], point: Point2D): boolean;
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
        static FeasiblePolygon(...cons: Constraint[]): [number, number][];
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
        static FeasibleVertices(...cons: Constraint[]): [number, number][];
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
        static FeasibleIsBounded(...cons: Constraint[]): boolean;
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
        static FeasibleIntegral(...cons: Constraint[]): Point2D[];
        /**
         * the point with the max value of field
         * ```
         * MaximizePoint([[0,0],[10,10]],[1,2,3]) // [10,10]
         * ```
         */
        static MaximizePoint(points: Point2D[], field: Field): Point2D;
        /**
         * the point with the min value of field
         * ```
         * MinimizePoint([[0,0],[10,10]],[1,2,3]) // [0,0]
         * ```
         */
        static MinimizePoint(points: Point2D[], field: Field): Point2D;
        /**
         * the point with the min/max value of field
         * ```
         * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [10,10]
         * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [0,0]
         * ```
         */
        static OptimizePoint(points: Point2D[], field: Field, max: boolean): Point2D;
        /**
         * the max value of field
         * ```
         * MaximizeField([[0,0],[10,10]],[1,2,3]) // 33
         * ```
         */
        static MaximizeField(points: Point2D[], field: Field): number;
        /**
         * the min value of field
         * ```
         * MinimizeField([[0,0],[10,10]],[1,2,3]) // 3
         * ```
         */
        static MinimizeField(points: Point2D[], field: Field): number;
        /**
         * the min/max value of field
         * ```
         * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 33
         * OptimizeField([[0,0],[10,10]],[1,2,3],false) // 3
         * ```
         */
        static OptimizeField(points: Point2D[], field: Field, max: boolean): number;
        /**
         * the constraints from the given points
         * ```
         * ConstraintsFromPoints([0,0],[0,1],[1,0]) // [[0,1,'\\ge',-0],[1,0,'\\ge',-0],[1,1,'\\le',1]]
         * ConstraintsFromPoints([0,0],[3,-1],[2,2],[1,3],[-2,2])
         * // [[[1, 3, "\\ge", -0],[1, 1, "\\ge", -0],[1, -3, "\\ge", -8],[1, 1, "\\le", 4],[3, 1, "\\le", 8]]]
         * ConstraintsFromPoints([0,0],[1,2],[2,1],[0,1],[1,0]) // [[0, 1, "\\ge", -0],[1, 0, "\\ge", -0],[1, -1, "\\ge", -1],[1, 1, "\\le", 3],[1, -1, "\\le", 1]]
         * ```
         */
        static ConstraintsFromPoints(...points: Point2D[]): Constraint[];
    }
    global {
        var FieldAt: typeof Host.FieldAt;
        var isConstrained: typeof Host.isConstrained;
        var isLooseConstrained: typeof Host.isLooseConstrained;
        var FeasiblePolygon: typeof Host.FeasiblePolygon;
        var FeasibleVertices: typeof Host.FeasibleVertices;
        var FeasibleIsBounded: typeof Host.FeasibleIsBounded;
        var FeasibleIntegral: typeof Host.FeasibleIntegral;
        var MaximizePoint: typeof Host.MaximizePoint;
        var MinimizePoint: typeof Host.MinimizePoint;
        var OptimizePoint: typeof Host.OptimizePoint;
        var MaximizeField: typeof Host.MaximizeField;
        var MinimizeField: typeof Host.MinimizeField;
        var OptimizeField: typeof Host.OptimizeField;
        var ConstraintsFromPoints: typeof Host.ConstraintsFromPoints;
    }
}
declare module "Math/Code/Numeracy" {
    export class Host {
        /**
         * division with x/0 handling
         * ```
         * Divide(6,2) // 3
         * Divide(6,0) // throw
         * ```
         */
        static Divide(dividend: number, divisor: number): number;
        /**
         * the absolute value. Equivalent to Math.abs(x).
         * ```
         * Abs(-2) // 2
         * ```
         */
        static Abs(num: number): number;
        /**
         * the sign of the number as 1,0 or -1.
         * ```
         * Sign(3) // 1
         * Sign(-4.5) // -1
         * Sign(0) // 0
         * ```
         */
        static Sign(num: number): -1 | 0 | 1;
        /**
         * @deprecated
         * the sign of the number as 1,0 or -1.
         * ```
         * SigFig(123.45) // 5
         * ```
         */
        static SigFig(num: number): number;
        /**
         * the number rounded off to given sigfig.
         * ```
         * Round(1.23456,3) // 1.23
         * Round(1.23567,3) // 1.24
         * ```
         */
        static Round(num: number, sigfig?: number): number;
        /**
         * the number rounded up to given sigfig.
         * ```
         * RoundUp(1.23456,3) // 1.23
         * RoundUp(1.23567,1) // 2
         * ```
         */
        static RoundUp(num: number, sigfig?: number): number;
        /**
         * the number rounded down to given sigfig.
         * ```
         * RoundDown(1.23456,5) // 1.2345
         * RoundDown(1.6789,1) // 1
         * ```
         */
        static RoundDown(num: number, sigfig?: number): number;
        /**
         * the number rounded off to given decimal place.
         * ```
         * Fix(12345.678) // round to integer by default, return 12346
         * Fix(12345.678,0) // round to integer, return 12346
         * Fix(12345.678,2) // round to 2 dp, return 12345.68
         * Fix(12345.678,-2) // round to hundred, return 12300
         * ```
         */
        static Fix(num: number, dp?: number): number;
        /**
         * the number rounded up to given decimal place.
         * ```
         * FixUp(12.34) // round to integer by default, return 13
         * FixUp(12.34,0) // round to integer, return 13
         * FixUp(12.34,1) // round to 1 dp, return 12.4
         * FixUp(12.34,-1) // round to ten, return 20
         * ```
         */
        static FixUp(num: number, dp?: number): number;
        /**
         * the number rounded down to given decimal place.
         * ```
         * FixDown(17.89) // round to integer by default, return 17
         * FixDown(17.89,0) // round to integer, return 17
         * FixDown(17.89,1) // round to 1 dp, return 17.8
         * FixDown(17.89,-1) // round to ten, return 10
         * ```
         */
        static FixDown(num: number, dp?: number): number;
        /**
         * the ceiling integer of the number.
         * ```
         * Ceil(1.1) // 2
         * Ceil(-1.1) // -1
         * Ceil(2) // 2
         * Ceil(3,5,1) // Ceil 3 to [1,6,11,...], return 6
         * ```
         */
        static Ceil(num: number, interval?: number, offset?: number): number;
        /**
         * the floor integer of the number.
         * ```
         * Floor(1.9) // 1
         * Floor(-1.9) // -2
         * Floor(2)) // 2
         * Floor(3,5,1) // Floor 3 to [1,6,11,...], return 1
         * ```
         */
        static Floor(num: number, interval?: number, offset?: number): number;
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
        static Ratio(...nums: number[]): number[];
        /**
         * scale `nums` so that their sum becomes `total`.
         * ```
         * ScaleTo([1,2,3], 60) // [10,20,30]
         * ```
         */
        static ScaleTo(nums: number[], total: number): number[];
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
        static HCF(...nums: number[]): number;
        /**
         * The LCM of nums.
         * ```
         * LCM(2,3) // 6
         * LCM(2,3,5) // 30
         * LCM(0.5,3) // throw
         * LCM(0,3) // throw
         * ```
         */
        static LCM(...nums: number[]): number;
        /**
         * The prime factors of `num`.
         * ```
         * PrimeFactors(12) // [2,2,3]
         * ```
         */
        static PrimeFactors(num: number): number[];
        /**
         * convert num to fraction
         * ```
         * ToFrac(0.5) // [1,2]
         * ToFrac(-456/123) // [-152,41]
         * ```
         */
        static ToFrac(num: number): Fraction;
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
        static Partition(n: number, length?: number, allowZero?: boolean): number[][];
    }
    global {
        var Divide: typeof Host.Divide;
        var Abs: typeof Host.Abs;
        var Sign: typeof Host.Sign;
        var SigFig: typeof Host.SigFig;
        var Round: typeof Host.Round;
        var RoundUp: typeof Host.RoundUp;
        var RoundDown: typeof Host.RoundDown;
        var Fix: typeof Host.Fix;
        var FixUp: typeof Host.FixUp;
        var FixDown: typeof Host.FixDown;
        var Ceil: typeof Host.Ceil;
        var Floor: typeof Host.Floor;
        var Ratio: typeof Host.Ratio;
        var ScaleTo: typeof Host.ScaleTo;
        var HCF: typeof Host.HCF;
        var LCM: typeof Host.LCM;
        var PrimeFactors: typeof Host.PrimeFactors;
        var ToFrac: typeof Host.ToFrac;
        var Partition: typeof Host.Partition;
    }
}
declare module "Math/Code/PhyConst" {
    var PhyConstObj: {
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
    global {
        var PhyConst: typeof PhyConstObj;
    }
    export {};
}
declare module "Math/Code/PhyEq" {
    type eq = [func: zeroFunction, latex: string];
    export class PhyEqCls {
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
    global {
        var PhyEq: PhyEqCls;
    }
}
declare module "Math/Code/Random.test" { }
declare module "Math/Code/Random" {
    export class Host {
        /**
         * a random integer in [min, max] inclusive.
         * ```
         * RndN(2,5) // may return 2, 3, 4 or 5
         * ```
         */
        static RndN(min: number, max: number): number;
        /**
         * an array of n unique random integer in [min, max] inclusive.
         * ```
         * RndNs(2,8,3) // may return [5,3,7]
         * ```
         */
        static RndNs(min: number, max: number, n?: number): number[];
        /**
         * an array of n unique random integer in [min, max] inclusive, sorted in ascending order.
         * ```
         * RndAscNs(2,8,3) // may return [3,5,7]
         * ```
         */
        static RndAscNs(min: number, max: number, n?: number): number[];
        /**
         * a random real number in [min, max] inclusive
         * ```
         * RndR(1,2) // may return 1.242574363
         * ```
         */
        static RndR(min: number, max: number): number;
        /**
         * an array of n unique random real number in [min, max] inclusive.
         * ```
         * RndRs(2,8,3) // may return [5.5315,3.653456,7.542345]
         * ```
         */
        static RndRs(min: number, max: number, n?: number): number[];
        /**
         * a random fraction (non-integer) with largest numerator / denominator, within range inclusive.
         * ```
         * RndQ(9,[2,9]) // may return 7/2
         * RndQ(-9,[-9,9]) // may return 7/2 or -7/2, i.e. can be +ve or -ve
         * ```
         */
        static RndQ(largest?: number, range?: interval): number;
        /**
         * an array of n unique random fractions (non-integer) .
         * ```
         * RndQs(9,[2,9],3) // may return [5/2,7/3,9/2]
         * ```
         */
        static RndQs(largest?: number, range?: interval, n?: number): number[];
        /**
         * 1 or -1
         * ```
         * RndU() // may return 1 or -1
         * ```
         */
        static RndU(): 1 | -1;
        /**
         * true or false.
         * ```
         * RndT() // may return true or false
         * ```
         */
        static RndT(): boolean;
        /**
         * a random integer in [min, max] or [-max, -min] inclusive.
         * ```
         * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
         * ```
         */
        static RndZ(min: number, max: number): number;
        /**
         * @param n - default to 10
         * an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive.
         * ```
         * RndZs(2,8,3) // may return [5,-3,7]
         * ```
         */
        static RndZs(min: number, max: number, n?: number): number[];
        /**
         * @param n - default to 10
         * an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive, sorted in ascending order.
         * ```
         * RndAscZs(2,8,3) // may return [-3,5,7]
         * ```
         */
        static RndAscZs(min: number, max: number, n?: number): number[];
        /**
         * a random prime number less than or equal to max.
         * ```
         * RndP(10) // may return 2, 3, 5 or 7
         * ```
         */
        static RndP(max: number): number;
        /**
         * a random odd integer in [min, max] inclusive
         * ```
         * RndOdd(3,8) // return 3, 5 or 7
         * ```
         */
        static RndOdd(min: number, max: number): number;
        /**
         * a random even integer in [min, max] inclusive
         * ```
         * RndEven(3,8) // return 4, 6 or 8
         * ```
         */
        static RndEven(min: number, max: number): number;
        /**
         * a random composite number built from `n` factors in `factors`.
         * ```
         * RndComposite([2,3,5],3) // return 2*2*2, 2*3*5, 2*3*3, ...
         * ```
         */
        static RndComposite(factors: number[], n: number): number;
        /**
         * an array of random polynomial coefficients
         * ```
         * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)]
         * ```
         */
        static RndPoly(...coeff: number[]): number[];
        /**
         * an array of a Pyth Triple
         * ```
         * RndPyth(10) // may return [3,4,5]
         * ```
         */
        static RndPyth(max?: number): [number, number, number];
        /**
         * a point within given range, x and y are distinct and non-zero
         * ```
         * RndPoint([1,4],[10,14]) // may return [2,12]
         * RndPoint(2,4) // equivalent to RndPoint([-2,2],[-4,4])
         * RndPoint(2) // equivalent to RndPoint([-2,2],[-2,2])
         * ```
         */
        static RndPoint(xRange: number | interval, yRange?: number | interval): Point2D;
        /**
         * n points within given range, no horizontal / vertical / collinear
         * ```
         * RndPoints([1,4],[10,14],3) // may return [[2,12],[3,11],[1,13]]
         * ```
         */
        static RndPoints(xRange: number | interval, yRange?: number | interval, n?: number): Point2D[];
        /**
         * n angles in [0,360] at least cyclic separated by separation
         * ```
         * RndAngles(3,50) // may return [30,90,200]
         * ```
         */
        static RndAngles(n: number, separation: number): number[];
        /**
         * `n` points on a unit circle at least cyclic separated by separation
         * ```
         * RndOnCircle(3,50) // may return [[1,0],[0,1],[-1,0]]]
         * ```
         */
        static RndOnCircle(n: number, separation: number): Point2D[];
        /**
         * n vertices of a convex polygon generated by rounding a cyclic polygon
         * ```
         * RndConvexPolygon(3,[0,0],10,50) // may return [[10,0],[-6,8],[0,-10]]
         * ```
         */
        static RndConvexPolygon(n: number, center: Point2D, radius: number, separation: number): Point2D[];
        /**
         * n integers from [min, max], must be uni-moded
         * ```
         * RndData(10,15,5) // may return [11,11,12,13,15]
         * ```
         */
        static RndData(min: number, max: number, n: number): number[];
        /**
         * 3 points forming a triangle, with min angle and length
         * ```
         * RndTriangle([0,5],[0,5],{minAngle:30,minLength:2})
         * ```
         */
        static RndTriangle(xRange: interval, yRange: interval, { minAngle, maxAngle, minLength, obtuse }?: {
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
        static RndTrigValue(func: TrigFunc, angle: number): TrigValue;
        /**
         * an array like ['sin',180,-1,'x'] representing sin(180-x), which is numerically equivalent to the input
         * ```
         * RndTrigEqv('sin','x') // RndPick(['sin',180,-1,'x'],['cos',90,-1,'x'],['cos',270,1,'x'])
         * ```
         */
        static RndTrigEqv(result: 'sin' | '-sin' | 'cos' | '-cos' | 'tan' | '-tan' | '1/tan' | '-1/tan', label: string): TrigExp;
        /**
         * a random point (in rect coord) at special polar angle and radius, whose rect coords must be in the form of a*sqrt(b).
         * ```
         * RndPointPolar()
         * // maybe [sqrt(3),3] representing polar [2*sqrt(3),60]
         * ```
         */
        static RndPointPolar(): Point2D;
        /**
         * a random ratio group in [min, max] inclusive.
         * ```
         * RndRatio(2,9,3) // may return [3,7,5]
         * ```
         */
        static RndRatio(min: number, max: number, n?: number): number[];
        /**
         * a random partition of integer `n`.
         * ```
         * RndPartition(4) // may return [1,2,1]
         * RndPartition(4, 2, false) // may return [3,1] or [2,2]
         * RndPartition(4, 2, true) // may return [4,0] or [3,1] or [2,2]
         * ```
         */
        static RndPartition(n: number, length?: number, allowZero?: boolean): number[];
    }
    global {
        var RndN: typeof Host.RndN;
        var RndNs: typeof Host.RndNs;
        var RndAscNs: typeof Host.RndAscNs;
        var RndR: typeof Host.RndR;
        var RndRs: typeof Host.RndRs;
        var RndQ: typeof Host.RndQ;
        var RndQs: typeof Host.RndQs;
        var RndU: typeof Host.RndU;
        var RndT: typeof Host.RndT;
        var RndZ: typeof Host.RndZ;
        var RndZs: typeof Host.RndZs;
        var RndAscZs: typeof Host.RndAscZs;
        var RndP: typeof Host.RndP;
        var RndOdd: typeof Host.RndOdd;
        var RndEven: typeof Host.RndEven;
        var RndComposite: typeof Host.RndComposite;
        var RndPoly: typeof Host.RndPoly;
        var RndPyth: typeof Host.RndPyth;
        var RndPoint: typeof Host.RndPoint;
        var RndPoints: typeof Host.RndPoints;
        var RndAngles: typeof Host.RndAngles;
        var RndOnCircle: typeof Host.RndOnCircle;
        var RndConvexPolygon: typeof Host.RndConvexPolygon;
        var RndData: typeof Host.RndData;
        var RndTriangle: typeof Host.RndTriangle;
        var RndTrigValue: typeof Host.RndTrigValue;
        var RndTrigEqv: typeof Host.RndTrigEqv;
        var RndPointPolar: typeof Host.RndPointPolar;
        var RndRatio: typeof Host.RndRatio;
        var RndPartition: typeof Host.RndPartition;
    }
}
declare module "Math/Code/RandomShake.test" { }
declare module "Math/Code/RandomShake" {
    export class Host {
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
        static RndShake(anchor: any): typeof anchor[];
        /**
         * 3 nearby same-signed integers, range = Max(5, anchor * 10%)
         * ```
         * RndShakeN(5) // return 3 unique integers from 1-10
         * ```
         */
        static RndShakeN(anchor: number): [number, number, number];
        /**
         * 3 nearby same-signed real number with same precision, range = anchor * 50%
         * ```
         * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
         * ```
         */
        static RndShakeR(anchor: number): number[];
        /**
         * 3 nearby same-sign rational by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
         * ```
         * RndShakeQ(5/6)
         * // return 3 unique fractions around [5,6]
         * RndShakeQ(6/-5)
         * // return 3 unique fractions around [6,-5]
         * ```
         */
        static RndShakeQ(anchor: number): number[];
        /**
         * 3 numbers by multiplying / dividing the `anchor` by the `base` a few times.
         * ```
         * RndShakeG(24,2) // any 3 of [6,12,48,96]
         * ```
         */
        static RndShakeG(anchor: number, base: number): number[];
        /**
         * an array of 3 ineq signs, balanced in number.
         * ```
         * RndShakeIneq('\\ge')
         * // may return ['\\ge','\\le','\\le']
         * ```
         */
        static RndShakeIneq(anchor: Ineq): Ineq[];
        /**
         * an array of 3 point, both x and y are unique
         * ```
         * RndShakePoint([3,4])
         * // may return [[2,5],[1,6],[4,2]]
         * ```
         */
        static RndShakePoint(anchor: Point2D): Point2D[];
        /**
         * an array of 3 combo
         * ```
         * RndShakeCombo([true,true,true])
         * // may return [[true,false,true],[false,true,false],[false,true,true]]
         * ```
         */
        static RndShakeCombo(anchor: [boolean, boolean, boolean]): [boolean, boolean, boolean][];
        /**
         * an array of 3 trig
         * ```
         * RndShakeTrig('sin')
         * // may return ['cos','sin','cos']
         * ```
         */
        static RndShakeTrig(anchor: TrigFunc): TrigFunc[];
        /**
         * an array of 3 TrigValue
         * ```
         * RndShakeTrigValue(['sin','x'])
         * // may return [['cos','x'],['sin','x'],['cos','x']]
         * ```
         */
        static RndShakeTrigValue(anchor: TrigValue): TrigValue[];
        /**
         * an array of 3 ratios
         * ```
         * RndShakeRatio([4,5,6])
         * // may return [[3,6,5],[7,5,3],[8,4,5]]
         * ```
         */
        static RndShakeRatio(anchor: number[]): number[][];
        /**
         * an array of 3 number in given number system
         * ```
         * RndShakeBase('AB0CD_{16}')
         * // may return ['BB0CE_{16}','AB0DD_{16}','BA0BE_{16}']
         * ```
         */
        static RndShakeBase(anchor: string): string[];
        /**
         * an array of 3 points, all are special in polar coordinates
         * ```
         * RndShakePointPolar([3,60])
         * // may return [[3, 120], [3*sqrt(2), 120], [3*sqrt(2), 60]]
         * ```
         */
        static RndShakePointPolar(anchor: Point2D): Point2D[];
        /**
         * an array of 3 constraint, with only the sign shaken
         * ```
         * RndShakeConstraint([1,2,'>',3])
         * // may return [[1,2,'>',3], [1,2,'<',3], [1,2,'<',3]]
         * ```
         */
        static RndShakeConstraint(anchor: Constraint): Constraint[];
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
        static RndShakeConstraints(anchor: Constraint[]): Constraint[][];
        static RndShakeQuantity(anchor: quantity): quantity[];
        static RndShakeCompoundInequality(anchor: CompoundInequality): CompoundInequality[];
    }
    global {
        var RndShake: typeof Host.RndShake;
        var RndShakeN: typeof Host.RndShakeN;
        var RndShakeR: typeof Host.RndShakeR;
        var RndShakeQ: typeof Host.RndShakeQ;
        var RndShakeG: typeof Host.RndShakeG;
        var RndShakeIneq: typeof Host.RndShakeIneq;
        var RndShakePoint: typeof Host.RndShakePoint;
        var RndShakeCombo: typeof Host.RndShakeCombo;
        var RndShakeTrig: typeof Host.RndShakeTrig;
        var RndShakeTrigValue: typeof Host.RndShakeTrigValue;
        var RndShakeRatio: typeof Host.RndShakeRatio;
        var RndShakeBase: typeof Host.RndShakeBase;
        var RndShakePointPolar: typeof Host.RndShakePointPolar;
        var RndShakeConstraint: typeof Host.RndShakeConstraint;
        var RndShakeConstraints: typeof Host.RndShakeConstraints;
        var RndShakeQuantity: typeof Host.RndShakeQuantity;
        var RndShakeCompoundInequality: typeof Host.RndShakeCompoundInequality;
    }
}
declare module "Math/Code/RandomUtil.test" { }
declare module "Math/Code/RandomUtil" {
    export class Host {
        /**
         * a random item from the given items
         * ```
         * RndPick(2,4,6) // may return 2, 4 or 6
         * ```
         */
        static RndPick<T>(...items: T[]): T;
        /**
         * a shuffled array of the given items
         * ```
         * RndShuffle(2,4,6) // may return [4,2,6]
         * ```
         */
        static RndShuffle<T>(...items: T[]): T[];
        /**
         * n random items from given items without replacement, but NOT necessarily unique if there are duplicated object in items.
         * ```
         * RndPickN([1,2,3,4,5],3) // may return [2,5,3]
         * ```
         */
        static RndPickN<T>(items: T[], n: number): T[];
        /**
         * n random unique items from given items, deep compare.
         * ```
         * RndPickUnique([2,4,6],2) // may return [4,2]
         * RndPickUnique([1,2,2,2,2,2,2,2],2) // must return [1,2] or [2,1]
         * ```
         */
        static RndPickUnique<T>(items: T[], n: number): T[];
        /**
         * a random male name
         * ```
         * RndHe() // may return 'Peter', 'David', etc
         * ```
         */
        static RndHe(): string;
        /**
         * a random female name
         * ```
         * RndShe() // may return 'Mary', 'Alice', etc
         * ```
         */
        static RndShe(): string;
        /**
         * a random 3-letters array
         * ```
         * RndLetters() // may return ['a','b','c'] or ['x','y','z'] or etc
         * ```
         */
        static RndLetters(): string[];
        /**
         * a random 3-letters array
         * ```
         * RndCapitals() // may return ['A','A','A'] or ['X','Y','Z'] or etc
         * ```
         */
        static RndCapitals(): string[];
    }
    global {
        var RndPick: typeof Host.RndPick;
        var RndShuffle: typeof Host.RndShuffle;
        var RndPickN: typeof Host.RndPickN;
        var RndPickUnique: typeof Host.RndPickUnique;
        var RndHe: typeof Host.RndHe;
        var RndShe: typeof Host.RndShe;
        var RndLetters: typeof Host.RndLetters;
        var RndCapitals: typeof Host.RndCapitals;
    }
}
declare module "Math/Code/Relation" {
    export class Host {
        /**
         * Check if the numbers are all distinct.
         * ```
         * AreDistinct(1,2,3) // true
         * AreDistinct(1,2,2) // false
         * ```
         */
        static AreDistinct(...nums: number[]): boolean;
        /**
         * Check if the absolute values of the numbers are all distinct.
         * ```
         * AreAbsDistinct(1,2,3) // true
         * AreAbsDistinct(1,2,2) // false
         * AreAbsDistinct(1,2,-2) // false
         * ```
         */
        static AreAbsDistinct(...nums: number[]): boolean;
        /**
         * Check if the numbers all have the same sign.
         * ```
         * AreSameSign(1,2,3) // true
         * AreSameSign(1,2,-3) // false
         * AreSameSign(1,2,0) // false
         * ```
         */
        static AreSameSign(...nums: number[]): boolean;
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
        static AreCoprime(...nums: number[]): boolean;
        /**
         * Check if the points are pairwise distant apart.
         * ```
         * AreDistantPoint(2)([0,0],[3,0]) // true
         * AreDistantPoint(2)([0,0],[1,0]) // false
         * ```
         */
        static AreDistantPoint(distance: number): (...points: Point2D[]) => boolean;
        /**
         * Check if slopes are at least oblique at minAngle
         * ```
         * AreOblique(40)(0,1) // true
         * AreOblique(40)(0,0.5) // false
         * ```
         */
        static AreOblique(minAngle: number): (...slopes: number[]) => boolean;
        /**
         * Check if the items are all distinct, by JSON.stringify.
         * ```
         * AreDifferent([1,2],[3,4]) // true
         * AreDifferent([1,2],[1,2]) // false
         * ```
         */
        static AreDifferent(...items: any[]): boolean;
    }
    global {
        var AreDistinct: typeof Host.AreDistinct;
        var AreAbsDistinct: typeof Host.AreAbsDistinct;
        var AreSameSign: typeof Host.AreSameSign;
        var AreCoprime: typeof Host.AreCoprime;
        var AreDistantPoint: typeof Host.AreDistantPoint;
        var AreOblique: typeof Host.AreOblique;
        var AreDifferent: typeof Host.AreDifferent;
    }
}
declare module "Math/Code/Sequence" {
    export class Host {
        /**
         * array of all integers between (inclusive) the min and max of `nums`.
         * ```
         * Rng(2,6) // [2,3,4,5,6]
         * Rng(6,2) // [2,3,4,5,6]
         * Rng(-2,1) // [-2,-1,0,1]
         * Rng(1,1,4,4,3,3,3) \\ [1,2,3,4]
         * ```
         */
        static Rng(...nums: number[]): number[];
        /**
         * Tn in an arithmetic sequence: a+(n-1)d
         * ```
         * ASterm(2,3,10) // 29
         * ASterm(5,-2,6) // -5
         * ```
         */
        static ASterm(a: number, d: number, n: number): number;
        /**
         * Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
         * ```
         * ASsum(2,3,10) // 155
         * ASsum(5,-2,6) // 0
         * ```
         */
        static ASsum(a: number, d: number, n: number): number;
        /**
         * an array of the first n terms in an arithmetic sequence.
         * ```
         * ASequence(2,3,5) // [2,5,8,11,14]
         * ASequence(5,-2,3) // [5,3,1]
         * ```
         */
        static ASequence(a: number, d: number, n?: number): number[];
        /**
         * Tn in a geometric sequence: ar**(n-1)
         * ```
         * GSterm(2,3,4) // 54
         * GSterm(5,-2,6) // -160
         * ```
         */
        static GSterm(a: number, r: number, n: number): number;
        /**
         * Sn in a geometric sequence: a*(r*n-1)/(r-1)
         * ```
         * GSsum(2,3,4) // 80
         * GSsum(5,-2,3) // 15
         * GSsum(3,0.5) // 6 , sum to inf if omit n
         * ```
         */
        static GSsum(a: number, r: number, n?: number): number;
        /**
         * an array of the first n terms in a geometric sequence.
         * ```
         * GSequence(2,3,5) // return [2,6,18,54,162]
         * GSequence(5,-2,3) // return [5,-10,20]
         * ```
         */
        static GSequence(a: number, r: number, n?: number): number[];
        /**
         * the nth term in a quadratic sequence, 1st term = a, P_i+1=P_i + pi+q
         * ```
         * QuadraticSequence(1,2,3,4) //
         * ```
         */
        static QuadraticSequence(a: number, p: number, q: number, n: number): number;
        /**
         * the nth term in a lucas sequence, a_i = p*a_{i-1} + q*a_{i-2}
         * ```
         * LucasSequence(1,2,3,4,5) //
         * ```
         */
        static LucasSequence(first: number, second: number, p: number, q: number, n: number): number;
    }
    global {
        var Rng: typeof Host.Rng;
        var ASterm: typeof Host.ASterm;
        var ASsum: typeof Host.ASsum;
        var ASequence: typeof Host.ASequence;
        var GSterm: typeof Host.GSterm;
        var GSsum: typeof Host.GSsum;
        var GSequence: typeof Host.GSequence;
        var QuadraticSequence: typeof Host.QuadraticSequence;
        var LucasSequence: typeof Host.LucasSequence;
    }
}
declare module "Math/Code/Stat" {
    export class Host {
        /**
         * the minimum value. Equivalent to Math.min().
         * ```
         * Min(2,3,4) // 2
         * ```
         */
        static Min(...nums: number[]): number;
        /**
         * the maximum value. Equivalent to Math.max().
         * ```
         * Max(2,3,4) // 4
         * ```
         */
        static Max(...nums: number[]): number;
        /**
         * the sorted array of numbers.
         * ```
         * Sort(2,3,1) // [1,2,3]
         * ```
         */
        static Sort(...nums: number[]): number[];
        /**
         * the sorted array of items by giving each item a value.
         * ```
         * SortBy([2,3,1],x=>x) // [1,2,3]
         * SortBy(["aa", "aaa", "a"], x => x.length) // ["a", "aa", "aaa"]
         * ```
         */
        static SortBy<T>(items: T[], valueFunc: (_: T) => number): T[];
        /**
         * sum of nums
         * ```
         * Sum(1,2,3) // 6
         * Sum(-1,2,3,4,5) // 13
         * Sum() // 0
         * ```
         */
        static Sum(...nums: number[]): number;
        /**
         * product of nums
         * ```
         * Product(2,3) // 6
         * Product(-1,2,3,4,5) // -120
         * Product() // 1
         * ```
         */
        static Product(...nums: number[]): number;
        /**
         * mean of nums
         * ```
         * Mean(1,2,3) // 2
         * Mean(-1,2,3,4,5) // 2.6
         * ```
         */
        static Mean(...nums: number[]): number;
        /**
         * median of nums
         * ```
         * Median(1,2,3,4,50) // 3
         * Median(1,2,3,4,5,7) // 3.5
         * ```
         */
        static Median(...nums: number[]): number;
        /**
         * lower quartile of nums
         * ```
         * LowerQ(1,2,3,4,5) // 1.5
         * LowerQ(1,2,3,4,5,7) // 2
         * ```
         */
        static LowerQ(...nums: number[]): number;
        /**
         * lower quartile of nums
         * ```
         * UpperQ(1,2,3,4,5) // 4.5
         * UpperQ(1,2,3,4,5,7) // 5
         * ```
         */
        static UpperQ(...nums: number[]): number;
        /**
         * range of `nums`
         * ```
         * StatRange(1,2,3,4,5) // 4
         * StatRange(1,2,3,4,5,7) // 6
         * ```
         */
        static StatRange(...nums: number[]): number;
        /**
         * inter-quartile range of nums
         * ```
         * IQR(1,2,3,4,5,6) // 3
         * ```
         */
        static IQR(...nums: number[]): number;
        /**
         * count frequency of item in array
         * ```
         * Freq([2,3,4,1,5,1,1,4,5],1) // 3
         * ```
         */
        static Freq<T>(array: T[], item: T): number;
        /**
         * mode of nums
         * ```
         * Mode(1,2,3,2,2,3,4) \\ [2]
         * Mode(1,1,2,2,3) \\ [1,2]
         * ```
         */
        static Mode(...nums: number[]): number[];
        /**
         * the only mode of nums, if there are multiple modes, then throw error
         * ```
         * UniMode(1,2,3,2,2,3,4) \\ 2
         * UniMode(1,1,2,2,3) \\ throw error
         * ```
         */
        static UniMode(...nums: number[]): number;
        /**
         * SD of nums
         * ```
         * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
         * StdDev(1,1,2,2,3) \\ 0.748331477
         * ```
         */
        static StdDev(...nums: number[]): number;
        /**
         * z-score of `num` in a data set with `mean` and `SD`
         * ```
         * ZScore(80,60,10) \\ 2
         * ```
         */
        static ZScore(num: number, mean: number, SD: number): number;
        /**
         * the location of median
         * ```
         * MedianAt(12) \\ 6.5
         * MedianAt(13) \\ 7
         * ```
         */
        static MedianAt(total: number): number;
        /**
         * the location of LQ
         * ```
         * LowerQAt(12) \\ 3.5
         * LowerQAt(13) \\ 3.5
         * ```
         */
        static LowerQAt(total: number): number;
        /**
         * the location of UQ
         * ```
         * UpperQAt(12) \\ 9.5
         * UpperQAt(13) \\ 10.5
         * ```
         */
        static UpperQAt(total: number): number;
        /**
         * array of the corresponding frequency of `nums` in a data set. If `nums` is omitted, default to the whole range of `data`.
         * ```
         * Freqs([1,1,4,4,3,3,3],[1,2,3,4]) \\ [2,0,3,2]
         * ```
         */
        static Freqs(data: number[], nums?: number[]): number[];
        /**
         * array of summary of the data [Minimum,LowerQ,Median,UpperQ,Maximum]
         * ```
         * Summary(1,1,2,3,3,3,3,4,5,5) \\ [1,2,3,4,5]
         * Summary(1,2,3,4,5,6,7,8,9,10) \\ [1,3,5.5,8,10]
         * ```
         */
        static Summary(...data: number[]): number[];
        /**
         * group `data` into intervals
         * ```
         * Bin([2,2,2,7,7,7,7],[1,5]) \\ group into [1,5] and [6, 10]
         * ```
         */
        static Bin(data: number[], intervalSample: [number, number]): {
            limit: [number, number];
            bound: [number, number];
            mark: number;
            width: number;
            freq: number;
            cumFreq: number;
        }[];
    }
    global {
        var Min: typeof Host.Min;
        var Max: typeof Host.Max;
        var Sort: typeof Host.Sort;
        var SortBy: typeof Host.SortBy;
        var Sum: typeof Host.Sum;
        var Product: typeof Host.Product;
        var Mean: typeof Host.Mean;
        var Median: typeof Host.Median;
        var LowerQ: typeof Host.LowerQ;
        var UpperQ: typeof Host.UpperQ;
        var StatRange: typeof Host.StatRange;
        var IQR: typeof Host.IQR;
        var Freq: typeof Host.Freq;
        var Mode: typeof Host.Mode;
        var UniMode: typeof Host.UniMode;
        var StdDev: typeof Host.StdDev;
        var ZScore: typeof Host.ZScore;
        var MedianAt: typeof Host.MedianAt;
        var LowerQAt: typeof Host.LowerQAt;
        var UpperQAt: typeof Host.UpperQAt;
        var Freqs: typeof Host.Freqs;
        var Summary: typeof Host.Summary;
        var Bin: typeof Host.Bin;
    }
}
declare module "Math/Code/Text" {
    export class Host {
        /**
         * a string of joined elements. [1,2,3] --> '1, 2 and 3'
         * ```
         * GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
         * GrammarJoin('a','b','c') // 'a, b and c'
         * ```
         */
        static GrammarJoin(...items: unknown[]): string;
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
        static IneqSign(greater: boolean, equal?: boolean): [Ineq, Ineq];
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
        static Dfrac(numerator: number, denominator: number, upSign?: boolean): string;
        /**
    
         * convert index katex to surd
         * ```
         * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
         * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
         * ```
         */
        static IndexToSurd(text: string): string;
        /**
    
         * @deprecated
         * the coordinates '(a, b)' of point [a,b]
         * ```
         * Coord([1,2]) // '(1, 2)'
         * ```
         */
        static Coord(point: Point2D, dp?: number): string;
        /**
    
         * @deprecated
         * the scientific notation of number
         * ```
         * Sci(123.45) // '1.2345 x 10^{ 2}'
         * Sci(1.2345) // '1.2345'
         * ```
         */
        static Sci(num: number): string;
        /**
    
         * the katex of long division
         * ```
         * LongDivision([1,2,3,4],[1,2]) //
         * LongDivision([1,2,3,4],[1,2]) //
         * ```
         */
        static LongDivision(dividend: number[], divisor: number[]): string;
        /**
    
         * the representation of num in base b
         * ```
         * ToBase(1000,16) // '3E8_{16}'
         * ToBase(13,2) // '1101_{2}'
         * ```
         */
        static ToBase(num: number, base: number): string;
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
        static PrimeFactorize(val: {
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
        static ConstraintText(constraint: Constraint, sign?: boolean | null, xReplace?: string, yReplace?: string): string;
    }
    global {
        var GrammarJoin: typeof Host.GrammarJoin;
        var IneqSign: typeof Host.IneqSign;
        var Dfrac: typeof Host.Dfrac;
        var IndexToSurd: typeof Host.IndexToSurd;
        var Coord: typeof Host.Coord;
        var Sci: typeof Host.Sci;
        var LongDivision: typeof Host.LongDivision;
        var ToBase: typeof Host.ToBase;
        var PrimeFactorize: typeof Host.PrimeFactorize;
        var ConstraintText: typeof Host.ConstraintText;
    }
}
declare module "Math/Code/Triangle.test" { }
declare module "Math/Code/Triangle" {
    export class Host {
        /**
         * Find c from a and b of a right triangle.
         * ```
         * Pyth(3,4) // 5
         * ```
         */
        static Pyth(a: number, b: number): number;
        /**
         * Find b from c and a of a right triangle.
         * ```
         * PythLeg(5,4) // 3
         * ```
         */
        static PythLeg(c: number, a: number): number;
        /**
         * Find side length c by cosine law. Input sides a,b and angle C.
         * ```
         * CosineLawLength(3, 4, 90) // 5
         * ```
         */
        static CosineLawLength(a: number, b: number, C: number): number;
        /**
         * Find angle C by cosine law. Input sides a,b,c.
         * ```
         * CosineLawAngle(5,5,5) // 60
         * CosineLawAngle(3,4,5) // 90
         * CosineLawAngle(7,8,9) // 73.3984504
         * ```
         */
        static CosineLawAngle(a: number, b: number, c: number): number;
        /**
         * Find side b by sine law.
         * ```
         * SineLawLength(60,1,60) // 1
         * ```
         */
        static SineLawLength(A: number, a: number, B: number): number;
        /**
         * Find angle B by sine law. Assume acute.
         * ```
         * SineLawAngle(1,60,1) // 60
         * ```
         */
        static SineLawAngle(a: number, A: number, b: number): number;
        /**
         * Find area by Heron's formula.
         * ```
         * Heron(3,4,5) // 6
         * Heron(1,1,1) // 0.433012701
         * Heron(7,8,9) // 26.83281573
         * ```
         */
        static Heron(a: number, b: number, c: number): number;
        /**
         * Solve SSS triangle.
         * ```
         * SolveSSS(1,sqrt(3),2) // [90,30,60]
         * ```
         */
        static SolveSSS(a: number, b: number, c: number): [C: number, A: number, B: number];
        /**
         * Solve SAS triangle.
         * ```
         * SolveSAS(1,90,sqrt(3)) // [30,2,60]
         * ```
         */
        static SolveSAS(a: number, C: number, b: number): [A: number, c: number, B: number];
        /**
         * Solve AAS triangle.
         * ```
         * SolveAAS(60,90,sqrt(3)) // [1,30,2]
         * ```
         */
        static SolveAAS(A: number, B: number, a: number): [c: number, C: number, b: number];
        /**
         * Solve ASA triangle.
         * ```
         * SolveASA(90,sqrt(3),30) // [2,60,1]
         * ```
         */
        static SolveASA(A: number, c: number, B: number): [a: number, C: number, b: number];
        /**
         * Solve SSA triangle.
         * ```
         * SolveSSA(1,sqrt(3),30) // [90,2,60]
         * ```
         */
        static SolveSSA(a: number, b: number, A: number): [C: number, c: number, B: number];
        /**
         * Find heights of SSS triangle.
         * ```
         * HeightsBySSS(1,sqrt(3),2) // [sqrt(3),1,sqrt(3)/2]
         * ```
         */
        static HeightsBySSS(a: number, b: number, c: number): [Ha: number, Hb: number, Hc: number];
        /**
         * Find height of SSS triangle, against the first base.
         * ```
         * HeightBySSS(1,sqrt(3),2) // sqrt(3)
         * ```
         */
        static HeightBySSS(a: number, b: number, c: number): number;
        /**
         * Find heights of SAS triangle.
         * ```
         * HeightsBySAS(1,90,sqrt(3)) // [sqrt(3),1,sqrt(3)/2]
         * ```
         */
        static HeightsBySAS(a: number, C: number, b: number): [Ha: number, Hb: number, Hc: number];
        /**
         * Find height of SAS triangle, opposite to the given angle.
         * ```
         * HeightBySAS(1,90,sqrt(3)) // sqrt(3)/2
         * ```
         */
        static HeightBySAS(a: number, C: number, b: number): number;
        /**
         * @deprecated - use TriangleFromPoint
         * @param fix - Round all return values to integer.
         * Return the 6 elements of a triangle given vertice. { sideC, angleB, sideA, angleC, sideB, angleA }
         * ```
         * TriangleFromVertex([0,0],[4,0],[0,3],false)
         * // {sideC:4, angleB:36.86989765, sideA:5, angleC:53.13013235, sideB:3, angleA:90}
         * ```
         */
        static TriangleFromVertex(A: Point2D, B: Point2D, C: Point2D, fix?: boolean): Triangle;
        /**
         * @param fix - Round all return values to integer.
         * Return the 6 elements of a triangle given vertice. [sideA, sideB, sideC, angleA, angleB, angleC]
         * ```
         * TriangleFromPoint([0,0],[4,0],[0,3],false)
         * // [5, 3, 4, 90, 36.86989765, 53.13013235]
         * ```
         */
        static TriangleFromPoint(A: Point2D, B: Point2D, C: Point2D, fix?: boolean): [
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
        static SolveTriangle({ sideA, sideB, sideC, angleA, angleB, angleC, }: Partial<Triangle>): Triangle;
        /**
         * the orthocentre of a triangle
         * ```
         * Orthocentre([9,-6],[6,10],[-7,10])  // [9,13]
         * ```
         */
        static Orthocentre(A: Point2D, B: Point2D, C: Point2D): Point2D;
        /**
         * the circumcentre of a triangle
         * ```
         * Circumcentre([1,7],[8,-4],[-10,0])  // [-1,-2]
         * ```
         */
        static Circumcentre(A: Point2D, B: Point2D, C: Point2D): Point2D;
        /**
         * the centroid of a triangle
         * ```
         * Centroid([3,6],[9,12],[15,21])  // [9,13]
         * ```
         */
        static Centroid(A: Point2D, B: Point2D, C: Point2D): Point2D;
        /**
         * the incentre of a triangle
         * ```
         * Incentre([3,0],[-3,0],[0,4])  // [0,1.5]
         * ```
         */
        static Incentre(A: Point2D, B: Point2D, C: Point2D): Point2D;
        /**
         * the scaled points [A,B,C] so that their orthecentre and themselves becomes integral
         */
        static ScaleOrthocentreToInt(A: Point2D, B: Point2D, C: Point2D): [Point2D, Point2D, Point2D];
        /**
         * the scaled points [A,B,C] so that their circumcentre and themselves becomes integral
         */
        static ScaleCircumcentreToInt(A: Point2D, B: Point2D, C: Point2D): [Point2D, Point2D, Point2D];
        /**
         * the scaled points [A,B,C] so that their centroid and themselves becomes integral
         */
        static ScaleCentroidToInt(A: Point2D, B: Point2D, C: Point2D): [Point2D, Point2D, Point2D];
        /**
         * the scaled points [A,B,C] so that their incentre and themselves becomes integral
         */
        static ScaleIncentreToInt(A: Point2D, B: Point2D, C: Point2D): [Point2D, Point2D, Point2D];
    }
    global {
        var Pyth: typeof Host.Pyth;
        var PythLeg: typeof Host.PythLeg;
        var CosineLawLength: typeof Host.CosineLawLength;
        var CosineLawAngle: typeof Host.CosineLawAngle;
        var SineLawLength: typeof Host.SineLawLength;
        var SineLawAngle: typeof Host.SineLawAngle;
        var Heron: typeof Host.Heron;
        var SolveSSS: typeof Host.SolveSSS;
        var SolveSAS: typeof Host.SolveSAS;
        var SolveAAS: typeof Host.SolveAAS;
        var SolveASA: typeof Host.SolveASA;
        var SolveSSA: typeof Host.SolveSSA;
        var HeightsBySSS: typeof Host.HeightsBySSS;
        var HeightBySSS: typeof Host.HeightBySSS;
        var HeightsBySAS: typeof Host.HeightsBySAS;
        var HeightBySAS: typeof Host.HeightBySAS;
        var TriangleFromVertex: typeof Host.TriangleFromVertex;
        var TriangleFromPoint: typeof Host.TriangleFromPoint;
        var SolveTriangle: typeof Host.SolveTriangle;
        var Orthocentre: typeof Host.Orthocentre;
        var Circumcentre: typeof Host.Circumcentre;
        var Centroid: typeof Host.Centroid;
        var Incentre: typeof Host.Incentre;
        var ScaleOrthocentreToInt: typeof Host.ScaleOrthocentreToInt;
        var ScaleCircumcentreToInt: typeof Host.ScaleCircumcentreToInt;
        var ScaleCentroidToInt: typeof Host.ScaleCentroidToInt;
        var ScaleIncentreToInt: typeof Host.ScaleIncentreToInt;
    }
}
declare module "Math/Code/Trigonometry" {
    export class Host {
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
        static Quadrant(rect: Point2D | number): QuadrantName;
        /**
         * the rectangular coordinates [x,y] from a polar coordinates [r,theta].
         * ```
         * PolToRect([1,45]) // [0.707,0.707]
         * ```
         */
        static PolToRect([r, q]: PolarPoint): Point2D;
        /**
         * the polar coordinates [r,theta] of a rectangular coordinates [x,y].
         * ```
         * RectToPol([1,1]) // [1.414,45]
         * ```
         */
        static RectToPol([x, y]: Point2D): PolarPoint;
        /**
         * the sign from ASTC diagram, 1 or -1, representing positive or negative.
         * ```
         * ASTC(2,'cos') // -1
         * ASTC('III','tan') // 1
         * ```
         */
        static ASTC(quadrant: QuadrantCode | QuadrantName, func: TrigFunc): -1 | 0 | 1;
        /**
         * @deprecated use TrigSolve instead
         * the roots of trig equations sin(x)=k , cos(x)=k or tan(x)=k. The angles [r1,r2,r3].
         * ```
         * TrigRoot('sin',0) // [0, 180, 360]
         * TrigRoot('sin',0.5) // [30, 150, undefined]
         * TrigRoot('sin',1) // [90, undefined, undefined]
         * ```
         */
        static TrigRoot(func: TrigFunc, k: number): [number | undefined, number | undefined, number | undefined];
        /**
         * the roots of trig equations sin(x)=k , cos(x)=k or tan(x)=k.
         * ```
         * TrigSolve('sin',0) // [0, 180, 360]
         * TrigSolve('sin',0.5) // [30, 150]
         * TrigSolve('sin',1) // [90]
         * ```
         */
        static TrigSolve(func: TrigFunc, k: number): number[];
        /**
         * @deprecated
         * reduce the polar angle into the range [0,360)
         * ```
         * PolarReduce(370) // 10
         * PolarReduce(-10) // 350
         * ```
         */
        static PolarReduce(q: number): number;
        /**
         * @deprecated
         * the angle (within [0,180]) between two polar angles
         * ```
         * PolarDiff(80,70) // 10
         * PolarDiff(350,10) // 20
         * ```
         */
        static PolarDiff(angle1: number, angle2: number): number;
        /**
         * the whole bearing in the polar angle direction
         * ```
         * WholeBearing(0) // '090°'
         * WholeBearing(180) // '270°'
         * ```
         */
        static WholeBearing(polarAngle: number): string;
        /**
         * the compass bearing in the polar angle direction
         * ```
         * CompassBearing(30) // 'N60°E'
         * ```
         */
        static CompassBearing(polarAngle: number): string;
    }
    global {
        var Quadrant: typeof Host.Quadrant;
        var PolToRect: typeof Host.PolToRect;
        var RectToPol: typeof Host.RectToPol;
        var ASTC: typeof Host.ASTC;
        var TrigRoot: typeof Host.TrigRoot;
        var TrigSolve: typeof Host.TrigSolve;
        var PolarReduce: typeof Host.PolarReduce;
        var PolarDiff: typeof Host.PolarDiff;
        var WholeBearing: typeof Host.WholeBearing;
        var CompassBearing: typeof Host.CompassBearing;
    }
}
declare module "Math/Code/Utility" {
    export class Host {
        /**
         * get the element at cyclic index
         * ```
         * At([1,2,3],-1) // 3
         * At([1,2,3],3) // 1
         * ```
         */
        static At<T>(arr: T[], index: number): T;
        /**
         * get the chain of elements around `centreIndex` in cyclic fashion
         * ```
         * Lace([1,2,3,4,5,6],0,[-1,0,1]) // [6,1,2]
         * ```
         */
        static Lace<T>(arr: T[], centreIndex: number, relativeIndices: number[]): T[];
    }
    global {
        var At: typeof Host.At;
        var Lace: typeof Host.Lace;
    }
}
declare module "Math/Code/Vector" {
    export class Host {
        /**
         * sum of all vectors
         * ```
         * VecAdd([1,2],[3,4],[5,6]) // [9,12]
         * ```
         */
        static VecAdd(...vectors: Point2D[]): Point2D;
    }
    global {
        var VecAdd: typeof Host.VecAdd;
    }
}
declare module "Math/Code/Vector3D.test" { }
declare module "Math/Code/Vector3D" {
    export class Host {
        /**
         * mean of all vectors
         * ```
         * Mid3D([1,2,3],[3,4,5],[5,6,7]) // [3,4,5]
         * ```
         */
        static Mid3D(...vectors: Point3D[]): Point3D;
        /**
         * the point P on AB such that AP : PB = ratio : 1-ratio
         * ```
         * Slide3D([1,0,0],[5,0,0],0.75) // [4,0,0]
         * ```
         */
        static Slide3D(A: Point3D, B: Point3D, ratio: number): Point3D;
        /**
         * projection of a point on a plane
         * ```
         * let P = [2,3,4]
         * let [A,B,C] = [[0,0,0],[1,0,0],[0,1,0]]
         * PdFoot3D(P,[A,B,C]) // [2,3,0]
         * PdFoot3D(P,[A,B]) // [2,0,0]
         * ```
         */
        static PdFoot3D(point: Point3D, base: [Point3D, Point3D, Point3D] | [Point3D, Point3D]): Point3D;
        /**
         * embed points on xy-plane onto a plane in 3D
         * ```
         * let [A,B,C] = [[0,0],[1,0],[0,1]]
         * Embed([A,B,C],[0,0,2],[1,0,0],[0,1,0]) // [[0,0,2],[1,0,2],[0,1,2]]
         * ```
         */
        static Embed(plane2D: Point2D[], origin: Point3D, xVec: Point3D, yVec: Point3D): Point3D[];
        /**
         * embed 2D points onto a plane in 3D with constant x. The x-axis becomes the 3D y-axis. The y-axis becomes the 3D z-axis.
         * ```
         * let [A,B,C] = [[0,0],[3,0],[0,1]]
         * EmbedX([A,B,C],2) // [[2,0,0],[2,3,0],[2,0,1]]
         * ```
         */
        static EmbedX(plane2D: Point2D[], x?: number): Point3D[];
        /**
         * embed 2D points onto a plane in 3D with constant y. The x-axis becomes the 3D x-axis. The y-axis becomes the 3D z-axis.
         * ```
         * let [A,B,C] = [[0,0],[3,0],[0,1]]
         * EmbedY([A,B,C],2) // [[0,2,0],[3,2,0],[0,2,1]]
         * ```
         */
        static EmbedY(plane2D: Point2D[], y?: number): Point3D[];
        /**
         * embed points on xy-plane onto a plane in 3D with constant z
         * ```
         * let [A,B,C] = [[0,0],[3,0],[0,1]]
         * EmbedZ([A,B,C],2) // [[0,0,2],[3,0,2],[0,1,2]]
         * ```
         */
        static EmbedZ(plane2D: Point2D[], z?: number): Point3D[];
        /**
         * flatten points to the same z-plane
         * ```
         * let [A,B,C] = [[0,0,0],[3,0,1],[0,1,2]]
         * FlatZ([A,B,C],2) // [[0,0,2],[3,0,2],[0,1,2]]
         * ```
         */
        static FlatZ(points: Point3D[], z?: number): Point3D[];
        /**
         * extrude the lower base of a frustum towards the upper base by a ratio
         * ```
         * let [A,B,C] = [[0,0,0],[4,0,0],[0,4,0]]
         * Extrude([A,B,C],[[0,0,4]],0.75) // [[0,0,0],[3,0,0],[0,3,0]]
         * ```
         */
        static Extrude(lowerBase: Point3D[], upperBase: Point3D[], scale: number): Point3D[];
        /**
        * @category 3DPen
        * @deprecated use built-in projector in Pen instead
        * projector function from 3D point to 2D plane
        * ```
        * const pj = Projector(60,0.5) // create a 3D projector function
        * pj(1,1,0) // [1.25, 0.433012701892]
        * ```
        */
        static Projector(angle?: number, depth?: number): (x: number, y: number, z: number) => Point;
        /**
        * @category 3DPen
        * @deprecated use built-in projector in Pen instead
        * projector function from 3D point to 2D plane
        * ```
        * const pj = Projector3D(60,0.5) // create a 3D projector function
        * pj([1,1,0]) // [1.25, 0.433012701892]
        * ```
        */
        static Projector3D(angle?: number, depth?: number): (_: Point3D) => Point;
    }
    global {
        var Mid3D: typeof Host.Mid3D;
        var Slide3D: typeof Host.Slide3D;
        var PdFoot3D: typeof Host.PdFoot3D;
        var Embed: typeof Host.Embed;
        var EmbedX: typeof Host.EmbedX;
        var EmbedY: typeof Host.EmbedY;
        var EmbedZ: typeof Host.EmbedZ;
        var FlatZ: typeof Host.FlatZ;
        var Extrude: typeof Host.Extrude;
        var Projector: typeof Host.Projector;
        var Projector3D: typeof Host.Projector3D;
    }
}
declare module "Pen/AutoPen" {
    /**
     * @category DrawingPen
     */
    export class AutoPenCls {
        /**
         * @ignore
         */
        private pen;
        /**
         * @ignore
         */
        constructor();
        /**
         * Export the canvas to image tag.
         * @param html - The html string to export to.
         * @param placeholder - The src field of the image tag to export to.
         * ```
         * question = autoPen.export(question,'imgQ')
         * // paste the canvas to the image tag with src field 'imgQ'
         * ```
         */
        export(html: string, placeholder: string): string;
        /**
         * Arrow diagram for inequalities.
         * @param items - Represent the inequalities.
         * @param ticks - Represent the tick or cross for each region.
         * ```
         * let pen = new AutoPen()
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
         * let pen = new AutoPen()
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
         * let pen = new AutoPen()
         * pen.QuadraticInequality({quadratic:[1,2,-3],sign:'\\ge'})
         * ```
         */
        QuadraticInequality({ quadratic, sign, scale, ratio, }: {
            quadratic: [number, number, number];
            sign: string;
            scale: number;
            ratio: number;
        }): void;
        /**
         * Draw a triangle.
         * @param vertices - [A,B,C] an array of coordinates [x,y] of 3 vertices, must be anticlockwise.
         * @param triangle - The elements of triangle to print, {sideC,angleB,sideA,angleC,sideB,angleA}. If falsy, show no label.
         * @param labels - The labels of the vertices. If falsy, show no label.
         * @param heights - Whether to draw the height.
         * @param scale - scale for pen.setup.size()
         * ```
         * let pen = new AutoPen()
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
            triangle: any;
            labels: string[];
            heights: [boolean, boolean, boolean];
            scale: number;
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
         * let pen = new AutoPen()
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
            highlights: Highlight[];
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
         * let pen = new AutoPen()
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
         * A pie chart
         * ```
         * let pen = new AutoPen()
         * pen.PieChart({
         *   categories: ['a','b','c','d','e'],
         *   labels: ['10%','20%','y%',null,''],
         *   angles: [45,135,60,50,70],
         *   angleLabels: [null,'x',null,undefined,''],
         *   size:1.5
         * })
         * ```
         */
        PieChart({ categories, labels, angles, angleLabels, size, }: {
            categories: string[];
            labels: (string | null)[];
            angles: number[];
            angleLabels: (string | null | undefined)[];
            size?: number;
        }): void;
        /**
         * A bar chart.
         * ```
         * let pen = new AutoPen()
         * pen.BarChart({
         *   categories: ['a','b','c','d','e'],
         *   freqs: [7, 47, 15, 3, 7],
         *   xLabel: 'x-axis',
         *   yLabel: 'y-axis',
         *   interval: 5,
         *   subInterval: 1,
         *   colWidth: 1,
         *   barWidth: 0.8,
         * })
         * ```
         */
        BarChart({ categories, freqs, xLabel, yLabel, interval, subInterval, colWidth, barWidth, }: {
            categories: (string | number)[];
            freqs: number[];
            xLabel?: string;
            yLabel?: string;
            interval?: number;
            subInterval?: number;
            colWidth?: number;
            barWidth?: number;
        }): void;
        /**
         * A line chart.
         * ```
         * let pen = new AutoPen()
         * pen.LineChart({
         *   categories: ['a','b','c','d','e'],
         *   freqs: [7, 47, 15, 3, 7],
         *   xLabel: 'x-axis',
         *   yLabel: 'y-axis',
         *   interval: 5,
         *   subInterval: 1,
         *   colWidth: 1,
         * })
         * ```
         */
        LineChart({ categories, freqs, xLabel, yLabel, interval, subInterval, colWidth, }: {
            categories: (string | number)[];
            freqs: number[];
            xLabel?: string;
            yLabel?: string;
            interval?: number;
            subInterval?: number;
            colWidth?: number;
        }): void;
        /**
         * ```
         * let pen = new AutoPen()
         * pen.Histogram({
         *   data: [2, 2, 2, 7, 7, 7, 8, 8, 13, 13],
         *   intervalSample: [1, 5],
         *   xLabel: 'x-axis',
         *   yLabel: 'y-axis',
         *   interval: 5,
         *   subInterval: 1,
         *   colWidth: 1,
         * })
         * ```
         */
        Histogram({ data, intervalSample, xLabel, yLabel, interval, subInterval, colWidth, mode, }: {
            data: number[];
            intervalSample: [number, number];
            xLabel?: string;
            yLabel?: string;
            interval?: number;
            subInterval?: number;
            colWidth?: number;
            mode?: 'mid' | 'end';
        }): void;
        /**
         * ```
         * let pen = new AutoPen()
         * pen.FreqPolygon({
         *   data: [2, 2, 2, 7, 7, 7, 8, 8, 13, 13],
         *   intervalSample: [1, 5],
         *   xLabel: 'x-axis',
         *   yLabel: 'y-axis',
         *   interval: 5,
         *   subInterval: 1,
         *   colWidth: 1,
         * })
         * ```
         */
        FreqPolygon({ data, intervalSample, xLabel, yLabel, interval, subInterval, colWidth, }: {
            data: number[];
            intervalSample: [number, number];
            xLabel?: string;
            yLabel?: string;
            interval?: number;
            subInterval?: number;
            colWidth?: number;
        }): void;
        /**
         * ```
         * let pen = new AutoPen()
         * pen.CumFreqPolygon({
         *   data: [2, 2, 2, 7, 7, 7, 8, 8, 13, 13],
         *   intervalSample: [1, 5],
         *   xLabel: 'x-axis',
         *   yLabel: 'y-axis',
         *   interval: 5,
         *   subInterval: 1,
         *   colWidth: 1,
         * })
         * ```
         */
        CumFreqPolygon({ data, intervalSample, xLabel, yLabel, interval, subInterval, colWidth, }: {
            data: number[];
            intervalSample: [number, number];
            xLabel?: string;
            yLabel?: string;
            interval?: number;
            subInterval?: number;
            colWidth?: number;
        }): void;
        /**
         * A boxplot
         * ```
         * let pen = new AutoPen()
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
         * A regular polygon
         * ```
         * let pen = new AutoPen()
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
         * let pen = new AutoPen()
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
        /**
         * @ignore
         */
        private pen;
        /**
         * @ignore
         */
        constructor();
        /**
         * Export the canvas to image tag.
         * ```
         * question = autoPen.export(question,'imgQ')
         * // paste the canvas to the image tag with src field 'imgQ'
         * ```
         */
        export(html: string, placeholder: string): string;
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
        InclinedPlane({ boxMid, boxWidth, boxHeight, length, angle, angleLabel, weight, weightLabel, weightXLabel, weightYLabel, weightAngleLabel, normal, normalLabel, friction, frictionLabel, applied, appliedLabel, appliedXLabel, appliedYLabel, appliedAngle, appliedAngleLabel, showForces, showWeightCompo, showAppliedCompo }: {
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
        CarOnBankedRoad({ carMid, carWidth, wheelHeight, carHeight, angle, angleLabel, weight, weightLabel, normal, normalLabel, friction, frictionLabel, showAllForces }: {
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
        AirplaneTurning({ wingWidth, planeRadius, angle, angleLabel, weight, weightLabel, lift, liftLabel, showAllForces }: {
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
        ConicalPendulum({ bobRadius, length, angle, angleLabel, weight, weightLabel, tension, tensionLabel, showAllForces }: {
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
        SatelliteOrbit({ planetRadius, orbitRadius, angle, showHeight }: {
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
        RefractionMedia({ rays, upMedLabel, lowMedLabel, upMedColor, lowMedColor, roundTo }: {
            rays: [dir: number, to: boolean, angleV: boolean | string, angleH: boolean | string][];
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
declare module "Soil/cls" {
    export class Config {
        answer: string;
        options: {};
        shuffle: boolean;
        constructor(answer?: string, options?: {}, shuffle?: boolean);
    }
}
/**
 * @deprecated
 */
declare var answer: string | number;
declare var options: object;
declare var shuffle: boolean;
declare var question: string;
declare var solution: string;
declare module "Soil/tool/blacksmith" {
    import { Blacksmith } from 'bot';
    export let blacksmith: Blacksmith;
}
declare module "Soil/tool/html" {
    import { HTMLWorker } from 'bot';
    export class QuestionHTML extends HTMLWorker {
        hasOneUl(): boolean;
        liCount(): number;
        cloneLi(sourceIndex: number, repeat?: number): void;
        printInLi(index: number, dict: object): void;
        isLiDuplicated(): boolean;
        shuffleLi(indexArr: number[]): void;
    }
}
declare module "Soil/tool/shuffle" {
    export class OptionShuffler {
        qn: string;
        sol: string;
        ans: string;
        private shuffle;
        hasDuplicatedOptions: boolean;
        constructor(qn: string, sol: string, ans: string, shuffle: boolean);
        private exec;
        private letterMap;
    }
}
declare module "Soil/tool/option" {
    export function AutoOptions<D extends object>(instructions: Partial<D>, question: string, source: D): string;
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
        private runSlot;
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
    }
}
declare type Fruit = {
    readonly qn: string;
    readonly sol: string;
    readonly ans: string;
    counter: number;
    readonly success: boolean;
    readonly logs: string[];
    readonly time: number;
};
declare type Inspection = {
    readonly counter: number;
    readonly success: boolean;
    readonly logs: string[];
    readonly time: number;
};
declare type Gene = {
    readonly qn: string;
    readonly sol: string;
    readonly slot: string;
    readonly populate: string;
    readonly validate: string;
    readonly preprocess: string;
    readonly postprocess: string;
    readonly inject: string;
};
