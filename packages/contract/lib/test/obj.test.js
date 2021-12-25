var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { capture, accept, check, inspect } from '../src/index';
import { positive, negative, isDistinct } from './base';
import 'jest-extended';
import { suite, test, params } from "@testdeck/jest";
let add = function ({ a, b, c = 0 }) {
    if (a > 100)
        throw Error('a is too large!');
    if (a > 90)
        throw 'a is too large!';
    return a + b + c;
};
add = capture(add);
add = accept(add, positive);
add = check(add, [{ a: positive, b: negative }]);
add = inspect(add, function distinct($) { return isDistinct([$.a, $.b, $.c]); });
let h = 'add({ a, b, c = 0 })\n';
let obj = class obj {
    normal() {
        expect(add({ a: 10, b: -1, c: -4 })).toBe(5);
    }
    throwing({ a, b, c, msg }) {
        expect(() => add({ a, b, c })).toThrowWithMessage(Error, h + msg);
    }
};
__decorate([
    test
], obj.prototype, "normal", null);
__decorate([
    params({ a: -5, b: 1, c: 2, msg: 'arg[0] = {"a":-5,"b":1,"c":2}\nviolate: a -> positive' }),
    params({ a: 3, b: 1, c: 2, msg: 'arg[0] = {"a":3,"b":1,"c":2}\nviolate: b -> negative' }),
    params({ a: 3, b: -1, c: -1, msg: 'args = ({"a":3,"b":-1,"c":-1})\nviolate: distinct' }),
    params({ a: 3, b: -1, c: -4, msg: 'args = ({"a":3,"b":-1,"c":-4})\nreturn = -2\nviolate: positive' }),
    params({ a: 999, b: -1, c: -2, msg: 'args = ({"a":999,"b":-1,"c":-2})\nthrow: Error\nmessage: a is too large!' }),
    params({ a: 99, b: -1, c: -2, msg: 'args = ({"a":99,"b":-1,"c":-2})\nthrow: a is too large!' })
], obj.prototype, "throwing", null);
obj = __decorate([
    suite
], obj);
//# sourceMappingURL=obj.test.js.map