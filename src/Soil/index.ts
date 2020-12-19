import { runPopulate } from './stages/populator'
import { runPreprocess, runPostprocess } from './stages/processor'
import { runOption } from './stages/optionor'
import { runSection } from './stages/sectionor'
import { runShuffle } from './stages/shufflor'
import { runSubstitute } from './stages/substitutor'
import { initSeed, clone } from './global'


function getFruit(seed: Seed): Question {
    return { qn: seed.qn, sol: seed.sol, ans: seed.ans, counter: seed.counter, success: seed.success };
}

function getErr(seed: Seed) {
    return { name: seed.errName, message: seed.errMsg }
}




export = {
    _grow(seedContent: SeedCore): Question {
        let seed: Seed = initSeed({});
        try {
            do {
                let count = seed.counter
                seed = initSeed(seedContent);
                seed.counter = count
                runPopulate(seed);
                if (!seed.success) throw getErr(seed)
                runSection(seed);
                runPreprocess(seed);
                runOption(seed)
                if (!seed.success) break
                runSubstitute(seed);
                runPostprocess(seed);
                runShuffle(seed);
                if (seed.success) break
            } while (true);
            return { qn: seed.qn, sol: seed.sol, ans: seed.ans, counter: seed.counter, success: true };
        }
        catch (e) {
            console.error("[MathSoil] Error!\n" + e.message);
            console.error();
            const err = "Error! " + e.name;
            return { qn: err, sol: err, ans: err, counter: seed.counter, success: false };
        }
    },
    _growOne(seed: Shell): void {
        seed.question = this._grow(seed.content);
    },
    _growMany(seeds: Shell[]): void {
        for (let i = 0; i < seeds.length; i++) {
            this._growOne(seeds[i])
        }
    },
    grow(seeds: Shell | Shell[]): void {
        // grow one seed or array of seeds, append Question to them
        if (Array.isArray(seeds)) {
            this._growMany(seeds)
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
            if (seed.question!.qn.startsWith('Error!')) {
                return { avg: 0, healthy: false };
            }
            counters.push(seed.question!.counter);
        }
        const sum = counters.reduce((a, b) => a + b, 0);
        const avg = sum / counters.length;
        return { avg, healthy: true };
    }
};

