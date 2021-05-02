define(["require", "exports"], function (require, exports) {
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
