


/**
 * Return the quadrant of a point or angle.
 * @category Trigonometry
 * @param {(number[]|number)} rect - The rectangular coordinates [x,y] of a point, or a polar angle theta.
 * @return {string} The quadrant 'I','II','III' or 'IV'.
 * @example
 * Quadrant([1,1]) \\ return 'I'
 * Quadrant([-1,1]) \\ return 'II'
 * Quadrant(200) \\ return 'III'
 * Quadrant(350) \\ return 'IV'
 */
function Quadrant(rect: any): string {
    if (!Array.isArray(rect)) rect = PolToRect([1, rect]);
    const q = RectToPol(rect)[1];
    if (q >= 0 && q < 90) return "I";
    if (q >= 90 && q < 180) return "II";
    if (q >= 180 && q < 270) return "III";
    if (q >= 270 && q < 360) return "IV";
    return ''
}
globalThis.Quadrant = Quadrant


/**
 * Return the rectangular coordinates [x,y] of a polar coordinates [r,theta].
 * @category Trigonometry
 * @param {number[]} polar - The polar coordinates [r,theta].
 * @return {number[]} The rectangular coordinates [x,y].
 * @example
 * PolToRect([1,45]) // return [0.707,0.707]
 */
function PolToRect([r, q]: number[]): number[] {
    return [r * cos(q), r * sin(q)];
}
globalThis.PolToRect = PolToRect

/**
 * Return the polar coordinates [r,theta] of a rectangular coordinates [x,y].
 * @category Trigonometry
 * @param {number[]} rect - The rectangular coordinates [x,y].
 * @return {number[]} The polar coordinates [r,theta].
 * @example
 * RectToPol([1,1]) // return [1.414,45]
 */
function RectToPol([x, y]: number[]): number[] {
    const r = Math.sqrt(x * x + y * y);
    let q = Math.atan2(y, x) * 180 / Math.PI;
    if (q < 0) q = q + 360;
    return [r, q];
}
globalThis.RectToPol = RectToPol

/**
 * Return sign from ASTC diagram.
 * @category Trigonometry
 * @param {(number|string)} quadrant - The quadrant as {1,2,3,4} or {'I','II','III','IV'}.
 * @param {string} func - 'sin','cos' or 'tan'.
 * @return {number} 1 or -1, representing positive or negative.
 * @example
 * ASTC(2,'cos') // return -1
 * ASTC('III','tan') // return 1
 */
function ASTC(quadrant: any, func: string): any {
    if (quadrant == "I") quadrant = 1;
    if (quadrant == "II") quadrant = 2;
    if (quadrant == "III") quadrant = 3;
    if (quadrant == "IV") quadrant = 4;
    if (![1, 2, 3, 4].includes(quadrant)) return 0;
    if (!['sin', 'cos', 'tan'].includes(func)) return 0;
    if (quadrant == 1) return 1;
    if (quadrant == 2) return func == 'sin' ? 1 : -1;
    if (quadrant == 3) return func == 'tan' ? 1 : -1;
    if (quadrant == 4) return func == 'cos' ? 1 : -1;
    return 0
}
globalThis.ASTC = ASTC

/**
 * Return the roots of trig equations sin(x)=k , cos(x)=k or tan(x)=k.
 * @category Trigonometry
 * @param {string} func - 'sin', 'cos' or 'tan'.
 * @param {number} k - The value of trig function.
 * @return {any[]} The angles [r1,r2,r3].
 * @example
 * TrigRoot('sin',0) // return [0, 180, 360]
 * TrigRoot('sin',0.5) // return [30, 150, undefined]
 * TrigRoot('sin',1) // return [90, undefined, undefined]
 */
function TrigRoot(func: string, k: number): any[] {
    if (func == 'sin') {
        if (k > 1 || k < -1) return [undefined, undefined, undefined];
        if (k == 0) return [0, 180, 360];
        if (k == 1) return [90, undefined, undefined];
        if (k == -1) return [270, undefined, undefined];
        if (k > 0) {
            let a = arcsin(k);
            let b = 180 - a;
            return [a, b, undefined];
        }
        if (k < 0) {
            let x = -arcsin(k);
            let a = 180 + x;
            let b = 360 - x;
            return [a, b, undefined];
        }
    }
    if (func == 'cos') {
        if (k > 1 || k < -1) return [undefined, undefined, undefined];
        if (k == 0) return [90, 270, undefined];
        if (k == 1) return [0, 360, undefined];
        if (k == -1) return [180, undefined, undefined];
        let a = arccos(k);
        let b = 360 - a;
        return [a, b, undefined];
    }
    if (func == 'tan') {
        if (k == 0) return [0, 180, 360];
        if (k > 0) {
            let a = arctan(k);
            let b = 180 + a;
            return [a, b, undefined];
        }
        if (k < 0) {
            let x = -arctan(k);
            let a = 180 - x;
            let b = 360 - x;
            return [a, b, undefined];
        }
    }
    return [undefined, undefined, undefined];
}
globalThis.TrigRoot = TrigRoot



