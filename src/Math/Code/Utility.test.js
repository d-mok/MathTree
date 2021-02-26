
test('HCF', () => {
    expect(HCF(1, 2, 3)).toBe(1);
    expect(HCF(4, 6, 8)).toBe(2);
    expect(HCF(24, 36, -60)).toBe(12);
    expect(HCF(1, 1)).toBe(1);
    expect(() => HCF(5, 10, 5.1)).toThrow();
    expect(() => HCF(0.1, 0.2)).toThrow();
    expect(() => HCF(0, 3)).toThrow();
});



test('LCM', () => {
    expect(LCM(1, 2, 3)).toBe(6);
    expect(LCM(4, 6, 8)).toBe(24);
    expect(LCM(24, 36, -60)).toBe(360);
    expect(LCM(1, 1)).toBe(1);
    expect(() => LCM(10, 2.5)).toThrow();
    expect(() => LCM(0, 3)).toThrow();
});





test('Romanize', () => {
    expect(Romanize(1)).toBe('I');
    expect(Romanize(2)).toBe('II');
    expect(Romanize(3)).toBe('III');
    expect(Romanize(4)).toBe('IV');
    expect(Romanize(5)).toBe('V');
    expect(Romanize(6)).toBe('VI');
    expect(() => Romanize(0)).toThrow();
});




test('DeRomanize', () => {
    expect(DeRomanize('I')).toBe(1);
    expect(DeRomanize('II')).toBe(2);
    expect(DeRomanize('III')).toBe(3);
    expect(DeRomanize('IV')).toBe(4);
    expect(DeRomanize('V')).toBe(5);
    expect(() => DeRomanize('XI')).toThrow();
});



test('Clone', () => {
    expect(Clone([1, 2, 3])).toEqual([1, 2, 3]);
    expect(Clone({ x: 1 })).toEqual({ x: 1 });
});



test('Pairs', () => {
    expect(Pairs(1, 2, 3)).toEqual([[1, 2], [1, 3], [2, 3]]);
    expect(Pairs(1)).toEqual([]);
});



test('PairsEvery', () => {
    expect(PairsEvery(AreDistinct)(1, 2, 3)).toBe(true);
    expect(PairsEvery((a, b) => a + b > 5)(3, 3, 4)).toBe(true);
    expect(PairsEvery((a, b) => a + b > 5)(3, 3, 2)).toBe(false);
});





test('Dedupe', () => {
    expect(Dedupe([1, 2, 3, 3, 4, 5, 5, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(Dedupe([[1, 2], [1, 2], [1, 3]])).toEqual([[1, 2], [1, 3]]);
});
