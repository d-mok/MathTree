
import { Soil } from './global'

declare global {
    var MathSoil: any
}


type Seed = {
    id: string
    bank: string
    folder: string
    gene: Gene
    fruit?: Fruit
}


class MathSoilCls {

    public grow(seed: Seed): void {
        let soil = new Soil(seed.gene)
        seed.fruit = soil.nurture()
    }

    public growAll(seeds: Seed[]): void {
        seeds.forEach(x => this.grow(x))
    }

    public test(seed: Seed): void {
        let counters = [];
        for (let i = 1; i <= 100; i++) {
            this.grow(seed);
            if (!seed.fruit!.success) return
            counters.push(seed.fruit!.counter);
        }
        seed.fruit!.counter = Mean(...counters)
    }

}

var MathSoil = new MathSoilCls()
globalThis.MathSoil = MathSoil
