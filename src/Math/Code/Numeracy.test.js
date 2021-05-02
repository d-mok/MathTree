
test('Divide', () => {
    expect(Divide(6, 2)).toBe(3);
    expect(() => Divide(6, 0)).toThrow();
});



test('Abs', () => {
    expect(Abs(0)).toBe(0);
    expect(Abs(12.5)).toBe(12.5);
    expect(Abs(-2)).toBe(2);
    expect(Abs(-34.5)).toBe(34.5);
    expect(Abs(-1234)).toBe(1234);
    expect(Abs(-0)).toBe(0);
    expect(Abs(6)).toBe(6);
});


test('Sign', () => {
    expect(Sign(0)).toBe(0);
    expect(Sign(12.5)).toBe(1);
    expect(Sign(-2)).toBe(-1);
    expect(Sign(-34.5)).toBe(-1);
    expect(Sign(-1234)).toBe(-1);
    expect(Sign(-0)).toBe(0);
    expect(Sign(6)).toBe(1);
});


test('Round', () => {
    expect(Round(123.4567, 1)).toBe(100);
    expect(Round(123.4567, 2)).toBe(120);
    expect(Round(123.4567, 3)).toBe(123);
    expect(Round(123.4567, 4)).toBe(123.5);
    expect(Round(123.4567, 5)).toBe(123.46);
    expect(Round(123.4567, 6)).toBe(123.457);
    expect(Round(123.4567, 7)).toBe(123.4567);
    expect(Round(123.4567, 8)).toBe(123.4567);

    expect(Round(1.005, 1)).toBe(1);
    expect(Round(1.005, 2)).toBe(1);
    expect(Round(1.005, 3)).toBe(1.01);
    expect(Round(1.005, 4)).toBe(1.005);
    expect(Round(1.005, 5)).toBe(1.005);

    expect(Round(1.555, 1)).toBe(2);
    expect(Round(1.555, 2)).toBe(1.6);
    expect(Round(1.555, 3)).toBe(1.56);
    expect(Round(1.555, 4)).toBe(1.555);
    expect(Round(1.555, 5)).toBe(1.555);

    expect(Round(123.9999, 5)).toBe(124);

    expect(Round(-123.4567, 3)).toBe(-123);
    expect(Round(-123.4567, 4)).toBe(-123.5);

    expect(Round(0, 1)).toBe(0);
    expect(Round(0, 2)).toBe(0);

    expect(Round(1.23455e-30, 5)).toBe(1.2346e-30);
});



test('RoundUp', () => {
    expect(RoundUp(123.4567, 1)).toBe(200);
    expect(RoundUp(123.4567, 2)).toBe(130);
    expect(RoundUp(123.4567, 3)).toBe(124);
    expect(RoundUp(123.4567, 4)).toBe(123.5);
    expect(RoundUp(123.4567, 5)).toBe(123.46);
    expect(RoundUp(123.4567, 6)).toBe(123.457);
    expect(RoundUp(123.4567, 7)).toBe(123.4567);
    expect(RoundUp(123.4567, 8)).toBe(123.4567);

    expect(RoundUp(1.005, 1)).toBe(2);
    expect(RoundUp(1.005, 2)).toBe(1.1);
    expect(RoundUp(1.005, 3)).toBe(1.01);
    expect(RoundUp(1.005, 4)).toBe(1.005);
    expect(RoundUp(1.005, 5)).toBe(1.005);

    expect(RoundUp(1.555, 1)).toBe(2);
    expect(RoundUp(1.555, 2)).toBe(1.6);
    expect(RoundUp(1.555, 3)).toBe(1.56);
    expect(RoundUp(1.555, 4)).toBe(1.555);
    expect(RoundUp(1.555, 5)).toBe(1.555);

    expect(RoundUp(123.9999, 5)).toBe(124);
    expect(RoundUp(123.0001, 5)).toBe(123.01);
    expect(RoundUp(0.1 + 0.2, 1)).toBe(0.3);


    expect(RoundUp(-123.4567, 3)).toBe(-124);
    expect(RoundUp(-123.4567, 4)).toBe(-123.5);

    expect(RoundUp(0, 1)).toBe(0);
    expect(RoundUp(0, 2)).toBe(0);

    expect(RoundUp(1.2345e-30, 5)).toBe(1.2345e-30);
});


