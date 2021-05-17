
test('RndPick', () => {
    let arr = sample(() => RndPick("a", "b", "c"));
    expect(arr).toBeFlatIncluded(["a", "b", "c"]);
    expect(arr).toBeFlatDistinct(3);
});




test('RndShuffle', () => {
    let arr = sample(() => RndShuffle("a", "b", "c"));
    expect(arr).toBeFlatIncluded(["a", "b", "c"]);
    expect(arr).toAllHaveLength(3);
    expect(arr).toBeFlatDistinct(3);
    expect(arr).toBeUnique();
});



test('RndPickN', () => {
    let arr = sample(() => RndPickN(["a", "b", "c"], 2));
    expect(arr).toBeFlatIncluded(["a", "b", "c"]);
    expect(arr).toAllHaveLength(2);
    expect(arr).toBeFlatDistinct(3);
});



test('RndPickUnique', () => {
    let arr = sample(() => RndPickUnique(["a", "b", "c"], 2));
    expect(arr).toBeFlatIncluded(["a", "b", "c"]);
    expect(arr).toAllHaveLength(2);
    expect(arr).toBeFlatDistinct(3);
    expect(arr).toBeUnique();

    arr = sample(() => RndPickUnique(["a", "b", "b", "b"], 2));
    expect(arr).toBeFlatIncluded(["a", "b"]);
    expect(arr).toAllHaveLength(2);
    expect(arr).toBeFlatDistinct(2);
    expect(arr).toBeUnique();
});




// test('RndBalanced', () => {
//     let arr = sample(() => RndBalanced(['a', 'b'], 6));
//     expect(arr).toBeFlatDistinct(2);
//     expect(arr).toBeFlatIncluded(['a', 'b']);
//     expect(arr).toAllHaveLength(6);
//     let nG = arr.flat().filter(x => x === 'a').length;
//     let nL = arr.flat().filter(x => x === 'b').length;
//     expect(nG).toBe(nL);

//     arr = sample(() => RndBalanced(['a', 'b'], 19));
//     expect(arr).toBeFlatDistinct(2);
//     expect(arr).toBeFlatIncluded(['a', 'b']);
//     expect(arr).toAllHaveLength(19);
//     nG = arr.flat().filter(x => x === 'a').length;
//     nL = arr.flat().filter(x => x === 'b').length;
//     expect(nG).toBeGreaterThan(nL);
// });




test('RndHe', () => {
    let arr = sample(() => RndHe());
    expect(arr).toBeFlatIs(x => typeof x === 'string');
});



test('RndShe', () => {
    let arr = sample(() => RndShe());
    expect(arr).toBeFlatIs(x => typeof x === 'string');
});


test('RndLetters', () => {
    let arr = sample(() => RndLetters());
    expect(arr).toBeFlatIs(x => typeof x === 'string');
    expect(arr).toAllHaveLength(3);
});


test('RndCapitals', () => {
    let arr = sample(() => RndCapitals());
    expect(arr).toBeFlatIs(x => typeof x === 'string');
    expect(arr).toAllHaveLength(3);
});

