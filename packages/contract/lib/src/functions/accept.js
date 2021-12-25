import { err, join, brand, transferBrand, makeStaticDecorator } from '../util';
import { matchRule } from '../assertion';
function e(f, argValues, returnValue, msg) {
    return err(f, 'args = (' + join(argValues) + ')', 'return = ' + returnValue, 'violate: ' + msg);
}
function match(f, argValues, returnValue, rule) {
    const pass = matchRule(returnValue, rule);
    if (pass !== true)
        throw e(f, argValues, returnValue, pass);
}
export function accept(f, rule) {
    brand(f);
    const nf = (...args) => {
        const result = f(...args);
        match(f, args, result, rule);
        return result;
    };
    transferBrand(f, nf);
    return nf;
}
export function acceptIt(rule) {
    return makeStaticDecorator($ => accept($, rule));
}
//# sourceMappingURL=accept.js.map