import './Math/index.ts';
import './Pen/index.ts';
import './Soil/index.ts';

import './Math/index.ts';
import './Pen/index.ts';
import './Soil/index.ts';

declare global {
    namespace Chance {
        interface Chance {
            prime: (opt: {
                min: number;
                max: number;
            }) => number;
        }
    }
    var chance: Chance.Chance;
}
export {};

import './Code/Assertion.ts';
import './Code/Combinatorics.ts';
import './Code/Flow.ts';
import './Code/Fraction.ts';
import './Code/Function.ts';
import './Code/Geometry.ts';
import './Code/LinearProgram.ts';
import './Code/Numeracy.ts';
import './Code/PhyConst.ts';
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
import './Algebra/Algebra.ts';
import './Algebra/Circle.ts';
import './Algebra/Quadratic.ts';
import './Algebra/Linear.ts';
import './should.ts';
import './chance.ts';

declare var SHOULD_LOG: boolean;
declare class CustomErrorCls extends Error {
    constructor(name: string, message: string);
}
declare function CustomError(name: string, message: string): CustomErrorCls;
declare function MathError(message: string): CustomErrorCls;
declare function Should(condition: boolean, msg?: string): void;

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
declare type Fraction = [numerator: number, denominator: number];
/**
 * ```
 * // used in linear programming
 * [1,2,"<=",3] // x+2y <= 3
 * ```
 */
declare type Constraint = [xCoeff: number, yCoeff: number, ineq: string, constant: number];
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
declare type IneqSign = [greater: boolean, equal: boolean];

/**
* @category 3DPen
* @return projector function from 3D point to 2D plane
* ```typescript
* const pj = Projector(60,0.5) // create a 3D projector function
* pj(1,1,0) // [1.25, 0.433012701892]
* ```
*/
declare function Projector(angle?: number, depth?: number): (x: number, y: number, z: number) => Point;

/**
 * @category DrawingPen
 */
declare class AutoPenCls {
    /**
     * @ignore
     */
    pen: PenCls;
    /**
     * @ignore
     */
    constructor();
    /**
     * Export the canvas to image tag.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```typescript
     * question = autoPen.export(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    export(html: string, placeholder: string): string;
    /**
     * A short division diagram for prime factorization of numbers.
     * @category tool
     * @param numbers - The array of numbers to factorize.
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.PrimeFactorization({numbers:[12,24]})
     * ```
     */
    PrimeFactorization({ numbers }: {
        numbers: number[];
    }): void;
    /**
     * Arrow diagram for inequalities.
     * @category tool
     * @param items - Represent the inequalities.
     * @param ticks - Represent the tick or cross for each region.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
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
    Inequalities({ items, ticks, scale, ratio }: {
        items: {
            position: number;
            sign: string;
            num: number | string;
            vertical: boolean;
            base: number;
        }[];
        ticks: boolean[];
        scale: number;
        ratio: number;
    }): void;
    /**
     * Trig Graph for solving basic trig equation.
     * @category tool
     * @param trig - 'sin' | 'cos' | 'tan'
     * @param k - value of trig, like sin = k.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.TrigSolution({trig:'sin', k:0.5})
     * ```
     */
    TrigSolution({ trig, k, scale, ratio }: {
        trig: TrigFunc;
        k: number;
        scale: number;
        ratio: number;
    }): void;
    /**
     * Sketch for solving quadratic inequality.
     * @category tool
     * @param quadratic - [a,b,c] representing coeff of quadratic inequality.
     * @param sign - The sign of the inequality. Can be like '>=' , '<' or '\\ge' , '\\lt'.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.QuadraticInequality({quadratic:[1,2,-3],sign:'\\ge'})
     * ```
     */
    QuadraticInequality({ quadratic, sign, scale, ratio }: {
        quadratic: [number, number, number];
        sign: string;
        scale: number;
        ratio: number;
    }): void;
    /**
     * Draw a triangle.
     * @category tool
     * @param vertices - [A,B,C] an array of coordinates [x,y] of 3 vertices, must be anticlockwise.
     * @param triangle - The elements of triangle to print, {sideC,angleB,sideA,angleC,sideB,angleA}. If falsy, show no label.
     * @param labels - The labels of the vertices. If falsy, show no label.
     * @param heights - Whether to draw the height.
     * @param scale - scale for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.Triangle({
     *   vertices:[[0,0],[4,0],[0,3]],
     *   triangle:{sideC:4,angleB:37,sideA:5,angleC:53,sideB:3,angleA:90},
     *   labels:['A','B','C'],
     *   heights :[false, false, false]
     * })
     * ```
     */
    Triangle({ vertices, triangle, labels, heights, scale }: {
        vertices: Point[];
        triangle: any;
        labels: string[];
        heights: [boolean, boolean, boolean];
        scale: number;
    }): void;
    /**
     * Draw a graph for linear programming.
     * @category tool
     * @param constraints - Constraint as system of inequalities, like [[1,1,'<',2]] represent x+y<2.
     * @param field - The target linear function to optimize, [a,b,c] represent ax+by+c.
     * @param contours - The contours to draw, [4,5] represent P=4 and P=5.
     * @param labelConstraints - Constraint to label integral points.
     * @param highlights - Points to highlight, [{point,color,circle,contour,coordinates,label}].
     * @param ranges - Range of Canvas.
     * @param resolution - Resolution of Canvas
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * let constraints = [[1, 1, "<=", 5], [1, -1, "<", 4], [2, 1, ">=", -5], [3, 1, ">", -10]]
     * pen.LinearProgram({
     *     constraints,
     *     field: [1, -3, 3],
     *     contours: [4,5],
     *     labelConstraints: [(x,y)=>y>0],
     *     highlights: [{point:[0,0]}],
     *     ranges: [[-10,10],[-10,10]],
     *     resolution: 0.1,
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
     *     constraintColors = ['black','black']
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
     * @category tool
     * @param a - no. of dot of 1st pattern
     * @param p - P_n+1 = P_n + (pn+q)
     * @param q - P_n+1 = P_n + (pn+q)
     * @param n - the pattern required
     * @param offset - offset of initial position
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.DotPattern({a:3, p:3, q:2, n:4, offset:1})
     * ```
     */
    DotPattern({ a, p, q, n, offset }: {
        a: number;
        p: number;
        q: number;
        n: number;
        offset: number;
    }): void;
    /**
     * A pie chart
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.PieChart({
     *   categories: ['a','b','c','d','e'],
     *   labels: ['10%','20%','30%','40%',''],
     *   angles: [45,135,60,50,70],
     *   angleLabels: [null,'x',null,null,''],
     *   size:1.5
     * })
     * ```
     */
    PieChart({ categories, labels, angles, angleLabels, size }: {
        categories: string[];
        labels: string[];
        angles: number[];
        angleLabels: string[];
        size: number;
    }): void;
    /**
     * A bar chart / line chart / histogram / frequency polygon / cf polygon
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.HeightChart({
     *   categories: ['a','b','c','d','e'],
     *   data:[7,47,15,3,7],
     *   xLabel:'x-axis',
     *   yLabel:'y-axis',
     *   interval:5,
     *   subInterval:1,
     *   barWidth:1,
     *   barGap:1,
     *   showBar:true,
     *   showLine:true
     * })
     * ```
     */
    HeightChart({ categories, data, xLabel, yLabel, interval, subInterval, barWidth, barGap, showBar, showLine }: {
        categories: string[];
        data: number[];
        xLabel: string;
        yLabel: string;
        interval: number;
        subInterval: number;
        barWidth: number;
        barGap: number;
        showBar: boolean;
        showLine: boolean;
    }): void;
    /**
     * A pie chart
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.StemAndLeaf({
     *   data: [2,5,6,12,14,16,23,23,24,25,26,26,26,26,27,31],
     *   labels: [2,'x',6,12,14,16,23,23,24,25,26,26,26,26,27,31],
     *   stemTitle: "Stem (10 units)",
     *   leafTitle: "Leaf (1 unit)"
     * })
     * ```
     */
    StemAndLeaf({ data, labels, stemTitle, leafTitle }: {
        data: number[];
        labels?: string[];
        stemTitle: string;
        leafTitle: string;
    }): void;
    /**
     * A boxplot
     * @category tool
     * @returns
     * ```typescript
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
    Boxplot({ summary, labels, size, tick, start, end, showDash, showValue, showTick }: {
        summary: number[];
        labels: (string | null)[];
        size: number;
        tick: number;
        start?: number;
        end?: number;
        showDash: boolean;
        showValue: boolean;
        showTick: boolean;
    }): void;
}
declare var AutoPen: typeof AutoPenCls;

/**
 * @ignore
 */
declare var PEN_QUALITY: number;
/**
 * @ignore
 */
declare class FrameCls {
    wPixel: number;
    hPixel: number;
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    axisOffset: number;
    constructor();
    xWidth(): number;
    yHeight(): number;
    xUnit(): number;
    yUnit(): number;
    toPix(xyArr: Point): Point;
    toCoord(xyArr: Point): Point;
    private _ticks;
    xTicks(interval: number): number[];
    yTicks(interval: number): number[];
    xRange(): [number, number];
    yRange(): [number, number];
    xOffset(): number;
    yOffset(): number;
}
/**
 * @ignore
 */
declare var Frame: typeof FrameCls;

import './Frame.ts';
import './Pen.ts';
import './AutoPen.ts';
import './3D.ts';

export declare class Config {
    sections: section[];
    answer: string;
    options: Partial<Dict>;
    constructor(sections?: section[], answer?: string, options?: Partial<Dict>);
}
export declare class Dict {
    a: any;
    b: any;
    c: any;
    d: any;
    e: any;
    f: any;
    g: any;
    h: any;
    i: any;
    j: any;
    k: any;
    l: any;
    m: any;
    n: any;
    o: any;
    p: any;
    q: any;
    r: any;
    s: any;
    t: any;
    u: any;
    v: any;
    w: any;
    x: any;
    y: any;
    z: any;
    A: any;
    B: any;
    C: any;
    D: any;
    E: any;
    F: any;
    G: any;
    H: any;
    I: any;
    J: any;
    K: any;
    L: any;
    M: any;
    N: any;
    O: any;
    P: any;
    Q: any;
    R: any;
    S: any;
    T: any;
    U: any;
    V: any;
    W: any;
    X: any;
    Y: any;
    Z: any;
    private variables;
    constructor(a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any, i?: any, j?: any, k?: any, l?: any, m?: any, n?: any, o?: any, p?: any, q?: any, r?: any, s?: any, t?: any, u?: any, v?: any, w?: any, x?: any, y?: any, z?: any, A?: any, B?: any, C?: any, D?: any, E?: any, F?: any, G?: any, H?: any, I?: any, J?: any, K?: any, L?: any, M?: any, N?: any, O?: any, P?: any, Q?: any, R?: any, S?: any, T?: any, U?: any, V?: any, W?: any, X?: any, Y?: any, Z?: any);
    update(other: Partial<Dict>): void;
    checked(): boolean;
    substitute(text: string): string;
}

declare global {
    var MathSoil: any;
}
export {};

export declare class Soil {
    private readonly gene;
    private qn;
    private sol;
    private dict;
    private config;
    private counter;
    private errorPile;
    constructor(gene: Gene);
    private reset;
    private recordError;
    private evalCode;
    private pushDict;
    private isValidated;
    private katex;
    private runPopulate;
    private runSection;
    private runPreprocess;
    private runOption;
    private runSubstitute;
    private runPostprocess;
    private runShuffle;
    private runKatex;
    private successFruit;
    private errorFruit;
    nurture(): Fruit;
}

declare type section = [number | string, number];
declare type Fruit = {
    readonly qn: string;
    readonly sol: string;
    readonly ans: string | undefined;
    counter: number;
    readonly success: boolean;
};
declare type Gene = {
    readonly qn: string;
    readonly sol: string;
    readonly populate: string;
    readonly validate: string;
    readonly preprocess: string;
    readonly postprocess: string;
};

/**
 * @category Algebra
 * @return solve [x,y] from ax+by=c and px+qy=r.
 * ```typescript
 * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * Crammer(1,1,3,2,2,6) // throw
 * ```
 */
declare function Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number];
/**
 * @category Algebra
 * @return the product of two input polynomials.
 * ```typescript
 * // do (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
 * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
 * ```
 */
declare function xPolynomial(poly1: number[], poly2: number[]): number[];
/**
 * @category Algebra
 * @return the points along the parametric curve
 * ```typescript
 * Trace(x => x ** 2, 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * Trace(t => [t,t**2], 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * ```
 */
declare function Trace(func: (t: number) => number | Point, tStart: number, tEnd: number, dots?: number): Point[];

/**
 * @category Circle
 * @return D,E,F of circle general form
 * ```typescript
 * CircleGeneral([2,3],5) // [-4,-6,-12]
 * ```
 */
declare function CircleGeneral(centre: Point, radius: number): [D: number, E: number, F: number];
/**
 * @category Circle
 * @return centre and radius from general form
 * ```typescript
 * CircleFromGeneral(-4,-6,-12) // [[2,3],5]
 * ```
 */
declare function CircleFromGeneral(D: number, E: number, F: number): [Point, number];
/**
 * @category Circle
 * @return all integral points on the circle
 * ```typescript
 * IntegralOnCircle([0,0],5) // [[[5,0],[0,5],[-5,0],[0,-5]],[[4,3],[-3,4],[-4,-3],[3,-4]],[[3,4],[-4,3],[-3,-4],[4,-3]]]
 * ```
 */
declare function IntegralOnCircle(centre: Point, radius: number): Point[][];

/**
 * @category Linear
 * @return [x-int,y-int,slope] of ax+by+c=0
 * ```typescript
 * LinearFeature(2,4,6) // [-3,-1.5,-0.5]
 * LinearFeature(0,4,6) // throw
 * ```
 */
declare function LinearFeature(a: number, b: number, c: number): [xInt: number, yInt: number, slope: number];
/**
 * @category Linear
 * @return [slope,yInt] from ax+by+c=0
 * ```typescript
 * LineFromLinear(2,4,6) // [-0.5,-1.5]
 * LineFromLinear(0,4,6) // [0,-1.5]
 * ```
 */
declare function LineFromLinear(a: number, b: number, c: number): Line;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from given intercepts
 * ```typescript
 * LinearFromIntercepts(1,2) // [2,1,-2]
 * LinearFromIntercepts(0,2) // throw
 * ```
 */
declare function LinearFromIntercepts(xInt: number, yInt: number): Linear;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from two given points
 * ```typescript
 * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
 * LinearFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
declare function LinearFromTwoPoints(point1: Point, point2: Point): Linear;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from point and slope
 * ```typescript
 * LinearFromPointSlope([1,2],3) // [3,-1,-1]
 * LinearFromPointSlope([1,2],0) // [0,1,-2]
 * ```
 */
declare function LinearFromPointSlope(point: Point, slope: number): Linear;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from perpendicular bisector of AB
 * ```typescript
 * LinearFromBisector([1,2],[3,4]) // [1,1,-5]
 * LinearFromBisector([1,2],[1,4]) // [0,1,-3]
 * ```
 */
declare function LinearFromBisector(A: Point, B: Point): Linear;
/**
 * @category Linear
 * @return [slope,yInt] from given intercepts
 * ```typescript
 * LineFromIntercepts(1,2) // [-2,2]
 * LineFromIntercepts(0,2) // throw
 * ```
 */
declare function LineFromIntercepts(xInt: number, yInt: number): Line;
/**
 * @category Linear
 * @return [slope,yInt] from two given points
 * ```typescript
 * LineFromTwoPoints([1,2],[3,4]) // [1,1]
 * LineFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
declare function LineFromTwoPoints(point1: Point, point2: Point): Line;
/**
 * @category Linear
 * @return [slope,yInt] from point and slope
 * ```typescript
 * LineFromPointSlope([1,2],3) // [3,-1]
 * LineFromPointSlope([1,2],0) // [0,2]
 * ```
 */
declare function LineFromPointSlope(point: Point, slope: number): Line;
/**
 * @category Linear
 * @return [slope,yInt] from perpendicular bisector of AB
 * ```typescript
 * LineFromBisector([1,2],[3,4]) // [-1,5]
 * LineFromBisector([1,2],[1,4]) // [0,3]
 * ```
 */
declare function LineFromBisector(A: Point, B: Point): Line;
/**
 * @ignore
 */
declare class LinearEquation {
    private _linear;
    private _slope;
    private _xInt;
    private _yInt;
    byTwoPoints(p1: Point, p2: Point): this;
    byPointSlope(p: Point, m: number): this;
    byIntercepts(x: number, y: number): this;
    byBisector(A: Point, B: Point): this;
    byLinear(linear: Linear): this;
    private refresh;
    linear(): Linear;
    line(): Line;
}

/**
 * @category Quadratic
 * @return the discriminant b^2-4ac.
 * ```typescript
 * Discriminant(2,3,4) // -23
 * ```
 */
declare function Discriminant(a: number, b: number, c: number): number;
/**
 * @category Quadratic
 * @return the roots [p,q] of ax^2+bx+c=0 where p<=q
 * ```typescript
 * QuadraticRoot(1,2,-3) // [-3,1]
 * QuadraticRoot(1,2,3) // throw when no real root
 * ```
 */
declare function QuadraticRoot(a: number, b: number, c: number): [number, number];
/**
 * @category Quadratic
 * @return the vertex [h,k] of y=ax^2+bx+c.
 * ```typescript
 * QuadraticVertex(1,2,3) // [-1,2]
 * ```
 */
declare function QuadraticVertex(a: number, b: number, c: number): Point;
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and roots p and q.
 * ```typescript
 * QuadraticFromRoot(1,2,3) // [1,-5,6]
 * QuadraticFromRoot(-2,4,-3) // [-2,2,24]
 * ```
 */
declare function QuadraticFromRoot(a: number, p: number, q: number): Quadratic;
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and vertex (h,k).
 * ```typescript
 * QuadraticFromVertex(1,2,3) // [1,-4,7]
 * QuadraticFromVertex(-2,4,-3) // [-2,16,-35]
 * ```
 */
