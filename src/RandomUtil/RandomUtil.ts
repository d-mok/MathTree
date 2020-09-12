var Chance = require('chance');
var chance = new Chance();



/**
 * Return a random element.
 * @category RandomUtil
 * @param {...any} items - The list of elements to pick from.
 * @return {any} A random element.
 * @example
 * RndPick(2,4,6) // may return 2, 4 or 6
 */
function RndPick(...items: any[]): any {
    return chance.pickone(items);
}
globalThis.RndPick = RndPick


/**
 * Return a shuffled array.
 * @category RandomUtil
 * @param {...any} items - The list of elements to shuffle.
 * @return {any[]} A shuffled array.
 * @example
 * RndShuffle(2,4,6) // may return [4,2,6]
 */
function RndShuffle(...items: any[]): any[] {
    return chance.shuffle(items);
}
globalThis.RndShuffle = RndShuffle



/**
 * Return n random unique elements.
 * @category RandomUtil
 * @param {any[]} items - The array of elements to pick from.
 * @param {number} n - The number of unique elements required.
 * @return {any[]} An array of n unique elements.
 * @example
 * RndPickN([2,4,6],2) // may return [4,2]
 */
function RndPickN(items: any[], n: number): any[] {
    return chance.pickset(items, n);
}
globalThis.RndPickN = RndPickN

/**
 * Return a random male name.
 * @category RandomUtil
 * @return {string} A male name.
 * @example
 * RndHe() // may return 'Peter', 'David', etc
 */
function RndHe(): string {
    return chance.first({ gender: 'male', nationality: 'en' });
}
globalThis.RndHe = RndHe

/**
 * Return a random female name.
 * @category RandomUtil
 * @return {string} A female name.
 * @example
 * RndShe() // may return 'Mary', 'Alice', etc
 */
function RndShe(): string {
    return chance.first({ gender: 'female', nationality: 'en' });
}
globalThis.RndShe = RndShe

