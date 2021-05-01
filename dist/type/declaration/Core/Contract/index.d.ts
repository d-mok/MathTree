declare type func = (...args: any[]) => any;
declare type relation<F extends func> = (...args: Parameters<F>) => boolean;
declare type relationship<F extends func> = relation<F> | relation<F>[];
declare class Contract<F extends (...args: any[]) => any> {
    private host;
    private Err;
    constructor(host: F);
    private validateArg;
    private validateArgGrp;
    private validateReturn;
    private validateCatch;
    sign(arg: rule[], ret?: rule): F;
    seal({ arg, args, ret }: {
        arg?: rule[];
        args?: relationship<F>;
        ret?: rule;
    }): F;
}
export declare function contract<F extends func>(f: F): Contract<F>;
export {};
