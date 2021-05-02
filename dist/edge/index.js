"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define("index", ["require", "exports", "./Core/index.ts", "./Math/index.ts", "./Pen/index.ts", "./Soil/index.ts"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Core/Dice/index", ["require", "exports", "chance"], function (require, exports, chance_1) {
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
define("Core/Owl/index", ["require", "exports"], function (require, exports) {
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
define("Core/Contract/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.contract = void 0;
    class ContractErrorFactory {
        constructor(host) {
            this.name = host.name;
            this.signature = this.getSignature(host);
        }
        getSignature(func) {
            const fnStr = func.toString();
            return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'));
        }
        ArgBlood(argIndex, argValue, predicate) {
            let i = String(argIndex);
            let v = JSON.stringify(argValue);
            let p = predicate.name || predicate.toString();
            return new Blood('Contract', '(' + this.name + ') arg(' + this.signature + ')[' + i + '] = ' + v + ' violate: ' + p);
        }
        ArgGrpBlood(argValues, predicate) {
            let a = argValues.map(_ => JSON.stringify(_)).join(',');
            let p = predicate.name || predicate.toString();
            return new Blood('Contract', '(' + this.name + ') arg(' + this.signature + ') = (' + a + ') violate: ' + p);
        }
        ReturnBlood(argValues, returnValue, predicate) {
            let v = returnValue;
            let a = argValues.map(_ => JSON.stringify(_)).join(',');
            let p = predicate.name || predicate.toString();
            return new Blood('Contract', '(' + this.name + ') from arg(' + this.signature + ') = (' + a + ') => return = ' + v + ' violate: ' + p);
        }
        CatchBlood(argValues, e) {
            let a = argValues.map(_ => JSON.stringify(_)).join(',');
            return new Blood('Contract', '(' + this.name + ') from arg(' + this.signature + ') = (' + a + ') throw ' + e.name + ' with message:\n' + e.message);
        }
    }
    class Contract {
        constructor(host) {
            this.host = host;
            this.Err = new ContractErrorFactory(host);
        }
        validateArg(f, rules) {
            let policy = rules.map(shieldArray);
            function rule(index) {
                // use the last rule for the rest
                const n = policy.length - 1;
                return policy[Math.min(index, n)];
            }
            const newFunc = (...args) => {
                for (let i = 0; i < args.length; i++) {
                    const arg = args[i];
                    for (let pd of rule(i)) {
                        if (!pd(arg))
                            throw this.Err.ArgBlood(i, arg, pd);
                    }
                }
                return f(...args);
            };
            return newFunc;
        }
        validateArgGrp(f, argRule) {
            let r = shieldArray(argRule);
            const newFunc = (...args) => {
                for (let pd of r) {
                    if (!pd(...args))
                        throw this.Err.ArgGrpBlood(args, pd);
                }
                return f(...args);
            };
            return newFunc;
        }
        validateReturn(f, rule) {
            let r = shieldArray(rule);
            const newFunc = (...args) => {
                const result = f(...args);
                for (let pd of r) {
                    if (!pd(result))
                        throw this.Err.ReturnBlood(args, result, pd);
                }
                return result;
            };
            return newFunc;
        }
        validateCatch(f) {
            const newFunc = (...args) => {
                try {
                    return f(...args);
                }
                catch (e) {
                    throw this.Err.CatchBlood(args, e);
                }
            };
            return newFunc;
        }
        sign(arg, ret) {
            return this.seal({ arg, ret });
        }
        seal({ arg, args, ret }) {
            let f = this.host;
            f = this.validateCatch(f);
            if (ret !== undefined)
                f = this.validateReturn(f, ret);
            if (args !== undefined)
                f = this.validateArgGrp(f, args);
            if (arg !== undefined && arg.length > 0)
                f = this.validateArg(f, arg);
            return f;
        }
    }
    function shieldArray(_) {
        return Array.isArray(_) ? _ : [_];
    }
    function contract(f) {
        return new Contract(f);
    }
    exports.contract = contract;
});
define("Core/Ant/index", ["require", "exports", "decimal.js", "mathjs"], function (require, exports, decimal_js_1, mathjs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logFloor = exports.logCeil = exports.mantissa = exports.e = exports.simpFrac = exports.ratio = exports.fracable = exports.nearFrac = exports.sd = exports.median = exports.mode = exports.mean = exports.sum = exports.nPr = exports.fac = exports.nCr = exports.lcm = exports.hcf = exports.dp = exports.sigfig = exports.fix = exports.round = exports.correct = exports.blur = void 0;
    const STANDARD_SIGFIG = 12;
    /**
     * use for blurring value in-place to avoid things like 0.300000000004
     */
    function blur(num) {
        return parseFloat(num.toPrecision(STANDARD_SIGFIG));
    }
    exports.blur = blur;
    /**
     * use for bluring value for checking things like integer and equality
     * 2-digit less accurate that blur
     */
    function correct(num) {
        return parseFloat(num.toPrecision(STANDARD_SIGFIG - 2));
    }
    exports.correct = correct;
    function round(num, sigfig = 3) {
        const exec = (mode) => (new decimal_js_1.Decimal(num))
            .toSignificantDigits(sigfig, mode)
            .toNumber();
        return {
            off: () => exec(decimal_js_1.Decimal.ROUND_HALF_UP),
            up: () => exec(decimal_js_1.Decimal.ROUND_UP),
            down: () => exec(decimal_js_1.Decimal.ROUND_DOWN),
        };
    }
    exports.round = round;
    function fix(num, dp = 0) {
        const exec = (mode) => (new decimal_js_1.Decimal(num))
            .toNearest(Number('1e' + String(-dp)), mode)
            .toNumber();
        return {
            off: () => exec(decimal_js_1.Decimal.ROUND_HALF_UP),
            up: () => exec(decimal_js_1.Decimal.ROUND_UP),
            down: () => exec(decimal_js_1.Decimal.ROUND_DOWN),
        };
    }
    exports.fix = fix;
    function sigfig(num) {
        return (new decimal_js_1.Decimal(num)).precision(false);
    }
    exports.sigfig = sigfig;
    ;
    function dp(num) {
        return (new decimal_js_1.Decimal(num)).decimalPlaces();
    }
    exports.dp = dp;
    ;
    function hcf(...integers) {
        return mathjs_1.gcd(...integers);
    }
    exports.hcf = hcf;
    function lcm(...integers) {
        // wrong @type file
        // @ts-ignore
        return mathjs_1.lcm(...integers);
    }
    exports.lcm = lcm;
    function nCr(n, r) {
        return mathjs_1.combinations(n, r);
    }
    exports.nCr = nCr;
    function fac(n) {
        return mathjs_1.factorial(n);
    }
    exports.fac = fac;
    function nPr(n, r) {
        return mathjs_1.permutations(n, r);
    }
    exports.nPr = nPr;
    function sum(...nums) {
        if (nums.length === 0)
            return 0;
        return mathjs_1.sum(...nums);
    }
    exports.sum = sum;
    function mean(...nums) {
        return mathjs_1.mean(...nums);
    }
    exports.mean = mean;
    function mode(...nums) {
        return mathjs_1.mode(...nums);
    }
    exports.mode = mode;
    function median(...nums) {
        return mathjs_1.median(...nums);
    }
    exports.median = median;
    function sd(...nums) {
        return mathjs_1.std(nums, 'uncorrected');
    }
    exports.sd = sd;
    function nearFrac(num, maxDenominator = 1000) {
        let f = (new decimal_js_1.Decimal(num)).toFraction(maxDenominator);
        return [f[0].toNumber(), f[1].toNumber()];
    }
    exports.nearFrac = nearFrac;
    function fracable(num, maxDenominator = 1000) {
        let [p, q] = nearFrac(num, maxDenominator);
        return correct(num * q) === p;
    }
    exports.fracable = fracable;
    function ratio(...rationals) {
        if (rationals.some(owl.irrational))
            throw new Blood('Ant', 'ratio only accept rationals');
        let fs = rationals.map(_ => nearFrac(_));
        let qs = fs.map(_ => _[1]);
        let l = lcm(...qs);
        let ns = rationals.map(_ => _ * l).map(blur);
        let h = hcf(...ns);
        ns = ns.map(_ => _ / h);
        return ns.map(blur);
    }
    exports.ratio = ratio;
    function simpFrac(p, q) {
        return nearFrac(p / q, q + 10);
    }
    exports.simpFrac = simpFrac;
    function e(num) {
        return Number(num.toExponential().split('e')[1]);
    }
    exports.e = e;
    function mantissa(num) {
        return Number(num.toExponential().split('e')[0]);
    }
    exports.mantissa = mantissa;
    function logCeil(num) {
        let exp = e(num) + 1;
        return Number('1e' + exp);
    }
    exports.logCeil = logCeil;
    function logFloor(num) {
        let exp = e(num);
        return Number('1e' + exp);
    }
    exports.logFloor = logFloor;
});
define("Core/Ink/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseDfrac = exports.printDfrac = exports.parseIneq = exports.printIneq = void 0;
    function printIneq(greater, equal) {
        if (greater && equal)
            return '\\ge';
        if (greater && !equal)
            return '\\gt';
        if (!greater && equal)
            return '\\le';
        if (!greater && !equal)
            return '\\lt';
        throw 'never';
    }
    exports.printIneq = printIneq;
    function parseIneq(text) {
        let greater = text.includes('g') || text.includes('>');
        let equal = text.includes('e') || text.includes('=');
        return [greater, equal];
    }
    exports.parseIneq = parseIneq;
    function printDfrac(numerator, denominator, upSign = false) {
        let p = numerator;
        let q = denominator;
        if (p === 0)
            return '0';
        [p, q] = ant.simpFrac(p, q);
        if (q === 1)
            return p.toString();
        if (upSign) {
            return '\\dfrac{' + p + '}{' + q + '}';
        }
        else {
            return p > 0 ?
                '\\dfrac{' + p + '}{' + q + '}' :
                '-\\dfrac{' + Math.abs(p) + '}{' + q + '}';
        }
    }
    exports.printDfrac = printDfrac;
    function parseDfrac(dfrac) {
        if (!owl.dfrac(dfrac))
            throw 'not dfrac';
        const d = String.raw `-?\d+\.?\d*`;
        const f = String.raw `-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`;
        dfrac = dfrac.match(new RegExp(f, 'g'))[0];
        const matches = dfrac.match(new RegExp(d, 'g'));
        const u = dfrac.charAt(0) === '-' ? -1 : 1;
        const p = Number(matches[0]) * u;
        const q = Number(matches[1]);
        if (!(owl.num(p) && owl.num(q)))
            throw 'fail to parse dfrac';
        return [p, q];
    }
    exports.parseDfrac = parseDfrac;
});
define("Core/Blood/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Blood extends Error {
        constructor(name, message) {
            super(message);
            this.name = name + 'Error';
        }
    }
    globalThis.Blood = Blood;
});
define("Core/List/index", ["require", "exports", "lodash"], function (require, exports, lodash_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Clone = void 0;
    lodash_1 = __importDefault(lodash_1);
    function Clone(object) {
        return lodash_1.default.cloneDeep(object);
    }
    exports.Clone = Clone;
    class ListCls extends Array {
        constructor(arr, keyFunc = x => JSON.stringify(x)) {
            super();
            this.push(...arr);
            this.key = keyFunc;
        }
        isDistinct() {
            return this.length === this.distinctLength();
        }
        distinctLength() {
            return this.distinct().length;
        }
        distinct() {
            return lodash_1.default.uniqBy(this, this.key);
        }
        pairs() {
            let len = this.length;
            let arr = [];
            for (let i = 0; i < len; i++) {
                for (let j = i + 1; j < len; j++) {
                    arr.push([this[i], this[j]]);
                }
            }
            return arr;
        }
        pairsEvery(relation) {
            return this.pairs().every(p => relation(p[0], p[1]));
        }
        pluck(index) {
            return this.map(x => x[index]);
        }
    }
    function List(arr, keyFunc = x => JSON.stringify(x)) {
        return new ListCls(arr, keyFunc);
    }
    globalThis.List = List;
});
define("Core/index", ["require", "exports", "Core/Dice/index", "Core/Owl/index", "Core/Contract/index", "Core/Ant/index", "Core/Ink/index", "Core/Blood/index", "Core/List/index"], function (require, exports, DiceObj, OwlObj, ContractObj, AntObj, InkObj) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    DiceObj = __importStar(DiceObj);
    OwlObj = __importStar(OwlObj);
    ContractObj = __importStar(ContractObj);
    AntObj = __importStar(AntObj);
    InkObj = __importStar(InkObj);
    globalThis.dice = DiceObj;
    globalThis.owl = OwlObj;
    globalThis.contract = ContractObj.contract;
    globalThis.ant = AntObj;
    globalThis.ink = InkObj;
});
define("Core/Ant/ant.test", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('sigfig', () => {
        const cases = [
            [1, 1],
            [12, 2],
            [123, 3],
            [123.4, 4],
            [123.45, 5],
            [123.456, 6],
            [0.123, 3],
            [0.00123, 3],
            [0.00001230123, 7],
            [10, 1],
            [1200, 2],
            [1200.0001, 8],
            [1200.0001000, 8],
            [-1200.0001, 8],
            [0.81 - 1, 17],
            [Math.pow(1.1, 2), 17], //1.2100000000000002
        ];
        it.each(cases)('sigfig(%p)', (num, expected) => {
            expect(ant.sigfig(num)).toBe(expected);
        });
    });
    describe('dp', () => {
        const cases = [
            [1, 0],
            [12, 0],
            [123, 0],
            [123.4, 1],
            [123.45, 2],
            [123.456, 3],
            [0.123, 3],
            [0.00123, 5],
            [0.00001230123, 11],
            [10, 0],
            [1200, 0],
            [1200.0001, 4],
            [1200.0001000, 4],
            [-1200.0001, 4],
            [0.81 - 1, 17],
            [Math.pow(1.1, 2), 16], //1.2100000000000002
        ];
        it.each(cases)('dp(%p)', (num, expected) => {
            expect(ant.dp(num)).toBe(expected);
        });
    });
    describe('e', () => {
        const cases = [
            [1, 0],
            [1.001, 0],
            [0.999, -1],
            [10, 1],
            [10.01, 1],
            [9.999, 0],
            [0.1, -1],
            [0.10001, -1],
            [0.09999, -2],
            [-1.001, 0],
            [-0.999, -1],
        ];
        it.each(cases)('e(%p)', (num, expected) => {
            expect(ant.e(num)).toBe(expected);
        });
    });
    describe('mantissa', () => {
        const cases = [
            [1.234, 1.234],
            [1234, 1.234],
            [0.1234, 1.234],
            [0, 0],
            [-0.1234, -1.234],
        ];
        it.each(cases)('mantissa(%p)', (num, expected) => {
            expect(ant.mantissa(num)).toBe(expected);
        });
    });
    describe('logCeil logFloor', () => {
        const cases = [
            [5, 10, 1],
            [23, 100, 10],
            [0.456, 1, 0.1],
            [0.00235, 0.01, 0.001],
        ];
        it.each(cases)('logCeil logFloor(%p)', (num, ceil, floor) => {
            expect(ant.logCeil(num)).toBe(ceil);
            expect(ant.logFloor(num)).toBe(floor);
        });
    });
});
define("Core/Contract/contract.test", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('contract', () => {
        let add = function (a, b, c = 0) {
            if (a > 100)
                throw Error('a is too large!');
            return a + b + c;
        };
        add = contract(add).seal({
            arg: [owl.positive, owl.negative],
            args: function distinct(a, b, c) { return owl.distinct([a, b, c]); },
            ret: owl.positive
        });
        let cases = [
            [-5, 1, 2, '(add) arg(a, b, c = 0)[0] = -5 violate: positive'],
            [3, 1, 2, '(add) arg(a, b, c = 0)[1] = 1 violate: negative'],
            [3, -1, 2, '(add) arg(a, b, c = 0)[2] = 2 violate: negative'],
            [3, -1, -1, '(add) arg(a, b, c = 0) = (3,-1,-1) violate: distinct'],
            [3, -1, -4, '(add) from arg(a, b, c = 0) = (3,-1,-4) => return = -2 violate: positive'],
            [999, -1, -2, '(add) from arg(a, b, c = 0) = (999,-1,-2) throw Error with message:\na is too large!']
        ];
        it.each(cases)('throw on invalid input or return', (a, b, c, msg) => {
            expect(() => add(Number(a), Number(b), Number(c))).toThrowWithMessage(Error, String(msg));
        });
        cases = [
            [10, -1, -4, 5],
        ];
        it.each(cases)('return when valid', (a, b, c, ans) => {
            expect(add(Number(a), Number(b), Number(c))).toBe(Number(ans));
        });
    });
});
// import * as Dice from './index'
// import _ from 'lodash'
// describe('integer', () => {
//     let arr = Array.from({ length: 100 }, () => Dice.integer(20, 30))
//     it('is within range', () => {
//         expect(_.range(20, 31)).toIncludeAllMembers(arr)
//     });
//     it('span the range', () => {
//         expect(arr).toIncludeAllMembers(_.range(20, 31))
//     });
// });
// describe('real', () => {
//     let arr = Array.from({ length: 100 }, () => Dice.real(20, 30))
//     it('is within range', () => {
//         expect(arr).toSatisfyAll(x => x >= 20 && x <= 30)
//     });
//     it('span the range', () => {
//         expect(arr.some(x => x < 21)).toBeTrue()
//         expect(arr.some(x => x > 29)).toBeTrue()
//     });
// });
define("Math/chance", ["require", "exports", "chance"], function (require, exports, chance_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chance = new chance_2.Chance();
    globalThis.chance = chance;
});
define("Math/index", ["require", "exports", "./Code/Assertion.ts", "./Code/Combinatorics.ts", "./Code/Flow.ts", "./Code/Fraction.ts", "./Code/Function.ts", "./Code/Geometry.ts", "./Code/LinearProgram.ts", "./Code/Numeracy.ts", "./Code/PhyConst.ts", "./Code/Random.ts", "./Code/RandomShake.ts", "./Code/RandomUtil.ts", "./Code/Relation.ts", "./Code/Sequence.ts", "./Code/Stat.ts", "./Code/Text.ts", "./Code/Triangle.ts", "./Code/Trigonometry.ts", "./Code/Utility.ts", "./Code/Vector.ts", "./Algebra/Algebra.ts", "./Algebra/Circle.ts", "./Algebra/Quadratic.ts", "./Algebra/Linear.ts", "./should.ts", "./chance.ts"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
var SHOULD_LOG = false;
globalThis.SHOULD_LOG = SHOULD_LOG;
class CustomErrorCls extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}
function CustomError(name, message) {
    return new CustomErrorCls(name, message);
}
globalThis.CustomError = CustomError;
function MathError(message) {
    return new CustomErrorCls('MathError', message);
}
globalThis.MathError = MathError;
function Should(condition, msg = "Should condition failed!") {
    if (!condition) {
        let caller = (new Error()).stack.split("\n")[2].trim().split(" ")[1];
        // let caller = 'function'
        caller = caller !== null && caller !== void 0 ? caller : 'Anonymous ';
        throw MathError(caller + ': ' + msg);
    }
}
globalThis.Should = Should;
/**
 * @category Algebra
 * @return solve [x,y] from ax+by=c and px+qy=r.
 * ```
 * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * Crammer(1,1,3,2,2,6) // throw
 * ```
 */
function Crammer(a, b, c, p, q, r) {
    const D = a * q - b * p;
    const x = (c * q - b * r) / D;
    const y = (a * r - c * p) / D;
    return [x, y];
}
globalThis.Crammer = contract(Crammer).seal({
    arg: [owl.num],
    args: function has_unique_solution(a, b, c, p, q, r) { return a * q - b * p !== 0; }
});
/**
 * @category Algebra
 * @return the product of two input polynomials.
 * ```
 * // do (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
 * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
 * ```
 */
function xPolynomial(poly1, poly2) {
    const deg1 = poly1.length - 1;
    const deg2 = poly2.length - 1;
    const deg = deg1 + deg2;
    const result = Array(deg + 1).fill(0);
    for (let i = 0; i <= deg1; i++) {
        for (let j = 0; j <= deg2; j++) {
            result[i + j] += poly1[i] * poly2[j];
        }
    }
    return result;
}
globalThis.xPolynomial = contract(xPolynomial).sign([[
        owl.ntuple,
        function non_zero_leading_coeff(_) { return _[0] !== 0; }
    ]]);
/**
 * @category Algebra
 * @return the points along the parametric curve
 * ```
 * Trace(x => x ** 2, 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * Trace(t => [t,t**2], 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * ```
 */
function Trace(func, tStart, tEnd, dots = 1000) {
    const tracer = (t) => {
        let result;
        try {
            result = func(t);
        }
        catch (_a) {
            return [NaN, NaN];
        }
        if (!Array.isArray(result))
            result = [t, result];
        return result;
    };
    const step = (tEnd - tStart) / (dots - 1);
    let points = [];
    for (let t = tStart; t <= tEnd; t += step) {
        points.push(tracer(t));
    }
    return points;
}
globalThis.Trace = contract(Trace).sign([owl.pass, owl.num, owl.num, owl.positiveInt]);
/**
 * @category Circle
 * @return D,E,F of circle general form
 * ```
 * CircleGeneral([2,3],5) // [-4,-6,-12]
 * ```
 */
function CircleGeneral(centre, radius) {
    let [h, k] = centre;
    let r = radius;
    let D = -2 * h;
    let E = -2 * k;
    let F = Math.pow(h, 2) + Math.pow(k, 2) - Math.pow(r, 2);
    return [D, E, F];
}
globalThis.CircleGeneral = contract(CircleGeneral).sign([owl.point, owl.positive]);
/**
 * @category Circle
 * @return centre and radius from general form
 * ```
 * CircleFromGeneral(-4,-6,-12) // [[2,3],5]
 * ```
 */
function CircleFromGeneral(D, E, F) {
    let [h, k] = [-D / 2, -E / 2];
    let R = Math.pow((D / 2), 2) + Math.pow((E / 2), 2) - F;
    Should(R >= 0, "radius should be real");
    let r = Math.pow(R, 0.5);
    return [[h, k], r];
}
globalThis.CircleFromGeneral = contract(CircleFromGeneral).sign([owl.num]);
/**
 * @category Circle
 * @return all integral points on the circle
 * ```
 * IntegralOnCircle([0,0],5) // [[[5,0],[0,5],[-5,0],[0,-5]],[[4,3],[-3,4],[-4,-3],[3,-4]],[[3,4],[-4,3],[-3,-4],[4,-3]]]
 * ```
 */
function IntegralOnCircle(centre, radius) {
    let [h, k] = centre;
    let r = radius;
    let [xmin, xmax] = [Floor(h - r), Ceil(h + r)];
    let [ymin, ymax] = [Floor(k - r), Ceil(k + r)];
    let arr = [];
    for (let x = xmin; x <= xmax; x++) {
        for (let y = ymin; y <= ymax; y++) {
            let P = [x, y];
            if (Abs(Math.pow(Distance(centre, P), 2) - Math.pow(r, 2)) <= 10 * Number.EPSILON)
                arr.push(P);
        }
    }
    arr = SortBy(arr, (p) => VectorArg(Vector([h, k], p)));
    let order = arr.length / 4;
    let arr2 = [];
    for (let i = 0; i < order; i++) {
        let temp = [];
        for (let j = 0; j < 4; j++) {
            temp.push(arr[i + order * j]);
        }
        arr2.push(temp);
    }
    return arr2;
}
globalThis.IntegralOnCircle = contract(IntegralOnCircle).sign([owl.point, owl.positive]);
/**
 * @category Linear
 * @return [x-int,y-int,slope] of ax+by+c=0
 * ```
 * LinearFeature(2,4,6) // [-3,-1.5,-0.5]
 * LinearFeature(0,4,6) // throw
 * ```
 */
function LinearFeature(a, b, c) {
    let x = -c / a;
    let y = -c / b;
    let m = -a / b;
    return [x, y, m];
}
globalThis.LinearFeature = contract(LinearFeature).sign([owl.nonZero, owl.nonZero, owl.num]);
/**
 * @category Linear
 * @return [slope,yInt] from ax+by+c=0
 * ```
 * LineFromLinear(2,4,6) // [-0.5,-1.5]
 * LineFromLinear(0,4,6) // [0,-1.5]
 * ```
 */
function LineFromLinear(a, b, c) {
    let m = -a / b;
    let y = -c / b;
    return [m, y];
}
globalThis.LineFromLinear = contract(LineFromLinear).sign([owl.num, owl.nonZero, owl.num]);
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from given intercepts
 * ```
 * LinearFromIntercepts(1,2) // [2,1,-2]
 * LinearFromIntercepts(0,2) // throw
 * ```
 */
function LinearFromIntercepts(xInt, yInt) {
    return LF().byIntercepts(xInt, yInt).linear();
}
globalThis.LinearFromIntercepts = contract(LinearFromIntercepts).sign();
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from two given points
 * ```
 * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
 * LinearFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
function LinearFromTwoPoints(point1, point2) {
    return LF().byTwoPoints(point1, point2).linear();
}
globalThis.LinearFromTwoPoints = contract(LinearFromTwoPoints).sign();
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from point and slope
 * ```
 * LinearFromPointSlope([1,2],3) // [3,-1,-1]
 * LinearFromPointSlope([1,2],0) // [0,1,-2]
 * ```
 */
function LinearFromPointSlope(point, slope) {
    return LF().byPointSlope(point, slope).linear();
}
globalThis.LinearFromPointSlope = contract(LinearFromPointSlope).sign();
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from perpendicular bisector of AB
 * ```
 * LinearFromBisector([1,2],[3,4]) // [1,1,-5]
 * LinearFromBisector([1,2],[1,4]) // [0,1,-3]
 * ```
 */
function LinearFromBisector(A, B) {
    return LF().byBisector(A, B).linear();
}
globalThis.LinearFromBisector = contract(LinearFromBisector).sign();
/**
 * @category Linear
 * @return [slope,yInt] from given intercepts
 * ```
 * LineFromIntercepts(1,2) // [-2,2]
 * LineFromIntercepts(0,2) // throw
 * ```
 */
function LineFromIntercepts(xInt, yInt) {
    return LF().byIntercepts(xInt, yInt).line();
}
globalThis.LineFromIntercepts = contract(LineFromIntercepts).sign();
/**
 * @category Linear
 * @return [slope,yInt] from two given points
 * ```
 * LineFromTwoPoints([1,2],[3,4]) // [1,1]
 * LineFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
function LineFromTwoPoints(point1, point2) {
    return LF().byTwoPoints(point1, point2).line();
}
globalThis.LineFromTwoPoints = contract(LineFromTwoPoints).sign();
/**
 * @category Linear
 * @return [slope,yInt] from point and slope
 * ```
 * LineFromPointSlope([1,2],3) // [3,-1]
 * LineFromPointSlope([1,2],0) // [0,2]
 * ```
 */
function LineFromPointSlope(point, slope) {
    return LF().byPointSlope(point, slope).line();
}
globalThis.LineFromPointSlope = contract(LineFromPointSlope).sign();
/**
 * @category Linear
 * @return [slope,yInt] from perpendicular bisector of AB
 * ```
 * LineFromBisector([1,2],[3,4]) // [-1,5]
 * LineFromBisector([1,2],[1,4]) // [0,3]
 * ```
 */
function LineFromBisector(A, B) {
    return LF().byBisector(A, B).line();
}
globalThis.LineFromBisector = contract(LineFromBisector).sign();
/**
 * @ignore
 */
class LinearFunction {
    constructor() {
        this._linear = [NaN, NaN, NaN];
    }
    // define
    byTwoPoints(p1, p2) {
        Should(owl.point(p1) && owl.point(p2), 'input must be point');
        Should(AreDistinctPoint(p1, p2), 'two points should be distinct');
        let [x1, y1] = p1;
        let [x2, y2] = p2;
        let dx = x1 - x2;
        let dy = y1 - y2;
        let [a, b, c] = [dy, -dx, dx * y1 - dy * x1];
        let s = Sign(a);
        if (s === 0)
            s = Sign(b);
        if (s === 0)
            s = 1;
        [a, b, c] = [a * s, b * s, c * s];
        try {
            [a, b, c] = IntegerRatio(a, b, c);
        }
        catch (_a) {
        }
        this._linear = [a, b, c];
        this.refresh();
        return this;
    }
    byPointSlope(p, m) {
        Should(owl.point(p), 'input must be point');
        let p2 = [p[0] + 1, p[1] + m];
        this.byTwoPoints(p, p2);
        return this;
    }
    byIntercepts(x, y) {
        Should(IsNum(x, y), "input must be num");
        Should(IsNonZero(x, y), 'intercepts cannot be zero');
        this.byTwoPoints([x, 0], [0, y]);
        return this;
    }
    byBisector(A, B) {
        Should(owl.point(A) && owl.point(B), 'input must be point');
        Should(AreDistinctPoint(A, B), 'two points should be distinct');
        if (A[0] === B[0]) {
            this._linear = [0, 1, -(A[1] + B[1]) / 2];
            this.refresh();
        }
        else if (A[1] === B[1]) {
            this._linear = [1, 0, -(A[0] + B[0]) / 2];
            this.refresh();
        }
        else {
            let m = -1 / Slope(A, B);
            let M = MidPoint(A, B);
            this.byPointSlope(M, m);
        }
        return this;
    }
    byLinear(linear) {
        this._linear = linear;
        this.refresh();
        return this;
    }
    refresh() {
        let [a, b, c] = this._linear;
    }
    linear() {
        return this._linear;
    }
    line() {
        return LineFromLinear(...this.linear());
    }
}
/**
 * @ignore
 */
function LF() {
    return new LinearFunction();
}
/**
 * @category Quadratic
 * @return the discriminant b^2-4ac.
 * ```
 * Discriminant(2,3,4) // -23
 * ```
 */
function Discriminant(a, b, c) {
    return b * b - 4 * a * c;
}
globalThis.Discriminant = contract(Discriminant).sign([owl.nonZero, owl.num, owl.num]);
/**
 * @category Quadratic
 * @return the roots [p,q] of ax^2+bx+c=0 where p<=q
 * ```
 * QuadraticRoot(1,2,-3) // [-3,1]
 * QuadraticRoot(1,2,3) // throw when no real root
 * ```
 */
function QuadraticRoot(a, b, c) {
    const d = Discriminant(a, b, c);
    const s = Math.sqrt(d);
    const r1 = Divide(-b - s, 2 * a);
    const r2 = Divide(-b + s, 2 * a);
    return [Min(r1, r2), Max(r1, r2)];
}
globalThis.QuadraticRoot = contract(QuadraticRoot).seal({
    arg: [owl.nonZero, owl.num, owl.num],
    args: function has_real_root(a, b, c) { return Math.pow(b, 2) - 4 * a * c >= 0; }
});
/**
 * @category Quadratic
 * @return the vertex [h,k] of y=ax^2+bx+c.
 * ```
 * QuadraticVertex(1,2,3) // [-1,2]
 * ```
 */
function QuadraticVertex(a, b, c) {
    const h = Divide(-b, 2 * a);
    const k = a * h * h + b * h + c;
    return [h, k];
}
globalThis.QuadraticVertex = contract(QuadraticVertex).sign([owl.nonZero, owl.num, owl.num]);
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and roots p and q.
 * ```
 * QuadraticFromRoot(1,2,3) // [1,-5,6]
 * QuadraticFromRoot(-2,4,-3) // [-2,2,24]
 * ```
 */
function QuadraticFromRoot(a, p, q) {
    return [a, -a * (p + q), a * p * q];
}
globalThis.QuadraticFromRoot = contract(QuadraticFromRoot).sign([owl.nonZero, owl.num, owl.num]);
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and vertex (h,k).
 * ```
 * QuadraticFromVertex(1,2,3) // [1,-4,7]
 * QuadraticFromVertex(-2,4,-3) // [-2,16,-35]
 * ```
 */
function QuadraticFromVertex(a, h, k) {
    const b = -2 * a * h;
    const c = k - a * h * h - b * h;
    return [a, b, c];
}
globalThis.QuadraticFromVertex = contract(QuadraticFromVertex).sign([owl.nonZero, owl.num, owl.num]);
/**
 * @category Assertion
 * @return check is a finite number.
 * ```
 * IsNum(1.23) // true
 * IsNum(NaN) // false
 * IsNum(Infinity) // false
 * IsNum('2') // false
 * ```
 */
function IsNum(...items) {
    return items.every(owl.num);
}
globalThis.IsNum = IsNum;
/**
 * @category Assertion
 * @return check is an integer.
 * ```
 * IsInteger(5) // true
 * IsInteger(0.5) // false
 * ```
 */
function IsInteger(...items) {
    return items.every(owl.int);
}
globalThis.IsInteger = IsInteger;
/**
 * @category Assertion
 * @return check is a decimal (non-integer).
 * ```
 * IsDecimal(0.5) // true
 * IsDecimal(5) // false
 * ```
 */
function IsDecimal(...items) {
    return items.every(owl.dec);
}
globalThis.IsDecimal = IsDecimal;
/**
 * @category Assertion
 * @return check is a rational number with denominator <= 1000.
 * ```
 * IsRational(0.5) // true
 * IsRational(-5) // true
 * IsRational(Math.sqrt(2)) // false
 * ```
 */
function IsRational(...items) {
    return items.every(owl.rational);
}
globalThis.IsRational = IsRational;
/**
 * @category Assertion
 * @ignore
 * @deprecated
 * @return check is an integer but not -1, 0 or 1.
 * ```
 * IsCoeff(2) // true
 * IsCoeff(-1) // false
 * ```
 */
function IsCoeff(...items) {
    return items.every(x => IsInteger(x) && ![-1, 0, 1].includes(ant.blur(x)));
}
globalThis.IsCoeff = IsCoeff;
/**
 * @category Assertion
 * @return check is an odd integer.
 * ```
 * IsOdd(5) // true
 * IsOdd(-5) // true
 * IsOdd(4) // false
 * ```
 */
function IsOdd(...items) {
    return items.every(owl.odd);
}
globalThis.IsOdd = IsOdd;
/**
 * @category Assertion
 * @return check is an even integer.
 * ```
 * IsEven(4) // true
 * IsEven(-4) // true
 * IsEven(0) // true
 * IsEven(5) // false
 * ```
 */
function IsEven(...items) {
    return items.every(owl.even);
}
globalThis.IsEven = IsEven;
/**
 * @category Assertion
 * @return check is in range [0,1].
 * ```
 * IsProbability(0) // true
 * IsProbability(0.5467) // true
 * IsProbability(1.1) // false
 * IsProbability(-0.1) // false
 * ```
 */
function IsProbability(...items) {
    return items.every(owl.prob);
}
globalThis.IsProbability = IsProbability;
/**
 * @category Assertion
 * @return check is a square number.
 * ```
 * IsSquareNum(9) // true
 * IsSquareNum(10) // false
 * IsSquareNum(-9) // false
 * ```
 */
function IsSquareNum(...items) {
    return items.every(owl.sq);
}
globalThis.IsSquareNum = IsSquareNum;
/**
 * @category Assertion
 * @return check is positive.
 * ```
 * IsPositive(2) // true
 * IsPositive(0) // false
 * IsPositive(-2) // false
 * ```
 */
function IsPositive(...items) {
    return items.every(owl.positive);
}
globalThis.IsPositive = IsPositive;
/**
 * @category Assertion
 * @return check is non-negative.
 * ```
 * IsNonNegative(2) // true
 * IsNonNegative(0) // true
 * IsNonNegative(-2) // false
 * IsNonNegative(1.5) // true
 * ```
 */
function IsNonNegative(...items) {
    return items.every(owl.nonNegative);
}
globalThis.IsNonNegative = IsNonNegative;
/**
 * @category Assertion
 * @return check is a positive integer.
 * ```
 * IsPositiveInteger(2) // true
 * IsPositiveInteger(0) // false
 * IsPositiveInteger(-2) // false
 * IsPositiveInteger(1.5) // false
 * ```
 */
function IsPositiveInteger(...items) {
    return items.every(owl.positiveInt);
}
globalThis.IsPositiveInteger = IsPositiveInteger;
/**
 * @category Assertion
 * @return check is a non-negative integer.
 * ```
 * IsNonNegativeInteger(2) // true
 * IsNonNegativeInteger(0) // true
 * IsNonNegativeInteger(-2) // false
 * IsNonNegativeInteger(1.5) // false
 * ```
 */
function IsNonNegativeInteger(...items) {
    return items.every(owl.nonNegativeInt);
}
globalThis.IsNonNegativeInteger = IsNonNegativeInteger;
/**
 * @category Assertion
 * @return check is negative.
 * ```
 * IsNegative(-2) // true
 * IsNegative(0) // false
 * IsNegative(2) // false
 * ```
 */
function IsNegative(...items) {
    return items.every(owl.negative);
}
globalThis.IsNegative = IsNegative;
/**
 * @category Assertion
 * @return check is non-zero finite number.
 * ```
 * IsNonZero(2) // true
 * IsNonZero(0) // false
 * IsNonZero(-2) // true
 * ```
 */
function IsNonZero(...items) {
    return items.every(owl.nonZero);
}
globalThis.IsNonZero = IsNonZero;
/**
 * @category Assertion
 * @return check is between min and max inclusive.
 * ```
 * IsBetween(2,5)(3) // true
 * IsBetween(2,5)(2) // true
 * IsBetween(2,5)(1) // false
 * ```
 */
function IsBetween(min, max) {
    return (...items) => items.every(owl.between(min, max));
}
globalThis.IsBetween = contract(IsBetween).seal({
    arg: [owl.num],
    args: function is_range(min, max) { return min < max; }
});
/**
 * @category Assertion
 * @return check if its abs is between min and max inclusive.
 * ```
 * IsAbsBetween(2,5)(-3) // true
 * IsAbsBetween(2,5)(-2) // true
 * IsAbsBetween(2,5)(1) // false
 * ```
 */
function IsAbsBetween(min, max) {
    return (...items) => items.every(owl.absBetween(min, max));
}
globalThis.IsAbsBetween = contract(IsAbsBetween).seal({
    arg: [owl.nonNegative],
    args: function is_range(min, max) { return min < max; }
});
/**
 * @category Assertion
 * @return Check if the points are chessboard around anchor.
 * ```
 * IsAroundPoint([0,0],2)([2,2]) // true
 * IsAroundPoint([0,0],2)([3,0]) // false
 * ```
 */
function IsAroundPoint(anchor, range) {
    return (...points) => points.every(p => ChessboardDistance(anchor, p) <= range);
}
globalThis.IsAroundPoint = contract(IsAroundPoint).sign([owl.point, owl.positive]);
/**
 * @category Assertion
 * @return Check if the array of legnths can form a triangle
 * ```
 * IsTriangle([1,1,1]) // true
 * IsTriangle([6,7,8]) // true
 * IsTriangle([1,2,3]) // false
 * IsTriangle([6,14,8]) // false
 * ```
 */
function IsTriangle(...triangles) {
    return triangles.every(owl.triangleSides);
}
globalThis.IsTriangle = contract(IsTriangle).sign([owl.triple]);
/**
 * @category Combinatorics
 * @return the factorial n!
 * ```
 * Factorial(5) // 120
 * Factorial(1.5) // throw
 * ```
 */
function Factorial(n) {
    return ant.fac(n);
}
globalThis.Factorial = contract(Factorial).sign([owl.nonNegativeInt]);
/**
 * @category Combinatorics
 * @return nCr
 * ```
 * nCr(5,3) // 10
 * ```
 */
function nCr(n, r) {
    return ant.nCr(n, r);
}
globalThis.nCr = contract(nCr).sign([owl.nonNegativeInt]);
/**
 * @category Combinatorics
 * @return nPr
 * ```
 * nPr(5,3) // 60
 * ```
 */
function nPr(n, r) {
    return ant.nPr(n, r);
}
globalThis.nPr = contract(nPr).sign([owl.nonNegativeInt]);
/**
* @category Flow
* @return a random config of a Combo Options question type.
* ```typescript
* RndComboConfig()
* // may return {
* //   truth: [true, true, false],
* //   choices: ["I and II", "I only", "I and III", "I, II and III"],
* //   sections: [[1,1], [2,1], [3,0]]
* //  }
* // truth: the true value of the 3 options.
* // choices: for filling in the 4 answer choices, the 1st is correct.
* // sections: the sections object for section versioning, version 0 is false, version 1 is true.
* ```
*/
function RndComboConfig() {
    function convertBool(n) {
        if (n === 0)
            return [false, false, false];
        if (n === 1)
            return [false, false, true];
        if (n === 2)
            return [false, true, false];
        if (n === 3)
            return [false, true, true];
        if (n === 4)
            return [true, false, false];
        if (n === 5)
            return [true, false, true];
        if (n === 6)
            return [true, true, false];
        if (n === 7)
            return [true, true, true];
        return [false, false, false];
    }
    function convertText(n) {
        let bools = convertBool(n);
        let opts = [];
        if (bools[0])
            opts.push("I");
        if (bools[1])
            opts.push("II");
        if (bools[2])
            opts.push("III");
        if (opts.length === 0)
            return 'None';
        if (opts.length === 1)
            return opts[0] + ' only';
        return GrammarJoin(...opts);
    }
    let codes = RndPickN([1, 2, 3, 4, 5, 6, 7], 4);
    let truth = codes.map(x => convertBool(x))[0];
    let choices = codes.map(x => convertText(x));
    let sections = [];
    sections.push([1, truth[0] ? 1 : 0]);
    sections.push([2, truth[1] ? 1 : 0]);
    sections.push([3, truth[2] ? 1 : 0]);
    return { truth, choices, sections };
}
globalThis.RndComboConfig = RndComboConfig;
/**
 * @category Fraction
 * @return convert num to fraction
 * ```
 * ToFrac(0.5) // [1,2]
 * ToFrac(-456/123) // [-152,41]
 * ```
 */
function ToFrac(num, maxDenominator = 1000) {
    return ant.nearFrac(num, maxDenominator);
}
globalThis.ToFrac = contract(ToFrac).sign([owl.rational, owl.positiveInt]);
/**
 * @category Function
 * @return log(b,N)
 * ```
 * log(2,8) // 3
 * ```
 */
function log(b, N) {
    const v = Math.log(N) / Math.log(b);
    return ant.blur(v);
}
globalThis.log = contract(log).sign([owl.positive]);
/**
 * @deprecated
 * @ignore
 * @category Function
 * @return a**b, a to the power of b.
 * ```
 * Power(2,3) // 8
 * ```
 */
function Power(a, b) {
    const v = Math.pow(a, b);
    return ant.blur(v);
}
globalThis.Power = contract(Power).sign([owl.num]);
/**
 * @category Function
 * @return square root of x
 * ```
 * Sqrt(4) // 2
 * ```
 */
function Sqrt(x) {
    const v = Math.sqrt(x);
    return ant.blur(v);
}
globalThis.Sqrt = contract(Sqrt).sign([owl.nonNegative]);
/**
 * @category Function
 * @return the radian of the degree
 * ```
 * Radian(180) // pi
 * Radian(90) // pi/2
 * Radian(30) // PI/6
 * ```
 */
function Radian(degree) {
    const v = degree / 180 * Math.PI;
    return ant.blur(v);
}
globalThis.Radian = contract(Radian).sign([owl.num]);
/**
 * @category Function
 * @return the degree of the radian
 * ```
 * Degree(Math.PI) // 180
 * Degree(Math.PI/2) // 90
 * Degree(Math.PI/6) // 30
 * ```
 */
function Degree(radian) {
    const v = radian * 180 / Math.PI;
    return ant.blur(v);
}
globalThis.Degree = contract(Degree).sign([owl.num]);
/**
 * @category Function
 * @return sin(x).
 * ```
 * sin(30) // 0.5
 * ```
 */
function sin(x) {
    if (x % 180 === 0)
        return 0;
    let v = Math.sin(x / 180 * Math.PI);
    return ant.blur(v);
}
globalThis.sin = contract(sin).sign([owl.num]);
/**
 * @category Function
 * @return cos(x).
 * ```
 * cos(60) // 0.5
 * ```
 */
function cos(x) {
    if ((x - 90) % 180 === 0)
        return 0;
    let v = Math.cos(x / 180 * Math.PI);
    return ant.blur(v);
}
globalThis.cos = contract(cos).sign([owl.num]);
/**
 * @category Function
 * @return tan(x).
 * ```
 * tan(45) // 1
 * ```
 */
function tan(x) {
    if (x % 180 === 0)
        return 0;
    let v = Math.tan(x / 180 * Math.PI);
    return ant.blur(v);
}
globalThis.tan = contract(tan).sign([owl.num]);
/**
 * @category Function
 * @return arcsin(x) between -90 and 90.
 * ```
 * arcsin(0.5) // 30
 * ```
 */
function arcsin(x) {
    let v = Math.asin(x) * 180 / Math.PI;
    return ant.blur(v);
}
globalThis.arcsin = contract(arcsin).sign([owl.between(-1, 1)]);
/**
 * @category Function
 * @return arccos(x) between 0 and 180.
 * ```
 * arccos(0.5) // 60
 * ```
 */
function arccos(x) {
    let v = Math.acos(x) * 180 / Math.PI;
    return ant.blur(v);
}
globalThis.arccos = contract(arccos).sign([owl.between(-1, 1)]);
/**
 * @category Function
 * @return arctan(x) between -90 and 90.
 * ```
 * arctan(1) // 45
 * ```
 */
function arctan(x) {
    let v = Math.atan(x) * 180 / Math.PI;
    return ant.blur(v);
}
globalThis.arctan = contract(arctan).sign([owl.num]);
/**
 * @category Geometry
 * @return the slope of AB
 * ```
 * Slope([0,0],[1,2]) // 2
 * Slope([1,2],[1,2]) // NaN
 * ```
 */
function Slope(A, B) {
    return (A[1] - B[1]) / (A[0] - B[0]);
}
globalThis.Slope = contract(Slope).seal({
    arg: [owl.point],
    args: function not_vertical(A, B) { return ant.blur(A[0] - B[0]) !== 0; }
});
/**
 * @category Geometry
 * @return the distance AB
 * ```
 * Distance([0,0],[1,2]) // 2.23606797749979
 * ```
 */
function Distance(A, B) {
    return Math.pow((Math.pow((A[0] - B[0]), 2) + Math.pow((A[1] - B[1]), 2)), 0.5);
}
globalThis.Distance = contract(Distance).sign([owl.point]);
/**
 * @category Geometry
 * @return the chessboard distance AB, max(horizontal,vertical)
 * ```
 * ChessboardDistance([0,0],[1,2]) // 2
 * ChessboardDistance([0,0],[3,2]) // 3
 * ```
 */
function ChessboardDistance(A, B) {
    let x = Abs(A[0] - B[0]);
    let y = Abs(A[1] - B[1]);
    return Max(x, y);
}
globalThis.ChessboardDistance = contract(ChessboardDistance).sign([owl.point]);
/**
 * @category Geometry
 * @return the mid-pt of AB
 * ```
 * MidPoint([1,2],[3,4]) // [2,3]
 * ```
 */
function MidPoint(A, B) {
    return [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
}
globalThis.MidPoint = contract(MidPoint).sign([owl.point]);
/**
 * @category Geometry
 * @return the point P on AB such that AP : PB = ratio : 1-ratio
 * ```
 * DivisionPoint([1,0],[5,0],0.75) // [4,0]
 * ```
 */
function DivisionPoint(A, B, ratio = 0.5) {
    let r = ratio;
    let s = 1 - r;
    return [A[0] * s + B[0] * r, A[1] * s + B[1] * r];
}
globalThis.DivisionPoint = contract(DivisionPoint).sign([owl.point, owl.point, owl.num]);
/**
 * @category Geometry
 * @return point P rotated anticlockwise by angle q about point O.
 * ```
 * RotatePoint([1,2],[0,0],90) // [-2,1]
 * ```
 */
function RotatePoint(P, O, q) {
    let v = Vector(O, P);
    v = VectorRotate(v, q);
    return VectorAdd(O, v);
}
globalThis.RotatePoint = contract(RotatePoint).sign([owl.point, owl.point, owl.num]);
/**
 * @category Geometry
 * @return the polar angle of B if A is the origin within [0,360].
 * ```
 * Inclination([1,0],[3,2]) // 45
 * Inclination([3,2],[1,0]) // 225
 * ```
 */
function Inclination(A, B) {
    return VectorArg(Vector(A, B));
}
globalThis.Inclination = contract(Inclination).seal({
    arg: [owl.point],
    args: function distinct_points(A, B) { return owl.distinct([A, B]); }
});
/**
 * @category Geometry
 * @return the polar angle of a normal direction to AB, on the right of AB.
 * ```
 * Normal([1,0],[3,2]) // 315
 * Normal([3,2],[1,0]) // 135
 * ```
 */
function Normal(A, B) {
    let R = RotatePoint(B, A, -90);
    return Inclination(A, R);
}
globalThis.Normal = contract(Normal).seal({
    arg: [owl.point],
    args: function distinct_points(A, B) { return owl.distinct([A, B]); }
});
/**
 * @category Geometry
 * @return the foot of perpendicular from P to AB.
 * ```
 * PerpendicularFoot([-1,-1],[1,1],[-2,2]) // [0,0]
 * ```
 */
function PerpendicularFoot(A, B, P) {
    let q = Normal(A, B);
    let V = PolToRect([1, q]);
    let Q = VectorAdd(P, V);
    return Intersection(A, B, P, Q);
}
globalThis.PerpendicularFoot = contract(PerpendicularFoot).seal({
    arg: [owl.point],
    args: function distinct_points(A, B, P) { return owl.distinct([A, B]); }
});
/**
 * @category Geometry
 * @return the intersection point of AB and CD.
 * ```
 * Intersection([0,0],[2,2],[2,0],[0,2]) // [1,1]
 * ```
 */
function Intersection(A, B, C, D) {
    return Crammer(B[1] - A[1], A[0] - B[0], A[0] * B[1] - B[0] * A[1], D[1] - C[1], C[0] - D[0], C[0] * D[1] - D[0] * C[1]);
}
globalThis.Intersection = contract(Intersection).seal({
    arg: [owl.point],
    args: function distinct_points(A, B, C, D) {
        return owl.distinct([A, B]) && owl.distinct([C, D]);
    }
});
/**
 * @category Geometry
 * @return Translate point P in the polar angle q (or the direction of point q) by a distance.
 * ```
 * TranslatePoint([1,2],90,3) // [1,5]
 * TranslatePoint([1,2],[10, 12],3) // [3.006894195, 4.229882439]
 * ```
 */
function TranslatePoint(P, q, distance) {
    if (Array.isArray(q))
        q = Inclination(P, q);
    let x = P[0] + distance * cos(q);
    let y = P[1] + distance * sin(q);
    return [x, y];
}
globalThis.TranslatePoint = contract(TranslatePoint).sign([
    owl.point,
    owl.or([owl.num, owl.point]),
    owl.num
]);
/**
 * @category Geometry
 * @return angle of intersection between two slopes
 * ```
 * IntersectAngle(0,1) // 45
 * IntersectAngle(1,-1) // 90
 * ```
 */
function IntersectAngle(slope1, slope2) {
    let A1 = arctan(slope1);
    let A2 = arctan(slope2);
    let d = Abs(A1 - A2);
    if (d > 90)
        d = 180 - d;
    return d;
}
globalThis.IntersectAngle = contract(IntersectAngle).sign([owl.num]);
/**
 * @category Geometry
 * @return angle AOB, non-reflex
 * ```
 * Angle([1,0],[0,0],[0,2]) // 90
 * Angle([2,2],[1,1],[1,3]) // 45
 * Angle([1,3],[1,1],[2,2]) // 45
 * ```
 */
function Angle(A, O, B) {
    let anglePolar = AnglePolar(A, O, B);
    return IsReflex(A, O, B) ? 360 - anglePolar : anglePolar;
}
globalThis.Angle = contract(Angle).seal({
    arg: [owl.point],
    args: function distinct_points(A, O, B) {
        return owl.distinct([A, O]) && owl.distinct([B, O]);
    }
});
/**
 * @category Geometry
 * @return angle AOB, measured anticlockwise
 * ```typescript
 * AnglePolar([1,0],[0,0],[0,2]) // 90
 * AnglePolar([2,2],[1,1],[1,3]) // 45
 * AnglePolar([1,3],[1,1],[2,2]) // 315
 * ```
 */
function AnglePolar(A, O, B) {
    let a = VectorArg(Vector(O, A));
    let b = VectorArg(Vector(O, B));
    return a <= b ? b - a : 360 + b - a;
}
globalThis.AnglePolar = contract(AnglePolar).seal({
    arg: [owl.point],
    args: function distinct_points(A, O, B) {
        return owl.distinct([A, O]) && owl.distinct([B, O]);
    }
});
/**
 * @category Geometry
 * @return check if the polar angle AOB is reflex
 * ```typescript
 * IsReflex([1,0],[0,0],[0,2]) // false
 * IsReflex([2,2],[1,1],[1,3]) // false
 * IsReflex([1,3],[1,1],[2,2]) // true
 * ```
 */
function IsReflex(A, O, B) {
    let angle = AnglePolar(A, O, B);
    return angle > 180;
}
globalThis.IsReflex = contract(IsReflex).seal({
    arg: [owl.point],
    args: function distinct_points(A, O, B) {
        return owl.distinct([A, O]) && owl.distinct([B, O]);
    }
});
const LP_BOUND = 100;
function onBoundary(p) {
    return Abs(p[0]) >= LP_BOUND || Abs(p[1]) >= LP_BOUND;
}
/**
 *
 * @category LinearProgram
 * @return the value of field at given point
 * ```typescript
 * FieldAt([0,0],[1,2,3]) // 3
 * FieldAt([1,2],[3,-4,5]) // 0
 * ```
 */
function FieldAt(p, field) {
    const [a, b, c] = field;
    const [x, y] = p;
    return a * x + b * y + c;
}
globalThis.FieldAt = FieldAt;
/**
 *
 * @category LinearProgram
 * @return check if point is constrained by cons
 * ```typescript
 * isConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] satisfies all the constraints
 * ```
 */
function isConstrained(cons, point) {
    const [x, y] = point;
    return cons.every(con => {
        let [a, b, s, c] = con;
        let P = a * x + b * y - c;
        let [greater, eq] = ink.parseIneq(s);
        if (greater && eq)
            return P >= 0;
        if (greater && !eq)
            return P > 0;
        if (!greater && eq)
            return P <= 0;
        if (!greater && !eq)
            return P < 0;
    });
}
globalThis.isConstrained = isConstrained;
/**
 *
 * @category LinearProgram
 * @return check if point is constrained by cons, treating all cons as 'or equal to'
 * ```typescript
 * isLooseConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] loosely satisfies all the constraints
 * ```
 */
function isLooseConstrained(cons, point) {
    const [x, y] = point;
    return cons.every(con => {
        let [a, b, s, c] = con;
        let P = a * x + b * y - c;
        let [greater, _] = ink.parseIneq(s);
        if (greater)
            return P >= 0;
        if (!greater)
            return P <= 0;
    });
}
globalThis.isLooseConstrained = isLooseConstrained;
/**
 *
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
function FeasiblePolygon(...cons) {
    const boundaryConstraints = [
        [1, 0, "<=", LP_BOUND],
        [1, 0, ">=", -LP_BOUND],
        [0, 1, "<=", LP_BOUND],
        [0, 1, ">=", -LP_BOUND]
    ];
    let cs = [...cons, ...boundaryConstraints];
    let vertices = [];
    for (let i = 0; i < cs.length; i++) {
        for (let j = i + 1; j < cs.length; j++) {
            let [a1, b1, s1, c1] = cs[i];
            let [a2, b2, s2, c2] = cs[j];
            if (a1 / b1 === a2 / b2)
                continue;
            let p = Crammer(a1, b1, c1, a2, b2, c2);
            let otherCons = [...cs];
            otherCons.splice(j, 1);
            otherCons.splice(i, 1);
            if (isLooseConstrained(otherCons, p)) {
                vertices.push(p);
            }
        }
    }
    vertices = List(vertices).distinct();
    Should(vertices.length > 2, 'No feasible region.');
    const center = VectorMean(...vertices);
    vertices = SortBy(vertices, x => Inclination(center, x));
    return vertices;
}
globalThis.FeasiblePolygon = FeasiblePolygon;
/**
 *
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
function FeasibleVertices(...cons) {
    let vertices = FeasiblePolygon(...cons).filter(v => !onBoundary(v));
    Should(vertices.length > 0, 'no feasible vertex');
    return vertices;
}
globalThis.FeasibleVertices = FeasibleVertices;
/**
 *
 * @category LinearProgram
 * @return check if the feasible region is bounded
 * ```typescript
 * FeasibleIsBounded([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // true
 * FeasibleIsBounded([
 *    [1, 0, '<', 10],
 * ])
 * // false
 * ```
 */
function FeasibleIsBounded(...cons) {
    return FeasiblePolygon(...cons).every(v => !onBoundary(v));
}
globalThis.FeasibleIsBounded = FeasibleIsBounded;
/**
 *
 * @category LinearProgram
 * @return the integral points inside the feasible polygon
 * ```typescript
 * FeasibleIntegral([
 *    [1, 0, '<', 3],
 *    [1, 0, '>', 0],
 *    [0, 1, '<', 2],
 *    [0, 1, '>', 0]
 * ])
 * // [[1,1],[2,1]]
 * ```
 */
function FeasibleIntegral(...cons) {
    let vertices = FeasiblePolygon(...cons);
    let xCoords = vertices.map(p => p[0]);
    let yCoords = vertices.map(p => p[1]);
    let xmax = Ceil(Max(...xCoords));
    let xmin = Floor(Min(...xCoords));
    let ymax = Ceil(Max(...yCoords));
    let ymin = Floor(Min(...yCoords));
    let points = [];
    for (let i = xmin; i <= xmax; i++) {
        for (let j = ymin; j <= ymax; j++) {
            let p = [i, j];
            if (isConstrained(cons, p))
                points.push(p);
        }
    }
    return points;
}
globalThis.FeasibleIntegral = FeasibleIntegral;
/**
 *
 * @category LinearProgram
 * @return the point with the max value of field
 * ```typescript
 * MaximizePoint([[0,0],[10,10]],[1,2,3]) // [10,10]
 * ```
 */
function MaximizePoint(points, field) {
    Should(points.length > 0, 'No feasible point');
    let orderedPoints = SortBy(points, x => -FieldAt(x, field));
    orderedPoints = List(orderedPoints).distinct();
    let point = orderedPoints[0];
    Should(!onBoundary(point), 'No max point');
    if (orderedPoints[1]) {
        Should(FieldAt(point, field) !== FieldAt(orderedPoints[1], field), 'multiple max points');
    }
    return point;
}
globalThis.MaximizePoint = MaximizePoint;
/**
 *
 * @category LinearProgram
 * @return the point with the min value of field
 * ```typescript
 * MinimizePoint([[0,0],[10,10]],[1,2,3]) // [0,0]
 * ```
 */
function MinimizePoint(points, field) {
    Should(points.length > 0, 'No feasible point');
    let orderedPoints = SortBy(points, x => FieldAt(x, field));
    orderedPoints = List(orderedPoints).distinct();
    let point = orderedPoints[0];
    Should(!onBoundary(point), 'No min point');
    if (orderedPoints[1]) {
        Should(FieldAt(point, field) !== FieldAt(orderedPoints[1], field), 'multiple min points');
    }
    return point;
}
globalThis.MinimizePoint = MinimizePoint;
/**
 *
 * @category LinearProgram
 * @return the point with the min/max value of field
 * ```typescript
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [10,10]
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [0,0]
 * ```
 */
function OptimizePoint(points, field, max) {
    if (max) {
        return MaximizePoint(points, field);
    }
    else {
        return MinimizePoint(points, field);
    }
}
globalThis.OptimizePoint = OptimizePoint;
/**
 *
 * @category LinearProgram
 * @return the min/max value of field
 * ```typescript
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 33
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 3
 * ```
 */
function OptimizeField(points, field, max) {
    let point = OptimizePoint(points, field, max);
    return FieldAt(point, field);
}
globalThis.OptimizeField = OptimizeField;
/**
 * @category Numeracy
 * @return division with x/0 handling
 * ```
 * Divide(6,2) // 3
 * Divide(6,0) // throw
 * ```
 */
function Divide(dividend, divisor) {
    return dividend / divisor;
}
globalThis.Divide = contract(Divide).sign([owl.num, owl.nonZero]);
/**
 * @category Numeracy
 * @return the absolute value. Equivalent to Math.abs(x).
 * ```
 * Abs(-2) // 2
 * ```
 */
function Abs(num) {
    return Math.abs(num);
}
globalThis.Abs = contract(Abs).sign([owl.num]);
/**
 * @category Numeracy
 * @return the sign of the number as 1,0 or -1.
 * ```
 * Sign(3) // 1
 * Sign(-4.5) // -1
 * Sign(0) // 0
 * ```
 */
function Sign(num) {
    if (num > 0)
        return 1;
    if (num < 0)
        return -1;
    return 0;
}
globalThis.Sign = contract(Sign).sign([owl.num]);
/**
 * @category Numeracy
 * @return the number rounded off to given sigfig.
 * ```
 * Round(1.23456,3) // 1.23
 * Round(1.23567,3) // 1.24
 * ```
 */
function Round(num, sigfig = 3) {
    num = num * (1 + Number.EPSILON);
    return ant.round(num, sigfig).off();
}
globalThis.Round = contract(Round).sign([owl.num, owl.positiveInt]);
/**
 * @category Numeracy
 * @return the number rounded up to given sigfig.
 * ```
 * RoundUp(1.23456,3) // 1.23
 * RoundUp(1.23567,1) // 2
 * ```
 */
function RoundUp(num, sigfig = 3) {
    num = num * (1 - Number.EPSILON);
    return ant.round(num, sigfig).up();
}
globalThis.RoundUp = contract(RoundUp).sign([owl.num, owl.positiveInt]);
/**
 * @category Numeracy
 * @return the number rounded down to given sigfig.
 * ```
 * RoundDown(1.23456,5) // 1.2345
 * RoundDown(1.6789,1) // 1
 * ```
 */
function RoundDown(num, sigfig = 3) {
    num = num * (1 + Number.EPSILON);
    return ant.round(num, sigfig).down();
}
globalThis.RoundDown = contract(RoundDown).sign([owl.num, owl.positiveInt]);
/**
 * @category Numeracy
 * @return the number rounded off to given decimal place.
 * ```
 * Fix(12345.678,0) // round to integer, return 12346
 * Fix(12345.678,2) // round to 2 dp, return 12345.68
 * Fix(12345.678,-2) // round to hundred, return 12300
 * ```
 */
function Fix(num, dp = 0) {
    num = num * (1 + Number.EPSILON);
    return ant.fix(num, dp).off();
}
globalThis.Fix = contract(Fix).sign([owl.num, owl.int]);
/**
 * @category Numeracy
 * @return the number rounded up to given decimal place.
 * ```
 * FixUp(12.34,0) // round to integer, return 13
 * FixUp(12.34,1) // round to 1 dp, return 12.4
 * FixUp(12.34,-1) // round to ten, return 20
 * ```
 */
function FixUp(num, dp = 0) {
    num = num * (1 - Number.EPSILON);
    return ant.fix(num, dp).up();
}
globalThis.FixUp = contract(FixUp).sign([owl.num, owl.int]);
/**
 * @category Numeracy
 * @return the number rounded down to given decimal place.
 * ```
 * FixDown(17.89,0) // round to integer, return 17
 * FixDown(17.89,1) // round to 1 dp, return 17.8
 * FixDown(17.89,-1) // round to ten, return 10
 * ```
 */
function FixDown(num, dp = 0) {
    num = num * (1 + Number.EPSILON);
    return ant.fix(num, dp).down();
}
globalThis.FixDown = contract(FixDown).sign([owl.num, owl.int]);
/**
 * @category Numeracy
 * @return the ceiling integer of the number.
 * ```
 * Ceil(1.1) // 2
 * Ceil(-1.1) // -1
 * Ceil(2)) // 2
 * ```
 */
function Ceil(num) {
    return Math.ceil(num);
}
globalThis.Ceil = contract(Ceil).sign([owl.num]);
/**
 * @category Numeracy
 * @return the floor integer of the number.
 * ```
 * Floor(1.9) // 1
 * Floor(-1.9) // -2
 * Floor(2)) // 2
 * ```
 */
function Floor(num) {
    return Math.floor(num);
}
globalThis.Floor = contract(Floor).sign([owl.num]);
/**
 * @category Numeracy
 * @return reduce input array to simplest ratio.
 * ```
 * SimpRatio(2,4,6) // [1,2,3]
 * SimpRatio(0,4,6) // [0,2,3]
 * SimpRatio(0,4) // [0,1]
 * ```
 */
function SimpRatio(...nums) {
    nums = nums.map(ant.blur);
    if (!IsInteger(...nums))
        return nums;
    let nonzeros = nums.filter(x => IsNonZero(x));
    Should(nonzeros.length > 0, 'at least one non-zero num');
    return ant.ratio(...nums);
}
globalThis.SimpRatio = contract(SimpRatio).sign([owl.num]);
/**
 * @category Numeracy
 * @return reduce input array to integral ratio.
 * ```
 * IntegerRatio(2,4,6) // [1,2,3]
 * IntegerRatio(0,4,6) // [0,2,3]
 * IntegerRatio(0,4) // [0,1]
 * IntegerRatio(1/3,1/2,1/4) // [4,6,3]
 * IntegerRatio(Math.sqrt(2),1/2,1/4) // throw
 * ```
 */
function IntegerRatio(...nums) {
    return ant.ratio(...nums);
}
globalThis.IntegerRatio = contract(IntegerRatio).sign([owl.rational]);
var PhyConst = {
    R: 8.31,
    N_A: 6.02e23,
    g: 9.81,
    G: 6.67e-11,
    c: 3.00e8,
    e: 1.60e-19,
    m_e: 9.11e-31,
    epsilon_0: 8.85e-12,
    mu_0: 4 * Math.PI * (1e-7),
    m_u: 1.661e-27,
    au: 1.50e11,
    light_year: 9.46e15,
    parsec: 3.09e16,
    sigma: 5.67e-8,
    h: 6.63e-34,
};
globalThis.PhyConst = PhyConst;
/**
 * @category Random
 * @return a random integer in [min, max] inclusive.
 * ```
 * RndN(2,5) // may return 2, 3, 4 or 5
 * ```
 */
function RndN(min, max) {
    return dice.integer(min, max);
}
globalThis.RndN = contract(RndN).sign([owl.num]);
/**
 * @category Random
 * @return an array of n unique random integer in [min, max] inclusive.
 * ```
 * RndNs(2,8,3) // may return [5,3,7]
 * ```
 */
function RndNs(min, max, n = 10) {
    n = Math.min(Math.floor(max - min + 1), n);
    return dice.roll(() => RndN(min, max)).unique(n);
}
globalThis.RndNs = contract(RndNs).sign([owl.num, owl.num, owl.positiveInt]);
/**
 * @category Random
 * @return a random real number in [min, max] inclusive
 * ```
 * RndR(1,2) // may return 1.242574363
 * ```
 */
function RndR(min, max) {
    return dice.real(min, max);
}
globalThis.RndR = contract(RndR).sign([owl.num]);
/**
 * @category Random
 * @return 1 or -1
 * ```
 * RndU() // may return 1 or -1
 * ```
 */
function RndU() {
    return dice.array([-1, 1]).one();
}
globalThis.RndU = RndU;
/**
 * @category Random
 * @return true or false.
 * ```
 * RndT() // may return true or false
 * ```
 */
function RndT() {
    return dice.array([true, false]).one();
}
globalThis.RndT = RndT;
/**
 * @category Random
 * @return a random integer in [min, max] or [-max, -min] inclusive.
 * ```
 * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
 * ```
 */
function RndZ(min, max) {
    return RndN(min, max) * RndU();
}
globalThis.RndZ = contract(RndZ).sign([owl.nonNegative]);
/**
 * @category Random
 * @param n - default to 10
 * @return an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive.
 * ```
 * RndZs(2,8,3) // may return [5,-3,7]
 * ```
 */
function RndZs(min, max, n = 10) {
    n = Math.min(Math.floor(max - min + 1), n);
    return dice.roll(() => RndN(min, max)).unique(n).map(x => x * RndU());
}
globalThis.RndZs = contract(RndZs).sign([owl.nonNegative, owl.nonNegative, owl.positiveInt]);
/**
 * @category Random
 * @return a random prime number less than or equal to max.
 * ```
 * RndP(10) // may return 2, 3, 5 or 7
 * ```
 */
function RndP(max) {
    return dice.prime(2, max);
}
globalThis.RndP = contract(RndP).sign([owl.positive]);
/**
 * @category Random
 * @return a random odd integer in [min, max] inclusive
 * ```
 * RndOdd(3,8) // return 3, 5 or 7
 * ```
 */
function RndOdd(min, max) {
    min = Math.ceil((min + 1) / 2);
    max = Math.floor((max + 1) / 2);
    return 2 * RndN(min, max) - 1;
}
globalThis.RndOdd = contract(RndOdd).sign([owl.num]);
/**
 * @category Random
 * @return a random even integer in [min, max] inclusive
 * ```
 * RndEven(3,8) // return 4, 6 or 8
 * ```
 */
function RndEven(min, max) {
    min = Math.ceil(min / 2);
    max = Math.floor(max / 2);
    return 2 * RndN(min, max);
}
globalThis.RndEven = contract(RndEven).sign([owl.num]);
/**
 * @category Random
 * @return an array of random polynomial coefficients
 * ```
 * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)]
 * ```
 */
function RndPoly(...coeff) {
    let arr = coeff.map(x => RndZ(1, x));
    arr[0] = Math.abs(arr[0]);
    return arr;
}
globalThis.RndPoly = contract(RndPoly).sign([owl.positive]);
/**
 * @category Random
 * @return an array of a Pyth Triple
 * ```
 * RndPyth(10) // may return [3,4,5]
 * ```
 */
function RndPyth(max = 100) {
    let arr = [];
    for (let m = 1; m < 10; m++) {
        for (let n = 1; n < m; n++) {
            for (let k = 1; k < 10; k++) {
                let a = m * m - n * n;
                let b = 2 * m * n;
                let c = m * m + n * n;
                if (c <= max)
                    arr.push([a, b, c]);
            }
        }
    }
    return dice.array(arr).one();
}
globalThis.RndPyth = contract(RndPyth).sign([owl.positive]);
/**
 * @category Random
 * @return a linear [a,b,c] in ax+by+c=0
 * ```
 * RndLinearFromIntercept(1,5) // may return [2,-3,6]
 * ```
 */
function RndLinearFromInt(minAbsIntercept, maxAbsIntercept) {
    let xInt = RndZ(minAbsIntercept, maxAbsIntercept);
    let yInt = RndZ(minAbsIntercept, maxAbsIntercept);
    return LinearFromIntercepts(xInt, yInt);
}
globalThis.RndLinearFromInt = contract(RndLinearFromInt).sign([owl.nonNegative]);
/**
 * @category Random
 * @return a point within given range
 * ```
 * RndPoint([1,4],[10,14]) // may return [2,12]
 * // equivalent to [RndN(...xRange),Range(...yRange)]
 * RndPoint(2,4) // equivalent to RndPoint([-2,2],[-4,4])
 * ```
 */
function RndPoint(xRange, yRange = xRange) {
    if (typeof xRange === 'number')
        xRange = [-xRange, xRange];
    if (typeof yRange === 'number')
        yRange = [-yRange, yRange];
    let x = RndN(...xRange);
    let y = RndN(...yRange);
    return [x, y];
}
globalThis.RndPoint = contract(RndPoint).sign([owl.or([owl.num, owl.interval])]);
/**
 * @category Random
 * @return n angles in [0,360] at least cyclic separated by separation
 * ```
 * RndAngles(3,50) // may return [30,90,200]
 * ```
 */
function RndAngles(n, separation) {
    let f = () => Sort(...RndNs(0, 360, n));
    let p = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i + 1] - arr[i] < separation)
                return false;
        }
        if (arr[0] + 360 - arr[arr.length - 1] < separation)
            return false;
        return true;
    };
    return dice.roll(f).brute(p);
}
globalThis.RndAngles = contract(RndAngles).sign([owl.positiveInt, owl.positive]);
/**
 * @category Random
 * @return n vertices of a convex polygon generated by rounding a cyclic polygon
 * ```
 * RndConvexPolygon(3,[0,0],10,50) // may return [[10,0],[-6,8],[0,-10]]
 * ```
 */
