import { capture, accept, check, inspect } from '../src/index.js';
import { positive, negative, isDistinct, makeAdd } from './base.js';
import { test, expect } from 'vitest';
let add = makeAdd();
add = capture(add);
add = accept(add, positive);
add = check(add, [positive, negative]);
add = inspect(add, function distinct(a, b, c) {
    return isDistinct([a, b, c]);
});
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
//# sourceMappingURL=contract.test.js.map