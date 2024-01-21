type ruleOne = (_: any) => boolean;
type ruleAnd = ruleOne[];
type ruleObj = {
    [_: string]: ruleOne;
};
export type rule = ruleOne | ruleAnd | ruleObj;
export declare function matchRule(val: any, rule: rule): true | string;
export {};
//# sourceMappingURL=rule.d.ts.map