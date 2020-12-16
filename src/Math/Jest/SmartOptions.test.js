
test('ListIntegers', () => {
    expect(ListIntegers(2, 6)).toEqual([2, 3, 4, 5, 6]);
    expect(ListIntegers(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
});

