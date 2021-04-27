import { Seed } from '../global'


test('properly preprocess question', () => {
    const seed = new Seed({
        qn: "abc",
        sol: "abc",
        populate: "a=1",
        preprocess: "question = question.replace('a',a)",
    });
    seed.runPopulate()
    seed.runPreprocess()
    expect(seed.qn).toBe("1bc");
    expect(seed.sol).toBe("abc");
});


test('properly preprocess solution', () => {
    const seed = new Seed({
        qn: "abc",
        sol: "abc",
        preprocess: "solution = solution.replace('a',a)",
        populate: "a=1",
    });
    seed.runPopulate()
    seed.runPreprocess()
    expect(seed.qn).toBe("abc");
    expect(seed.sol).toBe("1bc");
});






test('properly postprocess question', () => {
    const seed = new Seed({
        qn: "abc",
        sol: "abc",
        postprocess: "question = question.replace('a',a)",
        populate: "a=1",
    });
    seed.runPopulate()
    seed.runPostprocess()
    expect(seed.qn).toBe("1bc");
    expect(seed.sol).toBe("abc");
});



test('properly postprocess solution', () => {
    const seed = new Seed({
        qn: "abc",
        sol: "abc",
        postprocess: "solution = solution.replace('a',a)",
        populate: "a=1",
    });
    seed.runPopulate()
    seed.runPostprocess()
    expect(seed.qn).toBe("abc");
    expect(seed.sol).toBe("1bc");
});






test('properly throw error on preprocess', () => {
    const seed = new Seed({
        qn: "abc",
        sol: "abc",
        preprocess: "question = ",
        populate: "a=1",
    });
    seed.runPopulate()
    expect(() => seed.runPreprocess()).toThrow();
});



test('properly throw error on postprocess', () => {
    const seed = new Seed({
        qn: "abc",
        sol: "abc",
        postprocess: "question = ",
        populate: "a=1",
    });
    seed.runPopulate()
    expect(() => seed.runPostprocess()).toThrow();
});