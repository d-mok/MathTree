import { checkIt, inspectIt, captureAll, exposeAll, check } from 'contract'


@exposeAll()
@captureAll()
class Host {


    /**
     * a random item from the given items
     * ```
     * RndPick(2,4,6) // may return 2, 4 or 6
     * ```
     */
    static RndPick<T>(...items: T[]): T {
        return toList(items).draw()!
    }


    /**
     * a shuffled array of the given items
     * ```
     * RndShuffle(2,4,6) // may return [4,2,6]
     * ```
     */
    static RndShuffle<T>(...items: T[]): T[] {
        return [...toList(items).shuffled()]
    }



    /**
     * n random items from given items without replacement, but NOT necessarily unique if there are duplicated object in items.
     * ```
     * RndPickN([1,2,3,4,5],3) // may return [2,5,3]
     * ```
     */
    @checkIt(owl.array, owl.positiveInt)
    static RndPickN<T>(items: T[], n: number): T[] {
        return [...toList(items).sample(n)!]
    }



    /**
     * n random unique items from given items, deep compare.
     * ```
     * RndPickUnique([2,4,6],2) // may return [4,2]
     * RndPickUnique([1,2,2,2,2,2,2,2],2) // must return [1,2] or [2,1]
     * ```
     */
    @checkIt(owl.array, owl.positiveInt)
    static RndPickUnique<T>(items: T[], n: number): T[] {
        return [...toList(items).uniqueDeep().sample(n)!]
    }





    /**
     * a random male name
     * ```
     * RndHe() // may return 'Peter', 'David', etc
     * ```
     */
    static RndHe(): string {
        return poker.he()
    }



    /**
     * a random female name
     * ```
     * RndShe() // may return 'Mary', 'Alice', etc
     * ```
     */
    static RndShe(): string {
        return poker.she()
    }



    /**
     * a random 3-letters array
     * ```
     * RndLetters() // may return ['a','b','c'] or ['x','y','z'] or etc
     * ```
     */
    static RndLetters(): string[] {
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





    /**
     * a random 3-letters array
     * ```
     * RndCapitals() // may return ['A','A','A'] or ['X','Y','Z'] or etc
     * ```
     */
    static RndCapitals(): string[] {
        return RndPick(
            ['A', 'B', 'C'],
            ['H', 'K', 'L'],
            ['M', 'N', 'L'],
            ['P', 'Q', 'R'],
            ['R', 'S', 'T'],
            ['U', 'V', 'W'],
            ['X', 'Y', 'Z'],
        )
    }




}




declare global {
    var RndPick: typeof Host.RndPick
    var RndShuffle: typeof Host.RndShuffle
    var RndPickN: typeof Host.RndPickN
    var RndPickUnique: typeof Host.RndPickUnique
    var RndHe: typeof Host.RndHe
    var RndShe: typeof Host.RndShe
    var RndLetters: typeof Host.RndLetters
    var RndCapitals: typeof Host.RndCapitals

}




