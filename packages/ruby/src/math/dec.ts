// @ts-nocheck


// The maximum exponent magnitude.
// The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
var EXP_LIMIT = 9e15,                      // 0 to 9e15

    // The limit on the value of `precision`, and on the value of the first argument to
    // `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
    MAX_DIGITS = 1e9,                        // 0 to 1e9


    // The initial configuration properties of the Decimal constructor.
    DEFAULTS = {

        // These values must be integers within the stated ranges (inclusive).
        // Most of these values can be changed at run-time using the `Decimal.config` method.

        // The maximum number of significant digits of the result of a calculation or base conversion.
        // E.g. `Decimal.config({ precision: 20 });`
        precision: 20,                         // 1 to MAX_DIGITS

        // The rounding mode used when rounding to `precision`.
        //
        // ROUND_UP         0 Away from zero.
        // ROUND_DOWN       1 Towards zero.
        // ROUND_CEIL       2 Towards +Infinity.
        // ROUND_FLOOR      3 Towards -Infinity.
        // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
        // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
        // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
        // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
        // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
        //
        // E.g.
        // `Decimal.rounding = 4;`
        // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
        rounding: 4,                           // 0 to 8

        // The modulo mode used when calculating the modulus: a mod n.
        // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
        // The remainder (r) is calculated as: r = a - n * q.
        //
        // UP         0 The remainder is positive if the dividend is negative, else is negative.
        // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
        // FLOOR      3 The remainder has the same sign as the divisor (Python %).
        // HALF_EVEN  6 The IEEE 754 remainder function.
        // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
        //
        // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
        // division (9) are commonly used for the modulus operation. The other rounding modes can also
        // be used, but they may not give useful results.
        modulo: 1,                             // 0 to 9

        // The exponent value at and beneath which `toString` returns exponential notation.
        // JavaScript numbers: -7
        toExpNeg: -7,                          // 0 to -EXP_LIMIT

        // The exponent value at and above which `toString` returns exponential notation.
        // JavaScript numbers: 21
        toExpPos: 21,                         // 0 to EXP_LIMIT

        // The minimum exponent value, beneath which underflow to zero occurs.
        // JavaScript numbers: -324  (5e-324)
        minE: -EXP_LIMIT,                      // -1 to -EXP_LIMIT

        // The maximum exponent value, above which overflow to Infinity occurs.
        // JavaScript numbers: 308  (1.7976931348623157e+308)
        maxE: EXP_LIMIT,                       // 1 to EXP_LIMIT

        // Whether to use cryptographically-secure random number generation, if available.
        crypto: false                          // true/false
    },


    // ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //


    external = true,

    decimalError = '[DecimalError] ',
    invalidArgument = decimalError + 'Invalid argument: ',
    cryptoUnavailable = decimalError + 'crypto unavailable',
    tag = '[object Decimal]',

    mathfloor = Math.floor,
    mathpow = Math.pow,

    isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
    isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
    isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
    isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,

    BASE = 1e7,
    LOG_BASE = 7,

    // Decimal.prototype object
    P = { toStringTag: tag }


// Decimal prototype methods




/*
 * Return a new Decimal whose value is the absolute value of this Decimal.
 *
 */
P.absoluteValue = P.abs = function () {
    var x = new this.constructor(this)
    if (x.s < 0) x.s = 1
    return finalise(x)
}


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
 * direction of positive Infinity.
 *
 */
P.ceil = function () {
    return finalise(new this.constructor(this), this.e + 1, 2)
}



/*
 * Return
 *   1    if the value of this Decimal is greater than the value of `y`,
 *  -1    if the value of this Decimal is less than the value of `y`,
 *   0    if they have the same value,
 *   NaN  if the value of either Decimal is NaN.
 *
 */
P.comparedTo = P.cmp = function (y) {
    var i, j, xdL, ydL,
        x = this,
        xd = x.d,
        yd = (y = new x.constructor(y)).d,
        xs = x.s,
        ys = y.s

    // Either NaN or ±Infinity?
    if (!xd || !yd) {
        return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1
    }

    // Either zero?
    if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0

    // Signs differ?
    if (xs !== ys) return xs

    // Compare exponents.
    if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1

    xdL = xd.length
    ydL = yd.length

    // Compare digit by digit.
    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
        if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1
    }

    // Compare lengths.
    return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1
}


/*
 * Return the number of decimal places of the value of this Decimal.
 *
 */
P.decimalPlaces = P.dp = function () {
    var w,
        d = this.d,
        n = NaN

    if (d) {
        w = d.length - 1
        n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE

        // Subtract the number of trailing zeros of the last word.
        w = d[w]
        if (w) for (; w % 10 == 0; w /= 10) n--
        if (n < 0) n = 0
    }

    return n
}


