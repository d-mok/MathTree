
export function runOption(seed: Seed) {
    let nTrial = 0
    while (nTrial <= 10) {
        try {
            seed.qn = AutoOptions(seed.config.options, seed.qn, seed.dict, seed.validate)
            return
        } catch (e) {
            continue
        }
    };
    // throw error after 100 failed trials
    seed.success = false
    seed.errName = "OptionError"
    seed.errMsg = "No valid option generated after 10 trials!"
}

