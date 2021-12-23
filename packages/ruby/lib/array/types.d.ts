export declare type Predicate<T> = (_: T) => boolean;
export declare type Criteria<T> = {
    [K in keyof T]?: T[K] | T[K][];
};
export declare type Ordering<T> = (strKeyOf<T> | {
    [K in keyof T]?: T[K][] | readonly T[K][] | true | false;
})[];
export declare type strKeyOf<T> = string & (keyof T);
export declare type Mapper<T, S> = (_: T) => S;
export declare type Metric<T> = (_: T) => number;
//# sourceMappingURL=types.d.ts.map