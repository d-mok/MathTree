

test('Crammer', () => {
    expect(Crammer(1, 1, 5, 1, -1, 1)).toEqual([3, 2]);
    expect(Crammer(2, 3, 23, 4, -5, -9)).toEqual([4, 5]);
    expect(() => Crammer(1, 1, 2, 2, 2, 4)).toThrow();
    expect(() => Crammer(1, 1, 2, 2, 2, 5)).toThrow();
});






test('Discriminant', () => {
    expect(Discriminant(1, 2, 3)).toBe(-8);
    expect(Discriminant(4, -5, 6)).toBe(-71);
    expect(Discriminant(-3, 8, 6)).toBe(136);
});



test('QuadraticRoot', () => {
    expect(QuadraticRoot(1, 2, -3)).toEqual([-3, 1]);
    expect(QuadraticRoot(-1, -2, 3)).toEqual([-3, 1]);
    expect(QuadraticRoot(1, 2, 1)).toEqual([-1, -1]);
    expect(() => QuadraticRoot(1, 2, 3)).toThrow();
    expect(() => QuadraticRoot(0, 2, 3)).toThrow();
});



test('QuadraticVertex', () => {
    expect(QuadraticVertex(1, 2, 3)).toEqual([-1, 2]);
    expect(QuadraticVertex(2, 5, -4)).toEqual([-1.25, -7.125]);
    expect(() => QuadraticVertex(0, 5, -4)).toThrow();
});




test('QuadraticFromRoot', () => {
    expect(QuadraticFromRoot(1, 2, 3)).toEqual([1, -5, 6]);
    expect(QuadraticFromRoot(-2, 4, -3)).toEqual([-2, 2, 24]);
    expect(() => QuadraticFromRoot(0, 4, -3)).toThrow();
});





test('QuadraticFromVertex', () => {
    expect(QuadraticFromVertex(1, 2, 3)).toEqual([1, -4, 7]);
    expect(QuadraticFromVertex(-2, 4, -3)).toEqual([-2, 16, -35]);
    expect(() => QuadraticFromVertex(0, 4, -3)).toThrow();
});





test('xPolynomial', () => {
    expect(xPolynomial([1, 2, 3], [4, 5])).toEqual([4, 13, 22, 15]);
    expect(xPolynomial([4, 5], [1, 2, 3])).toEqual([4, 13, 22, 15]);
    expect(xPolynomial([2, 3], [4, -5])).toEqual([8, 2, -15]);
    expect(xPolynomial([2], [4, -5, 10])).toEqual([8, -10, 20]);
    expect(xPolynomial([1, 0, 0], [1, 0, 0, 0, 0])).toEqual([1, 0, 0, 0, 0, 0, 0]);
    expect(() => xPolynomial([0, 1], [1, 1])).toThrow();
});



test('LinearFeature', () => {
    expect(LinearFeature(2, 4, 6)).toEqual([-3, -1.5, -0.5]);
    expect(() => LinearFeature(0, 4, 6)).toThrow();
    expect(() => LinearFeature(2, 0, 6)).toThrow();
});






test('LinearFromIntercepts', () => {
    expect(LinearFromIntercepts(1, 2)).toEqual([2, 1, -2]);
    expect(LinearFromIntercepts(-3, 2)).toEqual([2, -3, 6]);
    expect(LinearFromIntercepts(4, -2)).toEqual([1, -2, -4]);
    expect(() => LinearFromIntercepts(0, -2)).toThrow();
});



test('LinearFromIntercepts', () => {
    expect(LinearFromTwoPoints([1, 2], [3, 4])).toEqual([1, -1, 1]);
    expect(LinearFromTwoPoints([0, 0], [3, 4])).toEqual([4, -3, 0]);
    expect(() => LinearFromTwoPoints([1, 2], [1, 2])).toThrow();
});

