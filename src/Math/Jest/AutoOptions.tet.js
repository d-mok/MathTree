
test('AutoOptions', () => {
    let question = `
    this is the question
    <ul>
    <li>*x</li>
    </ul>`;
    question = AutoOptions({ x: [0, 0, 0] }, question, { x: 10 }, "");
    console.log(question);
    expect(question.split("<li>").length - 1).toBe(4);
});

