
function sample(func, n = 1000) {
    let arr = [];
    for (let i = 0; i < n; i++)
        arr.push(func());
    return arr;
}




test('RndN', () => {
    let arr = sample(() => RndN(5, 10));
    let inRange = arr.every(x => x >= 5 && x <= 10);
    let isInteger = arr.every(x => IsInteger(x));
    let uniform = [... new Set(arr)].length === 6;
    expect(inRange).toBe(true);
    expect(isInteger).toBe(true);
    expect(uniform).toBe(true);
});



test('RndR', () => {
    let arr = sample(() => RndR(5, 10));
    let inRange = arr.every(x => x >= 5 && x <= 10);
    expect(inRange).toBe(true);
    let arr2 = sample(() => RndR(-1, 1));
    let inRange2 = arr2.every(x => x >= -1 && x <= 1);
    expect(inRange2).toBe(true);
});




test('RndU', () => {
    let arr = sample(() => RndU());
    let inRange = arr.every(x => x === 1 || x === -1);
    let uniform = [... new Set(arr)].length === 2;
    expect(inRange).toBe(true);
    expect(uniform).toBe(true);
});



test('RndZ', () => {
    let arr = sample(() => RndZ(5, 10));
    let inRange = arr.every(x => Math.abs(x) >= 5 && Math.abs(x) <= 10);
    let isInteger = arr.every(x => IsInteger(x));
    let uniform = [... new Set(arr)].length === 12;
    expect(inRange).toBe(true);
    expect(isInteger).toBe(true);
    expect(uniform).toBe(true);
});

test('RndP', () => {
    let arr = sample(() => RndP(100));
    let inRange = arr.every(x => x >= 2 && x <= 97);
    let isInteger = arr.every(x => IsInteger(x));
    let uniform = [... new Set(arr)].length === 25;
    expect(inRange).toBe(true);
    expect(isInteger).toBe(true);
    expect(uniform).toBe(true);
});



test('RndOdd', () => {
    let arr = sample(() => RndOdd(5, 10));
    let inRange = arr.every(x => x >= 5 && x <= 9);
    let isInteger = arr.every(x => IsInteger(x));
    let uniform = [... new Set(arr)].length === 3;
    let isOdd = arr.every(x => x % 2 === 1);
    expect(inRange).toBe(true);
    expect(isInteger).toBe(true);
    expect(uniform).toBe(true);
    expect(isOdd).toBe(true);
});




test('RndEven', () => {
    let arr = sample(() => RndEven(5, 10));
    let inRange = arr.every(x => x >= 6 && x <= 10);
    let isInteger = arr.every(x => IsInteger(x));
    let uniform = [... new Set(arr)].length === 3;
    let isEven = arr.every(x => x % 2 === 0);
    expect(inRange).toBe(true);
    expect(isInteger).toBe(true);
    expect(uniform).toBe(true);
    expect(isEven).toBe(true);
});



test('RndPoly', () => {
    let arr = sample(() => RndPoly(3, 3, 3));
    let inRange1 = arr.every(x => x[0] >= 1 && x[0] <= 3);
    let inRange2 = arr.every(x => Math.abs(x[1]) >= 1 && Math.abs(x[0]) <= 3);
    let inRange3 = arr.every(x => Math.abs(x[2]) >= 1 && Math.abs(x[2]) <= 3);
    let isInteger = arr.every(x => IsInteger(...x));
    let uniform1 = [... new Set(arr.map(x => x[0]))].length === 3;
    let uniform2 = [... new Set(arr.map(x => x[1]))].length === 6;
    let uniform3 = [... new Set(arr.map(x => x[2]))].length === 6;
    expect(inRange1).toBe(true);
    expect(inRange2).toBe(true);
    expect(inRange3).toBe(true);
    expect(isInteger).toBe(true);
    expect(uniform1).toBe(true);
    expect(uniform2).toBe(true);
    expect(uniform3).toBe(true);
});



test('RndShake:Integer', () => {
    let arr = sample(() => RndShake(5, 3, 4));
    let inRange = arr.flat().every(x => x >= 2 && x <= 8);
    let correctLength = arr.every(x => x.length === 4);
    let isInteger = arr.flat().every(x => IsInteger(x));
    let uniform = [... new Set(arr.flat())].length === 6;
    let unique = arr.every(x => [... new Set(x)].length === 4);
    expect(inRange).toBe(true);
    expect(correctLength).toBe(true);
    expect(isInteger).toBe(true);
    expect(uniform).toBe(true);
    expect(unique).toBe(true);
});



test('RndShake:Float', () => {
    let arr = sample(() => RndShake(2.5, 1, 4));
    let inRange = arr.flat().every(x => x >= 1.5 && x <= 3.5);
    let correctLength = arr.every(x => x.length === 4);
    let isFloat = arr.flat().some(x => !IsInteger(x));
    let unique = arr.every(x => [... new Set(x)].length === 4);
    expect(inRange).toBe(true);
    expect(correctLength).toBe(true);
    expect(isFloat).toBe(true);
    expect(unique).toBe(true);
});



test('RndPyth', () => {
    let arr = sample(() => RndPyth(50));
    let inRange = arr.flat().every(x => x >= 1 && x <= 50);
    let isInteger = arr.flat().every(x => IsInteger(x));
    let correctLength = arr.every(x => x.length === 3);
    let isPyth = arr.every(x => x[0] ** 2 + x[1] ** 2 === x[2] ** 2);
    expect(inRange).toBe(true);
    expect(correctLength).toBe(true);
    expect(isInteger).toBe(true);
    expect(isPyth).toBe(true);
});




