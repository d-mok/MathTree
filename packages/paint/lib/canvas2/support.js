"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = exports.traceCircle = exports.trace = exports.argument = exports.magnitude = exports.vec = void 0;
function vec(p1, p2) {
    let [x1, y1] = p1;
    let [x2, y2] = p2;
    return [x2 - x1, y2 - y1];
}
exports.vec = vec;
function deg(radian) {
    return radian / Math.PI * 180;
}
function magnitude([x, y]) {
    return (x * x + y * y) ** 0.5;
}
exports.magnitude = magnitude;
function argument([x, y]) {
    let rad = Math.atan2(y, x);
    let angle = deg(rad);
    if (angle < 0)
        angle += 360;
    return angle;
}
exports.argument = argument;
/**
 * Return an array of 2D points as [number,number] by tracing `func` within `range`.
 * @param func - the func to trace, can be normal or parametric.
 * @param range - the range of `func` input to trace
 * @param dots - number of points requested, more dots more detailed
 * @returns an array of 2D points
 * @example
 * ```
 * trace(x=>x**2, [0,3], 4)
 * // [[0,0], [1,1], [2,4], [3,9]]
 * ```
 */
function trace(func, range, dots = 1000) {
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
exports.trace = trace;
/**
 * Return an array of 2D points as [number,number] by tracing a circle.
 * @param center - the center of the circle
 * @param radius - the radius of the circle
 * @param angleRange - the polar angle range
 * @param dots - number of points requested, more dots more detailed
 * @returns an array of 2D points
 * @example
 * ```
 * traceCircle([0,0], 1, [0,360], 4)
 * // [[1,0], [0,1], [-1,0], [0,-1]]
 * ```
 */
function traceCircle(center, radius, angleRange, dots = 100) {
    const [h, k] = center;
    function sin(degree) {
        return Math.sin(degree / 180 * Math.PI);
    }
    function cos(degree) {
        return Math.cos(degree / 180 * Math.PI);
    }
    return trace(t => [h + radius * cos(t), k + radius * sin(t)], angleRange, dots);
}
exports.traceCircle = traceCircle;
function split(arr, delimitElement) {
    let ls = [];
    let clone = [...arr];
    while (true) {
        let firstDelimIndex = clone.findIndex($ => $ === delimitElement);
        if (firstDelimIndex === -1) {
            let head = clone.splice(0);
            ls.push(head);
            break;
        }
        else {
            let head = clone.splice(0, firstDelimIndex);
            ls.push(head);
            clone.shift();
            if (clone.length === 0) {
                // ls.push([])
                break;
            }
        }
    }
    return ls;
}
exports.split = split;
//# sourceMappingURL=support.js.map