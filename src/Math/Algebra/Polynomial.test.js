


test('RndPolynomial', () => {
    let arr = sample(() => RndPolynomial(8, ['x', 'y'], 3, 9));
    expect(arr).toSatisfyAll(owl.polynomial);
    expect(arr).toBeFlatIs(_ => PolyDegree(_) === 8);
});


test('PolyPrint', () => {
    let P = [
        Monomial(5, [{ variable: "x", power: 1 }, { variable: "y", power: 6 }]),
        Monomial(-7, [{ variable: "x", power: -1 }, { variable: "y", power: 5 }]),
        Monomial(1, [{ variable: "x", power: 3 }, { variable: "y", power: 4 }]),
        Monomial(-1, [{ variable: "x", power: 6 }, { variable: "y", power: 3 }]),
        Monomial(6, [{ variable: "x", power: 0 }, { variable: "y", power: 2 }]),
        Monomial(0, [{ variable: "x", power: 3 }, { variable: "y", power: 1 }]),
        Monomial(8, [{ variable: "x", power: 9 }, { variable: "y", power: 0 }]),
        Monomial(2, [{ variable: "x", power: 0 }, { variable: "y", power: 0 }]),
    ];
    let T = '5xy^{6}+-7x^{-1}y^{5}+1x^{3}y^{4}+-1x^{6}y^{3}+6y^{2}+8x^{9}+2';
    expect(PolyPrint(P)).toBe(T);
});


test('PolySort', () => {
    let P = [
        Monomial(5, [{ variable: "x", power: 1 }, { variable: "y", power: 6 }]),
        Monomial(-7, [{ variable: "x", power: -1 }, { variable: "y", power: 5 }]),
        Monomial(1, [{ variable: "x", power: 3 }, { variable: "y", power: 4 }]),
        Monomial(-1, [{ variable: "x", power: 6 }, { variable: "y", power: 3 }]),
        Monomial(6, [{ variable: "x", power: 0 }, { variable: "y", power: 2 }]),
        Monomial(0, [{ variable: "x", power: 3 }, { variable: "y", power: 1 }]),
        Monomial(8, [{ variable: "x", power: 9 }, { variable: "y", power: 0 }]),
        Monomial(2, [{ variable: "x", power: 0 }, { variable: "y", power: 0 }]),
    ];
    P = PolySort(P, true);
    let T = '8x^{9}+-1x^{6}y^{3}+1x^{3}y^{4}+5xy^{6}+-7x^{-1}y^{5}+6y^{2}+2';
    expect(PolyPrint(P)).toBe(T);
});



test('PolyFunction', () => {
    let P = [
        Monomial(5, [{ variable: "x", power: 1 }, { variable: "y", power: 6 }]),
        Monomial(-7, [{ variable: "x", power: -1 }, { variable: "y", power: 5 }]),
        Monomial(1, [{ variable: "x", power: 3 }, { variable: "y", power: 4 }]),
        Monomial(-1, [{ variable: "x", power: 6 }, { variable: "y", power: 3 }]),
        Monomial(6, [{ variable: "x", power: 0 }, { variable: "y", power: 2 }]),
        Monomial(0, [{ variable: "x", power: 3 }, { variable: "y", power: 1 }]),
        Monomial(8, [{ variable: "x", power: 9 }, { variable: "y", power: 0 }]),
        Monomial(2, [{ variable: "x", power: 0 }, { variable: "y", power: 0 }]),
    ];
    let func = PolyFunction(P);
    expect(func({ x: 2, y: 3 })).toBe(9511.5);
});


// test('PolySplit', () => {
//     let P = {
//         coeff: [5, -7, 1, -1, 6, 0, 8, 2],
//         x: [1, -1, 3, 6, 0, 3, 9, 0],
//         y: [6, 5, 4, 3, 2, 1, 0, 0]
//     };
//     let polys = PolySplit(P);
//     expect(PolyPrint(polys[0])).toBe('5xy^{6}');
//     expect(PolyPrint(polys[1])).toBe('-7x^{-1}y^{5}');
//     expect(PolyPrint(polys[2])).toBe('1x^{3}y^{4}');
//     expect(PolyPrint(polys[3])).toBe('-1x^{6}y^{3}');
//     expect(PolyPrint(polys[4])).toBe('6y^{2}');
//     expect(PolyPrint(polys[5])).toBe('0');
//     expect(PolyPrint(polys[6])).toBe('8x^{9}');
//     expect(PolyPrint(polys[7])).toBe('2');
// });




test('PolyDegree', () => {
    let P = [
        Monomial(5, [{ variable: "x", power: 1 }, { variable: "y", power: 6 }]),
        Monomial(-7, [{ variable: "x", power: -1 }, { variable: "y", power: 5 }]),
        Monomial(1, [{ variable: "x", power: 3 }, { variable: "y", power: 4 }]),
        Monomial(-1, [{ variable: "x", power: 6 }, { variable: "y", power: 3 }]),
        Monomial(6, [{ variable: "x", power: 0 }, { variable: "y", power: 2 }]),
        Monomial(0, [{ variable: "x", power: 3 }, { variable: "y", power: 1 }]),
        Monomial(8, [{ variable: "x", power: 9 }, { variable: "y", power: 0 }]),
        Monomial(2, [{ variable: "x", power: 0 }, { variable: "y", power: 0 }]),
    ];
    expect(PolyDegree(P)).toBe(9);
});
