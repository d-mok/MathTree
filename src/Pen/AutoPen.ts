
/**
 * AutoPen.
 * @namespace AutoPen
 */

class AutoPen {
    pen: Pen

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
}
