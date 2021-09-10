import { PenCls } from './Pen'


/**
 * @category DrawingPen
 */
export class AutoPenCls {
    /**
     * @ignore
     */
    private pen: PenCls

    /**
     * @ignore
     */
    constructor() {
        this.pen = new Pen();
    }

    /**
     * Export the canvas to image tag.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```
     * question = autoPen.export(question,'imgQ') 
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    export(html: string, placeholder: string) {
        return this.pen.export(html, placeholder);
    }

    /**
     * A short division diagram for prime factorization of numbers.
     * @category tool
     * @param numbers - The array of numbers to factorize.
     * @returns void
     * ```
     * let pen = new AutoPen()
     * pen.PrimeFactorization({numbers:[12,24]})
     * ```
     */
    PrimeFactorization({ numbers }: { numbers: number[] }) {
        function lowestFactor(arr: number[]) {
            const primes = [2, 3, 5, 7, 11, 13, 17, 19];
            for (let p of primes) {
                if (HCF(...arr) % p === 0) return p;
            }
            return 1;
        }
        const pen = new Pen();
        pen.range.set([-10, 10], [-15, 5]);
        pen.size.set(4);
        const w = 1;
        const h = 1;
        function drawRow(arr: number[], pivot: number[]) {
            for (let i = 0; i < arr.length; i++) {
                pen.write([pivot[0] + i * w, pivot[1]], arr[i].toString());
            }
        }
        function drawVert(pivot: number[]) {
            pen.line([pivot[0] - 0.5 * w, pivot[1] - h / 2], [pivot[0] - 0.5 * w, pivot[1] + h / 2]);
        }
        function drawUnderline(arr: number[], pivot: number[]) {
            for (let i = 0; i < arr.length; i++) {
                pen.line([pivot[0] + i * w - 0.5 * w, pivot[1] - h / 2], [pivot[0] + i * w + 0.5 * w, pivot[1] - h / 2]);
            }
        }
        function drawDivisor(pivot: number[], divisor: number) {
            pen.write([pivot[0] - w, pivot[1]], divisor.toString());
        }
        function drawDiv(arr: number[], pivot: number[]) {
            const d = lowestFactor(arr);
            drawVert(pivot);
            drawUnderline(arr, pivot);
            drawDivisor(pivot, d);
            arr = arr.map(x => x / d);
            pivot = [pivot[0], pivot[1] - h];
            drawRow(arr, pivot);
            return [arr, pivot];
        }
        let pivot = [1, 0];
        drawRow(numbers, pivot);
        while (HCF(...numbers) > 1) {
            [numbers, pivot] = drawDiv(numbers, pivot);
        }
        pen.autoCrop();
        this.pen = pen;
    }