/*
 *  n / 0 = I
 *  n / N = N
 *  n / I = 0
 *  0 / n = 0
 *  0 / 0 = N
 *  0 / N = N
 *  0 / I = 0
 *  N / n = N
 *  N / 0 = N
 *  N / N = N
 *  N / I = N
 *  I / n = I
 *  I / 0 = I
 *  I / N = N
 *  I / I = N
 *
 * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 */
P.dividedBy = P.div = function (y) {
    return divide(this, new this.constructor(y))
}


/*
 * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
 * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
 *
 */
P.dividedToIntegerBy = P.divToInt = function (y) {
    var x = this,
        Ctor = x.constructor
    return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding)
}


/*
 * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
 *
 */
P.equals = P.eq = function (y) {
    return this.cmp(y) === 0
}


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
 * direction of negative Infinity.
 *
 */
P.floor = function () {
    return finalise(new this.constructor(this), this.e + 1, 3)
}


/*
 * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
 * false.
 *
 */
P.greaterThan = P.gt = function (y) {
    return this.cmp(y) > 0
}


/*
 * Return true if the value of this Decimal is greater than or equal to the value of `y`,
 * otherwise return false.
 *
 */
P.greaterThanOrEqualTo = P.gte = function (y) {
    var k = this.cmp(y)
    return k == 1 || k === 0
}




/*
 * Return true if the value of this Decimal is a finite number, otherwise return false.
 *
 */
P.isFinite = function () {
    return !!this.d
}


/*
 * Return true if the value of this Decimal is an integer, otherwise return false.
 *
 */
P.isInteger = P.isInt = function () {
    return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2
}


/*
 * Return true if the value of this Decimal is NaN, otherwise return false.
 *
 */
P.isNaN = function () {
    return !this.s
}


/*
 * Return true if the value of this Decimal is negative, otherwise return false.
 *
 */
P.isNegative = P.isNeg = function () {
    return this.s < 0
}


/*
 * Return true if the value of this Decimal is positive, otherwise return false.
 *
 */
P.isPositive = P.isPos = function () {
    return this.s > 0
}


/*
 * Return true if the value of this Decimal is 0 or -0, otherwise return false.
 *
 */
P.isZero = function () {
    return !!this.d && this.d[0] === 0
}


/*
 * Return true if the value of this Decimal is less than `y`, otherwise return false.
 *
 */
P.lessThan = P.lt = function (y) {
    return this.cmp(y) < 0
}


/*
 * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
 *
 */
P.lessThanOrEqualTo = P.lte = function (y) {
    return this.cmp(y) < 1
}




/*
 * Return the number of significant digits of the value of this Decimal.
 *
 * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
 *
 */
P.precision = P.sd = function (z) {
    var k,
        x = this

    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z)

    if (x.d) {
        k = getPrecision(x.d)
        if (z && x.e + 1 > k) k = x.e + 1
    } else {
        k = NaN
    }

    return k
}


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
 * rounding mode `rounding`.
 *
 */
P.round = function () {
    var x = this,
        Ctor = x.constructor

    return finalise(new Ctor(x), x.e + 1, Ctor.rounding)
}



/*
 *  n * 0 = 0
 *  n * N = N
 *  n * I = I
 *  0 * n = 0
 *  0 * 0 = 0
 *  0 * N = N
 *  0 * I = N
 *  N * n = N
 *  N * 0 = N
 *  N * N = N
 *  N * I = N
 *  I * n = I
 *  I * 0 = N
 *  I * N = N
 *  I * I = I
 *
 * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 */
