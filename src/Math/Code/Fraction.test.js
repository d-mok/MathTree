
// test('FracSign', () => {
//     expect(FracSign(2, 3)).toEqual([2, 3]);
//     expect(FracSign(-2, 3)).toEqual([-2, 3]);
//     expect(FracSign(2, -3)).toEqual([-2, 3]);
//     expect(FracSign(-2, -3)).toEqual([2, 3]);
//     expect(FracSign(0, -2)).toEqual([0, 2]);
//     expect(() => FracSign(-2, 0)).toThrow();
// });


// test('Frac', () => {
//     expect(Frac(6, 4)).toEqual([3, 2]);
//     expect(Frac(-4, 2)).toEqual([-2, 1]);
//     expect(Frac(18, -12)).toEqual([-3, 2]);
//     expect(Frac(-10, -20)).toEqual([1, 2]);
//     expect(Frac(0, 2)).toEqual([0, 1]);
//     expect(Frac(1.5, -2)).toEqual([-1.5, 2]);
//     expect(Frac(1, 1)).toEqual([1, 1]);
//     expect(() => Frac(-2, 0)).toThrow();
// });




test('ToFrac', () => {
    expect(ToFrac(0.5)).toEqual([1, 2]);
    expect(ToFrac(-456 / 123)).toEqual([-152, 41]);

    for (let i = 0; i <= 100; i++) {
        for (let j = 1; j <= 100; j++) {
            I = i * RndU();
            let v = I / j;
            let [p, q] = ToFrac(v);
            expect(I * q - p * j === 0).toBe(true);
        }
    }
});