    /**
     * Arrow diagram for inequalities.
     * @category tool
     * @param items - Represent the inequalities.
     * @param ticks - Represent the tick or cross for each region.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns void
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
    Inequalities({
        items = [],
        ticks = [],
        scale = 1.6,
        ratio = 0.5
    }: {
        items: { position: number, sign: string, num: number | string, vertical: boolean, base: number }[],
        ticks: boolean[],
        scale: number,
        ratio: number
    }) {

        const width = 5;
        const height = 2;

        items = items.map((x, i) => {
            x.base = -i * (height + 2);
            return x;
        });

        const pen = new Pen();
        pen.range.set([-width - 2, width + 2], [-(items.length) * (height + 2) + 2, height + 1]);
        pen.size.set(scale, scale * ratio);

        pen.set.textLatex(true)

        function inequality({ position, sign, num, base, vertical }: { position: number, sign: string, num: number | string, base: number, vertical: boolean }) {
            let greater = sign.includes('>') || sign.includes('g');
            let solid = sign.includes('=') || sign.includes('e');
            let align = -width + 2 * width * position;

            let B: Point2D = [align, base];
            let T: Point2D = [align, base + height];
            let E: Point2D = [greater ? align + 0.4 * width : align - 0.4 * width, base + height];
            let E1: Point2D = [greater ? width : -width, base + height];
            let E2: Point2D = [greater ? width : -width, base];

            if (vertical) {
                pen.set.strokeColor('grey');
                pen.set.dash([10, 10]);
                pen.graph.vertical(align);
                pen.set.strokeColor();
                pen.set.dash();
            }

            pen.polyshade(B, T, E1, E2);

            pen.arrow([-width, base], [width, base]);
            pen.line(B, T);
            pen.arrow(T, E);
            pen.set.fillColor(solid ? 'black' : 'white');
            pen.set.weight(3);
            pen.circle(T, 3, [0, 360], true);
            pen.set.weight();
            pen.set.fillColor('black');

            pen.label.point(B, num.toString(), 270);
        }

        function tick(position: number, correct: boolean) {
            let align = -width + 2 * width * position;
            let y = -(items.length - 1) * (height + 2) - height / 2;
            pen.write([align, y], correct ? '✔' : '✘');
        }

        items.forEach(x => inequality(x));


        let cutting = items.map(x => x.position);
        cutting = [0, ...cutting, 1];

        for (let i = 0; i < ticks.length; i++) {
            let p = (cutting[i] + cutting[i + 1]) / 2;
            tick(p, ticks[i]);
        }

        pen.autoCrop();
        this.pen = pen;
    }




    /**
     * Trig Graph for solving basic trig equation.
     * @category tool
     * @param trig - 'sin' | 'cos' | 'tan'
     * @param k - value of trig, like sin = k.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns void
     * ```
     * let pen = new AutoPen()
     * pen.TrigSolution({trig:'sin', k:0.5})
     * ```
     */
    TrigSolution({
        trig = 'sin',
        k = 0,
        scale = 1.4,
        ratio = 0.7
    }: {
        trig: TrigFunc,
        k: number,
        scale: number,
        ratio: number
    }) {

        if (trig === 'sin' || trig === 'cos') {
            if (k > 2) k = 2
            if (0.9 < k && k < 1) k = 0.9
            if (0 < k && k < 0.3) k = 0.3
            if (-1 < k && k < -0.9) k = -0.9
            if (-0.3 < k && k < 0) k = -0.3
            if (k < -2) k = -2
        }

        if (trig === 'tan') {
            if (k > 4) k = 4
            if (k < -4) k = -4
            if (0 < k && k < 0.9) k = 0.9
            if (0 > k && k > -0.9) k = -0.9
        }

        let [a, b, c] = TrigRoot(trig, k)


        const pen = new Pen()

        let limit = Max(1, Abs(k)) + 0.2

        if (trig === 'sin') pen.range.set([-40, 390], [-limit, limit])
        if (trig === 'cos') pen.range.set([-40, 390], [-limit, limit])
        if (trig === 'tan') pen.range.set([-40, 390], [-5, 5])
        pen.size.set(scale, scale * ratio)

        pen.axis.x()
        pen.axis.y()
        if (trig === 'sin' || trig === 'cos') {
            pen.tick.x(360)
        }
        if (trig === 'tan') {
            pen.tick.x(180)
        }

        if (trig === 'sin' || trig === 'cos') {
            pen.cutY([0, 1])
            pen.cutY([0, -1])
            pen.label.point([0, 1], '1', 180)
            pen.label.point([0, -1], '-1', 180)
        }


        pen.set.weight(1.5)
        if (trig === 'sin') pen.plot(x => sin(x), 0, 360)
        if (trig === 'cos') pen.plot(x => cos(x), 0, 360)
        if (trig === 'tan') {
            pen.plot(x => tan(x), 0, 360)
            pen.set.strokeColor('grey')
            pen.set.dash([5, 10])
            pen.set.weight(0.7)
            pen.graph.vertical(90)
            pen.graph.vertical(270)
            pen.set.strokeColor()
            pen.set.dash()
            pen.set.weight(1)
        }
        pen.set.weight(1)


        function arrow(x: number | undefined, y: number, func: string, label = '') {
            if (x === undefined) return
            let anchor = 0
            let skipAnchor = false

            if (func === 'sin') {
                if ([0, 90, 180, 270, 360].includes(x)) skipAnchor = true
                if (x > 0 && x < 90) anchor = 0
                if (x > 90 && x < 270) anchor = 180
                if (x > 270 && x < 360) anchor = 360
            }

            if (func === 'cos') {
                if ([0, 90, 180, 270, 360].includes(x)) skipAnchor = true
                if (x > 0 && x < 180 && x !== 90) anchor = 0
                if (x > 180 && x < 360 && x !== 270) anchor = 360
            }

            if (func === 'tan') {
                if ([0, 90, 180, 270, 360].includes(x)) skipAnchor = true
                if (x > 0 && x < 180) anchor = 0
                if (x > 180 && x < 360) anchor = 180
            }


            let P: Point2D = [x, y]
            let Q: Point2D = [x, 0]
            let R: Point2D = [anchor, 0]
            pen.set.fillColor()
            pen.point(P)
            pen.set.fillColor('red')
            if (y !== 0) { pen.arrow(P, Q) }
            if (y >= 0) { pen.label.point(Q, label, 270) }
            if (y < 0) { pen.label.point(Q, label, 90) }

            if (skipAnchor) return
            pen.set.weight(3)
            pen.set.strokeColor('blue')
            pen.line(R, Q)
            pen.set.weight(1)
            pen.set.strokeColor('red')
        }

        pen.set.strokeColor('red')
        pen.set.fillColor('red')
        pen.set.dash([5, 5])
        pen.graph.horizontal(k)
        pen.set.dash()

        if (trig === 'sin') {
            if (k === 0) {
                arrow(a, k, 'sin', '0')
                arrow(b, k, 'sin', '180')
                arrow(c, k, 'sin', '360')
            }
            if (k === 1) {
                arrow(a, k, 'sin', '90')
            }
            if (k === -1) {
                arrow(a, k, 'sin', '270')
            }
            if (k > -1 && k < 1 && k !== 0) {
                arrow(a, k, 'sin', 'α')
                arrow(b, k, 'sin', 'β')
            }
        }

        if (trig === 'cos') {
            if (k === 0) {
                arrow(a, k, 'cos', '90')
                arrow(b, k, 'cos', '270')
            }
            if (k === 1) {
                arrow(a, k, 'cos', '0')
                arrow(b, k, 'cos', '360')
            }
            if (k === -1) {
                arrow(a, k, 'cos', '180')
            }
            if (k > -1 && k < 1 && k !== 0) {
                arrow(a, k, 'cos', 'α')
                arrow(b, k, 'cos', 'β')
            }
        }

        if (trig === 'tan') {
            if (k === 0) {
                arrow(a, k, 'tan', '0')
                arrow(b, k, 'tan', '180')
                arrow(c, k, 'tan', '360')
            }
            if (k !== 0) {
                arrow(a, k, 'tan', 'α')
                arrow(b, k, 'tan', 'β')
            }
        }

        this.pen = pen;
    }