test('RoundDown', () => {
    expect(RoundDown(123.4567, 1)).toBe(100);
    expect(RoundDown(123.4567, 2)).toBe(120);
    expect(RoundDown(123.4567, 3)).toBe(123);
    expect(RoundDown(123.4567, 4)).toBe(123.4);
    expect(RoundDown(123.4567, 5)).toBe(123.45);
    expect(RoundDown(123.4567, 6)).toBe(123.456);
    expect(RoundDown(123.4567, 7)).toBe(123.4567);
    expect(RoundDown(123.4567, 8)).toBe(123.4567);

    expect(RoundDown(1.005, 1)).toBe(1);
    expect(RoundDown(1.005, 2)).toBe(1);
    expect(RoundDown(1.005, 3)).toBe(1);
    expect(RoundDown(1.005, 4)).toBe(1.005);
    expect(RoundDown(1.005, 5)).toBe(1.005);

    expect(RoundDown(1.555, 1)).toBe(1);
    expect(RoundDown(1.555, 2)).toBe(1.5);
    expect(RoundDown(1.555, 3)).toBe(1.55);
    expect(RoundDown(1.555, 4)).toBe(1.555);
    expect(RoundDown(1.555, 5)).toBe(1.555);

    expect(RoundDown(123.9999, 5)).toBe(123.99);


    expect(RoundDown(-123.4567, 3)).toBe(-123);
    expect(RoundDown(-123.4567, 4)).toBe(-123.4);

    expect(RoundDown(0, 1)).toBe(0);
    expect(RoundDown(0, 2)).toBe(0);

    expect(RoundDown(1.2345e-30, 5)).toBe(1.2345e-30);
});




test('Fix', () => {
    expect(Fix(123.4567, -2)).toBe(100);
    expect(Fix(123.4567, -1)).toBe(120);
    expect(Fix(123.4567, 0)).toBe(123);
    expect(Fix(123.4567, 1)).toBe(123.5);
    expect(Fix(123.4567, 2)).toBe(123.46);
    expect(Fix(123.4567, 3)).toBe(123.457);
    expect(Fix(123.4567, 4)).toBe(123.4567);
    expect(Fix(123.4567, 5)).toBe(123.4567);

    expect(Fix(1.005, -1)).toBe(0);
    expect(Fix(1.005, 0)).toBe(1);
    expect(Fix(1.005, 1)).toBe(1);
    expect(Fix(1.005, 2)).toBe(1.01);
    expect(Fix(1.005, 3)).toBe(1.005);
    expect(Fix(1.005, 4)).toBe(1.005);

    expect(Fix(1.555, -1)).toBe(0);
    expect(Fix(1.555, 0)).toBe(2);
    expect(Fix(1.555, 1)).toBe(1.6);
    expect(Fix(1.555, 2)).toBe(1.56);
    expect(Fix(1.555, 3)).toBe(1.555);
    expect(Fix(1.555, 4)).toBe(1.555);

    expect(Fix(123.9999, 2)).toBe(124);
    expect(Fix(1.35499999999, 2)).toBe(1.35);


    expect(Fix(-123.4567, 0)).toBe(-123);
    expect(Fix(-123.4567, 1)).toBe(-123.5);

    expect(Fix(-0.5, 0)).toBe(-1);

    expect(Fix(0, 1)).toBe(0);
    expect(Fix(0, 2)).toBe(0);

    expect(Fix(1.23455e-30, 34)).toBe(1.2346e-30);
});



test('FixUp', () => {
    expect(FixUp(123.4567, -2)).toBe(200);
    expect(FixUp(123.4567, -1)).toBe(130);
    expect(FixUp(123.4567, 0)).toBe(124);
    expect(FixUp(123.4567, 1)).toBe(123.5);
    expect(FixUp(123.4567, 2)).toBe(123.46);
    expect(FixUp(123.4567, 3)).toBe(123.457);
    expect(FixUp(123.4567, 4)).toBe(123.4567);
    expect(FixUp(123.4567, 5)).toBe(123.4567);


    expect(FixUp(1.005, -1)).toBe(10);
    expect(FixUp(1.005, 0)).toBe(2);
    expect(FixUp(1.005, 1)).toBe(1.1);
    expect(FixUp(1.005, 2)).toBe(1.01);
    expect(FixUp(1.005, 3)).toBe(1.005);
    expect(FixUp(1.005, 4)).toBe(1.005);

    expect(FixUp(1.555, -1)).toBe(10);
    expect(FixUp(1.555, 0)).toBe(2);
    expect(FixUp(1.555, 1)).toBe(1.6);
    expect(FixUp(1.555, 2)).toBe(1.56);
    expect(FixUp(1.555, 3)).toBe(1.555);
    expect(FixUp(1.555, 4)).toBe(1.555);

    expect(FixUp(123.9999, 2)).toBe(124);
    expect(FixUp(123.0001, 2)).toBe(123.01);
    expect(FixUp(0.1 + 0.2, 1)).toBe(0.3);

    expect(FixUp(-123.4567, 0)).toBe(-124);
    expect(FixUp(-123.4567, 1)).toBe(-123.5);

    expect(FixUp(0, 1)).toBe(0);
    expect(FixUp(0, 2)).toBe(0);

    expect(FixUp(1.2345e-30, 34)).toBe(1.2345e-30);
});