function RndConvexPolygon(n, center, radius, separation) {
    let [h, k] = center;
    let r = radius;
    let angles = RndAngles(n, separation);
    let vertices = angles.map(a => [h + r * cos(a), k + r * sin(a)]);
    vertices = vertices.map(v => [Fix(v[0]), Fix(v[1])]);
    return vertices;
}
globalThis.RndConvexPolygon = contract(RndConvexPolygon)
    .sign([owl.positiveInt, owl.point, owl.positive, owl.positive]);
/**
 * @category Random
 * @return n integers from [min, max]
 * ```
 * RndData(10,15,5) // may return [11,11,12,13,15]
 * ```
 */
function RndData(min, max, n) {
    let f = () => dice.roll(() => RndN(min, max)).sample(n);
    let p = (arr) => Mode(...arr).length === 1;
    return Sort(...dice.roll(f).brute(p));
}
globalThis.RndData = contract(RndData).sign([owl.num, owl.num, owl.positiveInt]);
/**
 * @category RandomShake
 * @return an array of n nearby values around anchor, within range inclusive, auto detecting the input type.
 * ```
 * RndShake(10)
 * // equivalent to RndShakeN(10)
 * RndShake(10.5)
 * // equivalent to RndShakeR(10.5)
 * ```
 */
function RndShake(anchor) {
    if (typeof anchor === 'string') {
        // Fraction
        if (owl.dfrac(anchor)) {
            return RndShakeDfrac(anchor);
        }
        // Inequal Sign
        if (owl.ineq(anchor)) {
            return RndShakeIneq(anchor);
        }
        // else convert to number
        if (Number(anchor)) {
            anchor = Number(anchor);
        }
    }
    if (owl.point(anchor)) {
        // Point
        return RndShakePoint(anchor);
    }
    if (typeof anchor === 'number' && owl.num(anchor)) {
        anchor = ant.blur(anchor);
        // Integer
        if (owl.int(anchor)) {
            return RndShakeN(anchor);
        }
        // Decimal      
        if (owl.num(anchor)) {
            return RndShakeR(anchor);
        }
        if (isNaN(anchor)) {
            return [];
        }
    }
    if (anchor === undefined)
        return [];
    throw MathError('Fail to RndShake: ' + anchor);
}
globalThis.RndShake = RndShake;
/**
 * @category RandomShake
 * @return 3 nearby same-signed integers, range = Max(5, anchor * 10%)
 * ```
 * RndShakeN(5) // return 3 unique integers from 1-10
 * ```
 */
