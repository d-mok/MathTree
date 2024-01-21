import { Point2D, Point3D, Point, circle, sphere, capturable } from '../global.js'

/**
 * Return an array of 2D points as [number,number] by tracing `func` within `range`.
 * ```
 * trace(x=>x**2, [0,3], 4)
 * // [[0,0], [1,1], [2,4], [3,9]]
 * ```
 */
export function trace(
    func: ((t: number) => number) | ((t: number) => Point2D),
    range: [number, number],
    dots = 1000
): Point2D[] {
    function tracer(t: number): Point2D {
        let result: number | Point2D
        try {
            result = func(t)
        } catch {
            return [NaN, NaN]
        }
        if (!Array.isArray(result)) result = [t, result]
        return result
    }

    let [t1, t2] = range

    const step = (t2 - t1) / (dots - 1)
    let points: Point2D[] = []
    for (let t = t1; t <= t2; t += step) {
        points.push(tracer(t))
    }
    return points
}

/**
 * Return an array of 2D points as [number,number] by tracing a circle.
 * @param angleRange - the polar angle range
 * ```
 * traceCircle([0,0], 1, [0,360], 4)
 * // [[1,0], [0,1], [-1,0], [0,-1]]
 * ```
 */
export function traceCircle(
    center: Point2D,
    radius: number,
    angleRange: [number, number],
    dots = 100
): Point2D[] {
    const [h, k] = center

    function sin(degree: number): number {
        return Math.sin((degree / 180) * Math.PI)
    }

    function cos(degree: number): number {
        return Math.cos((degree / 180) * Math.PI)
    }

    return trace(
        t => [h + radius * cos(t), k + radius * sin(t)],
        angleRange,
        dots
    )
}

export function splitNull(arr: (Point2D | null)[]): Point2D[][] {
    let ls = []
    let clone = [...arr]
    while (true) {
        let index = clone.findIndex($ => $ === null)
        if (index === -1) {
            let head = clone.splice(0)
            ls.push(head)
            break
        } else {
            let head = clone.splice(0, index)
            ls.push(head)
            clone.shift()
            if (clone.length === 0) break
        }
    }
    ls = ls.filter($ => $.length > 0)
    return ls as Point2D[][]
}
