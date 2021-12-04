"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassStaticNames = exports.makeClassDecorator = exports.makeStaticDecorator = exports.transferBrand = exports.brand = exports.err = exports.join = exports.str = exports.signature = void 0;
function error(msg) {
    const e = new Error(msg);
    e.name = 'ContractError';
    return e;
}
function signature(f) {
    const s = f.toString();
    return s.slice(s.indexOf('(') + 1, s.indexOf(')'));
}
exports.signature = signature;
function str(obj) {
    return JSON.stringify(obj);
}
exports.str = str;
function join(arr) {
    return arr.map(str).join(',');
}
exports.join = join;
function err(f, ...msgs) {
    const h = `${f.wax_name}(${f.wax_signature})`;
    const ms = [h, ...msgs];
    return error(ms.join('\n'));
}
exports.err = err;
function brand(f) {
    if (!('wax_name' in f))
        f.wax_name = f.name ?? f.toString();
    if (!('wax_signature' in f))
        f.wax_signature = signature(f);
}
exports.brand = brand;
function transferBrand(source, target) {
    target.wax_name = source.wax_name;
    target.wax_signature = source.wax_signature;
}
exports.transferBrand = transferBrand;
function makeStaticDecorator(transform) {
    return function (target, key, descriptor) {
        descriptor.value = transform(descriptor.value);
        return descriptor;
    };
}
exports.makeStaticDecorator = makeStaticDecorator;
function makeClassDecorator(transform) {
    return function (target, key, descriptor) {
        descriptor.value = transform(descriptor.value);
        return descriptor;
    };
}
exports.makeClassDecorator = makeClassDecorator;
function getClassStaticNames(constructor) {
    return Object.getOwnPropertyNames(constructor)
        .filter($ => $ !== 'length' && $ !== 'prototype' && $ !== 'name');
}
exports.getClassStaticNames = getClassStaticNames;
//# sourceMappingURL=util.js.map