

test('RndComboConfig', () => {
    let { config, choices, sections } = RndComboConfig();
    expect(config.length).toBe(3);
    expect(choices.length).toBe(4);
    expect(sections.length).toBe(3);
    expect(typeof config[0]).toBe('boolean');
    expect(typeof choices[0]).toBe('string');
    expect(Array.isArray(sections[0])).toBe(true);
});
