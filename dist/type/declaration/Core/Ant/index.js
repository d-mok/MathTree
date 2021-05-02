define(["require", "exports", "decimal.js", "mathjs"], function (require, exports, decimal_js_1, mathjs_1) {
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
