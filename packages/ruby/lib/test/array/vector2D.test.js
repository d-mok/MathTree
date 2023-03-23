"use strict";
// import { describe, expect, it } from "vitest";
// import { Vector2D, vector2D } from "../../src/array/vector2D";
// class SubVector2D extends Vector2D {}
// function it_preserve_original(func: (_: Vector2D) => any) {
//   it("preserve original vector", () => {
//     let vec = vector2D(2, 3);
//     let clone = vector2D(2, 3);
//     func(vec);
//     expect(vec).toStrictEqual(clone);
//   });
// }
// function it_propagate_subclass_type(func: (_: Vector2D) => any) {
//   it("propagate subclass type", () => {
//     let vec = new SubVector2D();
//     vec.push(2, 2, 3, 1, 1, 1);
//     expect(func(vec)).toBeInstanceOf(SubVector2D);
//   });
// }
// describe("toArray", () => {
//   it("returns this as array", () => {
//     expect(vector2D(1, 2).toArray()).toStrictEqual([1, 2]);
//   });
//   it_preserve_original(($) => $.toArray());
// });
// describe("argument", () => {
//   it("returns the argument", () => {
//     expect(vector2D(0, 0).argument()).toBe(0);
//     expect(vector2D(2, 0).argument()).toBe(0);
//     expect(vector2D(-2, 0).argument()).toBe(180);
//     expect(vector2D(0, 2).argument()).toBe(90);
//     expect(vector2D(0, -2).argument()).toBe(270);
//     expect(vector2D(2, 2).argument()).toBe(45);
//     expect(vector2D(-2, 2).argument()).toBe(135);
//     expect(vector2D(2, -2).argument()).toBe(315);
//     expect(vector2D(-2, -2).argument()).toBe(225);
//     expect(vector2D(8, 6).argument()).toBeCloseTo(36.86989765);
//   });
//   it_preserve_original(($) => $.argument());
// });
// describe("rotate", () => {
//   it("returns the rotated vector", () => {
//     expect(vector2D(8, 6).rotate(90)).toBeDeepCloseTo(vector2D(-6, 8));
//     expect(vector2D(8, 6).rotate(180)).toBeDeepCloseTo(vector2D(-8, -6));
//     expect(vector2D(8, 6).rotate(270)).toBeDeepCloseTo(vector2D(6, -8));
//     expect(vector2D(8, 6).rotate(360)).toBeDeepCloseTo(vector2D(8, 6));
//     expect(vector2D(8, 6).rotate(-90)).toBeDeepCloseTo(vector2D(6, -8));
//     expect(vector2D(1, 2).rotate(45)).toBeDeepCloseTo(
//       vector2D(2 ** -0.5 - 2 ** 0.5, 2 ** -0.5 + 2 ** 0.5)
//     );
//   });
//   it_propagate_subclass_type(($) => $.rotate(90));
//   it_preserve_original(($) => $.rotate(90));
// });
// describe("cross2D", () => {
//   it("returns the cross product", () => {
//     expect(vector2D(1, 2).cross2D([3, 4])).toBe(-2);
//     expect(vector2D(-4, 8).cross2D([5, -3])).toBe(-28);
//     expect(vector2D(10, 2).cross2D([6, 3])).toBe(18);
//     expect(vector2D(0, 0).cross2D([6, 3])).toBe(0);
//   });
//   it_preserve_original(($) => $.cross2D([1, 2]));
// });
//# sourceMappingURL=vector2D.test.js.map