    /**
     * Sketch for solving quadratic inequality.
     * @category tool
     * @param quadratic - [a,b,c] representing coeff of quadratic inequality.
     * @param sign - The sign of the inequality. Can be like '>=' , '<' or '\\ge' , '\\lt'.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns void
     * ```
     * let pen = new AutoPen()
     * pen.QuadraticInequality({quadratic:[1,2,-3],sign:'\\ge'})
     * ```
     */
    QuadraticInequality({
        quadratic,
        sign,
        scale = 1,
        ratio = 0.8
    }: {
        quadratic: [number, number, number],
        sign: string,
        scale: number,
        ratio: number
    }) {
        let a = quadratic[0]
        let b = quadratic[1]
        let c = quadratic[2]

        let greater = sign.includes('>') || sign.includes('g');
        let equal = sign.includes('=') || sign.includes('e');

        let p: number | undefined
        let q: number | undefined
        try {
            [p, q] = QuadraticRoot(a, b, c);
        } catch {
            [p, q] = [undefined, undefined]
        }
        if (p !== undefined && q !== undefined) {
            [p, q] = [Max(p, q), Min(p, q)]
            p = Fix(p, 2)
            q = Fix(q, 2)
        }

        const pen = new Pen();
        pen.range.set([-5, 5], [-5, 5]);
        pen.size.set(scale, scale * ratio);

        pen.set.textLatex(true)

        pen.axis.x('');

        if (p !== undefined && q !== undefined && p !== q) {
            pen.plot(x => Sign(a) * (x ** 2 - 4))
            let P: Point2D = [2, 0]
            let Q: Point2D = [-2, 0]
            pen.cutX(P)
            pen.cutX(Q)
            pen.set.weight(3)
            pen.set.strokeColor('red')

            if (a > 0) {
                if (greater) {
                    pen.plot(x => Sign(a) * (x ** 2 - 4), -5, -2)
                    pen.plot(x => Sign(a) * (x ** 2 - 4), 2, 5)
                } else {
                    pen.plot(x => Sign(a) * (x ** 2 - 4), -2, 2)
                }
            }

            if (a < 0) {
                if (greater) {
                    pen.plot(x => Sign(a) * (x ** 2 - 4), -2, 2)
                } else {
                    pen.plot(x => Sign(a) * (x ** 2 - 4), -5, -2)
                    pen.plot(x => Sign(a) * (x ** 2 - 4), 2, 5)
                }
            }
            pen.set.weight()
            pen.set.strokeColor()
            pen.label.point(P, p.toString(), a > 0 ? 315 : 45)
            pen.label.point(Q, q.toString(), a > 0 ? 225 : 135)
        }

        if (p === undefined && q === undefined) {
            if ((a > 0 && greater) || (a < 0 && !greater)) {
                pen.set.weight(3)
                pen.set.strokeColor('red')
            }
            if (a > 0) pen.plot(x => x ** 2 + 2)
            if (a < 0) pen.plot(x => -(x ** 2) - 2)
        }

        if (p !== undefined && q !== undefined && p === q) {
            let func = a > 0 ? (x: number) => x ** 2 : (x: number) => -(x ** 2)
            pen.plot(func)
            pen.label.point([0, 0], p.toString(), a > 0 ? 270 : 90)
            if (a > 0) {
                pen.set.weight(3)
                pen.set.strokeColor('red')
                if (greater && equal) pen.plot(func)
                if (greater && !equal) {
                    pen.plot(func)
                    pen.set.strokeColor()
                    pen.set.fillColor('white')
                    pen.circle([0, 0], 4, [0, 360], true)
                }
                if (!greater && equal) {
                    pen.set.fillColor('red')
                    pen.circle([0, 0], 4, [0, 360], true)
                }
                if (!greater && !equal) { }
            }

            if (a < 0) {
                pen.set.weight(3)
                pen.set.strokeColor('red')
                if (!greater && equal) pen.plot(func)
                if (!greater && !equal) {
                    pen.plot(func)
                    pen.set.strokeColor()
                    pen.set.fillColor('white')
                    pen.circle([0, 0], 4, [0, 360], true)
                }
                if (greater && equal) {
                    pen.set.fillColor('red')
                    pen.circle([0, 0], 4, [0, 360], true)
                }
                if (greater && !equal) { }
            }
        }
        this.pen = pen;
    }


