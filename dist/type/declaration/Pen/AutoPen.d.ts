/**
 * @category DrawingPen
 */
declare class AutoPenCls {
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
