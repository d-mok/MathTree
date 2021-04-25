
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
    Should(
        IsPositiveInteger(length),
        'length must be positive integer'
    )
    const f = function (...items: any[]): boolean {
        return items.every(
            x => IsArray(x) && x.length === length
        );
    }
    return f
}
globalThis.IsArrayOfLength = IsArrayOfLength
