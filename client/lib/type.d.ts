declare global {
    var MathSoil2: {
        reap(gene: Gene): RawFruit;
        inspect(gene: Gene, repeat: number): Inspection;
    };
}
declare type RawFruit = {
    readonly qn: string;
    readonly sol: string;
    readonly ans: string;
    readonly counter: number;
    readonly success: boolean;
    readonly logs: string[];
    readonly time: number;
};
declare class Fruit implements RawFruit {
    readonly qn: string;
    readonly sol: string;
    readonly ans: string;
    readonly counter: number;
    readonly success: boolean;
    readonly logs: string[];
    readonly time: number;
    readonly key: number;
    readonly id: string;
    constructor(id?: string, rawFruit?: RawFruit);
}
declare type Inspection = {
    readonly counter: number;
    readonly success: boolean;
    readonly logs: string[];
    readonly time: number;
};
declare type Gene = {
    readonly qn: string;
    readonly sol: string;
    readonly populate: string;
    readonly validate: string;
    readonly preprocess: string;
    readonly postprocess: string;
};
export declare type SeedFetch = {
    readonly id: string;
    readonly bank: string;
    readonly folder: string;
    readonly gene: Gene;
};
export declare class Seed implements SeedFetch {
    id: string;
    bank: string;
    folder: string;
    gene: Gene;
    fruit: Fruit;
    constructor(seedFetch: SeedFetch);
    grow(): void;
}
export {};
//# sourceMappingURL=type.d.ts.map