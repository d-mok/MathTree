
test('IsString', () => {
    const T = ['', 'abc', '1', '1.23'];
    const F = [1, -1, NaN, Infinity, undefined, null, true, false];
    testAssertion(IsString, T, F, false);
});



test('IsBoolean', () => {
    const T = [true, false];
    const F = [0, 1, -1, '1', NaN, Infinity, undefined, null];
    testAssertion(IsBoolean, T, F, false);
});


test('IsEmptyObject', () => {
    const T = [{}];
    const F = [1, '', { x: 1 }];
    testAssertion(IsEmptyObject, T, F);
});

