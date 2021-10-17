
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

    // content?: any // for backward compatible
    // question?: any // for backward compatible
}


class MathSoilCls {


    public reap(seed: Seed): Fruit {
        let soil = new Soil(seed.gene)
        return soil.nurture()
    }

    public reaps(seeds: Seed[]): Fruit[] {
        return seeds.map(x => this.reap(x))
    }

    public inspect(seed: Seed, repeat: number): inspection {
        let counters = [];
        let times = []
        for (let i = 1; i <= repeat; i++) {
            let fruit: Fruit = this.reap(seed);
            if (!fruit.success)
                return {
                    counter: 0,
                    success: false,
                    logs: fruit.logs,
                    time: 0
                }
            counters.push(fruit.counter);
            times.push(fruit.time)
        }
        return {
            counter: Mean(...counters),
            success: true,
            logs: [],
            time: Mean(...times)
        }
    }


    /**
     * @deprecated
     */
    public grow(seed: Seed): void {
        // if ('content' in seed) seed.gene = seed.content // for backward compatible
        seed.fruit = this.reap(seed)
        // seed.question = seed.fruit // for backward compatible
    }

    /**
     * @deprecated
     */
    public growAll(seeds: Seed[]): void {
        seeds.forEach(x => this.grow(x))
    }

    /**
     * @deprecated
     */
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
