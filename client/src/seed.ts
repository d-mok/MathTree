import { reap, Fruit } from './MathSoil'

export class SeedRow {
    id: string = ''
    bank: string = ''
    folder: string = ''
    // master: string = ''
    qn: string = ''
    sol: string = ''
    // slot: string = ''
    populate: string = ''
    validate: string = ''
    preprocess: string = ''
    postprocess: string = ''
    // inject: string = ''
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
            // slot: this.slot,
            populate: this.populate,
            validate: this.validate,
            preprocess: this.preprocess,
            postprocess: this.postprocess,
            // inject: this.inject,
        }
    }

    grow(): void {
        this.fruit = reap(this.id, this.getGene())
    }
}
