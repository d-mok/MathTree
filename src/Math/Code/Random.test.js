

test('RndN', () => {
    let arr = sample(() => RndN(5, 10));
    expect(arr).toBeFlatWithin(5, 10);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(6);
});


test('RndNs', () => {
    let arr = sample(() => RndNs(5, 10, 3));
    expect(arr).toBeFlatWithin(5, 10);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(6);
    expect(arr).toAllHaveLength(3);
});


test('RndR', () => {
    expect(sample(() => RndR(5, 10))).toBeFlatWithin(5, 10);
    expect(sample(() => RndR(-1, 1))).toBeFlatWithin(-1, 1);
});


test('RndRs', () => {
    let arr = sample(() => RndRs(5, 10, 3));
    expect(arr).toBeFlatWithin(5, 10);
    expect(arr).toAllHaveLength(3);
});

test('RndQ', () => {
    let arr = sample(() => RndQ(8, [0, 6]));
    expect(arr).toBeFlatWithin(0, 6);
    expect(arr).toBeFlatIs(owl.rational);
    expect(arr).toBeFlatIs(owl.dec);
    arr = sample(() => RndQ(-8, [-6, 6]));
    expect(arr).toBeFlatWithin(-6, 6);
    expect(arr).toBeFlatIs(owl.rational);
    expect(arr).toBeFlatIs(owl.dec);
});


test('RndQs', () => {
    let arr = sample(() => RndQs(8, [0, 6], 3));
    expect(arr).toBeFlatWithin(0, 6);
    expect(arr).toBeFlatIs(owl.rational);
    expect(arr).toBeFlatDistinct(35);
    expect(arr).toAllHaveLength(3);
});


test('RndU', () => {
    let arr = sample(() => RndU());
    expect(arr).toBeFlatIncluded([1, -1]);
    expect(arr).toBeFlatDistinct(2);
});


test('RndT', () => {
    let arr = sample(() => RndT());
    expect(arr).toBeFlatIncluded([true, false]);
    expect(arr).toBeFlatDistinct(2);
});


test('RndZ', () => {
    let arr = sample(() => RndZ(5, 10));
    expect(arr).toBeFlatAbsWithin(5, 10);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(12);
});


test('RndZs', () => {
    let arr = sample(() => RndZs(5, 10, 3));
    expect(arr).toBeFlatAbsWithin(5, 10);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(12);
    expect(arr).toAllHaveLength(3);
});


test('RndP', () => {
    let arr = sample(() => RndP(100));
    expect(arr).toBeFlatWithin(2, 97);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(25);
});



test('RndOdd', () => {
    let arr = sample(() => RndOdd(5, 10));
    expect(arr).toBeFlatAbsWithin(5, 9);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(3);
    expect(arr).toBeFlatIs(IsOdd);
});




test('RndEven', () => {
    let arr = sample(() => RndEven(5, 10));
    expect(arr).toBeFlatAbsWithin(6, 10);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toBeFlatDistinct(3);
    expect(arr).toBeFlatIs(IsEven);
});



test('RndPoly', () => {
    let arr = sample(() => RndPoly(3, 4, 5));
    let arr0 = arr.map(x => x[0]);
    let arr1 = arr.map(x => x[1]);
    let arr2 = arr.map(x => x[2]);
    expect(arr0).toBeFlatWithin(1, 3);
    expect(arr1).toBeFlatAbsWithin(1, 4);
    expect(arr2).toBeFlatAbsWithin(1, 5);

    expect(arr).toBeFlatIsInteger();

    expect(arr0).toBeFlatDistinct(3);
    expect(arr1).toBeFlatDistinct(8);
    expect(arr2).toBeFlatDistinct(10);

});


test('RndPyth', () => {
    let arr = sample(() => RndPyth(50));
    let isPyth = arr.every(x => x[0] ** 2 + x[1] ** 2 === x[2] ** 2);
    expect(arr).toBeFlatWithin(1, 50);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeUnique();
    expect(isPyth).toBe(true);
});




