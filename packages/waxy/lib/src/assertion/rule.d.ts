declare type ruleOne = (_: any) => boolean;
declare type ruleAnd = ruleOne[];
declare type ruleObj = {
    [_: string]: ruleOne;
};
export declare type rule = ruleOne | ruleAnd | ruleObj;
export declare function matchRule(val: any, rule: rule): true | string;
export {};
//# sourceMappingURL=rule.d.ts.map