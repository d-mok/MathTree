import { Seed } from '../global'

test('properly populate and validate a seed', () => {
    const seed = new Seed({
        qn: 'this is the question<ul><li>*x</li></ul>',
        populate: "x=10;options={x:[0,0,0]}",
        validate: ""
    });
    seed.runPopulate()
    seed.runOption()
    expect(seed.qn.split("<li>").length - 1).toBe(4);
});
