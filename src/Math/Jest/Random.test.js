
function sample(func, n = 1000) {
    let arr = [];
    for (let i = 0; i < n; i++)
        arr.push(func());
    return arr;
}


function checkWithin(arr, min, max) {
    let a = arr.flat();
    return a.every(x => x >= min && x <= max);
}


function checkAbsWithin(arr, min, max) {
    let a = arr.flat();
    return a.every(x => Abs(x) >= min && Abs(x) <= max);
}

function checkIsInteger(arr) {
    let a = arr.flat();
    return a.every(x => IsInteger(x));
}

function checkDistinct(arr, count) {
    let a = arr.flat();
    return [... new Set(a)].length === count;
}

function checkDiverse(arr) {
    let a = arr.flat();
    return [... new Set(a)].length > 100;
}

function checkLength(arr, length) {
    return arr.every(x => x.length === length);
}

function checkIncluded(arr, allowed) {
    let a = arr.flat();
    return a.every(x => allowed.includes(x));
}


function checkIs(arr, func) {
    let a = arr.flat();
    return a.every(x => func(x));
}

function checkUnique(arr) {
    return arr.every(x => x.length === [... new Set(x)].length);
}


test('RndN', () => {
    let arr = sample(() => RndN(5, 10));
    expect(checkWithin(arr, 5, 10)).toBe(true);
    expect(checkIsInteger(arr)).toBe(true);
    expect(checkDistinct(arr, 6)).toBe(true);

});


test('RndNs', () => {
    let arr = sample(() => RndNs(5, 10, 3));
    expect(checkWithin(arr, 5, 10)).toBe(true);
    expect(checkIsInteger(arr)).toBe(true);
    expect(checkDistinct(arr, 6)).toBe(true);
    expect(checkLength(arr, 3)).toBe(true);
});


test('RndR', () => {
    expect(checkWithin(sample(() => RndR(5, 10)), 5, 10)).toBe(true);
    expect(checkWithin(sample(() => RndR(-1, 1)), -1, 1)).toBe(true);
});


test('RndU', () => {
    let arr = sample(() => RndU());
    expect(checkIncluded(arr, [1, -1])).toBe(true);
    expect(checkDistinct(arr, 2)).toBe(true);
});


test('RndT', () => {
    let arr = sample(() => RndT());
    expect(checkIncluded(arr, [true, false])).toBe(true);
    expect(checkDistinct(arr, 2)).toBe(true);
});


test('RndZ', () => {
    let arr = sample(() => RndZ(5, 10));
    expect(checkAbsWithin(arr, 5, 10)).toBe(true);
    expect(checkIsInteger(arr)).toBe(true);
    expect(checkDistinct(arr, 12)).toBe(true);
});


test('RndZs', () => {
    let arr = sample(() => RndZs(5, 10, 3));
    expect(checkAbsWithin(arr, 5, 10)).toBe(true);
    expect(checkIsInteger(arr)).toBe(true);
    expect(checkDistinct(arr, 12)).toBe(true);
    expect(checkLength(arr, 3)).toBe(true);
});


test('RndP', () => {
    let arr = sample(() => RndP(100));
    expect(checkWithin(arr, 2, 97)).toBe(true);
    expect(checkIsInteger(arr)).toBe(true);
    expect(checkDistinct(arr, 25)).toBe(true);
});



test('RndOdd', () => {
    let arr = sample(() => RndOdd(5, 10));
    expect(checkWithin(arr, 5, 9)).toBe(true);
    expect(checkIsInteger(arr)).toBe(true);
    expect(checkDistinct(arr, 3)).toBe(true);
    expect(checkIs(arr, IsOdd)).toBe(true);
});




test('RndEven', () => {
    let arr = sample(() => RndEven(5, 10));
    expect(checkWithin(arr, 6, 10)).toBe(true);
    expect(checkIsInteger(arr)).toBe(true);
    expect(checkDistinct(arr, 3)).toBe(true);
    expect(checkIs(arr, IsEven)).toBe(true);
});



test('RndPoly', () => {
    let arr = sample(() => RndPoly(3, 4, 5));
    let arr0 = arr.map(x => x[0]);
    let arr1 = arr.map(x => x[1]);
    let arr2 = arr.map(x => x[2]);
    expect(checkWithin(arr0, 1, 3)).toBe(true);
    expect(checkAbsWithin(arr1, 1, 4)).toBe(true);
    expect(checkAbsWithin(arr2, 1, 5)).toBe(true);
    expect(checkIsInteger(arr)).toBe(true);
    expect(checkDistinct(arr0, 3)).toBe(true);
    expect(checkDistinct(arr1, 8)).toBe(true);
    expect(checkDistinct(arr2, 10)).toBe(true);

});



test('RndShake:Integer', () => {
    let arr = sample(() => RndShake(5, 3, 4));
    expect(checkWithin(arr, 2, 8)).toBe(true);
    expect(checkIsInteger(arr)).toBe(true);
    expect(checkLength(arr, 4)).toBe(true);
    expect(checkDistinct(arr, 6)).toBe(true);
    expect(checkUnique(arr)).toBe(true);
});



test('RndShake:Float', () => {
    let arr = sample(() => RndShake(2.5, 1, 4));
    expect(checkWithin(arr, 1.5, 3.5)).toBe(true);
    expect(checkIsInteger(arr)).toBe(false);
    expect(checkLength(arr, 4)).toBe(true);
    expect(checkDiverse(arr)).toBe(true);
    expect(checkUnique(arr)).toBe(true);
});



test('RndPyth', () => {
    let arr = sample(() => RndPyth(50));
    let isPyth = arr.every(x => x[0] ** 2 + x[1] ** 2 === x[2] ** 2);
    expect(checkWithin(arr, 1, 50)).toBe(true);
    expect(checkIsInteger(arr)).toBe(true);
    expect(checkLength(arr, 3)).toBe(true);
    expect(checkUnique(arr)).toBe(true);
    expect(isPyth).toBe(true);
});




