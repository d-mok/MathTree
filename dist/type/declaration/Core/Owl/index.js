define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.every = exports.or = exports.and = exports.roman = exports.trig = exports.quadrant = exports.quadrantName = exports.quadrantCode = exports.constraint = exports.dfrac = exports.ineq = exports.distinctBy = exports.distinct = exports.fail = exports.pass = exports.triangleSides = exports.vector = exports.properFraction = exports.fraction = exports.polar = exports.point = exports.interval = exports.ntuple = exports.triple = exports.couple = exports.arrayWith = exports.arrayOfLength = exports.array = exports.emptyObject = exports.bool = exports.str = exports.absBetween = exports.between = exports.nonZeroInt = exports.nonZero = exports.nonPositiveInt = exports.nonPositive = exports.negativeInt = exports.negative = exports.nonNegativeInt = exports.nonNegative = exports.positiveInt = exports.positive = exports.sq = exports.prob = exports.even = exports.odd = exports.irrational = exports.rational = exports.dec = exports.int = exports.whole = exports.num = void 0;
    const num = (_) => Number.isFinite(_);
    exports.num = num;
    const whole = (_) => Number.isInteger(_);
    exports.whole = whole;
    const int = (_) => exports.num(_) && Number.isInteger(ant.correct(_));
    exports.int = int;
    const dec = (_) => exports.num(_) && !exports.int(_);
    exports.dec = dec;
    const rational = (_) => exports.num(_) && ant.fracable(_);
    exports.rational = rational;
    const irrational = (_) => exports.num(_) && !ant.fracable(_);
    exports.irrational = irrational;
    const odd = (_) => exports.int(_) && Math.abs(ant.correct(_)) % 2 === 1;
    exports.odd = odd;
    const even = (_) => exports.int(_) && Math.abs(ant.correct(_)) % 2 === 0;
    exports.even = even;
    const prob = (_) => exports.num(_) && _ >= 0 && _ <= 1;
    exports.prob = prob;
    const sq = (_) => exports.int(_) && exports.int(Math.sqrt(_));
    exports.sq = sq;
    const positive = (_) => exports.num(_) && _ > 0;
    exports.positive = positive;
    const positiveInt = (_) => exports.int(_) && _ > 0;
    exports.positiveInt = positiveInt;
    const nonNegative = (_) => exports.num(_) && _ >= 0;
    exports.nonNegative = nonNegative;
    const nonNegativeInt = (_) => exports.int(_) && _ >= 0;
    exports.nonNegativeInt = nonNegativeInt;
    const negative = (_) => exports.num(_) && _ < 0;
    exports.negative = negative;
    const negativeInt = (_) => exports.int(_) && _ < 0;
    exports.negativeInt = negativeInt;
    const nonPositive = (_) => exports.num(_) && _ <= 0;
    exports.nonPositive = nonPositive;
    const nonPositiveInt = (_) => exports.int(_) && _ <= 0;
    exports.nonPositiveInt = nonPositiveInt;
    const nonZero = (_) => exports.num(_) && _ !== 0;
    exports.nonZero = nonZero;
    const nonZeroInt = (_) => exports.int(_) && _ !== 0;
    exports.nonZeroInt = nonZeroInt;
    const between = (min, max) => build(`between(${min},${max})`, (_) => exports.num(_) && _ >= min && _ <= max);
    exports.between = between;
    const absBetween = (min, max) => build(`absBetween(${min},${max})`, (_) => exports.num(_) && Math.abs(_) >= min && Math.abs(_) <= max);
    exports.absBetween = absBetween;
    // JS native type
    const str = (_) => typeof _ === 'string';
    exports.str = str;
    const bool = (_) => typeof _ === 'boolean';
    exports.bool = bool;
    const emptyObject = (_) => !!_ && _.constructor === Object && Object.keys(_).length === 0;
    exports.emptyObject = emptyObject;
    const array = (_) => Array.isArray(_);
    exports.array = array;
    const arrayOfLength = (length) => build(`arrayOfLength(${length})`, (_) => exports.array(_) && _.length === length);
    exports.arrayOfLength = arrayOfLength;
    const arrayWith = (predicate) => build(`arrayWith(${predicate.name})`, (_) => exports.array(_) && _.every(predicate));
    exports.arrayWith = arrayWith;
    // Math Types
    const couple = (_) => exports.arrayOfLength(2)(_) && exports.arrayWith(exports.num)(_);
    exports.couple = couple;
    const triple = (_) => exports.arrayOfLength(3)(_) && exports.arrayWith(exports.num)(_);
    exports.triple = triple;
    const ntuple = (_) => exports.arrayWith(exports.num)(_);
    exports.ntuple = ntuple;
    const interval = (_) => exports.couple(_) && _[0] <= _[1];
    exports.interval = interval;
    const point = (_) => exports.couple(_);
    exports.point = point;
    const polar = (_) => exports.couple(_) && _[0] >= 0;
    exports.polar = polar;
    const fraction = (_) => exports.couple(_);
    exports.fraction = fraction;
    const properFraction = (_) => exports.fraction(_) && _[1] !== 0;
    exports.properFraction = properFraction;
    const vector = (_) => exports.couple(_);
    exports.vector = vector;
    const triangleSides = (_) => {
        let [a, b, c] = _;
        return exports.triple(_) &&
            _.every(exports.positive) &&
            a + b > c &&
            b + c > a &&
            c + a > b;
    };
    exports.triangleSides = triangleSides;
    // trivial
    const pass = (_) => true;
    exports.pass = pass;
    const fail = (_) => false;
    exports.fail = fail;
    // relation
    const distinct = (_) => List(_).isDistinct();
    exports.distinct = distinct;
    const distinctBy = (keyFunc) => build('distinctBy_' + (keyFunc.name || keyFunc.toString()), (..._) => List(_, keyFunc).isDistinct());
    exports.distinctBy = distinctBy;
    // special text
    const ineq = (_) => ['>', '<', '>=', '<=', '\\gt', '\\lt', '\\ge', '\\le'].includes(_);
    exports.ineq = ineq;
    const dfrac = (_) => {
        const f = String.raw `-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`;
        return exports.str(_) && _.match(new RegExp(f, 'g'));
    };
    exports.dfrac = dfrac;
    const constraint = (_) => exports.arrayOfLength(4)(_) && exports.num(_[0]) && exports.num(_[1]) && exports.ineq(_[2]) && exports.num(_[3]);
    exports.constraint = constraint;
    const quadrantCode = (_) => [1, 2, 3, 4].includes(_);
    exports.quadrantCode = quadrantCode;
    const quadrantName = (_) => ['I', 'II', 'III', 'IV'].includes(_);
    exports.quadrantName = quadrantName;
    const quadrant = (_) => exports.quadrantCode(_) || exports.quadrantName(_);
    exports.quadrant = quadrant;
    const trig = (_) => ['sin', 'cos', 'tan'].includes(_);
    exports.trig = trig;
    const roman = (_) => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].includes(_);
    exports.roman = roman;
    // functor
    function build(funcName, func) {
        const holder = { [funcName](...args) { return func(...args); } };
        return holder[funcName];
    }
    function and(pds, name) {
        name !== null && name !== void 0 ? name : (name = '(' + pds.map(f => f.name).join(' && ') + ')');
        return build(name, (_) => pds.every(p => p(_)));
    }
    exports.and = and;
    function or(pds, name) {
        name !== null && name !== void 0 ? name : (name = '(' + pds.map(f => f.name).join(' || ') + ')');
        return build(name, (_) => pds.some(p => p(_)));
    }
    exports.or = or;
    function every(pd, name) {
        name !== null && name !== void 0 ? name : (name = '(every.' + pd.name + ')');
        return build(name, (_) => _.every(pd));
    }
    exports.every = every;
});
// let nums = every(num)
