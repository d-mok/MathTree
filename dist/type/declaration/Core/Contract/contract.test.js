define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('contract', () => {
        let add = function (a, b, c = 0) {
            if (a > 100)
                throw Error('a is too large!');
            return a + b + c;
        };
        add = contract(add).seal({
            arg: [owl.positive, owl.negative],
            args: function distinct(a, b, c) { return owl.distinct([a, b, c]); },
            ret: owl.positive
        });
        let cases = [
            [-5, 1, 2, '(add) arg(a, b, c = 0)[0] = -5 violate: positive'],
            [3, 1, 2, '(add) arg(a, b, c = 0)[1] = 1 violate: negative'],
            [3, -1, 2, '(add) arg(a, b, c = 0)[2] = 2 violate: negative'],
            [3, -1, -1, '(add) arg(a, b, c = 0) = (3,-1,-1) violate: distinct'],
            [3, -1, -4, '(add) from arg(a, b, c = 0) = (3,-1,-4) => return = -2 violate: positive'],
            [999, -1, -2, '(add) from arg(a, b, c = 0) = (999,-1,-2) throw Error with message:\na is too large!']
        ];
        it.each(cases)('throw on invalid input or return', (a, b, c, msg) => {
            expect(() => add(Number(a), Number(b), Number(c))).toThrowWithMessage(Error, String(msg));
        });
        cases = [
            [10, -1, -4, 5],
        ];
        it.each(cases)('return when valid', (a, b, c, ans) => {
            expect(add(Number(a), Number(b), Number(c))).toBe(Number(ans));
        });
    });
});
