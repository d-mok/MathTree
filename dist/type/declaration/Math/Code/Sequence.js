"use strict";
/**
* @category Sequence
* @return an array of integers from start to end inclusive.
* ```typescript
* ListIntegers(2,6) // [2,3,4,5,6]
* ListIntegers(-2,1) // [-2,-1,0,1]
* ```
*/
function ListIntegers(start, end) {
    Should(IsNum(start, end), 'input must be num');
    Should(start < end, 'start < end required');
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
}
globalThis.ListIntegers = ListIntegers;
/**
* @category Sequence
* @return Tn in an arithmetic sequence: a+(n-1)d
* ```typescript
* ASterm(2,3,10) // 29
* ASterm(5,-2,6) // -5
* ```
*/
function ASterm(a, d, n) {
    Should(IsNum(a, d), 'a,d must be num');
    Should(IsPositiveInteger(n), 'n must be positive integer');
    return a + (n - 1) * d;
}
globalThis.ASterm = ASterm;
/**
* @category Sequence
* @return Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
* ```typescript
* ASsum(2,3,10) // 155
* ASsum(5,-2,6) // 0
* ```
*/
function ASsum(a, d, n) {
    Should(IsNum(a, d), 'a,d must be num');
    Should(IsPositiveInteger(n), 'n must be positive integer');
    return 0.5 * n * (2 * a + (n - 1) * d);
}
globalThis.ASsum = ASsum;
/**
* @category Sequence
* @return an array of the first n terms in an arithmetic sequence.
* ```typescript
* ASequence(2,3,5) // [2,5,8,11,14]
* ASequence(5,-2,3) // [5,3,1]
* ```
*/
function ASequence(a, d, n = 10) {
    Should(IsNum(a, d), 'a,d must be num');
    Should(IsPositiveInteger(n), 'n must be positive integer');
    let arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(ASterm(a, d, i));
    }
    return arr;
}
globalThis.ASequence = ASequence;
/**
* @category Sequence
* @return Tn in a geometric sequence: ar**(n-1)
* ```typescript
* GSterm(2,3,4) // 54
* GSterm(5,-2,6) // -160
* ```
*/
function GSterm(a, r, n) {
    Should(IsNum(a, r), 'a,r must be num');
    Should(IsPositiveInteger(n), 'n must be positive integer');
    return a * (Math.pow(r, (n - 1)));
}
globalThis.GSterm = GSterm;
/**
* @category Sequence
* @param n - number of terms. if omitted, sum to infinity.
* @return Sn in a geometric sequence: a*(r*n-1)/(r-1)
* ```typescript
* GSsum(2,3,4) // 80
* GSsum(5,-2,3) // 15
* GSsum(3,0.5) // 6
* ```
*/
function GSsum(a, r, n) {
    Should(IsNum(a, r), 'a,r must be num');
    Should(IsPositiveInteger(n) || n === undefined, 'n must be positive integer or undefined');
    return n ? a * (Math.pow(r, n) - 1) / (r - 1) : a / (1 - r);
}
globalThis.GSsum = GSsum;
/**
* @category Sequence
* @return an array of the first n terms in a geometric sequence.
* ```typescript
* GSequence(2,3,5) // return [2,6,18,54,162]
* GSequence(5,-2,3) // return [5,-10,20]
* ```
*/
function GSequence(a, r, n = 10) {
    Should(IsNum(a, r), 'a,r must be num');
    Should(IsPositiveInteger(n), 'n must be positive integer');
    let arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(GSterm(a, r, i));
    }
    return arr;
}
globalThis.GSequence = GSequence;
/**
* @category Sequence
* @return the nth term in a quadratic sequence, 1st term = a, P_n+1=P_n + pn+q
* ```typescript
* QuadraticSequence(1,2,3,4) //
* ```
*/
function QuadraticSequence(a, p, q, n) {
    let c = a;
    for (let i = 2; i <= n; i++) {
        c += p * (i - 1) + q;
    }
    return c;
}
globalThis.QuadraticSequence = QuadraticSequence;
/**
* @category Sequence
* @return the nth term in a lucas sequence, a_n = p*a_{n-1} + q*a_{n-2}
* ```typescript
* LucasSequence(1,2,3,4,5) //
* ```
*/
function LucasSequence(first, second, p, q, n) {
    if (n === 1)
        return first;
    if (n === 2)
        return second;
    let S = [first, second];
    for (let i = 3; i <= n; i++) {
        S.push(p * S[i - 2] + q * S[i - 3]);
    }
    return S[n - 1];
}
globalThis.LucasSequence = LucasSequence;
