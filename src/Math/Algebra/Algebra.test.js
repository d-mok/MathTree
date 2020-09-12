

test('Crammer', () => {
    expect(Crammer(1, 1, 5, 1, -1, 1)).toEqual([3, 2]);
    expect(Crammer(2, 3, 23, 4, -5, -9)).toEqual([4, 5]);
});

test('Discriminant', () => {
    expect(Discriminant(1, 2, 3)).toBe(-8);
    expect(Discriminant(4, -5, 6)).toBe(-71);
    expect(Discriminant(-3, 8, 6)).toBe(136);
});



test('QuadraticRoot', () => {
    expect(QuadraticRoot(1, 2, -3)).toEqual([-3, 1]);
    expect(QuadraticRoot(1, 2, 1)).toEqual([-1, -1]);
    expect(QuadraticRoot(1, 2, 3)).toEqual([undefined, undefined]);
});



test('QuadraticVertex', () => {
    expect(QuadraticVertex(1, 2, 3)).toEqual([-1, 2]);
    expect(QuadraticVertex(2, 5, -4)).toEqual([-1.25, -7.125]);
});




test('xPolynomial', () => {
    expect(xPolynomial([1, 2, 3], [4, 5])).toEqual([4, 13, 22, 15]);
    expect(xPolynomial([2, 3], [4, -5])).toEqual([8, 2, -15]);
});