    /**
     * Draw a triangle.
     * @category tool
     * @param vertices - [A,B,C] an array of coordinates [x,y] of 3 vertices, must be anticlockwise.
     * @param triangle - The elements of triangle to print, {sideC,angleB,sideA,angleC,sideB,angleA}. If falsy, show no label.
     * @param labels - The labels of the vertices. If falsy, show no label.
     * @param heights - Whether to draw the height.
     * @param scale - scale for pen.setup.size()
     * @returns void
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
    Triangle({
        vertices,
        triangle = {},
        labels = ['', '', ''],
        heights = [false, false, false],
        scale = 1.6
    }: {
        vertices: Point2D[],
        triangle: any,
        labels: string[],
        heights: [boolean, boolean, boolean],
        scale: number
    }) {

        let A = vertices[0]
        let B = vertices[1]
        let C = vertices[2]

        let xmax = Math.max(A[0], B[0], C[0])
        let xmin = Math.min(A[0], B[0], C[0])
        let xmid = (xmax + xmin) / 2

        let ymax = Math.max(A[1], B[1], C[1])
        let ymin = Math.min(A[1], B[1], C[1])
        let ymid = (ymax + ymin) / 2

        let dx = xmax - xmin
        let dy = ymax - ymin

        let dmax = Math.max(dx, dy) * 0.8

        let G = Mid(A, B, C)

        let T = triangle
        let sideA = T.sideA
        let sideB = T.sideB
        let sideC = T.sideC
        let angleA = T.angleA
        let angleB = T.angleB
        let angleC = T.angleC

        let labelA = labels[0]
        let labelB = labels[1]
        let labelC = labels[2]

        const pen = new Pen();
        pen.range.set([xmid - dmax, xmid + dmax], [ymid - dmax, ymid + dmax])
        pen.size.set(scale);


        function drawHeight(vertex: [number, number], base: [number, number][]) {
            let F = PdFoot(base[0], base[1], vertex)
            pen.set.dash([5, 5])
            pen.set.strokeColor('grey')
            pen.line(vertex, F)
            if (F[0] === base[0][0] && F[1] === base[0][1]) {
                pen.line(F, base[1])
            } else {
                pen.line(F, base[0])
            }
            pen.set.dash()
            if (F[0] === base[0][0] && F[1] === base[0][1]) {
                pen.rightAngle(vertex, F, base[1])
            } else {
                pen.rightAngle(vertex, F, base[0])
            }
            pen.set.strokeColor()

        }

        if (heights[0]) drawHeight(A, [B, C])
        if (heights[1]) drawHeight(B, [C, A])
        if (heights[2]) drawHeight(C, [A, B])


        pen.polygon(A, B, C)

        pen.set.textItalic(true)
        if (labelA) pen.label.point(A, labelA.toString(), Dir(G, A))
        if (labelB) pen.label.point(B, labelB.toString(), Dir(G, B))
        if (labelC) pen.label.point(C, labelC.toString(), Dir(G, C))
        pen.set.textItalic()

        let AB = [B[0] - A[0], B[1] - A[1]]
        let BC = [C[0] - B[0], C[1] - B[1]]
        let anticlockwise = (AB[0] * BC[1] - AB[1] * BC[0]) > 0





        function writeSide(side: any, start: Point2D, end: Point2D): void {
            if (side) {
                if (typeof side === 'string' && !(/\d/.test(side)))
                    pen.set.textItalic(true)
                if (anticlockwise) {
                    pen.label.line([start, end], side.toString())
                } else {
                    pen.label.line([end, start], side.toString())
                }
                pen.set.textItalic()
            }
        }

        writeSide(sideC, A, B)
        writeSide(sideA, B, C)
        writeSide(sideB, C, A)

        function writeAngle(angle: any, P: Point2D, O: Point2D, Q: Point2D): void {
            if (angle) {
                if (typeof angle === 'string') pen.set.textItalic(true)
                if (typeof angle === 'number') angle = angle + '°'
                pen.angle(P, O, Q, angle)
                pen.set.textItalic()
            }
        }

        writeAngle(angleA, B, A, C)
        writeAngle(angleB, C, B, A)
        writeAngle(angleC, A, C, B)

        pen.autoCrop()
        this.pen = pen;
    }












    /**
     * Draw a graph for linear programming.
     * @deprecated
     * @category tool
     * @param constraints - Constraint as system of inequalities, like [[1,1,'<',2]] represent x+y<2.
     * @param field - The target linear function to optimize, [a,b,c] represent ax+by+c.
     * @param contours - The contours to draw, [4,5] represent P=4 and P=5.
     * @param labelConstraints - Constraint to label integral points.
     * @param highlights - Points to highlight, [{point,color,circle,contour,coordinates,label}].
     * @param ranges - Range of Canvas.
     * @param resolution - Resolution of Canvas
     * @returns void
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
    LinearProgram({
        constraints = [],
        field = [0, 0, 0],
        contours = [],
        labelConstraints = [],
        highlights = [],
        ranges = [[-10, 10], [-10, 10]],
        resolution = 0.2,
        grid = 0,
        subGrid = 0,
        tick = 0,
        showLine = true,
        showShade = true,
        showVertex = false,
        showVertexCoordinates = false,
        showVertexLabel = false,
        showVertexMax = false,
        showVertexMin = false,
        showIntegral = false,
        showIntegralLabel = false,
        showIntegralMax = false,
        showIntegralMin = false,
        contourColor = "grey",
        constraintColors = [],
    }: {
        constraints: Constraint[],
        field: Field,
        contours: number[],
        labelConstraints: ((x: number, y: number) => boolean)[],
        highlights: Highlight[],
        ranges: [[number, number], [number, number]],
        resolution: number,
        grid: number,
        subGrid: number,
        tick: number,
        showLine: boolean,
        showShade: boolean,
        showVertex: boolean,
        showVertexCoordinates: boolean,
        showVertexLabel: boolean,
        showVertexMax: boolean,
        showVertexMin: boolean,
        showIntegral: boolean,
        showIntegralLabel: boolean,
        showIntegralMax: boolean,
        showIntegralMin: boolean,
        contourColor: string,
        constraintColors: string[]

    }) {
        function fieldAt(p: Point2D): number {
            const [a, b, c] = field
            const [x, y] = p
            return Fix(a * x + b * y + c, 1)
        }

        let vertices = FeasiblePolygon(...constraints)
        let integrals: Point2D[] = []
        if (showIntegral || showIntegralMax || showIntegralMin) {
            integrals = FeasibleIntegral(...constraints)
        }

        const pen = new Pen();

        let [[xmin, xmax], [ymin, ymax]] = ranges
        let bound = 0.7
        xmin -= bound
        xmax += bound
        ymin -= bound
        ymax += bound
        pen.range.set([xmin, xmax], [ymin, ymax])
        pen.size.resolution(resolution);

        pen.axis.x('');
        pen.axis.y('');

        if (grid > 0) {
            pen.set.alpha(0.6);
            pen.grid.x(grid);
            pen.grid.y(grid);
            pen.set.alpha();
        }

        if (subGrid > 0) {
            pen.set.alpha(0.4);
            pen.grid.x(grid);
            pen.grid.y(grid);
            pen.set.alpha();
        }

        if (tick > 0) {
            pen.set.fillColor("grey");
            pen.set.textSize(0.8);
            pen.tick.x(tick);
            pen.tick.y(tick);
            pen.set.fillColor();
            pen.set.textSize();
        }

        function drawLines() {
            for (let i = 0; i < constraints.length; i++) {
                let [a, b, s, c] = constraints[i];
                if (!ineq(s).canEqual())
                    pen.set.dash([5, 5]);
                pen.set.color(constraintColors[i] ?? 'black')
                pen.graph.linear(a, b, -c);
                pen.set.color()
                pen.set.dash();
            }
        }

        labelConstraints.push((x, y) => x > xmin)
        labelConstraints.push((x, y) => x < xmax)
        labelConstraints.push((x, y) => y > ymin)
        labelConstraints.push((x, y) => y < ymax)

        function labelField(p: Point2D) {
            pen.set.textAlign("left")
            pen.label.point(p, fieldAt(p).toString(), 60, 10);
            pen.set.textAlign()
        }

        function drawIntegral(label = false) {
            integrals.forEach((p) => {
                pen.point(p);
                if (label && labelConstraints.every((f) => f(...p))) labelField(p)
            });
        }

        function drawVertex(coordinates = false, label = false) {
            vertices.forEach((p) => {
                pen.point(p);
                if (coordinates) pen.label.coordinates(p, 270);
                if (label && labelConstraints.every((f) => f(...p))) labelField(p)
            });
        }

        function drawShade() {
            pen.polyshade(...vertices);
        }

        function drawContour(value: number) {
            pen.graph.linear(field[0], field[1], field[2] - value);
        }

        function drawContours(color = contourColor) {
            pen.set.color(color);
            contours.forEach(drawContour);
            pen.set.color();
        }

        function drawHighlight({
            point = [0, 0],
            color = "red",
            circle = true,
            contour = true,
            coordinates = true,
            label = true,
        }: Highlight) {
            pen.set.color(color);
            pen.point(point);
            if (circle) pen.circle(point, 5);
            if (contour) drawContour(fieldAt(point));
            if (coordinates) pen.label.coordinates(point, 270);
            if (label) labelField(point)
            pen.set.color();
        }

        function drawHighlights() {
            highlights.forEach((h) => drawHighlight(h));
        }

        if (showLine) drawLines();
        if (showIntegral) drawIntegral(showIntegralLabel);
        if (showShade) drawShade();
        if (showVertex) drawVertex(showVertexCoordinates, showVertexLabel);
        drawHighlights();
        drawContours();

        if (showVertexMax) drawHighlight({
            point: MaximizePoint(vertices, field),
            color: "red"
        });
        if (showVertexMin) drawHighlight({
            point: MinimizePoint(vertices, field),
            color: "blue"
        });
        if (showIntegralMax) drawHighlight({
            point: MaximizePoint(integrals, field),
            color: "red"
        });
        if (showIntegralMin) drawHighlight({
            point: MinimizePoint(integrals, field),
            color: "blue"
        });

        this.pen = pen;
    }


    /**
     * A dot pattern
     * @category tool
     * @param a - no. of dot of 1st pattern
     * @param p - P_n+1 = P_n + (pn+q)
     * @param q - P_n+1 = P_n + (pn+q)
     * @param n - the pattern required
     * @param offset - offset of initial position
     * @returns void
     * ```
     * let pen = new AutoPen()
     * pen.DotPattern({a:3, p:3, q:2, n:4, offset:1})
     * ```
     */
    DotPattern({ a, p, q, n, offset }:
        { a: number, p: number, q: number, n: number, offset: number }) {

        const pen = new Pen();
        pen.range.set([-2, 30], [-4, 10]);
        pen.size.resolution(0.08)

        function drawRow(n: number, j: number, offset = 0) {
            for (let i = 1 + offset; i <= n + offset; i++) {
                pen.point([i, j])
            }
        }
        drawRow(a + (n - 1) * p, 1)
        for (let j = 2; j <= n; j++) {
            drawRow(q + (n - j) * p, j, (j - 1) * offset)
        }
        let m = ""
        if (n === 1) m = '1st'
        if (n === 2) m = '2nd'
        if (n === 3) m = '3rd'
        if (n >= 3) m = n + 'th'
        pen.write([(1 + a + (n - 1) * p) / 2, -1], m + ' pattern')
        pen.autoCrop();
        this.pen = pen;
    }


