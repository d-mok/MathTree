
test('HCF', () => {
    expect(HCF(1, 2, 3)).toBe(1);
    expect(HCF(4, 6, 8)).toBe(2);
    expect(HCF(24, 36, -60)).toBe(12);
    expect(HCF(1, 1)).toBe(1);
    expect(HCF(5, 10, 5.1)).toBeNaN();
    expect(HCF(0.1, 0.2)).toBeNaN();
    expect(HCF(0, 3)).toBeNaN();
});



test('LCM', () => {
    expect(LCM(1, 2, 3)).toBe(6);
    expect(LCM(4, 6, 8)).toBe(24);
    expect(LCM(24, 36, -60)).toBe(360);
    expect(LCM(1, 1)).toBe(1);
    expect(LCM(10, 2.5)).toBeNaN();
    expect(LCM(0, 3)).toBeNaN();
});

test('Clone', () => {
    expect(Clone([1, 2, 3])).toEqual([1, 2, 3]);
    expect(Clone({ x: 1 })).toEqual({ x: 1 });
});



test('Pairs', () => {
    expect(Pairs(1, 2, 3)).toEqual([[1, 2], [1, 3], [2, 3]]);
    expect(Pairs(1)).toEqual([]);
});


test('Dedupe', () => {
    expect(Dedupe([1, 2, 3, 3, 4, 5, 5, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(Dedupe([[1, 2], [1, 2], [1, 3]])).toEqual([[1, 2], [1, 3]]);
});
