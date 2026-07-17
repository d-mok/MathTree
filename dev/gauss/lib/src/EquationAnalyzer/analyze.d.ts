declare type TREE = Record<string, {
    variable: string;
    order: number;
    isGiven: boolean;
    solvedBy: zeroFunction | null;
    deps: string[];
    isTop: boolean;
}>;
/**
 * Get all the healthy trees of this system generated from all possible 'given variables' combinations.
 */
export declare function analyze2(fs: zeroFunction[]): TREE[];
/**
 * Get all the healthy trees of this system generated from all possible 'given variables' combinations.
 */
export declare function analyze(fs: zeroFunction[]): tree[];
export {};
//# sourceMappingURL=analyze.d.ts.map