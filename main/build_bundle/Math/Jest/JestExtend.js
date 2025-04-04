import _ from 'lodash';
import { expect } from 'vitest';
function getSample(func, n = 1000) {
    let arr = [];
    for (let i = 0; i < n; i++)
        arr.push(func());
    return arr;
}
export function repeat(times, func) {
    for (let i = 1; i <= times; i++) {
        func();
    }
}
expect.extend({
    toBeBetween: (number, min, max) => {
        const pass = number >= min && number <= max;
        if (pass) {
            return {
                message: () => `expected ${number} not to be between ${min} and ${max}`,
                pass: true,
            };
        }
        return {
            message: () => `expected ${number} to be between ${min} and ${max}`,
            pass: false,
        };
    },
    toAllBeBetween: (numbers, min, max) => {
        const pass = numbers.every($ => $ >= min && $ <= max);
        if (pass) {
            return {
                message: () => `expected ${numbers} not to all be between ${min} and ${max}`,
                pass: true,
            };
        }
        return {
            message: () => `expected ${numbers} to all be between ${min} and ${max}`,
            pass: false,
        };
    },
    toSpanSame: (funcOrArray, members, flatDepth = 0) => {
        let sample = [];
        if (Array.isArray(funcOrArray)) {
            sample = funcOrArray;
        }
        else {
            sample = getSample(funcOrArray);
        }
        sample = sample.uniqEqual();
        if (flatDepth > 0) {
            sample = sample.flat(flatDepth);
        }
        let sampleJSON = sample.map($ => JSON.stringify($));
        let membersJSON = members.map($ => JSON.stringify($));
        const pass = sampleJSON.every($ => membersJSON.includes($)) &&
            membersJSON.every($ => sampleJSON.includes($));
        if (pass) {
            return {
                message: () => `expected ${JSON.stringify(sample)} not to span exactly the same members as ${members}`,
                pass: true,
            };
        }
        return {
            message: () => `expected ${JSON.stringify(sample)} to span exactly the same members as ${members}`,
            pass: false,
        };
    },
    toSpanRange: (funcOrArray, min, max, flatDepth = 0) => {
        let sample = [];
        if (Array.isArray(funcOrArray)) {
            sample = [...funcOrArray];
        }
        else {
            sample = getSample(funcOrArray);
        }
        if (flatDepth > 0) {
            sample = sample.flat(flatDepth);
        }
        let tolerance = (max - min) * 0.1;
        const pass = _.max(sample) > max - tolerance && _.min(sample) < min + tolerance;
        if (pass) {
            return {
                message: () => `expected ${[
                    ...sample,
                ]} not to span the range ${min} to ${max}`,
                pass: true,
            };
        }
        return {
            message: () => `expected ${[...sample]} to span the range ${min} to ${max}`,
            pass: false,
        };
    },
    toSpanLength: (funcOrArray, length, flatDepth = 0) => {
        let sample = [];
        if (Array.isArray(funcOrArray)) {
            sample = funcOrArray;
        }
        else {
            sample = getSample(funcOrArray);
        }
        if (flatDepth > 0) {
            sample = sample.flat(flatDepth);
        }
        sample = sample.uniqEqual();
        const pass = sample.length === length;
        if (pass) {
            return {
                message: () => `expected length ${sample.length} not to have unique length ${length}`,
                pass: true,
            };
        }
        return {
            message: () => `expected length ${sample.length} to have unique length ${length}`,
            pass: false,
        };
    },
    toAllBeOneOf: (array, members) => {
        const pass = array.every($ => members.includes($));
        if (pass) {
            return {
                message: () => `expected ${array} not to all lie inside ${members}`,
                pass: true,
            };
        }
        return {
            message: () => `expected ${array} to all lie inside ${members}`,
            pass: false,
        };
    },
    toBeInteger(number) {
        const pass = Number.isInteger(number);
        if (pass) {
            return {
                message: () => `expected ${number} not to be an integer`,
                pass: true,
            };
        }
        return {
            message: () => `expected ${number} to be an integer`,
            pass: false,
        };
    },
    toAllBeInteger(numbers) {
        const pass = numbers.every($ => Number.isInteger($));
        if (pass) {
            return {
                message: () => `expected ${numbers} not to all be integer`,
                pass: true,
            };
        }
        return {
            message: () => `expected ${numbers} to all be integer`,
            pass: false,
        };
    },
    toBeDupless(array) {
        const pass = array.isUniqEqual();
        if (pass) {
            return {
                message: () => `expected ${array} not to all be duplicate-free`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `expected ${array} to all be duplicate-free`,
                pass: false,
            };
        }
    },
});
