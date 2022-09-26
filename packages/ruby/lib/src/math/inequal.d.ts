export declare type Ineq = '\\ge' | '\\gt' | '\\le' | '\\lt' | '>=' | '<=' | '>' | '<' | [greater: boolean, equal: boolean];
/**
 * Check if me is > or >=.
 */
export declare function greaterThan(ineq: Ineq): boolean;
/**
 * Check if me allow equal.
 */
export declare function canEqual(ineq: Ineq): boolean;
/**
 * Return me, as string.
 */
export declare function print(ineq: Ineq): string & Ineq;
/**
 * Return the strict version of me, as `Ineq`.
 */
export declare function strict(ineq: Ineq): Ineq;
/**
 * Return the loose version of me, as `Ineq`.
 */
export declare function loose(ineq: Ineq): Ineq;
/**
 * Return the flip version of me, as `Ineq`.
 */
export declare function flip(ineq: Ineq): Ineq;
/**
 * Check if `a` and `b` satisfy my comparison.
 */
export declare function compare(a: number, ineq: Ineq, b: number): boolean;
//# sourceMappingURL=inequal.d.ts.map