

test('Sieve', () => {
    let func = Sieve(() => RndN(1, 10), x => IsOdd(x));
    let arr = sample(func);
    expect(arr).toBeFlatAbsWithin(1, 9);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(5);
    expect(arr).toBeFlatIs(IsOdd);
});




test('RndShake', () => {
    let arr = sample(() => RndShake('\\dfrac{2}{3}'));
    expect(arr).toBeFlatIs(ParseDfrac);

    arr = sample(() => RndShake('\\ge'));
    expect(arr).toBeFlatIs(ParseIneqSign);

    arr = sample(() => RndShake(5));
    expect(arr).toBeFlatIs(IsInteger);

    arr = sample(() => RndShake(0.5));
    expect(arr).toBeFlatIs(IsProbability);

    arr = sample(() => RndShake(1.5));
    expect(arr).toBeFlatIs(IsNum);
    expect(arr).toBeFlatIs(IsPositive);
});






test('RndShakeN', () => {
    let arr = sample(() => RndShakeN(5, 3, 4));
    expect(arr).toBeFlatWithin(2, 8);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(6);
    expect(arr).toAllHaveLength(4);
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeN(-5, 3, 4));
    expect(arr).toBeFlatWithin(-8, -2);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(6);
    expect(arr).toAllHaveLength(4);
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeN(2, 5, 3));
    expect(arr).toBeFlatWithin(1, 7);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(6);
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeUnique();


    arr = sample(() => RndShakeN(1, 5, 3));
    expect(arr).toBeFlatWithin(2, 6);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(5);
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeUnique();


    arr = sample(() => RndShakeN(-2, 5, 3));
    expect(arr).toBeFlatWithin(-7, -1);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(6);
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeN(0, 5, 3));
    expect(arr).toBeFlatWithin(1, 5);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(5);
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeUnique();


    arr = sample(() => RndShakeN(100, 20));
    expect(arr).toAllHaveLength(10);
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeN(100));
    expect(arr).toBeFlatWithin(90, 110);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(20);
    expect(arr).toAllHaveLength(10);
    expect(arr).toBeUnique();
});


test('RndShakeZ', () => {
    let arr = sample(() => RndShakeZ(5, 3, 4));
    expect(arr).toBeFlatWithin(2, 8);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(6);
    expect(arr).toAllHaveLength(4);
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeZ(-5, 3, 4));
    expect(arr).toBeFlatWithin(-8, -2);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(6);
    expect(arr).toAllHaveLength(4);
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeZ(2, 5, 3));
    expect(arr).toBeFlatWithin(-3, 7);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(10);
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeUnique();


    arr = sample(() => RndShakeZ(1, 5, 3));
    expect(arr).toBeFlatWithin(-4, 6);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(10);
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeUnique();


    arr = sample(() => RndShakeZ(-2, 5, 3));
    expect(arr).toBeFlatWithin(-7, 3);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(10);
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeZ(0, 4, 3));
    expect(arr).toBeFlatWithin(-4, 4);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(8);
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeUnique();


    arr = sample(() => RndShakeZ(100, 15));
    expect(arr).toBeFlatWithin(85, 115);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(30);
    expect(arr).toAllHaveLength(10);
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeZ(100));
    expect(arr).toBeFlatWithin(90, 110);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(20);
    expect(arr).toAllHaveLength(10);
    expect(arr).toBeUnique();
});





test('RndShakeR', () => {
    let arr = sample(() => RndShakeR(3.5, 2, 3));
    expect(arr).toBeFlatWithin(1.5, 5.5);
    expect(arr).not.toBeFlatWithin(1.6, 5.4);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    // expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeR(1.5, 2, 3));
    expect(arr).toBeFlatWithin(0, 3.5);
    expect(arr).not.toBeFlatWithin(0.1, 3.4);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    // expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeR(-1.5, 4, 3));
    expect(arr).toBeFlatWithin(-5.5, 0);
    expect(arr).not.toBeFlatWithin(-5.4, -0.1);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    // expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeR(0, 5));
    expect(arr).toBeFlatWithin(0, 5);
    expect(arr).not.toBeFlatWithin(0.1, 4.9);
    expect(arr).toAllHaveLength(5);
    expect(arr).not.toBeFlatIsInteger();
    // expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeR(100));
    expect(arr).toBeFlatWithin(90, 110);
    expect(arr).not.toBeFlatWithin(91, 109);
    expect(arr).toAllHaveLength(5);
    expect(arr).not.toBeFlatIsInteger();
    // expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

});



test('RndShakeProb', () => {
    let arr = sample(() => RndShakeProb(0.8, 0.1, 3));
    expect(arr).toBeFlatWithin(0.7, 0.9);
    expect(arr).not.toBeFlatWithin(0.71, 0.89);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    // expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeProb(0.8, 0.5, 3));
    expect(arr).toBeFlatWithin(0.3, 1);
    expect(arr).not.toBeFlatWithin(0.31, 0.99);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    // expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeProb(0.3, 0.6, 3));
    expect(arr).toBeFlatWithin(0, 0.9);
    expect(arr).not.toBeFlatWithin(0.01, 0.89);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    // expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeProb(1.1, 2));
    expect(arr).toAllHaveLength(0);

    arr = sample(() => RndShakeProb(0.5001));
    expect(arr).toBeFlatWithin(0.2, 0.8);
    expect(arr).not.toBeFlatWithin(0.21, 0.79);
    expect(arr).toAllHaveLength(5);
    expect(arr).not.toBeFlatIsInteger();
    // expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();
});



