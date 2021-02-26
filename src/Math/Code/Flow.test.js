

test('RndComboConfig', () => {
    let { truth, choices, sections } = RndComboConfig();
    expect(truth.length).toBe(3);
    expect(choices.length).toBe(4);
    expect(sections.length).toBe(3);
    expect(typeof truth[0]).toBe('boolean');
    expect(typeof choices[0]).toBe('string');
    expect(Array.isArray(sections[0])).toBe(true);
});
