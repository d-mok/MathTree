import { err, join, brand, transferBrand, makeStaticDecorator, } from '../util.js';
import { matchTreaty } from '../assertion/index.js';
function e(f, vals, msg) {
    return err(f, 'args = (' + join(vals) + ')', 'violate: ' + msg);
}
function match(f, vals, treaty) {
    const pass = matchTreaty(vals, treaty);
    if (pass !== true)
        throw e(f, vals, pass);
}
export function inspect(f, treaty) {
    brand(f);
    const nf = (...args) => {
        match(f, args, treaty);
        return f(...args);
    };
    transferBrand(f, nf);
    return nf;
}
export function inspectIt(treaty) {
    return makeStaticDecorator($ => inspect($, treaty));
}
//# sourceMappingURL=inspect.js.map