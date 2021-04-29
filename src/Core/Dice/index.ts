import { Chance } from 'chance'


declare global {
    namespace Chance {
        interface Chance {
            prime: (opt: { min: number, max: number }) => number // patch
        }
    }
}

const chance = new Chance()

type randomFunc<T> = () => T
type predicate<T> = (item: T) => boolean
type keyFunc<T> = (item: T) => number | string

export function integer(minInt: number, maxInt: number): number {
    return chance.integer({ min: minInt, max: maxInt });
}


export function real(min: number, max: number): number {
    return chance.floating({ min, max, fixed: 10 });
}


export function prime(min: number, max: number): number {
    return chance.prime({ min, max });
}

export function he(): string {
    return chance.first({ gender: 'male', nationality: 'en' });
}


export function she(): string {
    return chance.first({ gender: 'female', nationality: 'en' });
}


export function brute<T>(func: randomFunc<T>, predicate: predicate<T>, trials = 1000): T {
    for (let i = 1; i <= trials; i++) {
        let item = func()
        if (predicate(item)) return item
    }
    throw DiceBlood('No items can satisfy predicate after ' + trials + ' trials!')
}


export function shield<T>(func: randomFunc<T>, predicate: predicate<T>, trials = 1000): randomFunc<T> {
    return () => brute(func, predicate, trials)
}


export function sample<T>(func: randomFunc<T>, length: number): T[] {
    return chance.n(func, length)
}


export function unique<T>(func: randomFunc<T>, length: number, key?: keyFunc<T>): T[] {
    try {
        if (key) {
            return chance.unique(
                func,
                length,
                { comparator: (arr: T[], val: T) => arr.some(x => key(x) === key(val)) }
            )
        } else {
            return chance.unique(func, length)
        }
    } catch (e) {
        if (e.message === 'num is likely too large for sample set')
            throw DiceBlood('num is likely too large for sample set')
        throw e
    }
}




export function pick<T>(...items: T[]) {
    return {
        one(): T {
            return chance.pickone(items)
        },
        sample(length: number): T[] {
            return sample(() => this.one(), length)
        },
        unique(length: number): T[] {
            return unique(() => this.one(), length)
        },
    }
}


export function shuffle<T>(...items: T[]): T[] {
    return chance.shuffle(items);
}

