import { Seed } from '../global'


test('properly shuffle MC', () => {
    const seed = new Seed({
        qn: "asking<ul><li>some</li><li>thing</li></ul>here<ul><li>correct</li><li>wrong1</li><li>wrong2</li><li>wrong3</li></ul>",
        sol: "answering"
    });
    seed.runShuffle()
    let ans = seed.config.answer;
    expect(ans).toMatch(/[ABCD]/);
    expect(seed.sol).toBe("<p>Answer: " + ans + "</p><p><b>Solution:</b></p>answering");
    expect(seed.qn).toContain("asking<ul><li>some</li><li>thing</li></ul>here<ul>");
    expect(seed.qn).toContain("<li>correct</li>");
    expect(seed.qn).toContain("<li>wrong1</li>");
    expect(seed.qn).toContain("<li>wrong2</li>");
    expect(seed.qn).toContain("<li>wrong3</li>");
    if (ans === "A") {
        expect(seed.qn).toMatch(/correct[\s\S]+wrong[\s\S]+wrong[\s\S]+wrong/);
    } else if (ans === "B") {
        expect(seed.qn).toMatch(/wrong[\s\S]+correct[\s\S]+wrong[\s\S]+wrong/);
    } else if (ans === "C") {
        expect(seed.qn).toMatch(/wrong[\s\S]+wrong[\s\S]+correct[\s\S]+wrong/);
    } else if (ans === "D") {
        expect(seed.qn).toMatch(/wrong[\s\S]+wrong[\s\S]+wrong[\s\S]+correct/);
    }
});

test('properly shuffle MC for manual answer', () => {
    const seed = new Seed({
        qn: "asking<ul><li>some</li><li>thing</li></ul>here<ul><li>wrong1</li><li>correct</li><li>wrong2</li><li>wrong3</li></ul>",
        sol: "answering",
        populate: "answer='B'"
    });
    seed.runPopulate()
    seed.runShuffle();
    let ans = seed.config.answer;
    expect(ans).toMatch(/[ABCD]/);
    expect(seed.sol).toBe("<p>Answer: " + ans + "</p><p><b>Solution:</b></p>answering");
    expect(seed.qn).toContain("asking<ul><li>some</li><li>thing</li></ul>here<ul>");
    expect(seed.qn).toContain("<li>correct</li>");
    expect(seed.qn).toContain("<li>wrong1</li>");
    expect(seed.qn).toContain("<li>wrong2</li>");
    expect(seed.qn).toContain("<li>wrong3</li>");
    if (ans === "A") {
        expect(seed.qn).toMatch(/correct[\s\S]+wrong[\s\S]+wrong[\s\S]+wrong/);
    } else if (ans === "B") {
        expect(seed.qn).toMatch(/wrong[\s\S]+correct[\s\S]+wrong[\s\S]+wrong/);
    } else if (ans === "C") {
        expect(seed.qn).toMatch(/wrong[\s\S]+wrong[\s\S]+correct[\s\S]+wrong/);
    } else if (ans === "D") {
        expect(seed.qn).toMatch(/wrong[\s\S]+wrong[\s\S]+wrong[\s\S]+correct/);
    }
});



test('properly handle when MC missing', () => {
    const seed = new Seed({
        qn: "asking",
        sol: "answering",
    });
    seed.runShuffle();
    expect(seed.config.answer).toBe('X');
    expect(seed.qn).toBe("asking");
    expect(seed.sol).toBe("answering");
});




test('properly handle when MC option missing', () => {
    const seed = new Seed({
        qn: "asking<ul>some</ul>thing<ul>here</ul>",
        sol: "answering"
    });
    seed.runShuffle();
    expect(seed.config.answer).toBe('X');
    expect(seed.qn).toBe("asking<ul>some</ul>thing<ul>here</ul>");
    expect(seed.sol).toBe("answering");
});



test('properly check distinct options', () => {
    const seed = new Seed({
        qn: "asking<ul><li>abc</li><li>abc</li></ul>",
        sol: "answering",
    });
    expect(seed.runShuffle()).toBe(false)
});


