
test('RndPick', () => {
    let arr = sample(() => RndPick("a", "b", "c"));
    expect(arr).toBeIncluded(["a", "b", "c"]);
    expect(arr).toBeFlatDistinct(3);
});




test('RndShuffle', () => {
    let arr = sample(() => RndShuffle("a", "b", "c"));
    expect(arr).toBeIncluded(["a", "b", "c"]);
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeFlatDistinct(3);
    expect(arr).toBeUnique();
});



test('RndPickN', () => {
    let arr = sample(() => RndPickN(["a", "b", "c"], 2));
    expect(arr).toBeIncluded(["a", "b", "c"]);
    expect(arr).toAllHaveLength(2);
    expect(arr).toBeFlatDistinct(3);
    expect(arr).toBeUnique();
});



test('RndHe', () => {
    let arr = sample(() => RndHe());
    expect(arr).toBeFlatIs(x => typeof x === 'string');
});



test('RndShe', () => {
    let arr = sample(() => RndShe());
    expect(arr).toBeFlatIs(x => typeof x === 'string');
});

