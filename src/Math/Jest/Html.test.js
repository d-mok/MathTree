
test('ExtractHTMLTag', () => {
    let html = 'abc<ul><li>1</li><li>2</li><li>3</li></ul>';
    expect(ExtractHTMLTag(html, 'li')).toEqual(['1', '2', '3']);
});



test('AppendInHTMLTag', () => {
    let html = 'abc<ul><li>1</li></ul>';
    expect(AppendInHTMLTag(html, 'ul', '<li>2</li>')).toBe('abc<ul><li>1</li><li>2</li></ul>');
});



test('JoinToHTMLTag', () => {
    expect(JoinToHTMLTag(['a', 'b'], 'li')).toBe('<li>a</li><li>b</li>');
});



test('PrintVariable', () => {
    let html = '1 + *x = *y';
    expect(PrintVariable(html, 'x', 2)).toBe('1 + 2 = *y');
});

