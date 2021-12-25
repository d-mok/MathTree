/**
 * Get the ordered list of function in the sequential step when solving for these symbols under the given tree.
 */
export declare function solutionFlow(fs: zeroFunction[], tree: tree, unknownSymbols: string[]): zeroFunction[];
/**
 * Which symbol is solved using this function under the given tree?
 */
export declare function solvingSymbol(f: zeroFunction, tree: tree): string | undefined;
/**
 * Read basic info of a tree.
 */
export declare function readTree(tree: tree): {
    maxOrder: number;
    givens: string[];
    tops: string[];
    steps: string[];
    solved: string[];
};
//# sourceMappingURL=reader.d.ts.map