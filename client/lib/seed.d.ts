import { Fruit } from './MathSoil';
export declare class SeedRow {
    id: string;
    bank: string;
    folder: string;
    master: string;
    qn: string;
    sol: string;
    slot: string;
    populate: string;
    validate: string;
    preprocess: string;
    postprocess: string;
    inject: string;
}
export declare class Seed extends SeedRow {
    fruit: Fruit;
    constructor(row: SeedRow);
    private getGene;
    grow(): void;
}
//# sourceMappingURL=seed.d.ts.map