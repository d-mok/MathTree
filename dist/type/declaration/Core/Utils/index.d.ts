export declare function Clone<T>(object: T): T;
export declare class List<T> extends Array<T> {
    private key;
    constructor(arr: T[]);
    isDistinct(): boolean;
    distinctLength(): number;
    distinct(): T[];
    pairs(): [T, T][];
    pluck(index: keyof T): any[];
}
