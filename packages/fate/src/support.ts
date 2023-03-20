/**
 * Return whether `num` is prime.
 * @param num - the integer to check
 * @returns - a boolean
 * @example
 * ```
 * isPrime(5) // true
 * isPrime(6) // false
 * ```
 */
export function isPrime(num: number): boolean {
    if (!Number.isInteger(num)) return false
    if (num <= 1) return false
    if (num === 2) return true
    if (num % 2 === 0) return false
    for (let i = 3; i <= Math.sqrt(num) + 1; i = i + 2) {
        if (num % i === 0) return false
    }
    return true
}

/**
 * Return all the primes under `max`.
 * @param max - upper bound of primes requested
 * @returns array of primes
 * @example
 * ```
 * primes(12) // [2,3,5,7,11]
 * primes(13) // [2,3,5,7,11,13]
 * ```
 */
export function primes(max: number): number[] {
    let arr: number[] = []
    for (let i = 2; i <= max; i++) {
        if (isPrime(i)) arr.push(i)
    }
    return arr
}

function rndInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomIndex(array: any[]): number {
    return rndInt(0, array.length - 1)
}

export function draw<T>(array: T[]): T {
    let i = randomIndex(array)
    return array[i]
}

export function unique<T>(array: T[]): T[] {
    return [...new Set(array)]
}
