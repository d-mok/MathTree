import { evalCode } from '../global'



export function runPreprocess(seed: Seed) {
    // execute preprocess stage:
    // manipulate seed.qn and seed.sol by seed.preprocess
    const { qn, sol } = evalCode(seed.preprocess, seed.dict, seed.config, seed.qn, seed.sol);
    seed.qn = qn;
    seed.sol = sol;
}

export function runPostprocess(seed: Seed) {
    // execute postprocess stage:
    // manipulate seed.qn and seed.sol by seed.postprocess
    const { qn, sol } = evalCode(seed.postprocess, seed.dict, seed.config, seed.qn, seed.sol);
    seed.qn = qn;
    seed.sol = sol;
}