P.times = P.mul = function (y) {
    var carry, e, i, k, r, rL, t, xdL, ydL,
        x = this,
        Ctor = x.constructor,
        xd = x.d,
        yd = (y = new Ctor(y)).d

    y.s *= x.s

    // If either is NaN, ±Infinity or ±0...
    if (!xd || !xd[0] || !yd || !yd[0]) {

        return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd

            // Return NaN if either is NaN.
            // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
            ? NaN

            // Return ±Infinity if either is ±Infinity.
            // Return ±0 if either is ±0.
            : !xd || !yd ? y.s / 0 : y.s * 0)
    }

    e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE)
    xdL = xd.length
    ydL = yd.length

    // Ensure xd points to the longer array.
    if (xdL < ydL) {
        r = xd
        xd = yd
        yd = r
        rL = xdL
        xdL = ydL
        ydL = rL
    }

    // Initialise the result array with zeros.
    r = []
    rL = xdL + ydL
    for (i = rL; i--;) r.push(0)

    // Multiply!
    for (i = ydL; --i >= 0;) {
        carry = 0
        for (k = xdL + i; k > i;) {
            t = r[k] + yd[i] * xd[k - i - 1] + carry
            r[k--] = t % BASE | 0
            carry = t / BASE | 0
        }

        r[k] = (r[k] + carry) % BASE | 0
    }

    // Remove trailing zeros.
    for (; !r[--rL];) r.pop()

    if (carry) ++e
    else r.shift()

    y.d = r
    y.e = getBase10Exponent(r, e)

    return external ? finalise(y, Ctor.precision, Ctor.rounding) : y
}


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
 * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
 *
 * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
 *
 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toDecimalPlaces = P.toDP = function (dp, rm) {
    var x = this,
        Ctor = x.constructor

    x = new Ctor(x)
    if (dp === void 0) return x

    checkInt32(dp, 0, MAX_DIGITS)

    if (rm === void 0) rm = Ctor.rounding
    else checkInt32(rm, 0, 8)

    return finalise(x, dp + x.e + 1, rm)
}



/*
 * Returns a new Decimal whose value is the nearest multiple of `y` in the direction of rounding
 * mode `rm`, or `Decimal.rounding` if `rm` is omitted, to the value of this Decimal.
 *
 * The return value will always have the same sign as this Decimal, unless either this Decimal
 * or `y` is NaN, in which case the return value will be also be NaN.
 *
 * The return value is not affected by the value of `precision`.
 *
 * y {number|string|Decimal} The magnitude to round to a multiple of.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 * 'toNearest() rounding mode not an integer: {rm}'
 * 'toNearest() rounding mode out of range: {rm}'
 *
 */
P.toNearest = function (y, rm) {
    var x = this,
        Ctor = x.constructor

    x = new Ctor(x)

    if (y == null) {

        // If x is not finite, return x.
        if (!x.d) return x

        y = new Ctor(1)
        rm = Ctor.rounding
    } else {
        y = new Ctor(y)
        if (rm === void 0) {
            rm = Ctor.rounding
        } else {
            checkInt32(rm, 0, 8)
        }

        // If x is not finite, return x if y is not NaN, else NaN.
        if (!x.d) return y.s ? x : y

        // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
        if (!y.d) {
            if (y.s) y.s = x.s
            return y
        }
    }

    // If y is not zero, calculate the nearest multiple of y to x.
    if (y.d[0]) {
        external = false
        x = divide(x, y, 0, rm, 1).times(y)
        external = true
        finalise(x)

        // If y is zero, return zero with the sign of x.
    } else {
        y.s = x.s
        x = y
    }

    return x
}


/*
 * Return the value of this Decimal converted to a number primitive.
 * Zero keeps its sign.
 *
 */
P.toNumber = function () {
    return +this
}



/*
 * Return a string representing the value of this Decimal rounded to `sd` significant digits
 * using rounding mode `rounding`.
 *
 * Return exponential notation if `sd` is less than the number of digits necessary to represent
 * the integer part of the value in normal notation.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P.toPrecision = function (sd, rm) {
    var str,
        x = this,
        Ctor = x.constructor

    if (sd === void 0) {
        str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos)
    } else {
        checkInt32(sd, 1, MAX_DIGITS)

        if (rm === void 0) rm = Ctor.rounding
        else checkInt32(rm, 0, 8)

        x = finalise(new Ctor(x), sd, rm)
        str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd)
    }

    return x.isNeg() && !x.isZero() ? '-' + str : str
}


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
 * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
 * omitted.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 * 'toSD() digits out of range: {sd}'
 * 'toSD() digits not an integer: {sd}'
 * 'toSD() rounding mode not an integer: {rm}'
 * 'toSD() rounding mode out of range: {rm}'
 *
 */
P.toSignificantDigits = P.toSD = function (sd, rm) {
    var x = this,
        Ctor = x.constructor

    if (sd === void 0) {
        sd = Ctor.precision
        rm = Ctor.rounding
    } else {
        checkInt32(sd, 1, MAX_DIGITS)

        if (rm === void 0) rm = Ctor.rounding
        else checkInt32(rm, 0, 8)
    }

    return finalise(new Ctor(x), sd, rm)
}


/*
 * Return a string representing the value of this Decimal.
 *
 * Return exponential notation if this Decimal has a positive exponent equal to or greater than
 * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
 *
 */
P.toString = function () {
    var x = this,
        Ctor = x.constructor,
        str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos)

    return x.isNeg() && !x.isZero() ? '-' + str : str
}


/*
 * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
 *
 */
