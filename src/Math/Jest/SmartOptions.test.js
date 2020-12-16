
test('SmartOptions', () => {
    let question = `
    this is the question
    <ul>
    <li>10</li>
    </ul>`;
    question = SmartOptions(question);
    expect(question.split("li").length - 1).toBe(4);

});

