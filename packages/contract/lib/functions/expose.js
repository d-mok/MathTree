import { getClassStaticNames } from '../util';
export function expose(name, f) {
    // @ts-ignore
    globalThis[String(name)] = f;
}
export function exposeIt() {
    return function (target, key, descriptor) {
        expose(key, descriptor.value);
        return descriptor;
    };
}
export function exposeAll() {
    return function (constructor) {
        for (let key of getClassStaticNames(constructor)) {
            let descriptor = Object.getOwnPropertyDescriptor(constructor, key);
            if (descriptor !== undefined) {
                expose(key, descriptor.value);
            }
        }
    };
}
//# sourceMappingURL=expose.js.map