/**
 * @ignore
 */
var Chance = require('chance');

/**
 * @ignore
 */
var chance = new Chance();



/**
 * @category RandomUtil
 * @return a random item from the given items
 * ```typescript
 * RndPick(2,4,6) // may return 2, 4 or 6
 * ```
 */
function RndPick<T>(...items: T[]): T {
    return chance.pickone(items);
}
globalThis.RndPick = RndPick


/**
 * @category RandomUtil
 * @return a shuffled array of the given items
 * ```typescript
 * RndShuffle(2,4,6) // may return [4,2,6]
 * ```
 */
function RndShuffle<T>(...items: T[]): T[] {
    return chance.shuffle(items);
}
globalThis.RndShuffle = RndShuffle



/**
 * @category RandomUtil
 * @return n random items from given items, not necessarily unique
 * ```typescript
 * RndPickN([2,4,6],2) // may return [4,2]
 * ```
 */
function RndPickN<T>(items: T[], n: number): T[] {
    return chance.pickset(items, n);
}
globalThis.RndPickN = RndPickN



/**
 * @category RandomUtil
 * @return n random unique items from given items
 * ```typescript
 * RndPickUnique([2,4,6],2) // may return [4,2]
 * RndPickUnique([1,2,2,2,2,2,2,2],2) // must return [1,2] or [2,1]
 * ```
 */
function RndPickUnique<T>(items: T[], n: number): T[] {
    return chance.unique(() => RndPick(...items), n);
}
globalThis.RndPickUnique = RndPickUnique




/**
 * @category RandomUtil
 * @return n repeated item from items, where occurrences are balanced.
 * ```typescript
 * RndBalanced(['a','b'],6) // may return ['a','a','b','b','a','b']
 * RndBalanced(['a','b'],5) // may return ['a','a','b','b','a']
 * ```
 */
function RndBalanced<T>(items: T[], n: number): T[] {
    let arr = []
    for (let i = 0; i <= Math.ceil(n / items.length); i++) {
        arr.push(...items)
    }
    arr.length = n
    return RndShuffle(...arr)
}
globalThis.RndBalanced = RndBalanced






/**
 * @category RandomUtil
 * @return a random male name
 * ```typescript
 * RndHe() // may return 'Peter', 'David', etc
 * ```
 */
function RndHe(): string {
    return chance.first({ gender: 'male', nationality: 'en' });
}
globalThis.RndHe = RndHe

/**
 * @category RandomUtil
 * @return a random female name
 * ```typescript
 * RndShe() // may return 'Mary', 'Alice', etc
 * ```
 */
function RndShe(): string {
    return chance.first({ gender: 'female', nationality: 'en' });
}
globalThis.RndShe = RndShe

