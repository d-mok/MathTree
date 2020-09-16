
test('CosineLawLength', () => {
    expect(CosineLawLength(5, 5, 60)).toBeCloseTo(5);
    expect(CosineLawLength(2, 4, 30)).toBeCloseTo(2.47862735);
    expect(CosineLawLength(1, 2, 180)).toBeCloseTo(3);
    expect(CosineLawLength(4, 6, 0)).toBeCloseTo(2);
});



test('CosineLawAngle', () => {
    expect(CosineLawAngle(5, 5, 5)).toBeCloseTo(60);
    expect(CosineLawAngle(3, 4, 5)).toBeCloseTo(90);
    expect(CosineLawAngle(7, 8, 9)).toBeCloseTo(73.3984504);
});



test('TriangleFromVertex', () => {
    let T = TriangleFromVertex([0, 0], [4, 0], [0, 3]);
    expect(T[0]).toBeCloseTo(4);
    expect(T[1]).toBeCloseTo(36.86989765);
    expect(T[2]).toBeCloseTo(5);
    expect(T[3]).toBeCloseTo(53.13013235);
    expect(T[4]).toBeCloseTo(3);
    expect(T[5]).toBeCloseTo(90);
    T = TriangleFromVertex([-3, -2], [5, 1], [-2, 5]);
    expect(T[0]).toBeCloseTo(8.5440037453);
    expect(T[1]).toBeCloseTo(50.3009265165);
    expect(T[2]).toBeCloseTo(8.0622577483);
    expect(T[3]).toBeCloseTo(68.3852210572);
    expect(T[4]).toBeCloseTo(7.0710678119);
    expect(T[5]).toBeCloseTo(61.3138524263);
});



test('SolveTriangle', () => {
    let T = SolveTriangle(2, null, 2, null, 2, null);
    expect(T[0]).toBeCloseTo(2);
    expect(T[1]).toBeCloseTo(60);
    expect(T[2]).toBeCloseTo(2);
    expect(T[3]).toBeCloseTo(60);
    expect(T[4]).toBeCloseTo(2);
    expect(T[5]).toBeCloseTo(60);
    T = SolveTriangle(3, 90, 4, null, null, null);
    expect(T[0]).toBeCloseTo(3);
    expect(T[1]).toBeCloseTo(90);
    expect(T[2]).toBeCloseTo(4);
    expect(T[3]).toBeCloseTo(36.86989765);
    expect(T[4]).toBeCloseTo(5);
    expect(T[5]).toBeCloseTo(53.13010235);
    T = SolveTriangle(5, 30, null, 80, null, null);
    expect(T[0]).toBeCloseTo(5);
    expect(T[1]).toBeCloseTo(30);
    expect(T[2]).toBeCloseTo(4.770944471);
    expect(T[3]).toBeCloseTo(80);
    expect(T[4]).toBeCloseTo(2.53856653);
    expect(T[5]).toBeCloseTo(70);
    T = SolveTriangle(6, 30, null, null, null, 40);
    expect(T[0]).toBeCloseTo(6);
    expect(T[1]).toBeCloseTo(30);
    expect(T[2]).toBeCloseTo(4.10424172);
    expect(T[3]).toBeCloseTo(110);
    expect(T[4]).toBeCloseTo(3.192533317);
    expect(T[5]).toBeCloseTo(40);
});

