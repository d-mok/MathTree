export function getVars(func) {
    const fnStr = func.toString();
    return fnStr
        .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
        .replaceAll(" ", "")
        .split(",");
}
export function getAllVars(fs) {
    const vars = fs.map($ => getVars($)).flat();
    return [...new Set(vars)];
}
export function permute(arr) {
    let result = [];
    if (arr.length === 0)
        return [];
    if (arr.length === 1)
        return [arr];
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const remainingPermuted = permute(remaining);
        for (let permuted of remainingPermuted) {
            result.push([current, ...permuted]);
        }
    }
    return result;
}
export function combinations(arr, k) {
    if (k > arr.length || k <= 0)
        return [];
    if (k === arr.length)
        return [[...arr]];
    if (k === 1)
        return arr.map($ => [$]);
    const combs = [];
    let tail_combs = [];
    for (let i = 0; i <= arr.length - k + 1; i++) {
        let tail = arr.slice(i + 1);
        tail_combs = combinations(tail, k - 1);
        for (let j = 0; j < tail_combs.length; j++) {
            combs.push([arr[i], ...tail_combs[j]]);
        }
    }
    return combs;
}
//# sourceMappingURL=utils.js.map