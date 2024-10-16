var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { checkIt, inspectIt, acceptIt, captureAll } from '../src/index.js';
import { positive, negative, isDistinct } from './base.js';
import { test, expect } from 'vitest';
let Host = class Host {
    static add(a, b, c = 0) {
        if (a > 100)
            throw Error('a is too large!');
        if (a > 90)
            throw 'a is too large!';
        return a + b + c;
    }
};
__decorate([
    checkIt(positive, negative),
    acceptIt(positive),
    inspectIt(function distinct(a, b, c) {
        return isDistinct([a, b, c]);
    })
], Host, "add", null);
Host = __decorate([
    captureAll()
], Host);
let add = Host.add;
let h = 'add(a, b, c = 0)\n';
test('normal', () => {
    expect(add(10, -1, -4)).toBe(5);
});
test.each([
    { a: -5, b: 1, c: 2, msg: 'arg[0] = -5\nviolate: positive' },
    { a: 3, b: 1, c: 2, msg: 'arg[1] = 1\nviolate: negative' },
    { a: 3, b: -1, c: 2, msg: 'arg[2] = 2\nviolate: negative' },
    { a: 3, b: -1, c: -1, msg: 'args = (3,-1,-1)\nviolate: distinct' },
    {
        a: 3,
        b: -1,
        c: -4,
        msg: 'args = (3,-1,-4)\nreturn = -2\nviolate: positive',
    },
    {
        a: 999,
        b: -1,
        c: -2,
        msg: 'args = (999,-1,-2)\nthrow: Error\nmessage: a is too large!',
    },
    {
        a: 99,
        b: -1,
        c: -2,
        msg: 'args = (99,-1,-2)\nthrow: a is too large!',
    },
])('throwing', ({ a, b, c, msg }) => {
    expect(() => add(a, b, c)).toThrowWithMessage(Error, h + msg);
});
//# sourceMappingURL=decoratorAll.test.js.map