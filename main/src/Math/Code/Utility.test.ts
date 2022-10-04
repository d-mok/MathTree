test('At', () => {
    expect(At([1, 2, 3], -1)).toEqual(3)
    expect(At([1, 2, 3], 1)).toEqual(2)
    expect(At([1, 2, 3], 3)).toEqual(1)
})

test('Lace', () => {
    expect(Lace([1, 2, 3, 4, 5, 6], 0, [-1, 0, 1])).toEqual([6, 1, 2])
})
