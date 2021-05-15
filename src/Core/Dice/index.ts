import { Chance } from 'chance'



type roll<T> = () => T





function DiceBlood(message: string): Blood {
    return new Blood('Dice', message)
}


declare global {
    namespace Chance {
        interface Chance {
            prime: (opt: { min: number, max: number }) => number // patch
        }
    }
}

const chance = new Chance()

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


export function bool(chance: number): boolean {
    return real(0, 1) < chance
}




export function roll<T>(func: roll<T>) {
    const TRIAL = 1000
    return {
        brute(predicate: predicate<T>): T {
            for (let i = 1; i <= TRIAL; i++) {
                let item = func()
                if (predicate(item)) return item
            }
            throw DiceBlood('No items can satisfy predicate after ' + TRIAL + ' trials!')
        },
        shield(predicate: predicate<T>): roll<T> {
            return () => this.brute(predicate)
        },
        sample(length: number): T[] {
            return chance.n(func, length)
        },
        unique(length: number, key?: keyFunc<T>): T[] {
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
        },
        distinct(length: number, comparer: (a: T, b: T) => boolean) {
            try {
                return chance.unique(
                    func,
                    length,
                    { comparator: (arr: T[], val: T) => arr.some(x => comparer(x, val)) }
                )

            } catch (e) {
                if (e.message === 'num is likely too large for sample set')
                    throw DiceBlood('num is likely too large for sample set')
                throw e
            }
        }
    }
}



export function array<T>(items: T[]) {
    return {
        one(): T {
            return chance.pickone(items)
        },
        sample(length: number): T[] {
            return roll(() => this.one()).sample(length)
        },
        unique(length: number): T[] {
            return roll(() => this.one()).unique(length)
        },
        shuffle(): T[] {
            return chance.shuffle(items);
        },
        balanced(length: number): T[] {
            let arr = []
            for (let i = 0; i <= Math.ceil(length / items.length); i++) {
                arr.push(...items)
            }
            arr.length = length
            return array(arr).shuffle()
        }
    }
}

