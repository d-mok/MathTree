import { list } from "../../src/array/list";
import { describe, expect, it } from "vitest";
import { Numbers, numbers } from "../../src/array/numbers";

class SubNumbers extends Numbers {}

function it_preserve_original_numbers(func: (_: Numbers) => any) {
  it("preserve original numbers", () => {
    let nums = numbers(2, 2, 3, 1, 1, 1);
    let clone = numbers(2, 2, 3, 1, 1, 1);
    func(nums);
    expect(nums).toStrictEqual(clone);
  });
}

function it_propagate_subclass_type(func: (_: Numbers) => any) {
  it("propagate subclass type", () => {
    let ls = new SubNumbers();
    ls.push(2, 2, 3, 1, 1, 1);
    expect(func(ls)).toBeInstanceOf(SubNumbers);
  });
}

function it_propagate_empty_list(func: (_: Numbers) => any) {
  it("propagate empty array", () => {
    let nums = numbers();
    expect(func(nums)).toStrictEqual(numbers());
  });
}

describe("sum", () => {
  it("returns the sum", () => {
    expect(numbers(1, 2, 3).sum()).toBe(6);
  });
  it("returns zero if empty", () => {
    expect(numbers().sum()).toBe(0);
  });
  it_preserve_original_numbers(($) => $.sum());
});

describe("product", () => {
  it("returns the product", () => {
    expect(numbers(1, 2, 3).product()).toBe(6);
    expect(numbers(1, 2, 3, 4).product()).toBe(24);
    expect(numbers(1, 2, 3, -4).product()).toBe(-24);
    expect(numbers(0, 2, 3, -4).product()).toBe(-0);
    expect(numbers(5).product()).toBe(5);
  });
  it("returns zero if empty", () => {
    expect(numbers().product()).toBeNaN;
  });
  it_preserve_original_numbers(($) => $.product());
});

describe("mean", () => {
  it("returns the mean", () => {
    expect(numbers(1, 2, 3, 4).mean()).toBe(2.5);
  });
  it("returns NaN if empty", () => {
    expect(numbers().mean()).toBeNaN();
  });
  it_preserve_original_numbers(($) => $.mean());
});

describe("max", () => {
  it("returns the max", () => {
    expect(numbers(2, 3, 1).max()).toBe(3);

    let nums = numbers(6, 7, 6, 5, 8, 8);
    expect(nums.max(1)).toBe(8);
    expect(nums.max(2)).toBe(7);
    expect(nums.max(3)).toBe(6);
    expect(nums.max(4)).toBe(5);
    expect(nums.max(5)).toBeNaN();
  });
  it("returns NaN if empty", () => {
    expect(numbers().max()).toBeNaN();
  });
  it_preserve_original_numbers(($) => $.max());
});

describe("min", () => {
  it("returns the min", () => {
    expect(numbers(2, 3, 1).min()).toBe(1);

    let nums = numbers(6, 7, 6, 5, 8, 8);
    expect(nums.min(1)).toBe(5);
    expect(nums.min(2)).toBe(6);
    expect(nums.min(3)).toBe(7);
    expect(nums.min(4)).toBe(8);
    expect(nums.min(5)).toBeNaN();
  });
  it("returns NaN if empty", () => {
    expect(numbers().min()).toBeNaN();
  });
  it_preserve_original_numbers(($) => $.min());
});

describe("add", () => {
  it("returns the added array", () => {
    expect(numbers(1, 2, 3).add([4, 5, 6])).toStrictEqual(numbers(5, 7, 9));
    expect(numbers(1, 2, 3).add(1)).toStrictEqual(numbers(2, 3, 4));
  });
  it_preserve_original_numbers(($) => $.add(1));
  it_propagate_subclass_type(($) => $.add(1));
  it_propagate_empty_list(($) => $.add(1));
});

describe("minus", () => {
  it("returns the subtracted array", () => {
    expect(numbers(4, 5, 6).minus([1, 2, 3])).toStrictEqual(numbers(3, 3, 3));
    expect(numbers(4, 5, 6).minus(1)).toStrictEqual(numbers(3, 4, 5));
  });
  it_preserve_original_numbers(($) => $.minus(1));
  it_propagate_subclass_type(($) => $.minus(1));
  it_propagate_empty_list(($) => $.minus(1));
});

