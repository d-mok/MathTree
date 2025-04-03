/**
 * the value of field at given point
 * ```
 * FieldAt([0,0],[1,2,3]) // 3
 * FieldAt([1,2],[3,-4,5]) // 0
 * ```
 */
export function FieldAt(point: Point2D, field: Field): number {
    return optimizer(field).fieldAt(point)
}

/**
 * check if point is constrained by cons
 * ```
 * isConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] satisfies all the constraints
 * ```
 */
export function isConstrained(cons: Constraint[], point: Point2D): boolean {
    return reins.contains(cons, point)
}

/**
 * check if point is constrained by cons, treating all cons as 'or equal to'
 * ```
 * isLooseConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] loosely satisfies all the constraints
 * ```
 */
export function isLooseConstrained(
    cons: Constraint[],
    point: Point2D
): boolean {
    return reins.contains(cons, point, 'loose')
}

/**
 * the vertices of the feasible polygon
 * ```
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
export function FeasiblePolygon(...cons: Constraint[]): Point2D[] {
    let vs = reins.polygon(cons)
    if (vs.length <= 2) return Array(3).fill([NaN, NaN]) // No feasible region
    return vs
}

/**
 * the vertices of the feasible polygon
 * ```
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
export function FeasibleVertices(...cons: Constraint[]): Point2D[] {
    let vs = reins.vertices(cons)
    if (vs.length === 0) return cons.map($ => [NaN, NaN]) // no feasible vertex
    return vs
}

/**
 * check if the feasible region is bounded
 * ```
 * FeasibleIsBounded([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // true
 * FeasibleIsBounded([
 *    [1, 0, '<', 10],
 * ])
 * // false
 * ```
 */
export function FeasibleIsBounded(...cons: Constraint[]) {
    return reins.isBounded(cons)
}

/**
 * the integral points inside the feasible polygon
 * ```
 * FeasibleIntegral([
 *    [1, 0, '<', 3],
 *    [1, 0, '>', 0],
 *    [0, 1, '<', 2],
 *    [0, 1, '>', 0]
 * ])
 * // [[1,1],[2,1]]
 * ```
 */
export function FeasibleIntegral(...cons: Constraint[]): Point2D[] {
    return reins.integrals(cons)
}

/**
 * the point with the max value of field
 * ```
 * MaximizePoint([[0,0],[10,10]],[1,2,3]) // [10,10]
 * ```
 */
export function MaximizePoint(points: Point2D[], field: Field): Point2D {
    if (points.length === 0) return [NaN, NaN] // 'No feasible point'
    let pts = optimizer(field, points).maxPoints()
    if (pts.length === 1) return pts[0]
    return [NaN, NaN] // 'No or multiple point'
}

/**
 * the point with the min value of field
 * ```
 * MinimizePoint([[0,0],[10,10]],[1,2,3]) // [0,0]
 * ```
 */
export function MinimizePoint(points: Point2D[], field: Field): Point2D {
    if (points.length === 0) return [NaN, NaN] // 'No feasible point'
    let pts = optimizer(field, points).minPoints()
    if (pts.length === 1) return pts[0]
    return [NaN, NaN] // 'No or multiple point'
}

/**
 * the point with the min/max value of field
 * ```
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [10,10]
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [0,0]
 * ```
 */
export function OptimizePoint(
    points: Point2D[],
    field: Field,
    max: boolean
): Point2D {
    return max ? MaximizePoint(points, field) : MinimizePoint(points, field)
}

/**
 * the max value of field
 * ```
 * MaximizeField([[0,0],[10,10]],[1,2,3]) // 33
 * ```
 */
export function MaximizeField(points: Point2D[], field: Field): number {
    let op = optimizer(field, points)
    let val = op.max()
    if (val === null) return NaN
    return val
}

/**
 * the min value of field
 * ```
 * MinimizeField([[0,0],[10,10]],[1,2,3]) // 3
 * ```
 */
export function MinimizeField(points: Point2D[], field: Field): number {
    let op = optimizer(field, points)
    let val = op.min()
    if (val === null) return NaN
    return val
}

/**
 * the min/max value of field
 * ```
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 33
 * OptimizeField([[0,0],[10,10]],[1,2,3],false) // 3
 * ```
 */
export function OptimizeField(
    points: Point2D[],
    field: Field,
    max: boolean
): number {
    return max ? MaximizeField(points, field) : MinimizeField(points, field)
}

/**
 * the constraints from the given points
 * ```
 * ConstraintsFromPoints([0,0],[0,1],[1,0]) // [[0,1,'\\ge',-0],[1,0,'\\ge',-0],[1,1,'\\le',1]]
 * ConstraintsFromPoints([0,0],[3,-1],[2,2],[1,3],[-2,2])
 * // [[[1, 3, "\\ge", -0],[1, 1, "\\ge", -0],[1, -3, "\\ge", -8],[1, 1, "\\le", 4],[3, 1, "\\le", 8]]]
 * ConstraintsFromPoints([0,0],[1,2],[2,1],[0,1],[1,0]) // [[0, 1, "\\ge", -0],[1, 0, "\\ge", -0],[1, -1, "\\ge", -1],[1, 1, "\\le", 3],[1, -1, "\\le", 1]]
 * ```
 */
export function ConstraintsFromPoints(...points: Point2D[]): Constraint[] {
    if (!IsConvexPolygon(...points)) {
        throw new Error('Not a convex polygon')
    }

    let mean = vec.mean(points)
    let pts = ArrangePoints(...points)
    pts = [...pts, pts[0]]

    let constraints: Constraint[] = []

    for (let i = 0; i < points.length; i++) {
        let A = pts[i]
        let B = pts[i + 1]
        let [a, b, c] = LinearFromTwoPoints(A, B)
        let sign: Ineq = FieldAt(mean, [a, b, c]) > 0 ? '\\ge' : '\\le'
        constraints.push([a, b, sign, -c])
    }
    return constraints
}
