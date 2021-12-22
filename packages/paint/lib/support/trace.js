/**
 * Return an array of 2D points as [number,number] by tracing `func` within `range`.
 * ```
 * trace(x=>x**2, [0,3], 4)
 * // [[0,0], [1,1], [2,4], [3,9]]
 * ```
 */
export function trace(func, range, dots = 1000) {
    function tracer(t) {
        let result;
        try {
            result = func(t);
        }
        catch {
            return [NaN, NaN];
        }
        if (!Array.isArray(result))
            result = [t, result];
        return result;
    }
    ;
    let [t1, t2] = range;
    const step = (t2 - t1) / (dots - 1);
    let points = [];
    for (let t = t1; t <= t2; t += step) {
        points.push(tracer(t));
    }
    return points;
}
/**
 * Return an array of 2D points as [number,number] by tracing a circle.
 * @param angleRange - the polar angle range
 * ```
 * traceCircle([0,0], 1, [0,360], 4)
 * // [[1,0], [0,1], [-1,0], [0,-1]]
 * ```
 */
export function traceCircle(center, radius, angleRange, dots = 100) {
    const [h, k] = center;
    function sin(degree) {
        return Math.sin(degree / 180 * Math.PI);
    }
    function cos(degree) {
        return Math.cos(degree / 180 * Math.PI);
    }
    return trace(t => [h + radius * cos(t), k + radius * sin(t)], angleRange, dots);
}
export function splitNull(arr) {
    let ls = [];
    let clone = [...arr];
    while (true) {
        let index = clone.findIndex($ => $ === null);
        if (index === -1) {
            let head = clone.splice(0);
            ls.push(head);
            break;
        }
        else {
            let head = clone.splice(0, index);
            ls.push(head);
            clone.shift();
            if (clone.length === 0)
                break;
        }
    }
    ls = ls.filter($ => $.length > 0);
    return ls;
}
//# sourceMappingURL=trace.js.map