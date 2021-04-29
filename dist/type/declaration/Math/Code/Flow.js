"use strict";
/**
* @category Flow
* @return a random config of a Combo Options question type.
* ```typescript
* RndComboConfig()
* // may return {
* //   truth: [true, true, false],
* //   choices: ["I and II", "I only", "I and III", "I, II and III"],
* //   sections: [[1,1], [2,1], [3,0]]
* //  }
* // truth: the true value of the 3 options.
* // choices: for filling in the 4 answer choices, the 1st is correct.
* // sections: the sections object for section versioning, version 0 is false, version 1 is true.
* ```
*/
function RndComboConfig() {
    function convertBool(n) {
        if (n === 0)
            return [false, false, false];
        if (n === 1)
            return [false, false, true];
        if (n === 2)
            return [false, true, false];
        if (n === 3)
            return [false, true, true];
        if (n === 4)
            return [true, false, false];
        if (n === 5)
            return [true, false, true];
        if (n === 6)
            return [true, true, false];
        if (n === 7)
            return [true, true, true];
        return [false, false, false];
    }
    function convertText(n) {
        let bools = convertBool(n);
        let opts = [];
        if (bools[0])
            opts.push("I");
        if (bools[1])
            opts.push("II");
        if (bools[2])
            opts.push("III");
        if (opts.length === 0)
            return 'None';
        if (opts.length === 1)
            return opts[0] + ' only';
        return GrammarJoin(...opts);
    }
    let codes = RndPickN([1, 2, 3, 4, 5, 6, 7], 4);
    let truth = codes.map(x => convertBool(x))[0];
    let choices = codes.map(x => convertText(x));
    let sections = [];
    sections.push([1, truth[0] ? 1 : 0]);
    sections.push([2, truth[1] ? 1 : 0]);
    sections.push([3, truth[2] ? 1 : 0]);
    return { truth, choices, sections };
}
globalThis.RndComboConfig = RndComboConfig;
