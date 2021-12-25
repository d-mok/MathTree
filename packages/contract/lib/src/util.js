function error(msg) {
    const e = new Error(msg);
    e.name = 'ContractError';
    return e;
}
export function signature(f) {
    const s = f.toString();
    return s.slice(s.indexOf('(') + 1, s.indexOf(')'));
}
export function str(obj) {
    return JSON.stringify(obj);
}
export function join(arr) {
    return arr.map(str).join(',');
}
export function err(f, ...msgs) {
    const h = `${f.wax_name}(${f.wax_signature})`;
    const ms = [h, ...msgs];
    return error(ms.join('\n'));
}
export function brand(f) {
    if (!('wax_name' in f))
        f.wax_name = f.name ?? f.toString();
    if (!('wax_signature' in f))
        f.wax_signature = signature(f);
}
export function transferBrand(source, target) {
    target.wax_name = source.wax_name;
    target.wax_signature = source.wax_signature;
}
export function makeStaticDecorator(transform) {
    return function (target, key, descriptor) {
        descriptor.value = transform(descriptor.value);
        return descriptor;
    };
}
export function makeClassDecorator(transform) {
    return function (target, key, descriptor) {
        descriptor.value = transform(descriptor.value);
        return descriptor;
    };
}
export function getClassStaticNames(constructor) {
    return Object.getOwnPropertyNames(constructor)
        .filter($ => $ !== 'length' && $ !== 'prototype' && $ !== 'name');
}
//# sourceMappingURL=util.js.map