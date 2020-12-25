
test('CosineLawLength', () => {
    expect(CosineLawLength(5, 5, 60)).toBeCloseTo(5);
    expect(CosineLawLength(2, 4, 30)).toBeCloseTo(2.47862735);
    expect(CosineLawLength(1, 2, 180)).toBeCloseTo(3);
    expect(() => CosineLawLength(4, 6, 0)).toThrow();
});



test('CosineLawAngle', () => {
    expect(CosineLawAngle(5, 5, 5)).toBeCloseTo(60);
    expect(CosineLawAngle(3, 4, 5)).toBeCloseTo(90);
    expect(CosineLawAngle(7, 8, 9)).toBeCloseTo(73.3984504);
});


test('Heron', () => {
    expect(Heron(3, 4, 5)).toBeCloseTo(6);
    expect(Heron(1, 1, 1)).toBeCloseTo(0.433012701);
    expect(Heron(7, 8, 9)).toBeCloseTo(26.83281573);
});



test('TriangleFromVertex', () => {
    let T = TriangleFromVertex([0, 0], [4, 0], [0, 3], false);
    expect(T.sideC).toBeCloseTo(4);
    expect(T.angleB).toBeCloseTo(36.86989765);
    expect(T.sideA).toBeCloseTo(5);
    expect(T.angleC).toBeCloseTo(53.13013235);
    expect(T.sideB).toBeCloseTo(3);
    expect(T.angleA).toBeCloseTo(90);
    T = TriangleFromVertex([-3, -2], [5, 1], [-2, 5], false);
    expect(T.sideC).toBeCloseTo(8.5440037453);
    expect(T.angleB).toBeCloseTo(50.3009265165);
    expect(T.sideA).toBeCloseTo(8.0622577483);
    expect(T.angleC).toBeCloseTo(68.3852210572);
    expect(T.sideB).toBeCloseTo(7.0710678119);
    expect(T.angleA).toBeCloseTo(61.3138524263);
    T = TriangleFromVertex([-3, -2], [5, 1], [-2, 5], true);
    expect(T.sideC).toBe(9);
    expect(T.angleB).toBe(50);
    expect(T.sideA).toBe(8);
    expect(T.angleC).toBe(68);
    expect(T.sideB).toBe(7);
    expect(T.angleA).toBe(61);
});



test('SolveTriangle', () => {
    let T = SolveTriangle({
        sideA: 2,
        angleB: null,
        sideC: 2,
        angleA: null,
        sideB: 2,
        angleC: null
    });
    //let T = SolveTriangle(2, null, 2, null, 2, null);
    expect(T.sideA).toBeCloseTo(2);
    expect(T.angleB).toBeCloseTo(60);
    expect(T.sideC).toBeCloseTo(2);
    expect(T.angleA).toBeCloseTo(60);
    expect(T.sideB).toBeCloseTo(2);
    expect(T.angleC).toBeCloseTo(60);
    T = SolveTriangle({
        sideA: 3,
        angleB: 90,
        sideC: 4,
        angleA: null,
        sideB: null,
        angleC: null
    });
    //T = SolveTriangle(3, 90, 4, null, null, null);
    expect(T.sideA).toBeCloseTo(3);
    expect(T.angleB).toBeCloseTo(90);
    expect(T.sideC).toBeCloseTo(4);
    expect(T.angleA).toBeCloseTo(36.86989765);
    expect(T.sideB).toBeCloseTo(5);
    expect(T.angleC).toBeCloseTo(53.13010235);
    T = SolveTriangle({
        sideA: 5,
        angleB: 30,
        sideC: null,
        angleA: 80,
        sideB: null,
        angleC: null
    });
    //T = SolveTriangle(5, 30, null, 80, null, null);
    expect(T.sideA).toBeCloseTo(5);
    expect(T.angleB).toBeCloseTo(30);
    expect(T.sideC).toBeCloseTo(4.770944471);
    expect(T.angleA).toBeCloseTo(80);
    expect(T.sideB).toBeCloseTo(2.53856653);
    expect(T.angleC).toBeCloseTo(70);
    T = SolveTriangle({
        sideA: 6,
        angleB: 30,
        sideC: null,
        angleA: null,
        sideB: null,
        angleC: 40
    });
    //T = SolveTriangle(6, 30, null, null, null, 40);
    expect(T.sideA).toBeCloseTo(6);
    expect(T.angleB).toBeCloseTo(30);
    expect(T.sideC).toBeCloseTo(4.10424172);
    expect(T.angleA).toBeCloseTo(110);
    expect(T.sideB).toBeCloseTo(3.192533317);
    expect(T.angleC).toBeCloseTo(40);
});

