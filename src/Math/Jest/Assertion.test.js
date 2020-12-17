

function testAssertion(func, truthy, falsy, withTrash = true) {
    const trash = ['2', '-2', '0.5', NaN, Infinity, undefined, null, true, false];
    if (withTrash)
        falsy = [...falsy, ...trash];

    for (t of truthy) {
        expect(func(t)).toBe(true);
    }
    expect(func(...truthy)).toBe(true);
    for (f of falsy) {
        expect(func(f)).toBe(false);
    }
    expect(func(...falsy)).toBe(false);
    expect(func(falsy[0], ...truthy)).toBe(false);
    expect(func(truthy[1], ...falsy)).toBe(false);
}




test('IsNum', () => {
    const T = [0, 4, -2, 1.23, -4.567, 9999999, 1 / 3];
    const F = [];
    testAssertion(IsNum, T, F);
});


test('IsInteger', () => {
    const T = [0, 13, -5, -1045372, 4721];
    const F = [0.5, 1.12, -55.6];
    testAssertion(IsInteger, T, F);
});



test('IsDecimal', () => {
    const T = [0.5, 1.12, -55.6];
    const F = [0, 13, -5, -1045372, 4721];
    testAssertion(IsDecimal, T, F);
});



test('IsCoeff', () => {
    const T = [2, 3, -2, -5];
    const F = [-1, 0, 1, 1.23, -0.5];
    testAssertion(IsCoeff, T, F);
});


test('IsOdd', () => {
    const T = [1, -1, 3, 99];
    const F = [2, 0, -4, 0.5];
    testAssertion(IsOdd, T, F);
});





test('IsEven', () => {
    const T = [2, -2, 4, 96, 0];
    const F = [1, 3, -5, 0.5];
    testAssertion(IsEven, T, F);
});





test('IsProbability', () => {
    const T = [1, 0, 0.123, 0.678];
    const F = [-0.5, 1.1, 3];
    testAssertion(IsProbability, T, F);
});



test('IsSquareNum', () => {
    const T = [0, 1, 4, 9, 16, 25, 36];
    const F = [2, 1.5, -4, -1];
    testAssertion(IsSquareNum, T, F);
});



test('IsPositive', () => {
    const T = [4, 1, 1.4, 123, 0.001, 0.1, 0.00000001];
    const F = [0, -1, -4.5];
    testAssertion(IsPositive, T, F);
});



test('IsNegative', () => {
    const T = [-4, -1, -1.4, -123, -0.001, -0.1, -0.00000001];
    const F = [0, 1, 4.5];
    testAssertion(IsNegative, T, F);
});






test('IsNonZero', () => {
    const T = [1, 1.4, -123, -0.001, 0.1, 4, 9];
    const F = [0, -0];
    testAssertion(IsNonZero, T, F);
});


test('IsString', () => {
    const T = ['', 'abc', '1', '1.23'];
    const F = [1, -1, NaN, Infinity, undefined, null, true, false];
    testAssertion(IsString, T, F, false);
});

test('IsEmptyObject', () => {
    const T = [{}];
    const F = [1, '', { x: 1 }, NaN, Infinity, undefined, null, true, false];
    testAssertion(IsEmptyObject, T, F, false);
});



test('IsArray', () => {
    const T = [[], [1, 2, 3]];
    const F = [1, '', { x: 1 }, NaN, Infinity, undefined, null, true, false];
    testAssertion(IsArray, T, F, false);
});