P.truncated = P.trunc = function () {
    return finalise(new this.constructor(this), this.e + 1, 1)
}


/*
 * Return a string representing the value of this Decimal.
 * Unlike `toString`, negative zero will include the minus sign.
 *
 */
P.valueOf = P.toJSON = function () {
    var x = this,
        Ctor = x.constructor,
        str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos)

    return x.isNeg() ? '-' + str : str
}


function digitsToString(d) {
    var i, k, ws,
        indexOfLastWord = d.length - 1,
        str = '',
        w = d[0]

    if (indexOfLastWord > 0) {
        str += w
        for (i = 1; i < indexOfLastWord; i++) {
            ws = d[i] + ''
            k = LOG_BASE - ws.length
            if (k) str += getZeroString(k)
            str += ws
        }

        w = d[i]
        ws = w + ''
        k = LOG_BASE - ws.length
        if (k) str += getZeroString(k)
    } else if (w === 0) {
        return '0'
    }

    // Remove trailing zeros of last w.
    for (; w % 10 === 0;) w /= 10

    return str + w
}


function checkInt32(i, min, max) {
    if (i !== ~~i || i < min || i > max) {
        throw Error(invalidArgument + i)
    }
}




/*
 * Perform division in the specified base.
 */
var divide = (function () {

    // Assumes non-zero x and k, and hence non-zero result.
    function multiplyInteger(x, k, base) {
        var temp,
            carry = 0,
            i = x.length

        for (x = x.slice(); i--;) {
            temp = x[i] * k + carry
            x[i] = temp % base | 0
            carry = temp / base | 0
        }

        if (carry) x.unshift(carry)

        return x
    }

    function compare(a, b, aL, bL) {
        var i, r

        if (aL != bL) {
            r = aL > bL ? 1 : -1
        } else {
            for (i = r = 0; i < aL; i++) {
                if (a[i] != b[i]) {
                    r = a[i] > b[i] ? 1 : -1
                    break
                }
            }
        }

        return r
    }

    function subtract(a, b, aL, base) {
        var i = 0

        // Subtract b from a.
        for (; aL--;) {
            a[aL] -= i
            i = a[aL] < b[aL] ? 1 : 0
            a[aL] = i * base + a[aL] - b[aL]
        }

        // Remove leading zeros.
        for (; !a[0] && a.length > 1;) a.shift()
    }

    return function (x, y, pr, rm, dp, base) {
        var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0,
            yL, yz,
            Ctor = x.constructor,
            sign = x.s == y.s ? 1 : -1,
            xd = x.d,
            yd = y.d

        // Either NaN, Infinity or 0?
        if (!xd || !xd[0] || !yd || !yd[0]) {

            return new Ctor(// Return NaN if either NaN, or both Infinity or 0.
                !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN :

                    // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
                    xd && xd[0] == 0 || !yd ? sign * 0 : sign / 0)
        }

        if (base) {
            logBase = 1
            e = x.e - y.e
        } else {
            base = BASE
            logBase = LOG_BASE
            e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase)
        }

        yL = yd.length
        xL = xd.length
        q = new Ctor(sign)
        qd = q.d = []

        // Result exponent may be one less than e.
        // The digit array of a Decimal from toStringBinary may have trailing zeros.
        for (i = 0; yd[i] == (xd[i] || 0); i++);

        if (yd[i] > (xd[i] || 0)) e--

        if (pr == null) {
            sd = pr = Ctor.precision
            rm = Ctor.rounding
        } else if (dp) {
            sd = pr + (x.e - y.e) + 1
        } else {
            sd = pr
        }

        if (sd < 0) {
            qd.push(1)
            more = true
        } else {

            // Convert precision in number of base 10 digits to base 1e7 digits.
            sd = sd / logBase + 2 | 0
            i = 0

            // divisor < 1e7
            if (yL == 1) {
                k = 0
                yd = yd[0]
                sd++

                // k is the carry.
                for (; (i < xL || k) && sd--; i++) {
                    t = k * base + (xd[i] || 0)
                    qd[i] = t / yd | 0
                    k = t % yd | 0
                }

                more = k || i < xL

                // divisor >= 1e7
            } else {

                // Normalise xd and yd so highest order digit of yd is >= base/2
                k = base / (yd[0] + 1) | 0

                if (k > 1) {
                    yd = multiplyInteger(yd, k, base)
                    xd = multiplyInteger(xd, k, base)
                    yL = yd.length
                    xL = xd.length
                }

                xi = yL
                rem = xd.slice(0, yL)
                remL = rem.length

                // Add zeros to make remainder as long as divisor.
                for (; remL < yL;) rem[remL++] = 0

                yz = yd.slice()
                yz.unshift(0)
                yd0 = yd[0]

                if (yd[1] >= base / 2) ++yd0

                do {
                    k = 0

                    // Compare divisor and remainder.
                    cmp = compare(yd, rem, yL, remL)

                    // If divisor < remainder.
                    if (cmp < 0) {

                        // Calculate trial digit, k.
                        rem0 = rem[0]
                        if (yL != remL) rem0 = rem0 * base + (rem[1] || 0)

                        // k will be how many times the divisor goes into the current remainder.
                        k = rem0 / yd0 | 0

                        //  Algorithm:
                        //  1. product = divisor * trial digit (k)
                        //  2. if product > remainder: product -= divisor, k--
                        //  3. remainder -= product
                        //  4. if product was < remainder at 2:
                        //    5. compare new remainder and divisor
                        //    6. If remainder > divisor: remainder -= divisor, k++

                        if (k > 1) {
                            if (k >= base) k = base - 1

                            // product = divisor * trial digit.
                            prod = multiplyInteger(yd, k, base)
                            prodL = prod.length
                            remL = rem.length

                            // Compare product and remainder.
                            cmp = compare(prod, rem, prodL, remL)

                            // product > remainder.
                            if (cmp == 1) {
                                k--

                                // Subtract divisor from product.
                                subtract(prod, yL < prodL ? yz : yd, prodL, base)
                            }
                        } else {

                            // cmp is -1.
                            // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
                            // to avoid it. If k is 1 there is a need to compare yd and rem again below.
                            if (k == 0) cmp = k = 1
                            prod = yd.slice()
                        }

                        prodL = prod.length
                        if (prodL < remL) prod.unshift(0)

                        // Subtract product from remainder.
                        subtract(rem, prod, remL, base)

                        // If product was < previous remainder.
                        if (cmp == -1) {
                            remL = rem.length

                            // Compare divisor and new remainder.
                            cmp = compare(yd, rem, yL, remL)

                            // If divisor < new remainder, subtract divisor from remainder.
                            if (cmp < 1) {
                                k++

                                // Subtract divisor from remainder.
                                subtract(rem, yL < remL ? yz : yd, remL, base)
                            }
                        }

                        remL = rem.length
                    } else if (cmp === 0) {
                        k++
                        rem = [0]
                    }    // if cmp === 1, k will be 0

                    // Add the next digit, k, to the result array.
                    qd[i++] = k

                    // Update the remainder.
                    if (cmp && rem[0]) {
                        rem[remL++] = xd[xi] || 0
                    } else {
                        rem = [xd[xi]]
                        remL = 1
                    }

                } while ((xi++ < xL || rem[0] !== void 0) && sd--)

                more = rem[0] !== void 0
            }

            // Leading zero?
            if (!qd[0]) qd.shift()
        }

        // logBase is 1 when divide is being used for base conversion.
        if (logBase == 1) {
            q.e = e
            inexact = more
        } else {

            // To calculate q.e, first get the number of digits of qd[0].
            for (i = 1, k = qd[0]; k >= 10; k /= 10) i++
            q.e = i + e * logBase - 1

            finalise(q, dp ? pr + q.e + 1 : pr, rm, more)
        }

        return q
    }
})()


