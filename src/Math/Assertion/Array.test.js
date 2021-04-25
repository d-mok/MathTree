

test('IsArray', () => {
    const T = [[], [1, 2, 3]];
    const F = [1, '', { x: 1 }];
    testAssertion(IsArray, T, F);
});


test('IsArrayOfLength', () => {
    const T = [[1, 2], ['2', '3']];
    const F = [[], [1], [1, 2, 3], 1, '', { x: 1 }];
    testAssertion(IsArrayOfLength(2), T, F);
});
