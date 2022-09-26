import { describe, expect, it } from "vitest";
import { Vector, vector } from "../../src/array/vector";
class SubVector extends Vector {
}
function it_preserve_original(func) {
    it("preserve original vector", () => {
        let vec = vector(2, 2, 3, 1, 1, 1);
        let clone = vector(2, 2, 3, 1, 1, 1);
        func(vec);
        expect(vec).toStrictEqual(clone);
    });
}
function it_propagate_subclass_type(func) {
    it("propagate subclass type", () => {
        let vec = new SubVector();
        vec.push(2, 2, 3, 1, 1, 1);
        expect(func(vec)).toBeInstanceOf(SubVector);
    });
}
function it_propagate_empty_vector(func) {
    it("propagate empty array", () => {
        let vec = vector();
        expect(func(vec)).toStrictEqual(vector());
    });
}
describe("magnitude", () => {
    it("returns the magnitude", () => {
        expect(vector(8, 6).magnitude()).toBe(10);
        expect(vector(1, 2, 3).magnitude()).toBe(Math.sqrt(14));
        expect(vector(1, 2, 4, 10).magnitude()).toBe(11);
        expect(vector(1, -10, 2, -4).magnitude()).toBe(11);
        expect(vector(1, 2, 4, 9, 10).magnitude()).toBe(Math.sqrt(202));
    });
    it("return zero if empty", () => {
        expect(vector().magnitude()).toBe(0);
    });
    it_preserve_original(($) => $.magnitude());
});
describe("unit", () => {
    it("returns the unit vector", () => {
        expect(vector(8, 6).unit()).toStrictEqual(vector(0.8, 0.6));
        expect(vector(1, 2, 3).unit()).toStrictEqual(vector(1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14)));
        expect(vector(1, -2, 4, 10).unit()).toStrictEqual(vector(1 / 11, -2 / 11, 4 / 11, 10 / 11));
    });
    it_propagate_subclass_type(($) => $.unit());
    it_propagate_empty_vector(($) => $.unit());
    it_preserve_original(($) => $.unit());
});
describe("scaledTo", () => {
    it("returns the scaled vector", () => {
        expect(vector(8, 6).scaledTo(20)).toStrictEqual(vector(16, 12));
        expect(vector(1, 2, 3).scaledTo(2)).toStrictEqual(vector(2 / Math.sqrt(14), 4 / Math.sqrt(14), 6 / Math.sqrt(14)));
        expect(vector(1, -2, 4, 10).scaledTo(-3)).toStrictEqual(vector(-3 / 11, 6 / 11, -12 / 11, -30 / 11));
        expect(vector(1, -2, 4, 10).scaledTo(0)).toStrictEqual(vector(0, -0, 0, 0));
    });
    it_propagate_subclass_type(($) => $.scaledTo(2));
    it_propagate_empty_vector(($) => $.scaledTo(2));
    it_preserve_original(($) => $.scaledTo(2));
});
describe("dot", () => {
    it("returns the dot product", () => {
        expect(vector(1, 2).dot([3, 4])).toBe(11);
        expect(vector(8, 6).dot([1, -2])).toBe(-4);
        expect(vector(1, 2, 3).dot([1, 2, -3])).toBe(-4);
        expect(vector(1, 2, 4, 10).dot([9, -8, 5, -3])).toBe(-17);
    });
    it("return zero if empty", () => {
        expect(vector().dot([])).toBe(0);
    });
    it_preserve_original(($) => $.dot([]));
});
describe("angleWith", () => {
    it("returns the angle", () => {
        expect(vector(1, 0).angleWith([0, 1])).toBe(90);
        expect(vector(1, 3).angleWith([1, 3])).toBeCloseTo(0);
        expect(vector(1, 3).angleWith([-1, -3])).toBeCloseTo(180);
        expect(vector(1, 2).angleWith([3, 4])).toBeCloseTo(10.305);
        expect(vector(8, 6).angleWith([1, -2])).toBeCloseTo(100.3);
        expect(vector(1, 2, 3).angleWith([1, 2, -3])).toBeCloseTo(106.6);
    });
    it_preserve_original(($) => $.angleWith([]));
});
describe("normalTo", () => {
    it("returns the normal vector", () => {
        expect(vector(8, -6).normalTo([1, 0])).toStrictEqual(vector(0, -6));
        expect(vector(8, -6).normalTo([0, 1])).toStrictEqual(vector(8, 0));
        expect(vector(1, 2, 3).normalTo([4, 5, 6])).toBeDeepCloseTo(vector(-0.6623, -0.07792, 0.5065), 4);
        expect(vector(5, -7, -2).normalTo([-1, 9, 3])).toBeDeepCloseTo(vector(4.1868, 0.319, 0.4396), 3);
        let v1 = vector(3, -5, -12);
        let v2 = vector(-2, 5, 6);
        expect(v1.normalTo(v2).dot(v2)).toBeCloseTo(0);
    });
    it_propagate_subclass_type(($) => $.normalTo([1, 0]));
    it_propagate_empty_vector(($) => $.normalTo([]));
    it_preserve_original(($) => $.normalTo([1, 0]));
});
describe("distanceWith", () => {
    it("returns the distance", () => {
        expect(vector(3, 0).distanceWith([0, 4])).toBe(5);
        expect(vector(1, 2).distanceWith([3, 4])).toBe(Math.sqrt(8));
        expect(vector(7, -8).distanceWith([-4, 2])).toBe(Math.sqrt(221));
        expect(vector(7, -8, 3).distanceWith([-4, 2, -1])).toBe(Math.sqrt(237));
    });
    it("return zero if empty", () => {
        expect(vector().distanceWith([])).toBe(0);
    });
    it_preserve_original(($) => $.distanceWith([0, 4]));
});
describe("extrudeTo", () => {
    it("returns the extruded vector", () => {
        expect(vector(4, 1).extrudeTo([0, 1], 0.75)).toStrictEqual(vector(3, 1));
        expect(vector(1, 2).extrudeTo([4, 6], 0.4)).toStrictEqual(vector(2.8, 4.4));
        expect(vector(10, 20, 30).extrudeTo([0, 0, 0], 0.1)).toStrictEqual(vector(1, 2, 3));
        expect(vector(-2, 3, -4).extrudeTo([2, 11, 12], 0.25)).toStrictEqual(vector(1, 9, 8));
    });
    it_propagate_subclass_type(($) => $.extrudeTo([1, 0], 1));
    it_propagate_empty_vector(($) => $.extrudeTo([], 1));
    it_preserve_original(($) => $.extrudeTo([1, 0], 1));
});
//# sourceMappingURL=vector.test.js.map