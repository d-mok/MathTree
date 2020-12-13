

test('Quadrant', () => {
    expect(Quadrant([1, 1])).toBe('I');
    expect(Quadrant([-1, 1])).toBe('II');
    expect(Quadrant(200)).toBe('III');
    expect(Quadrant(350)).toBe('IV');
    expect(Quadrant(0)).toBe('I');
    expect(Quadrant([0, 0])).toBe('I');
});



test('PolToRect', () => {
    expect(PolToRect([1, 45])[0]).toBeCloseTo(2 ** -0.5,12);
    expect(PolToRect([1, 45])[1]).toBeCloseTo(2 ** -0.5,12);
    expect(PolToRect([1, 135])[0]).toBeCloseTo(-(2 ** -0.5),12);
    expect(PolToRect([1, 135])[1]).toBeCloseTo(2 ** -0.5,12);
    expect(PolToRect([0, 0])).toEqual([0, 0]);
});




test('RectToPol', () => {
    expect(RectToPol([1, 1])).toEqual([2 ** 0.5, 45]);
    expect(RectToPol([2, -2])).toEqual([8 ** 0.5, 315]);
    expect(RectToPol([0, 0])).toEqual([0, 0]);
});



test('ASTC', () => {
    expect(ASTC(1, 'sin')).toBe(1);
    expect(ASTC(1, 'cos')).toBe(1);
    expect(ASTC(1, 'tan')).toBe(1);
    expect(ASTC(2, 'sin')).toBe(1);
    expect(ASTC(2, 'cos')).toBe(-1);
    expect(ASTC(2, 'tan')).toBe(-1);
    expect(ASTC(3, 'sin')).toBe(-1);
    expect(ASTC(3, 'cos')).toBe(-1);
    expect(ASTC(3, 'tan')).toBe(1);
    expect(ASTC(4, 'sin')).toBe(-1);
    expect(ASTC(4, 'cos')).toBe(1);
    expect(ASTC(4, 'tan')).toBe(-1);
    expect(ASTC('III', 'tan')).toEqual(1);
});



test('TrigRoot', () => {
    expect(TrigRoot('sin', 0)).toEqual([0, 180, 360]);
    expect(TrigRoot('sin', 0.5)).toEqual([30, 150, undefined]);
    expect(TrigRoot('sin', 1)).toEqual([90, undefined, undefined]);
    expect(TrigRoot('sin', 2)).toEqual([undefined, undefined, undefined]);
    expect(TrigRoot('cos', 0)).toEqual([90, 270, undefined]);
    expect(TrigRoot('cos', 0.5)).toEqual([60, 300, undefined]);
    expect(TrigRoot('cos', 1)).toEqual([0, 360, undefined]);
    expect(TrigRoot('cos', -2)).toEqual([undefined, undefined, undefined]);
    expect(TrigRoot('tan', 0)).toEqual([0, 180, 360]);
    expect(TrigRoot('tan', 1)).toEqual([45, 225, undefined]);
});