test('RndPoint', () => {
    let arr = sample(() => RndPoint([1, 4], [10, 14]));
    let xs = arr.map(p => p[0]);
    let ys = arr.map(p => p[1]);
    expect(xs).toBeFlatWithin(1, 4);
    expect(ys).toBeFlatWithin(10, 14);
    expect(xs).toBeFlatIsInteger();
    expect(ys).toBeFlatIsInteger();
    expect(xs).not.toContain(0);
    expect(ys).not.toContain(0);
    expect(arr.every(p => p[0] !== p[1])).toBe(true);
    expect(arr).toAllHaveLength(2);
});



test('RndPoints', () => {
    let arr = sample(() => RndPoints([1, 4], [10, 14], 3));
    expect(arr.every(ps => {
        let a = Angle(ps[0], ps[1], ps[2]);
        return ![0, 180].includes(ant.blur(a));
    })).toBeTrue();
    expect(arr).toAllHaveLength(3);
});




test('RndAngles', () => {
    let arr = sample(() => RndAngles(3, 50));
    let d1 = arr.map(x => x[1] - x[0]);
    let d2 = arr.map(x => x[2] - x[1]);
    let d3 = arr.map(x => x[0] + 360 - x[2]);
    expect(arr).toBeFlatWithin(0, 360);
    expect([...d1, ...d2, ...d3]).toBeFlatWithin(50, 360);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeUnique();
});


test('RndConvexPolygon', () => {
    let arr = sample(() => RndConvexPolygon(3, [0, 0], 10, 50));
    let vertices = arr.flat();
    let xs = vertices.map(v => v[0]);
    let ys = vertices.map(v => v[1]);
    expect(xs).toBeFlatWithin(-10, 10);
    expect(ys).toBeFlatWithin(-10, 10);
    expect(arr.flat()).toBeFlatIsInteger();
    expect(arr).toAllHaveLength(3);
    expect(arr.flat()).toAllHaveLength(2);
});



test('RndData', () => {
    let arr = sample(() => RndData(10, 15, 5));
    expect(arr).toBeFlatAbsWithin(10, 15);
    expect(arr).toBeFlatIsInteger();
    expect(arr).toAllHaveLength(5);
    expect(arr.every(a => Mode(...a).length === 1)).toBe(true);
});





test('RndTriangle', () => {
    let arr = sample(() => RndTriangle([0, 5], [0, 5], { minAngle: 30, minLength: 2 }));
    expect(arr.every(t => Distance(t[0], t[1]) >= 2)).toBeTrue();
    expect(arr.every(t => Angle(t[0], t[1], t[2]) >= 30)).toBeTrue();
    expect(arr).toAllHaveLength(3);
});



test('RndTrigValue', () => {
    let trig = (funcName, angle) => {
        if (funcName === 'sin') return sin(angle);
        if (funcName === 'cos') return cos(angle);
        if (funcName === 'tan') return tan(angle);
        throw 'never';
    };
    let arr = sample(() => RndTrigValue('sin', 60));
    let fs = arr.map(_ => _[0]);
    expect(fs.every(f => ['sin', 'cos', 'tan'].includes(f))).toBeTrue();
    expect(arr.every(t => ant.eq(trig(t[0], t[1]), sin(60)))).toBeTrue();
    expect(arr).toAllHaveLength(2);
});


test('RndTrigEqv', () => {
    let trig = (funcName, angle) => {
        if (funcName === 'sin') return sin(angle);
        if (funcName === 'cos') return cos(angle);
        if (funcName === 'tan') return tan(angle);
        throw 'never';
    };
    let arr = sample(() => RndTrigEqv('sin', 'x'));
    let fs = arr.map(_ => _[0]);
    expect(fs.every(f => ['sin', 'cos', 'tan'].includes(f))).toBeTrue();
    expect(arr.every(t => ant.eq(trig(t[0], t[1] + t[2]), sin(1)))).toBeTrue();
    expect(arr).toAllHaveLength(4);
});