declare function QuadraticFromVertex(a: number, h: number, k: number): Quadratic;

/**
 * @category Assertion
 * @return check is a finite number.
 * ```typescript
 * IsNum(1.23) // true
 * IsNum(NaN) // false
 * IsNum(Infinity) // false
 * IsNum('2') // false
 * ```
 */
declare function IsNum(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an integer.
 * ```typescript
 * IsInteger(5) // true
 * IsInteger(0.5) // false
 * ```
 */
declare function IsInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a decimal (non-integer).
 * ```typescript
 * IsDecimal(0.5) // true
 * IsDecimal(5) // false
 * ```
 */
declare function IsDecimal(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a rational number with denominator <= 1000.
 * ```typescript
 * IsRational(0.5) // true
 * IsRational(-5) // true
 * IsRational(Math.sqrt(2)) // false
 * ```
 */
declare function IsRational(...items: any[]): boolean;
/**
 * @category Assertion
 * @ignore
 * @deprecated
 * @return check is an integer but not -1, 0 or 1.
 * ```typescript
 * IsCoeff(2) // true
 * IsCoeff(-1) // false
 * ```
 */
declare function IsCoeff(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an odd integer.
 * ```typescript
 * IsOdd(5) // true
 * IsOdd(-5) // true
 * IsOdd(4) // false
 * ```
 */
declare function IsOdd(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an even integer.
 * ```typescript
 * IsEven(4) // true
 * IsEven(-4) // true
 * IsEven(0) // true
 * IsEven(5) // false
 * ```
 */
declare function IsEven(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is in range [0,1].
 * ```typescript
 * IsProbability(0) // true
 * IsProbability(0.5467) // true
 * IsProbability(1.1) // false
 * IsProbability(-0.1) // false
 * ```
 */
declare function IsProbability(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a square number.
 * ```typescript
 * IsSquareNum(9) // true
 * IsSquareNum(10) // false
 * IsSquareNum(-9) // false
 * ```
 */
declare function IsSquareNum(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is positive.
 * ```typescript
 * IsPositive(2) // true
 * IsPositive(0) // false
 * IsPositive(-2) // false
 * ```
 */
declare function IsPositive(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is non-negative.
 * ```typescript
 * IsNonNegative(2) // true
 * IsNonNegative(0) // true
 * IsNonNegative(-2) // false
 * IsNonNegative(1.5) // true
 * ```
 */
declare function IsNonNegative(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a positive integer.
 * ```typescript
 * IsPositiveInteger(2) // true
 * IsPositiveInteger(0) // false
 * IsPositiveInteger(-2) // false
 * IsPositiveInteger(1.5) // false
 * ```
 */
declare function IsPositiveInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a non-negative integer.
 * ```typescript
 * IsNonNegativeInteger(2) // true
 * IsNonNegativeInteger(0) // true
 * IsNonNegativeInteger(-2) // false
 * IsNonNegativeInteger(1.5) // false
 * ```
 */
declare function IsNonNegativeInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is negative.
 * ```typescript
 * IsNegative(-2) // true
 * IsNegative(0) // false
 * IsNegative(2) // false
 * ```
 */
declare function IsNegative(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is non-zero finite number.
 * ```typescript
 * IsNonZero(2) // true
 * IsNonZero(0) // false
 * IsNonZero(-2) // true
 * ```
 */
declare function IsNonZero(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is between min and max inclusive.
 * ```typescript
 * IsBetween(2,5)(3) // true
 * IsBetween(2,5)(2) // true
 * IsBetween(2,5)(1) // false
 * ```
 */
declare function IsBetween(min: number, max: number): (...items: any[]) => boolean;
/**
 * @category Assertion
 * @return check if its abs is between min and max inclusive.
 * ```typescript
 * IsAbsBetween(2,5)(-3) // true
 * IsAbsBetween(2,5)(-2) // true
 * IsAbsBetween(2,5)(1) // false
 * ```
 */
declare function IsAbsBetween(min: number, max: number): (...items: any[]) => boolean;
/**
 * @category Assertion
 * @return Check if the points are chessboard around anchor.
 * ```typescript
 * IsAroundPoint([0,0],2)([2,2]) // true
 * IsAroundPoint([0,0],2)([3,0]) // false
 * ```
 */
declare function IsAroundPoint(anchor: Point, range: number): (...points: Point[]) => boolean;
/**
 * @category Assertion
 * @return Check if the array of legnths can form a triangle
 * ```typescript
 * IsTriangle([1,1,1]) // true
 * IsTriangle([6,7,8]) // true
 * IsTriangle([1,2,3]) // false
 * IsTriangle([6,14,8]) // false
 * ```
 */
declare function IsTriangle(...triangles: [number, number, number][]): boolean;
/**
 * @category Assertion
 * @return check if the item is a point [num,num]
 * ```typescript
 * IsPoint([2,5]) // true
 * IsPoint(2) // false
 * IsPoint([1,2,3]) // false
 * IsPoint([NaN,NaN]) // false
 * ```
 */
declare function IsPoint(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a fraction [num,num]
 * ```typescript
 * IsFraction([2,5]) // true
 * IsFraction(2) // false
 * IsFraction([1,2,3]) // false
 * IsFraction([NaN,NaN]) // false
 * ```
 */
declare function IsFraction(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a vector [num,num]
 * ```typescript
 * IsVector([2,5]) // true
 * IsVector(2) // false
 * IsVector([1,2,3]) // false
 * IsVector([NaN,NaN]) // false
 * ```
 */
declare function IsVector(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a IneqSign string
 * ```typescript
 * IsIneqSign('>') // true
 * IsIneqSign('\\ge') // true
 * IsIneqSign(true) // false
 * IsIneqSign('=>') // false
 * ```
 */
declare function IsIneqSign(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a Dfrac string
 * ```typescript
 * IsDfrac('\\dfrac{1}{2}') // true
 * IsDfrac('\\dfrac{x}{2}') // false
 * ```
 */
declare function IsDfrac(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a constraint (LP)
 * ```typescript
 * IsConstraint([1,2,'>',3]) // true
 * IsConstraint([1,2,3]) // false
 * IsConstraint([1,2,'=>',3]) // false
 * ```
 */
declare function IsConstraint(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a string
 * ```typescript
 * IsString('abc') // true
 * IsString('') // true
 * IsString('1') // true
 * IsString(1) // false
 * ```
 */
declare function IsString(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a boolean
 * ```typescript
 * IsBoolean(true) // true
 * IsBoolean(false) // true
 * IsBoolean('') // false
 * IsBoolean('1') // false
 * IsBoolean(1) // false
 * ```
 */
declare function IsBoolean(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is an empty object
 * ```typescript
 * IsEmptyObject({}) // true
 * IsEmptyObject(1) // false
 * IsEmptyObject('abc') // false
 * IsEmptyObject({x:1}) // false
 * ```
 */
declare function IsEmptyObject(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is an array
 * ```typescript
 * IsArray([]) // true
 * IsArray([1,2]) // true
 * IsArray('abc') // false
 * IsArray({x:1}) // false
 * ```
 */
declare function IsArray(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is an array with given length
 * ```typescript
 * IsArrayOfLength(2)([1]) // false
 * IsArrayOfLength(2)([1,2]) // true
 * IsArrayOfLength(2)([1,2,3]) // false
 * IsArrayOfLength('abc') // false
 * IsArrayOfLength({x:1}) // false
 * ```
 */
declare function IsArrayOfLength(length: number): (...items: any[]) => boolean;

/**
 * @category Combinatorics
 * @return the factorial n!
 * ```typescript
 * Factorial(5) // 120
 * Factorial(1.5) // throw
 * ```
 */
declare function Factorial(n: number): number;
/**
 * @category Combinatorics
 * @return nCr
 * ```typescript
 * nCr(5,3) // 10
 * ```
 */
declare function nCr(n: number, r: number): number;
/**
 * @category Combinatorics
 * @return nPr
 * ```typescript
 * nPr(5,3) // 60
 * ```
 */
declare function nPr(n: number, r: number): number;

/**
* @category Flow
* @return a random config of a Combo Options question type.
* ```typescript
* RndComboConfig()
* // may return {
* //   truth: [true, true, false],
* //   choices: ["I and II", "I only", "I and III", "I, II and III"],
* //   sections: [[1,1], [2,1], [3,0]]
* //  }
* // truth: the true value of the 3 options.
* // choices: for filling in the 4 answer choices, the 1st is correct.
* // sections: the sections object for section versioning, version 0 is false, version 1 is true.
* ```
*/
declare function RndComboConfig(): {
    truth: boolean[];
    choices: string[];
    sections: [number, number][];
};

/**
 * @category Fraction
 * @return normalize the sign of a fraction p/q
 * ```typescript
 * FracSign(2,3) // [2,3]
 * FracSign(-2,3) // [-2,3]
 * FracSign(2,-3) // [-2,3]
 * FracSign(-2,-3) // [2,3]
 * FracSign(0,-2) // [0,2]
 * FracSign(-2,0) // [-2,0]
 * ```
 */
declare function FracSign(p: number, q: number): Fraction;
/**
 * @category Fraction
 * @return simplified fraction p/q
 * ```typescript
 * Frac(6,4) // [3,2]
 * Frac(-4,2) // [-2,1]
 * Frac(18,-12) // [-3,2]
 * Frac(-10,-20) // [1,2]
 * Frac(0,2) // [0,2]
 * Frac(1.5,-2) // [-1.5,2]
 * ```
 */
declare function Frac(p: number, q: number): Fraction;
/**
 * @category Fraction
 * @return add fractions
 * ```typescript
 * FracAdd([1,2],[1,3]) // [5,6]
 * FracAdd([1,2],[-1,3]) // [1,6]
 * FracAdd([2,3],[3,4],[4,5]) // [133,60]
 * FracAdd([2,3],[4,3]) // [2,1]
 * ```
 */
declare function FracAdd(...fractions: Fraction[]): Fraction;
/**
 * @category Fraction
 * @return add fractions
 * ```typescript
 * FracMultiply([1,2],[1,3]) // [1,6]
 * FracMultiply([1,2],[-1,3]) // [-1,6]
 * FracMultiply([2,3],[3,4],[4,5]) // [2,5]
 * FracMultiply([2,3],[4,3]) // [8,9]
 * FracMultiply([0,3],[4,3]) // [0,9]
 * ```
 */
declare function FracMultiply(...fractions: Fraction[]): Fraction;
/**
 * @category Fraction
 * @return convert num to fraction
 * ```typescript
 * ToFrac(0.5) // [1,2]
 * ToFrac(-456/123) // [-152,41]
 * ```
 */
declare function ToFrac(num: number, maxDenominator?: number): Fraction;

/**
 * @category Function
 * @return log(b,N)
 * ```typescript
 * log(2,8) // 3
 * ```
 */
declare function log(b: number, N: number): number;
/**
 * @category Function
 * @return a**b, a to the power of b.
 * ```typescript
 * Power(2,3) // 8
 * ```
 */
declare function Power(a: number, b: number): number;
/**
 * @category Function
 * @return square root of x
 * ```typescript
 * Sqrt(4) // 2
 * ```
 */
declare function Sqrt(x: number): number;
/**
 * @category Function
 * @return the radian of the degree
 * ```typescript
 * Radian(180) // pi
 * Radian(90) // pi/2
 * Radian(30) // PI/6
 * ```
 */
declare function Radian(degree: number): number;
/**
 * @category Function
 * @return the degree of the radian
 * ```typescript
 * Degree(Math.PI) // 180
 * Degree(Math.PI/2) // 90
 * Degree(Math.PI/6) // 30
 * ```
 */
declare function Degree(radian: number): number;
/**
 * @category Function
 * @return sin(x).
 * ```typescript
 * sin(30) // 0.5
 * ```
 */
declare function sin(x: number): number;
/**
 * @category Function
 * @return cos(x).
 * ```typescript
 * cos(60) // 0.5
 * ```
 */
declare function cos(x: number): number;
/**
 * @category Function
 * @return tan(x).
 * ```typescript
 * tan(45) // 1
 * ```
 */
declare function tan(x: number): number;
/**
 * @category Function
 * @return arcsin(x) between -90 and 90.
 * ```typescript
 * arcsin(0.5) // 30
 * ```
 */
declare function arcsin(x: number): number;
/**
 * @category Function
 * @return arccos(x) between 0 and 180.
 * ```typescript
 * arccos(0.5) // 60
 * ```
 */
declare function arccos(x: number): number;
/**
 * @category Function
 * @return arctan(x) between -90 and 90.
 * ```typescript
 * arctan(1) // 45
 * ```
 */
declare function arctan(x: number): number;

/**
 * @category Geometry
 * @return the slope of AB
 * ```typescript
 * Slope([0,0],[1,2]) // 2
 * Slope([1,2],[1,2]) // NaN
 * ```
 */
declare function Slope(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the distance AB
 * ```typescript
 * Distance([0,0],[1,2]) // 2.23606797749979
 * ```
 */
declare function Distance(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the chessboard distance AB, max(horizontal,vertical)
 * ```typescript
 * ChessboardDistance([0,0],[1,2]) // 2
 * ChessboardDistance([0,0],[3,2]) // 3
 * ```
 */
declare function ChessboardDistance(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the mid-pt of AB
 * ```typescript
 * MidPoint([1,2],[3,4]) // [2,3]
 * ```
 */
declare function MidPoint(A: Point, B: Point): Point;
/**
 * @category Geometry
 * @return the point P on AB such that AP : PB = ratio : 1-ratio
 * ```typescript
 * DivisionPoint([1,0],[5,0],0.75) // [4,0]
 * ```
 */
declare function DivisionPoint(A: Point, B: Point, ratio?: number): Point;
/**
 * @category Geometry
 * @return point P rotated anticlockwise by angle q about point O.
 * ```typescript
 * RotatePoint([1,2],[0,0],90) // [-2,1]
 * ```
 */
declare function RotatePoint(P: Point, O: Point, q: number): Point;
/**
 * @category Geometry
 * @return the polar angle of B if A is the origin within [0,360].
 * ```typescript
 * Inclination([1,0],[3,2]) // 45
 * Inclination([3,2],[1,0]) // 225
 * ```
 */
declare function Inclination(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the polar angle of a normal direction to AB, on the right of AB.
 * ```typescript
 * Normal([1,0],[3,2]) // 315
 * Normal([3,2],[1,0]) // 135
 * ```
 */
declare function Normal(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the foot of perpendicular from P to AB.
 * ```typescript
 * PerpendicularFoot([-1,-1],[1,1],[-2,2]) // [0,0]
 * ```
 */
declare function PerpendicularFoot(A: Point, B: Point, P: Point): Point;
/**
 * @category Geometry
 * @return the intersection point of AB and CD.
 * ```typescript
 * Intersection([0,0],[2,2],[2,0],[0,2]) // [1,1]
 * ```
 */
declare function Intersection(A: Point, B: Point, C: Point, D: Point): Point;
/**
 * @category Geometry
 * @return Translate point P in the polar angle q (or the direction of point q) by a distance.
 * ```typescript
 * TranslatePoint([1,2],90,3) // [1,5]
 * TranslatePoint([1,2],[10, 12],3) // [3.006894195, 4.229882439]
 * ```
 */
declare function TranslatePoint(P: Point, q: number | Point, distance: number): Point;
/**
 * @category Geometry
 * @return angle of intersection between two slopes
 * ```typescript
 * IntersectAngle(0,1) // 45
 * IntersectAngle(1,-1) // 90
 * ```
 */
declare function IntersectAngle(slope1: number, slope2: number): number;
/**
 * @category Geometry
 * @return angle AOB, non-reflex
 * ```typescript
 * Angle([1,0],[0,0],[0,2]) // 90
 * Angle([2,2],[1,1],[1,3]) // 45
 * Angle([1,3],[1,1],[2,2]) // 45
 * ```
 */
declare function Angle(A: Point, O: Point, B: Point): number;
/**
 * @category Geometry
 * @return angle AOB, measured anticlockwise
 * ```typescript
 * AnglePolar([1,0],[0,0],[0,2]) // 90
 * AnglePolar([2,2],[1,1],[1,3]) // 45
 * AnglePolar([1,3],[1,1],[2,2]) // 315
 * ```
 */
declare function AnglePolar(A: Point, O: Point, B: Point): number;
/**
 * @category Geometry
 * @return check if the polar angle AOB is reflex
 * ```typescript
 * IsReflex([1,0],[0,0],[0,2]) // false
 * IsReflex([2,2],[1,1],[1,3]) // false
 * IsReflex([1,3],[1,1],[2,2]) // true
 * ```
 */
declare function IsReflex(A: Point, O: Point, B: Point): boolean;

declare const LP_BOUND = 100;
declare function onBoundary(p: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return the value of field at given point
 * ```typescript
 * FieldAt([0,0],[1,2,3]) // 3
 * FieldAt([1,2],[3,-4,5]) // 0
 * ```
 */
declare function FieldAt(p: Point, field: Field): number;
/**
 *
 * @category LinearProgram
 * @return check if point is constrained by cons
 * ```typescript
 * isConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] satisfies all the constraints
 * ```
 */
declare function isConstrained(cons: Constraint[], point: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return check if point is constrained by cons, treating all cons as 'or equal to'
 * ```typescript
 * isLooseConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] loosely satisfies all the constraints
 * ```
 */
declare function isLooseConstrained(cons: Constraint[], point: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
declare function FeasiblePolygon(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
declare function FeasibleVertices(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return check if the feasible region is bounded
 * ```typescript
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
declare function FeasibleIsBounded(...cons: Constraint[]): boolean;
/**
 *
 * @category LinearProgram
 * @return the integral points inside the feasible polygon
 * ```typescript
 * FeasibleIntegral([
 *    [1, 0, '<', 3],
 *    [1, 0, '>', 0],
 *    [0, 1, '<', 2],
 *    [0, 1, '>', 0]
 * ])
 * // [[1,1],[2,1]]
 * ```
 */
declare function FeasibleIntegral(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return the point with the max value of field
 * ```typescript
 * MaximizePoint([[0,0],[10,10]],[1,2,3]) // [10,10]
 * ```
 */
declare function MaximizePoint(points: Point[], field: Field): Point;
/**
 *
 * @category LinearProgram
 * @return the point with the min value of field
 * ```typescript
 * MinimizePoint([[0,0],[10,10]],[1,2,3]) // [0,0]
 * ```
 */
declare function MinimizePoint(points: Point[], field: Field): Point;
/**
 *
 * @category LinearProgram
 * @return the point with the min/max value of field
 * ```typescript
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [10,10]
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [0,0]
 * ```
 */
declare function OptimizePoint(points: Point[], field: Field, max: boolean): Point;
/**
 *
 * @category LinearProgram
 * @return the min/max value of field
 * ```typescript
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 33
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 3
 * ```
 */
declare function OptimizeField(points: Point[], field: Field, max: boolean): number;

/**
 * @category Numeracy
 * @return division with x/0 handling
 * ```typescript
 * Divide(6,2) // 3
 * Divide(6,0) // throw
 * ```
 */
declare function Divide(dividend: number, divisor: number): number;
/**
 * @category Numeracy
 * @return the absolute value. Equivalent to Math.abs(x).
 * ```typescript
 * Abs(-2) // 2
 * ```
 */
declare function Abs(num: number): number;
/**
 * @category Numeracy
 * @return the sign of the number as 1,0 or -1.
 * ```typescript
 * Sign(3) // 1
 * Sign(-4.5) // -1
 * Sign(0) // 0
 * ```
 */
declare function Sign(num: number): -1 | 0 | 1;
/**
 * @category Numeracy
 * @return the number rounded off to given sigfig.
 * ```typescript
 * Round(1.23456,3) // 1.23
 * Round(1.23567,3) // 1.24
 * ```
 */
declare function Round(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded up to given sigfig.
 * ```typescript
 * RoundUp(1.23456,3) // 1.23
 * RoundUp(1.23567,1) // 2
 * ```
 */
declare function RoundUp(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded down to given sigfig.
 * ```typescript
 * RoundDown(1.23456,5) // 1.2345
 * RoundDown(1.6789,1) // 1
 * ```
 */
declare function RoundDown(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded off to given decimal place.
 * ```typescript
 * Fix(12345.678,0) // round to integer, return 12346
 * Fix(12345.678,2) // round to 2 dp, return 12345.68
 * Fix(12345.678,-2) // round to hundred, return 12300
 * ```
 */
declare function Fix(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the number rounded up to given decimal place.
 * ```typescript
 * FixUp(12.34,0) // round to integer, return 13
 * FixUp(12.34,1) // round to 1 dp, return 12.4
 * FixUp(12.34,-1) // round to ten, return 20
 * ```
 */
declare function FixUp(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the number rounded down to given decimal place.
 * ```typescript
 * FixDown(17.89,0) // round to integer, return 17
 * FixDown(17.89,1) // round to 1 dp, return 17.8
 * FixDown(17.89,-1) // round to ten, return 10
 * ```
 */
declare function FixDown(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the ceiling integer of the number.
 * ```typescript
 * Ceil(1.1) // 2
 * Ceil(-1.1) // -1
 * Ceil(2)) // 2
 * ```
 */
declare function Ceil(num: number): number;
/**
 * @category Numeracy
 * @return the floor integer of the number.
 * ```typescript
 * Floor(1.9) // 1
 * Floor(-1.9) // -2
 * Floor(2)) // 2
 * ```
 */
declare function Floor(num: number): number;
/**
 * @category Numeracy
 * @return reduce input array to simplest ratio.
 * ```typescript
 * SimpRatio(2,4,6) // [1,2,3]
 * SimpRatio(0,4,6) // [0,2,3]
 * SimpRatio(0,4) // [0,1]
 * ```
 */
declare function SimpRatio(...nums: number[]): number[];
/**
 * @category Numeracy
 * @return reduce input array to integral ratio.
 * ```typescript
 * IntegerRatio(2,4,6) // [1,2,3]
 * IntegerRatio(0,4,6) // [0,2,3]
 * IntegerRatio(0,4) // [0,1]
 * IntegerRatio(1/3,1/2,1/4) // [4,6,3]
 * IntegerRatio(Math.sqrt(2),1/2,1/4) // throw
 * ```
 */
declare function IntegerRatio(...nums: number[]): number[];
/**
 * @category Numeracy
 * @return the number of sigfig.
 * ```typescript
 * SigFig(1.234) // 4
 * SigFig(1200) // 2
 * SigFig(0.00123) // 3
 * ```
 */
declare function SigFig(value: number): number;
/**
 * @category Numeracy
 * @return count the decimal places
 * ```typescript
 * DecimalPlace(1.234) // 3
 * DecimalPlace(1200) // 0
 * DecimalPlace(0.00123) // 5
 * DecimalPlace(123.456789) // 6
 * ```
 */
declare function DecimalPlace(value: number): number;
/**
 * @category Numeracy
 * @return the order of magnitude
 * ```typescript
 * Magnitude(1) // 0
 * Magnitude(2) // 0
 * Magnitude(0.9) // -1
 * Magnitude(10) // 1
 * Magnitude(10.1) // 1
 * Magnitude(0.1) // -1
 * Magnitude(0.02) // -2
 * ```
 */
declare function Magnitude(num: number): number;
/**
 * @category Numeracy
 * @return the mantissa
 * ```typescript
 * Mantissa(1.23) // 1.23
 * Mantissa(123) // 1.23
 * Mantissa(0.123) // 1.23
 * ```
 */
declare function Mantissa(num: number): number;
/**
 * @category Numeracy
 * @return the lowest number with the next order of magnitude
 * ```typescript
 * LogCeil(5) // 10
 * LogCeil(23) // 100
 * LogCeil(0.456) // 1
 * LogCeil(0.00235) // 0.01
 * ```
 */
declare function LogCeil(num: number): number;
/**
 * @category Numeracy
 * @return the lowest number with the same order of magnitude
 * ```typescript
 * LogFloor(5) // 1
 * LogFloor(23) // 10
 * LogFloor(0.456) // 0.1
 * LogFloor(0.00235) // 0.001
 * ```
 */
declare function LogFloor(num: number): number;
/**
 * @category Numeracy
 * @return add a constant to the magnitude
 * ```typescript
 * Raise(12.34,1) // 123.4
 * Raise(12.34,-1) // 1.234
 * ```
 */
declare function Raise(num: number, add: number): number;
/**
 * @category Numeracy
 * @return correct for floating point error
 * ```typescript
 * Blur(0.1+0.2) // 0.3
 * Blur(0.81-1) // -0.19
 * Blur(1.1**2) // 1.21
 * ```
 */
declare function Blur(value: any, accuracy?: number): (typeof value);
/**
 * @category Numeracy
 * @return correct for floating point error
 * ```typescript
 * Blurs([0.1+0.2,0.81-1]) // [0.3,-0.19]
 * ```
 */
declare function Blurs(values: any[], accuracy?: number): (typeof values);

declare var PhyConst: {
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

/**
 * @category Random
 * @return a random integer in [min, max] inclusive.
 * ```typescript
 * RndN(2,5) // may return 2, 3, 4 or 5
 * ```
 */
declare function RndN(min: number, max: number): number;
/**
 * @category Random
 * @param n - default to 10
 * @return an array of n unique random integer in [min, max] inclusive.
 * ```typescript
 * RndNs(2,8,3) // may return [5,3,7]
 * ```
 */
declare function RndNs(min: number, max: number, n?: number): number[];
/**
 * @category Random
 * @return a random real number in [min, max] inclusive
 * ```typescript
 * RndR(1,2) // may return 1.242574363
 * ```
 */
declare function RndR(min: number, max: number): number;
/**
 * @category Random
 * @return 1 or -1
 * ```typescript
 * RndU() // may return 1 or -1
 * ```
 */
declare function RndU(): 1 | -1;
/**
 * @category Random
 * @return true or false.
 * ```typescript
 * RndT() // may return true or false
 * ```
 */
declare function RndT(): boolean;
/**
 * @category Random
 * @return a random integer in [min, max] or [-max, -min] inclusive.
 * ```typescript
 * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
 * ```
 */
declare function RndZ(min: number, max: number): number;
/**
 * @category Random
 * @param n - default to 10
 * @return an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive.
 * ```typescript
 * RndZs(2,8,3) // may return [5,-3,7]
 * ```
 */
declare function RndZs(min: number, max: number, n?: number): number[];
/**
 * @category Random
 * @return a random prime number less than or equal to max.
 * ```typescript
 * RndP(10) // may return 2, 3, 5 or 7
 * ```
 */
declare function RndP(max: number): number;
/**
 * @category Random
 * @return a random odd integer in [min, max] inclusive
 * ```typescript
 * RndOdd(3,8) // return 3, 5 or 7
 * ```
 */
declare function RndOdd(min: number, max: number): number;
/**
 * @category Random
 * @return a random even integer in [min, max] inclusive
 * ```typescript
 * RndEven(3,8) // return 4, 6 or 8
 * ```
 */
declare function RndEven(min: number, max: number): number;
/**
 * @category Random
 * @return an array of random polynomial coefficients
 * ```typescript
 * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)]
 * ```
 */
declare function RndPoly(...coeff: number[]): number[];
/**
 * @category Random
 * @return an array of a Pyth Triple
 * ```typescript
 * RndPyth(10) // may return [3,4,5]
 * ```
 */
declare function RndPyth(max?: number): [number, number, number];
/**
 * @category Random
 * @param min abs of intercept
 * @param max abs of intercept
 * @return a linear [a,b,c] in ax+by+c=0
 * ```typescript
 * RndLinearFromIntercept(1,5) // may return [2,-3,6]
 * ```
 */
declare function RndLinearFromInt(minInt: number, maxInt: number): Linear;
/**
 * @category Random
 * @return a point within given range
 * ```typescript
 * RndPoint([1,4],[10,14]) // may return [2,12]
 * // equivalent to [RndN(...xRange),Range(...yRange)]
 * RndPoint(2,4) // equivalent to RndPoint([-2,2],[-4,4])
 * ```
 */
declare function RndPoint(xRange: number | [number, number], yRange?: number | [number, number]): Point;
/**
 * @category Random
 * @return n angles in [0,360] at least cyclic separated by separation
 * ```typescript
 * RndAngles(3,50) // may return [30,90,200]
 * ```
 */
declare function RndAngles(n: number, separation: number): number[];
/**
 * @category Random
 * @return n vertices of a convex polygon generated by rounding a cyclic polygon
 * ```typescript
 * RndConvexPolygon(3,[0,0],10,50) // may return [[10,0],[-6,8],[0,-10]]
 * ```
 */
declare function RndConvexPolygon(n: number, center: Point, radius: number, separation: number): Point[];
/**
 * @category Random
 * @return n integers from [min, max]
 * ```typescript
 * RndData(10,15,5) // may return [11,11,12,13,15]
 * ```
 */
declare function RndData(min: number, max: number, n: number): number[];

/**
 * @category RandomShake
 * @return an array of n nearby values around anchor, within range inclusive, auto detecting the input type.
 * ```typescript
 * RndShake(10)
 * // equivalent to RndShakeN(10)
 * RndShake(10.5)
 * // equivalent to RndShakeR(10.5)
 * ```
 */
declare function RndShake(anchor: any): (typeof anchor)[];
/**
 * @category RandomShake
 * @param randomFunc - a function which generate a random item
 * @param predicate - a condition that the outcome item must satisfy
 * @param n - max number of trial.
 * @return a function which return a random item satisfying the predicate when called. If nothing pass the predicate after n trial, throw an error.
 * ```typescript
 * let func = Sieve(()=>RndN(1,10),x=>IsOdd(x))
 * func() // return an odd integer
 * ```
 */
declare function Sieve<T>(randomFunc: () => T, predicate: (x: T) => boolean, n?: number): () => T;
/**
 * @category RandomShake
 * @return 3 nearby same-signed integers, range = Max(5, anchor * 10%)
 * ```typescript
 * RndShakeN(5) // return 3 unique integers from 1-10
 * ```
 */
declare function RndShakeN(anchor: number): [number, number, number];
/**
 * @category RandomShake
 * @return 3 nearby same-signed real number with same precision, range = anchor * 50%
 * ```typescript
 * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
 * ```
 */
declare function RndShakeR(anchor: number): number[];
/**
 * @category RandomShake
 * @return 3 nearby same-sign rational by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```typescript
 * RndShakeQ(5/6)
 * // return 3 unique fractions around [5,6]
 * RndShakeQ(6/-5)
 * // return 3 unique fractions around [6,-5]
 * ```
 */
declare function RndShakeQ(anchor: number): number[];
/**
 * @category RandomShake
 * @return 3 nearby same-sign fraction by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```typescript
 * RndShakeFrac([5,6])
 * // return 3 unique fractions around [5,6]
 * RndShakeFrac([6,-5])
 * // return 3 unique fractions around [6,-5]
 * ```
 */
declare function RndShakeFrac(anchor: Fraction): Fraction[];
/**
 * @category RandomShake
 * @return 3 nearby same-signed Dfrac by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```typescript
 * RndShakeDfrac('\\dfrac{5}{6}')
 * // return 3 unique Dfrac around [5,6]
 * RndShakeDfrac('-\\dfrac{6}{5}')
 * // return 3 unique Dfrac around [6,-5]
 * ```
 */
declare function RndShakeDfrac(anchor: string): string[];
/**
 * @category RandomShake
 * @param anchor - must be a string of ineq sign
 * @return an array of 3 ineq signs, balanced in number.
 * ```typescript
 * RndShakeIneq('\\ge')
 * // may return ['\\ge','\\le','\\le']
 * ```
 */
declare function RndShakeIneq(anchor: string): string[];
/**
 * @category RandomShake
 * @param anchor - must be a point
 * @return an array of 3 point
 * ```typescript
 * RndShakePoint([3,4])
 * // may return [[2,5],[1,6],[4,2]]
 * ```
 */
declare function RndShakePoint(anchor: Point): Point[];

/**
 * @category RandomUtil
 * @return a random item from the given items
 * ```typescript
 * RndPick(2,4,6) // may return 2, 4 or 6
 * ```
 */
declare function RndPick<T>(...items: T[]): T;
/**
 * @category RandomUtil
 * @return a shuffled array of the given items
 * ```typescript
 * RndShuffle(2,4,6) // may return [4,2,6]
 * ```
 */
declare function RndShuffle<T>(...items: T[]): T[];
/**
 * @category RandomUtil
 * @return n random items from given items, not necessarily unique
 * ```typescript
 * RndPickN([2,4,6],2) // may return [4,2]
 * ```
 */
declare function RndPickN<T>(items: T[], n: number): T[];
/**
 * @category RandomUtil
 * @return n random unique items from given items
 * ```typescript
 * RndPickUnique([2,4,6],2) // may return [4,2]
 * RndPickUnique([1,2,2,2,2,2,2,2],2) // must return [1,2] or [2,1]
 * ```
 */
declare function RndPickUnique<T>(items: T[], n: number): T[];
/**
 * @category RandomUtil
 * @return n repeated item from items, where occurrences are balanced.
 * ```typescript
 * RndBalanced(['a','b'],6) // may return ['a','a','b','b','a','b']
 * RndBalanced(['a','b'],5) // may return ['a','a','b','b','a']
 * ```
 */
declare function RndBalanced<T>(items: T[], n: number): T[];
/**
 * @category RandomUtil
 * @return a random male name
 * ```typescript
 * RndHe() // may return 'Peter', 'David', etc
 * ```
 */
declare function RndHe(): string;
/**
 * @category RandomUtil
 * @return a random female name
 * ```typescript
 * RndShe() // may return 'Mary', 'Alice', etc
 * ```
 */
declare function RndShe(): string;
/**
 * @category RandomUtil
 * @return a random 3-letters array
 * ```typescript
 * RndLetters() // may return ['a','b','c'] or ['x','y','z'] or etc
 */
declare function RndLetters(): string[];

/**
 * @category Relation
 * @return Check if the numbers are all distinct.
 * ```typescript
 * AreDistinct(1,2,3) // true
 * AreDistinct(1,2,2) // false
 * ```
 */
declare function AreDistinct(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the absolute values of the numbers are all distinct.
 * ```typescript
 * AreAbsDistinct(1,2,3) // true
 * AreAbsDistinct(1,2,2) // false
 * AreAbsDistinct(1,2,-2) // false
 * ```
 */
declare function AreAbsDistinct(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the numbers all have the same sign.
 * ```typescript
 * AreSameSign(1,2,3) // true
 * AreSameSign(1,2,-3) // false
 * AreSameSign(1,2,0) // false
 * ```
 */
declare function AreSameSign(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the numbers all pairwise coprime.
 * ```typescript
 * AreCoprime(2,3) // true
 * AreCoprime(2,6) // false
 * AreCoprime(1,2) // true
 * AreCoprime(2,3,6) // true
 * AreCoprime(1.5,3) // true
 * AreCoprime(0,3) // true
 * ```
 */
declare function AreCoprime(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the points are all distinct.
 * ```typescript
 * AreDistinctPoint([1,2],[3,4]) // true
 * AreDistinctPoint([1,2],[1,2]) // false
 * ```
 */
declare function AreDistinctPoint(...points: Point[]): boolean;
/**
 * @category Relation
 * @return Check if the points are pairwise distant apart.
 * ```typescript
 * AreDistantPoint(2)([0,0],[3,0]) // true
 * AreDistantPoint(2)([0,0],[1,0]) // false
 * ```
 */
declare function AreDistantPoint(distance: number): (...points: Point[]) => boolean;
/**
 * @category Relation
 * @return Check if slopes are at least oblique at minAngle
 * ```typescript
 * AreOblique(40)(0,1) // true
 * AreOblique(40)(0,0.5) // false
 * ```
 */
declare function AreOblique(minAngle: number): (...slopes: number[]) => boolean;

/**
* @category Sequence
* @return an array of integers from start to end inclusive.
* ```typescript
* ListIntegers(2,6) // [2,3,4,5,6]
* ListIntegers(-2,1) // [-2,-1,0,1]
* ```
*/
declare function ListIntegers(start: number, end: number): number[];
/**
* @category Sequence
* @return Tn in an arithmetic sequence: a+(n-1)d
* ```typescript
* ASterm(2,3,10) // 29
* ASterm(5,-2,6) // -5
* ```
*/
declare function ASterm(a: number, d: number, n: number): number;
/**
* @category Sequence
* @return Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
* ```typescript
* ASsum(2,3,10) // 155
* ASsum(5,-2,6) // 0
* ```
*/
declare function ASsum(a: number, d: number, n: number): number;
/**
* @category Sequence
* @return an array of the first n terms in an arithmetic sequence.
* ```typescript
* ASequence(2,3,5) // [2,5,8,11,14]
* ASequence(5,-2,3) // [5,3,1]
* ```
*/
declare function ASequence(a: number, d: number, n?: number): number[];
/**
* @category Sequence
* @return Tn in a geometric sequence: ar**(n-1)
* ```typescript
* GSterm(2,3,4) // 54
* GSterm(5,-2,6) // -160
* ```
*/
declare function GSterm(a: number, r: number, n: number): number;
/**
* @category Sequence
* @param n - number of terms. if omitted, sum to infinity.
* @return Sn in a geometric sequence: a*(r*n-1)/(r-1)
* ```typescript
* GSsum(2,3,4) // 80
* GSsum(5,-2,3) // 15
* GSsum(3,0.5) // 6
* ```
*/
declare function GSsum(a: number, r: number, n?: number): number;
/**
* @category Sequence
* @return an array of the first n terms in a geometric sequence.
* ```typescript
* GSequence(2,3,5) // return [2,6,18,54,162]
* GSequence(5,-2,3) // return [5,-10,20]
* ```
*/
declare function GSequence(a: number, r: number, n?: number): number[];
/**
* @category Sequence
* @return the nth term in a quadratic sequence, 1st term = a, P_n+1=P_n + pn+q
* ```typescript
* QuadraticSequence(1,2,3,4) //
* ```
*/
declare function QuadraticSequence(a: number, p: number, q: number, n: number): number;
/**
* @category Sequence
* @return the nth term in a lucas sequence, a_n = p*a_{n-1} + q*a_{n-2}
* ```typescript
* LucasSequence(1,2,3,4,5) //
* ```
*/
declare function LucasSequence(first: number, second: number, p: number, q: number, n: number): number;

/**
 * @category Stat
 * @return the minimum value. Equivalent to Math.min().
 * ```typescript
 * Min(2,3,4) // 2
 * ```
 */
declare function Min(...nums: number[]): number;
/**
 * @category Stat
 * @return the maximum value. Equivalent to Math.max().
 * ```typescript
 * Max(2,3,4) // 4
 * ```
 */
declare function Max(...nums: number[]): number;
/**
 * @category Stat
 * @return the sorted array of numbers.
 * ```typescript
 * Sort(2,3,1) // [1,2,3]
 * ```
 */
declare function Sort(...nums: number[]): number[];
/**
 * @category Stat
 * @return the sorted array of items by giving each item a value.
 * ```typescript
 * SortBy([2,3,1],x=>x) // [1,2,3]
 * SortBy(["aa", "aaa", "a"], x => x.length) // ["a", "aa", "aaa"]
 * ```
 */
declare function SortBy<T>(items: T[], valueFunc: (_: T) => number): T[];
/**
 * @category Stat
 * @return sum of nums
 * ```typescript
 * Sum(1,2,3) // 6
 * Sum(-1,2,3,4,5) // 13
 * ```
 */
declare function Sum(...nums: number[]): number;
/**
 * @category Stat
 * @return mean of nums
 * ```typescript
 * Mean(1,2,3) // 2
 * Mean(-1,2,3,4,5) // 2.6
 * ```
 */
declare function Mean(...nums: number[]): number;
/**
 * @category Stat
 * @return median of nums
 * ```typescript
 * Median(1,2,3,4,50) // 3
 * Median(1,2,3,4,5,7) // 3.5
 * ```
 */
declare function Median(...nums: number[]): number;
/**
 * @category Stat
 * @return lower quartile of nums
 * ```typescript
 * LowerQ(1,2,3,4,5) // 1.5
 * LowerQ(1,2,3,4,5,7) // 2
 * ```
 */
declare function LowerQ(...nums: number[]): number;
/**
 * @category Stat
 * @return lower quartile of nums
 * ```typescript
 * UpperQ(1,2,3,4,5) // 4.5
 * UpperQ(1,2,3,4,5,7) // 5
 * ```
 */
declare function UpperQ(...nums: number[]): number;
/**
 * @category Stat
 * @return count frequency of item in array
 * ```typescript
 * Frequency(1)(2,3,4,1,5,1,1,4,5) // 3
 * ```
 */
declare function Frequency(item: any): (...items: (typeof item)[]) => number;
/**
 * @category Stat
 * @return mode of nums
 * ```typescript
 * Mode(1,2,3,2,2,3,4) \\ 2
 * Mode(1,1,2,2,3) \\ NaN
 * ```
 */
declare function Mode(...nums: number[]): number;
/**
 * @category Stat
 * @return SD of nums
 * ```typescript
 * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
 * StdDev(1,1,2,2,3) \\ 0.748331477
 * ```
 */
declare function StdDev(...nums: number[]): number;

/**
* @category Text
* @return a string of joined elements. [1,2,3] --> '1, 2 and 3'
* ```typescript
* GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
* GrammarJoin('a','b','c') // 'a, b and c'
* ```
*/
declare function GrammarJoin(...items: any[]): string;
/**
* @category Text
* @return '✔' or '✘'.
* ```typescript
* Tick(true) // '✔'
* Tick(false) // '✘'
* ```
*/
declare function Tick(bool: boolean): string;
/**
* @category Text
* @return Array of '✔' or '✘'.
* ```typescript
* Ticks(true,false) // ['✔','✘']
* ```
*/
declare function Ticks(...bools: boolean[]): string[];
/**
* @category Text
* @return a pair of latex inequalities sign array like ['\\ge', '\\le'].
* ```typescript
* IneqSign(true,true) // ['\\ge', '\\le']
* IneqSign(true,false) // ['\\gt', '\\lt']
* IneqSign(false,true) // ['\\le', '\\ge']
* IneqSign(false,false) // ['\\lt', '\\gt']
* ```
*/
declare function IneqSign(greater: boolean, equal?: boolean): [string, string];
/**
* @category Text
* @return parse an inequality sign to booleans [greater,equal]
* ```typescript
* ParseIneqSign('\\ge') // [true,true]
* ParseIneqSign('\\le') // [false,true]
* ParseIneqSign('\\gt') // [true,false]
* ParseIneqSign('\\lt') // [false,false]
* ParseIneqSign('>=') // [true,true]
* ParseIneqSign('<=') // [false,true]
* ParseIneqSign('>') // [true,false]
* ParseIneqSign('<') // [false,false]
* ParseIneqSign('abc') // throw
* ```
*/
declare function ParseIneqSign(text: string): IneqSign;
/**
* @category Text
* @param upSign - put -ve sign on numerator instead of the front.
* @return latex of dfrac p/q like \dfrac{1}{2}.
* ```typescript
* Dfrac(1,2) // '\\dfrac{1}{2}'
* Dfrac(1,-2) // '\\dfrac{-1}{2}'
* Dfrac(6,4) // '\\dfrac{3}{2}'
* Dfrac(6,-2) // '-3'
* Dfrac(0,2) // '0'
* Dfrac(5,0) // undefined
* ```
*/
declare function Dfrac(numerator: number, denominator: number, upSign?: boolean): string;
/**
 * @category Text
 * @return parse a dfrac string into [p,q]
 * ```typescript
 * ParseDfrac('\\dfrac{1}{2}') // [1,2]
 * ParseDfrac('\\dfrac{1.2}{-2}') // [1.2,-2]
 * ParseDfrac('-\\dfrac{1.2}{-2}') // [-1.2,-2]
 * ParseDfrac('-\\dfrac{-1.2}{-2}') // [1.2,-2]
 * ParseDfrac('\\dfrac{x}{2}') // throw
 * ```
 */
declare function ParseDfrac(dfrac: string): Fraction;
/**
 * @category Text
 * @return convert index katex to surd
 * ```typescript
 * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
 * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
 * ```
 */
declare function IndexToSurd(text: string): string;
/**
 * @category Text
 * @return the coordinates '(a, b)' of point [a,b]
 * ```typescript
 * Coord([1,2]) // '(1, 2)'
 * ```
 */
declare function Coord(point: Point): string;
/**
 * @category Text
 * @return the scientific notation of number
 * ```typescript
 * Sci(123.45) // '1.2345 x 10^{ 2}'
 * Sci(1.2345) // '1.2345'
 * ```
 */
declare function Sci(num: number): string;
/**
 * @category Text
 * @return the katex of long division
 * ```typescript
 * LongDivision([1,2,3,4],[1,2]) //
 * LongDivision([1,2,3,4],[1,2]) //
 * ```
 */
declare function LongDivision(dividend: number[], divisor: number[]): string;

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

/**
 * @category Trigonometry
 * @param rect - The rectangular coordinates [x,y] of a point, or a polar angle theta.
 * @return  the quadrant of a point or angle: 'I','II','III' or 'IV'.
 * ```typescript
 * Quadrant([1,1]) \\ 'I'
 * Quadrant([-1,1]) \\ 'II'
 * Quadrant(200) \\ 'III'
 * Quadrant(350) \\ 'IV'
 * ```
 */
declare function Quadrant(rect: PolarPoint | number): QuadrantName;
/**
 * @category Trigonometry
 * @return the rectangular coordinates [x,y] from a polar coordinates [r,theta].
 * ```typescript
 * PolToRect([1,45]) // [0.707,0.707]
 * ```
 */
declare function PolToRect([r, q]: PolarPoint): Point;
/**
 * @category Trigonometry
 * @return the polar coordinates [r,theta] of a rectangular coordinates [x,y].
 * ```typescript
 * RectToPol([1,1]) // [1.414,45]
 * ```
 */
declare function RectToPol([x, y]: Point): PolarPoint;
/**
 * @category Trigonometry
 * @return the sign from ASTC diagram, 1 or -1, representing positive or negative.
 * ```typescript
 * ASTC(2,'cos') // -1
 * ASTC('III','tan') // 1
 * ```
 */
declare function ASTC(quadrant: QuadrantCode | QuadrantName, func: TrigFunc): -1 | 0 | 1;
/**
 * @category Trigonometry
 * @return the roots of trig equations sin(x)=k , cos(x)=k or tan(x)=k. The angles [r1,r2,r3].
 * ```typescript
 * TrigRoot('sin',0) // [0, 180, 360]
 * TrigRoot('sin',0.5) // [30, 150, undefined]
 * TrigRoot('sin',1) // [90, undefined, undefined]
 * ```
 */
declare function TrigRoot(func: TrigFunc, k: number): [number | undefined, number | undefined, number | undefined];

/**
 * @category Utility
 * @param nums - Negative integers will be treated as positive.
 * @return The HCF of nums.
 * ```typescript
 * HCF(6,8) // 2
 * HCF(6,8,9) // 1
 * HCF(1,3) // 1
 * HCF(0.5,3) // throw
 * HCF(0,3) // throw
 * ```
 */
declare function HCF(...nums: number[]): number;
/**
 * @category Utility
 * @param nums - Negative integers will be treated as positive.
 * @return The LCM of nums.
 * ```typescript
 * LCM(2,3) // 6
 * LCM(2,3,5) // 30
 * LCM(0.5,3) // throw
 * LCM(0,3) // throw
 * ```
 */
declare function LCM(...nums: number[]): number;
/**
 * @category Utility
 * @param num - from 1 to 10
 * @return roman number
 * ```typescript
 * Romanize(1) // "I"
 * Romanize(2) // "II"
 * ```
 */
declare function Romanize(num: number): string;
/**
 * @category Utility
 * @param roman - from I to X
 * @return arabic number
 * ```typescript
 * DeRomanize("I") // 1
 * DeRomanize("II") // 2
 * ```
 */
declare function DeRomanize(roman: string): number;
/**
 * @category Utility
 * @return a clone of the object
 * ```typescript
 * Clone([1,2,3]) // [1,2,3]
 * Clone({x:1}) // {x:1}
 * ```
 */
declare function Clone<T>(object: T): T;
/**
 * @category Utility
 * @return array of combination pairs
 * ```typescript
 * Pairs(1,2,3) // [[1,2],[1,3],[2,3]]
 * Pairs(1) // []
 * ```
 */
declare function Pairs<T>(...items: T[]): [T, T][];
/**
 * @category Utility
 * @return check if every pairs satisfy the predicate
 * ```typescript
 * PairsEvery(AreDistinct)(1,2,3) // true
 * ```
 */
declare function PairsEvery<T>(predicate: (x: T, y: T) => boolean): (...items: T[]) => boolean;
/**
 * @category Utility
 * @param arr - array to dedupe
 * @param keyFunc - map item to this value to compare equality
 * @return Deduped array
 * ```typescript
 * Dedupe([1, 2, 3, 3, 4, 5, 5, 5, 6] // [1, 2, 3, 4, 5, 6]
 * Dedupe([[1, 2], [1, 2], [1, 3]]) // [[1, 2], [1, 3]]
 * ```
 */
declare function Dedupe<T>(arr: T[]): T[];

/**
 * @category Vector
 * @return the vector OP
 * ```typescript
 * Vector([1,2],[10,5]) // [9,3]
 * ```
 */
declare function Vector(O: Point, P: Point): Vector;
/**
 * @category Vector
 * @return sum of all vectors
 * ```typescript
 * VectorAdd([1,2],[3,4],[5,6]) // [9,12]
 * ```
 */
declare function VectorAdd(...vectors: Vector[]): Vector;
/**
 * @category Vector
 * @return mean of all vectors
 * ```typescript
 * VectorMean([1,2],[3,4],[5,6]) // [3,4]
 * VectorMean([0,0],[2,0],[2,2],[0,2]) // [1,1]
 * ```
 */
declare function VectorMean(...vectors: Vector[]): Vector;
/**
 * @category Vector
 * @return length of vector
 * ```typescript
 * VectorLength([-3,4]) // 5
 * VectorLength([0,0]) // 0
 * VectorLength([1,2]) // sqrt(5)
 * ```
 */
declare function VectorLength(v: Vector): number;
/**
 * @category Vector
 * @return length of vector
 * ```typescript
 * VectorArg([2,0]) // 0
 * VectorArg([0,2]) // 90
 * VectorArg([-2,0]) // 180
 * VectorArg([0,-2]) // 270
 * VectorArg([0,0]) // 0
 * VectorArg([1,1]) // 45
 * ```
 */
declare function VectorArg(v: Vector): number;
/**
 * @category Vector
 * @return find [kx,ky] from [x,y]
 * ```typescript
 * VectorScale([1,2],2) // [2,4]
 * VectorScale([1,2],-2) // [-2,-4]
 * ```
 */
declare function VectorScale(v: Vector, k: number): Vector;
/**
 * @category Vector
 * @return the negative of the vector
 * ```typescript
 * VectorRev([-3,4]) // [3,-4]
 * VectorRev([0,0]) // [0,0]
 * VectorRev([1,2]) // [-1,-2]
 * ```
 */
declare function VectorRev(v: Vector): Vector;
/**
 * @category Vector
 * @return the unit vector of v
 * ```typescript
 * VectorUnit([2,0]) // [1,0]
 * VectorUnit([0,-2]) // [0,-1]
 * VectorUnit([1,2]) // [1/sqrt(5),2/sqrt(5)]
 * ```
 */
declare function VectorUnit(v: Vector): Vector;
/**
 * @category Vector
 * @return scale the vector to the given length
 * ```typescript
 * VectorScaleTo([2,0],10) // [10,0]
 * VectorScaleTo([0,-2],100) // [0,-100]
 * VectorScaleTo([-3,4],15) // [-9,12]
 * ```
 */
declare function VectorScaleTo(v: Vector, length: number): Vector;
/**
 * @category Vector
 * @return rotate a vector anticlockwise by angle.
 * ```typescript
 * VectorRotate([1,2],90) // [-2,1]
 * ```
 */
declare function VectorRotate(v: Vector, angle: number): Vector;

export declare function dress(html: string): string;

export declare class QuestionHTML {
    private body;
    constructor(html?: string);
    export(): string;
    get li(): HTMLLIElement[];
    get ul(): HTMLUListElement;
    cloneLi(sourceIndex: number, repeat?: number): void;
    printInWhole(symbol: string, value: any): void;
    printInLi(index: number, symbol: string, value: any): void;
    isLiDuplicated(): boolean;
    shuffleLi(): number[];
}
/**
* print a variable (e.g. *x) into the html
* ```typescript
* let html = '1 + *x = *y'
* PrintVariable(html,'x',2) // '1 + 2 = *y'
* ```
*/
export declare function PrintVariable(html: string, symbol: string, value: any): string;

import { Dict } from '../cls';
/**
* append the array of options to question
* ```typescript
* let question = 'abc<ul><li>*x</li></ul>'
* AutoOptions(question,{x:3})
* // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
* ```
*/
export declare function AutoOptions(instructions: Partial<Dict>, question: string, source: Dict): string;

export declare function ExecSection(html: string, sections: section[]): string;

export declare class OptionShuffler {
    private qn;
    private sol;
    private ans;
    private perm;
    private valid;
    private Qn;
    constructor(qn: string, sol: string, ans: string);
    AreOptionsDuplicated(): boolean;
    genQn(): string;
    private mapLetter;
    genAns(): string;
    genSol(): string;
}

declare global {
    namespace Chance {
        interface Chance {
            prime: (opt: {
                min: number;
                max: number;
            }) => number;
        }
    }
    var chance: Chance.Chance;
}
export {};

import './Code/Assertion.ts';
import './Code/Combinatorics.ts';
import './Code/Flow.ts';
import './Code/Fraction.ts';
import './Code/Function.ts';
import './Code/Geometry.ts';
import './Code/LinearProgram.ts';
import './Code/Numeracy.ts';
import './Code/PhyConst.ts';
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
import './Algebra/Algebra.ts';
import './Algebra/Circle.ts';
import './Algebra/Quadratic.ts';
import './Algebra/Linear.ts';
import './should.ts';
import './chance.ts';

declare var SHOULD_LOG: boolean;
declare class CustomErrorCls extends Error {
    constructor(name: string, message: string);
}
declare function CustomError(name: string, message: string): CustomErrorCls;
declare function MathError(message: string): CustomErrorCls;
declare function Should(condition: boolean, msg?: string): void;

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
declare type Fraction = [numerator: number, denominator: number];
/**
 * ```
 * // used in linear programming
 * [1,2,"<=",3] // x+2y <= 3
 * ```
 */
declare type Constraint = [xCoeff: number, yCoeff: number, ineq: string, constant: number];
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
declare type IneqSign = [greater: boolean, equal: boolean];

/**
* @category 3DPen
* @return projector function from 3D point to 2D plane
* ```typescript
* const pj = Projector(60,0.5) // create a 3D projector function
* pj(1,1,0) // [1.25, 0.433012701892]
* ```
*/
declare function Projector(angle?: number, depth?: number): (x: number, y: number, z: number) => Point;

/**
 * @category DrawingPen
 */
declare class AutoPenCls {
    /**
     * @ignore
     */
    pen: PenCls;
    /**
     * @ignore
     */
    constructor();
    /**
     * Export the canvas to image tag.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```typescript
     * question = autoPen.export(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    export(html: string, placeholder: string): string;
    /**
     * A short division diagram for prime factorization of numbers.
     * @category tool
     * @param numbers - The array of numbers to factorize.
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.PrimeFactorization({numbers:[12,24]})
     * ```
     */
    PrimeFactorization({ numbers }: {
        numbers: number[];
    }): void;
    /**
     * Arrow diagram for inequalities.
     * @category tool
     * @param items - Represent the inequalities.
     * @param ticks - Represent the tick or cross for each region.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
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
    Inequalities({ items, ticks, scale, ratio }: {
        items: {
            position: number;
            sign: string;
            num: number | string;
            vertical: boolean;
            base: number;
        }[];
        ticks: boolean[];
        scale: number;
        ratio: number;
    }): void;
    /**
     * Trig Graph for solving basic trig equation.
     * @category tool
     * @param trig - 'sin' | 'cos' | 'tan'
     * @param k - value of trig, like sin = k.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.TrigSolution({trig:'sin', k:0.5})
     * ```
     */
    TrigSolution({ trig, k, scale, ratio }: {
        trig: TrigFunc;
        k: number;
        scale: number;
        ratio: number;
    }): void;
    /**
     * Sketch for solving quadratic inequality.
     * @category tool
     * @param quadratic - [a,b,c] representing coeff of quadratic inequality.
     * @param sign - The sign of the inequality. Can be like '>=' , '<' or '\\ge' , '\\lt'.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.QuadraticInequality({quadratic:[1,2,-3],sign:'\\ge'})
     * ```
     */
    QuadraticInequality({ quadratic, sign, scale, ratio }: {
        quadratic: [number, number, number];
        sign: string;
        scale: number;
        ratio: number;
    }): void;
    /**
     * Draw a triangle.
     * @category tool
     * @param vertices - [A,B,C] an array of coordinates [x,y] of 3 vertices, must be anticlockwise.
     * @param triangle - The elements of triangle to print, {sideC,angleB,sideA,angleC,sideB,angleA}. If falsy, show no label.
     * @param labels - The labels of the vertices. If falsy, show no label.
     * @param heights - Whether to draw the height.
     * @param scale - scale for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.Triangle({
     *   vertices:[[0,0],[4,0],[0,3]],
     *   triangle:{sideC:4,angleB:37,sideA:5,angleC:53,sideB:3,angleA:90},
     *   labels:['A','B','C'],
     *   heights :[false, false, false]
     * })
     * ```
     */
    Triangle({ vertices, triangle, labels, heights, scale }: {
        vertices: Point[];
        triangle: any;
        labels: string[];
        heights: [boolean, boolean, boolean];
        scale: number;
    }): void;
    /**
     * Draw a graph for linear programming.
     * @category tool
     * @param constraints - Constraint as system of inequalities, like [[1,1,'<',2]] represent x+y<2.
     * @param field - The target linear function to optimize, [a,b,c] represent ax+by+c.
     * @param contours - The contours to draw, [4,5] represent P=4 and P=5.
     * @param labelConstraints - Constraint to label integral points.
     * @param highlights - Points to highlight, [{point,color,circle,contour,coordinates,label}].
     * @param ranges - Range of Canvas.
     * @param resolution - Resolution of Canvas
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * let constraints = [[1, 1, "<=", 5], [1, -1, "<", 4], [2, 1, ">=", -5], [3, 1, ">", -10]]
     * pen.LinearProgram({
     *     constraints,
     *     field: [1, -3, 3],
     *     contours: [4,5],
     *     labelConstraints: [(x,y)=>y>0],
     *     highlights: [{point:[0,0]}],
     *     ranges: [[-10,10],[-10,10]],
     *     resolution: 0.1,
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
     *     constraintColors = ['black','black']
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
     * @category tool
     * @param a - no. of dot of 1st pattern
     * @param p - P_n+1 = P_n + (pn+q)
     * @param q - P_n+1 = P_n + (pn+q)
     * @param n - the pattern required
     * @param offset - offset of initial position
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.DotPattern({a:3, p:3, q:2, n:4, offset:1})
     * ```
     */
    DotPattern({ a, p, q, n, offset }: {
        a: number;
        p: number;
        q: number;
        n: number;
        offset: number;
    }): void;
    /**
     * A pie chart
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.PieChart({
     *   categories: ['a','b','c','d','e'],
     *   labels: ['10%','20%','30%','40%',''],
     *   angles: [45,135,60,50,70],
     *   angleLabels: [null,'x',null,null,''],
     *   size:1.5
     * })
     * ```
     */
    PieChart({ categories, labels, angles, angleLabels, size }: {
        categories: string[];
        labels: string[];
        angles: number[];
        angleLabels: string[];
        size: number;
    }): void;
    /**
     * A bar chart / line chart / histogram / frequency polygon / cf polygon
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.HeightChart({
     *   categories: ['a','b','c','d','e'],
     *   data:[7,47,15,3,7],
     *   xLabel:'x-axis',
     *   yLabel:'y-axis',
     *   interval:5,
     *   subInterval:1,
     *   barWidth:1,
     *   barGap:1,
     *   showBar:true,
     *   showLine:true
     * })
     * ```
     */
    HeightChart({ categories, data, xLabel, yLabel, interval, subInterval, barWidth, barGap, showBar, showLine }: {
        categories: string[];
        data: number[];
        xLabel: string;
        yLabel: string;
        interval: number;
        subInterval: number;
        barWidth: number;
        barGap: number;
        showBar: boolean;
        showLine: boolean;
    }): void;
    /**
     * A pie chart
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.StemAndLeaf({
     *   data: [2,5,6,12,14,16,23,23,24,25,26,26,26,26,27,31],
     *   labels: [2,'x',6,12,14,16,23,23,24,25,26,26,26,26,27,31],
     *   stemTitle: "Stem (10 units)",
     *   leafTitle: "Leaf (1 unit)"
     * })
     * ```
     */
    StemAndLeaf({ data, labels, stemTitle, leafTitle }: {
        data: number[];
        labels?: string[];
        stemTitle: string;
        leafTitle: string;
    }): void;
    /**
     * A boxplot
     * @category tool
     * @returns
     * ```typescript
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
    Boxplot({ summary, labels, size, tick, start, end, showDash, showValue, showTick }: {
        summary: number[];
        labels: (string | null)[];
        size: number;
        tick: number;
        start?: number;
        end?: number;
        showDash: boolean;
        showValue: boolean;
        showTick: boolean;
    }): void;
}
declare var AutoPen: typeof AutoPenCls;

/**
 * @ignore
 */
declare var PEN_QUALITY: number;
/**
 * @ignore
 */
declare class FrameCls {
    wPixel: number;
    hPixel: number;
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    axisOffset: number;
    constructor();
    xWidth(): number;
    yHeight(): number;
    xUnit(): number;
    yUnit(): number;
    toPix(xyArr: Point): Point;
    toCoord(xyArr: Point): Point;
    private _ticks;
    xTicks(interval: number): number[];
    yTicks(interval: number): number[];
    xRange(): [number, number];
    yRange(): [number, number];
    xOffset(): number;
    yOffset(): number;
}
/**
 * @ignore
 */
declare var Frame: typeof FrameCls;

import './Frame.ts';
import './Pen.ts';
import './AutoPen.ts';
import './3D.ts';

export declare class Config {
    sections: section[];
    answer: string;
    options: Partial<Dict>;
    constructor(sections?: section[], answer?: string, options?: Partial<Dict>);
}
export declare class Dict {
    a: any;
    b: any;
    c: any;
    d: any;
    e: any;
    f: any;
    g: any;
    h: any;
    i: any;
    j: any;
    k: any;
    l: any;
    m: any;
    n: any;
    o: any;
    p: any;
    q: any;
    r: any;
    s: any;
    t: any;
    u: any;
    v: any;
    w: any;
    x: any;
    y: any;
    z: any;
    A: any;
    B: any;
    C: any;
    D: any;
    E: any;
    F: any;
    G: any;
    H: any;
    I: any;
    J: any;
    K: any;
    L: any;
    M: any;
    N: any;
    O: any;
    P: any;
    Q: any;
    R: any;
    S: any;
    T: any;
    U: any;
    V: any;
    W: any;
    X: any;
    Y: any;
    Z: any;
    private variables;
    constructor(a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any, i?: any, j?: any, k?: any, l?: any, m?: any, n?: any, o?: any, p?: any, q?: any, r?: any, s?: any, t?: any, u?: any, v?: any, w?: any, x?: any, y?: any, z?: any, A?: any, B?: any, C?: any, D?: any, E?: any, F?: any, G?: any, H?: any, I?: any, J?: any, K?: any, L?: any, M?: any, N?: any, O?: any, P?: any, Q?: any, R?: any, S?: any, T?: any, U?: any, V?: any, W?: any, X?: any, Y?: any, Z?: any);
    update(other: Partial<Dict>): void;
    checked(): boolean;
    substitute(text: string): string;
}

declare global {
    var MathSoil: any;
}
export {};

export declare class Soil {
    private readonly gene;
    private qn;
    private sol;
    private dict;
    private config;
    private counter;
    private errorPile;
    constructor(gene: Gene);
    private reset;
    private recordError;
    private evalCode;
    private pushDict;
    private isValidated;
    private katex;
    private runPopulate;
    private runSection;
    private runPreprocess;
    private runOption;
    private runSubstitute;
    private runPostprocess;
    private runShuffle;
    private runKatex;
    private successFruit;
    private errorFruit;
    nurture(): Fruit;
}

declare type section = [number | string, number];
declare type Fruit = {
    readonly qn: string;
    readonly sol: string;
    readonly ans: string | undefined;
    counter: number;
    readonly success: boolean;
};
declare type Gene = {
    readonly qn: string;
    readonly sol: string;
    readonly populate: string;
    readonly validate: string;
    readonly preprocess: string;
    readonly postprocess: string;
};

/**
 * @category Algebra
 * @return solve [x,y] from ax+by=c and px+qy=r.
 * ```typescript
 * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * Crammer(1,1,3,2,2,6) // throw
 * ```
 */
declare function Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number];
/**
 * @category Algebra
 * @return the product of two input polynomials.
 * ```typescript
 * // do (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
 * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
 * ```
 */
declare function xPolynomial(poly1: number[], poly2: number[]): number[];
/**
 * @category Algebra
 * @return the points along the parametric curve
 * ```typescript
 * Trace(x => x ** 2, 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * Trace(t => [t,t**2], 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * ```
 */
declare function Trace(func: (t: number) => number | Point, tStart: number, tEnd: number, dots?: number): Point[];

/**
 * @category Circle
 * @return D,E,F of circle general form
 * ```typescript
 * CircleGeneral([2,3],5) // [-4,-6,-12]
 * ```
 */
declare function CircleGeneral(centre: Point, radius: number): [D: number, E: number, F: number];
/**
 * @category Circle
 * @return centre and radius from general form
 * ```typescript
 * CircleFromGeneral(-4,-6,-12) // [[2,3],5]
 * ```
 */
declare function CircleFromGeneral(D: number, E: number, F: number): [Point, number];
/**
 * @category Circle
 * @return all integral points on the circle
 * ```typescript
 * IntegralOnCircle([0,0],5) // [[[5,0],[0,5],[-5,0],[0,-5]],[[4,3],[-3,4],[-4,-3],[3,-4]],[[3,4],[-4,3],[-3,-4],[4,-3]]]
 * ```
 */
declare function IntegralOnCircle(centre: Point, radius: number): Point[][];

/**
 * @category Linear
 * @return [x-int,y-int,slope] of ax+by+c=0
 * ```typescript
 * LinearFeature(2,4,6) // [-3,-1.5,-0.5]
 * LinearFeature(0,4,6) // throw
 * ```
 */
declare function LinearFeature(a: number, b: number, c: number): [xInt: number, yInt: number, slope: number];
/**
 * @category Linear
 * @return [slope,yInt] from ax+by+c=0
 * ```typescript
 * LineFromLinear(2,4,6) // [-0.5,-1.5]
 * LineFromLinear(0,4,6) // [0,-1.5]
 * ```
 */
declare function LineFromLinear(a: number, b: number, c: number): Line;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from given intercepts
 * ```typescript
 * LinearFromIntercepts(1,2) // [2,1,-2]
 * LinearFromIntercepts(0,2) // throw
 * ```
 */
declare function LinearFromIntercepts(xInt: number, yInt: number): Linear;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from two given points
 * ```typescript
 * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
 * LinearFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
declare function LinearFromTwoPoints(point1: Point, point2: Point): Linear;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from point and slope
 * ```typescript
 * LinearFromPointSlope([1,2],3) // [3,-1,-1]
 * LinearFromPointSlope([1,2],0) // [0,1,-2]
 * ```
 */
declare function LinearFromPointSlope(point: Point, slope: number): Linear;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from perpendicular bisector of AB
 * ```typescript
 * LinearFromBisector([1,2],[3,4]) // [1,1,-5]
 * LinearFromBisector([1,2],[1,4]) // [0,1,-3]
 * ```
 */
declare function LinearFromBisector(A: Point, B: Point): Linear;
/**
 * @category Linear
 * @return [slope,yInt] from given intercepts
 * ```typescript
 * LineFromIntercepts(1,2) // [-2,2]
 * LineFromIntercepts(0,2) // throw
 * ```
 */
declare function LineFromIntercepts(xInt: number, yInt: number): Line;
/**
 * @category Linear
 * @return [slope,yInt] from two given points
 * ```typescript
 * LineFromTwoPoints([1,2],[3,4]) // [1,1]
 * LineFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
declare function LineFromTwoPoints(point1: Point, point2: Point): Line;
/**
 * @category Linear
 * @return [slope,yInt] from point and slope
 * ```typescript
 * LineFromPointSlope([1,2],3) // [3,-1]
 * LineFromPointSlope([1,2],0) // [0,2]
 * ```
 */
declare function LineFromPointSlope(point: Point, slope: number): Line;
/**
 * @category Linear
 * @return [slope,yInt] from perpendicular bisector of AB
 * ```typescript
 * LineFromBisector([1,2],[3,4]) // [-1,5]
 * LineFromBisector([1,2],[1,4]) // [0,3]
 * ```
 */
declare function LineFromBisector(A: Point, B: Point): Line;
/**
 * @ignore
 */
declare class LinearEquation {
    private _linear;
    private _slope;
    private _xInt;
    private _yInt;
    byTwoPoints(p1: Point, p2: Point): this;
    byPointSlope(p: Point, m: number): this;
    byIntercepts(x: number, y: number): this;
    byBisector(A: Point, B: Point): this;
    byLinear(linear: Linear): this;
    private refresh;
    linear(): Linear;
    line(): Line;
}

/**
 * @category Quadratic
 * @return the discriminant b^2-4ac.
 * ```typescript
 * Discriminant(2,3,4) // -23
 * ```
 */
declare function Discriminant(a: number, b: number, c: number): number;
/**
 * @category Quadratic
 * @return the roots [p,q] of ax^2+bx+c=0 where p<=q
 * ```typescript
 * QuadraticRoot(1,2,-3) // [-3,1]
 * QuadraticRoot(1,2,3) // throw when no real root
 * ```
 */
declare function QuadraticRoot(a: number, b: number, c: number): [number, number];
/**
 * @category Quadratic
 * @return the vertex [h,k] of y=ax^2+bx+c.
 * ```typescript
 * QuadraticVertex(1,2,3) // [-1,2]
 * ```
 */
declare function QuadraticVertex(a: number, b: number, c: number): Point;
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and roots p and q.
 * ```typescript
 * QuadraticFromRoot(1,2,3) // [1,-5,6]
 * QuadraticFromRoot(-2,4,-3) // [-2,2,24]
 * ```
 */
declare function QuadraticFromRoot(a: number, p: number, q: number): Quadratic;
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and vertex (h,k).
 * ```typescript
 * QuadraticFromVertex(1,2,3) // [1,-4,7]
 * QuadraticFromVertex(-2,4,-3) // [-2,16,-35]
 * ```
 */
declare function QuadraticFromVertex(a: number, h: number, k: number): Quadratic;

/**
 * @category Assertion
 * @return check is a finite number.
 * ```typescript
 * IsNum(1.23) // true
 * IsNum(NaN) // false
 * IsNum(Infinity) // false
 * IsNum('2') // false
 * ```
 */
declare function IsNum(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an integer.
 * ```typescript
 * IsInteger(5) // true
 * IsInteger(0.5) // false
 * ```
 */
declare function IsInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a decimal (non-integer).
 * ```typescript
 * IsDecimal(0.5) // true
 * IsDecimal(5) // false
 * ```
 */
declare function IsDecimal(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a rational number with denominator <= 1000.
 * ```typescript
 * IsRational(0.5) // true
 * IsRational(-5) // true
 * IsRational(Math.sqrt(2)) // false
 * ```
 */
declare function IsRational(...items: any[]): boolean;
/**
 * @category Assertion
 * @ignore
 * @deprecated
 * @return check is an integer but not -1, 0 or 1.
 * ```typescript
 * IsCoeff(2) // true
 * IsCoeff(-1) // false
 * ```
 */
declare function IsCoeff(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an odd integer.
 * ```typescript
 * IsOdd(5) // true
 * IsOdd(-5) // true
 * IsOdd(4) // false
 * ```
 */
declare function IsOdd(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an even integer.
 * ```typescript
 * IsEven(4) // true
 * IsEven(-4) // true
 * IsEven(0) // true
 * IsEven(5) // false
 * ```
 */
declare function IsEven(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is in range [0,1].
 * ```typescript
 * IsProbability(0) // true
 * IsProbability(0.5467) // true
 * IsProbability(1.1) // false
 * IsProbability(-0.1) // false
 * ```
 */
declare function IsProbability(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a square number.
 * ```typescript
 * IsSquareNum(9) // true
 * IsSquareNum(10) // false
 * IsSquareNum(-9) // false
 * ```
 */
declare function IsSquareNum(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is positive.
 * ```typescript
 * IsPositive(2) // true
 * IsPositive(0) // false
 * IsPositive(-2) // false
 * ```
 */
declare function IsPositive(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is non-negative.
 * ```typescript
 * IsNonNegative(2) // true
 * IsNonNegative(0) // true
 * IsNonNegative(-2) // false
 * IsNonNegative(1.5) // true
 * ```
 */
declare function IsNonNegative(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a positive integer.
 * ```typescript
 * IsPositiveInteger(2) // true
 * IsPositiveInteger(0) // false
 * IsPositiveInteger(-2) // false
 * IsPositiveInteger(1.5) // false
 * ```
 */
declare function IsPositiveInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a non-negative integer.
 * ```typescript
 * IsNonNegativeInteger(2) // true
 * IsNonNegativeInteger(0) // true
 * IsNonNegativeInteger(-2) // false
 * IsNonNegativeInteger(1.5) // false
 * ```
 */
declare function IsNonNegativeInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is negative.
 * ```typescript
 * IsNegative(-2) // true
 * IsNegative(0) // false
 * IsNegative(2) // false
 * ```
 */
declare function IsNegative(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is non-zero finite number.
 * ```typescript
 * IsNonZero(2) // true
 * IsNonZero(0) // false
 * IsNonZero(-2) // true
 * ```
 */
declare function IsNonZero(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is between min and max inclusive.
 * ```typescript
 * IsBetween(2,5)(3) // true
 * IsBetween(2,5)(2) // true
 * IsBetween(2,5)(1) // false
 * ```
 */
declare function IsBetween(min: number, max: number): (...items: any[]) => boolean;
/**
 * @category Assertion
 * @return check if its abs is between min and max inclusive.
 * ```typescript
 * IsAbsBetween(2,5)(-3) // true
 * IsAbsBetween(2,5)(-2) // true
 * IsAbsBetween(2,5)(1) // false
 * ```
 */
declare function IsAbsBetween(min: number, max: number): (...items: any[]) => boolean;
/**
 * @category Assertion
 * @return Check if the points are chessboard around anchor.
 * ```typescript
 * IsAroundPoint([0,0],2)([2,2]) // true
 * IsAroundPoint([0,0],2)([3,0]) // false
 * ```
 */
declare function IsAroundPoint(anchor: Point, range: number): (...points: Point[]) => boolean;
/**
 * @category Assertion
 * @return Check if the array of legnths can form a triangle
 * ```typescript
 * IsTriangle([1,1,1]) // true
 * IsTriangle([6,7,8]) // true
 * IsTriangle([1,2,3]) // false
 * IsTriangle([6,14,8]) // false
 * ```
 */
declare function IsTriangle(...triangles: [number, number, number][]): boolean;
/**
 * @category Assertion
 * @return check if the item is a point [num,num]
 * ```typescript
 * IsPoint([2,5]) // true
 * IsPoint(2) // false
 * IsPoint([1,2,3]) // false
 * IsPoint([NaN,NaN]) // false
 * ```
 */
declare function IsPoint(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a fraction [num,num]
 * ```typescript
 * IsFraction([2,5]) // true
 * IsFraction(2) // false
 * IsFraction([1,2,3]) // false
 * IsFraction([NaN,NaN]) // false
 * ```
 */
declare function IsFraction(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a vector [num,num]
 * ```typescript
 * IsVector([2,5]) // true
 * IsVector(2) // false
 * IsVector([1,2,3]) // false
 * IsVector([NaN,NaN]) // false
 * ```
 */
declare function IsVector(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a IneqSign string
 * ```typescript
 * IsIneqSign('>') // true
 * IsIneqSign('\\ge') // true
 * IsIneqSign(true) // false
 * IsIneqSign('=>') // false
 * ```
 */
declare function IsIneqSign(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a Dfrac string
 * ```typescript
 * IsDfrac('\\dfrac{1}{2}') // true
 * IsDfrac('\\dfrac{x}{2}') // false
 * ```
 */
declare function IsDfrac(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a constraint (LP)
 * ```typescript
 * IsConstraint([1,2,'>',3]) // true
 * IsConstraint([1,2,3]) // false
 * IsConstraint([1,2,'=>',3]) // false
 * ```
 */
declare function IsConstraint(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a string
 * ```typescript
 * IsString('abc') // true
 * IsString('') // true
 * IsString('1') // true
 * IsString(1) // false
 * ```
 */
declare function IsString(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a boolean
 * ```typescript
 * IsBoolean(true) // true
 * IsBoolean(false) // true
 * IsBoolean('') // false
 * IsBoolean('1') // false
 * IsBoolean(1) // false
 * ```
 */
declare function IsBoolean(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is an empty object
 * ```typescript
 * IsEmptyObject({}) // true
 * IsEmptyObject(1) // false
 * IsEmptyObject('abc') // false
 * IsEmptyObject({x:1}) // false
 * ```
 */
declare function IsEmptyObject(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is an array
 * ```typescript
 * IsArray([]) // true
 * IsArray([1,2]) // true
 * IsArray('abc') // false
 * IsArray({x:1}) // false
 * ```
 */
declare function IsArray(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is an array with given length
 * ```typescript
 * IsArrayOfLength(2)([1]) // false
 * IsArrayOfLength(2)([1,2]) // true
 * IsArrayOfLength(2)([1,2,3]) // false
 * IsArrayOfLength('abc') // false
 * IsArrayOfLength({x:1}) // false
 * ```
 */
declare function IsArrayOfLength(length: number): (...items: any[]) => boolean;

/**
 * @category Combinatorics
 * @return the factorial n!
 * ```typescript
 * Factorial(5) // 120
 * Factorial(1.5) // throw
 * ```
 */
declare function Factorial(n: number): number;
/**
 * @category Combinatorics
 * @return nCr
 * ```typescript
 * nCr(5,3) // 10
 * ```
 */
declare function nCr(n: number, r: number): number;
/**
 * @category Combinatorics
 * @return nPr
 * ```typescript
 * nPr(5,3) // 60
 * ```
 */
declare function nPr(n: number, r: number): number;

/**
* @category Flow
* @return a random config of a Combo Options question type.
* ```typescript
* RndComboConfig()
* // may return {
* //   truth: [true, true, false],
* //   choices: ["I and II", "I only", "I and III", "I, II and III"],
* //   sections: [[1,1], [2,1], [3,0]]
* //  }
* // truth: the true value of the 3 options.
* // choices: for filling in the 4 answer choices, the 1st is correct.
* // sections: the sections object for section versioning, version 0 is false, version 1 is true.
* ```
*/
declare function RndComboConfig(): {
    truth: boolean[];
    choices: string[];
    sections: [number, number][];
};

/**
 * @category Fraction
 * @return normalize the sign of a fraction p/q
 * ```typescript
 * FracSign(2,3) // [2,3]
 * FracSign(-2,3) // [-2,3]
 * FracSign(2,-3) // [-2,3]
 * FracSign(-2,-3) // [2,3]
 * FracSign(0,-2) // [0,2]
 * FracSign(-2,0) // [-2,0]
 * ```
 */
declare function FracSign(p: number, q: number): Fraction;
/**
 * @category Fraction
 * @return simplified fraction p/q
 * ```typescript
 * Frac(6,4) // [3,2]
 * Frac(-4,2) // [-2,1]
 * Frac(18,-12) // [-3,2]
 * Frac(-10,-20) // [1,2]
 * Frac(0,2) // [0,2]
 * Frac(1.5,-2) // [-1.5,2]
 * ```
 */
declare function Frac(p: number, q: number): Fraction;
/**
 * @category Fraction
 * @return add fractions
 * ```typescript
 * FracAdd([1,2],[1,3]) // [5,6]
 * FracAdd([1,2],[-1,3]) // [1,6]
 * FracAdd([2,3],[3,4],[4,5]) // [133,60]
 * FracAdd([2,3],[4,3]) // [2,1]
 * ```
 */
declare function FracAdd(...fractions: Fraction[]): Fraction;
/**
 * @category Fraction
 * @return add fractions
 * ```typescript
 * FracMultiply([1,2],[1,3]) // [1,6]
 * FracMultiply([1,2],[-1,3]) // [-1,6]
 * FracMultiply([2,3],[3,4],[4,5]) // [2,5]
 * FracMultiply([2,3],[4,3]) // [8,9]
 * FracMultiply([0,3],[4,3]) // [0,9]
 * ```
 */
declare function FracMultiply(...fractions: Fraction[]): Fraction;
/**
 * @category Fraction
 * @return convert num to fraction
 * ```typescript
 * ToFrac(0.5) // [1,2]
 * ToFrac(-456/123) // [-152,41]
 * ```
 */
declare function ToFrac(num: number, maxDenominator?: number): Fraction;

/**
 * @category Function
 * @return log(b,N)
 * ```typescript
 * log(2,8) // 3
 * ```
 */
declare function log(b: number, N: number): number;
/**
 * @category Function
 * @return a**b, a to the power of b.
 * ```typescript
 * Power(2,3) // 8
 * ```
 */
declare function Power(a: number, b: number): number;
/**
 * @category Function
 * @return square root of x
 * ```typescript
 * Sqrt(4) // 2
 * ```
 */
declare function Sqrt(x: number): number;
/**
 * @category Function
 * @return the radian of the degree
 * ```typescript
 * Radian(180) // pi
 * Radian(90) // pi/2
 * Radian(30) // PI/6
 * ```
 */
declare function Radian(degree: number): number;
/**
 * @category Function
 * @return the degree of the radian
 * ```typescript
 * Degree(Math.PI) // 180
 * Degree(Math.PI/2) // 90
 * Degree(Math.PI/6) // 30
 * ```
 */
declare function Degree(radian: number): number;
/**
 * @category Function
 * @return sin(x).
 * ```typescript
 * sin(30) // 0.5
 * ```
 */
declare function sin(x: number): number;
/**
 * @category Function
 * @return cos(x).
 * ```typescript
 * cos(60) // 0.5
 * ```
 */
declare function cos(x: number): number;
/**
 * @category Function
 * @return tan(x).
 * ```typescript
 * tan(45) // 1
 * ```
 */
declare function tan(x: number): number;
/**
 * @category Function
 * @return arcsin(x) between -90 and 90.
 * ```typescript
 * arcsin(0.5) // 30
 * ```
 */
declare function arcsin(x: number): number;
/**
 * @category Function
 * @return arccos(x) between 0 and 180.
 * ```typescript
 * arccos(0.5) // 60
 * ```
 */
declare function arccos(x: number): number;
/**
 * @category Function
 * @return arctan(x) between -90 and 90.
 * ```typescript
 * arctan(1) // 45
 * ```
 */
declare function arctan(x: number): number;

/**
 * @category Geometry
 * @return the slope of AB
 * ```typescript
 * Slope([0,0],[1,2]) // 2
 * Slope([1,2],[1,2]) // NaN
 * ```
 */
declare function Slope(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the distance AB
 * ```typescript
 * Distance([0,0],[1,2]) // 2.23606797749979
 * ```
 */
declare function Distance(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the chessboard distance AB, max(horizontal,vertical)
 * ```typescript
 * ChessboardDistance([0,0],[1,2]) // 2
 * ChessboardDistance([0,0],[3,2]) // 3
 * ```
 */
declare function ChessboardDistance(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the mid-pt of AB
 * ```typescript
 * MidPoint([1,2],[3,4]) // [2,3]
 * ```
 */
declare function MidPoint(A: Point, B: Point): Point;
/**
 * @category Geometry
 * @return the point P on AB such that AP : PB = ratio : 1-ratio
 * ```typescript
 * DivisionPoint([1,0],[5,0],0.75) // [4,0]
 * ```
 */
declare function DivisionPoint(A: Point, B: Point, ratio?: number): Point;
/**
 * @category Geometry
 * @return point P rotated anticlockwise by angle q about point O.
 * ```typescript
 * RotatePoint([1,2],[0,0],90) // [-2,1]
 * ```
 */
declare function RotatePoint(P: Point, O: Point, q: number): Point;
/**
 * @category Geometry
 * @return the polar angle of B if A is the origin within [0,360].
 * ```typescript
 * Inclination([1,0],[3,2]) // 45
 * Inclination([3,2],[1,0]) // 225
 * ```
 */
declare function Inclination(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the polar angle of a normal direction to AB, on the right of AB.
 * ```typescript
 * Normal([1,0],[3,2]) // 315
 * Normal([3,2],[1,0]) // 135
 * ```
 */
declare function Normal(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the foot of perpendicular from P to AB.
 * ```typescript
 * PerpendicularFoot([-1,-1],[1,1],[-2,2]) // [0,0]
 * ```
 */
declare function PerpendicularFoot(A: Point, B: Point, P: Point): Point;
/**
 * @category Geometry
 * @return the intersection point of AB and CD.
 * ```typescript
 * Intersection([0,0],[2,2],[2,0],[0,2]) // [1,1]
 * ```
 */
declare function Intersection(A: Point, B: Point, C: Point, D: Point): Point;
/**
 * @category Geometry
 * @return Translate point P in the polar angle q (or the direction of point q) by a distance.
 * ```typescript
 * TranslatePoint([1,2],90,3) // [1,5]
 * TranslatePoint([1,2],[10, 12],3) // [3.006894195, 4.229882439]
 * ```
 */
declare function TranslatePoint(P: Point, q: number | Point, distance: number): Point;
/**
 * @category Geometry
 * @return angle of intersection between two slopes
 * ```typescript
 * IntersectAngle(0,1) // 45
 * IntersectAngle(1,-1) // 90
 * ```
 */
declare function IntersectAngle(slope1: number, slope2: number): number;
/**
 * @category Geometry
 * @return angle AOB, non-reflex
 * ```typescript
 * Angle([1,0],[0,0],[0,2]) // 90
 * Angle([2,2],[1,1],[1,3]) // 45
 * Angle([1,3],[1,1],[2,2]) // 45
 * ```
 */
declare function Angle(A: Point, O: Point, B: Point): number;
/**
 * @category Geometry
 * @return angle AOB, measured anticlockwise
 * ```typescript
 * AnglePolar([1,0],[0,0],[0,2]) // 90
 * AnglePolar([2,2],[1,1],[1,3]) // 45
 * AnglePolar([1,3],[1,1],[2,2]) // 315
 * ```
 */
declare function AnglePolar(A: Point, O: Point, B: Point): number;
/**
 * @category Geometry
 * @return check if the polar angle AOB is reflex
 * ```typescript
 * IsReflex([1,0],[0,0],[0,2]) // false
 * IsReflex([2,2],[1,1],[1,3]) // false
 * IsReflex([1,3],[1,1],[2,2]) // true
 * ```
 */
declare function IsReflex(A: Point, O: Point, B: Point): boolean;

declare const LP_BOUND = 100;
declare function onBoundary(p: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return the value of field at given point
 * ```typescript
 * FieldAt([0,0],[1,2,3]) // 3
 * FieldAt([1,2],[3,-4,5]) // 0
 * ```
 */
declare function FieldAt(p: Point, field: Field): number;
/**
 *
 * @category LinearProgram
 * @return check if point is constrained by cons
 * ```typescript
 * isConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] satisfies all the constraints
 * ```
 */
declare function isConstrained(cons: Constraint[], point: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return check if point is constrained by cons, treating all cons as 'or equal to'
 * ```typescript
 * isLooseConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] loosely satisfies all the constraints
 * ```
 */
declare function isLooseConstrained(cons: Constraint[], point: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
declare function FeasiblePolygon(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
declare function FeasibleVertices(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return check if the feasible region is bounded
 * ```typescript
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
declare function FeasibleIsBounded(...cons: Constraint[]): boolean;
/**
 *
 * @category LinearProgram
 * @return the integral points inside the feasible polygon
 * ```typescript
 * FeasibleIntegral([
 *    [1, 0, '<', 3],
 *    [1, 0, '>', 0],
 *    [0, 1, '<', 2],
 *    [0, 1, '>', 0]
 * ])
 * // [[1,1],[2,1]]
 * ```
 */
declare function FeasibleIntegral(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return the point with the max value of field
 * ```typescript
 * MaximizePoint([[0,0],[10,10]],[1,2,3]) // [10,10]
 * ```
 */
declare function MaximizePoint(points: Point[], field: Field): Point;
/**
 *
 * @category LinearProgram
 * @return the point with the min value of field
 * ```typescript
 * MinimizePoint([[0,0],[10,10]],[1,2,3]) // [0,0]
 * ```
 */
declare function MinimizePoint(points: Point[], field: Field): Point;
/**
 *
 * @category LinearProgram
 * @return the point with the min/max value of field
 * ```typescript
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [10,10]
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [0,0]
 * ```
 */
declare function OptimizePoint(points: Point[], field: Field, max: boolean): Point;
/**
 *
 * @category LinearProgram
 * @return the min/max value of field
 * ```typescript
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 33
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 3
 * ```
 */
declare function OptimizeField(points: Point[], field: Field, max: boolean): number;

/**
 * @category Numeracy
 * @return division with x/0 handling
 * ```typescript
 * Divide(6,2) // 3
 * Divide(6,0) // throw
 * ```
 */
declare function Divide(dividend: number, divisor: number): number;
/**
 * @category Numeracy
 * @return the absolute value. Equivalent to Math.abs(x).
 * ```typescript
 * Abs(-2) // 2
 * ```
 */
declare function Abs(num: number): number;
/**
 * @category Numeracy
 * @return the sign of the number as 1,0 or -1.
 * ```typescript
 * Sign(3) // 1
 * Sign(-4.5) // -1
 * Sign(0) // 0
 * ```
 */
declare function Sign(num: number): -1 | 0 | 1;
/**
 * @category Numeracy
 * @return the number rounded off to given sigfig.
 * ```typescript
 * Round(1.23456,3) // 1.23
 * Round(1.23567,3) // 1.24
 * ```
 */
declare function Round(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded up to given sigfig.
 * ```typescript
 * RoundUp(1.23456,3) // 1.23
 * RoundUp(1.23567,1) // 2
 * ```
 */
declare function RoundUp(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded down to given sigfig.
 * ```typescript
 * RoundDown(1.23456,5) // 1.2345
 * RoundDown(1.6789,1) // 1
 * ```
 */
declare function RoundDown(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded off to given decimal place.
 * ```typescript
 * Fix(12345.678,0) // round to integer, return 12346
 * Fix(12345.678,2) // round to 2 dp, return 12345.68
 * Fix(12345.678,-2) // round to hundred, return 12300
 * ```
 */
declare function Fix(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the number rounded up to given decimal place.
 * ```typescript
 * FixUp(12.34,0) // round to integer, return 13
 * FixUp(12.34,1) // round to 1 dp, return 12.4
 * FixUp(12.34,-1) // round to ten, return 20
 * ```
 */
declare function FixUp(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the number rounded down to given decimal place.
 * ```typescript
 * FixDown(17.89,0) // round to integer, return 17
 * FixDown(17.89,1) // round to 1 dp, return 17.8
 * FixDown(17.89,-1) // round to ten, return 10
 * ```
 */
declare function FixDown(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the ceiling integer of the number.
 * ```typescript
 * Ceil(1.1) // 2
 * Ceil(-1.1) // -1
 * Ceil(2)) // 2
 * ```
 */
declare function Ceil(num: number): number;
/**
 * @category Numeracy
 * @return the floor integer of the number.
 * ```typescript
 * Floor(1.9) // 1
 * Floor(-1.9) // -2
 * Floor(2)) // 2
 * ```
 */
declare function Floor(num: number): number;
/**
 * @category Numeracy
 * @return reduce input array to simplest ratio.
 * ```typescript
 * SimpRatio(2,4,6) // [1,2,3]
 * SimpRatio(0,4,6) // [0,2,3]
 * SimpRatio(0,4) // [0,1]
 * ```
 */
declare function SimpRatio(...nums: number[]): number[];
/**
 * @category Numeracy
 * @return reduce input array to integral ratio.
 * ```typescript
 * IntegerRatio(2,4,6) // [1,2,3]
 * IntegerRatio(0,4,6) // [0,2,3]
 * IntegerRatio(0,4) // [0,1]
 * IntegerRatio(1/3,1/2,1/4) // [4,6,3]
 * IntegerRatio(Math.sqrt(2),1/2,1/4) // throw
 * ```
 */
declare function IntegerRatio(...nums: number[]): number[];
/**
 * @category Numeracy
 * @return the number of sigfig.
 * ```typescript
 * SigFig(1.234) // 4
 * SigFig(1200) // 2
 * SigFig(0.00123) // 3
 * ```
 */
declare function SigFig(value: number): number;
/**
 * @category Numeracy
 * @return count the decimal places
 * ```typescript
 * DecimalPlace(1.234) // 3
 * DecimalPlace(1200) // 0
 * DecimalPlace(0.00123) // 5
 * DecimalPlace(123.456789) // 6
 * ```
 */
declare function DecimalPlace(value: number): number;
/**
 * @category Numeracy
 * @return the order of magnitude
 * ```typescript
 * Magnitude(1) // 0
 * Magnitude(2) // 0
 * Magnitude(0.9) // -1
 * Magnitude(10) // 1
 * Magnitude(10.1) // 1
 * Magnitude(0.1) // -1
 * Magnitude(0.02) // -2
 * ```
 */
declare function Magnitude(num: number): number;
/**
 * @category Numeracy
 * @return the mantissa
 * ```typescript
 * Mantissa(1.23) // 1.23
 * Mantissa(123) // 1.23
 * Mantissa(0.123) // 1.23
 * ```
 */
declare function Mantissa(num: number): number;
/**
 * @category Numeracy
 * @return the lowest number with the next order of magnitude
 * ```typescript
 * LogCeil(5) // 10
 * LogCeil(23) // 100
 * LogCeil(0.456) // 1
 * LogCeil(0.00235) // 0.01
 * ```
 */
declare function LogCeil(num: number): number;
/**
 * @category Numeracy
 * @return the lowest number with the same order of magnitude
 * ```typescript
 * LogFloor(5) // 1
 * LogFloor(23) // 10
 * LogFloor(0.456) // 0.1
 * LogFloor(0.00235) // 0.001
 * ```
 */
declare function LogFloor(num: number): number;
/**
 * @category Numeracy
 * @return add a constant to the magnitude
 * ```typescript
 * Raise(12.34,1) // 123.4
 * Raise(12.34,-1) // 1.234
 * ```
 */
declare function Raise(num: number, add: number): number;
/**
 * @category Numeracy
 * @return correct for floating point error
 * ```typescript
 * Blur(0.1+0.2) // 0.3
 * Blur(0.81-1) // -0.19
 * Blur(1.1**2) // 1.21
 * ```
 */
declare function Blur(value: any, accuracy?: number): (typeof value);
/**
 * @category Numeracy
 * @return correct for floating point error
 * ```typescript
 * Blurs([0.1+0.2,0.81-1]) // [0.3,-0.19]
 * ```
 */
declare function Blurs(values: any[], accuracy?: number): (typeof values);

declare var PhyConst: {
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

/**
 * @category Random
 * @return a random integer in [min, max] inclusive.
 * ```typescript
 * RndN(2,5) // may return 2, 3, 4 or 5
 * ```
 */
declare function RndN(min: number, max: number): number;
/**
 * @category Random
 * @param n - default to 10
 * @return an array of n unique random integer in [min, max] inclusive.
 * ```typescript
 * RndNs(2,8,3) // may return [5,3,7]
 * ```
 */
declare function RndNs(min: number, max: number, n?: number): number[];
/**
 * @category Random
 * @return a random real number in [min, max] inclusive
 * ```typescript
 * RndR(1,2) // may return 1.242574363
 * ```
 */
declare function RndR(min: number, max: number): number;
/**
 * @category Random
 * @return 1 or -1
 * ```typescript
 * RndU() // may return 1 or -1
 * ```
 */
declare function RndU(): 1 | -1;
/**
 * @category Random
 * @return true or false.
 * ```typescript
 * RndT() // may return true or false
 * ```
 */
declare function RndT(): boolean;
/**
 * @category Random
 * @return a random integer in [min, max] or [-max, -min] inclusive.
 * ```typescript
 * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
 * ```
 */
declare function RndZ(min: number, max: number): number;
/**
 * @category Random
 * @param n - default to 10
 * @return an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive.
 * ```typescript
 * RndZs(2,8,3) // may return [5,-3,7]
 * ```
 */
declare function RndZs(min: number, max: number, n?: number): number[];
/**
 * @category Random
 * @return a random prime number less than or equal to max.
 * ```typescript
 * RndP(10) // may return 2, 3, 5 or 7
 * ```
 */
declare function RndP(max: number): number;
/**
 * @category Random
 * @return a random odd integer in [min, max] inclusive
 * ```typescript
 * RndOdd(3,8) // return 3, 5 or 7
 * ```
 */
declare function RndOdd(min: number, max: number): number;
/**
 * @category Random
 * @return a random even integer in [min, max] inclusive
 * ```typescript
 * RndEven(3,8) // return 4, 6 or 8
 * ```
 */
declare function RndEven(min: number, max: number): number;
/**
 * @category Random
 * @return an array of random polynomial coefficients
 * ```typescript
 * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)]
 * ```
 */
declare function RndPoly(...coeff: number[]): number[];
/**
 * @category Random
 * @return an array of a Pyth Triple
 * ```typescript
 * RndPyth(10) // may return [3,4,5]
 * ```
 */
declare function RndPyth(max?: number): [number, number, number];
/**
 * @category Random
 * @param min abs of intercept
 * @param max abs of intercept
 * @return a linear [a,b,c] in ax+by+c=0
 * ```typescript
 * RndLinearFromIntercept(1,5) // may return [2,-3,6]
 * ```
 */
declare function RndLinearFromInt(minInt: number, maxInt: number): Linear;
/**
 * @category Random
 * @return a point within given range
 * ```typescript
 * RndPoint([1,4],[10,14]) // may return [2,12]
 * // equivalent to [RndN(...xRange),Range(...yRange)]
 * RndPoint(2,4) // equivalent to RndPoint([-2,2],[-4,4])
 * ```
 */
declare function RndPoint(xRange: number | [number, number], yRange?: number | [number, number]): Point;
/**
 * @category Random
 * @return n angles in [0,360] at least cyclic separated by separation
 * ```typescript
 * RndAngles(3,50) // may return [30,90,200]
 * ```
 */
declare function RndAngles(n: number, separation: number): number[];
/**
 * @category Random
 * @return n vertices of a convex polygon generated by rounding a cyclic polygon
 * ```typescript
 * RndConvexPolygon(3,[0,0],10,50) // may return [[10,0],[-6,8],[0,-10]]
 * ```
 */
declare function RndConvexPolygon(n: number, center: Point, radius: number, separation: number): Point[];
/**
 * @category Random
 * @return n integers from [min, max]
 * ```typescript
 * RndData(10,15,5) // may return [11,11,12,13,15]
 * ```
 */
declare function RndData(min: number, max: number, n: number): number[];

/**
 * @category RandomShake
 * @return an array of n nearby values around anchor, within range inclusive, auto detecting the input type.
 * ```typescript
 * RndShake(10)
 * // equivalent to RndShakeN(10)
 * RndShake(10.5)
 * // equivalent to RndShakeR(10.5)
 * ```
 */
declare function RndShake(anchor: any): (typeof anchor)[];
/**
 * @category RandomShake
 * @param randomFunc - a function which generate a random item
 * @param predicate - a condition that the outcome item must satisfy
 * @param n - max number of trial.
 * @return a function which return a random item satisfying the predicate when called. If nothing pass the predicate after n trial, throw an error.
 * ```typescript
 * let func = Sieve(()=>RndN(1,10),x=>IsOdd(x))
 * func() // return an odd integer
 * ```
 */
declare function Sieve<T>(randomFunc: () => T, predicate: (x: T) => boolean, n?: number): () => T;
/**
 * @category RandomShake
 * @return 3 nearby same-signed integers, range = Max(5, anchor * 10%)
 * ```typescript
 * RndShakeN(5) // return 3 unique integers from 1-10
 * ```
 */
declare function RndShakeN(anchor: number): [number, number, number];
/**
 * @category RandomShake
 * @return 3 nearby same-signed real number with same precision, range = anchor * 50%
 * ```typescript
 * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
 * ```
 */
declare function RndShakeR(anchor: number): number[];
/**
 * @category RandomShake
 * @return 3 nearby same-sign rational by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```typescript
 * RndShakeQ(5/6)
 * // return 3 unique fractions around [5,6]
 * RndShakeQ(6/-5)
 * // return 3 unique fractions around [6,-5]
 * ```
 */
declare function RndShakeQ(anchor: number): number[];
/**
 * @category RandomShake
 * @return 3 nearby same-sign fraction by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```typescript
 * RndShakeFrac([5,6])
 * // return 3 unique fractions around [5,6]
 * RndShakeFrac([6,-5])
 * // return 3 unique fractions around [6,-5]
 * ```
 */
declare function RndShakeFrac(anchor: Fraction): Fraction[];
/**
 * @category RandomShake
 * @return 3 nearby same-signed Dfrac by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```typescript
 * RndShakeDfrac('\\dfrac{5}{6}')
 * // return 3 unique Dfrac around [5,6]
 * RndShakeDfrac('-\\dfrac{6}{5}')
 * // return 3 unique Dfrac around [6,-5]
 * ```
 */
declare function RndShakeDfrac(anchor: string): string[];
/**
 * @category RandomShake
 * @param anchor - must be a string of ineq sign
 * @return an array of 3 ineq signs, balanced in number.
 * ```typescript
 * RndShakeIneq('\\ge')
 * // may return ['\\ge','\\le','\\le']
 * ```
 */
declare function RndShakeIneq(anchor: string): string[];
/**
 * @category RandomShake
 * @param anchor - must be a point
 * @return an array of 3 point
 * ```typescript
 * RndShakePoint([3,4])
 * // may return [[2,5],[1,6],[4,2]]
 * ```
 */
declare function RndShakePoint(anchor: Point): Point[];

/**
 * @category RandomUtil
 * @return a random item from the given items
 * ```typescript
 * RndPick(2,4,6) // may return 2, 4 or 6
 * ```
 */
declare function RndPick<T>(...items: T[]): T;
/**
 * @category RandomUtil
 * @return a shuffled array of the given items
 * ```typescript
 * RndShuffle(2,4,6) // may return [4,2,6]
 * ```
 */
declare function RndShuffle<T>(...items: T[]): T[];
/**
 * @category RandomUtil
 * @return n random items from given items, not necessarily unique
 * ```typescript
 * RndPickN([2,4,6],2) // may return [4,2]
 * ```
 */
declare function RndPickN<T>(items: T[], n: number): T[];
/**
 * @category RandomUtil
 * @return n random unique items from given items
 * ```typescript
 * RndPickUnique([2,4,6],2) // may return [4,2]
 * RndPickUnique([1,2,2,2,2,2,2,2],2) // must return [1,2] or [2,1]
 * ```
 */
declare function RndPickUnique<T>(items: T[], n: number): T[];
/**
 * @category RandomUtil
 * @return n repeated item from items, where occurrences are balanced.
 * ```typescript
 * RndBalanced(['a','b'],6) // may return ['a','a','b','b','a','b']
 * RndBalanced(['a','b'],5) // may return ['a','a','b','b','a']
 * ```
 */
declare function RndBalanced<T>(items: T[], n: number): T[];
/**
 * @category RandomUtil
 * @return a random male name
 * ```typescript
 * RndHe() // may return 'Peter', 'David', etc
 * ```
 */
declare function RndHe(): string;
/**
 * @category RandomUtil
 * @return a random female name
 * ```typescript
 * RndShe() // may return 'Mary', 'Alice', etc
 * ```
 */
declare function RndShe(): string;
/**
 * @category RandomUtil
 * @return a random 3-letters array
 * ```typescript
 * RndLetters() // may return ['a','b','c'] or ['x','y','z'] or etc
 */
declare function RndLetters(): string[];

/**
 * @category Relation
 * @return Check if the numbers are all distinct.
 * ```typescript
 * AreDistinct(1,2,3) // true
 * AreDistinct(1,2,2) // false
 * ```
 */
declare function AreDistinct(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the absolute values of the numbers are all distinct.
 * ```typescript
 * AreAbsDistinct(1,2,3) // true
 * AreAbsDistinct(1,2,2) // false
 * AreAbsDistinct(1,2,-2) // false
 * ```
 */
declare function AreAbsDistinct(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the numbers all have the same sign.
 * ```typescript
 * AreSameSign(1,2,3) // true
 * AreSameSign(1,2,-3) // false
 * AreSameSign(1,2,0) // false
 * ```
 */
declare function AreSameSign(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the numbers all pairwise coprime.
 * ```typescript
 * AreCoprime(2,3) // true
 * AreCoprime(2,6) // false
 * AreCoprime(1,2) // true
 * AreCoprime(2,3,6) // true
 * AreCoprime(1.5,3) // true
 * AreCoprime(0,3) // true
 * ```
 */
declare function AreCoprime(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the points are all distinct.
 * ```typescript
 * AreDistinctPoint([1,2],[3,4]) // true
 * AreDistinctPoint([1,2],[1,2]) // false
 * ```
 */
declare function AreDistinctPoint(...points: Point[]): boolean;
/**
 * @category Relation
 * @return Check if the points are pairwise distant apart.
 * ```typescript
 * AreDistantPoint(2)([0,0],[3,0]) // true
 * AreDistantPoint(2)([0,0],[1,0]) // false
 * ```
 */
declare function AreDistantPoint(distance: number): (...points: Point[]) => boolean;
/**
 * @category Relation
 * @return Check if slopes are at least oblique at minAngle
 * ```typescript
 * AreOblique(40)(0,1) // true
 * AreOblique(40)(0,0.5) // false
 * ```
 */
declare function AreOblique(minAngle: number): (...slopes: number[]) => boolean;

/**
* @category Sequence
* @return an array of integers from start to end inclusive.
* ```typescript
* ListIntegers(2,6) // [2,3,4,5,6]
* ListIntegers(-2,1) // [-2,-1,0,1]
* ```
*/
declare function ListIntegers(start: number, end: number): number[];
/**
* @category Sequence
* @return Tn in an arithmetic sequence: a+(n-1)d
* ```typescript
* ASterm(2,3,10) // 29
* ASterm(5,-2,6) // -5
* ```
*/
declare function ASterm(a: number, d: number, n: number): number;
/**
* @category Sequence
* @return Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
* ```typescript
* ASsum(2,3,10) // 155
* ASsum(5,-2,6) // 0
* ```
*/
declare function ASsum(a: number, d: number, n: number): number;
/**
* @category Sequence
* @return an array of the first n terms in an arithmetic sequence.
* ```typescript
* ASequence(2,3,5) // [2,5,8,11,14]
* ASequence(5,-2,3) // [5,3,1]
* ```
*/
declare function ASequence(a: number, d: number, n?: number): number[];
/**
* @category Sequence
* @return Tn in a geometric sequence: ar**(n-1)
* ```typescript
* GSterm(2,3,4) // 54
* GSterm(5,-2,6) // -160
* ```
*/
declare function GSterm(a: number, r: number, n: number): number;
/**
* @category Sequence
* @param n - number of terms. if omitted, sum to infinity.
* @return Sn in a geometric sequence: a*(r*n-1)/(r-1)
* ```typescript
* GSsum(2,3,4) // 80
* GSsum(5,-2,3) // 15
* GSsum(3,0.5) // 6
* ```
*/
declare function GSsum(a: number, r: number, n?: number): number;
/**
* @category Sequence
* @return an array of the first n terms in a geometric sequence.
* ```typescript
* GSequence(2,3,5) // return [2,6,18,54,162]
* GSequence(5,-2,3) // return [5,-10,20]
* ```
*/
declare function GSequence(a: number, r: number, n?: number): number[];
/**
* @category Sequence
* @return the nth term in a quadratic sequence, 1st term = a, P_n+1=P_n + pn+q
* ```typescript
* QuadraticSequence(1,2,3,4) //
* ```
*/
declare function QuadraticSequence(a: number, p: number, q: number, n: number): number;
/**
* @category Sequence
* @return the nth term in a lucas sequence, a_n = p*a_{n-1} + q*a_{n-2}
* ```typescript
* LucasSequence(1,2,3,4,5) //
* ```
*/
declare function LucasSequence(first: number, second: number, p: number, q: number, n: number): number;

/**
 * @category Stat
 * @return the minimum value. Equivalent to Math.min().
 * ```typescript
 * Min(2,3,4) // 2
 * ```
 */
declare function Min(...nums: number[]): number;
/**
 * @category Stat
 * @return the maximum value. Equivalent to Math.max().
 * ```typescript
 * Max(2,3,4) // 4
 * ```
 */
declare function Max(...nums: number[]): number;
/**
 * @category Stat
 * @return the sorted array of numbers.
 * ```typescript
 * Sort(2,3,1) // [1,2,3]
 * ```
 */
declare function Sort(...nums: number[]): number[];
/**
 * @category Stat
 * @return the sorted array of items by giving each item a value.
 * ```typescript
 * SortBy([2,3,1],x=>x) // [1,2,3]
 * SortBy(["aa", "aaa", "a"], x => x.length) // ["a", "aa", "aaa"]
 * ```
 */
declare function SortBy<T>(items: T[], valueFunc: (_: T) => number): T[];
/**
 * @category Stat
 * @return sum of nums
 * ```typescript
 * Sum(1,2,3) // 6
 * Sum(-1,2,3,4,5) // 13
 * ```
 */
declare function Sum(...nums: number[]): number;
/**
 * @category Stat
 * @return mean of nums
 * ```typescript
 * Mean(1,2,3) // 2
 * Mean(-1,2,3,4,5) // 2.6
 * ```
 */
declare function Mean(...nums: number[]): number;
/**
 * @category Stat
 * @return median of nums
 * ```typescript
 * Median(1,2,3,4,50) // 3
 * Median(1,2,3,4,5,7) // 3.5
 * ```
 */
declare function Median(...nums: number[]): number;
/**
 * @category Stat
 * @return lower quartile of nums
 * ```typescript
 * LowerQ(1,2,3,4,5) // 1.5
 * LowerQ(1,2,3,4,5,7) // 2
 * ```
 */
declare function LowerQ(...nums: number[]): number;
/**
 * @category Stat
 * @return lower quartile of nums
 * ```typescript
 * UpperQ(1,2,3,4,5) // 4.5
 * UpperQ(1,2,3,4,5,7) // 5
 * ```
 */
declare function UpperQ(...nums: number[]): number;
/**
 * @category Stat
 * @return count frequency of item in array
 * ```typescript
 * Frequency(1)(2,3,4,1,5,1,1,4,5) // 3
 * ```
 */
declare function Frequency(item: any): (...items: (typeof item)[]) => number;
/**
 * @category Stat
 * @return mode of nums
 * ```typescript
 * Mode(1,2,3,2,2,3,4) \\ 2
 * Mode(1,1,2,2,3) \\ NaN
 * ```
 */
declare function Mode(...nums: number[]): number;
/**
 * @category Stat
 * @return SD of nums
 * ```typescript
 * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
 * StdDev(1,1,2,2,3) \\ 0.748331477
 * ```
 */
declare function StdDev(...nums: number[]): number;

/**
* @category Text
* @return a string of joined elements. [1,2,3] --> '1, 2 and 3'
* ```typescript
* GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
* GrammarJoin('a','b','c') // 'a, b and c'
* ```
*/
declare function GrammarJoin(...items: any[]): string;
/**
* @category Text
* @return '✔' or '✘'.
* ```typescript
* Tick(true) // '✔'
* Tick(false) // '✘'
* ```
*/
declare function Tick(bool: boolean): string;
/**
* @category Text
* @return Array of '✔' or '✘'.
* ```typescript
* Ticks(true,false) // ['✔','✘']
* ```
*/
declare function Ticks(...bools: boolean[]): string[];
/**
* @category Text
* @return a pair of latex inequalities sign array like ['\\ge', '\\le'].
* ```typescript
* IneqSign(true,true) // ['\\ge', '\\le']
* IneqSign(true,false) // ['\\gt', '\\lt']
* IneqSign(false,true) // ['\\le', '\\ge']
* IneqSign(false,false) // ['\\lt', '\\gt']
* ```
*/
declare function IneqSign(greater: boolean, equal?: boolean): [string, string];
/**
* @category Text
* @return parse an inequality sign to booleans [greater,equal]
* ```typescript
* ParseIneqSign('\\ge') // [true,true]
* ParseIneqSign('\\le') // [false,true]
* ParseIneqSign('\\gt') // [true,false]
* ParseIneqSign('\\lt') // [false,false]
* ParseIneqSign('>=') // [true,true]
* ParseIneqSign('<=') // [false,true]
* ParseIneqSign('>') // [true,false]
* ParseIneqSign('<') // [false,false]
* ParseIneqSign('abc') // throw
* ```
*/
declare function ParseIneqSign(text: string): IneqSign;
/**
* @category Text
* @param upSign - put -ve sign on numerator instead of the front.
* @return latex of dfrac p/q like \dfrac{1}{2}.
* ```typescript
* Dfrac(1,2) // '\\dfrac{1}{2}'
* Dfrac(1,-2) // '\\dfrac{-1}{2}'
* Dfrac(6,4) // '\\dfrac{3}{2}'
* Dfrac(6,-2) // '-3'
* Dfrac(0,2) // '0'
* Dfrac(5,0) // undefined
* ```
*/
declare function Dfrac(numerator: number, denominator: number, upSign?: boolean): string;
/**
 * @category Text
 * @return parse a dfrac string into [p,q]
 * ```typescript
 * ParseDfrac('\\dfrac{1}{2}') // [1,2]
 * ParseDfrac('\\dfrac{1.2}{-2}') // [1.2,-2]
 * ParseDfrac('-\\dfrac{1.2}{-2}') // [-1.2,-2]
 * ParseDfrac('-\\dfrac{-1.2}{-2}') // [1.2,-2]
 * ParseDfrac('\\dfrac{x}{2}') // throw
 * ```
 */
declare function ParseDfrac(dfrac: string): Fraction;
/**
 * @category Text
 * @return convert index katex to surd
 * ```typescript
 * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
 * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
 * ```
 */
declare function IndexToSurd(text: string): string;
/**
 * @category Text
 * @return the coordinates '(a, b)' of point [a,b]
 * ```typescript
 * Coord([1,2]) // '(1, 2)'
 * ```
 */
declare function Coord(point: Point): string;
/**
 * @category Text
 * @return the scientific notation of number
 * ```typescript
 * Sci(123.45) // '1.2345 x 10^{ 2}'
 * Sci(1.2345) // '1.2345'
 * ```
 */
declare function Sci(num: number): string;
/**
 * @category Text
 * @return the katex of long division
 * ```typescript
 * LongDivision([1,2,3,4],[1,2]) //
 * LongDivision([1,2,3,4],[1,2]) //
 * ```
 */
declare function LongDivision(dividend: number[], divisor: number[]): string;

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

/**
 * @category Trigonometry
 * @param rect - The rectangular coordinates [x,y] of a point, or a polar angle theta.
 * @return  the quadrant of a point or angle: 'I','II','III' or 'IV'.
 * ```typescript
 * Quadrant([1,1]) \\ 'I'
 * Quadrant([-1,1]) \\ 'II'
 * Quadrant(200) \\ 'III'
 * Quadrant(350) \\ 'IV'
 * ```
 */
declare function Quadrant(rect: PolarPoint | number): QuadrantName;
/**
 * @category Trigonometry
 * @return the rectangular coordinates [x,y] from a polar coordinates [r,theta].
 * ```typescript
 * PolToRect([1,45]) // [0.707,0.707]
 * ```
 */
declare function PolToRect([r, q]: PolarPoint): Point;
/**
 * @category Trigonometry
 * @return the polar coordinates [r,theta] of a rectangular coordinates [x,y].
 * ```typescript
 * RectToPol([1,1]) // [1.414,45]
 * ```
 */
declare function RectToPol([x, y]: Point): PolarPoint;
/**
 * @category Trigonometry
 * @return the sign from ASTC diagram, 1 or -1, representing positive or negative.
 * ```typescript
 * ASTC(2,'cos') // -1
 * ASTC('III','tan') // 1
 * ```
 */
declare function ASTC(quadrant: QuadrantCode | QuadrantName, func: TrigFunc): -1 | 0 | 1;
/**
 * @category Trigonometry
 * @return the roots of trig equations sin(x)=k , cos(x)=k or tan(x)=k. The angles [r1,r2,r3].
 * ```typescript
 * TrigRoot('sin',0) // [0, 180, 360]
 * TrigRoot('sin',0.5) // [30, 150, undefined]
 * TrigRoot('sin',1) // [90, undefined, undefined]
 * ```
 */
declare function TrigRoot(func: TrigFunc, k: number): [number | undefined, number | undefined, number | undefined];

/**
 * @category Utility
 * @param nums - Negative integers will be treated as positive.
 * @return The HCF of nums.
 * ```typescript
 * HCF(6,8) // 2
 * HCF(6,8,9) // 1
 * HCF(1,3) // 1
 * HCF(0.5,3) // throw
 * HCF(0,3) // throw
 * ```
 */
declare function HCF(...nums: number[]): number;
/**
 * @category Utility
 * @param nums - Negative integers will be treated as positive.
 * @return The LCM of nums.
 * ```typescript
 * LCM(2,3) // 6
 * LCM(2,3,5) // 30
 * LCM(0.5,3) // throw
 * LCM(0,3) // throw
 * ```
 */
declare function LCM(...nums: number[]): number;
/**
 * @category Utility
 * @param num - from 1 to 10
 * @return roman number
 * ```typescript
 * Romanize(1) // "I"
 * Romanize(2) // "II"
 * ```
 */
declare function Romanize(num: number): string;
/**
 * @category Utility
 * @param roman - from I to X
 * @return arabic number
 * ```typescript
 * DeRomanize("I") // 1
 * DeRomanize("II") // 2
 * ```
 */
declare function DeRomanize(roman: string): number;
/**
 * @category Utility
 * @return a clone of the object
 * ```typescript
 * Clone([1,2,3]) // [1,2,3]
 * Clone({x:1}) // {x:1}
 * ```
 */
declare function Clone<T>(object: T): T;
/**
 * @category Utility
 * @return array of combination pairs
 * ```typescript
 * Pairs(1,2,3) // [[1,2],[1,3],[2,3]]
 * Pairs(1) // []
 * ```
 */
declare function Pairs<T>(...items: T[]): [T, T][];
/**
 * @category Utility
 * @return check if every pairs satisfy the predicate
 * ```typescript
 * PairsEvery(AreDistinct)(1,2,3) // true
 * ```
 */
declare function PairsEvery<T>(predicate: (x: T, y: T) => boolean): (...items: T[]) => boolean;
/**
 * @category Utility
 * @param arr - array to dedupe
 * @param keyFunc - map item to this value to compare equality
 * @return Deduped array
 * ```typescript
 * Dedupe([1, 2, 3, 3, 4, 5, 5, 5, 6] // [1, 2, 3, 4, 5, 6]
 * Dedupe([[1, 2], [1, 2], [1, 3]]) // [[1, 2], [1, 3]]
 * ```
 */
declare function Dedupe<T>(arr: T[]): T[];

/**
 * @category Vector
 * @return the vector OP
 * ```typescript
 * Vector([1,2],[10,5]) // [9,3]
 * ```
 */
declare function Vector(O: Point, P: Point): Vector;
/**
 * @category Vector
 * @return sum of all vectors
 * ```typescript
 * VectorAdd([1,2],[3,4],[5,6]) // [9,12]
 * ```
 */
declare function VectorAdd(...vectors: Vector[]): Vector;
/**
 * @category Vector
 * @return mean of all vectors
 * ```typescript
 * VectorMean([1,2],[3,4],[5,6]) // [3,4]
 * VectorMean([0,0],[2,0],[2,2],[0,2]) // [1,1]
 * ```
 */
declare function VectorMean(...vectors: Vector[]): Vector;
/**
 * @category Vector
 * @return length of vector
 * ```typescript
 * VectorLength([-3,4]) // 5
 * VectorLength([0,0]) // 0
 * VectorLength([1,2]) // sqrt(5)
 * ```
 */
declare function VectorLength(v: Vector): number;
/**
 * @category Vector
 * @return length of vector
 * ```typescript
 * VectorArg([2,0]) // 0
 * VectorArg([0,2]) // 90
 * VectorArg([-2,0]) // 180
 * VectorArg([0,-2]) // 270
 * VectorArg([0,0]) // 0
 * VectorArg([1,1]) // 45
 * ```
 */
declare function VectorArg(v: Vector): number;
/**
 * @category Vector
 * @return find [kx,ky] from [x,y]
 * ```typescript
 * VectorScale([1,2],2) // [2,4]
 * VectorScale([1,2],-2) // [-2,-4]
 * ```
 */
declare function VectorScale(v: Vector, k: number): Vector;
/**
 * @category Vector
 * @return the negative of the vector
 * ```typescript
 * VectorRev([-3,4]) // [3,-4]
 * VectorRev([0,0]) // [0,0]
 * VectorRev([1,2]) // [-1,-2]
 * ```
 */
declare function VectorRev(v: Vector): Vector;
/**
 * @category Vector
 * @return the unit vector of v
 * ```typescript
 * VectorUnit([2,0]) // [1,0]
 * VectorUnit([0,-2]) // [0,-1]
 * VectorUnit([1,2]) // [1/sqrt(5),2/sqrt(5)]
 * ```
 */
declare function VectorUnit(v: Vector): Vector;
/**
 * @category Vector
 * @return scale the vector to the given length
 * ```typescript
 * VectorScaleTo([2,0],10) // [10,0]
 * VectorScaleTo([0,-2],100) // [0,-100]
 * VectorScaleTo([-3,4],15) // [-9,12]
 * ```
 */
declare function VectorScaleTo(v: Vector, length: number): Vector;
/**
 * @category Vector
 * @return rotate a vector anticlockwise by angle.
 * ```typescript
 * VectorRotate([1,2],90) // [-2,1]
 * ```
 */
declare function VectorRotate(v: Vector, angle: number): Vector;

export declare function dress(html: string): string;

export declare class QuestionHTML {
    private body;
    constructor(html?: string);
    export(): string;
    get li(): HTMLLIElement[];
    get ul(): HTMLUListElement;
    cloneLi(sourceIndex: number, repeat?: number): void;
    printInWhole(symbol: string, value: any): void;
    printInLi(index: number, symbol: string, value: any): void;
    isLiDuplicated(): boolean;
    shuffleLi(): number[];
}
/**
* print a variable (e.g. *x) into the html
* ```typescript
* let html = '1 + *x = *y'
* PrintVariable(html,'x',2) // '1 + 2 = *y'
* ```
*/
export declare function PrintVariable(html: string, symbol: string, value: any): string;

import { Dict } from '../cls';
/**
* append the array of options to question
* ```typescript
* let question = 'abc<ul><li>*x</li></ul>'
* AutoOptions(question,{x:3})
* // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
* ```
*/
export declare function AutoOptions(instructions: Partial<Dict>, question: string, source: Dict): string;

export declare function ExecSection(html: string, sections: section[]): string;

export declare class OptionShuffler {
    private qn;
    private sol;
    private ans;
    private perm;
    private valid;
    private Qn;
    constructor(qn: string, sol: string, ans: string);
    AreOptionsDuplicated(): boolean;
    genQn(): string;
    private mapLetter;
    genAns(): string;
    genSol(): string;
}