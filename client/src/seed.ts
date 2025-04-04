import { reap, Fruit } from './MathSoil'

export class SeedRow {
    id: string = ''
    qn: string = ''
    sol: string = ''
    populate: string = ''
    validate: string = ''
    preprocess: string = ''
    postprocess: string = ''
}

export class Seed extends SeedRow {
    public fruit: Fruit = new Fruit()

    constructor(row: SeedRow) {
        super()
        Object.assign(this, row)
    }

    private getGene() {
        return {
            qn: this.qn,
            sol: this.sol,
            populate: this.populate,
            validate: this.validate,
            preprocess: this.preprocess,
            postprocess: this.postprocess,
        }
    }

    grow(): void {
        this.fruit = reap(this.id, this.getGene())
    }
}
