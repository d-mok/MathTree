import { runSection } from '../stages/sectionor'
import { initSeed } from '../global'

test('properly run sectioning', () => {
    const seed: Seed = initSeed({
        qn: "<p>##1.0</p><p>version 0 of something</p><p>##</p><p>##1.1</p><p>version 1&nbsp;of something</p><p>##</p><p>##1.2</p><p>version 2&nbsp;of something</p><p>##</p>",
        sol: "<p>##A.0</p><p>version 0 of something</p><p>##</p><p>##A.1</p><p><b>version 1</b>&nbsp;of something</p><p>version 1&nbsp;of something</p><p>##</p><p>##A.2</p><p>version 2&nbsp;of something</p><p>##</p>",
        config: {
            sections: [[1, 2], ['A', 1]],
            answer: "A",
            options:{}
        }
    });
    runSection(seed);
    expect(seed.qn).toBe("<p>version 2&nbsp;of something</p>");
    expect(seed.sol).toBe("<p><b>version 1</b>&nbsp;of something</p><p>version 1&nbsp;of something</p>");
});

