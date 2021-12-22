import { err, str, brand, transferBrand, makeStaticDecorator } from '../util';
import { matchRule } from '../assertion';
function getToTail(arr, index) {
    const n = arr.length - 1;
    const i = Math.min(index, n);
    return arr[i];
}
function e(f, argIndex, argValue, msg) {
    return err(f, 'arg[' + argIndex + '] = ' + str(argValue), 'violate: ' + msg);
}
function match(f, argIndex, argValue, rule) {
    const pass = matchRule(argValue, rule);
    if (pass !== true)
        throw e(f, argIndex, argValue, pass);
}
export function check(f, rules) {
    brand(f);
    const nf = (...args) => {
        args.forEach((v, i) => match(f, i, v, getToTail(rules, i)));
        return f(...args);
    };
    transferBrand(f, nf);
    return nf;
}
export function checkIt(...rules) {
    return makeStaticDecorator($ => check($, rules));
}
//# sourceMappingURL=check.js.map