
/**
 * @category Trigonometry
 * @param rect - The rectangular coordinates [x,y] of a point, or a polar angle theta.
 * @return  the quadrant of a point or angle: 'I','II','III' or 'IV'.
 * ```
 * Quadrant([1,1]) \\ 'I'
 * Quadrant([-1,1]) \\ 'II'
 * Quadrant(200) \\ 'III'
 * Quadrant(350) \\ 'IV'
 * ```
 */
function Quadrant(rect: Point | number): QuadrantName {
    if (!Array.isArray(rect)) rect = PolToRect([1, rect]);
    const q = RectToPol(rect)[1];
    if (q >= 0 && q < 90) return "I";
    if (q >= 90 && q < 180) return "II";
    if (q >= 180 && q < 270) return "III";
    if (q >= 270 && q < 360) return "IV";
    Should(false, 'fail to parse quadrant!')
    throw 'never'
}
globalThis.Quadrant = contract(Quadrant).sign([owl.or([owl.point, owl.num])])


/**
 * @category Trigonometry
 * @return the rectangular coordinates [x,y] from a polar coordinates [r,theta].
 * ```
 * PolToRect([1,45]) // [0.707,0.707]
 * ```
 */
function PolToRect([r, q]: PolarPoint): Point {
    return [r * cos(q), r * sin(q)];
}
globalThis.PolToRect = contract(PolToRect).sign([owl.polar])


/**
 * @category Trigonometry
 * @return the polar coordinates [r,theta] of a rectangular coordinates [x,y].
 * ```
 * RectToPol([1,1]) // [1.414,45]
 * ```
 */
function RectToPol([x, y]: Point): PolarPoint {
    const r = Math.sqrt(x * x + y * y);
    let q = Math.atan2(y, x) * 180 / Math.PI;
    if (q < 0) q = q + 360;
    return [r, q];
}
globalThis.RectToPol = contract(RectToPol).sign([owl.point])

/**
 * @category Trigonometry
 * @return the sign from ASTC diagram, 1 or -1, representing positive or negative.
 * ```
 * ASTC(2,'cos') // -1
 * ASTC('III','tan') // 1
 * ```
 */
function ASTC(quadrant: QuadrantCode | QuadrantName, func: TrigFunc): -1 | 0 | 1 {
    if (quadrant == "I") quadrant = 1;
    if (quadrant == "II") quadrant = 2;
    if (quadrant == "III") quadrant = 3;
    if (quadrant == "IV") quadrant = 4;
    if (quadrant == 1) return 1;
    if (quadrant == 2) return func === 'sin' ? 1 : -1;
    if (quadrant == 3) return func === 'tan' ? 1 : -1;
    if (quadrant == 4) return func === 'cos' ? 1 : -1;
    return 0
}
globalThis.ASTC = contract(ASTC).sign([owl.quadrant, owl.trig])


/**
 * @category Trigonometry
 * @return the roots of trig equations sin(x)=k , cos(x)=k or tan(x)=k. The angles [r1,r2,r3].
 * ```
 * TrigRoot('sin',0) // [0, 180, 360]
 * TrigRoot('sin',0.5) // [30, 150, undefined]
 * TrigRoot('sin',1) // [90, undefined, undefined]
 * ```
 */
function TrigRoot(func: TrigFunc, k: number): [number | undefined, number | undefined, number | undefined] {
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
globalThis.TrigRoot = contract(TrigRoot).sign([owl.trig, owl.num])


