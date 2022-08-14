import { describe, expect, it } from "vitest";
import { Shape, shape } from "../../src/array/shape";
import { Vector, vector } from "../../src/array/vector";
import { Numbers, numbers } from "../../src/array/numbers";

class SubShape extends Shape<Vector> {}

function it_preserve_original(func: (_: Shape<Vector>) => any) {
  it("preserve original", () => {
    let shp = shape([1, 2], [3, 4], [5, 6]);
    let clone = shape([1, 2], [3, 4], [5, 6]);
    func(shp);
    expect(shp).toStrictEqual(clone);
  });
}

function it_propagate_subclass_type(func: (_: Shape<Vector>) => any) {
  it("propagate subclass type", () => {
    let shp = new SubShape();
    shp.push(vector(1, 2), vector(3, 4), vector(5, 6));
    expect(func(shp)).toBeInstanceOf(SubShape);
  });
}

function it_propagate_empty_shape(func: (_: Shape<Vector>) => any) {
  it("propagate empty array", () => {
    let shp = shape();
    expect(func(shp)).toStrictEqual(shape());
  });
}

describe("distances", () => {
  it("returns the distances", () => {
    expect(shape([0, 0], [3, 0], [0, 4]).distances()).toStrictEqual(
      numbers(3, 4, 5)
    );
    expect(shape([1, 2], [6, 5], [-3, -4]).distances()).toStrictEqual(
      numbers(Math.sqrt(34), Math.sqrt(52), Math.sqrt(162))
    );
    expect(shape([0, 0], [1, 0], [1, 1], [0, 1]).distances()).toStrictEqual(
      numbers(1, Math.sqrt(2), 1, 1, Math.sqrt(2), 1)
    );
    expect(shape([0, 0, 5], [3, 0, 5], [0, 4, 5]).distances()).toStrictEqual(
      numbers(3, 4, 5)
    );
    expect(shape([1, 2, 3], [6, 5, 4], [-3, -4, -5]).distances()).toStrictEqual(
      numbers(Math.sqrt(35), Math.sqrt(116), Math.sqrt(243))
    );

    expect(shape([0, 0], [3, 0], [0, 4]).distances()).toBeInstanceOf(Numbers);
  });

  it_preserve_original(($) => $.distances());
});

describe("distancesFrom", () => {
  it("returns the distances", () => {
    expect(shape([0, 0], [3, 0], [0, 4]).distancesFrom([3, 4])).toStrictEqual(
      numbers(5, 4, 3)
    );
    expect(shape([1, 2], [6, 5], [-3, -4]).distancesFrom([3, 4])).toStrictEqual(
      numbers(Math.sqrt(8), Math.sqrt(10), Math.sqrt(100))
    );

    expect(
      shape([0, 0, 5], [3, 0, 5], [0, 4, 5]).distancesFrom([3, 4, 5])
    ).toStrictEqual(numbers(5, 4, 3));
    expect(
      shape([1, 2, 3], [6, 5, 4], [-3, -4, -5]).distancesFrom([3, 4, 5])
    ).toStrictEqual(numbers(Math.sqrt(12), Math.sqrt(11), Math.sqrt(200)));
  });

  it_preserve_original(($) => $.distancesFrom([3, 4]));
});

describe("mean", () => {
  it("returns the mean", () => {
    expect(shape([1, 2]).mean()).toStrictEqual(vector(1, 2));
    expect(shape([0, 0], [3, 0], [0, 6]).mean()).toStrictEqual(vector(1, 2));
    expect(shape([0, 0], [3, 0], [0, 4]).mean()).toStrictEqual(
      vector(1, 4 / 3)
    );
    expect(shape([1, 2], [6, 5], [-3, -4]).mean()).toStrictEqual(
      vector(4 / 3, 1)
    );
    expect(shape([0, 0], [1, 0], [1, 1], [0, 1]).mean()).toStrictEqual(
      vector(0.5, 0.5)
    );
    expect(shape([0, 0, 5], [3, 0, 5], [0, 4, 5]).mean()).toStrictEqual(
      vector(1, 4 / 3, 5)
    );
    expect(shape([1, 2, 3], [6, 5, 4], [-3, -4, -5]).mean()).toStrictEqual(
      vector(4 / 3, 1, 2 / 3)
    );
  });

  it_preserve_original(($) => $.mean());
});

