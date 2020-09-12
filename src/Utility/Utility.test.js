
test('HCF', () => {
    expect(HCF(1, 2, 3)).toBe(1);
    expect(HCF(4, 6, 8)).toBe(2);
    expect(HCF(24, 36, -60)).toBe(12);
    expect(HCF(5, 10, 5.1)).toBe(1);
    expect(HCF(1, 1)).toBe(1);
    expect(HCF(0.1, 0.2)).toBe(1);
});



test('LCM', () => {
    expect(LCM(1, 2, 3)).toBe(6);
    expect(LCM(4, 6, 8)).toBe(24);
    expect(LCM(24, 36, -60)).toBe(360);
    expect(LCM(1, 1)).toBe(1);
    expect(LCM(10, 2.5)).toBe(25);
});
