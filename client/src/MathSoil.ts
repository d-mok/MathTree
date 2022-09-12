declare global {
    var MathSoil2: {
        reap(gene: Gene): RawFruit
        inspect(gene: Gene, repeat: number): Inspection
    }
}

type Gene = {
    readonly qn: string
    readonly sol: string
    readonly slot: string
    readonly populate: string
    readonly validate: string
    readonly preprocess: string
    readonly postprocess: string
    readonly inject: string
}

type Inspection = {
    readonly counter: number
    readonly success: boolean
    readonly logs: string[]
    readonly time: number
}

class RawFruit {
    readonly qn: string = 'Loading...'
    readonly sol: string = 'Loading...'
    readonly ans: string = 'X'
    readonly counter: number = 0
    readonly success: boolean = false
    readonly logs: string[] = []
    readonly time: number = 0
}

export class Fruit extends RawFruit {
    readonly key: number = Math.random()
    readonly id: string = ''

    constructor(id: string = '', rawFruit?: RawFruit) {
        super()
        this.id = id
        if (rawFruit !== undefined) Object.assign(this, rawFruit)
    }
}

export function reap(id: string, gene: Gene): Fruit {
    const RawFruit = MathSoil2.reap(gene)
    return new Fruit(id, RawFruit)
}
