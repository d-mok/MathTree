
test('Min', () => {
    expect(Min(1, 2, 3)).toBe(1);
    expect(Min(4, 6, 8)).toBe(4);
    expect(Min(24, 36, -60)).toBe(-60);
    expect(Min(5, 10, 4.1)).toBe(4.1);
    expect(Min(1, 1)).toBe(1);
    expect(Min(0.1, 0.2)).toBe(0.1);
});



test('Max', () => {
    expect(Max(1, 2, 3)).toBe(3);
    expect(Max(4, 6, 8)).toBe(8);
    expect(Max(24, 36, -60)).toBe(36);
    expect(Max(5, 10, 4.1)).toBe(10);
    expect(Max(1, 1)).toBe(1);
    expect(Max(0.1, 0.2)).toBe(0.2);
});



test('Sort', () => {
    expect(Sort(2, 3, 1)).toEqual([1, 2, 3]);
    expect(Sort(2, -3, 1)).toEqual([-3, 1, 2]);
    expect(Sort(4.5, 3, 2, 1)).toEqual([1, 2, 3, 4.5]);
    expect(Sort(3, 2, 2, 0, 1)).toEqual([0, 1, 2, 2, 3]);
});



test('SortBy', () => {
    expect(SortBy([2, 3, 1], x => x)).toEqual([1, 2, 3]);
    expect(SortBy([2, -3, 1], x => x)).toEqual([-3, 1, 2]);
    expect(SortBy([4.5, 3, 2, 1], x => x)).toEqual([1, 2, 3, 4.5]);
    expect(SortBy([3, 2, 2, 0, 1], x => x)).toEqual([0, 1, 2, 2, 3]);

    expect(SortBy([2, 3, 1], x => -x)).toEqual([3, 2, 1]);

    expect(SortBy(["aa", "aaa", "a"], x => x.length)).toEqual(["a", "aa", "aaa"]);

});



test('Sum', () => {
    expect(Sum(2, 3, 1)).toBe(6);
    expect(Sum(2, -3, 1)).toBe(0);
    expect(Sum(4.5, 3, 2, 1)).toBe(10.5);
    expect(Sum(3, 2, 2, 0, 1)).toBe(8);
});




test('Mean', () => {
    expect(Mean(2, 3, 1)).toBe(2);
    expect(Mean(2, -3, 1)).toBe(0);
    expect(Mean(4.5, 3, 2, 1)).toBe(2.625);
    expect(Mean(3, 2, 2, 0, 1)).toBe(1.6);
});

