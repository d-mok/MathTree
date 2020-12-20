

test('AreDistinct', () => {
    expect(AreDistinct(1, 2, 3)).toBe(true);
    expect(AreDistinct(1, -1, 2)).toBe(true);
    expect(AreDistinct(1, 0.999, 5)).toBe(true);
    expect(AreDistinct(0, 0.00001)).toBe(true);
    expect(AreDistinct(0)).toBe(true);
    expect(AreDistinct(1, 1, 2)).toBe(false);
    expect(AreDistinct(0, -0)).toBe(false);
    expect(AreDistinct(55, 98, 55, 34)).toBe(false);
});


test('AreAbsDistinct', () => {
    expect(AreAbsDistinct(1, 2, 3)).toBe(true);
    expect(AreAbsDistinct(1, -3, 2)).toBe(true);
    expect(AreAbsDistinct(1, 0.999, 5)).toBe(true);
    expect(AreAbsDistinct(0, 0.00001)).toBe(true);
    expect(AreAbsDistinct(0)).toBe(true);
    expect(AreAbsDistinct(1, 1, 2)).toBe(false);
    expect(AreAbsDistinct(1, -1)).toBe(false);
    expect(AreAbsDistinct(55, 98, -55, 34)).toBe(false);
});



test('AreSameSign', () => {
    expect(AreSameSign(1, 2, 3)).toBe(true);
    expect(AreSameSign(0.1, 1, 2)).toBe(true);
    expect(AreSameSign(1, 1, 2)).toBe(true);
    expect(AreSameSign(1, 0.999, 5, 999)).toBe(true);
    expect(AreSameSign(-1, -2, - 3)).toBe(true);
    expect(AreSameSign(-0.1, -1, -2)).toBe(true);
    expect(AreSameSign(-1, -0.999, - 5, -999)).toBe(true);
    expect(AreSameSign(1)).toBe(true);
    expect(AreSameSign(0)).toBe(true);
    expect(AreSameSign(-1)).toBe(true);
    expect(AreSameSign(1, -1)).toBe(false);
    expect(AreSameSign(1, 0)).toBe(false);
    expect(AreSameSign(55, 0, 55, 34)).toBe(false);
});


test('AreCoprime', () => {
    expect(AreCoprime(2, 3)).toBe(true);
    expect(AreCoprime(1, 2)).toBe(true);
    expect(AreCoprime(2, -5)).toBe(true);
    expect(AreCoprime(0.5, 2)).toBe(true);
    expect(AreCoprime(1, 1)).toBe(true);
    expect(AreCoprime(2, 3, 6)).toBe(false);
    expect(AreCoprime(4, 4)).toBe(false);
    expect(AreCoprime(2, 4, 6)).toBe(false);
    expect(AreCoprime(5, 10)).toBe(false);
    expect(AreCoprime(5, -10)).toBe(false);
    expect(AreCoprime(-5, -10)).toBe(false);
    expect(AreCoprime(12, 36, 4)).toBe(false);
});



test('AreDistantPoint', () => {
    expect(AreDistantPoint(2)([0, 0], [3, 0])).toBe(true);
    expect(AreDistantPoint(2)([0, 0], [1, 0])).toBe(false);
});

