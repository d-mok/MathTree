declare module "index" {
    import './Core/index.ts';
    import './Math/index.ts';
    import './Pen/index.ts';
    import './Soil/index.ts';
}
declare module "Core/Dice/index" {
    type roll<T> = () => T;
    global {
        namespace Chance {
            interface Chance {
                prime: (opt: {
                    min: number;
                    max: number;
                }) => number;
            }
        }
    }
    type predicate<T> = (item: T) => boolean;
    type keyFunc<T> = (item: T) => number | string;
    export function integer(minInt: number, maxInt: number): number;
    export function real(min: number, max: number): number;
    export function prime(min: number, max: number): number;
    export function he(): string;
    export function she(): string;
    export function roll<T>(func: roll<T>): {
        brute(predicate: predicate<T>): T;
        shield(predicate: predicate<T>): roll<T>;
        sample(length: number): T[];
        unique(length: number, key?: keyFunc<T> | undefined): T[];
        distinct(length: number, comparer: (a: T, b: T) => boolean): T[];
    };
    export function array<T>(items: T[]): {
        one(): T;
        sample(length: number): T[];
        unique(length: number): T[];
        shuffle(): T[];
        balanced(length: number): T[];
    };
}
declare module "Core/Owl/index" {
    export const num: (_: any) => boolean;
    export const whole: (_: any) => boolean;
    export const int: (_: any) => boolean;
    export const dec: (_: any) => boolean;
    export const terminating: (_: any) => boolean;
    export const rational: (_: any) => boolean;
    export const irrational: (_: any) => boolean;
    export const odd: (_: any) => boolean;
    export const even: (_: any) => boolean;
    export const prob: (_: any) => boolean;
    export const sq: (_: any) => boolean;
    export const positive: (_: any) => boolean;
    export const positiveInt: (_: any) => boolean;
    export const nonNegative: (_: any) => boolean;
    export const nonNegativeInt: (_: any) => boolean;
    export const negative: (_: any) => boolean;
    export const negativeInt: (_: any) => boolean;
    export const nonPositive: (_: any) => boolean;
    export const nonPositiveInt: (_: any) => boolean;
    export const nonZero: (_: any) => boolean;
    export const nonZeroInt: (_: any) => boolean;
    export const between: (min: number, max: number) => (_: any) => boolean;
    export const absBetween: (min: number, max: number) => (_: any) => boolean;
    export const str: (_: any) => boolean;
    export const bool: (_: any) => boolean;
    export const emptyObject: (_: any) => boolean;
    export const array: (_: any) => boolean;
    export const arrayOfLength: (length: number) => (_: any) => boolean;
    export const arrayWith: (predicate: (_: any) => boolean) => (_: any) => any;
    export const couple: (_: any) => any;
    export const triple: (_: any) => any;
    export const combo: (_: any) => any;
    export const ntuple: (_: any) => any;
    export const interval: (_: any) => any;
    export const point: (_: any) => any;
    export const polar: (_: any) => any;
    export const fraction: (_: any) => any;
    export const properFraction: (_: any) => any;
    export const vector: (_: any) => any;
    export const triangleSides: (_: any) => any;
    export const polynomial: (_: any) => boolean;
    export const pass: (_: any) => boolean;
    export const fail: (_: any) => boolean;
    export const distinct: (_: any[]) => boolean;
    export const distinctBy: (keyFunc: (_: any) => any) => (..._: any[]) => boolean;
    export const alphabet: (_: any) => _ is Ineq;
    export const ineq: (_: any) => _ is Ineq;
    export const dfrac: (_: any) => any;
    export const constraint: (_: any) => boolean;
    export const quadrantCode: (_: any) => boolean;
    export const quadrantName: (_: any) => boolean;
    export const quadrant: (_: any) => boolean;
    export const trig: (_: any) => boolean;
    export const roman: (_: any) => boolean;
    export function and(pds: predicate[], name?: string): predicate;
    export function or(pds: predicate[], name?: string): predicate;
    export function every(pd: predicate, name?: string): predicate;
}
declare module "Core/Contract/index" {
    class Contract<F extends func> {
        private host;
        private Err;
        constructor(host: F);
        private validateArg;
        private validateArgGrp;
        private validateReturn;
        private validateCatch;
        sign(arg?: rule[], ret?: rule): F;
        seal({ arg, args, ret }: {
            arg?: rule[];
            args?: argRule<F>;
            ret?: rule;
        }): F;
    }
    export function contract<F extends func>(f: F): Contract<F>;
}
declare module "Core/Ant/index" {
    /**
     * use for blurring value in-place to avoid things like 0.300000000004
     */
    export function blur(num: number): number;
    /**
     * use for bluring value for checking things like integer and equality
     * 2-digit less accurate that blur
     */
    export function correct(num: number): number;
    export function round(num: number, sigfig?: number): {
        off: () => number;
        up: () => number;
        down: () => number;
    };
    export function fix(num: number, dp?: number): {
        off: () => number;
        up: () => number;
        down: () => number;
    };
    export function sigfig(num: number): number;
    export function dp(num: number): number;
    export function hcf(...integers: number[]): number;
    export function lcm(...integers: number[]): number;
    export function nCr(n: number, r: number): number;
    export function fac(n: number): number;
    export function nPr(n: number, r: number): number;
    export function sum(...nums: number[]): number;
    export function mean(...nums: number[]): number;
    export function mode(...nums: number[]): number[];
    export function median(...nums: number[]): number;
    export function sd(...nums: number[]): number;
    export function nearFrac(num: number, maxDenominator?: number): Fraction;
    export function fracable(num: number, maxDenominator?: number): boolean;
    export function ratio<T extends number[]>(...rationals: T): T;
    export function simpFrac(p: number, q: number): Fraction;
    export function e(num: number): number;
    export function mantissa(num: number): number;
    export function logCeil(num: number): number;
    export function logFloor(num: number): number;
}
declare module "Core/Ink/index" {
    export function printIneq(greater: boolean, equal: boolean): Ineq;
    export function parseIneq(text: Ineq): [greater: boolean, equal: boolean];
    export function printDfrac(numerator: number, denominator: number, upSign?: boolean): string;
    export function parseDfrac(dfrac: string): Fraction;
    export function printCombo(combo: [boolean, boolean, boolean]): "I, II and III" | "I and II only" | "I and III only" | "I only" | "II and III only" | "II only" | "III only" | "None of the above" | undefined;
}
declare module "Core/Blood/index" {
    class Blood extends Error {
        constructor(name: string, message: string);
    }
    type alias = Blood;
    type TypeOfBlood = typeof Blood;
    global {
        type Blood = alias;
        var Blood: TypeOfBlood;
    }
    export {};
}
declare module "Core/List/index" {
    export function Clone<T>(object: T): T;
    class ListCls<T> extends Array<T> {
        private key;
        constructor(arr: T[], keyFunc?: (_: T) => any);
        isDistinct(): boolean;
        distinctLength(): number;
        distinct(): T[];
        pairs(): [T, T][];
        pairsEvery(relation: (a: T, b: T) => boolean): boolean;
        pluck(index: keyof T): any[];
    }
    type alias<T> = ListCls<T>;
    global {
        type List<T> = alias<T>;
        var newList: <T>(arr: T[], keyFunc?: (_: T) => any) => ListCls<T>;
    }
    export {};
}
declare module "Core/index" {
    import * as DiceObj from "Core/Dice/index";
    import * as OwlObj from "Core/Owl/index";
    import * as ContractObj from "Core/Contract/index";
    import * as AntObj from "Core/Ant/index";
    import * as InkObj from "Core/Ink/index";
    import "Core/Blood/index";
    import "Core/List/index";
    global {
        var dice: typeof DiceObj;
        var owl: typeof OwlObj;
        var ant: typeof AntObj;
        var ink: typeof InkObj;
        var contract: typeof ContractObj.contract;
    }
}
declare module "Core/Ant/ant.test" { }
declare module "Core/Contract/contract.test" { }
/**
 * @ignore
 */
declare class PolyClass {
    poly: polynomial;
    constructor(poly: polynomial);
    vars(): string[];
    nTerm(): number;
    nVar(): number;
    coeff(position: number): number;
    power(position: number, variable: string): number;
    hasLikeTerms(): boolean;
    powerSum(position: number): number;
    degree(): number;
    shuffle(): polynomial;
    term(position: number): polynomial;
    split(): polynomial[];
    append(...polys: polynomial[]): polynomial;
    cloneShell(): polynomial;
    sort(desc: boolean): polynomial;
    func(): (values: {
        [_: string]: number;
    }) => number;
    print(): string;
}
declare function RndPolynomial(degree: number, vars?: string[], terms?: number, maxCoeff?: number): polynomial;
declare function PolyPrint(poly: polynomial): string;
declare function PolySort(poly: polynomial, desc?: boolean): polynomial;
declare function PolyFunction(poly: polynomial): (values: {
    [_: string]: number;
}) => number;
declare function PolySplit(poly: polynomial): polynomial[];
declare function PolyDegree(poly: polynomial): number;
declare module "Math/index" {
    import './Code/Assertion.ts';
    import './Code/Combinatorics.ts';
    import './Code/Flow.ts';
    import './Code/Function.ts';
    import './Code/Geometry.ts';
    import './Code/LinearProgram.ts';
    import './Code/Numeracy.ts';
    import './Code/PhyConst.ts';
    import './Code/Random.ts';
    import './Code/RandomShake.ts';
    import './Code/RandomUtil.ts';
    import './Code/Relation.ts';
    import './Code/Sequence.ts';
    import './Code/Stat.ts';
    import './Code/Text.ts';
    import './Code/Triangle.ts';
    import './Code/Trigonometry.ts';
    import './Code/Vector.ts';
    import './Algebra/Algebra.ts';
    import './Algebra/Circle.ts';
    import './Algebra/Quadratic.ts';
    import './Algebra/Linear.ts';
    import './Algebra/Polynomial';
    import './should.ts';
    import './chance.ts';
}
declare var SHOULD_LOG: boolean;
declare class CustomErrorCls extends Error {
    constructor(name: string, message: string);
}
declare function CustomError(name: string, message: string): CustomErrorCls;
declare function MathError(message: string): CustomErrorCls;
declare function Should(condition: boolean, msg?: string): void;
/**
 * ```
 * // quadratic form
 * [1,2,3] // x^2+2x+3
 * ```
 */
declare type Quadratic = [a: number, b: number, c: number];
declare type Point = [x: number, y: number];
declare type Vector = [x: number, y: number];
declare type interval = [min: number, max: number];
declare type Fraction = [numerator: number, denominator: number];
/**
 * ```
 * // used in linear programming
 * [1,2,"<=",3] // x+2y <= 3
 * ```
 */
declare type Constraint = [xCoeff: number, yCoeff: number, ineq: Ineq, constant: number];
/**
 * ```
 * // used in linear programming
 * [1,2,3] // x+2y+3
 * ```
 */
declare type Field = [xCoeff: number, yCoeff: number, constant: number];
declare type Highlight = {
    point: Point;
    color?: string;
    circle?: boolean;
    contour?: boolean;
    coordinates?: boolean;
    label?: boolean;
};
declare type Triangle = {
    sideA: number;
    sideB: number;
    sideC: number;
    angleA: number;
    angleB: number;
    angleC: number;
};
declare type PartialTriangle = {
    sideA: number | null;
    sideB: number | null;
    sideC: number | null;
    angleA: number | null;
    angleB: number | null;
    angleC: number | null;
};
declare type QuadrantName = "I" | "II" | "III" | "IV";
declare type QuadrantCode = 1 | 2 | 3 | 4;
declare type PolarPoint = [r: number, q: number];
declare type TrigFunc = 'sin' | 'cos' | 'tan';
declare type Ineq = '\\ge' | '\\gt' | '\\le' | '\\lt' | '>=' | '<=' | '>' | '<';
declare type polynomial = {
    coeff: number[];
    [_: string]: number[];
};
/**
 * @category Algebra
 * @return solve [x,y] from ax+by=c and px+qy=r.
 * ```
 * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * Crammer(1,1,3,2,2,6) // throw
 * ```
 */
declare function Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number];
/**
 * @category Algebra
 * @return the product of two input polynomials.
 * ```
 * // do (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
 * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
 * ```
 */
declare function xPolynomial(poly1: number[], poly2: number[]): number[];
/**
 * @category Algebra
 * @return the points along the parametric curve
 * ```
 * Trace(x => x ** 2, 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * Trace(t => [t,t**2], 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * ```
 */
declare function Trace(func: (t: number) => number | Point, tStart: number, tEnd: number, dots?: number): Point[];
/**
 * @category Circle
 * @return D,E,F of circle general form
 * ```
 * CircleGeneral([2,3],5) // [-4,-6,-12]
 * ```
 */
declare function CircleGeneral(centre: Point, radius: number): [D: number, E: number, F: number];
/**
 * @category Circle
 * @return centre and radius from general form
 * ```
 * CircleFromGeneral(-4,-6,-12) // [[2,3],5]
 * ```
 */
