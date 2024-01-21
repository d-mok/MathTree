import 'jest-extended'
import { dice } from '../src/index.js'
import _ from 'lodash'

function repeat(times: number, func: Function) {
    for (let i = 1; i <= times; i++) {
        func()
    }
}

function range(min: number, max: number): number[] {
    min = Math.ceil(min)
    let arr: number[] = []
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
            let d = getDice()
            repeat(10, () => {
                expect(theRange).toContain(d.roll())
            })
        })
    })

    describe('rolls', () => {
        it('return array of random item', () => {
            let d = getDice()
            repeat(10, () => {
                expect(theRange).toIncludeAllMembers(d.rolls(99))
                expect(d.rolls(99)).toHaveLength(99)
            })
        })
    })

    describe('shield', () => {
        let d = getDice()
        let isEven = ($: number) => $ % 2 === 0

        d.shield(isEven)

        it('govern roll', () => {
            repeat(10, () => {
                expect(theRange.filter(isEven)).toContain(d.roll())
                expect(d.roll() % 2).toBe(0)
            })
        })

        it('govern rolls', () => {
            repeat(10, () => {
                expect(theRange.filter(isEven)).toIncludeAllMembers(d.rolls(99))
                expect(d.rolls(99).every(isEven)).toBeTrue()
            })
        })

        it('throw if no item pass', () => {
            let d = getDice()
            let banned = ($: number) => false
            d.shield(banned)

            repeat(10, () => {
                expect(() => d.roll()).toThrow()
            })
        })
    })

    describe('forbid', () => {
        let d = getDice()

        d.forbid(5, 7)

        it('govern roll', () => {
            repeat(10, () => {
                expect(theRange.filter($ => $ !== 5 && $ !== 7)).toContain(
                    d.roll()
                )
            })
        })

        it('govern rolls', () => {
            repeat(10, () => {
                expect(
                    theRange.filter($ => $ !== 5 && $ !== 7)
                ).toIncludeAllMembers(d.rolls(99))
            })
        })
    })

    describe('preserve', () => {
        let d = getDice()

        d.preserve($ => $ % 2, 8)

        it('govern roll', () => {
            repeat(10, () => {
                expect(d.roll()).toSatisfy($ => $ % 2 === 0)
            })
        })

        it('govern rolls', () => {
            repeat(10, () => {
                expect(d.rolls(3)).toSatisfyAll($ => $ % 2 === 0)
            })
        })
    })

    describe('unique', () => {
        let d = getDice()
        let parity = ($: number) => $ % 2

        d.unique(parity)

        it('not affect roll', () => {
            repeat(10, () => {
                expect(theRange).toContain(d.roll())
            })
        })

        it('govern rolls', () => {
            repeat(10, () => {
                expect(d.rolls(2).map($ => $ % 2)).toIncludeSameMembers([1, 0])
                expect(() => d.rolls(3)).toThrow()
            })
        })

        it('handles multiple uniques', () => {
            let parity3 = ($: number) => $ % 3
            d.unique(parity3)

            repeat(10, () => {
                expect(theRange).toContain(d.roll())
                expect(() => d.rolls(3)).toThrow()
            })

            repeat(10, () => {
                let [a, b] = d.rolls(2)
                expect(a % 2 !== b % 2).toBeTrue()
                expect(a % 3 !== b % 3).toBeTrue()
            })
        })

        it('further test', () => {
            let d = getDice()
            let parity6 = ($: number) => $ % 6

            d.unique(parity6)

            repeat(10, () => {
                expect(d.rolls(6).map($ => $ % 6)).toIncludeSameMembers([
                    0, 1, 2, 3, 4, 5,
                ])
                expect(() => d.rolls(7)).toThrow()
            })
        })

        it('default self', () => {
            let d = getDice()
            d.unique()

            repeat(10, () => {
                expect(() => d.rolls(11)).toThrow()
            })
        })

        it('govern rolls, deep', () => {
            let d = dice(() => [randomInt()])
            let parity = ([$]: number[]) => [$ % 2]

            d.unique(parity)

            repeat(10, () => {
                expect(d.rolls(2).map(([$]) => $ % 2)).toIncludeSameMembers([
                    1, 0,
                ])
                expect(() => d.rolls(3)).toThrow()
            })
        })

        it('default self, deep', () => {
            let d = dice(() => [randomInt()])
            d.unique()

            repeat(10, () => {
                expect(() => d.rolls(11)).toThrow()
            })
        })
    })

    describe('distinct', () => {
        let d = getDice()
        let parity = (a: number, b: number) => a % 2 === b % 2

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
            let parity3 = (a: number, b: number) => a % 3 === b % 3
            d.distinct(parity3)

            repeat(10, () => {
                expect(theRange).toContain(d.roll())
                expect(() => d.rolls(3)).toThrow()
            })

            repeat(10, () => {
                let [a, b] = d.rolls(2)
                expect(a % 2 !== b % 2).toBeTrue()
                expect(a % 3 !== b % 3).toBeTrue()
            })
        })

        it('further test', () => {
            let d = getDice()
            let parity6 = (a: number, b: number) => a % 6 === b % 6

            d.distinct(parity6)

            repeat(10, () => {
                expect(d.rolls(6).map($ => $ % 6)).toIncludeSameMembers([
                    0, 1, 2, 3, 4, 5,
                ])
                expect(() => d.rolls(7)).toThrow()
            })
        })
    })

    describe('coherent', () => {
        let d = getDice()
        let parity = ($: number) => $ % 2
        let sumLessThan10 = ($: number[]) => $.reduce((a, b) => a + b) < 10
        let sumMoreThan5 = ($: number[]) => $.reduce((a, b) => a + b) > 5

        d.unique(parity)
        d.coherent(sumLessThan10)

        it('not affect roll', () => {
            repeat(10, () => {
                expect(theRange).toContain(d.roll())
            })
        })

        it('govern rolls', () => {
            repeat(10, () => {
                expect(d.rolls(2).map($ => $ % 2)).toIncludeSameMembers([1, 0])
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
                expect(d.rolls(2).map($ => $ % 2)).toIncludeSameMembers([1, 0])
                expect(d.rolls(2).reduce((a, b) => a + b)).toBeLessThan(10)
                expect(d.rolls(2).reduce((a, b) => a + b)).toBeGreaterThan(5)
            })
        })
    })
})
