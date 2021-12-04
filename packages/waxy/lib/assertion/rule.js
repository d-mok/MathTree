"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchRule = void 0;
function nameOf(f) {
    return f.name ?? f.toString();
}
function matchOne(val, rule) {
    return rule(val) ? true : nameOf(rule);
}
function matchAnd(val, rule) {
    for (let p of rule)
        if (!p(val))
            return nameOf(p);
    return true;
}
function matchObj(val, rule) {
    for (let k in rule) {
        const has = k in val;
        if (!has)
            return 'should have property: ' + k;
        const p = rule[k];
        const pass = p(val[k]);
        if (!pass)
            return k + ' -> ' + nameOf(p);
    }
    return true;
}
function isOne(rule) {
    return typeof rule === 'function';
}
function isAnd(rule) {
    return Array.isArray(rule);
}
function isObj(rule) {
    return typeof rule === 'object' &&
        !Array.isArray(rule) &&
        rule !== null;
}
function matchRule(val, rule) {
    if (isOne(rule))
        return matchOne(val, rule);
    if (isAnd(rule))
        return matchAnd(val, rule);
    if (isObj(rule))
        return matchObj(val, rule);
    return 'fail to recognize the rule';
}
exports.matchRule = matchRule;
//# sourceMappingURL=rule.js.map