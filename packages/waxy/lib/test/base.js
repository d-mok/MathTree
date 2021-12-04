"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAdd = exports.isDistinct = exports.negative = exports.positive = void 0;
function positive($) {
    return $ > 0;
}
exports.positive = positive;
function negative($) {
    return $ < 0;
}
exports.negative = negative;
function isDistinct($) {
    let [a, b, c] = $;
    return a !== b && b !== c && a !== c;
}
exports.isDistinct = isDistinct;
function makeAdd() {
    return function add(a, b, c = 0) {
        if (a > 100)
            throw Error('a is too large!');
        if (a > 90)
            throw 'a is too large!';
        return a + b + c;
    };
}
exports.makeAdd = makeAdd;
//# sourceMappingURL=base.js.map