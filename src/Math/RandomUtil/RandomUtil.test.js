
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



test('RndPick', () => {
    let arr = sample(() => RndPick("a", "b", "c"));
    expect(checkIncluded(arr, ["a", "b", "c"])).toBe(true);
    expect(checkDistinct(arr, 3)).toBe(true);
});




test('RndShuffle', () => {
    let arr = sample(() => RndShuffle("a", "b", "c"));
    expect(checkIncluded(arr, ["a", "b", "c"])).toBe(true);
    expect(checkLength(arr, 3)).toBe(true);
    expect(checkDistinct(arr, 3)).toBe(true);
    expect(checkUnique(arr)).toBe(true);
});



test('RndPickN', () => {
    let arr = sample(() => RndPickN(["a", "b", "c"], 2));
    expect(checkIncluded(arr, ["a", "b", "c"])).toBe(true);
    expect(checkLength(arr, 2)).toBe(true);
    expect(checkDistinct(arr, 3)).toBe(true);
    expect(checkUnique(arr)).toBe(true);
});



test('RndHe', () => {
    let arr = sample(() => RndHe());
    expect(checkIs(arr, x => typeof x === 'string')).toBe(true);
});



test('RndShe', () => {
    let arr = sample(() => RndShe());
    expect(checkIs(arr, x => typeof x === 'string')).toBe(true);
});

