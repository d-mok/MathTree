export declare function contract<F extends Function>(f: F): {
    sign(argsRules: (predicate | rule)[], returnRule: predicate | rule): F;
};