describe("times", () => {
  it("returns the multiplied array", () => {
    expect(numbers(1, 2, 3).times([4, 5, 6])).toStrictEqual(numbers(4, 10, 18));
    expect(numbers(1, 2, 3).times(2)).toStrictEqual(numbers(2, 4, 6));
  });
  it_preserve_original_numbers(($) => $.times(2));
  it_propagate_subclass_type(($) => $.times(2));
  it_propagate_empty_list(($) => $.times(2));
});

describe("divide", () => {
  it("returns the divided array", () => {
    expect(numbers(1, 2, 3).divide([4, 5, 6])).toStrictEqual(
      numbers(0.25, 0.4, 0.5)
    );
    expect(numbers(1, 2, 3).divide(2)).toStrictEqual(numbers(0.5, 1, 1.5));
  });
  it_preserve_original_numbers(($) => $.divide(2));
  it_propagate_subclass_type(($) => $.divide(2));
  it_propagate_empty_list(($) => $.divide(2));
});

describe("toPower", () => {
  it("returns the power array", () => {
    expect(numbers(1, 2, 3).toPower([4, 5, 6])).toStrictEqual(
      numbers(1, 32, 729)
    );
    expect(numbers(-1, 2, 3).toPower(2)).toStrictEqual(numbers(1, 4, 9));
  });
  it_preserve_original_numbers(($) => $.toPower(2));
  it_propagate_subclass_type(($) => $.toPower(2));
  it_propagate_empty_list(($) => $.toPower(2));
});

describe("rootNth", () => {
  it("returns the root array", () => {
    expect(numbers(1, 8, 9).rootNth([4, 3, 2])).toStrictEqual(numbers(1, 2, 3));
    expect(numbers(1, 4, 9).rootNth(2)).toStrictEqual(numbers(1, 2, 3));
  });
  it_preserve_original_numbers(($) => $.rootNth(2));
  it_propagate_subclass_type(($) => $.rootNth(2));
  it_propagate_empty_list(($) => $.rootNth(2));
});

describe("square", () => {
  it("returns the squared array", () => {
    expect(numbers(-1, 2, 3).square()).toStrictEqual(numbers(1, 4, 9));
  });
  it_preserve_original_numbers(($) => $.square());
  it_propagate_subclass_type(($) => $.square());
  it_propagate_empty_list(($) => $.square());
});

describe("squareRoot", () => {
  it("returns the square root array", () => {
    expect(numbers(1, 4, 9).squareRoot()).toStrictEqual(numbers(1, 2, 3));
  });
  it_preserve_original_numbers(($) => $.squareRoot());
  it_propagate_subclass_type(($) => $.squareRoot());
  it_propagate_empty_list(($) => $.squareRoot());
});

describe("negate", () => {
  it("returns the negated array", () => {
    expect(numbers(1, 2, 3).negate()).toStrictEqual(numbers(-1, -2, -3));
  });
  it_preserve_original_numbers(($) => $.negate());
  it_propagate_subclass_type(($) => $.negate());
  it_propagate_empty_list(($) => $.negate());
});

describe("abs", () => {
  it("returns the absolute value array", () => {
    expect(numbers(-1, 2, -3).abs()).toStrictEqual(numbers(1, 2, 3));
  });
  it_preserve_original_numbers(($) => $.abs());
  it_propagate_subclass_type(($) => $.abs());
  it_propagate_empty_list(($) => $.abs());
});

describe("blur", () => {
  it("returns the blurred value array", () => {
    expect(numbers(0.1 + 0.2, 0.81 - 1, 1.1 ** 2).blur()).toStrictEqual(
      numbers(0.3, -0.19, 1.21)
    );
  });
  it_preserve_original_numbers(($) => $.blur());
  it_propagate_subclass_type(($) => $.blur());
  it_propagate_empty_list(($) => $.blur());
});

describe("toFraction", () => {
  it("returns the fraction array", () => {
    expect(numbers(0.5, -456 / 123).toFraction()).toStrictEqual(
      list([1, 2], [-152, 41])
    );
  });
  it_preserve_original_numbers(($) => $.toFraction());
});

describe("gaps", () => {
  it("returns the gaps", () => {
    expect(numbers(1, 7, 3, 20).gaps()).toStrictEqual(numbers(2, 4, 13));
  });
  it_preserve_original_numbers(($) => $.gaps());
  it_propagate_subclass_type(($) => $.gaps());
  it_propagate_empty_list(($) => $.gaps());
});

