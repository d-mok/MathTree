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
declare function RndComboConfig(): {
    truth: boolean[];
    choices: string[];
    sections: [number, number][];
};
