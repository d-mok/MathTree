/**
 * @category Assertion
 * @return check is a finite number.
 * ```typescript
 * IsNum(1.23) // true
 * IsNum(NaN) // false
 * IsNum(Infinity) // false
 * IsNum('2') // false
 * ```
 */
declare function IsNum(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an integer.
 * ```typescript
 * IsInteger(5) // true
 * IsInteger(0.5) // false
 * ```
 */
declare function IsInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a decimal (non-integer).
 * ```typescript
 * IsDecimal(0.5) // true
 * IsDecimal(5) // false
 * ```
 */
declare function IsDecimal(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a rational number with denominator <= 1000.
 * ```typescript
 * IsRational(0.5) // true
 * IsRational(-5) // true
 * IsRational(Math.sqrt(2)) // false
 * ```
 */
declare function IsRational(...items: any[]): boolean;
/**
 * @category Assertion
 * @ignore
 * @deprecated
 * @return check is an integer but not -1, 0 or 1.
 * ```typescript
 * IsCoeff(2) // true
 * IsCoeff(-1) // false
 * ```
 */
declare function IsCoeff(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an odd integer.
 * ```typescript
 * IsOdd(5) // true
 * IsOdd(-5) // true
 * IsOdd(4) // false
 * ```
 */
declare function IsOdd(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is an even integer.
 * ```typescript
 * IsEven(4) // true
 * IsEven(-4) // true
 * IsEven(0) // true
 * IsEven(5) // false
 * ```
 */
declare function IsEven(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is in range [0,1].
 * ```typescript
 * IsProbability(0) // true
 * IsProbability(0.5467) // true
 * IsProbability(1.1) // false
 * IsProbability(-0.1) // false
 * ```
 */
declare function IsProbability(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a square number.
 * ```typescript
 * IsSquareNum(9) // true
 * IsSquareNum(10) // false
 * IsSquareNum(-9) // false
 * ```
 */
declare function IsSquareNum(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is positive.
 * ```typescript
 * IsPositive(2) // true
 * IsPositive(0) // false
 * IsPositive(-2) // false
 * ```
 */
declare function IsPositive(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is non-negative.
 * ```typescript
 * IsNonNegative(2) // true
 * IsNonNegative(0) // true
 * IsNonNegative(-2) // false
 * IsNonNegative(1.5) // true
 * ```
 */
declare function IsNonNegative(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a positive integer.
 * ```typescript
 * IsPositiveInteger(2) // true
 * IsPositiveInteger(0) // false
 * IsPositiveInteger(-2) // false
 * IsPositiveInteger(1.5) // false
 * ```
 */
declare function IsPositiveInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is a non-negative integer.
 * ```typescript
 * IsNonNegativeInteger(2) // true
 * IsNonNegativeInteger(0) // true
 * IsNonNegativeInteger(-2) // false
 * IsNonNegativeInteger(1.5) // false
 * ```
 */
declare function IsNonNegativeInteger(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is negative.
 * ```typescript
 * IsNegative(-2) // true
 * IsNegative(0) // false
 * IsNegative(2) // false
 * ```
 */
declare function IsNegative(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is non-zero finite number.
 * ```typescript
 * IsNonZero(2) // true
 * IsNonZero(0) // false
 * IsNonZero(-2) // true
 * ```
 */
declare function IsNonZero(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check is between min and max inclusive.
 * ```typescript
 * IsBetween(2,5)(3) // true
 * IsBetween(2,5)(2) // true
 * IsBetween(2,5)(1) // false
 * ```
 */
declare function IsBetween(min: number, max: number): (...items: any[]) => boolean;
/**
 * @category Assertion
 * @return check if its abs is between min and max inclusive.
 * ```typescript
 * IsAbsBetween(2,5)(-3) // true
 * IsAbsBetween(2,5)(-2) // true
 * IsAbsBetween(2,5)(1) // false
 * ```
 */
declare function IsAbsBetween(min: number, max: number): (...items: any[]) => boolean;
/**
 * @category Assertion
 * @return Check if the points are chessboard around anchor.
 * ```typescript
 * IsAroundPoint([0,0],2)([2,2]) // true
 * IsAroundPoint([0,0],2)([3,0]) // false
 * ```
 */
declare function IsAroundPoint(anchor: Point, range: number): (...points: Point[]) => boolean;
/**
 * @category Assertion
 * @return Check if the array of legnths can form a triangle
 * ```typescript
 * IsTriangle([1,1,1]) // true
 * IsTriangle([6,7,8]) // true
 * IsTriangle([1,2,3]) // false
 * IsTriangle([6,14,8]) // false
 * ```
 */
declare function IsTriangle(...triangles: [number, number, number][]): boolean;
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
declare function IsPoint(...items: any[]): boolean;
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
declare function IsFraction(...items: any[]): boolean;
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
declare function IsVector(...items: any[]): boolean;
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
declare function IsIneqSign(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a Dfrac string
 * ```typescript
 * IsDfrac('\\dfrac{1}{2}') // true
 * IsDfrac('\\dfrac{x}{2}') // false
 * ```
 */
declare function IsDfrac(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is a constraint (LP)
 * ```typescript
 * IsConstraint([1,2,'>',3]) // true
 * IsConstraint([1,2,3]) // false
 * IsConstraint([1,2,'=>',3]) // false
 * ```
 */
declare function IsConstraint(...items: any[]): boolean;
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
declare function IsString(...items: any[]): boolean;
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
declare function IsBoolean(...items: any[]): boolean;
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
declare function IsEmptyObject(...items: any[]): boolean;
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
declare function IsArray(...items: any[]): boolean;
/**
 * @category Assertion
 * @return check if the item is an array with given length
 * ```typescript
 * IsArrayOfLength(2)([1]) // false
 * IsArrayOfLength(2)([1,2]) // true
 * IsArrayOfLength(2)([1,2,3]) // false
 * IsArrayOfLength('abc') // false
 * IsArrayOfLength({x:1}) // false
 * ```
 */
declare function IsArrayOfLength(length: number): (...items: any[]) => boolean;