    /**
     * A pie chart
     * @category tool
     * @returns void
     * ```
     * let pen = new AutoPen()
     * pen.PieChart({
     *   categories: ['a','b','c','d','e'],
     *   labels: ['10%','20%','30%','40%',''],
     *   angles: [45,135,60,50,70],
     *   angleLabels: [null,'x',null,undefined,''],
     *   size:1.5
     * })
     * ```
     */
    PieChart({ categories, labels, angles, angleLabels, size = 2 }: {
        categories: string[],
        labels: string[],
        angles: number[],
        angleLabels: (string | null | undefined)[],
        size?: number
    }) {
        const pen = new Pen();
        pen.range.set([-1.2, 1.2], [-1.2, 1.2]);
        pen.size.set(size);
        pen.graph.circle([0, 0], 1)
        pen.set.angle('polar')

        let O: Point2D = [0, 0]
        pen.line(O, [1, 0])
        let current = 0
        for (let i = 0; i < angles.length; i++) {
            let a = angles[i]
            let next = current + a
            let mid = current + a / 2
            pen.line(O, PolToRect([1, next]))

            if (categories[i] === '') {
                pen.write(PolToRect([0.7, mid]), labels[i])
            } else if (labels[i] === '') {
                pen.write(PolToRect([0.7, mid]), categories[i])
            } else {
                pen.label.point(PolToRect([0.7, mid]), categories[i], 90, 10)
                pen.label.point(PolToRect([0.7, mid]), labels[i], 270, 10)
            }

            if (angleLabels[i] !== undefined) {
                pen.angle(PolToRect([1, current]), O, PolToRect([1, next]), angleLabels[i] ?? angles[i] + "°")
            }
            current += a
        }
        pen.autoCrop();
        this.pen = pen;
    }









