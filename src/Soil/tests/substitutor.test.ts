import { runSubstitute } from '../stages/substitutor'
import { initSeed, createDict } from '../global'



test('properly substitute from dict', () => {
    const seed: Seed = initSeed({
        qn: "*a=1",
        sol: "b=*b",
        dict: createDict({ a: 1, b: 2.5, c: 10 })
    });
    runSubstitute(seed);
    expect(seed.qn).toBe("1=1");
    expect(seed.sol).toBe("b=2.5");
});



test('properly reflect undefined variable', () => {
    const seed: Seed = initSeed({
        qn: "*a=1",
        sol: "b=*b",
        dict: createDict({ a: undefined })
    });
    runSubstitute(seed);
    expect(seed.qn).toBe("*a=1");
    expect(seed.sol).toBe("b=*b");
});



test('properly dress minus sign', () => {
    let seed: Seed;

    seed = initSeed({ qn: "a=+-1", sol: "-+b=2" });
    runSubstitute(seed);
    expect(seed.qn).toBe("a=-1");
    expect(seed.sol).toBe("-b=2");

    seed = initSeed({ qn: "a=+   -1", sol: "-   +b=2" });
    runSubstitute(seed);
    expect(seed.qn).toBe("a=-1");
    expect(seed.sol).toBe("-b=2");

    seed = initSeed({ qn: "a=(--1", sol: "b=--2" });
    runSubstitute(seed);
    expect(seed.qn).toBe("a=(1");
    expect(seed.sol).toBe("b=2");

    seed = initSeed({ qn: "a=(  -  -1", sol: "b=  -  -2" });
    runSubstitute(seed);
    expect(seed.qn).toBe("a=(1");
    expect(seed.sol).toBe("b=2");

    seed = initSeed({ qn: "-  -a=1", sol: "b;-  -2" });
    runSubstitute(seed);
    expect(seed.qn).toBe("+a=1");
    expect(seed.sol).toBe("b;+2");

    seed = initSeed({ qn: "a &gt; - -2", sol: "a &lt; - -2" });
    runSubstitute(seed);
    expect(seed.qn).toBe("a &gt;2");
    expect(seed.sol).toBe("a &lt;2");
});



test('properly format +1x', () => {
    const seed: Seed = initSeed({
        qn: '<span class="math-tex">(1x^3 +1x^2- 1 x&lt;1a +1(2)=1 \\left</span><spa>(1x^3 +1x^2- 1 x&lt;1a</spa>',
        sol: '=1x- -1y<span class="math-tex">=1x- -1y</span>=1x- -1y',

    });
    runSubstitute(seed);
    expect(seed.qn).toBe('<span class="math-tex">(x^3 +x^2-x&lt;a +(2)=\\left</span><spa>(1x^3 +1x^2- 1 x&lt;1a</spa>');
    expect(seed.sol).toBe('=1x+1y<span class="math-tex">=x+y</span>=1x+1y');
});



test('properly avoid formatting +1x outside math-tex', () => {
    const seed: Seed = initSeed({
        qn: '(1x^3 +1x^2- 1 x&lt;1a',
        sol: '=1x- -1y',
    });
    runSubstitute(seed);
    expect(seed.qn).toBe('(1x^3 +1x^2- 1 x&lt;1a');
    expect(seed.sol).toBe('=1x+1y');
});


test('properly format ^1', () => {
    const seed: Seed = initSeed({
        qn: '<p>x^{1}</p>',
        sol: '<p>x^{1}</p>',
    });
    runSubstitute(seed);
    expect(seed.qn).toBe('<p>x</p>');
    expect(seed.sol).toBe('<p>x</p>');
});


test('properly format sqrt[2]', () => {
    const seed: Seed = initSeed({
        qn: '<p>\\sqrt[2]{x}</p>',
        sol: '<p>\\sqrt[3]{x}</p>',
    });
    runSubstitute(seed);
    expect(seed.qn).toBe('<p>\\sqrt{x}</p>');
    expect(seed.sol).toBe('<p>\\sqrt[3]{x}</p>');
});


test('properly format prime', () => {
    const seed: Seed = initSeed({
        qn: `<span class="math-tex">the y' \\sqrt{2}</span><spa>the y' \\sqrt{2}</spa>`,
        sol: `<span class="math-tex">the y' \\sqrt{2}</span><spa>the y' \\sqrt{2}</spa>`,
    });
    runSubstitute(seed);
    expect(seed.qn).toBe(`<span class="math-tex">the y \\prime  \\sqrt{2}</span><spa>the y' \\sqrt{2}</spa>`);
    expect(seed.sol).toBe(`<span class="math-tex">the y \\prime  \\sqrt{2}</span><spa>the y' \\sqrt{2}</spa>`);
});