/*
 * Round `x` to `sd` significant digits using rounding mode `rm`.
 * Check for over/under-flow.
 */
function finalise(x, sd, rm, isTruncated) {
    var digits, i, j, k, rd, roundUp, w, xd, xdi,
        Ctor = x.constructor

    // Don't round if sd is null or undefined.
    out: if (sd != null) {
        xd = x.d

        // Infinity/NaN.
        if (!xd) return x

        // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
        // w: the word of xd containing rd, a base 1e7 number.
        // xdi: the index of w within xd.
        // digits: the number of digits of w.
        // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
        // they had leading zeros)
        // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

        // Get the length of the first word of the digits array xd.
        for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++
        i = sd - digits

        // Is the rounding digit in the first word of xd?
        if (i < 0) {
            i += LOG_BASE
            j = sd
            w = xd[xdi = 0]

            // Get the rounding digit at index j of w.
            rd = w / mathpow(10, digits - j - 1) % 10 | 0
        } else {
            xdi = Math.ceil((i + 1) / LOG_BASE)
            k = xd.length
            if (xdi >= k) {
                if (isTruncated) {

                    // Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
                    for (; k++ <= xdi;) xd.push(0)
                    w = rd = 0
                    digits = 1
                    i %= LOG_BASE
                    j = i - LOG_BASE + 1
                } else {
                    break out
                }
            } else {
                w = k = xd[xdi]

                // Get the number of digits of w.
                for (digits = 1; k >= 10; k /= 10) digits++

                // Get the index of rd within w.
                i %= LOG_BASE

                // Get the index of rd within w, adjusted for leading zeros.
                // The number of leading zeros of w is given by LOG_BASE - digits.
                j = i - LOG_BASE + digits

                // Get the rounding digit at index j of w.
                rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0
            }
        }

        // Are there any non-zero digits after the rounding digit?
        isTruncated = isTruncated || sd < 0 ||
            xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1))

        // The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
        // of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
        // will give 714.

        roundUp = rm < 4
            ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
            : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 &&

                // Check whether the digit to the left of the rounding digit is odd.
                ((i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
                rm == (x.s < 0 ? 8 : 7))

        if (sd < 1 || !xd[0]) {
            xd.length = 0
            if (roundUp) {

                // Convert sd to decimal places.
                sd -= x.e + 1

                // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE)
                x.e = -sd || 0
            } else {

                // Zero.
                xd[0] = x.e = 0
            }

            return x
        }

        // Remove excess digits.
        if (i == 0) {
            xd.length = xdi
            k = 1
            xdi--
        } else {
            xd.length = xdi + 1
            k = mathpow(10, LOG_BASE - i)

            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of w.
            xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0
        }

        if (roundUp) {
            for (; ;) {

                // Is the digit to be rounded up in the first word of xd?
                if (xdi == 0) {

                    // i will be the length of xd[0] before k is added.
                    for (i = 1, j = xd[0]; j >= 10; j /= 10) i++
                    j = xd[0] += k
                    for (k = 1; j >= 10; j /= 10) k++

                    // if i != k the length has increased.
                    if (i != k) {
                        x.e++
                        if (xd[0] == BASE) xd[0] = 1
                    }

                    break
                } else {
                    xd[xdi] += k
                    if (xd[xdi] != BASE) break
                    xd[xdi--] = 0
                    k = 1
                }
            }
        }

        // Remove trailing zeros.
        for (i = xd.length; xd[--i] === 0;) xd.pop()
    }

    if (external) {

        // Overflow?
        if (x.e > Ctor.maxE) {

            // Infinity.
            x.d = null
            x.e = NaN

            // Underflow?
        } else if (x.e < Ctor.minE) {

            // Zero.
            x.e = 0
            x.d = [0]
            // Ctor.underflow = true;
        } // else Ctor.underflow = false;
    }

    return x
}


