
function getPoly() {
    return [
        Monomial(5, [{ variable: "x", power: 1 }, { variable: "y", power: 6 }]),
        Monomial(-7, [{ variable: "x", power: -1 }, { variable: "y", power: 5 }]),
        Monomial(1, [{ variable: "x", power: 3 }, { variable: "y", power: 4 }]),
        Monomial(-1, [{ variable: "x", power: 6 }, { variable: "y", power: 3 }]),
        Monomial(6, [{ variable: "x", power: 0 }, { variable: "y", power: 2 }]),
        Monomial(0, [{ variable: "x", power: 3 }, { variable: "y", power: 1 }]),
        Monomial(8, [{ variable: "x", power: 9 }, { variable: "y", power: 0 }]),
        Monomial(2, [{ variable: "x", power: 0 }, { variable: "y", power: 0 }]),
    ];
}

let T = '5xy^{6}+-7x^{-1}y^{5}+1x^{3}y^{4}+-1x^{6}y^{3}+6y^{2}+8x^{9}+2';
let TSorted = '8x^{9}+-1x^{6}y^{3}+1x^{3}y^{4}+5xy^{6}+-7x^{-1}y^{5}+6y^{2}+2';


test('PolyClone', () => {
    let P = getPoly()
    let Q = PolyClone(P);
    P[0].coeff = 1;
    expect(PolyPrint(Q)).toBe(T);
});



test('RndPolynomial', () => {
    let arr = sample(() => RndPolynomial(8, ['x', 'y'], 3, 9));
    expect(arr).toSatisfyAll(owl.polynomial);
    expect(arr).toSatisfyAll(_ => PolyDegree(_) === 8);
});


test('PolyPrint', () => {
    let P = getPoly()
    expect(PolyPrint(P)).toBe(T);
});


test('PolySort', () => {
    let P = getPoly()
    P = PolySort(P, true);
    expect(PolyPrint(P)).toBe(TSorted);
});



test('PolyFunction', () => {
    let P = getPoly()
    let func = PolyFunction(P);
    expect(func({ x: 2, y: 3 })).toBe(9511.5);
});


test('PolyJoin', () => {
    let P = [
        Monomial(5, [{ variable: "x", power: 1 }, { variable: "y", power: 6 }]),
        Monomial(-7, [{ variable: "x", power: -1 }, { variable: "y", power: 5 }]),
        Monomial(1, [{ variable: "x", power: 3 }, { variable: "y", power: 4 }]),
        Monomial(-1, [{ variable: "x", power: 6 }, { variable: "y", power: 3 }]),
    ];
    let Q = [
        Monomial(6, [{ variable: "x", power: 0 }, { variable: "y", power: 2 }]),
        Monomial(0, [{ variable: "x", power: 3 }, { variable: "y", power: 1 }]),
        Monomial(8, [{ variable: "x", power: 9 }, { variable: "y", power: 0 }]),
        Monomial(2, [{ variable: "x", power: 0 }, { variable: "y", power: 0 }]),
    ];
    let T = '5xy^{6}+-7x^{-1}y^{5}+1x^{3}y^{4}+-1x^{6}y^{3}+6y^{2}+8x^{9}+2';
    expect(PolyPrint(PolyJoin(P, Q))).toBe(T);
});




test('PolySimplify', () => {
    let P = [
        Monomial(1, [{ variable: "x", power: 1 }, { variable: "y", power: 3 }]),
        Monomial(2, [{ variable: "x", power: 2 }, { variable: "y", power: 4 }]),
        Monomial(3, [{ variable: "x", power: 1 }, { variable: "y", power: 3 }]),
        Monomial(4, [{ variable: "x", power: 2 }, { variable: "y", power: 4 }]),
    ];
    let T = '4xy^{3}+6x^{2}y^{4}';
    expect(PolyPrint(PolySimplify(P))).toBe(T);
});




test('PolyDegree', () => {
    let P = getPoly()
    expect(PolyDegree(P)).toBe(9);
});
