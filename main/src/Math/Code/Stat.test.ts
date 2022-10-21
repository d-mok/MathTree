test('Min', () => {
    expect(Min(1, 2, 3)).toBe(1)
    expect(Min(4, 6, 8)).toBe(4)
    expect(Min(24, 36, -60)).toBe(-60)
    expect(Min(5, 10, 4.1)).toBe(4.1)
    expect(Min(1, 1)).toBe(1)
    expect(Min(0.1, 0.2)).toBe(0.1)
})

test('Max', () => {
    expect(Max(1, 2, 3)).toBe(3)
    expect(Max(4, 6, 8)).toBe(8)
    expect(Max(24, 36, -60)).toBe(36)
    expect(Max(5, 10, 4.1)).toBe(10)
    expect(Max(1, 1)).toBe(1)
    expect(Max(0.1, 0.2)).toBe(0.2)
})

test('Sort', () => {
    expect(Sort(2, 3, 1)).toEqual([1, 2, 3])
    expect(Sort(2, -3, 1)).toEqual([-3, 1, 2])
    expect(Sort(4.5, 3, 2, 1)).toEqual([1, 2, 3, 4.5])
    expect(Sort(3, 2, 2, 0, 1)).toEqual([0, 1, 2, 2, 3])
})

test('SortBy', () => {
    expect(SortBy([2, 3, 1], x => x)).toEqual([1, 2, 3])
    expect(SortBy([2, -3, 1], x => x)).toEqual([-3, 1, 2])
    expect(SortBy([4.5, 3, 2, 1], x => x)).toEqual([1, 2, 3, 4.5])
    expect(SortBy([3, 2, 2, 0, 1], x => x)).toEqual([0, 1, 2, 2, 3])

    expect(SortBy([2, 3, 1], x => -x)).toEqual([3, 2, 1])

    expect(SortBy(['aa', 'aaa', 'a'], x => x.length)).toEqual([
        'a',
        'aa',
        'aaa',
    ])
})

test('Sum', () => {
    expect(Sum(2, 3, 1)).toBe(6)
    expect(Sum(2, -3, 1)).toBe(0)
    expect(Sum(4.5, 3, 2, 1)).toBe(10.5)
    expect(Sum(3, 2, 2, 0, 1)).toBe(8)
    expect(Sum()).toBe(0)
})

test('Product', () => {
    expect(Product(2, 3, 1)).toBe(6)
    expect(Product(2, -3, 1)).toBe(-6)
    expect(Product(4.5, 3, 2, 1)).toBe(27)
    expect(Product(3, 2, 2, 0, 1)).toBe(0)
    expect(Product()).toBe(1)
})

test('Mean', () => {
    expect(Mean(2, 3, 1)).toBe(2)
    expect(Mean(2, -3, 1)).toBe(0)
    expect(Mean(4.5, 3, 2, 1)).toBe(2.625)
    expect(Mean(3, 2, 2, 0, 1)).toBe(1.6)
    expect(() => Mean()).toThrow()
})

test('Median', () => {
    expect(Median(1, 2, 3, 4, 50)).toBe(3)
    expect(Median(1, 2, 3, 4, 5, 7)).toBe(3.5)
    expect(Median(4, 5, 7, 1, 2, 3)).toBe(3.5)
    expect(Median(11, 23, 45, 67, 89, 134, 457, 688)).toBe(78)
})

test('LowerQ', () => {
    expect(LowerQ(1, 2, 3, 4, 50)).toBe(1.5)
    expect(LowerQ(1, 2, 3, 4, 5, 7)).toBe(2)
    expect(LowerQ(1, 2, 3, 4, 5, 7, 10)).toBe(2)
    expect(LowerQ(1, 2, 3, 4, 5, 7, 10, 20)).toBe(2.5)
})

test('UpperQ', () => {
    expect(UpperQ(1, 2, 3, 4, 50)).toBe(27)
    expect(UpperQ(1, 2, 3, 4, 5, 7)).toBe(5)
    expect(UpperQ(1, 2, 3, 4, 5, 7, 10)).toBe(7)
    expect(UpperQ(1, 2, 3, 4, 5, 7, 10, 20)).toBe(8.5)
})

test('StatRange', () => {
    expect(StatRange(1, 2, 3, 4, 50)).toBe(49)
    expect(StatRange(1, 2, 3, 4, 5, 7)).toBe(6)
    expect(StatRange(1, 2, 3, 4, 5, 7, 10)).toBe(9)
    expect(StatRange(1, 2, 3, 4, 5, 7, 10, 20)).toBe(19)
})

