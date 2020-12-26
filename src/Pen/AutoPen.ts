
/**
 * @category DrawingPen
 */
class AutoPenCls {
    /**
     * @ignore
     */
    pen: PenCls

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
     * ```typescript
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
     * @returns
     * ```typescript
     * autoPen.PrimeFactorization({numbers:[12,24]})
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
        pen.setup.size(2);
        pen.setup.range([-10, 10], [-15, 5]);
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
     * @returns
     * ```typescript
     * autoPen.Inequalities({
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
        scale = 0.8,
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
        pen.setup.size(scale, ratio);
        pen.setup.range([-width - 2, width + 2], [-(items.length) * (height + 2) + 2, height + 1]);

        function inequality({ position, sign, num, base, vertical }: { position: number, sign: string, num: number | string, base: number, vertical: boolean }) {
            let greater = sign.includes('>') || sign.includes('g');
            let solid = sign.includes('=') || sign.includes('e');
            let align = -width + 2 * width * position;

            let B: Point = [align, base];
            let T: Point = [align, base + height];
            let E: Point = [greater ? align + 0.4 * width : align - 0.4 * width, base + height];
            let E1: Point = [greater ? width : -width, base + height];
            let E2: Point = [greater ? width : -width, base];

            if (vertical) {
                pen.set.strokeColor('grey');
                pen.set.dash([10, 10]);
                pen.graph.vertical(align);
                pen.set.strokeColor();
                pen.set.dash();
            }

            pen.set.fillColor('black');
            pen.set.alpha(0.1);
            pen.set.strokeColor('white');
            pen.polygon([B, T, E1, E2], true);
            pen.set.alpha();
            pen.set.strokeColor('black');
            pen.set.fillColor('black');

            pen.line([-width, base], [width, base], true);
            pen.line(B, T);
            pen.line(T, E, true);
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
     * @returns
     * ```typescript
     * autoPen.TrigSolution({trig:'sin', k:0.5})
     * ```
     */
    TrigSolution({
        trig = 'sin',
        k = 0,
        scale = 0.7,
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
        pen.setup.size(scale, ratio)

        let limit = Max(1, Abs(k)) + 0.2

        if (trig === 'sin') pen.setup.range([-40, 390], [-limit, limit])
        if (trig === 'cos') pen.setup.range([-40, 390], [-limit, limit])
        if (trig === 'tan') pen.setup.range([-40, 390], [-5, 5])

        pen.axis.x()
        pen.axis.y()
        if (trig === 'sin' || trig === 'cos') {
            pen.tick.x(360)
        }
        if (trig === 'tan') {
            pen.tick.x(180)
        }

        if (trig === 'sin' || trig === 'cos') {
            pen.cutterV([0, 1])
            pen.cutterV([0, -1])
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


            let P: Point = [x, y]
            let Q: Point = [x, 0]
            let R: Point = [anchor, 0]
            pen.set.fillColor()
            pen.point(P)
            pen.set.fillColor('red')
            if (y !== 0) { pen.line(P, Q, true) }
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
     * @returns
     * ```typescript
     * autoPen.QuadraticInequality({quadratic:[1,2,-3],sign:'\\ge'})
     * ```
     */
    QuadraticInequality({
        quadratic,
        sign,
        scale = 0.5,
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
        pen.setup.size(scale, ratio);
        pen.setup.range([-5, 5], [-5, 5]);
        pen.axis.x('');

        if (p !== undefined && q !== undefined && p !== q) {
            pen.plot(x => Sign(a) * (x ** 2 - 4))
            let P: Point = [2, 0]
            let Q: Point = [-2, 0]
            pen.cutterH(P)
            pen.cutterH(Q)
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
     * @returns
     * ```typescript
     * autoPen.Triangle({
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
        scale = 0.8
    }: {
        vertices: Point[],
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

        let G = VectorMean(A, B, C)

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
        pen.setup.size(scale);
        pen.setup.range([xmid - dmax, xmid + dmax], [ymid - dmax, ymid + dmax])


        function drawHeight(vertex: [number, number], base: [number, number][]) {
            let F = PerpendicularFoot(base[0], base[1], vertex)
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
                pen.decorate.rightAngle(vertex, F, base[1])
            } else {
                pen.decorate.rightAngle(vertex, F, base[0])
            }
            pen.set.strokeColor()

        }

        if (heights[0]) drawHeight(A, [B, C])
        if (heights[1]) drawHeight(B, [C, A])
        if (heights[2]) drawHeight(C, [A, B])


        pen.polygon([A, B, C])

        pen.set.textItalic(true)
        if (labelA) pen.label.point(A, labelA.toString(), Inclination(G, A))
        if (labelB) pen.label.point(B, labelB.toString(), Inclination(G, B))
        if (labelC) pen.label.point(C, labelC.toString(), Inclination(G, C))
        pen.set.textItalic()

        let AB = [B[0] - A[0], B[1] - A[1]]
        let BC = [C[0] - B[0], C[1] - B[1]]
        let anticlockwise = (AB[0] * BC[1] - AB[1] * BC[0]) > 0





        function writeSide(side: any, start: Point, end: Point): void {
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

        function writeAngle(angle: any, P: Point, O: Point, Q: Point): void {
            if (angle) {
                if (typeof angle === 'string') pen.set.textItalic(true)
                if (typeof angle === 'number') angle = angle + '°'
                if (anticlockwise) {
                    pen.decorate.anglePolar(P, O, Q)
                    pen.label.anglePolar([P, O, Q], angle)
                } else {
                    pen.decorate.anglePolar(Q, O, P)
                    pen.label.anglePolar([Q, O, P], angle)
                }
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
     * let autoPen = new AutoPen()
     * let constraints = [[1, 1, "<=", 5], [1, -1, "<", 4], [2, 1, ">=", -5], [3, 1, ">", -10]]
     * autoPen.LinearProgram({
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
    LinearProgram({
        constraints = [],
        field = [0, 0, 0],
        contours = [],
        labelConstraints = [],
        highlights = [],
        ranges = [[-10, 10], [-10, 10]],
        resolution = 0.1,
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
        function fieldAt(p: Point): number {
            const [a, b, c] = field
            const [x, y] = p
            return Fix(a * x + b * y + c, 1)
        }

        let vertices = FeasiblePolygon(...constraints)
        let integrals: Point[] = []
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
        pen.setup.range([xmin, xmax], [ymin, ymax])
        pen.setup.resolution(resolution);

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
                let [_, eq] = ParseIneqSign(s)
                if (!eq) pen.set.dash([5, 5]);
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

        function labelField(p: Point) {
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
            pen.set.alpha(0.3);
            pen.polygon(vertices, true);
            pen.set.alpha();
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

}


var AutoPen = AutoPenCls
globalThis.AutoPen = AutoPen