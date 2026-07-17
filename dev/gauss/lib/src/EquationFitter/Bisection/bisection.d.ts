export declare class Bisection {
    private readonly equation;
    private readonly ranges;
    private a;
    private b;
    private readonly precision;
    constructor(equation: zeroFunction, ranges: [number, number][]);
    private randomPoint;
    private randomSignedPoint;
    private intialize;
    private iterate;
    private done;
    private assertRange;
    private run;
    exec(): number[];
}
//# sourceMappingURL=bisection.d.ts.map