
/**
* @category Text
* @return a string of joined elements. [1,2,3] --> '1, 2 and 3'
* ```typescript
* GrammarJoin(1,2,3,4) // '1, 2, 3 and 4'
* GrammarJoin('a','b','c') // 'a, b and c'
* ```
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
* @category Text
* @return '✔' or '✘'.
* ```typescript
* Tick(true) // '✔'
* Tick(false) // '✘'
* ```
*/
function Tick(bool: boolean): string {
    return bool ? '✔' : '✘'
}
globalThis.Tick = Tick


/**
* @category Text
* @return Array of '✔' or '✘'.
* ```typescript
* Ticks(true,false) // ['✔','✘']
* ```
*/
function Ticks(...bools: boolean[]): string[] {
    return bools.map(x => Tick(x))
}
globalThis.Ticks = Ticks



/**
* @category Text
* @return a pair of latex inequalities sign array like ['\\ge', '\\le'].
* ```typescript
* IneqSign(true,true) // ['\\ge', '\\le']
* IneqSign(true,false) // ['\\gt', '\\lt']
* IneqSign(false,true) // ['\\le', '\\ge']
* IneqSign(false,false) // ['\\lt', '\\gt']
* ```
*/
function IneqSign(greater: boolean, equal: boolean = false): [string, string] {
    if (greater && equal) { return ['\\ge', '\\le'] }
    if (greater && !equal) { return ['\\gt', '\\lt'] }
    if (!greater && equal) { return ['\\le', '\\ge'] }
    if (!greater && !equal) { return ['\\lt', '\\gt'] }
    throw 'never'
}
globalThis.IneqSign = IneqSign



/**
* @category Text
* @param upSign - put -ve sign on numerator instead of the front.
* @return latex of dfrac p/q like \dfrac{1}{2}.  
* ```typescript
* Dfrac(1,2) // '\\dfrac{1}{2}'
* Dfrac(1,-2) // '\\dfrac{-1}{2}'
* Dfrac(6,4) // '\\dfrac{3}{2}'
* Dfrac(6,-2) // '-3'
* Dfrac(0,2) // '0'
* Dfrac(5,0) // undefined
* ```
*/
function Dfrac(numerator: number, denominator: number, upSign = false): string {
    let p = numerator
    let q = denominator
    if (q === 0) return '\\dfrac{' + p + '}{' + q + '}'
    if (p === 0) return '0';
    [p, q] = Frac(p, q)
    if (q === 1) return p.toString()
    if (upSign) {
        return '\\dfrac{' + p + '}{' + q + '}'
    } else {
        if (p > 0) {
            return '\\dfrac{' + p + '}{' + q + '}'
        } else {
            return '-\\dfrac{' + Math.abs(p) + '}{' + q + '}'
        }
    }

}
globalThis.Dfrac = Dfrac