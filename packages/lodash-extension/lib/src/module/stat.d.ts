declare function median(nums: number[]): number;
declare function mode(nums: number[]): number[];
declare function std(nums: number[]): number;
declare module 'lodash' {
    interface LoDashStatic {
        median: typeof median;
        mode: typeof mode;
        std: typeof std;
    }
}
export {};
//# sourceMappingURL=stat.d.ts.map