    /**
     * A bar chart / line chart / histogram / frequency polygon / cf polygon
     * @category tool
     * @returns void
     * ```
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
    HeightChart({
        categories,
        data,
        xLabel = "",
        yLabel = "",
        interval = 5,
        subInterval = 1,
        barWidth = 1,
        barGap = 1,
        showBar = false,
        showLine = false }: {
            categories: string[],
            data: number[],
            xLabel?: string,
            yLabel?: string,
            interval?: number,
            subInterval?: number,
            barWidth?: number,
            barGap?: number,
            showBar?: boolean,
            showLine?: boolean
        }) {

        const pen = new Pen();

        let endGap = barWidth + barGap / 2
        let width = endGap + categories.length * (barWidth + barGap) + endGap
        let max = Max(...data)
        let maxUnit = Ceil(max / interval)
        let maxSubUnit = maxUnit * (interval / subInterval)
        let height = (maxUnit) * interval * 1.1

        pen.range.set([-width * 0.5, width], [-height, height]);
        pen.size.resolution(0.2, 1.4 / height)

        pen.line([0, 0], [width, 0])
        pen.arrow([0, 0], [0, height])

        pen.set.textDir(90)
        pen.write([-1.5, height / 2], yLabel)
        pen.set.textDir()

        pen.label.point([width / 2, 0], xLabel, 270, 40)

        function grid(y: number) {
            pen.line([0, y], [width, y])
        }

        for (let y = 1; y <= maxUnit; y++) {
            let h = y * interval
            pen.set.alpha(0.2)
            grid(h)
            pen.cutY([0, h])
            pen.set.alpha()
            pen.label.point([0, h], h.toString(), 180)
        }


        for (let y = 1; y <= maxSubUnit; y++) {
            pen.set.alpha(0.1)
            grid(y * subInterval)
            pen.set.alpha()
        }

        function bar(x: number, w: number, h: number) {
            pen.set.color('grey')
            pen.polyfill([x, 0], [x, h], [x + w, h], [x + w, 0])
            pen.set.color()
            pen.polygon([x, 0], [x, h], [x + w, h], [x + w, 0])
        }

        function writeCat(x: number, w: number, text: string) {
            pen.label.point([x + w / 2, 0], text, 270, 15)
        }


        if (showBar) {
            for (let i = 0; i < categories.length; i++) {
                let x = endGap + i * (barWidth + barGap) + barGap / 2
                bar(x, barWidth, data[i])
                writeCat(x, barWidth, categories[i])
            }
        }

        if (showLine) {
            let points: Point2D[] = []
            for (let i = 0; i < categories.length; i++) {
                let x = endGap + i * (barWidth + barGap) + barGap / 2
                let p: Point2D = [x + barWidth / 2, data[i]]
                pen.point(p)
                points.push(p)
                writeCat(x, barWidth, categories[i])
            }
            pen.set.weight(2)
            pen.polyline(...points)
            pen.set.weight()
        }

        pen.autoCrop();
        this.pen = pen;
    }






    // /**
    //  * A pie chart
    //  * @deprecated
    //  * @category tool
    //  * @returns void
    //  * ```
    //  * let pen = new AutoPen()
    //  * pen.StemAndLeaf({
    //  *   data: [2,5,6,12,14,16,23,23,24,25,26,26,26,26,27,31],
    //  *   labels: [2,'x',6,12,14,16,23,23,24,25,26,26,26,26,27,31],
    //  *   stemTitle: "Stem (10 units)",
    //  *   leafTitle: "Leaf (1 unit)"
    //  * })
    //  * ```
    //  */
    // StemAndLeaf({ data, labels, stemTitle = "Stem (10 units)", leafTitle = "Leaf (1 unit)" }: {
    //     data: number[],
    //     labels?: string[],
    //     stemTitle?: string,
    //     leafTitle?: string
    // }) {
    //     const pen = new Pen();

