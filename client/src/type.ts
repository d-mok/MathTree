



declare global {
    var MathSoil2: {
        reap(gene: Gene): RawFruit
        inspect(gene: Gene, repeat: number): Inspection
    }
}


type RawFruit = {
    readonly qn: string
    readonly sol: string
    readonly ans: string
    readonly counter: number
    readonly success: boolean
    readonly logs: string[]
    readonly time: number
}





class Fruit implements RawFruit {
    readonly qn: string = 'Loading...'
    readonly sol: string = 'Loading...'
    readonly ans: string = 'X'
    readonly counter: number = 0
    readonly success: boolean = false
    readonly logs: string[] = []
    readonly time: number = 0

    readonly key: number = Math.random()
    readonly id: string = ''

    constructor(id: string = '', rawFruit?: RawFruit) {
        this.id = id
        if (rawFruit !== undefined)
            Object.assign(this, rawFruit)
    }
}


type Inspection = {
    readonly counter: number
    readonly success: boolean
    readonly logs: string[]
    readonly time: number
}


type Gene = {
    readonly qn: string
    readonly sol: string
    readonly populate: string
    readonly validate: string
    readonly preprocess: string
    readonly postprocess: string
}

export type SeedFetch = {
    readonly id: string
    readonly bank: string
    readonly folder: string
    readonly gene: Gene
}



export class Seed implements SeedFetch {
    public id: string
    public bank: string
    public folder: string
    public gene: Gene

    public fruit: Fruit = new Fruit()


    constructor(seedFetch: SeedFetch) {
        this.id = seedFetch.id
        this.bank = seedFetch.bank
        this.folder = seedFetch.folder
        this.gene = seedFetch.gene
    }

    grow() {
        const MSFruit = MathSoil2.reap(this.gene)
        this.fruit = new Fruit(this.id, MSFruit)
    }

}





