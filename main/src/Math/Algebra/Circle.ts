import _ from 'lodash'

/**
 * D,E,F of circle general form
 * ```
 * CircleGeneral([2,3],5) // [-4,-6,-12]
 * ```
 */
export function CircleGeneral(
    centre: Point2D,
    radius: number
): [D: number, E: number, F: number] {
    let [h, k] = centre
    let r = radius
    let D = -2 * h
    let E = -2 * k
    let F = h ** 2 + k ** 2 - r ** 2
    return [D, E, F]
}

/**
 * Centre and radius from general form.
 * ```
 * CircleFromGeneral(-4,-6,-12) // [[2,3],5]
 * ```
 */
export function CircleFromGeneral(
    D: number,
    E: number,
    F: number
): [Point2D, number] {
    let [h, k] = [-D / 2, -E / 2]
    let R = (D / 2) ** 2 + (E / 2) ** 2 - F
    let r = R ** 0.5
    return [[h, k], r]
}

/**
 * Intersections between a circle and a straight line.
 * ```
 * CircleLinearIntersect([0,0],2**0.5,[1,-1,0]) // [[-1,-1],[1,1]]
 * ```
 */
export function CircleLinearIntersect(
    center: Point2D,
    radius: number,
    linear: [number, number, number]
): [Point2D, Point2D] {
    let [a, b, c] = linear
    let [h, k] = center
    let r = radius
    if (b !== 0) {
        let m = -a / b
        let n = -c / b - k
        let A = 1 + m * m
        let B = -2 * h + 2 * m * n
        let C = h * h + n * n - r * r
        let [x1, x2] = QuadraticRoot(A, B, C)
        let y1 = (-a * x1 - c) / b
        let y2 = (-a * x2 - c) / b
        return [
            [x1, y1],
            [x2, y2],
        ]
    } else {
        let x = -c / a
        let D = r * r - (x - h) ** 2
        let y1 = k - Math.sqrt(D)
        let y2 = k + Math.sqrt(D)
        return [
            [x, y1],
            [x, y2],
        ]
    }
}

/**
 * Intersections between a circle and a straight line through `A` and `B`.
 * ```
 * CircleLineIntersect([0,0],2**0.5,[[0,0],[1,1]]) // [[-1,-1],[1,1]]
 * ```
 */
export function CircleLineIntersect(
    center: Point2D,
    radius: number,
    [A, B]: [Point2D, Point2D]
): [Point2D, Point2D] {
    let lin = LinearFromTwoPoints(A, B)
    return CircleLinearIntersect(center, radius, lin)
}
