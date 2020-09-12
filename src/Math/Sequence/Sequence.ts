

/**
* Return an array of integers from start to end inclusive.
* @category Sequence
* @param {number} start - The starting number.
* @param {number} end - The ending number.
* @return {number[]} An array [start, ..., end].
* @example
* ListIntegers(2,6) // return [2,3,4,5,6]
* ListIntegers(-2,1) // return [-2,-1,0,1]
*/
function ListIntegers(start: number, end: number): number[] {
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
}
globalThis.ListIntegers = ListIntegers




/**
* Return Tn in an arithmetic sequence: a+(n-1)d.
* @category Sequence
* @param {number} a - The first term.
* @param {number} d - The common difference.
* @param {number} n - The number of term.
* @return {number} The value of Tn = a+(n-1)d.
* @example
* ASterm(2,3,10) // return 29
* ASterm(5,-2,6) // return -5
*/
function ASterm(a: number, d: number, n: number): number {
    return a + (n - 1) * d
}
globalThis.ASterm = ASterm



/**
* Return Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
* @category Sequence
* @param {number} a - The first term.
* @param {number} d - The common difference.
* @param {number} n - The number of term.
* @return {number} The value of Sn = (n/2)(2a+(n-1)d).
* @example
* ASsum(2,3,10) // return 155
* ASsum(5,-2,6) // return 0
*/
function ASsum(a: number, d: number, n: number): number {
    return 0.5 * n * (2 * a + (n - 1) * d)
}
globalThis.ASsum = ASsum


/**
* Return an array of arithmetic sequence.
* @category Sequence
* @param {number} a - The first term.
* @param {number} d - The common difference.
* @param {number} [n=10] - The number of term.
* @return {number[]} An array of the first n terms in the AS.
* @example
* ASequence(2,3,5) // return [2,5,8,11,14]
* ASequence(5,-2,3) // return [5,3,1]
*/
function ASequence(a: number, d: number, n = 10): number[] {
    let arr = []
    for (let i = 1; i <= n; i++) {
        arr.push(ASterm(a, d, i))
    }
    return arr
}
globalThis.ASequence = ASequence



/**
* Return Tn in a geometric sequence: ar**(n-1)
* @category Sequence
* @param {number} a - The first term.
* @param {number} r - The common ratio.
* @param {number} n - The number of term.
* @return {number} The value of Tn = ar**(n-1).
* @example
* GSterm(2,3,4) // return 54
* GSterm(5,-2,6) // return -160
*/
function GSterm(a: number, r: number, n: number): number {
    return a * (r ** (n - 1))
}
globalThis.GSterm = GSterm



/**
* Return Sn in a geometric sequence: a*(r*n-1)/(r-1)
* @category Sequence
* @param {number} a - The first term.
* @param {number} r - The common ratio.
* @param {number} [n=-1] - The number of term. If n<0, sum to infinity.
* @return {number} The value of Sn = a*(r*n-1)/(r-1).
* @example
* GSsum(2,3,4) // return 80
* GSsum(5,-2,3) // return 15
* GSsum(3,0.5,-1) // return 6
*/
function GSsum(a: number, r: number, n = -1): number {
    if (n <= 0) {
        return a / (1 - r)
    }
    return a * (r ** n - 1) / (r - 1)
}
globalThis.GSsum = GSsum

/**
* Return an array of geometric sequence.
* @category Sequence
* @param {number} a - The first term.
* @param {number} r - The common ratio.
* @param {number} [n=10] - The number of term.
* @return {number[]} An array of the first n terms in the GS.
* @example
* GSequence(2,3,5) // return [2,6,18,54,162]
* GSequence(5,-2,3) // return [5,-10,20]
*/
function GSequence(a: number, r: number, n = 10): number[] {
    let arr = []
    for (let i = 1; i <= n; i++) {
        arr.push(GSterm(a, r, i))
    }
    return arr
}
globalThis.GSequence = GSequence