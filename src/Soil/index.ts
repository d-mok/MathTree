
import { Seed } from './global'
import { Dict, Config, SeedCore } from './cls'

declare global {
    var MathSoil: any
}

type Shell = {
    content: SeedCore
    question?: Question
}



var MathSoil = {
    _grow(seedContent: SeedCore): Question {
        let seed: Seed = new Seed(seedContent)
        return seed.grow()
    },
    _growOne(seed: Shell): void {
        seed.question = this._grow(seed.content);
    },
    grow(seeds: Shell | Shell[]): void {
        // grow one seed or array of seeds, append Question to them
        if (Array.isArray(seeds)) {
            seeds.forEach(x => this._growOne(x))
        }
        else {
            this._growOne(seeds)
        }
    },
    test(seed: Shell) {
        // test the seed's health, find the avg trial to success
        let counters = [];
        for (let i = 1; i <= 100; i++) {
            this.grow(seed);
            if (!seed.question!.success) {
                return { avg: 0, healthy: false };
            }
            counters.push(seed.question!.counter);
        }
        return { avg: Mean(...counters), healthy: true };
    }
};

globalThis.MathSoil = MathSoil
