
function sample(func, n = 1000) {
    let arr = [];
    for (let i = 0; i < n; i++)
        arr.push(func());
    return arr;
}



test('RndPick', () => {
    let arr = sample(() => RndPick("a", "b", "c"));
    let inRange = arr.every(x => ['a', 'b', 'c'].includes(x));
    let uniform = [... new Set(arr)].length === 3;
    expect(inRange).toBe(true);
    expect(uniform).toBe(true);
});




test('RndShuffle', () => {
    let arr = sample(() => RndShuffle("a", "b", "c"));
    let inRange = arr.flat().every(x => ['a', 'b', 'c'].includes(x));
    let correctLength = arr.every(x => x.length === 3);
    let uniform = [... new Set(arr.map(x => x[0]))].length === 3;
    let unique = arr.every(x => [... new Set(x)].length === 3);
    expect(inRange).toBe(true);
    expect(correctLength).toBe(true);
    expect(unique).toBe(true);
    expect(uniform).toBe(true);
});



test('RndPickN', () => {
    let arr = sample(() => RndPickN(["a", "b", "c"], 2));
    let inRange = arr.flat().every(x => ['a', 'b', 'c'].includes(x));
    let correctLength = arr.every(x => x.length === 2);
    let uniform = [... new Set(arr.map(x => x[0]))].length === 3;
    let unique = arr.every(x => [... new Set(x)].length === 2);
    expect(inRange).toBe(true);
    expect(correctLength).toBe(true);
    expect(unique).toBe(true);
    expect(uniform).toBe(true);
});



test('RndHe', () => {
    let arr = sample(() => RndHe());
    let isString = arr.every(x => typeof x === 'string');
    expect(isString).toBe(true);
});



test('RndShe', () => {
    let arr = sample(() => RndShe());
    let isString = arr.every(x => typeof x === 'string');
    expect(isString).toBe(true);
});