describe("translate", () => {
  it("returns the translated shape", () => {
    expect(shape([0, 0], [3, 0], [0, 6]).translate([3, -4])).toStrictEqual(
      shape([3, -4], [6, -4], [3, 2])
    );
    expect(
      shape([1, 2, 3], [6, 5, 4], [-3, -4, -5]).translate([3, -4, 5])
    ).toStrictEqual(shape([4, -2, 8], [9, 1, 9], [0, -8, 0]));
  });

  it_preserve_original(($) => $.translate([3, -4]));
  it_propagate_subclass_type(($) => $.translate([3, -4]));
  it_propagate_empty_shape(($) => $.translate([3, -4]));
});

describe("scale", () => {
  it("returns the scaled shape", () => {
    expect(shape([1, 2], [3, 0], [0, 6]).scale(2)).toStrictEqual(
      shape([2, 4], [6, 0], [0, 12])
    );
    expect(shape([1, 2, 3], [6, 5, 4], [-3, -4, -5]).scale(-3)).toStrictEqual(
      shape([-3, -6, -9], [-18, -15, -12], [9, 12, 15])
    );
  });

  it_preserve_original(($) => $.scale(2));
  it_propagate_subclass_type(($) => $.scale(2));
  it_propagate_empty_shape(($) => $.scale(2));
});

describe("extrudeTo", () => {
  it("returns the extruded shape", () => {
    expect(
      shape([10, 0], [5, 0], [0, 20]).extrudeTo([0, 0], 0.4)
    ).toStrictEqual(shape([4, 0], [2, 0], [0, 8]));
    expect(shape([0, 0], [3, 0], [0, 6]).extrudeTo([3, -4], 0.1)).toStrictEqual(
      shape([2.7, -3.6], [3, -3.6], [2.7, -3])
    );
    expect(
      shape([0, 0, 0], [4, 0, 0], [0, 4, 0]).extrudeTo([0, 0, 4], 0.75)
    ).toStrictEqual(shape([0, 0, 1], [3, 0, 1], [0, 3, 1]));
  });

  it_preserve_original(($) => $.extrudeTo([3, -4], 0.1));
  it_propagate_subclass_type(($) => $.extrudeTo([3, -4], 0.1));
  it_propagate_empty_shape(($) => $.extrudeTo([3, -4], 0.1));
});

describe("extrudeToShape", () => {
  it("returns the extruded shape", () => {
    expect(
      shape([10, 0], [5, 0], [0, 20]).extrudeToShape(
        [
          [0, 0],
          [-5, 0],
          [0, 10],
        ],
        0.4
      )
    ).toStrictEqual(shape([4, 0], [-1, 0], [0, 14]));
    expect(
      shape([10, 0], [5, 0], [0, 20]).extrudeToShape(
        [
          [0, 0],
          [0, 0],
          [0, 0],
        ],
        0.4
      )
    ).toStrictEqual(shape([4, 0], [2, 0], [0, 8]));
    expect(
      shape([0, 0], [3, 0], [0, 6]).extrudeToShape(
        [
          [3, -4],
          [3, -4],
          [3, -4],
        ],
        0.1
      )
    ).toStrictEqual(shape([2.7, -3.6], [3, -3.6], [2.7, -3]));
    expect(
      shape([0, 0, 0], [4, 0, 0], [0, 4, 0]).extrudeToShape(
        [
          [0, 0, 4],
          [0, 0, 4],
          [0, 0, 4],
        ],
        0.75
      )
    ).toStrictEqual(shape([0, 0, 1], [3, 0, 1], [0, 3, 1]));
  });

  it_preserve_original(($) =>
    $.extrudeToShape(
      [
        [3, -4],
        [3, -4],
        [3, -4],
      ],
      0.1
    )
  );
  it_propagate_subclass_type(($) =>
    $.extrudeToShape(
      [
        [3, -4],
        [3, -4],
        [3, -4],
      ],
      0.1
    )
  );
  it_propagate_empty_shape(($) =>
    $.extrudeToShape(
      [
        [3, -4],
        [3, -4],
        [3, -4],
      ],
      0.1
    )
  );
});
