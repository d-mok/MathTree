
/**
* Return a string of joined elements. [1,2,3] --> '1, 2 and 3'
* @category Text
* @param {...any} items - the items to join.
* @return {string} The joined string.
* @example
* GrammarJoin(1,2,3,4) // return '1, 2, 3 and 4'
* GrammarJoin('a','b','c') // return 'a, b and c'
*/
function GrammarJoin(...items: any[]): string {
    let L = items.length
    if (L === 0) return ''
    if (L === 1) return items[0]
    let arr = [];
    for (let i = 0; i < L - 1; i++) {
        arr.push(items[i]);
    }
    return arr.join(', ') + ' and ' + items[items.length - 1]
}
globalThis.GrammarJoin = GrammarJoin



/**
* Return ✔ or ✘.
* @category Text
* @param {boolean} bool - whether tick or cross.
* @return {string} '✔' or '✘'.
* @example
* Tick(true) // return '✔'
* Tick(false) // return '✘'
*/
function Tick(bool: boolean): string {
    return bool ? '✔' : '✘'
}
globalThis.Tick = Tick


/**
* Return ✔ or ✘.
* @category Text
* @param {...boolean} bools - whether tick or cross.
* @return {string[]} Array of '✔' or '✘'.
* @example
* Ticks(true,false) // return ['✔','✘']
*/
function Ticks(...bools: boolean[]): string[] {
    return bools.map(x => Tick(x))
}
globalThis.Ticks = Ticks



/**
* Return a pair of latex inequalities sign.
* @category Text
* @param {boolean} greater - greater than or less than.
* @param {boolean} equal - equal to if not.
* @return {string[]} Array like ['\\ge', '\\le'].
* @example
* IneqSign(true,true) // return ['\\ge', '\\le']
* IneqSign(true,false) // return ['\\gt', '\\lt']
* IneqSign(false,true) // return ['\\le', '\\ge']
* IneqSign(false,false) // return ['\\lt', '\\gt']
*/
function IneqSign(greater: boolean, equal: boolean = false): string[] {
    if (greater && equal) { return ['\\ge', '\\le'] }
    if (greater && !equal) { return ['\\gt', '\\lt'] }
    if (!greater && equal) { return ['\\le', '\\ge'] }
    if (!greater && !equal) { return ['\\lt', '\\gt'] }
    return []
}
globalThis.IneqSign = IneqSign



/**
* Return latex of dfrac p/q.
* @category Text
* @param {number} numerator - numerator p.
* @param {number} denominator - denominator q.
* @return {string} latex like \dfrac{1}{2}.
* @example
* Dfrac(1,2) // return '\\dfrac{1}{2}'
* Dfrac(1,-2) // return '\\dfrac{-1}{2}'
* Dfrac(6,4) // return '\\dfrac{3}{2}'
* Dfrac(6,-2) // return '-3'
* Dfrac(0,2) // return '0'
* Dfrac(5,0) // return undefined
*/
function Dfrac(numerator: number, denominator: number): string | undefined {
    let p = numerator
    let q = denominator
    if (q === 0) return undefined
    if (p === 0) return '0'
    let s = Math.sign(p / q)
    p = Math.abs(p) * s
    q = Math.abs(q);
    [p, q] = SimpRatio(p, q)
    if (q === 1) return p.toString()
    return '\\dfrac{' + p + '}{' + q + '}'
}
globalThis.Dfrac = Dfrac