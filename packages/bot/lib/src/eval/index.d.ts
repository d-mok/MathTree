/** Run the code under contexts.
 * The contexts can be mutated in-place.
 * Return all top level variables declared.
 */
export declare function evalCtx(code: string, ...contexts: object[]): object;
/** Evaluate one expression under contexts. The contexts can be mutated in-place. */
export declare function exprCtx(code: string, ...contexts: object[]): any;
/** Evaluate one expression under contexts. The code is HTML decoded first. */
export declare function exprCtxHTML(code: string, ...contexts: object[]): any;
//# sourceMappingURL=index.d.ts.map