function finiteToString(x, isExp, sd) {
    if (!x.isFinite()) return nonFiniteToString(x)
    var k,
        e = x.e,
        str = digitsToString(x.d),
        len = str.length

    if (isExp) {
        if (sd && (k = sd - len) > 0) {
            str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k)
        } else if (len > 1) {
            str = str.charAt(0) + '.' + str.slice(1)
        }

        str = str + (x.e < 0 ? 'e' : 'e+') + x.e
    } else if (e < 0) {
        str = '0.' + getZeroString(-e - 1) + str
        if (sd && (k = sd - len) > 0) str += getZeroString(k)
    } else if (e >= len) {
        str += getZeroString(e + 1 - len)
        if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k)
    } else {
        if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k)
        if (sd && (k = sd - len) > 0) {
            if (e + 1 === len) str += '.'
            str += getZeroString(k)
        }
    }

    return str
}


// Calculate the base 10 exponent from the base 1e7 exponent.
function getBase10Exponent(digits, e) {
    var w = digits[0]

    // Add the number of digits of the first word of the digits array.
    for (e *= LOG_BASE; w >= 10; w /= 10) e++
    return e
}



function getPrecision(digits) {
    var w = digits.length - 1,
        len = w * LOG_BASE + 1

    w = digits[w]

    // If non-zero...
    if (w) {

        // Subtract the number of trailing zeros of the last word.
        for (; w % 10 == 0; w /= 10) len--

        // Add the number of digits of the first word.
        for (w = digits[0]; w >= 10; w /= 10) len++
    }

    return len
}


function getZeroString(k) {
    var zs = ''
    for (; k--;) zs += '0'
    return zs
}



// ±Infinity, NaN.
function nonFiniteToString(x) {
    // Unsigned.
    return String(x.s * x.s / 0)
}


/*
 * Parse the value of a new Decimal `x` from string `str`.
 */
