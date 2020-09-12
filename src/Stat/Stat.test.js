
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
