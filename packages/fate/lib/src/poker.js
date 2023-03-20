import { primes, draw } from './support';
function error(msg) {
    const e = new Error(msg);
    e.name = 'PokerError';
    return e;
}
/**
 * Return a random integer from `min` to `max` inclusive.
 * @param min - the min value allowed
 * @param max - the max value allowed
 * @returns a random integer
 * @example
 * ```
 * integer(3,7) // maybe 3,4,5,6 or 7
 * ```
 */
export function integer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min > max)
        throw error('min must be less than max!');
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * Return a random real number from `min` to `max` inclusive.
 * @param min - the min value allowed
 * @param max - the max value allowed
 * @returns a random real number
 * @example
 * ```
 * real(3,7) // anything between 3 and 7
 * ```
 */
export function real(min, max) {
    if (min > max)
        throw error('min must be less than max!');
    return Math.random() * (max - min) + min;
}
/**
 * Return a random prime number from `min` to `max` inclusive.
 * If there is no prime in the range, return `undefined`.
 * @param min - the min value allowed
 * @param max - the max value allowed
 * @returns a random prime number
 * @example
 * ```
 * prime(3,7) // 3 or 5 or 7
 * ```
 */
export function prime(min, max) {
    if (min > max)
        throw error('min must be less than max!');
    let ps = primes(max).filter($ => $ >= min);
    return draw(ps);
}
/**
 * Return a random male name.
 * @returns a random male name
 * @example
 * ```
 * he() // e.g. 'Peter'
 * ```
 */
export function he() {
    return draw([
        'Aaron',
        'Adam',
        'Alan',
        'Alexander',
        'Andrew',
        'Ben',
        'Brian',
        'Cameron',
        'Charlie',
        'Colin',
        'Daniel',
        'David',
        'Derek',
        'Donald',
        'Edward',
        'Eric',
        'Ethan',
        'Frank',
        'Gary',
        'George',
        'Gordon',
        'Harris',
        'Harry',
        'Jack',
        'Jacob',
        'James',
        'Jamie',
        'Jason',
        'John',
        'Jordan',
        'Joseph',
        'Kevin',
        'Kyle',
        'Leo',
        'Lewis',
        'Lucas',
        'Martin',
        'Mason',
        'Matthew',
        'Michael',
        'Nathan',
        'Nicholas',
        'Noah',
        'Oliver',
        'Patrick',
        'Paul',
        'Peter',
        'Philip',
        'Riley',
        'Robert',
        'Rory',
        'Ryan',
        'Samuel',
        'Scott',
        'Stephen',
        'Steven',
        'Thomas',
        'Timothy',
        'William',
    ]);
}
/**
 * Return a random female name.
 * @returns a random female name
 * @example
 * ```
 * she() // e.g. 'Mary'
 * ```
 */
export function she() {
    return draw([
        'Abbie',
        'Alice',
        'Alison',
        'Amanda',
        'Amelia',
        'Amy',
        'Angela',
        'Ann',
        'Anna',
        'Ashley',
        'Cara',
        'Carol',
        'Caroline',
        'Charlotte',
        'Cheryl',
        'Chloe',
        'Christine',
        'Claire',
        'Donna',
        'Elaine',
        'Ella',
        'Ellie',
        'Emily',
        'Emma',
        'Eva',
        'Fiona',
        'Gillian',
        'Grace',
        'Hazel',
        'Helen',
        'Holly',
        'Ivy',
        'Jacqueline',
        'Jade',
        'Janet',
        'Jennifer',
        'Jessica',
        'Julie',
        'Karen',
        'Kate',
        'Katie',
        'Kelly',
        'Kirsty',
        'Lily',
        'Linda',
        'Lisa',
        'Lorraine',
        'Louise',
        'Lucy',
        'Mandy',
        'Mary',
        'Michelle',
        'Natalie',
        'Nicole',
        'Olivia',
        'Pamela',
        'Pauline',
        'Rachel',
        'Rebecca',
        'Rosie',
        'Samantha',
        'Sarah',
        'Shannon',
        'Sharon',
        'Sophia',
        'Sophie',
        'Stephanie',
        'Susan',
        'Tracey',
        'Tracy',
        'Valerie',
        'Victoria',
        'Wendy',
        'Zoe',
    ]);
}
/**
 * Return a random boolean.
 * @param trueChance - the probability of true, from 0 to 1
 * @return a random Boolean
 * @example
 * ```
 * bool(0.6) // 60% chance true, 40% false
 * ```
 */
export function bool(trueChance = 0.5) {
    return real(0, 1) < trueChance;
}
//# sourceMappingURL=poker.js.map