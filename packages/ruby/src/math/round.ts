
function shiftDec(num: number, right: number): number {
    let [mant, exp] = toSci(num)
    return Number(mant + 'e' + (exp + right))
}

function toSci(num: number): [number, number] {
    let [m, e] = num.toExponential().split('e')
    return [Number(m), Number(e)]
}


function unshiftDec(num: number, right: number): number {
    return shiftDec(num, - right)
}


function sf2dp(num: number, sf: number): number {
    let exp = Number(num.toExponential().split('e')[1])
    return sf - 1 - exp
}



export function adjustToDP(num: number, dp: number, method: 'off' | 'up' | 'down'): number {
    let sign = Math.sign(num)
    num = Math.abs(num)
    let shifted = shiftDec(num, dp)
    let adjusted = 0
    if (method === 'off') adjusted = Math.round(shifted)
    if (method === 'up') adjusted = Math.ceil(shifted)
    if (method === 'down') adjusted = Math.floor(shifted)
    let unshifted = unshiftDec(adjusted, dp)
    return sign * unshifted
}



export function adjustToSF(num: number, sf: number, method: 'off' | 'up' | 'down'): number {
    let dp = sf2dp(num, sf)
    return adjustToDP(num, dp, method)
}