describe("gapsMod", () => {
  it("returns the gaps by mod", () => {
    expect(numbers(1, 7, 3, 20).gapsMod(9)).toStrictEqual(numbers(1, 1, 4, 3));
    expect(numbers(1, 7, 3, -20).gapsMod(9)).toStrictEqual(numbers(2, 4, 0, 3));
  });
  it_preserve_original_numbers(($) => $.gapsMod(9));
  it_propagate_subclass_type(($) => $.gapsMod(9));
  it_propagate_empty_list(($) => $.gapsMod(9));
});

describe("hcf", () => {
  it("returns the HCF", () => {
    expect(numbers(1, 2, 3).hcf()).toBe(1);
    expect(numbers(4, 6, 8).hcf()).toBe(2);
    expect(numbers(24, 36, -60).hcf()).toBe(12);
    expect(numbers(2172, 4344, -2715, -5973).hcf()).toBe(543);
    expect(numbers(1, 1).hcf()).toBe(1);
    expect(numbers(0, 3).hcf()).toBe(3);
    expect(numbers(0, 0, 3).hcf()).toBe(3);
    expect(numbers(30).hcf()).toBe(30);
    expect(numbers(1, 10000000000).hcf()).toBe(1);
  });

  it("returns NaN if contains non-integer", () => {
    expect(numbers(5, 10, 5.1).hcf()).toBeNaN();
    expect(numbers(0.1, 0.2).hcf()).toBeNaN();
  });

  it("returns NaN if empty or zero only", () => {
    expect(numbers().hcf()).toBeNaN();
    expect(numbers(0).hcf()).toBeNaN();
  });

  it_preserve_original_numbers(($) => $.hcf());
});

describe("lcm", () => {
  it("returns the LCM", () => {
    expect(numbers(4, 6).lcm()).toBe(12);
    expect(numbers(1, 2, 3).lcm()).toBe(6);
    expect(numbers(4, 6, 8).lcm()).toBe(24);
    expect(numbers(12, 18, 24).lcm()).toBe(72);
    expect(numbers(24, 36, -60).lcm()).toBe(360);
    expect(numbers(7, 11, 13, 19).lcm()).toBe(19019);
    expect(numbers(1, 1).lcm()).toBe(1);
    expect(numbers(1, 3).lcm()).toBe(3);
    expect(numbers(0, 3).lcm()).toBe(3);
    expect(numbers(0, 0, 3).lcm()).toBe(3);
    expect(numbers(30).lcm()).toBe(30);
  });

  it("returns NaN if contains non-integer", () => {
    expect(numbers(5, 10, 5.1).lcm()).toBeNaN();
    expect(numbers(0.1, 0.2).lcm()).toBeNaN();
  });

  it("returns NaN if empty or zero only", () => {
    expect(numbers().lcm()).toBeNaN();
    expect(numbers(0).lcm()).toBeNaN();
  });

  it_preserve_original_numbers(($) => $.lcm());
});

describe("reduceRatio", () => {
  it("returns the reduced ratio", () => {
    expect(numbers(1, 2, 3).reduceRatio()).toStrictEqual(numbers(1, 2, 3));
    expect(numbers(4, 6, 8).reduceRatio()).toStrictEqual(numbers(2, 3, 4));
    expect(numbers(24, 36, -60).reduceRatio()).toStrictEqual(numbers(2, 3, -5));
    expect(numbers(2172, 4344, -2715, -5973).reduceRatio()).toStrictEqual(
      numbers(4, 8, -5, -11)
    );

    expect(numbers(1, 1).reduceRatio()).toStrictEqual(numbers(1, 1));
    expect(numbers(0, 3, -6).reduceRatio()).toStrictEqual(numbers(0, 1, -2));
    expect(numbers(0, 0, 6).reduceRatio()).toStrictEqual(numbers(0, 0, 1));
    expect(numbers(30).reduceRatio()).toStrictEqual(numbers(1));
    expect(numbers(0, 0, 0).reduceRatio()).toStrictEqual(numbers(0, 0, 0));
  });

  it("returns a clone if contains non-integer", () => {
    expect(numbers(Math.sqrt(2), 3).reduceRatio()).toStrictEqual(
      numbers(Math.sqrt(2), 3)
    );
    expect(numbers(1.5, 2.5, 3.5).reduceRatio()).toStrictEqual(
      numbers(1.5, 2.5, 3.5)
    );
    expect(numbers(5, 10, 5.1).reduceRatio()).toStrictEqual(
      numbers(5, 10, 5.1)
    );
    expect(numbers(1 / 3, 1 / 2, 1 / 4).reduceRatio()).toStrictEqual(
      numbers(1 / 3, 1 / 2, 1 / 4)
    );
  });

  it_propagate_empty_list(($) => $.reduceRatio());
  it_propagate_subclass_type(($) => $.reduceRatio());
  it_preserve_original_numbers(($) => $.reduceRatio());
});

