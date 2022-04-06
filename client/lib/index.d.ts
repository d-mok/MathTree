import { Seed } from './type';
export declare abstract class SeedArray extends Array<Seed> {
    protected abstract SUPABASE_URL: string;
    protected abstract SUPABASE_ANON_KEY: string;
    private fetchAPI;
    refreshByIds(ids: string[]): Promise<void>;
    replaceById(index: number, id: string): Promise<void>;
    growAll(): void;
    growFirst(): void;
    tick(): void;
    /**
     * Cycle the order of elements in-place by `n` steps.
     * @param n - number to step to cycle
     * ```
     * [1,2,3,4,5].cycle(2) // [3,4,5,1,2]
     * [1,2,3,4,5].cycle(-2) // [4,5,1,2,3]
     * ```
     */
    cycle(n: number): void;
    /**
     * Shuffle this array in-place.
     * ```
     * [1,2,3].shuffle() //-> [2,1,3] or [3,1,2] or ...
     * ```
     */
    shuffle(): void;
    clear(): void;
}
//# sourceMappingURL=index.d.ts.map