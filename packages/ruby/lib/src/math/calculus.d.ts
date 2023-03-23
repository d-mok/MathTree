type point = [number, number];
type Fn1D = (_: number) => number;
export declare function functionize(sortedPts: point[]): Fn1D;
export declare function differentiate(fn: Fn1D): Fn1D;
export declare function integrate(fn: Fn1D, fixPoint?: number[]): Fn1D;
export {};
//# sourceMappingURL=calculus.d.ts.map