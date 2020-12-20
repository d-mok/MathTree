
/**
 * @category Assertion
 * @return check if input is a number.
 * ```typescript
 * IsNum(1.23) // true
 * IsNum(NaN) // false
 * IsNum(Infinity) // false
 * IsNum('2') // false
 * ```
 */
function IsNum(...items: any[]): boolean {
    return items.every(
        x => typeof x === 'number' && isFinite(x)
    );
}
globalThis.IsNum = IsNum


/**
 * @category Assertion
 * @return check if number is an integer.
 * ```typescript
 * IsInteger(5) // true
 * IsInteger(0.5) // false
 * ```
 */
function IsInteger(...items: any[]): boolean {
    return Blurs(items).every(
        x => IsNum(x) && Number.isInteger(x)
    );
}
globalThis.IsInteger = IsInteger



/**
 * @category Assertion
 * @return check if number is a decimal (non-integer).
 * ```typescript
 * IsDecimal(0.5) // true
 * IsDecimal(5) // false
 * ```
 */
function IsDecimal(...items: any[]): boolean {
    return Blurs(items).every(
        x => IsNum(x) && !IsInteger(x)
    );
}
globalThis.IsDecimal = IsDecimal





/**
 * @category Assertion
 * @return check if the number is an integer but not -1, 0 or 1.
 * ```typescript
 * IsCoeff(2) // true
 * IsCoeff(-1) // false
 * ```
 */
function IsCoeff(...items: any[]): boolean {
    return Blurs(items).every(
        x => IsInteger(x) && ![-1, 0, 1].includes(x)
    );
}
globalThis.IsCoeff = IsCoeff






/**
 * @category Assertion
 * @return check if the number is an odd integer.
 * ```typescript
 * IsOdd(5) // true
 * IsOdd(-5) // true
 * IsOdd(4) // false
 * ```
 */
function IsOdd(...items: any[]): boolean {
    return Blurs(items).every(
        x => IsInteger(x) && Math.abs(x) % 2 === 1
    );
}
globalThis.IsOdd = IsOdd

/**
 * @category Assertion
 * @return check if the number is an even integer.
 * ```typescript
 * IsEven(4) // true
 * IsEven(-4) // true
 * IsEven(0) // true
 * IsEven(5) // false
 * ```
 */
function IsEven(...items: any[]): boolean {
    return Blurs(items).every(
        x => IsInteger(x) && Math.abs(x) % 2 === 0
    );
}
globalThis.IsEven = IsEven



/**
 * @category Assertion
 * @return check if the number is in [0,1].
 * ```typescript
 * IsProbability(0) // true
 * IsProbability(0.5467) // true
 * IsProbability(1.1) // false
 * IsProbability(-0.1) // false
 * ```
 */
function IsProbability(...items: any[]): boolean {
    return items.every(
        x => IsNum(x) && x >= 0 && x <= 1
    );
}
globalThis.IsProbability = IsProbability



/**
 * @category Assertion
 * @return check if the number is a square number.
 * ```typescript
 * IsSquareNum(9) // true
 * IsSquareNum(10) // false
 * IsSquareNum(-9) // false
 * ```
 */
function IsSquareNum(...items: any[]): boolean {
    return Blurs(items).every(
        x => IsInteger(x) && x >= 0 && IsInteger(Math.sqrt(x))
    );
}
globalThis.IsSquareNum = IsSquareNum



/**
 * @category Assertion
 * @return check if the number is positive.
 * ```typescript
 * IsPositive(2) // true
 * IsPositive(0) // false
 * IsPositive(-2) // false
 * ```
 */
function IsPositive(...items: any[]): boolean {
    return items.every(
        x => IsNum(x) && x > 0
    );
}
globalThis.IsPositive = IsPositive



/**
 * @category Assertion
 * @return check if the number is a positive integer.
 * ```typescript
 * IsPositiveInteger(2) // true
 * IsPositiveInteger(0) // false
 * IsPositiveInteger(-2) // false
 * IsPositiveInteger(1.5) // false
 * ```
 */
function IsPositiveInteger(...items: any[]): boolean {
    return items.every(
        x => IsInteger(x) && x > 0
    );
}
globalThis.IsPositiveInteger = IsPositiveInteger




/**
 * @category Assertion
 * @return check if the number is negative.
 * ```typescript
 * IsNegative(-2) // true
 * IsNegative(0) // false
 * IsNegative(2) // false
 * ```
 */
function IsNegative(...items: any[]): boolean {
    return items.every(
        x => IsNum(x) && x < 0
    );
}
globalThis.IsNegative = IsNegative




