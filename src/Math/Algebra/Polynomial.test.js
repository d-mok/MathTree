


test('RndPolynomial', () => {
    let arr = sample(() => RndPolynomial(8, ['x', 'y'], 3, 9));
    expect(arr).toBeFlatIs(owl.polynomial);
    expect(arr).toBeFlatIs(_ => ('x' in _) && ('y' in _));
    expect(arr).toBeFlatIs(_ =>  PolyDegree(_) === 8);
});


test('PolyPrint', () => {
    let P = {
        coeff: [5, -7, 1, -1, 6, 0, 8, 2],
        x: [1, -1, 3, 6, 0, 3, 9, 0],
        y: [6, 5, 4, 3, 2, 1, 0, 0]
    };
    let T = '5xy^{6}+-7x^{-1}y^{5}+1x^{3}y^{4}+-1x^{6}y^{3}+6y^{2}+8x^{9}+2';
    expect(PolyPrint(P)).toBe(T);
});


test('PolySort', () => {
    let P = {
        coeff: [5, -7, 1, -1, 6, 0, 8, 2],
        x: [1, -1, 3, 6, 0, 3, 9, 0],
        y: [6, 5, 4, 3, 2, 1, 0, 0]
    };
    P = PolySort(P);
    let T = '8x^{9}+-1x^{6}y^{3}+1x^{3}y^{4}+5xy^{6}+-7x^{-1}y^{5}+6y^{2}+2';
    expect(PolyPrint(P)).toBe(T);
});



test('PolyFunction', () => {
    let P = {
        coeff: [5, -7, 1, -1, 6, 0, 8, 2],
        x: [1, -1, 3, 6, 0, 3, 9, 0],
        y: [6, 5, 4, 3, 2, 1, 0, 0]
    };
    let func = PolyFunction(P);
    expect(func({ x: 2, y: 3 })).toBe(9511.5);
});


test('PolySplit', () => {
    let P = {
        coeff: [5, -7, 1, -1, 6, 0, 8, 2],
        x: [1, -1, 3, 6, 0, 3, 9, 0],
        y: [6, 5, 4, 3, 2, 1, 0, 0]
    };
    let polys = PolySplit(P);
    expect(PolyPrint(polys[0])).toBe('5xy^{6}');
    expect(PolyPrint(polys[1])).toBe('-7x^{-1}y^{5}');
    expect(PolyPrint(polys[2])).toBe('1x^{3}y^{4}');
    expect(PolyPrint(polys[3])).toBe('-1x^{6}y^{3}');
    expect(PolyPrint(polys[4])).toBe('6y^{2}');
    expect(PolyPrint(polys[5])).toBe('0');
    expect(PolyPrint(polys[6])).toBe('8x^{9}');
    expect(PolyPrint(polys[7])).toBe('2');
});




test('PolyDegree', () => {
    let P = {
        coeff: [5, -7, 1, -1, 6, 0, 8, 2],
        x: [1, -1, 3, 6, 0, 3, 9, 0],
        y: [6, 5, 4, 3, 2, 1, 0, 0]
    };
    expect(PolyDegree(P)).toBe(9);
});
