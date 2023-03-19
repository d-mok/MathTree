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
        let sample = list()
        if (Array.isArray(funcOrArray)) {
            sample = toList(funcOrArray)
        } else {
            sample = toList(getSample(funcOrArray))
        }

        sample = sample.unique().uniqueDeep()
        if (flatDepth > 0) {
            sample = toList(sample.flat(flatDepth))
        }

        let sampleJSON = sample.map($ => JSON.stringify($))
        let membersJSON = toList(members.map($ => JSON.stringify($)))

        const pass =
            sampleJSON.includesAll(membersJSON) &&
            membersJSON.includesAll(sampleJSON)
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
        let sample = numbers()
        if (Array.isArray(funcOrArray)) {
            sample = toNumbers(funcOrArray)
        } else {
            sample = toNumbers(getSample(funcOrArray))
        }
        if (flatDepth > 0) {
            sample = toNumbers(sample.flat(flatDepth) as number[])
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
        let sample = list()
        if (Array.isArray(funcOrArray)) {
            sample = toList(funcOrArray)
        } else {
            sample = toList(getSample(funcOrArray))
        }
        if (flatDepth > 0) {
            sample = toList(sample.flat(flatDepth))
        }

        sample = sample.unique().uniqueDeep()

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
        const pass = toList(members).includesAll(array)
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

    // toBeArrayCloseTo(received, arr) {
    //   let pass = true;
    //   if (!Array.isArray(received)) pass = false;
    //   if (!Array.isArray(arr)) pass = false;
    //   if (received.length !== arr.length) pass = false;
    //   for (let i = 0; i < arr.length; i++) {
    //     if (Math.abs(received[i] - arr[i]) > 0.000000001) pass = false;
    //   }
    //   if (pass) {
    //     return {
    //       message: () => `expected ${received} not to be close to ${arr}`,
    //       pass: true,
    //     };
    //   } else {
    //     return {
    //       message: () => `expected ${received} to be close to ${arr}`,
    //       pass: false,
    //     };
    //   }
    // },

    // toBeFlatWithin(received, min, max) {
    //   const pass = received.flat().every(x => x >= min && x <= max);
    //   if (pass) {
    //     return {
    //       message: () => `expected ${received} not to be within ${min} - ${max}`,
    //       pass: true,
    //     };
    //   } else {
    //     return {
    //       message: () => `expected ${received} to be within ${min} - ${max}`,
    //       pass: false,
    //     };
    //   }
    // },

    // toBeFlatAbsWithin(received, min, max) {
    //   const pass = received.flat().every(x => Abs(x) >= min && Abs(x) <= max);
    //   if (pass) {
    //     return {
    //       message: () => `expected ${received} not to be abs within ${min} - ${max}`,
    //       pass: true,
    //     };
    //   } else {
    //     return {
    //       message: () => `expected ${received} to be abs within ${min} - ${max}`,
    //       pass: false,
    //     };
    //   }
    // },

    // toBeFlatIs(received: any[], func: ($: any) => boolean, flatDepth = 1) {
    //   const pass = received.flat(flatDepth).every(x => func(x));
    //   if (pass) {
    //     return {
    //       message: () => `expected ${received} not to be ${func.name}`,
    //       pass: true,
    //     };
    //   } else {
    //     return {
    //       message: () => `expected ${received} to be ${func.name}`,
    //       pass: false,
    //     };
    //   }
    // },

    // toBeFlatIsInteger(received, func) {
    //   const pass = received.flat().every(x => IsInteger(x));
    //   if (pass) {
    //     return {
    //       message: () => `expected ${received} not to be ${func.name}`,
    //       pass: true,
    //     };
    //   } else {
    //     return {
    //       message: () => `expected ${received} to be ${func.name}`,
    //       pass: false,
    //     };
    //   }
    // },

    // toBeFlatDistinct(received, count) {
    //   const pass = [... new Set(received.flat())].length === count;
    //   if (pass) {
    //     return {
    //       message: () => `expected ${received} not to have ${count} distinct items`,
    //       pass: true,
    //     };
    //   } else {
    //     return {
    //       message: () => `expected ${received} to have ${count} distinct items`,
    //       pass: false,
    //     };
    //   }
    // },

    // toBeFlatDiverse(received) {
    //   const pass = [... new Set(received.flat())].length > 100;
    //   if (pass) {
    //     return {
    //       message: () => `expected ${received} not to have >100 distinct items`,
    //       pass: true,
    //     };
    //   } else {
    //     return {
    //       message: () => `expected ${received} to have >100 distinct items`,
    //       pass: false,
    //     };
    //   }
    // },

    // toAllHaveLength(received, length) {
    //   const pass = received.every(x => x.length === length);
    //   if (pass) {
    //     return {
    //       message: () => `expected ${received} not to all have legnth ${length}`,
    //       pass: true,
    //     };
    //   } else {
    //     return {
    //       message: () => `expected ${received} to all have legnth ${length}`,
    //       pass: false,
    //     };
    //   }
    // },

    // toBeFlatIncluded(received, allowed) {
    //   const pass = received.flat().every(x => allowed.includes(x));
    //   if (pass) {
    //     return {
    //       message: () => `expected ${received} not to be included in ${allowed}`,
    //       pass: true,
    //     };
    //   } else {
    //     return {
    //       message: () => `expected ${received} to be included in ${allowed}`,
    //       pass: false,
    //     };
    //   }
    // },

    toBeDupless(array: any[]) {
        const pass = toList(array).duplessDeep() && toList(array).dupless()
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
