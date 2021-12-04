
/**
 * 
 * @category LinearProgram
 * @return the value of field at given point
 * ```
 * FieldAt([0,0],[1,2,3]) // 3
 * FieldAt([1,2],[3,-4,5]) // 0
 * ```
 */
function FieldAt(point: Point2D, field: Field): number {
    return optimizer({ field }).fieldAt(point)
}
globalThis.FieldAt = contract(FieldAt).sign([owl.point2D, owl.field])


/**
 * 
 * @category LinearProgram
 * @return check if point is constrained by cons
 * ```
 * isConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] satisfies all the constraints
 * ```
 */
function isConstrained(cons: Constraint[], point: Point2D): boolean {
    return toReins(cons).contains(point)
}
globalThis.isConstrained = contract(isConstrained).sign([owl.constraints, owl.point2D])


/**
 * 
 * @category LinearProgram
 * @return check if point is constrained by cons, treating all cons as 'or equal to'
 * ```
 * isLooseConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] loosely satisfies all the constraints
 * ```
 */
function isLooseConstrained(cons: Constraint[], point: Point2D): boolean {
    return toReins(cons).looseContains(point)
}
globalThis.isLooseConstrained = contract(isLooseConstrained).sign([owl.constraints, owl.point2D])




/**
 * 
 * @category LinearProgram
 * @return the vertices of the feasible polygon
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
function FeasiblePolygon(...cons: Constraint[]) {
    let vs = toReins(cons).polygon()
    Should(vs.length > 2, 'No feasible region.')
    return vs
}
globalThis.FeasiblePolygon = contract(FeasiblePolygon).sign([owl.constraint])




/**
 * 
 * @category LinearProgram
 * @return the vertices of the feasible polygon
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
function FeasibleVertices(...cons: Constraint[]) {
    let vs = toReins(cons).vertices()
    Should(vs.length > 0, 'no feasible vertex')
    return vs
}
globalThis.FeasibleVertices = contract(FeasibleVertices).sign([owl.constraint])





/**
 * 
 * @category LinearProgram
 * @return check if the feasible region is bounded
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
function FeasibleIsBounded(...cons: Constraint[]) {
    return toReins(cons).isBounded()
}
globalThis.FeasibleIsBounded = contract(FeasibleIsBounded).sign([owl.constraint])





/**
 * 
 * @category LinearProgram
 * @return the integral points inside the feasible polygon
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
function FeasibleIntegral(...cons: Constraint[]): Point2D[] {
    return toReins(cons).integrals()
}
globalThis.FeasibleIntegral = contract(FeasibleIntegral).sign([owl.constraint])


/**
 * 
 * @category LinearProgram
 * @return the point with the max value of field
 * ```
 * MaximizePoint([[0,0],[10,10]],[1,2,3]) // [10,10]
 * ```
 */
function MaximizePoint(points: Point2D[], field: Field): Point2D {
    Should(points.length > 0, 'No feasible point')
    let pts = optimizer({
        field: field,
        feasiblePoints: points
    }).maxPoints()
    Should(pts.length > 0, 'No max point')
    Should(pts.length < 2, 'Multiple max points')
    return pts[0]
}
globalThis.MaximizePoint = contract(MaximizePoint).sign([owl.point2Ds, owl.field])



/**
 * 
 * @category LinearProgram
 * @return the point with the min value of field
 * ```
 * MinimizePoint([[0,0],[10,10]],[1,2,3]) // [0,0]
 * ```
 */
function MinimizePoint(points: Point2D[], field: Field): Point2D {
    Should(points.length > 0, 'No feasible point')
    let pts = optimizer({
        field: field,
        feasiblePoints: points
    }).minPoints()
    Should(pts.length > 0, 'No min point')
    Should(pts.length < 2, 'Multiple min points')
    return pts[0]
}
globalThis.MinimizePoint = contract(MinimizePoint).sign([owl.point2Ds, owl.field])



/**
 * 
 * @category LinearProgram
 * @return the point with the min/max value of field
 * ```
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [10,10]
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [0,0]
 * ```
 */
function OptimizePoint(points: Point2D[], field: Field, max: boolean): Point2D {
    return max ? MaximizePoint(points, field) : MinimizePoint(points, field)
}
globalThis.OptimizePoint = contract(OptimizePoint).sign([owl.point2Ds, owl.field, owl.bool])






/**
 * 
 * @category LinearProgram
 * @return the max value of field
 * ```
 * MaximizeField([[0,0],[10,10]],[1,2,3]) // 33
 * ```
 */
function MaximizeField(points: Point2D[], field: Field): number {
    let op = optimizer({
        field: field,
        feasiblePoints: points
    })
    let val = op.max()
    Should(val !== null, 'No optimal value for this field!')
    return val
}
globalThis.MaximizeField = contract(MaximizeField).sign([owl.point2Ds, owl.field])



/**
 * 
 * @category LinearProgram
 * @return the min value of field
 * ```
 * MinimizeField([[0,0],[10,10]],[1,2,3]) // 3
 * ```
 */
function MinimizeField(points: Point2D[], field: Field): number {
    let op = optimizer({
        field: field,
        feasiblePoints: points
    })
    let val = op.min()
    Should(val !== null, 'No optimal value for this field!')
    return val
}
globalThis.MinimizeField = contract(MinimizeField).sign([owl.point2Ds, owl.field])



/**
 * 
 * @category LinearProgram
 * @return the min/max value of field
 * ```
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 33
 * OptimizeField([[0,0],[10,10]],[1,2,3],false) // 3
 * ```
 */
function OptimizeField(points: Point2D[], field: Field, max: boolean): number {
    return max ? MaximizeField(points, field) : MinimizeField(points, field)
}
globalThis.OptimizeField = contract(OptimizeField).sign([owl.point2Ds, owl.field, owl.bool])



/**
 * 
 * @category LinearProgram
 * @return the constraints from the given points
 * ```
 * ConstraintsFromPoints([0,0],[0,1],[1,0]) // [[0,1,'\\ge',-0],[1,0,'\\ge',-0],[1,1,'\\le',1]]
 * ConstraintsFromPoints([0,0],[3,-1],[2,2],[1,3],[-2,2]) 
 * // [[[1, 3, "\\ge", -0],[1, 1, "\\ge", -0],[1, -3, "\\ge", -8],[1, 1, "\\le", 4],[3, 1, "\\le", 8]]]
 * ConstraintsFromPoints([0,0],[1,2],[2,1],[0,1],[1,0]) // [[0, 1, "\\ge", -0],[1, 0, "\\ge", -0],[1, -1, "\\ge", -1],[1, 1, "\\le", 3],[1, -1, "\\le", 1]]
 * ```
 */
function ConstraintsFromPoints(...points: Point2D[]): Constraint[] {
    Should(IsConvexPolygon(...points), 'Not a convex region');

    let mean = toShape2D(points).mean().toArray()
    let pts = ArrangePoints(...points)
    pts = [...pts, pts[0]]

    let constraints: Constraint[] = []

    for (let i = 0; i < points.length; i++) {
        let A = pts[i]
        let B = pts[i + 1]
        let [a, b, c] = LinearFromTwoPoints(A, B)
        let sign: Ineq = FieldAt(mean, [a, b, c]) > 0 ? "\\ge" : "\\le"
        constraints.push([a, b, sign, -c])
    }
    return constraints
}
globalThis.ConstraintsFromPoints = contract(ConstraintsFromPoints).sign([owl.point2D])