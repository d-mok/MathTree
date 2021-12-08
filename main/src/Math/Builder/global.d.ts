
type zeroFunction = (...args: number[]) => number


type rangeInput = [number, number] | [number] | number
type varInput = [sym: string, name: string, range: rangeInput, unit?: string, display?: string]
type equInput = [func: zeroFunction, latex: string]



type rangeObj = { [_: string]: [number, number] }
type valObj = { [_: string]: number }


type tree = valObj

