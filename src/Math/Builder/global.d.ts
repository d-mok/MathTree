
type Fun = (...args: number[]) => number

interface String {
    replaceAll(...args: any[]): string;
}

type rangeInput = [number, number] | [number] | number
type varInput = [sym: string, name: string, range: rangeInput, unit?: string]
type equInput = [func: Fun, latex: string]