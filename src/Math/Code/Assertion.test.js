test('IsNum', () => {
    const T = [0, 4, -2, 1.23, -4.567, 9999999, 1 / 3];
    const F = [NaN, Infinity, '2'];
    testAssertion(IsNum, T, F);
});


test('IsInteger', () => {
    const T = [0, 13, -5, -1045372, 4721, (1.1 ** 2) * 100];
    const F = [0.5, 1.12, -55.6];
    testAssertion(IsInteger, T, F);
});



test('IsDecimal', () => {
    const T = [0.5, 1.12, -55.6];
    const F = [0, 13, -5, -1045372, 4721];
    testAssertion(IsDecimal, T, F);
});



test('IsTerminating', () => {
    const T = [1 / 2, 1 / 4, 1 / 8, 1 / 16, 12.3456789, -123.456789, 0];
    const F = [1 / 3, 3 / 13, 2 ** 0.5];
    testAssertion(IsTerminating, T, F);
});


test('IsRational', () => {
    const T = [0.5, 1.12, -55.6, 0, 123 / 456, -1 / 999, 123456 / 321];
    const F = [2 ** 0.5, 3 ** 0.5, Math.sin(0.1)];
    testAssertion(IsRational, T, F);
});






test('IsOdd', () => {
    const T = [1, -1, 3, 99, (1.1 ** 2) * 100];
    const F = [2, 0, -4, 0.5];
    testAssertion(IsOdd, T, F);
});





test('IsEven', () => {
    const T = [2, -2, 4, 96, 0, (1.1 ** 2) * 100 - 1];
    const F = [1, 3, -5, 0.5];
    testAssertion(IsEven, T, F);
});





test('IsProbability', () => {
    const T = [1, 0, 0.123, 0.678];
    const F = [-0.5, 1.1, 3];
    testAssertion(IsProbability, T, F);
});



test('IsSquareNum', () => {
    const T = [0, 1, 4, 9, 16, 25, 36, ((1.1 ** 2) * 100) ** 2];
    const F = [2, 1.5, -4, -1];
    testAssertion(IsSquareNum, T, F);
});



test('IsPositive', () => {
    const T = [4, 1, 1.4, 123, 0.001, 0.1, 0.00000001];
    const F = [0, -1, -4.5];
    testAssertion(IsPositive, T, F);
});


test('IsNonNegative', () => {
    const T = [0, 4, 1, 1.4, 123, 0.001, 0.1, 0.00000001];
    const F = [-1, -4.5];
    testAssertion(IsNonNegative, T, F);
});


test('IsPositiveInteger', () => {
    const T = [1, 2, 3, 4, 5, 99];
    const F = [0, -1, -2, -1.5, 1.5, 0.01];
    testAssertion(IsPositiveInteger, T, F);
});


test('IsNonNegativeInteger', () => {
    const T = [0, 1, 2, 3, 4, 5, 99];
    const F = [-1, -2, -1.5, 1.5, 0.01];
    testAssertion(IsNonNegativeInteger, T, F);
});




test('IsNegative', () => {
    const T = [-4, -1, -1.4, -123, -0.001, -0.1, -0.00000001];
    const F = [0, 1, 4.5];
    testAssertion(IsNegative, T, F);
});






test('IsNonZero', () => {
    const T = [1, 1.4, -123, -0.001, 0.1, 4, 9];
    const F = [0, -0, 1e-15];
    testAssertion(IsNonZero, T, F);
});




test('IsBetween', () => {
    const T = [2, 3, 4, 5, 2.5, 4.99];
    const F = [0, 1, 5.001, -1, -3];
    testAssertion(IsBetween(2, 5), T, F);
});




test('IsAbsBetween', () => {
    const T = [2, 3, 4, 5, 2.5, 4.99, -2, -3, -4, -5, -2.5, -4.99];
    const F = [0, 1, 5.001, -1, -6];
    testAssertion(IsAbsBetween(2, 5), T, F);
});





test('IsAroundPoint', () => {
    const T = [[1, 0], [2, 0], [0, -2], [2, 2]];
    const F = [[3, 0], [4, 0], [0, -3], [2.01, 0]];
    testAssertion(IsAroundPoint([0, 0], 2), T, F, false);
});



test('IsTriangle', () => {
    const T = [[1, 1, 1], [6, 7, 8]];
    const F = [[1, 2, 3], [6, 14, 8]];
    testAssertion(IsTriangle, T, F, false);
});




// test('IsPoint', () => {
//     const T = [[2, 5]];
//     const F = [2, [1, 2, 3], [NaN, NaN], ['1', '2']];
//     testAssertion(IsPoint, T, F);
// });


// test('IsFraction', () => {
//     const T = [[2, 5]];
//     const F = [2, [1, 2, 3], [NaN, NaN], ['1', '2']];
//     testAssertion(IsFraction, T, F);
// });


// test('IsVector', () => {
//     const T = [[2, 5]];
//     const F = [2, [1, 2, 3], [NaN, NaN], ['1', '2']];
//     testAssertion(IsVector, T, F);
// });




// test('IsIneqSign', () => {
//     const T = ['>', '<', '>=', '<=', '\\gt', '\\lt', '\\ge', '\\le'];
//     const F = [1, 2, '=>', 'abc'];
//     testAssertion(IsIneqSign, T, F);
// });



// test('IsDfrac', () => {
//     const T = ['\\dfrac{1}{2}', '\\dfrac{-1}{2}', '\\dfrac{3}{2}'];
//     const F = [1, 2, '-3', '0', '\\dfrac{1}{x}'];
//     testAssertion(IsDfrac, T, F);
// });






// test('IsConstraint', () => {
//     const T = [[1, 2, '>', 3], [1, 2, '\\ge', -3]];
//     const F = [[1, 2, 3], [1, 2, '=>', 3]];
//     testAssertion(IsConstraint, T, F);
// });




// test('IsString', () => {
//     const T = ['', 'abc', '1', '1.23'];
//     const F = [1, -1, NaN, Infinity, undefined, null, true, false];
//     testAssertion(IsString, T, F, false);
// });



// test('IsBoolean', () => {
//     const T = [true, false];
//     const F = [0, 1, -1, '1', NaN, Infinity, undefined, null];
//     testAssertion(IsBoolean, T, F, false);
// });


// test('IsEmptyObject', () => {
//     const T = [{}];
//     const F = [1, '', { x: 1 }];
//     testAssertion(IsEmptyObject, T, F);
// });





// test('IsArray', () => {
//     const T = [[], [1, 2, 3]];
//     const F = [1, '', { x: 1 }];
//     testAssertion(IsArray, T, F);
// });


// test('IsArrayOfLength', () => {
//     const T = [[1, 2], ['2', '3']];
//     const F = [[], [1], [1, 2, 3], 1, '', { x: 1 }];
//     testAssertion(IsArrayOfLength(2), T, F);
// });
