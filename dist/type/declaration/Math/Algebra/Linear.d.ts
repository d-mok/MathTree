/**
 * @category Linear
 * @return [x-int,y-int,slope] of ax+by+c=0
 * ```typescript
 * LinearFeature(2,4,6) // [-3,-1.5,-0.5]
 * LinearFeature(0,4,6) // throw
 * ```
 */
declare function LinearFeature(a: number, b: number, c: number): [xInt: number, yInt: number, slope: number];
/**
 * @category Linear
 * @return [slope,yInt] from ax+by+c=0
 * ```typescript
 * LineFromLinear(2,4,6) // [-0.5,-1.5]
 * LineFromLinear(0,4,6) // [0,-1.5]
 * ```
 */
declare function LineFromLinear(a: number, b: number, c: number): Line;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from given intercepts
 * ```typescript
 * LinearFromIntercepts(1,2) // [2,1,-2]
 * LinearFromIntercepts(0,2) // throw
 * ```
 */
declare function LinearFromIntercepts(xInt: number, yInt: number): Linear;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from two given points
 * ```typescript
 * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
 * LinearFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
declare function LinearFromTwoPoints(point1: Point, point2: Point): Linear;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from point and slope
 * ```typescript
 * LinearFromPointSlope([1,2],3) // [3,-1,-1]
 * LinearFromPointSlope([1,2],0) // [0,1,-2]
 * ```
 */
declare function LinearFromPointSlope(point: Point, slope: number): Linear;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from perpendicular bisector of AB
 * ```typescript
 * LinearFromBisector([1,2],[3,4]) // [1,1,-5]
 * LinearFromBisector([1,2],[1,4]) // [0,1,-3]
 * ```
 */
declare function LinearFromBisector(A: Point, B: Point): Linear;
/**
 * @category Linear
 * @return [slope,yInt] from given intercepts
 * ```typescript
 * LineFromIntercepts(1,2) // [-2,2]
 * LineFromIntercepts(0,2) // throw
 * ```
 */
declare function LineFromIntercepts(xInt: number, yInt: number): Line;
/**
 * @category Linear
 * @return [slope,yInt] from two given points
 * ```typescript
 * LineFromTwoPoints([1,2],[3,4]) // [1,1]
 * LineFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
declare function LineFromTwoPoints(point1: Point, point2: Point): Line;
/**
 * @category Linear
 * @return [slope,yInt] from point and slope
 * ```typescript
 * LineFromPointSlope([1,2],3) // [3,-1]
 * LineFromPointSlope([1,2],0) // [0,2]
 * ```
 */
declare function LineFromPointSlope(point: Point, slope: number): Line;
/**
 * @category Linear
 * @return [slope,yInt] from perpendicular bisector of AB
 * ```typescript
 * LineFromBisector([1,2],[3,4]) // [-1,5]
 * LineFromBisector([1,2],[1,4]) // [0,3]
 * ```
 */
declare function LineFromBisector(A: Point, B: Point): Line;
/**
 * @ignore
 */
declare class LinearEquation {
    private _linear;
    private _slope;
    private _xInt;
    private _yInt;
    byTwoPoints(p1: Point, p2: Point): this;
    byPointSlope(p: Point, m: number): this;
    byIntercepts(x: number, y: number): this;
    byBisector(A: Point, B: Point): this;
    byLinear(linear: Linear): this;
    private refresh;
    linear(): Linear;
    line(): Line;
}
