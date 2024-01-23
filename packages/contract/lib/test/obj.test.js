import { capture, accept, check, inspect } from '../src/index.js';
import { positive, negative, isDistinct } from './base.js';
import { test, expect } from 'vitest';
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
add = inspect(add, function distinct($) {
    return isDistinct([$.a, $.b, $.c]);
});
let h = 'add({ a, b, c = 0 })\n';
test('normal', () => {
    expect(add({ a: 10, b: -1, c: -4 })).toBe(5);
});
test.each([
    {
        a: -5,
        b: 1,
        c: 2,
        msg: 'arg[0] = {"a":-5,"b":1,"c":2}\nviolate: a -> positive',
    },
    {
        a: 3,
        b: 1,
        c: 2,
        msg: 'arg[0] = {"a":3,"b":1,"c":2}\nviolate: b -> negative',
    },
    {
        a: 3,
        b: -1,
        c: -1,
        msg: 'args = ({"a":3,"b":-1,"c":-1})\nviolate: distinct',
    },
    {
        a: 3,
        b: -1,
        c: -4,
        msg: 'args = ({"a":3,"b":-1,"c":-4})\nreturn = -2\nviolate: positive',
    },
    {
        a: 999,
        b: -1,
        c: -2,
        msg: 'args = ({"a":999,"b":-1,"c":-2})\nthrow: Error\nmessage: a is too large!',
    },
    {
        a: 99,
        b: -1,
        c: -2,
        msg: 'args = ({"a":99,"b":-1,"c":-2})\nthrow: a is too large!',
    },
])('throwing', ({ a, b, c, msg }) => {
    expect(() => add({ a, b, c })).toThrowWithMessage(Error, h + msg);
});
//# sourceMappingURL=obj.test.js.map