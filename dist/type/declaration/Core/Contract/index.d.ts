declare class Contract<F extends func> {
    private host;
    private Err;
    constructor(host: F);
    private validateArg;
    private validateArgGrp;
    private validateReturn;
    private validateCatch;
    sign(arg?: rule[], ret?: rule): F;
    seal({ arg, args, ret }: {
        arg?: rule[];
        args?: argRule<F>;
        ret?: rule;
    }): F;
}
export declare function contract<F extends func>(f: F): Contract<F>;
export {};
