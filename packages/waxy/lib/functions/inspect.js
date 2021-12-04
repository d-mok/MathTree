"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspectIt = exports.inspect = void 0;
const util_1 = require("../util");
const assertion_1 = require("../assertion");
function e(f, vals, msg) {
    return (0, util_1.err)(f, 'args = (' + (0, util_1.join)(vals) + ')', 'violate: ' + msg);
}
function match(f, vals, treaty) {
    const pass = (0, assertion_1.matchTreaty)(vals, treaty);
    if (pass !== true)
        throw e(f, vals, pass);
}
function inspect(f, treaty) {
    (0, util_1.brand)(f);
    const nf = (...args) => {
        match(f, args, treaty);
        return f(...args);
    };
    (0, util_1.transferBrand)(f, nf);
    return nf;
}
exports.inspect = inspect;
function inspectIt(treaty) {
    return (0, util_1.makeStaticDecorator)($ => inspect($, treaty));
}
exports.inspectIt = inspectIt;
//# sourceMappingURL=inspect.js.map