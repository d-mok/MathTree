
test('GrammarJoin', () => {
    expect(GrammarJoin(1, 2, 3, 4)).toBe('1, 2, 3 and 4');
    expect(GrammarJoin('a', 'b', 'c')).toBe('a, b and c');
    expect(GrammarJoin('a', 'b')).toBe('a and b');
    expect(GrammarJoin('a')).toBe('a');
    expect(GrammarJoin()).toBe('');
});


test('Tick', () => {
    expect(Tick(true)).toBe('✔');
    expect(Tick(false)).toBe('✘');
});



test('Ticks', () => {
    expect(Ticks(true, false)).toEqual(['✔', '✘']);
});


test('IneqSign', () => {
    expect(IneqSign(true, true)).toEqual(['\\ge', '\\le']);
    expect(IneqSign(true, false)).toEqual(['\\gt', '\\lt']);
    expect(IneqSign(false, true)).toEqual(['\\le', '\\ge']);
    expect(IneqSign(false, false)).toEqual(['\\lt', '\\gt']);
});


test('ParseIneqSign', () => {
    expect(ParseIneqSign('\\ge')).toEqual([true, true]);
    expect(ParseIneqSign('\\le')).toEqual([false, true]);
    expect(ParseIneqSign('\\gt')).toEqual([true, false]);
    expect(ParseIneqSign('\\lt')).toEqual([false, false]);
    expect(ParseIneqSign('>=')).toEqual([true, true]);
    expect(ParseIneqSign('<=')).toEqual([false, true]);
    expect(ParseIneqSign('>')).toEqual([true, false]);
    expect(ParseIneqSign('<')).toEqual([false, false]);
    expect(ParseIneqSign('abc')).toBeUndefined();
});



test('Dfrac', () => {
    expect(Dfrac(1, 2)).toBe('\\dfrac{1}{2}');
    expect(Dfrac(1, -2)).toBe('-\\dfrac{1}{2}');
    expect(Dfrac(6, 4)).toBe('\\dfrac{3}{2}');
    expect(Dfrac(6, -2)).toBe('-3');
    expect(Dfrac(0, 2)).toBe('0');
    expect(Dfrac(5, 0)).toBe('\\dfrac{5}{0}');
    expect(Dfrac(6, -4, true)).toBe('\\dfrac{-3}{2}');
});



test('ParseDfrac', () => {
    expect(ParseDfrac('\\dfrac{1}{2}')).toEqual([1, 2]);
    expect(ParseDfrac('\\dfrac{1.2}{-2}')).toEqual([1.2, -2]);
    expect(ParseDfrac('\\dfrac{x}{2}')).toBeUndefined();
    expect(ParseDfrac('\\d{1}{2}')).toBeUndefined();
});

