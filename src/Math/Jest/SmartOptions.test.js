
test('SmartOptions', () => {
    let question = `
    this is the question
    <ul>
    <li>*x</li>
    </ul>`;
    question = SmartOptions(question, { x: 10 });
    console.log(question);
    expect(question.split("<li>").length - 1).toBe(4);

});

