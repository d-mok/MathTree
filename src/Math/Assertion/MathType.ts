
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
 * @return check if the item is a fraction [num,num]
 * ```typescript
 * IsFraction([2,5]) // true
 * IsFraction(2) // false
 * IsFraction([1,2,3]) // false
 * IsFraction([NaN,NaN]) // false
 * ```
 */
function IsFraction(...items: any[]): boolean {
    return IsPoint(...items)
}
globalThis.IsFraction = IsFraction





/**
 * @category Assertion
 * @return check if the item is a vector [num,num]
 * ```typescript
 * IsVector([2,5]) // true
 * IsVector(2) // false
 * IsVector([1,2,3]) // false
 * IsVector([NaN,NaN]) // false
 * ```
 */
function IsVector(...items: any[]): boolean {
    return IsPoint(...items)
}
globalThis.IsVector = IsVector




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
 * @return check if the item is a Dfrac string
 * ```typescript
 * IsDfrac('\\dfrac{1}{2}') // true
 * IsDfrac('\\dfrac{x}{2}') // false
 * ```
 */
function IsDfrac(...items: any[]): boolean {
    const d = String.raw`-?\d+\.?\d*`
    const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
    return items.every(x => IsString(x) && x.match(new RegExp(f, 'g')))
}
globalThis.IsDfrac = IsDfrac


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
