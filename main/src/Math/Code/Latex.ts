/**
 * Print a stem-and-leaf diagram in latex.
 * @param data - sorted data
 * @param labels - a copy of data, but you can replace some number with string label.
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
export function StemAndLeaf({
    data,
    labels,
    stem = '(tens)',
    leaf = '(units)',
}: {
    data: number[]
    labels?: (number | string)[]
    stem?: string
    leaf?: string
}): string {
    let T = ''
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
        if (typeof label === 'number') return unit(label).toString()
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

/**
 * Print a table in latex.
 * @param content - the cell content
 * @param columns - a latex syntax for column border
 * @param rows - similar to `columns`
 * @param stretch - scale the height of the cells
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
export function Table({
    content,
    columns,
    rows,
    stretch,
}: {
    content: (string | number)[][]
    columns?: string
    rows?: string
    stretch?: number
}): string {
    let nCol = Math.max(...content.map($ => $.length))
    columns ??= Array(nCol + 1)
        .fill('|')
        .join('c')

    let nRow = content.length
    rows ??= Array(nRow + 1)
        .fill('|')
        .join('r')
    let rowsArr = rows
        .split('r')
        .map($ => $.replace(/\|/g, ' \\hline ').replace(/\:/g, ' \\hdashline '))

    let T = ''
    if (stretch) T += '\\def \\arraystretch{1.5} '
    T += `\\begin{array}{${columns}}`

    function parseCell(cell: string | number): string {
        if (typeof cell === 'number') return String(cell)
        return cell.startsWith('$') ? cell.substring(1) : `\\text{${cell}}`
    }

    let i = 0
    for (let row of content) {
        T += rowsArr[i] ?? ''
        T += row.map(parseCell).join(' & ') + ' \\\\ '
        i++
    }
    T += rowsArr[i] ?? ''
    T += ` \\end{array}`
    return T
}

/**
 * Print a frequency table in latex.
 * @param dataLabel - the label for the 1st row
 * @param freqLabel - the label for the 2nd row
 * ```
 * FreqTable({
 *   data: [1, 1, 4, 4, 3, 3, 3],
 *   dataLabel: '$x',
 *   freqLabel: 'count'
 * })
 * ```
 */
export function FreqTable({
    data,
    dataLabel,
    freqLabel,
    min = Math.min(...data),
    max = Math.max(...data),
}: {
    data: number[]
    dataLabel: string
    freqLabel: string
    min?: number
    max?: number
}): string {
    let values = Rng(min, max)
    let freqs = Freqs(data, values)
    return Table({
        content: [
            [dataLabel, ...values],
            [freqLabel, ...freqs],
        ],
    })
}

/**
 * Print a grouped frequency table in latex.
 * ```
 * GroupFreqTable({
 *   data: [1, 1, 4, 4, 3, 3, 3, 7, 8, 9],
 *   dataLabel: '$x',
 *   freqLabel: 'count'
 *   cls: [1, 5]
 * })
 * ```
 */
export function GroupFreqTable({
    data,
    dataLabel,
    freqLabel,
    cls,
}: {
    data: number[]
    dataLabel: string
    freqLabel: string
    cls: [number, number]
}): string {
    return Table({
        content: [
            [dataLabel, freqLabel],
            ...Bin(data, cls).map($ => [
                $.limit[0] + ' - ' + $.limit[1],
                $.freq,
            ]),
        ],
    })
}

/**
 * Print a grouped frequency table in latex.
 * ```
 * GroupCumFreqTable({
 *   data: [1, 1, 4, 4, 3, 3, 3, 7, 8, 9],
 *   dataLabel: '$x',
 *   freqLabel: 'count'
 *   cls: [1, 5]
 * })
 * ```
 */
export function GroupCumFreqTable({
    data,
    dataLabel,
    freqLabel,
    cls,
}: {
    data: number[]
    dataLabel: string
    freqLabel: string
    cls: [number, number]
}): string {
    return Table({
        content: [
            [dataLabel, freqLabel],
            ...Bin(data, cls).map($ => [$.bound[1], $.cumFreq]),
        ],
    })
}

/**
 * Print a table in latex showing cartisian product of two items.
 * @param rows - array of row values
 * @param cols - array of column values
 * @param cell - a function mapping row and column values to cell content
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
export function PairTable<R, C>({
    rowTitle,
    colTitle,
    rows,
    cols,
    cell,
}: {
    rowTitle: string
    colTitle: string
    rows: R[]
    cols: C[]
    cell: (rowValue: R, colValue: C) => string | number | boolean
}): string {
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

    let T = ''
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

/**
 * Print the check vertice steps.
 * @param label - the field label
 * ```
 * CheckVertices({
 *    constraints: [
 *      [1,0,'>',0],
 *      [0,1,'>',0],
 *      [1,1,'<',2],
 * ],
 *    field: [1,2,3],
 *    label: "P"
 * })
 * ```
 */
export function CheckVertices({
    constraints,
    field,
    label,
}: {
    constraints: Constraint[]
    field: Field
    label: string
}): string {
    let T = ''
    let vs = reins.vertices(constraints)
    for (let v of vs) {
        T += '\\text{At } ' + Coord(v) + ':~~~'
        T += label + ' = ' + optimizer(field).fieldAt(v).blur() + ' \\\\ '
    }
    return T
}

/**
 * A short division for prime factorization of numbers.
 * ```
 * ShortDivision({
 *    numbers: [12,16,18],
 *    mode: 'HCF',
 * })
 * ```
 */
export function ShortDivision({
    numbers,
    mode = 'HCF',
}: {
    numbers: number[]
    mode?: 'HCF' | 'LCM'
}): string {
    const primes = cal.primes(Math.max(...numbers))

    // is divisible by
    function isDiv(n: number, p: number): boolean {
        return n % p === 0
    }

    // return integer quotient or else, self
    function tryDiv(n: number, p: number): number {
        return isDiv(n, p) ? n / p : n
    }

    function tryDivs(ns: number[], p: number): number[] {
        return ns.map($ => tryDiv($, p))
    }

    function shouldContinue(
        ns: number[],
        p: number,
        mode: 'HCF' | 'LCM'
    ): boolean {
        if (ns.length === 1 && ns[0] === p) return false
        return mode === 'HCF'
            ? ns.every($ => isDiv($, p)) //allDivisible:
            : ns.filter($ => isDiv($, p)).length > 1 //twoDivisible
    }

    function divideStep(ns: number[]): [number, number[]] | undefined {
        for (let p of primes) {
            let go = shouldContinue(ns, p, 'HCF')
            if (go) return [p, tryDivs(ns, p)]
        }
        if (mode === 'HCF') return undefined
        for (let p of primes) {
            let go = shouldContinue(ns, p, 'LCM')
            if (go) return [p, tryDivs(ns, p)]
        }
        return undefined
    }

    let nums = [...numbers]

    let ps: number[] = []
    let steps: number[][] = [[...numbers]]

    while (true) {
        let step = divideStep(nums)
        if (step === undefined) break
        ps.push(step[0])
        steps.push(step[1])
        nums = step[1]
    }
    let T1 = '\\begin{array}{r|}' + ps.join(' \\\\ ') + '\\end{array}'
    let T2 =
        '\\begin{array}{}' +
        steps.map($ => $.join('&')).join(' \\\\\\hline ') +
        '\\end{array}'
    return T1 + ' ' + T2
}
