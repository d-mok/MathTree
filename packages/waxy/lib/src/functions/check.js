"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIt = exports.check = void 0;
const util_1 = require("../util");
const assertion_1 = require("../assertion");
function getToTail(arr, index) {
    const n = arr.length - 1;
    const i = Math.min(index, n);
    return arr[i];
}
function e(f, argIndex, argValue, msg) {
    return (0, util_1.err)(f, 'arg[' + argIndex + '] = ' + (0, util_1.str)(argValue), 'violate: ' + msg);
}
function match(f, argIndex, argValue, rule) {
    const pass = (0, assertion_1.matchRule)(argValue, rule);
    if (pass !== true)
        throw e(f, argIndex, argValue, pass);
}
function check(f, rules) {
    (0, util_1.brand)(f);
    const nf = (...args) => {
        args.forEach((v, i) => match(f, i, v, getToTail(rules, i)));
        return f(...args);
    };
    (0, util_1.transferBrand)(f, nf);
    return nf;
}
exports.check = check;
function checkIt(...rules) {
    return (0, util_1.makeStaticDecorator)($ => check($, rules));
}
exports.checkIt = checkIt;
//# sourceMappingURL=check.js.map