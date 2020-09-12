
test('Abs', () => {
    expect(Abs(0)).toBe(0);
    expect(Abs(12.5)).toBe(12.5);
    expect(Abs(-2)).toBe(2);
    expect(Abs(-34.5)).toBe(34.5);
    expect(Abs(-1234)).toBe(1234);
    expect(Abs(-0)).toBe(0);
    expect(Abs(6)).toBe(6);
});


test('Sign', () => {
    expect(Sign(0)).toBe(0);
    expect(Sign(12.5)).toBe(1);
    expect(Sign(-2)).toBe(-1);
    expect(Sign(-34.5)).toBe(-1);
    expect(Sign(-1234)).toBe(-1);
    expect(Sign(-0)).toBe(0);
    expect(Sign(6)).toBe(1);
});


test('Round', () => {
    expect(Round(123.4567, 1)).toBe(100);
    expect(Round(123.4567, 2)).toBe(120);
    expect(Round(123.4567, 3)).toBe(123);
    expect(Round(123.4567, 4)).toBe(123.5);
    expect(Round(123.4567, 5)).toBe(123.46);
    expect(Round(123.4567, 6)).toBe(123.457);
    expect(Round(123.4567, 7)).toBe(123.4567);
    expect(Round(123.4567, 8)).toBe(123.4567);
    expect(Round(123.9999, 5)).toBe(124);
});



test('RoundUp', () => {
    expect(RoundUp(123.4567, 1)).toBe(200);
    expect(RoundUp(123.4567, 2)).toBe(130);
    expect(RoundUp(123.4567, 3)).toBe(124);
    expect(RoundUp(123.4567, 4)).toBe(123.5);
    expect(RoundUp(123.4567, 5)).toBe(123.46);
    expect(RoundUp(123.4567, 6)).toBe(123.457);
    expect(RoundUp(123.4567, 7)).toBe(123.4567);
    expect(RoundUp(123.4567, 8)).toBe(123.4567);
    expect(RoundUp(123.9999, 5)).toBe(124);
    expect(RoundUp(123.0001, 5)).toBe(123.01);
});


test('RoundDown', () => {
    expect(RoundDown(123.4567, 1)).toBe(100);
    expect(RoundDown(123.4567, 2)).toBe(120);
    expect(RoundDown(123.4567, 3)).toBe(123);
    expect(RoundDown(123.4567, 4)).toBe(123.4);
    expect(RoundDown(123.4567, 5)).toBe(123.45);
    expect(RoundDown(123.4567, 6)).toBe(123.456);
    expect(RoundDown(123.4567, 7)).toBe(123.4567);
    expect(RoundDown(123.4567, 8)).toBe(123.4567);
    expect(RoundDown(123.9999, 5)).toBe(123.99);
});




test('Fix', () => {
    expect(Fix(123.4567, -2)).toBe(100);
    expect(Fix(123.4567, -1)).toBe(120);
    expect(Fix(123.4567, 0)).toBe(123);
    expect(Fix(123.4567, 1)).toBe(123.5);
    expect(Fix(123.4567, 2)).toBe(123.46);
    expect(Fix(123.4567, 3)).toBe(123.457);
    expect(Fix(123.4567, 4)).toBe(123.4567);
    expect(Fix(123.4567, 5)).toBe(123.4567);
    expect(Fix(123.9999, 2)).toBe(124);
});



test('FixUp', () => {
    expect(FixUp(123.4567, -2)).toBe(200);
    expect(FixUp(123.4567, -1)).toBe(130);
    expect(FixUp(123.4567, 0)).toBe(124);
    expect(FixUp(123.4567, 1)).toBe(123.5);
    expect(FixUp(123.4567, 2)).toBe(123.46);
    expect(FixUp(123.4567, 3)).toBe(123.457);
    expect(FixUp(123.4567, 4)).toBe(123.4567);
    expect(FixUp(123.4567, 5)).toBe(123.4567);
    expect(FixUp(123.9999, 2)).toBe(124);
    expect(FixUp(123.0001, 2)).toBe(123.01);
});




test('FixDown', () => {
    expect(FixDown(123.4567, -2)).toBe(100);
    expect(FixDown(123.4567, -1)).toBe(120);
    expect(FixDown(123.4567, 0)).toBe(123);
    expect(FixDown(123.4567, 1)).toBe(123.4);
    expect(FixDown(123.4567, 2)).toBe(123.45);
    expect(FixDown(123.4567, 3)).toBe(123.456);
    expect(FixDown(123.4567, 4)).toBe(123.4567);
    expect(FixDown(123.4567, 5)).toBe(123.4567);
    expect(FixDown(123.9999, 2)).toBe(123.99);
});


test('Ceil', () => {
    expect(Ceil(2)).toBe(2);
    expect(Ceil(-2)).toBe(-2);
    expect(Ceil(1.5)).toBe(2);
    expect(Ceil(1.1)).toBe(2);
    expect(Ceil(1.9)).toBe(2);
    expect(Ceil(-1.5)).toBe(-1);
    expect(Ceil(-1.1)).toBe(-1);
    expect(Ceil(-1.9)).toBe(-1);
});


test('Floor', () => {
    expect(Floor(2)).toBe(2);
    expect(Floor(-2)).toBe(-2);
    expect(Floor(1.5)).toBe(1);
    expect(Floor(1.1)).toBe(1);
    expect(Floor(1.9)).toBe(1);
    expect(Floor(-1.5)).toBe(-2);
    expect(Floor(-1.1)).toBe(-2);
    expect(Floor(-1.9)).toBe(-2);
});



test('SimpRatio', () => {
    expect(SimpRatio(2, 4)).toEqual([1, 2]);
    expect(SimpRatio(8, 12, 18)).toEqual([4, 6, 9]);
    expect(SimpRatio(2, -4)).toEqual([1, -2]);
    expect(SimpRatio(8, -12, 18)).toEqual([4, -6, 9]);
});



test('SigFig', () => {
    expect(SigFig(1)).toBe(1);
    expect(SigFig(12)).toBe(2);
    expect(SigFig(123)).toBe(3);
    expect(SigFig(123.4)).toBe(4);
    expect(SigFig(123.45)).toBe(5);
    expect(SigFig(123.456)).toBe(6);
    expect(SigFig(0.123)).toBe(3);
    expect(SigFig(0.00123)).toBe(3);
    expect(SigFig(0.00001230123)).toBe(7);
    expect(SigFig(10)).toBe(1);
    expect(SigFig(1200)).toBe(2);
    expect(SigFig(1200.0001)).toBe(8);
    expect(SigFig(1200.0001000)).toBe(8);
    expect(SigFig(-1200.0001)).toBe(8);
});

