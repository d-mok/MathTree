import { Soil } from './soil';
class MathSoilCls {
    grow(seed) {
        let soil = new Soil(seed.gene);
        seed.fruit = soil.nurture();
    }
    growAll(seeds) {
        seeds.forEach(x => this.grow(x));
    }
    test(seed, repeat = 100) {
        let counters = [];
        for (let i = 1; i <= repeat; i++) {
            this.grow(seed);
            if (!seed.fruit.success)
                return;
            counters.push(seed.fruit.counter);
        }
        seed.fruit.counter = Mean(...counters);
    }
}
var MathSoil = new MathSoilCls();
globalThis.MathSoil = MathSoil;
