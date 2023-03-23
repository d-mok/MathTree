declare function combinations<T>(collection: T[], n: 2): [T, T][];
declare function combinations<T>(collection: T[], n: 3): [T, T, T][];
declare function uniqDeep<T>(array: T[]): T[];
declare function isUniq(array: any[]): boolean;
declare function isUniqDeep(array: any[]): boolean;
declare function count<T>(array: T[], item: T): number;
declare function cyclicAt<T>(array: T[], index: number): T | undefined;
declare module 'lodash' {
    interface LoDashStatic {
        combinations: typeof combinations;
        uniqDeep: typeof uniqDeep;
        isUniq: typeof isUniq;
        isUniqDeep: typeof isUniqDeep;
        count: typeof count;
        cyclicAt: typeof cyclicAt;
    }
}
export {};
//# sourceMappingURL=utils.d.ts.map