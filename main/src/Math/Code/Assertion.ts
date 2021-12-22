import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'


@exposeAll()
@captureAll()
export class Host {

    /**
     * check is a finite number.
     * ```
     * IsNum(1.23) // true
     * IsNum(NaN) // false
     * IsNum(Infinity) // false
     * IsNum('2') // false
     * ```
     */
    static IsNum(...items: any[]): boolean {
        return items.every(owl.num)
    }


    /**
     * check is an integer.
     * ```
     * IsInteger(5) // true
     * IsInteger(0.5) // false
     * ```
     */
    static IsInteger(...items: any[]): boolean {
        return items.every(owl.int)
    }



    /**
     * check is a decimal (non-integer).
     * ```
     * IsDecimal(0.5) // true
     * IsDecimal(5) // false
     * ```
     */
    static IsDecimal(...items: any[]): boolean {
        return items.every(owl.dec)
    }



    /**
     * check is a terminating decimal (or integer)
     * ```
     * IsTerminating(1/4) // true
     * IsTerminating(5) // false
     * ```
     */
    static IsTerminating(...items: any[]): boolean {
        return items.every(owl.terminating)
    }



    /**
     * check is a rational number with denominator <= 1000.
     * ```
     * IsRational(0.5) // true
     * IsRational(-5) // true
     * IsRational(Math.sqrt(2)) // false
     * ```
     */
    static IsRational(...items: any[]): boolean {
        return items.every(owl.rational)
    }







    /**
     * check is an odd integer.
     * ```
     * IsOdd(5) // true
     * IsOdd(-5) // true
     * IsOdd(4) // false
     * ```
     */
    static IsOdd(...items: any[]): boolean {
        return items.every(owl.odd)
    }




    /**
     * check is an even integer.
     * ```
     * IsEven(4) // true
     * IsEven(-4) // true
     * IsEven(0) // true
     * IsEven(5) // false
     * ```
     */
    static IsEven(...items: any[]): boolean {
        return items.every(owl.even)
    }



    /**
     * check is in range [0,1].
     * ```
     * IsProbability(0) // true
     * IsProbability(0.5467) // true
     * IsProbability(1.1) // false
     * IsProbability(-0.1) // false
     * ```
     */
    static IsProbability(...items: any[]): boolean {
        return items.every(owl.prob)
    }



    /**
     * check is a square number.
     * ```
     * IsSquareNum(9) // true
     * IsSquareNum(10) // false
     * IsSquareNum(-9) // false
     * ```
     */
    static IsSquareNum(...items: any[]): boolean {
        return items.every(owl.sq)
    }



    /**
     * check is positive.
     * ```
     * IsPositive(2) // true
     * IsPositive(0) // false
     * IsPositive(-2) // false
     * ```
     */
    static IsPositive(...items: any[]): boolean {
        return items.every(owl.positive)
    }



    /**
     * check is non-negative.
     * ```
     * IsNonNegative(2) // true
     * IsNonNegative(0) // true
     * IsNonNegative(-2) // false
     * IsNonNegative(1.5) // true
     * ```
     */
    static IsNonNegative(...items: any[]): boolean {
        return items.every(owl.nonNegative)
    }




    /**
     * check is a positive integer.
     * ```
     * IsPositiveInteger(2) // true
     * IsPositiveInteger(0) // false
     * IsPositiveInteger(-2) // false
     * IsPositiveInteger(1.5) // false
     * ```
     */
    static IsPositiveInteger(...items: any[]): boolean {
        return items.every(owl.positiveInt)
    }


    /**
     * check is a non-negative integer.
     * ```
     * IsNonNegativeInteger(2) // true
     * IsNonNegativeInteger(0) // true
     * IsNonNegativeInteger(-2) // false
     * IsNonNegativeInteger(1.5) // false
     * ```
     */
    static IsNonNegativeInteger(...items: any[]): boolean {
        return items.every(owl.nonNegativeInt)
    }





    /**
     * check is negative.
     * ```
     * IsNegative(-2) // true
     * IsNegative(0) // false
     * IsNegative(2) // false
     * ```
     */
    static IsNegative(...items: any[]): boolean {
        return items.every(owl.negative)
    }




    /**
     * check is non-zero finite number.
     * ```
     * IsNonZero(2) // true
     * IsNonZero(0) // false
     * IsNonZero(-2) // true
     * ```
     */
    static IsNonZero(...items: any[]): boolean {
        return items.every(owl.nonZero)
    }






    /**
     * check is between min and max inclusive.
     * ```
     * IsBetween(2,5)(3) // true
     * IsBetween(2,5)(2) // true
     * IsBetween(2,5)(1) // false
     * ```
     */
    @checkIt(owl.num)
    @inspectIt(function is_range(min, max) { return min < max })
    static IsBetween(min: number, max: number) {
        return (...items: any[]): boolean => items.every(owl.between(min, max))
    }



    /**
     * check if its abs is between min and max inclusive.
     * ```
     * IsAbsBetween(2,5)(-3) // true
     * IsAbsBetween(2,5)(-2) // true
     * IsAbsBetween(2,5)(1) // false
     * ```
     */
    @checkIt(owl.nonNegative)
    @inspectIt(function is_range(min, max) { return min < max })
    static IsAbsBetween(min: number, max: number) {
        return (...items: any[]): boolean => items.every(owl.absBetween(min, max))
    }





    /**
     * Check if the points are chessboard around anchor.
     * ```
     * IsAroundPoint([0,0],2)([2,2]) // true
     * IsAroundPoint([0,0],2)([3,0]) // false
     * ```
     */
    @checkIt(owl.point2D, owl.positive)
    static IsAroundPoint(anchor: Point2D, range: number) {
        return (...points: Point2D[]): boolean => points.every(
            p => ChessboardDistance(anchor, p) <= range
        )
    }



    /**
     * Check if the array of legnths can form a triangle
     * ```
     * IsTriangle([1,1,1]) // true
     * IsTriangle([6,7,8]) // true
     * IsTriangle([1,2,3]) // false
     * IsTriangle([6,14,8]) // false
     * ```
     */
    @checkIt(owl.triple)
    static IsTriangle(...triangles: [number, number, number][]): boolean {
        return triangles.every(owl.triangleSides)
    }


}







declare global {
    var IsNum: typeof Host.IsNum
    var IsInteger: typeof Host.IsInteger
    var IsDecimal: typeof Host.IsDecimal
    var IsTerminating: typeof Host.IsTerminating
    var IsRational: typeof Host.IsRational
    var IsOdd: typeof Host.IsOdd
    var IsEven: typeof Host.IsEven
    var IsProbability: typeof Host.IsProbability
    var IsSquareNum: typeof Host.IsSquareNum
    var IsPositive: typeof Host.IsPositive
    var IsNonNegative: typeof Host.IsNonNegative
    var IsPositiveInteger: typeof Host.IsPositiveInteger
    var IsNonNegativeInteger: typeof Host.IsNonNegativeInteger
    var IsNegative: typeof Host.IsNegative
    var IsNonZero: typeof Host.IsNonZero
    var IsBetween: typeof Host.IsBetween
    var IsAbsBetween: typeof Host.IsAbsBetween
    var IsAroundPoint: typeof Host.IsAroundPoint
    var IsTriangle: typeof Host.IsTriangle
}



