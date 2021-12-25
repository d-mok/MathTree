function sortByX(pts) {
    return [...pts].sort(([x1, y1], [x2, y2]) => x1 - x2);
}
function intrapolateBetween([A, B], x) {
    let [x1, y1] = A;
    let [x2, y2] = B;
    let r = (x - x1) / (x2 - x1);
    return y1 + (y2 - y1) * r;
}
function justOnLeft(sortedPts, x) {
    return sortedPts.filter(([x0, _]) => x0 <= x).at(-1);
}
function justOnRight(sortedPts, x) {
    return sortedPts.filter(([x0, _]) => x0 >= x)[0];
}
function intrapolate(sortedPts, x) {
    let first = sortedPts[0];
    let last = sortedPts.at(-1);
    if (x < first[0])
        return first[1];
    if (x > last[0])
        return last[1];
    let j = sortedPts.findIndex(([X, Y]) => X > x);
    let i = j - 1;
    return intrapolateBetween([sortedPts[i], sortedPts[j]], x);
}
function makeFn(pts) {
    let sortedPts = sortByX(pts);
    return function (x) {
        return intrapolate(sortedPts, x);
    };
}
export function differentiate(fn) {
    return function (x) {
        let dx = 0.00001;
        let dy = fn(x + dx) - fn(x);
        return dy / dx;
    };
}
export function integrate(fn, lowerLimit, dx = 0.001) {
    let cache;
    let cached = false;
    return function (x) {
        let [x0, y0] = cached ? cache : [lowerLimit, 0];
        if (x >= x0) {
            for (let X = x0; X < x; X += dx) {
                y0 += 0.5 * (fn(X) + fn(X + dx)) * dx;
            }
        }
        else {
            for (let X = x0; X > x; X -= dx) {
                y0 -= 0.5 * (fn(X) + fn(X + dx)) * dx;
            }
        }
        cache = [x, y0];
        cached = true;
        return y0;
    };
}
//# sourceMappingURL=calculus.js.map