test('RndShakeFrac', () => {
    let arr = sample(() => RndShakeFrac([5, 6], 4, 3));
    let arr0 = arr.map(x => x.map(y => y[0]));
    let arr1 = arr.map(x => x.map(y => y[1]));
    expect(arr0).toBeFlatWithin(1, 9);
    expect(arr0).toBeFlatDistinct(9);
    expect(arr1).toBeFlatWithin(2, 10);
    expect(arr1).toBeFlatDistinct(9);
    expect(arr.flat()).toBeFlatIsInteger();
    expect(arr).toAllHaveLength(3);
    expect(arr.flat().map(x => x[0] / x[1])).toBeFlatIs(IsProbability);

    arr = sample(() => RndShakeFrac([6, -5], 10, 3));
    arr0 = arr.map(x => x.map(y => y[0]));
    arr1 = arr.map(x => x.map(y => y[1]));
    expect(arr0).toBeFlatWithin(-16, -1);
    expect(arr0).toBeFlatDistinct(16);
    expect(arr1).toBeFlatWithin(2, 15);
    expect(arr1).toBeFlatDistinct(14);
    expect(arr.flat()).toBeFlatIsInteger();
    expect(arr).toAllHaveLength(3);
    expect(arr.flat().map(x => x[0] / x[1])).not.toBeFlatIs(IsProbability);

    arr = sample(() => RndShakeFrac([6, -5]));
    arr0 = arr.map(x => x.map(y => y[0]));
    arr1 = arr.map(x => x.map(y => y[1]));
    expect(arr0).toBeFlatWithin(-11, -1);
    expect(arr0).toBeFlatDistinct(11);
    expect(arr1).toBeFlatWithin(2, 10);
    expect(arr1).toBeFlatDistinct(9);
    expect(arr.flat()).toBeFlatIsInteger();
    expect(arr).toAllHaveLength(5);
    expect(arr.flat().map(x => x[0] / x[1])).not.toBeFlatIs(IsProbability);
});



test('RndShakeDfrac', () => {
    let arr = sample(() => RndShakeDfrac('\\dfrac{5}{6}', 4, 3));
    let arr0 = arr.flat(2).map(x => ParseDfrac(x)[0]);
    let arr1 = arr.flat(2).map(x => ParseDfrac(x)[1]);
    expect(arr0).toBeFlatWithin(1, 9);
    expect(arr0).toBeFlatDistinct(9);
    expect(arr1).toBeFlatWithin(2, 10);
    expect(arr1).toBeFlatDistinct(9);
    expect(arr).toAllHaveLength(3);

    arr = sample(() => RndShakeDfrac('-\\dfrac{6}{5}', 10, 3));
    arr0 = arr.flat(2).map(x => ParseDfrac(x)[0]);
    arr1 = arr.flat(2).map(x => ParseDfrac(x)[1]);
    expect(arr0).toBeFlatWithin(-16, -1);
    expect(arr0).toBeFlatDistinct(16);
    expect(arr1).toBeFlatWithin(2, 15);
    expect(arr1).toBeFlatDistinct(14);
    expect(arr).toAllHaveLength(3);

    arr = sample(() => RndShakeDfrac('\\dfrac{6}{-5}'));
    arr0 = arr.flat(2).map(x => ParseDfrac(x)[0]);
    arr1 = arr.flat(2).map(x => ParseDfrac(x)[1]);
    expect(arr0).toBeFlatWithin(-11, -1);
    expect(arr0).toBeFlatDistinct(11);
    expect(arr1).toBeFlatWithin(2, 10);
    expect(arr1).toBeFlatDistinct(9);
    expect(arr).toAllHaveLength(5);
});



test('RndShakeIneq', () => {
    let arr = sample(() => RndShakeIneq('\\ge', 6));
    expect(arr).toBeFlatDistinct(2);
    expect(arr).toBeFlatIncluded(['\\ge', '\\le']);
    expect(arr).toAllHaveLength(6);
    let nG = arr.flat().filter(x => x === '\\ge').length;
    let nL = arr.flat().filter(x => x === '\\ge').length;
    expect(nG).toBe(nL);

    arr = sample(() => RndShakeIneq('\\lt', 19));
    expect(arr).toBeFlatDistinct(2);
    expect(arr).toBeFlatIncluded(['\\gt', '\\lt']);
    expect(arr).toAllHaveLength(19);
    nG = arr.flat().filter(x => x === '\\gt').length;
    nL = arr.flat().filter(x => x === '\\lt').length;
    expect(nG).toBeGreaterThan(nL);
});

