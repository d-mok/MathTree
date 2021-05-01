const LP_BOUND = 100


function onBoundary(p: Point) {
    return Abs(p[0]) >= LP_BOUND || Abs(p[1]) >= LP_BOUND
}


/**
 * 
 * @category LinearProgram
 * @return the value of field at given point
 * ```typescript
 * FieldAt([0,0],[1,2,3]) // 3
 * FieldAt([1,2],[3,-4,5]) // 0
 * ```
 */
function FieldAt(p: Point, field: Field): number {
    const [a, b, c] = field
    const [x, y] = p
    return a * x + b * y + c
}
globalThis.FieldAt = FieldAt


/**
 * 
 * @category LinearProgram
 * @return check if point is constrained by cons
 * ```typescript
 * isConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] satisfies all the constraints
 * ```
 */
function isConstrained(cons: Constraint[], point: Point): boolean {
    const [x, y] = point
    return cons.every(con => {
        let [a, b, s, c] = con;
        let P = a * x + b * y - c;
        let [greater, eq] = ParseIneqSign(s)
        if (greater && eq) return P >= 0;
        if (greater && !eq) return P > 0;
        if (!greater && eq) return P <= 0;
        if (!greater && !eq) return P < 0;
    });
}
globalThis.isConstrained = isConstrained


/**
 * 
 * @category LinearProgram
 * @return check if point is constrained by cons, treating all cons as 'or equal to'
 * ```typescript
 * isLooseConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] loosely satisfies all the constraints
 * ```
 */
function isLooseConstrained(cons: Constraint[], point: Point): boolean {
    const [x, y] = point
    return cons.every(con => {
        let [a, b, s, c] = con;
        let P = a * x + b * y - c;
        let [greater, _] = ParseIneqSign(s)
        if (greater) return P >= 0;
        if (!greater) return P <= 0;
    });
}
globalThis.isLooseConstrained = isLooseConstrained




/**
 * 
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
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
    const boundaryConstraints: Constraint[] = [
        [1, 0, "<=", LP_BOUND],
        [1, 0, ">=", -LP_BOUND],
        [0, 1, "<=", LP_BOUND],
        [0, 1, ">=", -LP_BOUND]
    ]
    let cs = [...cons, ...boundaryConstraints];
    let vertices: Point[] = [];
    for (let i = 0; i < cs.length; i++) {
        for (let j = i + 1; j < cs.length; j++) {
            let [a1, b1, s1, c1] = cs[i];
            let [a2, b2, s2, c2] = cs[j];
            if (a1 / b1 === a2 / b2) continue
            let p = Crammer(a1, b1, c1, a2, b2, c2);

            let otherCons = [...cs];
            otherCons.splice(j, 1);
            otherCons.splice(i, 1);
            if (isLooseConstrained(otherCons, p)) {
                vertices.push(p);
            }
        }
    }
    vertices = List(vertices).distinct()
    Should(vertices.length > 2, 'No feasible region.')
    const center = VectorMean(...vertices);
    vertices = SortBy(vertices, x => Inclination(center, x))
    return vertices;
}
globalThis.FeasiblePolygon = FeasiblePolygon




/**
 * 
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
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
    let vertices = FeasiblePolygon(...cons).filter(v => !onBoundary(v))
    Should(vertices.length > 0, 'no feasible vertex')
    return vertices
}
globalThis.FeasibleVertices = FeasibleVertices





/**
 * 
 * @category LinearProgram
 * @return check if the feasible region is bounded
 * ```typescript
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
    return FeasiblePolygon(...cons).every(v => !onBoundary(v))
}
globalThis.FeasibleIsBounded = FeasibleIsBounded





/**
 * 
 * @category LinearProgram
 * @return the integral points inside the feasible polygon
 * ```typescript
 * FeasibleIntegral([
 *    [1, 0, '<', 3],
 *    [1, 0, '>', 0],
 *    [0, 1, '<', 2],
 *    [0, 1, '>', 0]
 * ])
 * // [[1,1],[2,1]]
 * ```
 */
function FeasibleIntegral(...cons: Constraint[]): Point[] {
    let vertices = FeasiblePolygon(...cons)
    let xCoords = vertices.map(p => p[0])
    let yCoords = vertices.map(p => p[1])
    let xmax = Ceil(Max(...xCoords))
    let xmin = Floor(Min(...xCoords))
    let ymax = Ceil(Max(...yCoords))
    let ymin = Floor(Min(...yCoords))

    let points: Point[] = [];
    for (let i = xmin; i <= xmax; i++) {
        for (let j = ymin; j <= ymax; j++) {
            let p: Point = [i, j]
            if (isConstrained(cons, p)) points.push(p);
        }
    }
    return points;
}
globalThis.FeasibleIntegral = FeasibleIntegral


/**
 * 
 * @category LinearProgram
 * @return the point with the max value of field
 * ```typescript
 * MaximizePoint([[0,0],[10,10]],[1,2,3]) // [10,10]
 * ```
 */
function MaximizePoint(points: Point[], field: Field): Point {
    Should(points.length > 0, 'No feasible point')
    let orderedPoints = SortBy(points, x => -FieldAt(x, field))
    orderedPoints = List(orderedPoints).distinct()
    let point = orderedPoints[0]
    Should(!onBoundary(point), 'No max point')
    if (orderedPoints[1]) {
        Should(FieldAt(point, field) !== FieldAt(orderedPoints[1], field), 'multiple max points')
    }
    return point
}
globalThis.MaximizePoint = MaximizePoint



/**
 * 
 * @category LinearProgram
 * @return the point with the min value of field
 * ```typescript
 * MinimizePoint([[0,0],[10,10]],[1,2,3]) // [0,0]
 * ```
 */
function MinimizePoint(points: Point[], field: Field): Point {
    Should(points.length > 0, 'No feasible point')
    let orderedPoints = SortBy(points, x => FieldAt(x, field))
    orderedPoints = List(orderedPoints).distinct()
    let point = orderedPoints[0]
    Should(!onBoundary(point), 'No min point')
    if (orderedPoints[1]) {
        Should(FieldAt(point, field) !== FieldAt(orderedPoints[1], field), 'multiple min points')
    }
    return point
}
globalThis.MinimizePoint = MinimizePoint



/**
 * 
 * @category LinearProgram
 * @return the point with the min/max value of field
 * ```typescript
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [10,10]
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [0,0]
 * ```
 */
function OptimizePoint(points: Point[], field: Field, max: boolean): Point {
    if (max) {
        return MaximizePoint(points, field)
    } else {
        return MinimizePoint(points, field)
    }
}
globalThis.OptimizePoint = OptimizePoint



/**
 * 
 * @category LinearProgram
 * @return the min/max value of field
 * ```typescript
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 33
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 3
 * ```
 */
function OptimizeField(points: Point[], field: Field, max: boolean): number {
    let point = OptimizePoint(points, field, max)
    return FieldAt(point, field)
}
globalThis.OptimizeField = OptimizeField

