import { runPopulate } from '../stages/populator'
import { initSeed } from '../global'



test('properly populate and validate a seed', () => {
    const seed: Seed = initSeed({
        populate: "a=1; b=2; c=Math.random()",
        validate: "a==1 && b==2 && c<0.1"
    });
    runPopulate(seed);
    expect(seed.dict.a).toBe(1);
    expect(seed.dict.b).toBe(2);
    expect(seed.dict.c).toBeLessThan(0.1);
    expect(seed.dict.d).toBeUndefined();
});



test('properly fail on infinite trial', () => {
    const seed: Seed = initSeed({
        populate: "a=1",
        validate: "a==2"
    });
    runPopulate(seed);
    expect(seed.success).toBe(false);
    expect(seed.errName).toBe("PopulationError");
    expect(seed.errMsg).toBe("No population found after 1000 trials!");
});



test('properly handle line break in validate', () => {
    const seed: Seed = initSeed({
        populate: "a=1; b=2",
        validate: "a==1 \n && b==2"
    });
    runPopulate(seed);
    expect(seed.dict.a).toBe(1);
    expect(seed.dict.b).toBe(2);
});


test('properly handle empty validate', () => {
    const seed: Seed = initSeed({
        populate: "a=1; b=2",
        validate: ""
    });
    runPopulate(seed);
    expect(seed.dict.a).toBe(1);
    expect(seed.dict.b).toBe(2);
});


test('properly define sections', () => {
    const seed: Seed = initSeed({
        populate: "a=1; sections=[[1,1],[2,3]]",
        validate: ""
    });
    runPopulate(seed);
    expect(seed.dict.a).toBe(1);
    expect(seed.config.sections).toEqual([[1, 1], [2, 3]])
});


test('properly define answer', () => {
    const seed: Seed = initSeed({
        populate: "a=1; answer='B'",
        validate: ""
    });
    runPopulate(seed);
    expect(seed.dict.a).toBe(1);
    expect(seed.config.answer).toBe("B")
});

