

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


test('VectorScale', () => {
    expect(VectorScale([1, 2], 2)).toEqual([2, 4]);
    expect(VectorScale([1, 2], -2)).toEqual([-2, -4]);
});






test('VectorRotate', () => {
    expect(VectorRotate([1, 2], 90)).toEqual([-2, 1]);
    expect(VectorRotate([1, 2], 180)).toEqual([-1, -2]);
    expect(VectorRotate([1, 2], 270)).toEqual([2, -1]);
    expect(VectorRotate([1, 2], 360)).toEqual([1, 2]);
});

