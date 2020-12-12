/**
* @category Sequence
* @return an array of integers from start to end inclusive.
* ```typescript
* ListIntegers(2,6) // return [2,3,4,5,6]
* ListIntegers(-2,1) // return [-2,-1,0,1]
* ```
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
* @category Sequence
* @return Tn in an arithmetic sequence: a+(n-1)d
* ```typescript
* ASterm(2,3,10) // return 29
* ASterm(5,-2,6) // return -5
* ```
*/
function ASterm(a: number, d: number, n: number): number {
    return a + (n - 1) * d
}
globalThis.ASterm = ASterm



/**
* @category Sequence
* @return Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
* ```typescript
* ASsum(2,3,10) // return 155
* ASsum(5,-2,6) // return 0
* ```
*/
function ASsum(a: number, d: number, n: number): number {
    return 0.5 * n * (2 * a + (n - 1) * d)
}
globalThis.ASsum = ASsum


/**
* @category Sequence
* @return an array of the first n terms in an arithmetic sequence.
* ```typescript
* ASequence(2,3,5) // return [2,5,8,11,14]
* ASequence(5,-2,3) // return [5,3,1]
* ```
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
* @category Sequence
* @return Tn in a geometric sequence: ar**(n-1)
* ```typescript
* GSterm(2,3,4) // return 54
* GSterm(5,-2,6) // return -160
* ```
*/
function GSterm(a: number, r: number, n: number): number {
    return a * (r ** (n - 1))
}
globalThis.GSterm = GSterm



/**
* @category Sequence
* @return Sn in a geometric sequence: a*(r*n-1)/(r-1) . If n<0, sum to infinity.
* ```typescript
* GSsum(2,3,4) // return 80
* GSsum(5,-2,3) // return 15
* GSsum(3,0.5,-1) // return 6
* ```
*/
function GSsum(a: number, r: number, n = -1): number {
    if (n <= 0) {
        return a / (1 - r)
    }
    return a * (r ** n - 1) / (r - 1)
}
globalThis.GSsum = GSsum

/**
* @category Sequence
* @return an array of the first n terms in a geometric sequence.
* ```typescript
* GSequence(2,3,5) // return [2,6,18,54,162]
* GSequence(5,-2,3) // return [5,-10,20]
* ```
*/
function GSequence(a: number, r: number, n = 10): number[] {
    let arr = []
    for (let i = 1; i <= n; i++) {
        arr.push(GSterm(a, r, i))
    }
    return arr
}
globalThis.GSequence = GSequence
