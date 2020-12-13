

test('Slope', () => {
    expect(Slope([0, 0], [1, 2])).toBe(2);
    expect(Slope([1, 2], [0, 0])).toBe(2);
    expect(Slope([3, 4], [6, -5])).toBe(-3);
    expect(Slope([3, 4], [3, 3])).toBeNaN();
    expect(Slope([3, 3], [3, 3])).toBeNaN();
});



test('Distance', () => {
    expect(Distance([0, 0], [1, 2])).toBeCloseTo(5 ** 0.5, 12);
    expect(Distance([1, 2], [0, 0])).toBeCloseTo(5 ** 0.5, 12);
    expect(Distance([3, 4], [6, -5])).toBeCloseTo(90 ** 0.5, 12);
    expect(Distance([10, 5], [10, 5])).toBe(0);
    expect(Distance([10, 5], [-10, 5])).toBe(20);
});



test('MidPoint', () => {
    expect(MidPoint([0, 0], [1, 2])).toEqual([0.5, 1]);
    expect(MidPoint([1, 2], [0, 0])).toEqual([0.5, 1]);
    expect(MidPoint([1, 2], [1, 2])).toEqual([1, 2]);
    expect(MidPoint([3, 4], [6, -5])).toEqual([4.5, -0.5]);
});



test('DivisionPoint', () => {
    expect(DivisionPoint([0, 0], [4, 8], 0.25)).toEqual([1, 2]);
    expect(DivisionPoint([0, 0], [4, 8], 1.25)).toEqual([5, 10]);
    expect(DivisionPoint([0, 0], [4, 8], -0.25)).toEqual([-1, -2]);
});



test('SumPoint', () => {
    expect(SumPoint([1, 2], [3, 4], [5, 6])).toEqual([9, 12]);
});


test('ScalePoint', () => {
    expect(ScalePoint([1, 2], 2)).toEqual([2, 4]);
    expect(ScalePoint([1, 2], -2)).toEqual([-2, -4]);
});




test('DiffPoint', () => {
    expect(DiffPoint([1, 2], [10, 5])).toEqual([9, 3]);
    expect(DiffPoint([1, 2], [1, 2])).toEqual([0, 0]);
});





test('RotatePoint', () => {
    expect(RotatePoint([1, 2], [0, 0], 90)).toEqual([-2, 1]);
    expect(RotatePoint([1, 2], [0, 0], 180)).toEqual([-1, -2]);
    expect(RotatePoint([1, 2], [0, 0], 270)).toEqual([2, -1]);
    expect(RotatePoint([1, 2], [0, 0], 360)).toEqual([1, 2]);
});


test('Inclination', () => {
    expect(Inclination([1, 0], [3, 2])).toBe(45);
    expect(Inclination([3, 2], [1, 0])).toBe(-135);
});




test('Normal', () => {
    expect(Normal([1, 0], [3, 2])).toBe(-45);
    expect(Normal([3, 2], [1, 0])).toBe(135);
});


test('PerpendicularFoot', () => {
    const p1 = PerpendicularFoot([-1, -1], [1, 1], [-2, 2]);
    expect(p1[0]).toBeCloseTo(0);
    expect(p1[1]).toBeCloseTo(0);
    const p2 = PerpendicularFoot([-1, -1], [1, 1], [0, 0]);
    expect(p2[0]).toBeCloseTo(0);
    expect(p2[1]).toBeCloseTo(0);

});


test('Intersection', () => {
    expect(Intersection([0, 0], [2, 2], [2, 0], [0, 2])).toEqual([1, 1]);
    expect(Intersection([2, 1], [-1, 1], [1, -1], [1, 2])).toEqual([1, 1]);
    expect(Intersection([0, 0], [2, 2], [0, 0], [2, 2])).toEqual([NaN, NaN]);
});



test('Intersection', () => {
    expect(TranslatePoint([1, 2], 90, 3)).toEqual([1, 5]);
    expect(TranslatePoint([1, 2], -90, 3)).toEqual([1, -1]);
    expect(TranslatePoint([1, 2], 180, 3)).toEqual([-2, 2]);
    expect(TranslatePoint([1, 2], 0, 3)).toEqual([4, 2]);
    const p1 = TranslatePoint([1, 2], 30, 3);
    expect(p1[0]).toBeCloseTo(3.598);
    expect(p1[1]).toBeCloseTo(3.5);
    const p2 = TranslatePoint([1, 2], [10, 12], 3);
    expect(p2[0]).toBeCloseTo(3.00689);
    expect(p2[1]).toBeCloseTo(4.22988);
});

