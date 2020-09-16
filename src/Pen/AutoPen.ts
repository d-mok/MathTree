
/**
 * AutoPen.
 * @namespace AutoPen
 */

class AutoPenCls {
    pen: PenCls

    constructor() {
        this.pen = new Pen();
    }
    /**
     * The export function.
     * @namespace AutoPen_Export
     * @memberof AutoPen
     */

    /**
     * Export the canvas to image tag.
     * @memberof AutoPen.AutoPen_Export
     * @param {string} html - The html string to export to.
     * @param {string} placeholder - The src field of the image tag to export to.
     * @returns {string} The new html with src field pasted.
     * @example
     * question = autoPen.export(question,'imgQ') // paste the canvas to the image tag with src field 'imgQ'
     */
    export(html: string, placeholder: string) {
        return this.pen.export(html, placeholder);
    }
    /**
     * Packaged Tools.
     * @namespace AutoPen_Tool
     * @memberof AutoPen
     */

    /**
     * A short division diagram for prime factorization of numbers.
     * @memberof AutoPen.AutoPen_Tool
     * @param {Array} numbers - The array of numbers to factorize.
     * @returns {void} The image is ready for export.
     * @example
     * autoPen.PrimeFactorization({numbers:[12,24]})
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
     * @memberof AutoPen.AutoPen_Tool
     * @param {Array} items - Represent the inequalities.
     * @param {Array} ticks - Represent the tick or cross for each region.
     * @param {number} [scale=1] - scale for pen.setup.size()
     * @param {number} [ratio=1] - ratio for pen.setup.size()
     * @returns {void} The image is ready for export.
     * @example
     * autoPen.Inequalities({items:[{ position: 0.3, sign: "\\ge", num: 5,vertical:true },{ position: 0.7, sign: "<", num: "k" }], ticks:[true,true,false]})
     */
    Inequalities({ items = [], ticks = [], scale = 1, ratio = 1 }: { items: any[], ticks: boolean[], scale: number, ratio: number }) {

        const width = 5;
        const height = 2;

        items = items.map((x, i) => {
            x.base = -i * (height + 2);
            return x;
        });

        const pen = new Pen();
        pen.setup.size(scale, ratio);
        pen.setup.range([-width - 2, width + 2], [-(items.length) * (height + 2) + 2, height + 1]);

        function inequality({ position, sign, num, base, vertical }: { position: number, sign: string, num: number, base: number, vertical: boolean }) {
            let greater = sign.includes('>') || sign.includes('g');
            let solid = sign.includes('=') || sign.includes('e');
            let align = -width + 2 * width * position;

            let B = [align, base];
            let T = [align, base + height];
            let E = [greater ? align + 0.4 * width : align - 0.4 * width, base + height];
            let E1 = [greater ? width : -width, base + height];
            let E2 = [greater ? width : -width, base];

            if (vertical) {
                pen.set.strokeColor('grey');
                pen.set.dash([10, 10]);
                pen.straight.vertical(align);
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

            pen.label(B, num.toString(), 270);
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
     * @memberof AutoPen.AutoPen_Tool
     * @param {string} trig - 'sin' | 'cos' | 'tan'
     * @param {number} k - value of trig, like sin = k.
     * @param {number} [scale=0.8] - scale for pen.setup.size()
     * @param {number} [ratio=0.7] - ratio for pen.setup.size()
     * @returns {void} The image is ready for export.
     * @example
     * autoPen.TrigSolution({trig:'sin', k:0.5})
     */
    TrigSolution({ trig = 'sin', k = 0, scale = 0.7, ratio = 0.7 }: { trig: string, k: number, scale: number, ratio: number }) {

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
            pen.label([0, 1], '1', 180)
            pen.label([0, -1], '-1', 180)
        }


        pen.set.weight(1.5)
        if (trig === 'sin') pen.plot(x => sin(x), 0, 360)
        if (trig === 'cos') pen.plot(x => cos(x), 0, 360)
        if (trig === 'tan') {
            pen.plot(x => tan(x), 0, 360)
            pen.set.strokeColor('grey')
            pen.set.dash([5, 10])
            pen.set.weight(0.7)
            pen.straight.vertical(90)
            pen.straight.vertical(270)
            pen.set.strokeColor()
            pen.set.dash()
            pen.set.weight(1)
        }
        pen.set.weight(1)


        function arrow(x: number, y: number, func: string, label = '') {
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

            if (x === undefined) return
            let P = [x, y]
            let Q = [x, 0]
            let R = [anchor, 0]
            pen.set.fillColor()
            pen.point(P)
            pen.set.fillColor('red')
            if (y !== 0) { pen.line(P, Q, true) }
            if (y >= 0) { pen.label(Q, label, 270) }
            if (y < 0) { pen.label(Q, label, 90) }

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
        pen.straight.horizontal(k)
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
     * @memberof AutoPen.AutoPen_Tool
     * @param {number[]} quadratic - [a,b,c] representing coeff of quadratic inequality.
     * @param {string} sign - The sign of the inequality. Can be like '>=' , '<' or '\\ge' , '\\lt'.
     * @param {number} [scale=0.5] - scale for pen.setup.size()
     * @param {number} [ratio=0.8] - ratio for pen.setup.size()
     * @returns {void} The image is ready for export.
     * @example
     * autoPen.QuadraticInequality({quadratic:[1,2,-3],sign:'\\ge'})
     */
    QuadraticInequality({ quadratic, sign, scale = 0.5, ratio = 0.8 }: { quadratic: number[], sign: string, scale: number, ratio: number }) {
        let a = quadratic[0]
        let b = quadratic[1]
        let c = quadratic[2]

        let greater = sign.includes('>') || sign.includes('g');
        let equal = sign.includes('=') || sign.includes('e');

        let [p, q] = QuadraticRoot(a, b, c);
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
            let P = [2, 0]
            let Q = [-2, 0]
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
            pen.label(P, p.toString(), a > 0 ? 315 : 45)
            pen.label(Q, q.toString(), a > 0 ? 225 : 135)
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
            pen.label([0, 0], p.toString(), a > 0 ? 270 : 90)
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
     * @memberof AutoPen.AutoPen_Tool
     * @param {number[][]} vertices - [A,B,C] an array of coordinates [x,y] of 3 vertices, must be anticlockwise.
     * @param {number[]} triangle - The elements of triangle to print, [c,B,a,C,b,A]. If falsy, show no label.
     * @param {(number|string)[]} labels - The labels of the vertices. If falsy, show no label.
     * @param {number} [ratio=1] - ratio for pen.setup.size()
     * @returns {void} The image is ready for export.
     * @example
     * autoPen.Triangle({vertices:[[0,0],[4,0],[0,3]],triangle:[4,37,5,53,3,90],labels:['A','B','C']})
     */
    Triangle({ vertices, triangle, labels, scale = 1 }:
        { vertices: number[][], triangle: number[], labels: (number | string)[], scale: number }) {

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

        let G = SumPoint(A, B, C)
        G = ScalePoint(G, 1 / 3)

        let T = triangle
        let sideA = T[2]
        let sideB = T[4]
        let sideC = T[0]
        let angleA: number | string = T[5]
        let angleB: number | string = T[1]
        let angleC: number | string = T[3]

        let labelA = labels[0]
        let labelB = labels[1]
        let labelC = labels[2]

        const pen = new Pen();
        pen.setup.size(scale);
        pen.setup.range([xmid - dmax, xmid + dmax], [ymid - dmax, ymid + dmax])
        pen.polygon([A, B, C])

        pen.set.textItalic(true)
        if (labelA) pen.label(A, labelA.toString(), Inclination(G, A))
        if (labelB) pen.label(B, labelB.toString(), Inclination(G, B))
        if (labelC) pen.label(C, labelC.toString(), Inclination(G, C))
        pen.set.textItalic()


        if (sideC) {
            if (typeof sideC === 'string') pen.set.textItalic(true)
            pen.labelLine([A, B], sideC.toString())
            pen.set.textItalic()
        }

        if (sideA) {
            if (typeof sideA === 'string') pen.set.textItalic(true)
            pen.labelLine([B, C], sideA.toString())
            pen.set.textItalic()
        }

        if (sideB) {
            if (typeof sideB === 'string') pen.set.textItalic(true)
            pen.labelLine([C, A], sideB.toString())
            pen.set.textItalic()
        }


        if (angleA) {
            if (typeof angleA === 'string') pen.set.textItalic(true)
            if (typeof angleA === 'number') angleA = angleA + '°'
            pen.decorate.angle(B, A, C)
            pen.labelAngle([B, A, C], angleA)
            pen.set.textItalic()
        }

        if (angleB) {
            if (typeof angleB === 'string') pen.set.textItalic(true)
            if (typeof angleB === 'number') angleB = angleB + '°'
            pen.decorate.angle(C, B, A)
            pen.labelAngle([C, B, A], angleB)
            pen.set.textItalic()
        }

        if (angleC) {
            if (typeof angleC === 'string') pen.set.textItalic(true)
            if (typeof angleC === 'number') angleC = angleC + '°'
            pen.decorate.angle(A, C, B)
            pen.labelAngle([A, C, B], angleC)
            pen.set.textItalic()
        }

        pen.autoCrop()
        this.pen = pen;
    }

}


var AutoPen = AutoPenCls
globalThis.AutoPen = AutoPen