function parseDecimal(x, str) {
    var e, i, len

    // Decimal point?
    if ((e = str.indexOf('.')) > -1) str = str.replace('.', '')

    // Exponential form?
    if ((i = str.search(/e/i)) > 0) {

        // Determine exponent.
        if (e < 0) e = i
        e += +str.slice(i + 1)
        str = str.substring(0, i)
    } else if (e < 0) {

        // Integer.
        e = str.length
    }

    // Determine leading zeros.
    for (i = 0; str.charCodeAt(i) === 48; i++);

    // Determine trailing zeros.
    for (len = str.length; str.charCodeAt(len - 1) === 48; --len);
    str = str.slice(i, len)

    if (str) {
        len -= i
        x.e = e = e - i - 1
        x.d = []

        // Transform base

        // e is the base 10 exponent.
        // i is where to slice str to get the first word of the digits array.
        i = (e + 1) % LOG_BASE
        if (e < 0) i += LOG_BASE

        if (i < len) {
            if (i) x.d.push(+str.slice(0, i))
            for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE))
            str = str.slice(i)
            i = LOG_BASE - str.length
        } else {
            i -= len
        }

        for (; i--;) str += '0'
        x.d.push(+str)

        if (external) {

            // Overflow?
            if (x.e > x.constructor.maxE) {

                // Infinity.
                x.d = null
                x.e = NaN

                // Underflow?
            } else if (x.e < x.constructor.minE) {

                // Zero.
                x.e = 0
                x.d = [0]
                // x.constructor.underflow = true;
            } // else x.constructor.underflow = false;
        }
    } else {

        // Zero.
        x.e = 0
        x.d = [0]
    }

    return x
}


/*
 * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
 */
function parseOther(x, str) {
    var base, Ctor, divisor, i, isFloat, len, p, xd, xe

    if (str.indexOf('_') > -1) {
        str = str.replace(/(\d)_(?=\d)/g, '$1')
        if (isDecimal.test(str)) return parseDecimal(x, str)
    } else if (str === 'Infinity' || str === 'NaN') {
        if (!+str) x.s = NaN
        x.e = NaN
        x.d = null
        return x
    }

    if (isHex.test(str)) {
        base = 16
        str = str.toLowerCase()
    } else if (isBinary.test(str)) {
        base = 2
    } else if (isOctal.test(str)) {
        base = 8
    } else {
        throw Error(invalidArgument + str)
    }

    // Is there a binary exponent part?
    i = str.search(/p/i)

    if (i > 0) {
        p = +str.slice(i + 1)
        str = str.substring(2, i)
    } else {
        str = str.slice(2)
    }

    // Convert `str` as an integer then divide the result by `base` raised to a power such that the
    // fraction part will be restored.
    i = str.indexOf('.')
    isFloat = i >= 0
    Ctor = x.constructor

    if (isFloat) {
        str = str.replace('.', '')
        len = str.length
        i = len - i

        // log[10](16) = 1.2041... , log[10](88) = 1.9444....
        divisor = intPow(Ctor, new Ctor(base), i, i * 2)
    }

    xd = convertBase(str, base, BASE)
    xe = xd.length - 1

    // Remove trailing zeros.
    for (i = xe; xd[i] === 0; --i) xd.pop()
    if (i < 0) return new Ctor(x.s * 0)
    x.e = getBase10Exponent(xd, xe)
    x.d = xd
    external = false

    // At what precision to perform the division to ensure exact conversion?
    // maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
    // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
    // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
    // maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
    // Therefore using 4 * the number of digits of str will always be enough.
    if (isFloat) x = divide(x, divisor, len * 4)

    // Multiply by the binary exponent part if present.
    if (p) x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p))
    external = true

    return x
}


/*
 * Configure global settings for a Decimal constructor.
 *
 * `obj` is an object with one or more of the following properties,
 *
 *   precision  {number}
 *   rounding   {number}
 *   toExpNeg   {number}
 *   toExpPos   {number}
 *   maxE       {number}
 *   minE       {number}
 *   modulo     {number}
 *   crypto     {boolean|number}
 *   defaults   {true}
 *
 * E.g. Decimal.config({ precision: 20, rounding: 4 })
 *
 */
function config(obj) {
    if (!obj || typeof obj !== 'object') throw Error(decimalError + 'Object expected')
    var i, p, v,
        useDefaults = obj.defaults === true,
        ps = [
            'precision', 1, MAX_DIGITS,
            'rounding', 0, 8,
            'toExpNeg', -EXP_LIMIT, 0,
            'toExpPos', 0, EXP_LIMIT,
            'maxE', 0, EXP_LIMIT,
            'minE', -EXP_LIMIT, 0,
            'modulo', 0, 9
        ]

    for (i = 0; i < ps.length; i += 3) {
        if (p = ps[i], useDefaults) this[p] = DEFAULTS[p]
        if ((v = obj[p]) !== void 0) {
            if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v
            else throw Error(invalidArgument + p + ': ' + v)
        }
    }

    if (p = 'crypto', useDefaults) this[p] = DEFAULTS[p]
    if ((v = obj[p]) !== void 0) {
        if (v === true || v === false || v === 0 || v === 1) {
            if (v) {
                if (typeof crypto != 'undefined' && crypto &&
                    (crypto.getRandomValues || crypto.randomBytes)) {
                    this[p] = true
                } else {
                    throw Error(cryptoUnavailable)
                }
            } else {
                this[p] = false
            }
        } else {
            throw Error(invalidArgument + p + ': ' + v)
        }
    }

    return this
}

