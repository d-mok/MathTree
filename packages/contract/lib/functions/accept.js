"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptIt = exports.accept = void 0;
const util_1 = require("../util");
const assertion_1 = require("../assertion");
function e(f, argValues, returnValue, msg) {
    return (0, util_1.err)(f, 'args = (' + (0, util_1.join)(argValues) + ')', 'return = ' + returnValue, 'violate: ' + msg);
}
function match(f, argValues, returnValue, rule) {
    const pass = (0, assertion_1.matchRule)(returnValue, rule);
    if (pass !== true)
        throw e(f, argValues, returnValue, pass);
}
function accept(f, rule) {
    (0, util_1.brand)(f);
    const nf = (...args) => {
        const result = f(...args);
        match(f, args, result, rule);
        return result;
    };
    (0, util_1.transferBrand)(f, nf);
    return nf;
}
exports.accept = accept;
function acceptIt(rule) {
    return (0, util_1.makeStaticDecorator)($ => accept($, rule));
}
exports.acceptIt = acceptIt;
//# sourceMappingURL=accept.js.map