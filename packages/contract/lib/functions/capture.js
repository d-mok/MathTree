import { err, join, str, brand, transferBrand, makeStaticDecorator, getClassStaticNames } from '../util';
function catchString(f, vals, e) {
    return err(f, 'args = (' + join(vals) + ')', 'throw: ' + e);
}
function catchErrObj(f, vals, e) {
    return err(f, 'args = (' + join(vals) + ')', 'throw: ' + e.name, 'message: ' + e.message);
}
function catchAny(f, vals, e) {
    return err(f, 'args = (' + join(vals) + ')', 'throw: ' + str(e));
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
export function capture(f) {
    brand(f);
    const nf = (...args) => {
        try {
            return f(...args);
        }
        catch (e) {
            throw catchErr(f, args, e);
        }
    };
    transferBrand(f, nf);
    return nf;
}
export function captureIt() {
    return makeStaticDecorator($ => capture($));
}
export function captureAll() {
    return function (constructor) {
        for (let key of getClassStaticNames(constructor)) {
            let descriptor = Object.getOwnPropertyDescriptor(constructor, key);
            if (descriptor !== undefined) {
                descriptor.value = capture(descriptor.value);
                Object.defineProperty(constructor, key, descriptor);
            }
        }
    };
}
//# sourceMappingURL=capture.js.map