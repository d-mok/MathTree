define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('sigfig', () => {
        const cases = [
            [1, 1],
            [12, 2],
            [123, 3],
            [123.4, 4],
            [123.45, 5],
            [123.456, 6],
            [0.123, 3],
            [0.00123, 3],
            [0.00001230123, 7],
            [10, 1],
            [1200, 2],
            [1200.0001, 8],
            [1200.0001000, 8],
            [-1200.0001, 8],
            [0.81 - 1, 17],
            [Math.pow(1.1, 2), 17], //1.2100000000000002
        ];
        it.each(cases)('sigfig(%p)', (num, expected) => {
            expect(ant.sigfig(num)).toBe(expected);
        });
    });
    describe('dp', () => {
        const cases = [
            [1, 0],
            [12, 0],
            [123, 0],
            [123.4, 1],
            [123.45, 2],
            [123.456, 3],
            [0.123, 3],
            [0.00123, 5],
            [0.00001230123, 11],
            [10, 0],
            [1200, 0],
            [1200.0001, 4],
            [1200.0001000, 4],
            [-1200.0001, 4],
            [0.81 - 1, 17],
            [Math.pow(1.1, 2), 16], //1.2100000000000002
        ];
        it.each(cases)('dp(%p)', (num, expected) => {
            expect(ant.dp(num)).toBe(expected);
        });
    });
    describe('e', () => {
        const cases = [
            [1, 0],
            [1.001, 0],
            [0.999, -1],
            [10, 1],
            [10.01, 1],
            [9.999, 0],
            [0.1, -1],
            [0.10001, -1],
            [0.09999, -2],
            [-1.001, 0],
            [-0.999, -1],
        ];
        it.each(cases)('e(%p)', (num, expected) => {
            expect(ant.e(num)).toBe(expected);
        });
    });
    describe('mantissa', () => {
        const cases = [
            [1.234, 1.234],
            [1234, 1.234],
            [0.1234, 1.234],
            [0, 0],
            [-0.1234, -1.234],
        ];
        it.each(cases)('mantissa(%p)', (num, expected) => {
            expect(ant.mantissa(num)).toBe(expected);
        });
    });
    describe('logCeil logFloor', () => {
        const cases = [
            [5, 10, 1],
            [23, 100, 10],
            [0.456, 1, 0.1],
            [0.00235, 0.01, 0.001],
        ];
        it.each(cases)('logCeil logFloor(%p)', (num, ceil, floor) => {
            expect(ant.logCeil(num)).toBe(ceil);
            expect(ant.logFloor(num)).toBe(floor);
        });
    });
});
