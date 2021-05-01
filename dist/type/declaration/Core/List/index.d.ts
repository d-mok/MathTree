export declare function Clone<T>(object: T): T;
declare class ListCls<T> extends Array<T> {
    private key;
    constructor(arr: T[], keyFunc?: (_: T) => any);
    isDistinct(): boolean;
    distinctLength(): number;
    distinct(): T[];
    pairs(): [T, T][];
    pairsEvery(relation: (a: T, b: T) => boolean): boolean;
    pluck(index: keyof T): any[];
}
declare type alias<T> = ListCls<T>;
declare global {
    type List<T> = alias<T>;
    var List: <T>(arr: T[], keyFunc?: (_: T) => any) => ListCls<T>;
}
export {};