    //     labels ??= [...data].map(x => x.toString())
    //     labels = labels.map(x => x.toString().split('').reverse()[0])

    //     let width = data.length + 2
    //     let height = Ceil(Max(...data) / 10) + 2

    //     pen.range.set([-5, width], [-height, 2]);
    //     pen.size.resolution(0.17)

    //     pen.line([0, -1], [0, 2])
    //     pen.line([-3, 0], [1, 0])

    //     pen.set.textAlign('left')
    //     pen.write([0.5, 1], leafTitle)

    //     pen.set.textAlign('right')
    //     pen.write([-0.5, 1], stemTitle)
    //     pen.set.textAlign()

    //     let initTen = Floor(Min(...data) / 10)
    //     let endTen = Floor(Max(...data) / 10)

    //     let ten = initTen
    //     for (let j = -1; ten <= endTen; j--) {
    //         pen.write([-1, j], ten.toString())
    //         pen.line([0, j], [0, j - 1])

    //         let i = 1
    //         for (let m = 0; m < data.length; m++) {
    //             if (Floor(data[m] / 10) === ten) {
    //                 if (!IsNum(Number(labels[m])))
    //                     pen.set.textItalic(true)
    //                 pen.write([i, j], labels[m])
    //                 pen.set.textItalic()
    //                 pen.line([i, 0], [i + 1, 0])
    //                 i++
    //             }
    //         }
    //         ten += 1
    //     }
    //     pen.autoCrop();
    //     this.pen = pen;
    // }



