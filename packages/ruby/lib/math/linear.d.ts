declare type Ineq = '\\ge' | '\\gt' | '\\le' | '\\lt' | '>=' | '<=' | '>' | '<';
declare type Constraint = [xCoeff: number, yCoeff: number, ineq: Ineq, constant: number];
export declare class Linear {
    private _linear;
    private defined;
    byLinear(linear: [a: number, b: number, c: number]): this;
    byStandard(standard: [a: number, b: number, _c: number]): this;
    byTwoPoints(p1: [number, number], p2: [number, number]): this;
    byPointSlope(p: [number, number], m: number): this;
    byIntercepts(x: number, y: number): this;
    byBisector(A: [number, number], B: [number, number]): this;
    slope(): number;
    xInt(): number;
    yInt(): number;
    toLinear(): [a: number, b: number, c: number];
    toLine(): [slope: number, yInt: number];
    toStandard(): [a: number, b: number, _c: number];
    toConstraint(ineq: Ineq): Constraint;
}
/**
 * Return a `Linear` instance.
 */
export declare function lin(): Linear;
export {};
//# sourceMappingURL=linear.d.ts.map