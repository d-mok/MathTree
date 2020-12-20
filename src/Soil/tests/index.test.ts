import { Dict, Config, SeedCore } from '../cls'

type Shell = {
    content: SeedCore
    question?: Question
}

function seed(): Shell {
    return {
        content: {
            qn: "abc=*a",
            sol: "*b=3",
            populate: "a=1;b=2",
            validate: "b==2",
            preprocess: "question=question.replace('b','e')",
            postprocess: "solution=solution.replace('3','4')",
        }
    };
}




test('properly grow single seed', () => {
    const seeds = seed();
    MathSoil.grow(seeds);
    expect(seeds.content.qn).toBe("abc=*a");
    expect(seeds.content.sol).toBe("*b=3");
    expect(seeds.question!.qn).toBe("aec=1");
    expect(seeds.question!.sol).toBe("2=4");
    expect(seeds.question!.ans).toBe('X');
});


test('properly grow array of seeds', () => {
    const seeds = [seed(), seed(), seed()];
    MathSoil.grow(seeds);
    expect(seeds[0].content.qn).toBe("abc=*a");
    expect(seeds[0].content.sol).toBe("*b=3");
    expect(seeds[1].question!.qn).toBe("aec=1");
    expect(seeds[1].question!.sol).toBe("2=4");
    expect(seeds[2].question!.ans).toBe('X');
});



test('properly throw error', () => {
    const seed: Shell = {
        content: {
            qn: "abc=*a",
            sol: "*b=3",
            populate: "a=1;b=2",
            validate: "b==2",
            preprocess: "question=",
            postprocess: "solution=solution.replace('3','4')",
        }
    };
    MathSoil.grow(seed);
    expect(seed.question!.success).toBe(false);
});




test('properly check distinct options', () => {
    const seed: Shell = {
        content: {
            qn: "question<ul><li>abc</li><li>abc</li></ul>",
            sol: "",
            populate: "",
            validate: "",
            preprocess: "",
            postprocess: "",
        }
    };
    MathSoil.grow(seed);
    expect(seed.question!.success).toBe(false);
});



test('properly test healthy seed', () => {
    const seed: Shell = {
        content: {
            qn: "",
            sol: "",
            populate: "a=Math.random()",
            validate: "a<0.1",
            preprocess: "",
            postprocess: "",
        }
    };
    const health = MathSoil.test(seed);
    expect(health.healthy).toBe(true);
    expect(health.avg).toBeGreaterThan(0);
});



test('properly test sick seed', () => {
    const seed: Shell = {
        content: {
            qn: "",
            sol: "",
            populate: "a=Math.random()",
            validate: "a>2",
            preprocess: "",
            postprocess: "",
        }
    };
    const health = MathSoil.test(seed);
    expect(health.healthy).toBe(false);
    expect(health.avg).toBe(0);
});

