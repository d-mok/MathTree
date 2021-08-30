/**
* @category Sequence
* @return an array of integers from start to end inclusive.
* ```
* ListIntegers(2,6) // [2,3,4,5,6]
* ListIntegers(-2,1) // [-2,-1,0,1]
* ```
*/
function ListIntegers(start: number, end: number): number[] {
    return cal.range(start, end)
}
globalThis.ListIntegers = contract(ListIntegers).seal({
    arg: [owl.num],
    args: function is_range(start, end) { return start < end }
})





/**
* @category Sequence
* @return Tn in an arithmetic sequence: a+(n-1)d
* ```
* ASterm(2,3,10) // 29
* ASterm(5,-2,6) // -5
* ```
*/
function ASterm(a: number, d: number, n: number): number {
    return a + (n - 1) * d
}
globalThis.ASterm = contract(ASterm).sign([owl.num, owl.num, owl.positiveInt])



/**
* @category Sequence
* @return Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
* ```
* ASsum(2,3,10) // 155
* ASsum(5,-2,6) // 0
* ```
*/
function ASsum(a: number, d: number, n: number): number {
    return 0.5 * n * (2 * a + (n - 1) * d)
}
globalThis.ASsum = contract(ASsum).sign([owl.num, owl.num, owl.positiveInt])



/**
* @category Sequence
* @return an array of the first n terms in an arithmetic sequence.
* ```
* ASequence(2,3,5) // [2,5,8,11,14]
* ASequence(5,-2,3) // [5,3,1]
* ```
*/
function ASequence(a: number, d: number, n = 10): number[] {
    let arr = []
    for (let i = 1; i <= n; i++) {
        arr.push(ASterm(a, d, i))
    }
    return arr
}
globalThis.ASequence = contract(ASequence).sign([owl.num, owl.num, owl.positiveInt])



/**
* @category Sequence
* @return Tn in a geometric sequence: ar**(n-1)
* ```
* GSterm(2,3,4) // 54
* GSterm(5,-2,6) // -160
* ```
*/
function GSterm(a: number, r: number, n: number): number {
    return a * (r ** (n - 1))
}
globalThis.GSterm = contract(GSterm).sign([owl.num, owl.num, owl.positiveInt])




/**
* @category Sequence
* @return Sn in a geometric sequence: a*(r*n-1)/(r-1)
* ```
* GSsum(2,3,4) // 80
* GSsum(5,-2,3) // 15
* GSsum(3,0.5) // 6 , sum to inf if omit n
* ```
*/
function GSsum(a: number, r: number, n: number = -1): number {
    return n > 0 ? a * (r ** n - 1) / (r - 1) : a / (1 - r)
}
globalThis.GSsum = contract(GSsum).sign([owl.num, owl.num, owl.int])

/**
* @category Sequence
* @return an array of the first n terms in a geometric sequence.
* ```
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
globalThis.GSequence = contract(GSequence).sign([owl.num, owl.num, owl.positiveInt])



/**
* @category Sequence
* @return the nth term in a quadratic sequence, 1st term = a, P_i+1=P_i + pi+q
* ```
* QuadraticSequence(1,2,3,4) // 
* ```
*/
function QuadraticSequence(a: number, p: number, q: number, n: number): number {
    let c = a
    for (let i = 2; i <= n; i++) {
        c += p * (i - 1) + q
    }
    return c
}
globalThis.QuadraticSequence = contract(QuadraticSequence).sign(
    [owl.num, owl.num, owl.num, owl.positiveInt]
)


/**
* @category Sequence
* @return the nth term in a lucas sequence, a_i = p*a_{i-1} + q*a_{i-2}
* ```
* LucasSequence(1,2,3,4,5) // 
* ```
*/
function LucasSequence(first: number, second: number, p: number, q: number, n: number): number {
    if (n === 1) return first
    if (n === 2) return second
    let S = [first, second]
    for (let i = 3; i <= n; i++) {
        S.push(p * S[i - 2] + q * S[i - 3])
    }
    return S[n - 1]
}
globalThis.LucasSequence = contract(LucasSequence).sign(
    [owl.num, owl.num, owl.num, owl.num, owl.positiveInt]
)
