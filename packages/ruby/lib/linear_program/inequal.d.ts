export declare type Ineq = '\\ge' | '\\gt' | '\\le' | '\\lt' | '>=' | '<=' | '>' | '<';
declare class InequalSign {
    private code;
    constructor(sign: Ineq);
    /**
     * Check if me is > or >=.
     */
    greaterThan(): boolean;
    /**
     * Check if me is < or <=.
     */
    lessThan(): boolean;
    /**
     * Check if me allow equal.
     */
    canEqual(): boolean;
    /**
     * Return me, as `Ineq`.
     */
    print(): Ineq;
    /**
     * Return the strict version of me, as `Ineq`.
     */
    strict(): Ineq;
    /**
     * Return the loose version of me, as `Ineq`.
     */
    loose(): Ineq;
    /**
     * Return the flip version of me, as `Ineq`.
     */
    flip(): Ineq;
    /**
     * Check if `a` and `b` satisfy my comparison.
     */
    compare(a: number, b: number): boolean;
}
/**
 * Return an `InequalSign` instance.
 */
export declare function ineq(sign: Ineq): InequalSign;
export {};
//# sourceMappingURL=inequal.d.ts.map