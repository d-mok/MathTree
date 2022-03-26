declare class BlacksmithBase {
    private sfrs;
    add<T>(pattern: string, checker: ($: any) => $ is T, transformer: ($: T) => string): void;
    protected transform(pattern: string, val: unknown): string | undefined;
    protected allPatterns(): string[];
}
export declare class BlacksmithForge extends BlacksmithBase {
    private forgePatterns;
    /** Set patterns for forge. Default to all patterns. */
    setForgePatterns(patterns?: string[]): void;
    quickForge(text: string, dict: {
        [symbol: string]: any;
    }): string;
}
declare class BlacksmithIntra extends BlacksmithForge {
    private intraPatterns;
    /** Set patterns for intra. Default to all patterns. */
    setIntraPatterns(patterns?: string[]): void;
    /** Intrapolate js *{...js...} or *\\{...js...\\} */
    private intraOne;
    /** Intrapolate js *{...js...} or *\\{...js...\\} */
    intra(text: string, context: object): string;
}
export declare class Blacksmith extends BlacksmithIntra {
}
export {};
//# sourceMappingURL=index.d.ts.map