function RndShakeN(anchor) {
    function N() {
        anchor = ant.blur(anchor);
        if (anchor === 0)
            return RndN(1, 3);
        let a = Abs(anchor);
        let range = Max(3, a * 0.1);
        let max = Min(Floor(a + range), ant.logCeil(a) - 1);
        let min = Max(Ceil(a - range), 1, ant.logFloor(a));
        return dice.roll(() => RndN(min, max)).brute(x => x !== a) * Sign(anchor);
    }
    return dice.roll(N).unique(3);
}
globalThis.RndShakeN = contract(RndShakeN).sign([owl.int]);
/**
 * @category RandomShake
 * @return 3 nearby same-signed real number with same precision, range = anchor * 50%
 * ```
 * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
 * ```
 */
function RndShakeR(anchor) {
    let exp = ant.e(anchor);
    let m = ant.blur(ant.mantissa(anchor));
    if (IsInteger(m))
        return RndShakeN(m).map(x => Number(x + "e" + exp));
    let dp = ant.dp(m);
    let func = dice
        .roll(() => Fix(m * (1 + RndR(0, 0.5) * RndU()), dp))
        .shield(x => (x * m > 0) &&
        (ant.e(x) === ant.e(m)) &&
        (x !== m));
    return dice.roll(func).unique(3).map(x => Number(x + "e" + exp));
}
globalThis.RndShakeR = contract(RndShakeR).sign([owl.nonZero]);
/**
 * @category RandomShake
 * @return 3 nearby same-sign rational by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeQ(5/6)
 * // return 3 unique fractions around [5,6]
 * RndShakeQ(6/-5)
 * // return 3 unique fractions around [6,-5]
 * ```
 */
function RndShakeQ(anchor) {
    let f = ToFrac(anchor);
    return RndShakeFrac(f).map((x) => x[0] / x[1]);
}
globalThis.RndShakeQ = contract(RndShakeR).sign([owl.rational]);
/**
 * @category RandomShake
 * @return 3 nearby same-sign fraction by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeFrac([5,6])
 * // return 3 unique fractions around [5,6]
 * RndShakeFrac([6,-5])
 * // return 3 unique fractions around [6,-5]
 * ```
 */
function RndShakeFrac(anchor) {
    let [p, q] = ant.simpFrac(...anchor);
    [p, q] = [p, q].map(ant.blur);
    Should(IsInteger(p, q), 'input should be integral fraction');
    let func = dice
        .roll(() => {
        const h = RndShakeN(p)[0];
        const k = RndShakeN(q)[0];
        return RndPick([h, k], [h, k], [p, k], [h, q]);
    })
        .shield(f => {
        let [a, b] = f;
        if (!AreCoprime(a, b))
            return false;
        if (a === 0 || b === 0)
            return false;
        if (b === 1)
            return false;
        if (IsProbability(p / q) && !IsProbability(a / b))
            return false;
        return true;
    });
    return dice.roll(func).unique(3, _ => _[0] / _[1]);
}
globalThis.RndShakeFrac = contract(RndShakeFrac).sign([owl.fraction]);
/**
 * @category RandomShake
 * @return 3 nearby same-signed Dfrac by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeDfrac('\\dfrac{5}{6}')
 * // return 3 unique Dfrac around [5,6]
 * RndShakeDfrac('-\\dfrac{6}{5}')
 * // return 3 unique Dfrac around [6,-5]
 * ```
 */
function RndShakeDfrac(anchor) {
    let f = ink.parseDfrac(anchor);
    return RndShakeFrac(f).map(x => Dfrac(...x));
}
globalThis.RndShakeDfrac = contract(RndShakeDfrac).sign([owl.dfrac]);
/**
 * @category RandomShake
 * @param anchor - must be a string of ineq sign
 * @return an array of 3 ineq signs, balanced in number.
 * ```
 * RndShakeIneq('\\ge')
 * // may return ['\\ge','\\le','\\le']
 * ```
 */
function RndShakeIneq(anchor) {
    let f = ink.parseIneq(anchor);
    return dice.array(IneqSign(...f).reverse()).balanced(3);
}
globalThis.RndShakeIneq = contract(RndShakeIneq).sign([owl.ineq]);
/**
 * @category RandomShake
 * @param anchor - must be a point
 * @return an array of 3 point
 * ```
 * RndShakePoint([3,4])
 * // may return [[2,5],[1,6],[4,2]]
 * ```
 */
function RndShakePoint(anchor) {
    let [x, y] = anchor;
    let func = () => {
        const h = IsInteger(x) ? RndShakeN(x)[0] : RndShakeR(x)[0];
        const k = IsInteger(y) ? RndShakeN(y)[0] : RndShakeR(y)[0];
        return [h, k];
    };
    return dice.roll(func).unique(3);
}
globalThis.RndShakePoint = contract(RndShakePoint).sign([owl.point]);
/**
 * @category RandomUtil
 * @return a random item from the given items
 * ```
 * RndPick(2,4,6) // may return 2, 4 or 6
 * ```
 */
function RndPick(...items) {
    return dice.array(items).one();
}
globalThis.RndPick = RndPick;
/**
 * @category RandomUtil
 * @return a shuffled array of the given items
 * ```
 * RndShuffle(2,4,6) // may return [4,2,6]
 * ```
 */
function RndShuffle(...items) {
    return dice.array(items).shuffle();
}
globalThis.RndShuffle = RndShuffle;
/**
 * @category RandomUtil
 * @return n random items from given items, not necessarily unique
 * ```
 * RndPickN([2,4,6],2) // may return [4,2]
 * ```
 */
function RndPickN(items, n) {
    return dice.array(items).sample(n);
}
globalThis.RndPickN = contract(RndPickN).sign([owl.array, owl.positiveInt]);
/**
 * @category RandomUtil
 * @return n random unique items from given items
 * ```
 * RndPickUnique([2,4,6],2) // may return [4,2]
 * RndPickUnique([1,2,2,2,2,2,2,2],2) // must return [1,2] or [2,1]
 * ```
 */
function RndPickUnique(items, n) {
    return dice.array(items).unique(n);
}
globalThis.RndPickUnique = contract(RndPickUnique).sign([owl.array, owl.positiveInt]);
/**
 * @category RandomUtil
 * @return a random male name
 * ```
 * RndHe() // may return 'Peter', 'David', etc
 * ```
 */
function RndHe() {
    return dice.he();
}
globalThis.RndHe = RndHe;
/**
 * @category RandomUtil
 * @return a random female name
 * ```
 * RndShe() // may return 'Mary', 'Alice', etc
 * ```
 */
function RndShe() {
    return dice.she();
}
globalThis.RndShe = RndShe;
/**
 * @category RandomUtil
 * @return a random 3-letters array
 * ```
 * RndLetters() // may return ['a','b','c'] or ['x','y','z'] or etc
 * ```
 */
function RndLetters() {
    return RndPick(['a', 'b', 'c'], ['h', 'k', 'l'], ['m', 'n', 'l'], ['p', 'q', 'r'], ['r', 's', 't'], ['u', 'v', 'w'], ['x', 'y', 'z']);
}
globalThis.RndLetters = RndLetters;
/**
 * @category Relation
 * @return Check if the numbers are all distinct.
 * ```
 * AreDistinct(1,2,3) // true
 * AreDistinct(1,2,2) // false
 * ```
 */
function AreDistinct(...nums) {
    return (new Set(nums)).size === nums.length;
}
globalThis.AreDistinct = contract(AreDistinct).sign([owl.num]);
/**
 * @category Relation
 * @return Check if the absolute values of the numbers are all distinct.
 * ```
 * AreAbsDistinct(1,2,3) // true
 * AreAbsDistinct(1,2,2) // false
 * AreAbsDistinct(1,2,-2) // false
 * ```
 */
function AreAbsDistinct(...nums) {
    return AreDistinct(...nums.map(Math.abs));
}
globalThis.AreAbsDistinct = contract(AreAbsDistinct).sign([owl.num]);
/**
 * @category Relation
 * @return Check if the numbers all have the same sign.
 * ```
 * AreSameSign(1,2,3) // true
 * AreSameSign(1,2,-3) // false
 * AreSameSign(1,2,0) // false
 * ```
 */
function AreSameSign(...nums) {
    return [...new Set(nums.map(Math.sign))].length === 1;
}
globalThis.AreSameSign = contract(AreSameSign).sign([owl.num]);
/**
 * @category Relation
 * @return Check if the numbers all pairwise coprime.
 * ```
 * AreCoprime(2,3) // true
 * AreCoprime(2,6) // false
 * AreCoprime(1,2) // true
 * AreCoprime(2,3,6) // true
 * AreCoprime(1.5,3) // true
 * AreCoprime(0,3) // true
 * ```
 */
function AreCoprime(...nums) {
    nums = nums.map(ant.blur);
    if (!IsInteger(...nums))
        return true;
    if (!IsNonZero(...nums))
        return true;
    return List(nums).pairsEvery((a, b) => HCF(a, b) === 1);
}
globalThis.AreCoprime = contract(AreCoprime).sign([owl.num]);
/**
 * @category Relation
 * @return Check if the points are all distinct.
 * ```
 * AreDistinctPoint([1,2],[3,4]) // true
 * AreDistinctPoint([1,2],[1,2]) // false
 * ```
 */
function AreDistinctPoint(...points) {
    return List(points).isDistinct();
}
globalThis.AreDistinctPoint = contract(AreDistinctPoint).sign([owl.point]);
/**
 * @category Relation
 * @return Check if the points are pairwise distant apart.
 * ```
 * AreDistantPoint(2)([0,0],[3,0]) // true
 * AreDistantPoint(2)([0,0],[1,0]) // false
 * ```
 */
function AreDistantPoint(distance) {
    let AreDistant = function (...points) {
        return List(points).pairsEvery((a, b) => Distance(a, b) >= distance);
    };
    return contract(AreDistant).sign([owl.point]);
}
globalThis.AreDistantPoint = contract(AreDistantPoint).sign([owl.positive]);
/**
 * @category Relation
 * @return Check if slopes are at least oblique at minAngle
 * ```
 * AreOblique(40)(0,1) // true
 * AreOblique(40)(0,0.5) // false
 * ```
 */
