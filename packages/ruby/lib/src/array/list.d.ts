import type { Predicate, Mapper, Metric } from './types';
/**
 * A super-charged array.
 * All object equality is reference only.
 */
export declare class List<T> extends Array<T> {
    static of<R>(...items: R[]): List<R>;
    /**
     * Return a new array, using the constructor of this object.
     * Preserve type in subclass.
     * @param elements - array of elements to put in the new array
     * @returns a new array with `elements` in it
     * @example
     * ```
     * this.create([1,2,3]) // [1,2,3]
     * ```
     */
    protected create(elements: T[]): this;
    /**
     * Clear all items in this array in-place.
     * This array will become empty.
     * @example
     * ```
     * [1,2,3].clear() //-> []
     * ```
     */
    clear(): void;
    /**
     * Set the elements of this array in-place.
     * Overwrite all original elements.
     * @param elements - array of the new elements
     * @example
     * ```
     * [1,2,3].set([4,5,6]) //-> [4,5,6]
     * ```
     */
    set(elements: T[]): void;
    /**
     * Return a shallow clone of this array.
     * @returns a shallow clone
     * @example
     * ```
     * [1,2,3].clone() // [1,2,3]
     * ```
     */
    clone(): this;
    /**
     * Check if the `index` is a valid index.
     * @param index - the index number to check
     * @returns a boolean
     * @example
     * ```
     * [1,2,3].indexValid(2) // true
     * [1,2,3].indexValid(3) // false
     * ```
     */
    indexValid(index: number): boolean;
    /**
     * Check if this array is empty.
     * @returns a boolean
     * @example
     * ```
     * [].isEmpty() // true
     * [1,2,3].isEmpty() // false
     * ```
     */
    isEmpty(): boolean;
    /**
     * Return the first element of this array.
     * If this array is empty, return `undefined`.
     * @returns the first element
     * @example
     * ```
     * [1,2,3].first() // 1
     * ```
     */
    first(): T | undefined;
    /**
     * Return the last element of this array.
     * If this array is empty, return `undefined`.
     * @returns the last element
     * @example
     * ```
     * [1,2,3].last() // 3
     * ```
     */
    last(): T | undefined;
    /**
     * Return an element at a cyclic `index`.
     * If this array is empty, return `undefined`.
     * @param index - the cyclic index
     * @returns the element at the cyclic `index`
     * @example
     * ```
     * [1,2,3].cyclic(-1) // 3 , the last element
     * [1,2,3].cyclic(this.length) // 1 , the first element
     * ```
     */
    cyclicAt(index: number): T | undefined;
    /**
     * Pull out and return the element at `index`.
     * This mutates this array, similar to {@link Array.pop}.
     * @param index - the index at which to pull
     * @returns the pulled out element
     * @example
     * ```
     * [1,2,3,4,5].pull(3) // 4
     * // -> [1,2,3,5]
     * ```
     */
    pull(index: number): T | undefined;
    /**
     * Return an array of the first `n` elements of this array.
     * @param n - the number of elements to returns
     * @returns array of the first `n` elements
     * @see {@link List.tail} for the opposite
     * @example
     * ```
     * [1,2,3,4,5].head(3) // [1,2,3]
     * ```
     */
    head(n: number): this;
    /**
     * Return an array of the last `n` elements of this array.
     * @param n - the number of elements to returns
     * @returns array of the last `n` elements
     * @see {@link List.head} for the opposite
     * @example
     * ```
     * [1,2,3,4,5].tail(3) // [3,4,5]
     * ```
     */
    tail(n: number): this;
    /**
     * Return an array of elements before `index`.
     * @param index - before this index
     * @return array of elements before `index`
     * @example
     * ```
     * [1,2,3,4,5].before(2) // [1,2]
     * ```
     */
    before(index: number): this;
    /**
     * Return an array of elements till `index`.
     * @param index - till this index
     * @return array of elements till `index`
     * @example
     * ```
     * [1,2,3,4,5].till(2) // [1,2,3]
     * ```
     */
    till(index: number): this;
    /**
     * Return an array of elements after `index`.
     * @param index - after this index
     * @return array of elements after `index`
     * @example
     * ```
     * [1,2,3,4,5].after(2) // [4,5]
     * ```
     */
    after(index: number): this;
    /**
     * Return an array of elements since `index`.
     * @param index - since this index
     * @return array of elements since `index`
     * @example
     * ```
     * [1,2,3,4,5].since(2) // [3,4,5]
     * ```
     */
    since(index: number): this;
    /**
     * Return an array of array segments, each is a chunk of this array of fixed `size`.
     * @param size - the number of elements in each chunk
     * @returns array of chunks
     * @example
     * ```
     * [1,2,3,4,5,6,7,8].chunk(3) // [[1,2,3],[4,5,6],[7,8]]
     * ```
     */
    chunk(size: number): List<this>;
    /**
     * Return an array of array segments, splitting this array by `delimitElement`.
     * @param delimitElement - the element acting as delimiter
     * @returns array of chunks
     * @example
     * ```
     * [1,2,3,0,4,5,0,0,6].split() // [[1,2,3],[4,5],[],[6]]
     * [1,2,3,0,4,5,0,0,6,0].split() // [[1,2,3],[4,5],[],[6],[]]
     * ```
     */
    split(delimitElement: T): List<this>;
    /**
     * Check if this array includes all element in `elements`.
     * @param elements - array of elements to include
     * @returns a boolean
     * @example
     * ```
     * [1,2,3].includesAll([1,2]) // true
     * [1,2,3].includesAll([1,4]) // false
     * ```
     */
    includesAll(elements: T[]): boolean;
    /**
     * Check if this array includes at least one element in `elements`.
     * @param elements - array of elements to include
     * @returns a boolean
     * @example
     * ```
     * [1,2,3].includesAny([1,2]) // true
     * [1,2,3].includesAny([1,4]) // true
     * [1,2,3].includesAny([4,5]) // false
     * ```
     */
    includesAny(elements: T[]): boolean;
    /**
     * Check if this array includes exactly the `elements` in any order, no more and no less.
     * @param elements - array of elements to compare
     * @returns a boolean
     * @example
     * ```
     * [1,2,3].includesExact([2,1,3]) // true
     * [1,2,3].includesExact([1,2]) // false
     * ```
     */
    includesExact(elements: T[]): boolean;
    /**
     * Check if every element in this array is found in `elements`.
     * @param elements - the master array that should contain this array
     * @returns a boolean
     * @example
     * ```
     * [1,2,3].belongs([1,2,3,4]) // true
     * [1,2,3].belongs([3,2,1]) // true
     * [1,2,3].belongs([1,2]) // false
     * ```
     */
    belongs(elements: T[]): boolean;
    /**
     * Return an array of unique elements. Shallow equility compare.
     * @returns an array of unique elements
     * @see {@link List.dedup} for in-place version
     * @example
     * ```
     * [1,2,2,2,3,3].unique() // [1,2,3]
     * ```
     */
    unique(): this;
    /**
     * Return an array of unique elements. Elements are consider equal if their `mapper` values are equal.
     * The first element with the same `mapper` value is returned.
     * @param mapper - the mapper function for equality check
     * @returns an array of unique elements
     * @example
     * ```
     * [1.1, 1.2, 3.5, 3.4, 6.7].uniqueBy(Math.floor) // [1.1, 3.5, 6.7]
     * ```
     */
    uniqueBy<S>(mapper: Mapper<T, S>): this;
    /**
     * Return an array of unique elements. Deep equility compare is done by `JSON.stringify`.
     * @returns an array of unique elements
     * @example
     * ```
     * [[1],[1],[2]].uniqueDeep() // [[1],[2]]
     * ```
     */
    uniqueDeep(): this;
    /**
     * Return the frequency of `element` in this array. Shallow equility compare.
     * @param element - the element to count
     * @returns the number of occurance
     * @example
     * ```
     * [1,2,2,2,3,3].freq(2) // 3
     * ```
     */
    freq(element: T): number;
    /**
     * Return an array of elements from this array which occur once only. Shallow equility compare.
     * @returns array of distinct elements
     * @see {@link List.duplicated} for the opposite
     * @example
     * ```
     * [1,2,2,3,4,4,4].distincts() // [1,3]
     * ```
     */
    distincts(): this;
    /**
     * Return an array of duplicated elements in this array. Shallow equility compare.
     * @returns an array of duplicated elements
     * @see {@link List.distincts} for the opposite
     * @see {@link List.duplicated} for similar
     * @example
     * ```
     * [1,2,2,3,4,4,4].duplicates() // [2,2,4,4,4]
     * ```
     */
    duplicates(): this;
    /**
     * Return an array of duplicated elements in this array. Shallow equility compare.
     * Each duplicated element will appear once only.
     * @returns an array of duplicated elements
     * @see {@link List.distincts} for the opposite
     * @see {@link List.duplicates} for similar
     * @example
     * ```
     * [1,2,2,3,4,4,4].duplicated() // [2,4]
     * ```
     */
    duplicated(): this;
    /**
     * Check if this array has no duplicated element. Shallow equility compare.
     * @returns a boolean
     * @see {@link List.duppy} for the opposite
     * @example
     * ```
     * [1,2,3].dupless() // true
     * [1,2,3,3].dupless() // false
     * ```
     */
    dupless(): boolean;
    /**
     * Check if this array has no duplicated element. `JSON.stringify` equality compare.
     * @returns a boolean
     * @example
     * ```
     * [[1],[2],[3]].duplessDeep() // true
     * [[1],[1],[3]].duplessDeep() // false
     * ```
     */
    duplessDeep(): boolean;
    /**
     * Check if this array has duplicated element. Shallow equility compare.
     * @returns a boolean
     * @see {@link List.dupless} for the opposite
     * @example
     * ```
     * [1,2,3].duppy() // false
     * [1,2,3,3].duppy() // true
     * ```
     */
    duppy(): boolean;
    /**
     * De-duplicate this array, removing all extra duplicated elements. Shallow equility compare.
     * @see {@link List.unique} for functional version
     * @example
     * ```
     * [1,2,3,3].dedup() //-> [1,2,3]
     * ```
     */
    dedup(): void;
    /**
     * Return an array of elements violating the predicate.
     * @param predicate - the predicate function to check
     * @returns array of violating elements
     * @see {@link Array.filter} for the opposite
     * @see {@link List.reject} for in-place version
     * @example
     * ```
     * [1,2,3,4,5].violate(isEven) // [1,3,5]
     * ```
     */
    violate(predicate: Predicate<T>): this;
    /**
     * Return an array of the original elements, keeping only those found in the`elements` array.
     * @param elements - array of the elements to keep
     * @returns the new array of kept elements
     * @see {@link List.except} for the opposite
     * @see {@link List.keep} for in-place version
     * @example
     * ```
     * [1,2,3,4,5,5].inside([5,2,1]) // [1,2,5,5]
     * ```
     */
    inside(elements: T[]): this;
    /**
     * Return an array of the original elements, keeping only those NOT found in the`elements` array.
     * @param elements - array of the elements to remove
     * @returns the array with `elements` removed
     * @see {@link List.inside} for the opposite
     * @see {@link List.drop} for in-place version
     * @example
     * ```
     * [1,2,3,4,5,5].except([2,1]) // [3,4,5,5]
     * ```
     */
    except(elements: T[]): this;
    /**
     * Return an array of elements filtered by index.
     * Similar to {@link Array.filter}, but act on index instead of element.
     * @param predicate - a predicate function on the index numbers
     * @return array of filtered elements
     * @example
     * ```
     * [5,6,7,8,9].filterIndex(isEven) // [5,7,9]
     * ```
     */
    filterIndex(predicate: Predicate<number>): this;
    /**
     * Return the number of elements which satisfy `predicate`.
     * @param predicate - a predicate function
     * @return the number of elements satisfying `predicate`
     * @example
     * ```
     * [1,2,3,4,5].countIf($ => $ > 3) // 2
     * ```
     */
    countIf(predicate: Predicate<T>): number;
    /**
     * Only keep the elements that pass the `predicate` in-place.
     * @param predicate - a predicate function that the elements must pass to be kept
     * @see {@link List.reject} for the opposite
     * @see {@link Array.filter} for functional version
     * @example
     * ```
     * [1,2,3,4,5].sieve(isEven) //-> [2,4]
     * ```
     */
    sieve(predicate: Predicate<T>): void;
    /**
     * Only keep the elements that violates the `predicate` in-place.
     * @param predicate - a predicate function that the elements must violate to be kept
     * @see {@link List.sieve} for the opposite
     * @see {@link List.violate} for functional version
     * @example
     * ```
     * [1,2,3,4,5].reject(isEven) //-> [1,3,5]
     * ```
     */
    reject(predicate: Predicate<T>): void;
    /**
     * Keep only the elements found in the`elements` array, removing all other elements of this array.
     * @param elements - array of the elements to keep
     * @see {@link List.drop} for the opposite
     * @see {@link List.inside} for functional version
     * @example
     * ```
     * [1,2,3,4,5,5].keep([5,2,1]) //-> [1,2,5,5]
     * ```
     */
    keep(elements: T[]): void;
    /**
     * Drop all elements found in the`elements` array, keeping only the remaining elements in this array.
     * @param elements - array of the elements to remove
     * @see {@link List.keep} for the opposite
     * @see {@link List.except} for functional version
     * @example
     * ```
     * [1,2,3,4,5,5].drop([2,1]) //-> [3,4,5,5]
     * ```
     */
    drop(elements: T[]): void;
    /**
     * Return a reversed version of this array.
     * @returns the reversed array
     * @see {@link Array.reverse} for in-place version
     * @example
     * ```
     * [1,2,3].reversed() // [3,2,1]
     * ```
     */
    reversed(): this;
    /**
     * Return a sorted version of this array, sorted by the elements themselves ascendingly.
     * If elements are all number, sort by value.
     * Else, cast element to string and sort by string.
     * @returns the ascending version of this array
     * @see {@link List.ascend} for in-place version
     * @example
     * ```
     * [2,1,3].ascending() // [1,2,3]
     * ```
     */
    ascending(): this;
    /**
     * Return a sorted version of this array, sorted by the elements themselves descendingly.
     * If elements are all number, sort by value.
     * Else, cast element to string and sort by string.
     * @returns the descendingly version of this array
     * @see {@link List.descend} for in-place version
     * @example
     * ```
     * [2,1,3].descending() // [3,2,1]
     * ```
     */
    descending(): this;
    /**
     * Return a sorted version of this array, using the compare functions `compareFns`.
     * @param compareFns - compare functions in descending order of priority
     * @returns the sorted version of this array
     * @example
     * ```
     * [2.5,2.6,1.5,1.6].sorted(
     *      (a,b) => Math.floor(a) - Math.floor(b), // compare integer part only
     *      (a,b) => b-a // descending
     * )
     * // [1.6,1.5,2.6,2.5]
     * ```
     */
    sorted(...compareFns: ((a: T, b: T) => number)[]): this;
    /**
     * Return a sorted version of this array, using the result of the mapper functions.
     * @param mappers - mapper functions in descending order of priority
     * @returns the sorted version of this array
     * @example
     * ```
     * [4,3,2,1].sortedBy(
     *      x => x % 2 , // even first
     *      x => x // identity
     * )
     * // [2,4,1,3]
     * ```
     */
    sortedBy(...mappers: (Mapper<T, string> | Mapper<T, number>)[]): this;
    /**
     * Return a sorted version of this array, where the most frequent elements come first.
     * @returns the sorted version of this array
     * @example
     * ```
     * [5,6,7,6,6,7,8].sortedByFreq()
     * // [6,6,6,7,7,5,8]
     * ```
     */
    sortedByFreq(): this;
    /**
     * Sort this array in-place by the elements themselves ascendingly.
     * If elements are all number, sort by value.
     * Else, cast element to string and sort by string.
     * @see {@link List.ascending} for functional version
     * @example
     * ```
     * [2,1,3].ascend() //-> [1,2,3]
     * ```
     */
    ascend(): void;
    /**
     * Sort this array in-place by the elements themselves descendingly.
     * If elements are all number, sort by value.
     * Else, cast element to string and sort by string.
     * @see {@link List.descending} for functional version
     * @example
     * ```
     * [2,1,3].descend() //-> [3,2,1]
     * ```
     */
    descend(): void;
    /**
     * Arrange the elements in this array in-place.
     * @param newIndices - the new indices of each corresponding element
     * @example
     * ```
     * ['a','b','c','d'].arrage([2,1,3,0]) // ['d','b','a','c']
     * ```
     */
    arrange(newIndices: number[]): void;
    /**
     * Permute the elements in this array in-place.
     * @param newOrder - the new order of each index
     * @example
     * ```
     * ['a','b','c','d'].permute([2,1,3,0]) // ['c','b','d','a']
     * ```
     */
    permute(newOrder: number[]): void;
    /**
     * Sort this array in-place, using the compare functions `compareFns`.
     * This is similar to the native `Array.sort()`, but accept multiple compare functions.
     * @param compareFns - compare functions in descending order of priority
     * @example
     * ```
     * [2.5,2.6,1.5,1.6].sorts(
     *      (a,b) => Math.floor(a) - Math.floor(b),
     *          // compare integer part only
     *      (a,b) => b-a
     *          // descending
     * )
     * // -> [1.6,1.5,2.6,2.5]
     * ```
     */
    sorts(...compareFns: ((a: T, b: T) => number)[]): void;
    /**
     * Sort this array in-place, using the result of the mapper functions.
     * Note that the mapper functions may be called numerous times, causing performance issue.
     * @param mappers - mapper functions in descending order of priority
     * @example
     * ```
     * [4,3,2,1].sortBy(
     *      x => x % 2 , // even first
     *      x => x // identity
     * )
     * //-> [2,4,1,3]
     * ```
     */
    sortBy(...mappers: (Mapper<T, string> | Mapper<T, number>)[]): void;
    /**
     * Cycle the order of elements in-place by `n` steps.
     * @param n - number to step to cycle
     * @example
     * ```
     * [1,2,3,4,5].cycle(2) // [3,4,5,1,2]
     * [1,2,3,4,5].cycle(-2) // [4,5,1,2,3]
     * ```
     */
    cycle(n: number): void;
    /**
     * Return a random valid index of this array.
     * If this array is empty, return `undefined`.
     * @returns a random index
     * @example
     * ```
     * [5,6,7].randomIndex() // 0 or 1 or 2
     * ```
     */
    randomIndex(): number | undefined;
    /**
     * Return a random element in this array.
     * If this array is empty, return `undefined`.
     * This array is not mutated.
     * @returns a random element
     * @see {@link List.deal} for in-place version
     * @example
     * ```
     * [5,6,7].draw() // 5 or 6 or 7
     * ```
     */
    draw(): T | undefined;
    /**
     * Return a random sample of n elements in this array WITH REPLACEMENT.
     * The returned items are NOT neccessarily unique.
     * @param n - the number of elements requested
     * @returns array of sample elements
     * @example
     * ```
     * [5,6,7].sample(2)
     * // [5,5] or [6,5] or [5,7] or ...
     * ```
     */
    draws(n: number): this | undefined;
    /**
     * Return a random sample of n unique elements in this array.
     * If n > this.length, return `undefined`.
     * @param n - the number of elements requested
     * @returns array of sample elements
     * @example
     * ```
     * [5,6,7].sample(2)
     * // [5,6] or [6,5] or [5,7] or ...
     * ```
     */
    sample(n: number): this | undefined;
    /**
     * Return a shuffled version of this array.
     * @returns a shuffled array
     * @see {@link List.shuffle} for in-place version
     * @example
     * ```
     * [1,2,3].shuffled() // [2,1,3] or [3,1,2] or ...
     * ```
     */
    shuffled(): this;
    /**
     * Pull a random element from this array.
     * If this array is empty, return `undefined`.
     * This array is mutated.
     * @returns a random element pulled
     * @see {@link List.draw} for functional version
     * @example
     * ```
     * [5,6,7].deal() // 5 or ... //-> [6,7] or ...
     * ```
     */
    deal(): T | undefined;
    /**
     * Shuffle this array in-place.
     * @see {@link List.shuffled} for functional version
     * @example
     * ```
     * [1,2,3].shuffle() //-> [2,1,3] or [3,1,2] or ...
     * ```
     */
    shuffle(): void;
    /**
     * Return an array of all combinations of size `k`.
     * @param k - the size of a combination
     * @returns array of all combination of size `k`
     * @example
     * ```
     * [1,2,3].combinations(2) // [[1,2],[1,3],[2,3]]
     * ```
     */
    combinations(k: number): List<this>;
    /**
     * Return an array of all pairs. Equivalent to `this.combinations(2)`.
     * @returns array of all pairs
     * @example
     * ```
     * [1,2,3].pairs() // [[1,2],[1,3],[2,3]]
     * ```
     */
    pairs(): List<this>;
    /**
     * Return an array of all different orderings of the elements.
     * @returns an array of all permutations
     * @example
     * ```
     * [1,2,3].permutations()
     * // [ [1,2,3] , [1,3,2] , [2,1,3]
     * //   [2,3,1] , [3,1,2] , [3,2,1] ]
     * ```
     */
    permutations(): List<this>;
    /**
     * Return a zipped array of element-by-element `mapper` results, combining this array and `array`.
     * @param array - the other array to combine
     * @param mapper - the mapper function
     * @returns array of mapper result
     * @example
     * ```
     * [1,2,3].zip([5,7,9],(a,b)=>a+b)
     * // [6,9,12]
     * ```
     */
    zip<S, R>(array: S[], mapper: (x: T, y: S) => R): List<R>;
    /**
     * Return the mean of `metric` among all elements.
     * @param metric - the metric to calculate
     * @returns the mean of `metric`
     * @example
     * ```
     * ['a','b','cc','dddd'].meanOf($=>$.length) // 2
     * ```
     */
    meanOf(metric: Metric<T>): number;
    /**
     * Return the max value of `metric` among all elements.
     * If `rank` specified, return the Nth max unique value.
     * If this array is empty, returns `NaN`.
     * @param metric - the metric to calculate
     * @param rank - the rank requested
     * @returns the max of `metric`
     * @example
     * ```
     * ['a','bb','ccc'].maxOf($=>$.length) // 3
     * ['a','bb','ccc','ddd'].maxOf($=>$.length, 2) // 2
     * ```
     */
    maxOf(metric: Metric<T>, rank?: number): number;
    /**
     * Return the min value of `metric` among all elements.
     * If `rank` specified, return the Nth min unique value.
     * If this array is empty, returns `NaN`.
     * @param metric - the metric to calculate
     * @param rank - the rank requested
     * @returns the min of `metric`
     * @example
     * ```
     * ['a','bb','ccc'].minOf($=>$.length) // 1
     * ['a','bb','ccc','d'].minOf($=>$.length, 2) // 2
     * ```
     */
    minOf(metric: Metric<T>, rank?: number): number;
    /**
     * Return an array of elements with the max `metric`.
     * If `rank` specified, use the Nth max.
     * @param metric - the metric to calculate
     * @param rank - the rank requested
     * @returns array of elements with the max `metric`
     * @example
     * ```
     * ['a','bbb','ccc'].maxsBy($=>$.length) // ['bbb','ccc']
     * ['a','bbb','ccc','d'].maxsBy($=>$.length, 2) // ['a','d']
     * ```
     */
    maxsBy(metric: Metric<T>, rank?: number): this;
    /**
     * Return an array of elements with the min `metric`.
     * If `rank` specified, use the Nth min.
     * @param metric - the metric to calculate
     * @param rank - the rank requested
     * @returns array of elements with the min `metric`
     * @example
     * ```
     * ['a','b','ccc'].minsBy($=>$.length) // ['a','b']
     * ['a','b','ccc','ddd'].minsBy($=>$.length, 2) // ['ccc','ddd']
     * ```
     */
    minsBy(metric: Metric<T>, rank?: number): this;
    /**
     * Return the first element with the max `metric`.
     * If `rank` specified, use the Nth max.
     * If this array is empty, return `undefined`.
     * @param metric - the metric to calculate
     * @param rank - the rank requested
     * @returns the first element with the max `metric`
     * @example
     * ```
     * ['a','bbb','ccc'].maxBy($=>$.length) // 'bbb'
     * ['a','bbb','ccc','d'].maxBy($=>$.length, 2) // 'a'
     * ```
     */
    maxBy(metric: Metric<T>, rank?: number): T | undefined;
    /**
     * Return the first element with the min `metric`.
     * If `rank` specified, use the Nth min.
     * If this array is empty, return `undefined`.
     * @param metric - the metric to calculate
     * @param rank - the rank requested
     * @returns the first element with the min `metric`
     * @example
     * ```
     * ['a','b','ccc'].minBy($=>$.length) // 'a'
     * ['a','b','ccc','ddd'].minBy($=>$.length, 2) // 'ccc'
     * ```
     */
    minBy(metric: Metric<T>, rank?: number): T | undefined;
    /**
     * Return the padded version of this array, padded with the last element.
     * If `length` <= this.length, return a clone of this.
     * @param length - the new length required
     * @returns the padded array
     * @example
     * ```
     * [1,2,3].padTail(5) // [1,2,3,3,3]
     * [1,2,3].padTail(2) // [1,2,3]
     * ```
     */
    padTail(length: number): this;
    /**
     * Return the padded version of this array, padded with the first element.
     * If `length` <= this.length, return a clone of this.
     * @param length - the new length required
     * @returns the padded array
     * @example
     * ```
     * [1,2,3].padHead(5) // [1,1,1,2,3]
     * [1,2,3].padHead(2) // [1,2,3]
     * ```
     */
    padHead(length: number): this;
    /**
     * Return the padded version of this array, padded in a cyclic way.
     * If `length` <= this.length, return a clone of this.
     * @param length - the new length required
     * @returns the padded array
     * @example
     * ```
     * [1,2,3].padCyclic(5) // [1,2,3,1,2]
     * [1,2,3].padCyclic(2) // [1,2,3]
     * ```
     */
    padCyclic(length: number): this;
}
declare module "./list" {
    interface List<T> {
        filter: (predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any) => this;
        map: <R>(callbackfn: (value: T, index: number, array: T[]) => R, thisArg?: any) => List<R>;
        slice: (start?: number | undefined, end?: number | undefined) => this;
    }
    namespace List {
    }
}
/**
 * Return a `List` prefilled with `elements`.
 * @param elements - the elements to put in the `List`
 * @returns a `List` array
 * @example
 * ```
 * list(1,2,3) // List of [1,2,3]
 * list<number>(1,2,3) // specify type
 * ```
 */
export declare function list<T>(...elements: T[]): List<T>;
/**
 * Return a `List` prefilled with `elements`.
 * @param elements - the elements to put in the `List`
 * @returns a `List` array
 * @example
 * ```
 * toList([1,2,3]) // List of [1,2,3]
 * toList<number>([1,2,3]) // specify type
 * ```
 */
export declare function toList<T>(elements: T[]): List<T>;
//# sourceMappingURL=list.d.ts.map