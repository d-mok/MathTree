declare type anyFunc = (...args: any[]) => any;
declare type treatyOne<F extends func = anyFunc> = (...args: Parameters<F>) => boolean;
declare type treatyAnd<F extends func = anyFunc> = treatyOne<F>[];
export declare type treaty<F extends func = anyFunc> = treatyOne<F> | treatyAnd<F>;
export declare function matchTreaty(vals: any[], treaty: treaty): true | string;
export {};
//# sourceMappingURL=treaty.d.ts.map