function AreOblique(minAngle) {
    let areOblique = function (...slopes) {
        return List(slopes).pairsEvery((a, b) => IntersectAngle(a, b) >= minAngle);
    };
    return contract(areOblique).sign([owl.num]);
}
globalThis.AreOblique = contract(AreOblique).sign([owl.positive]);
/**
* @category Sequence
* @return an array of integers from start to end inclusive.
* ```
* ListIntegers(2,6) // [2,3,4,5,6]
* ListIntegers(-2,1) // [-2,-1,0,1]
* ```
*/
function ListIntegers(start, end) {
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
}
globalThis.ListIntegers = contract(ListIntegers).seal({
    arg: [owl.num],
    args: function is_range(start, end) { return start < end; }
});
/**
* @category Sequence
* @return Tn in an arithmetic sequence: a+(n-1)d
* ```
* ASterm(2,3,10) // 29
* ASterm(5,-2,6) // -5
* ```
*/
function ASterm(a, d, n) {
    return a + (n - 1) * d;
}
globalThis.ASterm = contract(ASterm).sign([owl.num, owl.num, owl.positiveInt]);
/**
* @category Sequence
* @return Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
* ```
* ASsum(2,3,10) // 155
* ASsum(5,-2,6) // 0
* ```
*/
function ASsum(a, d, n) {
    return 0.5 * n * (2 * a + (n - 1) * d);
}
globalThis.ASsum = contract(ASsum).sign([owl.num, owl.num, owl.positiveInt]);
/**
* @category Sequence
* @return an array of the first n terms in an arithmetic sequence.
* ```
* ASequence(2,3,5) // [2,5,8,11,14]
* ASequence(5,-2,3) // [5,3,1]
* ```
*/
function ASequence(a, d, n = 10) {
    let arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(ASterm(a, d, i));
    }
    return arr;
}
globalThis.ASequence = contract(ASequence).sign([owl.num, owl.num, owl.positiveInt]);
/**
* @category Sequence
* @return Tn in a geometric sequence: ar**(n-1)
* ```
* GSterm(2,3,4) // 54
* GSterm(5,-2,6) // -160
* ```
*/
function GSterm(a, r, n) {
    return a * (Math.pow(r, (n - 1)));
}
globalThis.GSterm = contract(GSterm).sign([owl.num, owl.num, owl.positiveInt]);
/**
* @category Sequence
* @return Sn in a geometric sequence: a*(r*n-1)/(r-1)
* ```
* GSsum(2,3,4) // 80
* GSsum(5,-2,3) // 15
* GSsum(3,0.5) // 6 , sum to inf if omit n
* ```
*/
function GSsum(a, r, n = -1) {
    return n > 0 ? a * (Math.pow(r, n) - 1) / (r - 1) : a / (1 - r);
}
globalThis.GSsum = contract(GSsum).sign([owl.num, owl.num, owl.int]);
/**
* @category Sequence
* @return an array of the first n terms in a geometric sequence.
* ```
* GSequence(2,3,5) // return [2,6,18,54,162]
* GSequence(5,-2,3) // return [5,-10,20]
* ```
*/
function GSequence(a, r, n = 10) {
    let arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(GSterm(a, r, i));
    }
    return arr;
}
globalThis.GSequence = contract(GSequence).sign([owl.num, owl.num, owl.positiveInt]);
/**
* @category Sequence
* @return the nth term in a quadratic sequence, 1st term = a, P_i+1=P_i + pi+q
* ```
* QuadraticSequence(1,2,3,4) //
* ```
*/
function QuadraticSequence(a, p, q, n) {
    let c = a;
    for (let i = 2; i <= n; i++) {
        c += p * (i - 1) + q;
    }
    return c;
}
globalThis.QuadraticSequence = contract(QuadraticSequence).sign([owl.num, owl.num, owl.num, owl.positiveInt]);
/**
* @category Sequence
* @return the nth term in a lucas sequence, a_i = p*a_{i-1} + q*a_{i-2}
* ```
* LucasSequence(1,2,3,4,5) //
* ```
*/
function LucasSequence(first, second, p, q, n) {
    if (n === 1)
        return first;
    if (n === 2)
        return second;
    let S = [first, second];
    for (let i = 3; i <= n; i++) {
        S.push(p * S[i - 2] + q * S[i - 3]);
    }
    return S[n - 1];
}
globalThis.LucasSequence = contract(LucasSequence).sign([owl.num, owl.num, owl.num, owl.num, owl.positiveInt]);
/**
 * @category Stat
 * @return the minimum value. Equivalent to Math.min().
 * ```
 * Min(2,3,4) // 2
 * ```
 */
function Min(...nums) {
    return Math.min(...nums);
}
globalThis.Min = contract(Min).sign([owl.num]);
/**
 * @category Stat
 * @return the maximum value. Equivalent to Math.max().
 * ```
 * Max(2,3,4) // 4
 * ```
 */
function Max(...nums) {
    return Math.max(...nums);
}
globalThis.Max = contract(Max).sign([owl.num]);
/**
 * @category Stat
 * @return the sorted array of numbers.
 * ```
 * Sort(2,3,1) // [1,2,3]
 * ```
 */
function Sort(...nums) {
    return [...nums].sort((a, b) => a - b);
}
globalThis.Sort = contract(Sort).sign([owl.num]);
/**
 * @category Stat
 * @return the sorted array of items by giving each item a value.
 * ```
 * SortBy([2,3,1],x=>x) // [1,2,3]
 * SortBy(["aa", "aaa", "a"], x => x.length) // ["a", "aa", "aaa"]
 * ```
 */
function SortBy(items, valueFunc) {
    return [...items].sort((a, b) => valueFunc(a) - valueFunc(b));
}
globalThis.SortBy = contract(SortBy).sign([owl.array, owl.pass]);
/**
 * @category Stat
 * @return sum of nums
 * ```
 * Sum(1,2,3) // 6
 * Sum(-1,2,3,4,5) // 13
 * ```
 */
function Sum(...nums) {
    return ant.sum(...nums);
}
globalThis.Sum = contract(Sum).sign([owl.num]);
/**
 * @category Stat
 * @return mean of nums
 * ```
 * Mean(1,2,3) // 2
 * Mean(-1,2,3,4,5) // 2.6
 * ```
 */
function Mean(...nums) {
    return ant.mean(...nums);
}
globalThis.Mean = contract(Mean).sign([owl.num]);
/**
 * @category Stat
 * @return median of nums
 * ```
 * Median(1,2,3,4,50) // 3
 * Median(1,2,3,4,5,7) // 3.5
 * ```
 */
function Median(...nums) {
    return ant.median(...nums);
}
globalThis.Median = contract(Median).sign([owl.num]);
/**
 * @category Stat
 * @return lower quartile of nums
 * ```
 * LowerQ(1,2,3,4,5) // 1.5
 * LowerQ(1,2,3,4,5,7) // 2
 * ```
 */
function LowerQ(...nums) {
    nums = Sort(...nums);
    let n = nums.length;
    let m = IsOdd(n) ? Floor(n / 2) : n / 2;
    nums.length = m;
    return Median(...nums);
}
globalThis.LowerQ = contract(LowerQ).sign([owl.num]);
/**
 * @category Stat
 * @return lower quartile of nums
 * ```
 * UpperQ(1,2,3,4,5) // 4.5
 * UpperQ(1,2,3,4,5,7) // 5
 * ```
 */
function UpperQ(...nums) {
    nums = Sort(...nums).reverse();
    let n = nums.length;
    let m = IsOdd(n) ? Floor(n / 2) : n / 2;
    nums.length = m;
    return Median(...nums);
}
globalThis.UpperQ = contract(UpperQ).sign([owl.num]);
/**
 * @category Stat
 * @return count frequency of item in array
 * ```
 * Frequency(1)(2,3,4,1,5,1,1,4,5) // 3
 * ```
 */
function Frequency(item) {
    return (...items) => items.filter(x => x === item).length;
}
globalThis.Frequency = Frequency;
/**
 * @category Stat
 * @return mode of nums
 * ```
 * Mode(1,2,3,2,2,3,4) \\ [2]
 * Mode(1,1,2,2,3) \\ []
 * ```
 */
function Mode(...nums) {
    return ant.mode(...nums);
}
globalThis.Mode = contract(Mode).sign([owl.num]);
/**
 * @category Stat
 * @return SD of nums
 * ```
 * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
 * StdDev(1,1,2,2,3) \\ 0.748331477
 * ```
 */
function StdDev(...nums) {
    return ant.sd(...nums);
}
globalThis.StdDev = contract(StdDev).sign([owl.num]);
/**
* @category Text
* @return a string of joined elements. [1,2,3] --> '1, 2 and 3'
* ```
* GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
* GrammarJoin('a','b','c') // 'a, b and c'
* ```
*/
function GrammarJoin(...items) {
    let L = items.length;
    if (L === 0)
        return '';
    if (L === 1)
        return String(items[0]);
    let arr = [];
    for (let i = 0; i < L - 1; i++) {
        arr.push(items[i]);
    }
    return arr.join(', ') + ' and ' + items[items.length - 1];
}
globalThis.GrammarJoin = GrammarJoin;
/**
* @category Text
* @return '✔' or '✘'.
* ```
* Tick(true) // '✔'
* Tick(false) // '✘'
* ```
*/
function Tick(bool) {
    return bool ? '✔' : '✘';
}
globalThis.Tick = contract(Tick).sign([owl.bool]);
/**
* @category Text
* @return Array of '✔' or '✘'.
* ```
* Ticks(true,false) // ['✔','✘']
* ```
*/
function Ticks(...bools) {
    return bools.map(x => Tick(x));
}
globalThis.Ticks = contract(Ticks).sign([owl.bool]);
/**
* @category Text
* @return a pair of latex inequalities sign array like ['\\ge', '\\le'].
* ```typescript
* IneqSign(true,true) // ['\\ge', '\\le']
* IneqSign(true,false) // ['\\gt', '\\lt']
* IneqSign(false,true) // ['\\le', '\\ge']
* IneqSign(false,false) // ['\\lt', '\\gt']
* ```
*/
function IneqSign(greater, equal = false) {
    if (greater && equal) {
        return ['\\ge', '\\le'];
    }
    if (greater && !equal) {
        return ['\\gt', '\\lt'];
    }
    if (!greater && equal) {
        return ['\\le', '\\ge'];
    }
    if (!greater && !equal) {
        return ['\\lt', '\\gt'];
    }
    throw 'never';
}
globalThis.IneqSign = contract(IneqSign).sign([owl.bool, owl.bool]);
/**
* @category Text
* @param upSign - put -ve sign on numerator instead of the front.
* @return latex of dfrac p/q like \dfrac{1}{2}.
* ```
* Dfrac(1,2) // '\\dfrac{1}{2}'
* Dfrac(1,-2) // '\\dfrac{-1}{2}'
* Dfrac(6,4) // '\\dfrac{3}{2}'
* Dfrac(6,-2) // '-3'
* Dfrac(0,2) // '0'
* Dfrac(5,0) // undefined
* ```
*/
function Dfrac(numerator, denominator, upSign = false) {
    return ink.printDfrac(numerator, denominator, upSign);
}
globalThis.Dfrac = contract(Dfrac).sign([owl.num, owl.nonZero, owl.bool]);
/**
 * @category Text
 * @return convert index katex to surd
 * ```
 * IndexToSurd('{x}^{0.5}') // '\\sqrt{x}'
 * IndexToSurd('{(y)}^{0.5}') // '\\sqrt{y}'
 * ```
 */
function IndexToSurd(text) {
    return text.replace(/\{\(*([^\{\(\}\)]*)\)*\}\^\{0\.5\}/g, "\\sqrt{$1}");
}
globalThis.IndexToSurd = contract(IndexToSurd).sign([owl.str]);
/**
 * @category Text
 * @return the coordinates '(a, b)' of point [a,b]
 * ```
 * Coord([1,2]) // '(1, 2)'
 * ```
 */
function Coord(point) {
    return '(' + ant.blur(point[0]) + ', ' + ant.blur(point[1]) + ')';
}
globalThis.Coord = contract(Coord).sign([owl.point]);
/**
 * @category Text
 * @return the scientific notation of number
 * ```
 * Sci(123.45) // '1.2345 x 10^{ 2}'
 * Sci(1.2345) // '1.2345'
 * ```
 */
function Sci(num) {
    if (num === 0)
        return '0';
    let m = ant.e(ant.blur(num));
    if (m === 0)
        return num.toString();
    num = num / (Math.pow(10, m));
    num = ant.blur(num);
    return num.toString() + ' \\times ' + '10^{ ' + m + '}';
}
globalThis.Sci = contract(Sci).sign([owl.num]);
/**
 * @category Text
 * @return the katex of long division
 * ```
 * LongDivision([1,2,3,4],[1,2]) //
 * LongDivision([1,2,3,4],[1,2]) //
 * ```
 */
function LongDivision(dividend, divisor) {
    dividend = dividend.reverse();
    divisor = divisor.reverse();
    function xTerm(power) {
        if (power === 0)
            return "";
        if (power === 1)
            return "x";
        return "x^" + power;
    }
    function printSolid(poly) {
        let arr = [];
        poly.forEach((v, i) => {
            if (v !== null)
                arr.push(v + xTerm(i));
        });
        return arr.reverse().join("+");
    }
    function printUnderline(poly) {
        return "\\underline{" + printSolid(poly) + "}";
    }
    function printPhantom(poly) {
        let arr = [];
        poly.forEach((v, i) => {
            if (v === null)
                arr.push(dividend[i] + xTerm(i));
        });
        let T = arr.reverse().join("+");
        if (T.length === 0)
            return "";
        return "\\phantom{" + "+" + T + "}";
    }
    function writeSolid(poly) {
        return printSolid(poly) + printPhantom(poly);
    }
    function writeUnderline(poly) {
        return printUnderline(poly) + printPhantom(poly);
    }
    function pushDivide(dividend, divisor) {
        let t1 = dividend[dividend.length - 1];
        let t2 = divisor[divisor.length - 1];
        return t1 / t2;
    }
    function step(current, divisor) {
        let q = pushDivide(current, divisor);
        let under = divisor.map(x => x * q);
        for (let i = 1; i <= current.length - divisor.length; i++)
            under.unshift(null);
        let next = [];
        for (let i = 0; i < current.length - 1; i++)
            next.push(current[i] - Number(under[i]));
        let nextPrint = [...next].reverse();
        for (let i = 0; i < nextPrint.length; i++)
            if (i > divisor.length - 1)
                nextPrint[i] = null;
        nextPrint.reverse();
        return { next, nextPrint, under, q };
    }
    function compose(dividend, divisor) {
        let T = "\\begin{array}{r}";
        T += "QUOTIENT \\\\";
        T += writeSolid(divisor);
        T += "{\\overline{\\smash{\\big)}";
        T += writeSolid(dividend);
        T += "}}\\\\";
        let current = dividend;
        let quotient = [];
        while (true) {
            let { next, nextPrint, under, q } = step(current, divisor);
            T += writeUnderline(under) + "\\\\";
            T += writeSolid(nextPrint) + "\\\\";
            current = next;
            quotient.push(q);
            if (current.length < divisor.length)
                break;
        }
        T += "\\end{array}";
        quotient.reverse();
        T = T.replace('QUOTIENT', writeSolid(quotient));
        return T;
    }
    return compose(dividend, divisor);
}
globalThis.LongDivision = contract(LongDivision).sign([owl.ntuple, owl.ntuple]);
/**
 * @category Triangle
 * @return Find side length c by cosine law. Input sides a,b and angle C.
 * ```
 * CosineLawLength(5,5,60) // 5
 * CosineLawLength(2,4,30) // 2.47862735
 * CosineLawLength(1,2,180) // 3
 * CosineLawLength(4,6,0) // 2
 * ```
 */
function CosineLawLength(a, b, C) {
    return Math.pow((Math.pow(a, 2) + Math.pow(b, 2) - 2 * a * b * cos(C)), 0.5);
}
globalThis.CosineLawLength = contract(CosineLawLength).sign([owl.positive, owl.positive, [owl.positive, owl.between(0, 180)]]);
/**
 * @category Triangle
 * @return Find angle C by cosine law. Input sides a,b,c.
 * ```
 * CosineLawAngle(5,5,5) // 60
 * CosineLawAngle(3,4,5) // 90
 * CosineLawAngle(7,8,9) // 73.3984504
 * ```
 */
function CosineLawAngle(a, b, c) {
    return arccos((Math.pow(c, 2) - Math.pow(a, 2) - Math.pow(b, 2)) / (-2 * a * b));
}
globalThis.CosineLawAngle = contract(CosineLawAngle).seal({
    arg: [owl.positive],
    args: function triangle_ineq(a, b, c) { return owl.triangleSides([a, b, c]); }
});
/**
 * @category Triangle
 * @return Find area by Heron's formula.
 * ```
 * Heron(3,4,5) // 6
 * Heron(1,1,1) // 0.433012701
 * Heron(7,8,9) // 26.83281573
 * ```
 */
function Heron(a, b, c) {
    let s = (a + b + c) / 2;
    return Math.pow((s * (s - a) * (s - b) * (s - c)), 0.5);
}
globalThis.Heron = contract(Heron).seal({
    arg: [owl.positive],
    args: function triangle_ineq(a, b, c) { return owl.triangleSides([a, b, c]); }
});
/**
 * @category Triangle
 * @param fix - Round all return values to integer.
 * @return Return the 6 elements of a triangle given vertice. { sideC, angleB, sideA, angleC, sideB, angleA }
 * ```
 * TriangleFromVertex([0,0],[4,0],[0,3],false)
 * // {sideC:4, angleB:36.86989765, sideA:5, angleC:53.13013235, sideB:3, angleA:90}
 * ```
 */
function TriangleFromVertex(A, B, C, fix = true) {
    let sideC = Distance(A, B);
    let sideA = Distance(B, C);
    let sideB = Distance(C, A);
    let angleC = CosineLawAngle(sideA, sideB, sideC);
    let angleA = CosineLawAngle(sideB, sideC, sideA);
    let angleB = CosineLawAngle(sideA, sideC, sideB);
    if (fix) {
        sideC = Fix(sideC);
        sideA = Fix(sideA);
        sideB = Fix(sideB);
        angleC = Fix(angleC);
        angleA = Fix(angleA);
        angleB = Fix(angleB);
    }
    return { sideC, angleB, sideA, angleC, sideB, angleA };
}
globalThis.TriangleFromVertex = contract(TriangleFromVertex).sign([owl.point, owl.point, owl.point, owl.bool]);
/**
 * @category Triangle
 * @param triangle - unknown elements are null.
 * @return Solve a triangle. return the triangle object solved.
 * ```
 * SolveTriangle({sideC:2, sideA:2, sideB:2})
 * // {sideC:2, angleB:60, sideA:2, angleC:60, sideB:2, angleA:60}
 * SolveTriangle({sideC:3, angleB:90, sideA:4})
 * // {sideC:3, angleB:90, sideA:4, angleC:36.86989765, sideB:5, angleA:53.13010235}
 * SolveTriangle({sideC:5, angleB:30, angleC:80})
 * // {sideC:5, angleB:30, sideA:4.770944471, angleC:80, sideB:2.53856653, angleA:70}
 * SolveTriangle({sideC:6, angleB:30, angleA:40})
 * // {sideC:6, angleB:30, sideA:4.10424172, angleC:110, sideB:3.192533317, angleA:40}
 * ```
 */
function SolveTriangle({ sideA = null, sideB = null, sideC = null, angleA = null, angleB = null, angleC = null }) {
    let a = sideA;
    let b = sideB;
    let c = sideC;
    let A = angleA;
    let B = angleB;
    let C = angleC;
    function angleSum() {
        if (A === null && B !== null && C !== null)
            A = 180 - B - C;
        if (B === null && A !== null && C !== null)
            B = 180 - A - C;
        if (C === null && B !== null && A !== null)
            C = 180 - A - B;
    }
    function SSS() {
        if (a !== null && b !== null && c !== null) {
            A = CosineLawAngle(b, c, a);
            B = CosineLawAngle(c, a, b);
            C = CosineLawAngle(a, b, c);
        }
    }
    function SAS() {
        if (a !== null && b !== null && C !== null && c === null)
            c = CosineLawLength(a, b, C);
        if (b !== null && c !== null && A !== null && a === null)
            a = CosineLawLength(b, c, A);
        if (c !== null && a !== null && B !== null && b === null)
            b = CosineLawLength(c, a, B);
    }
    function AAS() {
        let r = null;
        if (A !== null && a !== null && r === null)
            r = sin(A) / a;
        if (B !== null && b !== null && r === null)
            r = sin(B) / b;
        if (C !== null && c !== null && r === null)
            r = sin(C) / c;
        if (r !== null && A !== null && a === null)
            a = sin(A) / r;
        if (r !== null && B !== null && b === null)
            b = sin(B) / r;
        if (r !== null && C !== null && c === null)
            c = sin(C) / r;
    }
    for (let i = 0; i < 10; i++) {
        if (a !== null && b !== null && c !== null && A !== null && B !== null && C !== null) {
            return { sideA: a, sideB: b, sideC: c, angleA: A, angleB: B, angleC: C };
        }
        angleSum();
        SSS();
        SAS();
        AAS();
    }
    Should(false, 'Solve Triangle Fail!');
    throw 'never';
}
globalThis.SolveTriangle = contract(SolveTriangle).sign();
/**
 * @category Trigonometry
 * @param rect - The rectangular coordinates [x,y] of a point, or a polar angle theta.
 * @return  the quadrant of a point or angle: 'I','II','III' or 'IV'.
 * ```
 * Quadrant([1,1]) \\ 'I'
 * Quadrant([-1,1]) \\ 'II'
 * Quadrant(200) \\ 'III'
 * Quadrant(350) \\ 'IV'
 * ```
 */
function Quadrant(rect) {
    if (!Array.isArray(rect))
        rect = PolToRect([1, rect]);
    const q = RectToPol(rect)[1];
    if (q >= 0 && q < 90)
        return "I";
    if (q >= 90 && q < 180)
        return "II";
    if (q >= 180 && q < 270)
        return "III";
    if (q >= 270 && q < 360)
        return "IV";
    Should(false, 'fail to parse quadrant!');
    throw 'never';
}
globalThis.Quadrant = contract(Quadrant).sign([owl.or([owl.point, owl.num])]);
/**
 * @category Trigonometry
 * @return the rectangular coordinates [x,y] from a polar coordinates [r,theta].
 * ```
 * PolToRect([1,45]) // [0.707,0.707]
 * ```
 */
function PolToRect([r, q]) {
    return [r * cos(q), r * sin(q)];
}
globalThis.PolToRect = contract(PolToRect).sign([owl.polar]);
/**
 * @category Trigonometry
 * @return the polar coordinates [r,theta] of a rectangular coordinates [x,y].
 * ```
 * RectToPol([1,1]) // [1.414,45]
 * ```
 */
function RectToPol([x, y]) {
    const r = Math.sqrt(x * x + y * y);
    let q = Math.atan2(y, x) * 180 / Math.PI;
    if (q < 0)
        q = q + 360;
    return [r, q];
}
globalThis.RectToPol = contract(RectToPol).sign([owl.point]);
/**
 * @category Trigonometry
 * @return the sign from ASTC diagram, 1 or -1, representing positive or negative.
 * ```
 * ASTC(2,'cos') // -1
 * ASTC('III','tan') // 1
 * ```
 */
function ASTC(quadrant, func) {
    if (quadrant == "I")
        quadrant = 1;
    if (quadrant == "II")
        quadrant = 2;
    if (quadrant == "III")
        quadrant = 3;
    if (quadrant == "IV")
        quadrant = 4;
    if (quadrant == 1)
        return 1;
    if (quadrant == 2)
        return func === 'sin' ? 1 : -1;
    if (quadrant == 3)
        return func === 'tan' ? 1 : -1;
    if (quadrant == 4)
        return func === 'cos' ? 1 : -1;
    return 0;
}
globalThis.ASTC = contract(ASTC).sign([owl.quadrant, owl.trig]);
/**
 * @category Trigonometry
 * @return the roots of trig equations sin(x)=k , cos(x)=k or tan(x)=k. The angles [r1,r2,r3].
 * ```
 * TrigRoot('sin',0) // [0, 180, 360]
 * TrigRoot('sin',0.5) // [30, 150, undefined]
 * TrigRoot('sin',1) // [90, undefined, undefined]
 * ```
 */
function TrigRoot(func, k) {
    if (func == 'sin') {
        if (k > 1 || k < -1)
            return [undefined, undefined, undefined];
        if (k == 0)
            return [0, 180, 360];
        if (k == 1)
            return [90, undefined, undefined];
        if (k == -1)
            return [270, undefined, undefined];
        if (k > 0) {
            let a = arcsin(k);
            let b = 180 - a;
            return [a, b, undefined];
        }
        if (k < 0) {
            let x = -arcsin(k);
            let a = 180 + x;
            let b = 360 - x;
            return [a, b, undefined];
        }
    }
    if (func == 'cos') {
        if (k > 1 || k < -1)
            return [undefined, undefined, undefined];
        if (k == 0)
            return [90, 270, undefined];
        if (k == 1)
            return [0, 360, undefined];
        if (k == -1)
            return [180, undefined, undefined];
        let a = arccos(k);
        let b = 360 - a;
        return [a, b, undefined];
    }
    if (func == 'tan') {
        if (k == 0)
            return [0, 180, 360];
        if (k > 0) {
            let a = arctan(k);
            let b = 180 + a;
            return [a, b, undefined];
        }
        if (k < 0) {
            let x = -arctan(k);
            let a = 180 - x;
            let b = 360 - x;
            return [a, b, undefined];
        }
    }
    return [undefined, undefined, undefined];
}
globalThis.TrigRoot = contract(TrigRoot).sign([owl.trig, owl.num]);
/**
 * @category Utility
 * @return The HCF of nums.
 * ```
 * HCF(6,8) // 2
 * HCF(6,8,9) // 1
 * HCF(1,3) // 1
 * HCF(0.5,3) // throw
 * HCF(0,3) // throw
 * ```
 */
function HCF(...nums) {
    nums = nums.map(ant.blur);
    return ant.hcf(...nums);
}
globalThis.HCF = contract(HCF).sign([owl.nonZeroInt]);
/**
 * @category Utility
 * @return The LCM of nums.
 * ```
 * LCM(2,3) // 6
 * LCM(2,3,5) // 30
 * LCM(0.5,3) // throw
 * LCM(0,3) // throw
 * ```
 */
function LCM(...nums) {
    nums = nums.map(ant.blur);
    return ant.lcm(...nums);
}
globalThis.LCM = contract(LCM).sign([owl.nonZeroInt]);
/**
 * @category Utility
 * @param num - from 1 to 10
 * @return roman number
 * ```
 * Romanize(1) // "I"
 * Romanize(2) // "II"
 * ```
 */
function Romanize(num) {
    return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][num - 1];
}
globalThis.Romanize = contract(Romanize).sign([[owl.positiveInt, owl.between(1, 10)]]);
/**
 * @category Utility
 * @param roman - from I to X
 * @return arabic number
 * ```
 * DeRomanize("I") // 1
 * DeRomanize("II") // 2
 * ```
 */
function DeRomanize(roman) {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return romans.indexOf(roman) + 1;
}
globalThis.DeRomanize = contract(DeRomanize).sign([owl.roman]);
/**
 * @category Vector
 * @return the vector OP
 * ```
 * Vector([1,2],[10,5]) // [9,3]
 * ```
 */
function Vector(O, P) {
    return [P[0] - O[0], P[1] - O[1]];
}
globalThis.Vector = contract(Vector).sign([owl.point]);
/**
 * @category Vector
 * @return sum of all vectors
 * ```
 * VectorAdd([1,2],[3,4],[5,6]) // [9,12]
 * ```
 */
function VectorAdd(...vectors) {
    const x = Sum(...vectors.map(p => p[0]));
    const y = Sum(...vectors.map(p => p[1]));
    return [x, y];
}
globalThis.VectorAdd = contract(VectorAdd).sign([owl.vector]);
/**
 * @category Vector
 * @return mean of all vectors
 * ```
 * VectorMean([1,2],[3,4],[5,6]) // [3,4]
 * VectorMean([0,0],[2,0],[2,2],[0,2]) // [1,1]
 * ```
 */
function VectorMean(...vectors) {
    const x = Sum(...vectors.map(p => p[0])) / vectors.length;
    const y = Sum(...vectors.map(p => p[1])) / vectors.length;
    return [x, y];
}
globalThis.VectorMean = contract(VectorMean).sign([owl.vector]);
/**
 * @category Vector
 * @return length of vector
 * ```
 * VectorLength([-3,4]) // 5
 * VectorLength([0,0]) // 0
 * VectorLength([1,2]) // sqrt(5)
 * ```
 */
