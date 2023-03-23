import * as math from 'mathjs';
import { describe, expect, it } from 'vitest';
import * as vec from '../../src/math/vec';
describe('scaledTo', () => {
    it('returns the scaled vector', () => {
        expect(vec.scaledTo([8, 6], 20)).toStrictEqual([16, 12]);
        expect(vec.scaledTo([1, 2, 3], 2)).toStrictEqual([
            2 / Math.sqrt(14),
            4 / Math.sqrt(14),
            6 / Math.sqrt(14),
        ]);
    });
});
describe('angleBetween', () => {
    it('returns the angle', () => {
        expect(vec.angleBetween([1, 0], [0, 1])).toBe(90);
        expect(vec.angleBetween([1, 3], [1, 3])).toBeCloseTo(0);
        expect(vec.angleBetween([1, 3], [-1, -3])).toBeCloseTo(180);
        expect(vec.angleBetween([1, 2], [3, 4])).toBeCloseTo(10.305);
        expect(vec.angleBetween([8, 6], [1, -2])).toBeCloseTo(100.3);
        expect(vec.angleBetween([1, 2, 3], [1, 2, -3])).toBeCloseTo(106.6);
    });
});
describe('normalTo', () => {
    it('returns the normal vector', () => {
        expect(vec.normal([8, -6], [1, 0])).toStrictEqual([0, -6]);
        expect(vec.normal([8, -6], [0, 1])).toStrictEqual([8, 0]);
        expect(vec.normal([1, 2, 3], [4, 5, 6])).toBeDeepCloseTo([-0.6623, -0.07792, 0.5065], 4);
        expect(vec.normal([5, -7, -2], [-1, 9, 3])).toBeDeepCloseTo([4.1868, 0.319, 0.4396], 3);
        let v1 = [3, -5, -12];
        let v2 = [-2, 5, 6];
        expect(math.dot(vec.normal(v1, v2), v2)).toBeCloseTo(0);
    });
});
describe('extrudeTo', () => {
    it('returns the extruded vector', () => {
        expect(vec.extrude([4, 1], [0, 1], 0.75)).toStrictEqual([3, 1]);
        expect(vec.extrude([1, 2], [4, 6], 0.4)).toStrictEqual([2.8, 4.4]);
        expect(vec.extrude([10, 20, 30], [0, 0, 0], 0.1)).toStrictEqual([
            1, 2, 3,
        ]);
        expect(vec.extrude([-2, 3, -4], [2, 11, 12], 0.25)).toStrictEqual([
            1, 9, 8,
        ]);
    });
});
describe('argument', () => {
    it('returns the argument', () => {
        expect(vec.argument([0, 0])).toBe(0);
        expect(vec.argument([2, 0])).toBe(0);
        expect(vec.argument([-2, 0])).toBe(180);
        expect(vec.argument([0, 2])).toBe(90);
        expect(vec.argument([0, -2])).toBe(270);
        expect(vec.argument([2, 2])).toBe(45);
        expect(vec.argument([-2, 2])).toBe(135);
        expect(vec.argument([2, -2])).toBe(315);
        expect(vec.argument([-2, -2])).toBe(225);
        expect(vec.argument([8, 6])).toBeCloseTo(36.86989765);
    });
});
describe('projectOnPlane', () => {
    it('returns the vector projection', () => {
        expect(vec.projectOnPlane([3, 4, 5], [1, 0, 0], [0, 1, 0])).toStrictEqual([3, 4, 0]);
        expect(vec.projectOnPlane([3, 4, 5], [-1, 0, 0], [0, 1, 0])).toStrictEqual([3, 4, 0]);
        expect(vec.projectOnPlane([3, 2, -1], [4, 1, 0], [1, 0, 3])).toBeDeepCloseTo([36 / 11, 10 / 11, -12 / 11]);
    });
});
describe('normalToPlane', () => {
    it('returns the normal vector', () => {
        expect(vec.normalToPlane([3, 4, 5], [1, 0, 0], [0, 1, 0])).toStrictEqual([0, 0, 5]);
        expect(vec.normalToPlane([3, 4, 5], [-1, 0, 0], [0, 1, 0])).toStrictEqual([-0, -0, 5]);
        expect(vec.normalToPlane([3, 2, -1], [4, 1, 0], [1, 0, 3])).toBeDeepCloseTo([-3 / 11, 12 / 11, 1 / 11]);
    });
});
describe('projectTo2D', () => {
    it('returns the projection', () => {
        expect(vec.projectTo2D([3, 4, 5], 60, 0.5)).toBeDeepCloseTo([
            4, 6.732050807568877,
        ]);
        expect(vec.projectTo2D([3, 4, 5], 40, 1)).toBeDeepCloseTo([
            6.064177772475912, 7.571150438746157,
        ]);
        expect(vec.projectTo2D([3, 4, 5], 90, 2)).toBeDeepCloseTo([3, 13]);
    });
});
//# sourceMappingURL=vec.test.js.map