"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchTreaty = void 0;
function nameOf(f) {
    return f.name ?? f.toString();
}
function matchOne(vals, treaty) {
    return treaty(...vals) ? true : nameOf(treaty);
}
function matchAnd(vals, treaty) {
    for (let p of treaty)
        if (!p(...vals))
            return nameOf(p);
    return true;
}
function isOne(treaty) {
    return typeof treaty === 'function';
}
function isAnd(treaty) {
    return Array.isArray(treaty);
}
function matchTreaty(vals, treaty) {
    if (isOne(treaty))
        return matchOne(vals, treaty);
    if (isAnd(treaty))
        return matchAnd(vals, treaty);
    return 'fail to recognize the rule';
}
exports.matchTreaty = matchTreaty;
//# sourceMappingURL=treaty.js.map