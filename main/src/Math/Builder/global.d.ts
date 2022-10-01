type zeroFunction = (...args: number[]) => number

type rangeInput = [number, number] | [number] | number
type varInput = [
    sym: string,
    name: string,
    range: rangeInput,
    unit?: string,
    display?: string
]
type equInput = [func: zeroFunction, latex: string]

type varObj = {
    sym: string
    name: string
    range: [number, number]
    unit: string
    display: string
    val: number
    subscript: string
}

type varGrp = Record<string, varObj>

type rangeObj = { [_: string]: [number, number] }
type valObj = { [_: string]: number }

type TREE = Record<
    string,
    {
        variable: string
        order: number
        isGiven: boolean
        solvedBy: zeroFunction | null
        deps: string[]
        isTop: boolean
    }
>
