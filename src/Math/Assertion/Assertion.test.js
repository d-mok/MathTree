
test('IsInteger', () => {
    expect(IsInteger(0)).toBe(true);
    expect(IsInteger(13)).toBe(true);
    expect(IsInteger(-5)).toBe(true);
    expect(IsInteger(-1045372)).toBe(true);
    expect(IsInteger(4721)).toBe(true);
    expect(IsInteger(1, 2, -3, 4, -5)).toBe(true);
    expect(IsInteger(0.5)).toBe(false);
    expect(IsInteger(1.12)).toBe(false);
    expect(IsInteger(-55.6)).toBe(false);
    expect(IsInteger(1, 2.3, -3, 4, -5)).toBe(false);
});


test('IsCoeff', () => {
    expect(IsCoeff(2)).toBe(true);
    expect(IsCoeff(3)).toBe(true);
    expect(IsCoeff(-2)).toBe(true);
    expect(IsCoeff(-5)).toBe(true);
    expect(IsCoeff(2, 3, -4)).toBe(true);
    expect(IsCoeff(1)).toBe(false);
    expect(IsCoeff(0)).toBe(false);
    expect(IsCoeff(-1)).toBe(false);
    expect(IsCoeff(-1, 3, 4, 5)).toBe(false);
});


test('IsOdd', () => {
    expect(IsOdd(1)).toBe(true);
    expect(IsOdd(-1)).toBe(true);
    expect(IsOdd(3)).toBe(true);
    expect(IsOdd(99)).toBe(true);
    expect(IsOdd(3, 5, -7)).toBe(true);
    expect(IsOdd(2)).toBe(false);
    expect(IsOdd(0)).toBe(false);
    expect(IsOdd(-4)).toBe(false);
    expect(IsOdd(1, 3, 4, 5)).toBe(false);
});





test('IsEven', () => {
    expect(IsEven(2)).toBe(true);
    expect(IsEven(-2)).toBe(true);
    expect(IsEven(4)).toBe(true);
    expect(IsEven(96)).toBe(true);
    expect(IsEven(2, 4, -6)).toBe(true);
    expect(IsEven(1)).toBe(false);
    expect(IsEven(3)).toBe(false);
    expect(IsEven(-5)).toBe(false);
    expect(IsEven(2, 3, 4, 8)).toBe(false);
});





test('IsProbability', () => {
    expect(IsProbability(1)).toBe(true);
    expect(IsProbability(0)).toBe(true);
    expect(IsProbability(0.123)).toBe(true);
    expect(IsProbability(0.678)).toBe(true);
    expect(IsProbability(1, 0, 0.123)).toBe(true);
    expect(IsProbability(-0.5)).toBe(false);
    expect(IsProbability(1.1)).toBe(false);
    expect(IsProbability(3)).toBe(false);
    expect(IsProbability(0.1, 0.2, 1.3)).toBe(false);
});



test('IsSquareNum', () => {
    expect(IsSquareNum(0)).toBe(true);
    expect(IsSquareNum(1)).toBe(true);
    expect(IsSquareNum(4)).toBe(true);
    expect(IsSquareNum(9)).toBe(true);
    expect(IsSquareNum(1, 4, 16)).toBe(true);
    expect(IsSquareNum(2)).toBe(false);
    expect(IsSquareNum(1.5)).toBe(false);
    expect(IsSquareNum(-4)).toBe(false);
    expect(IsSquareNum(4, 36, -1)).toBe(false);
});



test('IsPositive', () => {
    expect(IsPositive(1)).toBe(true);
    expect(IsPositive(1.4)).toBe(true);
    expect(IsPositive(123)).toBe(true);
    expect(IsPositive(0.001)).toBe(true);
    expect(IsPositive(0.1, 4, 0.000000001)).toBe(true);
    expect(IsPositive(0)).toBe(false);
    expect(IsPositive(-1)).toBe(false);
    expect(IsPositive(-4.5)).toBe(false);
    expect(IsPositive(4, 36, -1)).toBe(false);
});



test('IsNonZero', () => {
    expect(IsNonZero(1)).toBe(true);
    expect(IsNonZero(1.4)).toBe(true);
    expect(IsNonZero(-123)).toBe(true);
    expect(IsNonZero(-0.001)).toBe(true);
    expect(IsNonZero(0.1, 4, 9)).toBe(true);
    expect(IsNonZero(0)).toBe(false);
    expect(IsNonZero(-0)).toBe(false);
    expect(IsNonZero(0, 36, -1)).toBe(false);
});

