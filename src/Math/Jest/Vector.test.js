

test('Vector', () => {
    expect(Vector([1, 2], [10, 5])).toEqual([9, 3]);
    expect(Vector([1, 2], [1, 2])).toEqual([0, 0]);
});




test('VectorAdd', () => {
    expect(VectorAdd([1, 2], [3, 4], [5, 6])).toEqual([9, 12]);
    expect(VectorAdd([-1, 2], [3, -4])).toEqual([2, -2]);
});



test('VectorMean', () => {
    expect(VectorMean([1, 2], [3, 4], [5, 6])).toEqual([3, 4]);
    expect(VectorMean([0, 0], [2, 0], [2, 2], [0, 2])).toEqual([1, 1]);
});



test('VectorLength', () => {
    expect(VectorLength([-3, 4])).toBe(5);
    expect(VectorLength([0, 0])).toBe(0);
    expect(VectorLength([1, 2])).toBeCloseTo(5 ** 0.5, 12);
});



test('VectorArg', () => {
    expect(VectorArg([2, 0])).toBe(0);
    expect(VectorArg([0, 2])).toBe(90);
    expect(VectorArg([-2, 0])).toBe(180);
    expect(VectorArg([0, -2])).toBe(270);
    expect(VectorArg([0, 0])).toBe(0);
    expect(VectorArg([1, 1])).toBe(45);
    expect(VectorArg([-3, 4])).toBeCloseTo(126.8698976);
});




test('VectorScale', () => {
    expect(VectorScale([1, 2], 2)).toEqual([2, 4]);
    expect(VectorScale([1, 2], -2)).toEqual([-2, -4]);
});



test('VectorRev', () => {
    expect(VectorRev([-3, 4])).toEqual([3, -4]);
    expect(VectorRev([0, 0])).toEqual([-0, -0]);
    expect(VectorRev([1, 2])).toEqual([-1, -2]);
});



test('VectorUnit', () => {
    expect(VectorUnit([2, 0])).toEqual([1, 0]);
    expect(VectorUnit([0, -2])).toEqual([0, -1]);
    let v = VectorUnit([1, 2]);
    expect(v[0]).toBeCloseTo(1 / (5 ** 0.5), 12);
    expect(v[1]).toBeCloseTo(2 / (5 ** 0.5), 12);
});



test('VectorScaleTo', () => {
    expect(VectorScaleTo([2, 0], 10)).toEqual([10, 0]);
    expect(VectorScaleTo([0, -2], 100)).toEqual([0, -100]);
    expect(VectorScaleTo([-3, 4], 15)).toEqual([-9, 12]);
});






test('VectorRotate', () => {
    expect(VectorRotate([1, 2], 90)).toEqual([-2, 1]);
    expect(VectorRotate([1, 2], 180)).toEqual([-1, -2]);
    expect(VectorRotate([1, 2], 270)).toEqual([2, -1]);
    expect(VectorRotate([1, 2], 360)).toEqual([1, 2]);
});

