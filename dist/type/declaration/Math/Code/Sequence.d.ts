/**
* @category Sequence
* @return an array of integers from start to end inclusive.
* ```typescript
* ListIntegers(2,6) // [2,3,4,5,6]
* ListIntegers(-2,1) // [-2,-1,0,1]
* ```
*/
declare function ListIntegers(start: number, end: number): number[];
/**
* @category Sequence
* @return Tn in an arithmetic sequence: a+(n-1)d
* ```typescript
* ASterm(2,3,10) // 29
* ASterm(5,-2,6) // -5
* ```
*/
declare function ASterm(a: number, d: number, n: number): number;
/**
* @category Sequence
* @return Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
* ```typescript
* ASsum(2,3,10) // 155
* ASsum(5,-2,6) // 0
* ```
*/
declare function ASsum(a: number, d: number, n: number): number;
/**
* @category Sequence
* @return an array of the first n terms in an arithmetic sequence.
* ```typescript
* ASequence(2,3,5) // [2,5,8,11,14]
* ASequence(5,-2,3) // [5,3,1]
* ```
*/
declare function ASequence(a: number, d: number, n?: number): number[];
/**
* @category Sequence
* @return Tn in a geometric sequence: ar**(n-1)
* ```typescript
* GSterm(2,3,4) // 54
* GSterm(5,-2,6) // -160
* ```
*/
declare function GSterm(a: number, r: number, n: number): number;
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
declare function GSsum(a: number, r: number, n?: number): number;
/**
* @category Sequence
* @return an array of the first n terms in a geometric sequence.
* ```typescript
* GSequence(2,3,5) // return [2,6,18,54,162]
* GSequence(5,-2,3) // return [5,-10,20]
* ```
*/
declare function GSequence(a: number, r: number, n?: number): number[];
/**
* @category Sequence
* @return the nth term in a quadratic sequence, 1st term = a, P_n+1=P_n + pn+q
* ```typescript
* QuadraticSequence(1,2,3,4) //
* ```
*/
declare function QuadraticSequence(a: number, p: number, q: number, n: number): number;
/**
* @category Sequence
* @return the nth term in a lucas sequence, a_n = p*a_{n-1} + q*a_{n-2}
* ```typescript
* LucasSequence(1,2,3,4,5) //
* ```
*/
declare function LucasSequence(first: number, second: number, p: number, q: number, n: number): number;
