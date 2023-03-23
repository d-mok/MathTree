export type Predicate<T> = (_: T) => boolean;
export type Criteria<T> = {
    [K in keyof T]?: T[K] | T[K][];
};
export type Ordering<T> = (strKeyOf<T> | {
    [K in keyof T]?: T[K][] | readonly T[K][] | true | false;
})[];
export type strKeyOf<T> = string & (keyof T);
export type Mapper<T, S> = (_: T) => S;
export type Metric<T> = (_: T) => number;
//# sourceMappingURL=types.d.ts.map