test('FixDown', () => {
    expect(FixDown(123.4567, -2)).toBe(100);
    expect(FixDown(123.4567, -1)).toBe(120);
    expect(FixDown(123.4567, 0)).toBe(123);
    expect(FixDown(123.4567, 1)).toBe(123.4);
    expect(FixDown(123.4567, 2)).toBe(123.45);
    expect(FixDown(123.4567, 3)).toBe(123.456);
    expect(FixDown(123.4567, 4)).toBe(123.4567);
    expect(FixDown(123.4567, 5)).toBe(123.4567);

    expect(FixDown(1.005, -1)).toBe(0);
    expect(FixDown(1.005, 0)).toBe(1);
    expect(FixDown(1.005, 1)).toBe(1);
    expect(FixDown(1.005, 2)).toBe(1);
    expect(FixDown(1.005, 3)).toBe(1.005);
    expect(FixDown(1.005, 4)).toBe(1.005);

    expect(FixDown(1.555, -1)).toBe(0);
    expect(FixDown(1.555, 0)).toBe(1);
    expect(FixDown(1.555, 1)).toBe(1.5);
    expect(FixDown(1.555, 2)).toBe(1.55);
    expect(FixDown(1.555, 3)).toBe(1.555);
    expect(FixDown(1.555, 4)).toBe(1.555);

    expect(FixDown(123.9999, 2)).toBe(123.99);

    expect(FixDown(-123.4567, 0)).toBe(-123);
    expect(FixDown(-123.4567, 1)).toBe(-123.4);

    expect(FixDown(0, 1)).toBe(0);
    expect(FixDown(0, 2)).toBe(0);

    expect(FixDown(1.2345e-30, 34)).toBe(1.2345e-30);
});


test('Ceil', () => {
    expect(Ceil(2)).toBe(2);
    expect(Ceil(-2)).toBe(-2);
    expect(Ceil(1.5)).toBe(2);
    expect(Ceil(1.1)).toBe(2);
    expect(Ceil(1.9)).toBe(2);
    expect(Ceil(-1.5)).toBe(-1);
    expect(Ceil(-1.1)).toBe(-1);
    expect(Ceil(-1.9)).toBe(-1);
});


test('Floor', () => {
    expect(Floor(2)).toBe(2);
    expect(Floor(-2)).toBe(-2);
    expect(Floor(1.5)).toBe(1);
    expect(Floor(1.1)).toBe(1);
    expect(Floor(1.9)).toBe(1);
    expect(Floor(-1.5)).toBe(-2);
    expect(Floor(-1.1)).toBe(-2);
    expect(Floor(-1.9)).toBe(-2);
});



test('SimpRatio', () => {
    expect(SimpRatio(2, 4)).toEqual([1, 2]);
    expect(SimpRatio(2, 4, 6)).toEqual([1, 2, 3]);
    expect(SimpRatio(0, 4, 6)).toEqual([0, 2, 3]);
    expect(SimpRatio(8, 12, 18)).toEqual([4, 6, 9]);
    expect(SimpRatio(2, -4)).toEqual([1, -2]);
    expect(SimpRatio(8, -12, 18)).toEqual([4, -6, 9]);
    expect(SimpRatio(0, -2, 3)).toEqual([0, -2, 3]);
    expect(SimpRatio(0, -2, 4)).toEqual([0, -1, 2]);
    expect(SimpRatio(0, 4)).toEqual([0, 1]);
    expect(SimpRatio(0, -4)).toEqual([0, -1]);
    expect(SimpRatio(2, 4, 6.5)).toEqual([2, 4, 6.5]);
});



test('IntegerRatio', () => {
    expect(IntegerRatio(2, 4)).toEqual([1, 2]);
    expect(IntegerRatio(2, 4, 6)).toEqual([1, 2, 3]);
    expect(IntegerRatio(0, 4, 6)).toEqual([0, 2, 3]);
    expect(IntegerRatio(8, 12, 18)).toEqual([4, 6, 9]);
    expect(IntegerRatio(2, -4)).toEqual([1, -2]);
    expect(IntegerRatio(8, -12, 18)).toEqual([4, -6, 9]);
    expect(IntegerRatio(0, -2, 3)).toEqual([0, -2, 3]);
    expect(IntegerRatio(0, -2, 4)).toEqual([0, -1, 2]);
    expect(IntegerRatio(0, 4)).toEqual([0, 1]);
    expect(IntegerRatio(0, -4)).toEqual([0, -1]);
    expect(IntegerRatio(2, 4, 6.5)).toEqual([4, 8, 13]);
    expect(IntegerRatio(1 / 3, 1 / 2, 1 / 4)).toEqual([4, 6, 3]);
    expect(() => IntegerRatio(Math.sqrt(2), 1 / 2, 1 / 4)).toThrow();

});






// test('Blur', () => {
//     expect(Blur(0.1 + 0.2)).toBe(0.3);
//     expect(Blur(0.81 - 1)).toBe(-0.19);
//     expect(Blur(1.1 ** 2)).toBe(1.21);
//     expect(Blur('abc')).toBe('abc');
//     expect(Blur(true)).toBe(true);
//     expect(Blur(false)).toBe(false);
//     expect(Blur([1.12])).toEqual([1.12]);
//     expect(Blur({ x: 1 })).toEqual({ x: 1 });
//     expect(Blur(NaN)).toBeNaN();
//     expect(Blur(undefined)).toBeUndefined();
//     expect(Blur(null)).toBeNull();
// });


// test('Blurs', () => {
//     expect(Blurs([0.1 + 0.2, 0.81 - 1])).toEqual([0.3, -0.19]);
//     expect(Blurs([1.1 ** 2, 'abc'])).toEqual([1.21, 'abc']);
// });

