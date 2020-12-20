import { Seed } from '../global'


test('properly substitute from dict', () => {
    const seed = new Seed({
        qn: "*a=1",
        sol: "b=*b",
        populate: "a=1; b=2.5; c=10"
    });
    seed.runPopulate()
    seed.runSubstitute()
    expect(seed.qn).toBe("1=1");
    expect(seed.sol).toBe("b=2.5");
});



test('properly reflect undefined variable', () => {
    const seed = new Seed({
        qn: "*a=1",
        sol: "b=*b",
        populate: "a=undefined"
    });
    seed.runPopulate()
    seed.runSubstitute()
    expect(seed.qn).toBe("*a=1");
    expect(seed.sol).toBe("b=*b");
});



test('properly dress minus sign', () => {
    let seed: Seed;

    seed = new Seed({
        qn: "a=+-1",
        sol: "-+b=2"
    });
    seed.runSubstitute()
    expect(seed.qn).toBe("a=-1");
    expect(seed.sol).toBe("-b=2");

    seed = new Seed({
        qn: "a=+   -1",
        sol: "-   +b=2"
    });
    seed.runSubstitute()
    expect(seed.qn).toBe("a=-1");
    expect(seed.sol).toBe("-b=2");

    seed = new Seed({
        qn: "a=(--1",
        sol: "b=--2"
    });
    seed.runSubstitute()
    expect(seed.qn).toBe("a=(1");
    expect(seed.sol).toBe("b=2");

    seed = new Seed({
        qn: "a=(  -  -1",
        sol: "b=  -  -2"
    });
    seed.runSubstitute()
    expect(seed.qn).toBe("a=(1");
    expect(seed.sol).toBe("b=2");

    seed = new Seed({
        qn: "-  -a=1",
        sol: "b;-  -2"
    });
    seed.runSubstitute()
    expect(seed.qn).toBe("+a=1");
    expect(seed.sol).toBe("b;+2");

    seed = new Seed({
        qn: "a &gt; - -2",
        sol: "a &lt; - -2"
    });
    seed.runSubstitute()
    expect(seed.qn).toBe("a &gt;2");
    expect(seed.sol).toBe("a &lt;2");
});



test('properly format +1x', () => {
    const seed = new Seed({
        qn: '<span class="math-tex">(1x^3 +1x^2- 1 x&lt;1a +1(2)=1 \\left</span><spa>(1x^3 +1x^2- 1 x&lt;1a</spa>',
        sol: '=1x- -1y<span class="math-tex">=1x- -1y</span>=1x- -1y',

    });
    seed.runSubstitute()
    expect(seed.qn).toBe('<span class="math-tex">(x^3 +x^2-x&lt;a +(2)=\\left</span><spa>(1x^3 +1x^2- 1 x&lt;1a</spa>');
    expect(seed.sol).toBe('=1x+1y<span class="math-tex">=x+y</span>=1x+1y');
});



test('properly avoid formatting +1x outside math-tex', () => {
    const seed = new Seed({
        qn: '(1x^3 +1x^2- 1 x&lt;1a',
        sol: '=1x- -1y',
    });
    seed.runSubstitute();
    expect(seed.qn).toBe('(1x^3 +1x^2- 1 x&lt;1a');
    expect(seed.sol).toBe('=1x+1y');
});


test('properly format ^1', () => {
    const seed = new Seed({
        qn: '<p>x^{1}</p>',
        sol: '<p>x^{1}</p>',
    });
    seed.runSubstitute()
    expect(seed.qn).toBe('<p>x</p>');
    expect(seed.sol).toBe('<p>x</p>');
});


test('properly format sqrt[2]', () => {
    const seed = new Seed({
        qn: '<p>\\sqrt[2]{x}</p>',
        sol: '<p>\\sqrt[3]{x}</p>',
    });
    seed.runSubstitute()
    expect(seed.qn).toBe('<p>\\sqrt{x}</p>');
    expect(seed.sol).toBe('<p>\\sqrt[3]{x}</p>');
});


test('properly format prime', () => {
    const seed = new Seed({
        qn: `<span class="math-tex">the y' \\sqrt{2}</span><spa>the y' \\sqrt{2}</spa>`,
        sol: `<span class="math-tex">the y' \\sqrt{2}</span><spa>the y' \\sqrt{2}</spa>`,
    });
    seed.runSubstitute()
    expect(seed.qn).toBe(`<span class="math-tex">the y \\prime  \\sqrt{2}</span><spa>the y' \\sqrt{2}</spa>`);
    expect(seed.sol).toBe(`<span class="math-tex">the y \\prime  \\sqrt{2}</span><spa>the y' \\sqrt{2}</spa>`);
});