/**
 * @category Assertion
 * @return check if the number is non-zero.
 * ```typescript
 * IsNonZero(2) // true
 * IsNonZero(0) // false
 * IsNonZero(-2) // true
 * ```
 */
function IsNonZero(...items: any[]): boolean {
    return items.every(
        x => IsNum(x) && x !== 0
    );
}
globalThis.IsNonZero = IsNonZero





/**
 * @category Assertion
 * @return check if the item is a string
 * ```typescript
 * IsString('abc') // true
 * IsString('') // true
 * IsString('1') // true
 * IsString(1) // false
 * ```
 */
function IsString(...items: any[]): boolean {
    return items.every(
        x => typeof x === 'string'
    );
}
globalThis.IsString = IsString


/**
 * @category Assertion
 * @return check if the item is an empty object
 * ```typescript
 * IsEmptyObject({}) // true
 * IsEmptyObject(1) // false
 * IsEmptyObject('abc') // false
 * IsEmptyObject({x:1}) // false
 * ```
 */
function IsEmptyObject(...items: any[]): boolean {
    return items.every(x =>
        !!x &&
        Object.keys(x).length === 0 &&
        x.constructor === Object
    );
}
globalThis.IsEmptyObject = IsEmptyObject


/**
 * @category Assertion
 * @return check if the item is an array
 * ```typescript
 * IsArray([]) // true
 * IsArray([1,2]) // true
 * IsArray('abc') // false
 * IsArray({x:1}) // false
 * ```
 */
function IsArray(...items: any[]): boolean {
    return items.every(
        x => Array.isArray(x)
    );
}
globalThis.IsArray = IsArray



function IsArrayOfLength(length: number) {
    Must(
        IsPositiveInteger(length),
        'IsArrayOfLength: length must be positive integer'
    )
    const f = function (...items: any[]): boolean {
        return items.every(
            x => IsArray(x) && x.length === length
        );
    }
    return f
}
globalThis.IsArrayOfLength = IsArrayOfLength


/**
 * @category Assertion
 * @return check if the num is between min and max inclusive.
 * ```typescript
 * IsBetween(2,5)(3) // true
 * IsBetween(2,5)(2) // true
 * IsBetween(2,5)(1) // false
 * ```
 */
function IsBetween(min: number, max: number) {
    Must(IsNum(min, max), 'IsBetween: min and max must be number')
    const f = function (...items: any[]): boolean {
        return items.every(
            x => IsNum(x) && x >= min && x <= max
        );
    }
    return f
}
globalThis.IsBetween = IsBetween

/**
 * @category Assertion
 * @return check if the abs of num is between min and max inclusive.
 * ```typescript
 * IsAbsBetween(2,5)(-3) // true
 * IsAbsBetween(2,5)(-2) // true
 * IsAbsBetween(2,5)(1) // false
 * ```
 */
function IsAbsBetween(min: number, max: number) {
    Must(IsNum(min, max), 'IsBetween: min and max must be number')
    const f = function (...items: any[]): boolean {
        return items.every(
            x => IsNum(x) && Abs(x) >= min && Abs(x) <= max
        );
    }
    return f
}
globalThis.IsAbsBetween = IsAbsBetween


/**
 * @category Assertion
 * @return check if the item is a point [num,num]
 * ```typescript
 * IsPoint([2,5]) // true
 * IsPoint(2) // false
 * IsPoint([1,2,3]) // false
 * IsPoint([NaN,NaN]) // false
 * ```
 */
function IsPoint(...items: any[]): boolean {
    return items.every(
        x => IsArrayOfLength(2)(x) && IsNum(x[0], x[1])
    );
}
globalThis.IsPoint = IsPoint



/**
 * @category Assertion
 * @return check if the item is a IneqSign string
 * ```typescript
 * IsIneqSign('>') // true
 * IsIneqSign('\\ge') // true
 * IsIneqSign(true) // false
 * IsIneqSign('=>') // false
 * ```
 */
function IsIneqSign(...items: any[]): boolean {
    return items.every(
        x => [
            '>', '<', '>=', '<=',
            '\\gt', '\\lt', '\\ge', '\\le'
        ].includes(x)
    );
}
globalThis.IsIneqSign = IsIneqSign


/**
 * @category Assertion
 * @return check if the item is a constraint (LP)
 * ```typescript
 * IsConstraint([1,2,'>',3]) // true
 * IsConstraint([1,2,3]) // false
 * IsConstraint([1,2,'=>',3]) // false
 * ```
 */
function IsConstraint(...items: any[]): boolean {
    return items.every(
        x => IsArrayOfLength(4)(x) &&
            IsNum(x[0], x[1], x[3]) &&
            IsIneqSign(x[2])
    );
}
globalThis.IsConstraint = IsConstraint

