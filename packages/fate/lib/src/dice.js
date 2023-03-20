function error(msg) {
    const e = new Error(msg);
    e.name = 'DiceError';
    return e;
}
export class Dice {
    constructor(func) {
        this.TRIAL = 10000;
        this.shields = [];
        this.uniques = [];
        this.distincts = [];
        this.coherents = [];
        this.func = func;
    }
    /**
     * Set a shield in this Dice. All `roll` must obey `predicate`.
     * ```
     * this.shield($ => $ > 10) // outcome must be > 10
     * ```
     */
    shield(predicate) {
        this.shields.push(predicate);
        return this;
    }
    /**
     * Set a shield to forbid `items` in the outcome. Deep compare by `JSON.stringify`.
     * ```
     * this.forbid(0,1) // outcome can't be 0 or 1
     * ```
     */
    forbid(...items) {
        for (let item of items)
            this.shield($ => JSON.stringify($) !== JSON.stringify(item));
        return this;
    }
    /**
     * Set a shield to ensure the `mapper` value of the outcome is the same as that of `anchor`. Deep compare by `JSON.stringify`.
     */
    preserve(mapper, anchor) {
        let anchorMapped = JSON.stringify(mapper(anchor));
        this.shield($ => JSON.stringify(mapper($)) === anchorMapped);
        return this;
    }
    /**
     * Set a unique mapper requirement in this Dice. All outcomes from `rolls` must not have duplicated mapper value. Deep compare by `JSON.stringify`.
     * @param mapper - a mapper function, default to self
     * ```
     * this.unique($ => $ % 2) // unique parity
     * this.unique() // default to be unique self value
     * ```
     */
    unique(mapper = $ => $) {
        let map = ($) => JSON.stringify(mapper($));
        this.uniques.push(map);
        return this;
    }
    /**
     * Set a distinct comparer in this Dice. All outcomes from `rolls` must not be equal according to `equality` comparer.
     * @param equality - a comparer function
     * ```
     * this.distinct((a,b) => a-b===1) // two numbers can considered equal if they differ by 1
     * ```
     */
    distinct(equality) {
        this.distincts.push(equality);
        return this;
    }
    /**
     * Set a coherent requirement in this Dice. The outcome from `rolls` must pass this predicate as a whole.
     */
    coherent(predicate) {
        this.coherents.push(predicate);
        return this;
    }
    /**
     * Return one random item. Respect `shield`.
     * ```
     * dice(randomPrime).roll() // may be 2, 3, 5, ...
     * ```
     */
    roll() {
        let counter = 0;
        while (true) {
            counter++;
            if (counter > this.TRIAL) {
                throw error('No items can satisfy predicate after ' +
                    this.TRIAL +
                    ' trials!');
            }
            let item = this.func();
            if (this.shields.every($ => $(item)))
                return item;
        }
    }
    /**
     * Return an array of N random items. Respect `shield`, `unique`, `distinct` and `coherent`.
     * @param count - the number of items requested
     * ```
     * dice(randomPrime).rolls(3) // may be [2,7,5]
     * ```
     */
    rolls(count) {
        let counter = 0;
        const genRandomCohort = () => {
            let arr = [];
            let mappeds = [];
            for (let i = 0; i < this.uniques.length; i++) {
                mappeds.push([]);
            }
            const pushMap = (itemMap) => {
                mappeds.forEach((mapped, i) => mapped.push(itemMap[i]));
            };
            const mapInclude = (itemMap) => {
                return mappeds.some((mapped, i) => mapped.includes(itemMap[i]));
            };
            const someEqual = (item) => {
                return this.distincts.some(equal => arr.some($ => equal($, item)));
            };
            while (arr.length < count) {
                counter++;
                if (counter > this.TRIAL) {
                    throw error('rolls count is likely too large for sample set');
                }
                let item = this.roll();
                let map = this.uniques.map($ => $(item));
                if (mapInclude(map))
                    continue;
                if (someEqual(item))
                    continue;
                arr.push(item);
                pushMap(map);
            }
            return arr;
        };
        const isCoherent = (cohort) => {
            return this.coherents.every($ => $(cohort));
        };
        while (true) {
            let cohort = genRandomCohort();
            if (isCoherent(cohort))
                return cohort;
        }
    }
}
/**
 * Return a `Dice` object, which is a random item generator.
 * @param func - a random generator function
 * ```
 * dice(()=>randomInt(1,9)) // a Dice object
 * ```
 */
export function dice(func) {
    return new Dice(func);
}
//# sourceMappingURL=dice.js.map