function VectorLength(v) {
    const [x, y] = v;
    return Math.pow((x * x + y * y), 0.5);
}
globalThis.VectorLength = contract(VectorLength).sign([owl.vector]);
/**
 * @category Vector
 * @return length of vector
 * ```
 * VectorArg([2,0]) // 0
 * VectorArg([0,2]) // 90
 * VectorArg([-2,0]) // 180
 * VectorArg([0,-2]) // 270
 * VectorArg([0,0]) // 0
 * VectorArg([1,1]) // 45
 * ```
 */
function VectorArg(v) {
    const [x, y] = v;
    let arg = Math.atan2(y, x) / Math.PI * 180;
    if (arg < 0)
        arg += 360;
    return arg;
}
globalThis.VectorArg = contract(VectorArg).sign([owl.vector]);
/**
 * @category Vector
 * @return find [kx,ky] from [x,y]
 * ```
 * VectorScale([1,2],2) // [2,4]
 * VectorScale([1,2],-2) // [-2,-4]
 * ```
 */
function VectorScale(v, k) {
    return [k * v[0], k * v[1]];
}
globalThis.VectorScale = contract(VectorScale).sign([owl.vector, owl.num]);
/**
 * @category Vector
 * @return the negative of the vector
 * ```
 * VectorRev([-3,4]) // [3,-4]
 * VectorRev([0,0]) // [0,0]
 * VectorRev([1,2]) // [-1,-2]
 * ```
 */
function VectorRev(v) {
    const [x, y] = v;
    return [-x, -y];
}
globalThis.VectorRev = contract(VectorRev).sign([owl.vector]);
/**
 * @category Vector
 * @return the unit vector of v
 * ```
 * VectorUnit([2,0]) // [1,0]
 * VectorUnit([0,-2]) // [0,-1]
 * VectorUnit([1,2]) // [1/sqrt(5),2/sqrt(5)]
 * ```
 */
function VectorUnit(v) {
    const [x, y] = v;
    const L = VectorLength(v);
    return [x / L, y / L];
}
globalThis.VectorUnit = contract(VectorUnit).sign([owl.vector]);
/**
 * @category Vector
 * @return scale the vector to the given length
 * ```
 * VectorScaleTo([2,0],10) // [10,0]
 * VectorScaleTo([0,-2],100) // [0,-100]
 * VectorScaleTo([-3,4],15) // [-9,12]
 * ```
 */
function VectorScaleTo(v, length) {
    return VectorScale(VectorUnit(v), length);
}
globalThis.VectorScaleTo = contract(VectorScaleTo).sign([owl.vector, owl.num]);
/**
 * @category Vector
 * @return rotate a vector anticlockwise by angle.
 * ```
 * VectorRotate([1,2],90) // [-2,1]
 * ```
 */
function VectorRotate(v, angle) {
    const [x, y] = v;
    const S = sin(angle);
    const C = cos(angle);
    const x1 = x * C - y * S;
    const y1 = x * S + y * C;
    return [x1, y1];
}
globalThis.VectorRotate = contract(VectorRotate).sign([owl.vector, owl.num]);
/**
* @category 3DPen
* @return projector function from 3D point to 2D plane
* ```typescript
* const pj = Projector(60,0.5) // create a 3D projector function
* pj(1,1,0) // [1.25, 0.433012701892]
* ```
*/
function Projector(angle = 60, depth = 0.5) {
    return function (x, y, z) {
        let x_new = x + depth * y * cos(angle);
        let y_new = z + depth * y * sin(angle);
        return [x_new, y_new];
    };
}
globalThis.Projector = Projector;
/**
 * @category DrawingPen
 */
class AutoPenCls {
    /**
     * @ignore
     */
    constructor() {
        this.pen = new Pen();
    }
    /**
     * Export the canvas to image tag.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```typescript
     * question = autoPen.export(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    export(html, placeholder) {
        return this.pen.export(html, placeholder);
    }
    /**
     * A short division diagram for prime factorization of numbers.
     * @category tool
     * @param numbers - The array of numbers to factorize.
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.PrimeFactorization({numbers:[12,24]})
     * ```
     */
    PrimeFactorization({ numbers }) {
        function lowestFactor(arr) {
            const primes = [2, 3, 5, 7, 11, 13, 17, 19];
            for (let p of primes) {
                if (HCF(...arr) % p === 0)
                    return p;
            }
            return 1;
        }
        const pen = new Pen();
        pen.setup.size(2);
        pen.setup.range([-10, 10], [-15, 5]);
        const w = 1;
        const h = 1;
        function drawRow(arr, pivot) {
            for (let i = 0; i < arr.length; i++) {
                pen.write([pivot[0] + i * w, pivot[1]], arr[i].toString());
            }
        }
        function drawVert(pivot) {
            pen.line([pivot[0] - 0.5 * w, pivot[1] - h / 2], [pivot[0] - 0.5 * w, pivot[1] + h / 2]);
        }
        function drawUnderline(arr, pivot) {
            for (let i = 0; i < arr.length; i++) {
                pen.line([pivot[0] + i * w - 0.5 * w, pivot[1] - h / 2], [pivot[0] + i * w + 0.5 * w, pivot[1] - h / 2]);
            }
        }
        function drawDivisor(pivot, divisor) {
            pen.write([pivot[0] - w, pivot[1]], divisor.toString());
        }
        function drawDiv(arr, pivot) {
            const d = lowestFactor(arr);
            drawVert(pivot);
            drawUnderline(arr, pivot);
            drawDivisor(pivot, d);
            arr = arr.map(x => x / d);
            pivot = [pivot[0], pivot[1] - h];
            drawRow(arr, pivot);
            return [arr, pivot];
        }
        let pivot = [1, 0];
        drawRow(numbers, pivot);
        while (HCF(...numbers) > 1) {
            [numbers, pivot] = drawDiv(numbers, pivot);
        }
        pen.autoCrop();
        this.pen = pen;
    }
    /**
     * Arrow diagram for inequalities.
     * @category tool
     * @param items - Represent the inequalities.
     * @param ticks - Represent the tick or cross for each region.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.Inequalities({
     *    items:[
     *       { position: 0.3, sign: "\\ge", num: 5,vertical:true },
     *       { position: 0.7, sign: "<", num: "k" }
     *    ],
     *    ticks:[true,true,false]
     * })
     * ```
     */
    Inequalities({ items = [], ticks = [], scale = 0.8, ratio = 0.5 }) {
        const width = 5;
        const height = 2;
        items = items.map((x, i) => {
            x.base = -i * (height + 2);
            return x;
        });
        const pen = new Pen();
        pen.setup.size(scale, ratio);
        pen.setup.range([-width - 2, width + 2], [-(items.length) * (height + 2) + 2, height + 1]);
        function inequality({ position, sign, num, base, vertical }) {
            let greater = sign.includes('>') || sign.includes('g');
            let solid = sign.includes('=') || sign.includes('e');
            let align = -width + 2 * width * position;
            let B = [align, base];
            let T = [align, base + height];
            let E = [greater ? align + 0.4 * width : align - 0.4 * width, base + height];
            let E1 = [greater ? width : -width, base + height];
            let E2 = [greater ? width : -width, base];
            if (vertical) {
                pen.set.strokeColor('grey');
                pen.set.dash([10, 10]);
                pen.graph.vertical(align);
                pen.set.strokeColor();
                pen.set.dash();
            }
            pen.polyshade(B, T, E1, E2);
            pen.arrow([-width, base], [width, base]);
            pen.line(B, T);
            pen.arrow(T, E);
            pen.set.fillColor(solid ? 'black' : 'white');
            pen.set.weight(3);
            pen.circle(T, 3, [0, 360], true);
            pen.set.weight();
            pen.set.fillColor('black');
            pen.label.point(B, num.toString(), 270);
        }
        function tick(position, correct) {
            let align = -width + 2 * width * position;
            let y = -(items.length - 1) * (height + 2) - height / 2;
            pen.write([align, y], correct ? '✔' : '✘');
        }
        items.forEach(x => inequality(x));
        let cutting = items.map(x => x.position);
        cutting = [0, ...cutting, 1];
        for (let i = 0; i < ticks.length; i++) {
            let p = (cutting[i] + cutting[i + 1]) / 2;
            tick(p, ticks[i]);
        }
        pen.autoCrop();
        this.pen = pen;
    }
    /**
     * Trig Graph for solving basic trig equation.
     * @category tool
     * @param trig - 'sin' | 'cos' | 'tan'
     * @param k - value of trig, like sin = k.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.TrigSolution({trig:'sin', k:0.5})
     * ```
     */
    TrigSolution({ trig = 'sin', k = 0, scale = 0.7, ratio = 0.7 }) {
        if (trig === 'sin' || trig === 'cos') {
            if (k > 2)
                k = 2;
            if (0.9 < k && k < 1)
                k = 0.9;
            if (0 < k && k < 0.3)
                k = 0.3;
            if (-1 < k && k < -0.9)
                k = -0.9;
            if (-0.3 < k && k < 0)
                k = -0.3;
            if (k < -2)
                k = -2;
        }
        if (trig === 'tan') {
            if (k > 4)
                k = 4;
            if (k < -4)
                k = -4;
            if (0 < k && k < 0.9)
                k = 0.9;
            if (0 > k && k > -0.9)
                k = -0.9;
        }
        let [a, b, c] = TrigRoot(trig, k);
        const pen = new Pen();
        pen.setup.size(scale, ratio);
        let limit = Max(1, Abs(k)) + 0.2;
        if (trig === 'sin')
            pen.setup.range([-40, 390], [-limit, limit]);
        if (trig === 'cos')
            pen.setup.range([-40, 390], [-limit, limit]);
        if (trig === 'tan')
            pen.setup.range([-40, 390], [-5, 5]);
        pen.axis.x();
        pen.axis.y();
        if (trig === 'sin' || trig === 'cos') {
            pen.tick.x(360);
        }
        if (trig === 'tan') {
            pen.tick.x(180);
        }
        if (trig === 'sin' || trig === 'cos') {
            pen.cutterV([0, 1]);
            pen.cutterV([0, -1]);
            pen.label.point([0, 1], '1', 180);
            pen.label.point([0, -1], '-1', 180);
        }
        pen.set.weight(1.5);
        if (trig === 'sin')
            pen.plot(x => sin(x), 0, 360);
        if (trig === 'cos')
            pen.plot(x => cos(x), 0, 360);
        if (trig === 'tan') {
            pen.plot(x => tan(x), 0, 360);
            pen.set.strokeColor('grey');
            pen.set.dash([5, 10]);
            pen.set.weight(0.7);
            pen.graph.vertical(90);
            pen.graph.vertical(270);
            pen.set.strokeColor();
            pen.set.dash();
            pen.set.weight(1);
        }
        pen.set.weight(1);
        function arrow(x, y, func, label = '') {
            if (x === undefined)
                return;
            let anchor = 0;
            let skipAnchor = false;
            if (func === 'sin') {
                if ([0, 90, 180, 270, 360].includes(x))
                    skipAnchor = true;
                if (x > 0 && x < 90)
                    anchor = 0;
                if (x > 90 && x < 270)
                    anchor = 180;
                if (x > 270 && x < 360)
                    anchor = 360;
            }
            if (func === 'cos') {
                if ([0, 90, 180, 270, 360].includes(x))
                    skipAnchor = true;
                if (x > 0 && x < 180 && x !== 90)
                    anchor = 0;
                if (x > 180 && x < 360 && x !== 270)
                    anchor = 360;
            }
            if (func === 'tan') {
                if ([0, 90, 180, 270, 360].includes(x))
                    skipAnchor = true;
                if (x > 0 && x < 180)
                    anchor = 0;
                if (x > 180 && x < 360)
                    anchor = 180;
            }
            let P = [x, y];
            let Q = [x, 0];
            let R = [anchor, 0];
            pen.set.fillColor();
            pen.point(P);
            pen.set.fillColor('red');
            if (y !== 0) {
                pen.arrow(P, Q);
            }
            if (y >= 0) {
                pen.label.point(Q, label, 270);
            }
            if (y < 0) {
                pen.label.point(Q, label, 90);
            }
            if (skipAnchor)
                return;
            pen.set.weight(3);
            pen.set.strokeColor('blue');
            pen.line(R, Q);
            pen.set.weight(1);
            pen.set.strokeColor('red');
        }
        pen.set.strokeColor('red');
        pen.set.fillColor('red');
        pen.set.dash([5, 5]);
        pen.graph.horizontal(k);
        pen.set.dash();
        if (trig === 'sin') {
            if (k === 0) {
                arrow(a, k, 'sin', '0');
                arrow(b, k, 'sin', '180');
                arrow(c, k, 'sin', '360');
            }
            if (k === 1) {
                arrow(a, k, 'sin', '90');
            }
            if (k === -1) {
                arrow(a, k, 'sin', '270');
            }
            if (k > -1 && k < 1 && k !== 0) {
                arrow(a, k, 'sin', 'α');
                arrow(b, k, 'sin', 'β');
            }
        }
        if (trig === 'cos') {
            if (k === 0) {
                arrow(a, k, 'cos', '90');
                arrow(b, k, 'cos', '270');
            }
            if (k === 1) {
                arrow(a, k, 'cos', '0');
                arrow(b, k, 'cos', '360');
            }
            if (k === -1) {
                arrow(a, k, 'cos', '180');
            }
            if (k > -1 && k < 1 && k !== 0) {
                arrow(a, k, 'cos', 'α');
                arrow(b, k, 'cos', 'β');
            }
        }
        if (trig === 'tan') {
            if (k === 0) {
                arrow(a, k, 'tan', '0');
                arrow(b, k, 'tan', '180');
                arrow(c, k, 'tan', '360');
            }
            if (k !== 0) {
                arrow(a, k, 'tan', 'α');
                arrow(b, k, 'tan', 'β');
            }
        }
        this.pen = pen;
    }
    /**
     * Sketch for solving quadratic inequality.
     * @category tool
     * @param quadratic - [a,b,c] representing coeff of quadratic inequality.
     * @param sign - The sign of the inequality. Can be like '>=' , '<' or '\\ge' , '\\lt'.
     * @param scale - scale for pen.setup.size()
     * @param ratio - ratio for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.QuadraticInequality({quadratic:[1,2,-3],sign:'\\ge'})
     * ```
     */
    QuadraticInequality({ quadratic, sign, scale = 0.5, ratio = 0.8 }) {
        let a = quadratic[0];
        let b = quadratic[1];
        let c = quadratic[2];
        let greater = sign.includes('>') || sign.includes('g');
        let equal = sign.includes('=') || sign.includes('e');
        let p;
        let q;
        try {
            [p, q] = QuadraticRoot(a, b, c);
        }
        catch (_a) {
            [p, q] = [undefined, undefined];
        }
        if (p !== undefined && q !== undefined) {
            [p, q] = [Max(p, q), Min(p, q)];
            p = Fix(p, 2);
            q = Fix(q, 2);
        }
        const pen = new Pen();
        pen.setup.size(scale, ratio);
        pen.setup.range([-5, 5], [-5, 5]);
        pen.axis.x('');
        if (p !== undefined && q !== undefined && p !== q) {
            pen.plot(x => Sign(a) * (Math.pow(x, 2) - 4));
            let P = [2, 0];
            let Q = [-2, 0];
            pen.cutterH(P);
            pen.cutterH(Q);
            pen.set.weight(3);
            pen.set.strokeColor('red');
            if (a > 0) {
                if (greater) {
                    pen.plot(x => Sign(a) * (Math.pow(x, 2) - 4), -5, -2);
                    pen.plot(x => Sign(a) * (Math.pow(x, 2) - 4), 2, 5);
                }
                else {
                    pen.plot(x => Sign(a) * (Math.pow(x, 2) - 4), -2, 2);
                }
            }
            if (a < 0) {
                if (greater) {
                    pen.plot(x => Sign(a) * (Math.pow(x, 2) - 4), -2, 2);
                }
                else {
                    pen.plot(x => Sign(a) * (Math.pow(x, 2) - 4), -5, -2);
                    pen.plot(x => Sign(a) * (Math.pow(x, 2) - 4), 2, 5);
                }
            }
            pen.set.weight();
            pen.set.strokeColor();
            pen.label.point(P, p.toString(), a > 0 ? 315 : 45);
            pen.label.point(Q, q.toString(), a > 0 ? 225 : 135);
        }
        if (p === undefined && q === undefined) {
            if ((a > 0 && greater) || (a < 0 && !greater)) {
                pen.set.weight(3);
                pen.set.strokeColor('red');
            }
            if (a > 0)
                pen.plot(x => Math.pow(x, 2) + 2);
            if (a < 0)
                pen.plot(x => -(Math.pow(x, 2)) - 2);
        }
        if (p !== undefined && q !== undefined && p === q) {
            let func = a > 0 ? (x) => Math.pow(x, 2) : (x) => -(Math.pow(x, 2));
            pen.plot(func);
            pen.label.point([0, 0], p.toString(), a > 0 ? 270 : 90);
            if (a > 0) {
                pen.set.weight(3);
                pen.set.strokeColor('red');
                if (greater && equal)
                    pen.plot(func);
                if (greater && !equal) {
                    pen.plot(func);
                    pen.set.strokeColor();
                    pen.set.fillColor('white');
                    pen.circle([0, 0], 4, [0, 360], true);
                }
                if (!greater && equal) {
                    pen.set.fillColor('red');
                    pen.circle([0, 0], 4, [0, 360], true);
                }
                if (!greater && !equal) { }
            }
            if (a < 0) {
                pen.set.weight(3);
                pen.set.strokeColor('red');
                if (!greater && equal)
                    pen.plot(func);
                if (!greater && !equal) {
                    pen.plot(func);
                    pen.set.strokeColor();
                    pen.set.fillColor('white');
                    pen.circle([0, 0], 4, [0, 360], true);
                }
                if (greater && equal) {
                    pen.set.fillColor('red');
                    pen.circle([0, 0], 4, [0, 360], true);
                }
                if (greater && !equal) { }
            }
        }
        this.pen = pen;
    }
    /**
     * Draw a triangle.
     * @category tool
     * @param vertices - [A,B,C] an array of coordinates [x,y] of 3 vertices, must be anticlockwise.
     * @param triangle - The elements of triangle to print, {sideC,angleB,sideA,angleC,sideB,angleA}. If falsy, show no label.
     * @param labels - The labels of the vertices. If falsy, show no label.
     * @param heights - Whether to draw the height.
     * @param scale - scale for pen.setup.size()
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.Triangle({
     *   vertices:[[0,0],[4,0],[0,3]],
     *   triangle:{sideC:4,angleB:37,sideA:5,angleC:53,sideB:3,angleA:90},
     *   labels:['A','B','C'],
     *   heights :[false, false, false]
     * })
     * ```
     */
    Triangle({ vertices, triangle = {}, labels = ['', '', ''], heights = [false, false, false], scale = 0.8 }) {
        let A = vertices[0];
        let B = vertices[1];
        let C = vertices[2];
        let xmax = Math.max(A[0], B[0], C[0]);
        let xmin = Math.min(A[0], B[0], C[0]);
        let xmid = (xmax + xmin) / 2;
        let ymax = Math.max(A[1], B[1], C[1]);
        let ymin = Math.min(A[1], B[1], C[1]);
        let ymid = (ymax + ymin) / 2;
        let dx = xmax - xmin;
        let dy = ymax - ymin;
        let dmax = Math.max(dx, dy) * 0.8;
        let G = VectorMean(A, B, C);
        let T = triangle;
        let sideA = T.sideA;
        let sideB = T.sideB;
        let sideC = T.sideC;
        let angleA = T.angleA;
        let angleB = T.angleB;
        let angleC = T.angleC;
        let labelA = labels[0];
        let labelB = labels[1];
        let labelC = labels[2];
        const pen = new Pen();
        pen.setup.size(scale);
        pen.setup.range([xmid - dmax, xmid + dmax], [ymid - dmax, ymid + dmax]);
        function drawHeight(vertex, base) {
            let F = PerpendicularFoot(base[0], base[1], vertex);
            pen.set.dash([5, 5]);
            pen.set.strokeColor('grey');
            pen.line(vertex, F);
            if (F[0] === base[0][0] && F[1] === base[0][1]) {
                pen.line(F, base[1]);
            }
            else {
                pen.line(F, base[0]);
            }
            pen.set.dash();
            if (F[0] === base[0][0] && F[1] === base[0][1]) {
                pen.decorate.rightAngle(vertex, F, base[1]);
            }
            else {
                pen.decorate.rightAngle(vertex, F, base[0]);
            }
            pen.set.strokeColor();
        }
        if (heights[0])
            drawHeight(A, [B, C]);
        if (heights[1])
            drawHeight(B, [C, A]);
        if (heights[2])
            drawHeight(C, [A, B]);
        pen.polygon(A, B, C);
        pen.set.textItalic(true);
        if (labelA)
            pen.label.point(A, labelA.toString(), Inclination(G, A));
        if (labelB)
            pen.label.point(B, labelB.toString(), Inclination(G, B));
        if (labelC)
            pen.label.point(C, labelC.toString(), Inclination(G, C));
        pen.set.textItalic();
        let AB = [B[0] - A[0], B[1] - A[1]];
        let BC = [C[0] - B[0], C[1] - B[1]];
        let anticlockwise = (AB[0] * BC[1] - AB[1] * BC[0]) > 0;
        function writeSide(side, start, end) {
            if (side) {
                if (typeof side === 'string' && !(/\d/.test(side)))
                    pen.set.textItalic(true);
                if (anticlockwise) {
                    pen.label.line([start, end], side.toString());
                }
                else {
                    pen.label.line([end, start], side.toString());
                }
                pen.set.textItalic();
            }
        }
        writeSide(sideC, A, B);
        writeSide(sideA, B, C);
        writeSide(sideB, C, A);
        function writeAngle(angle, P, O, Q) {
            if (angle) {
                if (typeof angle === 'string')
                    pen.set.textItalic(true);
                if (typeof angle === 'number')
                    angle = angle + '°';
                if (anticlockwise) {
                    pen.decorate.anglePolar(P, O, Q);
                    pen.label.anglePolar([P, O, Q], angle);
                }
                else {
                    pen.decorate.anglePolar(Q, O, P);
                    pen.label.anglePolar([Q, O, P], angle);
                }
                pen.set.textItalic();
            }
        }
        writeAngle(angleA, B, A, C);
        writeAngle(angleB, C, B, A);
        writeAngle(angleC, A, C, B);
        pen.autoCrop();
        this.pen = pen;
    }
    /**
     * Draw a graph for linear programming.
     * @category tool
     * @param constraints - Constraint as system of inequalities, like [[1,1,'<',2]] represent x+y<2.
     * @param field - The target linear function to optimize, [a,b,c] represent ax+by+c.
     * @param contours - The contours to draw, [4,5] represent P=4 and P=5.
     * @param labelConstraints - Constraint to label integral points.
     * @param highlights - Points to highlight, [{point,color,circle,contour,coordinates,label}].
     * @param ranges - Range of Canvas.
     * @param resolution - Resolution of Canvas
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * let constraints = [[1, 1, "<=", 5], [1, -1, "<", 4], [2, 1, ">=", -5], [3, 1, ">", -10]]
     * pen.LinearProgram({
     *     constraints,
     *     field: [1, -3, 3],
     *     contours: [4,5],
     *     labelConstraints: [(x,y)=>y>0],
     *     highlights: [{point:[0,0]}],
     *     ranges: [[-10,10],[-10,10]],
     *     resolution: 0.1,
     *     grid: 0,
     *     subGrid: 0,
     *     tick: 0,
     *     showLine: true,
     *     showShade: true,
     *     showVertex: false,
     *     showVertexCoordinates: false,
     *     showVertexLabel: false,
     *     showVertexMax: false,
     *     showVertexMin: false,
     *     showIntegral: false,
     *     showIntegralLabel: false,
     *     showIntegralMax: false,
     *     showIntegralMin: false,
     *     contourColor : "grey",
     *     constraintColors = ['black','black']
     * })
     * ```
     */
    LinearProgram({ constraints = [], field = [0, 0, 0], contours = [], labelConstraints = [], highlights = [], ranges = [[-10, 10], [-10, 10]], resolution = 0.1, grid = 0, subGrid = 0, tick = 0, showLine = true, showShade = true, showVertex = false, showVertexCoordinates = false, showVertexLabel = false, showVertexMax = false, showVertexMin = false, showIntegral = false, showIntegralLabel = false, showIntegralMax = false, showIntegralMin = false, contourColor = "grey", constraintColors = [], }) {
        function fieldAt(p) {
            const [a, b, c] = field;
            const [x, y] = p;
            return Fix(a * x + b * y + c, 1);
        }
        let vertices = FeasiblePolygon(...constraints);
        let integrals = [];
        if (showIntegral || showIntegralMax || showIntegralMin) {
            integrals = FeasibleIntegral(...constraints);
        }
        const pen = new Pen();
        let [[xmin, xmax], [ymin, ymax]] = ranges;
        let bound = 0.7;
        xmin -= bound;
        xmax += bound;
        ymin -= bound;
        ymax += bound;
        pen.setup.range([xmin, xmax], [ymin, ymax]);
        pen.setup.resolution(resolution);
        pen.axis.x('');
        pen.axis.y('');
        if (grid > 0) {
            pen.set.alpha(0.6);
            pen.grid.x(grid);
            pen.grid.y(grid);
            pen.set.alpha();
        }
        if (subGrid > 0) {
            pen.set.alpha(0.4);
            pen.grid.x(grid);
            pen.grid.y(grid);
            pen.set.alpha();
        }
        if (tick > 0) {
            pen.set.fillColor("grey");
            pen.set.textSize(0.8);
            pen.tick.x(tick);
            pen.tick.y(tick);
            pen.set.fillColor();
            pen.set.textSize();
        }
        function drawLines() {
            var _a;
            for (let i = 0; i < constraints.length; i++) {
                let [a, b, s, c] = constraints[i];
                let [_, eq] = ink.parseIneq(s);
                if (!eq)
                    pen.set.dash([5, 5]);
                pen.set.color((_a = constraintColors[i]) !== null && _a !== void 0 ? _a : 'black');
                pen.graph.linear(a, b, -c);
                pen.set.color();
                pen.set.dash();
            }
        }
        labelConstraints.push((x, y) => x > xmin);
        labelConstraints.push((x, y) => x < xmax);
        labelConstraints.push((x, y) => y > ymin);
        labelConstraints.push((x, y) => y < ymax);
        function labelField(p) {
            pen.set.textAlign("left");
            pen.label.point(p, fieldAt(p).toString(), 60, 10);
            pen.set.textAlign();
        }
        function drawIntegral(label = false) {
            integrals.forEach((p) => {
                pen.point(p);
                if (label && labelConstraints.every((f) => f(...p)))
                    labelField(p);
            });
        }
        function drawVertex(coordinates = false, label = false) {
            vertices.forEach((p) => {
                pen.point(p);
                if (coordinates)
                    pen.label.coordinates(p, 270);
                if (label && labelConstraints.every((f) => f(...p)))
                    labelField(p);
            });
        }
        function drawShade() {
            pen.polyshade(...vertices);
        }
        function drawContour(value) {
            pen.graph.linear(field[0], field[1], field[2] - value);
        }
        function drawContours(color = contourColor) {
            pen.set.color(color);
            contours.forEach(drawContour);
            pen.set.color();
        }
        function drawHighlight({ point = [0, 0], color = "red", circle = true, contour = true, coordinates = true, label = true, }) {
            pen.set.color(color);
            pen.point(point);
            if (circle)
                pen.circle(point, 5);
            if (contour)
                drawContour(fieldAt(point));
            if (coordinates)
                pen.label.coordinates(point, 270);
            if (label)
                labelField(point);
            pen.set.color();
        }
        function drawHighlights() {
            highlights.forEach((h) => drawHighlight(h));
        }
        if (showLine)
            drawLines();
        if (showIntegral)
            drawIntegral(showIntegralLabel);
        if (showShade)
            drawShade();
        if (showVertex)
            drawVertex(showVertexCoordinates, showVertexLabel);
        drawHighlights();
        drawContours();
        if (showVertexMax)
            drawHighlight({
                point: MaximizePoint(vertices, field),
                color: "red"
            });
        if (showVertexMin)
            drawHighlight({
                point: MinimizePoint(vertices, field),
                color: "blue"
            });
        if (showIntegralMax)
            drawHighlight({
                point: MaximizePoint(integrals, field),
                color: "red"
            });
        if (showIntegralMin)
            drawHighlight({
                point: MinimizePoint(integrals, field),
                color: "blue"
            });
        this.pen = pen;
    }
    /**
     * A dot pattern
     * @category tool
     * @param a - no. of dot of 1st pattern
     * @param p - P_n+1 = P_n + (pn+q)
     * @param q - P_n+1 = P_n + (pn+q)
     * @param n - the pattern required
     * @param offset - offset of initial position
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.DotPattern({a:3, p:3, q:2, n:4, offset:1})
     * ```
     */
    DotPattern({ a, p, q, n, offset }) {
        const pen = new Pen();
        pen.setup.range([-2, 30], [-4, 10]);
        pen.setup.resolution(0.03);
        function drawRow(n, j, offset = 0) {
            for (let i = 1 + offset; i <= n + offset; i++) {
                pen.point([i, j]);
            }
        }
        drawRow(a + (n - 1) * p, 1);
        for (let j = 2; j <= n; j++) {
            drawRow(q + (n - j) * p, j, (j - 1) * offset);
        }
        let m = "";
        if (n === 1)
            m = '1st';
        if (n === 2)
            m = '2nd';
        if (n === 3)
            m = '3rd';
        if (n >= 3)
            m = n + 'th';
        pen.write([(1 + a + (n - 1) * p) / 2, -1], m + ' pattern');
        pen.autoCrop();
        this.pen = pen;
    }
    /**
     * A pie chart
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.PieChart({
     *   categories: ['a','b','c','d','e'],
     *   labels: ['10%','20%','30%','40%',''],
     *   angles: [45,135,60,50,70],
     *   angleLabels: [null,'x',null,null,''],
     *   size:1.5
     * })
     * ```
     */
    PieChart({ categories, labels, angles, angleLabels, size = 1.5 }) {
        var _a;
        const pen = new Pen();
        pen.setup.size(size);
        pen.setup.range([-1.2, 1.2], [-1.2, 1.2]);
        pen.graph.circle([0, 0], 1);
        let O = [0, 0];
        pen.line(O, [1, 0]);
        let current = 0;
        for (let i = 0; i < angles.length; i++) {
            let a = angles[i];
            let next = current + a;
            let mid = current + a / 2;
            pen.line(O, PolToRect([1, next]));
            pen.label.point(PolToRect([0.7, mid]), categories[i], 90, 10);
            pen.label.point(PolToRect([0.7, mid]), labels[i], 270, 10);
            pen.angle(PolToRect([1, current]), O, PolToRect([1, next]), (_a = angleLabels[i]) !== null && _a !== void 0 ? _a : angles[i] + "°");
            current += a;
        }
        pen.autoCrop();
        this.pen = pen;
    }
    /**
     * A bar chart / line chart / histogram / frequency polygon / cf polygon
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.HeightChart({
     *   categories: ['a','b','c','d','e'],
     *   data:[7,47,15,3,7],
     *   xLabel:'x-axis',
     *   yLabel:'y-axis',
     *   interval:5,
     *   subInterval:1,
     *   barWidth:1,
     *   barGap:1,
     *   showBar:true,
     *   showLine:true
     * })
     * ```
     */
    HeightChart({ categories, data, xLabel = "", yLabel = "", interval = 5, subInterval = 1, barWidth = 1, barGap = 1, showBar = false, showLine = false }) {
        const pen = new Pen();
        let endGap = barWidth + barGap / 2;
        let width = endGap + categories.length * (barWidth + barGap) + endGap;
        let max = Max(...data);
        let maxUnit = Ceil(max / interval);
        let maxSubUnit = maxUnit * (interval / subInterval);
        let height = (maxUnit) * interval * 1.1;
        pen.range.set([-width * 0.2, width], [-height, height]);
        pen.size.resolution(0.2, 1.4 / height);
        pen.line([0, 0], [width, 0]);
        pen.arrow([0, 0], [0, height]);
        pen.writeV([-1.5, height / 2], yLabel);
        pen.label.point([width / 2, 0], xLabel, 270, 40);
        function grid(y) {
            pen.line([0, y], [width, y]);
        }
        for (let y = 1; y <= maxUnit; y++) {
            let h = y * interval;
            pen.set.alpha(0.2);
            grid(h);
            pen.cutterV([0, h]);
            pen.set.alpha();
            pen.label.point([0, h], h.toString(), 180);
        }
        for (let y = 1; y <= maxSubUnit; y++) {
            pen.set.alpha(0.1);
            grid(y * subInterval);
            pen.set.alpha();
        }
        function bar(x, w, h) {
            pen.set.color('grey');
            pen.polyfill([x, 0], [x, h], [x + w, h], [x + w, 0]);
            pen.set.color();
            pen.polygon([x, 0], [x, h], [x + w, h], [x + w, 0]);
        }
        function writeCat(x, w, text) {
            pen.label.point([x + w / 2, 0], text, 270, 15);
        }
        if (showBar) {
            for (let i = 0; i < categories.length; i++) {
                let x = endGap + i * (barWidth + barGap) + barGap / 2;
                bar(x, barWidth, data[i]);
                writeCat(x, barWidth, categories[i]);
            }
        }
        if (showLine) {
            let points = [];
            for (let i = 0; i < categories.length; i++) {
                let x = endGap + i * (barWidth + barGap) + barGap / 2;
                let p = [x + barWidth / 2, data[i]];
                pen.point(p);
                points.push(p);
                writeCat(x, barWidth, categories[i]);
            }
            pen.set.weight(2);
            pen.polyline(...points);
            pen.set.weight();
        }
        pen.autoCrop();
        this.pen = pen;
    }
    /**
     * A pie chart
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.StemAndLeaf({
     *   data: [2,5,6,12,14,16,23,23,24,25,26,26,26,26,27,31],
     *   labels: [2,'x',6,12,14,16,23,23,24,25,26,26,26,26,27,31],
     *   stemTitle: "Stem (10 units)",
     *   leafTitle: "Leaf (1 unit)"
     * })
     * ```
     */
    StemAndLeaf({ data, labels, stemTitle = "Stem (10 units)", leafTitle = "Leaf (1 unit)" }) {
        const pen = new Pen();
        labels !== null && labels !== void 0 ? labels : (labels = [...data].map(x => x.toString()));
        labels = labels.map(x => x.toString().split('').reverse()[0]);
        let width = data.length + 2;
        let height = Ceil(Max(...data) / 10) + 2;
        pen.setup.range([-5, width], [-height, 2]);
        pen.setup.resolution(0.07);
        pen.line([0, -1], [0, 2]);
        pen.line([-5, 0], [1, 0]);
        pen.set.textAlign('left');
        pen.write([0.5, 1], leafTitle);
        pen.set.textAlign('right');
        pen.write([-0.5, 1], stemTitle);
        pen.set.textAlign();
        let initTen = Floor(Min(...data) / 10);
        let endTen = Floor(Max(...data) / 10);
        let ten = initTen;
        for (let j = -1; ten <= endTen; j--) {
            pen.write([-1, j], ten.toString());
            pen.line([0, j], [0, j - 1]);
            let i = 1;
            for (let m = 0; m < data.length; m++) {
                if (Floor(data[m] / 10) === ten) {
                    if (!IsNum(Number(labels[m])))
                        pen.set.textItalic(true);
                    pen.write([i, j], labels[m]);
                    pen.set.textItalic();
                    pen.line([i, 0], [i + 1, 0]);
                    i++;
                }
            }
            ten += 1;
        }
        pen.autoCrop();
        this.pen = pen;
    }
    /**
     * A boxplot
     * @category tool
     * @returns
     * ```typescript
     * let pen = new AutoPen()
     * pen.Boxplot({
     *   summary: [41,45,48,52,55],
     *   labels: [null,null,'x',null,'y'],
     *   size: 2,
     *   tick: 1,
     *   start: 38,
     *   end: 60,
     *   showDash: false,
     *   showValue: false,
     *   showTick: false
     * })
     * ```
     */
    Boxplot({ summary = [0, 0, 0, 0, 0], labels = [null, null, null, null, null], size = 2, tick = 1, start, end, showDash = false, showValue = false, showTick = false }) {
        var _a, _b, _c, _d, _e;
        const pen = new Pen();
        let [Q0, Q1, Q2, Q3, Q4] = summary;
        let height = showDash ? 1 : 0.5;
        let thickness = 1;
        let b = height;
        let t = b + thickness;
        let m = (b + t) / 2;
        let L = [Q0, m];
        let R = [Q4, m];
        let A1 = [Q1, t];
        let A2 = [Q1, b];
        let Am = [Q1, m];
        let B1 = [Q2, t];
        let B2 = [Q2, b];
        let C1 = [Q3, t];
        let C2 = [Q3, b];
        let Cm = [Q3, m];
        let L_ = [Q0, 0];
        let R_ = [Q4, 0];
        let A_ = [Q1, 0];
        let B_ = [Q2, 0];
        let C_ = [Q3, 0];
        if (start === undefined)
            start = Q0 - (Q4 - Q0) * 0.2;
        if (end === undefined)
            end = Q4 + (Q4 - Q0) * 0.2;
        pen.range.set([start, end], [-(t + 1), t + 1]);
        pen.size.set(size, 1);
        if (showTick) {
            pen.tick.x(tick);
        }
        pen.axis.x('');
        pen.polygon(A1, A2, C2, C1);
        pen.line(B1, B2);
        pen.line(L, Am);
        pen.line(R, Cm);
        if (showDash) {
            pen.dash(L, L_);
            pen.dash(A2, A_);
            pen.dash(B2, B_);
            pen.dash(C2, C_);
            pen.dash(R, R_);
        }
        if (showValue) {
            pen.cutterH(L_);
            pen.label.point(L_, (_a = labels[0]) !== null && _a !== void 0 ? _a : String(Q0), 270);
            pen.cutterH(A_);
            pen.label.point(A_, (_b = labels[1]) !== null && _b !== void 0 ? _b : String(Q1), 270);
            pen.cutterH(B_);
            pen.label.point(B_, (_c = labels[2]) !== null && _c !== void 0 ? _c : String(Q2), 270);
            pen.cutterH(C_);
            pen.label.point(C_, (_d = labels[3]) !== null && _d !== void 0 ? _d : String(Q3), 270);
            pen.cutterH(R_);
            pen.label.point(R_, (_e = labels[4]) !== null && _e !== void 0 ? _e : String(Q4), 270);
        }
        pen.autoCrop();
        this.pen = pen;
    }
}
var AutoPen = AutoPenCls;
globalThis.AutoPen = AutoPen;
/**
 * @ignore
 */
