

function error(msg: string): Error {
    const e = new Error(msg)
    e.name = 'DiceError'
    return e
}



export class Dice<T>{
    private func: () => T
    private TRIAL = 10000

    private shields: ((_: T) => boolean)[] = []
    private uniques: ((_: T) => string)[] = []
    private distincts: ((a: T, b: T) => boolean)[] = []
    private coherents: ((_: T[]) => boolean)[] = []

    constructor(func: () => T) {
        this.func = func
    }


    /**
     * Set a shield in this Dice. All `roll` must obey the shield.
     * @param predicate - a predicate on a single outcome item
     * @returns this Dice for chaining
     * @example
     * ```
     * this.shield($ => $ > 10)
     * ```
     */
    shield(predicate: (_: T) => boolean): this {
        this.shields.push(predicate)
        return this
    }


    /**
     * Set a shield to forbid these items in the outcome. Deep compare by `JSON.stringify`.
     * @param items - the items to ban
     * @returns this Dice for chaining
     * @example
     * ```
     * this.forbid(0,1) // outcome can't be 0 or 1
     * ```
     */
    forbid(...items: T[]): this {
        for (let item of items)
            this.shield($ => JSON.stringify($) !== JSON.stringify(item))
        return this
    }

    /**
     * Set a unique mapper requirement in this Dice. All outcomes from `rolls` must not have duplicated mapper value. Deep compare by `JSON.stringify`.
     * @param mapper - a mapper function, default to self
     * @returns this Dice for chaining
     * @example
     * ```
     * this.unique($ => $ % 2) // unique parity
     * this.unique() // default to be unique self value
     * ```
     */
    unique(mapper: (_: T) => unknown = ($ => $)): this {
        let map = ($: T) => JSON.stringify(mapper($))
        this.uniques.push(map)
        return this
    }



    /**
     * Set a distinct comparer in this Dice. All outcomes from `rolls` must not be equal according to `equality` comparer.
     * @param equality - a comparer function
     * @returns this Dice for chaining
     * @example
     * ```
     * this.distinct((a,b) => a-b===1) // two numbers can considered equal if they differ by 1
     * ```
     */
    distinct(equality: (a: T, b: T) => boolean): this {
        this.distincts.push(equality)
        return this
    }


    /**
     * Set a coherent requirement in this Dice. The outcome from `rolls` must pass this predicate as a whole.
     * @param predicate - a predicate function on the whole array
     * @returns this Dice for chaining
     */
    coherent(predicate: (_: T[]) => boolean): this {
        this.coherents.push(predicate)
        return this
    }


    /**
     * Return one random item. Respect `shield`.
     * @returns a random item
     * @example
     * ```
     * dice(randomPrime).roll() // may be 2, 3, 5, ...
     * ```
     */
    roll(): T {
        let counter = 0
        while (true) {
            counter++
            if (counter > this.TRIAL) {
                throw error('No items can satisfy predicate after ' + this.TRIAL + ' trials!')
            }
            let item = this.func()
            if (this.shields.every($ => $(item))) return item
        }
    }

    /**
     * Return an array of N random items. Respect `shield`, `unique`, `distinct` and `coherent`.
     * @param count - the number of items requested
     * @returns an array of random items
     * @example
     * ```
     * dice(randomPrime).rolls(3) // may be [2,7,5]
     * ```
     */
    rolls(count: number): T[] {

        let counter = 0

        const genRandomCohort = (): T[] => {
            let arr: T[] = []
            let mappeds: string[][] = []

            for (let i = 0; i < this.uniques.length; i++) {
                mappeds.push([])
            }

            const pushMap = (itemMap: string[]) => {
                mappeds.forEach((mapped, i) => mapped.push(itemMap[i]))
            }

            const mapInclude = (itemMap: string[]) => {
                return mappeds.some((mapped, i) => mapped.includes(itemMap[i]))
            }

            const someEqual = (item: T) => {
                return this.distincts.some(equal => arr.some($ => equal($, item)))
            }

            while (arr.length < count) {
                counter++
                if (counter > this.TRIAL) {
                    throw error('rolls count is likely too large for sample set')
                }
                let item = this.roll()
                let map = this.uniques.map($ => $(item))
                if (mapInclude(map)) continue
                if (someEqual(item)) continue
                arr.push(item)
                pushMap(map)
            }
            return arr
        }

        const isCoherent = (cohort: T[]): boolean => {
            return this.coherents.every($ => $(cohort))
        }

        while (true) {
            let cohort = genRandomCohort()
            if (isCoherent(cohort)) return cohort
        }

    }

}


/**
 * Return a `Dice` object, which is a random item generator.
 * @param func - a random generator function
 * @returns - `Dice` object
 * @example
 * ```
 * dice(()=>randomInt(1,9)) // a Dice object
 * ```
 */
export function dice<T>(func: () => T): Dice<T> {
    return new Dice(func)
}
