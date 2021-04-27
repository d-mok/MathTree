import { Seed } from '../global'

test('properly populate and validate a seed', () => {
    const seed = new Seed({
        populate: "a=1; b=2; c=Math.random()",
        validate: "a==1 && b==2 && c<0.1"
    });
    seed.runPopulate()
    expect(seed.dict.a).toBe(1);
    expect(seed.dict.b).toBe(2);
    expect(seed.dict.c).toBeLessThan(0.1);
    expect(seed.dict.d).toBeUndefined();
});



test('properly fail on infinite trial', () => {
    const seed = new Seed({
        populate: "a=1",
        validate: "a==2"
    });
    expect(() => seed.runPopulate()).toThrow()
});



test('properly handle line break in validate', () => {
    const seed = new Seed({
        populate: "a=1; b=2",
        validate: "a==1 \n && b==2"
    });
    seed.runPopulate()
    expect(seed.dict.a).toBe(1);
    expect(seed.dict.b).toBe(2);
});


test('properly handle empty validate', () => {
    const seed = new Seed({
        populate: "a=1; b=2",
        validate: ""
    });
    seed.runPopulate()
    expect(seed.dict.a).toBe(1);
    expect(seed.dict.b).toBe(2);
});


test('properly define sections', () => {
    const seed = new Seed({
        populate: "a=1; sections=[[1,1],[2,3]]",
        validate: ""
    });
    seed.runPopulate()
    expect(seed.dict.a).toBe(1);
    expect(seed.config.sections).toEqual([[1, 1], [2, 3]])
});


test('properly define answer', () => {
    const seed = new Seed({
        populate: "a=1; answer='B'",
        validate: ""
    });
    seed.runPopulate()
    expect(seed.dict.a).toBe(1);
    expect(seed.config.answer).toBe("B")
});



test('properly fail MathError', () => {
    const seed = new Seed({
        populate: "Divide(1,0)",
        validate: ""
    });
    expect(() => seed.runPopulate()).toThrow()
});

