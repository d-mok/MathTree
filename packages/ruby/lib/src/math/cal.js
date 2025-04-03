import * as math from 'mathjs';
/**
 * Return the surd in the form of [a,b] meaning a*sqrt(b).
 * ```
 * toSurd(sqrt(12)) // [2,3]
 * toSurd(-sqrt(12)) // [-2,3]
 * ```
 */
export function toSurd(num) {
    num = num.blur();
    let s = Math.sign(num);
    let a = Math.abs(num);
    let square = (a ** 2).blur();
    if (square === 0)
        return [0, 1];
    let factors = [1];
    let i = 2;
    while (i <= a) {
        let s = i ** 2;
        if (square % s === 0) {
            square = square / s;
            factors.push(i);
        }
        else {
            i++;
        }
    }
    let product = factors.reduce((a, b) => a * b, 1);
    return [s * product, square];
}
/**
 * Return all the primes under `max`.
 * ```
 * primes(12) // [2,3,5,7,11]
 * primes(13) // [2,3,5,7,11,13]
 * ```
 */
export function primes(max) {
    let arr = [];
    for (let i = 2; i <= max; i++) {
        if (math.isPrime(i))
            arr.push(i);
    }
    return arr;
}
/**
 * Return an array of ordered prime factors.
 * ```
 * primeFactors(12) // [2,2,3]
 * ```
 */
export function primeFactors(num) {
    let arr = [];
    let i = 2;
    while (num > 1) {
        if (!math.isPrime(i)) {
            i++;
            continue;
        }
        if (num % i === 0) {
            arr.push(i);
            num = num / i;
        }
        else {
            i++;
        }
    }
    return arr;
}
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
export function traceCircle(center, radius, angleRange, dots = 100) {
    const [h, k] = center;
    function sin(degree) {
        return Math.sin((degree / 180) * Math.PI);
    }
    function cos(degree) {
        return Math.cos((degree / 180) * Math.PI);
    }
    return trace(t => [h + radius * cos(t), k + radius * sin(t)], angleRange, dots);
}
/**
 * Solve `[x,y]` from ax+by=c and px+qy=r.
 * ```
 * crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * crammer(1,1,3,2,2,6) // [NaN, NaN]
 * ```
 */
export function crammer(a, b, c, p, q, r) {
    const A = [
        [a, b],
        [p, q],
    ];
    const B = [c, r];
    if (math.det(A) === 0)
        return [NaN, NaN];
    return math.lusolve(A, B).flat();
}
export function mode(nums) {
    return math.mode(...nums);
}
//# sourceMappingURL=cal.js.map