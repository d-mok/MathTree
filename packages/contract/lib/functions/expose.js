"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exposeAll = exports.exposeIt = exports.expose = void 0;
const util_1 = require("../util");
function expose(name, f) {
    // @ts-ignore
    globalThis[String(name)] = f;
}
exports.expose = expose;
function exposeIt() {
    return function (target, key, descriptor) {
        expose(key, descriptor.value);
        return descriptor;
    };
}
exports.exposeIt = exposeIt;
function exposeAll() {
    return function (constructor) {
        for (let key of (0, util_1.getClassStaticNames)(constructor)) {
            let descriptor = Object.getOwnPropertyDescriptor(constructor, key);
            if (descriptor !== undefined) {
                expose(key, descriptor.value);
            }
        }
    };
}
exports.exposeAll = exposeAll;
//# sourceMappingURL=expose.js.map