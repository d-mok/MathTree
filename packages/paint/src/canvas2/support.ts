

type Point2D = [number, number]

export function vec(p1: Point2D, p2: Point2D): Point2D {
    let [x1, y1] = p1
    let [x2, y2] = p2
    return [x2 - x1, y2 - y1]
}

function deg(radian: number): number {
    return radian / Math.PI * 180
}

export function magnitude([x, y]: Point2D): number {
    return (x * x + y * y) ** 0.5
}

export function argument([x, y]: Point2D): number {
    let rad = Math.atan2(y, x)
    let angle = deg(rad)
    if (angle < 0) angle += 360
    return angle
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
        if (!Array.isArray(result))
            result = [t, result]
        return result
    };

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
export function traceCircle(
    center: Point2D,
    radius: number,
    angleRange: [number, number],
    dots = 100
): Point2D[] {
    const [h, k] = center

    function sin(degree: number): number {
        return Math.sin(degree / 180 * Math.PI)
    }

    function cos(degree: number): number {
        return Math.cos(degree / 180 * Math.PI)
    }

    return trace(t => [h + radius * cos(t), k + radius * sin(t)], angleRange, dots)
}


export function split<T>(arr: T[], delimitElement: T): T[][] {
    let ls: T[][] = []
    let clone = [...arr]
    while (true) {
        let firstDelimIndex = clone.findIndex($ => $ === delimitElement)
        if (firstDelimIndex === -1) {
            let head = clone.splice(0)
            ls.push(head)
            break
        } else {
            let head = clone.splice(0, firstDelimIndex)
            ls.push(head)
            clone.shift()
            if (clone.length === 0) {
                // ls.push([])
                break
            }
        }
    }
    return ls
}