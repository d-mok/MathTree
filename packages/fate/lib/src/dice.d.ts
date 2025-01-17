export declare class Dice<T> {
    private func;
    private TRIAL;
    private shields;
    private uniques;
    private distincts;
    private coherents;
    constructor(func: () => T);
    /**
     * Set a shield in this Dice. All `roll` must obey `predicate`.
     * ```
     * this.shield($ => $ > 10) // outcome must be > 10
     * ```
     */
    shield(predicate: (_: T) => boolean): this;
    /**
     * Set a shield to forbid `items` in the outcome. Deep compare by `JSON.stringify`.
     * ```
     * this.forbid(0,1) // outcome can't be 0 or 1
     * ```
     */
    forbid(...items: T[]): this;
    /**
     * Set a shield to ensure the `mapper` value of the outcome is the same as that of `anchor`. Deep compare by `JSON.stringify`.
     */
    preserve(mapper: (_: T) => unknown, anchor: T): this;
    /**
     * Set a unique mapper requirement in this Dice. All outcomes from `rolls` must not have duplicated mapper value. Deep compare by `JSON.stringify`.
     * @param mapper - a mapper function, default to self
     * ```
     * this.unique($ => $ % 2) // unique parity
     * this.unique() // default to be unique self value
     * ```
     */
    unique(mapper?: (_: T) => unknown): this;
    /**
     * Set a distinct comparer in this Dice. All outcomes from `rolls` must not be equal according to `equality` comparer.
     * @param equality - a comparer function
     * ```
     * this.distinct((a,b) => a-b===1) // two numbers can considered equal if they differ by 1
     * ```
     */
    distinct(equality: (a: T, b: T) => boolean): this;
    /**
     * Set a coherent requirement in this Dice. The outcome from `rolls` must pass this predicate as a whole.
     */
    coherent(predicate: (_: T[]) => boolean): this;
    /**
     * Return one random item. Respect `shield`.
     * ```
     * dice(randomPrime).roll() // may be 2, 3, 5, ...
     * ```
     */
    roll(): T;
    /**
     * Return an array of N random items. Respect `shield`, `unique`, `distinct` and `coherent`.
     * @param count - the number of items requested
     * ```
     * dice(randomPrime).rolls(3) // may be [2,7,5]
     * ```
     */
    rolls(count: number): T[];
}
/**
 * Return a `Dice` object, which is a random item generator.
 * @param func - a random generator function
 * ```
 * dice(()=>randomInt(1,9)) // a Dice object
 * ```
 */
export declare function dice<T>(func: () => T): Dice<T>;
//# sourceMappingURL=dice.d.ts.map