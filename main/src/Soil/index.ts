import { Soil } from './soil'

declare global {
    // var MathSoil: MathSoilCls
    var MathSoil2: MathSoil2Cls
}

// type Seed = {
//     id: string
//     bank: string
//     folder: string
//     gene: Gene
//     fruit?: Fruit
// }

// class MathSoilCls {
//     private reap(seed: Seed): Fruit {
//         let soil = new Soil(seed.gene)
//         return soil.nurture()
//     }

//     /**
//      * @deprecated
//      */
//     public grow(seed: Seed): void {
//         // if ('content' in seed) seed.gene = seed.content // for backward compatible
//         seed.fruit = this.reap(seed)
//         // seed.question = seed.fruit // for backward compatible
//     }

//     /**
//      * @deprecated
//      */
//     public growAll(seeds: Seed[]): void {
//         seeds.forEach(x => this.grow(x))
//     }

//     /**
//      * @deprecated
//      */
//     public test(seed: Seed, repeat = 100): void {
//         let counters = []
//         for (let i = 1; i <= repeat; i++) {
//             this.grow(seed)
//             if (!seed.fruit!.success) return
//             counters.push(seed.fruit!.counter)
//         }
//         seed.fruit!.counter = Mean(...counters)
//     }
// }

// var MathSoil = new MathSoilCls()
// globalThis.MathSoil = MathSoil

class MathSoil2Cls {
    public reap(gene: Gene): Fruit {
        let soil = new Soil(gene)
        soil.transpile()
        return soil.nurture()
    }

    public inspect(gene: Gene, repeat: number): Inspection {
        let counters = []
        let times = []
        for (let i = 1; i <= repeat; i++) {
            let fruit: Fruit = this.reap(gene)
            if (!fruit.success)
                return {
                    counter: 0,
                    success: false,
                    logs: fruit.logs,
                    time: 0,
                }
            counters.push(fruit.counter)
            times.push(fruit.time)
        }
        return {
            counter: Mean(...counters),
            success: true,
            logs: [],
            time: Mean(...times),
        }
    }
}

var MathSoil2 = new MathSoil2Cls()
globalThis.MathSoil2 = MathSoil2
