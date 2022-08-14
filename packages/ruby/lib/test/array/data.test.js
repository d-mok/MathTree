import { describe, expect, it } from 'vitest';
import { Data, data } from '../../src/array/data';
class SubData extends Data {
}
function it_preserve_original_data(func) {
    it('preserve original data', () => {
        let dt = data(2, 2, 3, 1, 1, 1);
        let clone = data(2, 2, 3, 1, 1, 1);
        func(dt);
        expect(dt).toStrictEqual(clone);
    });
}
function it_propagate_subclass_type(func) {
    it('propagate subclass type', () => {
        let dt = new SubData();
        dt.push(2, 2, 3, 1, 1, 1);
        expect(func(dt)).toBeInstanceOf(SubData);
    });
}
function it_propagate_empty_list(func) {
    it('propagate empty array', () => {
        let dt = data();
        expect(func(dt)).toStrictEqual(data());
    });
}
describe('median', () => {
    it('returns the median', () => {
        expect(data(1, 2, 3).median()).toBe(2);
        expect(data(1, 2, 4, 10).median()).toBe(3);
        expect(data(1, 10, 2, 4).median()).toBe(3);
        expect(data(1, 2, 4, 9, 10).median()).toBe(4);
    });
    it('returns NaN if empty', () => {
        expect(data().median()).toBeNaN();
    });
    it_preserve_original_data($ => $.median());
});
describe('modes', () => {
    it('returns the modes', () => {
        expect(data(1, 1, 2, 3, 3).modes())
            .toStrictEqual(data(1, 3));
        expect(data(3, 3, 2, 1, 1).modes())
            .toStrictEqual(data(3, 1));
        expect(data(1, 1, 2, 3).modes())
            .toStrictEqual(data(1));
        expect(data(1, 2, 3).modes())
            .toStrictEqual(data(1, 2, 3));
        expect(data().modes())
            .toStrictEqual(data());
        expect(data(1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5).modes(1))
            .toStrictEqual(data(1, 2));
        expect(data(1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5).modes(2))
            .toStrictEqual(data(3, 4));
    });
    it_preserve_original_data($ => $.modes());
    it_propagate_subclass_type($ => $.modes());
    it_propagate_empty_list($ => $.modes());
});
describe('mode', () => {
    it('returns the mode', () => {
        expect(data(1, 1, 2, 3).mode()).toBe(1);
        expect(data(1, 1, 2, 3, 4, 4, 4).mode()).toBe(4);
        expect(data(1, 1, 2, 3, 3).mode()).toBeNaN();
        expect(data(1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5).mode(2)).toBeNaN();
        expect(data(1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 5).mode(2)).toBe(1);
    });
    it('returns NaN if empty', () => {
        expect(data().mode()).toBeNaN();
    });
    it_preserve_original_data($ => $.median());
});
describe('isSingleMode', () => {
    it('check if is single moded', () => {
        expect(data(1, 1, 2, 3, 3).isSingleMode()).toBeFalse();
        expect(data(1, 1, 2, 3).isSingleMode()).toBeTrue();
        expect(data().isSingleMode()).toBeFalse();
    });
    it_preserve_original_data($ => $.median());
});
describe('lowerQuartile', () => {
    it('returns the lowerQuartile', () => {
        expect(data(1, 2, 3).lowerQuartile()).toBe(1);
        expect(data(1, 2, 3, 4).lowerQuartile()).toBe(1.5);
        expect(data(1, 2, 4, 10).lowerQuartile()).toBe(1.5);
        expect(data(1, 10, 2, 4).lowerQuartile()).toBe(1.5);
        expect(data(1, 2, 4, 9, 10).lowerQuartile()).toBe(1.5);
        expect(data(4, 7, 9, 4, 6, 2, 7).lowerQuartile()).toBe(4);
        expect(data(9, 8, 7, 6, 5, 4, 3, 2, 1).lowerQuartile()).toBe(2.5);
    });
    it('returns NaN if empty', () => {
        expect(data().lowerQuartile()).toBeNaN();
    });
    it_preserve_original_data($ => $.lowerQuartile());
});
describe('upperQuartile', () => {
    it('returns the upperQuartile', () => {
        expect(data(1, 2, 3).upperQuartile()).toBe(3);
        expect(data(1, 2, 3, 4).upperQuartile()).toBe(3.5);
        expect(data(1, 2, 4, 10).upperQuartile()).toBe(7);
        expect(data(1, 10, 2, 4).upperQuartile()).toBe(7);
        expect(data(1, 2, 4, 9, 10).upperQuartile()).toBe(9.5);
        expect(data(4, 7, 9, 4, 6, 2, 7).upperQuartile()).toBe(7);
        expect(data(9, 8, 7, 6, 5, 4, 3, 2, 1).upperQuartile()).toBe(7.5);
    });
    it('returns NaN if empty', () => {
        expect(data().upperQuartile()).toBeNaN();
    });
    it_preserve_original_data($ => $.upperQuartile());
});
describe('stdDev', () => {
    it('returns the stdDev', () => {
        expect(data(1, 2, 3).stdDev()).toBeCloseTo(0.81649658092773);
        expect(data(1, 2, 3, 4).stdDev()).toBeCloseTo(1.1180339887499);
        expect(data(1, 2, 4, 10).stdDev()).toBeCloseTo(3.4910600109422);
        expect(data(1, 10, 2, 4).stdDev()).toBeCloseTo(3.4910600109422);
        expect(data(-1, -10, -2, -4).stdDev()).toBeCloseTo(3.4910600109422);
    });
    it('returns NaN if empty', () => {
        expect(data().stdDev()).toBeNaN();
    });
    it_preserve_original_data($ => $.stdDev());
});
describe('range', () => {
    it('returns the range', () => {
        expect(data(1, 2, 3).range()).toBe(2);
        expect(data(1, 2, 3, 4).range()).toBe(3);
        expect(data(1, 2, 4, 10).range()).toBe(9);
        expect(data(1, 10, 2, 4).range()).toBe(9);
        expect(data(-1, -10, -2, -4).range()).toBe(9);
        expect(data(3, 7, 1023, 4).range()).toBe(1020);
    });
    it('returns NaN if empty', () => {
        expect(data().range()).toBeNaN();
    });
    it_preserve_original_data($ => $.range());
});
describe('IQR', () => {
    it('returns the range', () => {
        expect(data(1, 5).IQR()).toBe(4);
        expect(data(1, 2, 3).IQR()).toBe(2);
        expect(data(1, 2, 3, 4).IQR()).toBe(2);
        expect(data(1, 2, 4, 10).IQR()).toBe(5.5);
        expect(data(1, 10, 2, 4).IQR()).toBe(5.5);
        expect(data(1, 10, 2, 4).IQR()).toBe(5.5);
        expect(data(-1, -10, -2, -4).IQR()).toBe(5.5);
        expect(data(3, 7, 1023, 4).IQR()).toBe(511.5);
        expect(data(5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 7, 8, 10).IQR()).toBe(0);
    });
    it('returns NaN if empty', () => {
        expect(data().IQR()).toBeNaN();
    });
    it_preserve_original_data($ => $.IQR());
});
//# sourceMappingURL=data.test.js.map