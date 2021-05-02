/**
 * @category RandomUtil
 * @return a random item from the given items
 * ```
 * RndPick(2,4,6) // may return 2, 4 or 6
 * ```
 */
function RndPick<T>(...items: T[]): T {
    return dice.array(items).one()
}
globalThis.RndPick = RndPick


/**
 * @category RandomUtil
 * @return a shuffled array of the given items
 * ```
 * RndShuffle(2,4,6) // may return [4,2,6]
 * ```
 */
function RndShuffle<T>(...items: T[]): T[] {
    return dice.array(items).shuffle();
}
globalThis.RndShuffle = RndShuffle



/**
 * @category RandomUtil
 * @return n random items from given items, not necessarily unique
 * ```
 * RndPickN([2,4,6],2) // may return [4,2]
 * ```
 */
function RndPickN<T>(items: T[], n: number): T[] {
    return dice.array(items).sample(n)
}
globalThis.RndPickN = contract(RndPickN).sign([owl.array, owl.positiveInt])



/**
 * @category RandomUtil
 * @return n random unique items from given items
 * ```
 * RndPickUnique([2,4,6],2) // may return [4,2]
 * RndPickUnique([1,2,2,2,2,2,2,2],2) // must return [1,2] or [2,1]
 * ```
 */
function RndPickUnique<T>(items: T[], n: number): T[] {
    return dice.array(items).unique(n)
}
globalThis.RndPickUnique = contract(RndPickUnique).sign([owl.array, owl.positiveInt])





/**
 * @category RandomUtil
 * @return a random male name
 * ```
 * RndHe() // may return 'Peter', 'David', etc
 * ```
 */
function RndHe(): string {
    return dice.he()
}
globalThis.RndHe = RndHe



/**
 * @category RandomUtil
 * @return a random female name
 * ```
 * RndShe() // may return 'Mary', 'Alice', etc
 * ```
 */
function RndShe(): string {
    return dice.she()
}
globalThis.RndShe = RndShe



/**
 * @category RandomUtil
 * @return a random 3-letters array
 * ```
 * RndLetters() // may return ['a','b','c'] or ['x','y','z'] or etc
 * ```
 */
function RndLetters(): string[] {
    return RndPick(
        ['a', 'b', 'c'],
        ['h', 'k', 'l'],
        ['m', 'n', 'l'],
        ['p', 'q', 'r'],
        ['r', 's', 't'],
        ['u', 'v', 'w'],
        ['x', 'y', 'z'],
    )
}
globalThis.RndLetters = RndLetters




