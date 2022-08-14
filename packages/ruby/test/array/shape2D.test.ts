import { describe, expect, it } from "vitest";
import { Shape2D, shape2D } from "../../src/array/shape2D";
import { vector2D } from "../../src/array/vector2D";
import { shape3D } from "../../src/array/shape3D";

class SubShape2D extends Shape2D {}

function it_preserve_original(func: (_: Shape2D) => any) {
  it("preserve original", () => {
    let shp = shape2D([1, 2], [3, 4], [5, 6]);
    let clone = shape2D([1, 2], [3, 4], [5, 6]);
    func(shp);
    expect(shp).toStrictEqual(clone);
  });
}

function it_propagate_subclass_type(func: (_: Shape2D) => any) {
  it("propagate subclass type", () => {
    let shp = new SubShape2D();
    shp.push(vector2D(1, 2), vector2D(3, 4), vector2D(5, 6));
    expect(func(shp)).toBeInstanceOf(SubShape2D);
  });
}

function it_propagate_empty_shape2D(func: (_: Shape2D) => any) {
  it("propagate empty array", () => {
    let shp = shape2D();
    expect(func(shp)).toStrictEqual(shape2D());
  });
}

describe("toArray", () => {
  it("returns this as array", () => {
    expect(shape2D([1, 2], [3, 4]).toArray()).toStrictEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it_preserve_original(($) => $.toArray());
});

describe("sortAroundMean", () => {
  it("sort around the mean", () => {
    let s = shape2D([0, 0], [2, 0], [1, 1]);
    s.sortAroundMean();
    expect(s).toStrictEqual(shape2D([1, 1], [0, 0], [2, 0]));

    let s2 = shape2D([-6, -2], [3, 5], [3, -6], [-3, 4], [7, -1]);
    s2.sortAroundMean();
    expect(s2).toStrictEqual(
      shape2D([3, 5], [-3, 4], [-6, -2], [3, -6], [7, -1])
    );
  });
});

describe("isConvex", () => {
  it("return boolean", () => {
    expect(shape2D([0, 0], [2, 0], [1, 1]).isConvex()).toBeTrue();
    expect(
      shape2D([-6, -2], [3, 5], [3, -6], [-3, 4], [7, -1]).isConvex()
    ).toBeTrue();
    expect(shape2D([0, 0], [3, 0], [1, 1], [0, 3]).isConvex()).toBeFalse();
    expect(
      shape2D([-6, -2], [3, 5], [3, -6], [-1, 1], [7, -1]).isConvex()
    ).toBeFalse();
  });

  it_preserve_original(($) => $.isConvex());
});

describe("isConvex", () => {
  it("return boolean", () => {
    expect(
      shape2D([0, 0], [1, 0], [0, 1], [3, 4]).erect([1, 0, 0], [0, 1, 0])
    ).toStrictEqual(shape3D([0, 0, 0], [1, 0, 0], [0, 1, 0], [3, 4, 0]));
    expect(
      shape2D([0, 0], [1, 0], [0, 1], [3, 4]).erect([0, 1, 0], [0, 0, 2])
    ).toStrictEqual(shape3D([0, 0, 0], [0, 1, 0], [0, 0, 2], [0, 3, 8]));
  });

  it_preserve_original(($) => $.erect([1, 0, 0], [0, 1, 0]));
});
