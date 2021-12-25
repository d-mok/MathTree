export function positive($) {
    return $ > 0;
}
export function negative($) {
    return $ < 0;
}
export function isDistinct($) {
    let [a, b, c] = $;
    return a !== b && b !== c && a !== c;
}
export function makeAdd() {
    return function add(a, b, c = 0) {
        if (a > 100)
            throw Error('a is too large!');
        if (a > 90)
            throw 'a is too large!';
        return a + b + c;
    };
}
//# sourceMappingURL=base.js.map