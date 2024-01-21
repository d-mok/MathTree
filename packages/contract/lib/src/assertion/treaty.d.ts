type anyFunc = (...args: any[]) => any;
type treatyOne<F extends func = anyFunc> = (...args: Parameters<F>) => boolean;
type treatyAnd<F extends func = anyFunc> = treatyOne<F>[];
export type treaty<F extends func = anyFunc> = treatyOne<F> | treatyAnd<F>;
export declare function matchTreaty(vals: any[], treaty: treaty): true | string;
export {};
//# sourceMappingURL=treaty.d.ts.map