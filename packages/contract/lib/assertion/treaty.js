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
export function matchTreaty(vals, treaty) {
    if (isOne(treaty))
        return matchOne(vals, treaty);
    if (isAnd(treaty))
        return matchAnd(vals, treaty);
    return 'fail to recognize the rule';
}
//# sourceMappingURL=treaty.js.map