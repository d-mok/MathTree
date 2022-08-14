import { describe, expect, it } from "vitest";
import { Vector3D, vector3D } from "../../src/array/vector3D";
import { toBeDeepCloseTo, toMatchCloseTo } from "jest-matcher-deep-close-to";
import { vector2D } from "../../src/array/vector2D";
expect.extend({ toBeDeepCloseTo, toMatchCloseTo });
class SubVector3D extends Vector3D {
}
function it_preserve_original(func) {
    it("preserve original vector", () => {
        let vec = vector3D(2, 2, 3);
        let clone = vector3D(2, 2, 3);
        func(vec);
        expect(vec).toStrictEqual(clone);
    });
}
function it_propagate_subclass_type(func) {
    it("propagate subclass type", () => {
        let vec = new SubVector3D();
        vec.push(2, 2, 3);
        expect(func(vec)).toBeInstanceOf(SubVector3D);
    });
}
describe("toArray", () => {
    it("returns this as array", () => {
        expect(vector3D(1, 2, 3).toArray()).toStrictEqual([1, 2, 3]);
    });
    it_preserve_original(($) => $.toArray());
});
describe("cross", () => {
    it("returns the cross product", () => {
        expect(vector3D(1, 0, 0).cross([0, 1, 0])).toStrictEqual(vector3D(0, 0, 1));
        expect(vector3D(-2, 4, -6).cross([3, -5, 1])).toStrictEqual(vector3D(-26, -16, -2));
        expect(vector3D(0, 0, 0).cross([4, 5, 6])).toStrictEqual(vector3D(0, 0, 0));
        let v1 = vector3D(3, 4, 5);
        let v2 = vector3D(7, 8, 9);
        expect(v1.cross(v2)).toStrictEqual(vector3D(-4, 8, -4));
        expect(v2.cross(v1)).toStrictEqual(vector3D(4, -8, 4));
        expect(v1.cross(v2).dot(v1)).toBe(0);
    });
    it_propagate_subclass_type(($) => $.cross([0, 1, 0]));
    it_preserve_original(($) => $.cross([0, 1, 0]));
});
describe("rotate", () => {
    it("returns the rotated vector", () => {
        expect(vector3D(1, 0, 0).rotate([0, 0, 1], 90)).toBeDeepCloseTo(vector3D(0, 1, 0));
        expect(vector3D(1, 2, 3).rotate([0, 0, 1], 90)).toBeDeepCloseTo(vector3D(-2, 1, 3));
        expect(vector3D(4, 5, 6).rotate([1, 2, 3], 50)).toBeDeepCloseTo(vector3D(2.7734339346, 6.0753129109, 5.6919800812));
        expect(vector3D(1, 2, -3).rotate([-4, -5, 6], -120)).toBeDeepCloseTo(vector3D(1.6974282308, 2.7090396423, -1.9441814775));
        let v1 = vector3D(3, 4, 5);
        let v2 = vector3D(7, 8, 9);
        expect(v1.rotate(v2, 40).dot(v2)).toBe(v1.dot(v2));
        expect(v1.rotate(v2, 50).magnitude()).toBe(v1.magnitude());
    });
    it_propagate_subclass_type(($) => $.rotate([0, 0, 1], 90));
    it_preserve_original(($) => $.rotate([0, 0, 1], 90));
});
describe("projectOnPlane", () => {
    it("returns the vector projection", () => {
        expect(vector3D(3, 4, 5).projectOnPlane([1, 0, 0], [0, 1, 0])).toStrictEqual(vector3D(3, 4, 0));
        expect(vector3D(3, 4, 5).projectOnPlane([-1, 0, 0], [0, 1, 0])).toStrictEqual(vector3D(3, 4, 0));
        expect(vector3D(3, 2, -1).projectOnPlane([4, 1, 0], [1, 0, 3])).toBeDeepCloseTo(vector3D(36 / 11, 10 / 11, -12 / 11));
    });
    it_propagate_subclass_type(($) => $.projectOnPlane([1, 0, 0], [0, 1, 0]));
    it_preserve_original(($) => $.projectOnPlane([1, 0, 0], [0, 1, 0]));
});
describe("normalToPlane", () => {
    it("returns the normal vector", () => {
        expect(vector3D(3, 4, 5).normalToPlane([1, 0, 0], [0, 1, 0])).toStrictEqual(vector3D(0, 0, 5));
        expect(vector3D(3, 4, 5).normalToPlane([-1, 0, 0], [0, 1, 0])).toStrictEqual(vector3D(-0, -0, 5));
        expect(vector3D(3, 2, -1).normalToPlane([4, 1, 0], [1, 0, 3])).toBeDeepCloseTo(vector3D(-3 / 11, 12 / 11, 1 / 11));
    });
    it_propagate_subclass_type(($) => $.normalToPlane([1, 0, 0], [0, 1, 0]));
    it_preserve_original(($) => $.normalToPlane([1, 0, 0], [0, 1, 0]));
});
describe("projectTo2D", () => {
    it("returns the projection", () => {
        expect(vector3D(3, 4, 5).projectTo2D(60, 0.5)).toBeDeepCloseTo(vector2D(4, 6.732050807568877));
        expect(vector3D(3, 4, 5).projectTo2D(40, 1)).toBeDeepCloseTo(vector2D(6.064177772475912, 7.571150438746157));
        expect(vector3D(3, 4, 5).projectTo2D(90, 2)).toBeDeepCloseTo(vector2D(3, 13));
    });
    it_preserve_original(($) => $.projectTo2D(60, 0.5));
});
//# sourceMappingURL=vector3D.test.js.map