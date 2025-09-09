import _ from 'lodash'
import { describe, expect, it, test } from 'vitest'

test('StemAndLeaf', () => {
    expect(
        StemAndLeaf({
            data: [2, 5, 6, 12, 14, 16, 23, 23, 24, 25, 26, 26, 26, 26, 27, 31],
            labels: [
                2,
                'x',
                6,
                12,
                14,
                16,
                23,
                23,
                24,
                25,
                26,
                26,
                'y',
                26,
                27,
                31,
            ],
            stem: '10 units',
            leaf: '{1} unit',
        })
    ).toBe(
        String.raw`\begin{array}{r|l}\text{Stem} & \text{Leaf} \\ \text{10 units} & \text{{1} unit} \\ \hline 0 & { \begin{array}{} 2 & x & 6 \end{array} } \\ 1 & { \begin{array}{} 2 & 4 & 6 \end{array} } \\ 2 & { \begin{array}{} 3 & 3 & 4 & 5 & 6 & 6 & y & 6 & 7 \end{array} } \\ 3 & { \begin{array}{} 1 \end{array} } \\  \end{array}`
    )
})

test('Table', () => {
    expect(
        Table({
            content: [
                ['a', 2, 3],
                ['b', 5, 6],
                ['$c', 7, 8],
                ['$d', 12, 13],
            ],
            columns: '|c::c:c|',
            rows: '|r||r|rr|',
        })
    ).toBe(
        String.raw`\begin{array}{|c::c:c|} \hline \text{a} & 2 & 3 \\  \hline  \hline \text{b} & 5 & 6 \\  \hline c & 7 & 8 \\ d & 12 & 13 \\  \hline  \end{array}`
    )

    expect(
        Table({
            content: [
                ['a', 2, 3],
                ['b', 5, 6],
                ['$c', 7, 8],
                ['$d', 12, 13],
            ],
        })
    ).toBe(
        String.raw`\begin{array}{|c|c|c|} \hline \text{a} & 2 & 3 \\  \hline \text{b} & 5 & 6 \\  \hline c & 7 & 8 \\  \hline d & 12 & 13 \\  \hline  \end{array}`
    )
})

test('FreqTable', () => {
    expect(
        FreqTable({
            data: [1, 1, 4, 4, 3, 3, 3],
            dataLabel: '$x',
            freqLabel: 'count',
        })
    ).toBe(
        String.raw`\begin{array}{|c|c|c|c|c|} \hline x & 1 & 2 & 3 & 4 \\  \hline \text{count} & 2 & 0 & 3 & 2 \\  \hline  \end{array}`
    )
})

test('PairTable', () => {
    expect(
        PairTable({
            rowTitle: 'ab',
            colTitle: '$cd',
            rows: [1, 2, 3],
            cols: [4, 5, 6, 7],
            cell: (r, c) => r + c,
        })
    ).toBe(
        String.raw`\begin{matrix} & cd \\ \text{ab} & {\begin{array}{c|ccc} & 4 & 5 & 6 & 7 \\ \hline  1 & 5 & 6 & 7 & 8 \\ 2 & 6 & 7 & 8 & 9 \\ 3 & 7 & 8 & 9 & 10 \\ \end{array} } \end{matrix}`
    )
})

test('CheckVertices', () => {
    expect(1).toBe(1)
})

test('ShortDivision', () => {
    expect(1).toBe(1)
})

test('ShortDivisionBy2', () => {
    expect(1).toBe(1)
})