declare function CircleFromGeneral(D: number, E: number, F: number): [Point, number];
/**
 * @category Circle
 * @return all integral points on the circle
 * ```
 * IntegralOnCircle([0,0],5) // [[[5,0],[0,5],[-5,0],[0,-5]],[[4,3],[-3,4],[-4,-3],[3,-4]],[[3,4],[-4,3],[-3,-4],[4,-3]]]
 * ```
 */
declare function IntegralOnCircle(centre: Point, radius: number): Point[][];
/**
 * @category Linear
 * @return [x-int,y-int,slope] of ax+by+c=0
 * ```
 * LinearFeature(2,4,6) // [-3,-1.5,-0.5]
 * LinearFeature(0,4,6) // throw
 * ```
 */
declare function LinearFeature(a: number, b: number, c: number): [xInt: number, yInt: number, slope: number];
/**
 * @category Linear
 * @return [slope,yInt] from ax+by+c=0
 * ```
 * LineFromLinear(2,4,6) // [-0.5,-1.5]
 * LineFromLinear(0,4,6) // [0,-1.5]
 * ```
 */
declare function LineFromLinear(a: number, b: number, c: number): [slope: number, yInt: number];
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from given intercepts
 * ```
 * LinearFromIntercepts(1,2) // [2,1,-2]
 * LinearFromIntercepts(0,2) // throw
 * ```
 */
declare function LinearFromIntercepts(xInt: number, yInt: number): [a: number, b: number, c: number];
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from two given points
 * ```
 * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
 * LinearFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
declare function LinearFromTwoPoints(point1: Point, point2: Point): [a: number, b: number, c: number];
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from point and slope
 * ```
 * LinearFromPointSlope([1,2],3) // [3,-1,-1]
 * LinearFromPointSlope([1,2],0) // [0,1,-2]
 * ```
 */
declare function LinearFromPointSlope(point: Point, slope: number): [a: number, b: number, c: number];
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from perpendicular bisector of AB
 * ```
 * LinearFromBisector([1,2],[3,4]) // [1,1,-5]
 * LinearFromBisector([1,2],[1,4]) // [0,1,-3]
 * ```
 */
declare function LinearFromBisector(A: Point, B: Point): [a: number, b: number, c: number];
/**
 * @category Linear
 * @return [slope,yInt] from given intercepts
 * ```
 * LineFromIntercepts(1,2) // [-2,2]
 * LineFromIntercepts(0,2) // throw
 * ```
 */
declare function LineFromIntercepts(xInt: number, yInt: number): [slope: number, yInt: number];
/**
 * @category Linear
 * @return [slope,yInt] from two given points
 * ```
 * LineFromTwoPoints([1,2],[3,4]) // [1,1]
 * LineFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
declare function LineFromTwoPoints(point1: Point, point2: Point): [slope: number, yInt: number];
/**
 * @category Linear
 * @return [slope,yInt] from point and slope
 * ```
 * LineFromPointSlope([1,2],3) // [3,-1]
 * LineFromPointSlope([1,2],0) // [0,2]
 * ```
 */
declare function LineFromPointSlope(point: Point, slope: number): [slope: number, yInt: number];
/**
 * @category Linear
 * @return [slope,yInt] from perpendicular bisector of AB
 * ```
 * LineFromBisector([1,2],[3,4]) // [-1,5]
 * LineFromBisector([1,2],[1,4]) // [0,3]
 * ```
 */
declare function LineFromBisector(A: Point, B: Point): [slope: number, yInt: number];
/**
 * @ignore
 */
declare class LinearFunction {
    private _linear;
    byTwoPoints(p1: Point, p2: Point): this;
    byPointSlope(p: Point, m: number): this;
    byIntercepts(x: number, y: number): this;
    byBisector(A: Point, B: Point): this;
    byLinear(linear: [a: number, b: number, c: number]): this;
    private refresh;
    linear(): [a: number, b: number, c: number];
    line(): [slope: number, yInt: number];
}
/**
 * @ignore
 */
declare function LF(): LinearFunction;
/**
 * @category Quadratic
 * @return the discriminant b^2-4ac.
 * ```
 * Discriminant(2,3,4) // -23
 * ```
 */
declare function Discriminant(a: number, b: number, c: number): number;
/**
 * @category Quadratic
 * @return the roots [p,q] of ax^2+bx+c=0 where p<=q
 * ```
 * QuadraticRoot(1,2,-3) // [-3,1]
 * QuadraticRoot(1,2,3) // throw when no real root
 * ```
 */
declare function QuadraticRoot(a: number, b: number, c: number): [number, number];
/**
 * @category Quadratic
 * @return the vertex [h,k] of y=ax^2+bx+c.
 * ```
 * QuadraticVertex(1,2,3) // [-1,2]
 * ```
 */
declare function QuadraticVertex(a: number, b: number, c: number): Point;
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and roots p and q.
 * ```
 * QuadraticFromRoot(1,2,3) // [1,-5,6]
 * QuadraticFromRoot(-2,4,-3) // [-2,2,24]
 * ```
 */
declare function QuadraticFromRoot(a: number, p: number, q: number): Quadratic;
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and vertex (h,k).
 * ```
 * QuadraticFromVertex(1,2,3) // [1,-4,7]
 * QuadraticFromVertex(-2,4,-3) // [-2,16,-35]
 * ```
 */
declare function QuadraticFromVertex(a: number, h: number, k: number): Quadratic;
/**
 * @category Assertion
 * @return check is a finite number.
 * ```
 * IsNum(1.23) // true
 * IsNum(NaN) // false
 * IsNum(Infinity) // false
 * IsNum('2') // false
 * ```
 */
