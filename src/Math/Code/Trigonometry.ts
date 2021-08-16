
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
function Quadrant(rect: Point2D | number): QuadrantName {
    if (!Array.isArray(rect)) rect = PolToRect([1, rect]);
    const q = RectToPol(rect)[1];
    if (q >= 0 && q < 90) return "I";
    if (q >= 90 && q < 180) return "II";
    if (q >= 180 && q < 270) return "III";
    if (q >= 270 && q < 360) return "IV";
    Should(false, 'fail to parse quadrant!')
    throw 'never'
}
globalThis.Quadrant = contract(Quadrant).sign([owl.or([owl.point2D, owl.num])])


/**
 * @category Trigonometry
 * @return the rectangular coordinates [x,y] from a polar coordinates [r,theta].
 * ```
 * PolToRect([1,45]) // [0.707,0.707]
 * ```
 */
function PolToRect([r, q]: PolarPoint): Point2D {
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
function RectToPol([x, y]: Point2D): PolarPoint {
    const r = Math.sqrt(x * x + y * y);
    let q = Math.atan2(y, x) * 180 / Math.PI;
    if (q < 0) q = q + 360;
    return [r, q];
}
globalThis.RectToPol = contract(RectToPol).sign([owl.point2D])

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
 * @deprecated use TrigSolve instead
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



/**
 * @category Trigonometry
 * @return the roots of trig equations sin(x)=k , cos(x)=k or tan(x)=k.
 * ```
 * TrigSolve('sin',0) // [0, 180, 360]
 * TrigSolve('sin',0.5) // [30, 150]
 * TrigSolve('sin',1) // [90]
 * ```
 */
function TrigSolve(func: TrigFunc, k: number): number[] {
    if (func == 'sin') {
        if (k > 1 || k < -1) return [];
        if (k == 0) return [0, 180, 360];
        if (k == 1) return [90];
        if (k == -1) return [270];
        if (k > 0) {
            let a = arcsin(k);
            let b = 180 - a;
            return [a, b];
        }
        if (k < 0) {
            let x = -arcsin(k);
            let a = 180 + x;
            let b = 360 - x;
            return [a, b];
        }
    }
    if (func == 'cos') {
        if (k > 1 || k < -1) return [];
        if (k == 0) return [90, 270];
        if (k == 1) return [0, 360];
        if (k == -1) return [180];
        let a = arccos(k);
        let b = 360 - a;
        return [a, b];
    }
    if (func == 'tan') {
        if (k == 0) return [0, 180, 360];
        if (k > 0) {
            let a = arctan(k);
            let b = 180 + a;
            return [a, b];
        }
        if (k < 0) {
            let x = -arctan(k);
            let a = 180 - x;
            let b = 360 - x;
            return [a, b];
        }
    }
    return [];
}
globalThis.TrigSolve = contract(TrigSolve).sign([owl.trig, owl.num])




/**
 * @category Trigonometry
 * @return reduce the polar angle into the range [0,360)
 * ```
 * PolarReduce(370) // 10
 * PolarReduce(-10) // 350
 * ```
 */
function PolarReduce(q: number): number {
    q = q % 360
    if (q < 0) q += 360
    return q
}
globalThis.PolarReduce = contract(PolarReduce).sign([owl.num])




/**
 * @category Trigonometry
 * @return the angle (within [0,180]) between two polar angles
 * ```
 * PolarDiff(80,70) // 10
 * PolarDiff(350,10) // 20
 * ```
 */
function PolarDiff(angle1: number, angle2: number): number {
    angle1 = PolarReduce(angle1)
    angle2 = PolarReduce(angle2)
    let d = Abs(angle1 - angle2)
    return Math.min(d, 360 - d)
}
globalThis.PolarDiff = contract(PolarDiff).sign([owl.num])






/**
 * @category Trigonometry
 * @return the whole bearing in the polar angle direction
 * ```
 * WholeBearing(0) // '090°'
 * WholeBearing(180) // '270°'
 * ```
 */
function WholeBearing(polarAngle: number): string {
    let q = polarAngle
    q = PolarReduce(q)
    q = cal.blur(q)
    q = q <= 90 ? 90 - q : 450 - q
    q = cal.blur(q)
    return q.toString().padStart(3, '0') + '°'
}
globalThis.WholeBearing = contract(WholeBearing).sign([owl.int])


/**
 * @category Trigonometry
 * @return the compass bearing in the polar angle direction
 * ```
 * CompassBearing(30) // 'N60°E'
 * ```
 */
function CompassBearing(polarAngle: number): string {
    let q = polarAngle
    q = PolarReduce(q)
    q = cal.blur(q)

    if (q === 0) return 'east'
    if (q === 270) return 'south'
    if (q === 180) return 'west'
    if (q === 90) return 'north'

    if (0 < q && q < 90)
        return 'N' + (90 - q) + '°E'
    if (90 < q && q < 180)
        return 'N' + (q - 90) + '°W'
    if (180 < q && q < 270)
        return 'S' + (270 - q) + '°W'
    if (270 < q && q < 360)
        return 'S' + (q - 270) + '°E'
    throw 'never'
}
globalThis.CompassBearing = contract(CompassBearing).sign([owl.int])

