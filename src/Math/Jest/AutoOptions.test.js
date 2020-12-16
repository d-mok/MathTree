
test('AutoOptions', () => {
    let question = `
    this is the question
    <ul>
    <li>*x</li>
    </ul>`;
    question = AutoOptions({ x: 10 }, question);
    console.log(question);
    expect(question.split("<li>").length - 1).toBe(4);
});

