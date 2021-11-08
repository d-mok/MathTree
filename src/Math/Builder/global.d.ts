
type Fun = (...args: number[]) => number


type rangeInput = [number, number] | [number] | number
type varInput = [sym: string, name: string, range: rangeInput, unit?: string, display?: string]
type equInput = [func: Fun, latex: string]