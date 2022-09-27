test('GrammarJoin', () => {
    expect(GrammarJoin(1, 2, 3, 4)).toBe('1, 2, 3 and 4')
    expect(GrammarJoin('a', 'b', 'c')).toBe('a, b and c')
    expect(GrammarJoin('a', 'b')).toBe('a and b')
    expect(GrammarJoin('a')).toBe('a')
    expect(GrammarJoin()).toBe('')
})

// test('Tick', () => {
//     expect(Tick(true)).toBe('✔');
//     expect(Tick(false)).toBe('✘');
// });

// test('Ticks', () => {
//     expect(Ticks(true, false)).toEqual(['✔', '✘']);
// });

test('IneqSign', () => {
    expect(IneqSign(true, true)).toEqual(['\\ge', '\\le'])
    expect(IneqSign(true, false)).toEqual(['\\gt', '\\lt'])
    expect(IneqSign(false, true)).toEqual(['\\le', '\\ge'])
    expect(IneqSign(false, false)).toEqual(['\\lt', '\\gt'])
})

// test('ParseIneqSign', () => {
//     expect(ParseIneqSign('\\ge')).toEqual([true, true]);
//     expect(ParseIneqSign('\\le')).toEqual([false, true]);
//     expect(ParseIneqSign('\\gt')).toEqual([true, false]);
//     expect(ParseIneqSign('\\lt')).toEqual([false, false]);
//     expect(ParseIneqSign('>=')).toEqual([true, true]);
//     expect(ParseIneqSign('<=')).toEqual([false, true]);
//     expect(ParseIneqSign('>')).toEqual([true, false]);
//     expect(ParseIneqSign('<')).toEqual([false, false]);
//     expect(() => ParseIneqSign('abc')).toThrow();
// });

test('Dfrac', () => {
    expect(Dfrac(1, 2)).toBe('\\dfrac{1}{2}')
    expect(Dfrac(1, -2)).toBe('-\\dfrac{1}{2}')
    expect(Dfrac(6, 4)).toBe('\\dfrac{3}{2}')
    expect(Dfrac(456, 678)).toBe('\\dfrac{76}{113}')
    expect(Dfrac(6, -2)).toBe('-3')
    expect(Dfrac(0, 2)).toBe('0')
    expect(Dfrac(6, -4, true)).toBe('\\dfrac{-3}{2}')
    expect(() => Dfrac(5, 0)).toThrow()
})

// test('ParseDfrac', () => {
//     expect(ParseDfrac('\\dfrac{1}{2}')).toEqual([1, 2]);
//     expect(ParseDfrac('\\dfrac{1.2}{-2}')).toEqual([1.2, -2]);
//     expect(ParseDfrac('-\\dfrac{1.2}{2}')).toEqual([-1.2, 2]);
//     expect(ParseDfrac('-\\dfrac{-1.2}{2}')).toEqual([1.2, 2]);
//     expect(ParseDfrac('-\\dfrac{-1.2}{-2}')).toEqual([1.2, -2]);
//     expect(() => ParseDfrac('\\dfrac{x}{2}')).toThrow();
//     expect(() => ParseDfrac('\\d{1}{2}')).toThrow();
// });

test('IndexToSurd', () => {
    expect(IndexToSurd('{x}^{0.5}')).toBe('\\sqrt{x}')
    expect(IndexToSurd('{(y)}^{0.5}')).toBe('\\sqrt{y}')
    expect(IndexToSurd('abc')).toBe('abc')
})

test('Coord', () => {
    expect(Coord([1, 2])).toBe('(1, 2)')
    expect(Coord([1, -2])).toBe('(1, -2)')
    expect(Coord([-6.5, 0.123])).toBe('(-6.5, 0.1)')
    expect(Coord([0.1 + 0.2, 0])).toBe('(0.3, 0)')
})

