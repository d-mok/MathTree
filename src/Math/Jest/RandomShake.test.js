

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
    function run(anchor, min, max, distinct = max - min) {
        let arr = sample(() => RndShakeN(anchor));
        expect(arr).toBeFlatWithin(min, max);
        expect(arr).toBeFlatIsInteger();
        expect(arr).toBeFlatDistinct(distinct);
        expect(arr).toAllHaveLength(3);
        expect(arr).toBeUnique();
    }

    run(5, 2, 8);
    run(-5, -8, -2);
    run(2, 1, 5);
    run(1, 2, 4, 3);
    run(-2, -5, -1);
    run(0, 1, 3, 3);
    run(-1, -4, -2, 3);
    run(100, 101, 110, 10);
    run(456, 411, 501);

    for (let i = 0; i <= 100; i++) {
        RndShakeN(i);
    }
});



test('RndShakeR', () => {
    function run(anchor, min, max, interval) {
        let arr = sample(() => RndShakeR(anchor));
        expect(arr).toBeFlatWithin(min, max);
        expect(arr).not.toBeFlatWithin(min + 5 * interval, max - 5 * interval);
        expect(arr).toAllHaveLength(3);
        expect(arr).toBeUnique();
    }

    run(3.5, 1.8, 5.2, 0.1);
    run(1.5, 0.8, 2.3, 0.1);
    run(-1.5, -2.3, -0.8, 0.1);
    run(123.45, 100, 185.17, 0.01);
    run(900.1, 450.1, 999.9, 0.1);
    run(4.567e-20, 2.284e-20, 6.850e-20, 0.001e-20);
    run(-4.567e-20, -6.850e-20, -2.284e-20, 0.001e-20);


    for (let i = 0; i <= 100; i++) {
        RndShakeR(RndR(-1000, 1000));
    }


    for (let i = 0; i <= 100; i++) {
        let num = Number(RndR(-1, 1) + 'e' + RndZ(-1, 100));
        RndShakeR(RndR(-1, 1));
    }
});




test('RndShakeFrac', () => {

    function run(anchor, isPositive, isProb) {
        let arr = sample(() => RndShakeFrac(anchor));
        let arr0 = arr.map(x => x.map(y => y[0]));
        let arr1 = arr.map(x => x.map(y => y[1]));
        expect(arr.flat()).toBeFlatIsInteger();
        if (isPositive) {
            expect(arr0).toBeFlatIs(x => x > 0);
        } else {
            expect(arr0).toBeFlatIs(x => x < 0);
        }
        expect(arr1).toBeFlatIs(x => x > 1);
        expect(arr).toAllHaveLength(3);
        if (isProb)
            expect(arr.flat().map(x => x[0] / x[1])).toBeFlatIs(IsProbability);
    }

    run([5, 6], true, true);
    run([6, -5], false, false);
});



test('RndShakeDfrac', () => {
    function run(anchor, isPositive) {
        let arr = sample(() => RndShakeDfrac(anchor));
        let arr0 = arr.flat(2).map(x => ParseDfrac(x)[0]);
        let arr1 = arr.flat(2).map(x => ParseDfrac(x)[1]);
        expect(arr0).toBeFlatIsInteger();
        expect(arr1).toBeFlatIsInteger();
        if (isPositive) {
            expect(arr0).toBeFlatIs(x => x > 0);
        } else {
            expect(arr0).toBeFlatIs(x => x < 0);
        }
        expect(arr1).toBeFlatIs(x => x > 1);
        expect(arr).toAllHaveLength(3);
    }
    run('\\dfrac{5}{6}', true);
    run('\\dfrac{6}{-5}', false);
});



test('RndShakeIneq', () => {
    let arr = sample(() => RndShakeIneq('\\ge'));
    expect(arr).toBeFlatDistinct(2);
    expect(arr).toBeFlatIncluded(['\\ge', '\\le']);
    expect(arr).toAllHaveLength(3);
    let nG = arr.flat().filter(x => x === '\\ge').length;
    let nL = arr.flat().filter(x => x === '\\ge').length;
    expect(nG).toBe(nL);

    arr = sample(() => RndShakeIneq('\\lt'));
    expect(arr).toBeFlatDistinct(2);
    expect(arr).toBeFlatIncluded(['\\gt', '\\lt']);
    expect(arr).toAllHaveLength(3);
    nG = arr.flat().filter(x => x === '\\gt').length;
    nL = arr.flat().filter(x => x === '\\lt').length;
    expect(nG).toBeGreaterThan(nL);
});

