declare global {
    var MathSoil2: {
        reap(gene: Gene): RawFruit;
        inspect(gene: Gene, repeat: number): Inspection;
    };
}
type Gene = {
    readonly qn: string;
    readonly sol: string;
    readonly populate: string;
    readonly validate: string;
    readonly preprocess: string;
    readonly postprocess: string;
};
type Inspection = {
    readonly counter: number;
    readonly success: boolean;
    readonly logs: string[];
    readonly time: number;
};
declare class RawFruit {
    readonly qn: string;
    readonly sol: string;
    readonly ans: string;
    readonly counter: number;
    readonly success: boolean;
    readonly logs: string[];
    readonly time: number;
}
export declare class Fruit extends RawFruit {
    readonly key: number;
    readonly id: string;
    constructor(id?: string, rawFruit?: RawFruit);
}
export declare function reap(id: string, gene: Gene): Fruit;
export {};
//# sourceMappingURL=MathSoil.d.ts.map