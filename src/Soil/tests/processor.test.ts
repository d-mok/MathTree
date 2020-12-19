
import { runPreprocess, runPostprocess } from '../stages/processor'
import { initSeed, createDict } from '../global'


test('properly preprocess question', () => {
    const seed: Seed = initSeed({
        qn: "abc",
        sol: "abc",
        preprocess: "question = question.replace('a',a)",
        dict: createDict({ a: 1 })
    });
    runPreprocess(seed);
    expect(seed.qn).toBe("1bc");
    expect(seed.sol).toBe("abc");
});


test('properly preprocess solution', () => {
    const seed: Seed = initSeed({
        qn: "abc",
        sol: "abc",
        preprocess: "solution = solution.replace('a',a)",
        dict: createDict({ a: 1 })
    });
    runPreprocess(seed);
    expect(seed.qn).toBe("abc");
    expect(seed.sol).toBe("1bc");
});






test('properly postprocess question', () => {
    const seed: Seed = initSeed({
        qn: "abc",
        sol: "abc",
        postprocess: "question = question.replace('a',a)",
        dict: createDict({ a: 1 })
    });
    runPostprocess(seed);
    expect(seed.qn).toBe("1bc");
    expect(seed.sol).toBe("abc");
});



test('properly postprocess solution', () => {
    const seed: Seed = initSeed({
        qn: "abc",
        sol: "abc",
        postprocess: "solution = solution.replace('a',a)",
        dict: createDict({ a: 1 })
    });
    runPostprocess(seed);
    expect(seed.qn).toBe("abc");
    expect(seed.sol).toBe("1bc");
});






test('properly throw error on preprocess', () => {
    const seed: Seed = initSeed({
        qn: "abc",
        sol: "abc",
        preprocess: "question = ",
        dict: createDict({ a: 1 })
    });
    expect(() => runPreprocess(seed)).toThrow();
});



test('properly throw error on postprocess', () => {
    const seed: Seed = initSeed({
        qn: "abc",
        sol: "abc",
        postprocess: "question = ",
        dict: createDict({ a: 1 })
    });
    expect(() => runPostprocess(seed)).toThrow();
});