var PEN_QUALITY = 3;
globalThis.PEN_QUALITY = PEN_QUALITY;
/**
 * @ignore
 */
class FrameCls {
    constructor() {
        this.wPixel = 0; // total width in pixel
        this.hPixel = 0; // total height in pixel
        this.xmin = 0; // min x-coord
        this.xmax = 0; // max x-coord
        this.ymin = 0; // min y-coord
        this.ymax = 0; // max y-coord
        this.axisOffset = 5 * PEN_QUALITY; // 5px;
    }
    xWidth() {
        // width in x-coord
        return this.xmax - this.xmin;
    }
    yHeight() {
        // height in y-coord
        return this.ymax - this.ymin;
    }
    xUnit() {
        // how many pixel is 1 x-unit
        return this.wPixel / this.xWidth();
    }
    yUnit() {
        // how many pixel is 1 y-unit
        return this.hPixel / this.yHeight();
    }
    toPix(xyArr) {
        // [xCoord,yCoord] --> [xPixel,yPixel]
        const x = xyArr[0];
        const y = xyArr[1];
        const xPixel = (x - this.xmin) * this.xUnit();
        const yPixel = (this.ymax - y) * this.yUnit();
        return [xPixel, yPixel];
    }
    toCoord(xyArr) {
        // [xPixel,yPixel] --> [xCoord,yCoord]
        const xPixel = xyArr[0];
        const yPixel = xyArr[1];
        const x = this.xmin + xPixel / this.xUnit();
        const y = this.ymax - yPixel / this.yUnit();
        return [x, y];
    }
    _ticks(min, max, interval) {
        // a pure function, return array of numbers at interval within [min,max]
        const start = Math.floor(min / interval) * interval;
        const arr = [];
        for (let i = start; i < max; i += interval) {
            i = parseFloat(i.toPrecision(3));
            if (i === 0 || i === min)
                continue;
            arr.push(i);
        }
        return arr;
    }
    xTicks(interval) {
        // return tick array for x-axis, unit: coord
        return this._ticks(this.xmin, this.xmax, interval);
    }
    yTicks(interval) {
        // return tick array for y-axis, unit: coord
        return this._ticks(this.ymin, this.ymax, interval);
    }
    xRange() {
        return [this.xmin, this.xmax];
    }
    yRange() {
        return [this.ymin, this.ymax];
    }
    xOffset() {
        // offset for x-axis, unit: coord
        return this.axisOffset / this.yUnit();
    }
    yOffset() {
        // offset for y-axis, unit: coord
        return this.axisOffset / this.xUnit();
    }
}
/**
 * @ignore
 */
var Frame = FrameCls;
globalThis.Frame = Frame;
/**
 * @category DrawingPen
 */
