/**
 * @category RandomUtil
 * @return a random item from the given items
 * ```typescript
 * RndPick(2,4,6) // may return 2, 4 or 6
 * ```
 */
declare function RndPick<T>(...items: T[]): T;
/**
 * @category RandomUtil
 * @return a shuffled array of the given items
 * ```typescript
 * RndShuffle(2,4,6) // may return [4,2,6]
 * ```
 */
declare function RndShuffle<T>(...items: T[]): T[];
/**
 * @category RandomUtil
 * @return n random items from given items, not necessarily unique
 * ```typescript
 * RndPickN([2,4,6],2) // may return [4,2]
 * ```
 */
declare function RndPickN<T>(items: T[], n: number): T[];
/**
 * @category RandomUtil
 * @return n random unique items from given items
 * ```typescript
 * RndPickUnique([2,4,6],2) // may return [4,2]
 * RndPickUnique([1,2,2,2,2,2,2,2],2) // must return [1,2] or [2,1]
 * ```
 */
declare function RndPickUnique<T>(items: T[], n: number): T[];
/**
 * @category RandomUtil
 * @return n repeated item from items, where occurrences are balanced.
 * ```typescript
 * RndBalanced(['a','b'],6) // may return ['a','a','b','b','a','b']
 * RndBalanced(['a','b'],5) // may return ['a','a','b','b','a']
 * ```
 */
declare function RndBalanced<T>(items: T[], n: number): T[];
/**
 * @category RandomUtil
 * @return a random male name
 * ```typescript
 * RndHe() // may return 'Peter', 'David', etc
 * ```
 */
declare function RndHe(): string;
/**
 * @category RandomUtil
 * @return a random female name
 * ```typescript
 * RndShe() // may return 'Mary', 'Alice', etc
 * ```
 */
declare function RndShe(): string;
/**
 * @category RandomUtil
 * @return a random 3-letters array
 * ```typescript
 * RndLetters() // may return ['a','b','c'] or ['x','y','z'] or etc
 * ```
 */
declare function RndLetters(): string[];
