
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
     * autoPen.TrigSolution({trig:'sin', k=0.5})
     */
    TrigSolution({ trig = 'sin', k = 0, scale = 0.8, ratio = 0.7 }: { trig: string, k: number, scale: number, ratio: number }) {

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
}


var AutoPen = AutoPenCls
globalThis.AutoPen = AutoPen