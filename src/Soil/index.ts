
import { Soil } from './soil'

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

    public test(seed: Seed, repeat = 100): void {
        let counters = [];
        for (let i = 1; i <= repeat; i++) {
            this.grow(seed);
            if (!seed.fruit!.success) return
            counters.push(seed.fruit!.counter);
        }
        seed.fruit!.counter = Mean(...counters)
    }

}

var MathSoil = new MathSoilCls()
globalThis.MathSoil = MathSoil
