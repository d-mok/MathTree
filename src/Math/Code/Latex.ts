
/**
 * Print a stem-and-leaf diagram in latex.
 * @param data - sorted data
 * @param labels - a copy of data, but you can replace some number with string label.
 * @example
 * ```
 * StemAndLeaf({
 *   data: [2,5,6,12,14,16,23,23,24,25,26,26,26,26,27,31],
 *   labels: [2,'x',6,12,14,16,23,23,24,25,26,'y',26,26,27,31],
 *   stem: "10 units",
 *   leaf: "{1} unit"
 * })
 * // a diagram with two numbers replaced by 'x' and 'y'
 * ```
 */
function StemAndLeaf({ data, labels, stem = "(tens)", leaf = "(units)" }: {
    data: number[],
    labels?: (number | string)[],
    stem?: string,
    leaf?: string
}): string {

    let T = ""
    T += '\\begin{array}{r|l}'
    T += `\\text{Stem} & \\text{Leaf} \\\\ `
    T += `\\text{${stem}} & \\text{${leaf}} \\\\ \\hline `

    function ten(num: number): number {
        return Math.floor(num / 10 + Number.EPSILON)
    }

    function unit(num: number): number {
        return num - ten(num) * 10
    }

    function parse(label: number | string): string {
        if (typeof label === 'number')
            return unit(label).toString()
        return label
    }

    labels ??= [...data]
    let parsedLabels = labels.map(parse)

    let initTen = ten(Math.min(...data))
    let endTen = ten(Math.max(...data))

    for (let t = initTen; t <= endTen; t++) {
        T += t + ' & { \\begin{array}{} '

        let units: string[] = []
        for (let i = 0; i < data.length; i++) {
            if (ten(data[i]) === t) units.push(parsedLabels[i])
        }
        T += units.join(' & ')

        T += ' \\end{array} } \\\\ '
    }

    T += ' \\end{array}'
    return T
}
globalThis.StemAndLeaf = contract(StemAndLeaf)
    .sign([owl.pass])
// ************TO BE DONE!!! VALIDATE OBJECT







/**
 * Print a table in latex.
 * @param content - the cell content
 * @param columns - a latex syntax for column border
 * @param rows - similar to `columns`
 * @param stretch - scale the height of the cells
 * @example
 * ```
 * Table({
 *     content: [
 *         ['a', 2, 3],   // 'a' will be printed as '\text{a}'
 *         ['b', 5, 6],
 *         ['$c', 7, 8],  // 'c' will be printed as is
 *         ['$d', 12, 13]
 *     ],
 *     columns: '|c::c:c|',
 *     rows: '|r||r|rr|',
 * })
 * ```
 */
function Table({ content, columns, rows, stretch }: {
    content: (string | number)[][],
    columns?: string,
    rows?: string,
    stretch?: number

}): string {
    let nCol = Math.max(...content.map($ => $.length))
    columns ??= Array(nCol + 1).fill("|").join("c")

    let nRow = content.length
    rows ??= Array(nRow + 1).fill("|").join("r")
    let rowsArr = rows.split('r').map($ => $
        .replace(/\|/g, " \\hline ")
        .replace(/\:/g, " \\hdashline ")
    )

    let T = ""
    if (stretch) T += '\\def \\arraystretch{1.5} '
    T += `\\begin{array}{${columns}}`

    function parseCell(cell: string | number): string {
        if (typeof cell === 'number') return String(cell)
        return cell.startsWith('$') ? cell.substring(1) : `\\text{${cell}}`
    }

    let i = 0
    for (let row of content) {
        T += rowsArr[i] ?? ''
        T += row.map(parseCell).join(" & ") + " \\\\ "
        i++
    }
    T += rowsArr[i] ?? ''
    T += ` \\end{array}`
    return T
}
globalThis.Table = contract(Table).sign([owl.pass])
// ************TO BE DONE!!! VALIDATE OBJECT







/**
 * Print a frequency table in latex.
 * @dataLabel - the label for the 1st row
 * @freqLabel - the label for the 2nd row
 * @example
 * ```
 * FreqTable({
 *   data: [1, 1, 4, 4, 3, 3, 3],
 *   dataLabel: '$x',
 *   freqLabel: 'count'
 * })
 * ```
 */
function FreqTable({ data, dataLabel, freqLabel }: {
    data: number[],
    dataLabel: string,
    freqLabel: string
}): string {
    let values = ListIntegers(Math.min(...data), Math.max(...data))
    let freqs = Freqs(data, values)
    return Table({
        content:
            [
                [dataLabel, ...values],
                [freqLabel, ...freqs]
            ]
    })
}
globalThis.FreqTable = contract(FreqTable).sign([owl.pass])
// ************TO BE DONE!!! VALIDATE OBJECT




/**
 * Print a table in latex showing cartisian product of two items.
 * @rows - array of row values
 * @cols - array of column values
 * @cell - a function mapping row and column values to cell content
 * @example
 * ```
 * PairTable({
 *    rowTitle:'first',
 *    colTitle:'second',
 *    rows: [1,2,3,4,5,6],
 *    cols: [1,2,3,4,5,6],
 *    cell: (r,c) => r+c
 * })
 * // a table showing the sum of two dices
 * ```
 */
function PairTable<R, C>({
    rowTitle,
    colTitle,
    rows,
    cols,
    cell
}: {
    rowTitle: string,
    colTitle: string,
    rows: R[],
    cols: C[],
    cell: (rowValue: R, colValue: C) => string | number | boolean
}
): string {

    function parseCell(cell: string | number): string {
        if (typeof cell === 'number') return String(cell)
        return cell.startsWith('$') ? cell.substring(1) : `\\text{${cell}}`
    }

    colTitle = parseCell(colTitle)
    rowTitle = parseCell(rowTitle)

    function cellMap(r: R, c: C): string {
        let val = cell(r, c)
        if (typeof val === 'number') return String(val)
        if (typeof val === 'string') return val
        if (typeof val === 'boolean') return val ? '✔' : '✘'
        return String(val)
    }

    let T = ""
    T += '\\begin{matrix}'
    T += ` & ${colTitle} \\\\`
    T += ` ${rowTitle} & {`
    T += `\\begin{array}{c|ccc}`
    T += ` & ` + cols.join(' & ') + ' \\\\ \\hline '
    for (let r of rows) {
        T += ' ' + String(r) + ' & '
        T += cols.map(c => cellMap(r, c)).join(' & ')
        T += ' \\\\'
    }
    T += ' \\end{array}'
    T += ` } `
    T += `\\end{matrix}`

    return T
}
globalThis.PairTable = contract(PairTable)
    .sign([owl.pass])
// ************TO BE DONE!!! VALIDATE OBJECT