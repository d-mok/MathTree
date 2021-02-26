
test('FracSign', () => {
    expect(FracSign(2, 3)).toEqual([2, 3]);
    expect(FracSign(-2, 3)).toEqual([-2, 3]);
    expect(FracSign(2, -3)).toEqual([-2, 3]);
    expect(FracSign(-2, -3)).toEqual([2, 3]);
    expect(FracSign(0, -2)).toEqual([0, 2]);
    expect(() => FracSign(-2, 0)).toThrow();
});


test('Frac', () => {
    expect(Frac(6, 4)).toEqual([3, 2]);
    expect(Frac(-4, 2)).toEqual([-2, 1]);
    expect(Frac(18, -12)).toEqual([-3, 2]);
    expect(Frac(-10, -20)).toEqual([1, 2]);
    expect(Frac(0, 2)).toEqual([0, 1]);
    expect(Frac(1.5, -2)).toEqual([-1.5, 2]);
    expect(Frac(1, 1)).toEqual([1, 1]);
    expect(() => Frac(-2, 0)).toThrow();
});


test('FracAdd', () => {
    expect(FracAdd([1, 2], [1, 3])).toEqual([5, 6]);
    expect(FracAdd([1, 2], [-1, 3])).toEqual([1, 6]);
    expect(FracAdd([2, 3], [3, 4], [4, 5])).toEqual([133, 60]);
    expect(FracAdd([2, 3], [4, 3])).toEqual([2, 1]);
    expect(() => FracAdd([2, 0], [4, 3])).toThrow();
});


test('FracMultiply', () => {
    expect(FracMultiply([1, 2], [1, 3])).toEqual([1, 6]);
    expect(FracMultiply([1, 2], [-1, 3])).toEqual([-1, 6]);
    expect(FracMultiply([2, 3], [3, 4], [4, 5])).toEqual([2, 5]);
    expect(FracMultiply([2, 3], [4, 3])).toEqual([8, 9]);
    expect(FracMultiply([0, 3], [4, 3])).toEqual([0, 1]);
    expect(() => FracMultiply([2, 0], [4, 3])).toThrow();
});

