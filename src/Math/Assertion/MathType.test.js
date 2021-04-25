
test('IsPoint', () => {
    const T = [[2, 5]];
    const F = [2, [1, 2, 3], [NaN, NaN], ['1', '2']];
    testAssertion(IsPoint, T, F);
});


test('IsFraction', () => {
    const T = [[2, 5]];
    const F = [2, [1, 2, 3], [NaN, NaN], ['1', '2']];
    testAssertion(IsFraction, T, F);
});


test('IsVector', () => {
    const T = [[2, 5]];
    const F = [2, [1, 2, 3], [NaN, NaN], ['1', '2']];
    testAssertion(IsVector, T, F);
});




test('IsIneqSign', () => {
    const T = ['>', '<', '>=', '<=', '\\gt', '\\lt', '\\ge', '\\le'];
    const F = [1, 2, '=>', 'abc'];
    testAssertion(IsIneqSign, T, F);
});



test('IsDfrac', () => {
    const T = ['\\dfrac{1}{2}', '\\dfrac{-1}{2}', '\\dfrac{3}{2}'];
    const F = [1, 2, '-3', '0', '\\dfrac{1}{x}'];
    testAssertion(IsDfrac, T, F);
});






test('IsConstraint', () => {
    const T = [[1, 2, '>', 3], [1, 2, '\\ge', -3]];
    const F = [[1, 2, 3], [1, 2, '=>', 3]];
    testAssertion(IsConstraint, T, F);
});

