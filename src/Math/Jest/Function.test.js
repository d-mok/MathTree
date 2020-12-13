
test('log', () => {
    expect(log(10, 100)).toBe(2);
    expect(log(2, 8)).toBe(3);
    expect(log(3, 81)).toBe(4);
    expect(log(4, 8)).toBe(1.5);
    expect(log(5, 10)).toBeCloseTo(Math.log(10) / Math.log(5), 12);
});

test('Power', () => {
    expect(Power(2, 3)).toBe(8);
    expect(Power(-2, 3)).toBe(-8);
    expect(Power(5, 0)).toBe(1);
    expect(Power(1.1, 2)).toBe(1.21);
    expect(Power(-1.1, 2)).toBe(1.21);
    expect(Power(9, 0.5)).toBe(3);
});


test('sin', () => {
    expect(sin(0)).toBe(0);
    expect(sin(90)).toBe(1);
    expect(sin(180)).toBe(0);
    expect(sin(270)).toBe(-1);
    expect(sin(360) + 0).toBe(0);
    expect(sin(30)).toBe(0.5);
    expect(sin(45)).toBeCloseTo((2 ** 0.5) / 2, 12);
    expect(sin(60)).toBeCloseTo((3 ** 0.5) / 2, 12);
});


test('cos', () => {
    expect(cos(0)).toBe(1);
    expect(cos(90)).toBe(0);
    expect(cos(180)).toBe(-1);
    expect(cos(270) + 0).toBe(0);
    expect(cos(360)).toBe(1);
    expect(cos(30)).toBeCloseTo((3 ** 0.5) / 2, 12);
    expect(cos(45)).toBeCloseTo((2 ** 0.5) / 2, 12);
    expect(cos(60)).toBe(0.5);
});



test('tan', () => {
    expect(tan(0)).toBe(0);
    expect(tan(180) + 0).toBe(0);
    expect(tan(360) + 0).toBe(0);
    expect(tan(30)).toBeCloseTo((3 ** 0.5) / 3, 12);
    expect(tan(45)).toBe(1);
    expect(tan(60)).toBeCloseTo(3 ** 0.5, 12);
});


test('arcsin', () => {
    expect(arcsin(0)).toBe(0);
    expect(arcsin(1)).toBe(90);
    expect(arcsin(-1)).toBe(-90);
    expect(arcsin(0.5)).toBe(30);
    expect(arcsin(-0.5)).toBe(-30);
    expect(arcsin((2 ** 0.5) / 2)).toBe(45);
    expect(arcsin(-(2 ** 0.5) / 2)).toBe(-45);
    expect(arcsin((3 ** 0.5) / 2)).toBe(60);
    expect(arcsin(-(3 ** 0.5) / 2)).toBe(-60);
});



test('arccos', () => {
    expect(arccos(0)).toBe(90);
    expect(arccos(1)).toBe(0);
    expect(arccos(-1)).toBe(180);
    expect(arccos(0.5)).toBe(60);
    expect(arccos(-0.5)).toBe(120);
    expect(arccos((2 ** 0.5) / 2)).toBe(45);
    expect(arccos(-(2 ** 0.5) / 2)).toBe(135);
    expect(arccos((3 ** 0.5) / 2)).toBe(30);
    expect(arccos(-(3 ** 0.5) / 2)).toBe(150);
});


test('arctan', () => {
    expect(arctan(0)).toBe(0);
    expect(arctan(1)).toBe(45);
    expect(arctan(-1)).toBe(-45);
    expect(arctan(3 ** 0.5)).toBe(60);
    expect(arctan(-(3 ** 0.5))).toBe(-60);
    expect(arctan(1 / (3 ** 0.5))).toBe(30);
    expect(arctan(-1 / (3 ** 0.5))).toBe(-30);

});
