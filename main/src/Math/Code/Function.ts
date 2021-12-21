import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'


@exposeAll()
@captureAll()
class Host {

    /**
     * log(b,N)
     * ```
     * log(2,8) // 3
     * ```
     */
    @checkIt(owl.positive)
    static log(b: number, N: number): number {
        const v = Math.log(N) / Math.log(b)
        return cal.blur(v)
    }

    /**
     * @deprecated
     * @ignore
     * a**b, a to the power of b.
     * ```
     * Power(2,3) // 8
     * ```
     */
    @checkIt(owl.num)
    static Power(a: number, b: number): number {
        const v = Math.pow(a, b)
        return cal.blur(v)
    }

    /**
     * square root of x
     * ```
     * Sqrt(4) // 2
     * ```
     */
    @checkIt(owl.nonNegative)
    static Sqrt(x: number): number {
        const v = Math.sqrt(x)
        return cal.blur(v)
    }

    /**
     * the radian of the degree
     * ```
     * Radian(180) // pi
     * Radian(90) // pi/2
     * Radian(30) // PI/6
     * ```
     */
    @checkIt(owl.num)
    static Radian(degree: number): number {
        const v = degree / 180 * Math.PI
        return cal.blur(v)
    }



    /**
     * the degree of the radian
     * ```
     * Degree(Math.PI) // 180
     * Degree(Math.PI/2) // 90
     * Degree(Math.PI/6) // 30
     * ```
     */
    @checkIt(owl.num)
    static Degree(radian: number): number {
        const v = radian * 180 / Math.PI
        return cal.blur(v)
    }



    /**
     * sin(x).
     * ```
     * sin(30) // 0.5
     * ```
     */
    @checkIt(owl.num)
    static sin(x: number): number {
        if (x % 180 === 0) return 0
        let v = Math.sin(x / 180 * Math.PI)
        return cal.blur(v)
    }

    /**
     * cos(x).
     * ```
     * cos(60) // 0.5
     * ```
     */
    @checkIt(owl.num)
    static cos(x: number): number {
        if ((x - 90) % 180 === 0) return 0
        let v = Math.cos(x / 180 * Math.PI)
        return cal.blur(v)
    }

    /**
     * tan(x).
     * ```
     * tan(45) // 1
     * ```
     */
    @checkIt(owl.num)
    static tan(x: number): number {
        if (x % 180 === 0) return 0
        let v = Math.tan(x / 180 * Math.PI)
        return cal.blur(v)
    }

    /**
     * arcsin(x) between -90 and 90.
     * ```
     * arcsin(0.5) // 30
     * ```
     */
    @checkIt(owl.between(-1, 1))
    static arcsin(x: number): number {
        let v = Math.asin(x) * 180 / Math.PI
        return cal.blur(v)
    }

    /**
     * arccos(x) between 0 and 180.
     * ```
     * arccos(0.5) // 60
     * ```
     */
    @checkIt(owl.between(-1, 1))
    static arccos(x: number): number {
        let v = Math.acos(x) * 180 / Math.PI
        return cal.blur(v)
    }

    /**
     * arctan(x) between -90 and 90.
     * ```
     * arctan(1) // 45
     * ```
     */
    @checkIt(owl.num)
    static arctan(x: number): number {
        let v = Math.atan(x) * 180 / Math.PI
        return cal.blur(v)
    }



}





declare global {
    var log: typeof Host.log
    var Power: typeof Host.Power
    var Sqrt: typeof Host.Sqrt
    var Radian: typeof Host.Radian
    var Degree: typeof Host.Degree
    var sin: typeof Host.sin
    var cos: typeof Host.cos
    var tan: typeof Host.tan
    var arcsin: typeof Host.arcsin
    var arccos: typeof Host.arccos
    var arctan: typeof Host.arctan
}



