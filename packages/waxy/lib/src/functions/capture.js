"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureAll = exports.captureIt = exports.capture = void 0;
const util_1 = require("../util");
function catchString(f, vals, e) {
    return (0, util_1.err)(f, 'args = (' + (0, util_1.join)(vals) + ')', 'throw: ' + e);
}
function catchErrObj(f, vals, e) {
    return (0, util_1.err)(f, 'args = (' + (0, util_1.join)(vals) + ')', 'throw: ' + e.name, 'message: ' + e.message);
}
function catchAny(f, vals, e) {
    return (0, util_1.err)(f, 'args = (' + (0, util_1.join)(vals) + ')', 'throw: ' + (0, util_1.str)(e));
}
function isError(e) {
    return typeof e === 'object' && e !== null && 'name' in e && 'message' in e;
}
function isContractError(e) {
    return isError(e) && e.name === 'ContractError';
}
function catchErr(f, vals, e) {
    if (isContractError(e))
        return e;
    if (typeof e === 'string')
        return catchString(f, vals, e);
    if (isError(e))
        return catchErrObj(f, vals, e);
    return catchAny(f, vals, e);
}
function capture(f) {
    (0, util_1.brand)(f);
    const nf = (...args) => {
        try {
            return f(...args);
        }
        catch (e) {
            throw catchErr(f, args, e);
        }
    };
    (0, util_1.transferBrand)(f, nf);
    return nf;
}
exports.capture = capture;
function captureIt() {
    return (0, util_1.makeStaticDecorator)($ => capture($));
}
exports.captureIt = captureIt;
function captureAll() {
    return function (constructor) {
        for (let key of (0, util_1.getClassStaticNames)(constructor)) {
            let descriptor = Object.getOwnPropertyDescriptor(constructor, key);
            if (descriptor !== undefined) {
                descriptor.value = capture(descriptor.value);
                Object.defineProperty(constructor, key, descriptor);
            }
        }
    };
}
exports.captureAll = captureAll;
//# sourceMappingURL=capture.js.map