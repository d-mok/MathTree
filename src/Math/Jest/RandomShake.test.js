

test('Sieve', () => {
    let func = Sieve(() => RndN(1, 10), x => IsOdd(x));
    let arr = sample(func);
    expect(arr).toBeFlatAbsWithin(1, 9);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(5);
    expect(arr).toBeFlatIs(IsOdd);
});




test('RndShake:Integer', () => {
    let arr = sample(() => RndShake(5, 3, 4));
    expect(arr).toBeFlatWithin(2, 8);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(6);
    expect(arr).toAllHaveLength(4);
    expect(arr).toBeUnique();
});



test('RndShake:Float', () => {
    let arr = sample(() => RndShake(2.5, 1, 4));
    expect(arr).toBeFlatWithin(1.5, 3.5);
    expect(arr).not.toBeFlatIsInteger();
    expect(arr).toBeFlatDiverse();
    expect(arr).toAllHaveLength(4);
    expect(arr).toBeUnique();
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
});





test('RndShakeR', () => {
    let arr = sample(() => RndShakeR(3.5, 2, 3));
    expect(arr).toBeFlatWithin(1.5, 5.5);
    expect(arr).not.toBeFlatWithin(1.6, 5.4);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeR(1.5, 2, 3));
    expect(arr).toBeFlatWithin(0, 3.5);
    expect(arr).not.toBeFlatWithin(0.1, 3.4);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeR(-1.5, 4, 3));
    expect(arr).toBeFlatWithin(-5.5, 0);
    expect(arr).not.toBeFlatWithin(-5.4, -0.1);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeR(0, 2));
    expect(arr).toBeFlatWithin(0, 2);
    expect(arr).not.toBeFlatWithin(0.1, 1.9);
    expect(arr).toAllHaveLength(10);
    expect(arr).not.toBeFlatIsInteger();
    expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();
});



test('RndShakeProb', () => {
    let arr = sample(() => RndShakeProb(0.8, 0.1, 3));
    expect(arr).toBeFlatWithin(0.7, 0.9);
    expect(arr).not.toBeFlatWithin(0.71, 0.89);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeProb(0.8, 0.5, 3));
    expect(arr).toBeFlatWithin(0.3, 1);
    expect(arr).not.toBeFlatWithin(0.31, 0.99);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeProb(0.3, 0.6, 3));
    expect(arr).toBeFlatWithin(0, 0.9);
    expect(arr).not.toBeFlatWithin(0.01, 0.89);
    expect(arr).toAllHaveLength(3);
    expect(arr).not.toBeFlatIsInteger();
    expect(arr).toBeFlatDiverse();
    expect(arr).toBeUnique();

    arr = sample(() => RndShakeProb(1.1, 2));
    expect(arr).toAllHaveLength(0);
});

