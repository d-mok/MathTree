import _ from 'lodash'
import { describe, expect, it, test } from 'vitest'

function getSample(func: () => any, n = 1000): any[] {
    let arr = []
    for (let i = 0; i < n; i++) arr.push(func())
    return arr
}

export function repeat(times: number, func: Function) {
    for (let i = 1; i <= times; i++) {
        func()
    }
}

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeBetween(min: number, max: number): R
            toAllBeBetween(min: number, max: number): R
            toSpanSame(members: any[], flatDepth?: number): R
            toSpanRange(min: number, max: number, flatDepth?: number): R
            toSpanLength(length: number, flatDepth?: number): R
            toAllBeOneOf(members: any[]): R
            toBeInteger(): R
            toAllBeInteger(): R
            toBeDupless(): R
        }
    }
}

expect.extend({
    toBeBetween: (number: number, min: number, max: number) => {
        const pass = number >= min && number <= max
        if (pass) {
            return {
                message: () =>
                    `expected ${number} not to be between ${min} and ${max}`,
                pass: true,
            }
        }
        return {
            message: () => `expected ${number} to be between ${min} and ${max}`,
            pass: false,
        }
    },

    toAllBeBetween: (numbers: number[], min: number, max: number) => {
        const pass = numbers.every($ => $ >= min && $ <= max)
        if (pass) {
            return {
                message: () =>
                    `expected ${numbers} not to all be between ${min} and ${max}`,
                pass: true,
            }
        }
        return {
            message: () =>
                `expected ${numbers} to all be between ${min} and ${max}`,
            pass: false,
        }
    },

    toSpanSame: (
        funcOrArray: (() => any) | any[],
        members: any[],
        flatDepth = 0
    ) => {
        let sample: any[] = []
        if (Array.isArray(funcOrArray)) {
            sample = funcOrArray
        } else {
            sample = getSample(funcOrArray)
        }

        sample = sample.uniqEqual()
        if (flatDepth > 0) {
            sample = sample.flat(flatDepth)
        }

        let sampleJSON = sample.map($ => JSON.stringify($))
        let membersJSON = members.map($ => JSON.stringify($))

        const pass =
            sampleJSON.every($ => membersJSON.includes($)) &&
            membersJSON.every($ => sampleJSON.includes($))
        if (pass) {
            return {
                message: () =>
                    `expected ${JSON.stringify(
                        sample
                    )} not to span exactly the same members as ${members}`,
                pass: true,
            }
        }
        return {
            message: () =>
                `expected ${JSON.stringify(
                    sample
                )} to span exactly the same members as ${members}`,
            pass: false,
        }
    },

    toSpanRange: (
        funcOrArray: (() => number | number[]) | number[],
        min: number,
        max: number,
        flatDepth = 0
    ) => {
        let sample: number[] = []
        if (Array.isArray(funcOrArray)) {
            sample = [...funcOrArray]
        } else {
            sample = getSample(funcOrArray)
        }
        if (flatDepth > 0) {
            sample = sample.flat(flatDepth) as number[]
        }

        let tolerance = (max - min) * 0.1

        const pass =
            sample.max() > max - tolerance && sample.min() < min + tolerance
        if (pass) {
            return {
                message: () =>
                    `expected ${[
                        ...sample,
                    ]} not to span the range ${min} to ${max}`,
                pass: true,
            }
        }
        return {
            message: () =>
                `expected ${[...sample]} to span the range ${min} to ${max}`,
            pass: false,
        }
    },

    toSpanLength: (
        funcOrArray: (() => any) | any[],
        length: number,
        flatDepth = 0
    ) => {
        let sample = []
        if (Array.isArray(funcOrArray)) {
            sample = funcOrArray
        } else {
            sample = getSample(funcOrArray)
        }
        if (flatDepth > 0) {
            sample = sample.flat(flatDepth)
        }

        sample = sample.uniqEqual()

        const pass = sample.length === length
        if (pass) {
            return {
                message: () =>
                    `expected length ${sample.length} not to have unique length ${length}`,
                pass: true,
            }
        }
        return {
            message: () =>
                `expected length ${sample.length} to have unique length ${length}`,
            pass: false,
        }
    },

    toAllBeOneOf: (array: any[], members: any[]) => {
        const pass = array.every($ => members.includes($))
        if (pass) {
            return {
                message: () =>
                    `expected ${array} not to all lie inside ${members}`,
                pass: true,
            }
        }
        return {
            message: () => `expected ${array} to all lie inside ${members}`,
            pass: false,
        }
    },

    toBeInteger(number) {
        const pass = Number.isInteger(number)
        if (pass) {
            return {
                message: () => `expected ${number} not to be an integer`,
                pass: true,
            }
        }
        return {
            message: () => `expected ${number} to be an integer`,
            pass: false,
        }
    },

    toAllBeInteger(numbers: number[]) {
        const pass = numbers.every($ => Number.isInteger($))
        if (pass) {
            return {
                message: () => `expected ${numbers} not to all be integer`,
                pass: true,
            }
        }
        return {
            message: () => `expected ${numbers} to all be integer`,
            pass: false,
        }
    },

    toBeDupless(array: any[]) {
        const pass = array.isUniqEqual()
        if (pass) {
            return {
                message: () => `expected ${array} not to all be duplicate-free`,
                pass: true,
            }
        } else {
            return {
                message: () => `expected ${array} to all be duplicate-free`,
                pass: false,
            }
        }
    },
})