    /**
     * A boxplot
     * @category tool
     * @returns void
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
    Boxplot({
        summary = [0, 0, 0, 0, 0],
        labels = [null, null, null, null, null],
        size = 2,
        tick = 1,
        start,
        end,
        showDash = false,
        showValue = false,
        showTick = false
    }: {
        summary: number[],
        labels?: (string | null)[],
        size?: number,
        tick?: number,
        start?: number,
        end?: number,
        showDash?: boolean,
        showValue?: boolean,
        showTick?: boolean,
    }) {
        const pen = new Pen();
        let [Q0, Q1, Q2, Q3, Q4] = summary

        let height = showDash ? 1 : 0.5
        let thickness = 1

        let b = height
        let t = b + thickness
        let m = (b + t) / 2

        let L: Point2D = [Q0, m]
        let R: Point2D = [Q4, m]
        let A1: Point2D = [Q1, t]
        let A2: Point2D = [Q1, b]
        let Am: Point2D = [Q1, m]

        let B1: Point2D = [Q2, t]
        let B2: Point2D = [Q2, b]
        let C1: Point2D = [Q3, t]
        let C2: Point2D = [Q3, b]
        let Cm: Point2D = [Q3, m]

        let L_: Point2D = [Q0, 0]
        let R_: Point2D = [Q4, 0]
        let A_: Point2D = [Q1, 0]
        let B_: Point2D = [Q2, 0]
        let C_: Point2D = [Q3, 0]


        start ??= Q0 - (Q4 - Q0) * 0.2
        end ??= Q4 + (Q4 - Q0) * 0.2

        pen.range.set([start, end], [-(t + 1), t + 1]);
        pen.size.set(size, 1)

        if (showTick) {
            pen.tick.x(tick);
        }

        pen.axis.x('');

        pen.polygon(A1, A2, C2, C1)
        pen.line(B1, B2)
        pen.line(L, Am)
        pen.line(R, Cm)

        if (showDash) {
            pen.dash(L, L_)
            pen.dash(A2, A_)
            pen.dash(B2, B_)
            pen.dash(C2, C_)
            pen.dash(R, R_)
        }

        if (showValue) {
            pen.cutX(L_)
            pen.label.point(L_, labels[0] ?? String(Q0), 270)
            pen.cutX(A_)
            pen.label.point(A_, labels[1] ?? String(Q1), 270)
            pen.cutX(B_)
            pen.label.point(B_, labels[2] ?? String(Q2), 270)
            pen.cutX(C_)
            pen.label.point(C_, labels[3] ?? String(Q3), 270)
            pen.cutX(R_)
            pen.label.point(R_, labels[4] ?? String(Q4), 270)
        }

        pen.autoCrop();
        this.pen = pen;
    }




    /**
     * A regular polygon
     * @category tool
     * @returns void
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
    RegularPolygon({
        side,
        diagonal = false,
        reflectional = false,
        rotational = false,

    }: {
        side: number,
        diagonal: boolean,
        reflectional: boolean,
        rotational: boolean,
    }) {

        const pen = new Pen()

        pen.range.square(1.3);
        pen.size.set(1)

        let gon = RegularPolygon(side, [0, 0], 1, 0)
        pen.polygon(...gon)


        if (diagonal) {
            pen.set.alpha(0.3)
            for (let i = 0; i < side; i++) {
                for (let j = i + 1; j < side; j++) {
                    pen.line(gon[i], gon[j])
                }
            }
            pen.set.alpha()
        }

        if (reflectional) {

            pen.set.alpha(0.5)
            pen.set.dash(true)

            if (side % 2 === 0) {

                pen.set.color('red')
                for (let n = 0; n < side; n += 2) {
                    pen.graph.through([0, 0], PolToRect([1, n * 180 / side]))
                }

                pen.set.color('blue')
                for (let n = 1; n < side; n += 2) {
                    pen.graph.through([0, 0], PolToRect([1, n * 180 / side]))
                }

            } else {

                for (let n = 0; n < side; n++) {
                    pen.graph.through([0, 0], PolToRect([1, n * 180 / side]))
                }

            }

            pen.set.alpha()
            pen.set.dash()
        }


        if (rotational) {
            for (let i = 0; i < side - 1; i += 2) {
                pen.line(gon[i], [0, 0])
            }
        }

        pen.autoCrop();
        this.pen = pen;
    }









}

