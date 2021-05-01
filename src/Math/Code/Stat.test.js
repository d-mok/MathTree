
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
    expect(Sum()).toBe(0);
});




test('Mean', () => {
    expect(Mean(2, 3, 1)).toBe(2);
    expect(Mean(2, -3, 1)).toBe(0);
    expect(Mean(4.5, 3, 2, 1)).toBe(2.625);
    expect(Mean(3, 2, 2, 0, 1)).toBe(1.6);
    expect(() => Mean()).toThrow();
});






test('Median', () => {
    expect(Median(1, 2, 3, 4, 50)).toBe(3);
    expect(Median(1, 2, 3, 4, 5, 7)).toBe(3.5);
    expect(Median(4, 5, 7, 1, 2, 3)).toBe(3.5);
    expect(Median(11, 23, 45, 67, 89, 134, 457, 688)).toBe(78);
});




test('LowerQ', () => {
    expect(LowerQ(1, 2, 3, 4, 50)).toBe(1.5);
    expect(LowerQ(1, 2, 3, 4, 5, 7)).toBe(2);
    expect(LowerQ(1, 2, 3, 4, 5, 7, 10)).toBe(2);
    expect(LowerQ(1, 2, 3, 4, 5, 7, 10, 20)).toBe(2.5);
});



test('UpperQ', () => {
    expect(UpperQ(1, 2, 3, 4, 50)).toBe(27);
    expect(UpperQ(1, 2, 3, 4, 5, 7)).toBe(5);
    expect(UpperQ(1, 2, 3, 4, 5, 7, 10)).toBe(7);
    expect(UpperQ(1, 2, 3, 4, 5, 7, 10, 20)).toBe(8.5);
});



test('Frequency', () => {
    expect(Frequency(1)(2, 3, 4, 1, 5, 1, 1, 4, 5)).toBe(3);
});


test('Mode', () => {
    expect(Mode(1, 2, 3, 2, 2, 3, 4)).toEqual([2]);
    expect(Mode(1, 1, 2, 2, 3)).toEqual([1, 2]);
});


test('StdDev', () => {
    expect(StdDev(1, 2, 3, 2, 2, 3, 4)).toBeCloseTo(0.903507902);
    expect(StdDev(1, 1, 2, 2, 3)).toBeCloseTo(0.748331477);
});