/*
 * Create and return a Decimal constructor with the same configuration properties as this Decimal
 * constructor.
 *
 */
function clone(obj) {
    var i, p, ps

    /*
     * The Decimal constructor and exported function.
     * Return a new Decimal instance.
     *
     * v {number|string|Decimal} A numeric value.
     *
     */
    function Decimal(v) {
        var e, i, t,
            x = this

        // Decimal called without new.
        if (!(x instanceof Decimal)) return new Decimal(v)

        // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
        // which points to Object.
        x.constructor = Decimal

        // Duplicate.
        if (isDecimalInstance(v)) {
            x.s = v.s

            if (external) {
                if (!v.d || v.e > Decimal.maxE) {

                    // Infinity.
                    x.e = NaN
                    x.d = null
                } else if (v.e < Decimal.minE) {

                    // Zero.
                    x.e = 0
                    x.d = [0]
                } else {
                    x.e = v.e
                    x.d = v.d.slice()
                }
            } else {
                x.e = v.e
                x.d = v.d ? v.d.slice() : v.d
            }

            return
        }

        t = typeof v

        if (t === 'number') {
            if (v === 0) {
                x.s = 1 / v < 0 ? -1 : 1
                x.e = 0
                x.d = [0]
                return
            }

            if (v < 0) {
                v = -v
                x.s = -1
            } else {
                x.s = 1
            }

            // Fast path for small integers.
            if (v === ~~v && v < 1e7) {
                for (e = 0, i = v; i >= 10; i /= 10) e++

                if (external) {
                    if (e > Decimal.maxE) {
                        x.e = NaN
                        x.d = null
                    } else if (e < Decimal.minE) {
                        x.e = 0
                        x.d = [0]
                    } else {
                        x.e = e
                        x.d = [v]
                    }
                } else {
                    x.e = e
                    x.d = [v]
                }

                return

                // Infinity, NaN.
            } else if (v * 0 !== 0) {
                if (!v) x.s = NaN
                x.e = NaN
                x.d = null
                return
            }

            return parseDecimal(x, v.toString())

        } else if (t !== 'string') {
            throw Error(invalidArgument + v)
        }

        // Minus sign?
        if ((i = v.charCodeAt(0)) === 45) {
            v = v.slice(1)
            x.s = -1
        } else {
            // Plus sign?
            if (i === 43) v = v.slice(1)
            x.s = 1
        }

        return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v)
    }

    Decimal.prototype = P

    Decimal.ROUND_UP = 0
    Decimal.ROUND_DOWN = 1
    Decimal.ROUND_CEIL = 2
    Decimal.ROUND_FLOOR = 3
    Decimal.ROUND_HALF_UP = 4
    Decimal.ROUND_HALF_DOWN = 5
    Decimal.ROUND_HALF_EVEN = 6
    Decimal.ROUND_HALF_CEIL = 7
    Decimal.ROUND_HALF_FLOOR = 8
    Decimal.EUCLID = 9

    Decimal.config = Decimal.set = config
    Decimal.clone = clone
    Decimal.isDecimal = isDecimalInstance

    Decimal.round = round

    if (obj === void 0) obj = {}
    if (obj) {
        if (obj.defaults !== true) {
            ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto']
            for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p]
        }
    }

    Decimal.config(obj)

    return Decimal
}



/*
 * Return true if object is a Decimal instance (where Decimal is any Decimal constructor),
 * otherwise return false.
 *
 */
function isDecimalInstance(obj) {
    return obj instanceof Decimal || obj && obj.toStringTag === tag || false
}


/*
 * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
 *
 * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
 *
 * x {number|string|Decimal}
 *
 */
function round(x) {
    return finalise(x = new this(x), x.e + 1, this.rounding)
}




P[Symbol.for('nodejs.util.inspect.custom')] = P.toString
P[Symbol.toStringTag] = 'Decimal'

// Create and configure initial Decimal constructor.
var Decimal = P.constructor = clone(DEFAULTS)

export default Decimal as any