test('Sci', () => {
    expect(Sci(123.45)).toBe('1.2345 \\times 10^{ 2}')
    expect(Sci(-123.45)).toBe('-1.2345 \\times 10^{ 2}')
    expect(Sci(0.123)).toBe('1.23 \\times 10^{ -1}')
    expect(Sci(-0.123)).toBe('-1.23 \\times 10^{ -1}')
    expect(Sci(0)).toBe('0')
    expect(Sci(2)).toBe('2')
    expect(Sci(1.23)).toBe('1.23')
    expect(Sci(100)).toBe('1 \\times 10^{ 2}')
})

test('LongDivision', () => {
    expect(LongDivision([4, -5, 5, -4], [4, -1])).toBe(
        '\\begin{array}{r}1x^2+-1x+1 \\\\4x+-1{\\overline{\\smash{\\big)}4x^3+-5x^2+5x+-4}}\\\\\\underline{4x^3+-1x^2}\\phantom{+5x+-4}\\\\-4x^2+5x\\phantom{+-4}\\\\\\underline{-4x^2+1x}\\phantom{+-4}\\\\4x+-4\\\\\\underline{4x+-1}\\\\-3\\\\\\end{array}'
    )
    expect(LongDivision([16, 12, -28, -11], [4, -3, -3])).toBe(
        '\\begin{array}{r}4x+6 \\\\4x^2+-3x+-3{\\overline{\\smash{\\big)}16x^3+12x^2+-28x+-11}}\\\\\\underline{16x^3+-12x^2+-12x}\\phantom{+-11}\\\\24x^2+-16x+-11\\\\\\underline{24x^2+-18x+-18}\\\\2x+7\\\\\\end{array}'
    )
})

// test('Roman', () => {
//     expect(Roman(1)).toBe('I');
//     expect(Roman(2)).toBe('II');
//     expect(Roman(3)).toBe('III');
//     expect(Roman(4)).toBe('IV');
//     expect(Roman(5)).toBe('V');
//     expect(Roman(6)).toBe('VI');
//     expect(() => Roman(0)).toThrow();
// });

// test('DeRoman', () => {
//     expect(DeRoman('I')).toBe(1);
//     expect(DeRoman('II')).toBe(2);
//     expect(DeRoman('III')).toBe(3);
//     expect(DeRoman('IV')).toBe(4);
//     expect(DeRoman('V')).toBe(5);
//     expect(() => DeRoman('XI')).toThrow();
// });

test('ToBase', () => {
    expect(ToBase(1000, 16)).toBe('{3}{E}{8}_{16}')
    expect(ToBase(13, 2)).toBe('{1}{1}{0}{1}_{2}')
    expect(ToBase(1234567890, 16)).toBe('{4}{9}{9}{6}{0}{2}{D}{2}_{16}')
})

test('PrimeFactorize', () => {
    expect(
        PrimeFactorize(
            {
                x: [1, 2, 3],
                y: [0, 5, 6],
                z: [4, 5, 6],
            },
            { hcf: true, lcm: true }
        )
    ).toBe(
        '\\begin{matrix}  & &x & &z^{4} \\\\  & &x^{2}&y^{5}&z^{5} \\\\  & &x^{3}&y^{6}&z^{6} \\\\ \\hline \\text{HCF} & = &x & &z^{4} \\\\  \\text{LCM} & = &x^{3}&y^{6}&z^{6} \\\\ \\end{matrix}'
    )
})

test('ConstraintText', () => {
    expect(ConstraintText([1, 2, '<', 3], true, 'h', 'k')).toBe(
        ' 1h + 2k \\lt 3 '
    )
    expect(ConstraintText([1, 2, '<', 3], false)).toBe(' 1x + 2y \\gt 3 ')
    expect(ConstraintText([1, 2, '<', 3], null)).toBe(' 1x + 2y = 3 ')
})

test('SolveCompoundIneq', () => {
    expect(SolveCompoundIneq('AND', '>', 1, '>=', 2, 'y')).toBe('y\\ge2')
    expect(SolveCompoundIneq('AND', '<', 1, '>=', 2, 'y')).toBe(
        '\\text{no solution}'
    )
})
