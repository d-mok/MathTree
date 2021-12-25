
test('Crammer', () => {
    expect(Crammer(1, 1, 5, 1, -1, 1)).toEqual([3, 2]);
    expect(Crammer(2, 3, 23, 4, -5, -9)).toEqual([4, 5]);
    expect(() => Crammer(1, 1, 2, 2, 2, 4)).toThrow();
    expect(() => Crammer(1, 1, 2, 2, 2, 5)).toThrow();
});








test('xPolynomial', () => {
    expect(xPolynomial([1, 2, 3], [4, 5])).toEqual([4, 13, 22, 15]);
    expect(xPolynomial([4, 5], [1, 2, 3])).toEqual([4, 13, 22, 15]);
    expect(xPolynomial([2, 3], [4, -5])).toEqual([8, 2, -15]);
    expect(xPolynomial([2], [4, -5, 10])).toEqual([8, -10, 20]);
    expect(xPolynomial([1, 0, 0], [1, 0, 0, 0, 0])).toEqual([1, 0, 0, 0, 0, 0, 0]);
    expect(() => xPolynomial([0, 1], [1, 1])).toThrow();
});

