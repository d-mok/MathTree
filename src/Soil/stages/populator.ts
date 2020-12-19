import { evalCode } from '../global'

class PopulationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PopulationError';
    }
}

function pushPopulate(seed: Seed) {
    const { dict, config } = evalCode(seed.populate)
    seed.dict = dict
    seed.config = config
    seed.counter++;
}

function checkValidate(validateCode: string, dict: Dict): boolean {
    if (validateCode === "") return true;
    validateCode = validateCode.replace('\n', ' ');
    const { result } = evalCode(validateCode, dict)
    return result === true
}

export function runPopulate(seed: Seed) {
    while (seed.counter <= 1000) {
        try {
            pushPopulate(seed);
        } catch (e) {
            if (e.name === 'MathError') {
                continue
            } else {
                throw e
            }
        }
        const validated = checkValidate(seed.validate, seed.dict)
        if (validated) return;        // done if validated
    };
    // throw error after 1000 failed trials
    seed.error = new PopulationError("No population found after 1000 trials!")
}
