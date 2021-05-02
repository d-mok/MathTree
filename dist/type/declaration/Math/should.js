"use strict";
var SHOULD_LOG = false;
globalThis.SHOULD_LOG = SHOULD_LOG;
class CustomErrorCls extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}
function CustomError(name, message) {
    return new CustomErrorCls(name, message);
}
globalThis.CustomError = CustomError;
function MathError(message) {
    return new CustomErrorCls('MathError', message);
}
globalThis.MathError = MathError;
function Should(condition, msg = "Should condition failed!") {
    if (!condition) {
        let caller = (new Error()).stack.split("\n")[2].trim().split(" ")[1];
        // let caller = 'function'
        caller = caller !== null && caller !== void 0 ? caller : 'Anonymous ';
        throw MathError(caller + ': ' + msg);
    }
}
globalThis.Should = Should;