test('IQR', () => {
    expect(IQR(1, 2, 3, 4, 50)).toBe(25.5)
    expect(IQR(1, 2, 3, 4, 5, 7)).toBe(3)
    expect(IQR(1, 2, 3, 4, 5, 7, 10)).toBe(5)
    expect(IQR(1, 2, 3, 4, 5, 7, 10, 20)).toBe(6)
})

// test('Frequency', () => {
//     expect(Frequency(1)(2, 3, 4, 1, 5, 1, 1, 4, 5)).toBe(3);
// });

test('Freq', () => {
    expect(Freq([2, 3, 4, 1, 5, 1, 1, 4, 5], 1)).toBe(3)
})

test('Mode', () => {
    expect(Mode(1, 2, 3, 2, 2, 3, 4)).toEqual([2])
    expect(Mode(1, 1, 2, 2, 3)).toEqual([1, 2])
})

test('UniMode', () => {
    expect(UniMode(1, 2, 3, 2, 2, 3, 4)).toBe(2)
    expect(() => UniMode(1, 1, 2, 2, 3)).toThrow()
})

test('StdDev', () => {
    expect(StdDev(1, 2, 3, 2, 2, 3, 4)).toBeCloseTo(0.903507902)
    expect(StdDev(1, 1, 2, 2, 3)).toBeCloseTo(0.748331477)
})

test('ZScore', () => {
    expect(ZScore(80, 60, 10)).toBe(2)
    expect(ZScore(40, 60, 10)).toBe(-2)
})

test('MedianAt', () => {
    expect(MedianAt(12)).toBe(6.5)
    expect(MedianAt(13)).toBe(7)
    expect(MedianAt(14)).toBe(7.5)
    expect(MedianAt(15)).toBe(8)
    expect(MedianAt(16)).toBe(8.5)
    expect(MedianAt(17)).toBe(9)
    expect(MedianAt(18)).toBe(9.5)
    expect(MedianAt(19)).toBe(10)
    expect(MedianAt(20)).toBe(10.5)
})

test('LowerQAt', () => {
    expect(LowerQAt(12)).toBe(3.5)
    expect(LowerQAt(13)).toBe(3.5)
    expect(LowerQAt(14)).toBe(4)
    expect(LowerQAt(15)).toBe(4)
    expect(LowerQAt(16)).toBe(4.5)
    expect(LowerQAt(17)).toBe(4.5)
    expect(LowerQAt(18)).toBe(5)
    expect(LowerQAt(19)).toBe(5)
    expect(LowerQAt(20)).toBe(5.5)
})

test('UpperQAt', () => {
    expect(UpperQAt(12)).toBe(9.5)
    expect(UpperQAt(13)).toBe(10.5)
    expect(UpperQAt(14)).toBe(11)
    expect(UpperQAt(15)).toBe(12)
    expect(UpperQAt(16)).toBe(12.5)
    expect(UpperQAt(17)).toBe(13.5)
    expect(UpperQAt(18)).toBe(14)
    expect(UpperQAt(19)).toBe(15)
    expect(UpperQAt(20)).toBe(15.5)
})

test('Freqs', () => {
    expect(Freqs([1, 1, 4, 4, 3, 3, 3], [1, 2, 3, 4])).toEqual([2, 0, 3, 2])
    expect(Freqs([1, 1, 4, 4, 3, 3, 3])).toEqual([2, 0, 3, 2])
})

// test('DataFromFreqs', () => {
//     expect(DataFromFreqs([1, 9, 5], [2, 2, 3])).toEqual([1, 1, 9, 9, 5, 5, 5])
// })

test('Summary', () => {
    expect(Summary(1, 1, 2, 3, 3, 3, 3, 4, 5, 5)).toStrictEqual([1, 2, 3, 4, 5])
    expect(Summary(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).toStrictEqual([
        1, 3, 5.5, 8, 10,
    ])
})

test('Bin', () => {
    expect(Bin([2, 2, 3, 3, 7, 7, 7, 8, 8], [11, 15])).toEqual([
        {
            lowerLimit: 1,
            upperLimit: 5,
            classMark: 3,
            lowerBound: 0.5,
            upperBound: 5.5,
            classWidth: 5,
            freq: 4,
            cumFreq: 4,
        },
        {
            lowerLimit: 6,
            upperLimit: 10,
            classMark: 8,
            lowerBound: 5.5,
            upperBound: 10.5,
            classWidth: 5,
            freq: 5,
            cumFreq: 9,
        },
    ])
})
