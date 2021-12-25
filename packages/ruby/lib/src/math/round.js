function shiftDec(num, right) {
    let [mant, exp] = toSci(num);
    return Number(mant + 'e' + (exp + right));
}
function toSci(num) {
    let [m, e] = num.toExponential().split('e');
    return [Number(m), Number(e)];
}
function unshiftDec(num, right) {
    return shiftDec(num, -right);
}
function sf2dp(num, sf) {
    let exp = Number(num.toExponential().split('e')[1]);
    return sf - 1 - exp;
}
export function adjustToDP(num, dp, method) {
    let sign = Math.sign(num);
    num = Math.abs(num);
    let shifted = shiftDec(num, dp);
    let adjusted = 0;
    if (method === 'off')
        adjusted = Math.round(shifted);
    if (method === 'up')
        adjusted = Math.ceil(shifted);
    if (method === 'down')
        adjusted = Math.floor(shifted);
    let unshifted = unshiftDec(adjusted, dp);
    return sign * unshifted;
}
export function adjustToSF(num, sf, method) {
    let dp = sf2dp(num, sf);
    return adjustToDP(num, dp, method);
}
//# sourceMappingURL=round.js.map