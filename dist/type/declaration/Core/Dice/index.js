define(["require", "exports", "chance"], function (require, exports, chance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.array = exports.roll = exports.she = exports.he = exports.prime = exports.real = exports.integer = void 0;
    function DiceBlood(message) {
        return new Blood('Dice', message);
    }
    const chance = new chance_1.Chance();
    function integer(minInt, maxInt) {
        return chance.integer({ min: minInt, max: maxInt });
    }
    exports.integer = integer;
    function real(min, max) {
        return chance.floating({ min, max, fixed: 10 });
    }
    exports.real = real;
    function prime(min, max) {
        return chance.prime({ min, max });
    }
    exports.prime = prime;
    function he() {
        return chance.first({ gender: 'male', nationality: 'en' });
    }
    exports.he = he;
    function she() {
        return chance.first({ gender: 'female', nationality: 'en' });
    }
    exports.she = she;
    function roll(func) {
        const TRIAL = 1000;
        return {
            brute(predicate) {
                for (let i = 1; i <= TRIAL; i++) {
                    let item = func();
                    if (predicate(item))
                        return item;
                }
                throw DiceBlood('No items can satisfy predicate after ' + TRIAL + ' trials!');
            },
            shield(predicate) {
                return () => this.brute(predicate);
            },
            sample(length) {
                return chance.n(func, length);
            },
            unique(length, key) {
                try {
                    if (key) {
                        return chance.unique(func, length, { comparator: (arr, val) => arr.some(x => key(x) === key(val)) });
                    }
                    else {
                        return chance.unique(func, length);
                    }
                }
                catch (e) {
                    if (e.message === 'num is likely too large for sample set')
                        throw DiceBlood('num is likely too large for sample set');
                    throw e;
                }
            }
        };
    }
    exports.roll = roll;
    function array(items) {
        return {
            one() {
                return chance.pickone(items);
            },
            sample(length) {
                return roll(() => this.one()).sample(length);
            },
            unique(length) {
                return roll(() => this.one()).unique(length);
            },
            shuffle() {
                return chance.shuffle(items);
            },
            balanced(length) {
                let arr = [];
                for (let i = 0; i <= Math.ceil(length / items.length); i++) {
                    arr.push(...items);
                }
                arr.length = length;
                return array(arr).shuffle();
            }
        };
    }
    exports.array = array;
});