describe("ratio", () => {
  it("returns the ratio", () => {
    expect(numbers(1, 2, 3).ratio()).toStrictEqual(numbers(1, 2, 3));
    expect(numbers(4, 6, 8).ratio()).toStrictEqual(numbers(2, 3, 4));
    expect(numbers(24, 36, -60).ratio()).toStrictEqual(numbers(2, 3, -5));
    expect(numbers(2172, 4344, -2715, -5973).ratio()).toStrictEqual(
      numbers(4, 8, -5, -11)
    );
    expect(numbers(1.5, 2.5, 3.5).ratio()).toStrictEqual(numbers(3, 5, 7));
    expect(numbers(1.23, 4.56, 7.89).ratio()).toStrictEqual(
      numbers(41, 152, 263)
    );
    expect(numbers(5, 10, 5.1).ratio()).toStrictEqual(numbers(50, 100, 51));
    expect(numbers(1 / 3, 1 / 2, 1 / 4).ratio()).toStrictEqual(
      numbers(4, 6, 3)
    );
    expect(numbers(25 / 12, 13 / 64, -87 / 34).ratio()).toStrictEqual(
      numbers(6800, 663, -8352)
    );

    expect(numbers(1, 1).ratio()).toStrictEqual(numbers(1, 1));
    expect(numbers(0, 3, -6).ratio()).toStrictEqual(numbers(0, 1, -2));
    expect(numbers(0, 0, 6).ratio()).toStrictEqual(numbers(0, 0, 1));
    expect(numbers(30).ratio()).toStrictEqual(numbers(1));
    expect(numbers(0, 0, 0).ratio()).toStrictEqual(numbers(0, 0, 0));
  });

  it("returns a clone if contains irrational", () => {
    expect(numbers(Math.sqrt(2), 3).ratio()).toStrictEqual(
      numbers(Math.sqrt(2), 3)
    );
  });

  it_propagate_empty_list(($) => $.ratio());
  it_propagate_subclass_type(($) => $.ratio());
  it_preserve_original_numbers(($) => $.ratio());
});

describe("ratioFactor", () => {
  it("returns the ratio factor", () => {
    expect(numbers(1, 2, 3).ratioFactor()).toBe(1);
    expect(numbers(4, 6, 8).ratioFactor()).toBe(0.5);
    expect(numbers(24, 36, -60).ratioFactor()).toBe(1 / 12);
    expect(numbers(2172, 4344, -2715, -5973).ratioFactor()).toBe(1 / 543);
    expect(numbers(1.5, 2.5, 3.5).ratioFactor()).toBe(2);
    expect(numbers(1.23, 4.56, 7.89).ratioFactor()).toBe(100 / 3);
    expect(numbers(5, 10, 5.1).ratioFactor()).toBe(10);
    expect(numbers(1 / 3, 1 / 2, 1 / 4).ratioFactor()).toBe(12);
    expect(numbers(25 / 12, 13 / 64, -87 / 34).ratioFactor()).toBe(3264);

    expect(numbers(1, 1).ratioFactor()).toBe(1);
    expect(numbers(0, 3, -6).ratioFactor()).toBe(1 / 3);
    expect(numbers(0, 0, 6).ratioFactor()).toBe(1 / 6);
    expect(numbers(30).ratioFactor()).toBe(1 / 30);
    expect(numbers(0, 0, 0).ratioFactor()).toBeNaN();
  });

  it("returns NaN if contains irrational", () => {
    expect(numbers(Math.sqrt(2), 3).ratioFactor()).toBeNaN();
  });

  it_preserve_original_numbers(($) => $.ratioFactor());
});
