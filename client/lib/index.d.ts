import { Seed } from './seed';
import { Fruit } from './MathSoil';
export declare abstract class SeedArray extends Array<Seed> {
    protected abstract SUPABASE_URL: string;
    protected abstract SUPABASE_ANON_KEY: string;
    private fetchAPI;
    refreshByIds(ids: string[]): Promise<void>;
    replaceById(index: number, id: string): Promise<void>;
    ids(): string[];
    fruits(): Fruit[];
    growAll(): void;
    growFirst(): void;
    tick(): void;
    cycle(): void;
    shuffle(): void;
    clear(): void;
}
//# sourceMappingURL=index.d.ts.map