declare function IsNum(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an integer.
 * ```
 * IsInteger(5) // true
 * IsInteger(0.5) // false
 * ```
 */
declare function IsInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a decimal (non-integer).
 * ```
 * IsDecimal(0.5) // true
 * IsDecimal(5) // false
 * ```
 */
declare function IsDecimal(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a terminating decimal (or integer)
 * ```
 * IsTerminating(1/4) // true
 * IsTerminating(5) // false
 * ```
 */
declare function IsTerminating(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a rational number with denominator <= 1000.
 * ```
 * IsRational(0.5) // true
 * IsRational(-5) // true
 * IsRational(Math.sqrt(2)) // false
 * ```
 */
declare function IsRational(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an odd integer.
 * ```
 * IsOdd(5) // true
 * IsOdd(-5) // true
 * IsOdd(4) // false
 * ```
 */
declare function IsOdd(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an even integer.
 * ```
 * IsEven(4) // true
 * IsEven(-4) // true
 * IsEven(0) // true
 * IsEven(5) // false
 * ```
 */
declare function IsEven(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is in range [0,1].
 * ```
 * IsProbability(0) // true
 * IsProbability(0.5467) // true
 * IsProbability(1.1) // false
 * IsProbability(-0.1) // false
 * ```
 */
declare function IsProbability(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a square number.
 * ```
 * IsSquareNum(9) // true
 * IsSquareNum(10) // false
 * IsSquareNum(-9) // false
 * ```
 */
declare function IsSquareNum(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is positive.
 * ```
 * IsPositive(2) // true
 * IsPositive(0) // false
 * IsPositive(-2) // false
 * ```
 */
declare function IsPositive(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is non-negative.
 * ```
 * IsNonNegative(2) // true
 * IsNonNegative(0) // true
 * IsNonNegative(-2) // false
 * IsNonNegative(1.5) // true
 * ```
 */
declare function IsNonNegative(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a positive integer.
 * ```
 * IsPositiveInteger(2) // true
 * IsPositiveInteger(0) // false
 * IsPositiveInteger(-2) // false
 * IsPositiveInteger(1.5) // false
 * ```
 */
declare function IsPositiveInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a non-negative integer.
 * ```
 * IsNonNegativeInteger(2) // true
 * IsNonNegativeInteger(0) // true
 * IsNonNegativeInteger(-2) // false
 * IsNonNegativeInteger(1.5) // false
 * ```
 */
declare function IsNonNegativeInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is negative.
 * ```
 * IsNegative(-2) // true
 * IsNegative(0) // false
 * IsNegative(2) // false
 * ```
 */
declare function IsNegative(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is non-zero finite number.
 * ```
 * IsNonZero(2) // true
 * IsNonZero(0) // false
 * IsNonZero(-2) // true
 * ```
 */
declare function IsNonZero(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is between min and max inclusive.
 * ```
 * IsBetween(2,5)(3) // true
 * IsBetween(2,5)(2) // true
 * IsBetween(2,5)(1) // false
 * ```
 */
declare function IsBetween(min: number, max: number): (...items: any[]) => boolean;
/**
 * @category Assertion
 * @return check if its abs is between min and max inclusive.
 * ```
 * IsAbsBetween(2,5)(-3) // true
 * IsAbsBetween(2,5)(-2) // true
 * IsAbsBetween(2,5)(1) // false
 * ```
 */
declare function IsAbsBetween(min: number, max: number): (...items: any[]) => boolean;
/**
 * @category Assertion
 * @return Check if the points are chessboard around anchor.
 * ```
 * IsAroundPoint([0,0],2)([2,2]) // true
 * IsAroundPoint([0,0],2)([3,0]) // false
 * ```
 */
declare function IsAroundPoint(anchor: Point, range: number): (...points: Point[]) => boolean;
/**
 * @category Assertion
 * @return Check if the array of legnths can form a triangle
 * ```
 * IsTriangle([1,1,1]) // true
 * IsTriangle([6,7,8]) // true
 * IsTriangle([1,2,3]) // false
 * IsTriangle([6,14,8]) // false
 * ```
 */
declare function IsTriangle(...triangles: [number, number, number][]): boolean;
/**
 * @category Combinatorics
 * @return the factorial n!
 * ```
 * Factorial(5) // 120
 * Factorial(1.5) // throw
 * ```
 */
declare function Factorial(n: number): number;
/**
 * @category Combinatorics
 * @return nCr
 * ```
 * nCr(5,3) // 10
 * ```
 */
declare function nCr(n: number, r: number): number;
/**
 * @category Combinatorics
 * @return nPr
 * ```
 * nPr(5,3) // 60
 * ```
 */
declare function nPr(n: number, r: number): number;
/**
* @category Flow
* @deprecated
* @return a random config of a Combo Options question type.
* ```typescript
* RndComboConfig()
* // may return {
* //   truth: [true, true, false],
* //   choices: ["I and II", "I only", "I and III", "I, II and III"],
* //   sections: [[1,1], [2,1], [3,0]]
* //  }
* // truth: the true value of the 3 options.
* // choices: for filling in the 4 answer choices, the 1st is correct.
* // sections: the sections object for section versioning, version 0 is false, version 1 is true.
* ```
*/
declare function RndComboConfig(): {
    truth: boolean[];
    choices: string[];
    sections: [number, number][];
};
/**
 * @category Function
 * @return log(b,N)
 * ```
 * log(2,8) // 3
 * ```
 */
declare function log(b: number, N: number): number;
/**
 * @deprecated
 * @ignore
 * @category Function
 * @return a**b, a to the power of b.
 * ```
 * Power(2,3) // 8
 * ```
 */
declare function Power(a: number, b: number): number;
/**
 * @category Function
 * @return square root of x
 * ```
 * Sqrt(4) // 2
 * ```
 */
declare function Sqrt(x: number): number;
/**
 * @category Function
 * @deprecated
 * @return the radian of the degree
 * ```
 * Radian(180) // pi
 * Radian(90) // pi/2
 * Radian(30) // PI/6
 * ```
 */
declare function Radian(degree: number): number;
/**
 * @category Function
 * @deprecated
 * @return the degree of the radian
 * ```
 * Degree(Math.PI) // 180
 * Degree(Math.PI/2) // 90
 * Degree(Math.PI/6) // 30
 * ```
 */
declare function Degree(radian: number): number;
/**
 * @category Function
 * @return sin(x).
 * ```
 * sin(30) // 0.5
 * ```
 */
declare function sin(x: number): number;
/**
 * @category Function
 * @return cos(x).
 * ```
 * cos(60) // 0.5
 * ```
 */
declare function cos(x: number): number;
/**
 * @category Function
 * @return tan(x).
 * ```
 * tan(45) // 1
 * ```
 */
declare function tan(x: number): number;
/**
 * @category Function
 * @return arcsin(x) between -90 and 90.
 * ```
 * arcsin(0.5) // 30
 * ```
 */
declare function arcsin(x: number): number;
/**
 * @category Function
 * @return arccos(x) between 0 and 180.
 * ```
 * arccos(0.5) // 60
 * ```
 */
declare function arccos(x: number): number;
/**
 * @category Function
 * @return arctan(x) between -90 and 90.
 * ```
 * arctan(1) // 45
 * ```
 */
declare function arctan(x: number): number;
/**
 * @category Geometry
 * @return the slope of AB
 * ```
 * Slope([0,0],[1,2]) // 2
 * Slope([1,2],[1,2]) // NaN
 * ```
 */
declare function Slope(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the distance AB
 * ```
 * Distance([0,0],[1,2]) // 2.23606797749979
 * ```
 */
declare function Distance(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the chessboard distance AB, max(horizontal,vertical)
 * ```
 * ChessboardDistance([0,0],[1,2]) // 2
 * ChessboardDistance([0,0],[3,2]) // 3
 * ```
 */
declare function ChessboardDistance(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the mid-pt of AB
 * ```
 * MidPoint([1,2],[3,4]) // [2,3]
 * ```
 */
declare function MidPoint(A: Point, B: Point): Point;
/**
 * @category Geometry
 * @return the point P on AB such that AP : PB = ratio : 1-ratio
 * ```
 * DivisionPoint([1,0],[5,0],0.75) // [4,0]
 * ```
 */
declare function DivisionPoint(A: Point, B: Point, ratio?: number): Point;
/**
 * @category Geometry
 * @return point P rotated anticlockwise by angle q about point O.
 * ```
 * RotatePoint([1,2],[0,0],90) // [-2,1]
 * ```
 */
declare function RotatePoint(P: Point, O: Point, q: number): Point;
/**
 * @category Geometry
 * @return the polar angle of B if A is the origin within [0,360].
 * ```
 * Inclination([1,0],[3,2]) // 45
 * Inclination([3,2],[1,0]) // 225
 * ```
 */
declare function Inclination(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the polar angle of a normal direction to AB, on the right of AB.
 * ```
 * Normal([1,0],[3,2]) // 315
 * Normal([3,2],[1,0]) // 135
 * ```
 */
declare function Normal(A: Point, B: Point): number;
/**
 * @category Geometry
 * @return the foot of perpendicular from P to AB.
 * ```
 * PerpendicularFoot([-1,-1],[1,1],[-2,2]) // [0,0]
 * ```
 */
declare function PerpendicularFoot(A: Point, B: Point, P: Point): Point;
/**
 * @category Geometry
 * @return the intersection point of AB and CD.
 * ```
 * Intersection([0,0],[2,2],[2,0],[0,2]) // [1,1]
 * ```
 */
declare function Intersection(A: Point, B: Point, C: Point, D: Point): Point;
/**
 * @category Geometry
 * @return Translate point P in the polar angle q (or the direction of point q) by a distance.
 * ```
 * TranslatePoint([1,2],90,3) // [1,5]
 * TranslatePoint([1,2],[10, 12],3) // [3.006894195, 4.229882439]
 * ```
 */
declare function TranslatePoint(P: Point, q: number | Point, distance: number): Point;
/**
 * @category Geometry
 * @return angle of intersection between two slopes
 * ```
 * IntersectAngle(0,1) // 45
 * IntersectAngle(1,-1) // 90
 * ```
 */
declare function IntersectAngle(slope1: number, slope2: number): number;
/**
 * @category Geometry
 * @return angle AOB, non-reflex
 * ```
 * Angle([1,0],[0,0],[0,2]) // 90
 * Angle([2,2],[1,1],[1,3]) // 45
 * Angle([1,3],[1,1],[2,2]) // 45
 * ```
 */
declare function Angle(A: Point, O: Point, B: Point): number;
/**
 * @category Geometry
 * @return angle AOB, measured anticlockwise
 * ```typescript
 * AnglePolar([1,0],[0,0],[0,2]) // 90
 * AnglePolar([2,2],[1,1],[1,3]) // 45
 * AnglePolar([1,3],[1,1],[2,2]) // 315
 * ```
 */
declare function AnglePolar(A: Point, O: Point, B: Point): number;
/**
 * @category Geometry
 * @return check if the polar angle AOB is reflex
 * ```typescript
 * IsReflex([1,0],[0,0],[0,2]) // false
 * IsReflex([2,2],[1,1],[1,3]) // false
 * IsReflex([1,3],[1,1],[2,2]) // true
 * ```
 */
declare function IsReflex(A: Point, O: Point, B: Point): boolean;
declare const LP_BOUND = 100;
declare function onBoundary(p: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return the value of field at given point
 * ```typescript
 * FieldAt([0,0],[1,2,3]) // 3
 * FieldAt([1,2],[3,-4,5]) // 0
 * ```
 */
declare function FieldAt(p: Point, field: Field): number;
/**
 *
 * @category LinearProgram
 * @return check if point is constrained by cons
 * ```typescript
 * isConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] satisfies all the constraints
 * ```
 */
declare function isConstrained(cons: Constraint[], point: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return check if point is constrained by cons, treating all cons as 'or equal to'
 * ```typescript
 * isLooseConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] loosely satisfies all the constraints
 * ```
 */
declare function isLooseConstrained(cons: Constraint[], point: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
declare function FeasiblePolygon(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
declare function FeasibleVertices(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return check if the feasible region is bounded
 * ```typescript
 * FeasibleIsBounded([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // true
 * FeasibleIsBounded([
 *    [1, 0, '<', 10],
 * ])
 * // false
 * ```
 */
declare function FeasibleIsBounded(...cons: Constraint[]): boolean;
/**
 *
 * @category LinearProgram
 * @return the integral points inside the feasible polygon
 * ```typescript
 * FeasibleIntegral([
 *    [1, 0, '<', 3],
 *    [1, 0, '>', 0],
 *    [0, 1, '<', 2],
 *    [0, 1, '>', 0]
 * ])
 * // [[1,1],[2,1]]
 * ```
 */
declare function FeasibleIntegral(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return the point with the max value of field
 * ```typescript
 * MaximizePoint([[0,0],[10,10]],[1,2,3]) // [10,10]
 * ```
 */
declare function MaximizePoint(points: Point[], field: Field): Point;
/**
 *
 * @category LinearProgram
 * @return the point with the min value of field
 * ```typescript
 * MinimizePoint([[0,0],[10,10]],[1,2,3]) // [0,0]
 * ```
 */
declare function MinimizePoint(points: Point[], field: Field): Point;
/**
 *
 * @category LinearProgram
 * @return the point with the min/max value of field
 * ```typescript
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [10,10]
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [0,0]
 * ```
 */
declare function OptimizePoint(points: Point[], field: Field, max: boolean): Point;
/**
 *
 * @category LinearProgram
 * @return the min/max value of field
 * ```typescript
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 33
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 3
 * ```
 */
declare function OptimizeField(points: Point[], field: Field, max: boolean): number;
/**
 * @category Numeracy
 * @return division with x/0 handling
 * ```
 * Divide(6,2) // 3
 * Divide(6,0) // throw
 * ```
 */
declare function Divide(dividend: number, divisor: number): number;
/**
 * @category Numeracy
 * @return the absolute value. Equivalent to Math.abs(x).
 * ```
 * Abs(-2) // 2
 * ```
 */
declare function Abs(num: number): number;
/**
 * @category Numeracy
 * @return the sign of the number as 1,0 or -1.
 * ```
 * Sign(3) // 1
 * Sign(-4.5) // -1
 * Sign(0) // 0
 * ```
 */
declare function Sign(num: number): -1 | 0 | 1;
/**
 * @deprecated
 * @category Numeracy
 * @return the sign of the number as 1,0 or -1.
 * ```
 * SigFig(123.45) // 5
 * ```
 */
declare function SigFig(num: number): number;
/**
 * @category Numeracy
 * @return the number rounded off to given sigfig.
 * ```
 * Round(1.23456,3) // 1.23
 * Round(1.23567,3) // 1.24
 * ```
 */
declare function Round(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded up to given sigfig.
 * ```
 * RoundUp(1.23456,3) // 1.23
 * RoundUp(1.23567,1) // 2
 * ```
 */
declare function RoundUp(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded down to given sigfig.
 * ```
 * RoundDown(1.23456,5) // 1.2345
 * RoundDown(1.6789,1) // 1
 * ```
 */
declare function RoundDown(num: number, sigfig?: number): number;
/**
 * @category Numeracy
 * @return the number rounded off to given decimal place.
 * ```
 * Fix(12345.678,0) // round to integer, return 12346
 * Fix(12345.678,2) // round to 2 dp, return 12345.68
 * Fix(12345.678,-2) // round to hundred, return 12300
 * ```
 */
declare function Fix(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the number rounded up to given decimal place.
 * ```
 * FixUp(12.34,0) // round to integer, return 13
 * FixUp(12.34,1) // round to 1 dp, return 12.4
 * FixUp(12.34,-1) // round to ten, return 20
 * ```
 */
declare function FixUp(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the number rounded down to given decimal place.
 * ```
 * FixDown(17.89,0) // round to integer, return 17
 * FixDown(17.89,1) // round to 1 dp, return 17.8
 * FixDown(17.89,-1) // round to ten, return 10
 * ```
 */
declare function FixDown(num: number, dp?: number): number;
/**
 * @category Numeracy
 * @return the ceiling integer of the number.
 * ```
 * Ceil(1.1) // 2
 * Ceil(-1.1) // -1
 * Ceil(2)) // 2
 * ```
 */
declare function Ceil(num: number): number;
/**
 * @category Numeracy
 * @return the floor integer of the number.
 * ```
 * Floor(1.9) // 1
 * Floor(-1.9) // -2
 * Floor(2)) // 2
 * ```
 */
declare function Floor(num: number): number;
/**
 * @category Numeracy
 * @return reduce input array to simplest ratio.
 * ```
 * SimpRatio(2,4,6) // [1,2,3]
 * SimpRatio(0,4,6) // [0,2,3]
 * SimpRatio(0,4) // [0,1]
 * ```
 */
declare function SimpRatio(...nums: number[]): number[];
/**
 * @category Numeracy
 * @return reduce input array to integral ratio.
 * ```
 * IntegerRatio(2,4,6) // [1,2,3]
 * IntegerRatio(0,4,6) // [0,2,3]
 * IntegerRatio(0,4) // [0,1]
 * IntegerRatio(1/3,1/2,1/4) // [4,6,3]
 * IntegerRatio(Math.sqrt(2),1/2,1/4) // throw
 * ```
 */
declare function IntegerRatio(...nums: number[]): number[];
/**
 * @category Numeracy
 * @return The HCF of nums.
 * ```
 * HCF(6,8) // 2
 * HCF(6,8,9) // 1
 * HCF(1,3) // 1
 * HCF(0.5,3) // throw
 * HCF(0,3) // throw
 * ```
 */
declare function HCF(...nums: number[]): number;
/**
 * @category Numeracy
 * @return The LCM of nums.
 * ```
 * LCM(2,3) // 6
 * LCM(2,3,5) // 30
 * LCM(0.5,3) // throw
 * LCM(0,3) // throw
 * ```
 */
declare function LCM(...nums: number[]): number;
/**
 * @category Numeracy
 * @deprecated
 * @return convert num to fraction
 * ```
 * ToFrac(0.5) // [1,2]
 * ToFrac(-456/123) // [-152,41]
 * ```
 */
declare function ToFrac(num: number, maxDenominator?: number): Fraction;
declare var PhyConst: {
    R: number;
    N_A: number;
    g: number;
    G: number;
    c: number;
    e: number;
    m_e: number;
    epsilon_0: number;
    mu_0: number;
    m_u: number;
    au: number;
    light_year: number;
    parsec: number;
    sigma: number;
    h: number;
};
/**
 * @category Random
 * @return a random integer in [min, max] inclusive.
 * ```
 * RndN(2,5) // may return 2, 3, 4 or 5
 * ```
 */
declare function RndN(min: number, max: number): number;
/**
 * @category Random
 * @return an array of n unique random integer in [min, max] inclusive.
 * ```
 * RndNs(2,8,3) // may return [5,3,7]
 * ```
 */
declare function RndNs(min: number, max: number, n?: number): number[];
/**
 * @category Random
 * @return a random real number in [min, max] inclusive
 * ```
 * RndR(1,2) // may return 1.242574363
 * ```
 */
declare function RndR(min: number, max: number): number;
/**
 * @category Random
 * @return a random fraction in [min, max] inclusive, with largest numerator / denominator.
 * ```
 * RndQ(1,2,9) // may return 5/3
 * ```
 */
declare function RndQ(min: number, max: number, largest?: number): number;
/**
 * @category Random
 * @return 1 or -1
 * ```
 * RndU() // may return 1 or -1
 * ```
 */
declare function RndU(): 1 | -1;
/**
 * @category Random
 * @return true or false.
 * ```
 * RndT() // may return true or false
 * ```
 */
declare function RndT(): boolean;
/**
 * @category Random
 * @return a random integer in [min, max] or [-max, -min] inclusive.
 * ```
 * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
 * ```
 */
declare function RndZ(min: number, max: number): number;
/**
 * @category Random
 * @param n - default to 10
 * @return an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive.
 * ```
 * RndZs(2,8,3) // may return [5,-3,7]
 * ```
 */
declare function RndZs(min: number, max: number, n?: number): number[];
/**
 * @category Random
 * @return a random prime number less than or equal to max.
 * ```
 * RndP(10) // may return 2, 3, 5 or 7
 * ```
 */
declare function RndP(max: number): number;
/**
 * @category Random
 * @return a random odd integer in [min, max] inclusive
 * ```
 * RndOdd(3,8) // return 3, 5 or 7
 * ```
 */
declare function RndOdd(min: number, max: number): number;
/**
 * @category Random
 * @return a random even integer in [min, max] inclusive
 * ```
 * RndEven(3,8) // return 4, 6 or 8
 * ```
 */
declare function RndEven(min: number, max: number): number;
/**
 * @category Random
 * @return an array of random polynomial coefficients
 * ```
 * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)]
 * ```
 */
declare function RndPoly(...coeff: number[]): number[];
/**
 * @category Random
 * @return an array of a Pyth Triple
 * ```
 * RndPyth(10) // may return [3,4,5]
 * ```
 */
declare function RndPyth(max?: number): [number, number, number];
/**
 * @category Random
 * @return a linear [a,b,c] in ax+by+c=0
 * ```
 * RndLinearFromIntercept(1,5) // may return [2,-3,6]
 * ```
 */
declare function RndLinearFromInt(minAbsIntercept: number, maxAbsIntercept: number): [a: number, b: number, c: number];
/**
 * @category Random
 * @return a point within given range
 * ```
 * RndPoint([1,4],[10,14]) // may return [2,12]
 * // equivalent to [RndN(...xRange),Range(...yRange)]
 * RndPoint(2,4) // equivalent to RndPoint([-2,2],[-4,4])
 * ```
 */
declare function RndPoint(xRange: number | interval, yRange?: number | interval): Point;
/**
 * @category Random
 * @return n angles in [0,360] at least cyclic separated by separation
 * ```
 * RndAngles(3,50) // may return [30,90,200]
 * ```
 */
declare function RndAngles(n: number, separation: number): number[];
/**
 * @category Random
 * @return n vertices of a convex polygon generated by rounding a cyclic polygon
 * ```
 * RndConvexPolygon(3,[0,0],10,50) // may return [[10,0],[-6,8],[0,-10]]
 * ```
 */
declare function RndConvexPolygon(n: number, center: Point, radius: number, separation: number): Point[];
/**
 * @category Random
 * @return n integers from [min, max]
 * ```
 * RndData(10,15,5) // may return [11,11,12,13,15]
 * ```
 */
declare function RndData(min: number, max: number, n: number): number[];
/**
 * @category RandomShake
 * @deprecated
 * @return an array of n nearby values around anchor, within range inclusive, auto detecting the input type.
 * ```
 * RndShake(10)
 * // equivalent to RndShakeN(10)
 * RndShake(10.5)
 * // equivalent to RndShakeR(10.5)
 * ```
 */
declare function RndShake(anchor: any): (typeof anchor)[];
/**
 * @category RandomShake
 * @return 3 nearby same-signed integers, range = Max(5, anchor * 10%)
 * ```
 * RndShakeN(5) // return 3 unique integers from 1-10
 * ```
 */
declare function RndShakeN(anchor: number): [number, number, number];
/**
 * @category RandomShake
 * @return 3 nearby same-signed real number with same precision, range = anchor * 50%
 * ```
 * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
 * ```
 */
declare function RndShakeR(anchor: number): number[];
/**
 * @category RandomShake
 * @return 3 nearby same-sign rational by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeQ(5/6)
 * // return 3 unique fractions around [5,6]
 * RndShakeQ(6/-5)
 * // return 3 unique fractions around [6,-5]
 * ```
 */
declare function RndShakeQ(anchor: number): number[];
/**
 * @category RandomShake
 * @deprecated
 * @return 3 nearby same-sign fraction by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeFrac([5,6])
 * // return 3 unique fractions around [5,6]
 * RndShakeFrac([6,-5])
 * // return 3 unique fractions around [6,-5]
 * ```
 */
declare function RndShakeFrac(anchor: Fraction): Fraction[];
/**
 * @category RandomShake
 * @deprecated
 * @return 3 nearby same-signed Dfrac by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeDfrac('\\dfrac{5}{6}')
 * // return 3 unique Dfrac around [5,6]
 * RndShakeDfrac('-\\dfrac{6}{5}')
 * // return 3 unique Dfrac around [6,-5]
 * ```
 */
declare function RndShakeDfrac(anchor: string): string[];
/**
 * @category RandomShake
 * @return an array of 3 ineq signs, balanced in number.
 * ```
 * RndShakeIneq('\\ge')
 * // may return ['\\ge','\\le','\\le']
 * ```
 */
declare function RndShakeIneq(anchor: Ineq): string[];
/**
 * @category RandomShake
 * @return an array of 3 point
 * ```
 * RndShakePoint([3,4])
 * // may return [[2,5],[1,6],[4,2]]
 * ```
 */
declare function RndShakePoint(anchor: Point): Point[];
/**
 * @category RandomShake
 * @return an array of 3 combo
 * ```
 * RndShakeCombo([true,true,true])
 * // may return [[true,false,true],[false,true,false],[false,true,true]]
 * ```
 */
declare function RndShakeCombo(anchor: [boolean, boolean, boolean]): [boolean, boolean, boolean][];
/**
 * @category RandomShake
 * @return an array of 3 trig
 * ```
 * RndShakeTrig('sin')
 * // may return ['cos','sin','cos']
 * ```
 */
declare function RndShakeTrig(anchor: string): string[];
/**
 * @category RandomUtil
 * @return a random item from the given items
 * ```
 * RndPick(2,4,6) // may return 2, 4 or 6
 * ```
 */
declare function RndPick<T>(...items: T[]): T;
/**
 * @category RandomUtil
 * @return a shuffled array of the given items
 * ```
 * RndShuffle(2,4,6) // may return [4,2,6]
 * ```
 */
declare function RndShuffle<T>(...items: T[]): T[];
/**
 * @category RandomUtil
 * @return n random items from given items, not necessarily unique
 * ```
 * RndPickN([2,4,6],2) // may return [4,2]
 * ```
 */
declare function RndPickN<T>(items: T[], n: number): T[];
/**
 * @category RandomUtil
 * @return n random unique items from given items
 * ```
 * RndPickUnique([2,4,6],2) // may return [4,2]
 * RndPickUnique([1,2,2,2,2,2,2,2],2) // must return [1,2] or [2,1]
 * ```
 */
declare function RndPickUnique<T>(items: T[], n: number): T[];
/**
 * @category RandomUtil
 * @return a random male name
 * ```
 * RndHe() // may return 'Peter', 'David', etc
 * ```
 */
declare function RndHe(): string;
/**
 * @category RandomUtil
 * @return a random female name
 * ```
 * RndShe() // may return 'Mary', 'Alice', etc
 * ```
 */
declare function RndShe(): string;
/**
 * @category RandomUtil
 * @return a random 3-letters array
 * ```
 * RndLetters() // may return ['a','b','c'] or ['x','y','z'] or etc
 * ```
 */
declare function RndLetters(): string[];
/**
 * @category Relation
 * @return Check if the numbers are all distinct.
 * ```
 * AreDistinct(1,2,3) // true
 * AreDistinct(1,2,2) // false
 * ```
 */
declare function AreDistinct(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the absolute values of the numbers are all distinct.
 * ```
 * AreAbsDistinct(1,2,3) // true
 * AreAbsDistinct(1,2,2) // false
 * AreAbsDistinct(1,2,-2) // false
 * ```
 */
declare function AreAbsDistinct(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the numbers all have the same sign.
 * ```
 * AreSameSign(1,2,3) // true
 * AreSameSign(1,2,-3) // false
 * AreSameSign(1,2,0) // false
 * ```
 */
declare function AreSameSign(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the numbers all pairwise coprime.
 * ```
 * AreCoprime(2,3) // true
 * AreCoprime(2,6) // false
 * AreCoprime(1,2) // true
 * AreCoprime(2,3,6) // true
 * AreCoprime(1.5,3) // true
 * AreCoprime(0,3) // true
 * ```
 */
declare function AreCoprime(...nums: number[]): boolean;
/**
 * @category Relation
 * @return Check if the points are all distinct.
 * ```
 * AreDistinctPoint([1,2],[3,4]) // true
 * AreDistinctPoint([1,2],[1,2]) // false
 * ```
 */
declare function AreDistinctPoint(...points: Point[]): boolean;
/**
 * @category Relation
 * @return Check if the points are pairwise distant apart.
 * ```
 * AreDistantPoint(2)([0,0],[3,0]) // true
 * AreDistantPoint(2)([0,0],[1,0]) // false
 * ```
 */
declare function AreDistantPoint(distance: number): (...points: Point[]) => boolean;
/**
 * @category Relation
 * @return Check if slopes are at least oblique at minAngle
 * ```
 * AreOblique(40)(0,1) // true
 * AreOblique(40)(0,0.5) // false
 * ```
 */
declare function AreOblique(minAngle: number): (...slopes: number[]) => boolean;
/**
* @category Sequence
* @return an array of integers from start to end inclusive.
* ```
* ListIntegers(2,6) // [2,3,4,5,6]
* ListIntegers(-2,1) // [-2,-1,0,1]
* ```
*/
declare function ListIntegers(start: number, end: number): number[];
/**
* @category Sequence
* @return Tn in an arithmetic sequence: a+(n-1)d
* ```
* ASterm(2,3,10) // 29
* ASterm(5,-2,6) // -5
* ```
*/
declare function ASterm(a: number, d: number, n: number): number;
/**
* @category Sequence
* @return Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
* ```
* ASsum(2,3,10) // 155
* ASsum(5,-2,6) // 0
* ```
*/
declare function ASsum(a: number, d: number, n: number): number;
/**
* @category Sequence
* @return an array of the first n terms in an arithmetic sequence.
* ```
* ASequence(2,3,5) // [2,5,8,11,14]
* ASequence(5,-2,3) // [5,3,1]
* ```
*/
declare function ASequence(a: number, d: number, n?: number): number[];
/**
* @category Sequence
* @return Tn in a geometric sequence: ar**(n-1)
* ```
* GSterm(2,3,4) // 54
* GSterm(5,-2,6) // -160
* ```
*/
declare function GSterm(a: number, r: number, n: number): number;
/**
* @category Sequence
* @return Sn in a geometric sequence: a*(r*n-1)/(r-1)
* ```
* GSsum(2,3,4) // 80
* GSsum(5,-2,3) // 15
* GSsum(3,0.5) // 6 , sum to inf if omit n
* ```
*/
declare function GSsum(a: number, r: number, n?: number): number;
/**
* @category Sequence
* @return an array of the first n terms in a geometric sequence.
* ```
* GSequence(2,3,5) // return [2,6,18,54,162]
* GSequence(5,-2,3) // return [5,-10,20]
* ```
*/
declare function GSequence(a: number, r: number, n?: number): number[];
/**
* @category Sequence
* @return the nth term in a quadratic sequence, 1st term = a, P_i+1=P_i + pi+q
* ```
* QuadraticSequence(1,2,3,4) //
* ```
*/
declare function QuadraticSequence(a: number, p: number, q: number, n: number): number;
/**
* @category Sequence
* @return the nth term in a lucas sequence, a_i = p*a_{i-1} + q*a_{i-2}
* ```
* LucasSequence(1,2,3,4,5) //
* ```
*/
declare function LucasSequence(first: number, second: number, p: number, q: number, n: number): number;
/**
 * @category Stat
 * @return the minimum value. Equivalent to Math.min().
 * ```
 * Min(2,3,4) // 2
 * ```
 */
declare function Min(...nums: number[]): number;
/**
 * @category Stat
 * @return the maximum value. Equivalent to Math.max().
 * ```
 * Max(2,3,4) // 4
 * ```
 */
declare function Max(...nums: number[]): number;
/**
 * @category Stat
 * @return the sorted array of numbers.
 * ```
 * Sort(2,3,1) // [1,2,3]
 * ```
 */
declare function Sort(...nums: number[]): number[];
/**
 * @category Stat
 * @return the sorted array of items by giving each item a value.
 * ```
 * SortBy([2,3,1],x=>x) // [1,2,3]
 * SortBy(["aa", "aaa", "a"], x => x.length) // ["a", "aa", "aaa"]
 * ```
 */
declare function SortBy<T>(items: T[], valueFunc: (_: T) => number): T[];
/**
 * @category Stat
 * @return sum of nums
 * ```
 * Sum(1,2,3) // 6
 * Sum(-1,2,3,4,5) // 13
 * ```
 */
declare function Sum(...nums: number[]): number;
/**
 * @category Stat
 * @return mean of nums
 * ```
 * Mean(1,2,3) // 2
 * Mean(-1,2,3,4,5) // 2.6
 * ```
 */
declare function Mean(...nums: number[]): number;
/**
 * @category Stat
 * @return median of nums
 * ```
 * Median(1,2,3,4,50) // 3
 * Median(1,2,3,4,5,7) // 3.5
 * ```
 */
declare function Median(...nums: number[]): number;
/**
 * @category Stat
 * @return lower quartile of nums
 * ```
 * LowerQ(1,2,3,4,5) // 1.5
 * LowerQ(1,2,3,4,5,7) // 2
 * ```
 */
declare function LowerQ(...nums: number[]): number;
/**
 * @category Stat
 * @return lower quartile of nums
 * ```
 * UpperQ(1,2,3,4,5) // 4.5
 * UpperQ(1,2,3,4,5,7) // 5
 * ```
 */
declare function UpperQ(...nums: number[]): number;
/**
 * @category Stat
 * @return count frequency of item in array
 * ```
 * Frequency(1)(2,3,4,1,5,1,1,4,5) // 3
 * ```
 */
declare function Frequency<T>(item: T): (...items: T[]) => number;
/**
 * @category Stat
 * @return mode of nums
 * ```
 * Mode(1,2,3,2,2,3,4) \\ [2]
 * Mode(1,1,2,2,3) \\ []
 * ```
 */
declare function Mode(...nums: number[]): number[];
/**
 * @category Stat
 * @return SD of nums
 * ```
 * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
 * StdDev(1,1,2,2,3) \\ 0.748331477
 * ```
 */
declare function StdDev(...nums: number[]): number;
/**
* @category Text
* @return a string of joined elements. [1,2,3] --> '1, 2 and 3'
* ```
* GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
* GrammarJoin('a','b','c') // 'a, b and c'
* ```
*/
declare function GrammarJoin(...items: unknown[]): string;
/**
* @category Text
* @deprecated
* @return '✔' or '✘'.
* ```
* Tick(true) // '✔'
* Tick(false) // '✘'
* ```
*/
declare function Tick(bool: boolean): string;
/**
* @category Text
* @deprecated
* @return Array of '✔' or '✘'.
* ```
* Ticks(true,false) // ['✔','✘']
* ```
*/
declare function Ticks(...bools: boolean[]): string[];
/**
* @category Text
* @return a pair of latex inequalities sign array like ['\\ge', '\\le'].
* ```typescript
* IneqSign(true,true) // ['\\ge', '\\le']
* IneqSign(true,false) // ['\\gt', '\\lt']
* IneqSign(false,true) // ['\\le', '\\ge']
* IneqSign(false,false) // ['\\lt', '\\gt']
* ```
*/
declare function IneqSign(greater: boolean, equal?: boolean): [string, string];
/**
* @category Text
* @deprecated
* @param upSign - put -ve sign on numerator instead of the front.
* @return latex of dfrac p/q like \dfrac{1}{2}.
* ```
* Dfrac(1,2) // '\\dfrac{1}{2}'
* Dfrac(1,-2) // '\\dfrac{-1}{2}'
* Dfrac(6,4) // '\\dfrac{3}{2}'
* Dfrac(6,-2) // '-3'
* Dfrac(0,2) // '0'
* Dfrac(5,0) // undefined
* ```
*/
declare function Dfrac(numerator: number, denominator: number, upSign?: boolean): string;
/**
 * @category Text
 * @return convert index katex to surd
 * ```
 * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
 * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
 * ```
 */
declare function IndexToSurd(text: string): string;
/**
 * @category Text
 * @deprecated
 * @return the coordinates '(a, b)' of point [a,b]
 * ```
 * Coord([1,2]) // '(1, 2)'
 * ```
 */
declare function Coord(point: Point): string;
/**
 * @category Text
 * @return the scientific notation of number
 * ```
 * Sci(123.45) // '1.2345 x 10^{ 2}'
 * Sci(1.2345) // '1.2345'
 * ```
 */
declare function Sci(num: number): string;
/**
 * @category Text
 * @return the katex of long division
 * ```
 * LongDivision([1,2,3,4],[1,2]) //
 * LongDivision([1,2,3,4],[1,2]) //
 * ```
 */
declare function LongDivision(dividend: number[], divisor: number[]): string;
/**
 * @category Text
 * @param num - from 1 to 10
 * @return roman number
 * ```
 * Romanize(1) // "I"
 * Romanize(2) // "II"
 * ```
 */
declare function Romanize(num: number): string;
/**
 * @category Text
 * @param roman - from I to X
 * @return arabic number
 * ```
 * DeRomanize("I") // 1
 * DeRomanize("II") // 2
 * ```
 */
declare function DeRomanize(roman: string): number;
/**
 * @category Triangle
 * @return Find side length c by cosine law. Input sides a,b and angle C.
 * ```
 * CosineLawLength(5,5,60) // 5
 * CosineLawLength(2,4,30) // 2.47862735
 * CosineLawLength(1,2,180) // 3
 * CosineLawLength(4,6,0) // 2
 * ```
 */
declare function CosineLawLength(a: number, b: number, C: number): number;
/**
 * @category Triangle
 * @return Find angle C by cosine law. Input sides a,b,c.
 * ```
 * CosineLawAngle(5,5,5) // 60
 * CosineLawAngle(3,4,5) // 90
 * CosineLawAngle(7,8,9) // 73.3984504
 * ```
 */
declare function CosineLawAngle(a: number, b: number, c: number): number;
/**
 * @category Triangle
 * @return Find area by Heron's formula.
 * ```
 * Heron(3,4,5) // 6
 * Heron(1,1,1) // 0.433012701
 * Heron(7,8,9) // 26.83281573
 * ```
 */
declare function Heron(a: number, b: number, c: number): number;
/**
 * @category Triangle
 * @param fix - Round all return values to integer.
 * @return Return the 6 elements of a triangle given vertice. { sideC, angleB, sideA, angleC, sideB, angleA }
 * ```
 * TriangleFromVertex([0,0],[4,0],[0,3],false)
 * // {sideC:4, angleB:36.86989765, sideA:5, angleC:53.13013235, sideB:3, angleA:90}
 * ```
 */
declare function TriangleFromVertex(A: Point, B: Point, C: Point, fix?: boolean): Triangle;
/**
 * @category Triangle
 * @param triangle - unknown elements are null.
 * @return Solve a triangle. return the triangle object solved.
 * ```
 * SolveTriangle({sideC:2, sideA:2, sideB:2})
 * // {sideC:2, angleB:60, sideA:2, angleC:60, sideB:2, angleA:60}
 * SolveTriangle({sideC:3, angleB:90, sideA:4})
 * // {sideC:3, angleB:90, sideA:4, angleC:36.86989765, sideB:5, angleA:53.13010235}
 * SolveTriangle({sideC:5, angleB:30, angleC:80})
 * // {sideC:5, angleB:30, sideA:4.770944471, angleC:80, sideB:2.53856653, angleA:70}
 * SolveTriangle({sideC:6, angleB:30, angleA:40})
 * // {sideC:6, angleB:30, sideA:4.10424172, angleC:110, sideB:3.192533317, angleA:40}
 * ```
 */
declare function SolveTriangle({ sideA, sideB, sideC, angleA, angleB, angleC }: PartialTriangle): Triangle;
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
declare function Quadrant(rect: Point | number): QuadrantName;
/**
 * @category Trigonometry
 * @return the rectangular coordinates [x,y] from a polar coordinates [r,theta].
 * ```
 * PolToRect([1,45]) // [0.707,0.707]
 * ```
 */
declare function PolToRect([r, q]: PolarPoint): Point;
/**
 * @category Trigonometry
 * @return the polar coordinates [r,theta] of a rectangular coordinates [x,y].
 * ```
 * RectToPol([1,1]) // [1.414,45]
 * ```
 */
declare function RectToPol([x, y]: Point): PolarPoint;
/**
 * @category Trigonometry
 * @return the sign from ASTC diagram, 1 or -1, representing positive or negative.
 * ```
 * ASTC(2,'cos') // -1
 * ASTC('III','tan') // 1
 * ```
 */
declare function ASTC(quadrant: QuadrantCode | QuadrantName, func: TrigFunc): -1 | 0 | 1;
/**
 * @category Trigonometry
 * @return the roots of trig equations sin(x)=k , cos(x)=k or tan(x)=k. The angles [r1,r2,r3].
 * ```
 * TrigRoot('sin',0) // [0, 180, 360]
 * TrigRoot('sin',0.5) // [30, 150, undefined]
 * TrigRoot('sin',1) // [90, undefined, undefined]
 * ```
 */
declare function TrigRoot(func: TrigFunc, k: number): [number | undefined, number | undefined, number | undefined];
/**
 * @category Vector
 * @return the vector OP
 * ```
 * Vector([1,2],[10,5]) // [9,3]
 * ```
 */
declare function Vector(O: Point, P: Point): Vector;
/**
 * @category Vector
 * @return sum of all vectors
 * ```
 * VectorAdd([1,2],[3,4],[5,6]) // [9,12]
 * ```
 */
declare function VectorAdd(...vectors: Vector[]): Vector;
/**
 * @category Vector
 * @return mean of all vectors
 * ```
 * VectorMean([1,2],[3,4],[5,6]) // [3,4]
 * VectorMean([0,0],[2,0],[2,2],[0,2]) // [1,1]
 * ```
 */
declare function VectorMean(...vectors: Vector[]): Vector;
/**
 * @category Vector
 * @return length of vector
 * ```
 * VectorLength([-3,4]) // 5
 * VectorLength([0,0]) // 0
 * VectorLength([1,2]) // sqrt(5)
 * ```
 */
declare function VectorLength(v: Vector): number;
/**
 * @category Vector
 * @return length of vector
 * ```
 * VectorArg([2,0]) // 0
 * VectorArg([0,2]) // 90
 * VectorArg([-2,0]) // 180
 * VectorArg([0,-2]) // 270
 * VectorArg([0,0]) // 0
 * VectorArg([1,1]) // 45
 * ```
 */
declare function VectorArg(v: Vector): number;
/**
 * @category Vector
 * @return find [kx,ky] from [x,y]
 * ```
 * VectorScale([1,2],2) // [2,4]
 * VectorScale([1,2],-2) // [-2,-4]
 * ```
 */
declare function VectorScale(v: Vector, k: number): Vector;
/**
 * @category Vector
 * @return the negative of the vector
 * ```
 * VectorRev([-3,4]) // [3,-4]
 * VectorRev([0,0]) // [0,0]
 * VectorRev([1,2]) // [-1,-2]
 * ```
 */
declare function VectorRev(v: Vector): Vector;
/**
 * @category Vector
 * @return the unit vector of v
 * ```
 * VectorUnit([2,0]) // [1,0]
 * VectorUnit([0,-2]) // [0,-1]
 * VectorUnit([1,2]) // [1/sqrt(5),2/sqrt(5)]
 * ```
 */
declare function VectorUnit(v: Vector): Vector;
/**
 * @category Vector
 * @return scale the vector to the given length
 * ```
 * VectorScaleTo([2,0],10) // [10,0]
 * VectorScaleTo([0,-2],100) // [0,-100]
 * VectorScaleTo([-3,4],15) // [-9,12]
 * ```
 */
declare function VectorScaleTo(v: Vector, length: number): Vector;
/**
 * @category Vector
 * @return rotate a vector anticlockwise by angle.
 * ```
 * VectorRotate([1,2],90) // [-2,1]
 * ```
 */
declare function VectorRotate(v: Vector, angle: number): Vector;
/**
* @category 3DPen
* @return projector function from 3D point to 2D plane
* ```typescript
* const pj = Projector(60,0.5) // create a 3D projector function
* pj(1,1,0) // [1.25, 0.433012701892]
* ```
*/
declare function Projector(angle?: number, depth?: number): (x: number, y: number, z: number) => Point;
/**
 * @category DrawingPen
 */
declare class AutoPenCls {
    /**
     * @ignore
     */
    private pen;
    /**
     * @ignore
     */
    constructor();
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
    export(html: string, placeholder: string): string;
    /**
     * A short division diagram for prime factorization of numbers.
     * @category tool
     * @param numbers - The array of numbers to factorize.
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.PrimeFactorization({numbers:[12,24]})
     * ```
     */
    PrimeFactorization({ numbers }: {
        numbers: number[];
    }): void;
    /**
     * Arrow diagram for inequalities.
     * @category tool
     * @param items - Represent the inequalities.
     * @param ticks - Represent the tick or cross for each region.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.Inequalities({
     *    items:[
     *       { position: 0.3, sign: "\\ge", num: 5,vertical:true },
     *       { position: 0.7, sign: "<", num: "k" }
     *    ],
     *    ticks:[true,true,false]
     * })
     * ```
     */
    Inequalities({ items, ticks, scale, ratio }: {
        items: {
            position: number;
            sign: string;
            num: number | string;
            vertical: boolean;
            base: number;
        }[];
        ticks: boolean[];
        scale: number;
        ratio: number;
    }): void;
    /**
     * Trig Graph for solving basic trig equation.
     * @category tool
     * @param trig - 'sin' | 'cos' | 'tan'
     * @param k - value of trig, like sin = k.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.TrigSolution({trig:'sin', k:0.5})
     * ```
     */
    TrigSolution({ trig, k, scale, ratio }: {
        trig: TrigFunc;
        k: number;
        scale: number;
        ratio: number;
    }): void;
    /**
     * Sketch for solving quadratic inequality.
     * @category tool
     * @param quadratic - [a,b,c] representing coeff of quadratic inequality.
     * @param sign - The sign of the inequality. Can be like '>=' , '<' or '\\ge' , '\\lt'.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.QuadraticInequality({quadratic:[1,2,-3],sign:'\\ge'})
     * ```
     */
    QuadraticInequality({ quadratic, sign, scale, ratio }: {
        quadratic: [number, number, number];
        sign: string;
        scale: number;
        ratio: number;
    }): void;
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
     * let pen = new AutoPen()
     * pen.Triangle({
     *   vertices:[[0,0],[4,0],[0,3]],
     *   triangle:{sideC:4,angleB:37,sideA:5,angleC:53,sideB:3,angleA:90},
     *   labels:['A','B','C'],
     *   heights :[false, false, false]
     * })
     * ```
     */
    Triangle({ vertices, triangle, labels, heights, scale }: {
        vertices: Point[];
        triangle: any;
        labels: string[];
        heights: [boolean, boolean, boolean];
        scale: number;
    }): void;
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
     * let pen = new AutoPen()
     * let constraints = [[1, 1, "<=", 5], [1, -1, "<", 4], [2, 1, ">=", -5], [3, 1, ">", -10]]
     * pen.LinearProgram({
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
    LinearProgram({ constraints, field, contours, labelConstraints, highlights, ranges, resolution, grid, subGrid, tick, showLine, showShade, showVertex, showVertexCoordinates, showVertexLabel, showVertexMax, showVertexMin, showIntegral, showIntegralLabel, showIntegralMax, showIntegralMin, contourColor, constraintColors, }: {
        constraints: Constraint[];
        field: Field;
        contours: number[];
        labelConstraints: ((x: number, y: number) => boolean)[];
        highlights: Highlight[];
        ranges: [[number, number], [number, number]];
        resolution: number;
        grid: number;
        subGrid: number;
        tick: number;
        showLine: boolean;
        showShade: boolean;
        showVertex: boolean;
        showVertexCoordinates: boolean;
        showVertexLabel: boolean;
        showVertexMax: boolean;
        showVertexMin: boolean;
        showIntegral: boolean;
        showIntegralLabel: boolean;
        showIntegralMax: boolean;
        showIntegralMin: boolean;
        contourColor: string;
        constraintColors: string[];
    }): void;
    /**
     * A dot pattern
     * @category tool
     * @param a - no. of dot of 1st pattern
     * @param p - P_n+1 = P_n + (pn+q)
     * @param q - P_n+1 = P_n + (pn+q)
     * @param n - the pattern required
     * @param offset - offset of initial position
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.DotPattern({a:3, p:3, q:2, n:4, offset:1})
     * ```
     */
    DotPattern({ a, p, q, n, offset }: {
        a: number;
        p: number;
        q: number;
        n: number;
        offset: number;
    }): void;
    /**
     * A pie chart
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.PieChart({
     *   categories: ['a','b','c','d','e'],
     *   labels: ['10%','20%','30%','40%',''],
     *   angles: [45,135,60,50,70],
     *   angleLabels: [null,'x',null,null,''],
     *   size:1.5
     * })
     * ```
     */
    PieChart({ categories, labels, angles, angleLabels, size }: {
        categories: string[];
        labels: string[];
        angles: number[];
        angleLabels: string[];
        size: number;
    }): void;
    /**
     * A bar chart / line chart / histogram / frequency polygon / cf polygon
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.HeightChart({
     *   categories: ['a','b','c','d','e'],
     *   data:[7,47,15,3,7],
     *   xLabel:'x-axis',
     *   yLabel:'y-axis',
     *   interval:5,
     *   subInterval:1,
     *   barWidth:1,
     *   barGap:1,
     *   showBar:true,
     *   showLine:true
     * })
     * ```
     */
    HeightChart({ categories, data, xLabel, yLabel, interval, subInterval, barWidth, barGap, showBar, showLine }: {
        categories: string[];
        data: number[];
        xLabel: string;
        yLabel: string;
        interval: number;
        subInterval: number;
        barWidth: number;
        barGap: number;
        showBar: boolean;
        showLine: boolean;
    }): void;
    /**
     * A pie chart
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.StemAndLeaf({
     *   data: [2,5,6,12,14,16,23,23,24,25,26,26,26,26,27,31],
     *   labels: [2,'x',6,12,14,16,23,23,24,25,26,26,26,26,27,31],
     *   stemTitle: "Stem (10 units)",
     *   leafTitle: "Leaf (1 unit)"
     * })
     * ```
     */
    StemAndLeaf({ data, labels, stemTitle, leafTitle }: {
        data: number[];
        labels?: string[];
        stemTitle: string;
        leafTitle: string;
    }): void;
    /**
     * A boxplot
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.Boxplot({
     *   summary: [41,45,48,52,55],
     *   labels: [null,null,'x',null,'y'],
     *   size: 2,
     *   tick: 1,
     *   start: 38,
     *   end: 60,
     *   showDash: false,
     *   showValue: false,
     *   showTick: false
     * })
     * ```
     */
    Boxplot({ summary, labels, size, tick, start, end, showDash, showValue, showTick }: {
        summary: number[];
        labels?: (string | null)[];
        size?: number;
        tick?: number;
        start?: number;
        end?: number;
        showDash?: boolean;
        showValue?: boolean;
        showTick?: boolean;
    }): void;
}
declare var AutoPen: typeof AutoPenCls;
/**
 * @ignore
 */
declare var PEN_QUALITY: number;
/**
 * @ignore
 */
declare class FrameCls {
    wPixel: number;
    hPixel: number;
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    axisOffset: number;
    constructor();
    xWidth(): number;
    yHeight(): number;
    xUnit(): number;
    yUnit(): number;
    toPix(xyArr: Point): Point;
    toCoord(xyArr: Point): Point;
    private _ticks;
    xTicks(interval: number): number[];
    yTicks(interval: number): number[];
    xRange(): [number, number];
    yRange(): [number, number];
    xOffset(): number;
    yOffset(): number;
}
/**
 * @ignore
 */
declare var Frame: typeof FrameCls;
/**
 * @category DrawingPen
 */
declare class PenCls {
    /**
     * @ignore
     */
    private canvas;
    /**
     * @ignore
     */
    private ctx;
    /**
     * @ignore
     */
    private frame;
    /**
     * @ignore
     */
    private imgStore;
    /**
     * @ignore
     */
    constructor();
    /**
     * Setup of canvas coordinate range.
     * @category setting
     */
    range: {
        /**
         * @ignore
         */
        _pen: PenCls;
        /**
         * Set the coordinate range of the canvas.
         * @category SetupRange
         * @param xRange - The range [xmin,xmax].
         * @param yRange - The range [ymin,ymax].
         * @returns void
         * ```
         * pen.range.set([-5,5],[-2,4]) // -5<x<5 and -2<y<4
         * ```
         */
        set(xRange: [number, number], yRange?: [number, number]): void;
        /**
         * Set the coordinate range of the canvas with given size and center.
         * Equivalent to pen.range.range([-size, size], [-size, size]) but shifted center.
         * @category SetupRange
         * @param size - The max x and y coordinates in range.
         * @param center - [x,y] coordinates of the center.
         * @returns void
         * ```
         * pen.range.square(5) // define range -5<x<5 and -5<y<5
         * pen.range.square(5,[1,2]) // define range -4<x<6 and -3<y<7
         * ```
         */
        square(size: number, center?: Point): void;
        /**
         * Set the coordinate range by specifying in-view points.
         * @category SetupRange
         * @param points - An array of in-view points [x,y].
         * @returns void
         * ```
         * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
         * ```
         */
        capture(...points: Point[]): void;
        /**
         * Set the coordinate range by specifying in-view points, include O(0,0).
         * @category SetupRange
         * @param points - An array of in-view points [x,y].
         * @returns void
         * ```
         * pen.range.extend([1,2],[3,4]) //  [0,0], [1,2], [3,4] must be in-view
         * // equivalent to pen.range.capture([0,0],[1,2],[3,4])
         * ```
         */
        extend(...points: Point[]): void;
    };
    /**
     * Setup of canvas size.
     * @category setting
     */
    size: {
        /**
         * @ignore
         */
        _pen: PenCls;
        /**
         * Set the size of the canvas.
         * @category SetupSize
         * @param width - The scale of the width.
         * @param height - The scale of the height.
         * @returns void
         * ```
         * pen.size.set(0.5,2)
         * // half the standard width, double the standard height
         * ```
         */
        set(width?: number, height?: number): void;
        /**
         * Set the size of the canvas by resolution.
         * @category SetupSize
         * @param xPPI - The scale per unit x.
         * @param yPPI - The scale per unit y, if not provided, follow x.
         * @returns void
         * ```
         * pen.size.resolution(0.1,0.2)
         * // 0.1 scale for each x-unit, and 0.2 scale for each y-unit.
         * ```
         */
        resolution(xPPI?: number, yPPI?: number): void;
        /**
         * Set the size of the canvas, lock xy ratio.
         * @category SetupSize
         * @param width - The scale of the width.
         * @returns void
         * ```
         * pen.size.lock(0.5) // half the standard width, with yPPI = xPPI.
         * ```
         */
        lock(width?: number): void;
    };
    /**
     * Setup of canvas. Deprecated.
     * @ignore
     * @deprecated
     * @category setting
     */
    setup: {
        /**
         * @ignore
         */
        _pen: PenCls;
        /**
         * Set the size of the canvas.
         * @category setup
         * @deprecated
         * @param scale - The scale of the width.
         * @param  ratio - The height-to-width ratio.
         * @returns void
         * ```
         * pen.setup.size(0.5,2)
         * // half the standard width, with height-to-width = 2:1
         * ```
         */
        size(scale?: number, ratio?: number): void;
        /**
         * Set the size of the canvas, keep square zoom. pen.setup.range should be called before me to set the range first.
         * @category setup
         * @deprecated
         * @param scale - The scale of the width.
         * @returns void
         * ```
         * pen.setup.squareSize(0.5)
         * // half the standard width, with height-to-width defined by coordinates range set.
         * ```
         */
        squareSize(scale?: number): void;
        /**
         * Set the size of the canvas by resolution. pen.setup.range should be called before me to set the range first.
         * @category setup
         * @deprecated
         * @param xPPI - The scale per unit x.
         * @param yPPI - The scale per unit y, if not provided, follow x.
         * @returns void
         * ```
         * pen.setup.resolution(0.1,0.2)
         * // 0.1 scale for each x-unit, and 0.2 scale for each y-unit.
         * ```
         */
        resolution(xPPI?: number, yPPI?: number): void;
        /**
         * Set the coordinate range of the canvas.
         * @category setup
         * @deprecated
         * @param xRange - The range [xmin,xmax].
         * @param yRange - The range [ymin,ymax].
         * @returns void
         * ```
         * pen.setup.range([-5,5],[-2,4])
         * // define range -5<x<5 and -2<y<4
         * ```
         */
        range(xRange: [number, number], yRange: [number, number]): void;
        /**
         * Set the coordinate range of the canvas with given size and center.
         * Equivalent to pen.range([-size, size], [-size, size]) but shifted center.
         * @category setup
         * @deprecated
         * @param size - The max x and y coordinates in range.
         * @param center - [x,y] coordinates of the center.
         * @returns void
         * ```
         * pen.setup.squareRange(5) // define range -5<x<5 and -5<y<5
         * pen.setup.squareRange(5,[1,2]) // define range -4<x<6 and -3<y<7
         * ```
         */
        squareRange(size: number, center?: Point): void;
        /**
         * Set the coordinate range by specifying in-view points.
         * @category setup
         * @deprecated
         * @param points - An array of in-view points [x,y].
         * @param border - The percentage to extend the border.
         * @param origin - Must contain the origin [0,0]
         * @returns void
         * ```
         * pen.setup.inView([[1,2],[3,4]]) // the points [0,0], [1,2] and [3,4] must be in-view
         * ```
         */
        inView(points: Point[], border?: number, origin?: boolean): void;
    };
    /**
     * @ignore
     */
    private setProperty;
    /**
     * Settings.
     * @category setting
     */
    set: {
        /**
         * @ignore
         */
        _pen: PenCls;
        /**
         * Set the weight of the pen (line width).
         * @category set
         * @param weight - The line width.
         * @returns void
         * ```
         * pen.set.weight(2) // set a bold line
         * ```
         */
        weight(weight?: number): void;
        /**
         * Set the color of the pen stroke.
         * @category set
         * @param color - The line color.
         * @returns void
         * ```
         * pen.set.strokeColor('grey') // set grey line
         * ```
         */
        strokeColor(color?: string): void;
        /**
         * Set the color of filling.
         * @category set
         * @param color - The filling color.
         * @returns void
         * ```
         * pen.set.fillColor('grey') // set grey filling
         * ```
         */
        fillColor(color?: string): void;
        /**
         * Set the color of both filling and stroke.
         * @category set
         * @param color - The color.
         * @returns void
         * ```
         * pen.set.color('grey') // set grey filling and stroke
         * ```
         */
        color(color?: string): void;
        /**
         * Set the transparency.
         * @category set
         * @param alpha - The alpha value, from 0 to 1. 0 is completely transparent.
         * @returns void
         * ```
         * pen.set.alpha(0.9) // set slightly transparent
         * ```
         */
        alpha(alpha?: number): void;
        /**
         * Set the dash pattern of line.
         * @category set
         * @param segments - The dash pattern, as [5,5] or 5 or true.
         * @returns void
         * ```
         * pen.set.dash([10,5]) // set dash line
         * ```
         */
        dash(segments?: (number[] | number | boolean)): void;
        /**
         * Set the horizontal alignment of text.
         * @category set
         * @param align - The alignment {'left','right','center'}.
         * @returns void
         * ```
         * pen.set.textAlign('left') // set align to left
         * ```
         */
        textAlign(align?: CanvasTextAlign): void;
        /**
         * Set the vertical alignment of text.
         * @category set
         * @param baseline - The alignment {'top','bottom','middle'}.
         * @returns void
         * ```
         * pen.set.textBaseline('bottom') // set align to bottom
         * ```
         */
        textBaseline(baseline?: CanvasTextBaseline): void;
        /**
         * Set the size of text.
         * @category set
         * @param size - The text size.
         * @returns void
         * ```
         * pen.set.textSize(2) // set larger text
         * ```
         */
        textSize(size?: number): void;
        /**
         * Set italic style of text.
         * @category set
         * @param italic - Italic or not.
         * @returns void
         * ```
         * pen.set.textItalic(true) // set italic to true
         * ```
         */
        textItalic(italic?: boolean): void;
        /**
         * Set text direction.
         * @category set
         * @param angle - angle to rotate text.
         * @returns void
         * ```
         * pen.set.textDir(90) // set vertical text
         * ```
         */
        textDir(angle?: number): void;
        /**
         * Set text latex mode.
         * @category set
         * @param on - turn on or off.
         * @returns void
         * ```
         * pen.set.textLatex(true) // turn on latex mode
         * ```
         */
        textLatex(on?: boolean): void;
        /**
         * Set the center for label dodge. If undefined, dodge right by default.
         * @category set
         * @param center - the center coordinate
         * @returns void
         * ```
         * pen.set.labelCenter([0,0]) // set center to be [0,0]
         * pen.set.labelCenter(true) // set center to be the center of the canvas
         * ```
         */
        labelCenter(center?: Point | boolean): void;
        /**
         * Set the mode for angle. All angles (e.g. AOB) will be understood as this mode.
         * @category set
         * @param mode - the mode: 'normal' | 'polar' | 'reflex'
         * @returns void
         * ```
         * pen.set.angle('polar') // set mode to 'polar'
         * ```
         */
        angle(mode?: 'normal' | 'polar' | 'reflex'): void;
        /**
         * Reset all pen settings.
         * @category set
         * @returns void
         * ```
         * pen.reset() // reset
         * ```
         */
        reset(): void;
    };
    /**
     * Plot an explicit or parametric function.
     * @category graph
     * @param func - The function to plot, either x=>f(x) or t=>[x(t),y(t)].
     * @param tStart - Start value of t, default to xmin.
     * @param tEnd - End value of t, default to xmax.
     * @param dots - Number of dots to plot. More dots give finer graph.
     * @returns void
     * ```
     * pen.plot(x=>x**2) // plot y=x^2
     * pen.plot(t=>[cos(t),sin(t)],0,360) // plot a circle centered (0,0) with r=1
     * ```
     */
    plot(func: (t: number) => number | Point, tStart?: number, tEnd?: number, dots?: number): void;
    /**
     * Drawing graph of functions.
     * @category graph
     */
    graph: {
        /**
         * @ignore
         */
        _pen: PenCls;
        /**
         * Draw a circle (x-h)^2+(y-k)^2 = r^2.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @returns void
         * ```
         * pen.graph.circle([1,2],3) // draw (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        circle(center: Point, radius: number): void;
        /**
         * Draw an arc of (x-h)^2+(y-k)^2 = r^2.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns void
         * ```
         * pen.graph.arc([1,2],3,0,180) // draw upper semi-circle (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        arc(center: Point, radius: number, qStart: number, qEnd: number): void;
        /**
         * Draw a sector of (x-h)^2+(y-k)^2 = r^2.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns void
         * ```
         * pen.graph.sector([1,2],3,0,90) // draw upper-right quarter-sector (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        sector(center: Point, radius: number, qStart: number, qEnd: number): void;
        /**
         * Draw an segment of (x-h)^2+(y-k)^2 = r^2.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns void
         * ```
         * pen.graph.segment([1,2],3,0,90) // draw upper-right quarter-segment (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        segment(center: Point, radius: number, qStart: number, qEnd: number): void;
        /**
         * Draw a quadratic graph y=ax^2+bx+c.
         * @category graph
         * @param a - The coeff of x^2.
         * @param b - The coeff of x.
         * @param c - The constant.
         * @returns void
         * ```
         * pen.graph.quadratic(1,2,3) // draw y=x^2+2x+3.
         * ```
         */
        quadratic(a: number, b: number, c: number): void;
        /**
         * Draw a line y=mx+c.
         * @category graph
         * @param m - The slope.
         * @param c - The y-intercept.
         * @returns void
         * ```
         * pen.graph.line(2,1) // draw the line y=2x+1
         * ```
         */
        line(m: number, c: number): void;
        /**
         * Draw a horizontal line y=constant.
         * @category graph
         * @param y - The constant value of y.
         * @returns void
         * ```
         * pen.graph.horizontal(2) // draw the line y=2
         * ```
         */
        horizontal(y: number): void;
        /**
         * Draw a vertical line x=constant.
         * @category graph
         * @param x - The constant value of x.
         * @returns void
         * ```
         * pen.graph.vertical(2) // draw the line x=2
         * ```
         */
        vertical(x: number): void;
        /**
         * Draw a line ax+by+c=0.
         * @category graph
         * @param a - The coeff of x.
         * @param b - The coeff of y.
         * @param c - The constant.
         * @returns void
         * ```
         * pen.graph.linear(1,2,3) // draw the line x+2y+3=0
         * ```
         */
        linear(a: number, b: number, c: number): void;
    };
    /**
     * Draw a point.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.point([1,2]) // draw a point at [1,2]
     * pen.point([1,2],"A") // draw a point at [1,2] and label as "A"
     * ```
     */
    point(position: Point, label?: string): void;
    /**
     * Draw a point.
     * @category draw
     * @param positions - {label:position}
     * @param label - whether to label the points
     * @returns void
     * ```
     * pen.points({A,B}) // mark and label point A as 'A', point B as 'B'
     * pen.points({A,B},false) // mark point A and B, without label
     * ```
     */
    points(positions: {
        [k: string]: Point;
    }, label?: boolean): void;
    /**
     * Draw a horizontal cutter.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.cutterH([1,2]) // draw a horizontal cutter at [1,2]
     * ```
     */
    cutterH(position: Point, label?: string): void;
    /**
     * Draw a vertical cutter.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.cutterV([1,2]) // draw a vertical cutter at [1,2]
     * ```
     */
    cutterV(position: Point, label?: string): void;
    /**
     * Draw a circle or arc.
     * @category draw
     * @param center - The coordinates [x,y] of center.
     * @param radius - The radius in pixel.
     * @param angles - The polar angle range [q1,q2].
     * @param fill - Whether to fill the inside.
     * @returns void
     * ```
     * pen.circle([1,2], 10) // draw a circle centered at [1,2] with r=10px
     * pen.circle([1,2], 10, [0,180]) // draw a upper semi-circle
     * ```
     */
    circle(center: Point, radius: number, angles?: number[], fill?: boolean): void;
    /**
     * @ignore
     */
    private _line;
    /**
     * Draw a line between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.line([1,2],[3,4]) // draw a line from [1,2] to [3,4]
     * pen.line([1,2],[3,4],'10') //  draw a line from [1,2] to [3,4] with label '10'
     * ```
     */
    line(startPoint: Point, endPoint: Point, label?: string): void;
    /**
     * Draw a dash line between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.dash([1,2],[3,4]) // draw a dash line from [1,2] to [3,4]
     * pen.dash([1,2],[3,4],'10') //  draw a dash line from [1,2] to [3,4] with label '10'
     * ```
     */
    dash(startPoint: Point, endPoint: Point, label?: string): void;
    /**
     * Draw an arrow between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @returns void
     * ```
     * pen.arrow([1,2],[3,4]) // draw an arrow from [1,2] to [3,4]
     * ```
     */
    arrow(startPoint: Point, endPoint: Point): void;
    /**
     * @ignore
     */
    private _polygon;
    /**
     * Draw a polyline given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns void
     * ```
     * pen.polyline([0,0],[5,2],[3,4]) // draw a polyline with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyline(...points: Point[]): void;
    /**
     * Draw a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns void
     * ```
     * pen.polygon([0,0],[5,2],[3,4]) // draw a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polygon(...points: Point[]): void;
    /**
     * Fill a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns void
     * ```
     * pen.polyfill([0,0],[5,2],[3,4]) // fill a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyfill(...points: Point[]): void;
    /**
     * Shade a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns void
     * ```
     * pen.polyshade([0,0],[5,2],[3,4]) // shade a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyshade(...points: Point[]): void;
    /**
     * Fill a shape.
     * @category fill
     */
    fill: {
        /**
         * @ignore
         */
        _pen: PenCls;
        /**
         * Fill a circle (x-h)^2+(y-k)^2 = r^2.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @returns void
         * ```
         * pen.fill.circle([1,2],3) // fill (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        circle(center: Point, radius: number): void;
        /**
         * Fill a sector (x-h)^2+(y-k)^2 = r^2.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns void
         * ```
         * pen.fill.sector([1,2],3,0,90) // fill the upper-right quarter-circle (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        sector(center: Point, radius: number, qStart: number, qEnd: number): void;
        /**
         * Fill a segment (x-h)^2+(y-k)^2 = r^2.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns void
         * ```
         * pen.fill.segment([1,2],3,0,90) // fill the upper-right quarter-segment (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        segment(center: Point, radius: number, qStart: number, qEnd: number): void;
    };
    /**
     * Draw an angle with label, non-reflex
     * @category draw
     * @param A - The starting point [x,y].
     * @param O - The vertex point [x,y].
     * @param B - The ending point [x,y].
     * @param label - The label
     * @param arc - The number of arcs.
     * @param radius - The radius of the angle arc, in pixel.
     * @returns void
     * ```
     * pen.angle([0,0],[5,2],[3,4],'x')
     * ```
     */
    angle(A: Point, O: Point, B: Point, label?: string, arc?: number, radius?: number): void;
    /**
     * Geometry Decorator.
     * @category decorator
     */
    decorate: {
        /**
         * @ignore
         */
        _pen: PenCls;
        /**
         * Decorate equal side lengths.
         * @category decorator
         * @param startPoint - The starting point [x,y].
         * @param endPoint - The ending point [x,y].
         * @param tick - The number of ticks.
         * @returns void
         * ```
         * pen.decorate.equalSide([1,0],[3,2],2)
         * // decorate a double-tick at the mid-pt of [1,0] and [3,2]
         * ```
         */
        equalSide(startPoint: Point, endPoint: Point, tick?: number): void;
        /**
         * Decorate parallel side.
         * @category decorator
         * @param startPoint - The starting point [x,y].
         * @param endPoint - The ending point [x,y].
         * @param tick - The number of ticks.
         * @returns void
         * ```
         * pen.decorate.parallel([1,0],[3,2],2)
         * // decorate a double-tick parallel mark at the mid-pt of [1,0] and [3,2]
         * ```
         */
        parallel(startPoint: Point, endPoint: Point, tick?: number): void;
        /**
         * Decorate an angle AOB, always in anti-clockwise.
         * @category decorator
         * @deprecated use pen.set.angle('polar')
         * @param A - The starting point [x,y].
         * @param O - The vertex point [x,y].
         * @param B - The ending point [x,y].
         * @param arc - The number of arcs.
         * @param radius - The radius of the angle arc, in pixel.
         * @returns void
         * ```
         * pen.decorate.anglePolar([1,0],[0,0],[3,2],2)
         * // decorate an angle AOB with double-arc in anti-clockwise.
         * ```
         */
        anglePolar(A: Point, O: Point, B: Point, arc?: number, radius?: number): void;
        /**
         * Decorate an angle AOB, always non-reflex.
         * @category decorator
         * @param A - The starting point [x,y].
         * @param O - The vertex point [x,y].
         * @param B - The ending point [x,y].
         * @param arc - The number of arcs.
         * @param radius - The radius of the angle arc, in pixel.
         * @returns void
         * ```
         * pen.decorate.angle([1,0],[0,0],[3,2],2)
         * // decorate an angle AOB with double-arc.
         * ```
         */
        angle(A: Point, O: Point, B: Point, arc?: number, radius?: number): void;
        /**
         * Decorate a right-angle AOB.
         * @category decorator
         * @param A - The starting point [x,y].
         * @param O - The vertex point [x,y].
         * @param B - The ending point [x,y]. Interchangeable with A.
         * @param size - The size of the mark, in pixel.
         * @returns void
         * ```
         * pen.decorate.rightAngle([1,0],[0,0],[3,2])
         * // decorate an right-angle AOB
         * ```
         */
        rightAngle(A: Point, O: Point, B?: Point, size?: number): void;
    };
    /**
     * @ignore
     */
    private _write;
    /**
     * Write text.
     * @category text
     * @param position - The coordinates [x,y] to position the text.
     * @param text - The string to write.
     * @returns void
     * ```
     * pen.write([1,2],'abc') // write 'abc' at [1,2]
     * ```
     */
    write(position: Point, text: string): void;
    /**
     * @category text
     */
    label: {
        /**
         * @ignore
         */
        _pen: PenCls;
        /**
         * Add a label to a point.
         * @category text
         * @param position - The coordinates [x,y] of the point to label.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle.
         * @param offsetPixel - The pixel distance to offset from the position.
         * @returns void
         * ```
         * pen.label.point([1,2],'A',180)
         * // label the point [1,2] as 'A', place the label on the left (180 degree)
         * ```
         */
        point(position: Point, text?: string, dodgeDirection?: number | undefined, offsetPixel?: number): void;
        /**
         * Add a label to points, using index as text.
         * @category text
         * @param positions - {label:position}.
         * @returns void
         * ```
         * pen.label.points({A,B}) // label point A as 'A', point B as 'B'
         * ```
         */
        points(positions: {
            [k: string]: Point;
        }): void;
        /**
         * Add a label to an angle AOB, in anticlockwise.
         * @category text
         * @deprecated use pen.set.angle('polar')
         * @param anglePoints - An array [A,O,B] for the coordinates of A,O,B.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
         * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 25 : 30).
         * @returns void
         * ```
         * pen.label.anglePolar([[1,2],[0,0],[-2,1]],'x')
         * // label the angle as 'x'
         * ```
         */
        anglePolar(anglePoints: [Point, Point, Point], text: string, dodgeDirection?: number, offsetPixel?: number): void;
        /**
         * Add a label to an angle AOB, non-reflex.
         * @category text
         * @param anglePoints - An array [A,O,B] for the coordinates of A,O,B.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
         * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 25 : 30).
         * @returns void
         * ```
         * pen.label.angle([[1,2],[0,0],[-2,1]],'x')
         * // label the angle as 'x'
         * ```
         */
        angle(anglePoints: [Point, Point, Point], text: string | number, dodgeDirection?: number, offsetPixel?: number): void;
        /**
         * Add a label to a line AB.
         * @category text
         * @param linePoints - An array [A,B] for the coordinates of AB.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle,relative to the right normal of AB.
         * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 15 : text.length <= 4 ? 20 : 25).
         * @returns void
         * ```
         * pen.label.line([[0,0],[2,4]],'L') // label the line as 'L'
         * ```
         */
        line(linePoints: [Point, Point], text: string, dodgeDirection?: number, offsetPixel?: number): void;
        /**
         * Add a coordinates label to a point.
         * @category text
         * @param position - The coordinates [x,y] of the point to label.
         * @param dodgeDirection - The direction to offset, given as a polar angle.
         * @param offsetPixel - The pixel distance to offset from the position.
         * @returns void
         * ```
         * pen.label.coordinates([1,2],180)
         * // label the point [1,2] as '(1, 2)', place the label on the left (180 degree)
         * ```
         */
        coordinates(point: Point, dodgeDirection?: number, offsetPixel?: number): void;
    };
    /**
     * The axis.
     * @category axis
     */
    axis: {
        /**
         * @ignore
         */
        _pen: PenCls;
        /**
         * Draw x-axis.
         * @category axis
         * @param label - The axis label.
         * @returns void
         * ```
         * pen.axis.x('time') // draw the x-axis, label as 'time'
         * ```
         */
        x(label?: string): void;
        /**
         * Draw y-axis.
         * @category axis
         * @param label - The axis label.
         * @returns void
         * ```
         * pen.axis.y('height') // draw the y-axis, label as 'height'
         * ```
         */
        y(label?: string): void;
        /**
         * Draw both axis.
         * @category axis
         * @param xlabel - The x-axis label.
         * @param ylabel - The y-axis label.
         * @returns void
         * ```
         * pen.axis.xy('x','y') // draw both axis, label as 'x' and 'y'
         * ```
         */
        xy(xlabel?: string, ylabel?: string): void;
    };
    /**
     * The axis ticks.
     * @category axis
     */
    tick: {
        /**
         * @ignore
         */
        _pen: PenCls;
        /**
         * Draw ticks on the x-axis.
         * @category axisTick
         * @param interval - The tick interval.
         * @param mark - Whether to label number at ticks.
         * @returns void
         * ```
         * pen.tick.x(2) // draw ticks on the x-axis, at interval 2 units
         * ```
         */
        x(interval?: number, mark?: boolean): void;
        /**
         * Draw ticks on the y-axis.
         * @category axisTick
         * @param interval - The tick interval.
         * @param mark - Whether to label number at ticks.
         * @returns void
         * ```
         * pen.tick.y(2) // draw ticks on the y-axis, at interval 2 units
         * ```
         */
        y(interval?: number, mark?: boolean): void;
        /**
         * Draw ticks on both axis.
         * @category axisTick
         * @param interval - The tick interval.
         * @param mark - Whether to label number at ticks.
         * @returns void
         * ```
         * pen.tick.xy(2) // draw ticks on both axis, at interval 2 units
         * ```
         */
        xy(interval?: number, mark?: boolean): void;
    };
    /**
     * The axis gridlines.
     * @category axis
     */
    grid: {
        /**
         * @ignore
         */
        _pen: PenCls;
        /**
         * Draw gridlines on the x-axis.
         * @category axisGrid
         * @param interval - The grid interval.
         * @returns void
         * ```
         * pen.grid.x(2) // draw gridlines on the x-axis, at interval 2 units
         * ```
         */
        x(interval?: number): void;
        /**
         * Draw gridlines on the y-axis.
         * @category axisGrid
         * @param interval - The grid interval.
         * @returns void
         * ```
         * pen.grid.y(2) // draw gridlines on the y-axis, at interval 2 units
         * ```
         */
        y(interval?: number): void;
        /**
         * Draw gridlines on both axis.
         * @category axisGrid
         * @param interval - The grid interval.
         * @returns void
         * ```
         * pen.grid.xy(2) // draw gridlines on both axis, at interval 2 units
         * ```
         */
        xy(interval?: number): void;
    };
    /**
     * @ignore
     */
    autoCrop(): void;
    /**
     * Export the canvas to image tag.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```
     * question = pen.export(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    export(html: string, placeholder: string): string;
    /**
     * Export the canvas to image tag, with white space trimmed.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```
     * question = pen.exportTrim(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    exportTrim(html: string, placeholder: string): string;
    /**
     * Clear the canvas.
     * @category export
     * @returns void
     * ```
     * pen.clear() // clear the canvas.
     * ```
     */
    clear(): void;
    /**
     * Temporarily save the img internally. Can be later restored by restoreImg.
     * @category export
     * @returns
     * ```
     * pen.saveImg() // save the current canvas image
     * ```
     */
    saveImg(): void;
    /**
     * Restored the previously saved img by saveImg.
     * @category export
     * @returns void
     * ```
     * pen.restoreImg() // restore the previously saved img
     * ```
     */
    restoreImg(): void;
}
/**
 * @ignore
 */
declare var Pen: typeof PenCls;
declare function cloneCanvas(oldCanvas: HTMLCanvasElement): HTMLCanvasElement;
declare function trimCanvas(canvas: HTMLCanvasElement): void;
declare function sleep(ms: number): void;
declare module "Pen/index" {
    import './Frame.ts';
    import './Pen.ts';
    import './AutoPen.ts';
    import './3D.ts';
}
declare module "Soil/tool/html" {
    export class QuestionHTML {
        private body;
        constructor(html?: string);
        export(): string;
        get li(): HTMLLIElement[];
        get ul(): HTMLUListElement;
        cloneLi(sourceIndex: number, repeat?: number): void;
        printInWhole(symbol: string, value: any): void;
        printInLi(index: number, symbol: string, value: any): void;
        isLiDuplicated(): boolean;
        shuffleLi(): number[];
    }
    /**
    * print a variable (e.g. *x) into the html
    * ```typescript
    * let html = '1 + *x = *y'
    * PrintVariable(html,'x',2) // '1 + 2 = *y'
    * ```
    */
    export function PrintVariable(html: string, symbol: string, value: any): string;
    export function ParseForPrint(value: any): any;
}
declare module "Soil/cls" {
    export class Config {
        sections: section[];
        answer: string;
        options: Partial<Dict>;
        constructor(sections?: section[], answer?: string, options?: Partial<Dict>);
    }
    export class Dict {
        a: any;
        b: any;
        c: any;
        d: any;
        e: any;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        l: any;
        m: any;
        n: any;
        o: any;
        p: any;
        q: any;
        r: any;
        s: any;
        t: any;
        u: any;
        v: any;
        w: any;
        x: any;
        y: any;
        z: any;
        A: any;
        B: any;
        C: any;
        D: any;
        E: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        K: any;
        L: any;
        M: any;
        N: any;
        O: any;
        P: any;
        Q: any;
        R: any;
        S: any;
        T: any;
        U: any;
        V: any;
        W: any;
        X: any;
        Y: any;
        Z: any;
        private variables;
        constructor(a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any, i?: any, j?: any, k?: any, l?: any, m?: any, n?: any, o?: any, p?: any, q?: any, r?: any, s?: any, t?: any, u?: any, v?: any, w?: any, x?: any, y?: any, z?: any, A?: any, B?: any, C?: any, D?: any, E?: any, F?: any, G?: any, H?: any, I?: any, J?: any, K?: any, L?: any, M?: any, N?: any, O?: any, P?: any, Q?: any, R?: any, S?: any, T?: any, U?: any, V?: any, W?: any, X?: any, Y?: any, Z?: any);
        update(other: Partial<Dict>): void;
        checked(): boolean;
        substitute(text: string): string;
    }
}
declare var a: any;
declare var b: any;
declare var c: any;
declare var d: any;
declare var e: any;
declare var f: any;
declare var g: any;
declare var h: any;
declare var i: any;
declare var j: any;
declare var k: any;
declare var l: any;
declare var m: any;
declare var n: any;
declare var o: any;
declare var p: any;
declare var q: any;
declare var r: any;
declare var s: any;
declare var t: any;
declare var u: any;
declare var v: any;
declare var w: any;
declare var x: any;
declare var y: any;
declare var z: any;
declare var A: any;
declare var B: any;
declare var C: any;
declare var D: any;
declare var E: any;
declare var F: any;
declare var G: any;
declare var H: any;
declare var I: any;
declare var J: any;
declare var K: any;
declare var L: any;
declare var M: any;
declare var N: any;
declare var O: any;
declare var P: any;
declare var Q: any;
declare var R: any;
declare var S: any;
declare var T: any;
declare var U: any;
declare var V: any;
declare var W: any;
declare var X: any;
declare var Y: any;
declare var Z: any;
declare var sections: [number | string, number][];
declare var answer: string;
declare var options: object;
declare var question: string;
declare var solution: string;
declare module "Soil/tool/eval" {
    import { Dict } from "Soil/cls";
    type Context = {
        dict: Dict;
        sections: section[];
        answer: string;
        options: Partial<Dict>;
        qn: string;
        sol: string;
    };
    export function evaluate(code: string, context: Context): {
        result: any;
        context: Context;
    };
    export function evalInline(code: string, dict: Dict): any;
}
declare module "Soil/tool/section" {
    import { Dict } from "Soil/cls";
    export function ExecSection(html: string, sections: section[], dict: Dict): string;
}
declare module "Soil/tool/dress" {
    export function dress(html: string): string;
}
declare module "Soil/tool/shuffle" {
    export class OptionShuffler {
        private qn;
        private sol;
        private ans;
        private perm;
        private valid;
        private Qn;
        constructor(qn: string, sol: string, ans: string);
        AreOptionsDuplicated(): boolean;
        genQn(): string;
        private mapLetter;
        genAns(): string;
        genSol(): string;
    }
}
declare module "Soil/tool/option" {
    import { Dict } from "Soil/cls";
    /**
    * append the array of options to question
    * ```typescript
    * let question = 'abc<ul><li>*x</li></ul>'
    * AutoOptions(question,{x:3})
    * // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
    * ```
    */
    export function AutoOptions(instructions: Partial<Dict>, question: string, source: Dict): string;
}
declare module "Soil/soil" {
    export class Soil {
        private readonly gene;
        private qn;
        private sol;
        private dict;
        private config;
        private counter;
        private time;
        private errorPile;
        constructor(gene: Gene);
        private reset;
        private checkTime;
        private recordError;
        private printError;
        private evalCode;
        private intrapolateCode;
        private pushDict;
        private isValidated;
        private runPopulate;
        private runSection;
        private runPreprocess;
        private runOption;
        private runIntrapolate;
        private runSubstitute;
        private runPostprocess;
        private runShuffle;
        private runKatex;
        private successFruit;
        private errorFruit;
        nurture(): Fruit;
    }
}
declare module "Soil/index" {
    global {
        var MathSoil: any;
    }
}
declare type section = [number | string, number];
declare type Fruit = {
    readonly qn: string;
    readonly sol: string;
    readonly ans: string | undefined;
    counter: number;
    readonly success: boolean;
};
declare type Gene = {
    readonly qn: string;
    readonly sol: string;
    readonly populate: string;
    readonly validate: string;
    readonly preprocess: string;
    readonly postprocess: string;
};