class PenCls {
    /**
     * @ignore
     */
    constructor() {
        /**
         * Setup of canvas coordinate range.
         * @category setting
         */
        this.range = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Set the coordinate range of the canvas.
             * @category SetupRange
             * @param xRange - The range [xmin,xmax].
             * @param yRange - The range [ymin,ymax].
             * @returns
             * ```typescript
             * pen.range.set([-5,5],[-2,4]) // -5<x<5 and -2<y<4
             * ```
             */
            set(xRange, yRange = xRange) {
                [this._pen.frame.xmin, this._pen.frame.xmax] = xRange;
                [this._pen.frame.ymin, this._pen.frame.ymax] = yRange;
            },
            /**
             * Set the coordinate range of the canvas with given size and center.
             * Equivalent to pen.range.range([-size, size], [-size, size]) but shifted center.
             * @category SetupRange
             * @param size - The max x and y coordinates in range.
             * @param center - [x,y] coordinates of the center.
             * @returns
             * ```typescript
             * pen.range.square(5) // define range -5<x<5 and -5<y<5
             * pen.range.square(5,[1,2]) // define range -4<x<6 and -3<y<7
             * ```
             */
            square(size, center = [0, 0]) {
                let [x, y] = center;
                this.set([x - size, x + size], [y - size, y + size]);
            },
            /**
             * Set the coordinate range by specifying in-view points.
             * @category SetupRange
             * @param points - An array of in-view points [x,y].
             * @returns
             * ```typescript
             * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
             * ```
             */
            capture(...points) {
                let border = 0.3;
                let pts = [...points];
                let xmin = pts[0][0];
                let xmax = pts[0][0];
                let ymin = pts[0][1];
                let ymax = pts[0][1];
                for (let i = 0; i < pts.length; i++) {
                    let x = pts[i][0];
                    let y = pts[i][1];
                    if (x < xmin)
                        xmin = x;
                    if (x > xmax)
                        xmax = x;
                    if (y < ymin)
                        ymin = y;
                    if (y > ymax)
                        ymax = y;
                }
                let xSize = xmax - xmin;
                let ySize = ymax - ymin;
                if (xSize === 0 && ySize === 0) {
                    xmax++;
                    xmin--;
                    ymax++;
                    ymin--;
                }
                if (xSize === 0 && ySize !== 0) {
                    xmax += ySize / 2;
                    xmin -= ySize / 2;
                }
                if (xSize !== 0 && ySize === 0) {
                    ymax += xSize / 2;
                    ymin -= xSize / 2;
                }
                let xBorder = (xmax - xmin) * border;
                let yBorder = (ymax - ymin) * border;
                xmin -= xBorder;
                xmax += xBorder;
                ymin -= yBorder;
                ymax += yBorder;
                this.set([xmin, xmax], [ymin, ymax]);
            },
            /**
             * Set the coordinate range by specifying in-view points, include O(0,0).
             * @category SetupRange
             * @param points - An array of in-view points [x,y].
             * @returns
             * ```typescript
             * pen.range.extend([1,2],[3,4]) //  [0,0], [1,2], [3,4] must be in-view
             * // equivalent to pen.range.capture([0,0],[1,2],[3,4])
             * ```
             */
            extend(...points) {
                this.capture([0, 0], ...points);
            }
        };
        /**
         * Setup of canvas size.
         * @category setting
         */
        this.size = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Set the size of the canvas.
             * @category SetupSize
             * @param width - The scale of the width.
             * @param height - The scale of the height.
             * @returns
             * ```typescript
             * pen.size.set(0.5,2)
             * // half the standard width, double the standard height
             * ```
             */
            set(width = 1, height = width) {
                // REM_PIXEL is the default font size of the browser, usually 16px
                const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
                const wPixel = width * 10 * REM_PIXEL;
                const hPixel = height * 10 * REM_PIXEL;
                // create a canvas of higher resolution (PEN_QUALITY)
                this._pen.canvas.width = wPixel * PEN_QUALITY;
                this._pen.canvas.height = hPixel * PEN_QUALITY;
                this._pen.frame.wPixel = wPixel * PEN_QUALITY;
                this._pen.frame.hPixel = hPixel * PEN_QUALITY;
                this._pen.set.reset();
            },
            /**
             * Set the size of the canvas by resolution.
             * @category SetupSize
             * @param xPPI - The scale per unit x.
             * @param yPPI - The scale per unit y, if not provided, follow x.
             * @returns
             * ```typescript
             * pen.size.resolution(0.1,0.2)
             * // 0.1 scale for each x-unit, and 0.2 scale for each y-unit.
             * ```
             */
            resolution(xPPI = 0.1, yPPI = xPPI) {
                let xRange = this._pen.frame.xmax - this._pen.frame.xmin;
                let yRange = this._pen.frame.ymax - this._pen.frame.ymin;
                let xScale = xRange * xPPI;
                let yScale = yRange * yPPI;
                this.set(xScale, yScale);
            },
            /**
             * Set the size of the canvas, lock xy ratio.
             * @category SetupSize
             * @param width - The scale of the width.
             * @returns
             * ```typescript
             * pen.size.lock(0.5) // half the standard width, with yPPI = xPPI.
             * ```
             */
            lock(width = 1) {
                let xRange = this._pen.frame.xmax - this._pen.frame.xmin;
                let yRange = this._pen.frame.ymax - this._pen.frame.ymin;
                let ratio = yRange / xRange;
                this.set(width, width * ratio);
            },
        };
        /**
         * Setup of canvas. Deprecated.
         * @ignore
         * @category setting
         */
        this.setup = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Set the size of the canvas.
             * @category setup
             * @param scale - The scale of the width.
             * @param  ratio - The height-to-width ratio.
             * @returns
             * ```typescript
             * pen.setup.size(0.5,2)
             * // half the standard width, with height-to-width = 2:1
             * ```
             */
            size(scale = 1, ratio = 1) {
                // REM_PIXEL is the default font size of the browser, usually 16px
                const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
                const wPixel = scale * 25 * REM_PIXEL;
                const hPixel = wPixel * ratio;
                // create a canvas of higher resolution (PEN_QUALITY)
                this._pen.canvas.width = wPixel * PEN_QUALITY;
                this._pen.canvas.height = hPixel * PEN_QUALITY;
                this._pen.frame.wPixel = wPixel * PEN_QUALITY;
                this._pen.frame.hPixel = hPixel * PEN_QUALITY;
                this._pen.set.reset();
            },
            /**
             * Set the size of the canvas, keep square zoom. pen.setup.range should be called before me to set the range first.
             * @category setup
             * @param scale - The scale of the width.
             * @returns
             * ```typescript
             * pen.setup.squareSize(0.5)
             * // half the standard width, with height-to-width defined by coordinates range set.
             * ```
             */
            squareSize(scale = 1) {
                let xRange = this._pen.frame.xmax - this._pen.frame.xmin;
                let yRange = this._pen.frame.ymax - this._pen.frame.ymin;
                let ratio = yRange / xRange;
                this.size(scale, ratio);
            },
            /**
             * Set the size of the canvas by resolution. pen.setup.range should be called before me to set the range first.
             * @category setup
             * @param xPPI - The scale per unit x.
             * @param yPPI - The scale per unit y, if not provided, follow x.
             * @returns
             * ```typescript
             * pen.setup.resolution(0.1,0.2)
             * // 0.1 scale for each x-unit, and 0.2 scale for each y-unit.
             * ```
             */
            resolution(xPPI = 0.1, yPPI = -1) {
                if (yPPI === -1)
                    yPPI = xPPI;
                let xRange = this._pen.frame.xmax - this._pen.frame.xmin;
                let yRange = this._pen.frame.ymax - this._pen.frame.ymin;
                let xScale = xRange * xPPI;
                let yScale = yRange * yPPI;
                this.size(xScale, yScale / xScale);
            },
            /**
             * Set the coordinate range of the canvas.
             * @category setup
             * @param xRange - The range [xmin,xmax].
             * @param yRange - The range [ymin,ymax].
             * @returns
             * ```typescript
             * pen.setup.range([-5,5],[-2,4])
             * // define range -5<x<5 and -2<y<4
             * ```
             */
            range(xRange, yRange) {
                [this._pen.frame.xmin, this._pen.frame.xmax] = xRange;
                [this._pen.frame.ymin, this._pen.frame.ymax] = yRange;
            },
            /**
             * Set the coordinate range of the canvas with given size and center.
             * Equivalent to pen.range([-size, size], [-size, size]) but shifted center.
             * @category setup
             * @param size - The max x and y coordinates in range.
             * @param center - [x,y] coordinates of the center.
             * @returns
             * ```typescript
             * pen.setup.squareRange(5) // define range -5<x<5 and -5<y<5
             * pen.setup.squareRange(5,[1,2]) // define range -4<x<6 and -3<y<7
             * ```
             */
            squareRange(size, center = [0, 0]) {
                let [x, y] = center;
                this.range([x - size, x + size], [y - size, y + size]);
            },
            /**
             * Set the coordinate range by specifying in-view points.
             * @category setup
             * @param points - An array of in-view points [x,y].
             * @param border - The percentage to extend the border.
             * @param origin - Must contain the origin [0,0]
             * @returns
             * ```typescript
             * pen.setup.inView([[1,2],[3,4]]) // the points [0,0], [1,2] and [3,4] must be in-view
             * ```
             */
            inView(points, border = 0.3, origin = true) {
                let pts = [...points];
                if (origin)
                    pts.push([0, 0]);
                let xmin = pts[0][0];
                let xmax = pts[0][0];
                let ymin = pts[0][1];
                let ymax = pts[0][1];
                for (let i = 0; i < pts.length; i++) {
                    let x = pts[i][0];
                    let y = pts[i][1];
                    if (x < xmin)
                        xmin = x;
                    if (x > xmax)
                        xmax = x;
                    if (y < ymin)
                        ymin = y;
                    if (y > ymax)
                        ymax = y;
                }
                let xBorder = (xmax - xmin) * border;
                let yBorder = (ymax - ymin) * border;
                xmin -= xBorder;
                xmax += xBorder;
                ymin -= yBorder;
                ymax += yBorder;
                this.range([xmin, xmax], [ymin, ymax]);
            }
        };
        /**
         * Settings.
         * @category setting
         */
        this.set = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * @ignore
             */
            LABEL_CENTER: undefined,
            /**
             * Set the weight of the pen (line width).
             * @category set
             * @param weight - The line width.
             * @returns
             * ```typescript
             * pen.set.weight(2) // set a bold line
             * ```
             */
            weight(weight = 1) {
                this._pen.ctx.lineWidth = weight * PEN_QUALITY;
            },
            /**
             * Set the color of the pen stroke.
             * @category set
             * @param color - The line color.
             * @returns
             * ```typescript
             * pen.set.strokeColor('grey') // set grey line
             * ```
             */
            strokeColor(color = "black") {
                this._pen.ctx.strokeStyle = color;
            },
            /**
             * Set the color of filling.
             * @category set
             * @param color - The filling color.
             * @returns
             * ```typescript
             * pen.set.fillColor('grey') // set grey filling
             * ```
             */
            fillColor(color = "black") {
                this._pen.ctx.fillStyle = color;
            },
            /**
             * Set the color of both filling and stroke.
             * @category set
             * @param color - The color.
             * @returns
             * ```typescript
             * pen.set.color('grey') // set grey filling and stroke
             * ```
             */
            color(color = "black") {
                this.strokeColor(color);
                this.fillColor(color);
            },
            /**
             * Set the transparency.
             * @category set
             * @param alpha - The alpha value, from 0 to 1. 0 is completely transparent.
             * @returns
             * ```typescript
             * pen.set.alpha(0.9) // set slightly transparent
             * ```
             */
            alpha(alpha = 1) {
                this._pen.ctx.globalAlpha = alpha;
            },
            /**
             * Set the dash pattern of line.
             * @category set
             * @param segments - The dash pattern, as [5,5] or 5 or true.
             * @returns
             * ```typescript
             * pen.set.dash([10,5]) // set dash line
             * ```
             */
            dash(segments = []) {
                if (Array.isArray(segments))
                    this._pen.ctx.setLineDash(segments.map(x => x * PEN_QUALITY));
                if (typeof segments === 'number')
                    this.dash([segments, segments]);
                if (typeof segments === 'boolean')
                    this.dash(segments ? [5, 5] : []);
            },
            /**
             * Set the horizontal alignment of text.
             * @category set
             * @param align - The alignment {'left','right','center'}.
             * @returns
             * ```typescript
             * pen.set.textAlign('left') // set align to left
             * ```
             */
            textAlign(align = "center") {
                this._pen.ctx.textAlign = align;
            },
            /**
             * Set the vertical alignment of text.
             * @category set
             * @param baseline - The alignment {'top','bottom','middle'}.
             * @returns
             * ```typescript
             * pen.set.textBaseline('bottom') // set align to bottom
             * ```
             */
            textBaseline(baseline = "middle") {
                this._pen.ctx.textBaseline = baseline;
            },
            /**
             * Set the size of text.
             * @category set
             * @param size - The text size.
             * @returns
             * ```typescript
             * pen.set.textSize(2) // set larger text
             * ```
             */
            textSize(size = 1) {
                const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
                size = Math.round(size * REM_PIXEL * PEN_QUALITY);
                this._pen.ctx.font = this._pen.ctx.font.replace(/\d+px/g, size + 'px');
            },
            /**
             * Set italic style of text.
             * @category set
             * @param italic - Italic or not.
             * @returns
             * ```typescript
             * pen.set.textItalic(true) // set italic to true
             * ```
             */
            textItalic(italic = false) {
                if (italic) {
                    if (!this._pen.ctx.font.includes('italic'))
                        this._pen.ctx.font = 'italic ' + this._pen.ctx.font;
                }
                else {
                    this._pen.ctx.font = this._pen.ctx.font.replace('italic ', '');
                }
            },
            /**
             * Set the center for label dodge. If undefined, dodge right by default.
             * @category set
             * @param center - the center coordinate
             * @returns
             * ```typescript
             * pen.set.labelCenter([0,0]) // set center to be [0,0]
             * ```
             */
            labelCenter(center) {
                if (center) {
                    this.LABEL_CENTER = center;
                }
                else {
                    this.LABEL_CENTER = undefined;
                }
            },
            /**
             * Reset all pen settings.
             * @category set
             * @returns
             * ```typescript
             * pen.reset() // reset
             * ```
             */
            reset() {
                this.weight();
                this.strokeColor();
                this.fillColor();
                this.dash();
                this.textAlign();
                this.textBaseline();
                this._pen.ctx.font = 'normal 10px Times New Roman';
                this.textSize();
                this.textItalic();
                this.labelCenter();
            }
        };
        /**
         * Drawing graph of functions.
         * @category graph
         */
        this.graph = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Draw a circle (x-h)^2+(y-k)^2 = r^2.
             * @category graph
             * @param center - The center coordinates [h,k].
             * @param radius - The radius.
             * @returns
             * ```typescript
             * pen.graph.circle([1,2],3) // draw (x-1)^2+(y-2)^2 = 9.
             * ```
             */
            circle(center, radius) {
                const [h, k] = center;
                this._pen.plot(t => [h + radius * cos(t), k + radius * sin(t)], 0, 360);
            },
            /**
             * Draw an arc of (x-h)^2+(y-k)^2 = r^2.
             * @category graph
             * @param center - The center coordinates [h,k].
             * @param radius - The radius.
             * @param qStart - The starting polar angle.
             * @param qEnd - The ending polar angle.
             * @returns
             * ```typescript
             * pen.graph.arc([1,2],3,0,180) // draw upper semi-circle (x-1)^2+(y-2)^2 = 9.
             * ```
             */
            arc(center, radius, qStart, qEnd) {
                const [h, k] = center;
                this._pen.plot(t => [h + radius * cos(t), k + radius * sin(t)], qStart, qEnd);
            },
            /**
             * Draw a sector of (x-h)^2+(y-k)^2 = r^2.
             * @category graph
             * @param center - The center coordinates [h,k].
             * @param radius - The radius.
             * @param qStart - The starting polar angle.
             * @param qEnd - The ending polar angle.
             * @returns
             * ```typescript
             * pen.graph.sector([1,2],3,0,90) // draw upper-right quarter-sector (x-1)^2+(y-2)^2 = 9.
             * ```
             */
            sector(center, radius, qStart, qEnd) {
                this.arc(center, radius, qStart, qEnd);
                let A = TranslatePoint(center, qStart, radius);
                let B = TranslatePoint(center, qEnd, radius);
                this._pen.line(A, center);
                this._pen.line(B, center);
            },
            /**
             * Draw an segment of (x-h)^2+(y-k)^2 = r^2.
             * @category graph
             * @param center - The center coordinates [h,k].
             * @param radius - The radius.
             * @param qStart - The starting polar angle.
             * @param qEnd - The ending polar angle.
             * @returns
             * ```typescript
             * pen.graph.segment([1,2],3,0,90) // draw upper-right quarter-segment (x-1)^2+(y-2)^2 = 9.
             * ```
             */
            segment(center, radius, qStart, qEnd) {
                this.arc(center, radius, qStart, qEnd);
                let A = TranslatePoint(center, qStart, radius);
                let B = TranslatePoint(center, qEnd, radius);
                this._pen.line(A, B);
            },
            /**
             * Draw a quadratic graph y=ax^2+bx+c.
             * @category graph
             * @param a - The coeff of x^2.
             * @param b - The coeff of x.
             * @param c - The constant.
             * @returns
             * ```typescript
             * pen.graph.quadratic(1,2,3) // draw y=x^2+2x+3.
             * ```
             */
            quadratic(a, b, c) {
                this._pen.plot(x => a * x * x + b * x + c);
            },
            /**
             * Draw a line y=mx+c.
             * @category graph
             * @param m - The slope.
             * @param c - The y-intercept.
             * @returns
             * ```typescript
             * pen.graph.line(2,1) // draw the line y=2x+1
             * ```
             */
            line(m, c) {
                const [xmin, xmax] = this._pen.frame.xRange();
                const y = (x) => m * x + c;
                this._pen.line([xmin, y(xmin)], [xmax, y(xmax)]);
            },
            /**
             * Draw a horizontal line y=constant.
             * @category graph
             * @param y - The constant value of y.
             * @returns
             * ```typescript
             * pen.graph.horizontal(2) // draw the line y=2
             * ```
             */
            horizontal(y) {
                const [xmin, xmax] = this._pen.frame.xRange();
                this._pen.line([xmin, y], [xmax, y]);
            },
            /**
             * Draw a vertical line x=constant.
             * @category graph
             * @param x - The constant value of x.
             * @returns
             * ```typescript
             * pen.graph.vertical(2) // draw the line x=2
             * ```
             */
            vertical(x) {
                const [ymin, ymax] = this._pen.frame.yRange();
                this._pen.line([x, ymin], [x, ymax]);
            },
            /**
             * Draw a line ax+by+c=0.
             * @category graph
             * @param a - The coeff of x.
             * @param b - The coeff of y.
             * @param c - The constant.
             * @returns
             * ```typescript
             * pen.graph.linear(1,2,3) // draw the line x+2y+3=0
             * ```
             */
            linear(a, b, c) {
                if (a === 0 && b !== 0)
                    this.horizontal(-c / b);
                if (b == 0 && a !== 0)
                    this.vertical(-c / a);
                if (a !== 0 && b !== 0)
                    this.line(-a / b, -c / b);
            }
        };
        /**
         * Fill a shape.
         * @category fill
         */
        this.fill = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Fill a circle (x-h)^2+(y-k)^2 = r^2.
             * @category fill
             * @param center - The center coordinates [h,k].
             * @param radius - The radius.
             * @returns
             * ```typescript
             * pen.fill.circle([1,2],3) // fill (x-1)^2+(y-2)^2 = 9.
             * ```
             */
            circle(center, radius) {
                const [h, k] = center;
                let points = Trace(t => [h + radius * cos(t), k + radius * sin(t)], 0, 360);
                this._pen.polyfill(...points);
            },
            /**
             * Fill a sector (x-h)^2+(y-k)^2 = r^2.
             * @category fill
             * @param center - The center coordinates [h,k].
             * @param radius - The radius.
             * @param qStart - The starting polar angle.
             * @param qEnd - The ending polar angle.
             * @returns
             * ```typescript
             * pen.fill.sector([1,2],3,0,90) // fill the upper-right quarter-circle (x-1)^2+(y-2)^2 = 9.
             * ```
             */
            sector(center, radius, qStart, qEnd) {
                const [h, k] = center;
                let points = Trace(t => [h + radius * cos(t), k + radius * sin(t)], qStart, qEnd);
                this._pen.polyfill(center, ...points);
            },
            /**
             * Fill a segment (x-h)^2+(y-k)^2 = r^2.
             * @category fill
             * @param center - The center coordinates [h,k].
             * @param radius - The radius.
             * @param qStart - The starting polar angle.
             * @param qEnd - The ending polar angle.
             * @returns
             * ```typescript
             * pen.fill.segment([1,2],3,0,90) // fill the upper-right quarter-segment (x-1)^2+(y-2)^2 = 9.
             * ```
             */
            segment(center, radius, qStart, qEnd) {
                const [h, k] = center;
                let points = Trace(t => [h + radius * cos(t), k + radius * sin(t)], qStart, qEnd);
                this._pen.polyfill(...points);
            },
        };
        /**
         * Geometry Decorator.
         * @category decorator
         */
        this.decorate = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Decorate equal side lengths.
             * @category decorator
             * @param startPoint - The starting point [x,y].
             * @param endPoint - The ending point [x,y].
             * @param tick - The number of ticks.
             * @returns
             * ```typescript
             * pen.decorate.equalSide([1,0],[3,2],2)
             * // decorate a double-tick at the mid-pt of [1,0] and [3,2]
             * ```
             */
            equalSide(startPoint, endPoint, tick = 1) {
                let length = 5;
                let space = 3;
                length = length * PEN_QUALITY;
                space = space * PEN_QUALITY;
                startPoint = this._pen.frame.toPix(startPoint);
                endPoint = this._pen.frame.toPix(endPoint);
                let [x, y] = [(startPoint[0] + endPoint[0]) / 2, (startPoint[1] + endPoint[1]) / 2];
                let dy = endPoint[1] - startPoint[1];
                let dx = endPoint[0] - startPoint[0];
                let angle = Math.atan2(dy, dx);
                let mark = (position) => {
                    this._pen.ctx.save();
                    this._pen.ctx.translate(x, y);
                    this._pen.ctx.rotate(angle);
                    this._pen.ctx.beginPath();
                    this._pen.ctx.moveTo(position, -length);
                    this._pen.ctx.lineTo(position, length);
                    this._pen.ctx.stroke();
                    this._pen.ctx.restore();
                };
                if (tick % 2 === 1) {
                    mark(0);
                    for (let i = 1; i <= (tick - 1) / 2; i++) {
                        mark(i * space);
                        mark(-i * space);
                    }
                }
                else {
                    for (let i = 1; i <= tick / 2; i++) {
                        mark((i - 0.5) * space);
                        mark(-(i - 0.5) * space);
                    }
                }
            },
            /**
             * Decorate parallel side.
             * @category decorator
             * @param startPoint - The starting point [x,y].
             * @param endPoint - The ending point [x,y].
             * @param tick - The number of ticks.
             * @returns
             * ```typescript
             * pen.decorate.parallel([1,0],[3,2],2)
             * // decorate a double-tick parallel mark at the mid-pt of [1,0] and [3,2]
             * ```
             */
            parallel(startPoint, endPoint, tick = 1) {
                let size = 4;
                let space = 6;
                size = size * PEN_QUALITY;
                space = space * PEN_QUALITY;
                startPoint = this._pen.frame.toPix(startPoint);
                endPoint = this._pen.frame.toPix(endPoint);
                let [x, y] = [(startPoint[0] + endPoint[0]) / 2, (startPoint[1] + endPoint[1]) / 2];
                let dy = endPoint[1] - startPoint[1];
                let dx = endPoint[0] - startPoint[0];
                let angle = Math.atan2(dy, dx);
                let mark = (position) => {
                    this._pen.ctx.save();
                    this._pen.ctx.translate(x, y);
                    this._pen.ctx.rotate(angle);
                    this._pen.ctx.beginPath();
                    this._pen.ctx.moveTo(position, 0);
                    this._pen.ctx.lineTo(position - size * 2, -size);
                    this._pen.ctx.moveTo(position, 0);
                    this._pen.ctx.lineTo(position - size * 2, size);
                    this._pen.ctx.stroke();
                    this._pen.ctx.restore();
                };
                for (let i = 0; i < tick; i++) {
                    mark(i * space);
                }
            },
            /**
             * Decorate an angle AOB, always in anti-clockwise.
             * @category decorator
             * @param A - The starting point [x,y].
             * @param O - The vertex point [x,y].
             * @param B - The ending point [x,y].
             * @param arc - The number of arcs.
             * @param radius - The radius of the angle arc, in pixel.
             * @returns
             * ```typescript
             * pen.decorate.anglePolar([1,0],[0,0],[3,2],2)
             * // decorate an angle AOB with double-arc in anti-clockwise.
             * ```
             */
            anglePolar(A, O, B, arc = 1, radius = 15) {
                A = this._pen.frame.toPix(A);
                let OPixel = this._pen.frame.toPix(O);
                B = this._pen.frame.toPix(B);
                let a1 = Math.atan2(-(A[1] - OPixel[1]), A[0] - OPixel[0]) / Math.PI * 180;
                let a2 = Math.atan2(-(B[1] - OPixel[1]), B[0] - OPixel[0]) / Math.PI * 180;
                let space = 3;
                let outset = arc > 1 ? space / 2 : 0;
                for (let i = 0; i < arc; i++) {
                    this._pen.circle(O, radius + outset - i * space, [a1, a2]);
                }
            },
            /**
             * Decorate an angle AOB, always non-reflex.
             * @category decorator
             * @param A - The starting point [x,y].
             * @param O - The vertex point [x,y].
             * @param B - The ending point [x,y].
             * @param arc - The number of arcs.
             * @param radius - The radius of the angle arc, in pixel.
             * @returns
             * ```typescript
             * pen.decorate.angle([1,0],[0,0],[3,2],2)
             * // decorate an angle AOB with double-arc.
             * ```
             */
            angle(A, O, B, arc = 1, radius = 15) {
                if (IsReflex(A, O, B))
                    [A, B] = [B, A];
                this.anglePolar(A, O, B, arc, radius);
            },
            /**
             * Decorate an angle AOB, always reflex.
             * @category decorator
             * @param A - The starting point [x,y].
             * @param O - The vertex point [x,y].
             * @param B - The ending point [x,y].
             * @param arc - The number of arcs.
             * @param radius - The radius of the angle arc, in pixel.
             * @returns
             * ```typescript
             * pen.decorate.angleReflex([1,0],[0,0],[3,2],2)
             * // decorate a reflex angle AOB with double-arc.
             * ```
             */
            angleReflex(A, O, B, arc = 1, radius = 15) {
                if (!IsReflex(A, O, B))
                    [A, B] = [B, A];
                this.anglePolar(A, O, B, arc, radius);
            },
            /**
             * Decorate a right-angle AOB.
             * @category decorator
             * @param A - The starting point [x,y].
             * @param O - The vertex point [x,y].
             * @param B - The ending point [x,y]. Interchangeable with A.
             * @param size - The size of the mark, in pixel.
             * @returns
             * ```typescript
             * pen.decorate.rightAngle([1,0],[0,0],[3,2])
             * // decorate an right-angle AOB
             * ```
             */
            rightAngle(A, O, B = RotatePoint(A, O, 90), size = 12) {
                size = size * PEN_QUALITY;
                A = this._pen.frame.toPix(A);
                O = this._pen.frame.toPix(O);
                B = this._pen.frame.toPix(B);
                let angleA = Math.atan2(A[1] - O[1], A[0] - O[0]);
                let angleB = Math.atan2(B[1] - O[1], B[0] - O[0]);
                let P = [O[0] + size * Math.cos(angleA), O[1] + size * Math.sin(angleA)];
                let Q = [O[0] + size * Math.cos(angleB), O[1] + size * Math.sin(angleB)];
                let R = [O[0] + size * Math.cos(angleA) + size * Math.cos(angleB), O[1] + size * Math.sin(angleA) + size * Math.sin(angleB)];
                let draw = (A, B) => {
                    this._pen.ctx.beginPath();
                    this._pen.ctx.moveTo(A[0], A[1]);
                    this._pen.ctx.lineTo(B[0], B[1]);
                    this._pen.ctx.stroke();
                };
                draw(P, R);
                draw(Q, R);
            }
        };
        /**
         * @category text
         */
        this.label = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Add a label to a point.
             * @category text
             * @param position - The coordinates [x,y] of the point to label.
             * @param text - The string to write.
             * @param dodgeDirection - The direction to offset, given as a polar angle.
             * @param offsetPixel - The pixel distance to offset from the position.
             * @returns
             * ```typescript
             * pen.label.point([1,2],'A',180)
             * // label the point [1,2] as 'A', place the label on the left (180 degree)
             * ```
             */
            point(position, text = '', dodgeDirection, offsetPixel = 15) {
                let [x, y] = this._pen.frame.toPix(position);
                offsetPixel = offsetPixel * PEN_QUALITY;
                if (dodgeDirection === undefined) {
                    let center = this._pen.set.LABEL_CENTER;
                    if (center !== undefined && AreDistinctPoint(center, position)) {
                        dodgeDirection = Inclination(center, position);
                    }
                    else {
                        dodgeDirection = 0;
                    }
                }
                x += offsetPixel * Math.cos(dodgeDirection / 180 * Math.PI);
                y -= offsetPixel * Math.sin(dodgeDirection / 180 * Math.PI);
                this._pen.ctx.save();
                if (!isNaN(Number(text)))
                    this._pen.set.textItalic(false);
                if (text.length === 1 && (text.toLowerCase() !== text.toUpperCase()))
                    this._pen.set.textItalic(true);
                this._pen.ctx.fillText(text, x, y);
                this._pen.ctx.restore();
            },
            /**
             * Add a label to points, using index as text.
             * @category text
             * @param positions - {label:position}.
             * @returns
             * ```typescript
             * pen.label.points({A,B}) // label point A as 'A', point B as 'B'
             * ```
             */
            points(positions) {
                for (let k in positions) {
                    this.point(positions[k], k);
                }
            },
            /**
             * Add a label to an angle AOB, in anticlockwise.
             * @category text
             * @param anglePoints - An array [A,O,B] for the coordinates of A,O,B.
             * @param text - The string to write.
             * @param dodgeDirection - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
             * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 25 : 30).
             * @returns
             * ```typescript
             * pen.label.anglePolar([[1,2],[0,0],[-2,1]],'x')
             * // label the angle as 'x'
             * ```
             */
            anglePolar(anglePoints, text, dodgeDirection = 0, offsetPixel = -1) {
                let [A, O, B] = anglePoints;
                let APixel = this._pen.frame.toPix(A);
                let OPixel = this._pen.frame.toPix(O);
                let BPixel = this._pen.frame.toPix(B);
                let a1 = Math.atan2(-(APixel[1] - OPixel[1]), APixel[0] - OPixel[0]) / Math.PI * 180;
                let a2 = Math.atan2(-(BPixel[1] - OPixel[1]), BPixel[0] - OPixel[0]) / Math.PI * 180;
                if (a2 < a1)
                    a2 = a2 + 360;
                if (offsetPixel < 0)
                    offsetPixel = text.length <= 2 ? 25 : 30;
                this.point(O, text, (a1 + a2) / 2 + dodgeDirection, offsetPixel);
            },
            /**
             * Add a label to an angle AOB, non-reflex.
             * @category text
             * @param anglePoints - An array [A,O,B] for the coordinates of A,O,B.
             * @param text - The string to write.
             * @param dodgeDirection - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
             * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 25 : 30).
             * @returns
             * ```typescript
             * pen.label.angle([[1,2],[0,0],[-2,1]],'x')
             * // label the angle as 'x'
             * ```
             */
            angle(anglePoints, text, dodgeDirection = 0, offsetPixel = -1) {
                if (IsReflex(...anglePoints)) {
                    let [A, O, B] = anglePoints;
                    anglePoints = [B, O, A];
                }
                this.anglePolar(anglePoints, text, dodgeDirection, offsetPixel);
            },
            /**
             * Add a label to an angle AOB, reflex.
             * @category text
             * @param anglePoints - An array [A,O,B] for the coordinates of A,O,B.
             * @param text - The string to write.
             * @param dodgeDirection - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
             * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 25 : 30).
             * @returns
             * ```typescript
             * pen.label.angleReflex([[1,2],[0,0],[-2,1]],'x')
             * // label the angle as 'x'
             * ```
             */
            angleReflex(anglePoints, text, dodgeDirection = 0, offsetPixel = -1) {
                if (!IsReflex(...anglePoints)) {
                    let [A, O, B] = anglePoints;
                    anglePoints = [B, O, A];
                }
                this.anglePolar(anglePoints, text, dodgeDirection, offsetPixel);
            },
            /**
             * Add a label to a line AB.
             * @category text
             * @param linePoints - An array [A,B] for the coordinates of AB.
             * @param text - The string to write.
             * @param dodgeDirection - The direction to offset, given as a polar angle,relative to the right normal of AB.
             * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 15 : text.length <= 4 ? 20 : 25).
             * @returns
             * ```typescript
             * pen.label.line([[0,0],[2,4]],'L') // label the line as 'L'
             * ```
             */
            line(linePoints, text, dodgeDirection = 0, offsetPixel = -1) {
                let [A, B] = linePoints;
                let M = MidPoint(A, B);
                let APixel = this._pen.frame.toPix(A);
                let BPixel = this._pen.frame.toPix(B);
                let q = Math.atan2(-(BPixel[1] - APixel[1]), BPixel[0] - APixel[0]) / Math.PI * 180 - 90;
                if (offsetPixel < 0)
                    offsetPixel = text.length <= 2 ? 15 : text.length <= 4 ? 20 : 25;
                this.point(M, text, q + dodgeDirection, offsetPixel);
            },
            /**
             * Add a coordinates label to a point.
             * @category text
             * @param position - The coordinates [x,y] of the point to label.
             * @param dodgeDirection - The direction to offset, given as a polar angle.
             * @param offsetPixel - The pixel distance to offset from the position.
             * @returns
             * ```typescript
             * pen.label.coordinates([1,2],180)
             * // label the point [1,2] as '(1, 2)', place the label on the left (180 degree)
             * ```
             */
            coordinates(point, dodgeDirection = 90, offsetPixel = 15) {
                let text = '(' + Fix(point[0], 1) + ', ' + Fix(point[1], 1) + ')';
                this.point(point, text, dodgeDirection, offsetPixel);
            }
        };
        /**
         * The axis.
         * @category axis
         */
        this.axis = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Draw x-axis.
             * @category axis
             * @param label - The axis label.
             * @returns
             * ```typescript
             * pen.axis.x('time') // draw the x-axis, label as 'time'
             * ```
             */
            x(label = "x") {
                const [xmin, xmax] = this._pen.frame.xRange();
                const offset = 3 * this._pen.frame.xOffset();
                this._pen.arrow([xmin, 0], [xmax, 0]);
                this._pen.ctx.save();
                this._pen.set.textItalic(label.length === 1);
                this._pen.set.textAlign("right");
                this._pen.set.textBaseline("middle");
                this._pen.write([xmax, offset], label);
                this._pen.ctx.restore();
            },
            /**
             * Draw y-axis.
             * @category axis
             * @param label - The axis label.
             * @returns
             * ```typescript
             * pen.axis.y('height') // draw the y-axis, label as 'height'
             * ```
             */
            y(label = "y") {
                const [ymin, ymax] = this._pen.frame.yRange();
                const offset = 3 * this._pen.frame.yOffset();
                this._pen.arrow([0, ymin], [0, ymax]);
                this._pen.ctx.save();
                this._pen.set.textItalic(label.length === 1);
                this._pen.set.textAlign("left");
                this._pen.set.textBaseline("top");
                this._pen.write([offset, ymax], label);
                this._pen.ctx.restore();
            },
            /**
             * Draw both axis.
             * @category axis
             * @param xlabel - The x-axis label.
             * @param ylabel - The y-axis label.
             * @returns
             * ```typescript
             * pen.axis.xy('x','y') // draw both axis, label as 'x' and 'y'
             * ```
             */
            xy(xlabel = "x", ylabel = "y") {
                this.x(xlabel);
                this.y(ylabel);
            },
        };
        /**
         * The axis ticks.
         * @category axis
         */
        this.tick = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Draw ticks on the x-axis.
             * @category axisTick
             * @param interval - The tick interval.
             * @param mark - Whether to label number at ticks.
             * @returns
             * ```typescript
             * pen.tick.x(2) // draw ticks on the x-axis, at interval 2 units
             * ```
             */
            x(interval = 1, mark = true) {
                const offset = this._pen.frame.xOffset();
                for (let x of this._pen.frame.xTicks(interval)) {
                    this._pen.line([x, -offset], [x, offset]);
                    if (mark) {
                        this._pen.ctx.save();
                        this._pen.set.textItalic();
                        this._pen.set.textAlign("center");
                        this._pen.set.textBaseline("middle");
                        this._pen.write([x, -3 * offset], x.toString());
                        this._pen.ctx.restore();
                    }
                    ;
                }
            },
            /**
             * Draw ticks on the y-axis.
             * @category axisTick
             * @param interval - The tick interval.
             * @param mark - Whether to label number at ticks.
             * @returns
             * ```typescript
             * pen.tick.y(2) // draw ticks on the y-axis, at interval 2 units
             * ```
             */
            y(interval = 1, mark = true) {
                const offset = this._pen.frame.yOffset();
                for (let y of this._pen.frame.yTicks(interval)) {
                    this._pen.line([-offset, y], [offset, y]);
                    if (mark) {
                        this._pen.ctx.save();
                        this._pen.set.textItalic();
                        this._pen.set.textAlign("right");
                        this._pen.set.textBaseline("middle");
                        this._pen.write([-2 * offset, y], y.toString());
                        this._pen.ctx.restore();
                    }
                    ;
                }
            },
            /**
             * Draw ticks on both axis.
             * @category axisTick
             * @param interval - The tick interval.
             * @param mark - Whether to label number at ticks.
             * @returns
             * ```typescript
             * pen.tick.xy(2) // draw ticks on both axis, at interval 2 units
             * ```
             */
            xy(interval = 1, mark = true) {
                this.x(interval, mark);
                this.y(interval, mark);
            }
        };
        /**
         * The axis gridlines.
         * @category axis
         */
        this.grid = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Draw gridlines on the x-axis.
             * @category axisGrid
             * @param interval - The grid interval.
             * @returns
             * ```typescript
             * pen.grid.x(2) // draw gridlines on the x-axis, at interval 2 units
             * ```
             */
            x(interval = 1) {
                this._pen.ctx.save();
                this._pen.ctx.strokeStyle = "#d3d5db";
                this._pen.graph.vertical(0);
                for (let x of this._pen.frame.xTicks(interval)) {
                    this._pen.graph.vertical(x);
                }
                this._pen.ctx.restore();
            },
            /**
             * Draw gridlines on the y-axis.
             * @category axisGrid
             * @param interval - The grid interval.
             * @returns
             * ```typescript
             * pen.grid.y(2) // draw gridlines on the y-axis, at interval 2 units
             * ```
             */
            y(interval = 1) {
                this._pen.ctx.save();
                this._pen.ctx.strokeStyle = "#d3d5db";
                this._pen.graph.horizontal(0);
                for (let y of this._pen.frame.yTicks(interval)) {
                    this._pen.graph.horizontal(y);
                }
                this._pen.ctx.restore();
            },
            /**
             * Draw gridlines on both axis.
             * @category axisGrid
             * @param interval - The grid interval.
             * @returns
             * ```typescript
             * pen.grid.xy(2) // draw gridlines on both axis, at interval 2 units
             * ```
             */
            xy(interval = 1) {
                this.x(interval);
                this.y(interval);
            }
        };
        // create the canvas DOM element
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.frame = new Frame();
        // set the default size and range
        this.setup.size();
        this.setup.range([-5, 5], [-5, 5]);
        this.set.reset();
        this.imgStore = null;
    }
    /**
     * Plot an explicit or parametric function.
     * @category graph
     * @param func - The function to plot, either x=>f(x) or t=>[x(t),y(t)].
     * @param tStart - Start value of t, default to xmin.
     * @param tEnd - End value of t, default to xmax.
     * @param dots - Number of dots to plot. More dots give finer graph.
     * @returns
     * ```typescript
     * pen.plot(x=>x**2) // plot y=x^2
     * pen.plot(t=>[cos(t),sin(t)],0,360) // plot a circle centered (0,0) with r=1
     * ```
     */
    plot(func, tStart = this.frame.xmin, tEnd = this.frame.xmax, dots = 1000) {
        let points = Trace(func, tStart, tEnd, dots).map(x => this.frame.toPix(x));
        // const tracer = (t: number) => {
        //     let result: number | Point
        //     try {
        //         result = func(t);
        //     } catch {
        //         return [NaN, NaN]
        //     }
        //     if (!Array.isArray(result)) result = [t, result];
        //     let [x, y] = this.frame.toPix(result);
        //     if (Math.abs(x) > 10000) x = Math.sign(x) * 10000;
        //     if (Math.abs(y) > 10000) y = Math.sign(y) * 10000;
        //     return [x, y];
        // };
        // const [xStart, yStart] = tracer(tStart);
        const [xStart, yStart] = points[0];
        // const step = (tEnd - tStart) / dots;
        this.ctx.beginPath();
        this.ctx.moveTo(xStart, yStart);
        let active = true;
        let outside = (x, y) => (x > this.frame.wPixel + 2000 ||
            y > this.frame.hPixel + 2000 ||
            x < -2000 ||
            y < -2000 ||
            Number.isNaN(x) ||
            Number.isNaN(y));
        for (let p of points) {
            let [x, y] = p;
            if (outside(x, y)) {
                if (active) {
                    this.ctx.stroke();
                    active = false;
                }
                continue;
            }
            if (!active) {
                active = true;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
            }
            this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
    }
    /**
     * Draw a point.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns
     * ```typescript
     * pen.point([1,2]) // draw a point at [1,2]
     * pen.point([1,2],"A") // draw a point at [1,2] and label as "A"
     * ```
     */
    point(position, label) {
        const [x, y] = this.frame.toPix(position);
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2 * PEN_QUALITY, 0, 2 * Math.PI, false);
        this.ctx.fill();
        if (label !== undefined)
            this.label.point(position, label);
    }
    /**
     * Draw a point.
     * @category draw
     * @param positions - {label:position}
     * @param label - whether to label the points
     * @returns
     * ```typescript
     * pen.points({A,B}) // mark and label point A as 'A', point B as 'B'
     * pen.points({A,B},false) // mark point A and B, without label
     * ```
     */
    points(positions, label = true) {
        for (let k in positions) {
            this.point(positions[k]);
            if (label)
                this.label.point(positions[k], k);
        }
    }
    /**
     * Draw a horizontal cutter.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns
     * ```typescript
     * pen.cutterH([1,2]) // draw a horizontal cutter at [1,2]
     * ```
     */
    cutterH(position, label) {
        const [x, y] = position;
        const offset = this.frame.xOffset();
        this.line([x, y - offset], [x, y + offset]);
        if (label !== undefined)
            this.label.point(position, label);
    }
    /**
     * Draw a vertical cutter.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns
     * ```typescript
     * pen.cutterV([1,2]) // draw a vertical cutter at [1,2]
     * ```
     */
    cutterV(position, label) {
        const [x, y] = position;
        const offset = this.frame.yOffset();
        this.line([x - offset, y], [x + offset, y]);
        if (label !== undefined)
            this.label.point(position, label);
    }
    /**
     * Draw a circle or arc.
     * @category draw
     * @param center - The coordinates [x,y] of center.
     * @param radius - The radius in pixel.
     * @param angles - The polar angle range [q1,q2].
     * @param fill - Whether to fill the inside.
     * @returns
     * ```typescript
     * pen.circle([1,2], 10) // draw a circle centered at [1,2] with r=10px
     * pen.circle([1,2], 10, [0,180]) // draw a upper semi-circle
     * ```
     */
    circle(center, radius, angles = [0, 360], fill = false) {
        const [x, y] = this.frame.toPix(center);
        this.ctx.beginPath();
        let [q1, q2] = angles;
        q1 = -q1 / 180 * Math.PI;
        q2 = -q2 / 180 * Math.PI;
        this.ctx.arc(x, y, radius * PEN_QUALITY, q1, q2, true);
        this.ctx.stroke();
        if (fill)
            this.ctx.fill();
    }
    /**
     * @ignore
     */
    _line(startPoint, endPoint, { arrow = false, dash = false }) {
        this.ctx.save();
        const [x0, y0] = this.frame.toPix(startPoint);
        const [x1, y1] = this.frame.toPix(endPoint);
        const dx = x1 - x0;
        const dy = y1 - y0;
        const angle = Math.atan2(dy, dx);
        const length = Math.sqrt(dx * dx + dy * dy);
        const aLength = this.ctx.lineWidth * 10;
        const aWidth = aLength / 2;
        //
        this.ctx.translate(x0, y0);
        this.ctx.rotate(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(length, 0);
        if (arrow) {
            this.ctx.moveTo(length - aLength, -aWidth);
            this.ctx.lineTo(length, 0);
            this.ctx.lineTo(length - aLength, aWidth);
        }
        if (dash) {
            this.ctx.save();
            this.set.dash(true);
            this.ctx.stroke();
            this.ctx.restore();
        }
        else {
            this.ctx.stroke();
        }
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.restore();
    }
    /**
     * Draw a line between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the point.
     * @returns
     * ```typescript
     * pen.line([1,2],[3,4]) // draw a line from [1,2] to [3,4]
     * pen.line([1,2],[3,4],'10') //  draw a line from [1,2] to [3,4] with label '10'
     * ```
     */
    line(startPoint, endPoint, label) {
        this._line(startPoint, endPoint, {});
        if (label !== undefined)
            this.label.line([startPoint, endPoint], label);
    }
    /**
     * Draw a dash line between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the point.
     * @returns
     * ```typescript
     * pen.dash([1,2],[3,4]) // draw a dash line from [1,2] to [3,4]
     * pen.dash([1,2],[3,4],'10') //  draw a dash line from [1,2] to [3,4] with label '10'
     * ```
     */
    dash(startPoint, endPoint, label) {
        this._line(startPoint, endPoint, { dash: true });
        if (label !== undefined)
            this.label.line([startPoint, endPoint], label);
    }
    /**
     * Draw an arrow between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @returns
     * ```typescript
     * pen.arrow([1,2],[3,4]) // draw an arrow from [1,2] to [3,4]
     * ```
     */
    arrow(startPoint, endPoint) {
        this._line(startPoint, endPoint, { arrow: true });
    }
    /**
     * @ignore
     */
    _polygon(points, { close = false, stroke = false, fill = false, shade = false }) {
        this.ctx.beginPath();
        let [xStart, yStart] = this.frame.toPix(points[0]);
        this.ctx.moveTo(xStart, yStart);
        for (let i = 1; i < points.length; i++) {
            let [x, y] = this.frame.toPix(points[i]);
            this.ctx.lineTo(x, y);
        }
        if (close)
            this.ctx.closePath();
        if (stroke)
            this.ctx.stroke();
        if (fill)
            this.ctx.fill();
        if (shade) {
            let alpha = this.ctx.globalAlpha;
            this.set.alpha(0.2);
            this.ctx.fill();
            this.set.alpha(alpha);
        }
    }
    /**
     * Draw a polyline given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polyline([0,0],[5,2],[3,4]) // draw a polyline with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyline(...points) {
        this._polygon(points, { stroke: true });
    }
    /**
     * Draw a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polygon([0,0],[5,2],[3,4]) // draw a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polygon(...points) {
        this._polygon(points, { close: true, stroke: true });
    }
    /**
     * Fill a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polyfill([0,0],[5,2],[3,4]) // fill a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyfill(...points) {
        this._polygon(points, { close: true, fill: true });
    }
    /**
     * Shade a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polyshade([0,0],[5,2],[3,4]) // shade a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyshade(...points) {
        this._polygon(points, { close: true, shade: true });
    }
    /**
     * Draw an angle with label, non-reflex
     * @category draw
     * @param A - The starting point [x,y].
     * @param O - The vertex point [x,y].
     * @param B - The ending point [x,y].
     * @param label - The label
     * @param arc - The number of arcs.
     * @param radius - The radius of the angle arc, in pixel.
     * @returns
     * ```typescript
     * pen.angle([0,0],[5,2],[3,4],'x')
     * ```
     */
    angle(A, O, B, label, arc = 1, radius = 15) {
        this.decorate.angle(A, O, B, arc, radius);
        if (label !== undefined)
            this.label.angle([A, O, B], label);
    }
    /**
     * Draw an angle with label, anticlockwise
     * @category draw
     * @param A - The starting point [x,y].
     * @param O - The vertex point [x,y].
     * @param B - The ending point [x,y].
     * @param label - The label
     * @param arc - The number of arcs.
     * @param radius - The radius of the angle arc, in pixel.
     * @returns
     * ```typescript
     * pen.anglePolar([0,0],[5,2],[3,4],'x')
     * ```
     */
    anglePolar(A, O, B, label, arc = 1, radius = 15) {
        this.decorate.anglePolar(A, O, B, arc, radius);
        if (label !== undefined)
            this.label.anglePolar([A, O, B], label);
    }
    /**
     * Draw an angle with label, reflex
     * @category draw
     * @param A - The starting point [x,y].
     * @param O - The vertex point [x,y].
     * @param B - The ending point [x,y].
     * @param label - The label
     * @param arc - The number of arcs.
     * @param radius - The radius of the angle arc, in pixel.
     * @returns
     * ```typescript
     * pen.angleReflex([0,0],[5,2],[3,4],'x')
     * ```
     */
    angleReflex(A, O, B, label, arc = 1, radius = 15) {
        this.decorate.angleReflex(A, O, B, arc, radius);
        if (label !== undefined)
            this.label.angleReflex([A, O, B], label);
    }
    /**
     * Write text.
     * @category text
     * @param position - The coordinates [x,y] to position the text.
     * @param text - The string to write.
     * @returns
     * ```typescript
     * pen.write([1,2],'abc') // write 'abc' at [1,2]
     * ```
     */
    write(position, text) {
        const [x, y] = this.frame.toPix(position);
        this.ctx.fillText(text, x, y);
    }
    /**
     * Write text vertically
     * @category text
     * @param position - The coordinates [x,y] to position the text.
     * @param text - The string to write.
     * @returns
     * ```typescript
     * pen.writeVertical([1,2],'abc') // write 'abc' at [1,2] vertically
     * ```
     */
    writeV(position, text) {
        const [x, y] = this.frame.toPix(position);
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();
    }
    /**
     * @ignore
     */
    autoCrop() {
        trimCanvas(this.canvas);
    }
    /**
     * Export the canvas to image tag.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```typescript
     * question = pen.export(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    export(html, placeholder) {
        const src = 'src="' + this.canvas.toDataURL() + '"';
        const width = ' width="' + Math.floor(this.canvas.width / PEN_QUALITY) + '"';
        const height = ' height="' + Math.floor(this.canvas.height / PEN_QUALITY) + '"';
        return html.replace('src="' + placeholder + '"', src + width + height);
    }
    ;
    /**
     * Export the canvas to image tag, with white space trimmed.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```typescript
     * question = pen.exportTrim(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    exportTrim(html, placeholder) {
        let clone = cloneCanvas(this.canvas);
        trimCanvas(clone);
        const src = 'src="' + clone.toDataURL() + '"';
        const w = Math.floor(clone.width / PEN_QUALITY);
        const h = Math.floor(clone.height / PEN_QUALITY);
        const width = ' width="' + w + '"';
        const height = ' height="' + h + '"';
        return html.replace('src="' + placeholder + '"', src + width + height);
    }
    ;
    /**
     * Clear the canvas.
     * @category export
     * @returns
     * ```typescript
     * pen.clear() // clear the canvas.
     * ```
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Temporarily save the img internally. Can be later restored by restoreImg.
     * @category export
     * @returns
     * ```typescript
     * pen.saveImg() // save the current canvas image
     * ```
     */
    saveImg() {
        this.imgStore = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Restored the previously saved img by saveImg.
     * @category export
     * @returns
     * ```typescript
     * pen.restoreImg() // restore the previously saved img
     * ```
     */
    restoreImg() {
        if (this.imgStore !== null)
            this.ctx.putImageData(this.imgStore, 0, 0);
    }
}
;
/**
 * @ignore
 */
var Pen = PenCls;
globalThis.Pen = Pen;
function cloneCanvas(oldCanvas) {
    //create a new canvas
    let newCanvas = document.createElement('canvas');
    let context = newCanvas.getContext('2d');
    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);
    //return the new canvas
    return newCanvas;
}
function trimCanvas(canvas) {
    function rowBlank(imageData, width, y) {
        for (var x = 0; x < width; ++x) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0)
                return false;
        }
        return true;
    }
    function columnBlank(imageData, width, x, top, bottom) {
        for (var y = top; y < bottom; ++y) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0)
                return false;
        }
        return true;
    }
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var top = 0, bottom = imageData.height, left = 0, right = imageData.width;
    while (top < bottom && rowBlank(imageData, width, top))
        ++top;
    while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1))
        --bottom;
    while (left < right && columnBlank(imageData, width, left, top, bottom))
        ++left;
    while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom))
        --right;
    var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
    canvas.width = trimmed.width;
    canvas.height = trimmed.height;
    ctx.putImageData(trimmed, 0, 0);
}
define("Pen/index", ["require", "exports", "./Frame.ts", "./Pen.ts", "./AutoPen.ts", "./3D.ts"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Soil/tool/html", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrintVariable = exports.QuestionHTML = void 0;
    class QuestionHTML {
        // assume a structure '...<ul><li>...</li><li>...</li><li>...</li></ul>'
        // there must be no ul or li tags except the answer options
        constructor(html = '') {
            this.body = (new DOMParser())
                .parseFromString(html, 'text/html')
                .getElementsByTagName('body')[0];
        }
        export() {
            return this.body.innerHTML;
        }
        get li() {
            return [...this.body.getElementsByTagName('li')];
        }
        get ul() {
            return this.body.getElementsByTagName('ul')[0];
        }
        cloneLi(sourceIndex, repeat = 1) {
            for (let i = 1; i <= repeat; i++) {
                this.ul.appendChild(this.li[sourceIndex].cloneNode(true));
            }
        }
        printInWhole(symbol, value) {
            this.body.innerHTML = PrintVariable(this.body.innerHTML, symbol, value);
        }
        printInLi(index, symbol, value) {
            let li = this.li[index];
            li.innerHTML = PrintVariable(li.innerHTML, symbol, value);
        }
        isLiDuplicated() {
            let htmls = this.li.map(x => x.innerHTML);
            return (new Set(htmls)).size !== htmls.length;
        }
        shuffleLi() {
            let oldHTMLs = this.li.map(x => x.innerHTML);
            let newHTMLs = RndShuffle(...oldHTMLs);
            for (let i = 0; i < newHTMLs.length; i++) {
                this.li[i].innerHTML = newHTMLs[i];
            }
            return oldHTMLs.map(x => newHTMLs.indexOf(x));
        }
    }
    exports.QuestionHTML = QuestionHTML;
    /**
    * print a variable (e.g. *x) into the html
    * ```typescript
    * let html = '1 + *x = *y'
    * PrintVariable(html,'x',2) // '1 + 2 = *y'
    * ```
    */
    function PrintVariable(html, symbol, value) {
        let print = (prefix, value) => {
            html = html.replace(new RegExp(prefix + symbol, 'g'), value);
        };
        let T = typeof value;
        // print **x as sci notation
        if (T === 'number') {
            let v = ant.blur(Round(value, 3));
            if (v >= 10000 || v <= 0.01) {
                print("\\*\\*", Sci(v));
            }
            else {
                print("\\*\\*", v);
            }
        }
        // print */x as fraction
        if (T === 'number') {
            if (html.search("\\*\\/" + symbol) > -1) {
                let [p, q] = ToFrac(value);
                print("\\*\\/", Dfrac(p, q));
            }
        }
        // print *x as normal
        if (T === 'number') {
            value = ant.blur(value);
            if (IsDecimal(value))
                value = Round(value, 5);
        }
        if (T === 'boolean') {
            value = Tick(value);
        }
        if (owl.point(value)) {
            value = Coord(value);
        }
        print("\\*", value);
        return html;
    }
    exports.PrintVariable = PrintVariable;
});
define("Soil/cls", ["require", "exports", "Soil/tool/html"], function (require, exports, html_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dict = exports.Config = void 0;
    class Config {
        constructor(sections = [], answer = "A", options = {}) {
            this.sections = sections;
            this.answer = answer;
            this.options = options;
        }
    }
    exports.Config = Config;
    class Dict {
        constructor(a = Symbol(), b = Symbol(), c = Symbol(), d = Symbol(), e = Symbol(), f = Symbol(), g = Symbol(), h = Symbol(), i = Symbol(), j = Symbol(), k = Symbol(), l = Symbol(), m = Symbol(), n = Symbol(), o = Symbol(), p = Symbol(), q = Symbol(), r = Symbol(), s = Symbol(), t = Symbol(), u = Symbol(), v = Symbol(), w = Symbol(), x = Symbol(), y = Symbol(), z = Symbol(), A = Symbol(), B = Symbol(), C = Symbol(), D = Symbol(), E = Symbol(), F = Symbol(), G = Symbol(), H = Symbol(), I = Symbol(), J = Symbol(), K = Symbol(), L = Symbol(), M = Symbol(), N = Symbol(), O = Symbol(), P = Symbol(), Q = Symbol(), R = Symbol(), S = Symbol(), T = Symbol(), U = Symbol(), V = Symbol(), W = Symbol(), X = Symbol(), Y = Symbol(), Z = Symbol()) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.e = e;
            this.f = f;
            this.g = g;
            this.h = h;
            this.i = i;
            this.j = j;
            this.k = k;
            this.l = l;
            this.m = m;
            this.n = n;
            this.o = o;
            this.p = p;
            this.q = q;
            this.r = r;
            this.s = s;
            this.t = t;
            this.u = u;
            this.v = v;
            this.w = w;
            this.x = x;
            this.y = y;
            this.z = z;
            this.A = A;
            this.B = B;
            this.C = C;
            this.D = D;
            this.E = E;
            this.F = F;
            this.G = G;
            this.H = H;
            this.I = I;
            this.J = J;
            this.K = K;
            this.L = L;
            this.M = M;
            this.N = N;
            this.O = O;
            this.P = P;
            this.Q = Q;
            this.R = R;
            this.S = S;
            this.T = T;
            this.U = U;
            this.V = V;
            this.W = W;
            this.X = X;
            this.Y = Y;
            this.Z = Z;
            this.variables = [
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                'i', 'j', 'k', 'l', 'm', 'n', 'o',
                'p', 'q', 'r', 's', 't', 'u', 'v',
                'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O',
                'P', 'Q', 'R', 'S', 'T', 'U', 'V',
                'W', 'X', 'Y', 'Z'
            ];
        }
        update(other) {
            for (let key of this.variables) {
                if (key in other)
                    this[key] = other[key];
            }
        }
        // blur() {
        //     for (let key of this.variables) {
        //         this[key] = Blur(this[key])
        //     }
        // }
        checked() {
            for (let key of this.variables) {
                let v = this[key];
                if (v === undefined ||
                    // v === null ||
                    (typeof v === 'number' && !Number.isFinite(v)))
                    return false;
            }
            return true;
        }
        substitute(text) {
            for (let key of this.variables) {
                let num = this[key];
                if (typeof num === 'symbol')
                    continue;
                text = html_1.PrintVariable(text, key, num);
            }
            return text;
        }
    }
    exports.Dict = Dict;
});
define("Soil/tool/section", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExecSection = void 0;
    function DropVersion(html, section, version) {
        let id = section + '.' + version;
        return html.replace(new RegExp('<[^#<]*##' + id + '[^#]*##[^#>]*>', 'g'), '');
    }
    function DropTags(html) {
        html = html.replace(new RegExp('<[^#<]*##[^#>]*>', 'g'), '');
        return html;
    }
    function KeepVersion(html, section, version) {
        for (let i = 0; i < 10; i++) {
            if (i === version)
                continue;
            html = DropVersion(html, section, i);
        }
        return html;
    }
    function ExecSection(html, sections) {
        for (let i = 0; i < sections.length; i++) {
            let [section, version] = sections[i];
            html = KeepVersion(html, section.toString(), version);
        }
        html = DropTags(html);
        return html;
    }
    exports.ExecSection = ExecSection;
});
define("Soil/tool/dress", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dress = void 0;
    function or(...reg) {
        return '(' + reg.join('|') + ')';
    }
    // function inTag(input: string): string {
    //     return input + String.raw``
    // }
    const s = String.raw `(?:\s|&nbsp;)*`;
    const p = String.raw `\+`;
    const m = String.raw `\-`;
    const e = String.raw `(?:\=|\>|\<|&lt;|&gt;|\\ge|\\le|\\gt|\\lt)`;
    const l = String.raw `[\(\[\{]`;
    const r = String.raw `[\)\]\}]`;
    const pl = String.raw `[\(\[]`;
    const pr = String.raw `[\)\]]`;
    const c = String.raw `\,`;
    const v = String.raw `(?:[A-Za-z]|\\alpha|\\beta|\\sigma|\\mu)`;
    const sl = String.raw `\\`;
    const left = String.raw `\\left`;
    const sq = String.raw `\\sqrt`;
    const endtag = String.raw `(?=[^<>]*</span>)`;
    function regReplace(input, reg, replace) {
        return input.replace(new RegExp(reg, 'g'), replace);
    }
    function handleSigns(input) {
        input = regReplace(input, p + s + m, '-');
        input = regReplace(input, m + s + p, '-');
        input = regReplace(input, or(l, e, c) + s + m + s + m, '$1');
        input = regReplace(input, '(\,)' + s + m + s + m, '$1');
        input = regReplace(input, m + s + m, '+');
        input = regReplace(input, m + s + m, '+');
        return input;
    }
    function handlePower(input) {
        input = regReplace(input, String.raw `\^\{1\}`, '');
        return input;
    }
    function handleSqrt(input) {
        input = regReplace(input, String.raw `\\sqrt\[2\]`, '\\sqrt');
        return input;
    }
    function handleCoeff(input) {
        input = regReplace(input, or(p, m, e, l, sl, r, c) + s + 1 + s + or(v, pl, left, sq) + endtag, '$1$2');
        return input;
    }
    function handlePrime(input) {
        input = regReplace(input, '(' + v + ')' + "'" + endtag, '$1 \\prime ');
        return input;
    }
    function dress(html) {
        html = handleSigns(html);
        html = handlePower(html);
        html = handleSqrt(html);
        html = handleCoeff(html);
        html = handlePrime(html);
        return html;
    }
    exports.dress = dress;
});
// .replace(/(?<=<span class="math-tex">[^<>]*)([\+\-\=\(\[\{\\\)\]\}\,])(\s|&nbsp;)*1(\s|&nbsp;)*(?=[A-Za-z\(\[][^<>]*<\/span>)/g, '$1')
define("Soil/tool/shuffle", ["require", "exports", "Soil/tool/html"], function (require, exports, html_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OptionShuffler = void 0;
    class OptionShuffler {
        constructor(qn, sol, ans) {
            this.qn = qn;
            this.sol = sol;
            this.ans = ans;
            this.perm = [];
            this.valid = false;
            this.Qn = new html_2.QuestionHTML(qn);
            if (!this.Qn.ul)
                return; // no <ul></ul>
            if (this.Qn.li.length === 0)
                return; // blank <ul></ul>
            this.valid = true;
        }
        AreOptionsDuplicated() {
            return this.Qn.isLiDuplicated();
        }
        genQn() {
            if (!this.valid)
                return this.qn;
            this.perm = this.Qn.shuffleLi();
            return this.Qn.export();
        }
        mapLetter(oldLetter) {
            let oldIndex = ['A', 'B', 'C', 'D', 'E', 'F'].indexOf(oldLetter);
            let newIndex = this.perm[oldIndex];
            return ['A', 'B', 'C', 'D', 'E', 'F'][newIndex];
        }
        genAns() {
            if (!this.valid)
                return "X";
            return this.mapLetter(this.ans);
        }
        genSol() {
            if (!this.valid)
                return this.sol;
            let newSol = "<p>Answer: "
                + this.genAns()
                + "</p><p><b>Solution:</b></p>"
                + this.sol;
            let ansList = ['A', 'B', 'C', 'D', 'E', 'F'];
            ansList.length = this.perm.length;
            for (let x of ansList) {
                newSol = newSol.replace(new RegExp('\{\#' + x + '\}', 'g'), this.mapLetter(x));
            }
            return newSol;
        }
    }
    exports.OptionShuffler = OptionShuffler;
});
define("Soil/tool/option", ["require", "exports", "Soil/tool/html"], function (require, exports, html_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AutoOptions = void 0;
    function Produce(source, assigned) {
        return Array.isArray(assigned) && assigned !== source
            ? RndShuffle(...assigned)
            : RndShake(source);
    }
    function ExecInstructions(instructions, source) {
        let products = {};
        let k;
        for (k in instructions) {
            products[k] = Produce(source[k], instructions[k]);
        }
        return products;
    }
    /**
    * append the array of options to question
    * ```typescript
    * let question = 'abc<ul><li>*x</li></ul>'
    * AutoOptions(question,{x:3})
    * // 'abc<ul><li>*x</li><li>2</li><li>4</li><li>5</li></ul>'
    * ```
    */
    function AutoOptions(instructions, question, source) {
        if (owl.emptyObject(instructions))
            return question;
        let Qn = new html_3.QuestionHTML(question);
        let products = ExecInstructions(instructions, source);
        if (Qn.li.length === 1) {
            Qn.cloneLi(0, 3);
            for (let k in products) {
                Qn.printInLi(1, k, products[k][0]);
                Qn.printInLi(2, k, products[k][1]);
                Qn.printInLi(3, k, products[k][2]);
            }
            return Qn.export();
        }
        if (Qn.li.length === 2) {
            Qn.cloneLi(0);
            Qn.cloneLi(1);
            for (let k in products) {
                Qn.printInLi(2, k, products[k][0]);
                Qn.printInLi(3, k, products[k][0]);
            }
            return Qn.export();
        }
        return question;
    }
    exports.AutoOptions = AutoOptions;
});
define("Soil/soil", ["require", "exports", "Soil/tool/section", "Soil/tool/dress", "Soil/tool/shuffle", "Soil/tool/option", "Soil/cls", "katex/dist/contrib/auto-render"], function (require, exports, section_1, dress_1, shuffle_1, option_1, cls_1, auto_render_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Soil = void 0;
    auto_render_1 = __importDefault(auto_render_1);
    class Soil {
        constructor(gene) {
            this.gene = gene;
            // get from SeedBank API
            this.qn = "";
            this.sol = "";
            // working variables during growth
            this.dict = new cls_1.Dict();
            this.config = new cls_1.Config();
            // state
            this.counter = 0;
            this.errorPile = [];
            this.reset();
        }
        reset() {
            this.qn = this.gene.qn;
            this.sol = this.gene.sol;
            this.dict = new cls_1.Dict();
            this.config = new cls_1.Config();
        }
        recordError(e) {
            if (!this.errorPile.map(x => x.message).includes(e.message))
                this.errorPile.push(e);
        }
        evalCode(code) {
            // injectables
            let { a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z } = this.dict;
            let sections = this.config.sections;
            let answer = this.config.answer;
            let options = this.config.options;
            let question = this.qn;
            let solution = this.sol;
            // execute
            let result;
            try {
                result = eval(code);
            }
            catch (e) {
                if (e.message === 'Cannot convert a Symbol value to a number') {
                    throw CustomError('VariableError', "A variable is used before a value is given.");
                }
                else {
                    throw e;
                }
            }
            //retrieve
            this.dict.update({
                a, b, c, d, e, f, g, h, i, j, k, l, m, n,
                o, p, q, r, s, t, u, v, w, x, y, z,
                A, B, C, D, E, F, G, H, I, J, K, L, M, N,
                O, P, Q, R, S, T, U, V, W, X, Y, Z
            });
            this.config = {
                sections: sections,
                answer: answer,
                options: options
            };
            this.qn = question;
            this.sol = solution;
            return result;
        }
        pushDict() {
            this.counter++;
            this.evalCode(this.gene.populate);
        }
        isValidated() {
            let v = this.gene.validate;
            if (v === "")
                return true;
            v = v.replace('\n', ' '); //is it a bug? only once?
            return this.evalCode(v) === true;
        }
        katex(html) {
            let ele = document.createElement('div');
            ele.innerHTML = html;
            auto_render_1.default(ele);
            let T = ele.innerHTML;
            ele.remove();
            return T;
        }
        runPopulate() {
            while (this.counter <= 1000) {
                try {
                    this.pushDict();
                    if (!this.dict.checked())
                        throw CustomError('PopulationError', 'Dict Check Failed.');
                    if (!this.isValidated())
                        throw CustomError('PopulationError', 'Cannot pass validate.');
                    return true;
                }
                catch (e) {
                    switch (e.name) {
                        case 'MathError':
                            this.recordError(e);
                            if (SHOULD_LOG)
                                console.log(e.stack);
                            break;
                        case 'PopulationError':
                            this.recordError(e);
                            break;
                        default:
                            throw e;
                    }
                }
            }
            ;
            throw CustomError('PopulationError', "No population found after 1000 trials!");
        }
        runSection() {
            // crop section
            this.qn = section_1.ExecSection(this.qn, this.config.sections);
            this.sol = section_1.ExecSection(this.sol, this.config.sections);
            return true;
        }
        runPreprocess() {
            this.evalCode(this.gene.preprocess);
            return true;
        }
        runOption() {
            let nTrial = 0;
            while (nTrial <= 100) {
                nTrial++;
                try {
                    this.qn = option_1.AutoOptions(this.config.options, this.qn, this.dict);
                    return true;
                }
                catch (e) {
                    this.recordError(e);
                    console.log(e.stack);
                    continue;
                }
            }
            ;
            throw CustomError('OptionError', "No valid option generated after 100 trials");
        }
        runSubstitute() {
            // pour
            this.qn = this.dict.substitute(this.qn);
            this.sol = this.dict.substitute(this.sol);
            // dress
            this.qn = dress_1.dress(this.qn);
            this.sol = dress_1.dress(this.sol);
            return true;
        }
        runPostprocess() {
            this.evalCode(this.gene.postprocess);
            return true;
        }
        runShuffle() {
            let shuffler = new shuffle_1.OptionShuffler(this.qn, this.sol, this.config.answer);
            if (shuffler.AreOptionsDuplicated()) {
                this.recordError(CustomError('ShuffleError', 'Duplicated options found!'));
                return false;
            }
            this.qn = shuffler.genQn();
            this.sol = shuffler.genSol();
            this.config.answer = shuffler.genAns();
            return true;
        }
        runKatex() {
            this.qn = this.katex(this.qn);
            this.sol = this.katex(this.sol);
            return true;
        }
        successFruit() {
            return {
                qn: this.qn,
                sol: this.sol,
                ans: this.config.answer,
                counter: this.counter,
                success: true
            };
        }
        errorFruit(e) {
            let printError = (x) => '[' + x.name + '] ' + x.message;
            let stack = this.errorPile.map(printError).join('<br/>');
            return {
                qn: "An Error Occurred!<br/>" + e.name,
                sol: printError(e) + '<br/>' + stack,
                ans: "X",
                counter: this.counter,
                success: false
            };
        }
        nurture() {
            try {
                do {
                    this.reset();
                    this.runPopulate();
                    this.runSection();
                    this.runPreprocess();
                    this.runOption();
                    this.runSubstitute();
                    this.runPostprocess();
                    if (!this.runShuffle())
                        continue;
                    this.runKatex();
                    break;
                } while (true);
                return this.successFruit();
            }
            catch (e) {
                console.error("[MathSoil Error]\n" + e.stack);
                return this.errorFruit(e);
            }
        }
    }
    exports.Soil = Soil;
});
define("Soil/index", ["require", "exports", "Soil/soil"], function (require, exports, soil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MathSoilCls {
        grow(seed) {
            let soil = new soil_1.Soil(seed.gene);
            seed.fruit = soil.nurture();
        }
        growAll(seeds) {
            seeds.forEach(x => this.grow(x));
        }
        test(seed, repeat = 100) {
            let counters = [];
            for (let i = 1; i <= repeat; i++) {
                this.grow(seed);
                if (!seed.fruit.success)
                    return;
                counters.push(seed.fruit.counter);
            }
            seed.fruit.counter = Mean(...counters);
        }
    }
    var MathSoil = new MathSoilCls();
    globalThis.MathSoil = MathSoil;
});
