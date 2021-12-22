import 'jest-extended'
import { poker, dice } from '../src'
import { primes, unique, isPrime } from '../src/support'


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


describe('integer', () => {


    it('is integer', () => {
        repeat(100, () => {
            expect(Number.isInteger(poker.integer(20, 30))).toBeTrue()
        })
    })


    it('is within range', () => {
        repeat(100, () => {
            expect(range(20, 30)).toContain(poker.integer(20, 30))
        })
    })

    it('span the range', () => {
        let d = dice(() => poker.integer(20, 30))
        expect(unique(d.rolls(1000))).toIncludeSameMembers(range(20, 30))
    })

    it('throw if min>max', () => {
        expect(() => poker.integer(2, 1)).toThrow()
    })


})

describe('real', () => {


    it('is within range', () => {
        repeat(100, () => {
            expect(poker.real(20, 30)).toBeGreaterThanOrEqual(20)
            expect(poker.real(20, 30)).toBeLessThanOrEqual(30)
        })
    })


    it('span the range', () => {
        let d = dice(() => poker.real(20, 30))
        expect(Math.max(...d.rolls(1000))).toBeGreaterThan(29)
        expect(Math.min(...d.rolls(1000))).toBeLessThan(21)
    })


    it('throw if min>max', () => {
        expect(() => poker.real(2, 1)).toThrow()
    })

})



describe('prime', () => {


    it('is within range', () => {
        repeat(100, () => {
            expect(poker.prime(20, 100)).toBeGreaterThanOrEqual(20)
            expect(poker.prime(20, 100)).toBeLessThanOrEqual(100)
        })
    })


    it('is prime', () => {
        repeat(100, () => {
            expect(isPrime(poker.prime(20, 100)!)).toBeTrue()
        })
    })



    it('span the range', () => {
        let d = dice(() => poker.prime(20, 100))
        let ps = primes(100).filter($ => $ >= 20)
        expect(unique(d.rolls(1000))).toIncludeSameMembers(ps)
    })

    it('throw if min>max', () => {
        expect(() => poker.prime(2, 1)).toThrow()
    })

})




describe('he', () => {

    it('is string', () => {
        repeat(100, () => {
            expect(typeof poker.he()).toBe('string')
        })
    })

})




describe('she', () => {

    it('is string', () => {
        repeat(100, () => {
            expect(typeof poker.she()).toBe('string')
        })
    })

})




describe('bool', () => {

    it('is boolean', () => {
        repeat(100, () => {
            expect(typeof poker.bool()).toBe('boolean')
        })
    })


    it('span', () => {
        let d = dice(() => poker.bool())
        expect(unique(d.rolls(1000))).toIncludeSameMembers([true, false])
    })


    it('respect chance', () => {
        repeat(10, () => {
            let d = dice(() => poker.bool(0.8))
            expect(d.rolls(1000).filter($ => $).length).toBeGreaterThan(500)
        })
    })



})




