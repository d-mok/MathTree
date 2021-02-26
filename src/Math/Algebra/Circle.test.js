

test('CircleGeneral', () => {
    expect(CircleGeneral([2, 3], 5)).toEqual([-4, -6, -12]);
});


test('CircleFromGeneral', () => {
    expect(CircleFromGeneral(-4, -6, -12)).toEqual([[2, 3], 5]);
});


test('IntegralOnCircle', () => {
    expect(IntegralOnCircle([0, 0], 5)).toEqual([[[5, 0], [0, 5], [-5, 0], [0, -5]], [[4, 3], [-3, 4], [-4, -3], [3, -4]], [[3, 4], [-4, 3], [-3, -4], [4, -3]]]);
});

