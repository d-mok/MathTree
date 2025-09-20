/**
 * a random item from the given items
 * ```
 * RndPick(2,4,6) // may return 2, 4 or 6
 * ```
 */
export function RndPick<T>(...items: T[]): T {
    return items.sample()!
}

/**
 * a shuffled array of the given items
 * ```
 * RndShuffle(2,4,6) // may return [4,2,6]
 * ```
 */
export function RndShuffle<T>(...items: T[]): T[] {
    return [...items].shuffled()
}

/**
 * n random items from given items without replacement, but NOT necessarily unique if there are duplicated object in items.
 * ```
 * RndPickN([1,2,3,4,5],3) // may return [2,5,3]
 * ```
 */
export function RndPickN<T>(items: T[], n: number): T[] {
    return items.sampleSize(n)
}

/**
 * n random unique items from given items, deep compare.
 * ```
 * RndPickUnique([2,4,6],2) // may return [4,2]
 * RndPickUnique([1,2,2,2,2,2,2,2],2) // must return [1,2] or [2,1]
 * ```
 */
export function RndPickUnique<T>(items: T[], n: number): T[] {
    return items.uniqEqual().sampleSize(n)
}

/**
 * a random male name
 * ```
 * RndHe() // may return 'Peter', 'David', etc
 * ```
 */
export function RndHe(): string {
    return (
        [
            'James',
            'John',
            'Robert',
            'Michael',
            'William',
            'David',
            'Richard',
            'Joseph',
            'Thomas',
            'Charles',
        ].sample() ?? 'Tom'
    )
}

/**
 * a random female name
 * ```
 * RndShe() // may return 'Mary', 'Alice', etc
 * ```
 */
export function RndShe(): string {
    return (
        [
            'Chloe',
            'May',
            'Sophia',
            'Emma',
            'Betty',
            'Mary',
            'Alice',
            'Natalie',
            'Grace',
            'Kelly',
        ].sample() ?? 'Cathy'
    )
}

/**
 * a random 3-letters array
 * ```
 * RndLetters() // may return ['a','b','c'] or ['x','y','z'] or etc
 * ```
 */
export function RndLetters(): string[] {
    return RndPick(
        ['a', 'b', 'c'],
        ['h', 'k', 'l'],
        ['m', 'n', 'l'],
        ['p', 'q', 'r'],
        ['r', 's', 't'],
        ['u', 'v', 'w'],
        ['x', 'y', 'z']
    )
}

/**
 * a random 3-letters array
 * ```
 * RndCapitals() // may return ['A','A','A'] or ['X','Y','Z'] or etc
 * ```
 */
export function RndCapitals(): string[] {
    return RndPick(
        ['A', 'B', 'C'],
        ['H', 'K', 'L'],
        ['M', 'N', 'L'],
        ['P', 'Q', 'R'],
        ['R', 'S', 'T'],
        ['U', 'V', 'W'],
        ['X', 'Y', 'Z']
    )
}
