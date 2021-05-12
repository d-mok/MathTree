
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

    content?: any // for backward compatible
    question?: any // for backward compatible
}


class MathSoilCls {

    public grow(seed: Seed): void {
        if ('content' in seed) seed.gene = seed.content // for backward compatible
        let soil = new Soil(seed.gene)
        seed.fruit = soil.nurture()
        seed.question = seed.fruit
    }

    public growAll(seeds: Seed[]): void {
        seeds.forEach(x => this.grow(x))
    }

    public test(seed: Seed, repeat = 100): void {
        const log = SHOULD_LOG
        SHOULD_LOG = false
        let counters = [];
        for (let i = 1; i <= repeat; i++) {
            this.grow(seed);
            if (!seed.fruit!.success) return
            counters.push(seed.fruit!.counter);
        }
        seed.fruit!.counter = Mean(...counters)
        SHOULD_LOG = log
    }

}

var MathSoil = new MathSoilCls()
globalThis.MathSoil = MathSoil
