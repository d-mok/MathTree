
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
 * @return check if the item is a boolean
 * ```typescript
 * IsBoolean(true) // true
 * IsBoolean(false) // true
 * IsBoolean('') // false
 * IsBoolean('1') // false
 * IsBoolean(1) // false
 * ```
 */
function IsBoolean(...items: any[]): boolean {
    return items.every(
        x => typeof x === 'boolean'
    )
}
globalThis.IsBoolean = IsBoolean




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



