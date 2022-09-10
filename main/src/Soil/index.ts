import { Soil } from './soil'

declare global {
    var MathSoil2: MathSoil2Cls
}

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
