import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'
import { dice } from './index.ts'
import * as _ from 'es-toolkit'

function areEqualSets(a: unknown[], b: unknown[]): boolean {
    return _.xor(a, b).length === 0
}

function repeat(times: number, func: (...args: unknown[]) => unknown) {
    for (let i = 1; i <= times; i++) {
        func()
    }
}

function range(min: number, max: number): number[] {
    min = Math.ceil(min)
    const arr: number[] = []
    for (let i = min; i <= max; i++) {
        arr.push(i)
    }
    return arr
}

function randomInt(): number {
    return _.sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])!
}

describe('Class Dice', () => {
    function getDice() {
        return dice(() => randomInt())
    }

    const theRange = range(1, 10)

    describe('roll', () => {
        it('returns a random item', () => {
            const d = getDice()
            repeat(10, () => {
                expect(theRange).toContain(d.roll())
            })
        })
    })

    describe('rolls', () => {
        it('return array of random item', () => {
            const d = getDice()
            repeat(10, () => {
                expect(_.isSubset(theRange, d.rolls(99))).toBe(true)
                expect(d.rolls(99)).toHaveLength(99)
            })
        })
    })

    describe('shield', () => {
        const d = getDice()
        const isEven = ($: number) => $ % 2 === 0

        d.shield(isEven)

        it('govern roll', () => {
            repeat(10, () => {
                expect(theRange.filter(isEven)).toContain(d.roll())
                expect(d.roll() % 2).toBe(0)
            })
        })

        it('govern rolls', () => {
            repeat(10, () => {
                expect(_.isSubset(theRange.filter(isEven), d.rolls(99))).toBe(
                    true,
                )
                expect(d.rolls(99).every(isEven)).toBe(true)
            })
        })

        it('throw if no item pass', () => {
            const d = getDice()
            const banned = (_$: number) => false
            d.shield(banned)

            repeat(10, () => {
                expect(() => d.roll()).toThrow()
            })
        })
    })

    describe('forbid', () => {
        const d = getDice()

        d.forbid(5, 7)

        it('govern roll', () => {
            repeat(10, () => {
                expect(theRange.filter($ => $ !== 5 && $ !== 7)).toContain(
                    d.roll(),
                )
            })
        })

        it('govern rolls', () => {
            repeat(10, () => {
                expect(
                    _.isSubset(
                        theRange.filter($ => $ !== 5 && $ !== 7),
                        d.rolls(99),
                    ),
                ).toBe(true)
            })
        })
    })

    describe('preserve', () => {
        const d = getDice()

        d.preserve($ => $ % 2, 8)

        it('govern roll', () => {
            repeat(10, () => {
                expect(d.roll() % 2 === 0).toBe(true)
            })
        })

        it('govern rolls', () => {
            repeat(10, () => {
                expect(d.rolls(3).every($ => $ % 2 === 0)).toBe(true)
            })
        })
    })

    describe('unique', () => {
        const d = getDice()
        const parity = ($: number) => $ % 2

        d.unique(parity)

        it('not affect roll', () => {
            repeat(10, () => {
                expect(theRange).toContain(d.roll())
            })
        })

        it('govern rolls', () => {
            repeat(10, () => {
                expect(
                    areEqualSets(
                        d.rolls(2).map($ => $ % 2),
                        [1, 0],
                    ),
                ).toBe(true)
                expect(() => d.rolls(3)).toThrow()
            })
        })

        it('handles multiple uniques', () => {
            const parity3 = ($: number) => $ % 3
            d.unique(parity3)

            repeat(10, () => {
                expect(theRange).toContain(d.roll())
                expect(() => d.rolls(3)).toThrow()
            })

            repeat(10, () => {
                const [a, b] = d.rolls(2)
                expect(a % 2 !== b % 2).toBe(true)
                expect(a % 3 !== b % 3).toBe(true)
            })
        })

        it('further test', () => {
            const d = getDice()
            const parity6 = ($: number) => $ % 6

            d.unique(parity6)

            repeat(10, () => {
                expect(
                    areEqualSets(
                        d.rolls(6).map($ => $ % 6),
                        [0, 1, 2, 3, 4, 5],
                    ),
                ).toBe(true)
                expect(() => d.rolls(7)).toThrow()
            })
        })

        it('default self', () => {
            const d = getDice()
            d.unique()

            repeat(10, () => {
                expect(() => d.rolls(11)).toThrow()
            })
        })

        it('govern rolls, deep', () => {
            const d = dice(() => [randomInt()])
            const parity = ([$]: number[]) => [$ % 2]

            d.unique(parity)

            repeat(10, () => {
                expect(
                    areEqualSets(
                        d.rolls(2).map(([$]) => $ % 2),
                        [1, 0],
                    ),
                ).toBe(true)
                expect(() => d.rolls(3)).toThrow()
            })
        })

        it('default self, deep', () => {
            const d = dice(() => [randomInt()])
            d.unique()

            repeat(10, () => {
                expect(() => d.rolls(11)).toThrow()
            })
        })
    })

    describe('distinct', () => {
        const d = getDice()
        const parity = (a: number, b: number) => a % 2 === b % 2

        d.distinct(parity)

        it('not affect roll', () => {
            repeat(10, () => {
                expect(theRange).toContain(d.roll())
            })
        })

        it('govern rolls', () => {
            repeat(10, () => {
                expect(d.rolls(2).reduce((a, b) => a + b) % 2).toBe(1)
                expect(() => d.rolls(3)).toThrow()
            })
        })

        it('handles multiple distincts', () => {
            const parity3 = (a: number, b: number) => a % 3 === b % 3
            d.distinct(parity3)

            repeat(10, () => {
                expect(theRange).toContain(d.roll())
                expect(() => d.rolls(3)).toThrow()
            })

            repeat(10, () => {
                const [a, b] = d.rolls(2)
                expect(a % 2 !== b % 2).toBe(true)
                expect(a % 3 !== b % 3).toBe(true)
            })
        })

        it('further test', () => {
            const d = getDice()
            const parity6 = (a: number, b: number) => a % 6 === b % 6

            d.distinct(parity6)

            repeat(10, () => {
                expect(
                    areEqualSets(
                        d.rolls(6).map($ => $ % 6),
                        [0, 1, 2, 3, 4, 5],
                    ),
                ).toBe(true)
                expect(() => d.rolls(7)).toThrow()
            })
        })
    })

    describe('coherent', () => {
        const d = getDice()
        const parity = ($: number) => $ % 2
        const sumLessThan10 = ($: number[]) => $.reduce((a, b) => a + b) < 10
        const sumMoreThan5 = ($: number[]) => $.reduce((a, b) => a + b) > 5

        d.unique(parity)
        d.coherent(sumLessThan10)

        it('not affect roll', () => {
            repeat(10, () => {
                expect(theRange).toContain(d.roll())
            })
        })

        it('govern rolls', () => {
            repeat(10, () => {
                expect(
                    areEqualSets(
                        d.rolls(2).map($ => $ % 2),
                        [1, 0],
                    ),
                ).toBe(true)
                expect(d.rolls(2).reduce((a, b) => a + b)).toBeLessThan(10)
                expect(() => d.rolls(3)).toThrow()
            })
        })

        it('handles multiple coherent', () => {
            d.coherent(sumMoreThan5)

            repeat(10, () => {
                expect(theRange).toContain(d.roll())
                expect(() => d.rolls(3)).toThrow()
            })

            repeat(10, () => {
                expect(
                    areEqualSets(
                        d.rolls(2).map($ => $ % 2),
                        [1, 0],
                    ),
                ).toBe(true)
                expect(d.rolls(2).reduce((a, b) => a + b)).toBeLessThan(10)
                expect(d.rolls(2).reduce((a, b) => a + b)).toBeGreaterThan(5)
            })
        })
    })
})
