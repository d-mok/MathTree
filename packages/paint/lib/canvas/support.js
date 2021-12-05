"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = exports.traceCircle = exports.trace = exports.cross2D = exports.argument = exports.magnitude = exports.vec = exports.meanPoint = exports.midPoint = exports.atan2 = exports.cos = exports.sin = exports.force2D = exports.IsReflex = exports.AnglePolar = void 0;
/**
 * @return angle AOB, measured anticlockwise
 * ```
 * AnglePolar([1,0],[0,0],[0,2]) // 90
 * AnglePolar([2,2],[1,1],[1,3]) // 45
 * AnglePolar([1,3],[1,1],[2,2]) // 315
 * ```
 */
function AnglePolar(A, O, B) {
    let a = argument(vec(O, A));
    let b = argument(vec(O, B));
    return a <= b ? b - a : 360 + b - a;
}
exports.AnglePolar = AnglePolar;
/**
 * @return check if the polar angle AOB is reflex
 * ```
 * IsReflex([1,0],[0,0],[0,2]) // false
 * IsReflex([2,2],[1,1],[1,3]) // false
 * IsReflex([1,3],[1,1],[2,2]) // true
 * ```
 */
function IsReflex(A, O, B) {
    return AnglePolar(A, O, B) > 180;
}
exports.IsReflex = IsReflex;
function projectTo2D(point3D, angle, depth) {
    let a = angle * Math.PI / 180;
    let s = Math.sin(a);
    let c = Math.cos(a);
    let [x, y, z] = point3D;
    let x_new = x + depth * y * c;
    let y_new = z + depth * y * s;
    return [x_new, y_new];
}
function force2D(point, angle, depth) {
    if (point.length === 3) {
        return projectTo2D(point, angle, depth);
    }
    else {
        return point;
    }
}
exports.force2D = force2D;
function sin(degree) {
    return Math.sin(degree / 180 * Math.PI);
}
exports.sin = sin;
function cos(degree) {
    return Math.cos(degree / 180 * Math.PI);
}
exports.cos = cos;
function atan2(dy, dx) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
}
exports.atan2 = atan2;
function midPoint(A, B) {
    return [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
}
exports.midPoint = midPoint;
function meanPoint(...Points) {
    if (Points.length === 0)
        return [0, 0];
    let X = 0;
    let Y = 0;
    for (let p of Points) {
        X += p[0];
        Y += p[1];
    }
    let n = Points.length;
    return [X / n, Y / n];
}
exports.meanPoint = meanPoint;
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
function cross2D(vec1, vec2) {
    let [x1, y1] = vec1;
    let [x2, y2] = vec2;
    return x1 * y2 - y1 * x2;
}
exports.cross2D = cross2D;
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
                ls.push([]);
                break;
            }
        }
    }
    return ls;
}
exports.split = split;
//# sourceMappingURL=support.js.map